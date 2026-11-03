// Renders ```circuit blocks in lessons as schematics. Coordinates are grid units (1 unit = 56 px);
// y grows downward. One element per line:
//
//   R   x1,y1 x2,y2 [label] [opts]   resistor          C  capacitor      L  inductor
//   V   x1,y1 x2,y2 [label]          DC source, + at the first point    VAC  sinusoidal source
//   I   x1,y1 x2,y2 [label]          current source, arrow toward the second point
//   VD / ID                          dependent (diamond) voltage / current source
//   D   x1,y1 x2,y2 [label]          diode, anode at the first point
//   Z   x1,y1 x2,y2 [label]          generic impedance box
//   SW  x1,y1 x2,y2 [label] [closed] switch
//   W   x1,y1 x2,y2 [...]            wire (extra points continue the wire)
//   GND x,y      DOT x,y      T x,y [label]   ground, junction dot, open terminal
//   OA  x,y [flip]                   op-amp: − input (x−1, y−0.5), + input (x−1, y+0.5), output (x+1, y)
//   NMOS / PMOS x,y [label] [mirror] gate (x−1, y), drain/source at (x, y∓1); mirror puts the gate on the right
//   NPN / PNP x,y [label] [mirror]   base (x−1, y), collector (x, y−1), emitter (x, y+1) (PNP: emitter on top)
//   LOOP x,y [label]                 clockwise mesh-current arrow
//   AND/OR/NAND/NOR/XOR/XNOR x,y [n=2|3] [label]  logic gate: inputs at (x−1, y±0.4) (n=3: y−0.5, y, y+0.5), output (x+1, y)
//   NOT/BUF x,y [label]              inverter/buffer: input (x−1, y), output (x+1, y)
//   DFF x,y [label] [noqn]           D flip-flop: D (x−1.2, y−0.4), clock (x−1.2, y+0.4), Q (x+1.2, y−0.4), Q̄ (x+1.2, y+0.4)
//   CIRCLE x,y r [dash] [color=anno]  plain circle of radius r (grid units)
//   STATE x,y name [out] [loop=label] [accept]  state bubble (r = 0.42); loop draws a self-transition above it
//   MUX x,y [label]                  2:1 multiplexer: in0 (x−1, y−0.5), in1 (x−1, y+0.5), select (x, y+1.3), output (x+1, y)
//   BOX x,y w,h [label]   SUM x,y [l=+ b=− ...]   ARROW x1,y1 x2,y2 [label]   LINE x1,y1 x2,y2 [dash]
//   TEXT x,y "label" [anchor=start|end] [size=13]     Q x,y +|− [label]   point charge
//   caption: text under the figure
//
// Options on two-terminal elements: side=-1 (put the label on the other side), v=label (polarity
// marks and a voltage label on the opposite side), i=label (current arrow; idir=rev to reverse).

import { useMemo, type ReactNode } from 'react';
import { SvgLabel, labelWidth } from './Label';
import { InlineMd } from '../Markdown';

const U = 56;
const INK = '#0f172a';
const ANNO = '#2563eb';
const SW = 2;

type Pt = [number, number];
interface Line { kind: string; pts: Pt[]; words: string[]; opts: Record<string, string> }

