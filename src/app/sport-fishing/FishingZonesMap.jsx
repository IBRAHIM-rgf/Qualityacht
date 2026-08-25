'use client';

// ══ Sport Fishing — Carte des zones de peche (Leaflet) ══
// Meme dispositif que la carte des tables etoilees de Fine Food & Dining : fond
// sombre CARTO, marqueurs au logo Qualityacht (helper partage lib/star-marker),
// popup au clic. Ici la popup decrit la zone, sa faune et son habitat, puis
// renvoie vers la flotte de la sous-region correspondante.
//
// Le contenu des zones vient de fishing-zones.js. Chaque zone et chaque espece
// est soutenue par une source officielle, tracee dans FISHING_ZONES_SOURCES.md.
// Aucune reglementation, aucun quota, aucune saison presentee comme une regle.

import { useEffect, useRef, useState } from 'react';
import { starMarkerHtml, starIconSize } from '@/lib/star-marker';
import { FISHING_ZONES } from './fishing-zones';

function escapeHtml(v) {
  return String(v ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Style CTA valide par la cliente, en styles en ligne : le HTML de la popup est
// injecte par Leaflet et ne passe pas par le scan des classes utilitaires.
const CTA_STYLE = [
  'display:flex', 'align-items:center', 'justify-content:center',
  'min-height:48px', 'margin-top:10px', 'padding:0 12px',
  'border:1px solid #C0C0C0', 'border-radius:999px', 'background:#26272a',
  'box-shadow:0 0 18px rgba(192,192,192,0.35)',
  'font-size:13px', 'font-weight:600', 'letter-spacing:0.18em',
  'text-transform:uppercase', 'color:#c2622a', 'text-decoration:none',
  'text-align:center', 'line-height:1.2',
].join(';');

const chip = (t) =>
  `<span style="display:inline-block;margin:0 4px 4px 0;padding:2px 8px;border:1px solid rgba(192,192,192,0.3);border-radius:999px;font-size:10px;letter-spacing:.5px;color:#acb0cd">${escapeHtml(t)}</span>`;

function popupHtml(z) {
  return `
    <div style="width:224px;font-family:system-ui,sans-serif">
      <div style="font-family:var(--font-trajan-regular),serif;text-transform:uppercase;letter-spacing:1px;font-size:13px;color:#C0C0C0;line-height:1.3">${escapeHtml(z.name)}</div>
      <div style="font-size:11px;color:#B87333;margin-top:3px">${escapeHtml(z.place)}</div>
      <div style="font-size:11px;color:#acb0cd;opacity:.7;font-style:italic;margin-top:1px">${escapeHtml(z.kind)}</div>
      <div style="font-size:12px;color:#acb0cd;opacity:.85;margin-top:6px;line-height:1.45">${escapeHtml(z.desc)}</div>
      <div style="margin-top:8px;font-size:9px;text-transform:uppercase;letter-spacing:1.4px;color:#B87333">Commonly encountered species</div>
      <div style="margin-top:4px">${z.fauna.map(chip).join('')}</div>
      ${z.flora && z.flora.length ? `<div style="margin-top:6px;font-size:9px;text-transform:uppercase;letter-spacing:1.4px;color:#B87333">Habitat</div>
      <div style="margin-top:4px">${z.flora.map(chip).join('')}</div>` : ''}
      ${z.fleet ? `<a href="${z.fleet}" style="${CTA_STYLE}">Explore the Fleet</a>` : ''}
    </div>`;
}

export default function FishingZonesMap() {
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

  // Init carte + marqueurs au logo Qualityacht.
  useEffect(() => {
    if (!ready || !mapRef.current || mapInstance.current) return;
    const L = window.L;
    const map = L.map(mapRef.current, { center: [16.5, -68], zoom: 5, scrollWheelZoom: false });
    mapInstance.current = map;
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap © CARTO', maxZoom: 19,
    }).addTo(map);
    const icon = (on) => L.divIcon({ className: 'sf-marker', html: starMarkerHtml(on), ...starIconSize(on) });
    FISHING_ZONES.forEach((z, i) => {
      const m = L.marker(z.coords, { icon: icon(false) }).addTo(map)
        .bindTooltip(z.name, { direction: 'top', offset: [0, -14], className: 'sf-label' })
        .bindPopup(popupHtml(z), { className: 'sf-popup', maxWidth: 248, closeButton: true });
      m.on('click', () => setActive(i));
      markers.current[i] = m;
    });
    // Cadrage sur les zones plutot qu'un centre fixe : sinon la vue laisse un
    // large vide a l'ouest en desktop et coupe les Petites Antilles en mobile.
    const t = setTimeout(() => {
      map.invalidateSize();
      map.fitBounds(L.latLngBounds(FISHING_ZONES.map((z) => z.coords)), {
        padding: [42, 42],
        maxZoom: 6,
      });
    }, 150);
    return () => clearTimeout(t);
  }, [ready]);

  // Marqueur actif mis en avant.
  useEffect(() => {
    if (!mapInstance.current || active == null) return;
    const L = window.L;
    markers.current.forEach((m, i) => {
      if (!m) return;
      m.setIcon(L.divIcon({ className: 'sf-marker', html: starMarkerHtml(i === active), ...starIconSize(i === active) }));
    });
  }, [active]);

  return (
    <section className="relative bg-[#26272a] px-6 md:px-14 py-16 md:py-24">
      <style>{`
        .leaflet-tooltip.sf-label { background:#2e2f32 !important; border:1px solid #B87333 !important; color:#efe7d6; font-size:11px; font-weight:600; padding:2px 7px; border-radius:6px; box-shadow:0 2px 8px rgba(0,0,0,0.5) !important; }
        .leaflet-tooltip.sf-label::before { display:none !important; }
        .leaflet-popup.sf-popup .leaflet-popup-content-wrapper { background:#2e2f32; color:#acb0cd; border:1px solid #B87333; border-radius:12px; box-shadow:0 20px 50px -18px rgba(0,0,0,0.85); }
        .leaflet-popup.sf-popup .leaflet-popup-content { margin:12px; }
        .leaflet-popup.sf-popup .leaflet-popup-tip { background:#2e2f32; border:1px solid #B87333; }
        .leaflet-popup.sf-popup a.leaflet-popup-close-button { color:#C0C0C0; }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-[#B87333] font-medium mb-2">Grounds Across The Islands</p>
          <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">Caribbean Fishing Zones</h2>
          <p className="mt-4 max-w-2xl mx-auto text-[13px] text-[#8b90a0] leading-relaxed">
            Tap a marker to open the zone — the water it sits on, the fish sought there and the surrounding habitat.
            Editorial reference only: no permits, quotas or seasons are stated here, and nothing on this map is a
            guarantee of a catch. Your concierge confirms local rules before departure.
          </p>
        </div>
        <div className="relative h-[52vh] md:h-[64vh] rounded-2xl overflow-hidden border border-[#C0C0C0]/20 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] bg-[#1a1b1e]">
          <div ref={mapRef} className="absolute inset-0" />
          {!ready && <div className="absolute inset-0 flex items-center justify-center text-[#acb0cd]/60 text-sm">Loading map…</div>}
        </div>
        <p className="mt-4 max-w-3xl mx-auto text-center text-[11px] leading-relaxed text-[#8b90a0]">
          Species and conditions vary by season and location. All fishing activities are planned with local
          licensed professionals and remain subject to applicable regulations.
        </p>
      </div>
    </section>
  );
}
