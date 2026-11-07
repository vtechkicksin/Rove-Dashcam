import { useRef } from 'react';
import { cn } from '../../lib/format';

// Radio group rendered as pills, with roving focus and arrow-key selection.
// `stretch` lays the options out as equal columns on phones.
export default function SegmentedControl({ options, value, onChange, label, className, size = 'md', stretch = false }) {
  const refs = useRef([]);

  const onKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const focused = refs.current.indexOf(document.activeElement);
    const from = focused >= 0 ? focused : options.findIndex((o) => o.value === value);
    const next = (from + step + options.length) % options.length;
    onChange(options[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cn(stretch ? 'grid grid-cols-3 gap-2 sm:flex sm:flex-wrap' : 'flex flex-wrap gap-2', className)}
    >
      {options.map(({ value: v, label: text, icon: Icon, detail }, i) => {
        const selected = v === value;
        return (
          <button
            key={v}
            ref={(el) => (refs.current[i] = el)}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(v)}
            className={cn(
              'inline-flex items-center gap-2 border font-medium transition',
              stretch
                ? 'flex-col justify-center rounded-2xl px-2 py-2 text-center text-xs sm:flex-row sm:rounded-full sm:px-4 sm:py-2.5 sm:text-sm'
                : 'rounded-full justify-center min-h-11 sm:min-h-0',
              !stretch && (size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm'),
              selected
                ? 'border-brand-500 bg-brand-500 text-ink-950'
                : 'border-ink-600 bg-ink-800/60 text-fg hover:border-fg-subtle',
            )}
          >
            {Icon && <Icon size={size === 'sm' ? 14 : 16} aria-hidden="true" />}
            {text}
            {detail && <span className={cn(selected ? 'text-ink-950/70' : 'text-fg-subtle')}>{detail}</span>}
          </button>
        );
      })}
    </div>
  );
}
