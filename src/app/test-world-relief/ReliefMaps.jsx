'use client';

// Page annexe : choix du FOND de la carte monde de /hotel-palace.
// Trois fonds seulement, tous GRATUITS et SANS CLE API (Esri ArcGIS Online) :
//   1. Esri National Geographic  (la reference : relief marron + bathymetrie + labels)
//   3. Esri World Terrain        (la couleur turquoise)
//   Mix. La MER a relief de la #1 (bathymetrie turquoise) + une TERRE brune conforme.
//
// Cartes SYNCHRONISEES : bouger/zoomer l'une bouge les autres.
// Deux couches que TU controles : PRINCIPAL_CITIES (tableau editable) + Frontieres.
// Les cotes viennent des tuiles : detaillees, pas de traits droits.
// AUCUN emoji.

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const ESRI = 'https://server.arcgisonline.com/ArcGIS/rest/services';

// ── VILLES PRINCIPALES — TON tableau : ajoute / retire une ville ici. ─────────────
const PRINCIPAL_CITIES = [
  { name: 'La Havane', coords: [23.13, -82.38] },
  { name: 'George Town', coords: [19.29, -81.38] },
  { name: 'Kingston', coords: [17.97, -76.79] },
  { name: 'Saint-Domingue', coords: [18.49, -69.93] },
  { name: 'San Juan', coords: [18.47, -66.11] },
  { name: 'Providenciales', coords: [21.79, -72.27] },
  { name: 'Road Town', coords: [18.42, -64.62] },
  { name: 'Gustavia', coords: [17.90, -62.85] },
  { name: 'Philipsburg', coords: [18.02, -63.05] },
  { name: "St. John's", coords: [17.12, -61.85] },
  { name: 'Pointe-à-Pitre', coords: [16.24, -61.53] },
  { name: 'Fort-de-France', coords: [14.60, -61.07] },
  { name: 'Castries', coords: [14.01, -60.99] },
  { name: 'Bridgetown', coords: [13.10, -59.62] },
  { name: "St. George's", coords: [12.06, -61.75] },
  { name: 'Willemstad', coords: [12.11, -68.93] },
  { name: 'Oranjestad', coords: [12.52, -70.03] },
  { name: 'Port of Spain', coords: [10.65, -61.51] },
];

// Overlay frontieres + lieux Esri. Ajoute sur les fonds `hasLabels: false` quand
// l'interrupteur Frontieres est actif.
const BORDERS = { url: `${ESRI}/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}`, options: { maxZoom: 19, maxNativeZoom: 13, attribution: '' } };

// maxNativeZoom = dernier niveau de vraies tuiles ; au-dela Leaflet agrandit.
const BASEMAPS = [
  {
    id: 'natgeo', name: 'Esri National Geographic', tone: 'brun', hasLabels: true,
    note: 'La reference : relief marron + relief de la mer (bathymetrie) + frontieres + villes.',
    layers: [{ url: `${ESRI}/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}`, options: { maxZoom: 19, maxNativeZoom: 16, attribution: 'Tiles &copy; Esri &mdash; National Geographic' } }],
  },
  {
    id: 'terrain', name: 'Esri World Terrain', tone: 'clair', hasLabels: false,
    note: 'La couleur turquoise. Terrain doux, sans etiquette : les villes viennent de TA couche.',
    layers: [{ url: `${ESRI}/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}`, options: { maxZoom: 19, maxNativeZoom: 13, attribution: 'Tiles &copy; Esri' } }],
  },
  {
    // MIX COHERENT. On garde les RELIEFS DE LA MER de la #1 : le fond Ocean Basemap est une
    // mer turquoise AVEC bathymetrie ombree (fosses, plateaux) — meme famille de donnees que
    // la mer de NatGeo. Par-dessus, la TERRE est definie en fusion "multiply" (le relief
    // ombre fonce/colore la terre en brun sans salir la mer claire) -> terre conforme, mer a
    // relief. Puis frontieres + villes. hasLabels:true.
    id: 'mix', name: 'Mix — mer à relief (1) + terre conforme', tone: 'mix', hasLabels: true,
    note: 'Mer turquoise AVEC relief bathymetrique de la #1, terre brune definie, frontieres + villes.',
    layers: [
      { url: `${ESRI}/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}`, options: { maxZoom: 19, maxNativeZoom: 13, attribution: 'Tiles &copy; Esri &mdash; GEBCO, NOAA' } },
      { url: `${ESRI}/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}`, options: { maxZoom: 19, maxNativeZoom: 13, opacity: 0.85, className: 'blend-multiply', attribution: '' } },
      { url: `${ESRI}/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}`, options: { maxZoom: 19, maxNativeZoom: 16, opacity: 0.35, className: 'blend-multiply', attribution: '' } },
      { url: `${ESRI}/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}`, options: { maxZoom: 19, maxNativeZoom: 13, attribution: '' } },
    ],
  },
];

