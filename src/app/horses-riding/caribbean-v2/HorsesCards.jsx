'use client';

import Image from 'next/image';
import { useState } from 'react';
import { MapPin } from 'lucide-react';

// Cards calquees a l'identique sur RegattaEventCard (regattas-caribbean-*) :
// coque rounded-2xl / border cococo/30 / bg #3a3b3f/80 backdrop-blur, hover
// bordure orange, entete nom + ligne lieu a gauche + pill date ORANGE PLEINE a
// droite, rangee de pills, puis bouton "Read more" repliable.

const SHELL =
  'rounded-2xl border border-[#C0C0C0]/30 bg-[#3a3b3f]/80 backdrop-blur-sm overflow-hidden transition-all hover:border-[#B03E00]/60';
const DATE_PILL =
  'shrink-0 inline-block px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold tracking-wide bg-[#B03E00] text-white whitespace-nowrap';
const TAG =
  'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] uppercase tracking-wide bg-[#26272a] border border-[#C0C0C0]/20 text-[#acb0cd]';
const READ_MORE =
  'w-full px-5 py-2 text-[11px] uppercase tracking-[0.2em] text-[#c2622a] border-t border-[#C0C0C0]/15 hover:bg-[#B03E00]/5 transition-colors';
const PANEL =
  'px-5 py-4 border-t border-[#C0C0C0]/15 space-y-3 text-xs md:text-sm text-[#acb0cd]/80';
const PANEL_LABEL = 'text-[10px] uppercase tracking-[0.2em] text-[#c2622a] mb-1';

function CardHeader({ title, subtitle, pill }) {
  return (
    <div className="px-5 py-4 flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <h4 className="trajan-regular text-base md:text-lg uppercase tracking-[0.1em] text-[#acb0cd] leading-snug">
          {title}
        </h4>
        <p className="text-[11px] md:text-xs text-[#acb0cd]/60 mt-1 flex items-center gap-1">
          <MapPin className="w-3 h-3 inline shrink-0" /> {subtitle}
        </p>
      </div>
      <span className={DATE_PILL}>{pill}</span>
    </div>
  );
}

// ── Circuit saisonnier ─────────────────────────────────────────────────────────
export function CircuitCard({ circuit }) {
  const [open, setOpen] = useState(false);
  const stops = circuit.route.split('→').map((s) => s.trim());
  const endpoints = stops.length > 1 ? `${stops[0]} → ${stops[stops.length - 1]}` : stops[0];

  return (
    <div className={SHELL}>
      <CardHeader title={circuit.name} subtitle={endpoints} pill={circuit.dates} />

      <div className="px-5 pb-4 flex flex-wrap gap-1.5">
        <span className={TAG}>⛵ {circuit.distance}</span>
        <span className={TAG}>📍 {stops.length} stops</span>
      </div>

      <button onClick={() => setOpen((v) => !v)} className={READ_MORE}>
        {open ? 'Show less' : 'Read more'}
      </button>

      {open && (
        <div className={PANEL}>
          <div>
            <p className={PANEL_LABEL}>The Route</p>
            <p className="leading-relaxed">{circuit.route}</p>
          </div>
          <div>
            <p className={PANEL_LABEL}>Distance</p>
            <p className="leading-relaxed">{circuit.distance}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Ile (structure regatta + photo de region en entete) ────────────────────────
export function IslandCard({ island, regionName, regionPhoto }) {
  const [open, setOpen] = useState(false);
  const hasRacing = island.racing && island.racing !== '—';

  return (
    <div className={SHELL}>
      {regionPhoto && (
        <div className="relative h-44 md:h-48 overflow-hidden">
          <Image
            src={encodeURI(regionPhoto)}
            alt={island.name}
            fill
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3a3b3f] via-[#26272a]/25 to-transparent" />
        </div>
      )}

      <CardHeader title={island.name} subtitle={regionName} pill={island.season} />

      <div className="px-5 pb-4 flex flex-wrap gap-1.5">
        <span className={TAG}>🐎 Riding</span>
        {hasRacing && <span className={TAG}>🏁 Racing</span>}
      </div>

      <button onClick={() => setOpen((v) => !v)} className={READ_MORE}>
        {open ? 'Show less' : 'Read more'}
      </button>

      {open && (
        <div className={PANEL}>
          <div>
            <p className={PANEL_LABEL}>Riding</p>
            <p className="leading-relaxed">{island.riding}</p>
          </div>
          {hasRacing && (
            <div>
              <p className={PANEL_LABEL}>Racing</p>
              <p className="leading-relaxed">{island.racing}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
