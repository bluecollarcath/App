import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Award, CheckCircle2, ClipboardCheck, Lock, RotateCcw, XCircle } from 'lucide-react';
import { api, type ApiError } from '../lib/api';
import { useAuth } from '../lib/auth';
import { useApi, useTitle } from '../lib/hooks';
import Markdown, { InlineMd } from '../components/Markdown';
import NotFound from './NotFound';

interface Question { prompt: string; type: 'numeric' | 'choice'; unit?: string; choices?: string[] }
interface Payload {
  course: { slug: string; code: string; title: string };
  id: string; kind: 'unit' | 'final'; title: string; questionCount: number; passPercent: number;
  locked: boolean; intro?: string; questions?: Question[]; best?: number | null; attempts?: number;
}
interface Result {
  score: number; total: number; percent: number; passed: boolean; best: number; attempts: number;
  results: { correct: boolean; given: string | number | null; answer: string; explanation: string }[];
}

export default function Assessment() {
  const { slug, aid } = useParams();
  const { user } = useAuth();
  const { data, error, loading } = useApi<Payload>(`/courses/${slug}/assessments/${aid}`, user?.subscribed);
  const [answers, setAnswers] = useState<(string | number | null)[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [confirmBlank, setConfirmBlank] = useState(false);
  useTitle(data?.title ?? 'Quiz');

  useEffect(() => { setAnswers(new Array(data?.questions?.length ?? 0).fill(null)); setResult(null); }, [data]);

  if ((error as ApiError | null)?.status === 404) return <NotFound />;
  if (loading && !data) return <div className="mx-auto max-w-3xl px-4 py-14 text-slate-500">Loading…</div>;
  if (!data) return <div className="mx-auto max-w-3xl px-4 py-14 text-rose-600">{error?.message ?? 'Could not load this quiz.'}</div>;

  const blanks = answers.filter((a) => a === null || a === '').length;
  const submit = async () => {
    if (blanks > 0 && !confirmBlank) { setConfirmBlank(true); return; }
    setBusy(true); setErr(''); setConfirmBlank(false);
    try {
      const r = await api<Result>(`/courses/${slug}/assessments/${aid}/submit`, { body: { answers } });
      setResult(r);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) { setErr((e as Error).message); }
    finally { setBusy(false); }
  };
  const retake = () => { setResult(null); setAnswers(new Array(data.questions?.length ?? 0).fill(null)); window.scrollTo({ top: 0 }); };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link to={`/courses/${data.course.slug}`} className="text-sm text-slate-500 hover:text-ink">← {data.course.code} · {data.course.title}</Link>
      <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-brand-dark">
        {data.kind === 'final' ? <Award size={18} /> : <ClipboardCheck size={18} />} {data.kind === 'final' ? 'Final exam' : 'Unit quiz'}
      </div>
      <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{data.title}</h1>
      <p className="mt-3 text-slate-600">
        {data.questionCount} questions · {data.passPercent}% to pass · unlimited attempts
        {!!data.attempts && !result && <> · your best: <strong className="text-ink">{data.best}%</strong> ({data.attempts} attempt{data.attempts === 1 ? '' : 's'})</>}
      </p>

      {data.locked ? (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-brand"><Lock /></div>
          <h2 className="mt-5 text-2xl font-bold text-ink">Quizzes and exams are for subscribers</h2>
          <p className="mx-auto mt-2 max-w-md text-slate-600">Test yourself on each unit and earn a passing score on the final exam.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {user ? <Link to="/pricing" className="btn-primary">See plans</Link> : <><Link to="/signup" className="btn-primary">Create a free account</Link><Link to="/login" className="btn-ghost">Sign in</Link></>}
          </div>
        </div>
      ) : (
        <>
          {result && (
            <div className={`mt-8 rounded-2xl p-6 ring-1 ${result.passed ? 'bg-emerald-50 ring-emerald-200' : 'bg-amber-50 ring-amber-200'}`}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-4xl font-extrabold text-ink">{result.percent}%</div>
                  <div className="mt-1 text-sm text-slate-700">{result.score} of {result.total} correct · {result.passed ? 'Passed' : `${data.passPercent}% needed to pass`} · best {result.best}%</div>
                </div>
                <div className="flex gap-3">
                  <button onClick={retake} className="btn-ghost"><RotateCcw size={16} /> Try again</button>
                  <Link to={`/courses/${data.course.slug}`} className="btn-primary">Back to course</Link>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600">{result.passed ? 'Nice work. Review any misses below before moving on.' : 'Review the solutions below, revisit the lessons, then try again.'}</p>
            </div>
          )}

          {data.intro && !result && <div className="mt-6"><Markdown source={data.intro} /></div>}

          <ol className="mt-8 space-y-5">
            {(data.questions ?? []).map((q, i) => {
              const r = result?.results[i];
              return (
                <li key={i} className={`rounded-2xl border p-5 sm:p-6 ${r ? (r.correct ? 'border-emerald-200 bg-emerald-50/40' : 'border-rose-200 bg-rose-50/40') : 'border-slate-200 bg-slate-50/60'}`}>
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-brand-dark">
                    Question {i + 1}
                    {r && (r.correct ? <span className="flex items-center gap-1 text-emerald-600"><CheckCircle2 size={16} /> Correct</span> : <span className="flex items-center gap-1 text-rose-600"><XCircle size={16} /> Incorrect</span>)}
                  </div>
                  <div className="mt-2 text-[16px] leading-7 text-ink"><InlineMd text={q.prompt} /></div>
                  {q.type === 'choice' ? (
                    <div className="mt-4 grid gap-2">
                      {q.choices!.map((c, ci) => {
                        const picked = answers[i] === ci;
                        return (
                          <button key={ci} type="button" disabled={!!result}
                            onClick={() => setAnswers((a) => a.map((v, k) => (k === i ? ci : v)))}
                            className={`rounded-xl border px-4 py-2.5 text-left text-[15px] transition ${picked ? 'border-volt bg-blue-50' : 'border-slate-200 bg-white hover:border-slate-300'} disabled:cursor-default`}>
                            <InlineMd text={c} />
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="mt-4 flex w-fit items-center overflow-hidden rounded-xl border border-slate-300 bg-white focus-within:border-volt">
                      <input id={`q${i}`} value={(answers[i] as string) ?? ''} disabled={!!result} inputMode="decimal" placeholder="Your answer" aria-label={`Answer to question ${i + 1}`}
                        onChange={(e) => { const v = e.target.value; setAnswers((a) => a.map((x, k) => (k === i ? v : x))); }}
                        className="w-40 px-3 py-2 font-mono text-sm outline-none disabled:bg-slate-50" />
                      {q.unit && <span className="border-l border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">{q.unit}</span>}
                    </div>
                  )}
                  {r && (
                    <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-[15px] leading-7 text-slate-700">
                      <div className="font-semibold text-ink">Answer: <InlineMd text={r.answer} /></div>
                      {r.explanation && <InlineMd text={r.explanation} />}
                    </div>
                  )}
                </li>
              );
            })}
          </ol>

          {!result && (
            <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 p-5">
              <button onClick={submit} disabled={busy} className="btn-primary px-6 py-2.5">{busy ? 'Grading…' : confirmBlank ? `Submit with ${blanks} unanswered` : 'Submit answers'}</button>
              <span className="text-sm text-slate-500">
                {confirmBlank ? <>You left {blanks} question{blanks === 1 ? '' : 's'} blank; they'll be marked wrong. <button className="font-semibold text-volt" onClick={() => setConfirmBlank(false)}>Keep working</button></> : `${answers.length - blanks} of ${answers.length} answered`}
              </span>
              {err && <p className="w-full text-sm text-rose-600">{err}</p>}
            </div>
          )}
        </>
      )}
    </div>
  );
}
