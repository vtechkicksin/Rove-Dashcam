import { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Check, MapPin, Minus, Moon, Pause, Play, SquareParking, Wifi } from 'lucide-react';
import { products } from '../../data/products';
import { accessories } from '../../data/accessories';
import { cn } from '../../lib/format';
import SectionHeader from '../ui/SectionHeader';
import ProductImage from '../ui/ProductImage';
import Price from '../ui/Price';
import AddToCartButton from '../cart/AddToCartButton';
import { useAutoAdvance } from '../../hooks/useAutoAdvance';
import { useFillAnimation } from '../../hooks/useFillAnimation';

const shortName = (p) => p.name.replace('ROVE ', '');
const mbps = (p) => Number(/(\d+) MB\/s/.exec(p.specs.download)?.[1] ?? 0);
const MAX_MBPS = Math.max(...products.map(mbps));
const frontRes = (p) => {
  const [front] = p.specs.resolution.split(/ \+ | @/);
  return front.replace('2160p', '4K').replace(' (upscaled)', ' upscaled');
};
const hardwireKit = accessories.find((a) => a.id === 'hardwire-kit');

// The tabs tour themselves once the section is in view; each stays for TOUR_MS.
const TOUR_MS = 4000;
const TOUR_KEY = 'rove-features-tour';
const EASE = [0.22, 1, 0.36, 1];
// Rows and bars in the panel arrive one after another.
const rowIn = (i) => ({
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.24, delay: 0.08 + i * 0.045, ease: EASE },
});
// Section entrance: heading, then tabs, then panel, once.
const revealIn = (inView, i) => ({
  initial: { opacity: 0, y: 14 },
  animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
  transition: { duration: 0.34, delay: i * 0.08, ease: EASE },
});

