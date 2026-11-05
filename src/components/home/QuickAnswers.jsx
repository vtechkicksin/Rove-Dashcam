import { ArrowUpRight, Plus } from 'lucide-react';
import { quickAnswers } from '../../data/content';
import { externalLinks } from '../../lib/constants';

export default function QuickAnswers() {
  return (
    <section className="border-t border-ink-700 py-20 sm:py-24" aria-labelledby="faq-title">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <p className="eyebrow">Quick answers</p>
          <h2 id="faq-title" className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Dash cam questions, answered
          </h2>
          <p className="mt-4 text-fg-muted">
            Straight answers from the ROVE tech team. Need more help? Our support is free for life.
          </p>
          <a
            href={externalLinks.faq}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary mt-6"
          >
            Visit the help center <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>

        <div className="divide-y divide-ink-700 border-y border-ink-700">
          {quickAnswers.map((item) => (
            <details key={item.q} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-4 text-left font-medium text-white [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus size={18} className="shrink-0 text-fg-subtle transition group-open:rotate-45" aria-hidden="true" />
              </summary>
              <div className="pb-5 pr-8 text-sm leading-relaxed text-fg-muted">
                <p>{item.a}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 font-medium text-brand-300 hover:text-brand-400"
                >
                  Read the full guide <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
