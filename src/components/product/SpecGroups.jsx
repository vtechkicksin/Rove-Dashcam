import { ChevronDown } from 'lucide-react';
import { specGroups } from '../../data/products';

// Each group is a native <details>; only the first starts open so the page stays short.
export default function SpecGroups({ product }) {
  return (
    <div className="divide-y divide-ink-700 rounded-2xl border border-ink-700">
      {specGroups.map((group, i) => (
        <details key={group.title} open={i === 0} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3.5 font-medium text-white [&::-webkit-details-marker]:hidden">
            {group.title}
            <ChevronDown size={18} className="text-fg-subtle transition group-open:rotate-180" aria-hidden="true" />
          </summary>
          <dl className="divide-y divide-ink-700 border-t border-ink-700">
            {group.rows.map((row) => (
              <div key={row.key} className="grid gap-1 px-4 py-3 text-sm sm:grid-cols-[1fr_1.1fr] sm:gap-4">
                <dt>
                  <span className="block text-fg">{row.label}</span>
                  {row.hint && <span className="block text-xs text-fg-subtle">{row.hint}</span>}
                </dt>
                <dd className="text-fg-muted sm:text-right">{product.specs[row.key] ?? 'Not built in'}</dd>
              </div>
            ))}
          </dl>
        </details>
      ))}
    </div>
  );
}
