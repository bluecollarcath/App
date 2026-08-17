import { useState } from 'react'
import { Screen } from '../components/Screen'
import { PremiumGate } from '../components/Paywall'
import { findSaintForDate, liturgicalSeasonFor, saints } from '../data/saints'

function SaintCard({ date }: { date: Date }) {
  const saint = findSaintForDate(date)
  const season = liturgicalSeasonFor(date)

  return (
    <div className="flex flex-col gap-4">
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-violet/10 px-3 py-1 text-xs font-medium text-violet">
        Liturgical Season: {season.name} &middot; {season.color}
      </span>

      {saint ? (
        <div className="rounded-2xl border border-line bg-cream p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">{saint.title}</p>
          <h2 className="mt-1 font-serif text-2xl font-semibold text-ink">{saint.name}</h2>
          {saint.years && <p className="text-sm text-ink-soft">{saint.years}</p>}
          <p className="mt-3 text-sm leading-relaxed text-ink">{saint.bio}</p>
          {saint.patronage && (
            <p className="mt-3 text-xs font-medium text-terracotta">
              Patron of: {saint.patronage.join(', ')}
            </p>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-line bg-cream p-5 text-center">
          <p className="text-sm text-ink-soft">
            No major feast is recorded in this calendar for this date — a fitting day for quiet, personal devotion
            in Ordinary Time.
          </p>
        </div>
      )}
    </div>
  )
}

export default function Saints() {
  const today = new Date()
  const [selected, setSelected] = useState(today)
  const isToday = selected.toDateString() === today.toDateString()

  const upcoming = saints
    .map((s) => s)
    .slice(0, 8)

  return (
    <Screen
      title="Saint of the Day"
      subtitle={selected.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
    >
      {isToday ? (
        <SaintCard date={selected} />
      ) : (
        <PremiumGate title="The full liturgical calendar">
          <SaintCard date={selected} />
        </PremiumGate>
      )}

      <div className="mt-6">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Look up another date
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

      {!isToday && (
        <div className="mt-8">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">A Few Feast Days</h2>
          <div className="overflow-hidden rounded-2xl border border-line bg-cream">
            {upcoming.map((s, i) => (
              <div
                key={s.date}
                className={`px-4 py-3 text-sm ${i !== upcoming.length - 1 ? 'border-b border-line' : ''}`}
              >
                <span className="font-medium text-ink">{s.name}</span>{' '}
                <span className="text-ink-soft">— {s.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Screen>
  )
}