function ModelRows({ rows }) {
  return (
    <ul className="divide-y divide-ink-700">
      {rows.map(({ product, value, ok = true }, i) => (
        <motion.li key={product.id} {...rowIn(i)} className="flex items-center justify-between gap-4 py-2.5 text-sm">
          <span className="text-fg">{shortName(product)}</span>
          <span className={cn('inline-flex items-center gap-1.5', ok ? 'text-white' : 'text-fg-subtle')}>
            {ok ? <Check size={14} className="text-brand-400" aria-hidden="true" /> : <Minus size={14} aria-hidden="true" />}
            {value}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

const features = [
  {
    id: 'clarity',
    icon: Moon,
    tab: 'Day & night clarity',
    stat: 'Up to 4K',
    line: 'Sony STARVIS sensors keep plates and signs readable, even after dark.',
    visual: () => (
      <ModelRows
        rows={products.map((p) => ({
          product: p,
          value: `${frontRes(p)} · ${p.specs.sensor.includes('STARVIS 2') ? 'STARVIS 2' : 'STARVIS'}`,
        }))}
      />
    ),
  },
  {
    id: 'evidence',
    icon: MapPin,
    tab: 'Proof when it counts',
    stat: 'Auto-locked',
    line: 'Impact clips lock themselves, and GPS stamps your speed and location.',
    visual: () => (
      <>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-fg-subtle">GPS by model</p>
        <ModelRows rows={products.map((p) => ({ product: p, value: p.specs.gps ?? 'Not built in', ok: Boolean(p.specs.gps) }))} />
      </>
    ),
  },
  {
    id: 'parking',
    icon: SquareParking,
    tab: 'Watches while parked',
    stat: '24 hours',
    line: 'Parking mode keeps watch while you’re away. It runs on the ROVE hardwire kit.',
    visual: () => (
      <div className="flex items-center gap-4">
        <ProductImage src={hardwireKit.image} alt="" sizes="112px" className="h-28 w-28 shrink-0 rounded-xl p-2" />
        <div className="min-w-0">
          <p className="font-semibold text-white">{hardwireKit.name}</p>
          <p className="mt-1 text-xs text-fg-muted">Fits every ROVE dash cam</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Price price={hardwireKit.price} compareAtPrice={hardwireKit.compareAtPrice} showSaving />
            <AddToCartButton id={hardwireKit.id} name={hardwireKit.name} available={hardwireKit.available} variant="secondary" className="px-3 py-2">
              Add
            </AddToCartButton>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'app',
    icon: Wifi,
    tab: 'Clips on your phone',
    stat: 'Up to 30 MB/s',
    line: 'Download and share clips over 5GHz Wi-Fi with the free ROVE app.',
    visual: () => (
      <>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-fg-subtle">Wi-Fi download speed</p>
        <ul className="space-y-3">
          {products.map((p, i) => (
            <motion.li key={p.id} {...rowIn(i)} className="grid grid-cols-[7.5rem_1fr_4.5rem] items-center gap-3 text-sm">
              <span className="truncate text-fg">{shortName(p)}</span>
              <span className="h-2 overflow-hidden rounded-full bg-ink-800" aria-hidden="true">
                <motion.span
                  className="block h-full origin-left rounded-full bg-brand-500"
                  style={{ width: `${(mbps(p) / MAX_MBPS) * 100}%` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.45, delay: 0.14 + i * 0.045, ease: EASE }}
                />
              </span>
              <span className="text-right text-white">{mbps(p)} MB/s</span>
            </motion.li>
          ))}
        </ul>
      </>
    ),
  },
];

// Side line that fills down the active tab while the tour is on it.
function TabProgress({ selected, state, cycle }) {
  const lineRef = useRef(null);
  useFillAnimation(lineRef, { state: selected ? state : 'off', ms: TOUR_MS, axis: 'y', restartKey: cycle });
  return (
    <span
      ref={lineRef}
      aria-hidden="true"
      className="absolute inset-y-0 left-0 w-[3px] origin-top bg-gradient-to-b from-brand-300 to-brand-500"
      style={{ transform: 'scaleY(0)' }}
    />
  );
}

export default function FeatureExplorer() {
  const [activeId, setActiveId] = useState(features[0].id);
  const tabRefs = useRef([]);
  const sectionRef = useRef(null);
  // The entrance plays and the tour starts the first time the section is properly in view.
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });
  const index = features.findIndex((f) => f.id === activeId);
  const active = features[index];

  const tour = useAutoAdvance({
    position: activeId,
    onAdvance: () => setActiveId(features[(index + 1) % features.length].id),
    ms: TOUR_MS,
    storageKey: TOUR_KEY,
    ready: inView,
  });

  // Picking a tab yourself ends the tour for this visit.
  const choose = (i) => {
    tour.stopForUser();
    setActiveId(features[i].id);
  };

  const onKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (index + step + features.length) % features.length;
    choose(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section ref={sectionRef} className="border-y border-ink-700 bg-ink-900/40 py-16 sm:py-20" aria-labelledby="features-title">
      <div className="container-page">
        <motion.div {...revealIn(inView, 0)}>
          <SectionHeader
            id="features-title"
            align="left"
            eyebrow="Why ROVE"
            title="Built for the moments that matter"
            action={
              <button
                type="button"
                onClick={tour.toggle}
                aria-label={tour.on ? 'Pause the feature tour' : 'Play the feature tour'}
                className="inline-flex min-h-11 items-center gap-1.5 self-start rounded-full border border-ink-600 px-3 text-xs font-medium text-fg-muted transition-colors hover:text-white sm:min-h-0 sm:self-auto sm:py-1.5"
              >
                {tour.on ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
                {tour.on ? 'Pause' : 'Play'}
              </button>
            }
          />
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
          {/* Hovering or focusing the tabs holds the tour; it resumes with the time that was left. */}
          <div
            role="tablist"
            aria-label="Features"
            onKeyDown={onKeyDown}
            {...tour.holdProps}
            className="flex flex-wrap gap-2 lg:flex-col"
          >
            {features.map((f, i) => {
              const selected = f.id === activeId;
              const Icon = f.icon;
              return (
                <motion.button
                  key={f.id}
                  {...revealIn(inView, i + 1)}
                  ref={(el) => (tabRefs.current[i] = el)}
                  id={`feature-tab-${f.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="feature-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => choose(i)}
                  className={cn(
                    'relative flex items-center gap-3 overflow-hidden rounded-2xl border px-3 py-2.5 text-left transition-colors sm:px-4 sm:py-3 lg:px-5 lg:py-4',
                    selected ? 'border-brand-500/50 bg-ink-800' : 'border-ink-700 bg-ink-900 hover:border-ink-600',
                  )}
                >
                  <TabProgress selected={selected} state={tour.state} cycle={tour.cycle} />
                  <span
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors',
                      selected ? 'bg-brand-500 text-ink-950' : 'bg-brand-500/10 text-brand-400',
                    )}
                  >
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block whitespace-nowrap font-semibold text-white">{f.tab}</span>
                    <span className="hidden text-sm text-fg-muted lg:block">{f.line}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            {...revealIn(inView, features.length + 1)}
            id="feature-panel"
            role="tabpanel"
            aria-labelledby={`feature-tab-${active.id}`}
            className="surface p-6 sm:p-8"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{active.stat}</p>
                <p className="mt-2 text-fg-muted lg:hidden">{active.line}</p>
                <div className="mt-6">{active.visual()}</div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
