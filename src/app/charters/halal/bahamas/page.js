// /charters/halal/bahamas — page halal Bahamas (client 2026-10-01).
// Structure : hero video (config du hero de /charters/halal/caribbean), galerie
// « COMO » de 5 panneaux, intro + rail lateral de 3 sections (HalalLateralScroll),
// puis la page /charters/destinations/bahamas a partir de « Explore Bahamas Islands ».

import MouseExpandPanels from '@/components/vibe/MouseExpandPanels';
import HalalLateralScroll from '../caribbean/HalalLateralScroll';
import HalalBahamasHero from './HalalBahamasHero';
import { BahamasIslandsGrid, BahamasDestinationsByRegion, BahamasCtaAndFaq } from '../../destinations/bahamas/BahamasRegions';
import BahamasPopularDestinations from '../../destinations/bahamas/BahamasPopularDestinations';

export const metadata = {
  title: 'Halal Private Charter — The Bahamas | Qualityacht',
  description:
    'Discreet, halal-friendly private yacht charter across the Bahamas — Nassau, Paradise Island and the Exumas — with refined halal catering and alcohol-free service arranged in complete confidence.',
};

const M = '/media/client/halal-bahamas/2026-10-01';
const HERO_VIDEO = `${M}/hero.mp4`;
const HERO_POSTER = `${M}/gallery-3-private-anchorage.jpg`;

// Galerie : ordre exact demande par le client.
const PANELS = [
  { number: '1', title: 'Set Sail', desc: 'Your own crewed yacht across seven hundred islands — the deck closes on request, the ladder drops when you say.', img: `${M}/gallery-1-set-sail.jpg`, href: '/yachts?destination=bahamas', ctaLabel: 'Explore the Fleet' },
  { number: '2', title: 'Turquoise Waters', desc: 'Powder-white sands and crystal lagoons, anchored far from the crowds.', img: `${M}/gallery-2-turquoise-water.jpg`, href: '/yachts?destination=bahamas', ctaLabel: 'Explore the Fleet' },
  { number: '3', title: 'Private Anchorages', desc: 'From the sky to secluded coves that few ever reach.', img: `${M}/gallery-3-private-anchorage.jpg`, href: '/yachts?destination=bahamas', ctaLabel: 'Explore the Fleet' },
  { number: '4', title: 'Family Moments', desc: 'Days made for everyone aboard — modest, joyful and endlessly private.', img: `${M}/gallery-4-family-moment.jpg`, href: '/yachts?destination=bahamas', ctaLabel: 'Explore the Fleet' },
  { number: '5', title: 'Halal Cuisine', desc: 'A private chef and a fully halal galley — refined menus and alcohol-free pairings, shaped around your table.', img: `${M}/gallery-5-halal-cuisine.jpg`, href: '/yachts?destination=bahamas', ctaLabel: 'Explore the Fleet' },
];

const INTRO =
  'For our most discerning guests, the Bahamas offer a rare combination: absolute privacy, world-class service, and an environment where every detail can be aligned with their values. Through our exclusive network of trusted partners across the islands, we design a seamless, high-end experience—from yacht selection to shore-side arrangements—crafted for discretion, refinement, and complete peace of mind.';

const TAGLINE = 'Halal, without compromise. Luxury, chartered in silence.';

const PARAGRAPHS = [
  {
    title: 'Understated Elegance',
    text: 'We curate exceptional yacht charter experiences throughout The Bahamas, where crystalline waters, secluded islands, and effortless refinement create an atmosphere of rare tranquillity. From Nassau and Paradise Island to the private anchorages of the Exumas, every element is orchestrated with the discretion and precision of a private members’ club in Mayfair. Nothing is overstated; every detail simply reflects the exceptional standards of our guests.',
  },
  {
    title: 'Halal, Seamlessly Integrated',
    text: 'Halal-friendly arrangements are woven seamlessly into the experience, with each preference anticipated and handled with absolute discretion. From the selection of secluded anchorages to the rhythm of each day and the atmosphere on board, your charter is shaped around your personal standards of comfort, privacy, and refinement. The result is a journey that feels entirely natural, beautifully composed, and impeccably considered.',
  },
  {
    title: 'A Singular Experience',
    text: 'For clients who value privacy, taste, and personal attention, a Bahamas charter becomes far more than an itinerary. It is a private expression of luxury, shaped around secluded beaches, crystalline waters, unhurried days, and moments reserved entirely for you. Refined halal catering and alcohol-free beverages may be arranged with the same level of care, allowing every detail to remain consistent with your preferences. This is luxury without display, service without excess, and an experience defined by quiet confidence.',
  },
];

const PHOTOS = [
  `${M}/section-1-understated-elegance.jpg`,
  `${M}/section-2-halal-integrated.jpg`,
  `${M}/section-3-singular-experience.jpg`,
];

const ALTS = [
  'Secluded white-sand beach and turquoise water in the Bahamas',
  'Guest on the deck of a private yacht at dusk',
  'Coffee and alcohol-free beverages served in a quiet lounge',
];

export default function HalalBahamasPage() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-clip">
      <HalalBahamasHero
        video={HERO_VIDEO}
        poster={HERO_POSTER}
        title="Bahamas"
        subtitle="The Ultimate Luxury Yachting Destination"
      />
      <MouseExpandPanels panels={PANELS} />
      <HalalLateralScroll intro={INTRO} tagline={TAGLINE} paragraphs={PARAGRAPHS} photos={PHOTOS} alts={ALTS} />
      {/* Suite de /charters/destinations/bahamas a partir de « Explore Bahamas Islands » */}
      <BahamasIslandsGrid sub="Secluded islands, calm waters and anchorages reserved for you" />
      <BahamasDestinationsByRegion />
      <BahamasPopularDestinations />
      <BahamasCtaAndFaq
        ctaTitle="Plan Your Private Bahamas Charter"
        ctaText="Our team is available 24/7 to compose a discreet, bespoke itinerary across the Bahamas, with every preference arranged in advance."
      />
    </div>
  );
}
