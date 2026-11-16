// Mho: the Ohmentum AI study partner, standalone test version.
// A small Express server that serves the chat page and streams replies from Claude.
// Not connected to the main Ohmentum site or its accounts.

import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import Anthropic from '@anthropic-ai/sdk';
import { COURSES, getCourse, lessonExists } from '../../server/src/catalog.ts';
import { MHO_SYSTEM } from './prompt.ts';

const here = path.dirname(fileURLToPath(import.meta.url));
const LESSONS_DIR = path.join(here, '../../server/content/lessons');

const env = (n: string) => process.env[n]?.trim().replace(/^(["'])(.*)\1$/, '$2').trim() || undefined;
const PORT = Number(env('PORT') || 8795);
const MODEL = env('MHO_MODEL') || 'claude-opus-5-5';
const EFFORT = (env('MHO_EFFORT') || 'medium') as 'low' | 'medium' | 'high';
const ACCESS_CODE = env('MHO_ACCESS_CODE');
const DAILY_LIMIT = Number(env('MHO_DAILY_LIMIT') || 300);
const MOCK = env('MHO_MOCK') === '1' || !env('ANTHROPIC_API_KEY');
const PROD = process.env.NODE_ENV === 'production';

if (PROD && !ACCESS_CODE) {
  console.error('[mho] MHO_ACCESS_CODE must be set in production so strangers cannot use your API credits.');
  process.exit(1);
}
const client = MOCK ? null : new Anthropic();
console.log(MOCK
  ? '[mho] MOCK mode: no ANTHROPIC_API_KEY, replies are canned text for testing the page.'
  : `[mho] Using ${MODEL} at ${EFFORT} effort; ${DAILY_LIMIT} messages/day cap${ACCESS_CODE ? '; access code required' : ''}.`);

// Rough Opus 5.5 prices (USD per million tokens) for the cost log. Cache writes 1.25x, reads 0.1x.
const PRICE = { input: 4, output: 20 };

const app = express();
app.set('trust proxy', 1);
app.use(express.json({ limit: '200kb' }));
app.use(express.static(path.join(here, '../public')));
// Page libraries, served from this app instead of a CDN.
const nm = path.join(here, '../node_modules');
app.use('/vendor/katex', express.static(path.join(nm, 'katex/dist'), { maxAge: '7d' }));
app.get('/vendor/marked.min.js', (_req, res) => res.sendFile(path.join(nm, 'marked/marked.min.js')));
app.get('/vendor/purify.min.js', (_req, res) => res.sendFile(path.join(nm, 'dompurify/dist/purify.min.js')));

function checkAccess(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!ACCESS_CODE || req.get('x-mho-code') === ACCESS_CODE) return next();
  res.status(401).json({ error: 'Enter the access code to use this test version of Mho.' });
}

app.get('/api/config', (req, res) => {
  res.json({ mock: MOCK, needsCode: !!ACCESS_CODE, model: MODEL });
});

app.post('/api/check-code', checkAccess, (_req, res) => res.json({ ok: true }));

app.get('/api/courses', checkAccess, (_req, res) => {
  res.json(COURSES.map((c) => ({
    slug: c.slug, code: c.code, title: c.title,
    units: c.units.map((u, ui) => ({ title: u.title, lessons: u.lessons.map(([title], li) => ({ id: `${ui + 1}-${li + 1}`, title })) })),
  })));
});

/** The lesson's full text, labeled, for Mho's context. */
function lessonContext(courseSlug?: string, lessonId?: string): string | null {
  const course = courseSlug ? getCourse(courseSlug) : undefined;
  if (!course || !lessonId || !/^\d+-\d+$/.test(lessonId)) return null;
  const found = lessonExists(course, lessonId);
  if (!found) return null;
  const file = path.join(LESSONS_DIR, course.slug, `${lessonId}.md`);
  if (!fs.existsSync(file)) return null;
  const [title] = found.lesson;
  return `# Current lesson\nCourse: ${course.code} ${course.title}\nLesson ${lessonId.replace('-', '.')}: ${title}\n\n${fs.readFileSync(file, 'utf8')}`;
}

// Abuse and spend protection: per-visitor rate limit plus a daily cap for the whole server.
const perVisitor = rateLimit({ windowMs: 10 * 60_000, limit: 30, standardHeaders: 'draft-8', legacyHeaders: false, message: { error: 'You\'re sending messages quickly. Take a breath and try again in a few minutes.' } });
let day = new Date().toISOString().slice(0, 10);
let usedToday = 0;
function underDailyCap() {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== day) { day = today; usedToday = 0; }
  return usedToday < DAILY_LIMIT;
}

/** Validates the conversation from the browser: alternating user/assistant text, ending with the user. */
function cleanMessages(input: unknown): Anthropic.MessageParam[] | string {
  if (!Array.isArray(input) || input.length === 0) return 'No message to send.';
  if (input.length > 40) return 'This conversation is getting long. Start a new chat to keep going.';
  let total = 0;
  const out: Anthropic.MessageParam[] = [];
  for (const [i, m] of input.entries()) {
    const role = (m as { role?: unknown })?.role;
    const content = (m as { content?: unknown })?.content;
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string' || !content.trim()) return 'Invalid message.';
    if (role !== (i % 2 === 0 ? 'user' : 'assistant')) return 'Invalid message order.';
    if (content.length > 8000) return 'That message is too long. Try splitting it up.';
    total += content.length;
    out.push({ role, content });
  }
  if (out[out.length - 1].role !== 'user') return 'Invalid message order.';
  if (total > 60000) return 'This conversation is getting long. Start a new chat to keep going.';
  return out;
}

app.post('/api/chat', checkAccess, perVisitor, async (req, res) => {
  const messages = cleanMessages(req.body?.messages);
  if (typeof messages === 'string') return res.status(400).json({ error: messages });
  if (!underDailyCap()) return res.status(429).json({ error: 'Mho has reached today\'s message limit for this test. Try again tomorrow.' });
  usedToday++;

  const lesson = lessonContext(req.body?.course, req.body?.lesson);
  res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache, no-transform', Connection: 'keep-alive', 'X-Accel-Buffering': 'no' });
  const send = (data: object) => res.write(`data: ${JSON.stringify(data)}\n\n`);

  if (!client) return mockReply(send, res, !!lesson);

  const system: Anthropic.Beta.BetaTextBlockParam[] = [{ type: 'text', text: MHO_SYSTEM }];
  if (lesson) system.push({ type: 'text', text: lesson });

  const abort = new AbortController();
  res.on('close', () => { if (!res.writableEnded) abort.abort(); });
  try {
    const stream = client.beta.messages.stream({
      model: MODEL,
      max_tokens: 16000,
      output_config: { effort: EFFORT },
      // Cache the instructions, the lesson and the conversation so far: each follow-up message
      // re-reads them from cache at a tenth of the price.
      cache_control: { type: 'ephemeral' },
      // If the model declines (it can misfire on harmless engineering topics), the API retries on
      // a fallback model inside the same call.
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system,
      messages,
    }, { signal: abort.signal });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') send({ type: 'text', text: event.delta.text });
    }
    const final = await stream.finalMessage();
    if (final.stop_reason === 'refusal') {
      send({ type: 'text', text: '\n\nI can\'t help with that one. Try asking it a different way, or ask me about something else you\'re studying.' });
    }
    const u = final.usage;
    const cost = ((u.input_tokens + (u.cache_creation_input_tokens ?? 0) * 1.25 + (u.cache_read_input_tokens ?? 0) * 0.1) * PRICE.input + u.output_tokens * PRICE.output) / 1e6;
    console.log(`[mho] ${final.model} in=${u.input_tokens} cache_write=${u.cache_creation_input_tokens ?? 0} cache_read=${u.cache_read_input_tokens ?? 0} out=${u.output_tokens} ~$${cost.toFixed(4)} (today: ${usedToday}/${DAILY_LIMIT})`);
    send({ type: 'done' });
  } catch (err) {
    if (abort.signal.aborted) return;
    console.error('[mho] request failed:', err);
    let message = 'Mho ran into a problem. Please try again in a moment.';
    if (err instanceof Anthropic.AuthenticationError) message = 'Mho is not set up correctly (the API key was rejected).';
    else if (err instanceof Anthropic.RateLimitError) message = 'Mho is busy right now. Please try again in a minute.';
    else if (err instanceof Anthropic.APIError && (err.status ?? 0) >= 500) message = 'The AI service is having trouble right now. Please try again shortly.';
    send({ type: 'error', message });
  }
  res.end();
});

/** Canned streamed reply, so the page can be tried without an API key. */
async function mockReply(send: (d: object) => void, res: express.Response, hasLesson: boolean) {
  const text = `*(Test mode: this is a canned reply. Add an ANTHROPIC_API_KEY to talk to the real Mho.)*

${hasLesson ? 'I can see the lesson you picked, so ' : ''}let's work through it together. Ohm's law ties voltage, current and resistance:

$$V = I R$$

1. If a $2\\,\\text{k}\\Omega$ resistor carries $3\\,\\text{mA}$, then $V = (3\\times10^{-3})(2\\times10^{3}) = 6\\,\\text{V}$.
2. **Sanity check:** milliamps times kilohms gives volts directly, since $10^{-3}\\times10^{3}=1$.

What part would you like to try next?`;
  for (const piece of text.match(/[\s\S]{1,12}/g) ?? []) {
    send({ type: 'text', text: piece });
    await new Promise((r) => setTimeout(r, 25));
  }
  send({ type: 'done' });
  res.end();
}

app.listen(PORT, () => console.log(`[mho] Mho test page on http://localhost:${PORT}`));
