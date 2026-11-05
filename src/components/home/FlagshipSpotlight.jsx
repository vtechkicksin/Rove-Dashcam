import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getProduct } from '../../data/products';
import { formatPrice } from '../../lib/format';
import ProductImage from '../ui/ProductImage';
import Reveal from '../ui/Reveal';

const product = getProduct('r2-4k-dual-pro');

const stats = [
  { value: '4K + 2K', label: 'Front + rear resolution' },
  { value: '30 MB/s', label: 'Wi-Fi 6 downloads' },
  { value: 'Dual', label: 'STARVIS 2 sensors' },
  { value: '128GB', label: 'Card + CPL filter included' },
];

export default function FlagshipSpotlight() {
  return (
    <section className="container-page py-20 sm:py-24" aria-labelledby="flagship-title">
      <Reveal className="surface relative overflow-hidden">
        <div aria-hidden="true" className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-500/15 blur-3xl" />
        <div className="relative grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:p-14">
          <div>
            <p className="eyebrow">Our flagship</p>
            <h2 id="flagship-title" className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {product.name}
            </h2>
            <p className="mt-4 text-lg text-fg-muted">{product.summary}</p>

            <dl className="mt-8 grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-ink-700 bg-ink-950/50 p-4">
                  <dt className="text-xs text-fg-subtle">{s.label}</dt>
                  <dd className="mt-1 text-2xl font-bold tracking-tight text-white">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to={`/dash-cams/${product.id}`} className="btn-primary px-6 py-3.5 text-base">
                Shop now — {formatPrice(product.price)}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <span className="text-sm text-fg-subtle">Free shipping · 1-year warranty</span>
            </div>
          </div>
          <ProductImage
            src={product.images[1]}
            alt={`${product.name} with included accessories`}
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="aspect-square rounded-2xl p-4"
          />
        </div>
      </Reveal>
    </section>
  );
}
