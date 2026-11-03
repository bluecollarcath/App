export interface User {
  id: number;
  email: string;
  name: string;
  subscribed: boolean;
  plan: string | null;
  status: string | null;
  periodEnd: number | null;
  hasBillingAccount: boolean;
}

export interface CourseSummary {
  slug: string;
  code: string;
  title: string;
  stage: number;
  track: string;
  hours: number;
  description: string;
  prereqs: string[];
  lessonCount: number;
  unitCount: number;
}

export interface LessonRef {
  id: string;
  title: string;
  topics: string[];
  free: boolean;
  written: boolean;
}

export interface CourseDetail extends CourseSummary {
  outcomes: string[];
  units: { title: string; lessons: LessonRef[] }[];
}

export interface Catalog {
  stages: Record<string, { name: string; blurb: string }>;
  courses: CourseSummary[];
  totals: { courses: number; lessons: number; hours: number };
}

export interface LessonPayload {
  course: { slug: string; code: string; title: string };
  id: string;
  unitTitle: string;
  title: string;
  topics: string[];
  prev: { id: string; title: string } | null;
  next: { id: string; title: string } | null;
  free: boolean;
  locked: boolean;
  markdown?: string | null;
}

export class ApiError extends Error {
  constructor(public status: number, message: string, public body: unknown) {
    super(message);
  }
}

const TOKEN_KEY = 'fluxline.token';
export const tokenStore = {
  get: () => { try { return localStorage.getItem(TOKEN_KEY); } catch { return null; } },
  set: (t: string | null) => { try { if (t) localStorage.setItem(TOKEN_KEY, t); else localStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ } },
};

/** Follow a redirect URL from the API: in-app paths use the router, everything else leaves the site. */
export function followRedirect(url: string, navigate: (to: string) => void) {
  if (url.startsWith('/')) navigate(url);
  else window.location.href = url;
}

export const IS_PREVIEW = import.meta.env.VITE_PREVIEW === '1';

export async function api<T>(path: string, init: { method?: string; body?: unknown } = {}): Promise<T> {
  if (IS_PREVIEW) {
    const { mockApi } = await import('./mockApi');
    const method = init.method ?? (init.body !== undefined ? 'POST' : 'GET');
    try {
      return (await mockApi(path, method, init.body as Record<string, unknown> | undefined, tokenStore.get())) as T;
    } catch (e) {
      const err = e as { status?: number; message: string; body?: unknown };
      throw new ApiError(err.status ?? 500, err.message, err.body);
    }
  }
  const headers: Record<string, string> = {};
  const token = tokenStore.get();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (init.body !== undefined) headers['Content-Type'] = 'application/json';
  const res = await fetch(`/api${path}`, {
    method: init.method ?? (init.body !== undefined ? 'POST' : 'GET'),
    headers,
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, (data as { error?: string }).error || `Request failed (${res.status})`, data);
  return data as T;
}

export const PLANS = {
  monthly: { label: 'Monthly', price: 29, per: 'month', note: 'Cancel anytime' },
  annual: { label: 'Annual', price: 249, per: 'year', note: 'About $20.75/month — save 28%' },
} as const;
