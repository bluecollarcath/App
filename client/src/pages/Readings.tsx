import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { Screen } from '../components/Screen'
import { PremiumGate } from '../components/Paywall'
import { reflectionForDate, seasonalGreetings, usccbReadingsUrl } from '../data/readings'
import { liturgicalSeasonFor } from '../data/saints'

function ReadingCard({ date }: { date: Date }) {
  const reflection = reflectionForDate(date)
  const season = liturgicalSeasonFor(date)
  return (
    <div className="flex flex-col gap-4">
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-violet/10 px-3 py-1 text-xs font-medium text-violet">
        {season.name} &middot; {seasonalGreetings[season.name]}
      </span>

      <div className="rounded-2xl border border-line bg-cream p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold">Verse of the Day</p>
        <p className="mt-2 font-serif text-xl leading-snug text-ink">&ldquo;{reflection.verseText}&rdquo;</p>
        <p className="mt-1 text-sm text-ink-soft">{reflection.verseRef}</p>
      </div>

      <div className="rounded-2xl border border-line bg-cream p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-terracotta">{reflection.reflectionTitle}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink">{reflection.reflection}</p>
      </div>

      <a
        href={usccbReadingsUrl(date)}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 rounded-2xl border border-line bg-cream-dim px-4 py-3 text-sm font-medium text-ink"
      >
        Read the full Mass readings at USCCB.org <ExternalLink size={15} />
      </a>
    </div>
  )
}

export default function Readings() {
  const today = new Date()
  const [selected, setSelected] = useState(today)
  const isToday = selected.toDateString() === today.toDateString()

  return (
    <Screen
      title="Daily Readings"
      subtitle={selected.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
    >
      {isToday ? (
        <ReadingCard date={selected} />
      ) : (
        <PremiumGate title="The readings archive">
          <ReadingCard date={selected} />
        </PremiumGate>
      )}

      <div className="mt-6">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Browse another day
        </label>
        <input
          type="date"
          defaultValue={today.toISOString().slice(0, 10)}
          onChange={(e) => {
            if (e.target.value) setSelected(new Date(`${e.target.value}T00:00:00`))
          }}
          className="w-full rounded-xl border border-line bg-cream px-3 py-2.5 text-sm text-ink"
        />
      </div>
    </Screen>
  )
}
