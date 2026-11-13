import express, { Router } from 'express';
import Stripe from 'stripe';
import db, { findUserById, now, publicUser, type UserRow } from './db.js';
import { requireAuth } from './auth.js';
import { CONSENT_VERSION, checkoutReminder, planDetails, renewalDisclosure, type PlanKey } from './pricing.js';
import { renewalReminderEmail, sendEmail, subscriptionConfirmationEmail, yearlyReminderEmail, type PlanFacts } from './email.js';

/** Reads a setting, ignoring stray spaces and surrounding quotes pasted into the host's dashboard. */
function env(name: string): string | undefined {
  const v = process.env[name]?.trim().replace(/^(["'])(.*)\1$/, '$2').trim();
  return v ? v : undefined;
}
const flag = (name: string) => /^(true|yes|1|on)$/i.test(env(name) ?? '');

const stripeKey = env('STRIPE_SECRET_KEY');
const WEBHOOK_SECRET = env('STRIPE_WEBHOOK_SECRET');
export const stripe = stripeKey ? new Stripe(stripeKey) : null;

const PRICES: Record<string, string | undefined> = {
  monthly: env('STRIPE_PRICE_MONTHLY'),
  annual: env('STRIPE_PRICE_ANNUAL'),
};
// Founding Member pricing: discounted prices that subscribers keep for as long as they stay
// subscribed (Stripe keeps each subscription on the price it started with). Turn the offer on
// with FOUNDING_OFFER=true; optionally cap it with FOUNDING_LIMIT (number of members).
const FOUNDING_PRICES: Record<string, string | undefined> = {
  monthly: env('STRIPE_PRICE_FOUNDING_MONTHLY'),
  annual: env('STRIPE_PRICE_FOUNDING_ANNUAL'),
};
const FOUNDING_ON = flag('FOUNDING_OFFER');
const FOUNDING_LIMIT = Math.max(0, Number(env('FOUNDING_LIMIT') || 0)) || null;
export const APP_URL = env('APP_URL') || 'http://localhost:5173';
const demoBilling = !stripe && flag('ALLOW_DEMO_BILLING') && process.env.NODE_ENV !== 'production';

export const billingMode = stripe ? 'stripe' : demoBilling ? 'demo' : 'disabled';

// Startup report: which billing settings are present (names only, never values), and why the
// founding offer is on or off. Shown in the host's logs to make configuration mistakes obvious.
if (billingMode === 'stripe') {
  const missing = ['STRIPE_WEBHOOK_SECRET', 'STRIPE_PRICE_MONTHLY', 'STRIPE_PRICE_ANNUAL'].filter((n) => !env(n));
  const badPrice = ['STRIPE_PRICE_MONTHLY', 'STRIPE_PRICE_ANNUAL', 'STRIPE_PRICE_FOUNDING_MONTHLY', 'STRIPE_PRICE_FOUNDING_ANNUAL']
    .filter((n) => env(n) && !env(n)!.startsWith('price_'));
  if (missing.length) console.warn(`[billing] Missing settings: ${missing.join(', ')}`);
  if (badPrice.length) console.warn(`[billing] These should be Stripe price IDs starting with "price_": ${badPrice.join(', ')}`);
  if (!stripeKey!.startsWith('sk_')) console.warn('[billing] STRIPE_SECRET_KEY should start with "sk_" (use the Secret key, not the publishable key).');
  console.log(`[billing] Stripe ${stripeKey!.startsWith('sk_live_') ? 'LIVE' : 'TEST'} mode.`);
}
if (billingMode !== 'disabled') {
  const fMissing = ['STRIPE_PRICE_FOUNDING_MONTHLY', 'STRIPE_PRICE_FOUNDING_ANNUAL'].filter((n) => !env(n));
  if (!FOUNDING_ON) console.log(`[billing] Founding offer OFF (FOUNDING_OFFER is ${env('FOUNDING_OFFER') === undefined ? 'not set' : 'not "true"'}).`);
  else if (billingMode === 'stripe' && fMissing.length) console.warn(`[billing] Founding offer OFF: missing ${fMissing.join(', ')}.`);
  else console.log(`[billing] Founding offer ON${FOUNDING_LIMIT ? `, capped at ${FOUNDING_LIMIT} members` : ', no cap'}.`);
}

export const billingRouter = Router();

/** Whether new subscribers currently get founding pricing, and how many spots remain. */
export async function foundingStatus() {
  const configured = billingMode === 'demo' || (billingMode === 'stripe' && !!FOUNDING_PRICES.monthly && !!FOUNDING_PRICES.annual);
  if (!FOUNDING_ON || !configured) return { active: false, limit: null as number | null, remaining: null as number | null };
  if (!FOUNDING_LIMIT) return { active: true, limit: null, remaining: null };
  const row = await db.get<{ n: number | string }>("SELECT COUNT(*) AS n FROM users WHERE sub_plan LIKE 'founding-%'");
  const remaining = Math.max(0, FOUNDING_LIMIT - Number(row?.n ?? 0));
  return { active: remaining > 0, limit: FOUNDING_LIMIT, remaining };
}

billingRouter.post('/checkout', requireAuth, async (req, res) => {
  const user = req.user!;
  const interval = req.body?.plan === 'annual' ? 'annual' : 'monthly';
  const founding = (await foundingStatus()).active;
  const plan: PlanKey = founding ? `founding-${interval}` : interval;

  // Automatic-renewal consent: the customer must tick the box showing the exact terms for the
  // plan they're actually charged (founding or regular). The wording is recorded as proof.
  if (billingMode !== 'disabled') {
    const expected = renewalDisclosure(plan);
    if (req.body?.consent !== true) {
      return res.status(400).json({ error: 'Please tick the box to agree to the automatic-renewal terms.', disclosure: expected, plan });
    }
    if (req.body?.disclosure !== expected) {
      // Price or offer changed since the page loaded (e.g. the founding offer just filled up).
      return res.status(409).json({ error: 'The plan terms have changed. Please review them and agree again.', disclosure: expected, plan });
    }
    await db.run(
      'INSERT INTO subscription_consents (user_id, email, plan, disclosure, version, ip, user_agent, created_at) VALUES (?,?,?,?,?,?,?,?)',
      [user.id, user.email, plan, expected, CONSENT_VERSION, req.ip ?? null, String(req.headers['user-agent'] ?? '').slice(0, 400) || null, now()],
    );
  }

  if (billingMode === 'demo') {
    // Local development only: grant a subscription without payment.
    const end = Math.floor(Date.now() / 1000) + (interval === 'annual' ? 365 : 30) * 86400;
    await db.run("UPDATE users SET sub_status='active', sub_plan=?, sub_period_end=? WHERE id=?", [plan, end, user.id]);
    return res.json({ url: `${APP_URL}/account?checkout=success&demo=1` });
  }
  if (!stripe) return res.status(503).json({ error: 'Billing is not configured yet.' });
  const price = founding ? FOUNDING_PRICES[interval] : PRICES[interval];
  if (!price) return res.status(503).json({ error: `No Stripe price configured for the ${interval} plan.` });

  let customer = user.stripe_customer_id;
  if (!customer) {
    const c = await stripe.customers.create({ email: user.email, name: user.name, metadata: { userId: String(user.id) } });
    customer = c.id;
    await db.run('UPDATE users SET stripe_customer_id=? WHERE id=?', [customer, user.id]);
  }
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer,
    client_reference_id: String(user.id),
    line_items: [{ price, quantity: 1 }],
    allow_promotion_codes: true,
    subscription_data: { metadata: { userId: String(user.id), plan } },
    custom_text: { submit: { message: checkoutReminder(plan) } },
    success_url: `${APP_URL}/account?checkout=success`,
    cancel_url: `${APP_URL}/pricing?checkout=cancelled`,
  });
  res.json({ url: session.url });
});

billingRouter.post('/portal', requireAuth, async (req, res) => {
  const user = req.user!;
  if (billingMode === 'demo') {
    await db.run("UPDATE users SET sub_status='canceled' WHERE id=?", [user.id]);
    return res.json({ url: `${APP_URL}/account?demo_cancel=1` });
  }
  if (!stripe || !user.stripe_customer_id) return res.status(400).json({ error: 'No billing account found.' });
  const portal = await stripe.billingPortal.sessions.create({ customer: user.stripe_customer_id, return_url: `${APP_URL}/account` });
  res.json({ url: portal.url });
});

/** The customer's own automatic-renewal consent records. */
billingRouter.get('/consents', requireAuth, async (req, res) => {
  const rows = await db.all('SELECT plan, disclosure, version, created_at FROM subscription_consents WHERE user_id=? ORDER BY id DESC', [req.user!.id]);
  res.json({ consents: rows });
});

billingRouter.get('/status', requireAuth, async (req, res) => {
  const fresh = (await findUserById(req.user!.id)) as UserRow;
  res.json({ mode: billingMode, user: publicUser(fresh) });
});

/** Immediately cancels any live Stripe subscription (used when an account is deleted). */
export async function cancelSubscriptionNow(user: UserRow) {
  if (!stripe || !user.stripe_subscription_id) return;
  if (user.sub_status === 'canceled') return;
  try {
    await stripe.subscriptions.cancel(user.stripe_subscription_id);
  } catch (err) {
    // Already canceled or missing on Stripe's side: nothing left to stop.
    console.warn('[billing] cancel on account deletion:', (err as Error).message);
  }
}

async function applySubscription(sub: Stripe.Subscription) {
  const customer = typeof sub.customer === 'string' ? sub.customer : sub.customer.id;
  // current_period_end lives on subscription items in recent Stripe API versions.
  const item = sub.items?.data?.[0] as (Stripe.SubscriptionItem & { current_period_end?: number }) | undefined;
  const periodEnd = item?.current_period_end ?? (sub as unknown as { current_period_end?: number }).current_period_end ?? null;
  const interval = item?.price?.recurring?.interval === 'year' ? 'annual' : 'monthly';
  const isFounding = !!item?.price?.id && Object.values(FOUNDING_PRICES).includes(item.price.id);
  const plan = sub.metadata?.plan || (isFounding ? `founding-${interval}` : interval);
  const userId = sub.metadata?.userId;
  // Canceling in the Billing Portal keeps the subscription active until the period ends;
  // Stripe reports that with cancel_at_period_end (or a cancel_at timestamp).
  const cancelAtEnd = sub.status !== 'canceled' && (sub.cancel_at_period_end || !!sub.cancel_at) ? 1 : 0;
  const startedAt = sub.start_date ?? null;
  const result = await db.run(
    'UPDATE users SET stripe_subscription_id=?, sub_status=?, sub_plan=?, sub_period_end=?, sub_cancel_at_end=?, sub_started_at=? WHERE stripe_customer_id=?',
    [sub.id, sub.status, plan, periodEnd, cancelAtEnd, startedAt, customer],
  );
  if (result.changes === 0 && userId) {
    await db.run(
      'UPDATE users SET stripe_customer_id=?, stripe_subscription_id=?, sub_status=?, sub_plan=?, sub_period_end=?, sub_cancel_at_end=?, sub_started_at=? WHERE id=?',
      [customer, sub.id, sub.status, plan, periodEnd, cancelAtEnd, startedAt, Number(userId)],
    );
  }

  // Confirmation email, sent once per subscription when it first becomes active.
  if (sub.status === 'active' || sub.status === 'trialing') {
    const user = await db.get<UserRow>('SELECT * FROM users WHERE stripe_subscription_id=?', [sub.id]);
    const facts = user && planFacts(user);
    if (user && facts && (await claimNotice(sub.id, 'confirmation', 'initial', user.id))) {
      await sendEmail({ to: user.email, ...subscriptionConfirmationEmail({ ...facts, renewsOn: periodEnd }) });
    }
  }
}

function planFacts(user: UserRow): PlanFacts | null {
  const p = planDetails(user.sub_plan);
  if (!p) return null;
  return { name: user.name, label: p.label, price: p.price, per: p.per, founding: p.founding, siteUrl: APP_URL };
}

/** Records that a billing email is going out; true only the first time for this key. */
export async function claimNotice(subscriptionId: string, kind: string, key: string, userId: number) {
  const r = await db.run(
    'INSERT INTO billing_notices (subscription_id, kind, notice_key, user_id, sent_at) VALUES (?,?,?,?,?) ON CONFLICT DO NOTHING',
    [subscriptionId, kind, key, userId, now()],
  );
  return r.changes === 1;
}

const DAY = 86400;
/**
 * Renewal reminders required for automatic-renewal plans:
 * - annual plans: an email 30 days (or less, if we're late) before each renewal;
 * - monthly plans: a yearly reminder of the terms, on each anniversary of the start date.
 * Each is recorded in billing_notices so it goes out once. Runs periodically (see index.ts).
 */
export async function runBillingNotices(nowSec = Math.floor(Date.now() / 1000)) {
  const users = await db.all<UserRow>(
    "SELECT * FROM users WHERE sub_status IN ('active','trialing') AND sub_cancel_at_end = 0 AND stripe_subscription_id IS NOT NULL",
  );
  let sent = 0;
  for (const u of users) {
    const facts = planFacts(u);
    const p = planDetails(u.sub_plan);
    if (!facts || !p) continue;
    const periodEnd = u.sub_period_end == null ? null : Number(u.sub_period_end);
    if (p.interval === 'annual') {
      if (periodEnd && periodEnd > nowSec && periodEnd - nowSec <= 30 * DAY
        && (await claimNotice(u.stripe_subscription_id!, 'renewal-reminder', String(periodEnd), u.id))) {
        await sendEmail({ to: u.email, ...renewalReminderEmail({ ...facts, renewsOn: periodEnd }) });
        sent++;
      }
    } else if (u.sub_started_at) {
      const years = Math.floor((nowSec - Number(u.sub_started_at)) / (365 * DAY));
      if (years >= 1 && (await claimNotice(u.stripe_subscription_id!, 'yearly-reminder', String(years), u.id))) {
        await sendEmail({ to: u.email, ...yearlyReminderEmail({ ...facts, renewsOn: periodEnd }) });
        sent++;
      }
    }
  }
  if (sent) console.log(`[billing] Sent ${sent} renewal reminder email(s).`);
  return sent;
}

/** Must be mounted with express.raw() BEFORE express.json(). */
export const stripeWebhook = [
  express.raw({ type: 'application/json' }),
  async (req: express.Request, res: express.Response) => {
    if (!stripe || !WEBHOOK_SECRET) return res.status(503).send('Stripe not configured');
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'] as string, WEBHOOK_SECRET);
    } catch (err) {
      return res.status(400).send(`Webhook signature verification failed: ${(err as Error).message}`);
    }
    switch (event.type) {
      case 'checkout.session.completed': {
        const s = event.data.object;
        if (s.subscription) {
          const sub = await stripe.subscriptions.retrieve(typeof s.subscription === 'string' ? s.subscription : s.subscription.id);
          await applySubscription(sub);
        }
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await applySubscription(event.data.object);
        break;
    }
    res.json({ received: true });
  },
];
