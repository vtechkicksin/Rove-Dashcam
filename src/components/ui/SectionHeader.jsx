import { cn } from '../../lib/format';

export default function SectionHeader({ eyebrow, title, description, action, align = 'center', id }) {
  const centered = align === 'center';
  return (
    <div
      className={cn(
        'mb-10 flex flex-col gap-6 sm:mb-12',
        centered ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between',
      )}
    >
      <div className={cn(centered && 'max-w-2xl')}>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 id={id} className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        {description && <p className="mt-4 text-base text-fg-muted sm:text-lg">{description}</p>}
      </div>
      {action}
    </div>
  );
}
