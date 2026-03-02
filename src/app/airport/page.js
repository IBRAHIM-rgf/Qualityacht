'use client';

import Image from 'next/image';
import { useState } from 'react';

// ── Données Caribbean ──────────────────────────────────────────────────────────
const caribbeanGroups = [
  { island: 'Cuba', airports: ['José Martí International Airport (HAV)', 'Juan Gualberto Gómez Airport (VRA)', 'Cayo Largo Airport (CYL)'] },
  { island: 'Dominican Republic', airports: ['Punta Cana International Airport (PUJ)', 'Las Américas International Airport (SDQ)', 'La Romana International Airport (LRM)'] },
  { island: 'Haiti', airports: ['Toussaint Louverture International Airport (PAP)', 'Cap-Haïtien International Airport (CAP)'] },
  { island: 'Jamaica', airports: ['Sangster International Airport (MBJ)', 'Norman Manley International Airport (KIN)', 'Ian Fleming International Airport (OCJ)'] },
  { island: 'Puerto Rico', airports: ['Luis Muñoz Marín International Airport (SJU)', 'Fernando Luis Ribas Dominicci Airport (SIG)', 'Mercedita Airport (PSE)'] },
  { island: 'Anguilla', airports: ['Clayton J. Lloyd International Airport (AXA)'] },
  { island: 'Antigua & Barbuda', airports: ['V.C. Bird International Airport (ANU)', 'Barbuda Codrington Airport (BBQ)'] },
  { island: 'Saint-Martin / Sint Maarten', airports: ['Princess Juliana International Airport (SXM)'] },
  { island: 'Saint-Barthélemy', airports: ['Gustavia Airport (SBH)'] },
  { island: 'Saba', airports: ['Juancho E. Yrausquin Airport (SAB)'] },
  { island: 'Saint-Eustache', airports: ['F.D. Roosevelt Airport (EUX)'] },
  { island: 'Saint-Kitts & Nevis', airports: ['Robert L. Bradshaw International Airport (SKB)', 'Vance W. Amory International Airport (NEV)'] },
  { island: 'Montserrat', airports: ['John A. Osborne Airport (MNI)'] },
  { island: 'Guadeloupe', airports: ['Pointe-à-Pitre International Airport (PTP)'] },
  { island: 'Aruba', airports: ['Queen Beatrix International Airport (AUA)'] },
  { island: 'Bonaire', airports: ['Flamingo International Airport (BON)'] },
  { island: 'Curaçao', airports: ['Curaçao International Airport (CUR)'] },
  { island: 'Dominica', airports: ['Douglas-Charles Airport (DOM)', 'Canefield Airport (DCF)'] },
  { island: 'Martinique', airports: ['Martinique Aimé Césaire International Airport (FDF)'] },
  { island: 'Saint Lucia', airports: ['Hewanorra International Airport (UVF)', 'George F. L. Charles Airport (SLU)'] },
  { island: 'Saint Vincent & the Grenadines', airports: ['Argyle International Airport (SVD)', 'Mustique Airport (MQS)', 'Canouan Airport (CIW)'] },
  { island: 'Grenada', airports: ['Maurice Bishop International Airport (GND)', 'Lauriston Airport (CRU) — Carriacou'] },
  { island: 'Barbados', airports: ['Grantley Adams International Airport (BGI)'] },
  { island: 'Turks & Caicos', airports: ['Providenciales International Airport (PLS)', 'Grand Turk International Airport (GDT)'] },
  { island: 'Trinidad & Tobago', airports: ['Piarco International Airport (POS)', 'A.N.R. Robinson International Airport (TAB)'] },
];

const soon = [{ island: 'Coming Soon', airports: ['Airport information coming soon'] }];

// ── Données destinations ───────────────────────────────────────────────────────
const regions = [
  { name: 'Caribbean',              image: '/images/destinations/animals/caraibes.jpg',               groups: caribbeanGroups },
  { name: 'Arctic',                 image: '/images/destinations/animals/Arctic.png',                  groups: soon },
  { name: 'Bahamas',                image: '/images/destinations/animals/Bahamas.jpg',                 groups: soon },
  { name: 'Central America',        image: '/images/destinations/animals/Central-America.jpg',         groups: soon },
  { name: 'East Asia',              image: '/images/destinations/animals/EAST-ASIA.jpg',               groups: soon },
  { name: 'Eastern Mediterranean',  image: '/images/destinations/animals/Eastern-Mediterranean.jpg',   groups: soon },
  { name: 'Indian Ocean',           image: '/images/destinations/animals/Indian-Ocean.jpg',            groups: soon },
  { name: 'Indonesia',              image: '/images/destinations/animals/Indonesia.jpg',               groups: soon },
  { name: 'North America',          image: '/images/destinations/animals/Nord-America.jpg',            groups: soon },
  { name: 'Pacific Ocean',          image: '/images/destinations/animals/Ocean-Pacific.jpeg',          groups: soon },
  { name: 'Oman Gulf',              image: '/images/destinations/animals/Oman-Gulf.jpeg',              groups: soon },
  { name: 'South East Asia',        image: '/images/destinations/animals/SOUTH-EAST-ASIA.jpeg',        groups: soon },
  { name: 'Western Mediterranean',  image: '/images/destinations/animals/Western-Mediterranean.webp',  groups: soon },
  { name: 'Africa',                 image: '/images/destinations/animals/africa.jpeg',                 groups: soon },
  { name: 'Northern Europe',        image: '/images/destinations/animals/articbynortherneurope.jpg',   groups: soon },
  { name: 'Oceania',                image: '/images/destinations/animals/oceania.jpeg',                groups: soon },
];

