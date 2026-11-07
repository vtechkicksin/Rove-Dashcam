import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { cn } from '../../lib/format';

// `extras` are add-on ids (e.g. the hardwire kit) added once alongside the main item.
export default function AddToCartButton({ id, name, available, qty = 1, extras = [], variant = 'primary', className, children }) {
  const { addItem } = useCart();
  return (
    <button
      type="button"
      onClick={() => {
        addItem(id, qty);
        extras.forEach((extra) => addItem(extra, 1));
      }}
      disabled={!available}
      aria-label={children ? undefined : `Add ${name} to cart`}
      className={cn(variant === 'primary' ? 'btn-primary' : 'btn-secondary', className)}
    >
      <ShoppingBag size={16} aria-hidden="true" />
      {children ?? (available ? 'Add to cart' : 'Sold out')}
    </button>
  );
}
