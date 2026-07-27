// ══ Halal Caraibes V20 — VERSION 1 : conforme a la structure halal, nouveaux medias ══
// Reprend la page halal (contenu caribbean-v15 + scroll lateral Mamounia) mais avec
// de nouveaux medias halal-friendly (familles, mode pudique coloree) et un hero vif.
import CaribbeanV15Page from '../../destinations/caribbean-v15/page';
import HalalLateralScroll from '../caribbean/HalalLateralScroll';
import { media, one } from '@/lib/quality-media';

export const metadata = {
  title: 'Halal Private Charter — The Caribbean | Qualityacht',
  description:
    'Tailored halal private yacht charter across the Caribbean: curated itineraries, discreet service, alcohol-free options and cuisine prepared to your requirements.',
};

const heroDesktop = one({ cat: 'beach', role: 'hero-bg', kind: 'image' })?.src;
const heroMobile = one({ cat: 'halal', kind: 'image', orientation: 'portrait' })?.src;
const palmiers = one({ cat: 'beach', role: 'section-band', kind: 'image' })?.src;

// Fleurs nationales des Caraibes (chemins existants — inchanges).
const NATIONAL_FLOWERS = [
  { name: 'Barbados',          image: '/images/destinations/flowers/barbados-pride.jpg',           href: '/yachts?destination=barbados',    nameBelow: true },
  { name: 'Cuba',              image: '/images/destinations/flowers/cuba-mariposa.jpg',            href: '/yachts?destination=cuba',        nameBelow: true },
  { name: 'Jamaica',           image: '/images/destinations/flowers/jamaica-lignum-vitae.jpg',     href: '/yachts?destination=jamaica',     nameBelow: true },
  { name: 'Puerto Rico',       image: '/images/destinations/flowers/puerto-rico-maga.jpg',         href: '/yachts?destination=puerto-rico', nameBelow: true },
  { name: 'Trinidad & Tobago', image: '/images/destinations/flowers/trinidad-tobago-chaconia.jpg', href: '/yachts?destination=trinidad',    nameBelow: true },
];

// Nouveaux medias halal-friendly (familles / mode pudique) pour le rail lateral.
const PHOTOS = media({ cat: 'halal', kind: 'image', orientation: 'portrait' }).slice(0, 3).map((m) => m.src);

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

const INTRO =
  'The Caribbean remain an underrated destination for halal, even though they offer an exceptional setting for enjoying a luxury experience in complete peace of mind. Thanks to our extensive connections in the halal food industry, we are able to create a refined culinary experience perfectly tailored to the expectations of our most demanding clients.';

export default function HalalCaribbeanV20Page() {
  return (
    <CaribbeanV15Page
      heroImageMobile={heroMobile}
      heroImageDesktop={heroDesktop}
      heroTitle="Halal Caribbean"
      heroSubtitle="A Private Charter, Perfectly Considered"
      showDescription={false}
      showCocomer
      palmiersSrc={palmiers}
      palmiersAspect="3 / 2"
      extraFlowers={NATIONAL_FLOWERS}
      hideDefaultFlowers
      grayClouds
      heroTextLow
      introNode={<HalalLateralScroll intro={INTRO} paragraphs={PARAGRAPHS} photos={PHOTOS} />}
    />
  );
}
