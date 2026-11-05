import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { reviews } from '../data/products';

const avatarColors = {
  MT: '#2563eb',
  SK: '#7c3aed',
  JL: '#dc2626',
  AR: '#16a34a',
};

export default function Testimonials() {
  return (
    <section className="py-24 bg-rove-darker relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            Customer Stories
          </span>
          <h2 className="section-title">
            Trusted by{' '}
            <span className="gradient-text">40,000+</span> Drivers
          </h2>
          <div className="flex items-center justify-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill="currentColor" className="text-yellow-400" />
            ))}
            <span className="text-rove-muted text-sm ml-2">4.9/5 average rating</span>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-6 group hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Quote icon */}
              <div className="mb-4">
                <Quote size={20} className="text-blue-400/50" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" className="text-yellow-400" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-rove-muted text-sm leading-relaxed mb-4 flex-1">
                "{review.text}"
              </p>

              {/* Product tag */}
              <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full px-2.5 py-1 mb-4">
                <span className="text-blue-400 text-xs font-medium">{review.product}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-rove-border">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: avatarColors[review.avatar] || '#2563eb' }}
                >
                  {review.avatar}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{review.author}</div>
                  <div className="text-rove-subtle text-xs">{review.location}</div>
                </div>
                <div className="ml-auto">
                  <span className="text-green-400 text-xs font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    Verified
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { number: '40,000+', label: '5-Star Reviews', sub: 'Across Amazon & Website' },
            { number: '500,000+', label: 'Happy Drivers', sub: 'Across the USA' },
            { number: '1 Year', label: 'Warranty', sub: 'On Every Product' },
            { number: 'Lifetime', label: 'Customer Support', sub: 'Free Technical Help' },
          ].map(({ number, label, sub }) => (
            <div
              key={label}
              className="card p-6 text-center hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="text-2xl font-bold gradient-text mb-1">{number}</div>
              <div className="text-white font-semibold text-sm mb-0.5">{label}</div>
              <div className="text-rove-subtle text-xs">{sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
