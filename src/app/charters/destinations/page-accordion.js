// src/app/charters/destinations/page-accordion.js
// VERSION AVEC TRIANGLES DÉROULANTS (ACCORDÉON)

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const destinationRegions = [
  {
    id: 'caribbean',
    name: 'The Caribbean',
    image: '/images/destinations/animals/caraibes.jpg',
    description: 'A paradise of turquoise waters, powder-white beaches, vibrant coral reefs, and lush tropical forests. The Caribbean stands as the world\'s premier destination for luxury yacht charters.',
    subRegions: [
      {
        name: 'Leeward Islands',
        islands: ['Antigua & Barbuda', 'St. Martin/St. Maarten', 'St. Barts', 'Anguilla', 'British Virgin Islands', 'US Virgin Islands'],
        href: '/yachts?destination=leeward-islands',
      },
      {
        name: 'Windward Islands',
        islands: ['St. Lucia', 'Martinique', 'Dominica', 'Grenada', 'St. Vincent & the Grenadines'],
        href: '/yachts?destination=windward-islands',
      },
      {
        name: 'Greater Antilles',
        islands: ['Jamaica', 'Cayman Islands', 'Cuba', 'Turks & Caicos'],
        href: '/yachts?destination=greater-antilles',
      },
      {
        name: 'The Bahamas',
        islands: ['Nassau', 'Exumas', 'Abacos', 'Eleuthera', 'Harbor Island'],
        href: '/yachts?destination=bahamas',
      },
    ],
    mainHref: '/charters/destinations/caribbean-v15',
  },
  {
    id: 'mediterranean',
    name: 'The Mediterranean',
    image: '/images/destinations/animals/Western-Mediterranean.webp',
    description: 'From the glamorous French Riviera to the historic Greek Islands, the Mediterranean offers unparalleled luxury, culture, and pristine waters for discerning yacht charter clients.',
    subRegions: [
      {
        name: 'French Riviera',
        islands: ['Monaco', 'Cannes', 'St. Tropez', 'Nice', 'Antibes'],
        href: '/yachts?destination=french-riviera',
      },
      {
        name: 'Italian Coast',
        islands: ['Amalfi Coast', 'Sardinia', 'Sicily', 'Portofino', 'Capri'],
        href: '/yachts?destination=amalfi-coast',
      },
      {
        name: 'Greek Islands',
        islands: ['Mykonos', 'Santorini', 'Corfu', 'Rhodes', 'Crete'],
        href: '/yachts?destination=greek-islands',
      },
      {
        name: 'Spanish Coast',
        islands: ['Ibiza', 'Mallorca', 'Menorca', 'Costa del Sol', 'Barcelona'],
        href: '/yachts?destination=spanish-coast',
      },
    ],
    mainHref: '/charters/destinations/mediterranean',
  },
  {
    id: 'pacific',
    name: 'South Pacific',
    image: '/images/destinations/animals/Ocean-Pacific.jpeg',
    description: 'Remote island paradises, crystal-clear lagoons, and untouched natural beauty define the South Pacific yacht charter experience. Discover French Polynesia, Fiji, and beyond.',
    subRegions: [
      {
        name: 'French Polynesia',
        islands: ['Tahiti', 'Bora Bora', 'Moorea', 'Raiatea', 'Huahine'],
        href: '/yachts?destination=french-polynesia',
      },
      {
        name: 'Fiji',
        islands: ['Viti Levu', 'Vanua Levu', 'Taveuni', 'Yasawa Islands', 'Mamanuca Islands'],
        href: '/yachts?destination=fiji',
      },
      {
        name: 'New Caledonia',
        islands: ['Nouméa', 'Isle of Pines', 'Loyalty Islands'],
        href: '/yachts?destination=new-caledonia',
      },
    ],
    mainHref: '/charters/destinations/south-pacific',
  },
  {
    id: 'indian-ocean',
    name: 'Indian Ocean',
    image: '/images/destinations/animals/Indian-Ocean.jpg',
    description: 'Exotic islands, pristine beaches, and world-class diving. The Indian Ocean offers exclusive yacht charter experiences in the Seychelles, Maldives, and Mauritius.',
    subRegions: [
      {
        name: 'Seychelles',
        islands: ['Mahé', 'Praslin', 'La Digue', 'Outer Islands'],
        href: '/yachts?destination=seychelles',
      },
      {
        name: 'Maldives',
        islands: ['North Malé Atoll', 'South Malé Atoll', 'Ari Atoll', 'Baa Atoll'],
        href: '/yachts?destination=maldives',
      },
      {
        name: 'Mauritius',
        islands: ['Port Louis', 'Grand Baie', 'Belle Mare', 'Le Morne'],
        href: '/yachts?destination=mauritius',
      },
    ],
    mainHref: '/charters/destinations/indian-ocean',
  },
  {
    id: 'southeast-asia',
    name: 'South East Asia',
    image: '/images/destinations/animals/SOUTH-EAST-ASIA.jpeg',
    description: 'Explore the exotic charm of Thailand, Indonesia, and beyond. South East Asia offers a unique blend of culture, cuisine, and spectacular island scenery.',
    subRegions: [
      {
        name: 'Thailand',
        islands: ['Phuket', 'Koh Samui', 'Krabi', 'Phi Phi Islands', 'Similan Islands'],
        href: '/yachts?destination=phuket',
      },
      {
        name: 'Indonesia',
        islands: ['Bali', 'Komodo', 'Raja Ampat', 'Lombok', 'Gili Islands'],
        href: '/yachts?destination=indonesia',
      },
      {
        name: 'Myanmar',
        islands: ['Mergui Archipelago'],
        href: '/yachts?destination=myanmar',
      },
    ],
    mainHref: '/charters/destinations/south-east-asia',
  },
  {
    id: 'bahamas',
    name: 'The Bahamas',
    image: '/images/destinations/animals/Bahamas.jpg',
    description: 'Crystal-clear waters, secluded cays, and exclusive island resorts. The Bahamas is a yacht charter paradise just off the coast of Florida.',
    subRegions: [
      {
        name: 'Exumas',
        islands: ['Great Exuma', 'Staniel Cay', 'Pig Beach', 'Thunderball Grotto'],
        href: '/yachts?destination=exumas',
      },
      {
        name: 'Abacos',
        islands: ['Marsh Harbour', 'Hope Town', 'Green Turtle Cay', 'Elbow Cay'],
        href: '/yachts?destination=abacos',
      },
      {
        name: 'Nassau & Paradise Island',
        islands: ['Nassau', 'Paradise Island', 'Rose Island'],
        href: '/yachts?destination=nassau',
      },
    ],
    mainHref: '/charters/destinations/bahamas',
  },
];

