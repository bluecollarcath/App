import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

export function Screen({
  title,
  subtitle,
  back,
  action,
  children,
}: {
  title: string
  subtitle?: string
  back?: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="safe-top sticky top-0 z-10 border-b border-line bg-cream/95 px-5 pb-3 pt-4 backdrop-blur">
        <div className="mx-auto flex max-w-lg items-start justify-between gap-3">
          <div>
            {back && (
              <Link to={back} className="mb-1 flex items-center gap-0.5 text-sm font-medium text-terracotta">
                <ChevronLeft size={16} /> Back
              </Link>
            )}
            <h1 className="font-serif text-2xl font-semibold text-ink">{title}</h1>
            {subtitle && <p className="mt-0.5 text-sm text-ink-soft">{subtitle}</p>}
          </div>
          {action}
        </div>
      </header>
      <main className="mx-auto w-full max-w-lg flex-1 px-5 py-5">{children}</main>
    </div>
  )
}
