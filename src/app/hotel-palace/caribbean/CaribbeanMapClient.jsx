'use client';

// Carte Caraibes de /hotel-palace/caribbean (page dediee, ouverte au clic sur les
// Caraibes depuis la carte monde).
//
// ASPECT (choix client, aligne sur la carte monde) :
//  - FOND = tuiles Esri National Geographic (relief marron + relief de la mer + frontieres
//    + villes) — le "#1" du comparateur /test-world-relief. Gratuit, sans cle API.
//  - Le fond gris dessine (GeoJSON caribbean-land.json) a ete remplace par ce basemap ;
//    le .json reste sur le disque si l'on veut revenir au rendu gris.
//
// DEUX NIVEAUX DE ZOOM :
//  - Niveau 1 (activeSub null) : vue d'ensemble, les 8 sous-regions posees en LABELS
//    (leur nom) au centroïde de leurs iles. Un clic ouvre le niveau 2.
//  - Niveau 2 (activeSub set) : la carte se rapproche sur la sous-region et devoile ses
//    ILES et ses VILLES (coords reprises de test-region-map, cf. places-data.js).
//
// Leaflet est charge depuis le CDN (aucun npm install). data-no-rise sur le conteneur :
// ScrollRise (layout racine) mettrait les popups/labels a opacite 0.
// AUCUN emoji.

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { SUBREGIONS, HOTELS_BY_SUB } from '../map-data';
import { SUB_CENTERS, CITIES, ISLANDS } from './places-data';

const SEA = '#26272a'; // fond de repli le temps que les tuiles chargent
const COCOCO = '#C0C0C0';
const CARIB_BOUNDS = [[9.5, -85.0], [23.5, -58.0]];

// Marqueur d'emplacement = le LOGO Qualityacht (medaillon, fond transparent), a la
// place d'un point plein.
const LOGO_MARK =
  '<img src="/images/trans.png" alt="" width="20" height="20" class="hp-logo-mark" />';

