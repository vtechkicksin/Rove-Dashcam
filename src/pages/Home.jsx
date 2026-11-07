import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import Hero from '../components/home/Hero';
import ProductLineup from '../components/home/ProductLineup';
import FeatureExplorer from '../components/home/FeatureExplorer';
import ProofSection from '../components/home/ProofSection';
import QuickAnswers from '../components/home/QuickAnswers';
import SectionHeader from '../components/ui/SectionHeader';
import CompareChecklist from '../components/home/CompareChecklist';

export default function Home() {
  useDocumentTitle();
  return (
    <>
      <Hero />
      <ProductLineup />
      <FeatureExplorer />
      <section id="compare" className="container-page scroll-mt-28 py-16 sm:py-20" aria-labelledby="compare-title">
        <SectionHeader
          id="compare-title"
          align="left"
          eyebrow="Compare"
          title="Side by side, at a glance"
          action={
            <Link to="/compare" className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-brand-300 hover:text-brand-400 sm:min-h-0">
              See every spec <ArrowRight size={16} aria-hidden="true" />
            </Link>
          }
        />
        <CompareChecklist />
      </section>
      <ProofSection />
      <QuickAnswers />
    </>
  );
}
