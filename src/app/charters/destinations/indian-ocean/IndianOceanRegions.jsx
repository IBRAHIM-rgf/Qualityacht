'use client';

// ══ Indian Ocean — « Destinations by Region » (client 2026-11-09) ══
// Donnees : tableau client « indian_ocean_yacht_charter_destinations » (7 regions, sans
// Arabian Sea / Gulf of Oman). Rendu identique a North America : accordeon par region,
// sous-groupes, pastilles ; un clic sur une pastille ouvre la carte.
// Coordonnees : positions approximatives de chaque lieu.

import { useState } from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { IslandMapModal, CloudSection, RevealBlock } from '../caribbean-v15/CaribbeanV15Base';

const REGIONS = [
  { name: 'Maldives', subs: [
    ['Atolls', [['North Malé Atoll', 4.4, 73.5], ['South Malé Atoll', 3.95, 73.45], ['North Ari Atoll', 4.2, 72.9], ['South Ari Atoll', 3.65, 72.85], ['Baa Atoll', 5.15, 73.0], ['Vaavu Atoll', 3.45, 73.5], ['Dhaalu Atoll', 2.85, 72.95], ['Thaa Atoll', 2.35, 73.1], ['Laamu Atoll', 1.9, 73.45], ['Addu Atoll', -0.63, 73.15]]],
  ] },
  { name: 'Seychelles', subs: [
    ['Inner Islands', [['Mahé', -4.68, 55.48], ['Praslin', -4.33, 55.73], ['La Digue', -4.36, 55.84], ['Silhouette', -4.48, 55.24], ['Curieuse', -4.28, 55.73], ['Sainte Anne Marine Park', -4.6, 55.5]]],
    ['Outer Islands', [['Amirantes', -5.35, 53.35], ['Alphonse Group', -7.01, 52.73], ['Farquhar Group', -10.13, 51.15], ['Cosmoledo', -9.72, 47.58], ['Astove', -10.06, 47.74], ['Aldabra', -9.42, 46.35]]],
  ] },
  { name: 'Mascarene Islands', subs: [
    ['Mauritius', [['North Coast', -20.0, 57.58], ['West Coast / Le Morne', -20.45, 57.32], ['East Coast / Île aux Cerfs', -20.27, 57.8], ['Rodrigues', -19.72, 63.42]]],
    ['Réunion', [['Réunion', -21.11, 55.53]]],
    ['Mayotte', [['Mayotte', -12.83, 45.14]]],
  ] },
  { name: 'Madagascar', subs: [
    ['Madagascar', [['Nosy Be', -13.33, 48.26], ['Mitsio Archipelago', -12.88, 48.57], ['Radama Islands', -14.0, 47.75], ['Nosy Iranja', -13.6, 47.82], ['Diego-Suarez / Antsiranana Bay', -12.28, 49.29], ['Sainte-Marie Island', -16.9, 49.9], ['Southwest Coast', -23.35, 43.67]]],
  ] },
  { name: 'Mozambique', subs: [
    ['Mozambique', [['Bazaruto Archipelago', -21.65, 35.47], ['Quirimbas Archipelago', -12.37, 40.6], ['Inhambane Coast', -23.86, 35.38], ['Pemba Coast', -12.97, 40.52]]],
  ] },
  { name: 'Tanzania / East Africa', subs: [
    ['Tanzania', [['Zanzibar Archipelago', -6.16, 39.2], ['Pemba Island', -5.1, 39.78], ['Mafia Island', -7.85, 39.75], ['Mainland Tanzanian Coast', -6.82, 39.29]]],
  ] },
  { name: 'Sri Lanka', subs: [
    ['Southwest Coast', [['Colombo', 6.93, 79.85], ['Galle', 6.03, 80.22], ['Mirissa', 5.95, 80.46]]],
    ['East Coast', [['Trincomalee', 8.57, 81.23], ['Pasikuda', 7.93, 81.56]]],
    ['North Coast', [['Jaffna Region', 9.66, 80.02]]],
  ] },
];

function RegionGroup({ region, onSelect }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-white/10">
      <button onClick={() => setOpen((o) => !o)}
        className="w-full flex flex-col items-center py-4 text-left group cursor-pointer">
        <span className="trajan-regular text-[#acb0cd] text-xs md:text-sm uppercase tracking-[0.2em] group-hover:text-[#c2622a] transition-colors duration-300 text-center w-full">
          {region.name}
        </span>
        <div className="relative w-24 h-6 my-1">
          <Image src="/images/title-line.png" alt="" fill className="object-contain" />
        </div>
        <span className={`text-[#c2622a] transition-transform duration-300 text-2xl leading-none ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="pb-5 space-y-4">
          {region.subs.map(([sub, places]) => (
            <div key={sub}>
              <p className="text-center text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#c2622a]/80 mb-2">{sub}</p>
              <div className="flex flex-wrap justify-center gap-2 px-1">
                {places.map(([name, lat, lng]) => (
                  <button key={name} type="button"
                    onClick={() => onSelect({ name, coords: [lat, lng] })}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#C0C0C0]/40 bg-[#26272a] text-[#acb0cd] text-xs transition-colors hover:border-[#c2622a] hover:text-[#c2622a] cursor-pointer">
                    <span className="text-[#c2622a] text-[8px]">›</span>
                    {name}
                    <MapPin className="w-3 h-3 text-[#c2622a]/70" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function IndianOceanRegions() {
  const [active, setActive] = useState(null);
  return (
    <>
      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 2.8s ease, transform 2.8s ease; }
        .reveal-up.revealed { opacity: 1; transform: translateY(0); }
      `}</style>
      <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <RevealBlock label="Regions & Sub-Destinations" title="Destinations by Region" />
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-6 items-start">
            {REGIONS.map((r) => <RegionGroup key={r.name} region={r} onSelect={setActive} />)}
          </div>
        </div>
      </CloudSection>
      <IslandMapModal island={active} onClose={() => setActive(null)} />
    </>
  );
}
