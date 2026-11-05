import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/products';

const blogImages = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  'https://images.unsplash.com/photo-1491921125492-f0b9c835b699?w=600&q=80',
  'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80',
  'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=600&q=80',
];

export default function BlogSection() {
  return (
    <section className="py-24 bg-rove-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6"
        >
          <div>
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
              ROVE Tech Insights
            </span>
            <h2 className="section-title">
              Dash Cam <span className="gradient-text">Knowledge Base</span>
            </h2>
          </div>
          <Link
            to="/blog"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors whitespace-nowrap"
          >
            View All 44 Articles
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="card flex flex-col h-full group hover:scale-[1.02] transition-transform duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-t-2xl aspect-video">
                  <img
                    src={blogImages[i]}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rove-darker/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-center gap-1.5 text-rove-subtle text-xs mb-3">
                    <Clock size={12} />
                    {post.readTime}
                  </div>
                  <h3 className="text-white font-semibold text-sm leading-snug mb-3 group-hover:text-blue-300 transition-colors flex-1">
                    {post.title}
                  </h3>
                  <p className="text-rove-muted text-xs leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-blue-400 text-xs font-medium group-hover:gap-2.5 transition-all">
                    Read Article
                    <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
