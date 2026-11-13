// Displayed prices and the auto-renewal consent wording, shared by the server and the website
// (the client imports this file), so the consent we record always matches what was shown.
// Keep the prices in sync with the Stripe prices (STRIPE_PRICE_* settings).

export const PLANS = {
  monthly: { label: 'Monthly', price: 29, per: 'month', note: 'Cancel anytime' },
  annual: { label: 'Annual', price: 249, per: 'year', note: 'About $20.75/month, save 28%' },
} as const;

/** Founding Member prices. Keep these in sync with the founding prices in Stripe. */
export const FOUNDING_PLANS = {
  monthly: { label: 'Founding Monthly', price: 15, per: 'month', note: 'Half the regular price, locked in' },
  annual: { label: 'Founding Annual', price: 129, per: 'year', note: 'About $10.75/month, locked in' },
} as const;

export type Interval = keyof typeof PLANS;
/** Stored plan names: "monthly", "annual", "founding-monthly", "founding-annual". */
export type PlanKey = Interval | `founding-${Interval}`;

/** Display details for a stored plan name. */
export function planDetails(plan: string | null | undefined) {
  if (!plan) return null;
  const founding = plan.startsWith('founding-');
  const interval = (founding ? plan.slice('founding-'.length) : plan) as Interval;
  const p = (founding ? FOUNDING_PLANS : PLANS)[interval];
  return p ? { ...p, interval, founding } : null;
}

/** Bump when the consent wording below changes; stored with every consent record. */
export const CONSENT_VERSION = '2026-11-13';

/**
 * The exact statement a customer agrees to (by ticking a box) before checkout. It states the
 * price, the billing frequency, that it renews until canceled, and how to cancel, as required for
 * automatic-renewal offers (ROSCA, 15 U.S.C. § 8403; Cal. Bus. & Prof. Code § 17602).
 */
export function renewalDisclosure(plan: PlanKey): string {
  const p = planDetails(plan)!;
  const founding = p.founding
    ? ' My Founding Member price stays the same while my subscription stays active; if it ends and I rejoin later, the regular price applies.'
    : '';
  return `I agree that my ${p.label} subscription renews automatically every ${p.per} at $${p.price} per ${p.per}, plus any applicable taxes, charged to my payment method until I cancel. I can cancel anytime online from my account page and keep access through the period I've paid for.${founding} I agree to the Terms of Service and Refund Policy.`;
}

/** Short reminder shown on Stripe's checkout page next to the Pay button. */
export function checkoutReminder(plan: PlanKey): string {
  const p = planDetails(plan)!;
  return `Renews automatically every ${p.per} at $${p.price}/${p.per} (plus any applicable taxes) until you cancel. Cancel anytime from your Ohmentum account page.`;
}
