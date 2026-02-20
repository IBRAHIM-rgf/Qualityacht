'use client';

import Image from 'next/image';
import Link from 'next/link';

// ── Données ────────────────────────────────────────────────────────────────────
const caribbeanIslands = [
  { name: 'St. Barts',   image: '/images/destinations/animals/caraibes.jpg',                    href: '/yachts?destination=st-barts' },
  { name: 'St. Martin',  image: '/images/destinations/destnation-feature-caribbean.webp',        href: '/yachts?destination=st-martin' },
  { name: 'Antigua',     image: '/images/destinations/animals/Bahamas.jpg',                      href: '/yachts?destination=antigua' },
  { name: 'BVI',         image: '/images/yachts/yatch2.jpeg',                                    href: '/yachts?destination=bvi' },
  { name: 'West Med',    image: '/images/destinations/destnation-feature-west-med.webp',          href: '/yachts?destination=west-med' },
  { name: 'USVI',        image: '/images/destinations/destnation-feature-south-pacific.webp',     href: '/yachts?destination=usvi' },
  { name: 'Bahamas',     image: '/images/destinations/animals/Ocean-Pacific.jpeg',               href: '/yachts?destination=bahamas' },
  { name: 'Martinique',  image: '/images/destinations/destnation-feature-east-med.webp',          href: '/yachts?destination=martinique' },
];

const popularDestinations = [
  { name: 'Gustavia',        image: '/images/destinations/destnation-feature-indian-ocean.webp',    href: '/yachts?destination=gustavia' },
  { name: 'Marigot',         image: '/images/destinations/animals/caraibes.jpg',                    href: '/yachts?destination=marigot' },
  { name: 'English Harbour', image: '/images/destinations/destnation-feature-east-med.webp',        href: '/yachts?destination=english-harbour' },
  { name: 'Tortola',         image: '/images/destinations/animals/Bahamas.jpg',                     href: '/yachts?destination=tortola' },
  { name: 'St. John',        image: '/images/destinations/destnation-feature-caribbean.webp',       href: '/yachts?destination=st-john' },
  { name: 'Nassau',          image: '/images/destinations/destnation-feature-south-east-asia.webp', href: '/yachts?destination=nassau' },
  { name: 'Grand Cayman',    image: '/images/destinations/destnation-feature-west-med.webp',        href: '/yachts?destination=grand-cayman' },
  { name: 'Barbados',        image: '/images/destinations/destnation-feature-south-pacific.webp',   href: '/yachts?destination=barbados' },
];

// ── Carte destination ──────────────────────────────────────────────────────────
function DestCard({ name, image, href }) {
  return (
    <Link href={href} className="group relative overflow-hidden block" style={{ height: '280px' }}>
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover brightness-70 grayscale group-hover:brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#c2622a] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="trajan-regular text-[#acb0cd] text-sm uppercase tracking-[0.2em] group-hover:text-[#c2622a] transition-colors duration-300">
          {name}
        </h3>
      </div>
    </Link>
  );
}

// ── Trait orange brûlé ─────────────────────────────────────────────────────────
function BurntLine() {
  return <div className="w-16 h-px bg-[#c2622a] mx-auto my-6" />;
}

