import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit, ipKeyGenerator } from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import db, { findUserByEmail, findUserById, isSubscribed, migrate, now, publicUser, type UserRow } from './db.js';
import { optionalAuth, PASSWORD_RULE, requireAuth, signToken, validPassword } from './auth.js';
import { billingMode, billingRouter, cancelSubscriptionNow, foundingStatus, stripeWebhook } from './billing.js';
import { COURSES, STAGES, getCourse, isFreeLesson, lessonExists, totalLessons } from './catalog.js';
import { passwordChangedEmail, resetEmail, sendEmail, SUPPORT_EMAIL } from './email.js';
import { assessmentIds, assessmentIndex, assessmentTitle, loadAssessment } from './assessments.js';
import { grade, isCorrect, PASS_PERCENT, publicQuestion } from './quizParse.js';
import { htmlRenderer, robotsTxt, sitemapXml } from './seo.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.resolve(here, '../content/lessons');
const NOTES_DIR = path.resolve(here, '../content/notes');
const CLIENT_DIST = path.resolve(here, '../../client/dist');
const APP_URL = (process.env.APP_URL || 'http://localhost:5173').replace(/\/$/, '');
const PROD = process.env.NODE_ENV === 'production';
if (PROD && !process.env.APP_URL) console.warn('[config] APP_URL is not set — links in emails and Stripe redirects will be wrong.');
if (PROD && !process.env.DATABASE_URL) console.warn('[config] DATABASE_URL is not set — using a local SQLite file. Data is lost whenever the server restarts on hosts without a persistent disk.');

function lessonFile(slug: string, id: string) {
  return path.join(CONTENT_DIR, slug, `${id}.md`);
}
const written = new Set<string>();
for (const c of COURSES) {
  c.units.forEach((u, ui) =>
    u.lessons.forEach((_, li) => {
      const id = `${ui + 1}-${li + 1}`;
      if (fs.existsSync(lessonFile(c.slug, id))) written.add(`${c.slug}/${id}`);
    }),
  );
}

const assessmentsByCourse = new Map(COURSES.map((c) => [c.slug, assessmentIndex(c)]));

// Unit study sheets: content/notes/<course>/unit-<n>.md. Unit 1's sheet is a free sample.
const notesFile = (slug: string, unit: number) => path.join(NOTES_DIR, slug, `unit-${unit}.md`);
const notesByCourse = new Map(COURSES.map((c) => [c.slug, c.units.map((_, i) => i + 1).filter((n) => fs.existsSync(notesFile(c.slug, n)))]));

function courseSummary(slug: string) {
  const c = getCourse(slug)!;
  return {
    slug: c.slug, code: c.code, title: c.title, stage: c.stage, track: c.track, hours: c.hours,
    description: c.description, prereqs: c.prereqs, lessonCount: totalLessons(c), unitCount: c.units.length,
  };
}
function courseDetail(slug: string) {
  const c = getCourse(slug)!;
  return {
    ...courseSummary(slug),
    outcomes: c.outcomes,
    assessments: assessmentsByCourse.get(slug) ?? {},
    notes: notesByCourse.get(slug) ?? [],
    units: c.units.map((u, ui) => ({
      title: u.title,
      lessons: u.lessons.map(([title, topics], li) => {
        const id = `${ui + 1}-${li + 1}`;
        return { id, title, topics: topics.split(';').map((t) => t.trim()), free: isFreeLesson(id), written: written.has(`${c.slug}/${id}`) };
      }),
    })),
  };
}

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 254;
const sha256 = (s: string) => crypto.createHash('sha256').update(s).digest('hex');

// ── Rate limits ───────────────────────────────────────
const ip = (req: express.Request) => ipKeyGenerator(req.ip ?? '');
const limiter = (windowMin: number, limit: number, error: string, key?: (req: express.Request) => string, skipSuccessfulRequests = false) =>
  rateLimit({
    windowMs: windowMin * 60_000,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    skipSuccessfulRequests,
    keyGenerator: key ?? ip,
    message: { error },
  });
