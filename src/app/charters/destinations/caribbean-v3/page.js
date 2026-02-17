// src/app/charters/destinations/caribbean-v2/page.js
// VERSION MIXTE : Hero + Description + Cercles îles + Accordéons régions

'use client';

import Image from 'next/image';
import Link from 'next/link';

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

export default function CaribbeanV3Page() {
  return (
    <div className="bg-black">

      {/* ── BLOC IMAGE 1 : yatch2.jpeg ── */}
      <div className="relative h-screen">
        <Image
          src="/images/yachts/yatch2.jpeg"
          alt=""
          fill
          className="object-cover object-top brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
        {/* Flou de transition bas */}
        <div className="absolute bottom-0 left-0 right-0 h-32 backdrop-blur-md bg-gradient-to-b from-transparent to-black" />
        {/* Titre en bas de l'image, juste avant la transition */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center z-10 pb-2">
          <div className="text-center px-4 max-w-4xl mb-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-[#acb0cd]">
              The Caribbean
            </h1>
            <p className="text-xl md:text-2xl text-[#acb0cd] font-light">
              The Ultimate Luxury Yachting Destination
            </p>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>
      </div> {/* fin bloc image 1 */}

      {/* ── BLOC IMAGE 2 : cocomer.jpeg + texte description dessus ── */}
      <div className="relative">
        {/* Image sticky */}
        <div className="sticky top-0 h-screen overflow-hidden -z-0">
          <Image
            src="/images/pagesCaraibes/cocomer.jpeg"
            alt=""
            fill
            className="object-cover brightness-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black" />
          <div className="absolute inset-0 bg-gray-700/30" />
          <div className="absolute bottom-0 left-0 right-0 h-32 backdrop-blur-md bg-gradient-to-b from-transparent to-black" />
        </div>
        {/* Texte description qui défile par-dessus */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-24 text-center leading-relaxed space-y-6" style={{ marginTop: '-100vh' }}>
          <p className="text-xl text-[#acb0cd]">
            A paradise of <span className="text-[#d39478] font-semibold">turquoise waters</span>, <span className="text-[#d39478] font-semibold">powder-white beaches</span>, <span className="text-[#d39478] font-semibold">vibrant coral reefs</span>, and <span className="text-[#d39478] font-semibold">lush tropical forests</span>,
            the Caribbean stands as <span className="text-[#d39478] font-semibold">the world's premier destination</span> for luxury yacht charters.
          </p>
          <p className="text-lg max-w-3xl mx-auto text-[#acb0cd]">
            From <span className="text-[#d39478] font-semibold">untamed natural beauty</span> and pirate legends of the Leeward and Windward Islands to the opulence
            of <span className="text-[#d39478] font-semibold">Michelin-starred restaurants</span> and <span className="text-[#d39478] font-semibold">ultra-luxury resorts</span> in St. Martin and St. Barts, the Caribbean
            offers an unparalleled sailing experience.
          </p>
          <p className="text-lg max-w-2xl mx-auto text-[#acb0cd]">
            Comprising <span className="text-[#d39478] font-semibold">twenty-six countries</span> and over <span className="text-[#d39478] font-semibold">seven hundred islands</span>, cays, and islets—including the Greater
            and Lesser Antilles—the Caribbean is a mosaic of crystal-clear seas, palm-fringed shores, and a rich
            cultural tapestry blending <span className="text-[#d39478] font-semibold">Creole, French, Dutch, and British</span> influences.
          </p>
          <p className="text-base max-w-xl mx-auto text-[#acb0cd]">
            For discerning clients seeking the finest in yacht charters, the Caribbean delivers a seamless blend
            of exclusivity and adventure. Whether it's the glamour of <span className="text-[#d39478] font-semibold">Turks and Caicos</span>, the sophistication of
            <span className="text-[#d39478] font-semibold"> St. Barts</span>, or <span className="text-[#d39478] font-semibold">private island resorts accessible only by sea</span>, this region promises an elite escape
            where every moment is crafted for the extraordinary.
          </p>
        </div>
      </div>

      {/* ── BLOC IMAGE 3 : palmierscaraibes.jpeg + cercles îles dessus ── */}
      <div className="relative">
        {/* Image sticky */}
        <div className="sticky top-0 h-screen overflow-hidden -z-0">
          <Image
            src="/images/pagesCaraibes/palmierscaraibes.jpeg"
            alt=""
            fill
            className="object-cover brightness-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black" />
          <div className="absolute inset-0 bg-gray-700/30" />
          <div className="absolute bottom-0 left-0 right-0 h-32 backdrop-blur-md bg-gradient-to-b from-transparent to-black" />
        </div>
        {/* Cercles îles + destinations + accordéons par-dessus */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24" style={{ marginTop: '-100vh' }}>

        {/* Îles des Caraïbes - Cercles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#acb0cd] mb-4 text-center tracking-wider">
            CARIBBEAN ISLANDS
          </h2>
          <p className="text-center text-[#acb0cd] mb-8 max-w-2xl mx-auto">
            Discover the most sought-after islands for luxury yacht charters
          </p>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-6">
            {caribbeanIslands.map((island, index) => (
              <Link
                key={index}
                href={island.href}
                className="group flex flex-col items-center shrink-0 min-w-[6rem] snap-center"
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
                <h3 className="w-full text-[#acb0cd] font-bold text-center text-sm md:text-base uppercase tracking-wide group-hover:text-[#B03E00] transition-colors">
                  {island.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Destinations Populaires - Cercles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#acb0cd] mb-4 text-center tracking-wider">
            POPULAR DESTINATIONS
          </h2>
          <p className="text-center text-[#acb0cd] mb-8 max-w-2xl mx-auto">
            The most exclusive marinas and anchorages in the Caribbean
          </p>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-6">
            {popularDestinations.map((destination, index) => (
              <Link
                key={index}
                href={destination.href}
                className="group flex flex-col items-center shrink-0 min-w-[6rem] snap-center"
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
                <h3 className="w-full text-[#acb0cd] font-bold text-center text-sm md:text-base uppercase tracking-wide group-hover:text-[#B03E00] transition-colors">
                  {destination.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        </div> {/* fin contenu z-10 par-dessus image 3 */}
      </div> {/* fin bloc image 3 */}

    </div>
  );
}
