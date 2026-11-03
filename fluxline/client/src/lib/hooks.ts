import { useEffect, useState } from 'react';
import { api, ApiError } from './api';

/** Minimal fetch hook. Re-runs when `path` or `dep` changes. */
export function useApi<T>(path: string | null, dep: unknown = null) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(!!path);

  useEffect(() => {
    if (!path) { setLoading(false); return; }
    let live = true;
    setLoading(true);
    setError(null);
    api<T>(path)
      .then((d) => { if (live) setData(d); })
      .catch((e: ApiError) => { if (live) { setError(e); setData((e.body as T) ?? null); } })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, [path, dep]);

  return { data, error, loading, setData };
}

export function useTitle(title: string) {
  useEffect(() => { document.title = title ? `${title} · Ohmentum` : 'Ohmentum — Learn Electrical Engineering'; }, [title]);
}
