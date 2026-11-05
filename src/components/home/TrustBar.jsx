import { RotateCcw, ShieldCheck, Star, Truck } from 'lucide-react';
import { trustPoints } from '../../data/content';

const icons = { shipping: Truck, returns: RotateCcw, reviews: Star, warranty: ShieldCheck };

export default function TrustBar() {
  return (
    <section aria-label="Why shop with ROVE" className="border-y border-ink-700 bg-ink-900/60">
      <ul className="container-page grid grid-cols-2 gap-x-4 gap-y-5 py-6 lg:grid-cols-4">
        {trustPoints.map(({ id, title, detail }) => {
          const Icon = icons[id];
          return (
            <li key={id} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                <Icon size={18} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">{title}</span>
                <span className="block text-xs text-fg-subtle">{detail}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
