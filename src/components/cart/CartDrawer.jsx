import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Truck, X } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useOverlay } from '../../hooks/useOverlay';
import { formatPrice } from '../../lib/format';
import ProductImage from '../ui/ProductImage';
import QuantityStepper from '../ui/QuantityStepper';

function CartPanel() {
  const { items, count, subtotal, maxQty, setQty, removeItem, closeCart } = useCart();
  const panelRef = useOverlay(true, closeCart);

  return (
    <div className="fixed inset-0 z-[60]">
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeCart}
        aria-hidden="true"
      />
      <motion.aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-ink-700 bg-ink-900 shadow-2xl"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 32, stiffness: 320 }}
      >
        <header className="flex items-center justify-between border-b border-ink-700 px-5 py-4">
          <h2 id="cart-title" className="text-lg font-semibold text-white">
            Your cart {count > 0 && <span className="text-fg-subtle">({count})</span>}
          </h2>
          <button type="button" className="icon-btn" onClick={closeCart} aria-label="Close cart">
            <X size={20} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink-800">
              <ShoppingBag size={26} className="text-fg-subtle" />
            </div>
            <div>
              <p className="font-semibold text-white">Your cart is empty</p>
              <p className="mt-1 text-sm text-fg-muted">Find the dash cam that fits how you drive.</p>
            </div>
            <Link to="/dash-cams" onClick={closeCart} className="btn-primary">
              Shop dash cams
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 bg-emerald-500/10 px-5 py-2.5 text-sm text-emerald-300">
              <Truck size={16} aria-hidden="true" />
              Your order ships free in the USA
            </div>
            <ul className="flex-1 divide-y divide-ink-700 overflow-y-auto px-5">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-4">
                  <ProductImage src={item.image} alt="" sizes="80px" className="h-20 w-20 shrink-0 rounded-lg p-1.5" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          to={item.href}
                          onClick={closeCart}
                          className="line-clamp-2 text-sm font-semibold text-white hover:text-brand-300"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-fg-subtle">{item.type}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="icon-btn h-10 w-10 shrink-0"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QuantityStepper
                        size="sm"
                        value={item.qty}
                        min={0}
                        max={maxQty}
                        onChange={(q) => setQty(item.id, q)}
                        label={`Quantity for ${item.name}`}
                      />
                      <span className="text-sm font-semibold text-white">{formatPrice(item.price * item.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <footer className="space-y-3 border-t border-ink-700 p-5">
              <div className="flex items-center justify-between text-base">
                <span className="text-fg-muted">Subtotal</span>
                <span className="font-bold text-white">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-fg-subtle">Taxes calculated at checkout. Free US shipping & returns.</p>
              <button type="button" className="btn-primary w-full py-3.5 text-base" disabled>
                Checkout
              </button>
              <p className="text-center text-xs text-fg-subtle">
                This is a front-end demo — checkout isn&apos;t connected.
              </p>
            </footer>
          </>
        )}
      </motion.aside>
    </div>
  );
}

export default function CartDrawer() {
  const { isOpen } = useCart();
  return <AnimatePresence>{isOpen && <CartPanel />}</AnimatePresence>;
}
