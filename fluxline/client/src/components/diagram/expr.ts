// A small, safe math-expression compiler for lesson plots: "1 - exp(-x/2)", "20*log10(1/sqrt(1+(x/1e3)^2))".
// Parses to closures (no eval / new Function), so it works under a strict Content-Security-Policy.

type Fn = (x: number) => number;

const FUNCS: Record<string, (...a: number[]) => number> = {
  sin: Math.sin, cos: Math.cos, tan: Math.tan, asin: Math.asin, acos: Math.acos, atan: Math.atan, atan2: Math.atan2,
  sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh,
  exp: Math.exp, ln: Math.log, log: Math.log, log10: Math.log10, log2: Math.log2, sqrt: Math.sqrt, abs: Math.abs,
  floor: Math.floor, ceil: Math.ceil, round: Math.round, sign: Math.sign, min: Math.min, max: Math.max, pow: Math.pow,
  mod: (a, b) => ((a % b) + b) % b,
  u: (a) => (a >= 0 ? 1 : 0), // unit step
  rect: (a) => (Math.abs(a) <= 0.5 ? 1 : 0),
  sinc: (a) => (a === 0 ? 1 : Math.sin(Math.PI * a) / (Math.PI * a)),
  db: (a) => 20 * Math.log10(Math.abs(a)),
};
const CONSTS: Record<string, number> = { pi: Math.PI, e: Math.E };

type Tok = { t: 'num'; v: number } | { t: 'id'; v: string } | { t: 'op'; v: string };

function tokenize(src: string): Tok[] {
  const out: Tok[] = [];
  const re = /\s*(?:(\d+\.?\d*(?:e[+-]?\d+)?|\.\d+(?:e[+-]?\d+)?)|([A-Za-z_][A-Za-z0-9_]*)|(\*\*|[-+*/^(),π]))/gy;
  let m: RegExpExecArray | null;
  let i = 0;
  while (i < src.length) {
    re.lastIndex = i;
    m = re.exec(src);
    if (!m || m[0].length === 0) {
      if (/^\s*$/.test(src.slice(i))) break;
      throw new Error(`Unexpected "${src.slice(i).trim()[0]}" in expression`);
    }
    if (m[1] !== undefined) out.push({ t: 'num', v: Number(m[1]) });
    else if (m[2] !== undefined) out.push({ t: 'id', v: m[2] });
    else if (m[3] === 'π') out.push({ t: 'id', v: 'pi' });
    else out.push({ t: 'op', v: m[3] === '**' ? '^' : m[3] });
    i = re.lastIndex;
  }
  return out;
}

export function compile(src: string): Fn {
  const toks = tokenize(src);
  let p = 0;
  const peek = () => toks[p];
  const isOp = (v: string) => peek()?.t === 'op' && peek()!.v === v;
  const expect = (v: string) => { if (!isOp(v)) throw new Error(`Expected "${v}"`); p++; };

  function expr(): Fn {
    let left = term();
    while (isOp('+') || isOp('-')) {
      const op = (toks[p++] as { v: string }).v;
      const a = left, b = term();
      left = op === '+' ? (x) => a(x) + b(x) : (x) => a(x) - b(x);
    }
    return left;
  }
  function term(): Fn {
    let left = unary();
    for (;;) {
      if (isOp('*') || isOp('/')) {
        const op = (toks[p++] as { v: string }).v;
        const a = left, b = unary();
        left = op === '*' ? (x) => a(x) * b(x) : (x) => a(x) / b(x);
      } else if (peek() && (peek()!.t === 'num' || peek()!.t === 'id' || isOp('('))) {
        const a = left, b = unary(); // implicit multiplication: 2x, 2(x+1)
        left = (x) => a(x) * b(x);
      } else return left;
    }
  }
  function unary(): Fn {
    if (isOp('-')) { p++; const a = unary(); return (x) => -a(x); }
    if (isOp('+')) { p++; return unary(); }
    return power();
  }
  function power(): Fn {
    const base = atom();
    if (isOp('^')) { p++; const ex = unary(); return (x) => Math.pow(base(x), ex(x)); }
    return base;
  }
  function atom(): Fn {
    const tok = toks[p++];
    if (!tok) throw new Error('Unexpected end of expression');
    if (tok.t === 'num') { const v = tok.v; return () => v; }
    if (tok.t === 'op' && tok.v === '(') { const e = expr(); expect(')'); return e; }
    if (tok.t === 'id') {
      const name = tok.v;
      if (isOp('(')) {
        p++;
        const args: Fn[] = [];
        if (!isOp(')')) { args.push(expr()); while (isOp(',')) { p++; args.push(expr()); } }
        expect(')');
        const f = FUNCS[name];
        if (!f) throw new Error(`Unknown function "${name}"`);
        return (x) => f(...args.map((g) => g(x)));
      }
      if (name === 'x' || name === 't' || name === 'f' || name === 'w' || name === 'n') return (x) => x;
      if (name in CONSTS) { const v = CONSTS[name]; return () => v; }
      throw new Error(`Unknown name "${name}"`);
    }
    throw new Error(`Unexpected "${tok.v}"`);
  }

  const f = expr();
  if (p < toks.length) throw new Error(`Unexpected "${(toks[p] as { v: string | number }).v}"`);
  return f;
}

/** Evaluates a constant expression such as "2*pi" or "1e-3". */
export function num(src: string): number {
  return compile(src)(0);
}
