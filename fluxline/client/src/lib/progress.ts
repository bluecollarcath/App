import { useCallback, useEffect, useState } from 'react';
import { api } from './api';

export interface ProgressRow { course_slug: string; lesson_id: string; completed_at: string }
export interface AttemptRow { course_slug: string; assessment_id: string; best: number; attempts: number }

export function useProgress(enabled: boolean) {
  const [rows, setRows] = useState<ProgressRow[]>([]);
  const [attempts, setAttempts] = useState<AttemptRow[]>([]);
  const load = useCallback(() => {
    if (!enabled) { setRows([]); setAttempts([]); return; }
    api<{ completed: ProgressRow[]; assessments?: AttemptRow[] }>('/progress')
      .then((r) => { setRows(r.completed); setAttempts(r.assessments ?? []); })
      .catch(() => { setRows([]); setAttempts([]); });
  }, [enabled]);
  useEffect(load, [load]);

  const byCourse: Record<string, Set<string>> = {};
  for (const r of rows) (byCourse[r.course_slug] ??= new Set()).add(r.lesson_id);

  const toggle = async (course: string, lesson: string, completed: boolean) => {
    await api('/progress', { body: { course, lesson, completed } });
    load();
  };
  const best = (course: string, id: string) => attempts.find((a) => a.course_slug === course && a.assessment_id === id);
  return { rows, byCourse, attempts, best, toggle, reload: load };
}
