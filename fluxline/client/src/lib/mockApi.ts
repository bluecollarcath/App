// In-browser stand-in for the Fluxline server, used only by the preview build (VITE_PREVIEW=1).
// Mirrors server/src/index.ts. Accounts, subscription and progress live in this browser only.
import { COURSES, STAGES, getCourse, isFreeLesson, lessonExists, totalLessons } from '../../../server/src/catalog';

const files = import.meta.glob('../../../server/content/lessons/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const lessons: Record<string, string> = {};
for (const [p, text] of Object.entries(files)) {
  const m = /lessons\/([^/]+)\/([^/]+)\.md$/.exec(p);
  if (m) lessons[`${m[1]}/${m[2]}`] = text;
}

interface MockUser { id: number; email: string; name: string; password: string; plan: string | null; status: string | null; periodEnd: number | null; progress: { course_slug: string; lesson_id: string; completed_at: string }[] }
interface Store { users: MockUser[] }

const KEY = 'fluxline.preview';
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
  if (p === '/me') return { user: pub(need()), billingMode: 'demo' };
  if (p === '/catalog') {
    return { stages: STAGES, courses: COURSES.map((c) => summary(c.slug)), totals: { courses: COURSES.length, lessons: COURSES.reduce((n, c) => n + totalLessons(c), 0), hours: COURSES.reduce((n, c) => n + c.hours, 0) } };
  }
  if ((m = /^\/courses\/([^/]+)$/.exec(p))) {
    const c = getCourse(m[1]); if (!c) throw new MockError(404, 'Course not found.');
    return { ...summary(c.slug), outcomes: c.outcomes, units: c.units.map((u, ui) => ({ title: u.title, lessons: u.lessons.map(([title, topics], li) => { const id = `${ui + 1}-${li + 1}`; return { id, title, topics: topics.split(';').map((t) => t.trim()), free: isFreeLesson(id), written: !!lessons[`${c.slug}/${id}`] }; }) })) };
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
  if (p === '/progress' && method === 'GET') return { completed: [...need().progress].reverse() };
  if (p === '/progress') {
    const u = need(); const { course, lesson, completed } = body ?? {};
    u.progress = u.progress.filter((r) => !(r.course_slug === course && r.lesson_id === lesson));
    if (completed !== false) u.progress.push({ course_slug: String(course), lesson_id: String(lesson), completed_at: new Date().toISOString() });
    save(store); return { ok: true };
  }
  if (p === '/billing/checkout') {
    const u = need(); const plan = body?.plan === 'annual' ? 'annual' : 'monthly';
    u.plan = plan; u.status = 'active'; u.periodEnd = Math.floor(Date.now() / 1000) + (plan === 'annual' ? 365 : 30) * 86400;
    save(store); return { url: '/account?checkout=success&demo=1' };
  }
  if (p === '/billing/portal') { const u = need(); u.status = 'canceled'; save(store); return { url: '/account?demo_cancel=1' }; }
  throw new MockError(404, 'Not found');
}
