import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, ClipboardCheck, Lock, Printer } from 'lucide-react';
import { useApi, useTitle } from '../lib/hooks';
import type { NotesPayload } from '../lib/api';
import { useAuth } from '../lib/auth';
import Markdown from '../components/Markdown';
import NotFound from './NotFound';

export default function StudySheet() {
  const { slug, unit } = useParams();
  const { user } = useAuth();
  const { data: sheet, error, loading } = useApi<NotesPayload>(`/courses/${slug}/notes/${unit}`, user?.subscribed);
  useTitle(sheet ? `Unit ${sheet.unit} Study Sheet: ${sheet.unitTitle}` : '');

  if (error?.status === 404) return <NotFound />;
  if (loading && !sheet) return <div className="mx-auto max-w-7xl px-4 py-14 text-slate-500">Loading…</div>;
  if (!sheet) return <div className="mx-auto max-w-7xl px-4 py-14 text-rose-600">{error?.message ?? 'Could not load the study sheet.'}</div>;

  const base = `/courses/${sheet.course.slug}`;
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 print:max-w-none print:p-0">
      <div className="text-sm text-slate-500 print:hidden">
        <Link to={base} className="hover:text-ink">{sheet.course.code} · {sheet.course.title}</Link>
        <span className="mx-2">/</span>Unit {sheet.unit}
      </div>
      <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-dark print:text-slate-500">
            <BookOpen size={15} className="print:hidden" /> Unit {sheet.unit} study sheet
            <span className="hidden normal-case tracking-normal print:inline">· {sheet.course.code} {sheet.course.title} · Ohmentum</span>
          </div>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl print:text-2xl">{sheet.unitTitle}</h1>
        </div>
        {!sheet.locked && (
          <button type="button" onClick={() => window.print()} className="btn-ghost print:hidden">
            <Printer size={16} /> Print or save PDF
          </button>
        )}
      </div>

      <div className="mt-8 print:mt-4">
        {sheet.locked ? (
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-brand"><Lock /></div>
            <h2 className="mt-5 text-2xl font-bold text-ink">Study sheets are for subscribers</h2>
            <p className="mx-auto mt-2 max-w-md text-slate-600">
              Every unit has a one-page sheet: the formulas and when to use them, a solving recipe, the traps that cost points, and a quick self-test. The Unit 1 sheet of every course is free.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {user ? <Link to="/pricing" className="btn-primary">See plans</Link> : <><Link to="/signup" className="btn-primary">Create a free account</Link><Link to="/login" className="btn-ghost">Sign in</Link></>}
              <Link to={`${base}/notes/1`} className="btn-ghost">Try the free Unit 1 sheet</Link>
            </div>
          </div>
        ) : (
          <div className="study-sheet"><Markdown source={sheet.markdown ?? ''} /></div>
        )}
      </div>

      <section className="mt-12 rounded-2xl border border-slate-200 p-5 print:hidden">
        <h2 className="font-bold text-ink">Go deeper</h2>
        <ul className="mt-3 space-y-1.5 text-sm">
          {sheet.lessons.map((l) => (
            <li key={l.id}><Link to={`${base}/lessons/${l.id}`} className="text-volt hover:underline"><span className="font-mono text-slate-400">{l.id.replace('-', '.')}</span> {l.title}</Link></li>
          ))}
        </ul>
        {sheet.hasQuiz && (
          <Link to={`${base}/assess/unit-${sheet.unit}`} className="btn-primary mt-5">
            <ClipboardCheck size={16} /> Ready? Take the Unit {sheet.unit} quiz
          </Link>
        )}
      </section>

      <nav className="mt-6 grid gap-4 sm:grid-cols-2 print:hidden">
        {sheet.prevUnit ? (
          <Link to={`${base}/notes/${sheet.prevUnit}`} className="rounded-2xl border border-slate-200 p-4 hover:border-slate-300">
            <div className="flex items-center gap-1 text-xs text-slate-500"><ArrowLeft size={14} /> Previous sheet</div>
            <div className="mt-1 font-semibold text-ink">Unit {sheet.prevUnit}</div>
          </Link>
        ) : <span />}
        {sheet.nextUnit && (
          <Link to={`${base}/notes/${sheet.nextUnit}`} className="rounded-2xl border border-slate-200 p-4 text-right hover:border-slate-300">
            <div className="flex items-center justify-end gap-1 text-xs text-slate-500">Next sheet <ArrowRight size={14} /></div>
            <div className="mt-1 font-semibold text-ink">Unit {sheet.nextUnit}</div>
          </Link>
        )}
      </nav>
    </div>
  );
}
