import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Hammer, Lock } from 'lucide-react';
import { useApi, useTitle } from '../lib/hooks';
import type { CourseDetail, LessonPayload } from '../lib/api';
import { useAuth } from '../lib/auth';
import { useProgress } from '../lib/progress';
import Markdown from '../components/Markdown';
import ReportError from '../components/ReportError';
import NotFound from './NotFound';

export default function Lesson() {
  const { slug, lessonId } = useParams();
  const { user } = useAuth();
  const { data: lesson, error, loading } = useApi<LessonPayload>(`/courses/${slug}/lessons/${lessonId}`, user?.subscribed);
  const { data: course } = useApi<CourseDetail>(`/courses/${slug}`);
  const { byCourse, toggle } = useProgress(!!user);
  useTitle(lesson?.title ?? '');

  if (error?.status === 404) return <NotFound />;
  if (loading && !lesson) return <div className="mx-auto max-w-7xl px-4 py-14 text-slate-500">Loading…</div>;
  if (!lesson) return <div className="mx-auto max-w-7xl px-4 py-14 text-rose-600">{error?.message ?? 'Could not load lesson.'}</div>;

  const done = byCourse[lesson.course.slug]?.has(lesson.id) ?? false;
  const [u, l] = lesson.id.split('-');

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[280px_1fr]">
      {/* Outline */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
          <Link to={`/courses/${lesson.course.slug}`} className="font-mono text-xs font-semibold text-copper-dark hover:underline">{lesson.course.code}</Link>
          <div className="mt-1 font-bold text-ink">{lesson.course.title}</div>
          {course?.units.map((unit, ui) => (
            <div key={unit.title} className="mt-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">{ui + 1}. {unit.title}</div>
              <ul className="mt-2 space-y-0.5">
                {unit.lessons.map((x) => {
                  const active = x.id === lesson.id;
                  const isDone = byCourse[lesson.course.slug]?.has(x.id);
                  return (
                    <li key={x.id}>
                      <Link to={`/courses/${lesson.course.slug}/lessons/${x.id}`}
                        className={`flex items-start gap-2 rounded-lg px-2 py-1.5 text-sm ${active ? 'bg-slate-100 font-semibold text-ink' : 'text-slate-600 hover:bg-slate-50'}`}>
                        {isDone ? <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-500" /> : (!x.free && !user?.subscribed ? <Lock size={13} className="mt-1 shrink-0 text-slate-300" /> : <span className="w-[15px] shrink-0" />)}
                        <span>{x.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      <article className="min-w-0 max-w-3xl">
        <div className="text-sm text-slate-500">
          <Link to={`/courses/${lesson.course.slug}`} className="hover:text-ink">{lesson.course.code} · {lesson.course.title}</Link>
          <span className="mx-2">/</span>Unit {u}: {lesson.unitTitle}
        </div>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          <span className="mr-3 font-mono text-2xl text-slate-300">{u}.{l}</span>{lesson.title}
        </h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {lesson.topics.map((t) => <span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{t}</span>)}
        </div>

        <div className="mt-8">
          {lesson.locked ? (
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-copper"><Lock /></div>
              <h2 className="mt-5 text-2xl font-bold text-ink">This lesson is for subscribers</h2>
              <p className="mx-auto mt-2 max-w-md text-slate-600">
                Unlock every lesson, worked example, and practice problem across all {course ? 'courses' : 'Ohmentum courses'}. The first lesson of every course is always free.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {user ? <Link to="/pricing" className="btn-primary">See plans</Link> : <><Link to="/signup" className="btn-primary">Create a free account</Link><Link to="/login" className="btn-ghost">Sign in</Link></>}
              </div>
            </div>
          ) : lesson.markdown ? (
            <Markdown source={lesson.markdown} />
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 p-8">
              <div className="flex items-center gap-3 text-copper-dark"><Hammer size={20} /><span className="font-semibold">Full lesson in production</span></div>
              <p className="mt-3 leading-7 text-slate-600">
                The written lesson, worked examples, and problem set for this topic are being authored. It will cover:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">{lesson.topics.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          )}
        </div>

        {!lesson.locked && lesson.markdown && (
          <p className="mt-10 border-t border-slate-200 pt-4 text-xs leading-5 text-slate-500">
            For education only, not professional engineering advice. Electricity can cause serious injury, death and fire: never work on mains-voltage or high-energy circuits without proper training, supervision and protective equipment. See our <Link to="/terms" className="underline">Terms of Service</Link>.
          </p>
        )}
        {!lesson.locked && lesson.markdown && <ReportError key={lesson.id} course={lesson.course.slug} lesson={lesson.id} />}

        {!lesson.locked && user && (
          <div className="mt-12 flex items-center justify-between rounded-2xl border border-slate-200 p-5">
            <div>
              <div className="font-semibold text-ink">{done ? 'Lesson complete' : 'Finished this lesson?'}</div>
              <div className="text-sm text-slate-500">Track your progress through the course.</div>
            </div>
            <button onClick={() => toggle(lesson.course.slug, lesson.id, !done)} className={done ? 'btn-ghost' : 'btn-primary'}>
              <CheckCircle2 size={16} /> {done ? 'Completed' : 'Mark complete'}
            </button>
          </div>
        )}

        <nav className="mt-8 grid gap-4 sm:grid-cols-2">
          {lesson.prev ? (
            <Link to={`/courses/${lesson.course.slug}/lessons/${lesson.prev.id}`} className="rounded-2xl border border-slate-200 p-4 hover:border-slate-300">
              <div className="flex items-center gap-1 text-xs text-slate-500"><ArrowLeft size={14} /> Previous</div>
              <div className="mt-1 font-semibold text-ink">{lesson.prev.title}</div>
            </Link>
          ) : <span />}
          {lesson.next && (
            <Link to={`/courses/${lesson.course.slug}/lessons/${lesson.next.id}`} className="rounded-2xl border border-slate-200 p-4 text-right hover:border-slate-300">
              <div className="flex items-center justify-end gap-1 text-xs text-slate-500">Next <ArrowRight size={14} /></div>
              <div className="mt-1 font-semibold text-ink">{lesson.next.title}</div>
            </Link>
          )}
        </nav>
      </article>
    </div>
  );
}
