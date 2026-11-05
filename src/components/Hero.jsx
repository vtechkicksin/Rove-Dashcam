import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Star, Shield, Truck, Award } from 'lucide-react';
import { products } from '../data/products';

const heroProducts = [
  {
    id: 'r2-4k-dual-pro',
    headline: "America's Most Advanced",
    highlight: 'Dash Cam',
    sub: 'True 4K + 2K · Dual Sony STARVIS 2 · Wi-Fi 6 · Quad-Mode GPS',
    cta: 'Shop R2-4K DUAL PRO',
    ctaLink: '/products/r2-4k-dual-pro',
    img: 'https://www.rovedashcam.com/cdn/shop/files/R2-4K_DUAL_PRO_Dash_Cam.png?v=1775208842&width=900',
    color: 'from-blue-900/40',
    accent: '#f97316',
  },
  {
    id: 'r2-4k-dual',
    headline: 'Most Value-Packed',
    highlight: '4K Dual Dash Cam',
    sub: '4K + 1080P · FREE 128GB Card · 20Mbps WiFi · STARVIS 2',
    cta: 'Shop R2-4K DUAL',
    ctaLink: '/products/r2-4k-dual',
    img: 'https://www.rovedashcam.com/cdn/shop/files/ROVE_R2-4K_DUAL_Upscaled_Dash_Cam_Front_Rear.jpg?v=1786970514&width=900',
    color: 'from-green-900/30',
    accent: '#16a34a',
  },
  {
    id: 'r3',
    headline: 'Triple-Lens Coverage',
    highlight: '3-Channel Dash Cam',
    sub: 'Front · Cabin · Rear · Touchscreen · Perfect for Rideshare',
    cta: 'Shop ROVE R3',
    ctaLink: '/products/r3',
    img: 'https://www.rovedashcam.com/cdn/shop/files/1._ROVE_R3_-_Main_Image.jpg?v=1775208866&width=900',
    color: 'from-red-900/30',
    accent: '#dc2626',
  },
];

const stats = [
  { icon: Star, value: '40,000+', label: '5-Star Reviews' },
  { icon: Shield, value: '1 Year', label: 'Warranty' },
  { icon: Truck, value: 'Free', label: 'US Shipping' },
  { icon: Award, value: '#1', label: 'Rated Dash Cam' },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroProducts[current];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-rove-darker">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-rove-darker to-rove-darker" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative flex-1 flex items-center pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-blue-400 text-sm font-medium mb-6">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    New 2026 Models Available
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                    {slide.headline}{' '}
                    <span className="gradient-text">{slide.highlight}</span>
                  </h1>

                  <p className="text-rove-muted text-lg mb-8 max-w-lg">
                    {slide.sub}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <Link
                      to={slide.ctaLink}
                      className="btn-primary flex items-center justify-center gap-2 text-base py-3.5 px-8"
                    >
                      {slide.cta}
                      <ChevronRight size={18} />
                    </Link>
                    <Link
                      to="/compare"
                      className="btn-secondary flex items-center justify-center gap-2 text-base py-3.5 px-8"
                    >
                      Compare Models
                    </Link>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {stats.map(({ icon: Icon, value, label }) => (
                      <div key={label} className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Icon size={16} className="text-blue-400 mr-1.5" />
                          <span className="text-white font-bold text-lg">{value}</span>
                        </div>
                        <span className="text-rove-subtle text-xs">{label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Product image */}
            <div className="order-1 lg:order-2 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 to-transparent rounded-full blur-2xl scale-150" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, scale: 0.9, x: 30 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -30 }}
                  transition={{ duration: 0.6 }}
                  className="relative animate-float"
                >
                  <img
                    src={slide.img}
                    alt={slide.headline}
                    className="w-full max-w-lg mx-auto drop-shadow-2xl"
                    style={{ filter: 'drop-shadow(0 20px 60px rgba(37, 99, 235, 0.25))' }}
                  />
                  {/* Floating badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="absolute top-4 right-4 bg-rove-dark/90 backdrop-blur-sm border border-rove-border rounded-xl px-3 py-2 text-center"
                  >
                    <div className="text-xs text-rove-muted">Starting from</div>
                    <div className="text-white font-bold text-lg">${products.find(p => p.id === heroProducts[current].id)?.price || '119'}</div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="flex items-center justify-center gap-3 mt-10">
            {heroProducts.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? 'w-8 h-2 bg-blue-500'
                    : 'w-2 h-2 bg-rove-border hover:bg-rove-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product quick-nav */}
      <div className="relative border-t border-rove-border bg-rove-dark/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-0 scrollbar-hide">
            {products.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="flex-shrink-0 group flex items-center gap-3 px-6 py-4 border-b-2 border-transparent hover:border-blue-500 transition-all"
              >
                <img
                  src={p.thumbnail}
                  alt={p.name}
                  className="w-12 h-9 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <div className="hidden sm:block">
                  <div className="text-xs font-semibold text-rove-muted group-hover:text-white transition-colors whitespace-nowrap">
                    {p.name}
                  </div>
                  <div className="text-xs text-rove-subtle">${p.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
