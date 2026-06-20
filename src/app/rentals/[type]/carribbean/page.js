'use client';

import Image from 'next/image';
import Link from 'next/link';
import { use, useEffect, useMemo, useRef, useState } from 'react';
import { MapPin, X } from 'lucide-react';
import { ISLANDS } from '../../../test-region-map/map-data';
import {
  REGATTAS_2027,
  REGATTA_CATEGORIES,
  MONTHS_2027,
  groupByMonth,
  getCategoryInfo,
} from '../../../regattas-caribbean-shared/regattas-data';

// ── Mapping region : island -> photos (originelle + filtree) + slug ───────────
// Pour chaque region : photoOriginal = version couleur,
// photoFiltered = version graphique (pagesCaraibes/*). L'alternance entre les
// deux est decidee par la card (index % 2) pour creer du contraste cote a cote.
const REGION_VISUALS = {
  greaterAntilles: { original: '/images/destinations/gretar antilles-original.jpg',     filtered: '/images/pagesCaraibes/greater_antilles.png' },
  leeward:         { original: '/images/destinations/Leeward Islands-original.jpg',     filtered: '/images/pagesCaraibes/leeward_island.png'   },
  leewardAntilles: { original: '/images/destinations/The Leeward Antilles-original.jpg', filtered: '/images/pagesCaraibes/leeward_antilles.png' },
  windward:        { original: '/images/destinations/the Windward Islands-original.jpg', filtered: '/images/pagesCaraibes/windward_island.png'  },
  turksCaicos:     { original: '/images/destinations/Turks and Caicos-original.jpg',    filtered: '/images/pagesCaraibes/turks_caicos.png'     },
  trinidad:        { original: '/images/destinations/Trinidad and Tobago-original.jpg', filtered: '/images/pagesCaraibes/unnamed.jpg'          },
  cayman:          { original: '/images/destinations/Cayman Islands-original.jpg',      filtered: '/images/pagesCaraibes/grand_cayman.png'     },
  emerging:        { original: '/images/pagesCaraibes/emergency.png',                    filtered: '/images/pagesCaraibes/emergencyfilter.jpg'  },
};

// Override par event-id (cas particuliers : meme ile mais regions differentes)
const EVENT_REGION_OVERRIDE = {
  'stir':            { visuals: REGION_VISUALS.leewardAntilles, slug: 'leeward-antilles', name: 'Leeward Antilles' },
  'bvi-spring-regatta': { visuals: REGION_VISUALS.greaterAntilles, slug: 'greater-antilles', name: 'Greater Antilles' },
  'ior-st-thomas':   { visuals: REGION_VISUALS.greaterAntilles, slug: 'greater-antilles', name: 'Greater Antilles' },
  'mango-bowl':      { visuals: REGION_VISUALS.windward,        slug: 'windward-islands', name: 'Windward Islands' },
};

function getRegionInfo(event) {
  if (event && EVENT_REGION_OVERRIDE[event.id]) return EVENT_REGION_OVERRIDE[event.id];
  const island = event?.island || '';
  if (!island)                                     return { visuals: REGION_VISUALS.greaterAntilles, slug: 'greater-antilles', name: 'Greater Antilles' };
  if (/Barbados/.test(island))                     return { visuals: REGION_VISUALS.windward,        slug: 'windward-islands', name: 'Windward Islands' };
  if (/Grenad/.test(island))                       return { visuals: REGION_VISUALS.windward,        slug: 'windward-islands', name: 'Windward Islands' };
  if (/Sint Maarten|St\.? ?Maarten/.test(island))  return { visuals: REGION_VISUALS.leeward,         slug: 'leeward-islands',  name: 'Leeward Islands' };
  if (/Antigua/.test(island))                      return { visuals: REGION_VISUALS.leeward,         slug: 'leeward-islands',  name: 'Leeward Islands' };
  if (/Saint-Barth|St\.? ?Barth/.test(island))     return { visuals: REGION_VISUALS.leeward,         slug: 'leeward-islands',  name: 'Leeward Islands' };
  if (/\bUSVI\b|St\.? ?Thomas/.test(island))       return { visuals: REGION_VISUALS.leeward,         slug: 'leeward-islands',  name: 'Leeward Islands' };
  if (/\bBVI\b|Tortola/.test(island))              return { visuals: REGION_VISUALS.leeward,         slug: 'leeward-islands',  name: 'Leeward Islands' };
  if (/Martinique|Schoelcher/.test(island))        return { visuals: REGION_VISUALS.windward,        slug: 'windward-islands', name: 'Windward Islands' };
  if (/St\.? ?Vincent|Grenadines/.test(island))    return { visuals: REGION_VISUALS.windward,        slug: 'windward-islands', name: 'Windward Islands' };
  if (/St\.? ?Lucia/.test(island))                 return { visuals: REGION_VISUALS.windward,        slug: 'windward-islands', name: 'Windward Islands' };
  if (/Aruba|Bonaire|Cura/.test(island))           return { visuals: REGION_VISUALS.leewardAntilles, slug: 'leeward-antilles', name: 'Leeward Antilles' };
  if (/Bahamas|Turks|Caicos/.test(island))         return { visuals: REGION_VISUALS.turksCaicos,     slug: 'turks-caicos',     name: 'Turks & Caicos' };
  if (/Trinidad|Tobago/.test(island))              return { visuals: REGION_VISUALS.trinidad,        slug: 'trinidad-tobago',  name: 'Trinidad & Tobago' };
  if (/Cayman/.test(island))                       return { visuals: REGION_VISUALS.cayman,          slug: 'grand-cayman',     name: 'Grand Cayman' };
  if (/Cuba|Puerto Rico|Jamaica|Hispaniola/.test(island)) return { visuals: REGION_VISUALS.greaterAntilles, slug: 'greater-antilles', name: 'Greater Antilles' };
  return { visuals: REGION_VISUALS.emerging, slug: 'emerging-destinations', name: 'Emerging Destinations' };
}

