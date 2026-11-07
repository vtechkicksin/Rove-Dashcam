import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CornerDownLeft, Search, X } from 'lucide-react';
import { catalogList } from '../../lib/catalog';
import { useOverlay } from '../../hooks/useOverlay';
import { cn, formatPrice } from '../../lib/format';
import ProductImage from '../ui/ProductImage';

const SUGGESTIONS = ['Dual', 'R3', 'SD card', 'Mount', 'CPL'];

function SearchPanel({ onClose }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const panelRef = useOverlay(true, onClose);

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const list = terms.length
      ? catalogList.filter((item) => {
          const haystack = `${item.name} ${item.subtitle} ${item.type}`.toLowerCase();
          return terms.every((t) => haystack.includes(t));
        })
      : catalogList.filter((item) => item.type === 'Dash cam');
    return list.slice(0, 8);
  }, [query]);

  const select = (item) => {
    onClose();
    navigate(item.href);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault();
      select(results[active]);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]">
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-ink-600 bg-ink-900 shadow-2xl"
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ duration: 0.18 }}
      >
        <div className="flex items-center gap-3 border-b border-ink-700 px-4">
          <Search size={18} className="shrink-0 text-fg-subtle" aria-hidden="true" />
          <input
            data-autofocus
            type="text"
            inputMode="search"
            enterKeyHint="go"
            autoComplete="off"
            spellCheck="false"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search dash cams and accessories…"
            aria-label="Search"
            aria-controls="search-results"
            aria-activedescendant={results[active] ? `search-${results[active].id}` : undefined}
            className="h-14 flex-1 bg-transparent text-base text-white placeholder:text-fg-subtle focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <button type="button" className="icon-btn h-10 w-10" onClick={onClose} aria-label="Close search">
            <X size={18} />
          </button>
        </div>

        {!query && (
          <div className="flex flex-wrap gap-2 border-b border-ink-700 px-4 py-3">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQuery(s)}
                className="chip border-ink-600 text-fg-muted hover:border-fg-subtle hover:text-white"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <ul id="search-results" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-10 text-center text-sm text-fg-muted">
              No results for “{query}”. Try “dual” or “SD card”.
            </li>
          )}
          {results.map((item, i) => (
            <li
              key={item.id}
              id={`search-${item.id}`}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onClick={() => select(item)}
              className={cn(
                'flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5',
                i === active && 'bg-ink-800',
              )}
            >
              <ProductImage src={item.image} alt="" sizes="48px" className="h-12 w-12 shrink-0 rounded-lg p-1" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{item.name}</p>
                <p className="truncate text-xs text-fg-subtle">{item.type} · {item.subtitle}</p>
              </div>
              <span className="text-sm font-semibold text-fg">{formatPrice(item.price)}</span>
              {i === active && <CornerDownLeft size={14} className="text-fg-subtle" aria-hidden="true" />}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default function SearchDialog({ open, onClose }) {
  return <AnimatePresence>{open && <SearchPanel onClose={onClose} />}</AnimatePresence>;
}
