import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { SITE } from '../lib/site';
import { PLANS } from '../lib/api';
import { useTitle } from '../lib/hooks';

function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  useTitle(title);
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold text-copper-dark">Legal</p>
      <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-ink">{title}</h1>
      <p className="mt-3 text-sm text-slate-500">Effective {SITE.legalEffectiveDate}</p>
      <nav className="mt-6 flex flex-wrap gap-2 text-sm">
        {[['/terms', 'Terms of Service'], ['/privacy', 'Privacy Policy'], ['/refunds', 'Refund Policy']].map(([to, label]) => (
          <Link key={to} to={to} className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600 hover:bg-slate-200">{label}</Link>
        ))}
      </nav>
      <div className="legal mt-10">{children}</div>
    </div>
  );
}

const contact = <Link to="/contact">contact page</Link>;
const who = SITE.legalName === SITE.name ? SITE.name : `${SITE.legalName} ("${SITE.name}")`;

export function Terms() {
  return (
    <LegalPage title="Terms of Service">
      <p>These Terms of Service ("Terms") are an agreement between you and {who}, which runs this website and the learning service on it (the "Service"). By creating an account or using the Service, you agree to these Terms. If you don't agree, please don't use the Service.</p>

      <h2>1. Who can use Fluxline</h2>
      <p>You must be at least 13 years old to create an account. If you are under 18, you may use the Service only with the involvement and consent of a parent or guardian, who agrees to these Terms on your behalf. Paid subscriptions must be purchased by an adult.</p>

      <h2>2. Your account</h2>
      <p>Give accurate information when you sign up and keep your password secure. You are responsible for activity on your account. Accounts are for one person: don't share your login or let others use your subscription. Tell us through our {contact} if you think someone else has accessed your account.</p>

      <h2>3. Subscriptions and billing</h2>
      <ul>
        <li><strong>Plans.</strong> We offer a free tier and paid subscriptions, currently ${PLANS.monthly.price} per month or ${PLANS.annual.price} per year. Prices shown at checkout are the prices you pay, plus any applicable taxes.</li>
        <li><strong>Automatic renewal.</strong> Paid subscriptions renew automatically at the end of each billing period, and your payment method is charged, until you cancel.</li>
        <li><strong>Cancelling.</strong> You can cancel at any time from your account page. Cancellation stops future renewals; you keep access until the end of the period you've already paid for.</li>
        <li><strong>Price changes.</strong> If we change the price of your plan, we'll tell you by email at least 30 days before the new price applies to your next renewal. You can cancel before then.</li>
        <li><strong>Payment processing.</strong> Payments are processed by Stripe. We never see or store your full card number.</li>
        <li><strong>Refunds</strong> are covered by our <Link to="/refunds">Refund Policy</Link>.</li>
      </ul>

      <h2>4. Your license to the content</h2>
      <p>All lessons, problems, solutions, text, graphics, and software on the Service are owned by {SITE.legalName} or its licensors and are protected by copyright. While your account is in good standing, we grant you a personal, non-transferable, non-exclusive license to access and use the content for your own, non-commercial learning. You may not copy, redistribute, resell, publish, or scrape the content, post solutions publicly, or use it to train machine-learning models, without our written permission. Short quotations for study notes or discussion are fine.</p>

      <h2>5. Educational purpose and safety</h2>
      <ul>
        <li><strong>Not an accredited institution.</strong> {SITE.name} is an independent learning platform. Completing our courses does not earn academic credit, a degree, or a professional license, and we make no promise that it will satisfy any school's, employer's, or licensing board's requirements.</li>
        <li><strong>Not professional engineering advice.</strong> The content is for education. Don't rely on it as a substitute for the judgment of a licensed professional engineer, applicable codes and standards, or manufacturer documentation when designing, building, or certifying real systems.</li>
        <li><strong>Electrical safety.</strong> Electricity can cause serious injury, death, and fire. Any hands-on work you choose to do, including following lab or project instructions, is at your own risk. Never work on mains-voltage, high-energy, or utility equipment without proper training, supervision, and protective equipment, and follow all local laws and codes.</li>
        <li><strong>Accuracy.</strong> We work hard to make lessons correct, but errors can happen. If you spot one, please use the "Report an error" button on the lesson.</li>
      </ul>

      <h2>6. Acceptable use</h2>
      <p>Don't misuse the Service. For example, don't try to access content or accounts you aren't entitled to, interfere with the site's security or operation, overload it with automated requests, or use it to break the law or harass others.</p>

      <h2>7. Ending your use</h2>
      <p>You can stop using the Service and delete your account at any time from your account page. We may suspend or end your access if you seriously or repeatedly break these Terms, and if we do so without good cause we'll refund any unused prepaid portion of your subscription. We may also change or discontinue parts of the Service; if we discontinue the paid Service entirely, we'll refund any unused prepaid portion.</p>

      <h2>8. Disclaimers</h2>
      <p>The Service is provided "as is" and "as available." To the fullest extent permitted by law, we disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement, and we don't guarantee the Service will be uninterrupted or error-free.</p>

      <h2>9. Limitation of liability</h2>
      <p>To the fullest extent permitted by law, {SITE.legalName} will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for lost profits, data, or goodwill, arising from your use of the Service. Our total liability for any claim relating to the Service is limited to the amount you paid us in the 12 months before the claim arose. Some jurisdictions don't allow these limitations, so they may not apply to you; nothing in these Terms limits rights you have under consumer protection law that cannot be waived.</p>

      <h2>10. Changes to these Terms</h2>
      <p>We may update these Terms. If a change is material, we'll notify you by email or on the site before it takes effect. Continuing to use the Service after the change takes effect means you accept the updated Terms.</p>

      <h2>11. Governing law</h2>
      <p>{SITE.governingLaw
        ? <>These Terms are governed by the laws of {SITE.governingLaw}, without regard to its conflict-of-laws rules.</>
        : <>These Terms are governed by the laws of the jurisdiction in which {SITE.legalName} is established, without regard to its conflict-of-laws rules.</>} This doesn't take away any protection you have under the mandatory consumer laws of the place you live.</p>

      <h2>12. Contact</h2>
      <p>Questions about these Terms? Reach us through our {contact}.</p>
    </LegalPage>
  );
}

