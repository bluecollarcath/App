import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ApiError, api, followRedirect, renewalDisclosure } from '../lib/api';
import { useAuth } from '../lib/auth';

/**
 * Subscribe button with the automatic-renewal consent checkbox. The customer must tick the box,
 * which states the exact price, billing frequency and cancellation terms; the server records the
 * wording they agreed to before sending them to Stripe checkout.
 */
export default function SubscribeButton({ plan, founding, dark = false, highlight = false, className = 'btn-primary w-full', children }: {
  plan: 'monthly' | 'annual';
  founding: boolean;
  dark?: boolean;
  highlight?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const nav = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  // If the offer changed since the page loaded, the server sends the current terms to agree to.
  const [serverTerms, setServerTerms] = useState<string | null>(null);
  const terms = serverTerms ?? renewalDisclosure(founding ? `founding-${plan}` : plan);
  const box = useRef<HTMLInputElement>(null);

  useEffect(() => { if (highlight) box.current?.scrollIntoView({ block: 'center' }); }, [highlight]);

  const go = async () => {
    if (!user) { nav(`/signup?plan=${plan}`); return; }
    if (!agreed) { setErr('Please tick the box above to agree to the automatic-renewal terms.'); box.current?.focus(); return; }
    setBusy(true); setErr('');
    try {
      const { url } = await api<{ url: string }>('/billing/checkout', { body: { plan, consent: true, disclosure: terms } });
      followRedirect(url, nav);
    } catch (e) {
      const body = e instanceof ApiError ? (e.body as { disclosure?: string } | null) : null;
      if (e instanceof ApiError && e.status === 409 && body?.disclosure) {
        setServerTerms(body.disclosure);
        setAgreed(false);
      }
      setErr((e as Error).message);
      setBusy(false);
    }
  };

  // The Terms/Refund links replace the last sentence's plain text, keeping the recorded wording identical.
  const tail = 'I agree to the Terms of Service and Refund Policy.';
  const lead = terms.endsWith(tail) ? terms.slice(0, -tail.length) : terms;
  const link = `underline ${dark ? 'text-white' : 'text-ink'}`;

  return (
    <div>
      {user && (
        <label className={`mb-4 flex gap-2.5 rounded-xl p-3 text-left text-xs leading-5 ${dark ? 'bg-white/5 text-slate-300' : 'bg-slate-50 text-slate-600'} ${highlight ? 'ring-2 ring-brand' : ''}`}>
          <input ref={box} type="checkbox" checked={agreed} onChange={(e) => { setAgreed(e.target.checked); setErr(''); }} className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-500" />
          <span>
            {lead}
            {terms.endsWith(tail) && <>I agree to the <Link to="/terms" target="_blank" className={link}>Terms of Service</Link> and <Link to="/refunds" target="_blank" className={link}>Refund Policy</Link>.</>}
          </span>
        </label>
      )}
      <button type="button" onClick={go} disabled={busy} className={className}>{busy ? 'Redirecting…' : children}</button>
      {!user && (
        <p className={`mt-3 text-xs leading-5 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          Renews automatically until you cancel. You'll review and agree to the renewal terms before checkout.
        </p>
      )}
      {err && <p role="alert" className={`mt-2 text-sm ${dark ? 'text-rose-300' : 'text-rose-600'}`}>{err}</p>}
    </div>
  );
}
