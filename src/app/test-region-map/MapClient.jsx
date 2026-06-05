'use client';

// Carte Leaflet : sous-régions (cercles colorés) + aéroports (markers avec popup).
// Leaflet chargé via CDN (pas de npm install). Filtre par sous-région.

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin } from 'lucide-react';
import { REGION_VIEWS, SUB_REGIONS, AIRPORTS, SIZE_COLORS, SIZE_LABELS } from './map-data';

export default function MapClient({ region }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layersRef = useRef({ circles: [], markers: [] });
  const [selectedSubRegion, setSelectedSubRegion] = useState(null);
  const [leafletReady, setLeafletReady] = useState(false);

  const view = REGION_VIEWS[region];

  // 1) Charger Leaflet (CSS + JS) depuis CDN une seule fois
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.L) { setLeafletReady(true); return; }

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

  // 2) Init la carte une fois Leaflet prêt
  useEffect(() => {
    if (!leafletReady || !view || !mapRef.current) return;
    if (mapInstanceRef.current) return;

    const L = window.L;
    const map = L.map(mapRef.current, {
      center: view.center,
      zoom: view.zoom,
      scrollWheelZoom: false,
    });
    mapInstanceRef.current = map;

    // Fond de carte sombre (CartoDB Dark Matter — gratuit, attribution OK)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap · © CARTO',
      maxZoom: 18,
    }).addTo(map);

    // Cercles sous-régions
    Object.entries(SUB_REGIONS).forEach(([key, sub]) => {
      const circle = L.circle(sub.center, {
        radius: sub.radius,
        color: sub.color,
        weight: 2,
        fillColor: sub.color,
        fillOpacity: 0.12,
      }).addTo(map);
      circle.bindPopup(`<strong style="color:${sub.color}">${sub.label}</strong><br/><span style="font-size:11px;color:#666">${sub.description}</span>`);
      circle.on('click', () => setSelectedSubRegion(key));
      layersRef.current.circles.push({ key, layer: circle });
    });

    // Markers aéroports
    AIRPORTS.forEach((airport) => {
      const color = SIZE_COLORS[airport.size] || '#888';
      const icon = L.divIcon({
        className: 'airport-marker',
        html: `<div style="
          width: 12px; height: 12px;
          background: ${color};
          border: 2px solid #fff;
          border-radius: 50%;
          box-shadow: 0 0 0 1px ${color}, 0 2px 6px rgba(0,0,0,0.5);
          cursor: pointer;
        "></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });
      const marker = L.marker(airport.coords, { icon }).addTo(map);
      marker.bindPopup(`
        <div style="font-family: system-ui; min-width: 180px">
          <div style="font-weight: bold; color: ${color}; font-size: 14px; margin-bottom: 4px">
            ${airport.code}
            <span style="font-weight: normal; font-size: 11px; color: #888"> · ${SIZE_LABELS[airport.size]}</span>
          </div>
          <div style="color: #333; font-size: 12px">${airport.name}</div>
          <div style="color: #999; font-size: 11px; margin-top: 2px">${airport.island}</div>
        </div>
      `);
      layersRef.current.markers.push({ ...airport, layer: marker });
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      layersRef.current = { circles: [], markers: [] };
    };
  }, [leafletReady, view]);

  // 3) Filtre par sous-région : zoom + cache les autres markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    const L = window.L;

    if (!selectedSubRegion) {
      // Réinitialise : vue région complète, tout visible
      map.setView(view.center, view.zoom);
      layersRef.current.markers.forEach(({ layer }) => layer.setOpacity(1));
      layersRef.current.circles.forEach(({ layer }) => layer.setStyle({ fillOpacity: 0.12, weight: 2 }));
      return;
    }

    // Zoom sur la sous-région
    const sub = SUB_REGIONS[selectedSubRegion];
    if (sub) {
      map.flyTo(sub.center, 7, { duration: 1 });
      layersRef.current.markers.forEach(({ subRegion, layer }) => {
        layer.setOpacity(subRegion === selectedSubRegion ? 1 : 0.2);
      });
      layersRef.current.circles.forEach(({ key, layer }) => {
        layer.setStyle({
          fillOpacity: key === selectedSubRegion ? 0.3 : 0.05,
          weight: key === selectedSubRegion ? 3 : 1,
        });
      });
    }
  }, [selectedSubRegion, view]);

  if (!view) {
    return (
      <div className="min-h-screen bg-[#26272a] text-[#acb0cd] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="mb-4">Carte non disponible pour la région &laquo;&nbsp;{region}&nbsp;&raquo;.</p>
          <p className="text-sm text-[#acb0cd]/60">Pour la démo, seul <code className="text-[#B03E00]">?region=caribbean</code> est implémenté.</p>
          <Link href="/test-region-map?region=caribbean" className="inline-block mt-4 px-4 py-2 rounded-xl border border-[#C0C0C0]/40 text-[#B03E00] hover:bg-[#B03E00]/10">
            Voir Caraïbes
          </Link>
        </div>
      </div>
    );
  }

  const subRegionAirports = selectedSubRegion ? AIRPORTS.filter(a => a.subRegion === selectedSubRegion) : null;

  return (
    <div className="min-h-screen bg-[#26272a] text-[#acb0cd] pt-20 md:pt-24 pb-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
          <Link href="/" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#C0C0C0]/30 text-[#acb0cd] hover:border-[#B03E00] hover:text-[#B03E00] text-sm">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
          <p className="text-xs text-amber-300 italic">⚠️ Page annexe — maquette du modal carte. À intégrer dans l'admin une fois validée.</p>
        </div>

        <div className="text-center mb-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#c2622a] mb-2">Région</p>
          <h1 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.12em] text-[#C0C0C0]">{view.label}</h1>
        </div>

        {/* Layout carte + panneau latéral */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-4">

          {/* Carte */}
          <div className="rounded-xl border border-[#C0C0C0]/30 bg-[#3a3b3f] overflow-hidden h-[500px] md:h-[600px] relative">
            <div ref={mapRef} className="absolute inset-0" />
            {!leafletReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#26272a]/80 text-[#acb0cd]/70 text-sm">
                Chargement de la carte…
              </div>
            )}
          </div>

          {/* Panneau latéral : filtres */}
          <div className="space-y-3">
            <div className="rounded-xl border border-[#C0C0C0]/30 bg-[#2a2a30] p-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60 mb-2">Sous-régions</p>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedSubRegion(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                    !selectedSubRegion ? 'bg-[#B03E00]/20 border border-[#B03E00] text-[#B03E00]' : 'bg-[#3a3b3f] border border-transparent text-[#acb0cd]/70 hover:border-[#C0C0C0]/40'
                  }`}
                >
                  Tout afficher
                </button>
                {Object.entries(SUB_REGIONS).map(([key, sub]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedSubRegion(selectedSubRegion === key ? null : key)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2 transition-colors ${
                      selectedSubRegion === key ? 'bg-[#B03E00]/20 border border-[#B03E00] text-[#C0C0C0]' : 'bg-[#3a3b3f] border border-transparent text-[#acb0cd]/80 hover:border-[#C0C0C0]/40'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: sub.color }} />
                    {sub.label}
                    <span className="ml-auto text-[10px] text-[#acb0cd]/40">
                      {AIRPORTS.filter(a => a.subRegion === key).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Légende tailles */}
            <div className="rounded-xl border border-[#C0C0C0]/30 bg-[#2a2a30] p-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60 mb-2">Types de jets</p>
              <div className="space-y-1.5">
                {Object.entries(SIZE_LABELS).map(([size, label]) => (
                  <div key={size} className="flex items-center gap-2 text-xs">
                    <span className="w-3 h-3 rounded-full shrink-0 border-2 border-white" style={{ background: SIZE_COLORS[size] }} />
                    <span className="text-[#acb0cd]/80">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Liste détaillée des aéroports filtrés (sous la carte) */}
        {subRegionAirports && (
          <div className="mt-6 rounded-xl border border-[#B03E00]/30 bg-[#B03E00]/5 p-5">
            <h2 className="text-sm uppercase tracking-[0.2em] text-[#B03E00] mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {SUB_REGIONS[selectedSubRegion].label} — {subRegionAirports.length} aéroport(s)
            </h2>
            <p className="text-xs text-[#acb0cd]/70 italic mb-3">{SUB_REGIONS[selectedSubRegion].description}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {subRegionAirports.map((a) => (
                <div key={a.code} className="flex items-center gap-2 p-2 rounded-lg bg-[#2a2a30] border border-[#C0C0C0]/20">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: SIZE_COLORS[a.size] }} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-[#C0C0C0]">{a.code} <span className="text-[#acb0cd]/60 font-normal">· {a.island}</span></p>
                    <p className="text-[10px] text-[#acb0cd]/70 truncate">{a.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
