import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  {
    label: 'Dash Cams',
    href: '/products',
    children: [
      { label: 'Single Channel', href: '/products?category=single' },
      { label: 'Dual Channel', href: '/products?category=dual' },
      { label: '3-Channel', href: '/products?category=triple' },
      { label: 'All Dash Cams', href: '/products' },
    ],
  },
  { label: 'Accessories', href: '/accessories' },
  { label: 'Compare', href: '/compare' },
  { label: 'Support', href: '/support' },
  { label: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-rove-dark/95 backdrop-blur-xl border-b border-rove-border shadow-lg'
          : 'bg-transparent'
      }`}
    >
      {/* Announcement bar */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white text-center text-xs py-2 font-medium tracking-wide">
        🚚 Free Shipping in USA · 🔄 Free Returns · ⭐ 40,000+ 5-Star Reviews
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src="https://www.rovedashcam.com/cdn/shop/files/ROVE_Dash_Cam_Logo_-_Wide-1.png?height=52&v=1775573371"
              alt="ROVE Dash Cam"
              className="h-8 w-auto brightness-200"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.href}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.href
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-rove-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`}
                    />
                  )}
                </Link>
                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-rove-card border border-rove-border rounded-xl shadow-2xl overflow-hidden">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block px-4 py-3 text-sm text-rove-muted hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex p-2 rounded-lg text-rove-muted hover:text-white hover:bg-white/5 transition-colors">
              <Search size={18} />
            </button>
            <Link
              to="/products"
              className="hidden sm:flex btn-primary text-sm py-2 px-4"
            >
              Shop Now
            </Link>
            <button className="relative p-2 rounded-lg text-rove-muted hover:text-white hover:bg-white/5 transition-colors">
              <ShoppingCart size={18} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-600 rounded-full text-white text-xs flex items-center justify-center font-bold">
                0
              </span>
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-rove-muted hover:text-white hover:bg-white/5 transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-rove-dark border-t border-rove-border">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  to={link.href}
                  className="block px-4 py-3 rounded-lg text-rove-text hover:text-white hover:bg-white/5 font-medium transition-colors"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4 space-y-1 mt-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block px-4 py-2 rounded-lg text-sm text-rove-muted hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 pb-2">
              <Link to="/products" className="btn-primary w-full text-center block">
                Shop Now
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
