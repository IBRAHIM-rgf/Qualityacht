// src/app/charters/destinations/caribbean-v2/page.js
// VERSION MIXTE : Hero + Description + Cercles îles + Accordéons régions

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Anchor, Compass } from 'lucide-react';

// Îles principales des Caraïbes (en cercles)
const caribbeanIslands = [
  {
    name: 'St. Barts',
    image: '/images/destinations/animals/caraibes.jpg',
    href: '/yachts?destination=st-barts',
  },
  {
    name: 'St. Martin',
    image: '/images/destinations/destnation-feature-caribbean.webp',
    href: '/yachts?destination=st-martin',
  },
  {
    name: 'Antigua',
    image: '/images/destinations/animals/Bahamas.jpg',
    href: '/yachts?destination=antigua',
  },
  {
    name: 'BVI',
    image: '/images/yachts/yatch2.jpeg',
    href: '/yachts?destination=bvi',
  },
  {
    name: 'USVI',
    image: '/images/destinations/destnation-feature-south-pacific.webp',
    href: '/yachts?destination=usvi',
  },
  {
    name: 'Bahamas',
    image: '/images/destinations/animals/Ocean-Pacific.jpeg',
    href: '/yachts?destination=bahamas',
  },
];

// Destinations les plus populaires (en cercles)
const popularDestinations = [
  {
    name: 'Gustavia',
    image: '/images/destinations/destnation-feature-indian-ocean.webp',
    href: '/yachts?destination=gustavia',
  },
  {
    name: 'Marigot',
    image: '/images/destinations/animals/caraibes.jpg',
    href: '/yachts?destination=marigot',
  },
  {
    name: 'English Harbour',
    image: '/images/destinations/destnation-feature-east-med.webp',
    href: '/yachts?destination=english-harbour',
  },
  {
    name: 'Tortola',
    image: '/images/destinations/animals/Bahamas.jpg',
    href: '/yachts?destination=tortola',
  },
  {
    name: 'St. John',
    image: '/images/destinations/destnation-feature-caribbean.webp',
    href: '/yachts?destination=st-john',
  },
  {
    name: 'Nassau',
    image: '/images/destinations/destnation-feature-south-east-asia.webp',
    href: '/yachts?destination=nassau',
  },
];

// Régions avec villes (accordéons)
const caribbeanRegions = [
  {
    id: 'leeward',
    name: 'Leeward Islands',
    image: '/images/destinations/destnation-feature-caribbean.webp',
    description: 'The crown jewels of Caribbean yachting, offering world-class marinas, exclusive resorts, and pristine sailing conditions.',
    cities: [
      { name: 'Gustavia, St. Barts', href: '/yachts?destination=gustavia' },
      { name: 'Marigot, St. Martin', href: '/yachts?destination=marigot' },
      { name: 'Philipsburg, St. Maarten', href: '/yachts?destination=philipsburg' },
      { name: "English Harbour, Antigua", href: '/yachts?destination=english-harbour' },
      { name: 'Road Town, Tortola (BVI)', href: '/yachts?destination=tortola' },
      { name: 'Cruz Bay, St. John (USVI)', href: '/yachts?destination=st-john' },
    ],
  },
  {
    id: 'windward',
    name: 'Windward Islands',
    image: '/images/destinations/destnation-feature-south-pacific.webp',
    description: 'Dramatic volcanic landscapes, lush rainforests, and authentic Caribbean culture await in these enchanting islands.',
    cities: [
      { name: 'Castries, St. Lucia', href: '/yachts?destination=castries' },
      { name: 'Fort-de-France, Martinique', href: '/yachts?destination=fort-de-france' },
      { name: 'Roseau, Dominica', href: '/yachts?destination=roseau' },
      { name: "St. George's, Grenada", href: '/yachts?destination=grenada' },
      { name: 'Kingstown, St. Vincent', href: '/yachts?destination=kingstown' },
      { name: 'Bequia, Grenadines', href: '/yachts?destination=bequia' },
    ],
  },
  {
    id: 'greater-antilles',
    name: 'Greater Antilles',
    image: '/images/destinations/destnation-feature-north-america.webp',
    description: 'From the glamour of the Caymans to pristine beaches of Turks & Caicos, experience Caribbean luxury at its finest.',
    cities: [
      { name: 'George Town, Cayman Islands', href: '/yachts?destination=george-town' },
      { name: 'Providenciales, Turks & Caicos', href: '/yachts?destination=providenciales' },
      { name: 'Montego Bay, Jamaica', href: '/yachts?destination=montego-bay' },
      { name: 'Havana, Cuba', href: '/yachts?destination=havana' },
    ],
  },
  {
    id: 'bahamas',
    name: 'The Bahamas',
    image: '/images/destinations/animals/Bahamas.jpg',
    description: 'Crystal-clear waters, secluded cays, and exclusive island resorts define the Bahamian yachting experience.',
    cities: [
      { name: 'Nassau, New Providence', href: '/yachts?destination=nassau' },
      { name: 'George Town, Exumas', href: '/yachts?destination=exumas' },
      { name: 'Marsh Harbour, Abacos', href: '/yachts?destination=marsh-harbour' },
      { name: 'Harbour Island', href: '/yachts?destination=harbour-island' },
      { name: 'Staniel Cay', href: '/yachts?destination=staniel-cay' },
    ],
  },
];

