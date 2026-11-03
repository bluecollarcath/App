# Fluxline — Electrical Engineering by Subscription

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

## Content status

The full catalog (every course, unit, lesson title, and topic list) is defined in
`server/src/catalog.ts`. **33 lessons are fully written** so far: the first lesson of every
course, eight lessons of Circuit Analysis I, and two more in Circuit Analysis II. Lessons without
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

## Deploy

```bash
cd client && npm run build
cd ../server && npm run build && NODE_ENV=production npm start
```

In production the server also serves `client/dist`, so the whole site runs as one Node process.
Set `JWT_SECRET` (required), `APP_URL`, `DATABASE_PATH` (on a persistent disk), and the Stripe
variables.
