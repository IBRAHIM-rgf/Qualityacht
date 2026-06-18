'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// ── Données rectangles (7 items : 4 + 3 centré) ───────────────────────────────
const caribbeanIslands = [
  { name: 'Greater Antilles',   image: '/images/destinations/destnation-feature-caribbean.webp',       href: '/yachts?destination=greater-antilles' },
  { name: 'Leeward Islands',    image: '/images/destinations/destnation-feature-indian-ocean.webp',    href: '/yachts?destination=leeward-islands' },
  { name: 'Leeward Antilles',   image: '/images/destinations/animals/caraibes.jpg',                    href: '/yachts?destination=leeward-antilles' },
  { name: 'Windward Islands',   image: '/images/destinations/destnation-feature-east-med.webp',        href: '/yachts?destination=windward-islands' },
  { name: 'Turks & Caicos',     image: '/images/destinations/destnation-feature-south-east-asia.webp', href: '/yachts?destination=turks-caicos' },
  { name: 'Trinidad & Tobago',  image: '/images/destinations/animals/Bahamas.jpg',                     href: '/yachts?destination=trinidad-tobago' },
  { name: 'Grand Cayman',       image: '/images/destinations/destnation-feature-west-med.webp',        href: '/yachts?destination=grand-cayman' },
];

// ── Groupes accordéon ──────────────────────────────────────────────────────────
const islandGroups = [
  {
    id: 1, name: 'Greater Antilles',
    islands: ['Cuba', 'Hispaniola', 'Jamaica', 'Puerto Rico'],
  },
  {
    id: 2, name: 'Leeward Islands',
    islands: ['Anguilla', 'Saint-Martin / Sint Maarten', 'Saint-Barthélemy', 'Saba & Saint-Eustache', 'Saint-Kitts & Nevis', 'Antigua & Barbuda', 'Montserrat', 'Guadeloupe'],
  },
  {
    id: 3, name: 'Leeward Antilles',
    islands: ['Aruba', 'Bonaire', 'Curaçao'],
  },
  {
    id: 4, name: 'Windward Islands',
    islands: ['Dominica', 'Martinique', 'Saint Lucia', 'Saint Vincent & the Grenadines', 'Mustique', 'Canouan', 'Bequia', 'Tobago Cays', 'Grenada', 'Carriacou', 'Barbados'],
  },
  {
    id: 5, name: 'Turks & Caicos',
    islands: ['Providenciales', 'Grand Turk', 'South Caicos', 'West Caicos'],
  },
  {
    id: 6, name: 'Trinidad & Tobago',
    islands: ['Trinidad', 'Tobago'],
  },
  {
    id: 7, name: 'Emerging Destinations',
    islands: ['Barbuda', 'Petite Martinique', 'Redonda', 'Aves Island', 'Sombrero Island'],
  },
];

// ── Données cercles ────────────────────────────────────────────────────────────
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

// ── Hook reveal ────────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ── Carte rectangulaire ────────────────────────────────────────────────────────
function DestCard({ name, image, href }) {
  const [lit, setLit] = useState(false);
  const timerRef = useRef(null);
  function activate() { clearTimeout(timerRef.current); setLit(true); }
  function deactivate() { timerRef.current = setTimeout(() => setLit(false), 1500); }
  function handleClick(e) {
    e.preventDefault(); clearTimeout(timerRef.current); setLit(true);
    setTimeout(() => { window.location.href = href; }, 900);
  }
  return (
    <a href={href} onClick={handleClick} onMouseEnter={activate} onMouseLeave={deactivate}
      onTouchStart={activate} onTouchEnd={deactivate}
      className="relative overflow-hidden block cursor-pointer h-[220px] md:h-[280px]">
      <Image src={image} alt={name} fill
        className={`object-cover transition-all duration-700 ${lit ? 'brightness-90 grayscale-0 scale-105' : 'brightness-70 grayscale scale-100'}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-[#c2622a] transition-opacity duration-500 ${lit ? 'opacity-100' : 'opacity-0'}`} />
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5">
        <h3 className={`trajan-regular text-xs md:text-sm uppercase tracking-[0.15em] transition-colors duration-300 ${lit ? 'text-[#c2622a]' : 'text-[#acb0cd]'}`}>
          {name}
        </h3>
      </div>
    </a>
  );
}

