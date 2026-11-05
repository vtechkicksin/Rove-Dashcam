import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import ComparisonTable from './components/ComparisonTable';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-rove-darker text-rove-text">
      <Navbar />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/products" element={<PageWrapper><Products /></PageWrapper>} />
          <Route path="/products/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />
          <Route path="/compare" element={
            <PageWrapper>
              <div className="pt-28 pb-10 bg-rove-darker">
                <ComparisonTable />
              </div>
            </PageWrapper>
          } />
          <Route path="/accessories" element={
            <PageWrapper>
              <div className="min-h-screen bg-rove-darker pt-32 pb-20 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-white text-3xl font-bold mb-4">Accessories</h1>
                  <p className="text-rove-muted">Coming soon</p>
                </div>
              </div>
            </PageWrapper>
          } />
          <Route path="*" element={
            <PageWrapper>
              <div className="min-h-screen bg-rove-darker flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-black text-rove-border mb-4">404</div>
                  <h1 className="text-white text-2xl font-bold mb-4">Page Not Found</h1>
                  <a href="/" className="btn-primary inline-block">Go Home</a>
                </div>
              </div>
            </PageWrapper>
          } />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
