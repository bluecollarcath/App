import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Screen } from '../components/Screen'
import { PremiumGate } from '../components/Paywall'
import { commandmentsExamination, generalExamination, howToConfess } from '../data/examination'

function SectionList({ sections }: { sections: typeof commandmentsExamination }) {
  return (
    <div className="flex flex-col gap-4">
      {sections.map((section) => (
        <div key={section.id} className="rounded-2xl border border-line bg-cream p-4">
          <h3 className="font-serif text-base font-semibold leading-snug text-ink">{section.title}</h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-soft">
            {section.questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function Examination() {
  const [tab, setTab] = useState<'commandments' | 'virtues'>('commandments')

  return (
    <Screen title="Examination of Conscience" subtitle="Prepare well for the Sacrament of Confession">
      <div className="mb-5 flex gap-2">
        <button
          onClick={() => setTab('commandments')}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
            tab === 'commandments' ? 'bg-terracotta text-cream' : 'bg-parchment text-ink-soft'
          }`}
        >
          Ten Commandments
        </button>
        <button
          onClick={() => setTab('virtues')}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
            tab === 'virtues' ? 'bg-terracotta text-cream' : 'bg-parchment text-ink-soft'
          }`}
        >
          By Virtue
        </button>
      </div>

      {tab === 'commandments' ? (
        <SectionList sections={commandmentsExamination} />
      ) : (
        <PremiumGate title="The virtue-based examination">
          <SectionList sections={generalExamination} />
        </PremiumGate>
      )}

      <section className="mt-8">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">How to Confess</h2>
        <ol className="list-decimal space-y-1.5 rounded-2xl border border-line bg-cream p-4 pl-8 text-sm text-ink">
          {howToConfess.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
        <Link
          to="/prayers/act-of-contrition"
          className="mt-3 block rounded-2xl border border-line bg-cream-dim px-4 py-3 text-center text-sm font-medium text-terracotta"
        >
          Read the Act of Contrition →
        </Link>
      </section>
    </Screen>
  )
}
