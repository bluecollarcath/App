import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { InlineMd } from './Markdown';

/**
 * Click-to-reveal recall cards for study sheets:
 *
 *   ```recall
 *   Q: question with $math$
 *   A: answer
 *   ```
 *
 * Answers stay hidden until revealed, so students test themselves before looking.
 * When printed, every answer is shown.
 */
export function parseRecall(source: string) {
  const cards: { q: string; a: string }[] = [];
  let field: 'q' | 'a' | null = null;
  for (const raw of source.split('\n')) {
    const line = raw.trimEnd();
    const m = /^([QA]):\s?(.*)$/.exec(line);
    if (m?.[1] === 'Q') { cards.push({ q: m[2], a: '' }); field = 'q'; continue; }
    if (m?.[1] === 'A' && cards.length) { cards[cards.length - 1].a = m[2]; field = 'a'; continue; }
    if (field && cards.length && line) cards[cards.length - 1][field] += '\n' + line;
  }
  return cards;
}

export default function Recall({ source }: { source: string }) {
  const cards = parseRecall(source);
  const [shown, setShown] = useState<boolean[]>(() => cards.map(() => false));
  const all = shown.every(Boolean);
  const set = (i: number, v: boolean) => setShown((s) => s.map((x, k) => (k === i ? v : x)));

  return (
    <div className="my-6">
      <div className="mb-3 flex items-center justify-between gap-3 print:hidden">
        <p className="text-sm text-slate-500">Answer each one in your head, then reveal it.</p>
        <button type="button" onClick={() => setShown(cards.map(() => !all))} className="shrink-0 text-sm font-semibold text-volt hover:underline">
          {all ? 'Hide all' : 'Reveal all'}
        </button>
      </div>
      <div role="list" className="space-y-3">
        {cards.map((c, i) => (
          <div role="listitem" key={i} className="rounded-2xl border border-slate-200 p-4 print:break-inside-avoid print:rounded-none print:border-x-0 print:border-t-0 print:p-2">
            <div className="flex gap-3">
              <span className="font-mono text-sm font-semibold text-slate-400">{i + 1}.</span>
              <div className="min-w-0 flex-1">
                <div className="font-medium text-ink"><InlineMd text={c.q} /></div>
                <div className={`mt-2 rounded-xl bg-emerald-50 px-3 py-2 text-[0.95rem] text-slate-800 print:block print:bg-transparent print:p-0 ${shown[i] ? '' : 'hidden'}`}>
                  <InlineMd text={c.a} />
                </div>
                <button type="button" onClick={() => set(i, !shown[i])}
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-volt hover:underline print:hidden">
                  {shown[i] ? <><EyeOff size={15} /> Hide answer</> : <><Eye size={15} /> Show answer</>}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
