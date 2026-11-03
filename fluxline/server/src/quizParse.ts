// Parsing and grading of ```quiz blocks. Pure functions (no file access), shared by the server
// and by the in-browser preview build.

export interface QuizQuestion {
  prompt: string;
  numeric?: { answer: number; tol: number; unit: string };
  choices?: { text: string; correct: boolean }[];
  explanation: string;
}

export function parseQuizBlock(src: string): QuizQuestion {
  const prompt: string[] = [];
  const expl: string[] = [];
  const choices: { text: string; correct: boolean }[] = [];
  let numeric: QuizQuestion['numeric'];
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

/** Splits an assessment file into its intro text and its questions. */
export function parseAssessment(markdown: string) {
  const questions: QuizQuestion[] = [];
  const intro = markdown.replace(/```quiz\n([\s\S]*?)```/g, (_m, body: string) => {
    questions.push(parseQuizBlock(body));
    return '';
  }).trim();
  return { intro, questions };
}

export function parseNumberAnswer(input: unknown): number {
  if (typeof input === 'number') return input;
  if (typeof input !== 'string') return NaN;
  const s = input.trim().replace(/,/g, '').replace(/[−–]/g, '-').replace(/\s+/g, '');
  if (!s) return NaN;
  return Number(s.replace(/[x×*]10\^?/i, 'e'));
}

export function isCorrect(q: QuizQuestion, given: unknown): boolean {
  if (q.numeric) {
    const x = parseNumberAnswer(given);
    if (!Number.isFinite(x)) return false;
    const { answer, tol } = q.numeric;
    return Math.abs(x - answer) <= Math.max(Math.abs(answer) * tol, 1e-9);
  }
  if (q.choices) return typeof given === 'number' && !!q.choices[given]?.correct;
  return false;
}

/** What the student sees before submitting: no answers, no explanations. */
export function publicQuestion(q: QuizQuestion) {
  return q.numeric
    ? { prompt: q.prompt, type: 'numeric' as const, unit: q.numeric.unit }
    : { prompt: q.prompt, type: 'choice' as const, choices: (q.choices ?? []).map((c) => c.text) };
}

export const PASS_PERCENT = 70;

export function grade(questions: QuizQuestion[], answers: unknown[]) {
  const results = questions.map((q, i) => {
    const given = answers[i] ?? null;
    return {
      correct: isCorrect(q, given),
      given,
      answer: q.numeric ? `${q.numeric.answer}${q.numeric.unit ? ` ${q.numeric.unit}` : ''}` : (q.choices ?? []).find((c) => c.correct)?.text ?? '',
      explanation: q.explanation,
    };
  });
  const score = results.filter((r) => r.correct).length;
  const percent = questions.length ? Math.round((score / questions.length) * 100) : 0;
  return { score, total: questions.length, percent, passed: percent >= PASS_PERCENT, results };
}
