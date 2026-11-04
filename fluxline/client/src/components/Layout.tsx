import { useId, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { IS_PREVIEW } from '../lib/api';

const OMEGA = 'M5 36 H15 V30.5 A13 13 0 1 1 25 30.5 V36 H35';

/**
 * The "Full Throttle" wordmark: speed stripes, a forward-leaning Ω standing in for the O,
 * and HMENTUM in heavy italic. `light` = for dark backgrounds (white letters).
 */
export function Logo({ light = false, size = 26 }: { light?: boolean; size?: number }) {
  const gid = `omega${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <Link to="/" aria-label="Ohmentum home" className="group flex select-none items-center">
      <span className="flex items-center" style={{ gap: size * 0.1, marginRight: size * 0.2 }} aria-hidden>
        {[0.125, 0.175, 0.225].map((w, i) => (
          <span key={i} className="block"
            style={{ width: size * w, height: size * 0.72, transform: 'skewX(-24deg)', opacity: [0.35, 0.6, 1][i], backgroundImage: 'linear-gradient(180deg, #b6ffdc 0%, #2fe592 55%, #0b9e5d 100%)' }} />
        ))}
      </span>
      <span className="flex items-end" style={{ fontFamily: "'Kanit', 'Inter', sans-serif", fontStyle: 'italic', fontWeight: 900, fontSize: size, lineHeight: 1, letterSpacing: '0.01em' }} aria-hidden>
        <svg viewBox="0 0 40 40" style={{ width: size * 0.93, height: size * 0.93, transform: 'skewX(-14deg)', marginRight: -1, marginBottom: size * 0.075 }}>
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#b6ffdc" /><stop offset="0.5" stopColor="#2fe592" /><stop offset="1" stopColor="#0b9e5d" />
            </linearGradient>
          </defs>
          <path d={OMEGA} fill="none" stroke={`url(#${gid})`} strokeWidth="6.5" strokeLinecap="square" />
        </svg>
        <span className={light ? 'text-white' : 'text-ink'}>HMENTUM</span>
      </span>
    </Link>
  );
}

const navCls = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? 'text-white bg-white/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`;
const ctaCls = 'inline-flex items-center justify-center rounded-xl bg-brand-grad px-4 py-2 text-sm font-bold text-ink transition hover:brightness-110 hover:shadow-[0_0_18px_rgba(34,229,139,0.35)]';

export default function Layout() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const links = (
    <>
      <NavLink to="/curriculum" className={navCls} onClick={() => setOpen(false)}>Curriculum</NavLink>
      <NavLink to="/pricing" className={navCls} onClick={() => setOpen(false)}>Pricing</NavLink>
      {user && <NavLink to="/dashboard" className={navCls} onClick={() => setOpen(false)}>My learning</NavLink>}
    </>
  );

  return (
    <div className="flex min-h-screen flex-col">
      {IS_PREVIEW && (
        <div className="bg-amber-100 px-4 py-2 text-center text-xs text-amber-900">
          Preview version: accounts and progress are saved only in this browser, and subscribing is simulated. No payment is taken.
        </div>
      )}
      <header className="print:hidden sticky top-0 z-40 border-b border-slate-800 bg-ink/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-8">
            <Logo light />
            <nav className="hidden items-center gap-1 md:flex">{links}</nav>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <>
                <NavLink to="/account" className={navCls}>{user.name}</NavLink>
                <button onClick={logout} className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:text-white">Sign out</button>
                {!user.subscribed && <Link to="/pricing" className={ctaCls}>Subscribe</Link>}
              </>
            ) : (
              <>
                <Link to="/login" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:text-white">Sign in</Link>
                <Link to="/signup" className={ctaCls}>Start free</Link>
              </>
            )}
          </div>
          <button className="p-2 text-white md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
        {open && (
          <div className="border-t border-slate-800 bg-ink px-4 py-3 md:hidden">
            <nav className="flex flex-col gap-1">
              {links}
              {user ? (
                <>
                  <NavLink to="/account" className={navCls} onClick={() => setOpen(false)}>Account</NavLink>
                  <button onClick={() => { logout(); setOpen(false); }} className="rounded-lg px-3 py-2 text-left text-sm text-slate-400">Sign out</button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className={navCls} onClick={() => setOpen(false)}>Sign in</NavLink>
                  <Link to="/signup" className={`${ctaCls} mt-2`} onClick={() => setOpen(false)}>Start free</Link>
                </>
              )}
            </nav>
          </div>
        )}
      </header>
      {user?.status === 'past_due' && (
        <div className="print:hidden bg-amber-50 px-4 py-2 text-center text-sm text-amber-900 ring-1 ring-amber-200">
          Your last payment didn't go through.{' '}
          <Link to="/account" className="font-semibold underline">Update your payment method</Link> to keep full access.
        </div>
      )}

      <main className="flex-1"><Outlet /></main>

      <footer className="print:hidden bg-ink text-slate-400">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo light />
            <p className="mt-4 max-w-sm text-sm leading-6">A complete, college-level electrical engineering curriculum — from Kirchhoff's laws to power systems and VLSI — taught with rigor and practiced with instant feedback.</p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Learn</h4>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:text-white" to="/curriculum">Full curriculum</Link></li>
              <li><Link className="hover:text-white" to="/courses/circuit-analysis-1">Circuit Analysis I</Link></li>
              <li><Link className="hover:text-white" to="/courses/signals-and-systems">Signals & Systems</Link></li>
              <li><Link className="hover:text-white" to="/courses/electromagnetics">Electromagnetics</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:text-white" to="/pricing">Pricing</Link></li>
              <li><Link className="hover:text-white" to="/contact">Contact &amp; support</Link></li>
              <li><Link className="hover:text-white" to="/terms">Terms of Service</Link></li>
              <li><Link className="hover:text-white" to="/privacy">Privacy Policy</Link></li>
              <li><Link className="hover:text-white" to="/refunds">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 py-6 text-center text-xs">© {new Date().getFullYear()} Ohmentum. Ohmentum is an independent learning platform and is not an accredited degree-granting institution.</div>
      </footer>
    </div>
  );
}
