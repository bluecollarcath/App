// End-to-end smoke test of the whole customer journey through the API: sign-up, free vs.
// locked lessons, Stripe webhooks (signed locally, so no Stripe account is needed), quizzes,
// progress, failed payments and cancellation, password reset, support forms, owner access
// and account deletion.
//
// Start a server with test settings (use a scratch database, never production):
//
//   cd server && npm run build
//   NODE_ENV=production PORT=8792 APP_URL=http://localhost:8792 JWT_SECRET=test \
//   DATABASE_URL=postgres://user:pass@localhost:5432/scratch DATABASE_SSL=false \
//   STRIPE_SECRET_KEY=sk_test_fakekey123 STRIPE_WEBHOOK_SECRET=whsec_testsecret \
//   STRIPE_PRICE_MONTHLY=price_m STRIPE_PRICE_ANNUAL=price_a \
//   STRIPE_PRICE_FOUNDING_MONTHLY=price_fm STRIPE_PRICE_FOUNDING_ANNUAL=price_fa \
//   FOUNDING_OFFER=true FOUNDING_LIMIT=500 OWNER_EMAILS=owner@example.com \
//   BILLING_JOB_INTERVAL_MS=10000 \
//   node dist/index.js > server.log 2>&1 &
//
// then:  LOG=server.log node scripts/smoke-test.mjs
// (Sign-up is rate limited, so restart the server between repeated runs.)
import fs from 'node:fs';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_fakekey123');
const BASE = process.env.BASE || 'http://localhost:8792';
const LOG = process.env.LOG;
let pass = 0, fail = 0;
const ok = (cond, msg, extra) => { if (cond) { pass++; console.log('  ✓', msg); } else { fail++; console.log('  ✗', msg, extra ?? ''); } };

async function api(path, { method = 'GET', body, token, raw, headers = {} } = {}) {
  const r = await fetch(BASE + path, {
    method,
    headers: { ...(body && !raw ? { 'content-type': 'application/json' } : {}), ...(token ? { authorization: `Bearer ${token}` } : {}), ...headers },
    body: raw ?? (body ? JSON.stringify(body) : undefined),
  });
  let data = null; const text = await r.text();
  try { data = JSON.parse(text); } catch { data = text; }
  return { status: r.status, data, headers: r.headers };
}
async function webhook(type, object) {
  const payload = JSON.stringify({ id: 'evt_' + Math.random().toString(36).slice(2), object: 'event', type, data: { object }, api_version: '2025-01-01', created: Math.floor(Date.now() / 1000) });
  const sig = stripe.webhooks.generateTestHeaderString({ payload, secret: 'whsec_testsecret' });
  return api('/api/stripe/webhook', { method: 'POST', raw: payload, headers: { 'content-type': 'application/json', 'stripe-signature': sig } });
}
const sub = (id, customer, status, userId, priceId, interval = 'month') => ({
  id, object: 'subscription', customer, status, metadata: userId ? { userId: String(userId) } : {},
  items: { data: [{ current_period_end: Math.floor(Date.now() / 1000) + 30 * 86400, price: { id: priceId, recurring: { interval } } }] },
});

const email = `e2e+${Date.now()}@example.com`;
const pw = 'Correct-horse-9';

console.log('Health & security');
const home = await api('/');
ok(home.status === 200 && String(home.data).includes('<div id="root">'), 'SPA served from server');
ok(!!home.headers.get('content-security-policy'), 'CSP header present');
ok(home.headers.get('x-powered-by') == null, 'x-powered-by hidden');
const cfg = await api('/api/config');
ok(cfg.data.billingMode === 'stripe' && cfg.data.founding.active && cfg.data.founding.limit === 500 && cfg.data.founding.remaining > 0, 'config: stripe mode, founding offer capped at 500', JSON.stringify(cfg.data));

