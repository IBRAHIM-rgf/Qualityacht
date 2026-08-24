'use client';

// ══ Hotel Caraibes — carte SOMBRE avec les hotels en points ══
// Les fiches n'existent plus en grille : elles APPARAISSENT SUR LA CARTE, au clic
// sur un hotel (popup : photo aerienne + nom + lieu + etoiles + courte desc).
// Critere de selection : piscine privee. Selection editoriale, AUCUNE affiliation.

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { media } from '@/lib/quality-media';
import { starMarkerHtml, starIconSize } from '@/lib/star-marker';

const POOL = media({ cat: 'aerial', kind: 'image' }).map((m) => m.src);

// Liens vers les pages EN ANGLAIS des hotels (jamais les versions FR). desc en anglais.
const HOTELS = [
  { name: 'Eden Rock', place: 'St Barths', stars: 5, coords: [17.904, -62.835], link: 'https://www.oetkercollection.com/en/hotels/eden-rock-st-barths/', desc: 'Hillside suites and private infinity pools over St Jean Bay.' },
  { name: 'Cheval Blanc Isle de France', place: 'St Barths', stars: 5, coords: [17.923, -62.851], link: 'https://www.chevalblanc.com/en/maison/st-barth-isle-de-france/', desc: 'Beachfront villas with private pools on Flamands Bay.' },
  { name: 'Rosewood Little Dix Bay', place: 'Virgin Gorda, BVI', stars: 5, coords: [18.502, -64.400], link: 'https://www.rosewoodhotels.com/en/little-dix-bay-virgin-gorda', desc: 'A protected bay with private-pool villas opening onto the reef.' },
  { name: 'Amanyara', place: 'Providenciales, Turks & Caicos', stars: 5, coords: [21.955, -72.318], link: 'https://www.aman.com/resorts/amanyara', desc: 'Pared-back pavilions and private pools facing the ocean.' },
  { name: 'Jade Mountain', place: 'Saint Lucia', stars: 5, coords: [13.916, -61.061], link: 'https://www.jademountain.com/', desc: 'Open-wall sanctuaries with private infinity pools facing the Pitons.' },
  { name: 'Sugar Beach, A Viceroy Resort', place: 'Saint Lucia', stars: 5, coords: [13.849, -61.061], link: 'https://www.viceroyhotelsandresorts.com/sugar-beach', desc: 'Rainforest villas with private pools set between the Pitons.' },
  { name: 'Belmond Cap Juluca', place: 'Anguilla', stars: 5, coords: [18.163, -63.128], link: 'https://www.belmond.com/hotels/caribbean/anguilla/belmond-cap-juluca/', desc: 'Moorish architecture and private-pool suites on Maundays Bay.' },
  { name: 'Sandy Lane', place: 'Barbados', stars: 5, coords: [13.181, -59.641], link: 'https://www.sandylane.com/', desc: 'The grande dame of the west coast — private-pool villas with butler service.' },
].map((h, i) => ({ ...h, img: POOL[i % POOL.length] }));

function popupHtml(h) {
  const stars = '★'.repeat(h.stars);
  return `
    <div style="width:216px;font-family:system-ui,sans-serif">
      <div style="position:relative;border-radius:8px;overflow:hidden;height:118px;margin-bottom:8px">
        <img src="${h.img}" alt="" style="width:100%;height:100%;object-fit:cover"/>
        <span style="position:absolute;top:6px;left:8px;color:#bd9973;font-size:12px;letter-spacing:2px;text-shadow:0 1px 3px rgba(0,0,0,.9)">${stars}</span>
      </div>
      <div style="font-family:var(--font-trajan-regular),serif;text-transform:uppercase;letter-spacing:1px;font-size:13px;color:#C0C0C0;line-height:1.3">${h.name}</div>
      <div style="font-size:11px;color:#B87333;margin-top:3px">${h.place}</div>
      <div style="font-size:12px;color:#acb0cd;opacity:.85;margin-top:6px;line-height:1.45">${h.desc}</div>
      <a href="${h.link}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:6px;margin-top:10px;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#c2622a;text-decoration:none">Visit hotel ›</a>
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
    // Logo etoile (SVG, fond transparent) a la place du point plein.
    const icon = L.divIcon({ className: 'ho-marker', html: starMarkerHtml(false), ...starIconSize(false) });
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
