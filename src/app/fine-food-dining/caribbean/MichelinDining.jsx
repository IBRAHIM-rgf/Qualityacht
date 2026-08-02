'use client';

// ══ Fine Food — Carte directe + tables d'exception ══
// Carte Leaflet (chargee via CDN, comme les modales d'iles) piquee des meilleures
// tables des Caraibes — chefs francais etoiles ou distinctions equivalentes
// (Relais & Chateaux, gastronomique). Sous la carte : cartes restaurant (nom, chef,
// lieu, distinction, courte desc, photo). Selection editoriale, AUCUNE affiliation.

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { media } from '@/lib/quality-media';

const FOOD = media({ cat: 'food', kind: 'image' }).map((m) => m.src);

// Selection reelle (a titre indicatif). coords = [lat, lng].
const RESTAURANTS = [
  { name: 'Le Gaïac', place: 'Le Toiny — St-Barthélemy', chef: 'Cuisine gastronomique française', badge: 'Relais & Châteaux', coords: [17.879, -62.808], desc: 'Table gastronomique face à l’océan, produits d’exception et signature française.' },
  { name: 'La Case de l’Isle', place: 'Cheval Blanc — St-Barthélemy', chef: 'Chef au parcours étoilé', badge: 'Gastronomique', coords: [17.923, -62.851], desc: 'Cuisine méditerranéenne raffinée les pieds dans le sable, sur la baie des Flamands.' },
  { name: 'Bonito', place: 'Gustavia — St-Barthélemy', chef: 'Cuisine franco-latine', badge: 'Iconique', coords: [17.897, -62.851], desc: 'Vue sur le port, ceviches et grillades dans une salle ouverte devenue une institution.' },
  { name: 'Jacala', place: 'Meads Bay — Anguilla', chef: 'Jacques Borderon (français)', badge: 'French fine dining', coords: [18.171, -63.145], desc: 'Table française sur la plage, l’une des plus courues de la Caraïbe.' },
  { name: 'Blanchards', place: 'Meads Bay — Anguilla', chef: 'Cuisine caribéenne raffinée', badge: 'Fine dining', coords: [18.170, -63.147], desc: 'Institution de Meads Bay, produits locaux et cave remarquable.' },
  { name: 'Malliouhana / Fifty-Eight°', place: 'Meads Bay — Anguilla', chef: 'Inspiration Riviera française', badge: 'Auberge Resorts', coords: [18.172, -63.140], desc: 'Terrasse en surplomb, cuisine française ensoleillée face au couchant.' },
  { name: 'The Cliff', place: 'St James — Barbade', chef: 'Fine dining contemporain', badge: 'Signature', coords: [13.183, -59.641], desc: 'Table dressée sur la falaise, l’une des plus spectaculaires des Caraïbes.' },
  { name: 'Le Soleil d’Or', place: 'Cayman Brac — Cayman', chef: 'Farm-to-table gastronomique', badge: 'Farm-to-table', coords: [19.716, -79.795], desc: 'Cuisine du potager à l’assiette, sur une ferme insulaire préservée.' },
].map((r, i) => ({ ...r, img: FOOD[i % FOOD.length] }));

