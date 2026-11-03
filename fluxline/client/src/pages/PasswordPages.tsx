import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { MailCheck } from 'lucide-react';
import { api, type User } from '../lib/api';
import { useAuth } from '../lib/auth';
import { useTitle } from '../lib/hooks';
import { Logo } from '../components/Layout';

export const inputCls = 'mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-volt focus:ring-2 focus:ring-blue-100';

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><Logo />{children}</div>
    </div>
  );
}

export function ForgotPassword() {
  useTitle('Reset password');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr('');
    try { await api('/auth/forgot', { body: { email } }); setSent(true); }
    catch (e2) { setErr((e2 as Error).message); }
    finally { setBusy(false); }
  };

  return (
    <Card>
      {sent ? (
        <>
          <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600"><MailCheck /></div>
          <h1 className="mt-4 text-2xl font-bold text-ink">Check your email</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            If an account exists for <strong className="text-ink">{email}</strong>, we've sent a link to reset its password. The link works for 1 hour. Check your spam folder if it doesn't arrive in a few minutes.
          </p>
          <Link to="/login" className="btn-ghost mt-6 w-full">Back to sign in</Link>
        </>
      ) : (
        <>
          <h1 className="mt-6 text-2xl font-bold text-ink">Forgot your password?</h1>
          <p className="mt-1 text-sm text-slate-500">Enter your account's email and we'll send you a link to choose a new one.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-slate-700">Email
              <input id="forgot-email" className={inputCls} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </label>
            {err && <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{err}</p>}
            <button disabled={busy} className="btn-primary w-full py-2.5">{busy ? 'Sending…' : 'Send reset link'}</button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">Remembered it? <Link to="/login" className="font-semibold text-volt">Sign in</Link></p>
        </>
      )}
    </Card>
  );
}

export function ResetPassword() {
  useTitle('Choose a new password');
  const [params] = useSearchParams();
  const token = params.get('token') ?? '';
  const { setSession } = useAuth();
  const nav = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setErr("The two passwords don't match."); return; }
    setBusy(true); setErr('');
    try {
      const r = await api<{ token: string; user: User }>('/auth/reset', { body: { token, password } });
      setSession(r.token, r.user);
      nav('/dashboard');
    } catch (e2) { setErr((e2 as Error).message); setBusy(false); }
  };

  if (!token) {
    return (
      <Card>
        <h1 className="mt-6 text-2xl font-bold text-ink">This link is incomplete</h1>
        <p className="mt-2 text-sm text-slate-600">Open the link from your reset email again, or request a new one.</p>
        <Link to="/forgot-password" className="btn-primary mt-6 w-full">Request a new link</Link>
      </Card>
    );
  }
  return (
    <Card>
      <h1 className="mt-6 text-2xl font-bold text-ink">Choose a new password</h1>
      <p className="mt-1 text-sm text-slate-500">You'll be signed out on any other devices.</p>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <label className="block text-sm font-medium text-slate-700">New password
          <input id="new-password" className={inputCls} type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
          <span className="mt-1 block text-xs font-normal text-slate-500">At least 8 characters.</span>
        </label>
        <label className="block text-sm font-medium text-slate-700">Confirm new password
          <input id="confirm-password" className={inputCls} type="password" required minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" />
        </label>
        {err && <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{err} {err.includes('expired') && <Link to="/forgot-password" className="font-semibold underline">Request a new link</Link>}</p>}
        <button disabled={busy} className="btn-primary w-full py-2.5">{busy ? 'Saving…' : 'Save new password'}</button>
      </form>
    </Card>
  );
}
