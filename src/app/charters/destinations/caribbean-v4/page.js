'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Footer from '@/app/components/Footer';

// ── Données îles & destinations ────────────────────────────────────────────────
const caribbeanIslands = [
  { name: 'St. Barts',   image: '/images/destinations/animals/caraibes.jpg',                   href: '/yachts?destination=st-barts' },
  { name: 'St. Martin',  image: '/images/destinations/destnation-feature-caribbean.webp',       href: '/yachts?destination=st-martin' },
  { name: 'Antigua',     image: '/images/destinations/animals/Bahamas.jpg',                     href: '/yachts?destination=antigua' },
  { name: 'BVI',         image: '/images/yachts/yatch2.jpeg',                                   href: '/yachts?destination=bvi' },
  { name: 'West Med',    image: '/images/destinations/destnation-feature-west-med.webp',         href: '/yachts?destination=west-med' },
  { name: 'USVI',        image: '/images/destinations/destnation-feature-south-pacific.webp',    href: '/yachts?destination=usvi' },
  { name: 'Bahamas',     image: '/images/destinations/animals/Ocean-Pacific.jpeg',              href: '/yachts?destination=bahamas' },
];

const popularDestinations = [
  { name: 'Gustavia',        image: '/images/destinations/destnation-feature-indian-ocean.webp',    href: '/yachts?destination=gustavia' },
  { name: 'Marigot',         image: '/images/destinations/animals/caraibes.jpg',                    href: '/yachts?destination=marigot' },
  { name: 'English Harbour', image: '/images/destinations/destnation-feature-east-med.webp',        href: '/yachts?destination=english-harbour' },
  { name: 'Tortola',         image: '/images/destinations/animals/Bahamas.jpg',                     href: '/yachts?destination=tortola' },
  { name: 'St. John',        image: '/images/destinations/destnation-feature-caribbean.webp',       href: '/yachts?destination=st-john' },
  { name: 'Nassau',          image: '/images/destinations/destnation-feature-south-east-asia.webp', href: '/yachts?destination=nassau' },
];

// ── Alcôves "luxury" (ex-losanges) ─────────────────────────────────────────────
const alcoves = [
  { title: 'Privat Jet',           image: '/images/gridLosange/jet2.png',                                       link: '/privat-jet' },
  { title: 'Invest with Impact',   image: '/images/new/invest.jpg',                                            link: '/invest-with-impact' },
  { title: 'Hotel & Palace',       image: '/images/new/FB_IMG_1749967381497.jpg',                              link: '/hotel-palace' },
  { title: 'Art & Culture',        image: '/images/new/photo-1715627211239-f9961ad5f794.jpeg',                 link: '/art-culture' },
  { title: 'Horses & Riding',      image: '/images/gridLosange/cheval2.png',                                   link: '/horses-riding' },
  { title: 'Fine Food & Dining',   image: '/images/new/17500843321894246574840682884355.jpg',                  link: '/fine-food-dining' },
  { title: 'Historic Sites',       image: '/images/new/pexels-gibran-riojas-2153089565-32551597.jpg',         link: '/historic-sites' },
  { title: 'Partners',             image: '/images/gridLosange/fish.jpg',                                      link: '/partners' },
  { title: 'Events',               image: '/images/new/fillemasque.png',                                       link: '/events' },
  { title: 'Sport Fishing',        image: '/images/new/pexels-valentina-bondarenko-111153662-10076104.jpg',    link: '/sport-fishing' },
  { title: 'Luxury Cars & Racing', image: '/images/gridLosange/luxury.png',                                    link: '/luxury-cars-racing' },
  { title: 'Real Estate',          image: '/images/new/realestate.jpeg',                                       link: '/real-estate' },
];

