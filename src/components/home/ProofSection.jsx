import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { HeartHandshake, Pause, Play, RefreshCw, RotateCcw, Star } from 'lucide-react';
import { promises, reviews } from '../../data/content';
import { getProduct } from '../../data/products';
import { cn } from '../../lib/format';
import { useAutoAdvance } from '../../hooks/useAutoAdvance';
import { useFillAnimation } from '../../hooks/useFillAnimation';
import ProductImage from '../ui/ProductImage';

const REVIEW_MS = 6000;
const REVIEW_KEY = 'rove-reviews-carousel';
const promiseIcons = { returns: RotateCcw, support: HeartHandshake, updates: RefreshCw };

const entries = reviews.map((r) => ({ ...r, product: getProduct(r.productId) }));
const shortName = (p) => p.name.replace('ROVE ', '');

function Stars({ size = 14 }) {
  return (
    <span className="inline-flex gap-0.5 text-brand-400" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} fill="currentColor" />
      ))}
    </span>
  );
}

// Orange line that fills down the left edge of the review that is showing.
function ReviewProgress({ selected, state, cycle }) {
  const lineRef = useRef(null);
  useFillAnimation(lineRef, { state: selected ? state : 'off', ms: REVIEW_MS, axis: 'y', restartKey: cycle });
  return (
    <span
      ref={lineRef}
      aria-hidden="true"
      className="absolute inset-y-0 left-0 w-[3px] origin-top bg-gradient-to-b from-brand-300 to-brand-500"
      style={{ transform: 'scaleY(0)' }}
    />
  );
}

// Visible on every sample so nobody mistakes it for a real customer's words.
function SampleTag({ className }) {
  return (
    <span className={cn('inline-flex items-center rounded-full border border-dashed border-amber-500/60 px-2 py-0.5 text-[11px] font-medium text-amber-300', className)}>
      Sample review
    </span>
  );
}

function Quote({ entry }) {
  const { product } = entry;
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-ink-700 bg-ink-800/40 p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Stars size={16} />
        {entry.sample && <SampleTag />}
      </div>
      <blockquote className="mt-3 flex-1">
        <p className="font-semibold text-white sm:text-lg">“{entry.title}”</p>
        <p className="mt-3 text-sm leading-relaxed text-fg-muted">{entry.body}</p>
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <ProductImage src={product.images[0]} alt="" sizes="48px" className="h-12 w-12 rounded-lg p-1" />
        <p className="text-sm">
          <span className="block text-fg-subtle">{entry.sample ? 'Sample review of the' : 'Customer review of the'}</span>
          <Link to={`/dash-cams/${product.id}`} className="font-semibold text-white hover:text-brand-300">
            {product.name}
          </Link>
        </p>
      </figcaption>
    </figure>
  );
}

export default function ProofSection() {
  const [index, setIndex] = useState(0);
  const tabRefs = useRef([]);
  const sectionRef = useRef(null);
  const multiple = entries.length > 1;
  // The tour starts only once the section is properly in view.
  const inView = useInView(sectionRef, { once: true, amount: 0.4 });
  const active = entries[index];

  const tour = useAutoAdvance({
    position: index,
    onAdvance: () => setIndex((i) => (i + 1) % entries.length),
    ms: REVIEW_MS,
    storageKey: REVIEW_KEY,
    ready: inView && multiple,
  });

  // Picking a review yourself ends the auto-advance for this visit.
  const choose = (i) => {
    tour.stopForUser();
    setIndex(i);
  };

  const onKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (index + step + entries.length) % entries.length;
    choose(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section ref={sectionRef} className="container-page py-16 sm:py-20" aria-labelledby="proof-title">
      <div className="surface p-6 sm:p-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Trusted by drivers</p>
            <p className="mt-3 text-5xl font-extrabold tracking-tight text-white">40,000+</p>
            <h2 id="proof-title" className="mt-1 text-fg-muted">five-star reviews from ROVE customers</h2>
          </div>
          {multiple && (
            <button
              type="button"
              onClick={tour.toggle}
              aria-label={tour.on ? 'Pause the review carousel' : 'Play the review carousel'}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-ink-600 px-3 text-xs font-medium text-fg-muted transition-colors hover:text-white sm:min-h-0 sm:py-1.5"
            >
              {tour.on ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
              {tour.on ? 'Pause' : 'Play'}
            </button>
          )}
        </div>

        {/* Hovering or focusing the carousel holds it; it resumes with the time that was left. */}
        <div {...(multiple ? tour.holdProps : {})} className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)]">
          {/* The list always shows; auto-advance, the side line and Pause only switch on with two or more reviews. */}
          <div role="tablist" aria-label="Customer reviews" onKeyDown={onKeyDown} className="flex flex-wrap gap-2 lg:flex-col">
            {entries.map((entry, i) => {
              const selected = i === index;
              return (
                <button
                  key={entry.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  id={`review-tab-${entry.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="review-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => choose(i)}
                  className={cn(
                    'relative flex min-h-11 items-center gap-3 overflow-hidden rounded-xl border px-3 py-2 text-left transition-colors',
                    selected ? 'border-brand-500/50 bg-ink-800' : 'border-ink-700 bg-ink-900 hover:border-ink-600',
                  )}
                >
                  {multiple && <ReviewProgress selected={selected} state={tour.state} cycle={tour.cycle} />}
                  <Stars size={12} />
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-white">
                      {shortName(entry.product)}
                      {entry.sample && <span className="text-[11px] font-medium text-amber-300">Sample</span>}
                    </span>
                    <span className="hidden max-w-[16rem] truncate text-xs text-fg-subtle lg:block">{entry.title}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div id="review-panel" role="tabpanel" aria-labelledby={`review-tab-${active.id}`}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                className="h-full"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <Quote entry={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <ul className="mt-8 grid gap-5 border-t border-ink-700 pt-8 sm:grid-cols-3">
          {promises.map(({ id, title, detail }) => {
            const Icon = promiseIcons[id];
            return (
              <li key={id} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-semibold text-white">{title}</span>
                  <span className="block text-sm text-fg-muted">{detail}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
