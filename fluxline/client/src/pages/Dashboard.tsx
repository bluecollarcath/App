import { Link, Navigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { useApi, useTitle } from '../lib/hooks';
import type { Catalog } from '../lib/api';
import { useProgress } from '../lib/progress';
import CourseCard from '../components/CourseCard';

export default function Dashboard() {
  useTitle('My learning');
  const { user, loading } = useAuth();
  const { data } = useApi<Catalog>('/catalog');
  const { rows, byCourse } = useProgress(!!user);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const totalDone = rows.length;
  const inProgress = data?.courses.filter((c) => byCourse[c.slug]?.size) ?? [];
  const last = rows[0];
  const lastCourse = last && data?.courses.find((c) => c.slug === last.course_slug);
  const suggested = data?.courses.filter((c) => !byCourse[c.slug] && c.prereqs.every((p) => byCourse[p]?.size)).slice(0, 3) ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-ink">Welcome back, {user.name}</h1>
      <p className="mt-2 text-slate-600">{totalDone ? `You've completed ${totalDone} lesson${totalDone === 1 ? '' : 's'}${data ? ` of ${data.totals.lessons}` : ''}.` : 'Pick a course and start with its free first lesson.'}</p>

      {!user.subscribed && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-emerald-50 p-5 ring-1 ring-emerald-200">
          <div><div className="font-semibold text-ink">You're on the free plan</div><div className="text-sm text-slate-600">Subscribe to unlock every lesson in every course.</div></div>
          <Link to="/pricing" className="btn-primary">Upgrade</Link>
        </div>
      )}

      {lastCourse && (
        <Link to={`/courses/${lastCourse.slug}`} className="mt-8 flex items-center justify-between rounded-2xl bg-ink p-6 text-white hover:bg-slate-800">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-brand">Continue</div>
            <div className="mt-1 text-xl font-bold">{lastCourse.title}</div>
            <div className="text-sm text-slate-400">{byCourse[lastCourse.slug]?.size ?? 0} of {lastCourse.lessonCount} lessons complete</div>
          </div>
          <ArrowRight />
        </Link>
      )}

      {inProgress.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-ink">In progress</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {inProgress.map((c) => <CourseCard key={c.slug} course={c} progress={(byCourse[c.slug]?.size ?? 0) / c.lessonCount} />)}
          </div>
        </section>
      )}

      {suggested.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-ink">{inProgress.length ? 'Ready for you next' : 'Good places to start'}</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {suggested.map((c) => <CourseCard key={c.slug} course={c} />)}
          </div>
        </section>
      )}
    </div>
  );
}
