// src/app/charters/destinations/page.js

import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Yacht Charter Destinations | Qualityacht',
  description: 'Explore luxury yacht charter destinations worldwide, tailored to local regulations, preferred marinas, and exclusive experiences.',
};

const destinations = [
  {
    name: 'Caribbean',
    image: '/images/destinations/animals/caraibes.jpg',
    href: '/charters/destinations/caribbean',
  },
  {
    name: 'Mediterranean',
    image: '/images/destinations/animals/Western-Mediterranean.webp',
    href: '/charters/destinations/mediterranean',
  },
  {
    name: 'Bahamas',
    image: '/images/destinations/animals/Bahamas.jpg',
    href: '/charters/destinations/bahamas',
  },
  {
    name: 'South Pacific',
    image: '/images/destinations/animals/Ocean-Pacific.jpeg',
    href: '/charters/destinations/south-pacific',
  },
  {
    name: 'Indian Ocean',
    image: '/images/destinations/animals/Indian-Ocean.jpg',
    href: '/charters/destinations/indian-ocean',
  },
  {
    name: 'South East Asia',
    image: '/images/destinations/animals/SOUTH-EAST-ASIA.jpeg',
    href: '/charters/destinations/south-east-asia',
  },
];

const popularDestinations = [
  {
    name: 'St. Barts',
    image: '/images/destinations/animals/caraibes.jpg',
    href: '/yachts?destination=st-barts',
  },
  {
    name: 'French Riviera',
    image: '/images/destinations/animals/Western-Mediterranean.webp',
    href: '/yachts?destination=french-riviera',
  },
  {
    name: 'Amalfi Coast',
    image: '/images/destinations/animals/Eastern-Mediterranean.jpg',
    href: '/yachts?destination=amalfi-coast',
  },
  {
    name: 'Exumas',
    image: '/images/destinations/animals/Bahamas.jpg',
    href: '/yachts?destination=exumas',
  },
  {
    name: 'Seychelles',
    image: '/images/destinations/animals/Indian-Ocean.jpg',
    href: '/yachts?destination=seychelles',
  },
  {
    name: 'Phuket',
    image: '/images/destinations/animals/SOUTH-EAST-ASIA.jpeg',
    href: '/yachts?destination=phuket',
  },
];

export default function DestinationsPage() {
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
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Introduction */}
        <div className="text-center mb-16">
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore private yacht charter and brokerage services worldwide, tailored to local regulations,
            preferred marinas, and cultural nuances.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-32">
          {destinations.map((destination, index) => (
            <Link
              key={index}
              href={destination.href}
              className="group"
            >
              <div className="relative aspect-square rounded-full overflow-hidden border-2 border-white/20 hover:border-[#B03E00]/50 transition-all duration-300">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover brightness-75 group-hover:brightness-100 group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white font-bold text-center px-4 text-sm md:text-base uppercase tracking-wide group-hover:text-[#B03E00] transition-colors">
                    {destination.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Popular Destinations Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#C0C0C0] mb-6 tracking-wider">
              POPULAR LUXURY YACHT
              <br />
              DESTINATIONS
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Discover our most-requested destinations, offering unique advantages for
              luxury yacht charter travelers.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {popularDestinations.map((destination, index) => (
              <Link
                key={index}
                href={destination.href}
                className="group"
              >
                <div className="relative aspect-square rounded-full overflow-hidden border-2 border-white/20 hover:border-[#B03E00]/50 transition-all duration-300">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover brightness-75 group-hover:brightness-100 group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white font-bold text-center px-4 text-sm md:text-base uppercase tracking-wide group-hover:text-[#B03E00] transition-colors">
                      {destination.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Destinations Section */}
        <div className="bg-gradient-to-r from-[#B03E00]/10 to-[#9333ea]/10 border border-[#B03E00]/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#C0C0C0] mb-6">
            Explore All Destinations
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            From the Mediterranean to the South Pacific, discover our complete collection of luxury yacht charter destinations.
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
