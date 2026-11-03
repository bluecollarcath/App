// Unit quizzes and course final exams. Files live at content/assessments/<course>/<id>.md,
// where <id> is "unit-<n>" or "final". Answers never leave the server until a student submits.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { CourseDef } from './catalog.js';
import { parseAssessment } from './quizParse.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.resolve(here, '../content/assessments');

export function assessmentIds(course: CourseDef) {
  return [...course.units.map((_, i) => `unit-${i + 1}`), 'final'];
}

export function assessmentTitle(course: CourseDef, id: string) {
  if (id === 'final') return `${course.code} Final Exam`;
  const n = Number(id.slice(5));
  return `Unit ${n} Quiz: ${course.units[n - 1]?.title ?? ''}`;
}

export function loadAssessment(course: CourseDef, id: string) {
  if (!assessmentIds(course).includes(id)) return null;
  const file = path.join(DIR, course.slug, `${id}.md`);
  if (!fs.existsSync(file)) return null;
  return parseAssessment(fs.readFileSync(file, 'utf8'));
}

/** Question counts for the assessments a course has, keyed by id. */
export function assessmentIndex(course: CourseDef) {
  const out: Record<string, number> = {};
  for (const id of assessmentIds(course)) {
    const a = loadAssessment(course, id);
    if (a) out[id] = a.questions.length;
  }
  return out;
}
