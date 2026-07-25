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

// Fleurs nationales des Caraibes, ajoutees aux ronds "Popular Destinations" UNIQUEMENT
// sur cette page (prop extraFlowers de caribbean-v15). Effet gris->couleur au survol
// gere en CSS par CircleCard. Photos copiees du dossier fourni vers des chemins propres.
const NATIONAL_FLOWERS = [
  { name: 'Barbados',          image: '/images/destinations/flowers/barbados-pride.jpg',           href: '/yachts?destination=barbados',    nameBelow: true },
  { name: 'Cuba',              image: '/images/destinations/flowers/cuba-mariposa.jpg',            href: '/yachts?destination=cuba',        nameBelow: true },
  { name: 'Jamaica',           image: '/images/destinations/flowers/jamaica-lignum-vitae.jpg',     href: '/yachts?destination=jamaica',     nameBelow: true },
  { name: 'Puerto Rico',       image: '/images/destinations/flowers/puerto-rico-maga.jpg',         href: '/yachts?destination=puerto-rico', nameBelow: true },
  { name: 'Trinidad & Tobago', image: '/images/destinations/flowers/trinidad-tobago-chaconia.jpg', href: '/yachts?destination=trinidad',    nameBelow: true },
];

// 1 photo = 1 slide du rail. La 1re est a cote du texte, les suivantes defilent avec la
// colonne texte laissee libre.
const PHOTOS = [
  '/images/pagesCaraibes/image-collee.png',                          // slide #1 (boostee, cf. Photo boost)
  '/images/michael-worden-36s0MNiG-No-unsplash.jpg',                 // slide #2 (inchangee)
  '/images/pagesCaraibes/oswald-elsaboath-lHOIwVCOMMM-unsplash.jpg', // slide #3 (Oswald)
];

// Texte affiche A COTE de la 1re photo du rail horizontal.
// NB : les marqueurs de source du texte fourni ([luxurylondon.co], [lansdowneclub])
// ont ete retires ; la derniere phrase, coupee a "at the highest leve", a ete
// completee en "level.".
// 1 entree = 1 photo du slide. title = titre affiche au-dessus du paragraphe.
const PARAGRAPHS = [
  {
    title: 'Understated Elegance',
    text: 'We curate discreet yacht charter experiences with the understated elegance of a private members’ club in Mayfair. Every detail is handled with refinement, precision, and complete discretion, for guests who expect a level of service that feels effortlessly exclusive.',
  },
  {
    title: 'Halal, Seamlessly Integrated',
    text: 'Halal-friendly arrangements are integrated with the same quiet sophistication, from refined catering and alcohol-free options to a service style shaped around your preferences. The result is a private experience at sea that feels polished, bespoke, and exceptionally well considered.',
  },
  {
    title: 'A Singular Experience',
    text: 'For clients who value privacy, taste, and absolute personal attention, each charter is designed as a singular experience rather than a standard itinerary. It is luxury without noise, service without excess, and hospitality at the highest level.',
  },
];

// Ancien texte du rail : remonte SOUS LE HERO, centre (prop intro de la v15).
const INTRO =
  'The Caribbean remain an underrated destination for halal, even though they offer an exceptional setting for enjoying a luxury experience in complete peace of mind. Thanks to our extensive connections in the halal food industry, we are able to create a refined culinary experience perfectly tailored to the expectations of our most demanding clients.';

export default function HalalCaribbeanPage() {
  return (
    <CaribbeanV15Page
      heroImageMobile={HERO_IMAGE}
      heroImageDesktop={HERO_IMAGE}
      showDescription={false}
      showCocomer
      extraFlowers={NATIONAL_FLOWERS}
      hideDefaultFlowers
      grayClouds
      heroTextLow
      introNode={
        // intro passe DANS le composant (et non plus via le prop intro de la v15) : le
        // paragraphe est ainsi rendu dans le MEME fond nuageux continu que le slide, sans
        // section separee -> plus de "trait" entre le paragraphe et le slide.
        <HalalLateralScroll intro={INTRO} paragraphs={PARAGRAPHS} photos={PHOTOS} />
      }
    />
  );
}
