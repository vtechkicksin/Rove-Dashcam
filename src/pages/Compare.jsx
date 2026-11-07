import { Link, useSearchParams } from 'react-router-dom';
import { getProduct, products } from '../data/products';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import ComparisonTable from '../components/product/ComparisonTable';

export default function Compare() {
  useDocumentTitle('Compare Dash Cams');
  const [params] = useSearchParams();
  // ?models=a,b from the compare tray; unknown ids are ignored, fewer than two shows everything.
  const picked = (params.get('models') ?? '').split(',').map(getProduct).filter(Boolean);
  const models = picked.length >= 2 ? picked : products;
  const narrowed = models !== products;

  return (
    <div className="container-page py-12 sm:py-16">
      <header className="mb-10 max-w-2xl">
        <p className="eyebrow">Compare</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">Which dash cam is right for you?</h1>
        <p className="mt-3 text-fg-muted">
          {narrowed
            ? `Comparing ${models.length} models.`
            : 'Start with “Best for”, then tick “Only show differences” to see what sets each model apart.'}{' '}
          {narrowed && (
            <Link to="/compare" className="font-medium text-brand-300 hover:text-brand-400">
              Show all models
            </Link>
          )}
        </p>
      </header>
      <ComparisonTable models={models} />
    </div>
  );
}
