import { useId, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/format';

// Radio group rendered as equal pills on phones, with roving focus and arrow-key selection.
// The orange highlight is one shared element that glides to the chosen pill (200 ms); under
// reduced motion (MotionConfig) it jumps instead. `progressMs`, when set, draws a bar that
// fills across the selected pill over that time (a countdown to the next auto-advance).
export default function SegmentedControl({ options, value, onChange, label, className, progressMs }) {
  const refs = useRef([]);
  const groupId = useId();

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
      className={cn('grid grid-cols-3 gap-2 sm:flex sm:flex-wrap', className)}
    >
      {options.map(({ value: v, label: text, icon: Icon }, i) => {
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
              'relative inline-flex min-h-11 flex-col items-center justify-center gap-2 rounded-2xl border px-2 py-2 text-center text-xs font-medium',
              'transition-colors duration-150 active:scale-[0.98] sm:flex-row sm:rounded-full sm:px-4 sm:py-2.5 sm:text-sm',
              selected ? 'border-brand-500 text-ink-950' : 'border-ink-600 bg-ink-800/60 text-fg hover:border-fg-subtle',
            )}
          >
            {selected && (
              <motion.span
                layoutId={`${groupId}-highlight`}
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl bg-brand-500 sm:rounded-full"
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            {selected && progressMs && (
              <span aria-hidden="true" className="absolute inset-x-3 bottom-1 z-10 h-0.5 overflow-hidden rounded-full bg-ink-950/20">
                <span
                  key={v}
                  className="block h-full origin-left animate-fill rounded-full bg-ink-950/70"
                  style={{ animationDuration: `${progressMs}ms` }}
                />
              </span>
            )}
            <span className="relative z-10 inline-flex flex-col items-center gap-2 sm:flex-row">
              {Icon && <Icon size={16} aria-hidden="true" />}
              {text}
            </span>
          </button>
        );
      })}
    </div>
  );
}
