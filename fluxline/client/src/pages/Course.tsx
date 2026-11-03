import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Circle, Clock, Lock, PlayCircle, Target } from 'lucide-react';
import { useApi, useTitle } from '../lib/hooks';
import type { Catalog, CourseDetail } from '../lib/api';
import { useAuth } from '../lib/auth';
import { useProgress } from '../lib/progress';
import { TRACK_COLORS } from '../components/CourseCard';
import NotFound from './NotFound';

export default function Course() {
  const { slug } = useParams();
  const { data: course, error, loading } = useApi<CourseDetail>(`/courses/${slug}`);
  const { data: catalog } = useApi<Catalog>('/catalog');
  const { user } = useAuth();
  const { byCourse } = useProgress(!!user);
  useTitle(course?.title ?? '');

  if (error?.status === 404) return <NotFound />;
  if (loading || !course) return <div className="mx-auto max-w-7xl px-4 py-14 text-slate-500">Loading…</div>;

  const done = byCourse[course.slug] ?? new Set<string>();
  const firstUndone = course.units.flatMap((u) => u.lessons).find((l) => !done.has(l.id)) ?? course.units[0].lessons[0];
  const titleOf = (s: string) => catalog?.courses.find((c) => c.slug === s);
  const pct = Math.round((done.size / course.lessonCount) * 100);

  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <Link to="/curriculum" className="text-sm text-slate-400 hover:text-white">← Curriculum</Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm font-semibold text-copper">{course.code}</span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${TRACK_COLORS[course.track]}`}>{course.track}</span>
          </div>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">{course.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{course.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-400">
            <span>{course.unitCount} units · {course.lessonCount} lessons</span>
            <span className="flex items-center gap-1.5"><Clock size={15} /> ~{course.hours} hours</span>
            {user && <span>{pct}% complete</span>}
          </div>
          <Link to={`/courses/${course.slug}/lessons/${firstUndone.id}`} className="btn-copper mt-8">
            <PlayCircle size={18} /> {done.size ? 'Continue' : 'Start with lesson 1 — free'}
          </Link>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="text-2xl font-bold text-ink">Syllabus</h2>
          <div className="mt-6 space-y-6">
            {course.units.map((u, ui) => (
              <div key={u.title} className="overflow-hidden rounded-2xl border border-slate-200">
                <div className="border-b border-slate-200 bg-slate-50 px-5 py-3">
                  <span className="font-mono text-xs font-semibold text-slate-500">UNIT {ui + 1}</span>
                  <h3 className="font-bold text-ink">{u.title}</h3>
                </div>
                <ul className="divide-y divide-slate-100">
                  {u.lessons.map((l) => {
                    const isDone = done.has(l.id);
                    const locked = !l.free && !user?.subscribed;
                    return (
                      <li key={l.id}>
                        <Link to={`/courses/${course.slug}/lessons/${l.id}`} className="flex items-start gap-3 px-5 py-3.5 hover:bg-slate-50">
                          {isDone ? <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-500" size={20} /> : <Circle className="mt-0.5 shrink-0 text-slate-300" size={20} />}
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-xs text-slate-400">{l.id.replace('-', '.')}</span>
                              <span className="font-medium text-ink">{l.title}</span>
                              {l.free && <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">Free</span>}
                              {!l.written && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">Outline</span>}
                            </div>
                            <p className="mt-0.5 text-sm text-slate-500">{l.topics.join(' · ')}</p>
                          </div>
                          {locked && <Lock className="mt-1 shrink-0 text-slate-400" size={16} />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 p-5">
            <h3 className="flex items-center gap-2 font-bold text-ink"><Target size={18} className="text-copper-dark" /> Learning outcomes</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {course.outcomes.map((o) => <li key={o} className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />{o}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-ink">Prerequisites</h3>
            {course.prereqs.length === 0 ? <p className="mt-2 text-sm text-slate-600">None — a great place to start.</p> : (
              <ul className="mt-3 space-y-2 text-sm">
                {course.prereqs.map((p) => {
                  const c = titleOf(p);
                  return <li key={p}><Link to={`/courses/${p}`} className="text-volt hover:underline">{c ? `${c.code} · ${c.title}` : p}</Link></li>;
                })}
              </ul>
            )}
          </div>
          {!user?.subscribed && (
            <div className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200">
              <h3 className="font-bold text-ink">Unlock the full course</h3>
              <p className="mt-2 text-sm text-slate-600">Lesson 1 is free. Subscribe for every lesson in every course.</p>
              <Link to="/pricing" className="btn-primary mt-4 w-full">See plans</Link>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
