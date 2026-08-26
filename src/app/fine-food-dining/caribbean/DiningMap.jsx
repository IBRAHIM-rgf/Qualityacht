'use client';

// ══ Dining — Carte des tables etoilees (Leaflet) ══
// Carte sombre (CARTO dark) avec les meilleures tables des Caraibes. Chaque point est un
// LOGO (etoile SVG, palette maison) au lieu d'un simple point colore ; au clic, une popup
// affiche la fiche complete (photo, badge, nom, lieu, chef, description) — les cards ne
// sont plus separees sous la carte, tout est SUR la carte. Selection editoriale, AUCUNE
// affiliation. Textes en anglais (coherent avec le reste du site).

import { useEffect, useRef, useState } from 'react';
import { media } from '@/lib/quality-media';
import { starMarkerHtml, starIconSize } from '@/lib/star-marker';

const FOOD = media({ cat: 'food', kind: 'image' }).map((m) => m.src);

const RESTAURANTS = [
  { name: 'Le Gaïac', place: 'Le Toiny — St-Barthélemy', chef: 'French gastronomic cuisine', badge: 'Relais & Châteaux', coords: [17.879, -62.808], desc: 'An oceanfront gastronomic table, exceptional produce and a distinctly French signature.' },
  { name: 'La Case de l’Isle', place: 'Cheval Blanc — St-Barthélemy', chef: 'Chef with a Michelin-starred background', badge: 'Gastronomic', coords: [17.923, -62.851], desc: 'Refined Mediterranean cuisine, feet in the sand, on the Baie des Flamands.' },
  { name: 'Bonito', place: 'Gustavia — St-Barthélemy', chef: 'Franco-Latin cuisine', badge: 'Iconic', coords: [17.897, -62.851], desc: 'Harbour views, ceviches and grills in an open-air room that has become an institution.' },
  { name: 'Jacala', place: 'Meads Bay — Anguilla', chef: 'Jacques Borderon (French)', badge: 'French fine dining', coords: [18.171, -63.145], desc: 'A French table on the beach, one of the most sought-after in the Caribbean.' },
  { name: 'Blanchards', place: 'Meads Bay — Anguilla', chef: 'Refined Caribbean cuisine', badge: 'Fine dining', coords: [18.170, -63.147], desc: 'A Meads Bay institution, local produce and a remarkable cellar.' },
  { name: 'Malliouhana / Fifty-Eight°', place: 'Meads Bay — Anguilla', chef: 'French Riviera inspiration', badge: 'Auberge Resorts', coords: [18.172, -63.140], desc: 'A terrace above the bay, sun-soaked French cuisine facing the sunset.' },
  { name: 'The Cliff', place: 'St James — Barbados', chef: 'Contemporary fine dining', badge: 'Signature', coords: [13.183, -59.641], desc: 'A table set on the cliffside, one of the most spectacular in the Caribbean.' },
  { name: 'Le Soleil d’Or', place: 'Cayman Brac — Cayman', chef: 'Farm-to-table gastronomy', badge: 'Farm-to-table', coords: [19.716, -79.795], desc: 'Garden-to-plate cuisine, on a preserved island farm.' },
].map((r, i) => ({ ...r, img: FOOD[i % FOOD.length] }));


// Parcours vers la flotte, par etablissement, selon sa sous-region reelle.
// Table close et locale : aucune URL ne provient d'une saisie utilisateur.
const FLEET_BY_RESTAURANT = {
  'Le Gaïac': '/charters/destinations/carabbean/leeward-islands-v11',
  'La Case de l’Isle': '/charters/destinations/carabbean/leeward-islands-v11',
  'Bonito': '/charters/destinations/carabbean/leeward-islands-v11',
  'Jacala': '/charters/destinations/carabbean/leeward-islands-v11',
  'Blanchards': '/charters/destinations/carabbean/leeward-islands-v11',
  'Malliouhana / Fifty-Eight°': '/charters/destinations/carabbean/leeward-islands-v11',
  'The Cliff': '/charters/destinations/carabbean/windward-islands-v11',
  'Le Soleil d’Or': '/charters/destinations/carabbean/grand-cayman-v11',
};

// Style CTA valide par la cliente, en styles en ligne : le HTML de la popup est
// injecte par Leaflet et ne passe pas par le scan des classes utilitaires.
const FLEET_CTA_STYLE = [
  'display:flex', 'align-items:center', 'justify-content:center',
  'min-height:48px', 'margin-top:10px', 'padding:0 12px',
  'border:1px solid #C0C0C0', 'border-radius:999px', 'background:#26272a',
  'box-shadow:0 0 18px rgba(192,192,192,0.35)',
  'font-size:13px', 'font-weight:600', 'letter-spacing:0.18em',
  'text-transform:uppercase', 'color:#c2622a', 'text-decoration:none',
  'text-align:center', 'line-height:1.2',
].join(';');