console.log('Sign up');
ok((await api('/api/auth/signup', { method: 'POST', body: { email, password: pw } })).status === 400, 'signup without accepting terms rejected');
ok((await api('/api/auth/signup', { method: 'POST', body: { email, password: 'short', acceptTerms: true } })).status === 400, 'weak password rejected');
const su = await api('/api/auth/signup', { method: 'POST', body: { email, password: pw, name: 'E2E Tester', acceptTerms: true } });
ok(su.status === 200 && su.data.token, 'signup works');
let token = su.data.token; const uid = su.data.user.id;
ok((await api('/api/auth/signup', { method: 'POST', body: { email: email.toUpperCase(), password: pw, acceptTerms: true } })).status === 409, 'duplicate email (case-insensitive) rejected');

console.log('Gating (free user)');
ok((await api('/api/courses/pcb-design/lessons/1-1', { token })).status === 200, 'free lesson 1-1 readable');
const locked = await api('/api/courses/pcb-design/lessons/2-1', { token });
ok(locked.status === 402 && locked.data.locked && !locked.data.markdown, 'lesson 2-1 locked, no content leaked');
ok((await api('/api/courses/pcb-design/lessons/2-1')).status === 401, 'anonymous gets 401 on locked lesson');
ok((await api('/api/courses/circuit-analysis-1/notes/1')).data.markdown?.includes('Must-know formulas'), 'unit 1 study sheet free (even anonymous)');
const n2 = await api('/api/courses/circuit-analysis-1/notes/2', { token });
ok(n2.status === 402 && n2.data.locked && !n2.data.markdown, 'unit 2 study sheet locked for free user');
const sumFree = (await api('/api/courses/pcb-design/summary')).data;
const sumLessons = sumFree.units.flatMap((u) => u.lessons);
ok(sumFree.locked && sumLessons[0].takeaways && sumLessons.slice(1).every((l) => l.locked && !l.takeaways), 'summary notes: only the free lesson for non-subscribers');
const qa = await api('/api/courses/pcb-design/assessments/unit-1', { token });
ok(qa.status === 402 && !qa.data.questions, 'quiz locked for free user');

console.log('Checkout consent (Stripe unreachable with fake key)');
const c0 = await api('/api/billing/checkout', { method: 'POST', token, body: { plan: 'monthly' } });
ok(c0.status === 400 && /renews automatically every month at \$15 per month/.test(c0.data.disclosure ?? '') && c0.data.plan === 'founding-monthly', 'checkout without the consent box is refused, with the founding terms', JSON.stringify(c0.data).slice(0, 300));
const c1 = await api('/api/billing/checkout', { method: 'POST', token, body: { plan: 'monthly', consent: true, disclosure: 'I agree that my Monthly subscription renews automatically every month at $29 per month' } });
ok(c1.status === 409 && c1.data.disclosure === c0.data.disclosure, 'consent to different (stale) terms is refused');
ok((await api('/api/billing/consents', { token })).data.consents.length === 0, 'refused attempts record no consent');
const co = await api('/api/billing/checkout', { method: 'POST', token, body: { plan: 'monthly', consent: true, disclosure: c0.data.disclosure } });
ok(co.status >= 500 && co.status < 600 && typeof co.data === 'object', `with consent, reaches Stripe (fails cleanly with fake key: ${co.status})`, JSON.stringify(co.data).slice(0, 200));
const consents = (await api('/api/billing/consents', { token })).data.consents;
ok(consents.length === 1 && consents[0].plan === 'founding-monthly' && consents[0].disclosure === c0.data.disclosure && consents[0].version, 'consent recorded with plan, exact wording and version', JSON.stringify(consents));

console.log('Webhooks');
const bad = await api('/api/stripe/webhook', { method: 'POST', raw: '{"type":"x"}', headers: { 'content-type': 'application/json', 'stripe-signature': 't=1,v1=bad' } });
ok(bad.status === 400, 'unsigned webhook rejected');
const w1 = await webhook('customer.subscription.created', sub('sub_e2e1', 'cus_e2e1', 'active', uid, 'price_fm'));
ok(w1.status === 200, 'subscription.created accepted');
let me = (await api('/api/me', { token })).data.user;
ok(me.subscribed && me.plan === 'founding-monthly' && me.hasBillingAccount, 'user now subscribed on founding-monthly', JSON.stringify(me));
const cfg2 = await api('/api/config');
ok(cfg2.data.founding.remaining === cfg.data.founding.remaining - 1, 'founding spots decrement', JSON.stringify(cfg2.data.founding));