const INITIAL = { center: [17.5, -64], zoom: 5 }; // arc des Caraibes + fosse de Porto Rico

const TONE_STYLE = {
  brun: 'text-[#B87333] border-[#B87333]/50',
  mix: 'text-[#B03E00] border-[#B03E00]/60',
  clair: 'text-[#acb0cd]/60 border-[#C0C0C0]/25',
};

function makeLayer(L, cfg) {
  return cfg.wms ? L.tileLayer.wms(cfg.url, cfg.options) : L.tileLayer(cfg.url, cfg.options);
}

function makeCityGroup(L) {
  const g = L.layerGroup();
  PRINCIPAL_CITIES.forEach((c) => {
    const marker = L.marker(c.coords, {
      interactive: false,
      keyboard: false,
      icon: L.divIcon({ className: 'city-marker', html: '<span class="city-dot"></span>', iconSize: [9, 9], iconAnchor: [4, 4] }),
    });
    marker.bindTooltip(c.name, { permanent: true, direction: 'right', offset: [6, 0], className: 'city-label' });
    g.addLayer(marker);
  });
  return g;
}

export default function ReliefMaps() {
  const containersRef = useRef([]);
  const cellsRef = useRef([]); // { map, cityGroup, borderLayer }
  const syncingRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [showCities, setShowCities] = useState(true);
  const [showBorders, setShowBorders] = useState(true);

  // 1) Charger Leaflet une seule fois
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.L) { setReady(true); return; }
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    css.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    css.crossOrigin = '';
    document.head.appendChild(css);
    const js = document.createElement('script');
    js.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    js.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    js.crossOrigin = '';
    js.onload = () => setReady(true);
    document.body.appendChild(js);
  }, []);

  // 2) Construire une carte par fond + synchroniser
  useEffect(() => {
    if (!ready) return;
    const L = window.L;

    BASEMAPS.forEach((bm, i) => {
      const el = containersRef.current[i];
      if (!el || el._leaflet_id) return;

      const map = L.map(el, { center: INITIAL.center, zoom: INITIAL.zoom, scrollWheelZoom: false, zoomControl: true, attributionControl: true });
      bm.layers.forEach((cfg) => makeLayer(L, cfg).addTo(map));

      const borderLayer = bm.hasLabels ? null : makeLayer(L, BORDERS);
      const cityGroup = makeCityGroup(L);
      if (borderLayer && showBorders) borderLayer.addTo(map);
      if (showCities) cityGroup.addTo(map);

      map.on('move zoom', () => {
        if (syncingRef.current) return;
        syncingRef.current = true;
        const c = map.getCenter();
        const z = map.getZoom();
        cellsRef.current.forEach((cell) => { if (cell && cell.map !== map) cell.map.setView(c, z, { animate: false }); });
        syncingRef.current = false;
      });

      cellsRef.current[i] = { map, cityGroup, borderLayer };
    });

    return () => {
      cellsRef.current.forEach((cell) => cell && cell.map.remove());
      cellsRef.current = [];
    };
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  // 3) Interrupteurs Villes / Frontieres appliques a toutes les cartes
  useEffect(() => {
    cellsRef.current.forEach((cell) => {
      if (!cell) return;
      if (showCities) cell.cityGroup.addTo(cell.map);
      else cell.map.removeLayer(cell.cityGroup);
    });
  }, [showCities, ready]);

  useEffect(() => {
    cellsRef.current.forEach((cell) => {
      if (!cell || !cell.borderLayer) return;
      if (showBorders) cell.borderLayer.addTo(cell.map);
      else cell.map.removeLayer(cell.borderLayer);
    });
  }, [showBorders, ready]);

  return (
    <div className="min-h-screen bg-[#26272a] text-[#acb0cd] pt-20 md:pt-24 pb-16 px-4 md:px-6">
      <style>{`
        .city-dot { display:block; width:7px; height:7px; border-radius:9999px; background:#c2622a; border:1.5px solid #fff; box-shadow:0 0 2px rgba(0,0,0,0.9); }
        .leaflet-tooltip.city-label { background:transparent !important; border:none !important; box-shadow:none !important; color:#fff; font:600 10px/1.1 system-ui,sans-serif; text-shadow:0 0 3px rgba(0,0,0,0.95), 0 0 5px rgba(0,0,0,0.85); padding:0; }
        .leaflet-tooltip.city-label::before { display:none !important; }
        /* Fusion multiply : la couche fonce/colore ce qui est dessous sans ecraser les zones
           claires. Sert a poser la terre brune sur la mer claire du fond Ocean. */
        .blend-multiply { mix-blend-mode: multiply; }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
          <Link href="/hotel-palace" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#C0C0C0]/30 text-[#acb0cd] hover:border-[#B03E00] hover:text-[#B03E00] text-sm transition-colors">
            &larr; Hotel &amp; Palace
          </Link>
          <p className="text-xs text-amber-300 italic">Page annexe — 3 fonds. Cartes synchronisees (bouger/zoomer l'une bouge les autres).</p>
        </div>

        <div className="text-center mb-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#c2622a] mb-2">Fonds Leaflet — gratuits, sans cle API</p>
          <h1 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.12em] text-[#C0C0C0]">National Geographic, Terrain &amp; Mix</h1>
          <p className="mt-3 text-sm text-[#acb0cd]/70 max-w-2xl mx-auto">
            La #1 (reference), la #3 (couleur turquoise), et le Mix : la mer a relief de la #1 avec une terre brune conforme.
          </p>
        </div>

        {/* Interrupteurs globaux */}
        <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
          {[
            { on: showCities, set: setShowCities, label: 'Villes principales', hint: `${PRINCIPAL_CITIES.length} villes — ta couche` },
            { on: showBorders, set: setShowBorders, label: 'Frontieres', hint: 'limites + lieux Esri' },
          ].map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => t.set((v) => !v)}
              className={`px-4 py-2 rounded-full text-[11px] uppercase tracking-wider inline-flex items-center gap-2 transition-colors ${
                t.on ? 'bg-[#B03E00]/20 border border-[#B03E00] text-[#B03E00] font-bold' : 'bg-[#3a3b3f] border border-[#C0C0C0]/25 text-[#acb0cd]/70 hover:border-[#C0C0C0]/50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${t.on ? 'bg-[#B03E00]' : 'bg-[#acb0cd]/40'}`} />
              {t.label}
              <span className="text-[9px] normal-case tracking-normal text-[#acb0cd]/45">({t.hint})</span>
            </button>
          ))}
        </div>

        {/* Grille : 3 fonds */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {BASEMAPS.map((bm, i) => (
            <figure key={bm.id} className="rounded-2xl border border-[#C0C0C0]/25 bg-[#2e2f32] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-[#C0C0C0]/10">
                <span className="text-[13px] font-semibold text-[#C0C0C0]">
                  <span className="text-[#acb0cd]/40 mr-1">{i === 2 ? 'Mix.' : `${i === 0 ? 1 : 3}.`}</span>{bm.name}
                </span>
                <span className={`shrink-0 px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider border ${TONE_STYLE[bm.tone]}`}>{bm.tone}</span>
              </div>

              <div
                data-no-rise
                ref={(el) => { containersRef.current[i] = el; }}
                className="h-[360px] md:h-[440px] bg-[#1c1d20] relative"
              >
                {!ready && <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/50">Chargement</div>}
              </div>

              <figcaption className="px-4 py-3 text-[11px] leading-relaxed text-[#acb0cd]/70">{bm.note}</figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-8 text-center text-[11px] text-[#acb0cd]/45 max-w-3xl mx-auto leading-relaxed">
          Molette desactivee : utilise les boutons + / - d'une carte, les autres suivent. Dis-moi le fond choisi
          (1, 3 ou Mix) et je le branche dans WorldMapClient.jsx. Villes = tableau <code className="mx-1 text-[#c2622a]">PRINCIPAL_CITIES</code>.
        </p>
      </div>
    </div>
  );
}
