import { useCallback, useEffect, useState } from 'react';
import { api } from './api';

export interface ProgressRow { course_slug: string; lesson_id: string; completed_at: string }

export function useProgress(enabled: boolean) {
  const [rows, setRows] = useState<ProgressRow[]>([]);
  const load = useCallback(() => {
    if (!enabled) { setRows([]); return; }
    api<{ completed: ProgressRow[] }>('/progress').then((r) => setRows(r.completed)).catch(() => setRows([]));
  }, [enabled]);
  useEffect(load, [load]);

  const byCourse: Record<string, Set<string>> = {};
  for (const r of rows) (byCourse[r.course_slug] ??= new Set()).add(r.lesson_id);

  const toggle = async (course: string, lesson: string, completed: boolean) => {
    await api('/progress', { body: { course, lesson, completed } });
    load();
  };
  return { rows, byCourse, toggle, reload: load };
}
