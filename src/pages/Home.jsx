import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import Features from '../components/Features';
import ComparisonTable from '../components/ComparisonTable';
import Testimonials from '../components/Testimonials';
import BlogSection from '../components/BlogSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Features />
      <ComparisonTable />
      <Testimonials />
      <BlogSection />
    </main>
  );
}
