// ══ /international-real-estate ══
// Page d'activite reliee a la carte du meme nom sur /invest-with-impact.
// Meme identite visuelle que la section cartes ; gabarit partage ActivityPage.
import ActivityPage from '../components/activity/ActivityPage';
import { House, Building2, MapPin, Handshake } from 'lucide-react';

export const metadata = {
  title: 'International Real Estate | Qualityacht',
  description: 'Selected properties, development opportunities and trusted partners in sought-after international destinations, introduced by Qualityacht.',
};

const SECTIONS = [
    { Icone: Building2, titre: 'Selected Properties', texte: 'Villas, apartments and estates chosen for their setting, their build quality and their long-term appeal, never for volume.' },
    { Icone: MapPin, titre: 'Sought-After Destinations', texte: 'From Dubai and Monaco to Marrakech and Batumi, we work where our clients already spend their time on and off the water.' },
    { Icone: Handshake, titre: 'Trusted Partners', texte: 'Every opportunity comes through a specialist partner we have met and vetted. You deal with one office, Qualityacht, from first call to keys.' },
];

export default function Page() {
  return (
    <ActivityPage
      Icone={House}
      eyebrow='International Real Estate'
      title='Property Without Borders'
      subtitle='Selected properties and development opportunities in the destinations our clients already sail to.'
      heroImage='/media/client/lydie/2026-09-16/activities/real-estate.jpg'
      heroAlt='Aerial view of a waterfront estate on a wooded headland'
      heroPosition='50% 45%'
      intro='Our real-estate activity opens doors to residences, land and development projects in a handful of international markets we know from the water. Each opportunity is examined before it reaches you, and each introduction is handled by Qualityacht with the partner best placed to act on it.'
      sections={SECTIONS}
      cta={{ titre: 'Ready To Look Further?', texte: 'Tell us the destination and the kind of property you have in mind. We will connect you with the right partner and the right specialist.', label: 'Explore Real Estate Opportunities', href: '/real-estate' }}
    />
  );
}
