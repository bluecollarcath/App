import type { Request } from 'express'
import { db } from './db.js'

const RC_SECRET_KEY = process.env.REVENUECAT_SECRET_KEY
const RC_WEBHOOK_SECRET = process.env.REVENUECAT_WEBHOOK_SECRET
const PREMIUM_ENTITLEMENT = process.env.REVENUECAT_ENTITLEMENT_ID ?? 'premium'

export function verifyWebhookAuth(req: Request): boolean {
  if (!RC_WEBHOOK_SECRET) return true // allow through in local dev if unset
  const header = req.headers.authorization
  return header === `Bearer ${RC_WEBHOOK_SECRET}`
}

type RevenueCatEvent = {
  type: string
  app_user_id: string
  entitlement_ids?: string[]
  expiration_at_ms?: number | null
}

const ACTIVATING_EVENTS = new Set([
  'INITIAL_PURCHASE',
  'RENEWAL',
  'PRODUCT_CHANGE',
  'UNCANCELLATION',
  'NON_RENEWING_PURCHASE',
  'TRANSFER',
])
const DEACTIVATING_EVENTS = new Set(['EXPIRATION'])

const upsertSubscription = db.prepare(`
  INSERT INTO subscriptions (user_id, premium, entitlement, expires_at, updated_at)
  VALUES (@userId, @premium, @entitlement, @expiresAt, datetime('now'))
  ON CONFLICT(user_id) DO UPDATE SET
    premium = excluded.premium,
    entitlement = excluded.entitlement,
    expires_at = excluded.expires_at,
    updated_at = excluded.updated_at
`)

export function applyRevenueCatEvent(event: RevenueCatEvent) {
  const hasPremiumEntitlement = !event.entitlement_ids || event.entitlement_ids.includes(PREMIUM_ENTITLEMENT)
  if (!hasPremiumEntitlement) return

  if (ACTIVATING_EVENTS.has(event.type)) {
    upsertSubscription.run({
      userId: event.app_user_id,
      premium: 1,
      entitlement: PREMIUM_ENTITLEMENT,
      expiresAt: event.expiration_at_ms ? new Date(event.expiration_at_ms).toISOString() : null,
    })
  } else if (DEACTIVATING_EVENTS.has(event.type)) {
    upsertSubscription.run({
      userId: event.app_user_id,
      premium: 0,
      entitlement: PREMIUM_ENTITLEMENT,
      expiresAt: event.expiration_at_ms ? new Date(event.expiration_at_ms).toISOString() : null,
    })
  }
  // CANCELLATION only turns off auto-renew; the entitlement stays active until expiration, so no change here.
}

export async function fetchSubscriberFromRevenueCat(appUserId: string) {
  if (!RC_SECRET_KEY) return null
  const res = await fetch(`https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(appUserId)}`, {
    headers: { Authorization: `Bearer ${RC_SECRET_KEY}` },
  })
  if (!res.ok) return null
  const data = (await res.json()) as {
    subscriber: { entitlements: Record<string, { expires_date: string | null }> }
  }
  const entitlement = data.subscriber.entitlements[PREMIUM_ENTITLEMENT]
  if (!entitlement) return { premium: false, expiresAt: null }
  const active = !entitlement.expires_date || new Date(entitlement.expires_date) > new Date()
  return { premium: active, expiresAt: entitlement.expires_date }
}

export function getLocalSubscription(userId: string) {
  const row = db
    .prepare('SELECT premium, expires_at as expiresAt FROM subscriptions WHERE user_id = ?')
    .get(userId) as { premium: number; expiresAt: string | null } | undefined
  return { premium: Boolean(row?.premium), expiresAt: row?.expiresAt ?? null }
}
