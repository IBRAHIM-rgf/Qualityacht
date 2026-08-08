'use client';

// ══ WorldPinsMap — carte MONDE a points (Leaflet via CDN) + cartes ══
// Reutilisable : Events (evenements luxe) et Real Estate (biens de luxe).
// items : [{ name, place, coords:[lat,lng], badge, when?, desc, img }]
// Palette Qualityacht (fond sombre CARTO dark) ; JAMAIS de blanc.

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { starMarkerHtml, starIconSize } from '@/lib/star-marker';

export default function WorldPinsMap({
  items = [],
  kicker = '',
  title = '',
  intro = '',
  center = [25, -20],
  zoom = 2,
  accent = '#c2622a',
  dot = '#B87333',
  // between : noeud React insere ENTRE la carte et les cards (ex. filtres, cf.
  // /events/caribbean). Defaut null = aucune regression ailleurs.
  between = null,
}) {
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
      if (window.L) setReady(true); else existing.addEventListener('load', () => setReady(true));
      return;
    }
    const js = document.createElement('script');
    js.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    js.setAttribute('data-leaflet-js', '');
    js.onload = () => setReady(true);
    document.body.appendChild(js);
  }, []);

  // Logo etoile (SVG, fond transparent) a la place du point plein.
  const makeIcon = (on) => window.L.divIcon({
    className: 'wp-marker',
    html: starMarkerHtml(on, accent, dot),
    ...starIconSize(on),
  });

  useEffect(() => {
    if (!ready || !mapRef.current || mapInstance.current) return;
    const L = window.L;
    const map = L.map(mapRef.current, { center, zoom, scrollWheelZoom: false, worldCopyJump: true, minZoom: 2 });
    mapInstance.current = map;
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution: '© OpenStreetMap © CARTO', maxZoom: 19 }).addTo(map);
    items.forEach((it, i) => {
      const m = L.marker(it.coords, { icon: makeIcon(false) }).addTo(map)
        .bindTooltip(it.name, { direction: 'top', offset: [0, -6], className: 'wp-label' });
      m.on('click', () => setActive(i));
      markers.current[i] = m;
    });
    const t = setTimeout(() => map.invalidateSize(), 150);
    return () => clearTimeout(t);
  }, [ready]);

  useEffect(() => {
    if (!mapInstance.current || active == null) return;
    markers.current.forEach((m, i) => m && m.setIcon(makeIcon(i === active)));
    mapInstance.current.panTo(items[active].coords, { animate: true });
  }, [active]);

  return (
    <section className="relative bg-[#26272a] px-6 md:px-14 py-16 md:py-24">
      <style>{`
        .leaflet-tooltip.wp-label { background:#2e2f32 !important; border:1px solid #B87333 !important; color:#efe7d6; font-size:11px; font-weight:600; padding:2px 7px; border-radius:6px; box-shadow:0 2px 8px rgba(0,0,0,0.5) !important; }
        .leaflet-tooltip.wp-label::before { display:none !important; }
      `}</style>
      <div className="max-w-7xl mx-auto">
        {(kicker || title) && (
          <div className="text-center mb-10 md:mb-14">
            {kicker && <p className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-[#B87333] font-medium mb-3">{kicker}</p>}
            {title && <h2 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.1em] text-[#C0C0C0]">{title}</h2>}
            <div className="relative w-28 md:w-36 h-5 mx-auto mt-4"><Image src="/images/title-line.png" alt="" fill className="object-contain" /></div>
            {intro && <p className="mt-5 max-w-2xl mx-auto text-[13px] md:text-sm text-[#8b90a0] leading-relaxed">{intro}</p>}
          </div>
        )}

        <div className="relative h-[54vh] md:h-[62vh] rounded-2xl overflow-hidden border border-[#C0C0C0]/20 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] bg-[#1a1b1e]">
          <div ref={mapRef} className="absolute inset-0" />
          {!ready && <div className="absolute inset-0 flex items-center justify-center text-[#acb0cd]/60 text-sm">Loading map…</div>}
        </div>

        {between}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 mt-8">
          {items.map((it, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`group text-left rounded-2xl overflow-hidden border bg-[#3a3b3f]/70 backdrop-blur-sm transition-all ${active === i ? 'border-[#c2622a]' : 'border-[#C0C0C0]/20 hover:border-[#B87333]/60'}`}>
              <div className="relative h-32 overflow-hidden">
                {it.img && <Image src={it.img} alt="" fill sizes="300px" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                <div className="absolute inset-0 bg-gradient-to-t from-[#26272a]/90 to-transparent" />
                {it.badge && <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wide bg-[#B03E00] text-[#efe7d6]">{it.badge}</span>}
                {it.when && <span className="absolute bottom-2.5 left-2.5 text-[10px] uppercase tracking-wide text-[#efe7d6]/90 drop-shadow">{it.when}</span>}
              </div>
              <div className="p-4">
                <h3 className="trajan-regular text-sm uppercase tracking-[0.08em] text-[#C0C0C0] leading-snug">{it.name}</h3>
                <p className="text-[11px] text-[#B87333] mt-1">{it.place}</p>
                <p className="text-[12px] text-[#acb0cd]/80 leading-relaxed mt-2">{it.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
