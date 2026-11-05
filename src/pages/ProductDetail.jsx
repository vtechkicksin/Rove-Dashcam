import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, ChevronRight, CircleCheck, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import { CHANNELS, getProduct, products, specLabels } from '../data/products';
import { accessories } from '../data/accessories';
import { STORE_URL } from '../lib/constants';
import { formatPrice } from '../lib/format';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import ProductGallery from '../components/product/ProductGallery';
import ProductCard from '../components/product/ProductCard';
import AccessoryCard from '../components/product/AccessoryCard';
import AddToCartButton from '../components/cart/AddToCartButton';
import QuantityStepper from '../components/ui/QuantityStepper';
import Price from '../components/ui/Price';
import ProductImage from '../components/ui/ProductImage';
import NotFound from './NotFound';

const assurances = [
  { icon: Truck, title: 'Free US shipping', detail: 'Delivered in 1–3 days' },
  { icon: RotateCcw, title: 'Free US returns', detail: 'Hassle-free' },
  { icon: ShieldCheck, title: '1-year warranty', detail: 'Lifetime support' },
];

function useInView(ref) {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

function ProductView({ product }) {
  useDocumentTitle(product.name);
  const [qty, setQty] = useState(1);
  const buyBoxRef = useRef(null);
  const buyBoxVisible = useInView(buyBoxRef);

  const addOns = product.addOns.map((id) => accessories.find((a) => a.id === id)).filter(Boolean);
  const related = products.filter((p) => p.id !== product.id && p.available).slice(0, 3);

  return (
    <>
      <div className="container-page py-8 sm:py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-fg-subtle">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li aria-hidden="true"><ChevronRight size={14} /></li>
            <li><Link to="/dash-cams" className="hover:text-white">Dash cams</Link></li>
            <li aria-hidden="true"><ChevronRight size={14} /></li>
            <li aria-current="page" className="text-fg">{product.name}</li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductGallery images={product.images} name={product.name} />
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-fg-subtle">{CHANNELS[product.channels]} dash cam</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">{product.name}</h1>
            <p className="mt-3 text-lg text-fg-muted">{product.tagline}</p>

            <div className="mt-6">
              <Price price={product.price} compareAtPrice={product.compareAtPrice} size="lg" showSaving />
            </div>
            <p className={`mt-2 flex items-center gap-1.5 text-sm ${product.available ? 'text-emerald-400' : 'text-red-400'}`}>
              <CircleCheck size={16} aria-hidden="true" />
              {product.available ? 'In stock — ships free in 1–3 days' : 'Currently sold out'}
            </p>

            <p className="mt-6 leading-relaxed text-fg-muted">{product.summary}</p>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-fg">
                  <Check size={16} className="mt-0.5 shrink-0 text-brand-400" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>

            <div ref={buyBoxRef} className="mt-8 flex flex-col gap-3 sm:flex-row">
              {product.available && (
                <QuantityStepper value={qty} onChange={setQty} label="Quantity" />
              )}
              <AddToCartButton
                id={product.id}
                name={product.name}
                available={product.available}
                qty={qty}
                className="flex-1 py-3.5 text-base"
              />
            </div>
            <a
              href={`${STORE_URL}/products/${product.handle}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm text-fg-subtle hover:text-white"
            >
              View on rovedashcam.com <ArrowUpRight size={14} aria-hidden="true" />
            </a>

            <ul className="mt-8 grid grid-cols-3 gap-3">
              {assurances.map(({ icon: Icon, title, detail }) => (
                <li key={title} className="rounded-xl border border-ink-700 bg-ink-900 p-3 text-center">
                  <Icon size={18} className="mx-auto text-brand-400" aria-hidden="true" />
                  <p className="mt-2 text-xs font-semibold text-white">{title}</p>
                  <p className="text-[11px] text-fg-subtle">{detail}</p>
                </li>
              ))}
            </ul>

            <section className="mt-10" aria-labelledby="specs-title">
              <h2 id="specs-title" className="text-lg font-semibold text-white">Specifications</h2>
              <dl className="mt-4 divide-y divide-ink-700 rounded-2xl border border-ink-700">
                {Object.entries(specLabels).map(([key, label]) => (
                  <div key={key} className="grid grid-cols-[9rem_1fr] gap-4 px-4 py-3 text-sm">
                    <dt className="text-fg-subtle">{label}</dt>
                    <dd className="text-fg">{product.specs[key] ?? 'Not listed'}</dd>
                  </div>
                ))}
              </dl>
              <Link to="/compare" className="mt-3 inline-block text-sm font-medium text-brand-300 hover:text-brand-400">
                Compare with other models →
              </Link>
            </section>
          </div>
        </div>
      </div>

      {addOns.length > 0 && (
        <section className="border-t border-ink-700 bg-ink-900/40 py-16" aria-labelledby="addons-title">
          <div className="container-page">
            <h2 id="addons-title" className="text-2xl font-bold tracking-tight text-white">Complete your setup</h2>
            <p className="mt-2 text-fg-muted">Compatible accessories for the {product.name}.</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {addOns.map((a) => (
                <AccessoryCard key={a.id} item={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-page py-16" aria-labelledby="related-title">
        <h2 id="related-title" className="text-2xl font-bold tracking-tight text-white">Other ROVE dash cams</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <div aria-hidden="true" className="h-20" />

      <AnimatePresence>
        {!buyBoxVisible && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-700 bg-ink-950/95 backdrop-blur-xl"
          >
            <div className="container-page flex items-center gap-4 py-3">
              <ProductImage src={product.images[0]} alt="" sizes="48px" className="hidden h-12 w-12 shrink-0 rounded-lg p-1 sm:flex" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">{product.name}</p>
                <p className="text-sm text-fg-muted">{formatPrice(product.price)}</p>
              </div>
              <AddToCartButton id={product.id} name={product.name} available={product.available} qty={qty} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProduct(id);
  // Keyed so quantity and gallery state reset when navigating between products.
  return product ? <ProductView key={product.id} product={product} /> : <NotFound />;
}
