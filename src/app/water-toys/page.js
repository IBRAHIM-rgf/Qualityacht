// ══ /water-toys ══
// Page d'activite reliee a la carte du meme nom sur /invest-with-impact.
// Meme identite visuelle que la section cartes ; gabarit partage ActivityPage.
import ActivityPage from '../components/activity/ActivityPage';
import { Waves, Sailboat, Wind, Anchor } from 'lucide-react';

export const metadata = {
  title: 'Water Toys | Qualityacht',
  description: 'Premium water toys and nautical equipment created to make time on the water more exciting, active and unforgettable, selected by Qualityacht.',
};

const SECTIONS = [
    { Icone: Sailboat, titre: 'Motorised', texte: 'Jet skis, Seabobs, e-foils and tenders from established builders, delivered ready to launch.' },
    { Icone: Wind, titre: 'Boards & Paddles', texte: 'Paddle boards, wakeboards, kayaks and foils for calm mornings and open-water afternoons alike.' },
    { Icone: Anchor, titre: 'Inflatables & Platforms', texte: 'Slides, floating platforms and lounges that make the most of a day at anchor, for families and groups.' },
];

export default function Page() {
  return (
    <ActivityPage
      Icone={Waves}
      eyebrow='Water Toys'
      title='Play On The Water'
      subtitle='A selection of premium equipment created to make time on the water more exciting, active and unforgettable.'
      heroImage='/media/client/lydie/2026-09-16/activities/water-toys.jpg'
      heroAlt='Red jet ski resting on wet sand at sunset'
      heroPosition='55% 50%'
      intro='Water Toys covers everything that turns an anchorage into a playground: from tenders and jet skis to boards, e-foils and inflatables. We select equipment for build quality and ease of use, and we can arrange supply, delivery to the yacht and seasonal storage.'
      sections={SECTIONS}
      cta={{ titre: 'Equip Your Season', texte: 'Tell us the yacht and the kind of days you have in mind. We will put together the right selection and handle delivery on board.', label: 'Discover Water Toys', href: '/contact' }}
    />
  );
}