export default function CaribbeanMapClient() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  // couches indexees par slug de sous-region
  const layersRef = useRef({ subLabels: [], places: {} });

  const [leafletReady, setLeafletReady] = useState(false);
  const [activeSub, setActiveSub] = useState(null);

  // 1) Charger Leaflet (CSS + JS) depuis le CDN, une seule fois
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.L) {
      setLeafletReady(true);
      return;
    }
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
    js.onload = () => setLeafletReady(true);
    document.body.appendChild(js);
  }, []);

  // 2) Init : fond gris (mer), terre GeoJSON (gris clair + frontieres cococo), labels
  //    de sous-region (niveau 1), et pour chaque sous-region ses iles + villes (niveau 2).
  useEffect(() => {
    if (!leafletReady || !mapRef.current) return;
    if (mapInstanceRef.current) return;

    const L = window.L;
    const map = L.map(mapRef.current, {
      center: [16, -70],
      zoom: 5,
      minZoom: 4,
      maxZoom: 11,
      scrollWheelZoom: false,
      attributionControl: true, // tuiles Esri : attribution requise
    });
    mapInstanceRef.current = map;
    map.fitBounds(CARIB_BOUNDS);

    // ── FOND = tuiles Esri National Geographic (meme basemap que la carte monde) ──
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; National Geographic',
      maxZoom: 19,
      maxNativeZoom: 16,
    }).addTo(map);

    // ── Niveau 1 : LOGO Qualityacht (fond transparent) + nom par sous-region, clic -> niveau 2 ──
    SUBREGIONS.forEach((s) => {
      const center = SUB_CENTERS[s.slug];
      if (!center) return;
      const icon = L.divIcon({
        className: 'hp-sub-label-wrap',
        html: `<span class="hp-sub-logo"><img src="/images/trans.png" alt="" /></span><span class="hp-sub-label">${s.name}</span>`,
        iconSize: [150, 52],
        iconAnchor: [75, 40],
      });
      const marker = L.marker(center, { icon, title: s.name });
      marker.on('click', () => setActiveSub(s.slug));
      layersRef.current.subLabels.push({ slug: s.slug, layer: marker });
    });

    // ── Niveau 2 : iles + villes de chaque sous-region (masquees au depart) ──
    SUBREGIONS.forEach((s) => {
      const group = L.layerGroup();

      ISLANDS.filter((i) => i.sub === s.slug).forEach((i) => {
        const icon = L.divIcon({
          className: 'hp-place-wrap',
          html: `<span class="hp-island">${i.name}</span>`,
          iconSize: [120, 16],
          iconAnchor: [60, 8],
        });
        L.marker(i.coords, { icon, interactive: false }).addTo(group);
      });

      CITIES.filter((c) => c.sub === s.slug).forEach((c) => {
        // Emplacement = petite icone de lieu TRANSPARENTE (contour seul, aucun
        // remplissage), a la place de l'ancien point plein. La pointe du pin est calee
        // sur la coordonnee (iconAnchor).
        const icon = L.divIcon({
          className: 'hp-place-wrap',
          html: `<span class="hp-city-pin">${LOGO_MARK}</span><span class="hp-city">${c.name}</span>`,
          iconSize: [160, 20],
          iconAnchor: [10, 10],
        });
        L.marker(c.coords, { icon }).addTo(group);
      });

      layersRef.current.places[s.slug] = group;
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      layersRef.current = { subLabels: [], places: {} };
    };
  }, [leafletReady]);

  // 3) Bascule niveau 1 / niveau 2 selon activeSub
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const L = window.L;
    const { subLabels, places } = layersRef.current;

    const show = (layer) => { if (layer && !map.hasLayer(layer)) map.addLayer(layer); };
    const hide = (layer) => { if (layer && map.hasLayer(layer)) map.removeLayer(layer); };

    if (!activeSub) {
      // Niveau 1 : labels de sous-region visibles, aucun detail, vue d'ensemble
      subLabels.forEach(({ layer }) => show(layer));
      Object.values(places).forEach((g) => hide(g));
      map.flyToBounds(L.latLngBounds(CARIB_BOUNDS), { duration: 1.1, padding: [30, 30] });
      return;
    }

    // Niveau 2 : on cache les labels de sous-region et les autres details,
    // on montre iles + villes de la sous-region choisie, et on se rapproche.
    subLabels.forEach(({ layer }) => hide(layer));
    Object.entries(places).forEach(([slug, g]) => (slug === activeSub ? show(g) : hide(g)));

    // Cadrage sur les coords reelles de la sous-region (iles + villes) : plus juste que
    // le polygone. Fallback sur le polygone si une sous-region n'a pas de points.
    const pts = [
      ...ISLANDS.filter((i) => i.sub === activeSub).map((i) => i.coords),
      ...CITIES.filter((c) => c.sub === activeSub).map((c) => c.coords),
    ];
    if (pts.length) {
      map.flyToBounds(L.latLngBounds(pts), { duration: 1.2, padding: [70, 70], maxZoom: 10 });
    } else {
      const sub = SUBREGIONS.find((s) => s.slug === activeSub);
      if (sub?.polygons) {
        map.flyToBounds(L.latLngBounds(sub.polygons.flat()), { duration: 1.2, padding: [40, 40], maxZoom: 9 });
      }
    }
  }, [activeSub, leafletReady]);

  const openSub = activeSub ? SUBREGIONS.find((s) => s.slug === activeSub) : null;
  const openHotels = activeSub ? HOTELS_BY_SUB[activeSub] || [] : [];

  return (
    <section className="bg-[#26272a] px-4 md:px-10 lg:px-14 py-14 md:py-20">
      <style>{`
        .leaflet-container { background: ${SEA}; }
        /* Marqueur de sous-region : logo (fond transparent) au-dessus du nom, centres */
        .hp-sub-label-wrap {
          display: flex; flex-direction: column; align-items: center; cursor: pointer;
        }
        .hp-sub-logo { line-height: 0; }
        .hp-sub-logo img {
          width: 30px; height: 30px; display: block;
          filter: drop-shadow(0 1px 3px rgba(0,0,0,0.85));
        }
        .hp-sub-label {
          display: inline-block; white-space: nowrap; cursor: pointer; margin-top: 2px;
          font-family: system-ui, sans-serif; font-size: 12px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em; color: ${COCOCO};
          text-shadow: 0 0 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.7);
          transition: color 0.2s;
        }
        .hp-sub-label-wrap:hover .hp-sub-label { color: #c2622a; }
        .hp-island {
          display: inline-block; white-space: nowrap;
          font-family: system-ui, sans-serif; font-size: 10px; font-weight: 600; font-style: italic;
          text-transform: uppercase; letter-spacing: 0.06em; color: ${COCOCO};
          text-shadow: 0 0 3px rgba(0,0,0,0.95), 0 0 6px rgba(0,0,0,0.8);
        }
        .hp-city-pin {
          display: inline-block; line-height: 0; vertical-align: middle;
          filter: drop-shadow(0 1px 3px rgba(0,0,0,0.9));
        }
        .hp-logo-mark { display: block; width: 20px; height: 20px; }
        .hp-city {
          margin-left: 4px; white-space: nowrap; vertical-align: middle;
          font-family: system-ui, sans-serif; font-size: 9px; font-weight: 600;
          color: #d9dbe4; text-shadow: 0 0 3px rgba(0,0,0,0.95), 0 0 5px rgba(0,0,0,0.8);
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* ── Fil d'ariane ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]">
            <Link href="/hotel-palace" className="text-[#acb0cd]/60 hover:text-[#c2622a] transition-colors duration-300">
              World
            </Link>
            <span aria-hidden className="text-[#acb0cd]/30">/</span>
            <button
              type="button"
              onClick={() => setActiveSub(null)}
              className={`transition-colors duration-300 ${
                activeSub ? 'text-[#acb0cd]/60 hover:text-[#c2622a]' : 'text-[#B87333]'
              }`}
            >
              Caribbean
            </button>
            {openSub && (
              <>
                <span aria-hidden className="text-[#acb0cd]/30">/</span>
                <span className="text-[#B87333]">{openSub.name}</span>
              </>
            )}
          </div>

          <p className="text-[10px] uppercase tracking-[0.18em] text-[#acb0cd]/45">
            {activeSub ? 'Islands & main gateways' : 'Select a sub-region'}
          </p>
        </div>

        {/* ── La carte ── */}
        <div
          data-no-rise
          className="rounded-2xl border border-[#C0C0C0]/25 bg-[#2e2f32] overflow-hidden h-[460px] md:h-[600px] relative"
        >
          <div ref={mapRef} className="absolute inset-0" />
          {!leafletReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#26272a]/80 text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60">
              Loading the map
            </div>
          )}
        </div>

        {/* ── Chips : acces clavier et tactile aux memes zones ── */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {SUBREGIONS.map((s) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => setActiveSub(activeSub === s.slug ? null : s.slug)}
              className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors duration-300 ${
                activeSub === s.slug
                  ? 'bg-[#B03E00]/15 border border-[#B03E00] text-[#C0C0C0]'
                  : 'bg-[#3a3b3f] border border-[#C0C0C0]/25 text-[#acb0cd]/80 hover:border-[#C0C0C0]/60'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* ── Selection de la sous-region ouverte ── */}
        {openSub && (
          <div className="mt-6 rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32] p-6 md:p-8">
            <h3 className="trajan-regular text-lg md:text-xl uppercase tracking-[0.1em] text-[#C0C0C0] mb-2">
              {openSub.name}
            </h3>
            <p className="text-[12px] text-[#acb0cd]/65 italic mb-5">{openSub.description}</p>

            {openHotels.length === 0 ? (
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#B87333]">Selection coming soon</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                {openHotels.map((h) => (
                  <article key={h.name} className="bg-[#3a3b3f] border border-[#C0C0C0]/15 rounded-2xl p-5 flex flex-col">
                    <div className="flex items-center flex-wrap gap-2 mb-3">
                      <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-[0.14em] text-[#B87333] border border-[#B87333]/40">
                        {h.type}
                      </span>
                      {h.signature && (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.12em] text-[#d8be7e]">
                          <span aria-hidden>★</span> Signature Selection
                        </span>
                      )}
                    </div>
                    <h4 className="text-[#C0C0C0] font-semibold text-[15px] leading-snug mb-1">{h.name}</h4>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-[#acb0cd]/50 mb-2">{h.island}</p>
                    <p className="text-[#acb0cd] text-[13px] leading-relaxed">{h.desc}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