// Coordonnées d'une île par son nom (depuis map-data.js).
// Fallback défensif (ISLANDS || []) — évite un crash si l'import n'est pas
// résolu dans le bundle prod minifié.
function getIslandCoords(name) {
  const found = (ISLANDS || []).find((i) => i.name === name);
  return found ? found.coords : null;
}

// ── Données rectangles (8 items : 4 + 4) ──────────────────────────────────────
// image = nouvelle (repos) ; imageOld = ancienne colorée (apparaît au survol)
const caribbeanIslands = [
  { name: 'Greater Antilles',      image: '/images/pagesCaraibes/greater_antilles.png',  imageOld: '/images/destinations/gretar antilles-original.jpg',     href: '/charters/destinations/carabbean/greater-antilles-v11' },
  { name: 'Leeward Islands',       image: '/images/pagesCaraibes/leeward_island.png',    imageOld: '/images/destinations/Leeward Islands-original.jpg',     href: '/charters/destinations/carabbean/leeward-islands-v11' },
  { name: 'Leeward Antilles',      image: '/images/pagesCaraibes/leeward_antilles.png',  imageOld: '/images/destinations/The Leeward Antilles-original.jpg', href: '/charters/destinations/carabbean/leeward-antilles-v11' },
  { name: 'Windward Islands',      image: '/images/pagesCaraibes/windward_island.png',   imageOld: '/images/destinations/the Windward Islands-original.jpg', href: '/charters/destinations/carabbean/windward-islands-v11' },
  { name: 'Turks & Caicos',        image: '/images/pagesCaraibes/turks_caicos.png',      imageOld: '/images/destinations/Turks and Caicos-original.jpg',    href: '/charters/destinations/carabbean/turks-caicos-v11' },
  { name: 'Trinidad & Tobago',     image: '/images/pagesCaraibes/unnamed.jpg',           imageOld: '/images/destinations/Trinidad and Tobago-original.jpg', href: '/charters/destinations/carabbean/trinidad-tobago-v11' },
  { name: 'Grand Cayman',          image: '/images/pagesCaraibes/grand_cayman.png',      imageOld: '/images/destinations/Cayman Islands-original.jpg',      href: '/charters/destinations/carabbean/grand-cayman-v11' },
  { name: 'Emerging Destinations', image: '/images/pagesCaraibes/emergencyfilter.jpg',   imageOld: '/images/pagesCaraibes/emergency.png',                    href: '/charters/destinations/carabbean/emerging-destinations-v11' },
];

// ── Groupes accordéon ──────────────────────────────────────────────────────────
const islandGroups = [
  { id: 1, name: 'Greater Antilles',      islands: ['Cuba', 'Hispaniola', 'Jamaica', 'Puerto Rico'] },
  { id: 2, name: 'Leeward Islands',       islands: ['Anguilla', 'Saint-Martin / Sint Maarten', 'Saint-Barthélemy', 'Saba & Saint-Eustache', 'Saint-Kitts & Nevis', 'Antigua & Barbuda', 'Montserrat', 'Guadeloupe'] },
  { id: 3, name: 'Leeward Antilles',      islands: ['Aruba', 'Bonaire', 'Curaçao', 'Saint Thomas (USVI)', 'Saint Croix (USVI)', 'Saint John (USVI)', 'Saint James (USVI)', 'Buck Island (USVI)', 'Tortola (BVI)', 'Peter Island (BVI)', 'Jost Van Dyke (BVI)', 'Virgin Gorda (BVI)', 'Anegada (BVI)'] },
  { id: 4, name: 'Windward Islands',      islands: ['Dominica', 'Martinique', 'Saint Lucia', 'Saint Vincent & the Grenadines', 'Mustique', 'Canouan', 'Bequia', 'Tobago Cays', 'Grenada', 'Carriacou', 'Barbados'] },
  { id: 5, name: 'Turks & Caicos',        islands: ['Providenciales', 'Grand Turk', 'South Caicos', 'West Caicos'] },
  { id: 6, name: 'Trinidad & Tobago',     islands: ['Trinidad', 'Tobago'] },
  { id: 7, name: 'Grand Cayman',          islands: ['Grand Cayman', 'Cayman Brac', 'Little Cayman'] },
  { id: 8, name: 'Emerging Destinations', islands: ['Barbuda', 'Petite Martinique', 'Redonda', 'Aves Island', 'Sombrero Island'] },
];

