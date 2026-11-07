import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { COVERAGE, products, specLabels } from '../../data/products';
import { cn, formatPrice } from '../../lib/format';
import ProductImage from '../ui/ProductImage';

const allRows = [
  { key: 'bestFor', label: 'Best for', value: (p) => p.bestFor },
  { key: 'coverage', label: 'Records', value: (p) => COVERAGE[p.channels] },
  ...Object.entries(specLabels).map(([key, label]) => ({ key, label, value: (p) => p.specs[key] })),
];
// The rows most shoppers decide on; the rest sit behind "Show all specs".
const KEY_ROWS = ['bestFor', 'coverage', 'resolution', 'sensor', 'gps', 'download'];
const PICK_ID = 'r2-4k-dual';

const isUniform = (row, models) => new Set(models.map((p) => row.value(p) ?? '—')).size === 1;

// `models` narrows the table to the products picked in the compare tray.
export default function ComparisonTable({ compact = false, models = products }) {
  const [diffOnly, setDiffOnly] = useState(false);
  const [showAll, setShowAll] = useState(!compact);
  const visibleRows = showAll ? allRows : allRows.filter((r) => KEY_ROWS.includes(r.key));
  const sameRows = visibleRows.filter((r) => isUniform(r, models));
  // Only offer the switch when it would hide something; otherwise it looks broken.
  const canHide = sameRows.length > 0;
  const hiding = diffOnly && canHide;
  const rows = hiding ? visibleRows.filter((r) => !sameRows.includes(r)) : visibleRows;
  const fewModels = models.length <= 2;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        {!fewModels && <p className="text-sm text-fg-subtle lg:hidden">Swipe to see every model →</p>}
        {canHide && (
          <label className="ml-auto inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm text-fg-muted sm:min-h-0">
            <input
              type="checkbox"
              checked={diffOnly}
              onChange={(e) => setDiffOnly(e.target.checked)}
              className="h-4 w-4 rounded border-ink-600 bg-ink-800 accent-brand-500"
            />
            Only show differences
          </label>
        )}
        <p role="status" className={cn('w-full text-right text-sm text-fg-subtle', !hiding && 'sr-only')}>
          {hiding &&
            `Hiding ${sameRows.length} ${sameRows.length === 1 ? 'spec' : 'specs'} that ${sameRows.length === 1 ? 'is' : 'are'} the same on every model: ${sameRows.map((r) => r.label).join(', ')}.`}
        </p>
      </div>

      <div className="surface overflow-x-auto scrollbar-none">
        <table className={cn('w-full table-fixed border-collapse text-xs sm:text-sm', !fewModels && 'min-w-[44rem] sm:min-w-[56rem]')}>
          <caption className="sr-only">Specification comparison of ROVE dash cams</caption>
          <thead>
            <tr>
              <th scope="col" className="sticky left-0 z-10 w-24 bg-ink-900 p-3 text-left align-bottom sm:w-44 sm:p-4 text-xs font-medium uppercase tracking-wider text-fg-subtle">
                Model
              </th>
              {models.map((p) => (
                <th
                  key={p.id}
                  scope="col"
                  className={cn('p-3 align-top font-normal sm:p-4', p.id === PICK_ID && 'bg-brand-500/[0.06]')}
                >
                  <div className="flex flex-col items-center gap-3 text-center">
                    <span
                      className={cn(
                        'chip',
                        p.id === PICK_ID ? 'border-brand-500/40 bg-brand-500/10 text-brand-300' : 'border-ink-600 text-fg-muted',
                        !p.label && 'invisible',
                      )}
                    >
                      {p.label ?? 'No label'}
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
            {rows.map((row) => (
              <tr key={row.key} className="border-t border-ink-700">
                <th scope="row" className="sticky left-0 z-10 bg-ink-900 p-3 text-left font-medium text-fg-muted sm:p-4">
                  {row.label}
                </th>
                {models.map((p) => (
                  <td
                    key={p.id}
                    className={cn('p-3 text-center text-fg sm:p-4', p.id === PICK_ID && 'bg-brand-500/[0.06]')}
                  >
                    {row.value(p) ?? <span className="text-fg-subtle" aria-label="Not listed">—</span>}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t border-ink-700">
              <td className="sticky left-0 z-10 bg-ink-900 p-4" />
              {models.map((p) => (
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
      {compact && (
        <div className="mt-4 flex justify-center">
          <button type="button" onClick={() => setShowAll((v) => !v)} aria-expanded={showAll} className="btn-ghost">
            {showAll ? 'Show key specs only' : `Show all ${allRows.length} specs`}
            <ChevronDown size={16} className={showAll ? 'rotate-180 transition' : 'transition'} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
