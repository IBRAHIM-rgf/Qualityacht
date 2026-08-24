'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

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

// ── Hook animation au scroll ───────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ── Carte destination ──────────────────────────────────────────────────────────
function DestCard({ name, image, href }) {
  const [lit, setLit] = useState(false);
  const timerRef = useRef(null);

  function activate() {
    clearTimeout(timerRef.current);
    setLit(true);
  }
  function deactivate() {
    timerRef.current = setTimeout(() => setLit(false), 1500);
  }
  function handleClick(e) {
    e.preventDefault();
    clearTimeout(timerRef.current);
    setLit(true);
    setTimeout(() => { window.location.href = href; }, 900);
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onTouchStart={activate}
      onTouchEnd={deactivate}
      className="relative overflow-hidden block cursor-pointer h-[220px] md:h-[280px]"
    >
      <Image
        src={image}
        alt={name}
        fill
        className={`object-cover transition-all duration-700 ${lit ? 'brightness-90 grayscale-0 scale-105' : 'brightness-70 grayscale scale-100'}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-[#c2622a] transition-opacity duration-500 ${lit ? 'opacity-100' : 'opacity-0'}`} />
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5">
        <h3 className={`trajan-regular text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] transition-colors duration-300 ${lit ? 'text-[#c2622a]' : 'text-[#acb0cd]'}`}>
          {name}
        </h3>
      </div>
    </a>
  );
}

// ── Trait orange brûlé ─────────────────────────────────────────────────────────
function BurntLine() {
  return <div className="w-12 md:w-16 h-px bg-[#c2622a] mx-auto my-4 md:my-6" />;
}

// ── Bloc titre animé ───────────────────────────────────────────────────────────
function RevealBlock({ label, title, sub }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="text-center mb-10 md:mb-14 reveal-up">
      <p className="text-[#c2622a] text-[10px] md:text-xs uppercase tracking-[0.3em] mb-3 font-light">{label}</p>
      <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] md:tracking-[0.12em] text-[#acb0cd] mb-2">{title}</h2>
      <BurntLine />
      {sub && <p className="text-[#acb0cd]/50 text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.15em] px-4">{sub}</p>}
    </div>
  );
}

// ── Bloc bandeau animé ─────────────────────────────────────────────────────────
function RevealBandeau({ label, children }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6 reveal-up">
      <p className="text-[#c2622a] text-[10px] md:text-xs uppercase tracking-[0.3em] mb-3 md:mb-4">{label}</p>
      {children}
      <BurntLine />
    </div>
  );
}

