'use client';

// ══ Real Estate — carte des marches du partenaire ══
// Composant DEDIE : WorldPinsMap est partage avec la carte des evenements
// Caraibes, on ne le touche pas. On reprend seulement le dispositif visuel deja
// en place sur le site (fond sombre CARTO, marqueurs au logo Qualityacht via le
// helper partage lib/star-marker) et le meme style de popup.

import { useEffect, useRef, useState } from 'react';
import { starMarkerHtml, starIconSize } from '@/lib/star-marker';
import { MARKETS } from './partner-data';

function escapeHtml(v) {
  return String(v ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

const CTA_STYLE = [
  'display:flex', 'align-items:center', 'justify-content:center',
  'min-height:48px', 'margin-top:10px', 'padding:0 12px',
  'border:1px solid #C0C0C0', 'border-radius:999px', 'background:#26272a',
  'box-shadow:0 0 18px rgba(192,192,192,0.35)',
  'font-size:13px', 'font-weight:600', 'letter-spacing:0.18em',
  'text-transform:uppercase', 'color:#c2622a', 'text-decoration:none',
  'text-align:center', 'line-height:1.2',
].join(';');

function popupHtml(m) {
  return `
    <div style="width:224px;font-family:system-ui,sans-serif">
      <div style="font-family:var(--font-trajan-regular),serif;text-transform:uppercase;letter-spacing:1px;font-size:14px;color:#C0C0C0;line-height:1.3">${escapeHtml(m.name)}</div>
      <div style="font-size:14px;color:#acb0cd;opacity:.85;margin-top:6px;line-height:1.45">${escapeHtml(m.desc)}</div>
      <a href="${m.href}" target="_blank" rel="noopener noreferrer" style="${CTA_STYLE}">${escapeHtml(m.cta)}</a>
    </div>`;
}

export default function RealEstateMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markers = useRef([]);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(null);

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

  useEffect(() => {
    if (!ready || !mapRef.current || mapInstance.current) return;
    const L = window.L;
    const map = L.map(mapRef.current, { center: [32, 30], zoom: 3, scrollWheelZoom: false });
    mapInstance.current = map;
    // Le fond CARTO dark_all exige desormais une cle : sans elle, chaque tuile
    // porte le filigrane « API KEY REQUIRED ». On repasse sur les tuiles
    // OpenStreetMap, libres et sans cle. L'aspect sombre est reproduit par un
    // filtre CSS applique au seul calque de tuiles (voir .re-map ci-dessous),
    // afin de ne toucher ni aux marqueurs, ni aux popups, ni aux logos.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors', maxZoom: 19,
    }).addTo(map);
    const icon = (on) => L.divIcon({ className: 're-marker', html: starMarkerHtml(on), ...starIconSize(on) });
    MARKETS.forEach((m, i) => {
      const mk = L.marker(m.coords, { icon: icon(false) }).addTo(map)
        .bindTooltip(m.name, { direction: 'top', offset: [0, -14], className: 're-label' })
        .bindPopup(popupHtml(m), { className: 're-popup', maxWidth: 248, closeButton: true });
      mk.on('click', () => setActive(i));
      markers.current[i] = mk;
    });
    // Cadrage automatique sur les trois marches, du Maroc a la Georgie.
    const t = setTimeout(() => {
      map.invalidateSize();
      map.fitBounds(L.latLngBounds(MARKETS.map((m) => m.coords)), { padding: [56, 56], maxZoom: 5 });
    }, 150);
    return () => clearTimeout(t);
  }, [ready]);

  useEffect(() => {
    if (!mapInstance.current || active == null) return;
    const L = window.L;
    markers.current.forEach((mk, i) => {
      if (!mk) return;
      mk.setIcon(L.divIcon({ className: 're-marker', html: starMarkerHtml(i === active), ...starIconSize(i === active) }));
    });
  }, [active]);

  return (
    <section className="relative bg-[#26272a] px-6 md:px-14 py-16 md:py-24">
      <style>{`
        .leaflet-tooltip.re-label { background:#2e2f32 !important; border:1px solid #B87333 !important; color:#efe7d6; font-size:13px; font-weight:600; padding:2px 7px; border-radius:6px; box-shadow:0 2px 8px rgba(0,0,0,0.5) !important; }
        .leaflet-tooltip.re-label::before { display:none !important; }
        .leaflet-popup.re-popup .leaflet-popup-content-wrapper { background:#2e2f32; color:#acb0cd; border:1px solid #B87333; border-radius:12px; box-shadow:0 20px 50px -18px rgba(0,0,0,0.85); }
        .leaflet-popup.re-popup .leaflet-popup-content { margin:12px; }
        .leaflet-popup.re-popup .leaflet-popup-tip { background:#2e2f32; border:1px solid #B87333; }
        .leaflet-popup.re-popup a.leaflet-popup-close-button { color:#C0C0C0; }
        /* Assombrissement des tuiles uniquement. .leaflet-tile-pane ne contient
           que le fond de carte : marqueurs (marker-pane), popups (popup-pane),
           tooltips et attribution vivent dans d'autres calques et ne sont donc
           pas filtres. */
        .re-map .leaflet-tile-pane { filter: grayscale(1) invert(1) brightness(0.72) contrast(1.12); }
        .re-map .leaflet-control-attribution, .re-map .leaflet-control-attribution span { background:rgba(38,39,42,0.88) !important; color:#8b90a0 !important; font-size:11px !important; }
        .re-map .leaflet-control-attribution a { color:#acb0cd !important; }
        .re-map .leaflet-control-zoom a { background:#2e2f32 !important; color:#C0C0C0 !important; border-color:rgba(192,192,192,0.25) !important; }
        .re-map .leaflet-control-zoom a:hover { background:#3a3b3f !important; }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <p className="text-sm md:text-base uppercase tracking-[0.24em] text-[#B87333] font-semibold mb-2">Our Markets</p>
          <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">Where Our Partners Operate</h2>
          <p className="mt-4 max-w-2xl mx-auto text-[15px] md:text-base text-[#8b90a0] leading-relaxed">
            Tap a marker to open the market. Enquiries are handled by Qualityacht; partner pages open in a new tab.
          </p>
        </div>
        <div className="relative h-[52vh] md:h-[62vh] rounded-2xl overflow-hidden border border-[#C0C0C0]/20 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] bg-[#1a1b1e]">
          <div ref={mapRef} className="re-map absolute inset-0" />
          {!ready && <div className="absolute inset-0 flex items-center justify-center text-[#acb0cd]/60 text-sm">Loading map…</div>}
        </div>
      </div>
    </section>
  );
}
