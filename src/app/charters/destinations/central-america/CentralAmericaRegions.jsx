'use client';

// ══ Central America — « Destinations by Region » (client 2026-11-17) ══
// Meme rendu que la grille Arctic : seules les regions et leurs destinations.
// Un clic ouvre la fiche destination (carte) avec, quand le client l'a demande,
// une precision (Corcovado, Rio Dulce, Panama Pacific...) et un bouton de demande
// (Honduras, Nicaragua, El Salvador : demande sur mesure / de disponibilite).
// « Brazil — Special Expeditions » : separe, formulaire de demande d'etude.
// Nicaragua : programmes Pacific et Caribbean separes.
// Coordonnees : positions approximatives de chaque lieu.

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { IslandMapModal, CloudSection, RevealBlock } from '../caribbean-v15/CaribbeanV15Base';
import FeasibilityEnquiryModal from '../_shared/FeasibilityEnquiryModal';

const BESPOKE = { label: 'Request a Bespoke Charter', href: '/contact' };
const AVAILABILITY = { label: 'Request Availability', href: '/contact' };

const REGIONS = [
  { name: 'Belize', note: 'Itineraries are planned around reefs, protected areas and the yacht’s navigation capabilities.',
    places: [['Belize City', 17.5, -88.19], ['Ambergris Caye', 17.92, -87.96], ['Caye Caulker', 17.74, -88.03], ['Turneffe Atoll', 17.35, -87.85], ['Lighthouse Reef', 17.3, -87.53], ['Great Blue Hole', 17.316, -87.535]] },
  { name: 'Costa Rica — North Pacific',
    places: [['Gulf of Papagayo', 10.6, -85.8], ['Papagayo Peninsula', 10.63, -85.67], ['Playa Hermosa', 10.57, -85.68], ['Playas del Coco', 10.55, -85.7], ['Catalina Islands', 10.48, -85.88], ['Playa Conchal', 10.4, -85.81], ['Tamarindo', 10.3, -85.84]] },
  { name: 'Costa Rica — Central & South Pacific',
    places: [['Bahía Herradura', 9.65, -84.66], ['Osa Peninsula', 8.55, -83.5], ['Drake Bay', 8.69, -83.67],
      ['Corcovado Coast', 8.54, -83.59, 'Access stop for a protected area, not a marina. Landings are regulated and subject to park permits.'],
      ['Golfo Dulce', 8.55, -83.25], ['Puerto Jiménez', 8.53, -83.3]] },
  { name: 'Panama — Caribbean',
    places: [['Guna Yala / San Blas Islands', 9.55, -78.9], ['Bocas del Toro', 9.34, -82.24]] },
  { name: 'Panama — Pacific', note: 'These destinations form several distinct itineraries and cannot always be combined in a single short charter.',
    places: [['Panama City', 8.98, -79.52], ['Taboga Island', 8.79, -79.55], ['Pearl Islands', 8.4, -79.0], ['Contadora Island', 8.62, -79.03], ['Saboga Island', 8.62, -79.06], ['Chapera Island', 8.59, -79.03], ['Isla del Rey', 8.37, -78.92], ['Coiba National Park', 7.45, -81.77], ['Gulf of Chiriquí', 8.0, -82.2], ['Islas Secas', 7.95, -82.02], ['Parida Islands', 8.13, -82.32]] },
  { name: 'Honduras', note: 'Bespoke request, subject to yacht presence, formalities and local conditions.', cta: BESPOKE,
    places: [['Bay Islands', 16.35, -86.4], ['Roatán', 16.33, -86.53], ['Utila', 16.1, -86.93]] },
  { name: 'Guatemala',
    places: [['Río Dulce', 15.66, -88.99, 'Not accessible to all superyachts. Draft and size constraints are verified before any proposal.'], ['Caribbean Coast', 15.73, -88.6]] },
  { name: 'Nicaragua', note: 'Pacific and Caribbean programs are planned separately. Availability on request.', cta: AVAILABILITY,
    subs: [['Pacific', [['San Juan del Sur', 11.25, -85.87], ['Pacific Coast', 11.9, -86.6]]], ['Caribbean', [['Corn Islands', 12.17, -83.06]]]] },
  { name: 'El Salvador', note: 'Bespoke charter on request. Yacht availability is not permanent.', cta: BESPOKE,
    places: [['Pacific Coast', 13.49, -89.38]] },
  { name: 'Brazil — Costa Verde',
    places: [['Angra dos Reis', -23.0, -44.32], ['Ilha Grande', -23.15, -44.23], ['Paraty', -23.22, -44.71], ['Paraty Bay', -23.15, -44.63]] },
  { name: 'Brazil — Rio de Janeiro Coast', note: 'Day trips around Rio differ from coastal cruises, which require more time.',
    places: [['Rio de Janeiro', -22.91, -43.17], ['Guanabara Bay', -22.8, -43.15], ['Niterói', -22.88, -43.1], ['Búzios', -22.75, -41.88], ['Cabo Frio', -22.88, -42.02]] },
  { name: 'Brazil — São Paulo Coast', note: 'Availability depends on local operators and yacht repositioning.',
    places: [['Ilhabela', -23.78, -45.36], ['Santos', -23.96, -46.33]] },
  { name: 'Brazil — Bahia',
    places: [['Salvador', -12.97, -38.5, 'Gateway to Todos os Santos Bay itineraries.'], ['Todos os Santos Bay', -12.85, -38.65], ['Itaparica Island', -12.9, -38.68], ['Ilha dos Frades', -12.8, -38.63], ['Recôncavo Baiano', -12.67, -38.9]] },
];

