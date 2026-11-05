import { useDocumentTitle } from '../hooks/useDocumentTitle';
import ComparisonTable from '../components/product/ComparisonTable';

export default function Compare() {
  useDocumentTitle('Compare Dash Cams');
  return (
    <div className="container-page py-12 sm:py-16">
      <header className="mb-10 max-w-2xl">
        <p className="eyebrow">Compare</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">Which dash cam is right for you?</h1>
        <p className="mt-3 text-fg-muted">
          Every spec, side by side. Tick “Only show differences” to focus on what actually sets each model apart.
        </p>
      </header>
      <ComparisonTable />
    </div>
  );
}
