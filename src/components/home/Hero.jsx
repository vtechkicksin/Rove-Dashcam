import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Check, ShieldCheck, Star, Truck } from 'lucide-react';
import { COVERAGE, getProduct } from '../../data/products';
import { heroTrust } from '../../data/content';
import { formatPrice } from '../../lib/format';
import ProductImage from '../ui/ProductImage';
import SegmentedControl from '../ui/SegmentedControl';
import AddToCartButton from '../cart/AddToCartButton';
import { COVERAGE_ICONS } from '../product/coverageIcons';

// In-stock recommendations per coverage, best match first.
const PICKS = {
  1: ['r2-4k'],
  2: ['r2-4k-dual-pro', 'r2-4k-dual'],
  3: ['r3'],
};

const coverageOptions = [1, 2, 3].map((c) => ({ value: c, label: COVERAGE[c], icon: COVERAGE_ICONS[c] }));

const trustIcons = { shipping: Truck, warranty: ShieldCheck, reviews: Star };

const fade = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
};

export default function Hero() {
  const [channels, setChannels] = useState(2);
  const [productId, setProductId] = useState(PICKS[2][0]);
  const product = getProduct(productId);
  const picks = PICKS[channels].map(getProduct);

  const chooseCoverage = (c) => {
    setChannels(c);
    setProductId(PICKS[c][0]);
  };

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl" />

      <div className="container-page relative grid gap-5 py-6 sm:gap-8 sm:py-14 lg:grid-cols-[1.05fr_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-8 lg:py-16">
        <div>
          <h1 id="hero-title" className="text-[2rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            4K dash cams that catch <span className="text-gradient">every detail</span>
          </h1>
          <p className="mt-3 text-fg-muted sm:mt-4 sm:text-lg">
            Pick what you want to record<span className="hidden sm:inline"> and we&apos;ll show the camera that fits</span>.
          </p>
          <SegmentedControl
            label="What do you want to record?"
            options={coverageOptions}
            value={channels}
            onChange={chooseCoverage}
            stretch
            className="mt-5 sm:mt-6"
          />
        </div>

        <div className="relative mx-auto w-full max-w-[12rem] sm:max-w-md lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-lg lg:self-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={product.id} {...fade} className="relative">
              <ProductImage
                src={product.images[0]}
                alt={product.name}
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="aspect-square rounded-[2rem] p-6 shadow-2xl ring-1 ring-white/10 sm:p-8"
              />
              {product.label && (
                <span className="chip absolute left-4 top-4 border-transparent bg-ink-950/85 text-white backdrop-blur">
                  {product.label}
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div>
          {picks.length > 1 && (
            <SegmentedControl
              size="sm"
              label="Choose a model"
              options={picks.map((p) => ({ value: p.id, label: p.name.replace('ROVE ', ''), detail: formatPrice(p.price) }))}
              value={productId}
              onChange={setProductId}
              className="mb-4"
            />
          )}
          <div aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={product.id} {...fade}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">{product.headline}</h2>
                  <p className="text-xl font-bold text-white sm:text-2xl">{formatPrice(product.price)}</p>
                </div>
                <p className="mt-1 text-sm text-fg-subtle">{product.name}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-fg">
                      <Check size={16} className="mt-0.5 shrink-0 text-brand-400" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <AddToCartButton
                    id={product.id}
                    name={product.name}
                    available={product.available}
                    className="whitespace-nowrap px-7 py-3.5 text-base"
                  />
                  <Link to={`/dash-cams/${product.id}`} className="btn-secondary whitespace-nowrap px-7 py-3.5 text-base">
                    See details <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-fg-muted">
            {heroTrust.map(({ id, label }) => {
              const Icon = trustIcons[id];
              return (
                <li key={id} className="inline-flex items-center gap-1.5">
                  <Icon size={15} className="text-brand-400" aria-hidden="true" />
                  {label}
                </li>
              );
            })}
          </ul>
          <a href="#compare" className="mt-3 inline-flex min-h-11 items-center sm:mt-5 sm:min-h-0 gap-1.5 text-sm font-medium text-brand-300 hover:text-brand-400">
            Not sure? Compare all five <ArrowDown size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
