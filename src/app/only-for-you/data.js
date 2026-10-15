// Données des 6 types de voiliers présentés sur /only-for-you.
// Les slugs correspondent aux href des cards (sailingRentalItems).

export const sailingTypes = [
  {
    slug: 'classic-sailing-yacht',
    name: 'Classic Sailing Yacht',
    tagline: 'Timeless elegance under sail',
    image: '/images/sailing/classique4.jpg',
    intro: [
      'Classic sailing yachts embody the timeless art of cruising. With graceful lines, polished teak and generous sail plans, they offer a refined experience for those who appreciate tradition and craftsmanship.',
      'Ideal for serene coastal cruising and island hopping, a classic sailing yacht combines comfort, style and the authentic pleasure of being propelled by the wind.',
    ],
    highlights: [
      { title: 'Elegant Lines', text: 'Timeless hull design and exquisite woodwork for a refined silhouette.' },
      { title: 'Smooth Cruising', text: 'Balanced sail plans that deliver steady, comfortable passages.' },
      { title: 'Crewed Comfort', text: 'Professional crew, chef and attentive service throughout your charter.' },
    ],
  },
  {
    slug: 'catamaran',
    name: 'Catamaran',
    tagline: 'Space, stability and shallow-water freedom',
    image: '/images/sailing/catamaran.jpg',
    intro: [
      'Catamarans offer unmatched space and stability thanks to their twin-hull design. Wide decks, spacious saloons and a near-level sailing experience make them perfect for families and groups.',
      'Their shallow draft opens up secluded anchorages and turquoise lagoons that monohulls cannot reach — the ultimate platform for relaxed, sociable cruising.',
    ],
    highlights: [
      { title: 'Twin-Hull Stability', text: 'Minimal heeling for a comfortable ride, even under sail.' },
      { title: 'Generous Living Space', text: 'Expansive decks, cockpit and saloon for entertaining and lounging.' },
      { title: 'Shallow Draft', text: 'Access hidden coves and pristine lagoons off the beaten path.' },
    ],
  },
  {
    slug: 'trimaran',
    name: 'Trimaran',
    tagline: 'High performance meets effortless comfort',
    image: '/images/sailing/trimaran.jpg',
    intro: [
      'Trimarans pair the stability of multihulls with thrilling speed. Three slender hulls slice through the water, delivering exhilarating performance and a remarkably smooth ride.',
      'For guests who want to cover more ground without compromising on comfort, a trimaran charter is the perfect blend of adrenaline and ease.',
    ],
    highlights: [
      { title: 'Exceptional Speed', text: 'Lightweight three-hull design for fast, exciting passages.' },
      { title: 'Rock-Solid Stability', text: 'Wide stance keeps the deck level and secure under way.' },
      { title: 'Modern Design', text: 'Contemporary interiors and panoramic views from the saloon.' },
    ],
  },
  {
    slug: 'sport-classic',
    name: 'Sport Classic Yacht',
    tagline: 'Spirited sailing with classic soul',
    image: '/images/sailing/Sport-Classic-Yacht.jpg',
    intro: [
      'Sport classic yachts marry vintage charm with performance-oriented rigs. Optimised for spirited cruising and friendly regattas, they reward those who love to feel the boat come alive.',
      'Responsive, beautiful and engaging to sail, they are the choice of guests seeking both heritage and an active hand on the helm.',
    ],
    highlights: [
      { title: 'Performance Rig', text: 'Tuned sail plan for responsive, dynamic sailing.' },
      { title: 'Classic Character', text: 'Heritage styling with a sporty, purposeful edge.' },
      { title: 'Hands-On Sailing', text: 'Get involved at the helm or relax — the choice is yours.' },
    ],
  },
  {
    slug: 'traditional',
    name: 'Traditional Sailboat',
    tagline: 'An authentic voyage through time',
    image: '/images/sailing/traditional.jpg',
    intro: [
      'Step aboard an authentic traditional sailboat for a nostalgic adventure. Wooden hulls, gaff rigs and time-honoured craftsmanship evoke the golden age of sail.',
      'Perfect for romantic escapes and heritage cruising, these vessels offer a soulful, unhurried way to discover the coastline.',
    ],
    highlights: [
      { title: 'Authentic Craft', text: 'Handcrafted wooden hulls and traditional rigging.' },
      { title: 'Heritage Experience', text: 'Sail as generations did, with timeless charm.' },
      { title: 'Intimate Atmosphere', text: 'A warm, characterful setting for memorable voyages.' },
    ],
  },
  {
    slug: 'regatta',
    name: 'Sailboat Regatta',
    tagline: 'The thrill of competitive sailing',
    image: '/images/sailing/regate.jpg',
    intro: [
      'Experience the adrenaline of competitive sailing aboard a dedicated regatta yacht. Built for speed and precision, these boats deliver the excitement of racing in legendary Caribbean and Mediterranean events.',
      'Whether you race to win or sail for the pure thrill of it, a regatta charter puts you at the heart of the action with a skilled crew by your side.',
    ],
    highlights: [
      { title: 'Race-Ready', text: 'Performance hulls and rigs tuned for the start line.' },
      { title: 'Expert Crew', text: 'Seasoned racing crew to guide and support you.' },
      { title: 'Legendary Events', text: 'Compete in iconic regattas across the world.' },
    ],
  },
];

