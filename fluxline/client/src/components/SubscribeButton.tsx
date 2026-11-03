import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../lib/auth';

export default function SubscribeButton({ plan, className = 'btn-primary w-full', children }: { plan: 'monthly' | 'annual'; className?: string; children: React.ReactNode }) {
  const { user } = useAuth();
  const nav = useNavigate();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const go = async () => {
    if (!user) { nav(`/signup?plan=${plan}`); return; }
    setBusy(true); setErr('');
    try {
      const { url } = await api<{ url: string }>('/billing/checkout', { body: { plan } });
      window.location.href = url;
    } catch (e) {
      setErr((e as Error).message);
      setBusy(false);
    }
  };

  return (
    <div>
      <button type="button" onClick={go} disabled={busy} className={className}>{busy ? 'Redirecting…' : children}</button>
      {err && <p className="mt-2 text-sm text-rose-600">{err}</p>}
    </div>
  );
}
