import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { SITE } from '../lib/site';

const LAUNCH = new Date(SITE.launchAt).getTime();
const START = new Date(SITE.chargeStart).getTime();
const CELLS = 10;

/** Re-renders every `ms` milliseconds with the current time. */
function useNow(ms = 1000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), ms);
    return () => clearInterval(t);
  }, [ms]);
  return now;
}

function parts(msLeft: number) {
  const s = Math.max(0, Math.floor(msLeft / 1000));
  return { days: Math.floor(s / 86400), hours: Math.floor(s / 3600) % 24, minutes: Math.floor(s / 60) % 60, seconds: s % 60 };
}

export const isBeforeLaunch = (now = Date.now()) => now < LAUNCH;

/** Battery whose charge is the real fraction of time elapsed between chargeStart and launch. */
function Battery({ charge, live }: { charge: number; live: boolean }) {
  const full = Math.floor(charge * CELLS);
  return (
    <div className="flex items-center" role="img" aria-label={`Battery ${Math.floor(charge * 100)} percent charged`}>
      <div className="relative flex h-24 w-full gap-1.5 overflow-hidden rounded-2xl border-[3px] border-emerald-100/85 p-2 sm:h-28">
        {Array.from({ length: CELLS }, (_, i) => {
          const on = live || i < full;
          const charging = !live && i === full;
          return (
            <div
              key={i}
              className={`flex-1 rounded-md ${on ? 'bg-gradient-to-b from-[#b6ffdc] via-[#2fe592] to-[#0b9e5d] shadow-[0_0_14px_rgba(47,229,146,0.45)]' : 'bg-white/[0.06]'} ${charging ? 'charge-pulse bg-gradient-to-b from-[#b6ffdc]/70 via-[#2fe592]/60 to-[#0b9e5d]/60' : ''}`}
            />
          );
        })}
        {!live && <div className="charge-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" />}
      </div>
      <div className="ml-1 h-9 w-2.5 shrink-0 rounded-r-md bg-emerald-100/85 sm:h-10" />
    </div>
  );
}

/** Home-page launch section: a battery charging toward launch, with a live countdown. */
export function LaunchCountdown() {
  const now = useNow();
  const { hash } = useLocation();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (hash !== '#launch') return;
    // Wait a moment for the page above (hero, course data) to lay out, then scroll.
    const t = setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150);
    return () => clearTimeout(t);
  }, [hash]);
  const live = now >= LAUNCH;
  if (now >= LAUNCH + SITE.liveBannerDays * 86400_000) return null;
  const charge = Math.min(1, Math.max(0, (now - START) / (LAUNCH - START)));
  const left = parts(LAUNCH - now);
  const units: [number, string][] = [[left.days, 'days'], [left.hours, 'hours'], [left.minutes, 'min'], [left.seconds, 'sec']];

  return (
    <section ref={ref} id="launch" className="relative overflow-hidden border-t border-emerald-900/60 bg-[#06110c] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(34,229,139,0.14),transparent_60%)]" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:py-16">
        <div>
          <div className="font-mono text-xs font-bold tracking-[0.3em] text-emerald-300 sm:text-sm">
            {live ? 'FULLY CHARGED · 100%' : `CHARGING · ${(charge * 100).toFixed(charge < 0.999 ? 1 : 0)}%`}
          </div>
          <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {live ? <>We're live. <span className="text-brand-grad">Let's build.</span></> : <>Full charge: <span className="whitespace-nowrap text-brand-grad">January 4.</span></>}
          </h2>
          <p className="mt-4 max-w-lg text-slate-300">
            {live
              ? 'Ohmentum launched on January 4, 2027. Every course is open; start with the free first lesson of any of them.'
              : 'Ohmentum officially launches January 4, 2027. The first lesson of every course is free right now, so you can start before the doors fully open.'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/signup" className="btn-brand"><Zap size={16} /> {live ? 'Start learning free' : 'Get a head start, free'}</Link>
            <Link to="/curriculum" className="inline-flex items-center rounded-xl border border-slate-600 px-5 py-3 text-sm font-semibold text-white hover:border-slate-400">See the curriculum</Link>
          </div>
        </div>
        <div>
          <Battery charge={charge} live={live} />
          {!live && (
            <div className="mt-5 grid grid-cols-4 gap-2 sm:gap-3" aria-live="off">
              {units.map(([n, label]) => (
                <div key={label} className="rounded-xl border border-emerald-900/70 bg-black/30 px-2 py-3 text-center">
                  <div className="font-mono text-2xl font-bold tabular-nums text-white sm:text-4xl">{String(n).padStart(2, '0')}</div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 sm:text-xs">{label}</div>
                </div>
              ))}
            </div>
          )}
          {!live && <p className="mt-3 text-center text-xs text-slate-500">Charging since the first line of Ohmentum's code on November 3. Full at midnight Central time, January 4.</p>}
          <p className="sr-only">{live ? 'Ohmentum has launched.' : `${left.days} days, ${left.hours} hours and ${left.minutes} minutes until launch on January 4, 2027.`}</p>
        </div>
      </div>
    </section>
  );
}

/** Slim bar above the site header until launch day. */
export function LaunchBar() {
  const now = useNow(60_000);
  if (!isBeforeLaunch(now)) return null;
  const days = Math.ceil((LAUNCH - now) / 86400_000);
  return (
    <Link to="/#launch" className="print:hidden block bg-brand-grad px-4 py-1.5 text-center text-xs font-bold text-ink hover:brightness-110 sm:text-sm">
      <Zap size={13} className="mr-1 inline -mt-0.5" />
      Launching January 4, 2027 · {days === 1 ? '1 day' : `${days} days`} to go
      <span className="ml-1 hidden font-semibold opacity-75 sm:inline">· Start free now →</span>
    </Link>
  );
}