// ── Composant alcôve individuelle ──────────────────────────────────────────────
function Alcove({ title, image, link }) {
  return (
    <Link
      href={link}
      className="group relative flex-shrink-0 w-[72vw] md:w-auto snap-center overflow-hidden rounded-2xl"
      style={{ height: '420px' }}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover brightness-60 group-hover:brightness-80 group-hover:scale-105 transition-all duration-700"
      />
      {/* Gradient bas */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      {/* Trait vertical gauche */}
      <div className="absolute left-5 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-[#B87333]/60 to-transparent" />
      {/* Titre */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-[#acb0cd] text-xs uppercase tracking-[0.2em] mb-1 font-light">Qualityacht</p>
        <h3 className="text-white text-xl font-bold tracking-wide group-hover:text-[#d39478] transition-colors duration-300">
          {title}
        </h3>
        <div className="mt-3 w-8 h-px bg-[#B87333] group-hover:w-16 transition-all duration-300" />
      </div>
    </Link>
  );
}

// ── Composant cercle île ────────────────────────────────────────────────────────
function IslandCircle({ name, image, href }) {
  return (
    <Link href={href} className="group flex flex-col items-center shrink-0 min-w-[6rem] snap-center">
      <div className="relative aspect-square w-full rounded-full overflow-hidden border-2 border-white/20 hover:border-[#B03E00]/50 transition-all duration-300 mb-3">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover brightness-75 group-hover:brightness-100 group-hover:scale-110 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
      </div>
      <h3 className="w-full text-[#acb0cd] font-bold text-center text-sm md:text-base uppercase tracking-wide group-hover:text-[#B03E00] transition-colors">
        {name}
      </h3>
    </Link>
  );
}

// ── Page principale ────────────────────────────────────────────────────────────
export default function CaribbeanV4Page() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-screen text-[#acb0cd] bg-[#303135] overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════
          HERO — fond page d'accueil
      ══════════════════════════════════════════════════════════ */}

      {/* Desktop */}
      <section
        className="w-screen h-screen bg-cover bg-center relative hidden md:block"
        style={{ backgroundImage: "url('/images/FondHero.jpg')" }}
      >
        {/* Titre Caribbean par-dessus le hero desktop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
        <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center z-10">
          <div className="text-center px-4 max-w-4xl mb-6">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 text-[#acb0cd] tracking-wide">
              The Caribbean
            </h1>
            <p className="text-2xl text-[#acb0cd] font-light">
              The Ultimate Luxury Yachting Destination
            </p>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#B87333] to-transparent" />
        </div>
      </section>

      {/* Mobile — yatch2.jpeg comme v2/v3 */}
      <section className="w-screen h-screen relative block md:hidden overflow-hidden">
        <Image
          src="/images/yachts/yatch2.jpeg"
          alt=""
          fill
          priority
          className="object-cover object-top brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.95))',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center z-10 pb-8">
          <div className="text-center px-4 max-w-4xl mb-6">
            <h1 className="text-5xl font-bold mb-4 text-[#acb0cd]">The Caribbean</h1>
            <p className="text-xl text-[#acb0cd] font-light">The Ultimate Luxury Yachting Destination</p>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          WORLD CLASS EXPERIENCE — fond services-bg.png
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-16 px-6 md:px-20 md:min-h-screen text-center"
        style={{
          backgroundImage: "url('/images/services-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div>
          <h2 className="text-3xl md:text-4xl tracking-wide text-[#acb0cd]">A WORLD-CLASS EXPERIENCE</h2>
          <Image src="/images/title-line.png" alt="" width={200} height={10} className="mx-auto mb-12" />
        </div>
        <div
          className={`max-w-4xl mx-auto space-y-6 text-sm md:text-2xl leading-relaxed text-center transition-all duration-300 ${
            isExpanded ? '' : 'line-clamp-5'
          }`}
        >
          <span className="text-[#d39478]">
            Wishing to design a society where luxury, sea and adrenaline would be at the center of activity.
          </span>{' '}
          It is in fact a matter of course: Know how to present a company whose DNA would be the image of the craze that drives us.
          <br />
          <span className="text-[#d39478]">Qualityacht has been in the luxury sector for more than 33 years,</span> including 13
          years in the prestigious world of yachting. Very involved in everyday life, the Qualityacht family has allowed many
          customers to sail with an unmatched commitment.
          <br />
          Qualityacht is{' '}
          <span className="text-[#d39478]">committed to providing its customers with a customized solution.</span>
          <br />
          Our team travels the coves to make you discover or rediscover the charms of our planet. Paradise destinations and your
          desires as a guideline to create your holidays fully ready to embar.
          <span className="text-[#d39478]">
            {' '}Our expertise includes: a collection of sailboats, classic sailboats, regattas, different sizes of yachts related
            to your needs.
          </span>
          <br />
          <span className="text-[#d39478]"> Far beyond a service provider, we will be your partner.</span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-6 inline-block py-2 px-6 text-sm md:text-base font-medium rounded-full bg-black/40 text-[#C0C0C0] border border-[#C0C0C0]"
        >
          {isExpanded ? 'Reduce' : 'See more'}
        </button>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BANDE + STICKY IMAGE 2 — St-Barth + texte description
      ══════════════════════════════════════════════════════════ */}
      <div className="h-8 bg-gradient-to-b from-gray-900 via-gray-600 to-gray-900" />

      <div className="relative">
        <div className="sticky top-0 h-screen overflow-hidden -z-0">
          <Image
            src="/images/pagesCaraibes/st-barth.jpg"
            alt=""
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black/80" />
          <div className="absolute inset-0 bg-amber-950/15" />
          <div
            className="absolute bottom-0 left-0 right-0 h-40"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.95))',
            }}
          />
        </div>
        <div
          className="relative z-10 max-w-4xl mx-auto px-4 py-24 text-center leading-relaxed space-y-6"
          style={{ marginTop: '-100vh' }}
        >
          <p className="text-xl text-[#acb0cd]">
            A paradise of <span className="text-[#d39478] font-semibold">turquoise waters</span>,{' '}
            <span className="text-[#d39478] font-semibold">powder-white beaches</span>,{' '}
            <span className="text-[#d39478] font-semibold">vibrant coral reefs</span>, and{' '}
            <span className="text-[#d39478] font-semibold">lush tropical forests</span>, the Caribbean stands as{' '}
            <span className="text-[#d39478] font-semibold">the world's premier destination</span> for luxury yacht charters.
          </p>
          <p className="text-lg max-w-3xl mx-auto text-[#acb0cd]">
            From <span className="text-[#d39478] font-semibold">untamed natural beauty</span> and pirate legends of the Leeward
            and Windward Islands to the opulence of{' '}
            <span className="text-[#d39478] font-semibold">Michelin-starred restaurants</span> and{' '}
            <span className="text-[#d39478] font-semibold">ultra-luxury resorts</span> in St. Martin and St. Barts, the Caribbean
            offers an unparalleled sailing experience.
          </p>
          <p className="text-lg max-w-2xl mx-auto text-[#acb0cd]">
            Comprising <span className="text-[#d39478] font-semibold">twenty-six countries</span> and over{' '}
            <span className="text-[#d39478] font-semibold">seven hundred islands</span>, cays, and islets—the Caribbean is a
            mosaic of crystal-clear seas, palm-fringed shores, and a rich cultural tapestry blending{' '}
            <span className="text-[#d39478] font-semibold">Creole, French, Dutch, and British</span> influences.
          </p>
          <p className="text-base max-w-xl mx-auto text-[#acb0cd]">
            For discerning clients seeking the finest in yacht charters, the Caribbean delivers a seamless blend of exclusivity
            and adventure. Whether it's the glamour of{' '}
            <span className="text-[#d39478] font-semibold">Turks and Caicos</span>, the sophistication of{' '}
            <span className="text-[#d39478] font-semibold">St. Barts</span>, or{' '}
            <span className="text-[#d39478] font-semibold">private island resorts accessible only by sea</span>, this region
            promises an elite escape where every moment is crafted for the extraordinary.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          BANDE + STICKY IMAGE 3 — carteCarab + cercles îles
      ══════════════════════════════════════════════════════════ */}
      <div className="h-8 bg-gradient-to-b from-gray-900 via-gray-600 to-gray-900" />

      <div className="relative">
        <div className="sticky top-0 h-screen overflow-hidden -z-0">
          <Image
            src="/images/pagesCaraibes/carteCarab.jpeg"
            alt=""
            fill
            className="object-cover brightness-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black/80" />
          <div className="absolute inset-0 bg-amber-950/15" />
          <div
            className="absolute bottom-0 left-0 right-0 h-40"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.95))',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24" style={{ marginTop: '-100vh' }}>

          {/* Caribbean Islands — cercles */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-[#acb0cd] mb-4 text-center tracking-wider">CARIBBEAN ISLANDS</h2>
            <p className="text-center text-[#acb0cd] mb-8 max-w-2xl mx-auto">
              Discover the most sought-after islands for luxury yacht charters
            </p>
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 -mx-4 px-4 scrollbar-hide md:grid md:grid-cols-3 md:mx-0 md:px-0 md:overflow-visible lg:grid-cols-7">
              {caribbeanIslands.map((island, i) => (
                <IslandCircle key={i} {...island} />
              ))}
            </div>
          </div>

          {/* Popular Destinations — cercles */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-[#acb0cd] mb-4 text-center tracking-wider">POPULAR DESTINATIONS</h2>
            <p className="text-center text-[#acb0cd] mb-8 max-w-2xl mx-auto">
              The most exclusive marinas and anchorages in the Caribbean
            </p>
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 -mx-4 px-4 scrollbar-hide md:grid md:grid-cols-3 md:mx-0 md:px-0 md:overflow-visible lg:grid-cols-6">
              {popularDestinations.map((dest, i) => (
                <IslandCircle key={i} {...dest} />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          DISCOVER MORE LUXURY — alcôves (ex-losanges)
          Mobile : slider vertical snap  |  Desktop : grille 3 col
      ══════════════════════════════════════════════════════════ */}
      <section
        className="relative py-24 px-0"
        style={{
          backgroundImage: "url('/images/testvague.png')",
          backgroundSize: 'cover',
          backgroundPositionY: 'top',
          WebkitMask: 'linear-gradient(to bottom, transparent 0%, black 8%, black 100%)',
          mask: 'linear-gradient(to bottom, transparent 0%, black 8%, black 100%)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070c73] to-[#1b223d] pointer-events-none" />

        <div className="relative z-10">
          <h2 className="text-3xl text-center uppercase md:text-4xl font-normal text-[#acb0cd] mb-2 px-4">
            Discover More Luxury
          </h2>
          <Image src="/images/title-line.png" alt="" width={200} height={10} className="mx-auto mb-10" />

          {/* ── MOBILE : slider vertical snap ── */}
          <div className="md:hidden flex flex-col gap-5 px-4 overflow-y-auto snap-y snap-mandatory max-h-[85vh] pb-4 scrollbar-hide">
            {alcoves.map((a, i) => (
              <div key={i} className="snap-start flex-shrink-0">
                <Link
                  href={a.link}
                  className="group relative block w-full overflow-hidden rounded-2xl"
                  style={{ height: '220px' }}
                >
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    className="object-cover brightness-60 group-hover:brightness-80 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-[#B87333]/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-[#acb0cd] text-xs uppercase tracking-[0.2em] mb-1 font-light">Qualityacht</p>
                    <h3 className="text-white text-lg font-bold tracking-wide group-hover:text-[#d39478] transition-colors">
                      {a.title}
                    </h3>
                    <div className="mt-2 w-8 h-px bg-[#B87333] group-hover:w-14 transition-all duration-300" />
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* ── DESKTOP : grille 3 colonnes ── */}
          <div className="hidden md:grid grid-cols-3 gap-6 max-w-7xl mx-auto px-8">
            {alcoves.map((a, i) => (
              <Alcove key={i} {...a} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 px-4 md:px-24 bg-[#1b223d]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* WhatsApp */}
          <div className="rounded-2xl border border-white/20 p-6 shadow-md backdrop-blur-md bg-black/30 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-medium mb-2 flex items-center gap-2 text-white">
                <span className="text-3xl">🟢</span> WhatsApp
              </h2>
              <p className="text-sm text-white/80">
                Manage your enquiries and bookings on the go via private chat with our team
              </p>
            </div>
            <span className="mt-4 text-sm text-white/60">↗</span>
          </div>

          {/* Téléphone */}
          <div className="rounded-2xl bg-[#acb0cd] text-black p-6 flex flex-col justify-center">
            <p className="text-lg font-medium">info@qualityacht.ch</p>
            <p className="text-2xl font-light my-2">+41 76 736 57 81</p>
            <p className="text-sm text-gray-600">Telephone line open 24 hours a day</p>
          </div>

          {/* Office Zurich */}
          <div className="rounded-2xl bg-[#acb0cd] text-black p-6 flex flex-col justify-center">
            <p className="text-lg font-medium">Office — Zurich</p>
            <p className="text-2xl font-light my-2">+41 76 736 57 81</p>
            <p className="text-sm text-gray-600">Personal accompaniment in all yachting projects</p>
          </div>
        </div>

        {/* Formulaire */}
        <div
          className="bg-[#C0C0C0] text-black mt-12 rounded-2xl p-10 grid grid-cols-1 shadow-sm lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
          style={{ boxShadow: '#c0c0c045 -20px 18px 20px' }}
        >
          <div>
            <p className="mb-4 font-semibold">
              Please select the reason for your enquiry <span className="text-red-500">*</span>
            </p>
            <div className="flex gap-4 mb-6 flex-wrap">
              {['General Enquiry', 'Charter', 'Other'].map((label) => (
                <button
                  key={label}
                  className="px-6 py-2 border border-gray-400 rounded-full text-sm hover:bg-black hover:text-white transition"
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text"  placeholder="Full Name *"      className="border-b border-gray-400 bg-transparent py-2 outline-none" />
              <input type="email" placeholder="Email Address *"  className="border-b border-gray-400 bg-transparent py-2 outline-none" />
              <input type="tel"   placeholder="Phone Number *"   className="border-b border-gray-400 bg-transparent py-2 outline-none" />
              <input type="text"  placeholder="Company"          className="border-b border-gray-400 bg-transparent py-2 outline-none" />
            </div>
            <textarea
              placeholder="Your Message"
              className="w-full mt-4 border-b border-gray-400 bg-transparent py-2 outline-none"
              rows={3}
            />
            <button className="mt-6 px-8 py-3 bg-[#B03E00] text-white rounded-full text-sm tracking-wider hover:bg-[#f97316] transition">
              SEND MESSAGE
            </button>
          </div>
          <div />
        </div>
      </section>

      <Footer />
    </div>
  );
}
