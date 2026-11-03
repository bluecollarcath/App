// Transactional email via Resend's HTTP API (https://resend.com).
// Without RESEND_API_KEY, emails are printed to the server log instead of sent, so that
// password reset and support forms can be tested locally.

const API_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.EMAIL_FROM || 'Phasorly <no-reply@example.com>';
export const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || '';
export const emailConfigured = !!API_KEY;

if (!API_KEY && process.env.NODE_ENV === 'production') {
  console.warn('[email] RESEND_API_KEY is not set — password reset and support emails will NOT be delivered.');
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
  const subject = 'Reset your Phasorly password';
  const text = `Hi ${name},

Someone asked to reset the password for your Phasorly account. To choose a new password, open this link within 1 hour:

${link}

If you didn't ask for this, you can ignore this email. Your password won't change.

— Phasorly`;
  const html = `<div style="font-family:system-ui,sans-serif;max-width:520px;color:#0f172a;line-height:1.6">
<p>Hi ${escapeHtml(name)},</p>
<p>Someone asked to reset the password for your Phasorly account. To choose a new password, use the button below within 1 hour.</p>
<p><a href="${escapeHtml(link)}" style="display:inline-block;background:#0f172a;color:#fff;padding:10px 18px;border-radius:10px;text-decoration:none;font-weight:600">Choose a new password</a></p>
<p style="font-size:13px;color:#64748b">Or paste this link into your browser:<br>${escapeHtml(link)}</p>
<p>If you didn't ask for this, you can ignore this email. Your password won't change.</p>
<p>— Phasorly</p></div>`;
  return { subject, text, html };
}

export function passwordChangedEmail(name: string): Pick<Mail, 'subject' | 'text'> {
  return {
    subject: 'Your Phasorly password was changed',
    text: `Hi ${name},

The password for your Phasorly account was just changed, and you were signed out on your other devices.

If you didn't do this, reset your password right away from the sign-in page and contact us.

— Phasorly`,
  };
}
