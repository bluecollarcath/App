import { Link } from 'react-router-dom';
import { Clock, Layers } from 'lucide-react';
import type { CourseSummary } from '../lib/api';

export const TRACK_COLORS: Record<string, string> = {
  'Math & Science': 'bg-violet-100 text-violet-700',
  'Circuits & Electronics': 'bg-amber-100 text-amber-800',
  'Signals & Systems': 'bg-sky-100 text-sky-700',
  'Fields & Waves': 'bg-rose-100 text-rose-700',
  'Digital & Computing': 'bg-emerald-100 text-emerald-700',
  'Power & Energy': 'bg-orange-100 text-orange-700',
  Professional: 'bg-slate-200 text-slate-700',
};

export default function CourseCard({ course, progress }: { course: CourseSummary; progress?: number }) {
  return (
    <Link to={`/courses/${course.slug}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/60">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-xs font-semibold text-slate-500">{course.code}</span>
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${TRACK_COLORS[course.track] ?? ''}`}>{course.track}</span>
      </div>
      <h3 className="mt-3 text-lg font-bold leading-snug text-ink group-hover:text-volt">{course.title}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">{course.description}</p>
      <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1"><Layers size={14} /> {course.lessonCount} lessons</span>
        <span className="flex items-center gap-1"><Clock size={14} /> ~{course.hours} hrs</span>
      </div>
      {progress !== undefined && (
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-copper" style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
      )}
    </Link>
  );
}
