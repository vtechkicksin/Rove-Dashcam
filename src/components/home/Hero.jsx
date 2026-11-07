import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Pause, Play, ShieldCheck, Star } from 'lucide-react';
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

const trustIcons = { warranty: ShieldCheck, reviews: Star };

// The coverage pills advance on their own: Road ahead → Front + rear → Front, cabin + rear.
const ROTATE_MS = 4500;
const ROTATION_KEY = 'rove-hero-rotation';

// 'play' | 'paused' | null (never chosen). Only the Pause/Play button saves a choice.
function loadRotationChoice() {
  try {
    const saved = localStorage.getItem(ROTATION_KEY);
    return saved === 'play' || saved === 'paused' ? saved : null;
  } catch {
    return null;
  }
}

function saveRotationChoice(choice) {
  try {
    localStorage.setItem(ROTATION_KEY, choice);
  } catch {
    // Storage can be unavailable (private mode); the choice still holds for this visit.
  }
}

const systemReducesMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const fade = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
};

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [rotationChoice, setRotationChoice] = useState(loadRotationChoice);
  // Picking a pill or model yourself stops the rotation for this visit, so it never overrides you.
  const [pickedByUser, setPickedByUser] = useState(false);
  // Hovering or focusing the pills holds the rotation until the pointer or focus leaves.
  const [held, setHeld] = useState(false);

  // Rotate unless paused, or unless the device asks for reduced motion and the visitor hasn't pressed Play.
  const rotationOn = !pickedByUser && (rotationChoice === 'play' || (rotationChoice === null && !prefersReducedMotion));
  const rotating = rotationOn && !held;

  const [channels, setChannels] = useState(() => {
    const startsRotating = loadRotationChoice() === 'play' || (loadRotationChoice() === null && !systemReducesMotion());
    return startsRotating ? 1 : 2;
  });
  const [productId, setProductId] = useState(() => PICKS[channels][0]);
  const product = getProduct(productId);
  // The other in-stock model for this coverage (only front + rear has two).
  const other = PICKS[channels].map(getProduct).find((p) => p.id !== productId);

  const showCoverage = (c) => {
    setChannels(c);
    setProductId(PICKS[c][0]);
  };

  const chooseCoverage = (c) => {
    setPickedByUser(true);
    showCoverage(c);
  };

  // Time left on the current pill. A hold freezes it, so the progress line and the switch stay in step.
  const remainingRef = useRef(ROTATE_MS);
  // Bumped on Play so the progress line restarts together with a fresh countdown.
  const [cycle, setCycle] = useState(0);

  const toggleRotation = () => {
    const next = rotationOn ? 'paused' : 'play';
    if (next === 'play') {
      remainingRef.current = ROTATE_MS;
      setCycle((c) => c + 1);
    }
    setRotationChoice(next);
    setPickedByUser(false);
    saveRotationChoice(next);
  };

  // A new pill always gets the full time. Declared before the timer so it runs first.
  useEffect(() => {
    remainingRef.current = ROTATE_MS;
  }, [channels]);

  useEffect(() => {
    if (!rotating) return undefined;
    const startedAt = performance.now();
    const timer = setTimeout(() => showCoverage((channels % 3) + 1), remainingRef.current);
    return () => {
      clearTimeout(timer);
      remainingRef.current = Math.max(0, remainingRef.current - (performance.now() - startedAt));
    };
  }, [rotating, channels, cycle]);

  const progressState = rotating ? 'running' : rotationOn ? 'held' : 'off';

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl" />

      <div className="container-page relative grid gap-5 py-6 sm:gap-8 sm:py-14 lg:grid-cols-[1.05fr_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-8 lg:py-16">
        <div>
          <h1 id="hero-title" className="text-[2rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            4K dash cams that catch <span className="text-gradient">every detail</span>
          </h1>
          <div className="mt-4 flex max-w-xl items-center justify-between gap-3 sm:mt-6">
            <p className="text-sm text-fg-subtle">What do you want to record?</p>
            <button
              type="button"
              onClick={toggleRotation}
              aria-label={rotationOn ? 'Pause the camera rotation' : 'Play the camera rotation'}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-xs font-medium text-fg-muted transition-colors hover:text-white sm:min-h-0 sm:py-1"
            >
              {rotationOn ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
              {rotationOn ? 'Pause' : 'Play'}
            </button>
          </div>
          <div
            onMouseEnter={() => setHeld(true)}
            onMouseLeave={() => setHeld(false)}
            onFocus={() => setHeld(true)}
            onBlur={() => setHeld(false)}
          >
            <SegmentedControl
              label="What do you want to record?"
              options={coverageOptions}
              value={channels}
              onChange={chooseCoverage}
              progress={{ state: progressState, ms: ROTATE_MS, cycle }}
              className="mt-2 max-w-xl"
            />
          </div>
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
          {/* Announce product changes only when the visitor caused them, not on every auto-advance. */}
          <div aria-live={rotating ? 'off' : 'polite'}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={product.id} {...fade}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">{product.name}</h2>
                  <p className="text-2xl font-bold text-white sm:text-3xl">{formatPrice(product.price)}</p>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Highlights">
                  {product.chips.map((chip) => (
                    <li key={chip} className="rounded-lg bg-ink-800 px-3 py-1.5 text-sm text-fg">
                      {chip}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
          {other && (
            <button
              type="button"
              onClick={() => {
                setPickedByUser(true);
                setProductId(other.id);
              }}
              className="mt-3 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-brand-300 hover:text-brand-400 sm:min-h-0"
            >
              Or the {other.name.replace('ROVE ', '')}, {formatPrice(other.price)} <ArrowRight size={14} aria-hidden="true" />
            </button>
          )}

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
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

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-fg-muted">
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
        </div>
      </div>
    </section>
  );
}
