// ══ Caraibes V20 — VERSION 1 : conforme a la structure v15, nouveaux medias ══
// Reprend integralement le rendu et la structure de caribbean-v15 (hero, description,
// iles, accordeons, destinations, CTA, FAQ) mais injecte les nouveaux medias haute
// qualite (photo aerienne turquoise en hero, plage vive en bandeau) et active la
// section "cartes flottantes" animee a la place du cocomer.
import CaribbeanV15Page from '../caribbean-v15/page';
import { one } from '@/lib/quality-media';

export const metadata = {
  title: 'The Caribbean — Luxury Yacht Charters | Qualityacht',
  description:
    'The Caribbean by Qualityacht: turquoise lagoons, 700+ islands and a fleet curated for the extraordinary. Plan your bespoke luxury yacht charter.',
};

const heroDesktop = one({ cat: 'aerial', role: 'hero-bg', kind: 'image' })?.src;
const heroMobile = one({ cat: 'beach', role: 'hero-bg', kind: 'image' })?.src;
const palmiers = one({ cat: 'beach', role: 'section-band', kind: 'image' })?.src;

export default function CaribbeanV20Page() {
  return (
    <CaribbeanV15Page
      heroImageDesktop={heroDesktop}
      heroImageMobile={heroMobile}
      heroTitle="The Caribbean"
      heroSubtitle="The Ultimate Luxury Yachting Destination"
      showShowcase
      palmiersSrc={palmiers}
      palmiersAspect="3 / 2"
    />
  );
}