// ── Données cercles ────────────────────────────────────────────────────────────
// nameBelow: true = nom affiché sous le rond (nouvelles destinations avec photo flowers)
const popularDestinations = [
  { name: 'Saint-Vincent-et-les-Grenadines', image: '/images/destinations/flowers/Saint-Vincent-et-les-Grenadines.jpg',  href: '/yachts?destination=saint-vincent', nameBelow: true },
  { name: 'Antigua et Barbuda',               image: '/images/destinations/flowers/Antigua et Barbuda.jpeg',              href: '/yachts?destination=antigua',     nameBelow: true },
  { name: 'British Virgin Islands',           image: '/images/destinations/flowers/British Virgin Islands.jpg',           href: '/yachts?destination=bvi',         nameBelow: true },
  { name: 'Saint-Martin / Sint Maarten',      image: '/images/destinations/flowers/Saint-Martin  Sint Maarten.jpg',       href: '/yachts?destination=saint-martin', nameBelow: true },
  { name: 'St Barthélémy',                     image: '/images/destinations/flowers/St barth Allamanda.jpg',               href: '/yachts?destination=st-barts',    nameBelow: true },
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

// ── FAQ specifique Regatta (Racing Yacht Charter) ─────────────────────────────
const regattaFaqItems = [
  {
    q: "Do I need an owner's representative or boat captain? What is their role?",
    a: "Most of our racing yachts come with a boat captain or owner's representative. This person is not the skipper but serves as a valuable team member, leveraging their in-depth knowledge of the yacht to help you maximize performance and minimize avoidable damage. They can integrate seamlessly into your team, wherever you need them.",
  },
  {
    q: 'How much should I tip the boat captain/crew?',
    a: 'Our crew works tirelessly to ensure your charter is safe, enjoyable, and successful. While tipping is at your discretion, a 10% gratuity is customary if you’ve had a great experience.',
  },
  {
    q: 'Can we include the crew when eating out?',
    a: 'If you’d like to invite the permanent crew to join you for a meal or night out as a gesture of appreciation, please remember that what is a holiday for you is their job. If you choose to include them, we kindly ask that you cover their expenses.',
  },
  {
    q: 'What is racing yacht charter?',
    a: 'Racing yacht charter offers a unique opportunity to charter a race-prepared yacht and compete in regattas worldwide. We cater to all levels, from groups of friends seeking a fun, sunny regatta experience to professional teams aiming for the podium.',
  },
  {
    q: 'Do I need sailing experience to participate?',
    a: 'Sailing experience requirements vary depending on the yacht and regatta. For example, a Volvo 65 may require more experience than a 40-foot racer-cruiser. During the booking process, we’ll discuss any prerequisites to ensure you’re matched with the right yacht.',
  },
  {
    q: 'What is the duration of a racing yacht charter?',
    a: 'Most racing charters include 2 training days prior to the regatta start date. For offshore races, a third day is typically added for boat preparation.',
  },
  {
    q: 'How do I confirm a yacht charter?',
    a: 'To confirm your charter: 1) we’ll send you a charter agreement for signature ; 2) you’ll receive an invoice for the deposit ; 3) once the owner counter-signs the agreement, your charter is officially confirmed.',
  },
  {
    q: 'What additional costs should I expect?',
    a: 'In addition to the charter fee, you may need to cover a security deposit and an Advanced Charter Allowance (ACA) to cover race entry fees, berthing, and other charter-related expenses.',
  },
  {
    q: 'Can you arrange accommodation?',
    a: 'Yes! Our regatta concierge service can handle race entry and berthing, accommodation ashore (hotels, villas), flights, transfers, and restaurant reservations. A 10% service charge applies for concierge services.',
  },
  {
    q: 'What happens after I book?',
    a: 'Once your charter is confirmed: 1) we’ll collect crew information to handle race entry on your behalf ; 2) as the regatta approaches, we’ll connect you with the Boat Captain via WhatsApp and provide useful details about the event and location ; 3) our team is available 24/7 by phone or email to assist with any questions.',
  },
  {
    q: 'Can I charter a yacht for a corporate event?',
    a: 'Absolutely! We offer corporate yacht charters perfect for team-building, client entertainment, or corporate functions.',
  },
  {
    q: 'What insurance will I need?',
    a: 'The yacht is fully insured, but you’ll need personal insurance that specifically covers yacht racing.',
  },
  {
    q: 'What is the security deposit for?',
    a: 'The security deposit covers damage to the yacht beyond normal wear and tear expected during racing. In the worst-case scenario, it covers the insurance excess if a claim is necessary. It also covers less serious damage (e.g., sail damage) that doesn’t warrant an insurance claim. Refund process: if there’s no damage, the deposit is refunded within one week after the charter ; if there is damage, its cost is assessed, and the remaining balance of the deposit is refunded after deductions.',
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

// Hook : déclenche `lit=true` quand l'élément entre dans le viewport.
// Si `replay=true`, se rejoue à chaque entrée/sortie ; sinon, état permanent.
function useScrollLit(delayMs = 0, replay = false) {
  const ref = useRef(null);
  const [lit, setLit] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const timerRef = { current: null };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => setLit(true), delayMs);
          if (!replay) io.disconnect();
        } else if (replay) {
          clearTimeout(timerRef.current);
          setLit(false);
        }
      });
    }, { threshold: 0.25 });
    io.observe(el);
    return () => { clearTimeout(timerRef.current); io.disconnect(); };
  }, [delayMs, replay]);
  return [ref, lit, setLit];
}

// Tracker global de la direction de scroll (singleton côté client).
// Lu par useScrollOscillate au moment où chaque carte entre dans le viewport.
let __scrollDir = 'down';
let __lastScrollY = 0;
if (typeof window !== 'undefined') {
  __lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y === __lastScrollY) return;
    __scrollDir = y > __lastScrollY ? 'down' : 'up';
    __lastScrollY = y;
  }, { passive: true });
}

