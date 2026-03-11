'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// ── Données rectangles (7 items : 4 + 3 centré) ───────────────────────────────
const caribbeanIslands = [
  { name: 'Greater Antilles',   image: '/images/destinations/gretar antilles.jpg',         href: '/charters/destinations/greater-antilles' },
  { name: 'Leeward Islands',    image: '/images/destinations/Leeward Islands.jpg',          href: '/yachts?destination=leeward-islands' },
  { name: 'Leeward Antilles',   image: '/images/destinations/The Leeward Antilles.jpg',     href: '/yachts?destination=leeward-antilles' },
  { name: 'Windward Islands',   image: '/images/destinations/the Windward Islands.jpg',     href: '/yachts?destination=windward-islands' },
  { name: 'Turks & Caicos',     image: '/images/destinations/Turks and Caicos.jpg',         href: '/yachts?destination=turks-caicos' },
  { name: 'Trinidad & Tobago',  image: '/images/destinations/Trinidad and Tobago.jpg',      href: '/yachts?destination=trinidad-tobago' },
  { name: 'Grand Cayman',       image: '/images/destinations/Cayman Islands.jpg',           href: '/yachts?destination=grand-cayman' },
];

// ── Groupes accordéon ──────────────────────────────────────────────────────────
const islandGroups = [
  { id: 1, name: 'Greater Antilles',      islands: ['Cuba', 'Hispaniola', 'Jamaica', 'Puerto Rico'] },
  { id: 2, name: 'Leeward Islands',       islands: ['Anguilla', 'Saint-Martin / Sint Maarten', 'Saint-Barthélemy', 'Saba & Saint-Eustache', 'Saint-Kitts & Nevis', 'Antigua & Barbuda', 'Montserrat', 'Guadeloupe'] },
  { id: 3, name: 'Leeward Antilles',      islands: ['Aruba', 'Bonaire', 'Curaçao'] },
  { id: 4, name: 'Windward Islands',      islands: ['Dominica', 'Martinique', 'Saint Lucia', 'Saint Vincent & the Grenadines', 'Mustique', 'Canouan', 'Bequia', 'Tobago Cays', 'Grenada', 'Carriacou', 'Barbados'] },
  { id: 5, name: 'Turks & Caicos',        islands: ['Providenciales', 'Grand Turk', 'South Caicos', 'West Caicos'] },
  { id: 6, name: 'Trinidad & Tobago',     islands: ['Trinidad', 'Tobago'] },
  { id: 7, name: 'Emerging Destinations', islands: ['Barbuda', 'Petite Martinique', 'Redonda', 'Aves Island', 'Sombrero Island'] },
];

// ── Données cercles ────────────────────────────────────────────────────────────
const popularDestinations = [
  { name: 'Saint-Vincent-et-les-Grenadines', image: '/images/destinations/flowers/Saint-Vincent-et-les-Grenadines.jpg',  href: '/yachts?destination=saint-vincent', nameBelow: true },
  { name: 'Antigua et Barbuda',               image: '/images/destinations/flowers/Antigua et Barbuda.jpeg',              href: '/yachts?destination=antigua',        nameBelow: true },
  { name: 'British Virgin Islands',           image: '/images/destinations/flowers/British Virgin Islands.jpg',           href: '/yachts?destination=bvi',            nameBelow: true },
  { name: 'Saint-Martin / Sint Maarten',      image: '/images/destinations/flowers/Saint-Martin  Sint Maarten.jpg',       href: '/yachts?destination=saint-martin',   nameBelow: true },
  { name: 'St Barthélémy',                     image: '/images/destinations/flowers/St barth Allamanda.jpg',               href: '/yachts?destination=st-barts',       nameBelow: true },
];

// ── Chiffres clés ──────────────────────────────────────────────────────────────
const keyStats = [
  { value: '700+', label: 'Islands & Cays' },
  { value: '26',   label: 'Countries' },
  { value: '12',   label: 'Months of Sun' },
  { value: '1,000+', label: 'Luxury Yachts' },
];