export function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <p>This policy explains what personal information {who} collects when you use this website, how we use it, and the choices you have. We collect only what we need to run the Service, and we don't sell your personal information.</p>

      <h2>Information we collect</h2>
      <ul>
        <li><strong>Account information:</strong> your name, email address, and password. Passwords are stored only as a secure one-way hash; we can't see them.</li>
        <li><strong>Learning activity:</strong> the lessons you mark complete, so we can show your progress.</li>
        <li><strong>Subscription information:</strong> your plan, its status, and renewal date. Payments are handled by Stripe, which collects your card details directly. We receive only a customer reference and subscription status, never your full card number.</li>
        <li><strong>Messages you send us:</strong> contact-form messages and lesson error reports, including the email address you give us.</li>
        <li><strong>Technical information:</strong> like most websites, our servers process your IP address and basic request details. We use these to keep the Service secure, for example to block repeated failed sign-in attempts, and to diagnose problems.</li>
      </ul>

      <h2>Cookies and browser storage</h2>
      <p>We store a sign-in token in your browser's local storage so you stay signed in. We don't use advertising cookies or third-party tracking.</p>

      <h2>How we use information</h2>
      <ul>
        <li>To provide the Service: your account, lessons, progress, and subscription.</li>
        <li>To send service emails, such as password resets, security notices, and billing-related messages.</li>
        <li>To answer your questions and fix errors you report.</li>
        <li>To protect the Service and our users from fraud and abuse.</li>
        <li>To meet legal, tax, and accounting obligations.</li>
      </ul>

      <h2>Who we share it with</h2>
      <p>We share personal information only with service providers that help us run the Service, and only as needed for them to do so:</p>
      <ul>
        <li><strong>Stripe</strong> processes payments and subscriptions.</li>
        <li><strong>Our hosting provider</strong> runs the website and database.</li>
        <li><strong>Our email provider</strong> delivers service emails.</li>
      </ul>
      <p>We may also disclose information if required by law, or to protect the rights and safety of our users or others. If {SITE.name} is involved in a merger or sale, your information may be transferred as part of that transaction, under this policy's protections.</p>

      <h2>How long we keep it</h2>
      <p>We keep your account information while your account exists. When you delete your account, we delete your profile and learning progress right away and detach your identity from any error reports you sent. We keep records of payments and support conversations for as long as needed for legal, tax, and accounting purposes.</p>

      <h2>Your choices and rights</h2>
      <ul>
        <li><strong>Access and correction:</strong> see your details on your account page, or ask us for a copy of the information we hold about you.</li>
        <li><strong>Deletion:</strong> delete your account at any time from your account page.</li>
        <li><strong>Email:</strong> we send only service emails. You can't opt out of security and billing notices while you have an account, but we won't send marketing email without your consent.</li>
      </ul>
      <p>Depending on where you live (for example, in the EU, UK, or California), you may have additional rights, such as objecting to certain processing or lodging a complaint with a regulator. To make any request, use our {contact}. We'll respond within 30 days.</p>

      <h2>Security</h2>
      <p>We use encrypted connections (HTTPS), hashed passwords, rate limiting on sign-in, and access controls to protect your information. No system is perfectly secure, so please use a unique password for your account.</p>

      <h2>Children</h2>
      <p>The Service isn't directed to children under 13, and we don't knowingly collect their personal information. If you believe a child under 13 has created an account, contact us and we'll delete it.</p>

      <h2>Changes to this policy</h2>
      <p>If we make material changes, we'll notify you by email or on the site before they take effect.</p>

      <h2>Contact</h2>
      <p>Questions or requests about your privacy? Reach us through our {contact}.{SITE.postalAddress && <> Our mailing address is {SITE.postalAddress}.</>}</p>
    </LegalPage>
  );
}