// Hook : oscille `lit` entre true/false tant que l'élément est en viewport.
// - scroll vers le BAS : délai séquentiel = index * sequentialStepMs (ordre)
// - scroll vers le HAUT : délai random (0-randomMaxMs) pour effet aléatoire
// Puis toggle filtrée ↔ originale toutes les `intervalMs` ms.
function useScrollOscillate({ index = 0, sequentialStepMs = 200, randomMaxMs = 1200, intervalMs = 6000 } = {}) {
  const ref = useRef(null);
  const [lit, setLit] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    let inView = false;
    let startTimer = null;
    let interval = null;
    const stop = () => {
      clearTimeout(startTimer);
      clearInterval(interval);
      startTimer = null;
      interval = null;
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !inView) {
          inView = true;
          const delay = __scrollDir === 'down'
            ? index * sequentialStepMs
            : Math.floor(Math.random() * randomMaxMs);
          startTimer = setTimeout(() => {
            setLit(true);
            interval = setInterval(() => setLit((v) => !v), intervalMs);
          }, delay);
        } else if (!entry.isIntersecting && inView) {
          inView = false;
          stop();
          setLit(false);
        }
      });
    }, { threshold: 0.25 });
    io.observe(el);
    return () => { stop(); io.disconnect(); };
  }, [index, sequentialStepMs, randomMaxMs, intervalMs]);
  return [ref, lit, setLit];
}

