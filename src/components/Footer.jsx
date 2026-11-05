import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const YoutubeIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.41 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96 29 29 0 00.46-5.25 29 29 0 00-.46-5.47z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#0a0a0f"/>
  </svg>
);
const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const FacebookIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);
const TwitterIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const footerLinks = {
  'Dash Cams': [
    { label: 'ROVE R2-4K', href: '/products/r2-4k' },
    { label: 'ROVE R2-4K PRO', href: '/products/r2-4k-pro' },
    { label: 'ROVE R2-4K DUAL', href: '/products/r2-4k-dual' },
    { label: 'ROVE R2-4K DUAL PRO', href: '/products/r2-4k-dual-pro' },
    { label: 'ROVE R3', href: '/products/r3' },
  ],
  'Accessories': [
    { label: 'SD Cards', href: '/accessories/sd-cards' },
    { label: 'Hardwire Kit', href: '/accessories/hardwire-kit' },
    { label: 'CPL Filters', href: '/accessories/cpl-filter' },
    { label: 'Mounts', href: '/accessories/mounts' },
    { label: 'Cables', href: '/accessories/cables' },
  ],
  'Support': [
    { label: 'FAQ / Help Center', href: '/support' },
    { label: 'How-To Videos', href: '/support/videos' },
    { label: 'Contact Us', href: '/support/contact' },
    { label: 'Downloads & Firmware', href: '/support/downloads' },
    { label: 'Product Registration', href: '/support/register' },
    { label: 'Warranty & Returns', href: '/support/warranty' },
  ],
  'Company': [
    { label: 'About ROVE', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Open Box Deals', href: '/products?category=open-box' },
    { label: 'Family Bundles', href: '/products?category=bundles' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
};

const socials = [
  { icon: YoutubeIcon, href: '#', label: 'YouTube' },
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: FacebookIcon, href: '#', label: 'Facebook' },
  { icon: TwitterIcon, href: '#', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="bg-rove-darker border-t border-rove-border">
      {/* Newsletter strip */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-bold text-xl">Get exclusive deals & tech tips</h3>
              <p className="text-blue-200 text-sm mt-1">Join 100,000+ ROVE subscribers. No spam, unsubscribe anytime.</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 sm:w-72 bg-white/10 border border-white/20 text-white placeholder-blue-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-white/50"
              />
              <button className="bg-white text-blue-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors whitespace-nowrap text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-5">
              <img
                src="https://www.rovedashcam.com/cdn/shop/files/ROVE_Dash_Cam_Logo_-_Wide-1.png?height=52&v=1775573371"
                alt="ROVE Dash Cam"
                className="h-7 w-auto brightness-200"
              />
            </Link>
            <p className="text-rove-muted text-sm leading-relaxed mb-5 max-w-xs">
              Safeguarding families from the unpredictable dangers of the road. Quality, affordable dash cams for everyone.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-rove-card border border-rove-border flex items-center justify-center text-rove-muted hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            {/* Contact */}
            <div className="mt-6 space-y-2">
              <a href="mailto:support@rovedashcam.com" className="flex items-center gap-2 text-rove-muted hover:text-white text-sm transition-colors">
                <Mail size={14} className="text-blue-400" />
                support@rovedashcam.com
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-sm mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-rove-muted hover:text-white text-sm transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-rove-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-rove-subtle text-sm">
            © 2026 ROVE INNOTECH INC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-rove-subtle hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-rove-subtle hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-rove-subtle hover:text-white text-sm transition-colors">
              Sitemap
            </Link>
          </div>
          {/* Payment icons */}
          <div className="flex items-center gap-2 text-rove-subtle">
            <span className="text-xs">Secure Checkout:</span>
            {['VISA', 'MC', 'AMEX', 'PP'].map((card) => (
              <span key={card} className="text-xs bg-rove-card border border-rove-border px-2 py-0.5 rounded font-mono">
                {card}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
