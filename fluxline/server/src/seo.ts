// Search-engine and link-preview support for the single-page app.
//
// The browser app sets titles itself, but crawlers and link previews (Slack, iMessage,
// LinkedIn, X...) read the HTML the server sends. So when the server returns index.html it
// fills in the page's title, description, canonical URL and Open Graph tags for that route,
// marks private pages "noindex", and answers unknown URLs with a real 404 status.
// It also serves robots.txt and a sitemap generated from the catalog.

import fs from 'node:fs';
import { COURSES, getCourse, isFreeLesson, lessonExists } from './catalog.js';
import { assessmentTitle } from './assessments.js';

const SITE = 'Ohmentum';
const DEFAULT_TITLE = 'Ohmentum — Learn Electrical Engineering';
const DEFAULT_DESC = 'A complete, college-level electrical engineering curriculum: 25 courses, from circuits to power systems, RF and VLSI, with worked examples and auto-graded problems.';

interface PageMeta { title: string; description: string; status: number; index: boolean }

const STATIC: Record<string, [string, string]> = {
  '/': [DEFAULT_TITLE, DEFAULT_DESC],
  '/curriculum': ['Curriculum', 'Every course in the Ohmentum electrical engineering curriculum, from calculus and circuits to power systems, RF and VLSI, organized in four stages.'],
  '/pricing': ['Pricing', 'Subscribe to unlock every lesson, quiz and final exam in the Ohmentum electrical engineering curriculum. The first lesson of every course is free.'],
  '/contact': ['Contact us', 'Questions about a lesson, your subscription, or using Ohmentum at your school? Send us a message.'],
  '/terms': ['Terms of Service', 'The terms that apply when you use Ohmentum.'],
  '/privacy': ['Privacy Policy', 'What personal information Ohmentum collects, how we use it, and the choices you have.'],
  '/refunds': ['Refund Policy', 'Ohmentum refund and cancellation policy.'],
};
// Real pages that belong to a signed-in user or a one-time flow: render normally, never index.
const PRIVATE: Record<string, string> = {
  '/login': 'Sign in', '/signup': 'Create your free account', '/dashboard': 'My learning', '/account': 'Account',
  '/forgot-password': 'Reset your password', '/reset-password': 'Choose a new password',
};

const clip = (s: string, n = 200) => (s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : s);

export function metaFor(pathname: string): PageMeta {
  const p = pathname.replace(/\/+$/, '') || '/';
  if (STATIC[p]) {
    const [t, d] = STATIC[p];
    return { title: p === '/' ? t : `${t} · ${SITE}`, description: d, status: 200, index: true };
  }
  if (PRIVATE[p]) return { title: `${PRIVATE[p]} · ${SITE}`, description: DEFAULT_DESC, status: 200, index: false };

  let m = /^\/courses\/([a-z0-9-]+)$/.exec(p);
  if (m) {
    const c = getCourse(m[1]);
    if (c) return { title: `${c.code}: ${c.title} · ${SITE}`, description: clip(c.description), status: 200, index: true };
  }
  m = /^\/courses\/([a-z0-9-]+)\/lessons\/(\d+-\d+)$/.exec(p);
  if (m) {
    const c = getCourse(m[1]);
    const found = c && lessonExists(c, m[2]);
    if (c && found) {
      const [title, topics] = found.lesson;
      const num = m[2].replace('-', '.');
      return {
        title: `${num} ${title} · ${c.title} · ${SITE}`,
        description: clip(`Lesson ${num} of ${c.code} ${c.title}: ${topics.split(';').map((t) => t.trim()).join(', ')}.`),
        status: 200,
        index: isFreeLesson(m[2]), // locked lessons show only an outline to crawlers
      };
    }
  }
  m = /^\/courses\/([a-z0-9-]+)\/summary$/.exec(p);
  if (m) {
    const c = getCourse(m[1]);
    if (c) return { title: `Summary Notes · ${c.title} · ${SITE}`, description: clip(`The key takeaways from every lesson of ${c.code} ${c.title}, on one printable page.`), status: 200, index: false };
  }
  m = /^\/courses\/([a-z0-9-]+)\/notes\/(\d+)$/.exec(p);
  if (m) {
    const c = getCourse(m[1]);
    const u = c?.units[Number(m[2]) - 1];
    if (c && u) return {
      title: `Unit ${m[2]} Study Sheet: ${u.title} · ${c.title} · ${SITE}`,
      description: clip(`A one-page study sheet for ${c.code} ${c.title}, unit ${m[2]}: the formulas and when to use them, a solving recipe, common traps, sanity checks and a quick self-test.`),
      status: 200,
      index: m[2] === '1',
    };
  }
  m = /^\/courses\/([a-z0-9-]+)\/assess\/([a-z0-9-]+)$/.exec(p);
  if (m) {
    const c = getCourse(m[1]);
    if (c && /^(unit-\d+|final)$/.test(m[2])) return { title: `${assessmentTitle(c, m[2])} · ${c.title} · ${SITE}`, description: clip(c.description), status: 200, index: false };
  }
  return { title: `Page not found · ${SITE}`, description: DEFAULT_DESC, status: 404, index: false };
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Returns a function that renders index.html with the right head tags for a path. */
export function htmlRenderer(indexFile: string, appUrl: string) {
  let template: string | null = null;
  return (pathname: string) => {
    template ??= fs.readFileSync(indexFile, 'utf8');
    const meta = metaFor(pathname);
    const url = appUrl + (pathname === '/' ? '/' : pathname.replace(/\/+$/, ''));
    const tags = [
      `<link rel="canonical" href="${esc(url)}" />`,
      meta.index ? '' : '<meta name="robots" content="noindex" />',
      '<meta property="og:type" content="website" />',
      `<meta property="og:site_name" content="${SITE}" />`,
      `<meta property="og:title" content="${esc(meta.title)}" />`,
      `<meta property="og:description" content="${esc(meta.description)}" />`,
      `<meta property="og:url" content="${esc(url)}" />`,
      `<meta property="og:image" content="${esc(appUrl)}/og-image.jpg" />`,
      '<meta property="og:image:width" content="1200" />',
      '<meta property="og:image:height" content="630" />',
      '<meta name="twitter:card" content="summary_large_image" />',
    ].filter(Boolean).join('\n    ');
    const html = template
      .replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`)
      .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(meta.description)}" />`)
      .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, tags);
    return { status: meta.status, html };
  };
}

export function robotsTxt(appUrl: string) {
  return ['User-agent: *', 'Allow: /', 'Disallow: /api/', 'Disallow: /account', 'Disallow: /dashboard', '', `Sitemap: ${appUrl}/sitemap.xml`, ''].join('\n');
}

export function sitemapXml(appUrl: string, extraPaths: string[] = []) {
  const paths = [...Object.keys(STATIC)];
  for (const c of COURSES) {
    paths.push(`/courses/${c.slug}`);
    if (c.units[0]?.lessons[0]) paths.push(`/courses/${c.slug}/lessons/1-1`);
  }
  paths.push(...extraPaths);
  const urls = paths.map((p) => `  <url><loc>${esc(appUrl + p)}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
