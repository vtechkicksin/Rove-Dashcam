import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import { quickAnswers } from '../../data/content';
import { externalLinks } from '../../lib/constants';

export default function QuickAnswers() {
  return (
    <section className="border-t border-ink-700 py-16 sm:py-20" aria-labelledby="faq-title">
      <div className="container-page grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <div>
          <h2 id="faq-title" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Quick answers
          </h2>
          <div className="mt-6 divide-y divide-ink-700 border-y border-ink-700">
            {quickAnswers.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-4 text-left font-medium text-white [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <Plus size={18} className="shrink-0 text-fg-subtle transition group-open:rotate-45" aria-hidden="true" />
                </summary>
                <p className="pb-5 pr-8 text-sm leading-relaxed text-fg-muted">
                  {item.a}{' '}
                  <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 font-medium text-brand-300 hover:text-brand-400">
                    Read more <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </p>
              </details>
            ))}
          </div>
        </div>

        <aside className="surface flex flex-col justify-center p-6 sm:p-8" aria-labelledby="decide-title">
          <h2 id="decide-title" className="text-2xl font-bold tracking-tight text-white">
            Ready to choose?
          </h2>
          <p className="mt-2 text-fg-muted">Add one to your cart in a tap, or see every spec on one page.</p>
          <div className="mt-6 flex flex-col gap-3">
            <Link to="/dash-cams" className="btn-primary py-3.5 text-base">
              Shop dash cams <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/compare" className="btn-secondary py-3.5 text-base">
              Compare all models
            </Link>
          </div>
          <a href={externalLinks.contact} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center justify-center gap-1 text-sm text-fg-muted hover:text-white">
            Questions? Ask our support team <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </aside>
      </div>
    </section>
  );
}