// ── Page principale ────────────────────────────────────────────────────────────
export default function CaribbeanV5Page() {
  const heroRef = useRef(null);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    requestAnimationFrame(() => { el.classList.add('revealed'); });
  }, []);

  return (
    <>
      <style>{`
        .reveal-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 2.8s ease, transform 2.8s ease;
        }
        .reveal-up.revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

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
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-10 md:pb-16 z-10 px-4">
            <div ref={heroRef} className="reveal-up flex flex-col items-center w-full">
              <h1 className="trajan-regular text-3xl md:text-6xl lg:text-7xl uppercase tracking-[0.1em] md:tracking-[0.15em] text-[#acb0cd] text-center">
                The Caribbean
              </h1>
              <BurntLine />
              <p className="text-[#acb0cd] text-[10px] md:text-sm uppercase tracking-[0.15em] md:tracking-[0.25em] font-light text-center">
                The Ultimate Luxury Yachting Destination
              </p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            DESCRIPTION
        ══════════════════════════════════════════════════════════ */}
        <section className="bg-[#26272a] py-14 md:py-28 px-5 md:px-20">
          <div className="max-w-4xl mx-auto text-center leading-relaxed space-y-5 md:space-y-6">
            <p className="text-base md:text-xl text-[#acb0cd]">
              A paradise of <span className="text-[#bd9973] font-semibold">turquoise waters</span>,{' '}
              <span className="text-[#bd9973] font-semibold">powder-white beaches</span>,{' '}
              <span className="text-[#bd9973] font-semibold">vibrant coral reefs</span>, and{' '}
              <span className="text-[#bd9973] font-semibold">lush tropical forests</span>,
              the Caribbean stands as{' '}
              <span className="text-[#bd9973] font-semibold">the world's premier destination</span> for luxury yacht charters.
            </p>
            <p className="text-sm md:text-lg max-w-3xl mx-auto text-[#acb0cd]">
              From <span className="text-[#bd9973] font-semibold">untamed natural beauty</span> and pirate legends of the Leeward and Windward Islands to the opulence
              of <span className="text-[#bd9973] font-semibold">Michelin-starred restaurants</span> and{' '}
              <span className="text-[#bd9973] font-semibold">ultra-luxury resorts</span> in St. Martin and St. Barts, the Caribbean
              offers an unparalleled sailing experience.
            </p>
            <p className="text-sm md:text-lg max-w-2xl mx-auto text-[#acb0cd]">
              Comprising <span className="text-[#bd9973] font-semibold">twenty-six countries</span> and over{' '}
              <span className="text-[#bd9973] font-semibold">seven hundred islands</span>, cays, and islets—including the Greater
              and Lesser Antilles—the Caribbean is a mosaic of crystal-clear seas, palm-fringed shores, and a rich
              cultural tapestry blending <span className="text-[#bd9973] font-semibold">Creole, French, Dutch, and British</span> influences.
            </p>
            <p className="text-xs md:text-base max-w-xl mx-auto text-[#acb0cd]">
              For discerning clients seeking the finest in yacht charters, the Caribbean delivers a seamless blend
              of exclusivity and adventure. Whether it's the glamour of{' '}
              <span className="text-[#bd9973] font-semibold">Turks and Caicos</span>, the sophistication of{' '}
              <span className="text-[#bd9973] font-semibold">St. Barts</span>, or{' '}
              <span className="text-[#bd9973] font-semibold">private island resorts accessible only by sea</span>, this region promises an elite escape
              where every moment is crafted for the extraordinary.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            BANDEAU — cocomer
        ══════════════════════════════════════════════════════════ */}
        <div className="relative h-[45vh] md:h-[70vh] overflow-hidden">
          {/* cocomer -> video beach-band */}
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            src="/media/quality/beach/beach-band.mp4"
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover brightness-[0.55] saturate-[0.7]"
            style={{ objectPosition: 'center 40%' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #26272a 0%, transparent 20%, transparent 60%, #26272a 100%)' }} />
          <RevealBandeau label="The Experience">
            <p className="trajan-regular text-base md:text-3xl text-[#acb0cd] max-w-xs md:max-w-2xl leading-relaxed px-2">
              "Where every horizon promises a new discovery"
            </p>
          </RevealBandeau>
        </div>

        {/* ══════════════════════════════════════════════════════════
            CARIBBEAN ISLANDS
        ══════════════════════════════════════════════════════════ */}
        <section className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16">
          <div className="max-w-7xl mx-auto">
            <RevealBlock
              label="Explore"
              title="Caribbean Islands"
              sub="The most sought-after islands for luxury yacht charters"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
              {caribbeanIslands.map((island, i) => (
                <DestCard key={i} {...island} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            BANDEAU — palmiers
        ══════════════════════════════════════════════════════════ */}
        <div className="relative h-[40vh] md:h-[65vh] overflow-hidden">
          <Image
            src="/images/pagesCaraibes/palmierscaraibes.jpeg"
            alt=""
            fill
            className="object-cover brightness-40 grayscale"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #26272a 0%, transparent 20%, transparent 60%, #26272a 100%)' }} />
          <RevealBandeau label="Popular Anchorages">
            <h2 className="trajan-regular text-base md:text-3xl text-[#acb0cd] uppercase tracking-[0.08em] md:tracking-[0.12em]">
              Where to Drop Anchor
            </h2>
          </RevealBandeau>
        </div>

        {/* ══════════════════════════════════════════════════════════
            POPULAR DESTINATIONS
        ══════════════════════════════════════════════════════════ */}
        <section className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16">
          <div className="max-w-7xl mx-auto">
            <RevealBlock
              label="Anchorages & Marinas"
              title="Popular Destinations"
              sub="The most exclusive marinas and anchorages in the Caribbean"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
              {popularDestinations.map((dest, i) => (
                <DestCard key={i} {...dest} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            BANDEAU — st-barth + CTA
        ══════════════════════════════════════════════════════════ */}
        <div className="relative h-[55vh] md:h-[75vh] overflow-hidden">
          <Image
            src="/images/pagesCaraibes/st-barth.jpg"
            alt=""
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #26272a 0%, transparent 20%, transparent 60%, #26272a 100%)' }} />
          <RevealBandeau label="Ready to Sail">
            <h2 className="trajan-regular text-xl md:text-5xl text-[#acb0cd] uppercase tracking-[0.08em] md:tracking-[0.12em] mb-3 md:mb-4 max-w-xs md:max-w-xl mx-auto leading-tight">
              Plan Your Caribbean Charter
            </h2>
            <p className="text-[#acb0cd]/60 text-xs md:text-sm max-w-xs md:max-w-md mx-auto mb-5 md:mb-6 leading-relaxed">
              Our team of experts is available 24/7 to create your bespoke yachting itinerary across the Caribbean.
            </p>
            <Link
              href="/charters"
              className="trajan-regular text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] px-7 md:px-10 py-3 md:py-4 border border-[#c2622a] text-[#c2622a] hover:bg-[#c2622a] hover:text-white transition-all duration-300"
            >
              Explore Yachts
            </Link>
          </RevealBandeau>
        </div>

      </div>
    </>
  );
}
