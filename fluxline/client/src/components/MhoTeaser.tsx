/** "Coming soon" card for Mho, the planned AI study partner. */
export default function MhoTeaser({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-ink text-white ${compact ? 'p-5' : 'p-6 sm:p-8'}`}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        {/* The mho symbol is an upside-down omega: the inverse of the ohm. */}
        <div aria-hidden className={`flex shrink-0 items-center justify-center rounded-2xl bg-brand-grad font-extrabold text-ink ${compact ? 'h-12 w-12 text-2xl' : 'h-16 w-16 text-4xl'}`}>
          <span className="inline-block rotate-180">Ω</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className={`font-extrabold tracking-tight ${compact ? 'text-lg' : 'text-2xl'}`}>Meet Mho, your AI study partner</h2>
            <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-300">Coming soon</span>
          </div>
          <p className={`mt-2 text-slate-300 ${compact ? 'text-sm leading-6' : 'leading-7'}`}>
            Stuck on a step? Soon you'll be able to ask Mho to explain it another way, nudge you with a hint
            without giving the answer away, or quiz you on what you just learned.
          </p>
          {!compact && (
            <p className="mt-2 text-sm text-slate-400">
              Why "Mho"? It's "ohm" spelled backwards: the unit for how easily current flows. Ohms resist; Mho helps things flow.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
