import { useDocumentTitle } from '../hooks/useDocumentTitle';
import Hero from '../components/home/Hero';
import TrustBar from '../components/home/TrustBar';
import ProductFinder from '../components/home/ProductFinder';
import FeatureGrid from '../components/home/FeatureGrid';
import FlagshipSpotlight from '../components/home/FlagshipSpotlight';
import ReviewSpotlight from '../components/home/ReviewSpotlight';
import ShopMore from '../components/home/ShopMore';
import QuickAnswers from '../components/home/QuickAnswers';
import BlogSection from '../components/home/BlogSection';
import ComparisonTable from '../components/product/ComparisonTable';
import SectionHeader from '../components/ui/SectionHeader';

export default function Home() {
  useDocumentTitle();
  return (
    <>
      <Hero />
      <TrustBar />
      <ProductFinder />
      <FeatureGrid />
      <FlagshipSpotlight />
      <section className="container-page pb-20 sm:pb-24" aria-labelledby="compare-title">
        <SectionHeader
          id="compare-title"
          eyebrow="Which is right for you?"
          title="Compare every model"
          description="Key specs side by side, so you can pick the right coverage for how you drive."
        />
        <ComparisonTable />
      </section>
      <ReviewSpotlight />
      <ShopMore />
      <QuickAnswers />
      <BlogSection />
    </>
  );
}
