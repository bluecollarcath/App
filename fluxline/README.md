# Ohmentum — Electrical Engineering by Subscription

A subscription learning website that teaches a complete, college-level electrical engineering
curriculum, sequenced like an ABET-accredited B.S.E.E. degree.

- **24 courses · 248 lessons · 4 stages · 7 tracks**: Foundations (calculus, linear algebra,
  differential equations, E&M physics, programming), Core I (Circuits I & II, digital logic,
  signals & systems), Core II (microelectronics I & II, electromagnetics, probability,
  semiconductor devices, control, embedded systems), Specialization (communications, DSP, power
  systems, power electronics, machines, RF/microwave, VLSI, senior design & FE review).
- **Lessons** are written in Markdown with LaTeX math (KaTeX), worked examples, tables, and
  **auto-graded practice problems** (numeric with tolerance, or multiple choice) with solutions.
- **Free tier**: lesson 1 of every course. **Subscribers**: everything. Enforced on the server —
  locked lesson content is never sent to the browser.
- Accounts, progress tracking, dashboard, and **Stripe** subscriptions (Checkout + Billing
  Portal + webhooks).
- **Account security**: password reset by email, change password, delete account, sign-out
  everywhere on password change, rate limits on sign-in/sign-up/reset, and security headers.
- **Owner access**: emails listed in `OWNER_EMAILS` get every lesson free (for you and staff).
- **Support & legal**: contact form, "Report an error" on every lesson (saved to the database and
  emailed to you), and Terms of Service, Privacy Policy, and Refund Policy pages.

## Content status

The full catalog (every course, unit, lesson title, and topic list) is defined in
`server/src/catalog.ts`. **116 lessons are fully written** so far, and 9 of the 24 courses are complete (each with unit quizzes and a final exam), plus the first lesson
of every other course. Lessons without
a file show their topic outline and an "in production" notice. To publish a lesson, add
`server/content/lessons/<course-slug>/<unit>-<lesson>.md` (e.g. `circuit-analysis-1/1-4.md`) —
it's picked up on the next server start.

### Practice problem format

Inside a lesson, a fenced block with the language `quiz`:

````
```quiz
? Prompt text, with $math$ allowed.
= 47 | 0.01 | A          ← numeric: answer | relative tolerance | unit
> Explanation shown after a correct answer or on "Show solution".
```

```quiz
? Multiple-choice prompt
+ correct choice
- wrong choice
- wrong choice
> Explanation.
```
````

### Unit quizzes and final exams

Each course can have a quiz per unit and a final exam:
`server/content/assessments/<course-slug>/unit-<n>.md` and `final.md`. They use the same
`quiz` block format as lesson problems, with optional intro text at the top. Unlike lesson
practice, assessments are **graded on the server**: questions are sent without answers, a
student submits once, and only then sees the score, the correct answers, and explanations.
Scores are saved (best score and attempt count are shown on the course page), 70% passes, and
quizzes are for subscribers and owner accounts. Quiz files are loaded when the server starts,
so restart (redeploy) after adding one.

### Diagrams and graphs

Lessons draw schematics and plots from short text blocks, so no image files are needed.
The complete syntax is documented at the top of `client/src/components/diagram/Circuit.tsx` and
`client/src/components/diagram/Plot.tsx`.

````
```circuit
V 0,0 0,2 "12 V" side=-1        ← source, + at the first point; label on the left
R 0,0 2,0 "R_1 = 6 Ω" i=i       ← resistor with a current arrow
R 2,0 2,2 "3 Ω" v=v_o           ← resistor with polarity marks and a voltage label
W 2,2 0,2                       ← wire
GND 1,2
caption: A divider. Captions may use $math$.
```

```plot
x: 0, 5, t/τ
y: 0, 1.1, v_C/V_s
f: 1 - exp(-x) | charging
mark: 1, 0.632, 63%
```
````

Coordinates are grid units with y pointing down. Elements: `R C L V VAC I VD ID D Z SW W GND DOT T OA
NMOS PMOS LOOP BOX SUM ARROW LINE TEXT Q CIRCLE`, logic `AND OR NAND NOR XOR XNOR NOT BUF DFF MUX`,
and `STATE` bubbles for state diagrams. Plots accept `yticks: none` and `label:` for timing diagrams. Plot formulas support `+ − * / ^`, `sin cos tan exp ln
log10 sqrt abs u (step) rect mod min max tanh`, and `pi`.

## Project layout

