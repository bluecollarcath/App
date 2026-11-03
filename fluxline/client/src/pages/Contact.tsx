import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Mail } from 'lucide-react';
import { api } from '../lib/api';
import { useAuth } from '../lib/auth';
import { useApi, useTitle } from '../lib/hooks';
import { inputCls } from './PasswordPages';

const TOPICS = ['General question', 'Billing & subscription', 'Account access', 'Course content', 'Partnerships & schools', 'Other'];

export default function Contact() {
  useTitle('Contact');
  const { user } = useAuth();
  const { data: config } = useApi<{ supportEmail: string | null }>('/config');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (user) { setName((n) => n || user.name); setEmail((e) => e || user.email); } }, [user]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr('');
    try { await api('/contact', { body: { name, email, topic, message } }); setSent(true); }
    catch (e2) { setErr((e2 as Error).message); }
    finally { setBusy(false); }
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-ink">Contact us</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">Questions about a lesson, your subscription, or using Phasorly at your school? Send us a message and we'll reply by email, usually within two business days.</p>
        <div className="mt-8 space-y-4 text-sm text-slate-600">
          <div className="rounded-2xl border border-slate-200 p-5">
            <div className="font-semibold text-ink">Found a mistake in a lesson?</div>
            <p className="mt-1">Use the <strong>Report an error</strong> button at the bottom of the lesson. It tells us exactly which page you were on.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-5">
            <div className="font-semibold text-ink">Billing</div>
            <p className="mt-1">You can update your card, download receipts, or cancel anytime from your <Link to="/account" className="font-semibold text-volt">account page</Link>. See our <Link to="/refunds" className="font-semibold text-volt">refund policy</Link>.</p>
          </div>
          {config?.supportEmail && (
            <div className="flex items-center gap-2 px-1"><Mail size={16} /> <span className="select-all font-medium text-ink">{config.supportEmail}</span></div>
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 p-6 sm:p-8">
        {sent ? (
          <div className="py-10 text-center">
            <CheckCircle2 className="mx-auto text-emerald-500" size={44} />
            <h2 className="mt-4 text-2xl font-bold text-ink">Message sent</h2>
            <p className="mt-2 text-slate-600">Thanks, {name.split(' ')[0]}. We'll reply to <strong className="text-ink">{email}</strong>.</p>
            <button onClick={() => { setSent(false); setMessage(''); }} className="btn-ghost mt-6">Send another message</button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">Your name
                <input id="contact-name" className={inputCls} required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
              </label>
              <label className="block text-sm font-medium text-slate-700">Email
                <input id="contact-email" className={inputCls} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              </label>
            </div>
            <label className="block text-sm font-medium text-slate-700">Topic
              <select id="contact-topic" className={inputCls} value={topic} onChange={(e) => setTopic(e.target.value)}>
                {TOPICS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700">Message
              <textarea id="contact-message" className={`${inputCls} min-h-40`} required minLength={10} maxLength={5000} value={message} onChange={(e) => setMessage(e.target.value)} />
            </label>
            {err && <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{err}</p>}
            <button disabled={busy} className="btn-primary w-full py-2.5">{busy ? 'Sending…' : 'Send message'}</button>
          </form>
        )}
      </div>
    </div>
  );
}
