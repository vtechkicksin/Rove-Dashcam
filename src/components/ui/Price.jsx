import { cn, discountPercent, formatPrice } from '../../lib/format';

const sizes = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-3xl sm:text-4xl',
};

export default function Price({ price, compareAtPrice, size = 'md', showSaving = false }) {
  const saving = discountPercent(price, compareAtPrice);
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className={cn('font-bold tracking-tight text-white', sizes[size])}>{formatPrice(price)}</span>
      {saving > 0 && (
        <>
          <span className="text-sm text-fg-subtle line-through">
            <span className="sr-only">Was </span>
            {formatPrice(compareAtPrice)}
          </span>
          {showSaving && (
            <span className="chip border-emerald-500/30 bg-emerald-500/10 text-emerald-300">Save {saving}%</span>
          )}
        </>
      )}
    </div>
  );
}
