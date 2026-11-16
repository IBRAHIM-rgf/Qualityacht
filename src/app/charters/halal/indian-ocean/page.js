// /charters/halal/indian-ocean — page halal Indian Ocean (client 2026-11-16).
// Calquee sur /charters/halal/north-america : hero, galerie de 5 panneaux, intro + rail
// lateral de 3 sections, yachts halal, FAQ, puis la page /charters/destinations/indian-ocean
// a partir des cases des regions, avec les ronds fleurs (+ Colombo, client 2026-11-16).
// Medias provisoires : photos Indian Ocean deja envoyees par le client (cases, bandeau),
// en attendant la video hero et les photos halal dediees. Textes : ceux de North America,
// adaptes aux destinations de l'Indian Ocean.

import MouseExpandPanels from '@/components/vibe/MouseExpandPanels';
import HalalLateralScroll from '../caribbean/HalalLateralScroll';
import HalalBahamasHero from '../bahamas/HalalBahamasHero';
import IndianOceanRegionCards from '../../destinations/indian-ocean/IndianOceanRegionCards';
import IndianOceanRegions from '../../destinations/indian-ocean/IndianOceanRegions';
import IndianOceanCta from '../../destinations/indian-ocean/IndianOceanCta';
import BahamasPopularDestinations from '../../destinations/bahamas/BahamasPopularDestinations';
import HalalYachtsSection from '../HalalYachtsSection';
import { getHalalYachts } from '@/lib/halalYachts';
import HalalFaq from '../HalalFaq';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Halal Yacht Charter Indian Ocean | Maldives & Seychelles | Qualityacht',
  description:
    'Discreet, halal-friendly private yacht charter across the Maldives, the Seychelles, Mauritius, Madagascar, Zanzibar and Sri Lanka, arranged in complete confidence.',
  alternates: { canonical: 'https://www.qualityacht.ch/halal-yacht-charter/indian-ocean' },
};

const C = '/media/client/2026-11-15/indian-ocean-cards';
const HERO_POSTER = `${C}/maldives.jpg`;
const FLEET = '/yachts?destination=indian-ocean';

// Galerie : memes 5 panneaux que North America, avec les photos Indian Ocean du client.
const PANELS = [
  { number: '1', title: 'Set Sail', desc: 'Your own crewed yacht across hundreds of islands — the deck closes on request, the ladder drops when you say.', img: `${C}/maldives.jpg`, href: FLEET, ctaLabel: 'Explore the Fleet' },
  { number: '2', title: 'Turquoise Waters', desc: 'Powder-white sands and crystal lagoons, anchored far from the crowds.', img: `${C}/mozambique.jpg`, href: FLEET, ctaLabel: 'Explore the Fleet' },
  { number: '3', title: 'Private Anchorages', desc: 'From the sky to secluded coves that few ever reach.', img: `${C}/seychelles.jpg`, href: FLEET, ctaLabel: 'Explore the Fleet' },
  { number: '4', title: 'Family Moments', desc: 'Days made for everyone aboard — modest, joyful and endlessly private.', img: `${C}/sri-lanka.jpg`, href: FLEET, ctaLabel: 'Explore the Fleet' },
  { number: '5', title: 'Halal Cuisine', desc: 'A private chef and a fully halal galley — refined menus and alcohol-free pairings, shaped around your table.', img: `${C}/madagascar.jpg`, href: FLEET, ctaLabel: 'Explore the Fleet' },
];

const INTRO =
  'From the Maldives and the Seychelles to Mauritius, Madagascar, Mozambique, Zanzibar and Sri Lanka, the Indian Ocean offers a distinctive setting for a private halal yacht charter. We shape each journey around your values and personal preferences, bringing together carefully selected yachts, discreet service, and thoughtfully coordinated shore-side arrangements. Halal-friendly requirements are integrated with care and discretion, creating a refined experience in which privacy, comfort, and peace of mind remain paramount. Every yacht can be arranged alcohol-free, with a halal chef and halal catering on board.';

