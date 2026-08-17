import { useState } from 'react'
import { Screen } from '../components/Screen'
import { useAuth } from '../lib/auth'
import { useSubscription } from '../lib/subscription'
import { ApiError } from '../lib/api'
import { CheckCircle2, LogOut, ShieldCheck } from 'lucide-react'
import type { Package } from '@revenuecat/purchases-js'

function AuthForms() {
  const { login, signup } = useAuth()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      if (mode === 'login') await login(email, password)
      else await signup(email, password)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <div className="mb-5 flex gap-2">
        <button
          onClick={() => setMode('login')}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
            mode === 'login' ? 'bg-terracotta text-cream' : 'bg-parchment text-ink-soft'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setMode('signup')}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
            mode === 'signup' ? 'bg-terracotta text-cream' : 'bg-parchment text-ink-soft'
          }`}
        >
          Create Account
        </button>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-3 rounded-2xl border border-line bg-cream p-4">
        <label className="text-sm font-medium text-ink">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink"
          />
        </label>
        <label className="text-sm font-medium text-ink">
          Password
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink"
          />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-1 rounded-full bg-terracotta px-4 py-2.5 text-sm font-semibold text-cream disabled:opacity-60"
        >
          {busy ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
        </button>
      </form>
    </div>
  )
}

function PackageRow({ pkg, onPurchase, busy }: { pkg: Package; onPurchase: (pkg: Package) => void; busy: boolean }) {
  const product = pkg.webBillingProduct
  return (
    <button
      onClick={() => onPurchase(pkg)}
      disabled={busy}
      className="flex w-full items-center justify-between gap-3 rounded-2xl border border-line bg-cream p-4 text-left transition active:scale-[0.99] disabled:opacity-60"
    >
      <div>
        <p className="font-serif text-base font-semibold text-ink">{product.title}</p>
        {product.description && <p className="text-xs text-ink-soft">{product.description}</p>}
      </div>
      <span className="shrink-0 font-semibold text-terracotta">{product.price.formattedPrice}</span>
    </button>
  )
}

function SubscriptionPanel() {
  const { user, logout } = useAuth()
  const { premium, offering, purchasePackage, configured, loading } = useSubscription()
  const [purchasing, setPurchasing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onPurchase(pkg: Package) {
    setError(null)
    setPurchasing(true)
    try {
      await purchasePackage(pkg)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The purchase could not be completed.')
    } finally {
      setPurchasing(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-line bg-cream p-4">
        <p className="text-sm text-ink-soft">Signed in as</p>
        <p className="font-medium text-ink">{user!.email}</p>
        <button onClick={logout} className="mt-3 flex items-center gap-1.5 text-sm font-medium text-terracotta">
          <LogOut size={15} /> Sign Out
        </button>
      </div>

      {premium ? (
        <div className="flex items-center gap-3 rounded-2xl border border-gold-light bg-gold-light/20 p-4">
          <ShieldCheck className="text-terracotta" size={24} />
          <div>
            <p className="font-serif font-semibold text-ink">Emmaus Premium is active</p>
            <p className="text-sm text-ink-soft">Thank you for supporting the app. All content is unlocked.</p>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">Go Premium</h2>
          <ul className="mb-3 space-y-1.5 text-sm text-ink-soft">
            {['Full prayer & devotion library', 'Readings & saints archive, any date', 'Virtue-based examination of conscience'].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-terracotta" /> {item}
                </li>
              ),
            )}
          </ul>
          {!configured ? (
            <p className="rounded-2xl border border-line bg-cream-dim p-4 text-sm text-ink-soft">
              Subscriptions aren't configured yet. Set <code className="text-xs">VITE_REVENUECAT_API_KEY</code> to
              your RevenueCat Web Billing public key to enable purchases.
            </p>
          ) : loading ? (
            <p className="text-sm text-ink-soft">Loading plans…</p>
          ) : offering && offering.availablePackages.length > 0 ? (
            <div className="flex flex-col gap-2">
              {offering.availablePackages.map((pkg) => (
                <PackageRow key={pkg.identifier} pkg={pkg} onPurchase={onPurchase} busy={purchasing} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink-soft">No plans are available right now — please check back soon.</p>
          )}
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
      )}
    </div>
  )
}

export default function Account() {
  const { user, ready } = useAuth()

  return (
    <Screen title="Account" subtitle={user ? undefined : 'Sign in to sync your subscription'}>
      {!ready ? <p className="text-sm text-ink-soft">Loading…</p> : user ? <SubscriptionPanel /> : <AuthForms />}
    </Screen>
  )
}
