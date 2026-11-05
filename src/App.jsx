import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import CartProvider from './context/CartProvider';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const DashCams = lazy(() => import('./pages/DashCams'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Compare = lazy(() => import('./pages/Compare'));
const Accessories = lazy(() => import('./pages/Accessories'));

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dash-cams" element={<DashCams />} />
            <Route path="dash-cams/:id" element={<ProductDetail />} />
            <Route path="compare" element={<Compare />} />
            <Route path="accessories" element={<Accessories />} />
            <Route path="products" element={<Navigate to="/dash-cams" replace />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CartProvider>
    </MotionConfig>
  );
}
