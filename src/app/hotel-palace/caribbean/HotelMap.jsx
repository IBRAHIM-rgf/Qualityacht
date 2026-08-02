'use client';

// ══ Hotel Caraibes — carte SOMBRE avec les hotels en points ══
// Les fiches n'existent plus en grille : elles APPARAISSENT SUR LA CARTE, au clic
// sur un hotel (popup : photo aerienne + nom + lieu + etoiles + courte desc).
// Critere de selection : piscine privee. Selection editoriale, AUCUNE affiliation.

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { media } from '@/lib/quality-media';

const POOL = media({ cat: 'aerial', kind: 'image' }).map((m) => m.src);

const HOTELS = [
  { name: 'Eden Rock', place: 'St-Barthélemy', stars: 5, coords: [17.904, -62.835], desc: 'Suites perchées et piscines à débordement privées sur la baie de St-Jean.' },
  { name: 'Cheval Blanc Isle de France', place: 'St-Barthélemy', stars: 5, coords: [17.923, -62.851], desc: 'Villas les pieds dans le sable et piscines privées, baie des Flamands.' },
  { name: 'Rosewood Little Dix Bay', place: 'Virgin Gorda, BVI', stars: 5, coords: [18.502, -64.400], desc: 'Baie préservée, villas à piscine privée ouvertes sur le récif.' },
  { name: 'Amanyara', place: 'Providenciales, Turks & Caicos', stars: 5, coords: [21.955, -72.318], desc: 'Pavillons épurés et piscines privées face à l’océan.' },
  { name: 'Jade Mountain', place: 'Sainte-Lucie', stars: 5, coords: [13.916, -61.061], desc: 'Sanctuaires ouverts, piscines à débordement privées face aux Pitons.' },
  { name: 'Sugar Beach, A Viceroy Resort', place: 'Sainte-Lucie', stars: 5, coords: [13.849, -61.061], desc: 'Villas dans la forêt tropicale, piscines privées entre les Pitons.' },
  { name: 'Belmond Cap Juluca', place: 'Anguilla', stars: 5, coords: [18.163, -63.128], desc: 'Architecture mauresque, suites à piscine privée sur Maundays Bay.' },
  { name: 'Sandy Lane', place: 'Barbade', stars: 5, coords: [13.181, -59.641], desc: 'Grande dame de la côte ouest, villas à piscine privée et majordome.' },
].map((h, i) => ({ ...h, img: POOL[i % POOL.length] }));

function popupHtml(h) {
  const stars = '★'.repeat(h.stars);
  return `
    <div style="width:216px;font-family:system-ui,sans-serif">
      <div style="position:relative;border-radius:8px;overflow:hidden;height:118px;margin-bottom:8px">
        <img src="${h.img}" alt="" style="width:100%;height:100%;object-fit:cover"/>
        <span style="position:absolute;top:6px;left:8px;color:#d39478;font-size:12px;letter-spacing:2px;text-shadow:0 1px 3px rgba(0,0,0,.9)">${stars}</span>
      </div>
      <div style="font-family:var(--font-trajan-regular),serif;text-transform:uppercase;letter-spacing:1px;font-size:13px;color:#C0C0C0;line-height:1.3">${h.name}</div>
      <div style="font-size:11px;color:#B87333;margin-top:3px">${h.place}</div>
      <div style="font-size:12px;color:#acb0cd;opacity:.85;margin-top:6px;line-height:1.45">${h.desc}</div>
    </div>`;
}

export default function HotelMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.L) { setReady(true); return; }
    if (!document.querySelector('link[data-leaflet-css]')) {
      const css = document.createElement('link'); css.rel = 'stylesheet';
      css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      css.setAttribute('data-leaflet-css', ''); document.head.appendChild(css);
    }
    const ex = document.querySelector('script[data-leaflet-js]');
    if (ex) { if (window.L) setReady(true); else ex.addEventListener('load', () => setReady(true)); return; }
    const js = document.createElement('script'); js.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    js.setAttribute('data-leaflet-js', ''); js.onload = () => setReady(true); document.body.appendChild(js);
  }, []);

  useEffect(() => {
    if (!ready || !mapRef.current || mapInstance.current) return;
    const L = window.L;
    const map = L.map(mapRef.current, { center: [17.6, -63.2], zoom: 6, scrollWheelZoom: false });
    mapInstance.current = map;
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution: '© OpenStreetMap © CARTO', maxZoom: 19 }).addTo(map);
    const icon = L.divIcon({ className: 'ho-marker', html: `<div style="width:14px;height:14px;background:#B87333;border:2px solid #efe7d6;border-radius:50%;box-shadow:0 0 0 2px rgba(184,115,51,.5),0 2px 8px rgba(0,0,0,.6)"></div>`, iconSize: [14, 14], iconAnchor: [7, 7] });
    HOTELS.forEach((h) => {
      L.marker(h.coords, { icon }).addTo(map)
        .bindTooltip(h.name, { direction: 'top', offset: [0, -8], className: 'ho-label' })
        .bindPopup(popupHtml(h), { className: 'ho-popup', maxWidth: 240, closeButton: true });
    });
    const t = setTimeout(() => map.invalidateSize(), 150);
    return () => clearTimeout(t);
  }, [ready]);

  return (
    <section className="relative bg-[#26272a] px-6 md:px-14 py-14 md:py-20">
      <style>{`
        .leaflet-tooltip.ho-label { background:#2e2f32 !important; border:1px solid #B87333 !important; color:#efe7d6; font-size:11px; font-weight:600; padding:2px 7px; border-radius:6px; box-shadow:0 2px 8px rgba(0,0,0,.5) !important; }
        .leaflet-tooltip.ho-label::before { display:none !important; }
        .ho-popup .leaflet-popup-content-wrapper { background:#2e2f32; color:#acb0cd; border:1px solid #C0C0C0; border-radius:12px; box-shadow:0 18px 45px -15px rgba(0,0,0,.85); }
        .ho-popup .leaflet-popup-content { margin:12px; }
        .ho-popup .leaflet-popup-tip { background:#2e2f32; }
        .ho-popup a.leaflet-popup-close-button { color:#acb0cd; }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-[#B87333] font-medium mb-3">Private Pool · Selection</p>
          <h2 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.1em] text-[#C0C0C0]">Palaces On The Map</h2>
          <div className="relative w-28 md:w-36 h-5 mx-auto mt-4"><Image src="/images/title-line.png" alt="" fill className="object-contain" /></div>
          <p className="mt-5 max-w-2xl mx-auto text-[13px] md:text-sm text-[#8b90a0] leading-relaxed">
            Tap a marker to reveal the address — chosen on one criterion: a truly private pool.
            Editorial selection for reference only; Qualityacht has no affiliation with these properties.
          </p>
        </div>
        <div className="relative h-[62vh] md:h-[70vh] rounded-2xl overflow-hidden border border-[#C0C0C0]/20 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)] bg-[#1a1b1e]">
          <div ref={mapRef} className="absolute inset-0" />
          {!ready && <div className="absolute inset-0 flex items-center justify-center text-[#acb0cd]/60 text-sm">Loading map…</div>}
        </div>
      </div>
    </section>
  );
}
