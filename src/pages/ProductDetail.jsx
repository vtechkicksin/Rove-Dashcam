import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Shield, Truck, RotateCcw, Star, ChevronRight, Check, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const related = products.filter((p) => p.id !== id).slice(0, 3);

  if (!product) {
    return (
      <div className="min-h-screen bg-rove-darker flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/products" className="btn-primary">Back to Products</Link>
        </div>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-rove-darker pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-rove-muted mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-white transition-colors">Dash Cams</Link>
          <ChevronRight size={14} />
          <span className="text-rove-text">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="card p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-radial from-blue-500/8 to-transparent" />
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-sm mx-auto relative z-10 animate-float"
                style={{ filter: `drop-shadow(0 20px 60px ${product.color}30)` }}
              />
              {product.isNew && (
                <div className="absolute top-4 left-4 badge bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  New 2026
                </div>
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-rove-muted text-sm uppercase tracking-wider font-medium">
                {product.category}
              </span>
              {product.isBestSeller && (
                <span className="badge bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
                  <Star size={10} fill="currentColor" /> Best Seller
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              {product.name}
            </h1>
            <p className="text-rove-muted text-lg mb-4">{product.tagline}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" className="text-yellow-400" />
                ))}
              </div>
              <span className="text-rove-muted text-sm">4.9 · 2,400+ reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-white font-bold text-4xl">${product.price}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-rove-subtle text-xl line-through">${product.originalPrice}</span>
                  <span className="badge bg-red-500/10 text-red-400 border border-red-500/30">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {product.highlights.map((h) => (
                <div key={h} className="flex items-center gap-2 text-sm text-rove-text">
                  <Check size={14} className="text-blue-400 flex-shrink-0" />
                  {h}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex gap-3 mb-6">
              <button className="btn-primary flex-1 flex items-center justify-center gap-2 py-4 text-base">
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button className="btn-secondary px-5 py-4">
                Buy Now
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: Truck, label: 'Free US Shipping', sub: '1-3 business days' },
                { icon: RotateCcw, label: 'Free Returns', sub: '30-day returns' },
                { icon: Shield, label: '1 Year Warranty', sub: 'Lifetime support' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="card p-3 text-center">
                  <Icon size={18} className="text-blue-400 mx-auto mb-1.5" />
                  <div className="text-white text-xs font-semibold leading-tight">{label}</div>
                  <div className="text-rove-subtle text-xs mt-0.5">{sub}</div>
                </div>
              ))}
            </div>

            {/* Full specs */}
            <div className="card p-5">
              <h3 className="text-white font-semibold mb-4">Full Specifications</h3>
              <div className="space-y-2.5">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-start text-sm gap-4">
                    <span className="text-rove-muted capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-rove-text text-right max-w-[55%]">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8">
            You Might Also Like
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
