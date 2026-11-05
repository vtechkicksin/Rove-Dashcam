import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductImage from '../ui/ProductImage';
import { cdnImage, cn } from '../../lib/format';

export default function ProductGallery({ images, name }) {
  const [index, setIndex] = useState(0);
  const go = (delta) => setIndex((i) => (i + delta + images.length) % images.length);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };

  return (
    <div className="flex flex-col gap-3" role="region" aria-roledescription="carousel" aria-label={`${name} photos`}>
      <div
        className="group relative overflow-hidden rounded-2xl border border-ink-700"
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label={`Image ${index + 1} of ${images.length}. Use arrow keys to browse.`}
      >
        <ProductImage
          key={images[index]}
          src={images[index]}
          alt={`${name} — image ${index + 1}`}
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority={index === 0}
          className="aspect-square p-6 sm:p-10"
        />
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink-950/70 text-white opacity-0 backdrop-blur transition focus-visible:opacity-100 group-hover:opacity-100"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next image"
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink-950/70 text-white opacity-0 backdrop-blur transition focus-visible:opacity-100 group-hover:opacity-100"
        >
          <ChevronRight size={18} />
        </button>
        <span className="absolute bottom-3 right-3 rounded-full bg-ink-950/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
          {index + 1} / {images.length}
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show image ${i + 1}`}
            aria-current={i === index}
            className={cn(
              'overflow-hidden rounded-lg border-2 bg-white transition',
              i === index ? 'border-brand-500' : 'border-transparent opacity-60 hover:opacity-100',
            )}
          >
            <img src={cdnImage(src, 160)} alt="" loading="lazy" className="aspect-square w-full object-contain p-1" />
          </button>
        ))}
      </div>
    </div>
  );
}
