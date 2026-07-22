'use client';

// Carte monde de /hotel-palace : les 16 destinations posees en points ; un clic sur une
// zone ouverte rapproche la carte et devoile ses sous-regions ; un clic sur une
// sous-region rapproche encore et ouvre sa selection sous la carte.
//
// Leaflet est charge depuis le CDN (aucun npm install), meme technique que
// /test-region-map. Fond de carte sombre CartoDB Dark Matter.
//
// Le conteneur de la carte porte data-no-rise : ScrollRise (monte dans le layout racine)
// balaye main a la recherche de h1-h6/p/li et met chaque texte en pause a opacite 0 en
// attendant qu'il entre dans le champ — y compris les noeuds injectes apres coup, via son
// MutationObserver. Les popups Leaflet en seraient la cible et s'ouvriraient invisibles.
//
// AUCUN emoji.

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  WORLD_VIEW,
  WORLD_DESTINATIONS,
  CARIBBEAN_VIEW,
  SUBREGIONS,
  EMERGING_POINTS,
  HOTELS_BY_SUB,
} from './map-data';

// Une zone "ready" ouvre sa page dediee (les Caraibes -> /hotel-palace/caribbean),
// la ou le zoom se faisait avant sur place.
const REGION_PATH = { caribbean: '/hotel-palace/caribbean' };

const EMERGING_SLUG = 'emerging-destinations';

