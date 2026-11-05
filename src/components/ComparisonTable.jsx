import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Minus, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const rows = [
  { key: 'price', label: 'Price', format: (v) => `$${v}` },
  { key: 'specs.resolution', label: 'Resolution', format: (v) => v },
  { key: 'specs.sensor', label: 'Sensor', format: (v) => v },
  { key: 'specs.wifi', label: 'Wi-Fi', format: (v) => v },
  { key: 'specs.download', label: 'Download Speed', format: (v) => v },
  { key: 'specs.display', label: 'Display', format: (v) => v },
  { key: 'specs.storage', label: 'Max Storage', format: (v) => v },
  { key: 'specs.gps', label: 'GPS', format: (v) => v },
  { key: 'specs.power', label: 'Power', format: (v) => v },
  { key: 'specs.parking', label: 'Parking Mode', format: (v) => v },
];

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

export default function ComparisonTable() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="py-24 bg-rove-dark" id="compare">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            Which Is Right For You?
          </span>
          <h2 className="section-title">
            Compare <span className="gradient-text">All Models</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Explore key specifications to find the ideal dash cam for your driving needs.
          </p>
        </motion.div>

        {/* Mobile: cards */}
        <div className="lg:hidden space-y-4">
          {products.map((p) => (
            <div key={p.id} className="card p-5">
              <div className="flex items-center gap-4 mb-4">
                <img src={p.thumbnail} alt={p.name} className="w-20 h-16 object-contain" />
                <div>
                  <h3 className="text-white font-bold">{p.name}</h3>
                  <p className="text-rove-muted text-sm">{p.category}</p>
                  <p className="text-blue-400 font-semibold">${p.price}</p>
                </div>
              </div>
              <div className="space-y-2">
                {rows.slice(1).map((row) => (
                  <div key={row.key} className="flex justify-between items-start text-sm">
                    <span className="text-rove-subtle">{row.label}</span>
                    <span className="text-rove-text text-right max-w-[55%]">
                      {row.format(getNestedValue(p, row.key) || '—')}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                to={`/products/${p.id}`}
                className="btn-primary w-full text-center block mt-4 text-sm"
              >
                Shop {p.name}
              </Link>
            </div>
          ))}
        </div>

        {/* Desktop: table */}
        <div className="hidden lg:block overflow-x-auto">
          <div className="min-w-full">
            {/* Header: product columns */}
            <div
              className="grid gap-px bg-rove-border rounded-t-2xl overflow-hidden"
              style={{ gridTemplateColumns: `220px repeat(${products.length}, 1fr)` }}
            >
              <div className="bg-rove-dark p-4" />
              {products.map((p) => (
                <div
                  key={p.id}
                  className={`bg-rove-card p-5 text-center transition-all ${
                    p.isBestSeller ? 'relative' : ''
                  }`}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {p.isBestSeller && (
                    <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                  )}
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <span
                      className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                      style={{
                        backgroundColor: `${p.color}15`,
                        borderColor: `${p.color}30`,
                        color: p.color,
                      }}
                    >
                      {p.badge}
                    </span>
                    {p.isBestSeller && <Star size={12} fill="currentColor" className="text-yellow-400" />}
                  </div>
                  <img src={p.thumbnail} alt={p.name} className="w-24 h-18 object-contain mx-auto mb-3" />
                  <h3 className="text-white font-bold text-sm mb-1">{p.name}</h3>
                  <p className="text-blue-400 font-bold text-lg mb-3">${p.price}</p>
                  <Link
                    to={`/products/${p.id}`}
                    className={`block w-full text-center text-xs font-semibold py-2 px-3 rounded-lg transition-all ${
                      hovered === p.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                    }`}
                  >
                    Shop Now
                  </Link>
                </div>
              ))}
            </div>

            {/* Rows */}
            {rows.slice(1).map((row, ri) => (
              <div
                key={row.key}
                className="grid gap-px bg-rove-border"
                style={{ gridTemplateColumns: `220px repeat(${products.length}, 1fr)` }}
              >
                <div className="bg-rove-dark px-5 py-4 flex items-center">
                  <span className="text-rove-muted text-sm font-medium">{row.label}</span>
                </div>
                {products.map((p) => {
                  const val = getNestedValue(p, row.key);
                  return (
                    <div
                      key={p.id}
                      className={`px-4 py-4 text-center text-sm transition-colors ${
                        hovered === p.id ? 'bg-blue-500/5' : 'bg-rove-card'
                      }`}
                    >
                      <span className="text-rove-text">
                        {val ? row.format(val) : <Minus size={14} className="text-rove-subtle mx-auto" />}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Footer row: CTA */}
            <div
              className="grid gap-px bg-rove-border rounded-b-2xl overflow-hidden"
              style={{ gridTemplateColumns: `220px repeat(${products.length}, 1fr)` }}
            >
              <div className="bg-rove-dark p-4" />
              {products.map((p) => (
                <div
                  key={p.id}
                  className={`p-4 ${hovered === p.id ? 'bg-blue-500/5' : 'bg-rove-card'}`}
                >
                  <Link
                    to={`/products/${p.id}`}
                    className="btn-primary w-full text-center block text-sm"
                  >
                    Buy ${p.price}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
