import { Suspense, useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from '../cart/CartDrawer';
import SearchDialog from '../search/SearchDialog';
import CompareTray from '../compare/CompareTray';

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-ink-600 border-t-brand-500" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    // 'instant' overrides the CSS smooth scrolling, which an overlay closing mid-scroll would cancel.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2 focus:font-semibold focus:text-ink-950"
      >
        Skip to content
      </a>
      <Navbar onOpenSearch={openSearch} />
      <main id="main" className="min-h-screen pt-[6.25rem]">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <CompareTray />
      <CartDrawer />
      <SearchDialog open={searchOpen} onClose={closeSearch} />
    </>
  );
}