const highlights = [
  {
    icon: MapPin,
    title: '700+ Islands',
    description: 'Explore an endless archipelago of tropical paradises',
  },
  {
    icon: Anchor,
    title: 'Year-Round Sailing',
    description: 'Perfect weather and conditions for luxury charters',
  },
  {
    icon: Compass,
    title: 'Exclusive Access',
    description: 'Private islands and secluded anchorages only reachable by yacht',
  },
];

function RegionAccordion({ region, isOpen, onToggle }) {
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#2e2f32] hover:border-[#B03E00]/30 transition-all">
      <button
        onClick={onToggle}
        className="w-full p-0 focus:outline-none group"
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={region.image}
            alt={region.name}
            fill
            className="object-cover brightness-75 group-hover:brightness-100 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2e2f32] via-black/40 to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-[#B03E00] transition-colors">
                {region.name}
              </h3>
              <div className="flex items-center justify-center gap-2 text-[#C0C0C0] group-hover:text-[#B03E00] transition-colors">
                {isOpen ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
                <span className="text-sm uppercase tracking-wider">
                  {isOpen ? 'Close' : 'Explore'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </button>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 space-y-4">
          <p className="text-gray-300 leading-relaxed">
            {region.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {region.cities.map((city, idx) => (
              <Link
                key={idx}
                href={city.href}
                className="block p-3 bg-[#3a3b3f] border border-white/20 rounded-lg hover:border-[#B03E00]/50 hover:bg-[#3a3b3f]/80 transition-all text-[#C0C0C0] hover:text-[#B03E00] text-sm"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CaribbeanV2Page() {
  const [openRegions, setOpenRegions] = useState([]);

  const toggleRegion = (regionId) => {
    setOpenRegions((prev) =>
      prev.includes(regionId)
        ? prev.filter((id) => id !== regionId)
        : [...prev, regionId]
    );
  };

  return (
    <div className="min-h-screen bg-[#3d4047] relative">
      {/* Nuages en fond global toute la page */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Image
          src="/images/nuagesAncien.png"
          alt=""
          fill
          className="object-cover opacity-40"
        />
      </div>

      {/* Hero Section avec yatch2.jpeg */}
      <div className="relative h-[80vh] min-h-[600px] z-10">
        <Image
          src="/images/yachts/yatch2.jpeg"
          alt="Caribbean Luxury Yacht Charter"
          fill
          className="object-cover object-top brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#303135]" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#C0C0C0]">
              The Caribbean
            </h1>
            <p className="text-xl md:text-2xl text-[#C0C0C0] font-light">
              The Ultimate Luxury Yachting Destination
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-32 relative z-10">
        {/* Description - Pyramid Style avec traits blancs */}
        <div className="mb-48 relative">
          <div className="text-center leading-relaxed space-y-16 relative">
            {/* Trait blanc du haut */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-16"></div>

            <p className="text-xl max-w-5xl mx-auto">
              A paradise of <span className="text-[#d39478] font-semibold">turquoise waters</span>, <span className="text-[#d39478] font-semibold">powder-white beaches</span>, <span className="text-[#d39478] font-semibold">vibrant coral reefs</span>, and <span className="text-[#d39478] font-semibold">lush tropical forests</span>,
              the Caribbean stands as <span className="text-[#d39478] font-semibold">the world's premier destination</span> for luxury yacht charters.
            </p>

            <p className="text-lg max-w-4xl mx-auto">
              From <span className="text-[#d39478] font-semibold">untamed natural beauty</span> and pirate legends of the Leeward and Windward Islands to the opulence
              of <span className="text-[#d39478] font-semibold">Michelin-starred restaurants</span> and <span className="text-[#d39478] font-semibold">ultra-luxury resorts</span> in St. Martin and St. Barts, the Caribbean
              offers an unparalleled sailing experience.
            </p>

            <p className="text-lg max-w-3xl mx-auto">
              Comprising <span className="text-[#d39478] font-semibold">twenty-six countries</span> and over <span className="text-[#d39478] font-semibold">seven hundred islands</span>, cays, and islets—including the Greater
              and Lesser Antilles—the Caribbean is a mosaic of crystal-clear seas, palm-fringed shores, and a rich
              cultural tapestry blending <span className="text-[#d39478] font-semibold">Creole, French, Dutch, and British</span> influences.
            </p>

            <p className="text-base max-w-2xl mx-auto">
              For discerning clients seeking the finest in yacht charters, the Caribbean delivers a seamless blend
              of exclusivity and adventure. Whether it's the glamour of <span className="text-[#d39478] font-semibold">Turks and Caicos</span>, the sophistication of
              <span className="text-[#d39478] font-semibold"> St. Barts</span>, or <span className="text-[#d39478] font-semibold">private island resorts accessible only by sea</span>, this region promises an elite escape
              where every moment is crafted for the extraordinary.
            </p>

            {/* Trait blanc du bas */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-16"></div>
          </div>
        </div>

        {/* Îles des Caraïbes - Cercles */}
        <div className="mb-48">
          <h2 className="text-2xl font-bold text-[#C0C0C0] mb-6 text-center tracking-wider">
            CARIBBEAN ISLANDS
          </h2>
          <p className="text-center text-[#C0C0C0] mb-16 max-w-2xl mx-auto">
            Discover the most sought-after islands for luxury yacht charters
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {caribbeanIslands.map((island, index) => (
              <Link
                key={index}
                href={island.href}
                className="group flex flex-col items-center"
              >
                <div className="relative aspect-square w-full rounded-full overflow-hidden border-2 border-white/20 hover:border-[#B03E00]/50 transition-all duration-300 mb-3">
                  <Image
                    src={island.image}
                    alt={island.name}
                    fill
                    className="object-cover brightness-75 group-hover:brightness-100 group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                </div>
                <h3 className="w-full text-white font-bold text-center text-sm md:text-base uppercase tracking-wide group-hover:text-[#B03E00] transition-colors">
                  {island.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Destinations Populaires - Cercles */}
        <div className="mb-48">
          <h2 className="text-2xl font-bold text-[#C0C0C0] mb-6 text-center tracking-wider">
            POPULAR DESTINATIONS
          </h2>
          <p className="text-center text-[#C0C0C0] mb-16 max-w-2xl mx-auto">
            The most exclusive marinas and anchorages in the Caribbean
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {popularDestinations.map((destination, index) => (
              <Link
                key={index}
                href={destination.href}
                className="group flex flex-col items-center"
              >
                <div className="relative aspect-square w-full rounded-full overflow-hidden border-2 border-white/20 hover:border-[#B03E00]/50 transition-all duration-300 mb-3">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover brightness-75 group-hover:brightness-100 group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                </div>
                <h3 className="w-full text-white font-bold text-center text-sm md:text-base uppercase tracking-wide group-hover:text-[#B03E00] transition-colors">
                  {destination.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Régions avec Accordéons */}
        <div className="mb-32">
          <h2 className="text-2xl font-bold text-[#C0C0C0] mb-6 text-center tracking-wider">
            EXPLORE BY REGION
          </h2>
          <p className="text-center text-[#C0C0C0] mb-16 max-w-2xl mx-auto">
            Discover the cities and marinas in each Caribbean region
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {caribbeanRegions.map((region) => (
              <RegionAccordion
                key={region.id}
                region={region}
                isOpen={openRegions.includes(region.id)}
                onToggle={() => toggleRegion(region.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