function DestinationAccordion({ region, isOpen, onToggle }) {
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#2e2f32] hover:border-[#B03E00]/30 transition-all">
      {/* Header - Always visible */}
      <button
        onClick={onToggle}
        className="w-full p-0 focus:outline-none group"
      >
        <div className="relative h-64 overflow-hidden">
          <Image
            src={region.image}
            alt={region.name}
            fill
            className="object-cover brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2e2f32] via-black/40 to-transparent" />

          {/* Title overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-[#B03E00] transition-colors">
                {region.name}
              </h3>
              <div className="flex items-center justify-center gap-2 text-[#C0C0C0] group-hover:text-[#B03E00] transition-colors">
                {isOpen ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
                <span className="text-sm uppercase tracking-wider">
                  {isOpen ? 'Close' : 'Explore'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* Expandable content */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-8 space-y-6">
          {/* Description */}
          <p className="text-gray-300 text-lg leading-relaxed">
            {region.description}
          </p>

          {/* Sub-regions */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-[#C0C0C0] border-b border-white/10 pb-2">
              Charter Regions
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {region.subRegions.map((subRegion, idx) => (
                <Link
                  key={idx}
                  href={subRegion.href}
                  className="block p-4 bg-[#3a3b3f] border border-white/20 rounded-xl hover:border-[#B03E00]/50 hover:bg-[#3a3b3f]/80 transition-all group"
                >
                  <h5 className="text-lg font-bold text-[#C0C0C0] mb-2 group-hover:text-[#B03E00] transition-colors">
                    {subRegion.name}
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {subRegion.islands.slice(0, 3).map((island, i) => (
                      <span
                        key={i}
                        className="text-xs text-gray-400 bg-[#2e2f32] px-2 py-1 rounded"
                      >
                        {island}
                      </span>
                    ))}
                    {subRegion.islands.length > 3 && (
                      <span className="text-xs text-gray-400 bg-[#2e2f32] px-2 py-1 rounded">
                        +{subRegion.islands.length - 3} more
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href={region.mainHref}
            className="block w-full bg-[#B03E00] hover:bg-[#B03E00]/90 text-white text-center px-6 py-3 rounded-xl font-medium transition text-lg"
          >
            View All {region.name} Yachts
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DestinationsPageAccordion() {
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
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px]">
        <Image
          src="/images/services-bg.png"
          alt="Yacht Charter Destinations"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-[#1a1b1e]" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-5xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#C0C0C0] tracking-wider">
              LUXURY YACHT CHARTER
              <br />
              BY DESTINATION
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Explore private yacht charter and brokerage services worldwide, tailored to local regulations,
              preferred marinas, and cultural nuances.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Accordion Regions */}
        <div className="space-y-6">
          {destinationRegions.map((region) => (
            <DestinationAccordion
              key={region.id}
              region={region}
              isOpen={openRegions.includes(region.id)}
              onToggle={() => toggleRegion(region.id)}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-[#B03E00]/10 to-[#9333ea]/10 border border-[#B03E00]/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#C0C0C0] mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Browse our complete collection of luxury yachts available for charter in the world's most exclusive destinations.
          </p>
          <Link
            href="/yachts"
            className="inline-block bg-[#B03E00] hover:bg-[#B03E00]/90 text-white px-8 py-4 rounded-xl font-medium transition text-lg"
          >
            Browse All Yachts
          </Link>
        </div>
      </div>
    </div>
  );
}
