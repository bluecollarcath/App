import { NavLink } from 'react-router-dom'
import { Home, BookOpenText, CircleDot, Sun, UserRound } from 'lucide-react'

const tabs = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/prayers', label: 'Prayers', icon: BookOpenText, end: false },
  { to: '/rosary', label: 'Rosary', icon: CircleDot, end: false },
  { to: '/readings', label: 'Readings', icon: Sun, end: false },
  { to: '/account', label: 'Account', icon: UserRound, end: false },
] as const

export function TabBar() {
  return (
    <nav className="safe-bottom sticky bottom-0 z-20 border-t border-line bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-lg items-stretch justify-between px-2">
        {tabs.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition-colors ${
                isActive ? 'text-terracotta' : 'text-ink-soft/70'
              }`
            }
          >
            <Icon size={22} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