// ── Carte rectangulaire ────────────────────────────────────────────────────────
// En vue : cascade en ordre au scroll bas, aléatoire au scroll haut, puis
// oscillation perpétuelle filtrée ↔ originale toutes les 6s (transitions 3s).
function DestCard({ name, image, imageOld, href, index = 0 }) {
  const [ref, lit, setLit] = useScrollOscillate({ index, sequentialStepMs: 400, randomMaxMs: 2000, intervalMs: 8000 });
  function handleClick(e) {
    e.preventDefault(); setLit(true);
    setTimeout(() => { window.location.href = href; }, 800);
  }
  return (
    <a ref={ref} href={href} onClick={handleClick}
      onMouseEnter={() => setLit(true)}
      onTouchStart={() => setLit(true)}
      className="relative overflow-hidden block cursor-pointer h-[220px] md:h-[280px]">
      {/* Fondu enchaîné via le flou :
          - Image qui disparaît : 3s, delay 0
          - Image qui apparaît  : 2.5s, delay 1.2s (démarre quand la 1ère est mi-floue) */}
      {/* Nouvelle image (filtrée) */}
      <Image src={image} alt={name} fill
        className={`object-cover ease-[cubic-bezier(0.4,0,0.2,1)] ${lit ? 'opacity-0 blur-md' : 'opacity-100 blur-0'}`}
        style={{ transitionProperty: 'opacity, filter', transitionDuration: lit ? '3000ms' : '2500ms', transitionDelay: lit ? '0ms' : '1200ms' }} />
      {/* Ancienne image colorée (originale) */}
      {imageOld && (
        <Image src={imageOld} alt={name} fill
          className={`object-cover ease-[cubic-bezier(0.4,0,0.2,1)] ${lit ? 'opacity-100 blur-0' : 'opacity-0 blur-md'}`}
          style={{ transitionProperty: 'opacity, filter', transitionDuration: lit ? '2500ms' : '3000ms', transitionDelay: lit ? '1200ms' : '0ms' }} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-[#c2622a] transition-opacity duration-[3000ms] ${lit ? 'opacity-100' : 'opacity-0'}`} />
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5">
        <h3 className={`trajan-regular text-xs md:text-sm uppercase tracking-[0.15em] transition-colors duration-[3000ms] ${lit ? 'text-[#c2622a]' : 'text-[#acb0cd]'}`}>
          {name}
        </h3>
      </div>
    </a>
  );
}

// ── Bandeau st-barth + CTA — brightness filtré au début, couleur normale au scroll
function StBarthBandeau({ children }) {
  const [ref, lit] = useScrollLit(200);
  return (
    <div ref={ref} className="relative h-[55vh] md:h-[75vh] overflow-hidden">
      <Image
        src="/images/destinations/Caraibes_charters.png"
        alt=""
        fill
        className={`object-cover transition-all duration-[2000ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${lit ? 'brightness-100 blur-0' : 'brightness-50 blur-md'}`}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #26272a 0%, transparent 30%, transparent 55%, #26272a 100%)' }} />
      {children}
    </div>
  );
}

// ── Bandeau photo : commence en version filtrée puis bascule en couleur
// (originale) au scroll, et reste ainsi à la fin. Transition fluide 1.5s.
function BandeauPhoto({ src, srcOld, position = 'center' }) {
  const [ref, lit] = useScrollLit(200);
  return (
    <div ref={ref} className="relative h-[45vh] md:h-[70vh] overflow-hidden">
      {/* Fondu enchaîné asymétrique :
          - Sortante (filtrée) : 3s, delay 0
          - Entrante (originale) : 2.5s, delay 1.2s (apparait quand la 1ère est mi-floue) */}
      <Image src={src} alt="" fill
        className={`object-cover ease-[cubic-bezier(0.4,0,0.2,1)] ${lit && srcOld ? 'opacity-0 blur-md' : 'opacity-100 blur-0'}`}
        style={{ objectPosition: position, transitionProperty: 'opacity, filter', transitionDuration: lit && srcOld ? '3000ms' : '2500ms', transitionDelay: lit && srcOld ? '0ms' : '1200ms' }} />
      {/* Ancienne image (originale, finale) */}
      {srcOld && (
        <Image src={srcOld} alt="" fill
          className={`object-cover ease-[cubic-bezier(0.4,0,0.2,1)] ${lit ? 'opacity-100 blur-0' : 'opacity-0 blur-md'}`}
          style={{ objectPosition: position, transitionProperty: 'opacity, filter', transitionDuration: lit ? '2500ms' : '3000ms', transitionDelay: lit ? '1200ms' : '0ms' }} />
      )}
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
  // Taille : plus grande pour les nouvelles destinations (nameBelow)
  const size = nameBelow
    ? 'w-[130px] h-[130px] md:w-[155px] md:h-[155px]'
    : 'w-[110px] h-[110px] md:w-[130px] md:h-[130px]';
  const wrapper = nameBelow ? '160px' : '135px';
  return (
    <div
      onClick={activate} onMouseEnter={activate} onMouseLeave={deactivate}
      onTouchStart={activate} onTouchEnd={deactivate}
      className="flex flex-col items-center shrink-0 snap-center cursor-pointer gap-2 px-0 py-1"
      style={{ width: wrapper }}>
      {/* border séparé de overflow-hidden pour ne pas être coupé */}
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

// ── Modal carte : un point sur l'île cliquée ──────────────────────────────────
// Leaflet chargé via CDN (comme test-region-map). island = { name, coords }.
function IslandMapModal({ island, onClose }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [leafletReady, setLeafletReady] = useState(false);

  // Charger Leaflet (CSS + JS) une seule fois pour toute la page
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.L) { setLeafletReady(true); return; }

    if (!document.querySelector('link[data-leaflet-css]')) {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      css.setAttribute('data-leaflet-css', '');
      document.head.appendChild(css);
    }

    const existing = document.querySelector('script[data-leaflet-js]');
    if (existing) {
      if (window.L) setLeafletReady(true);
      else existing.addEventListener('load', () => setLeafletReady(true));
      return;
    }
    const js = document.createElement('script');
    js.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    js.setAttribute('data-leaflet-js', '');
    js.onload = () => setLeafletReady(true);
    document.body.appendChild(js);
  }, []);

  // Init la carte + marker dès que Leaflet est prêt et qu'une île est sélectionnée
  useEffect(() => {
    if (!leafletReady || !island || !island.coords || !mapRef.current) return;
    const L = window.L;
    const map = L.map(mapRef.current, {
      center: island.coords,
      zoom: 5,
      scrollWheelZoom: false,
    });
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 19,
    }).addTo(map);

    const icon = L.divIcon({
      className: 'island-modal-marker',
      html: `<div style="width:16px;height:16px;background:#c2622a;border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 2px #c2622a,0 2px 8px rgba(0,0,0,0.6)"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });
    L.marker(island.coords, { icon }).addTo(map)
      .bindTooltip(island.name, { permanent: true, direction: 'right', offset: [10, 0], className: 'island-modal-label' });

    // La modal s'ouvre après le rendu → recalcule la taille de la carte
    const t = setTimeout(() => map.invalidateSize(), 150);
    return () => { clearTimeout(t); map.remove(); mapInstanceRef.current = null; };
  }, [leafletReady, island]);

  // Fermeture clavier (Échap)
  useEffect(() => {
    if (!island) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [island, onClose]);

  if (!island) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <style>{`
        .leaflet-tooltip.island-modal-label {
          background: rgba(255,255,255,0.9) !important; border: 1px solid #c2622a !important;
          box-shadow: 0 1px 4px rgba(0,0,0,0.3) !important;
          color: #26272a; font-family: system-ui, sans-serif; font-size: 12px; font-weight: 700;
          padding: 2px 7px; letter-spacing: 0.2px; border-radius: 6px;
        }
        .leaflet-tooltip.island-modal-label::before { display: none !important; }
      `}</style>
      <div className="relative w-full max-w-3xl bg-[#2e2f32] rounded-2xl border border-[#C0C0C0]/30 overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#c2622a]" />
            <h3 className="trajan-regular text-[#acb0cd] text-sm md:text-base uppercase tracking-[0.15em]">{island.name}</h3>
          </div>
          <button onClick={onClose} aria-label="Fermer"
            className="w-8 h-8 flex items-center justify-center rounded-full border border-[#C0C0C0]/30 text-[#acb0cd] hover:border-[#c2622a] hover:text-[#c2622a] transition-colors cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="relative h-[55vh] md:h-[60vh] bg-[#3a3b3f]">
          <div ref={mapRef} className="absolute inset-0" />
          {!leafletReady && (
            <div className="absolute inset-0 flex items-center justify-center text-[#acb0cd]/70 text-sm">
              Chargement de la carte…
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Accordéon groupe (destinations by region) ─────────────────────────────────
function IslandGroup({ group, defaultOpen, onIslandSelect }) {
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
        <div className="pb-5 flex flex-wrap justify-center gap-2 px-1">
          {group.islands.map((island, i) => {
            const coords = getIslandCoords(island);
            return (
              <button key={i} type="button"
                onClick={() => coords && onIslandSelect({ name: island, coords })}
                disabled={!coords}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#C0C0C0]/40 bg-[#26272a] text-[#acb0cd] text-xs transition-colors hover:border-[#c2622a] hover:text-[#c2622a] cursor-pointer disabled:opacity-50 disabled:cursor-default">
                <span className="text-[#c2622a] text-[8px]">›</span>
                {island}
                <MapPin className="w-3 h-3 text-[#c2622a]/70" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Accordéon FAQ ─────────────────────────────────────────────────────────────
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

// ── Trait blanc (title-line.png) ───────────────────────────────────────────────
// Charte: pas de trait orange sous les titres → on utilise toujours le title-line blanc.
function BurntLine() {
  return (
    <div className="relative w-32 h-6 mx-auto my-4 md:my-6">
      <Image src="/images/title-line.png" alt="" fill className="object-contain" />
    </div>
  );
}

// ── Section fond ───────────────────────────────────────────────────────────────
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

// ── Card d'une regatte (A2 : photo region + texte fade in/out + Link) ─────────
function RegattaEventCard({ event, index = 0 }) {
  const [open, setOpen] = useState(false);
  const info = getRegionInfo(event);
  const delay = (index * 1.5) % 7;
  // Toutes les cards utilisent la version originale couleur.
  const photoSrc = info.visuals.original;
  return (
    <Link
      href={`/charters/destinations/carabbean/regatta/${event.id}`}
      className="block rounded-2xl border border-[#C0C0C0]/30 bg-[#3a3b3f]/80 backdrop-blur-sm overflow-hidden transition-all hover:border-[#B03E00]/60 cursor-pointer"
    >
      {/* Photo header : alterne entre version originale et filtree (contraste cote a cote) */}
      <div className="relative h-44 md:h-52 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${encodeURI(photoSrc)}')`, opacity: 0.55 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#26272a]/40 via-[#26272a]/25 to-[#26272a]/75" />
        <span className="absolute top-3 right-3 inline-block px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold tracking-wide bg-[#B03E00] border border-[#C0C0C0] text-[#C0C0C0] whitespace-nowrap shadow-lg z-10">
          {event.dates}
        </span>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5"
          style={{ animation: 'cardTextFade 7s ease-in-out infinite', animationDelay: `${delay}s` }}>
          <h4 className="trajan-regular font-bold text-sm md:text-base uppercase tracking-[0.12em] text-[#C0C0C0] leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            {event.name}
          </h4>
          <p className="trajan-regular text-base md:text-xl uppercase tracking-[0.15em] text-[#acb0cd] mt-3 flex items-center justify-center gap-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 inline text-[#c2622a]" /> {event.island}
          </p>
        </div>
      </div>
      <div className="px-5 pt-4 pb-4 flex flex-wrap gap-1.5">
        {event.categories.map((catKey) => {
          const cat = getCategoryInfo(catKey);
          if (!cat) return null;
          return (
            <span key={catKey} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] uppercase tracking-wide bg-[#26272a] border border-[#C0C0C0]/20 text-[#acb0cd]">
              {cat.label}
            </span>
          );
        })}
      </div>
      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen((v) => !v); }}
        className="w-full px-5 py-2 text-[11px] uppercase tracking-[0.2em] text-[#c2622a] border-t border-[#C0C0C0]/15 hover:bg-[#B03E00]/5 transition-colors">
        {open ? 'Show less' : 'Read more'}
      </button>
      {open && (
        <div className="px-5 py-4 border-t border-[#C0C0C0]/15 space-y-3 text-xs md:text-sm text-[#acb0cd]/80"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
          {event.description.island && (
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#c2622a] mb-1">The Island</p>
              <p className="leading-relaxed">{event.description.island}</p>
            </div>
          )}
          {event.description.race && (
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#c2622a] mb-1">The Race</p>
              <p className="leading-relaxed">{event.description.race}</p>
            </div>
          )}
          {event.description.nightlife && (
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#c2622a] mb-1">Off the Water</p>
              <p className="leading-relaxed">{event.description.nightlife}</p>
            </div>
          )}
          {event.footer && (
            <p className="text-[11px] italic text-[#d39478] pt-2 border-t border-[#C0C0C0]/10">{event.footer}</p>
          )}
        </div>
      )}
    </Link>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function CaribbeanV15Page({ params }) {
  const { type } = use(params);
  // FAQ specifique pour regatta (racing), generique pour les autres voiliers.
  const faqList = type === 'regatta' ? regattaFaqItems : faqItems;
  const faqTitle = type === 'regatta' ? 'Racing Yacht Charter — Frequently Asked Questions' : 'Your Luxury Yacht Charter, Explained';

  // Calendrier regatta 2027 : groupement par mois (sans filtre, tous events affiches)
  const regattaByMonth = useMemo(() => groupByMonth(REGATTAS_2027), []);

  // Hero photo : regatta a sa propre photo racing dediee, les autres voiliers gardent le yacht v15.
  const heroMobileSrc = type === 'regatta' ? '/images/sailing/only for you caraibes.jpg' : '/images/yachts/yatch2.jpeg';
  const heroDesktopSrc = type === 'regatta' ? '/images/sailing/only for you caraibes.jpg' : '/images/yachts/Yatch_desktop.png';

  const heroRef = useRef(null);
  const [activeIsland, setActiveIsland] = useState(null);
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
        @keyframes cardTextFade {
          0%, 100% { opacity: 0; }
          25%, 75% { opacity: 1; }
        }
      `}</style>

      <div className="bg-[#26272a] text-[#acb0cd] overflow-x-hidden">

        {/* ══ HERO ══ */}
        {/* Mobile : aspect-[6/5] + object-cover, titre EN-DESSOUS.
            Desktop : image pleine largeur (natural ratio), titre OVERLAY en bas avec dégradé. */}
        <div className="pt-[70px] md:pt-0 bg-[#26272a]">
          {/* Mobile : image seule */}
          <div className="relative aspect-[6/5] md:hidden">
            <Image src={heroMobileSrc} alt="" fill priority className="object-cover object-center" />
          </div>
          {/* Desktop : photo dediee paysage en pleine largeur, ratio naturel. */}
          <div className="hidden md:block relative w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroDesktopSrc}
              alt=""
              className="block w-full h-auto"
            />
            {/* Dégradé bas pour lisibilité du texte */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
            {/* Texte overlay */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-4 pb-10 md:pb-16">
              <div ref={heroRef} className="reveal-up flex flex-col items-center w-full">
                <h1 className="trajan-regular text-6xl lg:text-7xl uppercase tracking-[0.15em] text-[#acb0cd] text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                  The Caribbean
                </h1>
                <BurntLine />
                <p className="text-[#acb0cd] text-xl uppercase tracking-[0.25em] font-light text-center drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                  The Ultimate Luxury Yachting Destination
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ══ TITRE mobile (sous l'image, desktop : caché) ══ */}
        <div className="bg-[#26272a] px-4 py-10 flex flex-col items-center md:hidden">
          <div className="flex flex-col items-center w-full">
            <h1 className="trajan-regular text-3xl uppercase tracking-[0.1em] text-[#acb0cd] text-center">
              The Caribbean
            </h1>
            <BurntLine />
            <p className="text-[#acb0cd] text-sm uppercase tracking-[0.15em] font-light text-center">
              The Ultimate Luxury Yachting Destination
            </p>
          </div>
        </div>

        {/* ══ DESCRIPTION ══ */}
        <CloudSection className="bg-[#26272a] py-14 md:py-28 px-5 md:px-20" bg="/images/nuagesAncien.png">
          {/* Texte en vert UNIQUEMENT sur regatta pour notifier le changement (4 paragraphes seulement) */}
          <div className={`max-w-4xl mx-auto text-center leading-relaxed space-y-5 md:space-y-6 ${type === 'regatta' ? 'text-[#22c55e]' : 'text-[#acb0cd]'}`}>
            <p className="text-lg md:text-2xl">
              A paradise of <span className="text-[#d39478] font-semibold">turquoise waters</span>,{' '}
              <span className="text-[#d39478] font-semibold">powder-white beaches</span>,{' '}
              <span className="text-[#d39478] font-semibold">vibrant coral reefs</span>, and{' '}
              <span className="text-[#d39478] font-semibold">lush tropical forests</span>,
              the Caribbean stands as{' '}
              <span className="text-[#d39478] font-semibold">the world's premier destination</span> for luxury yacht charters.
            </p>
            <p className="text-base md:text-xl max-w-3xl mx-auto">
              From <span className="text-[#d39478] font-semibold">untamed natural beauty</span> and pirate legends of the Leeward and Windward Islands to the opulence
              of <span className="text-[#d39478] font-semibold">Michelin-starred restaurants</span> and{' '}
              <span className="text-[#d39478] font-semibold">ultra-luxury resorts</span> in St. Martin and St. Barts, the Caribbean
              offers an unparalleled sailing experience.
            </p>
            <p className="text-base md:text-xl max-w-2xl mx-auto">
              Comprising <span className="text-[#d39478] font-semibold">twenty-six countries</span> and over{' '}
              <span className="text-[#d39478] font-semibold">seven hundred islands</span>, cays, and islets—including the Greater
              and Lesser Antilles—the Caribbean is a mosaic of crystal-clear seas, palm-fringed shores, and a rich
              cultural tapestry blending <span className="text-[#d39478] font-semibold">Creole, French, Dutch, and British</span> influences.
            </p>
            <p className="text-sm md:text-lg max-w-xl mx-auto">
              For discerning clients seeking the finest in yacht charters, the Caribbean delivers a seamless blend
              of exclusivity and adventure. Whether it's the glamour of{' '}
              <span className="text-[#d39478] font-semibold">Turks and Caicos</span>, the sophistication of{' '}
              <span className="text-[#d39478] font-semibold">St. Barts</span>, or{' '}
              <span className="text-[#d39478] font-semibold">private island resorts accessible only by sea</span>, this region promises an elite escape
              where every moment is crafted for the extraordinary.
            </p>
          </div>
        </CloudSection>

        {/* ══ BANDEAU cocomer — couleur au hover 4s ══ */}
        <BandeauPhoto src="/images/pagesCaraibes/cocomer.jpeg" srcOld="/images/pagesCaraibes/cocomer-original.jpeg" position="center 40%" />

        {/* ══ 2027 REGATTA CALENDAR (uniquement pour type === 'regatta') ══ */}
        {type === 'regatta' && (
          <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16">
            <div className="max-w-7xl mx-auto">
              <RevealBlock label="Sailing Calendar" title="2027 Regatta Calendar" sub="From January to November — racing, classics, traditions, juniors and luxury" />

              {/* Timeline mois par mois (sans filtre — affiche TOUS les events) */}
              <div className="space-y-12">
                {MONTHS_2027.map((month, mi) => {
                  const events = regattaByMonth[month.key];
                  if (!events || events.length === 0) return null;
                  return (
                    <div key={month.key}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-[#C0C0C0]/20" />
                        <h3 className="trajan-regular text-xl md:text-2xl uppercase tracking-[0.2em] text-[#acb0cd] italic">
                          {month.label}
                        </h3>
                        <div className="flex-1 h-px bg-[#C0C0C0]/20" />
                      </div>
                      {/* flex-wrap + justify-center : card seule sur sa ligne reste centree */}
                      <div className="flex flex-wrap justify-center gap-5 md:gap-6 items-start">
                        {events.map((event, ei) => (
                          <div key={event.id} className="w-full md:w-[calc(50%-12px)]">
                            <RegattaEventCard event={event} index={mi * 2 + ei} />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                {Object.keys(regattaByMonth).length === 0 && (
                  <p className="text-center text-[#acb0cd]/60 italic py-8">No events match this filter.</p>
                )}
              </div>
            </div>
          </CloudSection>
        )}

        {/* ══ CARIBBEAN ISLANDS — rectangles 4 + 4 (8 cards) ══ */}
        <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16">
          <div className="max-w-7xl mx-auto">
            <RevealBlock label="Explore" title="Caribbean Islands" sub="The most sought-after islands for luxury yacht charters" />
            {/* Ligne 1 : 2 col mobile / 4 col desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 mb-px">
              {caribbeanIslands.slice(0, 4).map((island, i) => <DestCard key={i} index={i} {...island} />)}
            </div>
            {/* Ligne 2 : 2 col mobile / 4 col desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
              {caribbeanIslands.slice(4, 8).map((island, i) => <DestCard key={i} index={4 + i} {...island} />)}
            </div>
          </div>
        </CloudSection>

        {/* ══ ACCORDÉONS destinations by region ══ */}
        <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16">
          <div className="max-w-7xl mx-auto">
            <RevealBlock label="Archipelagos" title="Destinations by Region" sub="Seven groups — over 700 islands" />
            {/* Layout 3+3 puis les 2 derniers (Grand Cayman + Emerging) centres */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
              {islandGroups.slice(0, -2).map((group, i) => (
                <div key={group.id}>
                  <IslandGroup group={group} defaultOpen={i < 3} onIslandSelect={setActiveIsland} />
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-x-12 gap-y-6">
              {islandGroups.slice(-2).map((group) => (
                <div key={group.id} className="w-full md:w-[calc((100%-3rem)/3)]">
                  <IslandGroup group={group} defaultOpen={false} onIslandSelect={setActiveIsland} />
                </div>
              ))}
            </div>
          </div>
        </CloudSection>

        {/* ══ BANDEAU palmiers — couleur au hover 4s ══ */}
        <BandeauPhoto src="/images/pagesCaraibes/palmierscaraibes.jpeg" srcOld="/images/pagesCaraibes/palmierscaraibes-original.jpeg" />

        {/* ══ POPULAR DESTINATIONS — cercles slider ══ */}
        <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16">
          <div className="max-w-7xl mx-auto">
            <RevealBlock label="Anchorages & Marinas" title="Popular Destinations" sub="The most exclusive marinas and anchorages in the Caribbean" />
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-0 md:gap-1 pt-2 pb-4 -mx-4 px-4 scrollbar-hide md:justify-center md:flex-wrap md:overflow-visible md:mx-0 md:px-0">
              {popularDestinations.map((dest, i) => <CircleCard key={i} {...dest} />)}
            </div>
          </div>
        </CloudSection>

        {/* ══ BANDEAU st-barth + CTA — filtré au début, original à la fin ══ */}
        <StBarthBandeau>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6 gap-5">
            {/* Card 1 : Ready to Sail + titre (transparent 20%, texte lavande) */}
            <div className="rounded-2xl border border-[#C0C0C0] bg-[#3a3b3f]/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 max-w-xs md:max-w-xl">
              <p className="text-[10px] md:text-sm uppercase tracking-[0.3em] mb-2 md:mb-3 text-[#acb0cd]">Ready to Sail</p>
              <h2 className="trajan-regular text-xl md:text-5xl uppercase tracking-[0.08em] md:tracking-[0.12em] leading-tight text-[#acb0cd]">
                Plan Your Caribbean Charter
              </h2>
            </div>

            {/* Card 2 : phrase support (transparent 20%, texte lavande) */}
            <div className="rounded-2xl border border-[#C0C0C0] bg-[#3a3b3f]/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 max-w-xs md:max-w-md">
              <p className="text-sm md:text-base leading-relaxed text-[#acb0cd]">
                Our team of experts is available 24/7 to create your bespoke yachting itinerary across the Caribbean.
              </p>
            </div>

            <a href="/charters/destinations/caribbean-v15/exploreyacht"
              style={{ color: '#c2622a', backgroundColor: '#26272a', borderColor: '#C0C0C0' }}
              className="trajan-regular text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] px-7 md:px-10 py-3 md:py-4 border rounded-full hover:bg-[#c2622a] hover:text-white hover:border-[#c2622a] transition-all duration-300">
              Explore Sailing
            </a>
          </div>
        </StBarthBandeau>

        {/* ══ FAQ ══ */}
        <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16" bg="/images/nuagesAncien.png">
          <div className="max-w-7xl mx-auto">
            <RevealBlock
              label="Frequently Asked Questions"
              title={faqTitle}
              sub=""
              useTitleLine
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
              {faqList.map((item, i) => (
                <div key={i} className={faqList.length % 3 !== 0 && i === faqList.length - 1 ? 'md:col-start-2' : ''}>
                  <FaqItem q={item.q} a={item.a} />
                </div>
              ))}
            </div>
          </div>
        </CloudSection>

      </div>

      {/* Modal carte d'une île (Destinations by Region) */}
      <IslandMapModal island={activeIsland} onClose={() => setActiveIsland(null)} />
    </>
  );
}
