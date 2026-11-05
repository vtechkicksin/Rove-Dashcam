import { motion } from 'framer-motion';
import { Camera, Wifi, MapPin, Moon, Shield, Zap, Smartphone, RotateCcw } from 'lucide-react';

const features = [
  {
    icon: Camera,
    title: '4K Ultra-HD Recording',
    description: 'Capture every detail with up to 4K 2160P resolution. License plates, road signs, and faces are crystal clear.',
    color: '#3b82f6',
  },
  {
    icon: Moon,
    title: 'Sony STARVIS Night Vision',
    description: 'Industry-leading Sony STARVIS 2 sensor delivers breathtaking clarity even in complete darkness.',
    color: '#7c3aed',
  },
  {
    icon: Wifi,
    title: 'Wi-Fi 6 Connectivity',
    description: 'Transfer videos at up to 30MB/s wirelessly. Download a full minute of 4K footage in under 60 seconds.',
    color: '#16a34a',
  },
  {
    icon: MapPin,
    title: 'Quad-Mode GPS',
    description: 'Precise location tracking with speed data. Know exactly where every incident occurred with timestamped coordinates.',
    color: '#f97316',
  },
  {
    icon: Shield,
    title: '24-Hour Parking Mode',
    description: 'Your car is protected even when parked. Motion and G-sensor triggers capture incidents automatically.',
    color: '#dc2626',
  },
  {
    icon: Zap,
    title: 'Supercapacitor Power',
    description: 'No battery, no heat damage. Supercapacitors handle extreme temperatures from -4°F to 149°F safely.',
    color: '#eab308',
  },
  {
    icon: Smartphone,
    title: 'ROVE App Control',
    description: 'View live footage, download videos, and adjust settings from your smartphone. Available on iOS & Android.',
    color: '#06b6d4',
  },
  {
    icon: RotateCcw,
    title: 'Loop Recording',
    description: 'Never run out of storage. Automatically overwrites oldest clips when full, keeping locked footage safe.',
    color: '#ec4899',
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section className="py-24 bg-rove-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            Why ROVE
          </span>
          <h2 className="section-title">
            Drive With <span className="gradient-text">Confidence</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Every ROVE dash cam is engineered with the features that matter most —
            so you're always protected, day or night.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={item}
                className="card p-6 group hover:scale-[1.02] transition-transform duration-300"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feature.color}18`, border: `1px solid ${feature.color}30` }}
                >
                  <Icon size={22} style={{ color: feature.color }} />
                </div>
                <h3 className="text-white font-semibold mb-2 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-rove-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Flagship feature highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 card overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent pointer-events-none" />
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-8 lg:p-12 relative">
              <span className="badge bg-orange-500/10 text-orange-400 border border-orange-500/30 mb-4">
                Flagship Model
              </span>
              <h3 className="text-3xl font-bold text-white mb-4">
                ROVE R2-4K DUAL PRO
              </h3>
              <p className="text-rove-muted mb-6 leading-relaxed">
                Our most advanced dash cam features dual Sony STARVIS 2 sensors capturing true 4K + 2K resolution
                simultaneously. Wi-Fi 6 delivers 30MB/s transfer speeds, and Quad-Mode GPS tracks your every move.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Dual Sony STARVIS 2 (IMX678 + IMX675)',
                  'True 4K Front + 2K Rear',
                  'Wi-Fi 6 at 30MB/s',
                  'FREE 128GB Card + CPL Filter',
                  'Quad-Mode GPS',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-rove-text text-sm">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-white font-bold text-2xl">$349.99</span>
                  <span className="text-rove-subtle text-sm line-through ml-2">$449.99</span>
                </div>
                <a
                  href="/products/r2-4k-dual-pro"
                  className="btn-primary text-sm"
                >
                  Shop Now
                </a>
              </div>
            </div>
            <div className="relative flex items-center justify-center p-8 lg:p-12 bg-gradient-to-br from-blue-900/10 to-rove-darker">
              <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 to-transparent" />
              <img
                src="https://www.rovedashcam.com/cdn/shop/files/R2-4K_DUAL_PRO_Dash_Cam.png?v=1775208842&width=600"
                alt="ROVE R2-4K DUAL PRO"
                className="relative z-10 max-w-sm w-full animate-float"
                style={{ filter: 'drop-shadow(0 20px 60px rgba(37, 99, 235, 0.3))' }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