console.log('Subscriber access');
const l21 = await api('/api/courses/pcb-design/lessons/2-1', { token });
ok(l21.status === 200 && l21.data.markdown?.includes('What a board is made of'), 'lesson 2-1 unlocked');
ok((await api('/api/courses/circuit-analysis-1/notes/2', { token })).data.markdown?.includes('Supernode'), 'study sheet unlocked for subscriber');
const sumSub = (await api('/api/courses/pcb-design/summary', { token })).data;
ok(!sumSub.locked && sumSub.units.flatMap((u) => u.lessons).every((l) => l.takeaways && l.takeaways.length > 40), 'summary notes: every lesson for subscribers');
const quiz = await api('/api/courses/pcb-design/assessments/unit-1', { token });
ok(quiz.status === 200 && quiz.data.questions.length === 9, 'quiz served (9 questions)');
ok(!JSON.stringify(quiz.data.questions).includes('Active-low signals are asserted when low'), 'quiz explanations not leaked before submit');
const answers = [4700, 2.2, 6.17, 0.255, 80.9, 0.495, null, null, null];
// pick correct MC answers by text
quiz.data.questions.forEach((q, i) => {
  if (q.choices) {
    const want = i === 6 ? '4.5–18 V' : i === 7 ? 'running' : 'the same net';
    answers[i] = q.choices.findIndex((c) => c.includes(want));
  }
});
const sb = await api('/api/courses/pcb-design/assessments/unit-1/submit', { method: 'POST', token, body: { answers } });
ok(sb.status === 200 && sb.data.percent === 100, `quiz graded 100% (${sb.data.score}/${sb.data.total})`, JSON.stringify(sb.data).slice(0, 300));
const pqQuiz = await api('/api/courses/precalculus/assessments/unit-1', { token });
const pqAnswers = [13, -8, 14, '11/10', '3/2', 8, -3, 0.047, 6, 0.1, null, 5, 2];
pqAnswers[10] = pqQuiz.data.questions[10].choices.findIndex((c) => c.includes('6x + 9'));
const pq = await api('/api/courses/precalculus/assessments/unit-1/submit', { method: 'POST', token, body: { answers: pqAnswers } });
ok(pq.data.percent === 100 && pq.data.results[3].correct && pq.data.results[4].correct, 'fraction answers (11/10, 3/2) graded correct; precalculus quiz 100%', JSON.stringify(pq.data).slice(0, 300));
await api('/api/progress', { method: 'POST', token, body: { course: 'pcb-design', lesson: '2-1' } });
const prog = await api('/api/progress', { token });
ok(prog.data.completed.length === 1 && prog.data.assessments[0]?.best === 100, 'progress + best score recorded');

console.log('Unit mastery');
ok(!prog.data.mastered.some((m) => m.course_slug === 'pcb-design'), 'not mastered with only 1 lesson done');
for (const l of ['1-1', '1-2', '1-3']) await api('/api/progress', { method: 'POST', token, body: { course: 'pcb-design', lesson: l } });
let prog2 = await api('/api/progress', { token });
ok(prog2.data.mastered.some((m) => m.course_slug === 'pcb-design' && m.unit === 1), 'unit 1 mastered: all lessons + quiz passed');
await api('/api/progress', { method: 'POST', token, body: { course: 'pcb-design', lesson: '2-1' } });
await api('/api/progress', { method: 'POST', token, body: { course: 'pcb-design', lesson: '2-2' } });
await api('/api/progress', { method: 'POST', token, body: { course: 'pcb-design', lesson: '2-3' } });
prog2 = await api('/api/progress', { token });
ok(!prog2.data.mastered.some((m) => m.course_slug === 'pcb-design' && m.unit === 2), 'unit 2 not mastered until its quiz is passed');

