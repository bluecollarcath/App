import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { CheckCircle2, ClipboardCheck, Eye, Lock, PartyPopper, RotateCcw, XCircle } from 'lucide-react';
import { api } from '../lib/api';
import { useAuth } from '../lib/auth';
import { useApi, useTitle } from '../lib/hooks';
import { InlineMd } from '../components/Markdown';

interface Question { prompt: string; type: 'numeric' | 'choice'; unit?: string; choices?: string[] }
export interface ReviewItem {
  course: { slug: string; code: string; title: string };
  assessmentId: string; assessmentTitle: string; index: number; missedAt: string; question: Question;
}
interface Check { correct: boolean; answer?: string; explanation?: string }

export default function Review() {
  useTitle('Review your mistakes');
  const { user, loading } = useAuth();
  const { data, error, loading: busy } = useApi<{ items: ReviewItem[]; total: number }>(user?.subscribed ? '/review' : null, user?.subscribed);
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const groups = new Map<string, ReviewItem[]>();
  for (const it of data?.items ?? []) {
    const k = `${it.course.slug}/${it.assessmentId}`;
    groups.set(k, [...(groups.get(k) ?? []), it]);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Review your mistakes</h1>
      <p className="mt-3 text-slate-600">
        Every question you missed on your latest quiz and exam attempts. Answer it again here; once you get it right, it leaves the list.
      </p>

      {!user.subscribed ? (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-brand"><Lock /></div>
          <h2 className="mt-5 text-2xl font-bold text-ink">Quizzes and review are for subscribers</h2>
          <p className="mx-auto mt-2 max-w-md text-slate-600">Take unit quizzes and final exams, then drill exactly the questions you missed.</p>
          <Link to="/pricing" className="btn-primary mt-6">See plans</Link>
        </div>
      ) : busy && !data ? (
        <p className="mt-8 text-slate-500">Loading…</p>
      ) : error ? (
        <p className="mt-8 text-rose-600">{error.message}</p>
      ) : !data?.items.length ? (
        <div className="mt-8 rounded-2xl bg-emerald-50 p-8 text-center ring-1 ring-emerald-200">
          <PartyPopper className="mx-auto text-emerald-600" size={36} />
          <h2 className="mt-4 text-xl font-bold text-ink">Nothing to review</h2>
          <p className="mx-auto mt-2 max-w-md text-slate-600">
            You've cleared every question you missed. Take another unit quiz, and anything you miss will show up here.
          </p>
          <Link to="/dashboard" className="btn-primary mt-6">Back to my learning</Link>
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {[...groups.values()].map((items) => (
            <section key={`${items[0].course.slug}/${items[0].assessmentId}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <div className="font-mono text-xs font-semibold text-brand-dark">{items[0].course.code} · {items[0].course.title}</div>
                  <h2 className="text-xl font-bold text-ink">{items[0].assessmentTitle}</h2>
                </div>
                <Link to={`/courses/${items[0].course.slug}/assess/${items[0].assessmentId}`} className="flex items-center gap-1.5 text-sm font-semibold text-volt hover:underline">
                  <RotateCcw size={14} /> Retake the full quiz
                </Link>
              </div>
              <ol className="mt-4 space-y-4">
                {items.map((it) => <ReviewCard key={it.index} item={it} />)}
              </ol>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function ReviewCard({ item }: { item: ReviewItem }) {
  const q = item.question;
  const [answer, setAnswer] = useState<string | number | null>(null);
  const [check, setCheck] = useState<Check | null>(null);
  const [tries, setTries] = useState(0);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const cleared = check?.correct === true;
  const revealed = !!check?.answer && !cleared;

  const send = async (reveal = false) => {
    setBusy(true); setErr('');
    try {
      const r = await api<Check>('/review/check', { body: { course: item.course.slug, assessment: item.assessmentId, index: item.index, answer, reveal } });
      setCheck(r);
      if (!reveal && !r.correct) setTries((t) => t + 1);
    } catch (e) { setErr((e as Error).message); }
    finally { setBusy(false); }
  };

  return (
    <li className={`rounded-2xl border p-5 ${cleared ? 'border-emerald-200 bg-emerald-50/50' : 'border-slate-200 bg-slate-50/60'}`}>
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500">
        <span className="flex items-center gap-1.5"><ClipboardCheck size={14} /> Question {item.index + 1}</span>
        {cleared && <span className="flex items-center gap-1 text-emerald-600"><CheckCircle2 size={16} /> Cleared</span>}
        {check && !check.correct && !revealed && <span className="flex items-center gap-1 text-rose-600"><XCircle size={16} /> Not yet</span>}
      </div>
      <div className="mt-2 text-[16px] leading-7 text-ink"><InlineMd text={q.prompt} /></div>

      {q.type === 'choice' ? (
        <div className="mt-4 grid gap-2">
          {q.choices!.map((c, ci) => (
            <button key={ci} type="button" disabled={cleared || revealed} onClick={() => { setAnswer(ci); if (check && !check.correct) setCheck(null); }}
              className={`rounded-xl border px-4 py-2.5 text-left text-[15px] transition ${answer === ci ? 'border-volt bg-blue-50' : 'border-slate-200 bg-white hover:border-slate-300'} disabled:cursor-default`}>
              <InlineMd text={c} />
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-4 flex w-fit items-center overflow-hidden rounded-xl border border-slate-300 bg-white focus-within:border-volt">
          <input value={(answer as string) ?? ''} disabled={cleared || revealed} inputMode="decimal" placeholder="Your answer" aria-label={`Answer to question ${item.index + 1}`}
            onChange={(e) => { setAnswer(e.target.value); if (check && !check.correct) setCheck(null); }}
            onKeyDown={(e) => { if (e.key === 'Enter' && answer !== null && answer !== '') void send(); }}
            className="w-40 px-3 py-2 font-mono text-sm outline-none disabled:bg-slate-50" />
          {q.unit && <span className="border-l border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">{q.unit}</span>}
        </div>
      )}

      {!cleared && !revealed && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => send()} disabled={busy || answer === null || answer === ''} className="btn-primary">
            {busy ? 'Checking…' : 'Check'}
          </button>
          {check && !check.correct && <span className="text-sm text-rose-700">Not quite. Rework it and try again.</span>}
          {tries > 0 && (
            <button type="button" onClick={() => send(true)} disabled={busy} className="flex items-center gap-1.5 text-sm font-semibold text-volt hover:underline">
              <Eye size={15} /> Show solution
            </button>
          )}
        </div>
      )}
      {err && <p className="mt-2 text-sm text-rose-600">{err}</p>}

      {(cleared || revealed) && (
        <div className={`mt-4 rounded-xl border p-4 text-[15px] leading-7 text-slate-700 ${cleared ? 'border-emerald-200 bg-white' : 'border-amber-200 bg-amber-50'}`}>
          <div className="font-semibold text-ink">{cleared ? 'Correct. ' : ''}Answer: <InlineMd text={check!.answer!} /></div>
          {check!.explanation && <InlineMd text={check!.explanation} />}
          {revealed && <p className="mt-2 text-sm text-amber-800">This one stays on your list. Come back and solve it without the solution to clear it.</p>}
        </div>
      )}
    </li>
  );
}
