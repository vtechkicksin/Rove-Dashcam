import { Children, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/format';

// Horizontal scroll-snap row. Swipe on touch; arrow buttons appear only when items overflow.
export default function Carousel({ label, children, itemClassName }) {
  const trackRef = useRef(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: true });

  useEffect(() => {
    const track = trackRef.current;
    const update = () =>
      setEdges({
        atStart: track.scrollLeft <= 4,
        atEnd: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4,
      });
    // ResizeObserver also fires once on observe, which sets the initial state.
    const observer = new ResizeObserver(update);
    observer.observe(track);
    track.addEventListener('scroll', update, { passive: true });
    return () => {
      observer.disconnect();
      track.removeEventListener('scroll', update);
    };
  }, []);

  const scroll = (dir) => {
    const track = trackRef.current;
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: 'smooth' });
  };

  const overflowing = !(edges.atStart && edges.atEnd);

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 scrollbar-none sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0"
      >
        {Children.map(children, (child) => (
          <li className={cn('shrink-0 snap-start', itemClassName)}>{child}</li>
        ))}
      </ul>
      {overflowing && (
        <div className="mt-4 hidden justify-end gap-2 sm:flex">
          <button type="button" onClick={() => scroll(-1)} disabled={edges.atStart} className="icon-btn border border-ink-700 disabled:opacity-40" aria-label="Previous">
            <ChevronLeft size={18} />
          </button>
          <button type="button" onClick={() => scroll(1)} disabled={edges.atEnd} className="icon-btn border border-ink-700 disabled:opacity-40" aria-label="Next">
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