const emailKey = (req: express.Request) => `${ip(req)}|${str(req.body?.email, 254).toLowerCase()}`;
const tooMany = 'Too many attempts. Please wait a few minutes and try again.';
const limits = {
  api: limiter(15, 900, 'Too many requests. Please slow down and try again shortly.'),
  loginAccount: limiter(15, 8, tooMany, emailKey, true), // failed attempts per email+IP
  loginIp: limiter(15, 40, tooMany, ip, true), // failed attempts per IP across all emails
  signup: limiter(60, 10, 'Too many accounts created from this network. Please try again later.'),
  forgot: limiter(60, 5, 'Too many reset requests. Please check your inbox or try again in an hour.', emailKey),
  reset: limiter(15, 10, tooMany),
  password: limiter(15, 8, tooMany, (req) => `pw|${req.user?.id ?? ip(req)}`, true),
  contact: limiter(60, 5, 'Too many messages. Please try again later.'),
  report: limiter(60, 20, 'Too many reports. Please try again later.'),
};

const app = express();
app.set('trust proxy', 1); // behind Render's (or any single) reverse proxy, so req.ip is the real client
app.disable('x-powered-by');
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'default-src': ["'self'"],
        'script-src': ["'self'"],
        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        'font-src': ["'self'", 'data:', 'https://fonts.gstatic.com'],
        'img-src': ["'self'", 'data:'],
        'connect-src': ["'self'"],
        'form-action': ["'self'"],
        'frame-ancestors': ["'none'"],
        'upgrade-insecure-requests': null,
      },
    },
  }),
);
app.use(cors({ origin: process.env.APP_URL || true }));
app.post('/api/stripe/webhook', ...stripeWebhook);
app.use(express.json({ limit: '100kb' }));
app.use('/api', limits.api);
app.use(optionalAuth);

// ── Auth ──────────────────────────────────────────────
app.post('/api/auth/signup', limits.signup, async (req, res) => {
  const email = str(req.body?.email, 254).toLowerCase();
  const password = req.body?.password;
  if (!validEmail(email)) return res.status(400).json({ error: 'Enter a valid email address.' });
  if (!validPassword(password)) return res.status(400).json({ error: PASSWORD_RULE });
  if (req.body?.acceptTerms !== true) return res.status(400).json({ error: 'Please accept the Terms of Service and Privacy Policy.' });
  const name = str(req.body?.name, 80) || email.split('@')[0];
  if (await findUserByEmail(email)) return res.status(409).json({ error: 'An account with that email already exists. Try signing in instead.' });
  const hash = await bcrypt.hash(password, 11);
  const row = await db.get<{ id: number }>('INSERT INTO users (email, name, password_hash, created_at) VALUES (?,?,?,?) RETURNING id', [email, name, hash, now()]);
  const user = (await findUserById(row!.id))!;
  res.json({ token: signToken(user), user: publicUser(user) });
});

app.post('/api/auth/login', limits.loginIp, limits.loginAccount, async (req, res) => {
  const user = await findUserByEmail(str(req.body?.email, 254));
  const ok = user && (await bcrypt.compare(String(req.body?.password ?? ''), user.password_hash));
  if (!user || !ok) return res.status(401).json({ error: 'Incorrect email or password.' });
  res.json({ token: signToken(user), user: publicUser(user) });
});

// Always answers the same way, so it can't be used to discover which emails have accounts.
app.post('/api/auth/forgot', limits.forgot, async (req, res) => {
  const email = str(req.body?.email, 254).toLowerCase();
  if (!validEmail(email)) return res.status(400).json({ error: 'Enter a valid email address.' });
  const user = await findUserByEmail(email);
  if (user) {
    const token = crypto.randomBytes(32).toString('hex');
    await db.run('DELETE FROM password_resets WHERE user_id = ? OR expires_at < ?', [user.id, Date.now()]);
    await db.run('INSERT INTO password_resets (token_hash, user_id, expires_at) VALUES (?,?,?)', [sha256(token), user.id, Date.now() + 60 * 60_000]);
    const link = `${APP_URL}/reset-password?token=${token}`;
    await sendEmail({ to: user.email, ...resetEmail(user.name, link) });
  }
  res.json({ ok: true });
});

