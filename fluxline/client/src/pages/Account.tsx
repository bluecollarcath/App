import { useEffect, useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { api, followRedirect, PLANS, type User } from '../lib/api';
import { useTitle } from '../lib/hooks';
import { inputCls } from './PasswordPages';

function ChangePassword() {
  const { setSession } = useAuth();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setMsg(null);
    try {
      const r = await api<{ token: string; user: User }>('/account/password', { body: { current, next } });
      setSession(r.token, r.user);
      setCurrent(''); setNext('');
      setMsg({ ok: true, text: 'Password changed. You were signed out on your other devices.' });
    } catch (e2) { setMsg({ ok: false, text: (e2 as Error).message }); }
    finally { setBusy(false); }
  };

  return (
    <form onSubmit={submit} className="mt-4 grid gap-4 sm:grid-cols-2">
      <label className="block text-sm font-medium text-slate-700">Current password
        <input id="current-password" className={inputCls} type="password" required value={current} onChange={(e) => setCurrent(e.target.value)} autoComplete="current-password" />
      </label>
      <label className="block text-sm font-medium text-slate-700">New password
        <input id="next-password" className={inputCls} type="password" required minLength={8} value={next} onChange={(e) => setNext(e.target.value)} autoComplete="new-password" />
      </label>
      <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
        <button disabled={busy} className="btn-primary">{busy ? 'Saving…' : 'Change password'}</button>
        {msg && <span className={`text-sm ${msg.ok ? 'text-emerald-700' : 'text-rose-600'}`}>{msg.text}</span>}
      </div>
    </form>
  );
}

function DeleteAccount() {
  const { logout } = useAuth();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      await api('/account/delete', { body: { password } });
      logout();
      nav('/');
    } catch (e2) { setErr((e2 as Error).message); setBusy(false); }
  };

  if (!open) return <button onClick={() => setOpen(true)} className="mt-4 text-sm font-semibold text-rose-600 hover:text-rose-700">Delete my account…</button>;
  return (
    <form onSubmit={submit} className="mt-4 rounded-2xl bg-rose-50 p-5 ring-1 ring-rose-200">
      <p className="text-sm text-rose-900">This permanently deletes your account and learning progress, and immediately cancels any active subscription with no further charges. This can't be undone.</p>
      <label className="mt-4 block text-sm font-medium text-slate-700">Enter your password to confirm
        <input id="delete-password" className={`${inputCls} bg-white`} type="password" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
      </label>
      {err && <p className="mt-2 text-sm text-rose-700">{err}</p>}
      <div className="mt-4 flex gap-3">
        <button disabled={busy} className="inline-flex items-center rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60">{busy ? 'Deleting…' : 'Permanently delete account'}</button>
        <button type="button" onClick={() => { setOpen(false); setErr(''); }} className="btn-ghost">Keep my account</button>
      </div>
    </form>
  );
}

export default function Account() {
  useTitle('Account');
  const { user, loading, refresh } = useAuth();
  const [params] = useSearchParams();
  const nav = useNavigate();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const success = params.get('checkout') === 'success';

  // After Stripe checkout, the webhook may land a moment after the redirect — poll briefly.
  useEffect(() => {
    if (!success) return;
    let n = 0;
    void refresh();
    const t = setInterval(() => { n++; void refresh(); if (n > 5) clearInterval(t); }, 1500);
    return () => clearInterval(t);
  }, [success, refresh]);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const manage = async () => {
    setBusy(true); setErr('');
    try {
      const { url } = await api<{ url: string }>('/billing/portal', { body: {} });
      followRedirect(url, nav);
      setBusy(false);
    } catch (e) { setErr((e as Error).message); setBusy(false); }
  };

  const plan = user.plan === 'annual' || user.plan === 'monthly' ? PLANS[user.plan] : null;
  const paying = user.status === 'active' || user.status === 'trialing';
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-ink">Account</h1>
      {success && <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-emerald-800 ring-1 ring-emerald-200">{user.subscribed ? 'Payment received. Welcome to Phasorly! Every course is now unlocked.' : 'Payment received. Finalizing your subscription…'}</div>}
      {params.get('demo') && <div className="mt-3 rounded-2xl bg-slate-100 p-3 text-sm text-slate-600">Demo billing mode: no real payment was taken.</div>}

      <section className="mt-8 rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-ink">Profile</h2>
        <dl className="mt-4 grid grid-cols-[120px_1fr] gap-y-2 text-sm">
          <dt className="text-slate-500">Name</dt><dd className="text-ink">{user.name}</dd>
          <dt className="text-slate-500">Email</dt><dd className="break-all text-ink">{user.email}</dd>
        </dl>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-ink">Subscription</h2>
        {user.owner && !paying ? (
          <p className="mt-3 text-sm text-slate-700">
            <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700">Owner access</span>
            <span className="ml-2">Full access to every course. No subscription or billing needed.</span>
          </p>
        ) : user.subscribed ? (
          <>
            <p className="mt-3 text-sm text-slate-700">
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">Active</span>
              <span className="ml-2">{plan ? `${plan.label}: $${plan.price}/${plan.per}` : 'Full access'}</span>
            </p>
            {user.periodEnd && <p className="mt-2 text-sm text-slate-500">Renews on {new Date(user.periodEnd * 1000).toLocaleDateString()}.</p>}
            <button onClick={manage} disabled={busy} className="btn-ghost mt-5">{busy ? 'Opening…' : 'Manage billing or cancel'}</button>
          </>
        ) : (
          <>
            <p className="mt-3 text-sm text-slate-600">You're on the free plan{user.status === 'canceled' ? ' (your previous subscription was canceled)' : ''}.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/pricing" className="btn-primary">Subscribe</Link>
              {user.hasBillingAccount && <button onClick={manage} disabled={busy} className="btn-ghost">Billing history</button>}
            </div>
          </>
        )}
        {err && <p className="mt-3 text-sm text-rose-600">{err}</p>}
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-ink">Password</h2>
        <ChangePassword />
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-ink">Delete account</h2>
        <p className="mt-1 text-sm text-slate-500">Remove your account and all of your learning data. See our <Link to="/privacy" className="font-medium text-volt">Privacy Policy</Link>.</p>
        <DeleteAccount />
      </section>
    </div>
  );
}
