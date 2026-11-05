import { ArrowUpRight } from 'lucide-react';
import { blogPosts } from '../../data/content';
import { externalLinks } from '../../lib/constants';
import { cdnImage } from '../../lib/format';
import SectionHeader from '../ui/SectionHeader';

const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export default function BlogSection() {
  return (
    <section className="container-page pb-20 sm:pb-24" aria-labelledby="blog-title">
      <SectionHeader
        id="blog-title"
        align="left"
        eyebrow="ROVE tech insights"
        title="From the blog"
        action={
          <a
            href={externalLinks.blog}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-300 hover:text-brand-400"
          >
            All articles <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        }
      />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {blogPosts.map((post) => (
          <li key={post.url}>
            <a
              href={post.url}
              target="_blank"
              rel="noreferrer"
              className="surface group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:border-ink-600"
            >
              <div className="aspect-[16/10] overflow-hidden bg-ink-800">
                <img
                  src={cdnImage(post.image, 640)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs text-fg-subtle">
                  <time dateTime={post.date}>{dateFormat.format(new Date(`${post.date}T12:00:00`))}</time> ·{' '}
                  {post.readTime}
                </p>
                <h3 className="mt-2 flex-1 font-semibold leading-snug text-white group-hover:text-brand-300">
                  {post.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-fg-muted group-hover:text-white">
                  Read article <ArrowUpRight size={14} aria-hidden="true" />
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
