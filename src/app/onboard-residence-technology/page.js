// ══ /onboard-residence-technology ══
// Page d'activite reliee a la carte du meme nom sur /invest-with-impact.
// Meme identite visuelle que la section cartes ; gabarit partage ActivityPage.
import ActivityPage from '../components/activity/ActivityPage';
import { Droplet, Filter, Cpu, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Onboard & Residence Technology | Qualityacht',
  description: 'Advanced water-filtration and technical solutions for yachts, vessels, residences and demanding marine environments, introduced by Qualityacht.',
};

const SECTIONS = [
    { Icone: Filter, titre: 'Water Filtration', texte: 'Filtration and treatment systems for drinking, galley and technical water on board, sized to the vessel and its cruising programme.' },
    { Icone: Cpu, titre: 'Systems Integration', texte: 'Monitoring, automation and energy management that fit the existing installation rather than replacing it.' },
    { Icone: ShieldCheck, titre: 'Service & Maintenance', texte: 'Scheduled servicing, remote diagnostics and spare parts, coordinated with your captain or property manager.' },
];

export default function Page() {
  return (
    <ActivityPage
      Icone={Droplet}
      eyebrow='Onboard & Residence Technology'
      title='Life At Sea, Refined'
      subtitle='Advanced water-filtration and technical solutions for yachts, vessels and residences in demanding marine environments.'
      heroImage='/media/client/lydie/2026-09-16/activities/technology.jpg'
      heroAlt='A water droplet rippling a deep blue surface'
      heroPosition='50% 55%'
      intro='Good technology on board is the kind you stop noticing. Our technical partners specialise in water quality and systems that keep a yacht or a waterfront residence running cleanly, quietly and reliably, with maintenance planned rather than improvised.'
      sections={SECTIONS}
      cta={{ titre: 'Discuss Your Installation', texte: 'Describe the vessel or residence and what you would like to improve. We will connect you with the right technical partner.', label: 'Explore Marine Solutions', href: '/contact' }}
    />
  );
}
