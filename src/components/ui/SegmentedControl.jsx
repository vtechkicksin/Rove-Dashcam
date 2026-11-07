import { useEffect, useId, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/format';

// Radio group rendered as equal-width pills, with roving focus and arrow-key selection.
// The orange highlight is one shared element that glides to the chosen pill (200 ms); under
// reduced motion (MotionConfig) it jumps instead.
//
// `progress` adds one bar under the pills with a checkpoint dot under each pill:
// { state: 'running' | 'held' | 'off', ms, cycle }. Running fills the selected pill's share of the
// bar over `ms`; held freezes it in place; off rests it at the selected pill. `cycle` restarts the fill.
export default function SegmentedControl({ options, value, onChange, label, className, progress }) {
  const refs = useRef([]);
  const groupId = useId();
  const selectedIndex = options.findIndex((o) => o.value === value);

  const onKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const focused = refs.current.indexOf(document.activeElement);
    const from = focused >= 0 ? focused : selectedIndex;
    const next = (from + step + options.length) % options.length;
    onChange(options[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div className={className}>
      <div role="radiogroup" aria-label={label} onKeyDown={onKeyDown} className="grid grid-cols-3 gap-2">
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
                'transition-colors duration-150 active:scale-[0.98] sm:flex-row sm:rounded-full sm:px-3 sm:py-2.5 sm:text-sm',
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
              <span className="relative z-10 inline-flex flex-col items-center gap-2 sm:flex-row sm:whitespace-nowrap">
                {Icon && <Icon size={16} aria-hidden="true" />}
                {text}
              </span>
            </button>
          );
        })}
      </div>
      {progress && <ProgressBar count={options.length} selectedIndex={selectedIndex} progress={progress} />}
    </div>
  );
}

// Decorative: screen readers already hear the selected pill, so the bar is hidden from them.
function ProgressBar({ count, selectedIndex, progress }) {
  const { state, ms, cycle } = progress;
  const active = state !== 'off';
  const fillRef = useRef(null);
  const animationRef = useRef(null);

  // Each pill fills its own share of the bar. A new pill or a new cycle starts a fresh fill.
  useEffect(() => {
    animationRef.current?.cancel();
    animationRef.current = null;
    if (!active) return;
    animationRef.current = fillRef.current.animate(
      [{ transform: `scaleX(${selectedIndex / count})` }, { transform: `scaleX(${(selectedIndex + 1) / count})` }],
      { duration: ms, easing: 'linear', fill: 'forwards' },
    );
  }, [active, selectedIndex, count, ms, cycle]);

  // Holding pauses the fill exactly where it is; it resumes from the same point.
  useEffect(() => {
    if (state === 'held') animationRef.current?.pause();
    if (state === 'running') animationRef.current?.play();
  }, [state]);

  useEffect(() => () => animationRef.current?.cancel(), []);

  return (
    <div aria-hidden="true" className="relative mt-4 h-1.5 rounded-full bg-ink-700">
      <span
        ref={fillRef}
        className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-brand-300 to-brand-500 shadow-[0_0_6px_rgb(249_115_22/0.45)] transition-transform duration-300"
        // At rest (paused or picked by hand) the bar stops at the chosen pill's checkpoint.
        style={{ transform: `scaleX(${(selectedIndex + 0.5) / count})` }}
      />
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={cn(
            'absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink-950 transition-colors duration-200',
            i <= selectedIndex ? 'bg-brand-400 shadow-[0_0_8px_rgb(249_115_22/0.8)]' : 'bg-ink-600',
          )}
          style={{ left: `${((i + 0.5) / count) * 100}%` }}
        />
      ))}
    </div>
  );
}
