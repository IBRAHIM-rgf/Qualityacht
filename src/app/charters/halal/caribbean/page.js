import CaribbeanV15Page from '../../destinations/caribbean-v15/page';

// Halal — Caraibes : exactement le contenu de caribbean-v15, seul le HERO change
// (photo de fruits tropicaux au lieu du yacht).
export const metadata = {
  title: 'Halal Private Charter — The Caribbean | Qualityacht',
  description:
    'Tailored halal private yacht charter across the Caribbean: curated itineraries, discreet service, and cuisine prepared to your requirements.',
};

const HERO_IMAGE = '/images/halal/fruits_1440x800.jpg';

// NB : le paragraphe colle par l'utilisateur etait coupe a "...with disc" ; repris
// jusqu'a la derniere phrase complete. Completer si besoin.
const INTRO =
  'The Caribbean remain an underrated destination for halal, even though they offer an exceptional setting for enjoying a luxury experience in complete peace of mind. Thanks to our extensive connections in the halal food industry, we are able to create a refined culinary experience perfectly tailored to the expectations of our most demanding clients.';

export default function HalalCaribbeanPage() {
  return (
    <CaribbeanV15Page heroImageMobile={HERO_IMAGE} heroImageDesktop={HERO_IMAGE} intro={INTRO} />
  );
}
