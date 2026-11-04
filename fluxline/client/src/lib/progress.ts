import { useCallback, useEffect, useState } from 'react';
import { api } from './api';

export interface ProgressRow { course_slug: string; lesson_id: string; completed_at: string }
export interface AttemptRow { course_slug: string; assessment_id: string; best: number; attempts: number }

export function useProgress(enabled: boolean) {
  const [rows, setRows] = useState<ProgressRow[]>([]);
  const [attempts, setAttempts] = useState<AttemptRow[]>([]);
  const [mastered, setMastered] = useState<{ course_slug: string; unit: number }[]>([]);
  const load = useCallback(() => {
    if (!enabled) { setRows([]); setAttempts([]); setMastered([]); return; }
    api<{ completed: ProgressRow[]; assessments?: AttemptRow[]; mastered?: { course_slug: string; unit: number }[] }>('/progress')
      .then((r) => { setRows(r.completed); setAttempts(r.assessments ?? []); setMastered(r.mastered ?? []); })
      .catch(() => { setRows([]); setAttempts([]); setMastered([]); });
  }, [enabled]);
  useEffect(load, [load]);

  const byCourse: Record<string, Set<string>> = {};
  for (const r of rows) (byCourse[r.course_slug] ??= new Set()).add(r.lesson_id);

  const toggle = async (course: string, lesson: string, completed: boolean) => {
    await api('/progress', { body: { course, lesson, completed } });
    load();
  };
  const best = (course: string, id: string) => attempts.find((a) => a.course_slug === course && a.assessment_id === id);
  /** Unit = every lesson complete and the unit quiz passed. */
  const isMastered = (course: string, unit: number) => mastered.some((m) => m.course_slug === course && m.unit === unit);
  return { rows, byCourse, attempts, best, mastered, isMastered, toggle, reload: load };
}
