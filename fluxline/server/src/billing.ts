import express, { Router } from 'express';
import Stripe from 'stripe';
import db, { publicUser, type UserRow } from './db.js';
import { requireAuth } from './auth.js';

const stripeKey = process.env.STRIPE_SECRET_KEY;
export const stripe = stripeKey ? new Stripe(stripeKey) : null;

const PRICES: Record<string, string | undefined> = {
  monthly: process.env.STRIPE_PRICE_MONTHLY,
  annual: process.env.STRIPE_PRICE_ANNUAL,
};
const APP_URL = process.env.APP_URL || 'http://localhost:5173';
const demoBilling = !stripe && process.env.ALLOW_DEMO_BILLING === 'true' && process.env.NODE_ENV !== 'production';

export const billingMode = stripe ? 'stripe' : demoBilling ? 'demo' : 'disabled';

export const billingRouter = Router();

billingRouter.post('/checkout', requireAuth, async (req, res) => {
  const user = req.user!;
  const plan = req.body?.plan === 'annual' ? 'annual' : 'monthly';

  if (billingMode === 'demo') {
    // Local development only: grant a subscription without payment.
    const end = Math.floor(Date.now() / 1000) + (plan === 'annual' ? 365 : 30) * 86400;
    db.prepare("UPDATE users SET sub_status='active', sub_plan=?, sub_period_end=? WHERE id=?").run(plan, end, user.id);
    return res.json({ url: `${APP_URL}/account?checkout=success&demo=1` });
  }
  if (!stripe) return res.status(503).json({ error: 'Billing is not configured yet.' });
  const price = PRICES[plan];
  if (!price) return res.status(503).json({ error: `No Stripe price configured for the ${plan} plan.` });

  let customer = user.stripe_customer_id;
  if (!customer) {
    const c = await stripe.customers.create({ email: user.email, name: user.name, metadata: { userId: String(user.id) } });
    customer = c.id;
    db.prepare('UPDATE users SET stripe_customer_id=? WHERE id=?').run(customer, user.id);
  }
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer,
    client_reference_id: String(user.id),
    line_items: [{ price, quantity: 1 }],
    allow_promotion_codes: true,
    subscription_data: { metadata: { userId: String(user.id), plan } },
    success_url: `${APP_URL}/account?checkout=success`,
    cancel_url: `${APP_URL}/pricing?checkout=cancelled`,
  });
  res.json({ url: session.url });
});

billingRouter.post('/portal', requireAuth, async (req, res) => {
  const user = req.user!;
  if (billingMode === 'demo') {
    db.prepare("UPDATE users SET sub_status='canceled' WHERE id=?").run(user.id);
    return res.json({ url: `${APP_URL}/account?demo_cancel=1` });
  }
  if (!stripe || !user.stripe_customer_id) return res.status(400).json({ error: 'No billing account found.' });
  const portal = await stripe.billingPortal.sessions.create({ customer: user.stripe_customer_id, return_url: `${APP_URL}/account` });
  res.json({ url: portal.url });
});

billingRouter.get('/status', requireAuth, (req, res) => {
  const fresh = db.prepare('SELECT * FROM users WHERE id=?').get(req.user!.id) as UserRow;
  res.json({ mode: billingMode, user: publicUser(fresh) });
});

function applySubscription(sub: Stripe.Subscription) {
  const customer = typeof sub.customer === 'string' ? sub.customer : sub.customer.id;
  // current_period_end lives on subscription items in recent Stripe API versions.
  const item = sub.items?.data?.[0] as (Stripe.SubscriptionItem & { current_period_end?: number }) | undefined;
  const periodEnd = item?.current_period_end ?? (sub as unknown as { current_period_end?: number }).current_period_end ?? null;
  const interval = item?.price?.recurring?.interval;
  const plan = sub.metadata?.plan || (interval === 'year' ? 'annual' : 'monthly');
  const userId = sub.metadata?.userId;
  const result = db
    .prepare('UPDATE users SET stripe_subscription_id=?, sub_status=?, sub_plan=?, sub_period_end=? WHERE stripe_customer_id=?')
    .run(sub.id, sub.status, plan, periodEnd, customer);
  if (result.changes === 0 && userId) {
    db.prepare('UPDATE users SET stripe_customer_id=?, stripe_subscription_id=?, sub_status=?, sub_plan=?, sub_period_end=? WHERE id=?')
      .run(customer, sub.id, sub.status, plan, periodEnd, Number(userId));
  }
}

/** Must be mounted with express.raw() BEFORE express.json(). */
export const stripeWebhook = [
  express.raw({ type: 'application/json' }),
  async (req: express.Request, res: express.Response) => {
    if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) return res.status(503).send('Stripe not configured');
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'] as string, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      return res.status(400).send(`Webhook signature verification failed: ${(err as Error).message}`);
    }
    switch (event.type) {
      case 'checkout.session.completed': {
        const s = event.data.object;
        if (s.subscription) {
          const sub = await stripe.subscriptions.retrieve(typeof s.subscription === 'string' ? s.subscription : s.subscription.id);
          applySubscription(sub);
        }
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        applySubscription(event.data.object);
        break;
    }
    res.json({ received: true });
  },
];
