import CaribbeanV15Page from '../../destinations/caribbean-v15/page';

// Halal — Caraibes : exactement le contenu de caribbean-v15, seul le HERO change
// (photo de fruits tropicaux au lieu du yacht).
export const metadata = {
  title: 'Halal Private Charter — The Caribbean | Qualityacht',
  description:
    'Tailored halal private yacht charter across the Caribbean: curated itineraries, discreet service, and cuisine prepared to your requirements.',
};

const HERO_IMAGE = '/images/halal/fruits_1440x800.jpg';

export default function HalalCaribbeanPage() {
  return <CaribbeanV15Page heroImageMobile={HERO_IMAGE} heroImageDesktop={HERO_IMAGE} />;
}
