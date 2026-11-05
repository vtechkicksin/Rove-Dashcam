import { Link } from 'react-router-dom';
import { Quote, Star } from 'lucide-react';
import { featuredReview } from '../../data/content';
import { getProduct } from '../../data/products';
import ProductImage from '../ui/ProductImage';
import Reveal from '../ui/Reveal';

const product = getProduct(featuredReview.productId);

export default function ReviewSpotlight() {
  return (
    <section className="border-y border-ink-700 bg-ink-900/40 py-20 sm:py-24" aria-labelledby="review-title">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow">Loved by drivers</p>
          <p className="mt-3 text-5xl font-extrabold tracking-tight text-white sm:text-6xl">40,000+</p>
          <p className="mt-2 text-lg text-fg-muted">five-star reviews from ROVE customers.</p>
          <div className="mt-4 flex gap-1 text-brand-400" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={22} fill="currentColor" />
            ))}
          </div>
        </div>

        <Reveal as="figure" className="surface relative p-6 sm:p-10">
          <Quote size={36} className="text-brand-500/40" aria-hidden="true" />
          <h2 id="review-title" className="mt-4 text-xl font-semibold text-white sm:text-2xl">
            “{featuredReview.title}”
          </h2>
          <blockquote className="mt-4 leading-relaxed text-fg-muted">{featuredReview.body}</blockquote>
          <figcaption className="mt-6 flex items-center gap-3 border-t border-ink-700 pt-6">
            <ProductImage src={product.images[0]} alt="" sizes="56px" className="h-14 w-14 rounded-lg p-1" />
            <div className="text-sm">
              <p className="text-fg-subtle">ROVE customer review of the</p>
              <Link to={`/dash-cams/${product.id}`} className="font-semibold text-white hover:text-brand-300">
                {product.name}
              </Link>
            </div>
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
