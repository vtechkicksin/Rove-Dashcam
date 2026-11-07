import { useState, useSyncExternalStore } from 'react';
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

// Five columns only fit from the lg breakpoint up; below that the table shows two models.
const WIDE = '(min-width: 1024px)';
const subscribe = (notify) => {
  const query = window.matchMedia(WIDE);
  query.addEventListener('change', notify);
  return () => query.removeEventListener('change', notify);
};
const useIsWide = () => useSyncExternalStore(subscribe, () => window.matchMedia(WIDE).matches, () => true);

function ModelPicker({ label, value, onChange, options }) {
  return (
    <label className="block min-w-0 flex-1 text-xs text-fg-subtle">
      <span className="mb-1 block">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-ink-600 bg-ink-800 px-3 text-sm text-white focus:border-brand-400 focus:outline-none"
      >
        {options.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name.replace('ROVE ', '')}
          </option>
        ))}
      </select>
    </label>
  );
}

// `models` narrows the table to the products picked in the compare tray.
export default function ComparisonTable({ compact = false, models = products }) {
  const isWide = useIsWide();
  const [diffOnly, setDiffOnly] = useState(false);
  const [showAll, setShowAll] = useState(!compact);

  // Narrow screens compare two models at a time, chosen with the pickers.
  const needsPicker = !isWide && models.length > 2;
  const firstOther = models.find((p) => p.id !== PICK_ID) ?? models[0];
  const [pair, setPair] = useState([models.find((p) => p.id === PICK_ID)?.id ?? models[0].id, firstOther.id]);
  const chosen = pair.map((id) => models.find((p) => p.id === id)).filter(Boolean);
  const cols = needsPicker && chosen.length === 2 ? chosen : models;

  const setSlot = (slot, id) =>
    setPair((current) => {
      const next = [...current];
      next[slot] = id;
      // Never show the same model twice: swap with the other slot instead.
      if (next[1 - slot] === id) next[1 - slot] = current[slot];
      return next;
    });

  const visibleRows = showAll ? allRows : allRows.filter((r) => KEY_ROWS.includes(r.key));
  const sameRows = visibleRows.filter((r) => isUniform(r, cols));
  // Only offer the switch when it would hide something; otherwise it looks broken.
  const canHide = sameRows.length > 0;
  const hiding = diffOnly && canHide;
  const rows = hiding ? visibleRows.filter((r) => !sameRows.includes(r)) : visibleRows;

  return (
    <div>
      {needsPicker && (
        <div className="mb-4 flex gap-3">
          <ModelPicker label="Model 1" value={pair[0]} onChange={(id) => setSlot(0, id)} options={models} />
          <ModelPicker label="Model 2" value={pair[1]} onChange={(id) => setSlot(1, id)} options={models} />
        </div>
      )}
      <div className="mb-4 flex flex-wrap items-center justify-end gap-x-4 gap-y-2">
        {canHide && (
          <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm text-fg-muted sm:min-h-0">
            <input
              type="checkbox"
              checked={diffOnly}
              onChange={(e) => setDiffOnly(e.target.checked)}
              className="h-4 w-4 rounded border-ink-600 bg-ink-800 accent-brand-500"
            />
            Only show differences
          </label>
        )}
        {/* Live region stays in the DOM so screen readers announce changes; it is only drawn while rows are hidden. */}
        <p role="status" className={hiding ? 'w-full text-right text-sm text-fg-subtle' : 'sr-only'}>
          {hiding &&
            `Hiding ${sameRows.length} ${sameRows.length === 1 ? 'spec' : 'specs'} that ${sameRows.length === 1 ? 'is' : 'are'} the same on every model: ${sameRows.map((r) => r.label).join(', ')}.`}
        </p>
      </div>

      <div className="surface">
        <table className="w-full table-fixed border-collapse text-xs sm:text-sm">
          <caption className="sr-only">Specification comparison of ROVE dash cams</caption>
          <thead>
            <tr>
              <th scope="col" className="w-20 bg-ink-900 p-2 text-left align-bottom text-xs font-medium uppercase tracking-wider text-fg-subtle sm:w-32 sm:p-4 lg:w-40">
                Model
              </th>
              {cols.map((p) => (
                <th
                  key={p.id}
                  scope="col"
                  className={cn('p-2 align-top font-normal sm:p-4', p.id === PICK_ID && 'bg-brand-500/[0.06]')}
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
                <th scope="row" className="p-2 text-left font-medium text-fg-muted sm:p-4">
                  {row.label}
                </th>
                {cols.map((p) => (
                  <td
                    key={p.id}
                    className={cn('break-words p-2 text-center text-fg sm:p-4', p.id === PICK_ID && 'bg-brand-500/[0.06]')}
                  >
                    {row.value(p) ?? <span className="text-fg-subtle" aria-label="Not listed">—</span>}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t border-ink-700">
              <td className="p-2 sm:p-4" />
              {cols.map((p) => (
                <td key={p.id} className={cn('p-2 sm:p-4', p.id === PICK_ID && 'bg-brand-500/[0.06]')}>
                  <Link
                    to={`/dash-cams/${p.id}`}
                    className={cn('w-full px-2 sm:px-5', p.id === PICK_ID ? 'btn-primary' : 'btn-secondary')}
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
