import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { IS_PREVIEW } from '../lib/api';

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 font-extrabold tracking-tight">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
        <rect width="32" height="32" rx="7" fill={light ? '#1e293b' : '#0f172a'} />
        <path d="M10.5 24.5h4v-2.2a6.6 6.6 0 1 1 5 0v2.2h4" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.5 12.5h3.5M2.5 16.5h3.5M3.5 20.5h3" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      </svg>
      <span className={`text-xl ${light ? 'text-white' : 'text-ink'}`}>Ohmentum</span>
    </Link>
  );
}

const navCls = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? 'text-ink bg-slate-100' : 'text-slate-600 hover:text-ink hover:bg-slate-50'}`;

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
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="hidden items-center gap-1 md:flex">{links}</nav>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <>
                <NavLink to="/account" className={navCls}>{user.name}</NavLink>
                <button onClick={logout} className="rounded-lg px-3 py-2 text-sm text-slate-500 hover:text-ink">Sign out</button>
                {!user.subscribed && <Link to="/pricing" className="btn-primary">Subscribe</Link>}
              </>
            ) : (
              <>
                <Link to="/login" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:text-ink">Sign in</Link>
                <Link to="/signup" className="btn-primary">Start free</Link>
              </>
            )}
          </div>
          <button className="md:hidden p-2" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
        {open && (
          <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
            <nav className="flex flex-col gap-1">
              {links}
              {user ? (
                <>
                  <NavLink to="/account" className={navCls} onClick={() => setOpen(false)}>Account</NavLink>
                  <button onClick={() => { logout(); setOpen(false); }} className="rounded-lg px-3 py-2 text-left text-sm text-slate-500">Sign out</button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className={navCls} onClick={() => setOpen(false)}>Sign in</NavLink>
                  <Link to="/signup" className="btn-primary mt-2 text-center" onClick={() => setOpen(false)}>Start free</Link>
                </>
              )}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1"><Outlet /></main>

      <footer className="bg-ink text-slate-400">
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