export function Refunds() {
  const days = SITE.refundWindowDays;
  return (
    <LegalPage title="Refund Policy">
      <p>We want you to be confident subscribing, so you can try the first lesson of every course for free before you pay.</p>

      <h2>{days}-day refund on your first payment</h2>
      <p>If you're not satisfied, contact us within {days} days of your first payment for a plan, monthly or annual, and we'll refund that payment in full. No explanation needed. This applies once per customer.</p>

      <h2>Renewals</h2>
      <p>Subscriptions renew automatically. Renewal payments aren't refundable, except where required by law or described below, so be sure to cancel before your renewal date if you don't want to continue. We'll email you a reminder before an annual plan renews.</p>

      <h2>Cancelling</h2>
      <p>You can cancel anytime from your <Link to="/account">account page</Link>. You'll keep full access until the end of the period you've paid for, and you won't be charged again.</p>

      <h2>Exceptions</h2>
      <ul>
        <li>If you were charged in error, such as a duplicate charge, we'll refund it.</li>
        <li>If we end your access without good cause, or discontinue the paid Service, we'll refund the unused part of any prepaid period.</li>
        <li>Where the law where you live gives you a right to cancel or to a refund, such as a statutory cooling-off period, that right applies in addition to this policy.</li>
      </ul>

      <h2>How to request a refund</h2>
      <p>Send us a message through our {contact} using the "Billing &amp; subscription" topic, from the email address on your account. Approved refunds go back to your original payment method, usually within 5–10 business days. Once a refund is issued, the subscription it paid for ends.</p>
    </LegalPage>
  );
}
