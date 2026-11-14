import { Link, Navigate } from 'react-router-dom';
import { ArrowRight, BadgeCheck, BookCheck, ClipboardCheck, RotateCcw } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { useApi, useTitle } from '../lib/hooks';
import type { Catalog } from '../lib/api';
import { useProgress } from '../lib/progress';
import CourseCard from '../components/CourseCard';
import MhoTeaser from '../components/MhoTeaser';

export default function Dashboard() {
  useTitle('My learning');
  const { user, loading } = useAuth();
  const { data } = useApi<Catalog>('/catalog');
  const { rows, byCourse, attempts, mastered } = useProgress(!!user);
  const { data: review } = useApi<{ total: number }>(user?.subscribed ? '/review' : null, user?.subscribed);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const totalDone = rows.length;
  const inProgress = data?.courses.filter((c) => byCourse[c.slug]?.size) ?? [];
  const last = rows[0];
  const lastCourse = last && data?.courses.find((c) => c.slug === last.course_slug);
  const suggested = data?.courses.filter((c) => !byCourse[c.slug] && c.prereqs.every((p) => byCourse[p]?.size)).slice(0, 3) ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-ink">{totalDone ? 'Welcome back' : 'Welcome'}, {user.name}</h1>
      <p className="mt-2 text-slate-600">
        {totalDone
          ? `You've completed ${totalDone} lesson${totalDone === 1 ? '' : 's'}${data ? ` of ${data.totals.lessons}` : ''}.`
          : user.subscribed
            ? 'Every course is unlocked. Pick one below, or browse the full curriculum.'
            : 'Pick a course and start with its free first lesson.'}
      </p>

      {!user.subscribed && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-emerald-50 p-5 ring-1 ring-emerald-200">
          <div><div className="font-semibold text-ink">You're on the free plan</div><div className="text-sm text-slate-600">Subscribe to unlock every lesson in every course.</div></div>
          <Link to="/pricing" className="btn-primary">Upgrade</Link>
        </div>
      )}

      {(totalDone > 0 || attempts.length > 0) && (
        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-5">
          <Stat icon={<BookCheck size={18} />} value={totalDone} label={`lesson${totalDone === 1 ? '' : 's'} done`} />
          <Stat icon={<BadgeCheck size={18} />} value={mastered.length} label={`unit${mastered.length === 1 ? '' : 's'} mastered`} hint="Every lesson complete and the unit quiz passed" />
          <Stat icon={<ClipboardCheck size={18} />} value={attempts.filter((a) => a.best >= 70).length} label="quizzes passed" />
        </div>
      )}

      {!!review?.total && (
        <Link to="/review" className="mt-5 flex items-center gap-4 rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200 hover:bg-amber-100">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-200/70 text-amber-900"><RotateCcw size={20} /></div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-ink">{review.total} question{review.total === 1 ? '' : 's'} to review</div>
            <div className="text-sm text-slate-600">Rework the quiz questions you missed until each one is cleared.</div>
          </div>
          <ArrowRight className="shrink-0 text-slate-400" />
        </Link>
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

      <div className="mt-8"><MhoTeaser compact /></div>

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

function Stat({ icon, value, label, hint }: { icon: React.ReactNode; value: number; label: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4 sm:p-5" title={hint}>
      <div className="text-brand-dark">{icon}</div>
      <div className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">{value}</div>
      <div className="text-xs text-slate-500 sm:text-sm">{label}</div>
    </div>
  );
}
