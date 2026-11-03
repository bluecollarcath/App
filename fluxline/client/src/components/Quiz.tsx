import { useState } from 'react';
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { InlineMd } from './Markdown';

interface Parsed {
  prompt: string;
  numeric?: { answer: number; tol: number; unit: string };
  choices?: { text: string; correct: boolean }[];
  explanation: string;
}

/** Parses the ```quiz block format used by lesson files. See README for the spec. */
export function parseQuiz(src: string): Parsed {
  const prompt: string[] = [];
  const expl: string[] = [];
  const choices: { text: string; correct: boolean }[] = [];
  let numeric: Parsed['numeric'];
  for (const raw of src.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    const tag = line[0];
    const rest = line.slice(1).trim();
    if (tag === '?') prompt.push(rest);
    else if (tag === '>') expl.push(rest);
    else if (tag === '+' || tag === '-') choices.push({ text: rest, correct: tag === '+' });
    else if (tag === '=') {
      const [a, t, u] = rest.split('|').map((s) => s.trim());
      numeric = { answer: Number(a), tol: Number(t || 0.01), unit: u || '' };
    }
  }
  return { prompt: prompt.join(' '), numeric, choices: choices.length ? choices : undefined, explanation: expl.join(' ') };
}

function parseNumber(input: string) {
  const s = input.trim().replace(/,/g, '').replace(/−/g, '-').replace(/\s+/g, '');
  if (!s) return NaN;
  return Number(s.replace(/[x×]10\^?/i, 'e'));
}

export default function Quiz({ source, index }: { source: string; index: number }) {
  const q = parseQuiz(source);
  const [value, setValue] = useState('');
  const [picked, setPicked] = useState<number | null>(null);
  const [result, setResult] = useState<'right' | 'wrong' | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  const check = () => {
    if (q.numeric) {
      const x = parseNumber(value);
      if (Number.isNaN(x)) return;
      const { answer, tol } = q.numeric;
      const ok = Math.abs(x - answer) <= Math.max(Math.abs(answer) * tol, 1e-9);
      setResult(ok ? 'right' : 'wrong');
      if (ok) setShowSolution(true);
    } else if (q.choices && picked !== null) {
      const ok = q.choices[picked].correct;
      setResult(ok ? 'right' : 'wrong');
      if (ok) setShowSolution(true);
    }
  };

  return (
    <div className="not-prose my-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-copper-dark">
        Problem {index}
      </div>
      <div className="text-[16px] leading-7 text-ink"><InlineMd text={q.prompt} /></div>

      {q.choices && (
        <div className="mt-4 grid gap-2">
          {q.choices.map((c, i) => {
            const state = result && picked === i ? (c.correct ? 'border-emerald-500 bg-emerald-50' : 'border-rose-400 bg-rose-50') : picked === i ? 'border-volt bg-blue-50' : 'border-slate-200 bg-white hover:border-slate-300';
            return (
              <button key={i} type="button" onClick={() => { setPicked(i); setResult(null); }}
                className={`rounded-xl border px-4 py-2.5 text-left text-[15px] transition ${state}`}>
                <InlineMd text={c.text} />
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {q.numeric && (
          <div className="flex items-center overflow-hidden rounded-xl border border-slate-300 bg-white focus-within:border-volt">
            <input value={value} onChange={(e) => { setValue(e.target.value); setResult(null); }}
              onKeyDown={(e) => e.key === 'Enter' && check()} inputMode="decimal" placeholder="Your answer"
              className="w-40 px-3 py-2 font-mono text-sm outline-none" aria-label="Answer" />
            {q.numeric.unit && <span className="border-l border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">{q.numeric.unit}</span>}
          </div>
        )}
        <button type="button" onClick={check} className="btn-primary">Check</button>
        <button type="button" onClick={() => setShowSolution((s) => !s)} className="text-sm font-medium text-slate-500 hover:text-ink">
          {showSolution ? 'Hide solution' : 'Show solution'}
        </button>
        {result === 'right' && <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600"><CheckCircle2 size={18} /> Correct</span>}
        {result === 'wrong' && <span className="flex items-center gap-1.5 text-sm font-semibold text-rose-600"><XCircle size={18} /> Not quite — try again</span>}
      </div>

      {showSolution && q.explanation && (
        <div className="mt-4 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-[15px] leading-7 text-slate-700">
          <Lightbulb className="mt-1 shrink-0 text-copper-dark" size={18} />
          <div>
            {q.numeric && <div className="mb-1 font-semibold text-ink">Answer: {q.numeric.answer} {q.numeric.unit}</div>}
            <InlineMd text={q.explanation} />
          </div>
        </div>
      )}
    </div>
  );
}
