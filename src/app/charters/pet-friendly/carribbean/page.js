'use client';

// ══ /charters/pet-friendly/carribbean ══
//
// Declinaison Pet-Friendly de /charters/carribbean, sur le meme modele que
// /charters/only-couple/carribbean : meme structure, meme composants locaux,
// seule la partie editoriale change.
//
// Deux ecarts demandes par rapport a la page generique :
//   - le bandeau video CocomerBand (plage au coucher de soleil, bois flotte)
//     est retire ;
//   - des CTA sont ajoutes.
//
// Regle editoriale : AUCUNE politique animaux n'est promise. Elle depend du
// yacht, de son pavillon et des regles d'importation de chaque ile — cela se
// verifie au cas par cas, et le texte le dit.


import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { MapPin, X } from 'lucide-react';
import { ISLANDS } from '../../../test-region-map/map-data';

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

// ── Page ───────────────────────────────────────────────────────────────────────
export default function PetFriendlyCaribbeanPage() {
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
      `}</style>

      <div className="bg-[#26272a] text-[#acb0cd] overflow-x-hidden">

        {/* ══ HERO ══
            La photo fournie est un portrait 3:4. L'etirer en bandeau large la
            rognait a l'extreme : le visage remplissait le cadre et le titre
            passait par-dessus le chien. Deux traitements distincts :
              - mobile, ou le portrait tombe juste : image plein cadre, titre en
                overlay sur un degrade sombre neutre ;
              - desktop : hero en deux colonnes, texte a gauche, photo entiere a
                droite dans son propre ratio. Aucun voile bleu. */}

        {/* Mobile */}
        <section className="relative w-full pt-[70px] h-[76vh] min-h-[480px] overflow-hidden bg-[#26272a] md:hidden">
          <Image
            src="/media/client/pet-friendly/compagnon-hero.webp"
            alt="Guest holding a small dog on the deck of a yacht"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[58%_22%]"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(38,39,42,0.35) 0%, rgba(38,39,42,0.05) 26%, rgba(38,39,42,0.72) 66%, rgba(38,39,42,0.97) 100%)',
            }}
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center text-center px-5 pb-9">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#bd9973] font-semibold mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
              Pet-Friendly Charter
            </p>
            <h1 className="trajan-regular text-3xl uppercase tracking-[0.1em] text-[#acb0cd] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              The Caribbean
            </h1>
            <BurntLine />
            <p className="text-[#acb0cd] text-sm uppercase tracking-[0.18em] font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Cruising the Islands, Together
            </p>
          </div>
        </section>

        {/* Desktop : deux colonnes */}
        <section className="hidden md:grid md:grid-cols-2 w-full h-[86vh] min-h-[560px] bg-[#26272a]">
          <div className="flex flex-col items-start justify-center px-14 lg:px-20">
            <div ref={heroRef} className="reveal-up flex flex-col items-start w-full max-w-xl">
              <p className="text-[13px] uppercase tracking-[0.3em] text-[#bd9973] font-semibold mb-5">
                Pet-Friendly Charter
              </p>
              <h1 className="trajan-regular text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#acb0cd] leading-[1.05]">
                The Caribbean
              </h1>
              <span aria-hidden className="mt-7 mb-6 block h-px w-28 bg-[#bd9973]/70" />
              <p className="text-[#acb0cd] text-lg uppercase tracking-[0.22em] font-light">
                Cruising the Islands, Together
              </p>
              <p className="mt-7 text-[15px] leading-[1.8] text-[#acb0cd]/85">
                Turquoise passages, secluded anchorages &mdash; and no one left behind.
              </p>
            </div>
          </div>
          <div className="relative h-full overflow-hidden">
            <Image
              src="/media/client/pet-friendly/compagnon-hero.webp"
              alt="Guest holding a small dog on the deck of a yacht"
              fill
              priority
              sizes="50vw"
              className="object-cover object-[55%_35%]"
            />
            {/* Raccord doux vers le fond de page, cote gauche et bas. */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, rgba(38,39,42,0.85) 0%, rgba(38,39,42,0) 22%), linear-gradient(180deg, rgba(38,39,42,0) 70%, rgba(38,39,42,0.9) 100%)',
              }}
            />
          </div>
        </section>

        {/* ══ CONTENU EDITORIAL PET-FRIENDLY ══
            Texte fourni par la cliente, repris sans ajout : les engagements
            (documents officiels, coordination veterinaire, formalites portuaires)
            sont les siens. Rien n'a ete invente ici. */}
        <CloudSection className="bg-[#26272a] py-14 md:py-24 px-5 md:px-20" bg="/images/nuagesAncien.png">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.12em] text-[#acb0cd] mb-3">
              Pet-Friendly Luxury Yacht Charter
            </h2>
            <p className="text-lg md:text-2xl text-[#bd9973] italic mb-8">
              Your Companion, Welcome Aboard
            </p>
            <p className="text-base md:text-xl text-[#acb0cd] leading-relaxed">
              For our most discerning clients, true luxury means never leaving family behind &mdash;
              including your <span className="text-[#bd9973] font-semibold">four-legged companions</span>.
              We curate pet-friendly superyacht charters that combine absolute comfort, discretion, and
              seamless logistics, so you and your pet can sail in complete ease.
            </p>
          </div>
        </CloudSection>

        {/* ══ LES TROIS VOLETS ══ */}
        <div className="bg-[#26272a] px-5 md:px-20 pb-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

            <article className="rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32] p-7 flex flex-col h-full">
              <span aria-hidden className="h-1 w-1 rounded-full bg-[#c2622a] mb-5" />
              <h3 className="trajan-regular text-lg md:text-xl uppercase tracking-[0.08em] text-[#C0C0C0] leading-snug">
                Bespoke Yachts That Welcome Pets
              </h3>
              <p className="mt-4 text-[15px] leading-[1.7] text-[#acb0cd]">We pre-select vessels that:</p>
              <ul className="mt-3 space-y-2 text-[15px] leading-[1.7] text-[#acb0cd] text-left">
                <li className="flex gap-3"><span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#bd9973]" />Explicitly accept well-behaved dogs and cats</li>
                <li className="flex gap-3"><span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#bd9973]" />Offer safe deck spaces and non-slip surfaces</li>
                <li className="flex gap-3"><span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#bd9973]" />Have crew experienced with pets and related protocols</li>
                <li className="flex gap-3"><span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#bd9973]" />Can accommodate custom requests (beds, feeding stations, shaded areas)</li>
              </ul>
              <p className="mt-5 text-[15px] leading-[1.7] text-[#acb0cd]">
                Tell us about your pet and your ideal destination; we match you to the right yacht and itinerary.
              </p>
            </article>

            <article className="rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32] p-7 flex flex-col h-full">
              <span aria-hidden className="h-1 w-1 rounded-full bg-[#c2622a] mb-5" />
              <h3 className="trajan-regular text-lg md:text-xl uppercase tracking-[0.08em] text-[#C0C0C0] leading-snug">
                Regulations &amp; Documentation, Handled End-to-End
              </h3>
              <p className="mt-4 text-[15px] leading-[1.7] text-[#acb0cd]">
                International pet travel is highly regulated. Requirements vary by country and can include
                microchips, vaccinations, blood tests, health certificates, import permits, and sometimes
                quarantine. We:
              </p>
              <ul className="mt-3 space-y-2 text-[15px] leading-[1.7] text-[#acb0cd] text-left">
                <li className="flex gap-3"><span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#bd9973]" />Advise on the most pet-friendly destinations and routes</li>
                <li className="flex gap-3"><span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#bd9973]" />Coordinate with your veterinarian for all tests and certificates</li>
                <li className="flex gap-3"><span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#bd9973]" />Arrange official documentation (EU Pet Passport, APHIS forms, rabies titers, import permits)</li>
                <li className="flex gap-3"><span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#bd9973]" />Liaise with local authorities and port agents for smooth entry and exit</li>
              </ul>
              <p className="mt-5 text-[15px] leading-[1.7] text-[#acb0cd]">
                You focus on the journey; we manage the paperwork and compliance.
              </p>
            </article>

            <article className="rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32] p-7 flex flex-col h-full">
              <span aria-hidden className="h-1 w-1 rounded-full bg-[#c2622a] mb-5" />
              <h3 className="trajan-regular text-lg md:text-xl uppercase tracking-[0.08em] text-[#C0C0C0] leading-snug">
                Onboard Comfort &amp; Premium Pet Experiences
              </h3>
              <p className="mt-4 text-[15px] leading-[1.7] text-[#acb0cd]">
                Life on board is designed around your pet&rsquo;s well-being:
              </p>
              <ul className="mt-3 space-y-2 text-[15px] leading-[1.7] text-[#acb0cd] text-left">
                <li className="flex gap-3"><span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#bd9973]" />Designated pet areas on deck with secure railings and shade</li>
                <li className="flex gap-3"><span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#bd9973]" />Crew trained in pet etiquette, feeding routines, and basic care</li>
                <li className="flex gap-3"><span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#bd9973]" />Custom beds, crates, bowls, diet-specific provisioning, and pet-friendly cleaning products on request</li>
              </ul>
              <p className="mt-5 text-[15px] leading-[1.7] text-[#acb0cd]">We can also arrange:</p>
              <ul className="mt-3 space-y-2 text-[15px] leading-[1.7] text-[#acb0cd] text-left">
                <li className="flex gap-3"><span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#bd9973]" />Private beach days and pet-safe coastal hikes</li>
                <li className="flex gap-3"><span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#bd9973]" />Exclusive island visits where pets are permitted ashore</li>
                <li className="flex gap-3"><span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#bd9973]" />Pet concierge services, sitters, and grooming or spa-style care in port</li>
              </ul>
            </article>

          </div>
        </div>

        {/* ══ HOW TO BOOK ══ */}
        <div className="bg-[#26272a] px-5 md:px-20 py-14 md:py-20">
          <div className="max-w-4xl mx-auto">
            <h3 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#acb0cd] text-center mb-10">
              How to Book
            </h3>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-5 list-none p-0 m-0">
              {[
                'Share your travel window, preferred region, and details about your pet (breed, size, temperament, special needs).',
                'Receive a curated selection of pet-friendly yachts with proposed itineraries.',
                'We handle all logistics: documentation, vet coordination, port formalities, and onboard preparations.',
                'Board with confidence, knowing every detail has been arranged.',
              ].map((etape, i) => (
                <li key={i} className="flex gap-4 rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32] p-6">
                  <span className="trajan-regular shrink-0 text-2xl leading-none text-[#c2622a]">{i + 1}</span>
                  <span className="text-[15px] leading-[1.7] text-[#acb0cd]">{etape}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* ══ CTA — apres le contenu editorial ══
            Style CTA valide du site : bordure argent, interieur #26272A, texte
            cuivre, lueur argentee, hauteur minimale 48px, focus clavier visible. */}
        <div className="bg-[#26272a] px-5 md:px-20 pb-14 md:pb-20">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/request-quote"
              className="inline-flex min-h-[48px] max-w-full items-center justify-center text-center px-8 py-3.5 rounded-full border border-[#C0C0C0] bg-[#26272a] text-[13px] font-semibold uppercase tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
            >
              Plan Your Pet-Friendly Charter
            </a>
            <a
              href="/#contact"
              className="inline-flex min-h-[48px] max-w-full items-center justify-center text-center px-8 py-3.5 rounded-full border border-[#C0C0C0] bg-[#26272a]/50 backdrop-blur-sm text-[13px] font-semibold uppercase tracking-[0.18em] text-[#C0C0C0] transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_18px_rgba(194,98,42,0.35)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
            >
              Speak to Our Team
            </a>
          </div>
        </div>

        {/* ══ BANDE PHOTO ══
            Les trois autres photos fournies par la cliente, a la place laissee
            libre par le bandeau video retire. Purement illustratif. */}
        <div className="bg-[#26272a] px-5 md:px-20 pb-14 md:pb-20">
          <div className="max-w-5xl mx-auto grid grid-cols-3 gap-3 md:gap-4">
            {[
              { src: '/media/client/pet-friendly/paddle.webp', alt: 'Two dogs sitting on a paddleboard in clear water' },
              { src: '/media/client/pet-friendly/chiot-coucher.webp', alt: 'Puppy asleep on a yacht deck at sunset' },
              { src: '/media/client/pet-friendly/nage.webp', alt: 'Dog swimming in clear green water' },
            ].map((photo) => (
              <div key={photo.src} className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 33vw, 300px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

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
            <RevealBlock label="Archipelagos" title="Destinations by Region" sub="Eight groups — over 700 islands" />
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
                Bring Them Along
              </h2>
            </div>

            {/* Card 2 : phrase support (transparent 20%, texte lavande) */}
            <div className="rounded-2xl border border-[#C0C0C0] bg-[#3a3b3f]/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 max-w-xs md:max-w-md">
              <p className="text-sm md:text-base leading-relaxed text-[#acb0cd]">
                Tell us your dates, your islands and who is travelling. We will confirm which yachts can
                welcome your companion, and what each destination requires.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <a href="/request-quote"
                style={{ color: '#c2622a', backgroundColor: '#26272a', borderColor: '#C0C0C0' }}
                className="trajan-regular inline-flex min-h-[48px] items-center justify-center text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] px-7 md:px-10 py-3 md:py-4 border rounded-full hover:bg-[#c2622a] hover:text-white hover:border-[#c2622a] transition-all duration-300 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]">
                Design Your Charter
              </a>
              <a href="/charters/destinations/caribbean-v15/exploreyacht"
                style={{ color: '#C0C0C0', backgroundColor: 'rgba(38,39,42,0.5)', borderColor: '#C0C0C0' }}
                className="trajan-regular inline-flex min-h-[48px] items-center justify-center text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] px-7 md:px-10 py-3 md:py-4 border rounded-full backdrop-blur-sm hover:border-[#c2622a] transition-all duration-300 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]">
                Explore Yachts
              </a>
            </div>
          </div>
        </StBarthBandeau>

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

      {/* Modal carte d'une île (Destinations by Region) */}
      <IslandMapModal island={activeIsland} onClose={() => setActiveIsland(null)} />
    </>
  );
}