function tokenize(line: string) {
  const out: string[] = [];
  const re = /([^\s"]*)"([^"]*)"|(\S+)/g; // supports "quoted label" and key="quoted value"
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) out.push(m[2] !== undefined ? m[1] + m[2] : m[3]);
  return out;
}

function parse(src: string) {
  const lines: Line[] = [];
  let caption = '';
  for (const raw of src.split('\n')) {
    const t = raw.trim();
    if (!t || t.startsWith('#')) continue;
    if (/^caption:/i.test(t)) { caption = t.slice(8).trim(); continue; }
    const toks = tokenize(t);
    const kind = toks.shift()!.toUpperCase();
    const pts: Pt[] = [];
    const words: string[] = [];
    const opts: Record<string, string> = {};
    for (const tok of toks) {
      const pm = /^(-?\d*\.?\d+),(-?\d*\.?\d+)$/.exec(tok);
      if (pm && words.length === 0) pts.push([Number(pm[1]), Number(pm[2])]);
      else if (/^[a-z]+=/.test(tok) && !tok.startsWith('http')) { const i = tok.indexOf('='); opts[tok.slice(0, i)] = tok.slice(i + 1); }
      else words.push(tok);
    }
    lines.push({ kind, pts, words, opts });
  }
  return { lines, caption };
}

const key = (p: Pt) => `${Math.round(p[0] * 100)},${Math.round(p[1] * 100)}`;
const BODY: Record<string, number> = { R: 38, C: 10, L: 44, V: 34, VAC: 34, I: 34, VD: 34, ID: 34, D: 18, Z: 40, SW: 34 };

function arrowHead(x: number, y: number, ang: number, size = 9, fill = INK) {
  const a1 = ang + Math.PI * 0.85, a2 = ang - Math.PI * 0.85;
  return <polygon points={`${x},${y} ${x + size * Math.cos(a1)},${y + size * Math.sin(a1)} ${x + size * Math.cos(a2)},${y + size * Math.sin(a2)}`} fill={fill} />;
}

export default function Circuit({ source }: { source: string }) {
  const result = useMemo(() => {
    try {
      return { ...parse(source), error: '' };
    } catch (e) {
      return { lines: [], caption: '', error: (e as Error).message };
    }
  }, [source]);

  if (result.error) return <div className="my-6 rounded-xl bg-rose-50 p-4 font-mono text-sm text-rose-700">Circuit error: {result.error}</div>;

  const shapes: ReactNode[] = [];
  const labels: ReactNode[] = [];
  const terminals = new Map<string, { p: Pt; n: number }>();
  const bounds = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
  const grow = (x: number, y: number) => { bounds.x0 = Math.min(bounds.x0, x); bounds.y0 = Math.min(bounds.y0, y); bounds.x1 = Math.max(bounds.x1, x); bounds.y1 = Math.max(bounds.y1, y); };
  const touch = (p: Pt, n = 1) => { const k = key(p); const t = terminals.get(k) ?? { p, n: 0 }; t.n += n; terminals.set(k, t); grow(p[0] * U, p[1] * U); };
  const forced: Pt[] = [];
  const opens: { p: Pt; label: string }[] = [];
  let k = 0;
  const id = () => `e${k++}`;

  /** Places a label beside a point, offset along a unit normal, anchored away from it. */
  const besides = (x: number, y: number, nx: number, ny: number, text: string, color = INK, dist = 22) => {
    const lx = x + nx * dist, ly = y + ny * dist;
    const anchor = Math.abs(nx) > 0.5 ? (nx > 0 ? 'start' : 'end') : 'middle';
    const w = labelWidth(text);
    grow(lx + (anchor === 'start' ? w : anchor === 'end' ? -w : w / 2), ly + ny * 6);
    if (anchor === 'middle') grow(lx - w / 2, ly);
    grow(lx, ly);
    return <SvgLabel key={id()} text={text} x={lx} y={ly} anchor={anchor} fill={color} />;
  };

  for (const ln of result.lines) {
    const { kind, pts, words, opts } = ln;
    const label = words.join(' ');

    if (kind === 'W') {
      for (let i = 0; i + 1 < pts.length; i++) {
        const [a, b] = [pts[i], pts[i + 1]];
        shapes.push(<line key={id()} x1={a[0] * U} y1={a[1] * U} x2={b[0] * U} y2={b[1] * U} stroke={opts.color === 'anno' ? ANNO : INK} strokeWidth={SW} strokeLinecap="round" />);
        touch(a); touch(b);
      }
      if (opts.i && pts.length >= 2) {
        const [a, b] = [pts[0], pts[1]];
        const ang = Math.atan2(b[1] - a[1], b[0] - a[0]) + (opts.idir === 'rev' ? Math.PI : 0);
        const mx = ((a[0] + b[0]) / 2) * U, my = ((a[1] + b[1]) / 2) * U;
        shapes.push(<g key={id()}>{arrowHead(mx + 5 * Math.cos(ang), my + 5 * Math.sin(ang), ang, 10, ANNO)}</g>);
        const dx = Math.cos(ang), dy = Math.sin(ang);
        const s = Number(opts.side ?? 1);
        labels.push(besides(mx, my, dy * s * (opts.idir === 'rev' ? -1 : 1), -dx * s * (opts.idir === 'rev' ? -1 : 1), opts.i, ANNO, 15));
      }
      continue;
    }

    if (kind in BODY) {
      const [a, b] = pts;
      if (!a || !b) throw new Error(`${kind} needs two points`);
      const x1 = a[0] * U, y1 = a[1] * U, x2 = b[0] * U, y2 = b[1] * U;
      const L = Math.hypot(x2 - x1, y2 - y1);
      const ang = Math.atan2(y2 - y1, x2 - x1);
      const deg = (ang * 180) / Math.PI;
      const dx = (x2 - x1) / L, dy = (y2 - y1) / L;
      const side = Number(opts.side ?? 1);
      const nx = dy * side, ny = -dx * side;
      const B = BODY[kind];
      const c = L / 2;
      const s0 = c - B / 2, s1 = c + B / 2;
      const at = (along: number, perp: number): [number, number] => [x1 + dx * along + dy * perp, y1 + dy * along - dx * perp];
      const leads = (from: number, to: number) => (
        <>
          <line x1={0} y1={0} x2={from} y2={0} stroke={INK} strokeWidth={SW} />
          <line x1={to} y1={0} x2={L} y2={0} stroke={INK} strokeWidth={SW} />
        </>
      );
      let body: ReactNode = null;
      const upright: ReactNode[] = [];
      if (kind === 'R') {
        const n = 6, amp = 7;
        let d = `M${s0},0`;
        for (let i = 0; i < n; i++) d += ` L${s0 + (B * (i + 0.5)) / n},${i % 2 ? amp : -amp}`;
        d += ` L${s1},0`;
        body = <>{leads(s0, s1)}<path d={d} fill="none" stroke={INK} strokeWidth={SW} strokeLinejoin="round" /></>;
      } else if (kind === 'C') {
        body = <>{leads(s0, s1)}<line x1={s0} y1={-14} x2={s0} y2={14} stroke={INK} strokeWidth={2.6} /><line x1={s1} y1={-14} x2={s1} y2={14} stroke={INK} strokeWidth={2.6} /></>;
      } else if (kind === 'L') {
        const n = 4, r = B / n / 2;
        let d = `M${s0},0`;
        for (let i = 0; i < n; i++) d += ` a${r},${r} 0 0 1 ${2 * r},0`;
        body = <>{leads(s0, s1)}<path d={d} fill="none" stroke={INK} strokeWidth={SW} /></>;
      } else if (kind === 'V' || kind === 'VAC' || kind === 'I') {
        const r = B / 2;
        body = <>{leads(s0, s1)}<circle cx={c} cy={0} r={r} fill="white" stroke={INK} strokeWidth={SW} />
          {kind === 'VAC' && <path d={`M${c - 9},0 q4.5,-9 9,0 t9,0`} fill="none" stroke={INK} strokeWidth={1.8} transform={`rotate(${-deg} ${c} 0)`} />}
          {kind === 'I' && <><line x1={c - 10} y1={0} x2={c + 6} y2={0} stroke={INK} strokeWidth={1.8} />{arrowHead(c + 11, 0, 0, 8)}</>}
        </>;
        if (kind === 'V') {
          const [px, py] = at(c - 9, 0), [mx, my] = at(c + 9, 0);
          upright.push(<text key={id()} x={px} y={py} textAnchor="middle" dominantBaseline="central" fontSize={15} fontWeight={600} fill={INK}>+</text>);
          upright.push(<text key={id()} x={mx} y={my} textAnchor="middle" dominantBaseline="central" fontSize={17} fontWeight={600} fill={INK}>−</text>);
        }
      } else if (kind === 'VD' || kind === 'ID') {
        const r = B / 2;
        body = <>{leads(s0, s1)}<polygon points={`${s0},0 ${c},${-r} ${s1},0 ${c},${r}`} fill="white" stroke={INK} strokeWidth={SW} />
          {kind === 'ID' && <><line x1={c - 9} y1={0} x2={c + 5} y2={0} stroke={INK} strokeWidth={1.8} />{arrowHead(c + 10, 0, 0, 7)}</>}
        </>;
        if (kind === 'VD') {
          const [px, py] = at(c - 8, 0), [mx, my] = at(c + 8, 0);
          upright.push(<text key={id()} x={px} y={py} textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight={600} fill={INK}>+</text>);
          upright.push(<text key={id()} x={mx} y={my} textAnchor="middle" dominantBaseline="central" fontSize={16} fontWeight={600} fill={INK}>−</text>);
        }
      } else if (kind === 'D') {
        body = <>{leads(s0, s1)}<polygon points={`${s0},-10 ${s0},10 ${s1},0`} fill={INK} /><line x1={s1} y1={-10} x2={s1} y2={10} stroke={INK} strokeWidth={2.4} /></>;
      } else if (kind === 'Z') {
        body = <>{leads(s0, s1)}<rect x={s0} y={-9} width={B} height={18} fill="white" stroke={INK} strokeWidth={SW} /></>;
      } else if (kind === 'SW') {
        const closed = words.includes('closed') || opts.state === 'closed';
        body = <>{leads(s0, s1)}<circle cx={s0} cy={0} r={3} fill="white" stroke={INK} strokeWidth={1.8} /><circle cx={s1} cy={0} r={3} fill="white" stroke={INK} strokeWidth={1.8} />
          <line x1={s0} y1={0} x2={closed ? s1 : s1 - 3} y2={closed ? 0 : -14} stroke={INK} strokeWidth={SW} strokeLinecap="round" /></>;
      }
      shapes.push(<g key={id()} transform={`translate(${x1} ${y1}) rotate(${deg})`}>{body}</g>, ...upright);
      touch(a); touch(b);

      const text = words.filter((w) => w !== 'closed').join(' ');
      const bodyHalf = kind === 'C' ? 14 : kind === 'R' ? 8 : kind === 'Z' ? 9 : B / 2;
      if (text) { const [mx, my] = at(c, 0); labels.push(besides(mx, my, nx, ny, text, INK, bodyHalf + 10)); }
      if (opts.v) {
        const off = bodyHalf + 12;
        const span = Math.max(B, 34) / 2; // keep + and − apart even on short bodies (capacitors, diodes)
        const [px, py] = at(c - span + 2, -off * side), [qx, qy] = at(c + span - 2, -off * side);
        labels.push(<text key={id()} x={px} y={py} textAnchor="middle" dominantBaseline="central" fontSize={15} fontWeight={600} fill={ANNO}>+</text>);
        labels.push(<text key={id()} x={qx} y={qy} textAnchor="middle" dominantBaseline="central" fontSize={17} fontWeight={600} fill={ANNO}>−</text>);
        const [mx, my] = at(c, 0);
        labels.push(besides(mx, my, -nx, -ny, opts.v, ANNO, off + (B < 30 ? 6 : 2)));
      }
      if (opts.i) {
        const rev = opts.idir === 'rev';
        const along = s0 > 18 ? s0 / 2 : c;
        const [ax, ay] = at(along, 0);
        const ia = ang + (rev ? Math.PI : 0);
        labels.push(<g key={id()}>{arrowHead(ax + 5 * Math.cos(ia), ay + 5 * Math.sin(ia), ia, 10, ANNO)}</g>);
        // With a value label on one side, put the current label on the other.
        labels.push(text ? besides(ax, ay, -nx, -ny, opts.i, ANNO, 14) : besides(ax, ay, nx, ny, opts.i, ANNO, 14));
      }
      continue;
    }

    if (kind === 'GND') {
      const [p] = pts; const x = p[0] * U, y = p[1] * U;
      shapes.push(<g key={id()} stroke={INK} strokeWidth={SW}><line x1={x} y1={y} x2={x} y2={y + 12} /><line x1={x - 13} y1={y + 12} x2={x + 13} y2={y + 12} /><line x1={x - 8} y1={y + 17} x2={x + 8} y2={y + 17} /><line x1={x - 3} y1={y + 22} x2={x + 3} y2={y + 22} /></g>);
      touch(p); grow(x, y + 24);
      continue;
    }
    if (kind === 'DOT') { forced.push(pts[0]); touch(pts[0], 0); continue; }
    if (kind === 'T') {
      const [p] = pts; opens.push({ p, label });
      touch(p);
      continue;
    }
    if (kind === 'OA') {
      const [p] = pts; const x = p[0] * U, y = p[1] * U;
      const flip = words.includes('flip');
      shapes.push(<polygon key={id()} points={`${x - U},${y - 0.85 * U} ${x - U},${y + 0.85 * U} ${x + U},${y}`} fill="white" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />);
      const top = flip ? '+' : '−', bot = flip ? '−' : '+';
      shapes.push(<text key={id()} x={x - U + 13} y={y - 0.5 * U} textAnchor="middle" dominantBaseline="central" fontSize={18} fontWeight={600} fill={INK}>{top}</text>);
      shapes.push(<text key={id()} x={x - U + 13} y={y + 0.5 * U} textAnchor="middle" dominantBaseline="central" fontSize={18} fontWeight={600} fill={INK}>{bot}</text>);
      touch([p[0] - 1, p[1] - 0.5]); touch([p[0] - 1, p[1] + 0.5]); touch([p[0] + 1, p[1]]);
      grow(x - U, y - 0.85 * U); grow(x + U, y + 0.85 * U);
      continue;
    }
    if (kind === 'NMOS' || kind === 'PMOS') {
      const [p] = pts; const x = p[0] * U, y = p[1] * U;
      const m = words.includes('mirror') ? -1 : 1;
      const mosLabel = words.filter((w) => w !== 'mirror').join(' ');
      const X = (dx: number) => x + dx * U * m;
      const pm = kind === 'PMOS';
      const gateX = X(pm ? -0.58 : -0.45);
      shapes.push(
        <g key={id()} stroke={INK} strokeWidth={SW} fill="none">
          <line x1={X(-1)} y1={y} x2={gateX} y2={y} />
          {pm && <circle cx={X(-0.51)} cy={y} r={0.07 * U} fill="white" />}
          <line x1={X(-0.44)} y1={y - 0.36 * U} x2={X(-0.44)} y2={y + 0.36 * U} strokeWidth={2.6} />
          <line x1={X(-0.3)} y1={y - 0.46 * U} x2={X(-0.3)} y2={y + 0.46 * U} strokeWidth={2.6} />
          <polyline points={`${X(-0.3)},${y - 0.3 * U} ${X(0)},${y - 0.3 * U} ${X(0)},${y - U}`} />
          <polyline points={`${X(-0.3)},${y + 0.3 * U} ${X(0)},${y + 0.3 * U} ${X(0)},${y + U}`} />
        </g>,
      );
      // Arrow on the source lead: out of the channel for NMOS (bottom), into it for PMOS (top).
      if (pm) shapes.push(<g key={id()}>{arrowHead(X(-0.2), y - 0.3 * U, m > 0 ? Math.PI : 0, 9)}</g>);
      else shapes.push(<g key={id()}>{arrowHead(X(-0.08), y + 0.3 * U, m > 0 ? 0 : Math.PI, 9)}</g>);
      touch([p[0] - m, p[1]]); touch([p[0], p[1] - 1]); touch([p[0], p[1] + 1]);
      if (mosLabel) labels.push(<SvgLabel key={id()} text={mosLabel} x={X(0.16)} y={y} anchor={m > 0 ? 'start' : 'end'} />);
      grow(X(0.9), y);
      continue;
    }
    if (['AND', 'OR', 'NAND', 'NOR', 'XOR', 'XNOR', 'NOT', 'BUF'].includes(kind)) {
      const [p] = pts; const cx = p[0] * U, cy = p[1] * U;
      const single = kind === 'NOT' || kind === 'BUF';
      const n = single ? 1 : Number(opts.n ?? 2);
      const ins = single ? [0] : n >= 3 ? [-0.5, 0, 0.5] : [-0.4, 0.4];
      const bw = single ? 0.8 * U : U;
      const bh = single ? 0.8 * U : n >= 3 ? 1.25 * U : U;
      const x0 = cx - bw / 2, x1 = cx + bw / 2, top = cy - bh / 2, bot = cy + bh / 2;
      const orType = ['OR', 'NOR', 'XOR', 'XNOR'].includes(kind);
      const xorType = kind === 'XOR' || kind === 'XNOR';
      const bubble = ['NAND', 'NOR', 'XNOR', 'NOT'].includes(kind);
      let body: string;
      if (single) body = `M${x0},${top} L${x1},${cy} L${x0},${bot} Z`;
      else if (orType) body = `M${x0},${top} Q${x0 + 0.22 * bw},${cy} ${x0},${bot} Q${x0 + 0.62 * bw},${bot} ${x1},${cy} Q${x0 + 0.62 * bw},${top} ${x0},${top} Z`;
      else body = `M${x0},${top} H${x1 - bh / 2} A${bh / 2},${bh / 2} 0 0 1 ${x1 - bh / 2},${bot} H${x0} Z`;
      const backX = (yy: number, shift = 0) => {
        if (!orType) return x0;
        const t = (yy - top) / (bot - top);
        return x0 - shift + 2 * t * (1 - t) * 0.22 * bw;
      };
      shapes.push(
        <g key={id()} stroke={INK} strokeWidth={SW} fill="none" strokeLinejoin="round">
          {ins.map((dy) => {
            const yy = cy + dy * U;
            return <line key={dy} x1={cx - U} y1={yy} x2={backX(yy, xorType ? 9 : 0)} y2={yy} />;
          })}
          {xorType && <path d={`M${x0 - 9},${top} Q${x0 - 9 + 0.22 * bw},${cy} ${x0 - 9},${bot}`} />}
          <path d={body} fill="white" />
          {bubble && <circle cx={x1 + 5} cy={cy} r={5} fill="white" />}
          <line x1={x1 + (bubble ? 10 : 0)} y1={cy} x2={cx + U} y2={cy} />
        </g>,
      );
      ins.forEach((dy) => touch([p[0] - 1, p[1] + dy]));
      touch([p[0] + 1, p[1]]);
      if (label) labels.push(<SvgLabel key={id()} text={label} x={cx} y={bot + 14} size={13} fill="#64748b" />);
      grow(cx - U, top); grow(cx + U, bot + 20);
      continue;
    }
    if (kind === 'DFF') {
      const [p] = pts; const cx = p[0] * U, cy = p[1] * U;
      const noQn = words.includes('noqn');
      const bx0 = cx - 0.7 * U, bx1 = cx + 0.7 * U, by0 = cy - 0.8 * U, by1 = cy + 0.8 * U;
      const yQ = cy - 0.4 * U, yC = cy + 0.4 * U;
      shapes.push(
        <g key={id()} stroke={INK} strokeWidth={SW} fill="none">
          <rect x={bx0} y={by0} width={bx1 - bx0} height={by1 - by0} rx={3} fill="white" />
          <line x1={cx - 1.2 * U} y1={yQ} x2={bx0} y2={yQ} />
          <line x1={cx - 1.2 * U} y1={yC} x2={bx0} y2={yC} />
          <polyline points={`${bx0},${yC - 7} ${bx0 + 9},${yC} ${bx0},${yC + 7}`} strokeWidth={1.6} />
          <line x1={bx1} y1={yQ} x2={cx + 1.2 * U} y2={yQ} />
          {!noQn && <line x1={bx1} y1={yC} x2={cx + 1.2 * U} y2={yC} />}
        </g>,
      );
      const t = (x: number, y: number, s: string, a: 'start' | 'end') => labels.push(<text key={id()} x={x} y={y} textAnchor={a} dominantBaseline="central" fontSize={13} fontWeight={600} fill={INK} fontFamily="Inter, sans-serif">{s}</text>);
      t(bx0 + 6, yQ, 'D', 'start'); t(bx0 + 13, yC, 'CLK', 'start'); t(bx1 - 6, yQ, 'Q', 'end'); if (!noQn) t(bx1 - 6, yC, 'Q\u0304', 'end');
      touch([p[0] - 1.2, p[1] - 0.4]); touch([p[0] - 1.2, p[1] + 0.4]); touch([p[0] + 1.2, p[1] - 0.4]); if (!noQn) touch([p[0] + 1.2, p[1] + 0.4]);
      const ffLabel = words.filter((w) => w !== 'noqn').join(' ');
      if (ffLabel) labels.push(<SvgLabel key={id()} text={ffLabel} x={cx} y={by0 - 12} size={13} fill="#64748b" />);
      grow(cx - 1.2 * U, by0 - 22); grow(cx + 1.2 * U, by1);
      continue;
    }
    if (kind === 'CIRCLE') {
      const [p] = pts; const r = Number(words.find((w) => /^[\d.]+$/.test(w)) ?? 1) * U;
      shapes.push(<circle key={id()} cx={p[0] * U} cy={p[1] * U} r={r} fill="none" stroke={opts.color === 'anno' ? ANNO : INK} strokeWidth={1.6} strokeDasharray={words.includes('dash') ? '6 5' : undefined} />);
      grow(p[0] * U - r, p[1] * U - r); grow(p[0] * U + r, p[1] * U + r);
      continue;
    }
    if (kind === 'STATE') {
      const [p] = pts; const cx = p[0] * U, cy = p[1] * U; const r = 0.42 * U;
      const [name, out] = words;
      shapes.push(<circle key={id()} cx={cx} cy={cy} r={r} fill="white" stroke={INK} strokeWidth={SW} />);
      if (words.includes('accept') || opts.accept) shapes.push(<circle key={id()} cx={cx} cy={cy} r={r - 5} fill="none" stroke={INK} strokeWidth={1.4} />);
      labels.push(<SvgLabel key={id()} text={name ?? ''} x={cx} y={out && out !== 'accept' ? cy - 7 : cy} size={15} />);
      if (out && out !== 'accept') labels.push(<SvgLabel key={id()} text={out} x={cx} y={cy + 10} size={12} fill={ANNO} />);
      if (opts.loop) {
        const a0 = -Math.PI * 0.72, a1 = -Math.PI * 0.28;
        const sx = cx + r * Math.cos(a0), sy = cy + r * Math.sin(a0), ex = cx + r * Math.cos(a1), ey = cy + r * Math.sin(a1);
        shapes.push(<path key={id()} d={`M${sx},${sy} C${cx - r * 1.1},${cy - r * 2.5} ${cx + r * 1.1},${cy - r * 2.5} ${ex},${ey}`} fill="none" stroke={INK} strokeWidth={1.8} />);
        shapes.push(<g key={id()}>{arrowHead(ex, ey, Math.atan2(ey - (cy - r * 2.1), ex - (cx + r * 0.9)), 9)}</g>);
        labels.push(<SvgLabel key={id()} text={opts.loop} x={cx} y={cy - r * 2.62} size={13} fill={ANNO} />);
        grow(cx, cy - r * 3);
      }
      grow(cx - r, cy - r); grow(cx + r, cy + r);
      continue;
    }
    if (kind === 'MUX') {
      const [p] = pts; const cx = p[0] * U, cy = p[1] * U;
      const lx = cx - 0.5 * U, rx = cx + 0.5 * U;
      shapes.push(
        <g key={id()} stroke={INK} strokeWidth={SW} fill="none">
          <polygon points={`${lx},${cy - 0.9 * U} ${rx},${cy - 0.5 * U} ${rx},${cy + 0.5 * U} ${lx},${cy + 0.9 * U}`} fill="white" strokeLinejoin="round" />
          <line x1={cx - U} y1={cy - 0.5 * U} x2={lx} y2={cy - 0.5 * U} />
          <line x1={cx - U} y1={cy + 0.5 * U} x2={lx} y2={cy + 0.5 * U} />
          <line x1={rx} y1={cy} x2={cx + U} y2={cy} />
          <line x1={cx} y1={cy + 0.7 * U} x2={cx} y2={cy + 1.3 * U} />
        </g>,
      );
      for (const [s2, dy] of [['0', -0.5], ['1', 0.5]] as const) labels.push(<text key={id()} x={lx + 8} y={cy + dy * U} dominantBaseline="central" fontSize={12} fontWeight={600} fill={INK} fontFamily="Inter, sans-serif">{s2}</text>);
      if (label) labels.push(<SvgLabel key={id()} text={label} x={cx} y={cy - 1.05 * U} size={13} fill="#64748b" />);
      touch([p[0] - 1, p[1] - 0.5]); touch([p[0] - 1, p[1] + 0.5]); touch([p[0] + 1, p[1]]); touch([p[0], p[1] + 1.3]);
      grow(cx - U, cy - 1.2 * U); grow(cx + U, cy + 1.3 * U);
      continue;
    }
    if (kind === 'NPN' || kind === 'PNP') {
      const [p] = pts; const x = p[0] * U, y = p[1] * U;
      const m = words.includes('mirror') ? -1 : 1;
      const X = (dx: number) => x + dx * U * m;
      const pnp = kind === 'PNP';
      const bx = X(-0.32);
      // collector lead goes up, emitter lead goes down (for PNP the emitter is on top)
      const topEnd: [number, number] = [X(0), y - 0.35 * U], botEnd: [number, number] = [X(0), y + 0.35 * U];
      shapes.push(
        <g key={id()} stroke={INK} strokeWidth={SW} fill="none">
          <line x1={X(-1)} y1={y} x2={bx} y2={y} />
          <line x1={bx} y1={y - 0.32 * U} x2={bx} y2={y + 0.32 * U} strokeWidth={3} />
          <line x1={bx} y1={y - 0.14 * U} x2={topEnd[0]} y2={topEnd[1]} />
          <line x1={bx} y1={y + 0.14 * U} x2={botEnd[0]} y2={botEnd[1]} />
          <line x1={topEnd[0]} y1={topEnd[1]} x2={X(0)} y2={y - U} />
          <line x1={botEnd[0]} y1={botEnd[1]} x2={X(0)} y2={y + U} />
        </g>,
      );
      // emitter arrow: NPN points out of the base (down), PNP points into the base (on the top lead)
      if (pnp) {
        const ang = Math.atan2(y - 0.14 * U - topEnd[1], bx - topEnd[0]);
        shapes.push(<g key={id()}>{arrowHead((bx + topEnd[0]) / 2 + 6 * Math.cos(ang), (y - 0.14 * U + topEnd[1]) / 2 + 6 * Math.sin(ang), ang, 9)}</g>);
      } else {
        const ang = Math.atan2(botEnd[1] - (y + 0.14 * U), botEnd[0] - bx);
        shapes.push(<g key={id()}>{arrowHead(botEnd[0] - 2 * Math.cos(ang), botEnd[1] - 2 * Math.sin(ang), ang, 9)}</g>);
      }
      touch([p[0] - m, p[1]]); touch([p[0], p[1] - 1]); touch([p[0], p[1] + 1]);
      const bLabel = words.filter((w) => w !== 'mirror').join(' ');
      if (bLabel) labels.push(<SvgLabel key={id()} text={bLabel} x={X(0.18)} y={y} anchor={m > 0 ? 'start' : 'end'} />);
      grow(X(0.9), y);
      continue;
    }
    if (kind === 'LOOP') {
      const [p] = pts; const x = p[0] * U, y = p[1] * U; const r = 0.42 * U;
      const a0 = -Math.PI * 0.75, a1 = Math.PI * 0.95;
      const sx = x + r * Math.cos(a0), sy = y + r * Math.sin(a0), ex = x + r * Math.cos(a1), ey = y + r * Math.sin(a1);
      shapes.push(<path key={id()} d={`M${sx},${sy} A${r},${r} 0 1 1 ${ex},${ey}`} fill="none" stroke={ANNO} strokeWidth={1.8} />);
      shapes.push(<g key={id()}>{arrowHead(ex, ey, a1 + Math.PI / 2, 9, ANNO)}</g>);
      if (label) labels.push(<SvgLabel key={id()} text={label} x={x} y={y} fill={ANNO} />);
      continue;
    }
    if (kind === 'BOX') {
      const [p, sz] = pts; const w = (sz?.[0] ?? 1.6) * U, h = (sz?.[1] ?? 1) * U; const x = p[0] * U, y = p[1] * U;
      shapes.push(<rect key={id()} x={x - w / 2} y={y - h / 2} width={w} height={h} rx={4} fill="white" stroke={INK} strokeWidth={SW} />);
      if (label) labels.push(<SvgLabel key={id()} text={label} x={x} y={y} size={16} />);
      grow(x - w / 2, y - h / 2); grow(x + w / 2, y + h / 2);
      continue;
    }
    if (kind === 'SUM') {
      const [p] = pts; const x = p[0] * U, y = p[1] * U; const r = 0.28 * U;
      shapes.push(<circle key={id()} cx={x} cy={y} r={r} fill="white" stroke={INK} strokeWidth={SW} />);
      const place: Record<string, [number, number]> = { l: [-1, -1], r: [1, -1], t: [1, -1], b: [1, 1] };
      for (const [k2, sign] of Object.entries(opts)) {
        const pos = place[k2]; if (!pos) continue;
        const ox = k2 === 'b' || k2 === 't' ? 0.42 * U * pos[0] * 0.6 + 6 : pos[0] * 0.5 * U;
        const oy = k2 === 'l' || k2 === 'r' ? -0.4 * U : pos[1] * 0.52 * U;
        labels.push(<text key={id()} x={x + ox} y={y + oy} textAnchor="middle" dominantBaseline="central" fontSize={16} fontWeight={600} fill={INK}>{sign === '-' ? '−' : '+'}</text>);
      }
      grow(x - r, y - r); grow(x + r, y + r);
      continue;
    }
    if (kind === 'ARROW' || kind === 'LINE') {
      const [a, b] = pts; const x1 = a[0] * U, y1 = a[1] * U, x2 = b[0] * U, y2 = b[1] * U;
      const ang = Math.atan2(y2 - y1, x2 - x1);
      const color = opts.color === 'anno' ? ANNO : INK;
      const dash = words.includes('dash') ? '6 5' : undefined;
      const text = words.filter((w) => w !== 'dash').join(' ');
      shapes.push(<line key={id()} x1={x1} y1={y1} x2={kind === 'ARROW' ? x2 - 7 * Math.cos(ang) : x2} y2={kind === 'ARROW' ? y2 - 7 * Math.sin(ang) : y2} stroke={color} strokeWidth={SW} strokeDasharray={dash} />);
      if (kind === 'ARROW') shapes.push(<g key={id()}>{arrowHead(x2, y2, ang, 10, color)}</g>);
      if (text) {
        const dx = Math.cos(ang), dy = Math.sin(ang); const s = Number(opts.side ?? 1);
        labels.push(besides((x1 + x2) / 2, (y1 + y2) / 2, dy * s, -dx * s, text, color, 13));
      }
      grow(x1, y1); grow(x2, y2);
      continue;
    }
    if (kind === 'TEXT') {
      const [p] = pts;
      const anchor = (opts.anchor as 'start' | 'middle' | 'end') ?? 'middle';
      labels.push(<SvgLabel key={id()} text={label} x={p[0] * U} y={p[1] * U} anchor={anchor} size={Number(opts.size ?? 15)} fill={opts.color === 'anno' ? ANNO : opts.color === 'muted' ? '#64748b' : INK} />);
      const w = labelWidth(label, Number(opts.size ?? 15));
      grow(p[0] * U + (anchor === 'start' ? w : w / 2), p[1] * U); grow(p[0] * U - (anchor === 'end' ? w : w / 2), p[1] * U);
      continue;
    }
    if (kind === 'Q') {
      const [p] = pts; const x = p[0] * U, y = p[1] * U; const pos = words[0] !== '-' && words[0] !== '−';
      shapes.push(<circle key={id()} cx={x} cy={y} r={15} fill={pos ? '#fee2e2' : '#dbeafe'} stroke={pos ? '#e11d48' : '#2563eb'} strokeWidth={SW} />);
      shapes.push(<text key={id()} x={x} y={y + 1} textAnchor="middle" dominantBaseline="central" fontSize={18} fontWeight={700} fill={pos ? '#e11d48' : '#2563eb'}>{pos ? '+' : '−'}</text>);
      const text = words.slice(1).join(' ');
      if (text) labels.push(<SvgLabel key={id()} text={text} x={x} y={y + 32} />);
      grow(x - 16, y - 16); grow(x + 16, y + 40);
      continue;
    }
    throw new Error(`Unknown element "${kind}"`);
  }

  // Junction dots where three or more terminals meet, plus any explicit DOTs.
  const dots: ReactNode[] = [];
  const openKeys = new Set(opens.map((o) => key(o.p)));
  for (const { p, n } of terminals.values()) if (n >= 3 && !openKeys.has(key(p))) dots.push(<circle key={id()} cx={p[0] * U} cy={p[1] * U} r={4.2} fill={INK} />);
  for (const p of forced) dots.push(<circle key={id()} cx={p[0] * U} cy={p[1] * U} r={4.2} fill={INK} />);
  for (const o of opens) {
    dots.push(<circle key={id()} cx={o.p[0] * U} cy={o.p[1] * U} r={5} fill="white" stroke={INK} strokeWidth={SW} />);
    if (o.label) {
      // Put terminal labels outside: to the right for right-edge terminals, otherwise left.
      const right = o.p[0] * U >= (bounds.x0 + bounds.x1) / 2;
      labels.push(<SvgLabel key={id()} text={o.label} x={o.p[0] * U + (right ? 12 : -12)} y={o.p[1] * U} anchor={right ? 'start' : 'end'} />);
      grow(o.p[0] * U + (right ? 16 + labelWidth(o.label) : -16 - labelWidth(o.label)), o.p[1] * U);
    }
  }

  const pad = 26;
  const vx = bounds.x0 - pad, vy = bounds.y0 - pad, vw = bounds.x1 - bounds.x0 + 2 * pad, vh = bounds.y1 - bounds.y0 + 2 * pad;

  return (
    <figure className="not-prose my-7">
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white px-2 py-3">
        <svg viewBox={`${vx} ${vy} ${vw} ${vh}`} className="mx-auto block h-auto w-full" style={{ maxWidth: vw * 1.05 }} role="img" aria-label={result.caption || 'Circuit diagram'}>
          {shapes}
          {dots}
          {labels}
        </svg>
      </div>
      {result.caption && <figcaption className="mt-2 text-center text-sm leading-6 text-slate-500"><InlineMd text={result.caption} /></figcaption>}
    </figure>
  );
}
