import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '../../data/products';
import SectionHeader from '../ui/SectionHeader';
import Carousel from '../ui/Carousel';
import ProductCard from '../product/ProductCard';

export default function ProductLineup() {
  return (
    <section className="container-page py-16 sm:py-20" aria-labelledby="lineup-title">
      <SectionHeader
        id="lineup-title"
        align="left"
        eyebrow="The lineup"
        title="Five cameras. One for every drive."
        action={
          <Link to="/dash-cams" className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold sm:min-h-0 text-brand-300 hover:text-brand-400">
            Shop all dash cams <ArrowRight size={16} aria-hidden="true" />
          </Link>
        }
      />
      <Carousel label="ROVE dash cams" itemClassName="w-[78%] sm:w-[46%] lg:w-[calc((100%-4rem)/5)]">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </Carousel>
    </section>
  );
}
