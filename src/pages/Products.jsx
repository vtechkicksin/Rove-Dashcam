import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const categories = [
  { id: 'all', label: 'All Dash Cams' },
  { id: 'Single Channel', label: 'Single Channel' },
  { id: 'Dual Channel', label: 'Dual Channel' },
  { id: '3-Channel', label: '3-Channel' },
];

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
];

export default function Products() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat === 'single') setActiveCategory('Single Channel');
    else if (cat === 'dual') setActiveCategory('Dual Channel');
    else if (cat === 'triple') setActiveCategory('3-Channel');
  }, [searchParams]);

  let filtered = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <div className="min-h-screen bg-rove-darker pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-2 block">
            Shop
          </span>
          <h1 className="text-4xl font-bold text-white mb-2">
            All <span className="gradient-text">Dash Cams</span>
          </h1>
          <p className="text-rove-muted">
            {filtered.length} products · America's most trusted dash cam brand
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-rove-card border border-rove-border text-rove-muted hover:border-blue-500/50 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-rove-muted" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-rove-card border border-rove-border text-rove-text text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
