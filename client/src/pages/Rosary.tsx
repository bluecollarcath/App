import { useState } from 'react'
import { Screen } from '../components/Screen'
import { mysterySets, rosarySteps, mysteriesForToday } from '../data/rosary'

export default function Rosary() {
  const [activeId, setActiveId] = useState(mysteriesForToday(new Date().getDay()).id)
  const active = mysterySets.find((m) => m.id === activeId)!

  return (
    <Screen title="The Holy Rosary" subtitle="Pray a decade, or the whole Rosary">
      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {mysterySets.map((set) => (
          <button
            key={set.id}
            onClick={() => setActiveId(set.id)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
              set.id === activeId ? 'bg-terracotta text-cream' : 'bg-parchment text-ink-soft'
            }`}
          >
            {set.name.replace(' Mysteries', '')}
          </button>
        ))}
      </div>

      <p className="mb-5 text-sm text-ink-soft">
        <span className="font-semibold text-ink">{active.name}</span> — traditionally prayed on {active.days}
      </p>

      <section className="mb-6">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">Opening Prayers</h2>
        <ol className="list-decimal space-y-1.5 rounded-2xl border border-line bg-cream p-4 pl-8 text-sm text-ink">
          {rosarySteps.opening.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mb-6 flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-soft">The Five Decades</h2>
        {active.mysteries.map((mystery, i) => (
          <div key={mystery.title} className="rounded-2xl border border-line bg-cream p-4">
            <p className="text-xs font-semibold text-terracotta">Decade {i + 1}</p>
            <h3 className="mt-0.5 font-serif text-lg font-semibold text-ink">{mystery.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{mystery.reflection}</p>
            <p className="mt-2 text-xs font-medium text-violet">Fruit of the Mystery: {mystery.fruit}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">Closing Prayers</h2>
        <ol className="list-decimal space-y-1.5 rounded-2xl border border-line bg-cream p-4 pl-8 text-sm text-ink">
          {rosarySteps.closing.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>
    </Screen>
  )
}
