// Transactional email via Resend's HTTP API (https://resend.com).
// Without RESEND_API_KEY, emails are printed to the server log instead of sent, so that
// password reset and support forms can be tested locally.

// Trim stray spaces/quotes pasted into the host's settings page.
const env = (n: string) => process.env[n]?.trim().replace(/^(["'])(.*)\1$/, '$2').trim() || undefined;
const API_KEY = env('RESEND_API_KEY');
const FROM = env('EMAIL_FROM') || 'Ohmentum <no-reply@example.com>';
export const SUPPORT_EMAIL = env('SUPPORT_EMAIL') || '';
export const emailConfigured = !!API_KEY;

if (!API_KEY && process.env.NODE_ENV === 'production') {
  console.warn('[email] RESEND_API_KEY is not set — password reset and support emails will NOT be delivered.');
} else if (API_KEY) {
  if (!env('EMAIL_FROM')) console.warn('[email] EMAIL_FROM is not set; emails will be rejected. Use e.g. Ohmentum <no-reply@yourdomain.com>.');
  if (!SUPPORT_EMAIL) console.warn('[email] SUPPORT_EMAIL is not set; contact-form messages and error reports will only be saved, not emailed.');
  console.log(`[email] Sending as ${FROM}${SUPPORT_EMAIL ? '; support messages go to the SUPPORT_EMAIL inbox' : ''}.`);
}

export interface Mail {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}

export async function sendEmail(mail: Mail): Promise<boolean> {
  if (!API_KEY) {
    console.log(`[email:not-sent] to=${mail.to} subject="${mail.subject}"\n${mail.text}\n`);
    return false;
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [mail.to],
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
      reply_to: mail.replyTo,
    }),
  });
  if (!res.ok) {
    console.error(`[email] Resend rejected message to ${mail.to}: ${res.status} ${await res.text().catch(() => '')}`);
    return false;
  }
  return true;
}

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export function resetEmail(name: string, link: string): Pick<Mail, 'subject' | 'text' | 'html'> {
  const subject = 'Reset your Ohmentum password';
  const text = `Hi ${name},

Someone asked to reset the password for your Ohmentum account. To choose a new password, open this link within 1 hour:

${link}

If you didn't ask for this, you can ignore this email. Your password won't change.

— Ohmentum`;
  const html = `<div style="font-family:system-ui,sans-serif;max-width:520px;color:#0f172a;line-height:1.6">
<p>Hi ${escapeHtml(name)},</p>
<p>Someone asked to reset the password for your Ohmentum account. To choose a new password, use the button below within 1 hour.</p>
<p><a href="${escapeHtml(link)}" style="display:inline-block;background:#0f172a;color:#fff;padding:10px 18px;border-radius:10px;text-decoration:none;font-weight:600">Choose a new password</a></p>
<p style="font-size:13px;color:#64748b">Or paste this link into your browser:<br>${escapeHtml(link)}</p>
<p>If you didn't ask for this, you can ignore this email. Your password won't change.</p>
<p>— Ohmentum</p></div>`;
  return { subject, text, html };
}

export function passwordChangedEmail(name: string): Pick<Mail, 'subject' | 'text'> {
  return {
    subject: 'Your Ohmentum password was changed',
    text: `Hi ${name},

The password for your Ohmentum account was just changed, and you were signed out on your other devices.

If you didn't do this, reset your password right away from the sign-in page and contact us.

— Ohmentum`,
  };
}

// ── Subscription emails (automatic-renewal notices) ────────────────────
// Each states the plan, price, billing frequency, that it renews until canceled, and how to cancel.

export interface PlanFacts { name: string; label: string; price: number; per: string; founding: boolean; siteUrl: string }
const fmtDate = (unixSeconds: number) =>
  new Date(unixSeconds * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
const cancelHow = (siteUrl: string) =>
  `To cancel, sign in and open your account page (${siteUrl}/account), then choose "Manage billing or cancel". It takes a few clicks, and you keep access until the end of the period you've paid for.`;

export function subscriptionConfirmationEmail(f: PlanFacts & { renewsOn: number | null }): Pick<Mail, 'subject' | 'text'> {
  return {
    subject: 'Your Ohmentum subscription is confirmed',
    text: `Hi ${f.name},

Thanks for subscribing to Ohmentum. Every course, quiz, exam and study sheet is now unlocked.

Your plan: ${f.label}, $${f.price} per ${f.per}, plus any applicable taxes.${f.founding ? '\nFounding Member price: it stays the same as long as your subscription stays active.' : ''}

Automatic renewal: your subscription renews automatically every ${f.per}, and your payment method is charged $${f.price} each time, until you cancel.${f.renewsOn ? ` Your next renewal is on ${fmtDate(f.renewsOn)}.` : ''}

${cancelHow(f.siteUrl)}

Refunds: if you're not satisfied, contact us within 14 days of your first payment for a full refund. Details: ${f.siteUrl}/refunds

— Ohmentum`,
  };
}

export function renewalReminderEmail(f: PlanFacts & { renewsOn: number }): Pick<Mail, 'subject' | 'text'> {
  return {
    subject: `Your Ohmentum subscription renews on ${fmtDate(f.renewsOn)}`,
    text: `Hi ${f.name},

This is a reminder that your ${f.label} Ohmentum subscription renews automatically on ${fmtDate(f.renewsOn)}. On that date your payment method will be charged $${f.price} (plus any applicable taxes) for another ${f.per}, and it will keep renewing every ${f.per} until you cancel.

To keep learning, you don't need to do anything.

${cancelHow(f.siteUrl)}

— Ohmentum`,
  };
}

export function yearlyReminderEmail(f: PlanFacts & { renewsOn: number | null }): Pick<Mail, 'subject' | 'text'> {
  return {
    subject: 'Your yearly Ohmentum subscription reminder',
    text: `Hi ${f.name},

Once a year we remind every subscriber of their plan's terms.

Your plan: ${f.label}, $${f.price} per ${f.per}, plus any applicable taxes. It renews automatically every ${f.per} until you cancel.${f.renewsOn ? ` Your next renewal is on ${fmtDate(f.renewsOn)}.` : ''}

${cancelHow(f.siteUrl)}

— Ohmentum`,
  };
}

export function priceChangeEmail(f: PlanFacts & { newPrice: number; effective: string }): Pick<Mail, 'subject' | 'text'> {
  return {
    subject: 'A change to your Ohmentum subscription price',
    text: `Hi ${f.name},

We're letting you know at least 30 days ahead: the price of the ${f.label} plan is changing from $${f.price} to $${f.newPrice} per ${f.per}. The new price applies starting with your first renewal on or after ${f.effective}. Until then, nothing changes.

If you'd rather not continue at the new price, you can cancel before then. ${cancelHow(f.siteUrl)}

— Ohmentum`,
  };
}
