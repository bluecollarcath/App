import { Link, useParams } from 'react-router-dom';
import { Lock, NotebookText, Printer } from 'lucide-react';
import { useApi, useTitle } from '../lib/hooks';
import { useAuth } from '../lib/auth';
import Markdown from '../components/Markdown';
import NotFound from './NotFound';

interface SummaryPayload {
  course: { slug: string; code: string; title: string };
  locked: boolean;
  units: { title: string; lessons: { id: string; title: string; locked: boolean; takeaways: string | null }[] }[];
}

/** Every lesson's "Key takeaways" for one course, in order, on one printable page. */
export default function CourseSummary() {
  const { slug } = useParams();
  const { user } = useAuth();
  const { data, error, loading } = useApi<SummaryPayload>(`/courses/${slug}/summary`, user?.subscribed);
  useTitle(data ? `Summary Notes: ${data.course.title}` : '');

  if (error?.status === 404) return <NotFound />;
  if (loading && !data) return <div className="mx-auto max-w-7xl px-4 py-14 text-slate-500">Loading…</div>;
  if (!data) return <div className="mx-auto max-w-7xl px-4 py-14 text-rose-600">{error?.message ?? 'Could not load the summary notes.'}</div>;

  const base = `/courses/${data.course.slug}`;
  return (
    <div className="summary-print mx-auto max-w-3xl px-4 py-10 sm:px-6 print:max-w-none print:p-0">
      <Link to={base} className="text-sm text-slate-500 hover:text-ink print:hidden">← {data.course.code} · {data.course.title}</Link>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-dark print:text-slate-500">
            <NotebookText size={15} className="print:hidden" /> Summary notes
            <span className="hidden normal-case tracking-normal print:inline">· Ohmentum · www.ohmentum.com</span>
          </div>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl print:text-2xl">{data.course.code}: {data.course.title}</h1>
          <p className="mt-2 text-slate-600 print:hidden">The key takeaways from every lesson, in order. Use it to review before a quiz or exam, then open any lesson for the full explanation.</p>
        </div>
        {!data.locked && (
          <button type="button" onClick={() => window.print()} className="btn-ghost print:hidden">
            <Printer size={16} /> Print or save PDF
          </button>
        )}
      </div>

      {data.locked && (
        <div className="mt-6 rounded-2xl bg-emerald-50 p-5 ring-1 ring-emerald-200 print:hidden">
          <div className="font-semibold text-ink">Subscribers get the full summary notes</div>
          <p className="mt-1 text-sm text-slate-600">You're seeing the first lesson's takeaways as a sample. Subscribe to unlock every lesson's notes, quizzes and study sheets.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {user ? <Link to="/pricing" className="btn-primary">See plans</Link> : <><Link to="/signup" className="btn-primary">Create a free account</Link><Link to="/login" className="btn-ghost">Sign in</Link></>}
          </div>
        </div>
      )}

      <div className="mt-8 space-y-10 print:mt-4 print:space-y-5">
        {data.units.map((u, ui) => (
          <section key={u.title} className="unit-sum">
            <h2 className="border-b border-slate-200 pb-2 text-xl font-bold text-ink print:text-base">
              <span className="mr-2 font-mono text-sm text-slate-400">UNIT {ui + 1}</span>{u.title}
            </h2>
            <div className="mt-4 space-y-6 print:mt-2 print:space-y-3">
              {u.lessons.map((l) => (
                <div key={l.id} className="lesson-sum">
                  <h3 className="flex items-center gap-2 font-semibold text-ink">
                    <span className="font-mono text-xs text-slate-400">{l.id.replace('-', '.')}</span>
                    <Link to={`${base}/lessons/${l.id}`} className="hover:text-volt">{l.title}</Link>
                    {l.locked && <Lock size={13} className="text-slate-400" />}
                  </h3>
                  {l.takeaways
                    ? <div className="mt-1"><Markdown source={l.takeaways} /></div>
                    : l.locked ? <p className="mt-1 text-sm text-slate-400">Subscribers only.</p> : null}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
