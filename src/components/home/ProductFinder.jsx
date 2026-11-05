import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, Route, Users } from 'lucide-react';
import { products } from '../../data/products';
import { cn } from '../../lib/format';
import SectionHeader from '../ui/SectionHeader';
import ProductCard from '../product/ProductCard';

const needs = [
  { id: 'all', label: 'Show all', channels: null, icon: null, hint: 'Every ROVE dash cam uses a Sony STARVIS sensor and built-in Wi-Fi.' },
  { id: 1, label: 'The road ahead', channels: 1, icon: Route, hint: 'Single-channel cams — compact, simple, and great value for daily commutes.' },
  { id: 2, label: 'Front + rear', channels: 2, icon: Car, hint: 'Dual-channel cams catch rear-end collisions and tailgaters too.' },
  { id: 3, label: 'Front, cabin + rear', channels: 3, icon: Users, hint: 'Three views at once — the pick for Uber, Lyft and family road trips.' },
];

export default function ProductFinder() {
  const [needId, setNeedId] = useState('all');
  const need = needs.find((n) => n.id === needId);
  const visible = need.channels ? products.filter((p) => p.channels === need.channels) : products;

  return (
    <section className="container-page py-20 sm:py-24" aria-labelledby="finder-title">
      <SectionHeader
        id="finder-title"
        eyebrow="Find your dash cam"
        title="What do you want to record?"
        description="Pick what matters to you and we’ll narrow the lineup."
      />

      <div role="radiogroup" aria-label="Recording coverage" className="mx-auto mb-4 flex max-w-3xl flex-wrap justify-center gap-2">
        {needs.map((n) => {
          const Icon = n.icon;
          const selected = n.id === needId;
          return (
            <button
              key={n.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setNeedId(n.id)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition',
                selected
                  ? 'border-brand-500 bg-brand-500 text-ink-950'
                  : 'border-ink-600 bg-ink-900 text-fg-muted hover:border-fg-subtle hover:text-white',
              )}
            >
              {Icon && <Icon size={16} aria-hidden="true" />}
              {n.label}
            </button>
          );
        })}
      </div>
      <p className="mb-10 text-center text-sm text-fg-subtle" aria-live="polite">
        {need.hint}
      </p>

      <div
        className={cn(
          'mx-auto grid gap-5 sm:grid-cols-2',
          visible.length === 1 && 'max-w-sm sm:grid-cols-1',
          visible.length === 2 && 'max-w-3xl',
          visible.length > 2 && 'lg:grid-cols-3 xl:grid-cols-5',
        )}
      >
        {visible.map((p, i) => (
          <ProductCard key={p.id} product={p} priority={i < 2} />
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-fg-muted">
        Still deciding?{' '}
        <Link to="/compare" className="font-medium text-brand-300 underline-offset-4 hover:underline">
          Compare every spec side by side
        </Link>
      </p>
    </section>
  );
}
