// Renders short math-style labels in SVG: "R_1", "V_{th}", "e^{-t}", "12 V", "v_C(t)".
// Single letters are set in math italic (unless the label starts with a digit, like "12 V").

const MATH_FONT = 'KaTeX_Math, "Times New Roman", serif';
const MAIN_FONT = 'KaTeX_Main, "Times New Roman", serif';

type Seg = { text: string; level: 0 | -1 | 1 };

function parse(s: string): Seg[] {
  const segs: Seg[] = [];
  let i = 0;
  let buf = '';
  const flush = () => { if (buf) { segs.push({ text: buf, level: 0 }); buf = ''; } };
  while (i < s.length) {
    const ch = s[i];
    if ((ch === '_' || ch === '^') && i + 1 < s.length) {
      flush();
      let inner: string;
      if (s[i + 1] === '{') {
        const end = s.indexOf('}', i + 2);
        inner = s.slice(i + 2, end === -1 ? undefined : end);
        i = end === -1 ? s.length : end + 1;
      } else {
        inner = s[i + 1];
        i += 2;
      }
      segs.push({ text: inner, level: ch === '_' ? -1 : 1 });
    } else {
      buf += ch;
      i++;
    }
  }
  flush();
  return segs;
}

/** Splits base text into runs, italicizing single-letter identifiers. */
function runs(text: string, italicOk: boolean) {
  if (!italicOk) return [{ text, italic: false }];
  const out: { text: string; italic: boolean }[] = [];
  // Combining marks (e.g. the bar in Q̄) stay attached to their letter.
  const re = /([A-Za-zα-ωΑ-Ω\u0300-\u036f]+)|([^A-Za-zα-ωΑ-Ω\u0300-\u036f]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const before = text.slice(0, m.index);
    // A lone letter after a number or ")" and a space ("120 W", "cos(1000t) V"), or alone in
    // parentheses after a space ("t (s)"), is a unit: keep it upright.
    const isUnit = /(\d|\))\s+$/.test(before) || (/(^|\s)\($/.test(before) && text[m.index + 1] === ')');
    if (m[1]) out.push({ text: m[1], italic: m[1].replace(/[\u0300-\u036f]/g, '').length === 1 && !/[ΩΣΔΦ]/.test(m[1]) && !isUnit });
    else out.push({ text: m[2], italic: false });
  }
  return out;
}

/** Rough rendered width of a label, used to keep diagrams from clipping text. */
export function labelWidth(text: string, size = 15) {
  return text.replace(/[_^{}]/g, '').length * size * 0.56;
}

export function SvgLabel({ text, x, y, anchor = 'middle', size = 15, fill = 'currentColor', baseline = 'middle', weight }: {
  text: string; x: number; y: number; anchor?: 'start' | 'middle' | 'end'; size?: number; fill?: string; baseline?: 'middle' | 'auto' | 'hanging'; weight?: number;
}) {
  const italicOk = !/^\s*[\d.+−-]/.test(text);
  const segs = parse(text);
  const shift = size * 0.32;
  let current = 0;
  const spans: React.ReactNode[] = [];
  segs.forEach((seg, si) => {
    const target = seg.level === -1 ? shift : seg.level === 1 ? -shift * 1.2 : 0;
    const fs = seg.level === 0 ? size : size * 0.72;
    runs(seg.text, italicOk && seg.level === 0 ? true : italicOk && seg.text.length === 1).forEach((r, ri) => {
      const dy = target - current;
      current = target;
      spans.push(
        <tspan key={`${si}-${ri}`} dy={dy || undefined} fontSize={fs} fontFamily={r.italic ? MATH_FONT : MAIN_FONT} fontStyle={r.italic ? 'italic' : undefined}>
          {r.text}
        </tspan>,
      );
    });
  });
  return (
    <text x={x} y={y} textAnchor={anchor} dominantBaseline={baseline} fill={fill} fontWeight={weight} style={{ whiteSpace: 'pre' }}>
      {spans}
    </text>
  );
}
