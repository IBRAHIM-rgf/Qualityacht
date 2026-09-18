import ThemeLandingPage from '../components/ThemeLandingPage';
import { media } from '@/lib/quality-media';
import EventsHeroPanels from './caribbean/EventsHeroPanels';

export const metadata = {
  title: 'Events | Qualityacht',
  description:
    'Carnivals, regattas, heritage feasts and the great social calendars of the world — a curated reference for private yacht clients, destination by destination.',
};

// Hero : les trois panneaux video (ex-/events/caribbean), echanges avec la photo
// aerienne qui est passee sur /events/caribbean (client 2026-09-18). Textes inchanges.

// Meme landing generique que /art-culture, /fine-food-dining et /historic-sites : hero +
// intro + les 16 destinations, seules les Caraibes ouvertes pour l'instant.
export default function EventsPage() {
  return (
    <ThemeLandingPage
      eyebrow="Ultra-Premium Reference"
      title="Events"
      heroNode={<EventsHeroPanels />}
      intro="Carnivals, heritage feasts, regattas and the great social calendars of the world — a curated reference through the destinations that shape a season, chosen for excellence and for what they bring to a charter at anchor."
      caribbeanHref="/events/caribbean"
      animated
    />
  );
}