export default function MichelinDining() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markers = useRef([]);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(null);

  // Charger Leaflet (CSS + JS) une seule fois.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.L) { setReady(true); return; }
    if (!document.querySelector('link[data-leaflet-css]')) {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      css.setAttribute('data-leaflet-css', '');
      document.head.appendChild(css);
    }
    const existing = document.querySelector('script[data-leaflet-js]');
    if (existing) {
      if (window.L) setReady(true);
      else existing.addEventListener('load', () => setReady(true));
      return;
    }
    const js = document.createElement('script');
    js.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    js.setAttribute('data-leaflet-js', '');
    js.onload = () => setReady(true);
    document.body.appendChild(js);
  }, []);

  // Init carte + marqueurs.
  useEffect(() => {
    if (!ready || !mapRef.current || mapInstance.current) return;
    const L = window.L;
    const map = L.map(mapRef.current, { center: [16.5, -62.5], zoom: 5, scrollWheelZoom: false });
    mapInstance.current = map;
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap © CARTO', maxZoom: 19,
    }).addTo(map);
    const icon = (on) => L.divIcon({
      className: 'ff-marker',
      html: `<div style="width:${on ? 18 : 13}px;height:${on ? 18 : 13}px;background:${on ? '#c2622a' : '#B87333'};border:2px solid #efe7d6;border-radius:50%;box-shadow:0 0 0 2px rgba(184,115,51,0.5),0 2px 8px rgba(0,0,0,0.6)"></div>`,
      iconSize: [13, 13], iconAnchor: [7, 7],
    });
    RESTAURANTS.forEach((r, i) => {
      const m = L.marker(r.coords, { icon: icon(false) }).addTo(map)
        .bindTooltip(r.name, { direction: 'top', offset: [0, -6], className: 'ff-label' });
      m.on('click', () => setActive(i));
      markers.current[i] = m;
    });
    const t = setTimeout(() => map.invalidateSize(), 150);
    return () => clearTimeout(t);
  }, [ready]);

  // Marqueur actif mis en avant + recentrage.
  useEffect(() => {
    if (!mapInstance.current || active == null) return;
    const L = window.L;
    markers.current.forEach((m, i) => {
      if (!m) return;
      const on = i === active;
      m.setIcon(L.divIcon({ className: 'ff-marker', html: `<div style="width:${on ? 18 : 13}px;height:${on ? 18 : 13}px;background:${on ? '#c2622a' : '#B87333'};border:2px solid #efe7d6;border-radius:50%;box-shadow:0 0 0 2px rgba(184,115,51,0.5),0 2px 8px rgba(0,0,0,0.6)"></div>`, iconSize: [13, 13], iconAnchor: [7, 7] }));
    });
    mapInstance.current.panTo(RESTAURANTS[active].coords, { animate: true });
  }, [active]);

  return (
    <section className="relative bg-[#26272a] px-6 md:px-14 py-16 md:py-24">
      <style>{`
        .leaflet-tooltip.ff-label { background:#2e2f32 !important; border:1px solid #B87333 !important; color:#efe7d6; font-size:11px; font-weight:600; padding:2px 7px; border-radius:6px; box-shadow:0 2px 8px rgba(0,0,0,0.5) !important; }
        .leaflet-tooltip.ff-label::before { display:none !important; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-[#B87333] font-medium mb-3">Tables of Exception</p>
          <h2 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.1em] text-[#C0C0C0]">Starred Chefs, Island Tables</h2>
          <div className="relative w-28 md:w-36 h-5 mx-auto mt-4"><Image src="/images/title-line.png" alt="" fill className="object-contain" /></div>
          <p className="mt-5 max-w-2xl mx-auto text-[13px] md:text-sm text-[#8b90a0] leading-relaxed">
            French starred chefs and equivalent distinctions across the islands — booked and integrated into your itinerary by concierge.
            Editorial selection for reference only; Qualityacht has no affiliation with these establishments.
          </p>
        </div>

        {/* Carte */}
        <div className="relative h-[52vh] md:h-[58vh] rounded-2xl overflow-hidden border border-[#C0C0C0]/20 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] bg-[#1a1b1e]">
          <div ref={mapRef} className="absolute inset-0" />
          {!ready && <div className="absolute inset-0 flex items-center justify-center text-[#acb0cd]/60 text-sm">Loading map…</div>}
        </div>

        {/* Cartes restaurants */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-8">
          {RESTAURANTS.map((r, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`group text-left rounded-2xl overflow-hidden border bg-[#3a3b3f]/70 backdrop-blur-sm transition-all ${active === i ? 'border-[#c2622a]' : 'border-[#C0C0C0]/20 hover:border-[#B87333]/60'}`}>
              <div className="relative h-32 overflow-hidden">
                {r.img && <Image src={r.img} alt="" fill sizes="300px" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                <div className="absolute inset-0 bg-gradient-to-t from-[#26272a]/90 to-transparent" />
                <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wide bg-[#B03E00] text-[#efe7d6]">{r.badge}</span>
              </div>
              <div className="p-4">
                <h3 className="trajan-regular text-sm uppercase tracking-[0.08em] text-[#C0C0C0] leading-snug">{r.name}</h3>
                <p className="text-[11px] text-[#B87333] mt-1">{r.place}</p>
                <p className="text-[11px] text-[#acb0cd]/60 italic mt-0.5">{r.chef}</p>
                <p className="text-[12px] text-[#acb0cd]/80 leading-relaxed mt-2">{r.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