export default function WorldMapClient() {
  const router = useRouter();
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layersRef = useRef({ world: [], subs: [], emerging: [] });

  const [leafletReady, setLeafletReady] = useState(false);
  const [region, setRegion] = useState(null); // null = vue monde | 'caribbean'
  const [activeSub, setActiveSub] = useState(null); // slug de sous-region

  // Ouvre la page dediee d'une zone prete (les Caraibes ont leur propre page).
  const openRegion = (r) => router.push(REGION_PATH[r] || '/hotel-palace');

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

  // 2) Init de la carte + construction de TOUTES les couches (les sous-regions ne sont
  //    pas ajoutees a la carte tout de suite : elles n'apparaissent qu'une fois la zone
  //    ouverte).
  useEffect(() => {
    if (!leafletReady || !mapRef.current) return;
    if (mapInstanceRef.current) return;

    const L = window.L;
    const map = L.map(mapRef.current, {
      center: WORLD_VIEW.center,
      zoom: WORLD_VIEW.zoom,
      minZoom: 2,
      scrollWheelZoom: false,
      worldCopyJump: true,
    });
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap · © CARTO',
      maxZoom: 18,
    }).addTo(map);

    // ── Les 16 destinations : marqueur = LOGO Qualityacht (fond transparent). La
    //    destination "ready" (Caraibes) porte en plus l'anneau orange pulsant. ──
    WORLD_DESTINATIONS.forEach((d) => {
      const icon = L.divIcon({
        className: 'hp-dest-marker',
        html: `<div class="hp-logo-dest ${d.ready ? 'hp-logo-ready' : ''}"><img src="/images/trans.png" alt="" /></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });
      const marker = L.marker(d.coords, { icon, title: d.label }).addTo(map);
      marker.bindTooltip(d.label, {
        direction: 'right',
        offset: [10, 0],
        className: 'hp-label',
      });

      if (d.ready) {
        marker.on('click', () => openRegion(d.region));
      } else {
        marker.bindPopup(
          `<div class="hp-pop">
             <span class="hp-pop-title">${d.label}</span>
             <span class="hp-pop-sub">${d.anchor}</span>
             <span class="hp-pop-soon">Selection coming soon</span>
           </div>`
        );
      }
      layersRef.current.world.push({ ...d, layer: marker });
    });

    // ── Les sous-regions Caraibes (polygones) ──
    SUBREGIONS.forEach((s) => {
      if (!s.polygons) return; // Emerging Destinations : points isoles, voir plus bas
      // Un cran de tableau en plus autour de chaque contour : Leaflet lit un multipolygone
      // comme une liste de polygones, chacun etant une liste d'anneaux. Passer les
      // contours a plat ([anneau1, anneau2]) les ferait lire comme UN polygone troue,
      // et les Iles Vierges deviendraient un trou dans les ABC.
      // fill a true (meme tres transparent) : sans remplissage, seul le trait est
      // cliquable et viser un contour de 2px au doigt est intenable.
      const poly = L.polygon(
        s.polygons.map((ring) => [ring]),
        {
          color: s.color,
          weight: 2,
          fill: true,
          fillColor: s.color,
          fillOpacity: 0.1,
        }
      );
      poly.on('click', () => setActiveSub(s.slug));
      poly.bindTooltip(s.name, { direction: 'center', className: 'hp-label' });
      layersRef.current.subs.push({ slug: s.slug, layer: poly });
    });

    // ── Emerging Destinations : losanges isoles ──
    EMERGING_POINTS.forEach((p) => {
      const color = SUBREGIONS.find((s) => s.slug === EMERGING_SLUG)?.color || '#27ae60';
      const icon = L.divIcon({
        className: 'hp-emerging-marker',
        html: `<div class="hp-diamond" style="--dot:${color}"></div>`,
        iconSize: [10, 10],
        iconAnchor: [5, 5],
      });
      const marker = L.marker(p.coords, { icon, title: p.name });
      marker.bindTooltip(p.name, { direction: 'right', offset: [8, 0], className: 'hp-label' });
      marker.on('click', () => setActiveSub(EMERGING_SLUG));
      layersRef.current.emerging.push({ name: p.name, layer: marker });
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      layersRef.current = { world: [], subs: [], emerging: [] };
    };
  }, [leafletReady]);

  // 3) Zone active : bascule les couches. Le vol vers les Caraibes est laisse a l'effet
  //    suivant (activeSub), sinon les deux se disputent la camera au meme instant.
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const { world, subs, emerging } = layersRef.current;

    const show = (layer) => { if (!map.hasLayer(layer)) map.addLayer(layer); };
    const hide = (layer) => { if (map.hasLayer(layer)) map.removeLayer(layer); };

    if (!region) {
      world.forEach(({ layer }) => show(layer));
      subs.forEach(({ layer }) => hide(layer));
      emerging.forEach(({ layer }) => hide(layer));
      map.flyTo(WORLD_VIEW.center, WORLD_VIEW.zoom, { duration: 1 });
      return;
    }

    world.forEach(({ layer }) => hide(layer));
    subs.forEach(({ layer }) => show(layer));
    emerging.forEach(({ layer }) => show(layer));
  }, [region, leafletReady]);

  // 4) Sous-region active : rapproche + met en avant. Sans sous-region choisie, on
  //    revient a la vue d'ensemble de la zone.
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !region) return;
    const L = window.L;
    const { subs, emerging } = layersRef.current;

    if (!activeSub) {
      subs.forEach(({ layer }) => layer.setStyle({ weight: 2, opacity: 1, fillOpacity: 0.1 }));
      emerging.forEach(({ layer }) => layer.setOpacity(1));
      map.flyToBounds(L.latLngBounds(CARIBBEAN_VIEW.bounds), { duration: 1.2, padding: [30, 30] });
      return;
    }

    subs.forEach(({ slug, layer }) => {
      const on = slug === activeSub;
      layer.setStyle({
        weight: on ? 3.5 : 1,
        opacity: on ? 1 : 0.35,
        fillOpacity: on ? 0.18 : 0.04,
      });
    });
    emerging.forEach(({ layer }) => layer.setOpacity(activeSub === EMERGING_SLUG ? 1 : 0.3));

    if (activeSub === EMERGING_SLUG) {
      // Pas de polygone : on cadre sur l'ensemble des points eparpilles.
      map.flyToBounds(L.latLngBounds(EMERGING_POINTS.map((p) => p.coords)), {
        duration: 1.2,
        padding: [60, 60],
        maxZoom: 7,
      });
      return;
    }

    const sub = SUBREGIONS.find((s) => s.slug === activeSub);
    if (sub?.polygons) {
      // flat() : le cadrage doit tenir TOUS les contours de la sous-region, pas le premier.
      map.flyToBounds(L.latLngBounds(sub.polygons.flat()), {
        duration: 1.2,
        padding: [40, 40],
        maxZoom: 9,
      });
    }
  }, [activeSub, region, leafletReady]);

  const openSub = activeSub ? SUBREGIONS.find((s) => s.slug === activeSub) : null;
  const openHotels = activeSub ? HOTELS_BY_SUB[activeSub] || [] : [];

  return (
    <section className="bg-[#26272a] px-4 md:px-10 lg:px-14 py-14 md:py-20">
      <style>{`
        .hp-logo-dest { position: relative; width: 30px; height: 30px; cursor: pointer; }
        .hp-logo-dest img {
          width: 30px; height: 30px; display: block;
          filter: drop-shadow(0 1px 3px rgba(0,0,0,0.85));
        }
        /* destinations "coming soon" : logo plus transparent pour rester discret */
        .hp-logo-dest:not(.hp-logo-ready) img { opacity: 0.5; }
        /* Caraibes (ready) : anneau orange pulsant derriere le logo */
        .hp-logo-ready::before {
          content: ''; position: absolute; inset: 1px; border-radius: 9999px;
          animation: hpPulse 2.4s ease-out infinite;
        }
        @keyframes hpPulse {
          0%   { box-shadow: 0 0 0 1px #B03E00, 0 0 0 0 rgba(176,62,0,0.55); }
          70%  { box-shadow: 0 0 0 1px #B03E00, 0 0 0 14px rgba(176,62,0,0); }
          100% { box-shadow: 0 0 0 1px #B03E00, 0 0 0 0 rgba(176,62,0,0); }
        }
        @media (prefers-reduced-motion: reduce) { .hp-dot-ready { animation: none; } }
        .hp-diamond {
          width: 8px; height: 8px; background: transparent;
          border: 2px solid var(--dot); transform: rotate(45deg);
          cursor: pointer;
        }
        .leaflet-tooltip.hp-label {
          background: transparent !important; border: none !important; box-shadow: none !important;
          color: #C0C0C0; font-family: system-ui, sans-serif; font-size: 10px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.08em;
          text-shadow: 0 0 3px rgba(0,0,0,0.95), 0 0 6px rgba(0,0,0,0.8);
          padding: 1px 3px; pointer-events: none;
        }
        .leaflet-tooltip.hp-label::before { display: none !important; }
        .hp-pop { display: flex; flex-direction: column; gap: 2px; font-family: system-ui, sans-serif; min-width: 150px; }
        .hp-pop-title { font-weight: 700; font-size: 13px; color: #26272a; }
        .hp-pop-sub { font-size: 11px; color: #6b6b70; font-style: italic; }
        .hp-pop-soon { margin-top: 4px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: #B03E00; }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* ── Fil d'ariane + retour ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]">
            <button
              type="button"
              onClick={() => { setActiveSub(null); setRegion(null); }}
              className={`transition-colors duration-300 ${
                region ? 'text-[#acb0cd]/60 hover:text-[#c2622a]' : 'text-[#B87333]'
              }`}
            >
              World
            </button>
            {region && (
              <>
                <span aria-hidden className="text-[#acb0cd]/30">/</span>
                <button
                  type="button"
                  onClick={() => setActiveSub(null)}
                  className={`transition-colors duration-300 ${
                    activeSub ? 'text-[#acb0cd]/60 hover:text-[#c2622a]' : 'text-[#B87333]'
                  }`}
                >
                  {CARIBBEAN_VIEW.label}
                </button>
              </>
            )}
            {openSub && (
              <>
                <span aria-hidden className="text-[#acb0cd]/30">/</span>
                <span className="text-[#B87333]">{openSub.name}</span>
              </>
            )}
          </div>

          <p className="text-[10px] uppercase tracking-[0.18em] text-[#acb0cd]/45">
            {region ? 'Select a sub-region' : 'Select a destination to zoom in'}
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

        {/* ── Chips : acces clavier et tactile aux memes zones que les points ── */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {!region
            ? WORLD_DESTINATIONS.map((d) => (
                <button
                  key={d.title}
                  type="button"
                  onClick={() => d.ready && openRegion(d.region)}
                  disabled={!d.ready}
                  className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors duration-300 ${
                    d.ready
                      ? 'bg-[#3a3b3f] border border-[#C0C0C0]/50 text-[#acb0cd] hover:border-[#B03E00] hover:text-[#c2622a]'
                      : 'bg-[#3a3b3f]/50 border border-[#C0C0C0]/15 text-[#acb0cd]/35 cursor-default'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: d.ready ? '#B03E00' : '#C0C0C0', opacity: d.ready ? 1 : 0.35 }}
                  />
                  {d.label}
                </button>
              ))
            : SUBREGIONS.map((s) => (
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
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
                  {s.name}
                </button>
              ))}
        </div>

        {/* ── Selection de la sous-region ouverte ── */}
        {openSub && (
          <div className="mt-6 rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: openSub.color }} />
              <h3 className="trajan-regular text-lg md:text-xl uppercase tracking-[0.1em] text-[#C0C0C0]">
                {openSub.name}
              </h3>
            </div>
            <p className="text-[12px] text-[#acb0cd]/65 italic mb-5">{openSub.description}</p>

            {openHotels.length === 0 ? (
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#B87333]">
                Selection coming soon
              </p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                {openHotels.map((h) => (
                  <article
                    key={h.name}
                    className="bg-[#3a3b3f] border border-[#C0C0C0]/15 rounded-2xl p-5 flex flex-col"
                  >
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
