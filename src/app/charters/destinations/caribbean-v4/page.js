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
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#bd9973] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="trajan-regular text-white text-sm uppercase tracking-[0.2em] group-hover:text-[#bd9973] transition-colors duration-300">
          {name}
        </h3>
      </div>
    </Link>
  );
}

// ── Ligne décorative dorée ──────────────────────────────────────────────────────
function GoldLine() {
  return <div className="w-16 h-px bg-[#bd9973] mx-auto my-6" />;
}

// ── Page principale ────────────────────────────────────────────────────────────
export default function CaribbeanV4Page() {
  return (
    <div className="bg-[#26272a] text-white overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <div className="relative h-screen">
        <Image
          src="/images/yachts/yatch2.jpeg"
          alt=""
          fill
          priority
          className="object-cover object-top"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(38,39,42,0.92) 0%, rgba(38,39,42,0) 50%, rgba(38,39,42,0.75) 100%)',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-16 z-10">
          <p className="text-[#bd9973] text-xs uppercase tracking-[0.35em] mb-5 font-light">
            Qualityacht — Charter Destinations
          </p>
          <h1 className="trajan-regular text-4xl md:text-6xl lg:text-7xl uppercase tracking-[0.15em] text-white text-center px-4">
            The Caribbean
          </h1>
          <GoldLine />
          <p className="text-white/60 text-sm uppercase tracking-[0.25em] font-light">
            The Ultimate Luxury Yachting Destination
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          DESCRIPTION
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#26272a] py-28 px-6 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#bd9973] text-xs uppercase tracking-[0.35em] mb-3 font-light">Overview</p>
          <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.12em] text-white mb-2">
            Paradise on Water
          </h2>
          <GoldLine />
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
            A paradise of <span className="text-[#bd9973]">turquoise waters</span>,{' '}
            <span className="text-[#bd9973]">powder-white beaches</span>,{' '}
            <span className="text-[#bd9973]">vibrant coral reefs</span>, and{' '}
            <span className="text-[#bd9973]">lush tropical forests</span> — the Caribbean stands as{' '}
            <span className="text-[#bd9973]">the world's premier destination</span> for luxury yacht charters.
          </p>
          <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
            From <span className="text-[#bd9973]">untamed natural beauty</span> and pirate legends of the Leeward and
            Windward Islands to the opulence of <span className="text-[#bd9973]">Michelin-starred restaurants</span> and{' '}
            <span className="text-[#bd9973]">ultra-luxury resorts</span> in St. Martin and St. Barts, the Caribbean
            offers an unparalleled sailing experience.
          </p>
          <p className="text-white/50 text-sm leading-relaxed max-w-xl mx-auto">
            Comprising <span className="text-[#bd9973]">twenty-six countries</span> and over{' '}
            <span className="text-[#bd9973]">seven hundred islands</span> — a mosaic of crystal-clear seas,
            palm-fringed shores, and a rich cultural tapestry blending{' '}
            <span className="text-[#bd9973]">Creole, French, Dutch, and British</span> influences.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BANDEAU PHOTO — cocomer
      ══════════════════════════════════════════════════════════ */}
      <div className="relative h-[55vh] overflow-hidden">
        {/* cocomer -> video beach-band */}
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          src="/media/quality/beach/beach-band.mp4"
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-[0.55] saturate-[0.7]"
          style={{ objectPosition: 'center 40%' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #26272a 0%, transparent 30%, transparent 70%, #26272a 100%)',
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-[#bd9973] text-xs uppercase tracking-[0.35em] mb-4">The Experience</p>
          <p className="trajan-regular text-xl md:text-3xl text-white max-w-2xl leading-relaxed">
            "Where every horizon promises a new discovery"
          </p>
          <GoldLine />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          CARIBBEAN ISLANDS — grille cartes
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#26272a] py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#bd9973] text-xs uppercase tracking-[0.35em] mb-3 font-light">Explore</p>
            <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.12em] text-white mb-2">
              Caribbean Islands
            </h2>
            <GoldLine />
            <p className="text-white/50 text-xs uppercase tracking-[0.15em]">
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
      <div className="relative h-[45vh] overflow-hidden">
        <Image
          src="/images/pagesCaraibes/palmierscaraibes.jpeg"
          alt=""
          fill
          className="object-cover brightness-40 grayscale"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #26272a 0%, transparent 30%, transparent 70%, #26272a 100%)',
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-[#bd9973] text-xs uppercase tracking-[0.35em] mb-4">Popular Anchorages</p>
          <h2 className="trajan-regular text-xl md:text-3xl text-white uppercase tracking-[0.12em]">
            Where to Drop Anchor
          </h2>
          <GoldLine />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          POPULAR DESTINATIONS — grille cartes
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#26272a] py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#bd9973] text-xs uppercase tracking-[0.35em] mb-3 font-light">Anchorages & Marinas</p>
            <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.12em] text-white mb-2">
              Popular Destinations
            </h2>
            <GoldLine />
            <p className="text-white/50 text-xs uppercase tracking-[0.15em]">
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
      <div className="relative h-[70vh] overflow-hidden">
        <Image
          src="/images/pagesCaraibes/st-barth.jpg"
          alt=""
          fill
          className="object-cover brightness-50"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #26272a 0%, transparent 25%, transparent 65%, #26272a 100%)',
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-[#bd9973] text-xs uppercase tracking-[0.35em] mb-5 font-light">Ready to Sail</p>
          <h2 className="trajan-regular text-3xl md:text-5xl text-white uppercase tracking-[0.12em] mb-4 max-w-xl mx-auto leading-tight">
            Plan Your Caribbean Charter
          </h2>
          <GoldLine />
          <p className="text-white/60 text-sm max-w-md mx-auto mb-10 leading-relaxed">
            Our team of experts is available 24/7 to create your bespoke yachting itinerary across the Caribbean.
          </p>
          <Link
            href="/charters"
            className="trajan-regular text-xs uppercase tracking-[0.3em] px-10 py-4 border border-[#bd9973] text-[#bd9973] hover:bg-[#bd9973] hover:text-black transition-all duration-300"
          >
            Explore Yachts
          </Link>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#1e1f22] py-20 px-6 md:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#bd9973] text-xs uppercase tracking-[0.35em] mb-3 font-light">Submit Your Project</p>
          <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.12em] text-white mb-2">
            Contact Our Team
          </h2>
          <GoldLine />
          <p className="text-white/50 text-sm leading-relaxed mb-12 max-w-xl mx-auto">
            Available around the clock for all your enquiries — charter, routing, concierge.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 mb-12">
            <div className="bg-[#1e1f22] p-10 flex flex-col items-center gap-3 hover:bg-[#26272a] transition-colors">
              <p className="text-[#bd9973] text-xs uppercase tracking-[0.3em]">WhatsApp</p>
              <p className="trajan-regular text-white text-lg">+41 76 736 57 81</p>
              <p className="text-white/40 text-xs">Private chat with our team</p>
            </div>
            <div className="bg-[#26272a] p-10 flex flex-col items-center gap-3 hover:bg-[#2e2f32] transition-colors">
              <p className="text-[#bd9973] text-xs uppercase tracking-[0.3em]">Email</p>
              <p className="trajan-regular text-white text-base">info@qualityacht.ch</p>
              <p className="text-white/40 text-xs">Response within 2 hours</p>
            </div>
            <div className="bg-[#1e1f22] p-10 flex flex-col items-center gap-3 hover:bg-[#26272a] transition-colors">
              <p className="text-[#bd9973] text-xs uppercase tracking-[0.3em]">Office</p>
              <p className="trajan-regular text-white text-xl">Zurich</p>
              <p className="text-white/40 text-xs">Open Mon–Sat, 09:00–19:00</p>
            </div>
          </div>

          <Link
            href="/charters"
            className="trajan-regular text-xs uppercase tracking-[0.3em] px-12 py-4 bg-[#bd9973] text-black hover:bg-[#d4b48a] transition-colors duration-300 inline-block"
          >
            Request a Charter
          </Link>
        </div>
      </section>

    </div>
  );
}
