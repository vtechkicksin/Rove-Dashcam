import ProductImage from '../ui/ProductImage';
import Price from '../ui/Price';
import AddToCartButton from '../cart/AddToCartButton';
import { discountPercent } from '../../lib/format';

export default function AccessoryCard({ item }) {
  const saving = discountPercent(item.price, item.compareAtPrice);
  return (
    <article className="surface flex h-full flex-col overflow-hidden">
      <div className="relative">
        <ProductImage src={item.image} alt={item.name} className="aspect-square p-5" />
        {saving > 0 && (
          <span className="chip absolute left-3 top-3 border-transparent bg-emerald-600 text-white">
            Save {saving}%
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-semibold leading-snug text-white">{item.name}</h3>
        <p className="mt-1 text-xs text-fg-muted">{item.detail}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <Price price={item.price} compareAtPrice={item.compareAtPrice} size="sm" />
          <AddToCartButton
            id={item.id}
            name={item.name}
            available={item.available}
            variant="secondary"
            className="px-3 py-2"
          >
            Add
          </AddToCartButton>
        </div>
      </div>
    </article>
  );
}