// ── Card ───────────────────────────────────────────────────────────────────────
function RegionCard({ region, onClick }) {
  return (
    <div
      onClick={() => onClick(region)}
      className="min-w-0 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform cursor-pointer"
    >
      <div className="w-full relative mb-6 overflow-hidden h-48 rounded-xl">
        <Image src={region.image} alt={region.name} fill className="object-cover rounded-xl" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <h2 className="text-lg font-semibold text-[#acb0cd] mb-2 trajan-regular uppercase text-center break-words leading-tight w-full hyphens-auto hover:text-[#c2622a] transition-colors duration-300">
        {region.name}
      </h2>
    </div>
  );
}

// ── Modal ──────────────────────────────────────────────────────────────────────
function AirportModal({ region, onClose }) {
  if (!region) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: 'rgba(38,39,42,0.92)' }} onClick={onClose}>
      <style>{`
        .modal-scroll::-webkit-scrollbar { width: 4px; }
        .modal-scroll::-webkit-scrollbar-track { background: transparent; }
        .modal-scroll::-webkit-scrollbar-thumb { background: #c2622a; border-radius: 2px; }
        .modal-scroll { scrollbar-width: thin; scrollbar-color: #c2622a transparent; }
      `}</style>
      <div
        className="modal-scroll relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-2xl border border-white/10 px-6 py-8 md:px-10 md:py-10"
        style={{ backgroundColor: '#2e2f32', backgroundImage: 'url(/images/nuagesAncien.png)', backgroundSize: 'contain' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-5 text-[#acb0cd]/50 hover:text-[#c2622a] text-2xl transition-colors duration-200 cursor-pointer">×</button>
        <p className="text-[10px] uppercase tracking-[0.3em] mb-1" style={{ color: '#C0C0C0' }}>Airports</p>
        <h2 className="trajan-regular text-xl md:text-2xl text-[#acb0cd] uppercase tracking-[0.1em] mb-1">{region.name}</h2>
        <div className="w-8 h-px mb-6" style={{ backgroundColor: '#c2622a' }} />
        <div className="space-y-6">
          {region.groups.map((group, i) => (
            <div key={i}>
              <p className="text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: '#c2622a' }}>{group.island}</p>
              <ul className="space-y-1.5">
                {group.airports.map((airport, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-[#acb0cd]/80">
                    <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: '#c2622a' }} />
                    {airport}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function AirportPage() {
  const [selectedRegion, setSelectedRegion] = useState(null);

  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-hidden">

      {/* ══ HERO ══ */}
      <div className="relative h-[60vh] md:h-[75vh]">
        <Image src="/images/airport/airport_hero.jpeg" alt="Airport" fill priority className="object-contain object-center" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #26272a 0%, rgba(38,39,42,0.5) 20%, transparent 38%, transparent 52%, rgba(38,39,42,0.5) 78%, #26272a 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-10 md:pb-16 z-10 px-4">
          <h1 className="trajan-regular text-3xl md:text-6xl lg:text-7xl uppercase tracking-[0.1em] md:tracking-[0.15em] text-[#acb0cd] text-center">
            Airports
          </h1>
          <p className="text-[#acb0cd]/70 text-xs md:text-sm uppercase tracking-[0.25em] font-light text-center mt-3">
            Gateway to Every Destination
          </p>
        </div>
      </div>

      {/* ══ GRILLE ══ */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat py-24 px-4"
        style={{ backgroundImage: "url('/images/services-bg.png')" }}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white trajan-regular mb-4 text-center uppercase tracking-wide">Airports</h2>
        <Image src="/images/title-line.png" alt="" width={200} height={10} className="mx-auto mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
          {regions.map((region, i) => (
            <RegionCard key={i} region={region} onClick={setSelectedRegion} />
          ))}
        </div>
      </section>

      <AirportModal region={selectedRegion} onClose={() => setSelectedRegion(null)} />
    </div>
  );
}
