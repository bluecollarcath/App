// In-browser stand-in for the Ohmentum server, used only by the preview build (VITE_PREVIEW=1).
// Mirrors server/src/index.ts. Accounts, subscription and progress live in this browser only.
import { COURSES, STAGES, getCourse, isFreeLesson, lessonExists, totalLessons, type CourseDef } from '../../../server/src/catalog';
import { grade, parseAssessment, PASS_PERCENT, publicQuestion } from '../../../server/src/quizParse';

const files = import.meta.glob('../../../server/content/lessons/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const lessons: Record<string, string> = {};
for (const [p, text] of Object.entries(files)) {
  const m = /lessons\/([^/]+)\/([^/]+)\.md$/.exec(p);
  if (m) lessons[`${m[1]}/${m[2]}`] = text;
}

const noteFiles = import.meta.glob('../../../server/content/notes/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const notes: Record<string, string> = {};
for (const [p, text] of Object.entries(noteFiles)) {
  const m = /notes\/([^/]+)\/unit-(\d+)\.md$/.exec(p);
  if (m) notes[`${m[1]}/${m[2]}`] = text;
}
const notesFor = (c: CourseDef) => c.units.map((_, i) => i + 1).filter((n) => notes[`${c.slug}/${n}`]);

const assessFiles = import.meta.glob('../../../server/content/assessments/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const assessments: Record<string, ReturnType<typeof parseAssessment>> = {};
for (const [p, text] of Object.entries(assessFiles)) {
  const m = /assessments\/([^/]+)\/([^/]+)\.md$/.exec(p);
  if (m) assessments[`${m[1]}/${m[2]}`] = parseAssessment(text);
}
function assessmentIndex(c: CourseDef) {
  const out: Record<string, number> = {};
  for (const id of [...c.units.map((_, i) => `unit-${i + 1}`), 'final']) if (assessments[`${c.slug}/${id}`]) out[id] = assessments[`${c.slug}/${id}`].questions.length;
  return out;
}
const assessmentTitle = (c: CourseDef, id: string) => (id === 'final' ? `${c.code} Final Exam` : `Unit ${id.slice(5)} Quiz: ${c.units[Number(id.slice(5)) - 1]?.title ?? ''}`);

interface MockUser { id: number; email: string; name: string; password: string; plan: string | null; status: string | null; periodEnd: number | null; progress: { course_slug: string; lesson_id: string; completed_at: string }[]; attempts?: { course_slug: string; assessment_id: string; percent: number }[] }
interface Store { users: MockUser[] }

const KEY = 'ohmentum.preview';
let memory: Store = { users: [] };
function load(): Store { try { const s = localStorage.getItem(KEY); if (s) memory = JSON.parse(s); } catch { /* use memory */ } return memory; }
function save(s: Store) { memory = s; try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* memory only */ } }

class MockError extends Error { constructor(public status: number, message: string, public body: unknown = { error: message }) { super(message); } }

const pub = (u: MockUser) => ({ id: u.id, email: u.email, name: u.name, subscribed: u.status === 'active', plan: u.plan, status: u.status, periodEnd: u.periodEnd, hasBillingAccount: !!u.plan });

function summary(slug: string) {
  const c = getCourse(slug)!;
  return { slug: c.slug, code: c.code, title: c.title, stage: c.stage, track: c.track, hours: c.hours, description: c.description, prereqs: c.prereqs, lessonCount: totalLessons(c), unitCount: c.units.length };
}

export async function mockApi(path: string, method: string, body: Record<string, unknown> | undefined, token: string | null): Promise<unknown> {
  const store = load();
  const user = token ? store.users.find((u) => String(u.id) === token) : undefined;
  const need = () => { if (!user) throw new MockError(401, 'Please sign in.'); return user; };
  const url = new URL(path, 'http://x');
  const p = url.pathname;
  let m: RegExpExecArray | null;

  if (p === '/auth/signup') {
    const email = String(body?.email ?? '').trim(); const password = String(body?.password ?? '');
    if (!/^\S+@\S+\.\S+$/.test(email)) throw new MockError(400, 'Enter a valid email.');
    if (password.length < 8) throw new MockError(400, 'Password must be at least 8 characters.');
    if (body?.acceptTerms !== true) throw new MockError(400, 'Please accept the Terms of Service and Privacy Policy.');
    if (store.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) throw new MockError(409, 'An account with that email already exists.');
    const u: MockUser = { id: Date.now(), email, name: String(body?.name ?? '').trim() || email.split('@')[0], password, plan: null, status: null, periodEnd: null, progress: [] };
    store.users.push(u); save(store);
    return { token: String(u.id), user: pub(u) };
  }
  if (p === '/auth/login') {
    const u = store.users.find((x) => x.email.toLowerCase() === String(body?.email ?? '').trim().toLowerCase() && x.password === body?.password);
    if (!u) throw new MockError(401, 'Incorrect email or password.');
    return { token: String(u.id), user: pub(u) };
  }
  if (p === '/auth/forgot') {
    if (!/^\S+@\S+\.\S+$/.test(String(body?.email ?? ''))) throw new MockError(400, 'Enter a valid email address.');
    return { ok: true }; // The preview has no email; the real site sends a reset link.
  }
  if (p === '/auth/reset') throw new MockError(400, 'Password reset links are emailed by the live site, so they are not available in this preview.');
  if (p === '/account/password') {
    const u = need();
    if (body?.current !== u.password) throw new MockError(401, 'Your current password is incorrect.');
    if (String(body?.next ?? '').length < 8) throw new MockError(400, 'Password must be at least 8 characters.');
    u.password = String(body?.next); save(store);
    return { token: String(u.id), user: pub(u) };
  }
  if (p === '/account/delete') {
    const u = need();
    if (body?.password !== u.password) throw new MockError(401, 'That password is incorrect.');
    store.users = store.users.filter((x) => x.id !== u.id); save(store);
    return { ok: true };
  }
  if (p === '/config') {
    const claimed = store.users.filter((u) => u.plan?.startsWith('founding-')).length;
    return { supportEmail: null, billingMode: 'demo', founding: { active: true, limit: 500, remaining: Math.max(0, 500 - claimed) } };
  }
  if (p === '/contact') {
    if (!String(body?.name ?? '').trim()) throw new MockError(400, 'Please enter your name.');
    if (String(body?.message ?? '').trim().length < 10) throw new MockError(400, 'Please write a little more about how we can help (at least 10 characters).');
    return { ok: true };
  }
  if (p === '/reports') {
    if (String(body?.message ?? '').trim().length < 5) throw new MockError(400, 'Please describe the problem (at least 5 characters).');
    return { ok: true };
  }
  if (p === '/me') return { user: pub(need()), billingMode: 'demo' };
  if (p === '/catalog') {
    return { stages: STAGES, courses: COURSES.map((c) => summary(c.slug)), totals: { courses: COURSES.length, lessons: COURSES.reduce((n, c) => n + totalLessons(c), 0), hours: COURSES.reduce((n, c) => n + c.hours, 0) } };
  }
  if ((m = /^\/courses\/([^/]+)$/.exec(p))) {
    const c = getCourse(m[1]); if (!c) throw new MockError(404, 'Course not found.');
    return { ...summary(c.slug), outcomes: c.outcomes, assessments: assessmentIndex(c), notes: notesFor(c), units: c.units.map((u, ui) => ({ title: u.title, lessons: u.lessons.map(([title, topics], li) => { const id = `${ui + 1}-${li + 1}`; return { id, title, topics: topics.split(';').map((t) => t.trim()), free: isFreeLesson(id), written: !!lessons[`${c.slug}/${id}`] }; }) })) };
  }
  if ((m = /^\/courses\/([^/]+)\/lessons\/([^/]+)$/.exec(p))) {
    const c = getCourse(m[1]); const found = c && lessonExists(c, m[2]);
    if (!c || !found) throw new MockError(404, 'Lesson not found.');
    const id = m[2];
    const flat = c.units.flatMap((u, ui) => u.lessons.map((l, li) => ({ id: `${ui + 1}-${li + 1}`, title: l[0] })));
    const idx = flat.findIndex((l) => l.id === id);
    const meta = { course: { slug: c.slug, code: c.code, title: c.title }, id, unitTitle: found.unit.title, title: found.lesson[0], topics: found.lesson[1].split(';').map((t) => t.trim()), prev: flat[idx - 1] ?? null, next: flat[idx + 1] ?? null, free: isFreeLesson(id) };
    if (!isFreeLesson(id) && user?.status !== 'active') { const b = { ...meta, locked: true, error: 'Subscribe to unlock this lesson.' }; throw new MockError(user ? 402 : 401, b.error, b); }
    return { ...meta, locked: false, markdown: lessons[`${c.slug}/${id}`] ?? null };
  }
  if ((m = /^\/courses\/([^/]+)\/notes\/(\d+)$/.exec(p))) {
    const c = getCourse(m[1]); const unit = Number(m[2]); const have = c ? notesFor(c) : [];
    if (!c || !have.includes(unit)) throw new MockError(404, 'Study sheet not found.');
    const u = c.units[unit - 1];
    const meta = { course: { slug: c.slug, code: c.code, title: c.title }, unit, unitTitle: u.title, free: unit === 1,
      lessons: u.lessons.map(([title], li) => ({ id: `${unit}-${li + 1}`, title })), hasQuiz: !!assessments[`${c.slug}/unit-${unit}`],
      prevUnit: have.includes(unit - 1) ? unit - 1 : null, nextUnit: have.includes(unit + 1) ? unit + 1 : null };
    if (unit !== 1 && user?.status !== 'active') { const b = { ...meta, locked: true, error: 'Subscribe to unlock every study sheet.' }; throw new MockError(user ? 402 : 401, b.error, b); }
    return { ...meta, locked: false, markdown: notes[`${c.slug}/${unit}`] };
  }
  if ((m = /^\/courses\/([^/]+)\/assessments\/([^/]+)(\/submit)?$/.exec(p))) {
    const c = getCourse(m[1]); const a = c && assessments[`${c.slug}/${m[2]}`];
    if (!c || !a) throw new MockError(404, 'Assessment not found.');
    const id = m[2];
    const summarize = (u: MockUser) => { const mine = (u.attempts ?? []).filter((x) => x.course_slug === c.slug && x.assessment_id === id); return { best: mine.length ? Math.max(...mine.map((x) => x.percent)) : null, attempts: mine.length }; };
    const meta = { course: { slug: c.slug, code: c.code, title: c.title }, id, kind: id === 'final' ? 'final' : 'unit', title: assessmentTitle(c, id), questionCount: a.questions.length, passPercent: PASS_PERCENT };
    if (user?.status !== 'active') { const b = { ...meta, locked: true, error: 'Subscribe to take quizzes and exams.' }; throw new MockError(user ? 402 : 401, b.error, b); }
    if (!m[3]) return { ...meta, locked: false, intro: a.intro, questions: a.questions.map(publicQuestion), ...summarize(user) };
    const result = grade(a.questions, Array.isArray(body?.answers) ? body!.answers as unknown[] : []);
    (user.attempts ??= []).push({ course_slug: c.slug, assessment_id: id, percent: result.percent }); save(store);
    const s = summarize(user);
    return { ...result, best: s.best, attempts: s.attempts };
  }
  if (p === '/progress' && method === 'GET') {
    const u = need();
    const groups = new Map<string, { course_slug: string; assessment_id: string; best: number; attempts: number }>();
    for (const x of u.attempts ?? []) {
      const k = `${x.course_slug}/${x.assessment_id}`; const g = groups.get(k) ?? { course_slug: x.course_slug, assessment_id: x.assessment_id, best: 0, attempts: 0 };
      g.best = Math.max(g.best, x.percent); g.attempts++; groups.set(k, g);
    }
    return { completed: [...u.progress].reverse(), assessments: [...groups.values()] };
  }
  if (p === '/progress') {
    const u = need(); const { course, lesson, completed } = body ?? {};
    u.progress = u.progress.filter((r) => !(r.course_slug === course && r.lesson_id === lesson));
    if (completed !== false) u.progress.push({ course_slug: String(course), lesson_id: String(lesson), completed_at: new Date().toISOString() });
    save(store); return { ok: true };
  }
  if (p === '/billing/checkout') {
    const u = need(); const interval = body?.plan === 'annual' ? 'annual' : 'monthly';
    const plan = `founding-${interval}`;
    u.plan = plan; u.status = 'active'; u.periodEnd = Math.floor(Date.now() / 1000) + (interval === 'annual' ? 365 : 30) * 86400;
    save(store); return { url: '/account?checkout=success&demo=1' };
  }
  if (p === '/billing/portal') { const u = need(); u.status = 'canceled'; save(store); return { url: '/account?demo_cancel=1' }; }
  throw new MockError(404, 'Not found');
}