// ── Meilleures saisons ─────────────────────────────────────────────────────────
const seasons = [
  {
    months: 'Dec — Apr',
    title: 'High Season',
    label: 'Winter Escape',
    desc: 'Peak season with dry, sunny weather and steady trade winds. The most popular time for Caribbean charters with the best sailing conditions across all regions.',
    ideal: 'All regions',
    accent: '#c2622a',
  },
  {
    months: 'May — Jul',
    title: 'Shoulder Season',
    label: 'Spring Sailing',
    desc: 'Warm temperatures, fewer crowds, and lower rates. Exceptional visibility for diving and snorkelling. A wonderful time to explore the islands before hurricane season.',
    ideal: 'Southern Caribbean',
    accent: '#acb0cd',
  },
  {
    months: 'Aug — Nov',
    title: 'Low Season',
    label: 'Tropical Adventure',
    desc: 'Hurricane season brings occasional rain to the north, but the southern Caribbean — Grenada, Trinidad and the ABC Islands — remains largely unaffected with the best rates.',
    ideal: 'Grenada · Trinidad · ABC Islands',
    accent: '#6b7280',
  },
];

// ── FAQ ────────────────────────────────────────────────────────────────────────
const faqItems = [
  {
    q: 'How flexible are charter durations?',
    a: 'Your yacht experience can last from a weekend escape to a month-long voyage, depending on availability. While week-long charters are standard, we gladly accommodate shorter or extended stays tailored to your schedule.',
  },
  {
    q: 'Motor yacht or sailboat — which is right for me?',
    a: 'Motor yachts offer speed and luxury, perfect for exploring multiple destinations effortlessly. Sailboats provide a traditional, intimate experience for those who love the art of sailing. Our team will help you choose based on your preferences.',
  },
  {
    q: 'Can I charter for less than a week?',
    a: 'Yes! While week-long charters are most common, 3–5 day charters may be available depending on the yacht and season. Ask your broker about flexible options.',
  },
  {
    q: 'When can I start my charter?',
    a: 'You choose the dates! Whether it\'s a summer cruise in the Mediterranean or a winter getaway in the Caribbean, we\'ll secure your preferred yacht. Popular seasons book quickly — reserve early for the best selection.',
  },
  {
    q: 'How are charter rates calculated?',
    a: 'Rates are typically quoted per week, with adjustments for high vs. low season and shorter or longer charters (daily rates can be prorated). Your broker will provide a transparent, customized quote — no hidden fees.',
  },
  {
    q: "What's included in the charter fee?",
    a: 'Your fee covers the luxury yacht and all amenities (jacuzzi, water toys, entertainment systems), a professional crew (captain, chef, stewardess), and comprehensive insurance. Not included: marina fees, fuel, local taxes, VAT, and special requests.',
  },
  {
    q: 'How do I book a yacht charter?',
    a: 'Consult our brokers to select the perfect yacht, confirm availability for your dates, then receive your itinerary and agreement and secure your booking with a deposit. We handle the rest.',
  },
  {
    q: "What's the cancellation policy?",
    a: 'Policies vary, but many offer flexible rescheduling (e.g., 80% refund if canceled 30+ days in advance) and travel insurance options. Your broker will explain the details.',
  },
  {
    q: 'Can I customize my itinerary?',
    a: 'Absolutely! Your broker and captain will design a bespoke route — whether you dream of secluded coves in Greece or vibrant nightlife in St. Tropez. Weather and local regulations may influence planning, but we\'ll ensure an unforgettable journey.',
  },
  {
    q: 'Is the yacht entirely private for my group?',
    a: 'Yes! The yacht is exclusively yours, with full access to all amenities. Some marine areas have restrictions, but your crew will guide you.',
  },
  {
    q: 'Can I scuba dive from the yacht?',
    a: 'Certified divers (PADI or equivalent) can use onboard equipment. Beginners may arrange rendezvous diving or introductory courses. Let us know in advance — we\'ll organize everything.',
  },
  {
    q: 'Are there smoking areas onboard?',
    a: 'Smoking is usually allowed in designated outdoor areas (e.g., the aft deck). Check with your broker for specifics.',
  },
  {
    q: 'Should I tip the crew?',
    a: 'Tipping is optional but appreciated. A 10–20% gratuity (based on the charter fee) is standard for exceptional service.',
  },
  {
    q: 'How many guests can sleep onboard?',
    a: 'Most luxury yachts accommodate up to 12 guests, depending on cabin layout. Need more space? Ask about our larger superyachts or flotilla charters.',
  },
  {
    q: 'How do you personalize my experience?',
    a: 'Before your trip, share your preferences: culinary tastes, activities (helicopter tours, spa treatments, beach picnics), and special occasions (birthdays, anniversaries). We\'ll ensure every detail is tailored to you.',
  },
  {
    q: 'Can you arrange shore excursions?',
    a: 'Yes! Whether it\'s VIP beach club access, private tours, or Michelin-starred dining, your crew will orchestrate seamless experiences ashore.',
  },
  {
    q: 'Do I need travel insurance?',
    a: 'We strongly recommend insurance to protect against cancellations, medical emergencies, or weather delays. Your broker can advise on the best options.',
  },
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

// ── Bandeau photo avec couleur au hover (4s) ──────────────────────────────────
function BandeauPhoto({ src, position = 'center' }) {
  const [lit, setLit] = useState(false);
  const timerRef = useRef(null);
  function activate() { clearTimeout(timerRef.current); setLit(true); }
  function deactivate() { timerRef.current = setTimeout(() => setLit(false), 4000); }
  return (
    <div className="relative h-[45vh] md:h-[70vh] overflow-hidden cursor-pointer"
      onMouseEnter={activate} onMouseLeave={deactivate}
      onTouchStart={activate} onTouchEnd={deactivate}>
      <Image src={src} alt="" fill
        className={`object-cover transition-all duration-1000 ${lit ? 'brightness-75 grayscale-0' : 'brightness-40 grayscale'}`}
        style={{ objectPosition: position }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #26272a 0%, rgba(38,39,42,0.3) 25%, transparent 40%, transparent 50%, rgba(38,39,42,0.3) 72%, #26272a 100%)' }} />
    </div>
  );
}

// ── Cercle ─────────────────────────────────────────────────────────────────────
function CircleCard({ name, image, nameBelow = false }) {
  const [lit, setLit] = useState(false);
  const timerRef = useRef(null);
  function activate() { clearTimeout(timerRef.current); setLit(true); }
  function deactivate() { timerRef.current = setTimeout(() => setLit(false), 1500); }
  const size = nameBelow
    ? 'w-[130px] h-[130px] md:w-[155px] md:h-[155px]'
    : 'w-[110px] h-[110px] md:w-[130px] md:h-[130px]';
  const wrapper = nameBelow ? '175px' : '150px';
  return (
    <div
      onClick={activate} onMouseEnter={activate} onMouseLeave={deactivate}
      onTouchStart={activate} onTouchEnd={deactivate}
      className="flex flex-col items-center shrink-0 snap-center cursor-pointer gap-2 px-2 py-1"
      style={{ width: wrapper }}>
      <div
        className="rounded-full border-4 transition-all duration-300 p-0.5"
        style={{ borderColor: '#C0C0C0', transform: lit ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.3s' }}>
        <div className={`relative ${size} rounded-full overflow-hidden`}>
          <Image src={image} alt={name} fill className={`object-cover transition-all duration-500 ${lit ? 'brightness-100 grayscale-0 scale-110' : 'brightness-75 grayscale'}`} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />
          {!nameBelow && (
            <div className="absolute inset-0 flex items-end justify-center pb-3 px-1">
              <h3 className="trajan-regular text-[9px] md:text-[10px] font-bold text-center uppercase tracking-wide leading-tight text-white">{name}</h3>
            </div>
          )}
        </div>
      </div>
      {nameBelow && (
        <h3 className="trajan-regular text-[9px] md:text-[10px] font-bold text-center uppercase tracking-wide leading-tight text-[#acb0cd] px-1">{name}</h3>
      )}
    </div>
  );
}

// ── Accordéon groupe ───────────────────────────────────────────────────────────
function IslandGroup({ group, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen || false);
  return (
    <div className="border-b border-white/10">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex flex-col items-center py-4 text-left group cursor-pointer">
        <span className="trajan-regular text-[#acb0cd] text-xs md:text-sm uppercase tracking-[0.2em] group-hover:text-[#c2622a] transition-colors duration-300 text-center w-full">
          {group.name}
        </span>
        <div className="relative w-24 h-6 my-1">
          <Image src="/images/title-line.png" alt="" fill className="object-contain" />
        </div>
        <span className={`text-[#c2622a] transition-transform duration-300 text-2xl leading-none ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="pb-5 flex flex-wrap justify-center gap-x-5 gap-y-2 px-1">
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

// ── Accordéon FAQ ──────────────────────────────────────────────────────────────
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between py-5 text-left group cursor-pointer gap-3">
        <div className="flex-1">
          <span className="trajan-regular text-[#acb0cd] text-xs md:text-sm uppercase tracking-[0.15em] group-hover:text-[#c2622a] transition-colors duration-300 leading-snug block text-center md:text-left">
            {q}
          </span>
        </div>
        <span className={`text-[#B87333] transition-transform duration-300 text-3xl leading-none mt-1 shrink-0 font-light ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <div className="pb-5 px-1">
          <p className="text-[#acb0cd]/70 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

// ── Trait orange ───────────────────────────────────────────────────────────────
function BurntLine() {
  return <div className="w-12 md:w-16 h-px bg-[#c2622a] mx-auto my-4 md:my-6" />;
}

// ── Section fond nuage ─────────────────────────────────────────────────────────
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

function RevealBlock({ label, title, sub, useTitleLine = false }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="text-center mb-10 md:mb-14 reveal-up">
      <p className="text-[#c2622a] text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-light">{label}</p>
      <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] md:tracking-[0.12em] text-[#acb0cd] mb-2">{title}</h2>
      {useTitleLine
        ? <div className="relative w-32 h-7 mx-auto my-4 md:my-6"><Image src="/images/title-line.png" alt="" fill className="object-contain" /></div>
        : <BurntLine />
      }
      {sub && <p className="text-[#acb0cd]/50 text-sm md:text-base uppercase tracking-[0.1em] px-4">{sub}</p>}
    </div>
  );
}

// ── Carte saison ───────────────────────────────────────────────────────────────
function SeasonCard({ season }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal-up border border-white/10 rounded-xl p-6 md:p-8 flex flex-col gap-4 hover:border-[#c2622a]/40 transition-colors duration-500">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="trajan-regular text-[10px] uppercase tracking-[0.3em] mb-1" style={{ color: season.accent }}>{season.label}</p>
          <h3 className="trajan-regular text-base md:text-lg uppercase tracking-[0.1em] text-[#acb0cd]">{season.title}</h3>
        </div>
        <span className="trajan-regular text-[10px] uppercase tracking-[0.15em] text-[#acb0cd]/40 text-right shrink-0 pt-1">{season.months}</span>
      </div>
      <div className="h-px w-full" style={{ backgroundColor: season.accent, opacity: 0.3 }} />
      <p className="text-[#acb0cd]/60 text-sm leading-relaxed">{season.desc}</p>
      <div className="mt-auto pt-2 flex items-center gap-2">
        <span className="text-[8px] uppercase tracking-[0.2em] text-[#acb0cd]/40">Ideal for</span>
        <span className="text-[10px] uppercase tracking-[0.15em]" style={{ color: season.accent }}>{season.ideal}</span>
      </div>
    </div>
  );
}

// ── Stat ───────────────────────────────────────────────────────────────────────
function StatItem({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-2 px-4">
      <span className="trajan-regular text-3xl md:text-5xl text-[#c2622a]">{value}</span>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#acb0cd]/50">{label}</span>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function CaribbeanV13Page() {
  const heroRef = useRef(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    requestAnimationFrame(() => { el.classList.add('revealed'); });
  }, []);

  return (
    <>
      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 1.6s ease, transform 1.6s ease; }
        .reveal-up.revealed { opacity: 1; transform: translateY(0); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .quote-scroll::-webkit-scrollbar { width: 4px; }
        .quote-scroll::-webkit-scrollbar-track { background: transparent; }
        .quote-scroll::-webkit-scrollbar-thumb { background: #acb0cd; border-radius: 2px; }
        .quote-scroll { scrollbar-width: thin; scrollbar-color: #acb0cd transparent; }
      `}</style>

      {/* ══ MODAL DEVIS ══ */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: 'rgba(10,20,50,0.95)' }} onClick={() => setShowQuoteModal(false)}>
          <div className="quote-scroll relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 px-6 py-8 md:px-10 md:py-10" style={{ backgroundColor: '#0a1432' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowQuoteModal(false)} className="absolute top-4 right-5 text-[#acb0cd]/50 hover:text-white text-2xl transition-colors cursor-pointer">×</button>
            <p className="text-[10px] uppercase tracking-[0.3em] mb-1 text-center" style={{ color: '#C0C0C0' }}>Caribbean Charter</p>
            <h2 className="trajan-regular text-xl md:text-2xl text-[#acb0cd] uppercase tracking-[0.1em] mb-6 text-center">Request a Quote</h2>
            <form className="space-y-4" onSubmit={e => { e.preventDefault(); setShowQuoteModal(false); }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60 mb-1">First Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[#acb0cd] text-sm focus:outline-none focus:border-[#acb0cd]/50" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60 mb-1">Last Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[#acb0cd] text-sm focus:outline-none focus:border-[#acb0cd]/50" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60 mb-1">Email</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[#acb0cd] text-sm focus:outline-none focus:border-[#acb0cd]/50" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60 mb-1">Phone</label>
                <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[#acb0cd] text-sm focus:outline-none focus:border-[#acb0cd]/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60 mb-1">Departure Date</label>
                  <input type="date" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[#acb0cd] text-sm focus:outline-none focus:border-[#acb0cd]/50" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60 mb-1">Return Date</label>
                  <input type="date" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[#acb0cd] text-sm focus:outline-none focus:border-[#acb0cd]/50" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60 mb-1">Number of Guests</label>
                <input type="number" min="1" max="50" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[#acb0cd] text-sm focus:outline-none focus:border-[#acb0cd]/50" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60 mb-1">Message</label>
                <textarea rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[#acb0cd] text-sm focus:outline-none focus:border-[#acb0cd]/50 resize-none" />
              </div>
              <button type="submit" className="w-full trajan-regular text-xs uppercase tracking-[0.2em] py-3 rounded-full border transition-all duration-300 hover:bg-[#acb0cd] hover:text-[#0a1432]" style={{ color: '#acb0cd', borderColor: '#acb0cd' }}>
                Send Request
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-[#26272a] text-[#acb0cd] overflow-x-hidden">

        {/* ══ HERO ══ */}
        <div className="relative h-screen">
          <Image src="/images/yachts/yatch2.jpeg" alt="" fill priority className="object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #26272a 0%, rgba(38,39,42,0.3) 25%, transparent 40%, transparent 50%, rgba(38,39,42,0.3) 72%, #26272a 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-10 md:pb-16 z-10 px-4">
            <div ref={heroRef} className="reveal-up flex flex-col items-center w-full">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#c2622a] mb-4 font-light">Luxury Yacht Charters</p>
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

        {/* ══ CHIFFRES CLÉS ══ */}
        <div className="bg-[#1e1f22] py-10 md:py-14 px-4 border-y border-white/5">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/10">
            {keyStats.map((stat, i) => <StatItem key={i} {...stat} />)}
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
        <BandeauPhoto src="/images/pagesCaraibes/cocomer.jpeg" position="center 40%" />

        {/* ══ CARIBBEAN ISLANDS — rectangles 4 + 3 centré ══ */}
        <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16">
          <div className="max-w-7xl mx-auto">
            <RevealBlock label="Explore" title="Caribbean Islands" sub="The most sought-after islands for luxury yacht charters" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 mb-px">
              {caribbeanIslands.slice(0, 4).map((island, i) => <DestCard key={i} {...island} />)}
            </div>
            <div className="grid grid-cols-2 md:hidden gap-px bg-white/10 mb-px">
              {caribbeanIslands.slice(4, 6).map((island, i) => <DestCard key={i} {...island} />)}
            </div>
            <div className="flex justify-center gap-px bg-white/10">
              <div className="hidden md:block md:w-1/4">
                <DestCard {...caribbeanIslands[4]} />
              </div>
              <div className="hidden md:block md:w-1/4">
                <DestCard {...caribbeanIslands[5]} />
              </div>
              <div className="w-full md:w-1/4">
                <DestCard {...caribbeanIslands[6]} />
              </div>
            </div>
          </div>
        </CloudSection>

        {/* ══ ACCORDÉONS destinations by region ══ */}
        <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16">
          <div className="max-w-7xl mx-auto">
            <RevealBlock label="Archipelagos" title="Destinations by Region" sub="Seven groups — over 700 islands" />
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
        <BandeauPhoto src="/images/pagesCaraibes/palmierscaraibes.jpeg" />

        {/* ══ MEILLEURES SAISONS ══ */}
        <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16" bg="/images/nuagesAncien.png">
          <div className="max-w-7xl mx-auto">
            <RevealBlock label="Planning Your Charter" title="Best Time to Visit" sub="When to sail — season by season" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {seasons.map((season, i) => <SeasonCard key={i} season={season} />)}
            </div>
          </div>
        </CloudSection>

        {/* ══ POPULAR DESTINATIONS — cercles slider ══ */}
        <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16">
          <div className="max-w-7xl mx-auto">
            <RevealBlock label="Anchorages & Marinas" title="Popular Destinations" sub="The most exclusive marinas and anchorages in the Caribbean" />
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pt-2 pb-4 -mx-4 px-4 scrollbar-hide md:justify-center md:flex-wrap md:overflow-visible md:mx-0 md:px-0">
              {popularDestinations.map((dest, i) => <CircleCard key={i} {...dest} />)}
            </div>
          </div>
        </CloudSection>

        {/* ══ BANDEAU CTA ══ */}
        <div className="relative h-[55vh] md:h-[75vh] overflow-hidden">
          <Image src="/images/destinations/Caraibes_charters.png" alt="" fill className="object-cover brightness-50" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #26272a 0%, transparent 30%, transparent 55%, #26272a 100%)' }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6">
            <p className="text-[10px] md:text-sm uppercase tracking-[0.3em] mb-3 md:mb-4" style={{ color: '#C0C0C0' }}>Ready to Sail</p>
            <h2 className="trajan-regular text-xl md:text-5xl text-[#acb0cd] uppercase tracking-[0.08em] md:tracking-[0.12em] mb-3 md:mb-4 max-w-xs md:max-w-xl mx-auto leading-tight">
              Plan Your Caribbean Charter
            </h2>
            <BurntLine />
            <p className="text-[#acb0cd]/60 text-sm md:text-base max-w-xs md:max-w-md mx-auto mb-5 md:mb-6 leading-relaxed">
              Our team of experts is available 24/7 to create your bespoke yachting itinerary across the Caribbean.
            </p>
            <a href="/charters"
              style={{ color: '#c2622a', backgroundColor: '#26272a', borderColor: '#C0C0C0' }}
              className="trajan-regular text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] px-7 md:px-10 py-3 md:py-4 border rounded-full hover:bg-[#c2622a] hover:text-white hover:border-[#c2622a] transition-all duration-300">
              Explore Yachts
            </a>
          </div>
        </div>

        {/* ══ FAQ ══ */}
        <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16" bg="/images/nuagesAncien.png">
          <div className="max-w-7xl mx-auto">
            <RevealBlock
              label="Frequently Asked Questions"
              title="Your Luxury Yacht Charter, Explained"
              sub=""
              useTitleLine
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
              {faqItems.map((item, i) => (
                <div key={i} className={faqItems.length % 3 !== 0 && i === faqItems.length - 1 ? 'md:col-start-2' : ''}>
                  <FaqItem q={item.q} a={item.a} />
                </div>
              ))}
            </div>
          </div>
        </CloudSection>

      </div>
    </>
  );
}