// ── Cercle ─────────────────────────────────────────────────────────────────────
function CircleCard({ name, image, href }) {
  const [lit, setLit] = useState(false);
  const timerRef = useRef(null);
  function activate() { clearTimeout(timerRef.current); setLit(true); }
  function deactivate() { timerRef.current = setTimeout(() => setLit(false), 1500); }
  function handleClick(e) {
    e.preventDefault(); clearTimeout(timerRef.current); setLit(true);
    setTimeout(() => { window.location.href = href; }, 900);
  }
  return (
    <a href={href} onClick={handleClick} onMouseEnter={activate} onMouseLeave={deactivate}
      onTouchStart={activate} onTouchEnd={deactivate}
      className="flex flex-col items-center shrink-0 snap-center cursor-pointer" style={{ width: '130px' }}>
      <div className={`relative w-[110px] h-[110px] md:w-[130px] md:h-[130px] rounded-full overflow-hidden border-2 transition-all duration-300 ${lit ? 'border-[#c2622a]/70 scale-105' : 'border-white/20'}`}>
        <Image src={image} alt={name} fill className={`object-cover transition-all duration-500 ${lit ? 'brightness-100 grayscale-0 scale-110' : 'brightness-75 grayscale'}`} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />
        <div className="absolute inset-0 flex items-end justify-center pb-3 px-1">
          <h3 className={`trajan-regular text-[9px] md:text-[10px] font-bold text-center uppercase tracking-wide transition-colors duration-300 leading-tight ${lit ? 'text-[#c2622a]' : 'text-white'}`}>{name}</h3>
        </div>
      </div>
    </a>
  );
}

