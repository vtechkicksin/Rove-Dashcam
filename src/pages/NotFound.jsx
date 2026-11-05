import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Page not found');
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">We couldn&apos;t find that page</h1>
      <p className="mt-3 max-w-md text-fg-muted">The link may be broken, or the page may have moved.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">Back to home</Link>
        <Link to="/dash-cams" className="btn-secondary">Browse dash cams</Link>
      </div>
    </div>
  );
}
