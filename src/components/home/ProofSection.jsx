import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, RefreshCw, RotateCcw, Star } from 'lucide-react';
import { featuredReview, promises } from '../../data/content';
import { getProduct } from '../../data/products';
import ProductImage from '../ui/ProductImage';

const product = getProduct(featuredReview.productId);
const promiseIcons = { returns: RotateCcw, support: HeartHandshake, updates: RefreshCw };

export default function ProofSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="container-page py-16 sm:py-20" aria-labelledby="proof-title">
      <div className="surface grid gap-8 p-6 sm:p-10 lg:grid-cols-[0.8fr_1.4fr_1fr] lg:gap-10">
        <div>
          <p className="eyebrow">Trusted by drivers</p>
          <p className="mt-3 text-5xl font-extrabold tracking-tight text-white">40,000+</p>
          <h2 id="proof-title" className="mt-1 text-fg-muted">five-star reviews from ROVE customers</h2>
          <div className="mt-3 flex gap-1 text-brand-400" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={18} fill="currentColor" />
            ))}
          </div>
        </div>

        <figure className="border-ink-700 lg:border-x lg:px-10">
          <blockquote>
            <p className="font-semibold text-white">“{featuredReview.title}”</p>
            <p id="review-body" className={expanded ? 'mt-3 text-sm leading-relaxed text-fg-muted' : 'mt-3 line-clamp-3 text-sm leading-relaxed text-fg-muted'}>
              {featuredReview.body}
            </p>
          </blockquote>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls="review-body"
            className="mt-1 min-h-11 text-sm font-medium text-brand-300 sm:min-h-0 hover:text-brand-400"
          >
            {expanded ? 'Show less' : 'Read full review'}
          </button>
          <figcaption className="mt-5 flex items-center gap-3">
            <ProductImage src={product.images[0]} alt="" sizes="48px" className="h-12 w-12 rounded-lg p-1" />
            <p className="text-sm">
              <span className="block text-fg-subtle">Customer review of the</span>
              <Link to={`/dash-cams/${product.id}`} className="font-semibold text-white hover:text-brand-300">
                {product.name}
              </Link>
            </p>
          </figcaption>
        </figure>

        <ul className="space-y-5">
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