const SPECIAL = { name: 'Brazil — Special Expeditions', enquiry: true,
  places: [['Abrolhos Archipelago', -17.96, -38.7], ['Fernando de Noronha', -3.85, -32.42]] };

function Pills({ places, region, onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-1">
      {places.map(([name, lat, lng, note]) => (
        <button key={name} type="button"
          onClick={() => onSelect({ name, coords: [lat, lng], region, note })}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#C0C0C0]/40 bg-[#26272a] text-[#acb0cd] text-xs transition-colors hover:border-[#c2622a] hover:text-[#c2622a] cursor-pointer">
          <span className="text-[#c2622a] text-[8px]">›</span>
          {name}
          <MapPin className="w-3 h-3 text-[#c2622a]/70" />
        </button>
      ))}
    </div>
  );
}

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
          {region.subs
            ? region.subs.map(([sub, places]) => (
              <div key={sub}>
                <p className="text-center text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#c2622a]/80 mb-2">{sub}</p>
                <Pills places={places} region={region} onSelect={onSelect} />
              </div>
            ))
            : <Pills places={region.places} region={region} onSelect={onSelect} />}
        </div>
      )}
    </div>
  );
}

// Precision + bouton de demande sous la carte (pas de reservation immediate).
function DestinationInfo({ place }) {
  const { region, note } = place;
  const text = [note, region.note].filter(Boolean);
  if (!text.length && !region.cta) return null;
  return (
    <div className="px-5 py-4 border-t border-white/10 text-center">
      {text.map((t) => <p key={t} className="text-[12px] leading-relaxed text-[#acb0cd]/70">{t}</p>)}
      {region.cta && (
        <Link href={region.cta.href}
          className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#C0C0C0] bg-[#26272a] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c2622a] transition-colors hover:border-[#c2622a]">
          {region.cta.label}
        </Link>
      )}
    </div>
  );
}

export default function CentralAmericaRegions() {
  const [active, setActive] = useState(null);
  const [enquiry, setEnquiry] = useState(null);
  const select = (p) => (p.region.enquiry ? setEnquiry(p) : setActive(p));
  return (
    <>
      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 2.8s ease, transform 2.8s ease; }
        .reveal-up.revealed { opacity: 1; transform: translateY(0); }
      `}</style>
      <CloudSection className="bg-[#26272a] pt-28 pb-12 md:pt-32 md:pb-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <RevealBlock label="Central America" title="Destinations by Region" />
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
          {/* Expeditions a acces reglemente : separees des charters cotiers (client). */}
          <div className="mt-14 pt-10 border-t border-white/10 flex justify-center">
            <div className="w-full md:w-[calc((100%-6rem)/3)]">
              <RegionGroup region={SPECIAL} onSelect={select} />
            </div>
          </div>
        </div>
      </CloudSection>
      <IslandMapModal island={active} onClose={() => setActive(null)}>
        {active && <DestinationInfo place={active} />}
      </IslandMapModal>
      <FeasibilityEnquiryModal place={enquiry} onClose={() => setEnquiry(null)}
        subject="Brazil — Special Expeditions (feasibility study request)"
        badge="Regulated Access"
        intro="Feasibility study request. Regulated access and the required open-sea crossings mean these destinations are not simple extensions of a coastal charter. This is not a booking and does not confirm availability." />
    </>
  );
}
