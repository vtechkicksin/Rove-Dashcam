import { Lock, Smartphone, SquareParking, Wifi, Zap } from 'lucide-react';
import { products } from '../../data/products';
import { sharedRows } from '../../lib/compareRows';

// Features every ROVE dash cam has. Spec-backed items only appear while the data says they are
// shared (sharedRows, or a check across all products); the last two come from ROVE's own listing,
// which shows them on every model.
const specItems = {
  power: { icon: Zap, title: 'Supercapacitor power', detail: 'No battery to swell in a hot car' },
  parking: { icon: SquareParking, title: '24-hour parking mode', detail: 'With the ROVE hardwire kit' },
};

const items = [
  ...sharedRows.filter((row) => specItems[row.key]).map((row) => specItems[row.key]),
  ...(products.every((p) => p.specs.wifi.includes('5GHz'))
    ? [{ icon: Wifi, title: 'Fast 5GHz Wi-Fi', detail: 'Copy clips straight to your phone' }]
    : []),
  { icon: Lock, title: 'Loop recording', detail: 'Impact clips lock automatically' },
  { icon: Smartphone, title: 'Free ROVE app', detail: 'Over-the-air firmware updates' },
];

export default function SharedFeatures() {
  return (
    <section aria-labelledby="shared-title" className="surface mb-6 p-5 sm:p-6">
      <h2 id="shared-title" className="text-sm font-semibold text-white">
        Every ROVE dash cam includes
      </h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {items.map(({ icon: Icon, title, detail }) => (
          <li key={title} className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
              <Icon size={18} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-white">{title}</span>
              <span className="block text-xs text-fg-muted">{detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
