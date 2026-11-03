import { useMemo, useState } from 'react';
import { useApi, useTitle } from '../lib/hooks';
import type { Catalog } from '../lib/api';
import CourseCard, { TRACK_COLORS } from '../components/CourseCard';
import { useAuth } from '../lib/auth';
import { useProgress } from '../lib/progress';

export default function Curriculum() {
  useTitle('Curriculum');
  const { data, loading } = useApi<Catalog>('/catalog');
  const { user } = useAuth();
  const progress = useProgress(!!user);
  const [track, setTrack] = useState<string | null>(null);
  const tracks = useMemo(() => Object.keys(TRACK_COLORS), []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-extrabold tracking-tight text-ink">The Ohmentum Curriculum</h1>
      <p className="mt-3 max-w-3xl text-lg text-slate-600">
        A complete electrical engineering program organized into four stages, the way a university degree is sequenced. Take courses in order, or jump to what you need — prerequisites are listed on every course.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        <button onClick={() => setTrack(null)} className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${!track ? 'bg-ink text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>All tracks</button>
        {tracks.map((t) => (
          <button key={t} onClick={() => setTrack(t)} className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${track === t ? 'bg-ink text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{t}</button>
        ))}
      </div>

      {loading && <p className="mt-10 text-slate-500">Loading…</p>}
      {data && Object.entries(data.stages).map(([n, s]) => {
        const courses = data.courses.filter((c) => c.stage === Number(n) && (!track || c.track === track));
        if (!courses.length) return null;
        return (
          <section key={n} className="mt-14">
            <div className="flex items-baseline gap-3 border-b border-slate-200 pb-3">
              <span className="font-mono text-sm font-semibold text-brand-dark">STAGE {n}</span>
              <h2 className="text-2xl font-bold text-ink">{s.name}</h2>
              <span className="hidden text-sm text-slate-500 sm:inline">— {s.blurb}</span>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((c) => <CourseCard key={c.slug} course={c} progress={user ? (progress.byCourse[c.slug]?.size ?? 0) / c.lessonCount : undefined} />)}
            </div>
          </section>
        );
      })}
    </div>
  );
}
