// /charters/halal/north-america — page halal Amerique du Nord (client 2026-10-22).
// Calquee sur /charters/halal/bahamas : hero video, galerie « COMO » de 5 panneaux,
// intro + rail lateral de 3 sections (HalalLateralScroll), yachts halal, puis la page
// /charters/destinations/north-america a partir des cases « North America Regions ».

import MouseExpandPanels from '@/components/vibe/MouseExpandPanels';
import HalalLateralScroll from '../caribbean/HalalLateralScroll';
import HalalBahamasHero from '../bahamas/HalalBahamasHero';
import NorthAmericaRegionCards from '../../destinations/north-america/NorthAmericaRegionCards';
import NorthAmericaRegions from '../../destinations/north-america/NorthAmericaRegions';
import NorthAmericaCta from '../../destinations/north-america/NorthAmericaCta';
import BahamasPopularDestinations from '../../destinations/bahamas/BahamasPopularDestinations';
import HalalYachtsSection from '../HalalYachtsSection';
import { getHalalYachts } from '@/lib/halalYachts';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Halal Private Charter — North America | Qualityacht',
  description:
    'Discreet, halal-friendly private yacht charter across the East and West Coasts of the United States, Canada and Mexico, arranged in complete confidence.',
};

// Hero : video du hero de /charters/destinations/north-america (pas de video halal dediee).
const HERO = '/media/client/2026-10-15/north-america-hero';

// Photos client du 2026-10-22, dans l'ordre donne : galerie 1 a 5, puis slide 1 a 3.
const M = '/media/client/halal-north-america/2026-10-22';

// Galerie : textes des panneaux de la page Bahamas, chaque titre place sur la photo
// qui lui correspond (cuisine, famille, yacht, mouillage, eaux turquoise).
// Ordre client (2026-10-23) : bateau, eau turquoise, paillotes, famille, cuisine.
const PANELS = [
  { number: '1', title: 'Set Sail', desc: 'Your own crewed yacht across seven hundred islands — the deck closes on request, the ladder drops when you say.', img: `${M}/gallery-3.jpg`, href: '/yachts?destination=north-america', ctaLabel: 'Explore the Fleet' },
  { number: '2', title: 'Turquoise Waters', desc: 'Powder-white sands and crystal lagoons, anchored far from the crowds.', img: `${M}/gallery-5.jpg`, href: '/yachts?destination=north-america', ctaLabel: 'Explore the Fleet' },
  { number: '3', title: 'Private Anchorages', desc: 'From the sky to secluded coves that few ever reach.', img: `${M}/gallery-4.jpg`, href: '/yachts?destination=north-america', ctaLabel: 'Explore the Fleet' },
  { number: '4', title: 'Family Moments', desc: 'Days made for everyone aboard — modest, joyful and endlessly private.', img: `${M}/gallery-2.jpg`, href: '/yachts?destination=north-america', ctaLabel: 'Explore the Fleet' },
  { number: '5', title: 'Halal Cuisine', desc: 'A private chef and a fully halal galley — refined menus and alcohol-free pairings, shaped around your table.', img: `${M}/gallery-1.jpg`, href: '/yachts?destination=north-america', ctaLabel: 'Explore the Fleet' },
];

// Textes fournis par le client (2026-10-22).
const INTRO =
  'From the East and West Coasts of the United States to Canada and Mexico, North America offers a distinctive setting for a private halal yacht charter. We shape each journey around your values and personal preferences, bringing together carefully selected yachts, discreet service, and thoughtfully coordinated shore-side arrangements. Halal-friendly requirements are integrated with care and discretion, creating a refined experience in which privacy, comfort, and peace of mind remain paramount.';

const TAGLINE = 'Halal, without compromise. Luxury, chartered in silence.';

const PARAGRAPHS = [
  {
    title: 'Understated Elegance',
    text: 'Across the East and West Coasts of the United States, Canada, and Mexico, we curate private yacht journeys with the quiet assurance of a private members’ club in Mayfair. Each charter is shaped around your values, your preferences, and your own sense of ease, with halal-friendly arrangements considered from the outset and handled with discretion. From the yacht itself to your time ashore, nothing is left to chance—and nothing feels imposed. Simply attentive service, a rhythm entirely your own, and the freedom to feel completely at ease.',
  },
  {
    title: 'Seamlessly Considered',
    text: 'Your values are understood from the first conversation and quietly reflected throughout your North American charter. From private moments on board to carefully arranged experiences ashore, every detail is considered with sensitivity and discretion. Nothing requires explanation twice; each arrangement simply feels right.',
  },
  {
    title: 'A Singular Experience',
    text: 'For those who value privacy, refinement, and truly personal attention, a North American charter becomes more than an itinerary. Each journey is composed around the people you choose to share it with, the places you wish to discover, and the freedom to move at your own pace. It is luxury without display, service that anticipates without intruding, and time that feels entirely your own.',
  },
];

// Ordre client (2026-10-23) : homme sur le yacht (coupe juste au-dessus des pieds, demande
// client), cabane face a la mer, chateau.
const PHOTOS = ['/media/client/halal-north-america/2026-10-23/slide-1b.jpg', `${M}/slide-2.jpg`, `${M}/slide-1.jpg`];

const ALTS = [
  'Guest on the deck of a private yacht in Miami',
  'Private cabana opening onto turquoise water at sunset',
  'Castle spires above the trees in Florida',
];

// Ronds fleurs : memes que /charters/destinations/north-america.
const F = '/media/client/2026-10-19/north-america-flowers';
const NA_FLOWERS = [
  { name: 'East Coast United States', slug: 'dogwood', rest: `${F}/dogwood-filtered.jpg`, hover: `${F}/dogwood-color.jpg` },
  { name: 'West Coast United States', slug: 'poppy', rest: `${F}/poppy-filtered.jpg`, hover: `${F}/poppy-color.jpg` },
  { name: 'Canada', slug: 'rose', rest: `${F}/rose-filtered.jpg`, hover: `${F}/rose-color.jpg` },
  { name: 'Miami', slug: 'orange-blossom', rest: `${F}/orange-blossom-filtered.jpg`, hover: `${F}/orange-blossom-color.jpg` },
  { name: 'Mexico', slug: 'dahlia', rest: `${F}/dahlia-filtered.jpg`, hover: `${F}/dahlia-color.jpg` },
];

export default async function HalalNorthAmericaPage() {
  // Bateaux coches « Halal Charter » + Amerique du Nord dans l'admin.
  const halalYachts = await getHalalYachts('north-america');
  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-clip">
      <HalalBahamasHero
        video={`${HERO}/hero.mp4`}
        poster={`${HERO}/poster.jpg`}
        title="North America"
        subtitle="The Ultimate Luxury Yachting Destination"
      />
      <MouseExpandPanels panels={PANELS} />
      <HalalLateralScroll intro={INTRO} tagline={TAGLINE} paragraphs={PARAGRAPHS} photos={PHOTOS} alts={ALTS} />
      <HalalYachtsSection yachts={halalYachts} region="North America" />
      {/* Suite de /charters/destinations/north-america a partir des cases regions */}
      <NorthAmericaRegionCards />
      <NorthAmericaRegions />
      <BahamasPopularDestinations items={NA_FLOWERS} />
      <NorthAmericaCta />
    </div>
  );
}
