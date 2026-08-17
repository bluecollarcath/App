import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { randomUUID } from 'node:crypto'
import bcrypt from 'bcryptjs'
import { db } from './db.js'
import { signToken, requireAuth, type AuthedRequest } from './auth.js'
import { applyRevenueCatEvent, getLocalSubscription, verifyWebhookAuth } from './revenuecat.js'

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT ?? 8787

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/auth/signup', async (req, res) => {
  const { email, password } = req.body ?? {}
  if (typeof email !== 'string' || typeof password !== 'string' || password.length < 8) {
    res.status(400).json({ error: 'Email and a password of at least 8 characters are required.' })
    return
  }
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase())
  if (existing) {
    res.status(409).json({ error: 'An account with that email already exists.' })
    return
  }
  const id = randomUUID()
  const passwordHash = await bcrypt.hash(password, 10)
  db.prepare('INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)').run(id, email.toLowerCase(), passwordHash)
  res.status(201).json({ token: signToken(id), user: { id, email: email.toLowerCase() } })
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body ?? {}
  if (typeof email !== 'string' || typeof password !== 'string') {
    res.status(400).json({ error: 'Email and password are required.' })
    return
  }
  const user = db
    .prepare('SELECT id, email, password_hash as passwordHash FROM users WHERE email = ?')
    .get(email.toLowerCase()) as { id: string; email: string; passwordHash: string } | undefined
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    res.status(401).json({ error: 'Invalid email or password.' })
    return
  }
  res.json({ token: signToken(user.id), user: { id: user.id, email: user.email } })
})

app.get('/api/me', requireAuth, (req: AuthedRequest, res) => {
  const user = db.prepare('SELECT id, email FROM users WHERE id = ?').get(req.userId)
  if (!user) {
    res.status(404).json({ error: 'User not found' })
    return
  }
  res.json({ user, subscription: getLocalSubscription(req.userId!) })
})

app.get('/api/subscription/status', requireAuth, (req: AuthedRequest, res) => {
  res.json(getLocalSubscription(req.userId!))
})

// RevenueCat calls this after every entitlement change (purchase, renewal,
// cancellation, expiration...). Configure the same URL + secret in the
// RevenueCat dashboard under Project Settings -> Integrations -> Webhooks.
app.post('/api/revenuecat/webhook', (req, res) => {
  if (!verifyWebhookAuth(req)) {
    res.status(401).json({ error: 'Invalid webhook signature' })
    return
  }
  const event = req.body?.event
  if (!event?.app_user_id || !event?.type) {
    res.status(400).json({ error: 'Malformed webhook payload' })
    return
  }
  applyRevenueCatEvent(event)
  res.status(200).json({ received: true })
})

app.listen(PORT, () => {
  console.log(`Emmaus API listening on :${PORT}`)
})
