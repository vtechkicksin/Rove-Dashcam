import { useSearchParams } from 'react-router-dom';
import { accessories, accessoryCategories } from '../data/accessories';
import { cn } from '../lib/format';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import AccessoryCard from '../components/product/AccessoryCard';

const filters = [{ id: 'all', label: 'All' }, ...accessoryCategories];

export default function Accessories() {
  useDocumentTitle('Accessories');
  const [params, setParams] = useSearchParams();
  const requested = params.get('category');
  const category = filters.some((f) => f.id === requested) ? requested : 'all';
  const visible = category === 'all' ? accessories : accessories.filter((a) => a.category === category);

  const select = (id) => setParams(id === 'all' ? {} : { category: id }, { replace: true });

  return (
    <div className="container-page py-12 sm:py-16">
      <header className="mb-10 max-w-2xl">
        <p className="eyebrow">Gear up, drive safe</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">Accessories</h1>
        <p className="mt-3 text-fg-muted">
          Memory cards, hardwire kits, mounts and cables designed specifically for ROVE dash cams. Check each
          item&apos;s compatibility before you buy.
        </p>
      </header>

      <div role="radiogroup" aria-label="Filter by category" className="mb-8 flex gap-2 overflow-x-auto border-b border-ink-700 pb-6 scrollbar-none">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            role="radio"
            aria-checked={category === f.id}
            onClick={() => select(f.id)}
            className={cn(
              'shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition min-h-11 sm:min-h-0',
              category === f.id
                ? 'border-brand-500 bg-brand-500 text-ink-950'
                : 'border-ink-600 text-fg-muted hover:border-fg-subtle hover:text-white',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="mb-5 text-sm text-fg-subtle" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'item' : 'items'}
      </p>
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((item) => (
          <AccessoryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
