'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MapPin } from 'lucide-react';

// Cards calquees a l'identique sur RegattaEventCard (regattas-caribbean-*) :
// coque rounded-2xl / border cococo/30 / bg #3a3b3f/80 backdrop-blur, hover
// bordure orange, entete nom + ligne lieu a gauche + pill date ORANGE PLEINE a
// droite, rangee de pills, puis bouton "Read more" repliable.
// Regle : AUCUN emoji nulle part.

// Region -> page sous-region (meme mapping que les pages regattas-caribbean-*).
// Les Virgin Islands (BVI/USVI) font partie de la chaine des Leeward Islands.
const REGION_LINKS = {
  'Greater Antilles': '/charters/destinations/carabbean/greater-antilles-v11',
  'Turks & Caicos': '/charters/destinations/carabbean/turks-caicos-v11',
  'Cayman Islands': '/charters/destinations/carabbean/grand-cayman-v11',
  'Leeward Islands': '/charters/destinations/carabbean/leeward-islands-v11',
  'British Virgin Islands (BVI)': '/charters/destinations/carabbean/leeward-islands-v11',
  'US Virgin Islands (USVI)': '/charters/destinations/carabbean/leeward-islands-v11',
  'Windward Islands & Grenadines': '/charters/destinations/carabbean/windward-islands-v11',
  'ABC Islands (Aruba · Bonaire · Curaçao)': '/charters/destinations/carabbean/leeward-antilles-v11',
};

const SHELL =
  'rounded-2xl border border-[#C0C0C0]/30 bg-[#3a3b3f]/80 backdrop-blur-sm overflow-hidden transition-all hover:border-[#B03E00]/60';
const DATE_PILL =
  'shrink-0 inline-block px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold tracking-wide bg-[#B03E00] text-white whitespace-nowrap';
const TAG =
  'inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] uppercase tracking-wide bg-[#26272a] border border-[#C0C0C0]/20 text-[#acb0cd]';
// Read more / Show less : pas de fond orange, un peu plus gros.
const READ_MORE =
  'w-full px-5 py-3.5 text-xs md:text-sm uppercase tracking-[0.2em] text-[#c2622a] border-t border-[#C0C0C0]/15 transition-colors hover:text-[#B03E00]';
const PANEL = 'px-5 py-3 border-t border-[#C0C0C0]/15 space-y-2.5';
// TODO — Bouton sous-region : le VERT est TEMPORAIRE, c'est un marqueur pour se
// souvenir que le TEXTE du bouton reste a modifier ("Explore {region}" n'est pas
// le libelle final). Une fois le texte decide, repasser au style des regles design :
// contour cococo #C0C0C0 -> orange #c2622a au survol, jamais de blanc.
const REGION_BTN =
  'inline-flex items-center justify-center px-4 py-2 rounded-full border border-green-500 text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-green-400 hover:border-green-300 hover:text-green-300 transition-colors';

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

// Bloc du "Read more" : le libelle et le texte ont CHACUN sa card gris fonce.
// Le libelle reprend exactement la pill du haut de la card (TAG). Espacements serres.
const PANEL_BOX = 'bg-[#26272a] border border-[#C0C0C0]/10 rounded-lg';

function PanelCard({ label, children }) {
  return (
    <div className="space-y-1.5">
      <div>
        <span className={TAG}>{label}</span>
      </div>
      <div className={`${PANEL_BOX} p-3`}>
        <p className="text-[13px] md:text-sm leading-relaxed text-[#acb0cd]/85">{children}</p>
      </div>
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
        <span className={TAG}>{stops.length} stops</span>
      </div>

      <button onClick={() => setOpen((v) => !v)} className={READ_MORE}>
        {open ? 'Show less' : 'Read more'}
      </button>

      {open && (
        <div className={PANEL}>
          <PanelCard label="The Route">{circuit.route}</PanelCard>
        </div>
      )}
    </div>
  );
}

// ── Ile (structure regatta + photo de region en entete) ────────────────────────
export function IslandCard({ island, regionName, regionPhoto }) {
  const [open, setOpen] = useState(false);
  const hasRacing = island.racing && island.racing !== '—';
  const regionHref = REGION_LINKS[regionName];

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
        <span className={TAG}>Riding</span>
        {hasRacing && <span className={TAG}>Racing</span>}
      </div>

      {regionHref && (
        <div className="px-5 pb-4">
          <Link href={regionHref} className={REGION_BTN}>
            Explore {regionName}
          </Link>
        </div>
      )}

      <button onClick={() => setOpen((v) => !v)} className={READ_MORE}>
        {open ? 'Show less' : 'Read more'}
      </button>

      {open && (
        <div className={PANEL}>
          <PanelCard label="Riding">{island.riding}</PanelCard>
          {hasRacing && <PanelCard label="Racing">{island.racing}</PanelCard>}
        </div>
      )}
    </div>
  );
}
