// ══ /sales/toys ══
//
// Remplace l'ancienne page d'attente. AUCUNE marque, AUCUN modele, AUCUN produit
// et AUCUN prix : rien n'est confirme pour cette categorie.
//
// Visuel local deja present dans le depot. Le depot ne contient aucune photo de
// tender, de chase boat ni de sport nautique : ce visuel marin est le plus
// proche disponible. Voir le rapport pour la photo definitive a demander.

import SourcingLanding from '../SourcingLanding';

export const metadata = {
  title: 'Water Toys & Equipment | Qualityacht',
  description:
    'Tenders, chase boats and equipment selected around your yacht — each request coordinated with the same care as a yacht acquisition.',
};

const AXES = [
  {
    titre: 'Tenders & Chase Boats',
    texte:
      'What follows the yacht matters as much as the yacht. Size, draft, where it stows and who drives it are decided together, before anything is sourced.',
  },
  {
    titre: 'Watersports & Exploration',
    texte:
      'What guests actually use, chosen for the water you will be in and for who is aboard — not for the length of the list.',
  },
  {
    titre: 'Equipment Selected Around Your Yacht',
    texte:
      'Stowage, davits, power and crew handling set the real limits. We work from those constraints rather than around them.',
  },
];

export default function SalesToysPage() {
  return (
    <SourcingLanding
      eyebrow="Qualityacht · Equipment &amp; Acquisitions"
      title="Water Toys &amp; Equipment"
      intro="From tenders and chase boats to equipment selected around your yacht and your time on the water, Qualityacht coordinates each request with the same care as a yacht acquisition."
      heroImage="/media/quality/boats/boat-port.jpg"
      heroAlt="Boat bow heading across shallow turquoise water"
      heroPosition="object-center"
      primary={{ label: 'Source Water Toys & Equipment', href: '/sales/enquiry?intent=buy' }}
      secondary={{ label: 'Speak to a Sales Broker', href: '/sales/enquiry?intent=general' }}
      axes={AXES}
      final={{
        title: 'Build the Right Setup for Your Yacht',
        texte:
          'Tell us the yacht, the stowage you have and how you use the water. We will come back with what genuinely fits.',
        primary: { label: 'Tell Us What You Need', href: '/sales/enquiry?intent=general' },
        secondary: { label: 'Receive Exclusive Listings', href: '/sales/enquiry?intent=listings' },
      }}
    />
  );
}
