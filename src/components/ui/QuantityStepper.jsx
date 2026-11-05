import { Minus, Plus } from 'lucide-react';
import { cn } from '../../lib/format';

export default function QuantityStepper({ value, onChange, min = 1, max = 10, label, size = 'md' }) {
  const btn = cn(
    'inline-flex items-center justify-center text-fg-muted transition hover:text-white disabled:opacity-30 disabled:hover:text-fg-muted',
    size === 'sm' ? 'h-8 w-8' : 'h-11 w-11',
  );
  return (
    <div
      className="inline-flex items-center rounded-xl border border-ink-600 bg-ink-800"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>
      <span className={cn('text-center font-semibold tabular-nums', size === 'sm' ? 'w-6 text-sm' : 'w-8')} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