// ── Accordéon groupe ───────────────────────────────────────────────────────────
function IslandGroup({ group, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen || false);
  return (
    <div className="border-b border-white/10">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-4 text-left group">
        <div className="text-center">
          <span className="trajan-regular text-[#acb0cd] text-xs md:text-sm uppercase tracking-[0.2em] group-hover:text-[#c2622a] transition-colors duration-300">
            {group.name}
          </span>
          <div className="w-6 h-[2px] bg-[#c2622a] mt-2 mx-auto" />
        </div>
        <span className={`text-[#c2622a] transition-transform duration-300 text-2xl leading-none ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="pb-5 flex flex-wrap gap-x-5 gap-y-2 px-1">
          {group.islands.map((island, i) => (
            <span key={i} className="text-[#acb0cd]/70 text-sm flex items-center gap-2">
              <span className="text-[#c2622a] text-[8px]">›</span>
              {island}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Trait orange ───────────────────────────────────────────────────────────────
function BurntLine() {
  return <div className="w-12 md:w-16 h-px bg-[#c2622a] mx-auto my-4 md:my-6" />;
}

// ── Section nuages ─────────────────────────────────────────────────────────────
function CloudSection({ children, className = '', bg = '/images/services-bg.png' }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 z-0">
        <Image src={bg} alt="" fill className="object-cover opacity-55" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function RevealBlock({ label, title, sub }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="text-center mb-10 md:mb-14 reveal-up">
      <p className="text-[#c2622a] text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-light">{label}</p>
      <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] md:tracking-[0.12em] text-[#acb0cd] mb-2">{title}</h2>
      <BurntLine />
      {sub && <p className="text-[#acb0cd]/50 text-sm md:text-base uppercase tracking-[0.1em] px-4">{sub}</p>}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function CaribbeanV8Page() {
  const heroRef = useRef(null);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    requestAnimationFrame(() => { el.classList.add('revealed'); });
  }, []);

  return (
    <>
      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 2.8s ease, transform 2.8s ease; }
        .reveal-up.revealed { opacity: 1; transform: translateY(0); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="bg-[#26272a] text-[#acb0cd] overflow-x-hidden">

        {/* ══ HERO ══ */}
        <div className="relative h-screen">
          <Image src="/images/yachts/yatch2.jpeg" alt="" fill priority className="object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(38,39,42,0.6) 0%, transparent 25%, transparent 70%, rgba(38,39,42,0.8) 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-10 md:pb-16 z-10 px-4">
            <div ref={heroRef} className="reveal-up flex flex-col items-center w-full">
              <h1 className="trajan-regular text-3xl md:text-6xl lg:text-7xl uppercase tracking-[0.1em] md:tracking-[0.15em] text-[#acb0cd] text-center">
                The Caribbean
              </h1>
              <BurntLine />
              <p className="text-[#acb0cd] text-sm md:text-xl uppercase tracking-[0.15em] md:tracking-[0.25em] font-light text-center">
                The Ultimate Luxury Yachting Destination
              </p>
            </div>
          </div>
        </div>

        {/* ══ DESCRIPTION ══ */}
        <CloudSection className="bg-[#26272a] py-14 md:py-28 px-5 md:px-20" bg="/images/nuagesAncien.png">
          <div className="max-w-4xl mx-auto text-center leading-relaxed space-y-5 md:space-y-6">
            <p className="text-lg md:text-2xl text-[#acb0cd]">
              A paradise of <span className="text-[#d39478] font-semibold">turquoise waters</span>,{' '}
              <span className="text-[#d39478] font-semibold">powder-white beaches</span>,{' '}
              <span className="text-[#d39478] font-semibold">vibrant coral reefs</span>, and{' '}
              <span className="text-[#d39478] font-semibold">lush tropical forests</span>,
              the Caribbean stands as{' '}
              <span className="text-[#d39478] font-semibold">the world's premier destination</span> for luxury yacht charters.
            </p>
            <p className="text-base md:text-xl max-w-3xl mx-auto text-[#acb0cd]">
              From <span className="text-[#d39478] font-semibold">untamed natural beauty</span> and pirate legends of the Leeward and Windward Islands to the opulence
              of <span className="text-[#d39478] font-semibold">Michelin-starred restaurants</span> and{' '}
              <span className="text-[#d39478] font-semibold">ultra-luxury resorts</span> in St. Martin and St. Barts, the Caribbean
              offers an unparalleled sailing experience.
            </p>
            <p className="text-base md:text-xl max-w-2xl mx-auto text-[#acb0cd]">
              Comprising <span className="text-[#d39478] font-semibold">twenty-six countries</span> and over{' '}
              <span className="text-[#d39478] font-semibold">seven hundred islands</span>, cays, and islets—including the Greater
              and Lesser Antilles—the Caribbean is a mosaic of crystal-clear seas, palm-fringed shores, and a rich
              cultural tapestry blending <span className="text-[#d39478] font-semibold">Creole, French, Dutch, and British</span> influences.
            </p>
            <p className="text-sm md:text-lg max-w-xl mx-auto text-[#acb0cd]">
              For discerning clients seeking the finest in yacht charters, the Caribbean delivers a seamless blend
              of exclusivity and adventure. Whether it's the glamour of{' '}
              <span className="text-[#d39478] font-semibold">Turks and Caicos</span>, the sophistication of{' '}
              <span className="text-[#d39478] font-semibold">St. Barts</span>, or{' '}
              <span className="text-[#d39478] font-semibold">private island resorts accessible only by sea</span>, this region promises an elite escape
              where every moment is crafted for the extraordinary.
            </p>
          </div>
        </CloudSection>

        {/* ══ BANDEAU cocomer ══ */}
        <div className="relative h-[45vh] md:h-[70vh] overflow-hidden">
          <Image src="/images/pagesCaraibes/cocomer.jpeg" alt="" fill className="object-cover brightness-40 grayscale" style={{ objectPosition: 'center 40%' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #26272a 0%, transparent 18%, transparent 62%, #26272a 100%)' }} />
        </div>

        {/* ══ CARIBBEAN ISLANDS — rectangles 4 + 3 centré ══ */}
        <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16">
          <div className="max-w-7xl mx-auto">
            <RevealBlock label="Explore" title="Caribbean Islands" sub="The most sought-after islands for luxury yacht charters" />
            {/* Ligne 1 : 4 cartes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 mb-px">
              {caribbeanIslands.slice(0, 4).map((island, i) => <DestCard key={i} {...island} />)}
            </div>
            {/* Ligne 2 : 3 cartes centrées */}
            <div className="flex justify-center gap-px bg-white/10">
              {caribbeanIslands.slice(4).map((island, i) => (
                <div key={i} className="w-1/2 md:w-1/4">
                  <DestCard {...island} />
                </div>
              ))}
            </div>
          </div>
        </CloudSection>

        {/* ══ ACCORDÉONS — grille 3 colonnes, sur fond nuages ══ */}
        <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16">
          <div className="max-w-7xl mx-auto">
            <RevealBlock label="Archipelagos" title="Destinations by Region" sub="Seven groups — over 700 islands" />
            {/* Grille 1 col mobile / 3 col desktop — 3+3+1 centré */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
              {islandGroups.map((group, i) => (
                <div key={group.id} className={i === islandGroups.length - 1 ? 'md:col-start-2' : ''}>
                  <IslandGroup group={group} defaultOpen={i < 3} />
                </div>
              ))}
            </div>
          </div>
        </CloudSection>

        {/* ══ BANDEAU palmiers ══ */}
        <div className="relative h-[40vh] md:h-[65vh] overflow-hidden">
          <Image src="/images/pagesCaraibes/palmierscaraibes.jpeg" alt="" fill className="object-cover brightness-40 grayscale" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #26272a 0%, transparent 18%, transparent 62%, #26272a 100%)' }} />
        </div>

        {/* ══ POPULAR DESTINATIONS — cercles slider ══ */}
        <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16">
          <div className="max-w-7xl mx-auto">
            <RevealBlock label="Anchorages & Marinas" title="Popular Destinations" sub="The most exclusive marinas and anchorages in the Caribbean" />
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 -mx-4 px-4 scrollbar-hide md:justify-center md:flex-wrap md:overflow-visible md:mx-0 md:px-0">
              {popularDestinations.map((dest, i) => <CircleCard key={i} {...dest} />)}
            </div>
          </div>
        </CloudSection>

        {/* ══ BANDEAU st-barth + CTA ══ */}
        <div className="relative h-[55vh] md:h-[75vh] overflow-hidden">
          <Image src="/images/pagesCaraibes/st-barth.jpg" alt="" fill className="object-cover brightness-50" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #26272a 0%, transparent 18%, transparent 62%, #26272a 100%)' }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6">
            <p className="text-[#c2622a] text-[10px] md:text-xs uppercase tracking-[0.3em] mb-3 md:mb-4">Ready to Sail</p>
            <h2 className="trajan-regular text-xl md:text-5xl text-[#acb0cd] uppercase tracking-[0.08em] md:tracking-[0.12em] mb-3 md:mb-4 max-w-xs md:max-w-xl mx-auto leading-tight">
              Plan Your Caribbean Charter
            </h2>
            <BurntLine />
            <p className="text-[#acb0cd]/60 text-sm md:text-base max-w-xs md:max-w-md mx-auto mb-5 md:mb-6 leading-relaxed">
              Our team of experts is available 24/7 to create your bespoke yachting itinerary across the Caribbean.
            </p>
            <a href="/charters" style={{ color: '#c2622a', borderColor: '#c2622a' }} className="trajan-regular text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] px-7 md:px-10 py-3 md:py-4 border hover:bg-[#c2622a] hover:text-white transition-all duration-300">
              Explore Yachts
            </a>
          </div>
        </div>

      </div>
    </>
  );
}
