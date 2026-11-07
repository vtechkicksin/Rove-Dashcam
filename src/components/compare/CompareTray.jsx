import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { getProduct } from '../../data/products';
import { useCompare } from '../../hooks/useCompare';
import ProductImage from '../ui/ProductImage';

export default function CompareTray() {
  const { ids, toggle, clear } = useCompare();
  const { pathname } = useLocation();
  const visible = ids.length > 0 && pathname !== '/compare';
  const picked = ids.map(getProduct);

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          aria-label="Compare tray"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.25 }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-700 bg-ink-950/95 backdrop-blur-xl"
        >
          <div className="container-page flex items-center gap-3 py-3">
            <ul className="flex min-w-0 flex-1 gap-2">
              {picked.map((p) => (
                <li key={p.id} className="flex min-w-0 items-center gap-2 rounded-xl border border-ink-700 bg-ink-900 py-1 pl-1 pr-1">
                  <ProductImage src={p.images[0]} alt="" sizes="40px" className="h-10 w-10 shrink-0 rounded-lg p-0.5" />
                  <span className="hidden truncate text-sm text-white sm:block">{p.name.replace('ROVE ', '')}</span>
                  <button type="button" onClick={() => toggle(p.id)} className="icon-btn h-9 w-9 shrink-0" aria-label={`Remove ${p.name} from compare`}>
                    <X size={15} />
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" onClick={clear} className="btn-ghost hidden sm:inline-flex">
              Clear
            </button>
            {ids.length > 1 ? (
              <Link to={`/compare?models=${ids.join(',')}`} className="btn-primary shrink-0">
                Compare {ids.length}
              </Link>
            ) : (
              <span className="shrink-0 text-sm text-fg-muted">Pick one more to compare</span>
            )}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
