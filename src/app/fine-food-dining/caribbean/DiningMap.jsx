'use client';

// ══ Dining — Carte des tables (Leaflet) ══
// Carte sombre (CARTO dark, chargee via CDN comme les modales d'iles) avec les
// meilleures tables des Caraibes en POINTS cliquables (tooltip = nom). Placee AVANT
// les cards photos. Selection editoriale, AUCUNE affiliation.

import { useEffect, useRef, useState } from 'react';

// name + coords [lat, lng] (les fiches detaillees restent dans les cards en dessous).
const POINTS = [
  { name: 'Le Gaïac', coords: [17.879, -62.808] },
  { name: 'La Case de l’Isle', coords: [17.923, -62.851] },
  { name: 'Bonito', coords: [17.897, -62.851] },
  { name: 'Jacala', coords: [18.171, -63.145] },
  { name: 'Blanchards', coords: [18.170, -63.147] },
  { name: 'Malliouhana / Fifty-Eight°', coords: [18.172, -63.140] },
  { name: 'The Cliff', coords: [13.183, -59.641] },
  { name: 'Le Soleil d’Or', coords: [19.716, -79.795] },
];

export default function DiningMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [ready, setReady] = useState(false);

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
    const icon = L.divIcon({
      className: 'ff-marker',
      html: '<div style="width:13px;height:13px;background:#B87333;border:2px solid #efe7d6;border-radius:50%;box-shadow:0 0 0 2px rgba(184,115,51,0.5),0 2px 8px rgba(0,0,0,0.6)"></div>',
      iconSize: [13, 13], iconAnchor: [7, 7],
    });
    POINTS.forEach((p) => {
      L.marker(p.coords, { icon }).addTo(map)
        .bindTooltip(p.name, { direction: 'top', offset: [0, -6], className: 'ff-label' });
    });
    const t = setTimeout(() => map.invalidateSize(), 150);
    return () => clearTimeout(t);
  }, [ready]);

  return (
    <section className="relative bg-[#26272a] px-6 md:px-14 pt-10 md:pt-14">
      <style>{`
        .leaflet-tooltip.ff-label { background:#2e2f32 !important; border:1px solid #B87333 !important; color:#efe7d6; font-size:11px; font-weight:600; padding:2px 7px; border-radius:6px; box-shadow:0 2px 8px rgba(0,0,0,0.5) !important; }
        .leaflet-tooltip.ff-label::before { display:none !important; }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-[#B87333] font-medium mb-2">Michelin-Starred & Distinguished Chefs</p>
          <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">Starred Tables Across The Islands</h2>
        </div>
        <div className="relative h-[48vh] md:h-[56vh] rounded-2xl overflow-hidden border border-[#C0C0C0]/20 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] bg-[#1a1b1e]">
          <div ref={mapRef} className="absolute inset-0" />
          {!ready && <div className="absolute inset-0 flex items-center justify-center text-[#acb0cd]/60 text-sm">Loading map…</div>}
        </div>
      </div>
    </section>
  );
}
