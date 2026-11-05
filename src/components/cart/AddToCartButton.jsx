import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { cn } from '../../lib/format';

export default function AddToCartButton({ id, name, available, qty = 1, variant = 'primary', className, children }) {
  const { addItem } = useCart();
  return (
    <button
      type="button"
      onClick={() => addItem(id, qty)}
      disabled={!available}
      aria-label={children ? undefined : `Add ${name} to cart`}
      className={cn(variant === 'primary' ? 'btn-primary' : 'btn-secondary', className)}
    >
      <ShoppingBag size={16} aria-hidden="true" />
      {children ?? (available ? 'Add to cart' : 'Sold out')}
    </button>
  );
}
