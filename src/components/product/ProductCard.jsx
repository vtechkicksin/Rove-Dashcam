import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import ProductImage from '../ui/ProductImage';
import Price from '../ui/Price';
import AddToCartButton from '../cart/AddToCartButton';
import { COVERAGE } from '../../data/products';
import { COVERAGE_ICONS } from './coverageIcons';
import { useCompare } from '../../hooks/useCompare';

export default function ProductCard({ product, priority = false }) {
  const href = `/dash-cams/${product.id}`;
  const CoverageIcon = COVERAGE_ICONS[product.channels];
  const { ids, toggle, isFull } = useCompare();
  const comparing = ids.includes(product.id);
  return (
    <article className="surface group relative flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-ink-600">
      <div className="relative">
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          priority={priority}
          className="aspect-[4/3] p-5"
          imgClassName="transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {product.label && (
            <span className="chip border-transparent bg-ink-950/85 text-white backdrop-blur">{product.label}</span>
          )}
          {!product.available && (
            <span className="chip border-transparent bg-red-600 text-white">Sold out</span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium text-fg-subtle">
          <CoverageIcon size={14} aria-hidden="true" />
          {COVERAGE[product.channels]}
        </p>
        <h3 className="mt-1.5 font-semibold text-white">
          {/* Stretched link: the whole card is clickable without nesting the cart button inside an anchor. */}
          <Link to={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:ring-0 focus-visible:after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-brand-400">
            {product.name}
          </Link>
        </h3>

        <ul className="mt-3 space-y-1.5" aria-label="Highlights">
          {product.benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-fg-muted">
              <Check size={14} className="mt-1 shrink-0 text-brand-400" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>

        <label className="relative z-10 mt-4 inline-flex min-h-11 cursor-pointer items-center gap-2 self-start text-sm text-fg-muted has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 sm:min-h-0">
          <input
            type="checkbox"
            checked={comparing}
            disabled={!comparing && isFull}
            onChange={() => toggle(product.id)}
            aria-label={`Compare ${product.name}`}
            className="h-4 w-4 accent-brand-500"
          />
          Compare
        </label>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <Price price={product.price} compareAtPrice={product.compareAtPrice} />
          <AddToCartButton
            id={product.id}
            name={product.name}
            available={product.available}
            variant="secondary"
            className="relative z-10 px-3 py-2"
          >
            {product.available ? 'Add' : 'Sold out'}
          </AddToCartButton>
        </div>
      </div>
    </article>
  );
}