console.log('Mistakes review');
ok((await api('/api/review', { token })).data.total === 0, 'no mistakes after a perfect quiz');
const wrong = [...answers]; wrong[0] = 1; wrong[2] = 99;
await api('/api/courses/pcb-design/assessments/unit-1/submit', { method: 'POST', token, body: { answers: wrong } });
let rv = await api('/api/review', { token });
ok(rv.data.total === 2 && rv.data.items.map((i) => i.index).join() === '0,2', 'two missed questions listed', JSON.stringify(rv.data).slice(0, 200));
ok(!JSON.stringify(rv.data).includes('4700'), 'review list does not leak answers');
const bad1 = await api('/api/review/check', { method: 'POST', token, body: { course: 'pcb-design', assessment: 'unit-1', index: 0, answer: 5 } });
ok(bad1.data.correct === false && bad1.data.answer === undefined, 'wrong retry: no solution leaked');
const rev = await api('/api/review/check', { method: 'POST', token, body: { course: 'pcb-design', assessment: 'unit-1', index: 0, reveal: true } });
ok(rev.data.correct === false && rev.data.answer?.startsWith('4700'), 'show solution reveals answer');
ok((await api('/api/review', { token })).data.total === 2, 'revealed question stays on the list');
const good = await api('/api/review/check', { method: 'POST', token, body: { course: 'pcb-design', assessment: 'unit-1', index: 0, answer: '4,700' } });
ok(good.data.correct === true && !!good.data.explanation, 'correct retry clears with explanation');
rv = await api('/api/review', { token });
ok(rv.data.total === 1 && rv.data.items[0].index === 2, 'cleared question leaves the list');
await new Promise((r) => setTimeout(r, 10));
await api('/api/courses/pcb-design/assessments/unit-1/submit', { method: 'POST', token, body: { answers: wrong } });
ok((await api('/api/review', { token })).data.total === 2, 'missing it again on a retake brings it back');
prog2 = await api('/api/progress', { token });
ok(prog2.data.mastered.some((m) => m.course_slug === 'pcb-design' && m.unit === 1), 'mastery uses best score, so a weaker retake keeps it');

console.log('Payment trouble & cancellation');
await webhook('customer.subscription.updated', sub('sub_e2e1', 'cus_e2e1', 'past_due', uid, 'price_fm'));
me = (await api('/api/me', { token })).data.user;
ok(me.status === 'past_due' && me.subscribed, 'past_due keeps access during payment retries');
ok((await api('/api/courses/pcb-design/lessons/2-1', { token })).status === 200, 'lesson readable while past_due');
await webhook('customer.subscription.updated', { ...sub('sub_e2e1', 'cus_e2e1', 'active', uid, 'price_fm'), cancel_at_period_end: true });
me = (await api('/api/me', { token })).data.user;
ok(me.subscribed && me.cancelAtPeriodEnd, 'portal cancel: access kept until period end, flagged');
await webhook('customer.subscription.updated', { ...sub('sub_e2e1', 'cus_e2e1', 'active', uid, 'price_fm'), cancel_at_period_end: false });
ok(!(await api('/api/me', { token })).data.user.cancelAtPeriodEnd, 'resubscribe in portal clears the flag');
await webhook('customer.subscription.updated', sub('sub_e2e1', 'cus_e2e1', 'unpaid', uid, 'price_fm'));
ok(!(await api('/api/me', { token })).data.user.subscribed, 'unpaid (retries exhausted) removes access');
await webhook('customer.subscription.deleted', sub('sub_e2e1', 'cus_e2e1', 'canceled', uid, 'price_fm'));
me = (await api('/api/me', { token })).data.user;
ok(!me.subscribed && me.status === 'canceled' && !me.cancelAtPeriodEnd, 'canceled -> access removed');
ok((await api('/api/review', { token })).status === 402, 'review needs a subscription');
ok((await api('/api/courses/pcb-design/lessons/2-1', { token })).status === 402, 'lesson locked again after cancel');

const confirmations = () => fs.readFileSync(LOG, 'utf8').split(`to=${email} subject="Your Ohmentum subscription is confirmed"`).length - 1;
ok(confirmations() === 1, 'confirmation email sent once across created/updated webhooks', `count=${confirmations()}`);
ok(/Your plan: Founding Monthly, \$15 per month[\s\S]*renews automatically every month/.test(fs.readFileSync(LOG, 'utf8')), 'confirmation states plan, price and renewal terms');

