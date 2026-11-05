import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Mail } from 'lucide-react';
import { products } from '../../data/products';
import { accessoryCategories } from '../../data/accessories';
import { externalLinks, LOGO_URL } from '../../lib/constants';

const columns = [
  {
    heading: 'Dash cams',
    links: [
      ...products.map((p) => ({ label: p.name, to: `/dash-cams/${p.id}` })),
      { label: 'Compare models', to: '/compare' },
    ],
  },
  {
    heading: 'Accessories',
    links: accessoryCategories.map((c) => ({ label: c.label, to: `/accessories?category=${c.id}` })),
  },
  {
    heading: 'Support',
    links: [
      { label: 'FAQ & help center', href: externalLinks.faq },
      { label: 'How-to videos', href: externalLinks.videos },
      { label: 'Firmware downloads', href: externalLinks.downloads },
      { label: 'Product registration', href: externalLinks.registration },
      { label: 'Contact us', href: externalLinks.contact },
    ],
  },
  {
    heading: 'Shop more',
    links: [
      { label: 'Family bundles', href: externalLinks.bundles },
      { label: 'Open box & renewed', href: externalLinks.openBox },
      { label: 'ROVE blog', href: externalLinks.blog },
    ],
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const YEAR = new Date().getFullYear();

function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus(EMAIL_RE.test(email) ? 'done' : 'error');
  };

  if (status === 'done') {
    return (
      <p className="flex items-center gap-2 text-sm text-emerald-300" role="status">
        <Check size={16} aria-hidden="true" /> Thanks! You&apos;re on the list.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-md">
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <div className="relative flex-1">
          <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-subtle" aria-hidden="true" />
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            placeholder="you@example.com"
            aria-invalid={status === 'error'}
            aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
            className="h-11 w-full rounded-xl border border-ink-600 bg-ink-800 pl-9 pr-3 text-sm text-white placeholder:text-fg-subtle focus:border-brand-400 focus:outline-none"
          />
        </div>
        <button type="submit" className="btn-primary h-11">
          Subscribe
        </button>
      </div>
      {status === 'error' && (
        <p id="newsletter-error" className="mt-2 text-xs text-red-400">
          Please enter a valid email address.
        </p>
      )}
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-ink-700 bg-ink-950">
      <div className="container-page py-14">
        <div className="flex flex-col gap-8 border-b border-ink-700 pb-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Deals and dash cam tips, straight to your inbox</h2>
            <p className="mt-1 text-sm text-fg-muted">No spam. Unsubscribe anytime.</p>
          </div>
          <Newsletter />
        </div>

        <div className="grid grid-cols-2 gap-10 pt-12 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <img src={LOGO_URL} alt="ROVE Dash Cam" width="160" height="20" className="h-7 w-auto" loading="lazy" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              Our mission is to safeguard families from the unpredictable dangers of the road — with quality,
              affordable dash cams for everyone.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-white">{col.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.to ? (
                      <Link to={l.to} className="text-sm text-fg-muted transition hover:text-white">
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-fg-muted transition hover:text-white"
                      >
                        {l.label}
                        <ArrowUpRight size={12} aria-hidden="true" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-ink-700 pt-6 text-xs text-fg-subtle sm:flex-row sm:justify-between">
          <p>© {YEAR} ROVE INNOTECH. All rights reserved.</p>
          <p>Unofficial redesign concept · product data from rovedashcam.com</p>
        </div>
      </div>
    </footer>
  );
}