function popupHtml(r) {
  const fleet = FLEET_BY_RESTAURANT[r.name];
  return `
    <div style="width:216px;font-family:system-ui,sans-serif">
      <div style="position:relative;border-radius:8px;overflow:hidden;height:110px;margin-bottom:8px">
        <img src="${r.img}" alt="" style="width:100%;height:100%;object-fit:cover"/>
        <span style="position:absolute;top:6px;right:8px;background:#B03E00;color:#efe7d6;font-size:9px;text-transform:uppercase;letter-spacing:1px;padding:2px 8px;border-radius:999px">${r.badge}</span>
      </div>
      <div style="font-family:var(--font-trajan-regular),serif;text-transform:uppercase;letter-spacing:1px;font-size:13px;color:#C0C0C0;line-height:1.3">${r.name}</div>
      <div style="font-size:11px;color:#B87333;margin-top:3px">${r.place}</div>
      <div style="font-size:11px;color:#acb0cd;opacity:.7;font-style:italic;margin-top:1px">${r.chef}</div>
      <div style="font-size:12px;color:#acb0cd;opacity:.85;margin-top:6px;line-height:1.45">${r.desc}</div>
      ${fleet ? `<a href="${fleet}" style="${FLEET_CTA_STYLE}">Explore the Fleet</a>` : ''}
    </div>`;
}

export default function DiningMap() {
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

  // Init carte + marqueurs (logos etoile + popup fiche).
  useEffect(() => {
    if (!ready || !mapRef.current || mapInstance.current) return;
    const L = window.L;
    const map = L.map(mapRef.current, { center: [16.5, -62.5], zoom: 5, scrollWheelZoom: false });
    mapInstance.current = map;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors', maxZoom: 19,
    }).addTo(map);
    const icon = (on) => L.divIcon({ className: 'ff-marker', html: starMarkerHtml(on), ...starIconSize(on) });
    RESTAURANTS.forEach((r, i) => {
      const m = L.marker(r.coords, { icon: icon(false) }).addTo(map)
        .bindTooltip(r.name, { direction: 'top', offset: [0, -14], className: 'ff-label' })
        .bindPopup(popupHtml(r), { className: 'ff-popup', maxWidth: 240, closeButton: true });
      m.on('click', () => setActive(i));
      markers.current[i] = m;
    });
    const t = setTimeout(() => map.invalidateSize(), 150);
    return () => clearTimeout(t);
  }, [ready]);

  // Marqueur actif mis en avant.
  useEffect(() => {
    if (!mapInstance.current || active == null) return;
    const L = window.L;
    markers.current.forEach((m, i) => {
      if (!m) return;
      const on = i === active;
      m.setIcon(L.divIcon({ className: 'ff-marker', html: starMarkerHtml(on), ...starIconSize(on) }));
    });
  }, [active]);

  return (
    <section className="relative bg-[#26272a] px-6 md:px-14 py-16 md:py-24">
      <style>{`
        /* Le fond CARTO dark_all exige desormais une cle : chaque tuile portait
           le filigrane « API KEY REQUIRED ». Tuiles OpenStreetMap, libres et sans
           cle ; l'aspect sombre est reproduit par un filtre applique au SEUL
           calque de tuiles — marqueurs, popups, tooltips et CTA vivent dans
           d'autres calques et ne sont pas filtres. */
        .ff-map .leaflet-tile-pane { filter: grayscale(1) invert(1) brightness(0.72) contrast(1.12); }
        .ff-map .leaflet-control-attribution, .ff-map .leaflet-control-attribution span { background:rgba(38,39,42,0.88) !important; color:#8b90a0 !important; font-size:10px !important; }
        .ff-map .leaflet-control-attribution a { color:#acb0cd !important; }
        .ff-map .leaflet-control-zoom a { background:#2e2f32 !important; color:#C0C0C0 !important; border-color:rgba(192,192,192,0.25) !important; }
        .leaflet-tooltip.ff-label { background:#2e2f32 !important; border:1px solid #B87333 !important; color:#efe7d6; font-size:11px; font-weight:600; padding:2px 7px; border-radius:6px; box-shadow:0 2px 8px rgba(0,0,0,0.5) !important; }
        .leaflet-tooltip.ff-label::before { display:none !important; }
        .leaflet-popup.ff-popup .leaflet-popup-content-wrapper { background:#2e2f32; color:#acb0cd; border:1px solid #B87333; border-radius:12px; box-shadow:0 20px 50px -18px rgba(0,0,0,0.85); }
        .leaflet-popup.ff-popup .leaflet-popup-content { margin:12px; }
        .leaflet-popup.ff-popup .leaflet-popup-tip { background:#2e2f32; border:1px solid #B87333; }
        .leaflet-popup.ff-popup a.leaflet-popup-close-button { color:#C0C0C0; }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-[#B87333] font-medium mb-2">Michelin-Starred & Distinguished Chefs</p>
          <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">Starred Tables Across The Islands</h2>
          <p className="mt-4 max-w-2xl mx-auto text-[13px] text-[#8b90a0] leading-relaxed">
            Tap a star to open the table — photo, distinction and a short introduction. Editorial selection for reference only; Qualityacht has no affiliation with these establishments.
          </p>
        </div>
        <div className="relative h-[52vh] md:h-[64vh] rounded-2xl overflow-hidden border border-[#C0C0C0]/20 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] bg-[#1a1b1e]">
          <div ref={mapRef} className="ff-map absolute inset-0" />
          {!ready && <div className="absolute inset-0 flex items-center justify-center text-[#acb0cd]/60 text-sm">Loading map…</div>}
        </div>
      </div>
    </section>
  );
}
