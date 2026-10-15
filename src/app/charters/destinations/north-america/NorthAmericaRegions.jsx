'use client';

// ══ North America — « Destinations by Region » (client 2026-10-15) ══
// Donnees : fichier client « north-america-destinations-table.html » (3 regions,
// sous-groupes et sous-destinations). Rendu calque sur la page Bahamas (style du
// site, choix du client) : accordeon par region, sous-groupes, pastilles ; un clic
// sur une pastille ouvre la carte (meme modale que Bahamas / Caraibes).
// Coordonnees : positions approximatives de chaque lieu.

import { useState } from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { IslandMapModal, CloudSection, RevealBlock } from '../caribbean-v15/CaribbeanV15Base';

const REGIONS = [
  { name: 'East Coast United States', subs: [
    ['Carolinas', [['Charleston', 32.78, -79.93]]],
    ['Florida – East Coast', [['Miami', 25.77, -80.19], ['Fort Lauderdale', 26.12, -80.14], ['Palm Beach', 26.71, -80.04]]],
    ['Florida – West Coast', [['Tampa', 27.95, -82.46], ['Boca Grande', 26.75, -82.26], ['Sarasota', 27.34, -82.53], ['Naples', 26.14, -81.79]]],
    ['Florida Keys', [['Florida Keys', 24.9, -80.8], ['Key West', 24.56, -81.78], ['Marathon Key', 24.71, -81.09], ['Key Largo', 25.09, -80.44]]],
    ['Georgia', [['Savannah', 32.08, -81.09], ['The Golden Isles', 31.15, -81.39]]],
    ['Middle Atlantic', [['New York', 40.71, -74.0]]],
    ['New England', [['Maine', 44.3, -69.0], ['Massachusetts', 41.7, -70.3], ['Rhode Island', 41.49, -71.31]]],
  ] },
  { name: 'West Coast United States', subs: [
    ['California', [['Newport Beach', 33.62, -117.93], ['San Francisco', 37.77, -122.42]]],
    ['Pacific Northwest', [['Seattle', 47.61, -122.33]]],
  ] },
  { name: 'Canada', subs: [
    ['British Columbia', [['Victoria', 48.43, -123.37], ['Desolation Sound', 50.1, -124.75]]],
    ['Ontario', [['Toronto', 43.65, -79.38], ['Thousand Islands', 44.33, -75.92], ['Georgian Bay', 45.3, -80.6]]],
    ['Quebec', [['Quebec City', 46.81, -71.21], ['Montreal', 45.5, -73.57]]],
    ['Nova Scotia', [['Halifax', 44.65, -63.57], ['Cape Breton', 46.25, -60.75]]],
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

export default function NorthAmericaRegions() {
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6 items-start">
            {REGIONS.map((r) => <RegionGroup key={r.name} region={r} onSelect={setActive} />)}
          </div>
        </div>
      </CloudSection>
      <IslandMapModal island={active} onClose={() => setActive(null)} />
    </>
  );
}
