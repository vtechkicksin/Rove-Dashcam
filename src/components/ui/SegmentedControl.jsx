import { useId, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/format';

// Radio group rendered as equal pills on phones, with roving focus and arrow-key selection.
// The orange highlight is one shared element that glides to the chosen pill (200 ms); under
// reduced motion (MotionConfig) it jumps instead.
//
// `progress` draws a segmented line under the pills, one segment per pill, like story bars:
// { state: 'running' | 'held' | 'off', ms, cycle }. Running fills the selected segment over `ms`
// (earlier segments stay full); held freezes it in place; off just marks the selected pill.
// `cycle` restarts the fill when it changes.
export default function SegmentedControl({ options, value, onChange, label, className, progress }) {
  const refs = useRef([]);
  const groupId = useId();
  const selectedIndex = options.findIndex((o) => o.value === value);

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
      className={cn('grid grid-cols-3 gap-2 sm:flex sm:flex-wrap', progress && 'gap-y-5 pb-4', className)}
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
            {progress && <ProgressSegment index={i} selectedIndex={selectedIndex} progress={progress} value={v} />}
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

function ProgressSegment({ index, selectedIndex, progress, value }) {
  const { state, ms, cycle } = progress;
  const isCurrent = index === selectedIndex;
  // Off: only the chosen pill is marked. Otherwise segments before the current one are complete.
  const full = state === 'off' ? isCurrent : index < selectedIndex;
  const filling = isCurrent && state !== 'off';

  return (
    <span aria-hidden="true" className="pointer-events-none absolute -bottom-3 left-1.5 right-1.5 h-1 rounded-full bg-ink-700">
      {filling ? (
        <span
          key={`${value}-${cycle}`}
          className="block h-full origin-left animate-fill rounded-full bg-gradient-to-r from-brand-300 to-brand-500 shadow-[0_0_10px_rgb(249_115_22/0.65)]"
          style={{ animationDuration: `${ms}ms`, animationPlayState: state === 'held' ? 'paused' : 'running' }}
        />
      ) : (
        <span
          className={cn(
            'block h-full origin-left rounded-full bg-gradient-to-r from-brand-300 to-brand-500 transition-transform duration-200',
            full ? 'scale-x-100 shadow-[0_0_10px_rgb(249_115_22/0.65)]' : 'scale-x-0',
          )}
        />
      )}
    </span>
  );
}
