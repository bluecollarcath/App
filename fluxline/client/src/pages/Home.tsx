import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, Calculator, GraduationCap, LineChart, Zap } from 'lucide-react';
import { useApi, useTitle } from '../lib/hooks';
import type { Catalog } from '../lib/api';
import { FOUNDING_PLANS, PLANS, type SiteConfig } from '../lib/api';
import { InlineMd } from '../components/Markdown';
import CourseCard from '../components/CourseCard';
import MhoTeaser from '../components/MhoTeaser';

const FAQ = [
  ['Is this really college-level?', 'Yes. The curriculum follows the sequence of an ABET-accredited B.S. in Electrical Engineering — the same topics, notation, and depth you would see in university lectures and textbooks, from calculus and circuit analysis through electromagnetics, control, DSP, and power systems.'],
  ['What do I need to know before starting?', 'Just basic arithmetic. If you never took (or don\'t remember) algebra, trigonometry or calculus, start with Precalculus: Math Foundations, which builds those skills from the ground up. The rest of the Foundations stage then teaches the calculus, linear algebra, differential equations, and physics everything else depends on.'],
  ['Do I get a degree?', 'No. Ohmentum is an independent learning platform, not an accredited institution. It is ideal for preparing for or supplementing a degree, reviewing for the FE exam, changing careers into hardware, or learning for its own sake.'],
  ['What can I try for free?', 'The first lesson of every course is free with an account, including all of its practice problems.'],
  ['Can I cancel anytime?', 'Yes. Manage or cancel your subscription from your account page; you keep access until the end of your billing period.'],
];

export default function Home() {
  useTitle('');
  const { data } = useApi<Catalog>('/catalog');
  const { data: config } = useApi<SiteConfig>('/config');
  const founding = !!config?.founding?.active;
  const featured = data?.courses.filter((c) => ['circuit-analysis-1', 'signals-and-systems', 'microelectronics-1', 'electromagnetics', 'control-systems', 'power-systems'].includes(c.slug));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="white" strokeWidth="1" /></pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              <Zap size={14} /> A complete B.S.E.E.-level curriculum
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Learn electrical engineering <span className="text-brand-grad">the way universities teach it.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              {data ? `${data.totals.courses} courses, ${data.totals.lessons} lessons` : 'Two dozen courses'} — from Kirchhoff's laws to power systems, RF, and VLSI. Rigorous derivations, worked examples, and auto-graded problems with full solutions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup" className="btn-brand">Start learning free <ArrowRight size={16} /></Link>
              <Link to="/curriculum" className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-5 py-3 text-sm font-semibold text-white hover:border-slate-400">Browse the curriculum</Link>
            </div>
            <p className="mt-4 text-sm text-slate-400">First lesson of every course free · No credit card to start</p>
          </div>

          {/* Sample problem card */}
          <div className="rounded-2xl border border-emerald-900/70 bg-[#0b1d15]/85 p-6 shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400">ECE 202 · Circuit Analysis II</span>
              <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 font-semibold text-emerald-300">Lesson 2.1</span>
            </div>
            <h3 className="mt-3 text-lg font-bold">Sinusoids &amp; Phasors</h3>
            <div className="mt-4 rounded-xl bg-black/40 p-4 text-slate-200">
              <div className="overflow-x-auto"><InlineMd text={'$$\\mathbf{Z} = 30 + j(1000)(0.04) = 50\\angle 53.13^\\circ\\ \\Omega$$'} /></div>
              <div className="overflow-x-auto"><InlineMd text={'$$\\mathbf{I} = \\frac{100\\angle 0^\\circ}{50\\angle 53.13^\\circ} = 2\\angle{-53.13^\\circ}\\ \\text{A}$$'} /></div>
            </div>
            <div className="mt-4 rounded-xl border border-emerald-900/70 p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-300">Problem</div>
              <p className="mt-1 text-sm text-slate-300">What is the reactance of a 1 µF capacitor at 1 kHz?</p>
              <div className="mt-3 flex items-center gap-2 text-sm">
                <span className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-1.5 font-mono">159.15</span>
                <span className="text-slate-500">Ω</span>
                <span className="ml-auto flex items-center gap-1 font-semibold text-emerald-400"><CheckCircle2 size={16} /> Correct</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
          {[
            [data?.totals.courses ?? '—', 'college-level courses'],
            [data?.totals.lessons ?? '—', 'lessons across 4 stages'],
            [data ? `${data.totals.hours.toLocaleString()}+` : '—', 'hours of study'],
            ['7', 'engineering tracks'],
          ].map(([n, l]) => (
            <div key={String(l)}>
              <div className="text-3xl font-extrabold text-ink">{n}</div>
              <div className="mt-1 text-sm text-slate-500">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Built like a real EE program</h2>
          <p className="mt-4 text-lg text-slate-600">Every concept is derived, not just stated — then applied in worked examples and practiced until it sticks.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            [GraduationCap, 'Sequenced curriculum', 'Four stages with explicit prerequisites, mirroring a four-year degree plan.'],
            [BookOpen, 'Rigorous lessons', 'Proper mathematical notation, derivations, tables, and engineering intuition.'],
            [Calculator, 'Auto-graded problems', 'Numeric and conceptual problems with tolerance-aware checking and full solutions.'],
            [LineChart, 'Progress tracking', 'Mark lessons complete and see your progress across every course and track.'],
          ].map(([Icon, title, body]) => {
            const I = Icon as typeof Zap;
            return (
              <div key={String(title)} className="rounded-2xl border border-slate-200 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-brand-dark"><I size={22} /></div>
                <h3 className="mt-4 font-bold text-ink">{String(title)}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{String(body)}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-6"><MhoTeaser /></div>
      </section>

      {/* Stages */}
      {data && (
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">The full path, start to finish</h2>
                <p className="mt-3 text-lg text-slate-600">From first principles to specialization.</p>
              </div>
              <Link to="/curriculum" className="btn-ghost">See every course <ArrowRight size={16} /></Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {Object.entries(data.stages).map(([n, s]) => (
                <div key={n} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="font-mono text-xs font-semibold text-brand-dark">STAGE {n}</div>
                  <h3 className="mt-1 text-xl font-bold text-ink">{s.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{s.blurb}</p>
                  <ul className="mt-4 space-y-1.5 text-sm">
                    {data.courses.filter((c) => c.stage === Number(n)).map((c) => (
                      <li key={c.slug}><Link to={`/courses/${c.slug}`} className="text-slate-700 hover:text-volt">{c.title}</Link></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured */}
      {featured && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink">Core courses</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => <CourseCard key={c.slug} course={c} />)}
          </div>
        </section>
      )}

      {/* Pricing teaser */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">One subscription. The entire degree's worth of material.</h2>
          <p className="mt-4 text-lg text-slate-300">
            {founding
              ? <>Founding Members pay just ${FOUNDING_PLANS.monthly.price}/month or ${FOUNDING_PLANS.annual.price}/year (regularly ${PLANS.monthly.price} and ${PLANS.annual.price}), locked in for as long as you stay subscribed.</>
              : <>${PLANS.monthly.price}/month or ${PLANS.annual.price}/year, less than a single textbook. Start free; upgrade when you're ready.</>}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/pricing" className="btn-brand">{founding ? 'Become a founding member' : 'View plans'}</Link>
            <Link to="/courses/circuit-analysis-1/lessons/1-1" className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-5 py-3 text-sm font-semibold hover:border-slate-400">Try a free lesson</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-ink">Questions</h2>
        <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-ink">
                {q}<span className="ml-4 text-slate-400 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-7 text-slate-600">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