// ── Page principale ────────────────────────────────────────────────────────────
export default function CaribbeanV5Page() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <div className="relative h-screen">
        <Image
          src="/images/yachts/yatch2.jpeg"
          alt=""
          fill
          priority
          className="object-cover object-bottom"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(38,39,42,0.85) 0%, rgba(38,39,42,0) 40%, rgba(38,39,42,0.85) 100%)',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-16 z-10">
          <h1 className="trajan-regular text-4xl md:text-6xl lg:text-7xl uppercase tracking-[0.15em] text-[#acb0cd] text-center px-4">
            The Caribbean
          </h1>
          <BurntLine />
          <p className="text-[#acb0cd] text-sm uppercase tracking-[0.25em] font-light">
            The Ultimate Luxury Yachting Destination
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          DESCRIPTION — texte complet v3
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#26272a] py-28 px-6 md:px-20">
        <div className="max-w-4xl mx-auto text-center leading-relaxed space-y-6">
          <p className="text-xl text-[#acb0cd]">
            A paradise of <span className="text-[#d39478] font-semibold">turquoise waters</span>,{' '}
            <span className="text-[#d39478] font-semibold">powder-white beaches</span>,{' '}
            <span className="text-[#d39478] font-semibold">vibrant coral reefs</span>, and{' '}
            <span className="text-[#d39478] font-semibold">lush tropical forests</span>,
            the Caribbean stands as{' '}
            <span className="text-[#d39478] font-semibold">the world's premier destination</span> for luxury yacht charters.
          </p>
          <p className="text-lg max-w-3xl mx-auto text-[#acb0cd]">
            From <span className="text-[#d39478] font-semibold">untamed natural beauty</span> and pirate legends of the Leeward and Windward Islands to the opulence
            of <span className="text-[#d39478] font-semibold">Michelin-starred restaurants</span> and{' '}
            <span className="text-[#d39478] font-semibold">ultra-luxury resorts</span> in St. Martin and St. Barts, the Caribbean
            offers an unparalleled sailing experience.
          </p>
          <p className="text-lg max-w-2xl mx-auto text-[#acb0cd]">
            Comprising <span className="text-[#d39478] font-semibold">twenty-six countries</span> and over{' '}
            <span className="text-[#d39478] font-semibold">seven hundred islands</span>, cays, and islets—including the Greater
            and Lesser Antilles—the Caribbean is a mosaic of crystal-clear seas, palm-fringed shores, and a rich
            cultural tapestry blending <span className="text-[#d39478] font-semibold">Creole, French, Dutch, and British</span> influences.
          </p>
          <p className="text-base max-w-xl mx-auto text-[#acb0cd]">
            For discerning clients seeking the finest in yacht charters, the Caribbean delivers a seamless blend
            of exclusivity and adventure. Whether it's the glamour of{' '}
            <span className="text-[#d39478] font-semibold">Turks and Caicos</span>, the sophistication of{' '}
            <span className="text-[#d39478] font-semibold">St. Barts</span>, or{' '}
            <span className="text-[#d39478] font-semibold">private island resorts accessible only by sea</span>, this region promises an elite escape
            where every moment is crafted for the extraordinary.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BANDEAU PHOTO — cocomer
      ══════════════════════════════════════════════════════════ */}
      <div className="relative h-[70vh] overflow-hidden">
        <Image
          src="/images/pagesCaraibes/cocomer.jpeg"
          alt=""
          fill
          className="object-cover brightness-40 grayscale"
          style={{ objectPosition: 'center 40%' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #26272a 0%, transparent 20%, transparent 60%, #26272a 100%)',
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-[#c2622a] text-xs uppercase tracking-[0.35em] mb-4">The Experience</p>
          <p className="trajan-regular text-xl md:text-3xl text-[#acb0cd] max-w-2xl leading-relaxed">
            "Where every horizon promises a new discovery"
          </p>
          <BurntLine />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          CARIBBEAN ISLANDS — grille cartes
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#26272a] py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#c2622a] text-xs uppercase tracking-[0.35em] mb-3 font-light">Explore</p>
            <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.12em] text-[#acb0cd] mb-2">
              Caribbean Islands
            </h2>
            <BurntLine />
            <p className="text-[#acb0cd]/50 text-xs uppercase tracking-[0.15em]">
              The most sought-after islands for luxury yacht charters
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {caribbeanIslands.map((island, i) => (
              <DestCard key={i} {...island} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BANDEAU PHOTO — palmiers
      ══════════════════════════════════════════════════════════ */}
      <div className="relative h-[65vh] overflow-hidden">
        <Image
          src="/images/pagesCaraibes/palmierscaraibes.jpeg"
          alt=""
          fill
          className="object-cover brightness-40 grayscale"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #26272a 0%, transparent 20%, transparent 60%, #26272a 100%)',
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-[#c2622a] text-xs uppercase tracking-[0.35em] mb-4">Popular Anchorages</p>
          <h2 className="trajan-regular text-xl md:text-3xl text-[#acb0cd] uppercase tracking-[0.12em]">
            Where to Drop Anchor
          </h2>
          <BurntLine />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          POPULAR DESTINATIONS — grille cartes
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#26272a] py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#c2622a] text-xs uppercase tracking-[0.35em] mb-3 font-light">Anchorages & Marinas</p>
            <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.12em] text-[#acb0cd] mb-2">
              Popular Destinations
            </h2>
            <BurntLine />
            <p className="text-[#acb0cd]/50 text-xs uppercase tracking-[0.15em]">
              The most exclusive marinas and anchorages in the Caribbean
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {popularDestinations.map((dest, i) => (
              <DestCard key={i} {...dest} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BANDEAU PHOTO — st-barth + CTA
      ══════════════════════════════════════════════════════════ */}
      <div className="relative h-[75vh] overflow-hidden">
        <Image
          src="/images/pagesCaraibes/st-barth.jpg"
          alt=""
          fill
          className="object-cover brightness-50"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #26272a 0%, transparent 20%, transparent 60%, #26272a 100%)',
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-[#c2622a] text-xs uppercase tracking-[0.35em] mb-5 font-light">Ready to Sail</p>
          <h2 className="trajan-regular text-3xl md:text-5xl text-[#acb0cd] uppercase tracking-[0.12em] mb-4 max-w-xl mx-auto leading-tight">
            Plan Your Caribbean Charter
          </h2>
          <BurntLine />
          <p className="text-[#acb0cd]/60 text-sm max-w-md mx-auto mb-10 leading-relaxed">
            Our team of experts is available 24/7 to create your bespoke yachting itinerary across the Caribbean.
          </p>
          <Link
            href="/charters"
            className="trajan-regular text-xs uppercase tracking-[0.3em] px-10 py-4 border border-[#c2622a] text-[#c2622a] hover:bg-[#c2622a] hover:text-white transition-all duration-300"
          >
            Explore Yachts
          </Link>
        </div>
      </div>

    </div>
  );
}
