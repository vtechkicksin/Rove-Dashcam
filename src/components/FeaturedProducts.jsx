import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const categories = [
  { id: 'all', label: 'All Dash Cams' },
  { id: 'Single Channel', label: 'Single Channel' },
  { id: 'Dual Channel', label: 'Dual Channel' },
  { id: '3-Channel', label: '3-Channel' },
];

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="py-24 bg-rove-darker" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            Our Products
          </span>
          <h2 className="section-title">
            Find Your Perfect{' '}
            <span className="gradient-text">Dash Cam</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            From single-channel starters to triple-channel pro setups — every ROVE dash cam
            features Sony STARVIS sensors and built-in Wi-Fi.
          </p>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'bg-rove-card border border-rove-border text-rove-muted hover:border-blue-500/50 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 btn-secondary text-base py-3.5 px-8"
          >
            View All Products
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
