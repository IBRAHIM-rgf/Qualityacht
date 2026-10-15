'use client';

// ══ The Antarctica — « Destinations by Region » (client 2026-10-15) ══
// Donnees : fichier client « patagonia-antarctica-destinations-table.html » (5 regions,
// sous-groupes et sous-destinations). Rendu identique a North America / Bahamas (style du
// site, choix du client) : accordeon par region, sous-groupes, pastilles ; un clic
// sur une pastille ouvre la carte (meme modale que Bahamas / Caraibes).
// Coordonnees : positions approximatives de chaque lieu.

import { useState } from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { IslandMapModal, CloudSection, RevealBlock } from '../caribbean-v15/CaribbeanV15Base';

const REGIONS = [
  { name: 'Argentina', subs: [
    ['Patagonia', [['Ushuaia', -54.8, -68.3], ['Beagle Channel', -54.87, -68.0], ['Tierra del Fuego', -54.5, -67.5]]],
  ] },
  { name: 'Chile', subs: [
    ['Patagonia', [['Puerto Williams', -54.93, -67.61], ['Punta Arenas', -53.16, -70.91], ['Chilean Fjords', -50.5, -74.5], ['Cape Horn / Cabo de Hornos', -55.98, -67.27]]],
  ] },
  { name: 'Antarctica', subs: [
    ['South Shetland Islands', [['King George Island', -62.03, -58.35], ['King George Bay', -62.1, -58.1], ['Admiralty Bay', -62.15, -58.45], ['Yankee Harbour', -62.53, -59.78], ['Port Foster', -62.95, -60.65], ['Whalers Bay', -62.98, -60.56], ['Half Moon Island', -62.6, -59.9], ['Hannah Point', -62.65, -60.61]]],
    ['Antarctic Peninsula', [['Antarctic Sound', -63.4, -56.9], ['Brown Bluff', -63.53, -56.92], ['Hope Bay', -63.4, -57.0], ['Gerlache Strait', -64.5, -62.33], ['Cierva Cove', -64.15, -60.95], ['Paradise Bay', -64.85, -62.9], ['Neko Harbour', -64.84, -62.53], ['Port Lockroy', -64.83, -63.5], ['Dorian Bay / Damoy Point', -64.82, -63.53], ['Errera Channel', -64.7, -62.6], ['Cuverville Island', -64.68, -62.63], ['Wilhelmina Bay', -64.65, -62.1], ['Lemaire Channel', -65.1, -63.97], ['Port Charcot', -65.07, -64.02], ['Petermann Island', -65.17, -64.17]]],
    ['Weddell Sea', [['Paulet Island', -63.58, -55.78], ['Snow Hill Island', -64.47, -57.2]]],
    ['Southern Antarctic Peninsula', [['Marguerite Bay', -68.5, -68.0], ['Detaille Island', -66.87, -66.79]]],
  ] },
  { name: 'Falkland Islands', subs: [
    ['Falkland Islands', [['Port Stanley', -51.69, -57.86]]],
  ] },
  { name: 'South Georgia & the South Sandwich Islands', subs: [
    ['South Georgia', [['Grytviken', -54.28, -36.51], ['St Andrews Bay', -54.43, -36.18], ['Gold Harbour', -54.62, -35.93], ['Cooper Bay', -54.78, -35.8]]],
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

export default function AntarcticaRegions() {
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
          {/* 3 puis les 2 derniers centres en paire (comme Bahamas). */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6 items-start">
            {REGIONS.slice(0, 3).map((r) => <RegionGroup key={r.name} region={r} onSelect={setActive} />)}
          </div>
          <div className="mt-6 flex flex-wrap justify-center items-start gap-x-12 gap-y-6">
            {REGIONS.slice(3).map((r) => (
              <div key={r.name} className="w-full md:w-[calc((100%-6rem)/3)]">
                <RegionGroup region={r} onSelect={setActive} />
              </div>
            ))}
          </div>
        </div>
      </CloudSection>
      <IslandMapModal island={active} onClose={() => setActive(null)} />
    </>
  );
}