console.log('Renewal reminders');
const DAY = 86400, nowS = Math.floor(Date.now() / 1000);
const mk = async (tag) => (await api('/api/auth/signup', { method: 'POST', body: { email: `e2e+${tag}${Date.now()}@example.com`, password: pw, name: `R ${tag}`, acceptTerms: true } })).data;
const ua = await mk('annual'), um = await mk('monthly');
const annualSub = sub(`sub_a${nowS}`, `cus_a${nowS}`, 'active', ua.user.id, 'price_a', 'year');
annualSub.items.data[0].current_period_end = nowS + 20 * DAY;
annualSub.start_date = nowS - 345 * DAY;
await webhook('customer.subscription.created', annualSub);
const monthlySub = { ...sub(`sub_m${nowS}`, `cus_m${nowS}`, 'active', um.user.id, 'price_m'), start_date: nowS - 400 * DAY };
await webhook('customer.subscription.created', monthlySub);
const waitFor = async (re, ms = 20000) => { const t = Date.now(); while (Date.now() - t < ms) { if (re.test(fs.readFileSync(LOG, 'utf8'))) return true; await new Promise((r) => setTimeout(r, 500)); } return false; };
ok(await waitFor(new RegExp(`to=${ua.user.email.replace(/[+.]/g, '\\$&')} subject="Your Ohmentum subscription renews on`)), 'annual plan: reminder emailed within 30 days of renewal');
ok(await waitFor(new RegExp(`to=${um.user.email.replace(/[+.]/g, '\\$&')} subject="Your yearly Ohmentum subscription reminder"`)), 'monthly plan: yearly reminder after the first year');
await new Promise((r) => setTimeout(r, 12000)); // let the job run again
const logNow = fs.readFileSync(LOG, 'utf8');
ok(logNow.split(`to=${ua.user.email} subject="Your Ohmentum subscription renews on`).length === 2 && logNow.split(`to=${um.user.email} subject="Your yearly`).length === 2, 'reminders are not repeated on later runs');

console.log('Password reset');
ok((await api('/api/auth/forgot', { method: 'POST', body: { email: 'nobody@example.com' } })).data.ok, 'forgot for unknown email answers ok (no enumeration)');
await api('/api/auth/forgot', { method: 'POST', body: { email } });
await new Promise((r) => setTimeout(r, 500));
const log = fs.readFileSync(LOG, 'utf8');
const m = [...log.matchAll(/reset-password\?token=([0-9a-f]{64})/g)].pop();
ok(!!m, 'reset link generated (logged without Resend)');
const newPw = 'Another-horse-7';
const rs = await api('/api/auth/reset', { method: 'POST', body: { token: m?.[1], password: newPw } });
ok(rs.status === 200 && rs.data.token, 'reset works');
ok((await api('/api/me', { token })).status === 401, 'old session revoked after reset');
ok((await api('/api/auth/reset', { method: 'POST', body: { token: m?.[1], password: newPw } })).status === 400, 'reset token single-use');
token = (await api('/api/auth/login', { method: 'POST', body: { email, password: newPw } })).data.token;
ok(!!token, 'login with new password');

console.log('Support');
ok((await api('/api/contact', { method: 'POST', body: { name: 'T', email, topic: 'General question', message: 'Hello there, testing.' } })).data.ok, 'contact form');
ok((await api('/api/reports', { method: 'POST', token, body: { course: 'pcb-design', lesson: '1-1', message: 'Typo test' } })).data.ok, 'error report');

console.log('Owner access');
const ow = await api('/api/auth/signup', { method: 'POST', body: { email: `owner@example.com`, password: pw, acceptTerms: true } });
const otok = ow.data.token ?? (await api('/api/auth/login', { method: 'POST', body: { email: 'owner@example.com', password: pw } })).data.token;
ok((await api('/api/courses/vlsi-design/lessons/3-2', { token: otok })).status !== 402, 'owner reads any lesson');

console.log('Delete account');
ok((await api('/api/account/delete', { method: 'POST', token, body: { password: 'wrong' } })).status === 401, 'delete needs password');
ok((await api('/api/account/delete', { method: 'POST', token, body: { password: newPw } })).data.ok, 'account deleted');
ok((await api('/api/auth/login', { method: 'POST', body: { email, password: newPw } })).status === 401, 'deleted account cannot log in');

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
