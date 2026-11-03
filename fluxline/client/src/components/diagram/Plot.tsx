// Renders ```plot blocks in lessons. Format (one directive per line):
//
//   title: RC step response            (optional)
//   x: 0, 5, t/τ                       min, max, axis label [, log]
//   y: 0, 1.1, v_C/V_s                 min, max, axis label [, log]
//   f: 1 - exp(-x) | v_C | dash | 2    expression in x | legend label | solid|dash|dot | color number
//   samples: sin(2*pi*7*x) | 0.1 | x[n]  stems at multiples of the step
//   mark: 1, 0.632, 63.2%              dot with a label
//   vline: 1, τ       hline: 0.632     dashed guide lines (label optional)
//   height: 260                        drawing height in px (default 260)
//   yticks: none                       hide y-axis numbers (timing diagrams)
//   label: 6.4, A                       text at the left edge at height y (name a trace)
//   caption: ...                       caption under the figure

import { useId, useMemo } from 'react';
import { compile, num } from './expr';
import { SvgLabel, labelWidth } from './Label';
import { InlineMd } from '../Markdown';

export const SERIES = ['#2563eb', '#d97706', '#059669', '#e11d48', '#7c3aed'];
const W = 640;

interface Axis { min: number; max: number; label: string; log: boolean }
interface Series { f: (x: number) => number; label: string; style: string; color: string }
interface Stem { f: (x: number) => number; step: number; label: string; color: string }
interface Parsed {
  title: string; caption: string; height: number; x: Axis; y: Axis; series: Series[]; stems: Stem[];
  marks: { x: number; y: number; label: string }[]; vlines: { v: number; label: string }[]; hlines: { v: number; label: string }[];
  hideY: boolean; traceLabels: { y: number; label: string }[];
}

function parseAxis(v: string, fallback: [number, number]): Axis {
  const parts = v.split(',').map((s) => s.trim());
  const log = parts.includes('log');
  const rest = parts.filter((s) => s !== 'log');
  return { min: rest[0] ? num(rest[0]) : fallback[0], max: rest[1] ? num(rest[1]) : fallback[1], label: rest.slice(2).join(', '), log };
}

function niceTicks(min: number, max: number, target = 6) {
  const range = max - min;
  const raw = range / target;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
  const out: number[] = [];
  for (let v = Math.ceil(min / step - 1e-9) * step; v <= max + step * 1e-9; v += step) out.push(Math.abs(v) < step * 1e-9 ? 0 : v);
  return out;
}
function logTicks(min: number, max: number) {
  const out: number[] = [];
  for (let k = Math.floor(Math.log10(min)); k <= Math.ceil(Math.log10(max)); k++) {
    const v = Math.pow(10, k);
    if (v >= min * 0.999 && v <= max * 1.001) out.push(v);
  }
  return out;
}
export function fmt(v: number, si = false) {
  if (v === 0) return '0';
  if (si) {
    const units: [number, string][] = [[1e9, 'G'], [1e6, 'M'], [1e3, 'k'], [1, ''], [1e-3, 'm'], [1e-6, 'µ'], [1e-9, 'n']];
    for (const [s, u] of units) if (Math.abs(v) >= s * 0.999) return `${+(v / s).toPrecision(3)}${u}`;
  }
  const a = Math.abs(v);
  if (a >= 1e5 || a < 1e-3) return v.toExponential(0).replace('e+', 'e');
  return String(+v.toPrecision(4)).replace('-', '−');
}

