import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { api, followRedirect, PLANS } from '../lib/api';
import { useTitle } from '../lib/hooks';

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
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-ink">Account</h1>
      {success && <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-emerald-800 ring-1 ring-emerald-200">{user.subscribed ? 'Payment received — welcome to Fluxline! Every course is now unlocked.' : 'Payment received — finalizing your subscription…'}</div>}
      {params.get('demo') && <div className="mt-3 rounded-2xl bg-slate-100 p-3 text-sm text-slate-600">Demo billing mode: no real payment was taken.</div>}

      <section className="mt-8 rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-ink">Profile</h2>
        <dl className="mt-4 grid grid-cols-[120px_1fr] gap-y-2 text-sm">
          <dt className="text-slate-500">Name</dt><dd className="text-ink">{user.name}</dd>
          <dt className="text-slate-500">Email</dt><dd className="text-ink">{user.email}</dd>
        </dl>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-ink">Subscription</h2>
        {user.subscribed ? (
          <>
            <p className="mt-3 text-sm text-slate-700">
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">Active</span>
              <span className="ml-2">{plan ? `${plan.label} — $${plan.price}/${plan.per}` : 'Full access'}</span>
            </p>
            {user.periodEnd && <p className="mt-2 text-sm text-slate-500">Current period ends {new Date(user.periodEnd * 1000).toLocaleDateString()}.</p>}
            <button onClick={manage} disabled={busy} className="btn-ghost mt-5">{busy ? 'Opening…' : 'Manage billing'}</button>
          </>
        ) : (
          <>
            <p className="mt-3 text-sm text-slate-600">You're on the free plan{user.status === 'canceled' ? ' (your previous subscription was canceled)' : ''}.</p>
            <Link to="/pricing" className="btn-primary mt-5">Subscribe</Link>
            {user.hasBillingAccount && <button onClick={manage} disabled={busy} className="btn-ghost ml-3 mt-5">Billing history</button>}
          </>
        )}
        {err && <p className="mt-3 text-sm text-rose-600">{err}</p>}
      </section>
    </div>
  );
}