export function getDestinationBySlug(slug) {
  return destinationItems.find((d) => d.slug === slug) || null;
}

export function getSailingTypeBySlug(slug) {
  return sailingTypes.find((t) => t.slug === slug) || null;
}

// Les destinations (même ordre que /charters/destinations) — affichées en bas de
// chaque page voilier. `slug` (client 2026-10-14) : chaque case ouvre
// /only-for-you/<type>/<slug> (Caraïbes : page /carribbean existante).
export const destinationItems = [
  { slug: 'the-arctic', title: 'The Arctic',                image: '/images/destinations/animals/Arctic.png' },
  { slug: 'bahamas', title: 'Bahamas',               image: '/images/destinations/animals/Bahamas.jpg' },
  { slug: 'central-america', title: 'Central America',       image: '/images/destinations/animals/Central-America.jpg' },
  { slug: 'east-asia', title: 'East Asia',             image: '/images/destinations/animals/EAST-ASIA.jpg' },
  { slug: 'eastern-mediterranean', title: 'Eastern Mediterranean', image: '/images/destinations/animals/Eastern-Mediterranean.jpg' },
  { slug: 'indian-ocean', title: 'Indian Ocean',          image: '/images/destinations/animals/Indian-Ocean.jpg' },
  { slug: 'indonesia', title: 'Indonesia',             image: '/images/destinations/animals/Indonesia.jpg' },
  { slug: 'north-america', title: 'North America',         image: '/images/destinations/animals/Nord-America.jpg' },
  { slug: 'pacific-ocean', title: 'Pacific Ocean',         image: '/images/destinations/animals/Ocean-Pacific.jpeg' },
  { slug: 'oman-gulf', title: 'Oman Gulf',             image: '/images/destinations/animals/Oman-Gulf.jpeg' },
  { slug: 'south-east-asia', title: 'South East Asia',       image: '/images/destinations/animals/SOUTH-EAST-ASIA.jpeg' },
  { slug: 'western-mediterranean', title: 'Western Mediterranean', image: '/images/destinations/animals/Western-Mediterranean.webp' },
  { slug: 'africa', title: 'Africa',                image: '/images/destinations/animals/africa.jpeg' },
  { slug: 'northern-europe', title: 'Northern Europe',       image: '/images/destinations/animals/articbynortherneurope.jpg' },
  { title: 'Caraïbes',              image: '/images/destinations/animals/caraibes.jpg', caribbean: true },
  { slug: 'oceania', title: 'Oceania',               image: '/images/destinations/animals/oceania.jpeg' },
  // Ajoutee (client 2026-10-14) : toutes les destinations dans chaque case.
  { slug: 'the-antarctica', title: 'The Antarctica',        image: '/images/destinations/animals/Antarctica.jpg' },
];
