import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { CartContext } from './cart-context';
import { catalog } from '../lib/catalog';

const STORAGE_KEY = 'rove-cart-v1';
const MAX_QTY = 10;

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved.filter((line) => catalog.has(line.id)) : [];
  } catch {
    return [];
  }
}

function cartReducer(lines, action) {
  switch (action.type) {
    case 'add': {
      const existing = lines.find((l) => l.id === action.id);
      if (existing) {
        return lines.map((l) =>
          l.id === action.id ? { ...l, qty: Math.min(MAX_QTY, l.qty + action.qty) } : l,
        );
      }
      return [...lines, { id: action.id, qty: Math.min(MAX_QTY, action.qty) }];
    }
    case 'setQty':
      return action.qty <= 0
        ? lines.filter((l) => l.id !== action.id)
        : lines.map((l) => (l.id === action.id ? { ...l, qty: Math.min(MAX_QTY, action.qty) } : l));
    case 'remove':
      return lines.filter((l) => l.id !== action.id);
    default:
      return lines;
  }
}

export default function CartProvider({ children }) {
  const [lines, dispatch] = useReducer(cartReducer, undefined, loadCart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage can be unavailable (private mode); the cart still works in memory.
    }
  }, [lines]);

  const addItem = useCallback((id, qty = 1) => {
    dispatch({ type: 'add', id, qty });
    setIsOpen(true);
  }, []);
  const setQty = useCallback((id, qty) => dispatch({ type: 'setQty', id, qty }), []);
  const removeItem = useCallback((id) => dispatch({ type: 'remove', id }), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => {
    const items = lines.map((l) => ({ ...catalog.get(l.id), qty: l.qty }));
    return {
      items,
      count: items.reduce((sum, i) => sum + i.qty, 0),
      subtotal: items.reduce((sum, i) => sum + i.qty * i.price, 0),
      maxQty: MAX_QTY,
      isOpen,
      addItem,
      setQty,
      removeItem,
      openCart,
      closeCart,
    };
  }, [lines, isOpen, addItem, setQty, removeItem, openCart, closeCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
