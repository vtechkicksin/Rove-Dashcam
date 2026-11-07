import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Menu, Search, ShoppingBag, Truck, X } from 'lucide-react';
import { products } from '../../data/products';
import { externalLinks, LOGO_URL } from '../../lib/constants';
import { cn, formatPrice } from '../../lib/format';
import { useCart } from '../../hooks/useCart';
import { useOverlay } from '../../hooks/useOverlay';
import ProductImage from '../ui/ProductImage';

const primaryLinks = [
  { label: 'Accessories', to: '/accessories' },
  { label: 'Compare', to: '/compare' },
];

const externalNav = [
  { label: 'Support', href: externalLinks.faq },
  { label: 'Blog', href: externalLinks.blog },
];

const navLinkClass = ({ isActive }) =>
  cn(
    'rounded-lg px-3 py-2 text-sm font-medium transition',
    isActive ? 'text-white' : 'text-fg-muted hover:text-white',
  );

// Drop focus after choosing a mega-menu item so the :focus-within menu closes on navigation.
const blurActive = () => document.activeElement?.blur?.();

function MegaMenu() {
  return (
    <div className="group relative">
      <NavLink to="/dash-cams" className={({ isActive }) => cn(navLinkClass({ isActive }), 'inline-flex items-center gap-1')} aria-haspopup="true">
        Dash Cams
        <ChevronDown size={14} className="transition group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />
      </NavLink>
      <div className="invisible absolute left-1/2 top-full w-[44rem] -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="surface grid grid-cols-5 gap-2 p-3">
          {products.map((p) => (
            <Link
              key={p.id}
              to={`/dash-cams/${p.id}`}
              onClick={blurActive}
              className="group/item flex flex-col gap-2 rounded-xl p-2 transition hover:bg-ink-800"
            >
              <ProductImage src={p.images[0]} alt="" sizes="120px" className="aspect-square rounded-lg p-2" />
              <span className="text-xs font-semibold leading-tight text-white group-hover/item:text-brand-300">
                {p.name.replace('ROVE ', '')}
              </span>
              <span className="text-xs text-fg-subtle">{p.available ? formatPrice(p.price) : 'Sold out'}</span>
            </Link>
          ))}
          <div className="col-span-5 flex items-center justify-between border-t border-ink-700 px-2 pt-3 text-sm">
            <span className="text-fg-subtle">Not sure which one? Compare specs side by side.</span>
            <Link to="/compare" onClick={blurActive} className="font-medium text-brand-300 hover:text-brand-400">
              Compare all models →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ onClose }) {
  // No focus trap: the menu's close button lives in the header, outside this panel.
  const panelRef = useOverlay(true, onClose, { trapFocus: false });
  const linkClass = 'flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-fg hover:bg-ink-800';
  return (
    <motion.div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-x-0 bottom-0 top-[6.25rem] z-40 overflow-y-auto border-t border-ink-700 bg-ink-950 lg:hidden"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
    >
      <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
        <p className="eyebrow px-4 pb-2 pt-2">Dash cams</p>
        {products.map((p) => (
          <Link key={p.id} to={`/dash-cams/${p.id}`} onClick={onClose} className={linkClass}>
            <span className="flex items-center gap-3">
              <ProductImage src={p.images[0]} alt="" sizes="48px" className="h-11 w-11 rounded-lg p-1" />
              {p.name}
            </span>
            <span className="text-sm text-fg-subtle">{p.available ? formatPrice(p.price) : 'Sold out'}</span>
          </Link>
        ))}
        <div className="my-3 border-t border-ink-700" />
        <Link to="/dash-cams" onClick={onClose} className={linkClass}>All dash cams</Link>
        {primaryLinks.map((l) => (
          <Link key={l.to} to={l.to} onClick={onClose} className={linkClass}>
            {l.label}
          </Link>
        ))}
        {externalNav.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className={linkClass}>
            {l.label}
            <ArrowUpRight size={16} className="text-fg-subtle" aria-hidden="true" />
          </a>
        ))}
      </nav>
    </motion.div>
  );
}

export default function Navbar({ onOpenSearch }) {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-brand-500 text-ink-950">
        <div className="container-page flex h-9 items-center justify-center gap-5 text-xs font-semibold">
          <span className="inline-flex items-center gap-1.5">
            <Truck size={14} aria-hidden="true" /> Free US shipping & returns
          </span>
        </div>
      </div>

      <div
        className={cn(
          'border-b transition-colors duration-300',
          scrolled || menuOpen ? 'border-ink-700 bg-ink-950/90 backdrop-blur-xl' : 'border-transparent bg-ink-950/40 backdrop-blur',
        )}
      >
        <div className="container-page flex h-16 items-center gap-3 sm:gap-6">
          <Link to="/" className="shrink-0" aria-label="ROVE Dash Cam — home" onClick={closeMenu}>
            <img src={LOGO_URL} alt="" width="160" height="20" className="h-[22px] w-auto sm:h-7" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            <MegaMenu />
            {primaryLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className={navLinkClass}>
                {l.label}
              </NavLink>
            ))}
            {externalNav.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-fg-muted transition hover:text-white"
              >
                {l.label}
                <ArrowUpRight size={13} aria-hidden="true" />
                <span className="sr-only">(opens rovedashcam.com)</span>
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={onOpenSearch}
              className="hidden h-10 items-center gap-2 rounded-xl border border-ink-600 bg-ink-800/60 pl-3 pr-2 text-sm text-fg-subtle transition hover:border-fg-subtle hover:text-fg md:inline-flex"
            >
              <Search size={16} aria-hidden="true" />
              <span className="pr-6">Search</span>
              <kbd className="rounded-md border border-ink-600 px-1.5 py-0.5 font-sans text-[11px]">⌘K</kbd>
            </button>
            <button type="button" onClick={onOpenSearch} className="icon-btn md:hidden" aria-label="Search">
              <Search size={20} />
            </button>
            <button
              type="button"
              onClick={openCart}
              className="icon-btn relative"
              aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`}
            >
              <ShoppingBag size={20} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute right-1 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand-500 px-1 text-[11px] font-bold text-ink-950"
                    aria-hidden="true"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="icon-btn lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>{menuOpen && <MobileMenu onClose={closeMenu} />}</AnimatePresence>
    </header>
  );
}
