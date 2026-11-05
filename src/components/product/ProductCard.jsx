import { Link } from 'react-router-dom';
import ProductImage from '../ui/ProductImage';
import Price from '../ui/Price';
import AddToCartButton from '../cart/AddToCartButton';
import { CHANNELS } from '../../data/products';

const quickSpecs = (p) => [
  p.specs.resolution.split(' @')[0].replace('2160p', '4K'),
  p.specs.sensor.includes('STARVIS 2') ? 'STARVIS 2' : 'STARVIS',
  p.specs.wifi.startsWith('Wi-Fi 6') ? 'Wi-Fi 6' : '5GHz Wi-Fi',
];

export default function ProductCard({ product, priority = false }) {
  const href = `/dash-cams/${product.id}`;
  return (
    <article className="surface group relative flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-ink-600">
      <div className="relative">
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          priority={priority}
          className="aspect-[4/3] p-6"
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
        <p className="text-xs font-medium uppercase tracking-wider text-fg-subtle">{CHANNELS[product.channels]}</p>
        <h3 className="mt-1 text-lg font-semibold text-white">
          {/* Stretched link: the whole card is clickable without nesting the cart button inside an anchor. */}
          <Link to={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:ring-0 focus-visible:after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-brand-400">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-fg-muted">{product.tagline}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Key specs">
          {quickSpecs(product).map((spec) => (
            <li key={spec} className="rounded-md bg-ink-800 px-2 py-1 text-xs text-fg-muted">
              {spec}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
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
