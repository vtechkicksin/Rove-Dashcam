import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, MemoryStick, Package, Users } from 'lucide-react';
import { externalLinks } from '../../lib/constants';
import SectionHeader from '../ui/SectionHeader';

const tiles = [
  {
    icon: MemoryStick,
    title: 'Memory & accessories',
    body: 'High-endurance cards, hardwire kits, mounts and cables designed for ROVE dash cams.',
    to: '/accessories',
    cta: 'Shop accessories',
  },
  {
    icon: Users,
    title: 'Family bundles',
    body: 'Equip every car in the family with top-tier dash cams and save.',
    href: externalLinks.bundles,
    cta: 'View bundles',
  },
  {
    icon: Package,
    title: 'ROVE Renewed',
    body: 'Open-box units inspected and certified by ROVE for like-new performance.',
    href: externalLinks.openBox,
    cta: 'Shop open box',
  },
];

export default function ShopMore() {
  return (
    <section className="container-page py-20 sm:py-24" aria-labelledby="shop-more-title">
      <SectionHeader id="shop-more-title" eyebrow="Gear up" title="Complete your setup" />
      <ul className="grid gap-5 md:grid-cols-3">
        {tiles.map(({ icon: Icon, title, body, to, href, cta }) => {
          const content = (
            <>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-400">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{body}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300 transition group-hover:gap-2.5">
                {cta}
                {href ? <ArrowUpRight size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}
              </span>
            </>
          );
          const className = 'surface group flex h-full flex-col p-6 transition hover:-translate-y-1 hover:border-ink-600';
          return (
            <li key={title}>
              {to ? (
                <Link to={to} className={className}>
                  {content}
                </Link>
              ) : (
                <a href={href} target="_blank" rel="noreferrer" className={className}>
                  {content}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