const TAGLINE = 'Halal, without compromise. Luxury, chartered in silence.';

const PARAGRAPHS = [
  {
    title: 'Understated Elegance',
    text: 'Across the Maldives, the Seychelles, the Mascarene Islands and the coasts of East Africa and Sri Lanka, we curate private yacht journeys with the quiet assurance of a private members’ club in Mayfair. Each charter is shaped around your values, your preferences, and your own sense of ease, with halal-friendly arrangements considered from the outset and handled with discretion. From the yacht itself to your time ashore, nothing is left to chance—and nothing feels imposed. Simply attentive service, a rhythm entirely your own, and the freedom to feel completely at ease.',
  },
  {
    title: 'Seamlessly Considered',
    text: 'Your values are understood from the first conversation and quietly reflected throughout your Indian Ocean charter. From private moments on board to carefully arranged experiences ashore, every detail is considered with sensitivity and discretion. Nothing requires explanation twice; each arrangement simply feels right.',
  },
  {
    title: 'A Singular Experience',
    text: 'For those who value privacy, refinement, and truly personal attention, an Indian Ocean charter becomes more than an itinerary. Each journey is composed around the people you choose to share it with, the places you wish to discover, and the freedom to move at your own pace. It is luxury without display, service that anticipates without intruding, and time that feels entirely your own.',
  },
];

const PHOTOS = ['/media/client/2026-11-15/indian-ocean-cta/zanzibar-the-rock.jpg', `${C}/seychelles.jpg`, `${C}/sri-lanka.jpg`];
const ALTS = [
  'Thatched restaurant on a rock in the turquoise water of Zanzibar',
  'Granite boulders and palms around a secluded cove in the Seychelles',
  'Aerial view of a beach and green forest in Sri Lanka',
];

// Ronds fleurs : memes que /charters/destinations/indian-ocean, + Colombo (client 2026-11-16).
const F = '/media/client/2026-11-16/indian-ocean-flowers';
const IO_FLOWERS = [
  { name: 'Seychelles', slug: 'seychelles', rest: `${F}/seychelles-filtered.webp`, hover: `${F}/seychelles-color.webp` },
  { name: 'Maldives', slug: 'maldives', rest: `${F}/maldives-filtered.webp`, hover: `${F}/maldives-color.webp` },
  { name: 'Mauritius', slug: 'mauritius', rest: `${F}/mauritius-filtered.webp`, hover: `${F}/mauritius-color.webp` },
  { name: 'Zanzibar', slug: 'zanzibar', rest: `${F}/zanzibar-filtered.webp`, hover: `${F}/zanzibar-color.jpg` },
  { name: 'Madagascar', slug: 'madagascar', rest: `${F}/madagascar-filtered.webp`, hover: `${F}/madagascar-color.webp` },
  { name: 'Colombo', slug: 'colombo', rest: `${F}/colombo-filtered.jpg`, hover: `${F}/colombo-color.jpg` },
];

export default async function HalalIndianOceanPage() {
  // Bateaux coches « Halal Charter » + Ocean Indien dans l'admin.
  const halalYachts = await getHalalYachts('indian-ocean');
  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-clip">
      <HalalBahamasHero
        poster={HERO_POSTER}
        title="Indian Ocean"
        subtitle="Private · Muslim-Friendly · Alcohol-Free"
      />
      <MouseExpandPanels panels={PANELS} />
      <HalalLateralScroll intro={INTRO} tagline={TAGLINE} paragraphs={PARAGRAPHS} photos={PHOTOS} alts={ALTS} />
      <HalalYachtsSection yachts={halalYachts} region="Indian Ocean" />
      <HalalFaq withSection />
      {/* Suite de /charters/destinations/indian-ocean a partir des cases regions */}
      <IndianOceanRegionCards />
      <IndianOceanRegions />
      <BahamasPopularDestinations items={IO_FLOWERS} />
      <IndianOceanCta />
    </div>
  );
}
