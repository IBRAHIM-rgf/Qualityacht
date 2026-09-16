// ══ /wellness-care ══
// Page d'activite reliee a la carte du meme nom sur /invest-with-impact.
// Meme identite visuelle que la section cartes ; gabarit partage ActivityPage.
import ActivityPage from '../components/activity/ActivityPage';
import { Flower2, Leaf, HeartPulse, Sun } from 'lucide-react';

export const metadata = {
  title: 'Wellness & Care | Qualityacht',
  description: 'Products, services and experiences designed to bring greater balance, comfort and well-being into everyday life, curated by Qualityacht.',
};

const SECTIONS = [
    { Icone: Leaf, titre: 'Products', texte: 'Skincare, bath and body care and home fragrance with clean formulations, chosen for how they feel rather than how they are marketed.' },
    { Icone: HeartPulse, titre: 'Services', texte: 'Massage, recovery and personal-care practitioners who come to you, on board or at your residence, at the hours that suit you.' },
    { Icone: Sun, titre: 'Experiences', texte: 'Retreats and wellness days in the destinations we charter to, from a quiet morning ashore to a full programme built around your stay.' },
];

export default function Page() {
  return (
    <ActivityPage
      Icone={Flower2}
      eyebrow='Wellness & Care'
      title='Designed For Well-Being'
      subtitle='Thoughtful products and experiences that bring comfort, balance and a deeper sense of well-being into everyday life.'
      heroImage='/media/client/lydie/2026-09-16/activities/wellness.jpg'
      heroAlt='Woman resting on a sofa by candlelight against a dark botanical wall'
      heroPosition='60% 50%'
      intro='Wellness & Care is about the small rituals that make a day feel lighter: what you use, where you rest, how you recover after time at sea. We select products and partners that take those rituals seriously, with natural formulations and experiences shaped around the individual.'
      sections={SECTIONS}
      cta={{ titre: 'Make Room For Yourself', texte: 'Tell us how you like to unwind. We will put together products, treatments or a retreat that follow your pace.', label: 'Speak To Our Team', href: '/#contact' }}
    />
  );
}
