import { Check } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { PLANS } from '../lib/api';
import { useAuth } from '../lib/auth';
import { useTitle } from '../lib/hooks';
import SubscribeButton from '../components/SubscribeButton';

const FEATURES = [
  'Every lesson in every course',
  'Worked examples and full derivations',
  'Auto-graded practice problems with solutions',
  'Progress tracking across the curriculum',
  'FE Electrical & Computer exam review',
  'New lessons as they are published',
];

export default function Pricing() {
  useTitle('Pricing');
  const { user } = useAuth();
  const [params] = useSearchParams();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">Simple pricing</h1>
        <p className="mt-4 text-lg text-slate-600">One subscription unlocks the entire electrical engineering curriculum.</p>
        {params.get('checkout') === 'cancelled' && <p className="mt-4 rounded-xl bg-slate-100 p-3 text-sm text-slate-600">Checkout cancelled — you haven't been charged.</p>}
      </div>

      {user?.subscribed ? (
        <div className="mx-auto mt-12 max-w-lg rounded-2xl bg-emerald-50 p-8 text-center ring-1 ring-emerald-200">
          <h2 className="text-xl font-bold text-ink">You're subscribed 🎉</h2>
          <p className="mt-2 text-slate-600">You have full access to every course.</p>
          <Link to="/dashboard" className="btn-primary mt-5">Go to my learning</Link>
        </div>
      ) : (
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 p-8">
            <h2 className="text-lg font-bold text-ink">Free</h2>
            <div className="mt-4 flex items-baseline gap-1"><span className="text-4xl font-extrabold text-ink">$0</span></div>
            <p className="mt-2 text-sm text-slate-500">Explore the curriculum</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              {['First lesson of every course', 'All practice problems in free lessons', 'Full syllabi and learning outcomes', 'Progress tracking'].map((f) => <li key={f} className="flex gap-2"><Check size={18} className="shrink-0 text-emerald-500" />{f}</li>)}
            </ul>
            <Link to={user ? '/curriculum' : '/signup'} className="btn-ghost mt-8 w-full">{user ? 'Browse courses' : 'Create free account'}</Link>
          </div>

          {(['monthly', 'annual'] as const).map((key) => {
            const p = PLANS[key];
            const featured = key === 'annual';
            return (
              <div key={key} className={`relative rounded-3xl p-8 ${featured ? 'bg-ink text-white shadow-2xl shadow-slate-400/40' : 'border border-slate-200'}`}>
                {featured && <span className="absolute -top-3 left-8 rounded-full bg-brand-grad px-3 py-1 text-xs font-bold text-ink">Best value</span>}
                <h2 className={`text-lg font-bold ${featured ? 'text-white' : 'text-ink'}`}>{p.label}</h2>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">${p.price}</span>
                  <span className={featured ? 'text-slate-400' : 'text-slate-500'}>/{p.per}</span>
                </div>
                <p className={`mt-2 text-sm ${featured ? 'text-emerald-300' : 'text-slate-500'}`}>{p.note}</p>
                <ul className={`mt-6 space-y-3 text-sm ${featured ? 'text-slate-200' : 'text-slate-700'}`}>
                  {FEATURES.map((f) => <li key={f} className="flex gap-2"><Check size={18} className={`shrink-0 ${featured ? 'text-brand' : 'text-emerald-500'}`} />{f}</li>)}
                </ul>
                <div className="mt-8">
                  <SubscribeButton plan={key} className={featured ? 'btn-brand w-full' : 'btn-primary w-full'}>Subscribe {p.label.toLowerCase()}</SubscribeButton>
                  <p className={`mt-3 text-xs leading-5 ${featured ? 'text-slate-400' : 'text-slate-500'}`}>
                    Renews automatically at ${p.price}/{p.per} until you cancel. Cancel anytime from your account page; you keep access through the period you've paid for.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-6 text-slate-500">
        Payments are processed securely by Stripe. Subscriptions renew automatically until cancelled. By subscribing you agree to our{' '}
        <Link to="/terms" className="underline">Terms of Service</Link> and <Link to="/refunds" className="underline">Refund Policy</Link>.
        Ohmentum is not an accredited institution and does not award academic credit or degrees.
      </p>
    </div>
  );
}
