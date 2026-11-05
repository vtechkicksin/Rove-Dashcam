import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Zap } from 'lucide-react';

const badgeStyles = {
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  green: 'bg-green-500/10 text-green-400 border-green-500/30',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  red: 'bg-red-500/10 text-red-400 border-red-500/30',
};

export default function ProductCard({ product, index = 0 }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/products/${product.id}`}
        className="card group flex flex-col h-full hover:scale-[1.01] transition-transform duration-300"
      >
        {/* Image */}
        <div className="relative product-img-container bg-gradient-to-b from-rove-card to-rove-darker p-6 pb-4">
          {/* Badges row */}
          <div className="flex items-center justify-between mb-3">
            <span
              className={`badge border ${badgeStyles[product.badgeColor]}`}
            >
              {product.isNew && <Zap size={10} />}
              {product.badge}
            </span>
            {discount > 0 && (
              <span className="badge bg-red-500/10 text-red-400 border border-red-500/30">
                -{discount}%
              </span>
            )}
          </div>

          <div className="flex justify-center py-4 relative">
            {/* Glow behind image */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-20"
              style={{ background: product.color }}
            />
            <img
              src={product.image}
              alt={product.name}
              className="w-48 h-36 object-contain relative z-10 group-hover:scale-105 transition-transform duration-500"
              style={{ filter: `drop-shadow(0 10px 30px ${product.color}30)` }}
            />
          </div>

          {product.isBestSeller && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-2 py-0.5">
              <Star size={10} fill="currentColor" className="text-yellow-400" />
              <span className="text-yellow-400 text-xs font-medium">Best Seller</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <div className="mb-1">
            <span className="text-xs text-rove-subtle uppercase tracking-wider font-medium">
              {product.category}
            </span>
          </div>
          <h3 className="text-white font-bold text-lg mb-1 group-hover:text-blue-300 transition-colors">
            {product.name}
          </h3>
          <p className="text-rove-muted text-sm mb-4 line-clamp-2 flex-1">
            {product.tagline}
          </p>

          {/* Key specs */}
          <div className="grid grid-cols-2 gap-1.5 mb-4">
            {[
              { key: 'Resolution', val: product.specs.resolution.split(' ')[0] },
              { key: 'Sensor', val: product.specs.sensor.includes('2') ? 'STARVIS 2' : 'STARVIS' },
              { key: 'WiFi', val: product.specs.wifi.includes('6') ? 'Wi-Fi 6' : '5GHz WiFi' },
              { key: 'Display', val: product.specs.display.split('"')[0] + '"' },
            ].map(({ key, val }) => (
              <div key={key} className="bg-white/3 rounded-lg px-2.5 py-1.5">
                <div className="text-rove-subtle text-xs">{key}</div>
                <div className="text-rove-text text-xs font-medium">{val}</div>
              </div>
            ))}
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-rove-border">
            <div>
              <span className="text-white font-bold text-xl">${product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-rove-subtle text-sm line-through ml-2">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <button
              onClick={(e) => { e.preventDefault(); }}
              className="flex items-center gap-1.5 bg-blue-600/10 border border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200"
            >
              <ShoppingCart size={15} />
              Add
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
