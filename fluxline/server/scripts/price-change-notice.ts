// Emails the 30-day price-change notice promised in the Terms of Service to every active
// subscriber on a plan. Founding Members are skipped: their price is locked in.
//
// Usage (from the server folder, with DATABASE_URL, RESEND_API_KEY, EMAIL_FROM and APP_URL set
// to the production values, e.g. in server/.env):
//   npx tsx scripts/price-change-notice.ts --plan monthly --new-price 35 --effective 2027-06-01
//     -> dry run: lists who would be emailed
//   ... --send
//     -> sends the emails (each subscriber is emailed once per plan and date, even if re-run)
//
// Do this BEFORE changing the price in Stripe, and change the price shown on the site
// (server/src/pricing.ts) on the effective date. The effective date must be at least 30 days away.

import 'dotenv/config';
import db, { migrate, type UserRow } from '../src/db.js';
import { PLANS, type Interval } from '../src/pricing.js';
import { priceChangeEmail, sendEmail } from '../src/email.js';
import { APP_URL, claimNotice } from '../src/billing.js';

function arg(name: string) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

const plan = arg('plan') as Interval | undefined;
const newPrice = Number(arg('new-price'));
const effective = arg('effective') ?? '';
const send = process.argv.includes('--send');

if (!plan || !(plan in PLANS)) throw new Error('--plan must be "monthly" or "annual"');
if (!(newPrice > 0)) throw new Error('--new-price must be a positive number, e.g. 35');
const effDate = new Date(`${effective}T00:00:00Z`);
if (!/^\d{4}-\d{2}-\d{2}$/.test(effective) || isNaN(effDate.getTime())) throw new Error('--effective must be a date like 2027-06-01');
const daysAway = (effDate.getTime() - Date.now()) / 86400_000;
if (daysAway < 30) throw new Error(`The effective date is only ${Math.floor(daysAway)} days away; the Terms promise at least 30 days' notice.`);

await migrate();
const p = PLANS[plan];
const effectiveText = effDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
const users = await db.all<UserRow>(
  "SELECT * FROM users WHERE sub_plan = ? AND sub_status IN ('active','trialing','past_due') AND stripe_subscription_id IS NOT NULL",
  [plan],
);
console.log(`${users.length} active ${p.label} subscriber(s); $${p.price} -> $${newPrice} per ${p.per}, effective ${effectiveText}.`);
let sent = 0;
for (const u of users) {
  if (!send) { console.log(`  would email ${u.email}`); continue; }
  if (!(await claimNotice(u.stripe_subscription_id!, 'price-change', `${plan}:${effective}`, u.id))) { console.log(`  already notified ${u.email}`); continue; }
  await sendEmail({
    to: u.email,
    ...priceChangeEmail({ name: u.name, label: p.label, price: p.price, per: p.per, founding: false, siteUrl: APP_URL, newPrice, effective: effectiveText }),
  });
  console.log(`  emailed ${u.email}`);
  sent++;
}
console.log(send ? `Done: ${sent} email(s) sent.` : 'Dry run only. Add --send to email them.');
process.exit(0);
