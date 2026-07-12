import CaribbeanV15Page from '../../destinations/caribbean-v15/page';
import HalalLateralScroll from './HalalLateralScroll';

// Halal — Caraibes : contenu de caribbean-v15, avec
//  - un HERO different (fruits tropicaux au lieu du yacht),
//  - le texte halal presente A COTE d'une photo dans une section a scroll lateral
//    facon Mamounia (cf. HalalLateralScroll, technique reprise de caribbean-v16),
//  - le bloc "A paradise of turquoise waters..." de la v15 masque (showDescription).
export const metadata = {
  title: 'Halal Private Charter — The Caribbean | Qualityacht',
  description:
    'Tailored halal private yacht charter across the Caribbean: curated itineraries, discreet service, and cuisine prepared to your requirements.',
};

const HERO_IMAGE = '/images/halal/fruits_1440x800.jpg';

// 1 photo = 1 slide du rail. La 1re est a cote du texte, les suivantes defilent avec la
// colonne texte laissee libre.
const PHOTOS = [
  '/images/Caraibes halal.jpg',
  '/images/michael-worden-36s0MNiG-No-unsplash.jpg',
  '/images/pexels-yassir-draka-2148838902-32967593.jpg',
];

const PARAGRAPHS = [
  'The Caribbean remain an underrated destination for halal, even though they offer an exceptional setting for enjoying a luxury experience in complete peace of mind.',
  'Thanks to our extensive connections in the halal food industry, we are able to create a refined culinary experience perfectly tailored to the expectations of our most demanding clients.',
];

export default function HalalCaribbeanPage() {
  return (
    <CaribbeanV15Page
      heroImageMobile={HERO_IMAGE}
      heroImageDesktop={HERO_IMAGE}
      showDescription={false}
      introNode={
        <HalalLateralScroll
          eyebrow="Caribbean · Halal Charter"
          title="A Halal Experience at Sea"
          paragraphs={PARAGRAPHS}
          photos={PHOTOS}
        />
      }
    />
  );
}
