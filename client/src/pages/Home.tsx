import { Link } from 'react-router-dom'
import { BookOpenText, CircleDot, ScrollText, Sun, ChevronRight } from 'lucide-react'
import { findSaintForDate, liturgicalSeasonFor } from '../data/saints'
import { reflectionForDate, seasonalGreetings } from '../data/readings'
import { mysteriesForToday } from '../data/rosary'
import { useAuth } from '../lib/auth'

const today = new Date()

export default function Home() {
  const { user } = useAuth()
  const saint = findSaintForDate(today)
  const season = liturgicalSeasonFor(today)
  const reflection = reflectionForDate(today)
  const mysteries = mysteriesForToday(today.getDay())
  const dateLabel = today.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="flex min-h-full flex-1 flex-col bg-gradient-to-b from-parchment/70 to-cream">
      <header className="safe-top px-5 pb-4 pt-6">
        <div className="mx-auto max-w-lg">
          <p className="text-sm text-ink-soft">{dateLabel}</p>
          <h1 className="font-serif text-3xl font-semibold text-ink">
            {user ? `Peace be with you` : 'Emmaus'}
          </h1>
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-violet/10 px-3 py-1 text-xs font-medium text-violet">
            {season.name} &middot; {seasonalGreetings[season.name]}
          </span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-4 px-5 pb-6">
        {saint && (
          <Link
            to="/saints"
            className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-cream p-4 shadow-sm transition active:scale-[0.99]"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gold">Saint of the Day</p>
              <p className="mt-1 font-serif text-lg font-semibold text-ink">{saint.name}</p>
              <p className="text-sm text-ink-soft">{saint.title}</p>
            </div>
            <ChevronRight className="shrink-0 text-ink-soft" size={20} />
          </Link>
        )}

        <Link
          to="/readings"
          className="flex items-start justify-between gap-3 rounded-2xl border border-line bg-cream p-4 shadow-sm transition active:scale-[0.99]"
        >
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-terracotta">
              <Sun size={14} /> Daily Reflection
            </p>
            <p className="mt-1 font-serif text-lg font-semibold text-ink">{reflection.reflectionTitle}</p>
            <p className="mt-1 text-sm italic text-ink-soft">
              &ldquo;{reflection.verseText}&rdquo; — {reflection.verseRef}
            </p>
          </div>
          <ChevronRight className="mt-1 shrink-0 text-ink-soft" size={20} />
        </Link>

        <Link
          to="/rosary"
          className="flex items-center justify-between gap-3 rounded-2xl bg-terracotta p-4 text-cream shadow-sm transition active:scale-[0.99]"
        >
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gold-light">
              <CircleDot size={14} /> Today's Rosary
            </p>
            <p className="mt-1 font-serif text-lg font-semibold">{mysteries.name}</p>
            <p className="text-sm text-cream/80">{mysteries.days}</p>
          </div>
          <ChevronRight className="shrink-0" size={20} />
        </Link>

        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/prayers"
            className="flex flex-col items-start gap-2 rounded-2xl border border-line bg-cream p-4 shadow-sm transition active:scale-[0.99]"
          >
            <BookOpenText className="text-terracotta" size={20} />
            <span className="font-serif font-semibold text-ink">Prayers</span>
            <span className="text-xs text-ink-soft">Essential &amp; devotional</span>
          </Link>
          <Link
            to="/examination"
            className="flex flex-col items-start gap-2 rounded-2xl border border-line bg-cream p-4 shadow-sm transition active:scale-[0.99]"
          >
            <ScrollText className="text-terracotta" size={20} />
            <span className="font-serif font-semibold text-ink">Confession Prep</span>
            <span className="text-xs text-ink-soft">Examination of conscience</span>
          </Link>
        </div>
      </main>
    </div>
  )
}
