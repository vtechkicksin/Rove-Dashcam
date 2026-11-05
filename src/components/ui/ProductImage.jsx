import { cdnImage, cdnSrcSet, cn } from '../../lib/format';

// Store photography is shot on pure white, so images sit on a matching white
// stage rather than floating as hard-edged boxes on the dark page.
export default function ProductImage({
  src,
  alt,
  sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw',
  priority = false,
  className,
  imgClassName,
}) {
  return (
    <div className={cn('flex items-center justify-center overflow-hidden bg-white', className)}>
      <img
        src={cdnImage(src, 640)}
        srcSet={cdnSrcSet(src)}
        sizes={sizes}
        alt={alt}
        width="640"
        height="640"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className={cn('h-full w-full object-contain', imgClassName)}
      />
    </div>
  );
}
