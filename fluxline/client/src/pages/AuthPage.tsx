import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { api, followRedirect } from '../lib/api';
import { useTitle } from '../lib/hooks';
import { Logo } from '../components/Layout';

export default function AuthPage({ mode }: { mode: 'login' | 'signup' }) {
  useTitle(mode === 'login' ? 'Sign in' : 'Create account');
  const { login, signup } = useAuth();
  const nav = useNavigate();
  const [params] = useSearchParams();
  const plan = params.get('plan');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accept, setAccept] = useState(false);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setErr(''); setBusy(true);
    try {
      if (mode === 'login') await login(email, password);
      else {
        if (!accept) { setErr('Please confirm your age and accept the Terms of Service and Privacy Policy to continue.'); setBusy(false); return; }
        await signup(name, email, password, true);
      }
      if (plan === 'monthly' || plan === 'annual') {
        const { url } = await api<{ url: string }>('/billing/checkout', { body: { plan } });
        followRedirect(url, nav);
        return;
      }
      nav('/dashboard');
    } catch (e2) {
      setErr((e2 as Error).message);
      setBusy(false);
    }
  };

  const input = 'mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-volt focus:ring-2 focus:ring-blue-100';
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <Logo />
        <h1 className="mt-6 text-2xl font-bold text-ink">{mode === 'login' ? 'Welcome back' : 'Create your free account'}</h1>
        <p className="mt-1 text-sm text-slate-500">
          {mode === 'login' ? 'Sign in to continue learning.' : plan ? 'Create an account, then complete checkout.' : 'Get the first lesson of every course free.'}
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          {mode === 'signup' && (
            <label className="block text-sm font-medium text-slate-700">Name
              <input className={input} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </label>
          )}
          <label className="block text-sm font-medium text-slate-700">Email
            <input className={input} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            <span className="flex items-center justify-between">Password
              {mode === 'login' && <Link to="/forgot-password" className="text-xs font-semibold text-volt">Forgot password?</Link>}
            </span>
            <input id="password" className={input} type="password" required minLength={mode === 'signup' ? 8 : undefined} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
            {mode === 'signup' && <span className="mt-1 block text-xs font-normal text-slate-500">At least 8 characters.</span>}
          </label>
          {mode === 'signup' && (
            <label className="flex items-start gap-2.5 text-sm text-slate-600">
              <input id="accept-terms" type="checkbox" checked={accept} onChange={(e) => setAccept(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-slate-300" />
              <span>I'm at least 13 years old, and I agree to the <Link to="/terms" target="_blank" className="font-semibold text-volt">Terms of Service</Link> and <Link to="/privacy" target="_blank" className="font-semibold text-volt">Privacy Policy</Link>.</span>
            </label>
          )}
          {err && <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{err}</p>}
          <button disabled={busy} className="btn-primary w-full py-2.5">{busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          {mode === 'login' ? <>New to Phasorly? <Link to="/signup" className="font-semibold text-volt">Create an account</Link></> : <>Already have an account? <Link to={`/login${plan ? `?plan=${plan}` : ''}`} className="font-semibold text-volt">Sign in</Link></>}
        </p>
      </div>
    </div>
  );
}
