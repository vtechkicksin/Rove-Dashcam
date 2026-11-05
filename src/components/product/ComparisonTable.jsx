import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products, specLabels } from '../../data/products';
import { cn, formatPrice } from '../../lib/format';
import ProductImage from '../ui/ProductImage';

const specKeys = Object.keys(specLabels);
const PICK_ID = 'r2-4k-dual';

const isUniform = (key) => new Set(products.map((p) => p.specs[key] ?? '—')).size === 1;

export default function ComparisonTable() {
  const [diffOnly, setDiffOnly] = useState(false);
  const rows = diffOnly ? specKeys.filter((k) => !isUniform(k)) : specKeys;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm text-fg-subtle lg:hidden">Swipe to see every model →</p>
        <label className="ml-auto inline-flex cursor-pointer items-center gap-2 text-sm text-fg-muted">
          <input
            type="checkbox"
            checked={diffOnly}
            onChange={(e) => setDiffOnly(e.target.checked)}
            className="h-4 w-4 rounded border-ink-600 bg-ink-800 accent-brand-500"
          />
          Only show differences
        </label>
      </div>

      <div className="surface overflow-x-auto scrollbar-none">
        <table className="w-full min-w-[44rem] border-collapse text-xs sm:min-w-[56rem] sm:text-sm">
          <caption className="sr-only">Specification comparison of ROVE dash cams</caption>
          <thead>
            <tr>
              <th scope="col" className="sticky left-0 z-10 w-24 bg-ink-900 p-3 text-left align-bottom sm:w-44 sm:p-4 text-xs font-medium uppercase tracking-wider text-fg-subtle">
                Model
              </th>
              {products.map((p) => (
                <th
                  key={p.id}
                  scope="col"
                  className={cn('p-3 align-top font-normal sm:p-4', p.id === PICK_ID && 'bg-brand-500/[0.06]')}
                >
                  <div className="flex flex-col items-center gap-3 text-center">
                    <span className={cn('chip', p.id === PICK_ID ? 'border-brand-500/40 bg-brand-500/10 text-brand-300' : 'invisible')}>
                      Our pick
                    </span>
                    <ProductImage src={p.images[0]} alt="" sizes="120px" className="h-16 w-20 rounded-lg p-1.5 sm:h-20 sm:w-28" />
                    <Link to={`/dash-cams/${p.id}`} className="font-semibold text-white hover:text-brand-300">
                      {p.name}
                    </Link>
                    <span className="text-base font-bold text-white">{formatPrice(p.price)}</span>
                    {!p.available && <span className="text-xs font-medium text-red-400">Sold out</span>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((key) => (
              <tr key={key} className="border-t border-ink-700">
                <th scope="row" className="sticky left-0 z-10 bg-ink-900 p-3 text-left font-medium text-fg-muted sm:p-4">
                  {specLabels[key]}
                </th>
                {products.map((p) => (
                  <td
                    key={p.id}
                    className={cn('p-3 text-center text-fg sm:p-4', p.id === PICK_ID && 'bg-brand-500/[0.06]')}
                  >
                    {p.specs[key] ?? <span className="text-fg-subtle" aria-label="Not listed">—</span>}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t border-ink-700">
              <td className="sticky left-0 z-10 bg-ink-900 p-4" />
              {products.map((p) => (
                <td key={p.id} className={cn('p-4', p.id === PICK_ID && 'bg-brand-500/[0.06]')}>
                  <Link
                    to={`/dash-cams/${p.id}`}
                    className={cn('w-full', p.id === PICK_ID ? 'btn-primary' : 'btn-secondary')}
                  >
                    View details
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
