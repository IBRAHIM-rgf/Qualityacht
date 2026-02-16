// src/app/charters/destinations/caribbean/page.js

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, MapPin, Anchor, Compass } from 'lucide-react';

export const metadata = {
  title: 'Caribbean Yacht Charters | Qualityacht',
  description: 'Discover the ultimate luxury yachting destination. From St. Barts to Turks and Caicos, explore the Caribbean\'s premier islands with Qualityacht.',
};

const caribbeanRegions = [
  {
    name: 'Leeward Islands',
    islands: ['Antigua & Barbuda', 'St. Martin/St. Maarten', 'St. Barts', 'Anguilla', 'British Virgin Islands', 'US Virgin Islands'],
    description: 'The crown jewels of Caribbean yachting, offering world-class marinas, exclusive resorts, and pristine sailing conditions.',
    image: '/images/destinations/destnation-feature-caribbean.webp',
  },
  {
    name: 'Windward Islands',
    islands: ['St. Lucia', 'Martinique', 'Dominica', 'Grenada', 'St. Vincent & the Grenadines'],
    description: 'Dramatic volcanic landscapes, lush rainforests, and authentic Caribbean culture await in these enchanting islands.',
    image: '/images/destinations/destnation-feature-south-pacific.webp',
  },
  {
    name: 'Greater Antilles',
    islands: ['Jamaica', 'Cayman Islands', 'Cuba', 'Turks & Caicos'],
    description: 'From the glamour of the Caymans to pristine beaches of Turks & Caicos, experience Caribbean luxury at its finest.',
    image: '/images/destinations/destnation-feature-north-america.webp',
  },
  {
    name: 'The Bahamas',
    islands: ['Nassau', 'Exumas', 'Abacos', 'Eleuthera', 'Harbor Island'],
    description: 'Crystal-clear waters, secluded cays, and exclusive island resorts define the Bahamian yachting experience.',
    image: '/images/destinations/animals/Bahamas.jpg',
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

export default function CaribbeanPage() {
  return (
    <div className="min-h-screen bg-[#1a1b1e]">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[500px]">
        <Image
          src="/images/destinations/animals/caraibes.jpg"
          alt="Caribbean Luxury Yacht Charter"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#1a1b1e]" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#C0C0C0]">
              The Caribbean
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light">
              The Ultimate Luxury Yachting Destination
            </p>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="absolute bottom-8 left-8">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Link href="/" className="hover:text-[#B03E00] transition">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/charters/destinations" className="hover:text-[#B03E00] transition">Destinations</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#B03E00]">Caribbean</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Description */}
        <div className="prose prose-invert prose-lg max-w-none mb-20">
          <div className="text-[#C0C0C0] leading-relaxed space-y-6">
            <p className="text-xl">
              A paradise of turquoise waters, powder-white beaches, vibrant coral reefs, and lush tropical forests,
              the Caribbean stands as the world's premier destination for luxury yacht charters.
            </p>

            <p className="text-lg text-gray-300">
              From untamed natural beauty and pirate legends of the Leeward and Windward Islands to the opulence
              of Michelin-starred restaurants and ultra-luxury resorts in St. Martin and St. Barts, the Caribbean
              offers an unparalleled sailing experience.
            </p>

            <p className="text-lg text-gray-300">
              Comprising twenty-six countries and over seven hundred islands, cays, and islets—including the Greater
              and Lesser Antilles—the Caribbean is a mosaic of crystal-clear seas, palm-fringed shores, and a rich
              cultural tapestry blending Creole, French, Dutch, and British influences.
            </p>

            <p className="text-lg text-gray-300">
              For discerning clients seeking the finest in yacht charters, the Caribbean delivers a seamless blend
              of exclusivity and adventure. Whether it's the glamour of Turks and Caicos, the sophistication of
              St. Barts, or private island resorts accessible only by sea, this region promises an elite escape
              where every moment is crafted for the extraordinary.
            </p>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-[#2e2f32] border border-white/10 rounded-2xl p-8 text-center hover:border-[#B03E00]/30 transition-all"
            >
              <highlight.icon className="w-12 h-12 text-[#B03E00] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#C0C0C0] mb-2">{highlight.title}</h3>
              <p className="text-gray-400">{highlight.description}</p>
            </div>
          ))}
        </div>

        {/* Regions */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-[#C0C0C0] mb-12 text-center">
            Explore Caribbean Regions
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caribbeanRegions.map((region, index) => (
              <div
                key={index}
                className="bg-[#2e2f32] border border-white/10 rounded-2xl overflow-hidden hover:border-[#B03E00]/30 transition-all group"
              >
                <div className="relative h-64">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2e2f32] via-transparent to-transparent z-10" />
                  <Image
                    src={region.image}
                    alt={region.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[#C0C0C0] mb-4 group-hover:text-[#B03E00] transition">
                    {region.name}
                  </h3>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {region.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {region.islands.map((island, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-[#3a3b3f] border border-white/20 rounded-lg text-sm text-gray-300"
                      >
                        {island}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/yachts?destination=${region.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-2 text-[#B03E00] hover:text-[#B03E00]/80 transition font-medium"
                  >
                    View Available Yachts
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#B03E00]/10 to-[#9333ea]/10 border border-[#B03E00]/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#C0C0C0] mb-6">
            Ready to Explore the Caribbean?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
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
