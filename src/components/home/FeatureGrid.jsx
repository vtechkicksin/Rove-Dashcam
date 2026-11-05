import { Aperture, Lock, MapPin, Moon, RefreshCw, SquareParking, Wifi, Zap } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';

const features = [
  { icon: Aperture, title: 'Up to true 4K', body: 'Ultra-HD recording that keeps license plates and road signs readable.' },
  { icon: Moon, title: 'Sony STARVIS sensors', body: 'STARVIS and STARVIS 2 sensors pull in more light for clear night footage.' },
  { icon: Wifi, title: 'Fast Wi-Fi transfers', body: 'Download clips to your phone over 5GHz Wi-Fi — up to 30 MB/s on Wi-Fi 6.' },
  { icon: MapPin, title: 'Built-in GPS', body: 'Location and speed stamped on your footage, up to quad-mode GPS.' },
  { icon: SquareParking, title: '24-hour parking mode', body: 'Keeps watch while you’re away when paired with the ROVE hardwire kit.' },
  { icon: Zap, title: 'Supercapacitor power', body: 'No lithium battery to swell in a hot car — safer and longer-lasting.' },
  { icon: Lock, title: 'Loop recording + G-sensor', body: 'Never runs out of space, and impact clips are locked so they’re never overwritten.' },
  { icon: RefreshCw, title: 'OTA firmware updates', body: 'New features and fixes arrive through the free ROVE app.' },
];

export default function FeatureGrid() {
  return (
    <section className="border-t border-ink-700 bg-ink-900/40 py-20 sm:py-24" aria-labelledby="features-title">
      <div className="container-page">
        <SectionHeader
          id="features-title"
          eyebrow="Why ROVE"
          title="Drive with confidence"
          description="The features that matter when something happens on the road — built into every ROVE dash cam."
        />
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, body }, i) => (
            <Reveal as="li" key={title} delay={(i % 4) * 0.05} className="bg-ink-900 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