export default function Plot({ source }: { source: string }) {
  const clipId = `clip${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const parsed = useMemo((): { ok: true; p: Parsed } | { ok: false; error: string } => {
    try {
      let title = '', caption = '', height = 260, hideY = false;
      const traceLabels: { y: number; label: string }[] = [];
      let x: Axis = { min: 0, max: 1, label: '', log: false };
      let y: Axis | null = null;
      const series: Series[] = [];
      const stems: Stem[] = [];
      const marks: { x: number; y: number; label: string }[] = [];
      const vlines: { v: number; label: string }[] = [];
      const hlines: { v: number; label: string }[] = [];
      for (const raw of source.split('\n')) {
        const line = raw.trim();
        if (!line || line.startsWith('#')) continue;
        const i = line.indexOf(':');
        if (i < 0) throw new Error(`Missing ":" in "${line}"`);
        const key = line.slice(0, i).trim().toLowerCase();
        const val = line.slice(i + 1).trim();
        const pipe = val.split('|').map((s) => s.trim());
        if (key === 'title') title = val;
        else if (key === 'caption') caption = val;
        else if (key === 'height') height = Number(val) || 260;
        else if (key === 'yticks') hideY = val === 'none';
        else if (key === 'label') { const [a, ...l] = val.split(','); traceLabels.push({ y: num(a), label: l.join(',').trim() }); }
        else if (key === 'x') x = parseAxis(val, [0, 1]);
        else if (key === 'y') y = parseAxis(val, [0, 1]);
        else if (key === 'f') series.push({ f: compile(pipe[0]), label: pipe[1] ?? '', style: pipe[2] || 'solid', color: pipe[3] ? SERIES[(Number(pipe[3]) - 1) % SERIES.length] : SERIES[series.length % SERIES.length] });
        else if (key === 'samples') stems.push({ f: compile(pipe[0]), step: num(pipe[1] ?? '1'), label: pipe[2] ?? '', color: SERIES[(series.length + stems.length) % SERIES.length] });
        else if (key === 'mark') { const [a, b, ...l] = val.split(','); marks.push({ x: num(a), y: num(b), label: l.join(',').trim() }); }
        else if (key === 'vline' || key === 'hline') { const [a, ...l] = val.split(','); (key === 'vline' ? vlines : hlines).push({ v: num(a), label: l.join(',').trim() }); }
        else throw new Error(`Unknown plot directive "${key}"`);
      }
      // Auto y-range from the data if not given.
      if (!y) {
        let lo = Infinity, hi = -Infinity;
        for (const s of series) for (let k = 0; k <= 200; k++) {
          const xv = x.min + ((x.max - x.min) * k) / 200;
          const v = s.f(xv);
          if (Number.isFinite(v)) { lo = Math.min(lo, v); hi = Math.max(hi, v); }
        }
        if (!Number.isFinite(lo)) { lo = 0; hi = 1; }
        const pad = (hi - lo || 1) * 0.08;
        y = { min: lo - pad, max: hi + pad, label: '', log: false };
      }
      return { ok: true, p: { title, caption, height, x, y, series, stems, marks, vlines, hlines, hideY, traceLabels } };
    } catch (e) {
      return { ok: false, error: (e as Error).message };
    }
  }, [source]);

  if (!parsed.ok) return <div className="my-6 rounded-xl bg-rose-50 p-4 font-mono text-sm text-rose-700">Plot error: {parsed.error}</div>;
  const { title, caption, x, y, series, stems, marks, vlines, hlines, hideY, traceLabels } = parsed.p;
  let height = parsed.p.height;

  const legend = [...series.filter((s) => s.label), ...stems.filter((s) => s.label)];
  // Lay the legend out in rows that fit the drawing width.
  const legendPos: { x: number; y: number }[] = [];
  {
    let cx = 62, row = 0;
    for (const s of legend) {
      const w = 36 + labelWidth(s.label, 14) + 22;
      if (cx + w > W - 10 && cx > 62) { row++; cx = 62; }
      legendPos.push({ x: cx, y: 20 + row * 22 });
      cx += w;
    }
  }
  const legendRows = legendPos.length ? legendPos[legendPos.length - 1].y / 22 + 0.1 : 0;
  height += Math.max(0, Math.round(legendRows) - 1) * 22;
  const m = { l: 62, r: 18, t: legend.length ? 18 + Math.round(legendRows) * 22 : 16, b: x.label ? 50 : 30 };
  const pw = W - m.l - m.r, ph = height - m.t - m.b;
  const sx = (v: number) => m.l + (x.log ? (Math.log10(v) - Math.log10(x.min)) / (Math.log10(x.max) - Math.log10(x.min)) : (v - x.min) / (x.max - x.min)) * pw;
  const sy = (v: number) => m.t + ph - (y.log ? (Math.log10(v) - Math.log10(y.min)) / (Math.log10(y.max) - Math.log10(y.min)) : (v - y.min) / (y.max - y.min)) * ph;
  const xt = x.log ? logTicks(x.min, x.max) : niceTicks(x.min, x.max, 7);
  const yt = y.log ? logTicks(y.min, y.max) : niceTicks(y.min, y.max, 5);
  const yLim = (y.max - y.min) * 3;

  const paths = series.map((s) => {
    const N = 700;
    let d = '';
    let pen = false;
    for (let k = 0; k <= N; k++) {
      const xv = x.log ? Math.pow(10, Math.log10(x.min) + ((Math.log10(x.max) - Math.log10(x.min)) * k) / N) : x.min + ((x.max - x.min) * k) / N;
      let v = s.f(xv);
      if (!Number.isFinite(v)) { pen = false; continue; }
      v = Math.max(y.min - yLim, Math.min(y.max + yLim, v));
      d += `${pen ? 'L' : 'M'}${sx(xv).toFixed(1)},${sy(v).toFixed(1)}`;
      pen = true;
    }
    return d;
  });

  return (
    <figure className="not-prose my-7">
      {title && <figcaption className="mb-1 text-center text-sm font-semibold text-ink">{title}</figcaption>}
      <svg viewBox={`0 0 ${W} ${height}`} className="h-auto w-full" role="img" aria-label={title || caption || 'Plot'}>
        <defs><clipPath id={clipId}><rect x={m.l} y={m.t} width={pw} height={ph} /></clipPath></defs>
        <rect x={m.l} y={m.t} width={pw} height={ph} fill="#f8fafc" />
        {xt.map((v) => <line key={`gx${v}`} x1={sx(v)} x2={sx(v)} y1={m.t} y2={m.t + ph} stroke="#e2e8f0" />)}
        {!hideY && yt.map((v) => <line key={`gy${v}`} y1={sy(v)} y2={sy(v)} x1={m.l} x2={m.l + pw} stroke="#e2e8f0" />)}
        {!y.log && y.min < 0 && y.max > 0 && <line x1={m.l} x2={m.l + pw} y1={sy(0)} y2={sy(0)} stroke="#94a3b8" />}
        {!x.log && x.min < 0 && x.max > 0 && <line y1={m.t} y2={m.t + ph} x1={sx(0)} x2={sx(0)} stroke="#94a3b8" />}
        <rect x={m.l} y={m.t} width={pw} height={ph} fill="none" stroke="#cbd5e1" />
        {xt.map((v) => <text key={`tx${v}`} x={sx(v)} y={m.t + ph + 18} textAnchor="middle" fontSize="12" fill="#64748b">{fmt(v, x.log)}</text>)}
        {traceLabels.map((t, i) => <SvgLabel key={`tl${i}`} text={t.label} x={m.l - 10} y={sy(t.y)} anchor="end" size={14} fill="#334155" />)}
        {!hideY && yt.map((v) => <text key={`ty${v}`} x={m.l - 8} y={sy(v)} textAnchor="end" dominantBaseline="middle" fontSize="12" fill="#64748b">{fmt(v, y.log)}</text>)}
        {x.label && <SvgLabel text={x.label} x={m.l + pw / 2} y={height - 12} size={14} fill="#334155" />}
        {y.label && <g transform={`translate(16 ${m.t + ph / 2}) rotate(-90)`}><SvgLabel text={y.label} x={0} y={0} size={14} fill="#334155" /></g>}

        <g clipPath={`url(#${clipId})`}>
          {vlines.map((l, i) => <line key={`v${i}`} x1={sx(l.v)} x2={sx(l.v)} y1={m.t} y2={m.t + ph} stroke="#64748b" strokeDasharray="4 4" />)}
          {hlines.map((l, i) => <line key={`h${i}`} y1={sy(l.v)} y2={sy(l.v)} x1={m.l} x2={m.l + pw} stroke="#64748b" strokeDasharray="4 4" />)}
          {paths.map((d, i) => (
            <path key={i} d={d} fill="none" stroke={series[i].color} strokeWidth={2.4} strokeLinejoin="round"
              strokeDasharray={series[i].style === 'dash' ? '8 6' : series[i].style === 'dot' ? '2 5' : undefined} strokeLinecap="round" />
          ))}
          {stems.map((s, si) => {
            const pts: number[] = [];
            const start = Math.ceil(x.min / s.step - 1e-9);
            for (let k = start; k * s.step <= x.max + 1e-12 && pts.length < 400; k++) pts.push(k * s.step);
            const base = sy(y.log ? y.min : Math.max(y.min, Math.min(y.max, 0)));
            return pts.map((xv) => {
              const v = s.f(xv);
              return (
                <g key={`${si}-${xv}`}>
                  <line x1={sx(xv)} x2={sx(xv)} y1={base} y2={sy(v)} stroke={s.color} strokeWidth={1.6} />
                  <circle cx={sx(xv)} cy={sy(v)} r={4} fill={s.color} />
                </g>
              );
            });
          })}
        </g>
        {vlines.map((l, i) => {
          if (!l.label) return null;
          const right = sx(l.v) + 5 + labelWidth(l.label, 13) > m.l + pw;
          return <SvgLabel key={`vl${i}`} text={l.label} x={sx(l.v) + (right ? -5 : 5)} y={m.t + ph - 12} anchor={right ? 'end' : 'start'} size={13} fill="#475569" />;
        })}
        {hlines.map((l, i) => l.label && <SvgLabel key={`hl${i}`} text={l.label} x={m.l + pw - 6} y={sy(l.v) - 9} anchor="end" size={13} fill="#475569" />)}
        {marks.map((mk, i) => (
          <g key={`m${i}`}>
            <circle cx={sx(mk.x)} cy={sy(mk.y)} r={4.5} fill="#0f172a" />
            {mk.label && (() => {
              const right = sx(mk.x) + 8 + labelWidth(mk.label, 13) > m.l + pw;
              return <SvgLabel text={mk.label} x={sx(mk.x) + (right ? -8 : 8)} y={sy(mk.y) + (sy(mk.y) < m.t + 24 ? 14 : -12)} anchor={right ? 'end' : 'start'} size={13} fill="#0f172a" />;
            })()}
          </g>
        ))}
        {legend.length > 0 && (
          <g>
            {(() => {
              return legend.map((s, i) => {
                const x0 = legendPos[i].x, ly = legendPos[i].y;
                const isStem = !('style' in s);
                return (
                  <g key={`lg${i}`}>
                    {isStem ? <circle cx={x0 + 14} cy={ly} r={4} fill={s.color} /> : (
                      <line x1={x0} x2={x0 + 28} y1={ly} y2={ly} stroke={s.color} strokeWidth={2.4}
                        strokeDasharray={(s as Series).style === 'dash' ? '8 6' : (s as Series).style === 'dot' ? '2 5' : undefined} />
                    )}
                    <SvgLabel text={s.label} x={x0 + 36} y={ly} anchor="start" size={14} fill="#334155" />
                  </g>
                );
              });
            })()}
          </g>
        )}
      </svg>
      {caption && <figcaption className="mt-2 text-center text-sm leading-6 text-slate-500"><InlineMd text={caption} /></figcaption>}
    </figure>
  );
}
