import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Minus, X } from 'lucide-react';
import { products } from '../../data/products';
import { cn, formatPrice } from '../../lib/format';
import ProductImage from '../ui/ProductImage';

// Plain-language questions, each answered from the real spec data so the ticks can't drift.
const hasRear = (p) => p.channels >= 2;
const hasCabin = (p) => p.channels === 3;
const trueFrontFourK = (p) => p.specs.resolution.startsWith('2160p') && !p.specs.resolution.includes('upscaled');
const starvis2 = (p) => p.specs.sensor.includes('STARVIS 2');
const hasGps = (p) => Boolean(p.specs.gps);
const cardIncluded = (p) => p.specs.storage.includes('FREE');
const touchscreen = (p) => p.specs.display.toLowerCase().includes('touch');

const rows = [
  { label: 'Records the road ahead', test: () => true },
  { label: 'Records the rear', test: hasRear },
  { label: 'Records the cabin', test: hasCabin },
  { label: 'True 4K front camera', test: trueFrontFourK },
  { label: 'Best night vision (STARVIS 2)', test: starvis2 },
  { label: 'Built-in GPS', test: hasGps },
  { label: 'Memory card included', test: cardIncluded },
  { label: 'Touchscreen', test: touchscreen },
];

// "I need" chips: picking one fades out the cameras that don't have it.
const needs = [
  { id: 'rear', label: 'Rear camera', test: hasRear },
  { id: 'cabin', label: 'Cabin camera', test: hasCabin },
  { id: 'gps', label: 'GPS', test: hasGps },
  { id: 'night', label: 'Best night vision', test: starvis2 },
  { id: 'card', label: 'Card included', test: cardIncluded },
];

const PICK_ID = 'r2-4k-dual';
const shortName = (p) => p.name.replace('ROVE ', '');

export default function CompareChecklist() {
  const [selected, setSelected] = useState([]);
  const active = needs.filter((n) => selected.includes(n.id));
  const fits = (p) => active.every((n) => n.test(p));
  const fitCount = products.filter(fits).length;

  const toggle = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const columnClass = (p) =>
    cn('transition-opacity duration-200', p.id === PICK_ID && 'bg-brand-500/[0.06]', !fits(p) && 'opacity-25');

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm text-fg-subtle">I need:</span>
        {needs.map((n) => {
          const on = selected.includes(n.id);
          return (
            <button
              key={n.id}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(n.id)}
              className={cn(
                'min-h-11 rounded-full border px-4 text-sm font-medium transition-colors active:scale-[0.98] sm:min-h-0 sm:py-2',
                on ? 'border-brand-500 bg-brand-500 text-ink-950' : 'border-ink-600 bg-ink-800/60 text-fg hover:border-fg-subtle',
              )}
            >
              {n.label}
            </button>
          );
        })}
        {selected.length > 0 && (
          <button
            type="button"
            onClick={() => setSelected([])}
            className="inline-flex min-h-11 items-center gap-1 px-2 text-sm text-fg-muted hover:text-white sm:min-h-0"
          >
            <X size={14} aria-hidden="true" /> Clear
          </button>
        )}
        <p role="status" className="ml-auto text-sm font-medium text-brand-300">
          {selected.length === 0
            ? ''
            : fitCount === 0
              ? 'No camera has all of these. Try removing one.'
              : `${fitCount} of ${products.length} fit`}
        </p>
      </div>

      <div className="surface">
        <table className="w-full table-fixed border-collapse text-xs sm:text-sm">
          <caption className="sr-only">Which ROVE dash cam has each feature</caption>
          <thead>
            <tr>
              <th scope="col" className="w-[30%] p-2 sm:w-[28%] sm:p-4">
                <span className="sr-only">Feature</span>
              </th>
              {products.map((p) => (
                <th key={p.id} scope="col" className={cn('p-1.5 align-bottom font-normal sm:p-3', columnClass(p))}>
                  <div className="flex flex-col items-center gap-1.5 text-center sm:gap-2">
                    <span
                      className={cn(
                        'hidden rounded-full border px-2 py-0.5 text-[11px] sm:inline-block',
                        p.id === PICK_ID ? 'border-brand-500/50 text-brand-300' : 'border-ink-600 text-fg-muted',
                        !p.label && 'invisible',
                      )}
                    >
                      {p.label ?? 'No label'}
                    </span>
                    <ProductImage src={p.images[0]} alt="" sizes="96px" className="h-10 w-12 rounded-md p-1 sm:h-16 sm:w-20" />
                    <Link to={`/dash-cams/${p.id}`} className="font-semibold leading-tight text-white hover:text-brand-300">
                      {shortName(p)}
                    </Link>
                    <span className={cn('text-[11px] sm:text-sm', p.available ? 'text-fg' : 'text-red-400')}>
                      {p.available ? formatPrice(p.price) : 'Sold out'}
                    </span>
                    {!fits(p) && <span className="sr-only">(doesn&apos;t match what you need)</span>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-ink-700">
                <th scope="row" className="p-2 text-left font-medium text-fg-muted sm:p-4">
                  {row.label}
                </th>
                {products.map((p) => {
                  const yes = row.test(p);
                  return (
                    <td key={p.id} className={cn('p-2 text-center sm:p-4', columnClass(p))}>
                      {yes ? (
                        <Check size={18} className="mx-auto text-brand-400" aria-hidden="true" />
                      ) : (
                        <Minus size={18} className="mx-auto text-ink-600" aria-hidden="true" />
                      )}
                      <span className="sr-only">{yes ? 'Yes' : 'No'}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
