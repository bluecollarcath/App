// Tests the Founding Member cap: spots held during checkout, concurrent claims, expiry, release,
// and former members. Run against a scratch database (never production):
//
//   cd server
//   DATABASE_URL=postgres://user:pass@localhost:5432/scratch DATABASE_SSL=false \
//   STRIPE_SECRET_KEY=sk_test_fake STRIPE_PRICE_MONTHLY=price_m STRIPE_PRICE_ANNUAL=price_a \
//   STRIPE_PRICE_FOUNDING_MONTHLY=price_fm STRIPE_PRICE_FOUNDING_ANNUAL=price_fa \
//   FOUNDING_OFFER=true FOUNDING_LIMIT=3 npx tsx scripts/founding-cap-test.ts
//
// (Leave DATABASE_URL unset to test SQLite with DATABASE_PATH=/tmp/x.sqlite instead.)

import db, { migrate, now } from '../src/db.js';
import { claimFoundingSpot, foundingStatus, releaseFoundingSpot } from '../src/billing.js';

let pass = 0, fail = 0;
const ok = (cond: unknown, msg: string, extra?: unknown) => {
  if (cond) { pass++; console.log('  ✓', msg); } else { fail++; console.log('  ✗', msg, extra ?? ''); }
};

await migrate();
const limit = Number(process.env.FOUNDING_LIMIT);
if (limit !== 3) throw new Error('Run with FOUNDING_LIMIT=3');

// Start clean: this test owns every founding row in the scratch database.
await db.run("UPDATE users SET sub_plan = NULL WHERE sub_plan LIKE 'founding-%'");
await db.run('DELETE FROM founding_reservations');

const tag = Date.now();
async function makeUser(i: number) {
  const row = await db.get<{ id: number }>(
    'INSERT INTO users (email, name, password_hash, created_at) VALUES (?,?,?,?) RETURNING id',
    [`cap${tag}-${i}@example.com`, `Cap ${i}`, 'x', now()],
  );
  return row!.id;
}
const users = await Promise.all(Array.from({ length: 12 }, (_, i) => makeUser(i)));

console.log('Status with nothing taken');
let st = await foundingStatus();
ok(st.active && st.remaining === 3, '3 spots remaining', st);

console.log('One existing founding member');
await db.run("UPDATE users SET sub_plan = 'founding-monthly', sub_status = 'active' WHERE id = ?", [users[0]]);
st = await foundingStatus();
ok(st.remaining === 2, 'members count toward the cap', st);

console.log('Ten people click "Become a founding member" at the same moment');
const results = await Promise.all(users.slice(1, 11).map((id) => claimFoundingSpot(id)));
ok(results.filter(Boolean).length === 2, 'exactly 2 of 10 get the founding price', results);
st = await foundingStatus();
ok(!st.active && st.remaining === 0, 'offer shows as full while those 2 are in checkout', st);
const winners = users.slice(1, 11).filter((_, i) => results[i]);
const losers = users.slice(1, 11).filter((_, i) => !results[i]);

console.log('Re-opening checkout keeps your spot; others still locked out');
ok(await claimFoundingSpot(winners[0]), 'a winner reopening checkout keeps the spot');
ok(!(await claimFoundingSpot(losers[0])), 'a loser still gets the regular price');

console.log('An abandoned checkout gives the spot back');
await releaseFoundingSpot(winners[1]);
st = await foundingStatus();
ok(st.active && st.remaining === 1, 'spot released', st);
ok(await claimFoundingSpot(losers[0]), 'the next person can now claim it');

console.log('Expired holds stop counting');
await db.run('UPDATE founding_reservations SET expires_at = ? WHERE user_id = ?', [Math.floor(Date.now() / 1000) - 1, losers[0]]);
st = await foundingStatus();
ok(st.remaining === 1, 'an expired hold frees its spot', st);

console.log('Completing checkout converts the hold into a membership (no double count)');
await db.run("UPDATE users SET sub_plan = 'founding-annual', sub_status = 'active' WHERE id = ?", [winners[0]]);
st = await foundingStatus();
ok(st.remaining === 1, 'member plus their leftover hold counts once', st);
await releaseFoundingSpot(winners[0]);
st = await foundingStatus();
ok(st.remaining === 1, 'still one left after the hold is cleared', st);

console.log('Former founding members rejoin at the regular price, and their spot stays taken');
await db.run("UPDATE users SET sub_status = 'canceled' WHERE id = ?", [users[0]]);
ok(!(await claimFoundingSpot(users[0])), 'a canceled founding member does not get founding again');
st = await foundingStatus();
ok(st.remaining === 1, 'their spot is not handed out again', st);

console.log('Filling the last spot');
ok(await claimFoundingSpot(users[11]), 'last spot claimed');
ok(!(await foundingStatus()).active, 'offer closes at exactly 3');

// Clean up.
await db.run('DELETE FROM founding_reservations');
for (const id of users) await db.run('DELETE FROM users WHERE id = ?', [id]);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
