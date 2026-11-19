'use client';

// ══ The Arctic — « Destinations by Region » (client 2026-11-17) ══
// Grille sobre : seules les regions et leurs destinations. Regles client :
//  - « Northwest Passage » = traversees (pastilles « route »), pas des escales ;
//  - « Russian Arctic — Special Enquiry » : les pastilles ouvrent un formulaire de
//    demande d'etude (pas de reservation, pas de promesse de disponibilite) ;
//  - statut d'acces affiche sur la fiche destination (modale), jamais presente
//    comme une garantie d'accostage ou de debarquement.
// Coordonnees : positions approximatives de chaque lieu.

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Route } from 'lucide-react';
import { IslandMapModal, CloudSection, RevealBlock } from '../caribbean-v15/CaribbeanV15Base';
import FeasibilityEnquiryModal from '../_shared/FeasibilityEnquiryModal';

const YACHT = 'Yacht Access';
const EXPEDITION = 'Expedition Yacht Access';
const SPECIAL = 'Special Permissions Required';

// Structure client 2026-11-19 : 14 cases, dans l'ordre et avec les libelles du client.
const REGIONS = [
  { name: 'Greenland', access: EXPEDITION, places: [['West Greenland — Disko Bay & Ilulissat', 69.22, -51.1], ['East Greenland — Scoresby Sund', 70.5, -24.0], ['Northwest Greenland', 77.47, -69.23]] },
  { name: 'Svalbard', access: EXPEDITION, places: [['Longyearbyen', 78.22, 15.65], ['Spitsbergen', 78.7, 16.0], ['Svalbard Archipelago', 79.0, 20.0]] },
  { name: 'Northern Norway', access: YACHT, places: [['Tromsø', 69.65, 18.96], ['Northern Norway Fjords', 69.8, 20.4], ['Norwegian Arctic Coast', 70.98, 25.97]] },
  { name: 'Canadian Arctic', access: EXPEDITION, places: [['Baffin Island', 69.0, -72.0], ['Pond Inlet', 72.7, -77.96], ['Baffin Bay', 73.0, -66.0], ['Devon Island', 75.1, -87.8], ['Dundas Harbour', 74.53, -82.4], ['Beechey Island', 74.72, -91.85], ['Resolute', 74.7, -94.83], ['Cambridge Bay', 69.12, -105.06], ['Amundsen Gulf', 70.5, -124.0]] },
  { name: 'Northwest Passage', access: EXPEDITION, route: true, places: [['Eastern Northwest Passage', 74.3, -85.0], ['Pond Inlet – Cambridge Bay', 72.0, -92.0], ['Full Northwest Passage', 72.0, -100.0]] },
  { name: 'Arctic Alaska', access: EXPEDITION, places: [['Nome — Gateway', 64.5, -165.41], ['Bering Strait', 65.8, -168.9], ['Chukchi Sea', 69.0, -170.0], ['Alaska North Coast', 71.29, -156.79], ['Beaufort Sea', 71.5, -145.0]] },
  { name: 'Iceland', access: YACHT, places: [['Reykjavík', 64.15, -21.94], ['Westfjords', 65.9, -22.5], ['North Iceland', 65.68, -18.09], ['Snæfellsnes', 64.87, -23.5], ['Iceland Circumnavigation', 64.96, -19.02]] },
  { name: 'Jan Mayen', access: SPECIAL, places: [['Jan Mayen Island', 71.0, -8.5]] },
  { name: 'North Atlantic Extensions', access: YACHT, places: [['Faroe Islands', 62.0, -6.79], ['Shetland Islands', 60.3, -1.3], ['Labrador & Torngat Mountains', 59.0, -63.8]] },
  { name: 'Russian Arctic — Special Enquiry', access: SPECIAL, enquiry: true, places: [['Franz Josef Land', 80.6, 54.0], ['Bell Island', 80.03, 49.0], ['Cape Flora', 79.95, 50.08], ['Hall Island & Cape Tegetthoff', 80.07, 58.0], ['Northeast Passage', 76.0, 100.0]] },
  { name: 'Alaska — Yacht Charter Confirmed', access: YACHT, places: [['Juneau', 58.3, -134.42], ['Glacier Bay', 58.67, -136.9], ['Tracy Arm', 57.85, -133.55], ['Endicott Arm', 57.6, -133.3], ['Inside Passage', 56.5, -133.5], ['Admiralty Island', 57.7, -134.3], ['Frederick Sound', 57.1, -133.5], ['Icy Strait', 58.25, -135.5], ['Sitka', 57.05, -135.33], ['Petersburg', 56.81, -132.96], ['Ketchikan', 55.34, -131.64], ['Prince William Sound', 60.7, -147.0], ['Kenai Peninsula', 60.0, -151.0], ['Misty Fjords', 55.6, -130.6]] },
  { name: 'Canada — Yacht Charter Confirmed', access: YACHT, places: [['British Columbia’s Inside Passage', 51.5, -127.8], ['Desolation Sound', 50.1, -124.75], ['Great Bear Rainforest', 52.5, -128.0], ['Haida Gwaii', 53.25, -132.1], ['Vancouver Island', 49.65, -125.45], ['Gulf Islands', 48.8, -123.4], ['Broughton Archipelago', 50.75, -126.6], ['Johnstone Strait', 50.45, -126.0], ['Princess Louisa Inlet', 50.17, -123.85], ['Clayoquot Sound', 49.2, -125.95], ['Barkley Sound', 48.9, -125.3], ['Queen Charlotte Strait', 50.85, -127.3], ['Discovery Islands', 50.2, -125.2]] },
  { name: 'Arctic Canada — Expedition Only', access: EXPEDITION, places: [['Northwest Passage, Canada', 74.3, -95.0], ['Baffin Island, Nunavut', 69.0, -72.0], ['Iqaluit', 63.75, -68.52], ['Pond Inlet', 72.7, -77.96], ['Clyde River', 70.47, -68.59], ['Resolute', 74.7, -94.83], ['Cambridge Bay', 69.12, -105.06], ['Sirmilik National Park', 72.9, -79.5], ['Torngat Mountains National Park', 59.0, -63.8], ['Hudson Bay', 60.0, -85.0], ['Churchill', 58.77, -94.17], ['Nunavik', 58.5, -72.0], ['Labrador Coast', 56.5, -61.5]] },
  { name: 'Pacific Northwest–Alaska Corridor', access: YACHT, route: true, note: 'Sheltered fjords, glaciers, wildlife and remote anchorages.',
    places: [['British Columbia’s Inside Passage to Southeast Alaska', 54.3, -130.4], ['Vancouver–Juneau–Ketchikan route', 55.34, -131.64]] },
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
        <div className="pb-5 flex flex-wrap justify-center gap-2 px-1">
          {region.places.map(([name, lat, lng]) => (
            <button key={name} type="button"
              onClick={() => onSelect({ name, coords: [lat, lng], region })}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#C0C0C0]/40 bg-[#26272a] text-[#acb0cd] text-xs transition-colors hover:border-[#c2622a] hover:text-[#c2622a] cursor-pointer">
              <span className="text-[#c2622a] text-[8px]">›</span>
              {name}
              {region.route
                ? <Route className="w-3 h-3 text-[#c2622a]/70" />
                : <MapPin className="w-3 h-3 text-[#c2622a]/70" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Statut d'acces sous la carte : jamais une garantie d'accostage / de debarquement.
function AccessStatus({ region }) {
  return (
    <div className="px-5 py-4 border-t border-white/10 text-center">
      <span className="inline-block rounded-full border border-[#c2622a]/60 px-4 py-1.5 text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#c2622a]">
        {region.access}
      </span>
      {region.note && <p className="mt-3 text-[12px] leading-relaxed text-[#acb0cd]/80">{region.note}</p>}
      <p className="mt-3 text-[11px] leading-relaxed text-[#acb0cd]/60">
        {region.route ? 'Passage route. ' : ''}Access status is indicative only and does not guarantee berthing or landing.
        All itineraries remain subject to permits, ice, weather and local regulations.
      </p>
    </div>
  );
}

export default function ArcticRegions() {
  const [active, setActive] = useState(null);
  const [enquiry, setEnquiry] = useState(null);
  const select = (p) => (p.region.enquiry ? setEnquiry(p) : setActive(p));
  return (
    <>
      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 2.8s ease, transform 2.8s ease; }
        .reveal-up.revealed { opacity: 1; transform: translateY(0); }
      `}</style>
      <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <RevealBlock label="The Arctic" title="Destinations by Region" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6 items-start">
            {REGIONS.slice(0, 12).map((r) => <RegionGroup key={r.name} region={r} onSelect={select} />)}
          </div>
          <div className="mt-6 flex flex-wrap justify-center items-start gap-x-12 gap-y-6">
            {REGIONS.slice(12).map((r) => (
              <div key={r.name} className="w-full md:w-[calc((100%-6rem)/3)]">
                <RegionGroup region={r} onSelect={select} />
              </div>
            ))}
          </div>
        </div>
      </CloudSection>
      <IslandMapModal island={active} onClose={() => setActive(null)}>
        {active && <AccessStatus region={active.region} />}
      </IslandMapModal>
      <FeasibilityEnquiryModal place={enquiry} onClose={() => setEnquiry(null)}
        subject="Russian Arctic — Special Enquiry (feasibility study request)"
        badge={SPECIAL}
        intro="Feasibility study request. This is not a booking and does not confirm availability. Our team will review permits and conditions and come back to you." />
    </>
  );
}
