import { useSearchParams } from 'react-router-dom';
import { CHANNELS, products } from '../data/products';
import { cn } from '../lib/format';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import ProductCard from '../components/product/ProductCard';

const channelFilters = [{ id: 'all', label: 'All' }, ...Object.entries(CHANNELS).map(([id, label]) => ({ id, label }))];

const sorters = {
  featured: () => 0,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
};

export default function DashCams() {
  useDocumentTitle('Dash Cams');
  const [params, setParams] = useSearchParams();
  const channel = params.get('channel') ?? 'all';
  const sort = sorters[params.get('sort')] ? params.get('sort') : 'featured';
  const inStockOnly = params.get('stock') === '1';

  const update = (key, value, fallback) => {
    const next = new URLSearchParams(params);
    if (value === fallback) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const visible = products
    .filter((p) => channel === 'all' || String(p.channels) === channel)
    .filter((p) => !inStockOnly || p.available)
    .sort(sorters[sort]);

  return (
    <div className="container-page py-12 sm:py-16">
      <header className="mb-10">
        <p className="eyebrow">Shop</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">Dash cams</h1>
        <p className="mt-3 max-w-2xl text-fg-muted">
          From single-channel starters to three-channel rideshare setups. Every model records to a microSD card,
          connects to the free ROVE app and is covered by a 1-year warranty.
        </p>
      </header>

      <div className="mb-8 flex flex-col gap-4 border-b border-ink-700 pb-6 md:flex-row md:items-center md:justify-between">
        <div role="radiogroup" aria-label="Filter by channels" className="flex flex-wrap gap-2">
          {channelFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="radio"
              aria-checked={channel === f.id}
              onClick={() => update('channel', f.id, 'all')}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition',
                channel === f.id
                  ? 'border-brand-500 bg-brand-500 text-ink-950'
                  : 'border-ink-600 text-fg-muted hover:border-fg-subtle hover:text-white',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-fg-muted">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => update('stock', e.target.checked ? '1' : '0', '0')}
              className="h-4 w-4 accent-brand-500"
            />
            In stock only
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-fg-muted">
            Sort
            <select
              value={sort}
              onChange={(e) => update('sort', e.target.value, 'featured')}
              className="h-10 rounded-xl border border-ink-600 bg-ink-800 px-3 text-sm text-white focus:border-brand-400 focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
        </div>
      </div>

      <p className="mb-5 text-sm text-fg-subtle" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'dash cam' : 'dash cams'}
      </p>

      {visible.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 3} />
          ))}
        </div>
      ) : (
        <div className="surface flex flex-col items-center gap-4 px-6 py-16 text-center">
          <p className="font-semibold text-white">No dash cams match these filters</p>
          <button type="button" className="btn-secondary" onClick={() => setParams({}, { replace: true })}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