app.post('/api/auth/reset', limits.reset, async (req, res) => {
  const token = str(req.body?.token, 200);
  const password = req.body?.password;
  if (!validPassword(password)) return res.status(400).json({ error: PASSWORD_RULE });
  const row = token ? await db.get<{ user_id: number; expires_at: number }>('SELECT user_id, expires_at FROM password_resets WHERE token_hash = ?', [sha256(token)]) : undefined;
  if (!row || row.expires_at < Date.now()) return res.status(400).json({ error: 'This reset link is invalid or has expired. Please request a new one.' });
  const hash = await bcrypt.hash(password, 11);
  await db.run('UPDATE users SET password_hash = ?, token_version = token_version + 1 WHERE id = ?', [hash, row.user_id]);
  await db.run('DELETE FROM password_resets WHERE user_id = ?', [row.user_id]);
  const user = (await findUserById(row.user_id))!;
  void sendEmail({ to: user.email, ...passwordChangedEmail(user.name) });
  res.json({ token: signToken(user), user: publicUser(user) });
});

app.get('/api/me', requireAuth, (req, res) => res.json({ user: publicUser(req.user!), billingMode }));

// ── Account management ───────────────────────────────
app.post('/api/account/password', requireAuth, limits.password, async (req, res) => {
  const user = req.user!;
  if (!(await bcrypt.compare(String(req.body?.current ?? ''), user.password_hash))) return res.status(401).json({ error: 'Your current password is incorrect.' });
  if (!validPassword(req.body?.next)) return res.status(400).json({ error: PASSWORD_RULE });
  const hash = await bcrypt.hash(req.body.next, 11);
  await db.run('UPDATE users SET password_hash = ?, token_version = token_version + 1 WHERE id = ?', [hash, user.id]);
  const fresh = (await findUserById(user.id))!;
  void sendEmail({ to: fresh.email, ...passwordChangedEmail(fresh.name) });
  res.json({ token: signToken(fresh), user: publicUser(fresh) });
});

app.post('/api/account/delete', requireAuth, limits.password, async (req, res) => {
  const user = req.user!;
  if (!(await bcrypt.compare(String(req.body?.password ?? ''), user.password_hash))) return res.status(401).json({ error: 'That password is incorrect.' });
  await cancelSubscriptionNow(user);
  await db.run('UPDATE error_reports SET user_id = NULL, email = NULL WHERE user_id = ?', [user.id]);
  await db.run('UPDATE contact_messages SET user_id = NULL WHERE user_id = ?', [user.id]);
  await db.run('DELETE FROM progress WHERE user_id = ?', [user.id]);
  await db.run('DELETE FROM assessment_attempts WHERE user_id = ?', [user.id]);
  await db.run('DELETE FROM review_cleared WHERE user_id = ?', [user.id]);
  await db.run('DELETE FROM password_resets WHERE user_id = ?', [user.id]);
  await db.run('DELETE FROM users WHERE id = ?', [user.id]);
  res.json({ ok: true });
});

// ── Support ──────────────────────────────────────────
app.get('/api/config', async (_req, res) => res.json({ supportEmail: SUPPORT_EMAIL || null, billingMode, founding: await foundingStatus() }));

