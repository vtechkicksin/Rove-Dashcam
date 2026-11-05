import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { getProduct } from '../../data/products';
import { cn, formatPrice } from '../../lib/format';
import ProductImage from '../ui/ProductImage';

const slides = [
  { productId: 'r2-4k-dual-pro', headline: ['America’s most advanced', 'dash cam'] },
  { productId: 'r2-4k-dual', headline: ['Front and rear 4K,', 'without the premium price'] },
  { productId: 'r3', headline: ['Every angle covered.', 'Front, cabin and rear.'] },
].map((s) => ({ ...s, product: getProduct(s.productId) }));

const INTERVAL_MS = 6500;

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const autoplay = !prefersReducedMotion && !paused && !hovering;

  useEffect(() => {
    if (!autoplay) return undefined;
    const id = setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => clearTimeout(id);
  }, [autoplay, index]);

  const { product, headline } = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured dash cams"
      className="relative overflow-hidden"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={() => setHovering(false)}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgb(255 255 255) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
      </div>

      <div className="container-page relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
        <div aria-live={autoplay ? 'off' : 'polite'}>
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="eyebrow">{product.name}</p>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {headline[0]} <span className="text-gradient">{headline[1]}</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-fg-muted">{product.summary}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {product.highlights.slice(0, 3).map((h) => (
                  <li key={h} className="chip border-ink-600 bg-ink-800/70 text-fg">
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={`/dash-cams/${product.id}`}
                  className="btn-primary whitespace-nowrap px-7 py-3.5 text-base"
                  aria-label={`Shop ${product.name}, ${formatPrice(product.price)}`}
                >
                  Shop now · {formatPrice(product.price)}
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link to="/compare" className="btn-secondary whitespace-nowrap px-7 py-3.5 text-base">
                  Compare models
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div aria-hidden="true" className="absolute inset-8 rounded-full blur-3xl" style={{ background: `${product.accent}40` }} />
          <div className="animate-float">
            <AnimatePresence mode="wait">
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45 }}
              >
                <ProductImage
                  src={product.images[0]}
                  alt={product.name}
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="aspect-square rounded-[2rem] p-8 shadow-2xl ring-1 ring-white/10"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="container-page relative pb-10">
        <div className="flex items-center gap-2">
          <div role="tablist" aria-label="Choose a featured dash cam" className="flex flex-1 gap-2 overflow-x-auto scrollbar-none">
            {slides.map((s, i) => (
              <button
                key={s.productId}
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                className={cn(
                  'relative min-w-[10rem] flex-1 overflow-hidden rounded-xl border px-4 py-3 text-left transition',
                  i === index ? 'border-ink-600 bg-ink-800' : 'border-ink-700 bg-ink-900/60 hover:border-ink-600',
                )}
              >
                <span className="block text-sm font-semibold text-white">{s.product.name}</span>
                <span className="block text-xs text-fg-subtle">{s.product.tagline}</span>
                {i === index && autoplay && (
                  <motion.span
                    key={`progress-${index}`}
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-0.5 bg-brand-500"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: INTERVAL_MS / 1000, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>
          {!prefersReducedMotion && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="icon-btn shrink-0 border border-ink-700"
              aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
            >
              {paused ? <Play size={16} /> : <Pause size={16} />}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
