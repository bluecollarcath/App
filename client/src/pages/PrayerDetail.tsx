import { useParams } from 'react-router-dom'
import { Screen } from '../components/Screen'
import { PremiumGate } from '../components/Paywall'
import { prayers } from '../data/prayers'

export default function PrayerDetail() {
  const { id } = useParams()
  const prayer = prayers.find((p) => p.id === id)

  if (!prayer) {
    return (
      <Screen title="Prayer not found" back="/prayers">
        <p className="text-ink-soft">That prayer could not be found.</p>
      </Screen>
    )
  }

  const body = (
    <div className="rounded-2xl border border-line bg-cream p-5">
      <p className="whitespace-pre-line font-serif text-lg leading-relaxed text-ink">{prayer.text}</p>
    </div>
  )

  return (
    <Screen title={prayer.title} subtitle={prayer.category} back="/prayers">
      {prayer.premium ? <PremiumGate title={prayer.title}>{body}</PremiumGate> : body}
    </Screen>
  )
}
