import { useState, type FormEvent } from 'react';
import { Flag } from 'lucide-react';
import { api } from '../lib/api';
import { useAuth } from '../lib/auth';

/** Lets a reader flag a mistake in the lesson they're on. */
export default function ReportError({ course, lesson }: { course: string; lesson: string }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'busy' | 'sent'>('idle');
  const [err, setErr] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setState('busy'); setErr('');
    try {
      await api('/reports', { body: { course, lesson, message, email: user ? undefined : email } });
      setState('sent'); setMessage('');
    } catch (e2) { setErr((e2 as Error).message); setState('idle'); }
  };

  if (state === 'sent') {
    return <p className="mt-6 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800 ring-1 ring-emerald-200">Thanks for the report. We'll check this lesson and correct it if needed.</p>;
  }
  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-ink">
        <Flag size={15} /> Report an error in this lesson
      </button>
    );
  }
  return (
    <form onSubmit={submit} className="mt-6 rounded-2xl border border-slate-200 p-5">
      <div className="font-semibold text-ink">Report an error</div>
      <p className="mt-1 text-sm text-slate-500">Tell us what looks wrong: a typo, a wrong answer, an unclear step. Mention the section or problem number if you can.</p>
      <textarea id="report-message" required minLength={5} maxLength={3000} value={message} onChange={(e) => setMessage(e.target.value)}
        placeholder="e.g. Problem 3: I get 1.2 mA, not 1.8 mA, because…"
        className="mt-3 min-h-28 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-volt focus:ring-2 focus:ring-blue-100" />
      {!user && (
        <input id="report-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email (optional, if you'd like a reply)"
          className="mt-3 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-volt focus:ring-2 focus:ring-blue-100" />
      )}
      {err && <p className="mt-2 text-sm text-rose-600">{err}</p>}
      <div className="mt-3 flex gap-3">
        <button disabled={state === 'busy'} className="btn-primary">{state === 'busy' ? 'Sending…' : 'Send report'}</button>
        <button type="button" onClick={() => setOpen(false)} className="btn-ghost">Cancel</button>
      </div>
    </form>
  );
}
