import ThemeLandingPage from '../components/ThemeLandingPage';
import { media } from '@/lib/quality-media';

export const metadata = {
  title: 'Events | Qualityacht',
  description:
    'Carnivals, regattas, heritage feasts and the great social calendars of the world — a curated reference for private yacht clients, destination by destination.',
};

const HERO_IMAGE = (media({ cat: 'aerial', role: 'hero-bg', kind: 'image' }).find((m) => (m.tags || []).includes('island'))
  || media({ cat: 'aerial', role: 'hero-bg', kind: 'image' })[0])?.src
  || '/media/quality/aerial/golden-pearvilla-wzj0ewkvche-unsplash.jpg';

// Meme landing generique que /art-culture, /fine-food-dining et /historic-sites : hero +
// intro + les 16 destinations, seules les Caraibes ouvertes pour l'instant.
export default function EventsPage() {
  return (
    <ThemeLandingPage
      eyebrow="Ultra-Premium Reference"
      title="Events"
      heroImage={HERO_IMAGE}
      intro="Carnivals, heritage feasts, regattas and the great social calendars of the world — a curated reference through the destinations that shape a season, chosen for excellence and for what they bring to a charter at anchor."
      caribbeanHref="/events/caribbean"
      animated
    />
  );
}
