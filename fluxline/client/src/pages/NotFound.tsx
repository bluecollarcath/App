import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <div className="font-mono text-6xl font-bold text-slate-200">404</div>
      <h1 className="mt-4 text-2xl font-bold text-ink">Open circuit</h1>
      <p className="mt-2 text-slate-600">We couldn't find that page. No current is flowing here.</p>
      <Link to="/" className="btn-primary mt-6">Back home</Link>
    </div>
  );
}
