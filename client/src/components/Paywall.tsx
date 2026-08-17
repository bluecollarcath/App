import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Lock, Sparkles } from 'lucide-react'
import { useSubscription } from '../lib/subscription'
import { useAuth } from '../lib/auth'

export function PremiumBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gold-light/40 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-terracotta-dark">
      <Lock size={11} /> Premium
    </span>
  )
}

export function PremiumGate({ title, children }: { title: string; children: ReactNode }) {
  const { user } = useAuth()
  const { premium } = useSubscription()

  if (premium) return <>{children}</>

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-gold-light/60 bg-gradient-to-b from-parchment to-cream-dim px-6 py-10 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-terracotta text-cream">
        <Sparkles size={22} />
      </div>
      <h3 className="font-serif text-lg font-semibold text-ink">{title} is a Premium feature</h3>
      <p className="max-w-xs text-sm text-ink-soft">
        Unlock the full library of devotions, readings, and the complete liturgical calendar with Emmaus Premium.
      </p>
      <Link
        to="/account"
        className="mt-1 rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-cream shadow-sm active:opacity-90"
      >
        {user ? 'Upgrade to Premium' : 'Sign in to Upgrade'}
      </Link>
    </div>
  )
}