```
client/   React 19 + TypeScript + Tailwind v4 (Vite)
server/   Express 5 + TypeScript, SQLite (better-sqlite3), JWT auth, Stripe
  src/catalog.ts           the curriculum
  content/lessons/...      lesson Markdown
```

## Run locally

```bash
cd server && npm install && cp .env.example .env && npm run dev     # :8787
cd client && npm install && npm run dev                              # :5173 (proxies /api)
```

With `ALLOW_DEMO_BILLING=true` and no Stripe key, "Subscribe" grants access instantly with no
payment so you can try the full experience. Demo billing is always off when
`NODE_ENV=production`.

## Stripe setup

1. Create a Product with two recurring Prices (monthly and annual). Put their IDs in
   `STRIPE_PRICE_MONTHLY` / `STRIPE_PRICE_ANNUAL`, and your secret key in `STRIPE_SECRET_KEY`.
2. Add a webhook endpoint at `https://your-domain/api/stripe/webhook` for
   `checkout.session.completed` and `customer.subscription.created|updated|deleted`; put its
   signing secret in `STRIPE_WEBHOOK_SECRET`. (Locally: `stripe listen --forward-to localhost:8787/api/stripe/webhook`.)
3. Enable the Customer Portal in the Stripe dashboard (used by "Manage billing").
4. The prices displayed on the site live in `client/src/lib/api.ts` (`PLANS`: $29/mo, $249/yr) —
   keep them in sync with your Stripe prices.

## Going live on Render (checklist)

1. **Database.** In Render, choose **New → Postgres** (a paid plan; free databases are deleted after
   30 days). Open it, copy the **Internal Database URL**, and add it to your web service as
   `DATABASE_URL`. Render backs up paid databases daily. Tables are created automatically on
   first start.
2. **Required settings** on the web service (**Environment** tab): `NODE_ENV=production`,
   `JWT_SECRET` (any long random string), `APP_URL` (your site's address, e.g.
   `https://ohmentum.onrender.com`, no trailing slash).
3. **Your own free access:** `OWNER_EMAILS=you@example.com` (comma-separate several). Then
   sign up with that email right away, so nobody else can register it first.
4. **Email** (password resets, support messages): create a free account at
   [resend.com](https://resend.com), verify your domain, and set `RESEND_API_KEY`,
   `EMAIL_FROM` (e.g. `Ohmentum <no-reply@yourdomain.com>`), and `SUPPORT_EMAIL` (where
   contact messages and error reports go). Without these, reset emails are only printed to the
   server log.
5. **Legal pages:** set `VITE_LEGAL_NAME` (e.g. `Ohmentum LLC`), `VITE_GOVERNING_LAW` (e.g.
   `the State of Texas`), and optionally `VITE_POSTAL_ADDRESS`, then redeploy. Have a lawyer
   review the Terms, Privacy, and Refund pages (`client/src/pages/Legal.tsx`) before launch; the
   refund window is `refundWindowDays` in `client/src/lib/site.ts`.
6. **Stripe:** see below. Also turn on **Settings → Billing → Subscriptions and emails → Send
   reminders about upcoming renewals**, since the Refund Policy promises annual-renewal
   reminders.

## Founding Member pricing

New subscribers can get discounted "founding" prices ($15/month, $129/year) that they keep for
as long as their subscription stays active. Stripe keeps each subscription on the price it
started with, so raising regular prices later never affects founding members.

1. In Stripe, add two more recurring prices to the product: **$15/month** and **$129/year**.
2. In Render, set `STRIPE_PRICE_FOUNDING_MONTHLY` and `STRIPE_PRICE_FOUNDING_ANNUAL` to those
   price IDs, and `FOUNDING_OFFER=true`.
3. Optional: `FOUNDING_LIMIT=500` caps the offer; the pricing page shows the spots left and
   switches back to regular prices automatically when they run out.
4. To end the offer, set `FOUNDING_OFFER=false` and redeploy. Existing founding members keep
   their price.

The displayed founding prices live in `client/src/lib/api.ts` (`FOUNDING_PLANS`); keep them in
sync with Stripe. If founding prices aren't configured, the site simply shows regular pricing.

## Deploy

```bash
cd client && npm run build
cd ../server && npm run build && NODE_ENV=production npm start
```

In production the server also serves `client/dist`, so the whole site runs as one Node process.
Set `JWT_SECRET` (required), `APP_URL`, `DATABASE_PATH` (on a persistent disk), and the Stripe
variables.
