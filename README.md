# Emmaus — Catholic Prayer Companion

A subscription-based Catholic prayer app, built as an installable iPhone PWA (Progressive Web App) —
no App Store review, no Mac/Xcode required to ship it, and it installs to the Home Screen like a
native app.

## Features

- **Prayers** — Sign of the Cross, Our Father, Hail Mary, Rosary prayers, Acts of Faith/Hope/Love,
  the Angelus, Chaplet of Divine Mercy, and more, organized by category.
- **The Holy Rosary** — all four mystery sets (Joyful, Sorrowful, Glorious, Luminous) with
  reflections and the fruit of each mystery, defaulting to the correct set for today.
- **Daily Readings** — a public-domain verse of the day and an original daily reflection, with a
  direct link to the USCCB's official Mass readings for the date (the Lectionary text itself is
  copyrighted, so the app links out rather than reproducing it).
- **Saint of the Day** — a curated liturgical calendar of ~150 saints and feast days, plus a
  date-accurate liturgical season indicator (Advent, Christmas, Lent, Triduum, Easter, Ordinary
  Time) computed from the real date of Easter each year.
- **Examination of Conscience** — a Ten Commandments-based examination and a virtue-based
  examination, plus step-by-step guidance for the Sacrament of Confession.
- **Accounts & subscriptions** — email/password accounts, with premium entitlements managed by
  **RevenueCat** (Web Billing).

Free tier covers the essentials (Rosary, core prayers, the Ten Commandments examination, today's
saint and reading). Premium unlocks the extended prayer library, the readings/saints archive for
any date, and the virtue-based examination.

## Project structure

```
client/   React + TypeScript + Tailwind CSS v4 PWA (Vite)
server/   Node + Express + TypeScript API (auth + RevenueCat webhook)
```

## Tech stack

- **Client**: React 19, React Router, Tailwind CSS v4, `vite-plugin-pwa` (installable, offline
  caching via Workbox), `@revenuecat/purchases-js` for Web Billing checkout.
- **Server**: Express, `better-sqlite3` (zero-ops embedded DB), JWT auth, RevenueCat REST API +
  webhooks.

## Local development

### 1. Server

```bash
cd server
npm install
cp .env.example .env   # fill in JWT_SECRET at minimum for local dev
npm run dev             # http://localhost:8787
```

### 2. Client

```bash
cd client
npm install
npm run dev              # http://localhost:5173, proxies /api to :8787
```

Open `http://localhost:5173` — Vite's dev server proxies `/api/*` requests to the Express server.

## Setting up RevenueCat

The app treats [RevenueCat](https://www.revenuecat.com/) as the source of truth for
subscriptions, using its **Web Billing** product so purchases work directly in the browser/PWA
(no App Store needed). The same RevenueCat project can later drive a native iPhone build (e.g. via
Capacitor) using the iOS SDK and StoreKit, sharing the same entitlement and app-user-id.

1. Create a RevenueCat project, add a **Web Billing** app, and connect a Stripe account (RevenueCat
   uses Stripe as the payment processor under the hood for Web Billing, but you never touch the
   Stripe API directly — RevenueCat is the integration surface).
2. Create an entitlement called `premium` (or set `REVENUECAT_ENTITLEMENT_ID` to match a different
   name).
3. Create one or more products/packages (e.g. monthly, annual) and add them to your app's
   **Current** offering.
4. Copy the **Web Billing public API key** into the client env as `VITE_REVENUECAT_API_KEY`.
5. Copy the **Secret API key** into the server env as `REVENUECAT_SECRET_KEY` (optional — only
   needed if you want the server to double-check status directly against RevenueCat's REST API).
6. Under **Project Settings → Integrations → Webhooks**, add a webhook pointing to
   `https://your-server/api/revenuecat/webhook`, and set an Authorization header value. Put that
   same value in the server's `REVENUECAT_WEBHOOK_SECRET`.

The client identifies each customer to RevenueCat using our own account's user id as the RevenueCat
`app_user_id`, so entitlements stay attached to the user's Emmaus account rather than a device.

### Environment variables

**`client/.env`**
```
VITE_REVENUECAT_API_KEY=rcb_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**`server/.env`** — see `server/.env.example` for the full list (`JWT_SECRET`,
`REVENUECAT_SECRET_KEY`, `REVENUECAT_WEBHOOK_SECRET`, `REVENUECAT_ENTITLEMENT_ID`,
`DATABASE_PATH`).

Without `VITE_REVENUECAT_API_KEY` set, the app still runs fully — the Account screen just shows a
notice that subscriptions aren't configured yet, and all free content works normally.

## Installing on an iPhone

1. Deploy `client` (static build via `npm run build` → `client/dist`) to any static host (Vercel,
   Netlify, Cloudflare Pages, etc.) served over HTTPS, and deploy `server` to any Node host
   (Render, Fly.io, Railway, etc.).
2. Open the deployed URL in Safari on the iPhone.
3. Tap the Share icon → **Add to Home Screen**.
4. The app now launches full-screen from the Home Screen with its own icon, exactly like a native
   app, and works offline for previously visited screens thanks to the service worker.

## Notes on content

- Scripture verses used in the Daily Reflection are drawn from the public-domain Douay-Rheims
  translation. The app links out to USCCB.org for the Church's official (copyrighted) Lectionary
  text rather than reproducing it.
- The saints/liturgical calendar dataset (`client/src/data/saints.ts`) covers the major feasts of
  the General Roman Calendar; dates without an entry fall back to an "Ordinary Time" message rather
  than showing incorrect information.
