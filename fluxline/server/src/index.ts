import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import db, { isSubscribed, publicUser, type UserRow } from './db.js';
import { optionalAuth, requireAuth, signToken } from './auth.js';
import { billingMode, billingRouter, stripeWebhook } from './billing.js';
import { COURSES, STAGES, getCourse, isFreeLesson, lessonExists, totalLessons } from './catalog.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.resolve(here, '../content/lessons');
const CLIENT_DIST = path.resolve(here, '../../client/dist');

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
    units: c.units.map((u, ui) => ({
      title: u.title,
      lessons: u.lessons.map(([title, topics], li) => {
        const id = `${ui + 1}-${li + 1}`;
        return { id, title, topics: topics.split(';').map((t) => t.trim()), free: isFreeLesson(id), written: written.has(`${c.slug}/${id}`) };
      }),
    })),
  };
}

const app = express();
app.use(cors({ origin: process.env.APP_URL || true }));
app.post('/api/stripe/webhook', ...stripeWebhook);
app.use(express.json({ limit: '100kb' }));
app.use(optionalAuth);

// ── Auth ──────────────────────────────────────────────
app.post('/api/auth/signup', async (req, res) => {
  const { email, password, name } = req.body ?? {};
  if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: 'Enter a valid email.' });
  if (typeof password !== 'string' || password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters.' });
  const displayName = typeof name === 'string' && name.trim() ? name.trim().slice(0, 80) : email.split('@')[0];
  if (db.prepare('SELECT 1 FROM users WHERE email=?').get(email)) return res.status(409).json({ error: 'An account with that email already exists.' });
  const hash = await bcrypt.hash(password, 11);
  const info = db.prepare('INSERT INTO users (email, name, password_hash) VALUES (?,?,?)').run(email.trim(), displayName, hash);
  const user = db.prepare('SELECT * FROM users WHERE id=?').get(info.lastInsertRowid) as UserRow;
  res.json({ token: signToken(user.id), user: publicUser(user) });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body ?? {};
  const user = db.prepare('SELECT * FROM users WHERE email=?').get(String(email ?? '').trim()) as UserRow | undefined;
  if (!user || !(await bcrypt.compare(String(password ?? ''), user.password_hash))) return res.status(401).json({ error: 'Incorrect email or password.' });
  res.json({ token: signToken(user.id), user: publicUser(user) });
});

app.get('/api/me', requireAuth, (req, res) => res.json({ user: publicUser(req.user!), billingMode }));

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

// ── Progress ──────────────────────────────────────────
app.get('/api/progress', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT course_slug, lesson_id, completed_at FROM progress WHERE user_id=? ORDER BY completed_at DESC').all(req.user!.id);
  res.json({ completed: rows });
});

app.post('/api/progress', requireAuth, (req, res) => {
  const { course, lesson, completed } = req.body ?? {};
  const c = typeof course === 'string' ? getCourse(course) : undefined;
  if (!c || typeof lesson !== 'string' || !lessonExists(c, lesson)) return res.status(400).json({ error: 'Unknown lesson.' });
  if (completed === false) db.prepare('DELETE FROM progress WHERE user_id=? AND course_slug=? AND lesson_id=?').run(req.user!.id, c.slug, lesson);
  else db.prepare('INSERT OR IGNORE INTO progress (user_id, course_slug, lesson_id) VALUES (?,?,?)').run(req.user!.id, c.slug, lesson);
  res.json({ ok: true });
});

app.use('/api/billing', billingRouter);
app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));

// ── Serve the built client in production ──────────────
if (fs.existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST, { index: false, maxAge: '1h' }));
  app.get(/.*/, (_req, res) => res.sendFile(path.join(CLIENT_DIST, 'index.html')));
}

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong. Please try again.' });
});

const port = Number(process.env.PORT || 8787);
app.listen(port, () => console.log(`Fluxline API on http://localhost:${port} (billing: ${billingMode}, ${written.size} lessons written)`));
