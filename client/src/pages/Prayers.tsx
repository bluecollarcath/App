import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Screen } from '../components/Screen'
import { PremiumBadge } from '../components/Paywall'
import { prayers } from '../data/prayers'

const categoryOrder = ['Essential', 'Daily Life', 'Confession', 'Acts of Virtue', 'Marian', 'Devotions', 'For the Departed']

export default function Prayers() {
  const grouped = categoryOrder
    .map((category) => ({ category, items: prayers.filter((p) => p.category === category) }))
    .filter((g) => g.items.length > 0)

  return (
    <Screen title="Prayers" subtitle="A treasury of Catholic devotion">
      <div className="flex flex-col gap-6">
        {grouped.map(({ category, items }) => (
          <section key={category}>
            <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-ink-soft">{category}</h2>
            <div className="overflow-hidden rounded-2xl border border-line bg-cream">
              {items.map((prayer, i) => (
                <Link
                  key={prayer.id}
                  to={`/prayers/${prayer.id}`}
                  className={`flex items-center justify-between gap-3 px-4 py-3.5 transition active:bg-parchment/60 ${
                    i !== items.length - 1 ? 'border-b border-line' : ''
                  }`}
                >
                  <span className="font-medium text-ink">{prayer.title}</span>
                  <span className="flex items-center gap-2">
                    {prayer.premium && <PremiumBadge />}
                    <ChevronRight size={18} className="text-ink-soft/60" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Screen>
  )
}
