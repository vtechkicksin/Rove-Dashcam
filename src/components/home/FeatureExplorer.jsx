import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, MapPin, Minus, Moon, SquareParking, Wifi } from 'lucide-react';
import { products } from '../../data/products';
import { accessories } from '../../data/accessories';
import { cn } from '../../lib/format';
import SectionHeader from '../ui/SectionHeader';
import ProductImage from '../ui/ProductImage';
import Price from '../ui/Price';
import AddToCartButton from '../cart/AddToCartButton';

const shortName = (p) => p.name.replace('ROVE ', '');
const mbps = (p) => Number(/(\d+) MB\/s/.exec(p.specs.download)?.[1] ?? 0);
const MAX_MBPS = Math.max(...products.map(mbps));
const frontRes = (p) => {
  const [front] = p.specs.resolution.split(/ \+ | @/);
  return front.replace('2160p', '4K').replace(' (upscaled)', ' upscaled');
};
const hardwireKit = accessories.find((a) => a.id === 'hardwire-kit');

function ModelRows({ rows }) {
  return (
    <ul className="divide-y divide-ink-700">
      {rows.map(({ product, value, ok = true }) => (
        <li key={product.id} className="flex items-center justify-between gap-4 py-2.5 text-sm">
          <span className="text-fg">{shortName(product)}</span>
          <span className={cn('inline-flex items-center gap-1.5', ok ? 'text-white' : 'text-fg-subtle')}>
            {ok ? <Check size={14} className="text-brand-400" aria-hidden="true" /> : <Minus size={14} aria-hidden="true" />}
            {value}
          </span>
        </li>
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
          {products.map((p) => (
            <li key={p.id} className="grid grid-cols-[7.5rem_1fr_4.5rem] items-center gap-3 text-sm">
              <span className="truncate text-fg">{shortName(p)}</span>
              <span className="h-2 overflow-hidden rounded-full bg-ink-800" aria-hidden="true">
                <motion.span
                  className="block h-full rounded-full bg-brand-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(mbps(p) / MAX_MBPS) * 100}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
              <span className="text-right text-white">{mbps(p)} MB/s</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
];

export default function FeatureExplorer() {
  const [activeId, setActiveId] = useState(features[0].id);
  const tabRefs = useRef([]);
  const index = features.findIndex((f) => f.id === activeId);
  const active = features[index];

  const onKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (index + step + features.length) % features.length;
    setActiveId(features[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="border-y border-ink-700 bg-ink-900/40 py-16 sm:py-20" aria-labelledby="features-title">
      <div className="container-page">
        <SectionHeader id="features-title" align="left" eyebrow="Why ROVE" title="Built for the moments that matter" />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
          <div
            role="tablist"
            aria-label="Features"
            onKeyDown={onKeyDown}
            className="-mx-4 flex gap-2 overflow-x-auto px-4 scrollbar-none sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:px-0"
          >
            {features.map((f, i) => {
              const selected = f.id === activeId;
              const Icon = f.icon;
              return (
                <button
                  key={f.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  id={`feature-tab-${f.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="feature-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(f.id)}
                  className={cn(
                    'flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition lg:px-5 lg:py-4',
                    selected ? 'border-brand-500/50 bg-ink-800' : 'border-ink-700 bg-ink-900 hover:border-ink-600',
                  )}
                >
                  <span
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                      selected ? 'bg-brand-500 text-ink-950' : 'bg-brand-500/10 text-brand-400',
                    )}
                  >
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block whitespace-nowrap font-semibold text-white">{f.tab}</span>
                    <span className="hidden text-sm text-fg-muted lg:block">{f.line}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div id="feature-panel" role="tabpanel" aria-labelledby={`feature-tab-${active.id}`} className="surface p-6 sm:p-8">
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
          </div>
        </div>
      </div>
    </section>
  );
}
