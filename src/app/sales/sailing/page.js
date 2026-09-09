// ══ /sales/sailing ══
//
// Remplace l'ancienne page d'attente. Aucun inventaire, aucun prix, aucun yacht
// nomme : la categorie n'a pas de selection publique. La page presente la
// methode de recherche et ouvre le formulaire Sales existant, sans y toucher.
//
// Visuel local deja present dans le depot, ni telecharge ni converti.

import SourcingLanding from '../SourcingLanding';

export const metadata = {
  title: 'Sailing Yachts for Sale | Qualityacht',
  description:
    'Performance cruisers, classic sailing yachts and private-market sourcing — our acquisition team searches around your programme and cruising ambitions.',
};

const AXES = [
  {
    titre: 'Performance & Cruising',
    texte:
      'Yachts built to sail well and to be lived aboard. We start from how you actually intend to use the boat — miles, crew, seasons — rather than from a category.',
  },
  {
    titre: 'Classic & Timeless Yachts',
    texte:
      'Older hulls ask different questions: refit history, surveys, the cost of keeping them right. We look at those before anything else.',
  },
  {
    titre: 'Private-Market Sourcing',
    texte:
      'A good part of what changes hands is never advertised. We ask around the owners and brokers we know, which takes longer but widens what you get to see.',
  },
];

export default function SalesSailingPage() {
  return (
    <SourcingLanding
      eyebrow="Qualityacht · Brokerage &amp; Acquisitions"
      title="Sailing Yachts for Sale"
      intro="From performance cruisers to classic sailing yachts, our acquisition team searches the public and private market around your programme, preferences and cruising ambitions."
      heroImage="/images/sailing/classique.jpg"
      heroAlt="Sailing yacht under way at sunset"
      heroPosition="object-center max-md:object-[42%_50%]"
      heroFrame
      primary={{ label: 'Find a Sailing Yacht', href: '/sales/enquiry?intent=buy' }}
      secondary={{ label: 'Speak to a Sales Broker', href: '/sales/enquiry?intent=general' }}
      axes={AXES}
      final={{
        title: 'Tell Us What You Are Looking For',
        texte:
          'Give us the programme, the size and the timeframe. We will tell you honestly what the market holds right now.',
        primary: { label: 'Start Your Search', href: '/sales/enquiry?intent=buy' },
        secondary: { label: 'Receive Exclusive Listings', href: '/sales/enquiry?intent=listings' },
      }}
    />
  );
}