const TOPICS = ['General question', 'Billing & subscription', 'Account access', 'Course content', 'Partnerships & schools', 'Other'];
app.post('/api/contact', limits.contact, async (req, res) => {
  const name = str(req.body?.name, 100);
  const email = str(req.body?.email, 254).toLowerCase();
  const topic = TOPICS.includes(req.body?.topic) ? req.body.topic : 'Other';
  const message = str(req.body?.message, 5000);
  if (!name) return res.status(400).json({ error: 'Please enter your name.' });
  if (!validEmail(email)) return res.status(400).json({ error: 'Enter a valid email address so we can reply.' });
  if (message.length < 10) return res.status(400).json({ error: 'Please write a little more about how we can help (at least 10 characters).' });
  await db.run('INSERT INTO contact_messages (name, email, topic, message, user_id, created_at) VALUES (?,?,?,?,?,?)', [name, email, topic, message, req.user?.id ?? null, now()]);
  if (SUPPORT_EMAIL) {
    void sendEmail({
      to: SUPPORT_EMAIL,
      replyTo: email,
      subject: `[Ohmentum support] ${topic} — ${name}`,
      text: `From: ${name} <${email}>${req.user ? ` (account #${req.user.id}, ${isSubscribed(req.user) ? 'subscriber' : 'free'})` : ''}\nTopic: ${topic}\n\n${message}`,
    });
  }
  res.json({ ok: true });
});

app.post('/api/reports', limits.report, async (req, res) => {
  const course = getCourse(str(req.body?.course, 100));
  const lesson = str(req.body?.lesson, 20);
  const message = str(req.body?.message, 3000);
  if (!course || !lessonExists(course, lesson)) return res.status(400).json({ error: 'Unknown lesson.' });
  if (message.length < 5) return res.status(400).json({ error: 'Please describe the problem (at least 5 characters).' });
  const email = req.user?.email ?? (validEmail(str(req.body?.email, 254).toLowerCase()) ? str(req.body?.email, 254).toLowerCase() : null);
  await db.run('INSERT INTO error_reports (course_slug, lesson_id, user_id, email, message, created_at) VALUES (?,?,?,?,?,?)', [course.slug, lesson, req.user?.id ?? null, email, message, now()]);
  if (SUPPORT_EMAIL) {
    void sendEmail({
      to: SUPPORT_EMAIL,
      replyTo: email ?? undefined,
      subject: `[Ohmentum error report] ${course.code} lesson ${lesson.replace('-', '.')}`,
      text: `Lesson: ${course.title} ${lesson.replace('-', '.')}\n${APP_URL}/courses/${course.slug}/lessons/${lesson}\nFrom: ${email ?? 'anonymous'}\n\n${message}`,
    });
  }
  res.json({ ok: true });
});

// ── Catalog & lessons ─────────────────────────────────
app.get('/api/catalog', (_req, res) => {
  res.json({
    stages: STAGES,
    courses: COURSES.map((c) => courseSummary(c.slug)),
    totals: { courses: COURSES.length, lessons: COURSES.reduce((n, c) => n + totalLessons(c), 0), hours: COURSES.reduce((n, c) => n + c.hours, 0) },
  });
});

app.get('/api/courses/:slug', (req, res) => {
  if (!getCourse(req.params.slug)) return res.status(404).json({ error: 'Course not found.' });
  res.json(courseDetail(req.params.slug));
});

app.get('/api/courses/:slug/lessons/:id', (req, res) => {
  const course = getCourse(req.params.slug);
  const found = course && lessonExists(course, req.params.id);
  if (!course || !found) return res.status(404).json({ error: 'Lesson not found.' });
  const id = req.params.id;
  const flat = course.units.flatMap((u, ui) => u.lessons.map((l, li) => ({ id: `${ui + 1}-${li + 1}`, title: l[0] })));
  const idx = flat.findIndex((l) => l.id === id);
  const meta = {
    course: { slug: course.slug, code: course.code, title: course.title },
    id, unitTitle: found.unit.title, title: found.lesson[0], topics: found.lesson[1].split(';').map((t) => t.trim()),
    prev: flat[idx - 1] ?? null, next: flat[idx + 1] ?? null, free: isFreeLesson(id),
  };
  if (!isFreeLesson(id) && !isSubscribed(req.user)) {
    return res.status(req.user ? 402 : 401).json({ ...meta, locked: true, error: 'Subscribe to unlock this lesson.' });
  }
  const file = lessonFile(course.slug, id);
  const markdown = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
  res.json({ ...meta, locked: false, markdown });
});

app.get('/api/courses/:slug/notes/:unit', (req, res) => {
  const course = getCourse(req.params.slug);
  const unit = Number(/^\d+$/.exec(req.params.unit)?.[0]);
  if (!course || !notesByCourse.get(course.slug)?.includes(unit)) return res.status(404).json({ error: 'Study sheet not found.' });
  const u = course.units[unit - 1];
  const meta = {
    course: { slug: course.slug, code: course.code, title: course.title },
    unit, unitTitle: u.title, free: unit === 1,
    lessons: u.lessons.map(([title], li) => ({ id: `${unit}-${li + 1}`, title })),
    hasQuiz: !!assessmentsByCourse.get(course.slug)?.[`unit-${unit}`],
    prevUnit: notesByCourse.get(course.slug)!.includes(unit - 1) ? unit - 1 : null,
    nextUnit: notesByCourse.get(course.slug)!.includes(unit + 1) ? unit + 1 : null,
  };
  if (unit !== 1 && !isSubscribed(req.user)) return res.status(req.user ? 402 : 401).json({ ...meta, locked: true, error: 'Subscribe to unlock every study sheet.' });
  res.json({ ...meta, locked: false, markdown: fs.readFileSync(notesFile(course.slug, unit), 'utf8') });
});

// Course summary notes: every lesson's "Key takeaways" section, in order. Subscribers see all of
// them; everyone else sees the free first lesson's takeaways as a sample.
function takeaways(markdown: string) {
  const m = /^## Key takeaways[^\n]*\n([\s\S]*?)(?=^## |(?![\s\S]))/m.exec(markdown);
  return m ? m[1].trim() : null;
}
app.get('/api/courses/:slug/summary', (req, res) => {
  const course = getCourse(req.params.slug);
  if (!course) return res.status(404).json({ error: 'Course not found.' });
  const full = isSubscribed(req.user);
  const units = course.units.map((u, ui) => ({
    title: u.title,
    lessons: u.lessons.map(([title], li) => {
      const id = `${ui + 1}-${li + 1}`;
      const open = full || isFreeLesson(id);
      const file = lessonFile(course.slug, id);
      const md = open && fs.existsSync(file) ? takeaways(fs.readFileSync(file, 'utf8')) : null;
      return { id, title, locked: !open, takeaways: md };
    }),
  }));
  res.json({ course: { slug: course.slug, code: course.code, title: course.title }, locked: !full, units });
});

// ── Quizzes & exams ───────────────────────────────────
interface AttemptSummary { course_slug: string; assessment_id: string; best: number; attempts: number }
async function attemptSummaries(userId: number, course?: string) {
  return db.all<AttemptSummary>(
    `SELECT course_slug, assessment_id, MAX(percent) AS best, COUNT(*) AS attempts FROM assessment_attempts
     WHERE user_id = ?${course ? ' AND course_slug = ?' : ''} GROUP BY course_slug, assessment_id`,
    course ? [userId, course] : [userId],
  );
}

app.get('/api/courses/:slug/assessments/:aid', async (req, res) => {
  const course = getCourse(req.params.slug);
  const aid = req.params.aid;
  const a = course && loadAssessment(course, aid);
  if (!course || !a) return res.status(404).json({ error: 'Assessment not found.' });
  const meta = {
    course: { slug: course.slug, code: course.code, title: course.title },
    id: aid, kind: aid === 'final' ? 'final' : 'unit', title: assessmentTitle(course, aid),
    questionCount: a.questions.length, passPercent: PASS_PERCENT,
  };
  if (!isSubscribed(req.user)) return res.status(req.user ? 402 : 401).json({ ...meta, locked: true, error: 'Subscribe to take quizzes and exams.' });
  const mine = (await attemptSummaries(req.user!.id, course.slug)).find((r) => r.assessment_id === aid);
  res.json({ ...meta, locked: false, intro: a.intro, questions: a.questions.map(publicQuestion), best: mine ? Number(mine.best) : null, attempts: mine ? Number(mine.attempts) : 0 });
});

app.post('/api/courses/:slug/assessments/:aid/submit', requireAuth, async (req, res) => {
  const course = getCourse(String(req.params.slug));
  const aid = String(req.params.aid);
  const a = course && loadAssessment(course, aid);
  if (!course || !a) return res.status(404).json({ error: 'Assessment not found.' });
  if (!isSubscribed(req.user)) return res.status(402).json({ error: 'Subscribe to take quizzes and exams.' });
  const answers = Array.isArray(req.body?.answers) ? req.body.answers.slice(0, a.questions.length).map((v: unknown) => (typeof v === 'number' || typeof v === 'string' ? (typeof v === 'string' ? v.slice(0, 60) : v) : null)) : [];
  const result = grade(a.questions, answers);
  await db.run(
    'INSERT INTO assessment_attempts (user_id, course_slug, assessment_id, score, total, percent, answers, created_at) VALUES (?,?,?,?,?,?,?,?)',
    [req.user!.id, course.slug, aid, result.score, result.total, result.percent, JSON.stringify(answers), now()],
  );
  const mine = (await attemptSummaries(req.user!.id, course.slug)).find((r) => r.assessment_id === aid);
  res.json({ ...result, best: Number(mine?.best ?? result.percent), attempts: Number(mine?.attempts ?? 1) });
});

// ── Mistakes review ───────────────────────────────────
// Every question missed on a student's latest attempt of each quiz/exam, until they answer it
// correctly here (or get it right on a later attempt).
async function mistakesFor(userId: number) {
  const attempts = await db.all<{ course_slug: string; assessment_id: string; answers: string; created_at: string }>(
    'SELECT course_slug, assessment_id, answers, created_at FROM assessment_attempts WHERE user_id = ? ORDER BY created_at ASC, id ASC', [userId]);
  const latest = new Map<string, (typeof attempts)[number]>();
  for (const a of attempts) latest.set(`${a.course_slug}/${a.assessment_id}`, a);
  const cleared = await db.all<{ course_slug: string; assessment_id: string; q_index: number; cleared_at: string }>(
    'SELECT course_slug, assessment_id, q_index, cleared_at FROM review_cleared WHERE user_id = ?', [userId]);
  const clearedAt = new Map(cleared.map((c) => [`${c.course_slug}/${c.assessment_id}/${c.q_index}`, c.cleared_at]));
  const items: {
    course: { slug: string; code: string; title: string }; assessmentId: string; assessmentTitle: string;
    index: number; missedAt: string; question: ReturnType<typeof publicQuestion>;
  }[] = [];
  for (const a of latest.values()) {
    const course = getCourse(a.course_slug);
    const quiz = course && loadAssessment(course, a.assessment_id);
    if (!course || !quiz) continue;
    let answers: unknown[] = [];
    try { answers = JSON.parse(a.answers); } catch { /* treat as blank */ }
    quiz.questions.forEach((q, i) => {
      if (isCorrect(q, answers[i] ?? null)) return;
      const c = clearedAt.get(`${a.course_slug}/${a.assessment_id}/${i}`);
      if (c && c >= a.created_at) return;
      items.push({
        course: { slug: course.slug, code: course.code, title: course.title },
        assessmentId: a.assessment_id, assessmentTitle: assessmentTitle(course, a.assessment_id),
        index: i, missedAt: a.created_at, question: publicQuestion(q),
      });
    });
  }
  return items;
}

app.get('/api/review', requireAuth, async (req, res) => {
  if (!isSubscribed(req.user)) return res.status(402).json({ error: 'Subscribe to take quizzes and review your mistakes.' });
  const items = await mistakesFor(req.user!.id);
  res.json({ items, total: items.length });
});

app.post('/api/review/check', requireAuth, async (req, res) => {
  if (!isSubscribed(req.user)) return res.status(402).json({ error: 'Subscribe to take quizzes and review your mistakes.' });
  const course = getCourse(str(req.body?.course, 100));
  const aid = str(req.body?.assessment, 20);
  const quiz = course && loadAssessment(course, aid);
  const index = Number(req.body?.index);
  const q = quiz && Number.isInteger(index) ? quiz.questions[index] : undefined;
  if (!course || !q) return res.status(404).json({ error: 'Question not found.' });
  const reveal = req.body?.reveal === true;
  const answer = typeof req.body?.answer === 'number' ? req.body.answer : str(req.body?.answer, 60);
  const correct = !reveal && isCorrect(q, answer);
  if (correct) {
    await db.run(
      'INSERT INTO review_cleared (user_id, course_slug, assessment_id, q_index, cleared_at) VALUES (?,?,?,?,?) ON CONFLICT (user_id, course_slug, assessment_id, q_index) DO UPDATE SET cleared_at = excluded.cleared_at',
      [req.user!.id, course.slug, aid, index, now()]);
  }
  const solution = grade([q], [null]).results[0];
  // The solution is shown after a correct answer, or when the student asks to see it.
  res.json(correct || reveal ? { correct, answer: solution.answer, explanation: solution.explanation } : { correct: false });
});

// ── Progress ──────────────────────────────────────────
/**
 * A unit is "mastered" when every lesson in it is marked complete and its unit quiz (if the
 * unit has one) has been passed.
 */
function masteredUnits(rows: { course_slug: string; lesson_id: string }[], attempts: { course_slug: string; assessment_id: string; best: number }[]) {
  const done = new Set(rows.map((r) => `${r.course_slug}/${r.lesson_id}`));
  const out: { course_slug: string; unit: number }[] = [];
  for (const c of COURSES) {
    if (!rows.some((r) => r.course_slug === c.slug)) continue;
    c.units.forEach((u, ui) => {
      const unit = ui + 1;
      if (!u.lessons.every((_, li) => done.has(`${c.slug}/${unit}-${li + 1}`))) return;
      const quizId = `unit-${unit}`;
      if (assessmentsByCourse.get(c.slug)?.[quizId]) {
        const best = attempts.find((a) => a.course_slug === c.slug && a.assessment_id === quizId)?.best ?? 0;
        if (best < PASS_PERCENT) return;
      }
      out.push({ course_slug: c.slug, unit });
    });
  }
  return out;
}

app.get('/api/progress', requireAuth, async (req, res) => {
  const rows = await db.all<{ course_slug: string; lesson_id: string; completed_at: string }>('SELECT course_slug, lesson_id, completed_at FROM progress WHERE user_id=? ORDER BY completed_at DESC', [req.user!.id]);
  const assessments = (await attemptSummaries(req.user!.id)).map((r) => ({ ...r, best: Number(r.best), attempts: Number(r.attempts) }));
  res.json({ completed: rows, assessments, mastered: masteredUnits(rows, assessments) });
});

app.post('/api/progress', requireAuth, async (req, res) => {
  const { course, lesson, completed } = req.body ?? {};
  const c = typeof course === 'string' ? getCourse(course) : undefined;
  if (!c || typeof lesson !== 'string' || !lessonExists(c, lesson)) return res.status(400).json({ error: 'Unknown lesson.' });
  if (completed === false) await db.run('DELETE FROM progress WHERE user_id=? AND course_slug=? AND lesson_id=?', [req.user!.id, c.slug, lesson]);
  else await db.run('INSERT INTO progress (user_id, course_slug, lesson_id, completed_at) VALUES (?,?,?,?) ON CONFLICT DO NOTHING', [req.user!.id, c.slug, lesson, now()]);
  res.json({ ok: true });
});

app.use('/api/billing', billingRouter);
app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));

// ── Serve the built client in production ──────────────
app.get('/robots.txt', (_req, res) => res.type('text/plain').send(robotsTxt(APP_URL)));
app.get('/sitemap.xml', (_req, res) => res.type('application/xml').send(sitemapXml(APP_URL, [...notesByCourse].filter(([, u]) => u.includes(1)).map(([slug]) => `/courses/${slug}/notes/1`))));
if (fs.existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST, { index: false, maxAge: '1h' }));
  // Every page is the same app, but the head tags (title, description, link previews) and the
  // HTTP status are filled in per route so search engines and shared links see the right page.
  const renderHtml = htmlRenderer(path.join(CLIENT_DIST, 'index.html'), APP_URL);
  app.get(/.*/, (req, res) => {
    const { status, html } = renderHtml(req.path);
    res.status(status).type('html').set('Cache-Control', 'no-cache').send(html);
  });
}

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on our end. Please try again.' });
});

const port = Number(process.env.PORT || 8787);
await migrate();
app.listen(port, () => console.log(`Ohmentum on http://localhost:${port} (db: ${db.kind}, billing: ${billingMode}, ${written.size} lessons written)`));
