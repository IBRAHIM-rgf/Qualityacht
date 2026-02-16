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
    <div className="min-h-screen bg-[#1a1b1e]">
      {/* Hero Section avec yatch2.jpeg */}
      <div className="relative h-[80vh] min-h-[600px]">
        <Image
          src="/images/yachts/yatch2.jpeg"
          alt="Caribbean Luxury Yacht Charter"
          fill
          className="object-cover object-top brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#1a1b1e]" />

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
      <div className="max-w-7xl mx-auto px-4 py-32">
        {/* Description - Pyramid Style avec traits blancs et nuages PNG */}
        <div className="mb-48 relative">
          {/* Nuages PNG en fond */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <Image
              src="/images/nuagesAncien.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          <div className="text-center leading-relaxed space-y-16 relative">
            {/* Trait blanc du haut */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-16"></div>

            <p className="text-xl text-[#C0C0C0] max-w-5xl mx-auto">
              A paradise of <span className="text-[#8B9FFF] font-semibold">turquoise waters</span>, <span className="text-[#8B9FFF] font-semibold">powder-white beaches</span>, <span className="text-[#8B9FFF] font-semibold">vibrant coral reefs</span>, and <span className="text-[#8B9FFF] font-semibold">lush tropical forests</span>,
              the Caribbean stands as <span className="text-[#8B9FFF] font-semibold">the world's premier destination</span> for luxury yacht charters.
            </p>

            <p className="text-lg text-[#C0C0C0] max-w-4xl mx-auto">
              From untamed natural beauty and pirate legends of the Leeward and Windward Islands to the opulence
              of Michelin-starred restaurants and ultra-luxury resorts in St. Martin and St. Barts, the Caribbean
              offers an unparalleled sailing experience.
            </p>

            <p className="text-lg text-[#C0C0C0] max-w-3xl mx-auto">
              Comprising twenty-six countries and over seven hundred islands, cays, and islets—including the Greater
              and Lesser Antilles—the Caribbean is a mosaic of crystal-clear seas, palm-fringed shores, and a rich
              cultural tapestry blending Creole, French, Dutch, and British influences.
            </p>

            <p className="text-base text-[#C0C0C0] max-w-2xl mx-auto">
              For discerning clients seeking the finest in yacht charters, the Caribbean delivers a seamless blend
              of exclusivity and adventure. Whether it's the glamour of Turks and Caicos, the sophistication of
              St. Barts, or private island resorts accessible only by sea, this region promises an elite escape
              where every moment is crafted for the extraordinary.
            </p>

            {/* Trait blanc du bas */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-16"></div>
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

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#B03E00]/10 to-[#9333ea]/10 border border-[#B03E00]/20 rounded-2xl p-16 text-center mt-32">
          <p className="text-lg text-[#C0C0C0] mb-12 max-w-2xl mx-auto">
            Discover our exclusive collection of luxury yachts available for charter across the Caribbean's most prestigious destinations.
          </p>
          <Link
            href="/yachts?destination=caribbean"
            className="inline-block bg-[#B03E00] hover:bg-[#B03E00]/90 text-white px-8 py-4 rounded-xl font-medium transition text-lg"
          >
            Browse Caribbean Yachts
          </Link>
        </div>
      </div>
    </div>
  );
}
