'use client';

import Image from 'next/image';
import { useState } from 'react';

// ── Données aéroports par destination ─────────────────────────────────────────
const regions = [
  {
    name: 'Caribbean',
    image: '/images/destinations/destnation-feature-caribbean.webp',
    groups: [
      {
        island: 'Cuba',
        airports: [
          'José Martí International Airport (HAV)',
          'Juan Gualberto Gómez Airport (VRA)',
          'Cayo Largo Airport (CYL)',
        ],
      },
      {
        island: 'Dominican Republic',
        airports: [
          'Punta Cana International Airport (PUJ)',
          'Las Américas International Airport (SDQ)',
          'La Romana International Airport (LRM)',
        ],
      },
      {
        island: 'Haiti',
        airports: [
          'Toussaint Louverture International Airport (PAP)',
          'Cap-Haïtien International Airport (CAP)',
        ],
      },
      {
        island: 'Jamaica',
        airports: [
          'Sangster International Airport (MBJ)',
          'Norman Manley International Airport (KIN)',
          'Ian Fleming International Airport (OCJ)',
        ],
      },
      {
        island: 'Puerto Rico',
        airports: [
          'Luis Muñoz Marín International Airport (SJU)',
          'Fernando Luis Ribas Dominicci Airport (SIG)',
          'Mercedita Airport (PSE)',
        ],
      },
      {
        island: 'Anguilla',
        airports: ['Clayton J. Lloyd International Airport (AXA)'],
      },
      {
        island: 'Antigua & Barbuda',
        airports: ['V.C. Bird International Airport (ANU)', 'Barbuda Codrington Airport (BBQ)'],
      },
      {
        island: 'Saint-Martin / Sint Maarten',
        airports: ['Princess Juliana International Airport (SXM)'],
      },
      {
        island: 'Saint-Barthélemy',
        airports: ['Gustavia Airport (SBH)'],
      },
      {
        island: 'Saba',
        airports: ['Juancho E. Yrausquin Airport (SAB)'],
      },
      {
        island: 'Saint-Eustache',
        airports: ['F.D. Roosevelt Airport (EUX)'],
      },
      {
        island: 'Saint-Kitts & Nevis',
        airports: ['Robert L. Bradshaw International Airport (SKB)', 'Vance W. Amory International Airport (NEV)'],
      },
      {
        island: 'Montserrat',
        airports: ['John A. Osborne Airport (MNI)'],
      },
      {
        island: 'Guadeloupe',
        airports: ['Pointe-à-Pitre International Airport (PTP)'],
      },
      {
        island: 'Aruba',
        airports: ['Queen Beatrix International Airport (AUA)'],
      },
      {
        island: 'Bonaire',
        airports: ['Flamingo International Airport (BON)'],
      },
      {
        island: 'Curaçao',
        airports: ['Curaçao International Airport (CUR)'],
      },
      {
        island: 'Dominica',
        airports: ['Douglas-Charles Airport (DOM)', 'Canefield Airport (DCF)'],
      },
      {
        island: 'Martinique',
        airports: ['Martinique Aimé Césaire International Airport (FDF)'],
      },
      {
        island: 'Saint Lucia',
        airports: ['Hewanorra International Airport (UVF)', 'George F. L. Charles Airport (SLU)'],
      },
      {
        island: 'Saint Vincent & the Grenadines',
        airports: ['Argyle International Airport (SVD)', 'Mustique Airport (MQS)', 'Canouan Airport (CIW)'],
      },
      {
        island: 'Grenada',
        airports: ['Maurice Bishop International Airport (GND)', 'Lauriston Airport (CRU) — Carriacou'],
      },
      {
        island: 'Barbados',
        airports: ['Grantley Adams International Airport (BGI)'],
      },
      {
        island: 'Turks & Caicos',
        airports: ['Providenciales International Airport (PLS)', 'Grand Turk International Airport (GDT)'],
      },
      {
        island: 'Trinidad & Tobago',
        airports: ['Piarco International Airport (POS)', 'A.N.R. Robinson International Airport (TAB)'],
      },
    ],
  },
  {
    name: 'East Mediterranean',
    image: '/images/destinations/destnation-feature-east-med.webp',
    groups: [
      { island: 'Coming Soon', airports: ['Airport information coming soon'] },
    ],
  },
  {
    name: 'Indian Ocean',
    image: '/images/destinations/destnation-feature-indian-ocean.webp',
    groups: [
      { island: 'Coming Soon', airports: ['Airport information coming soon'] },
    ],
  },
  {
    name: 'North America',
    image: '/images/destinations/destnation-feature-north-america.webp',
    groups: [
      { island: 'Coming Soon', airports: ['Airport information coming soon'] },
    ],
  },
  {
    name: 'South East Asia',
    image: '/images/destinations/destnation-feature-south-east-asia.webp',
    groups: [
      { island: 'Coming Soon', airports: ['Airport information coming soon'] },
    ],
  },
  {
    name: 'South Pacific',
    image: '/images/destinations/destnation-feature-south-pacific.webp',
    groups: [
      { island: 'Coming Soon', airports: ['Airport information coming soon'] },
    ],
  },
  {
    name: 'West Mediterranean',
    image: '/images/destinations/destnation-feature-west-med.webp',
    groups: [
      { island: 'Coming Soon', airports: ['Airport information coming soon'] },
    ],
  },
];

// ── Carte région ───────────────────────────────────────────────────────────────
function RegionCard({ region, onClick }) {
  const [lit, setLit] = useState(false);
  const timerRef = { current: null };

  function activate() { clearTimeout(timerRef.current); setLit(true); }
  function deactivate() { timerRef.current = setTimeout(() => setLit(false), 1500); }
  function handleClick(e) {
    e.preventDefault();
    activate();
    onClick(region);
  }

  return (
    <div
      onClick={handleClick}
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onTouchStart={activate}
      onTouchEnd={deactivate}
      className="relative overflow-hidden cursor-pointer h-[220px] md:h-[280px]"
    >
      <Image
        src={region.image}
        alt={region.name}
        fill
        className={`object-cover transition-all duration-700 ${lit ? 'brightness-90 grayscale-0 scale-105' : 'brightness-70 grayscale scale-100'}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-[#c2622a] transition-opacity duration-500 ${lit ? 'opacity-100' : 'opacity-0'}`} />
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5">
        <h3 className={`trajan-regular text-xs md:text-sm uppercase tracking-[0.15em] transition-colors duration-300 ${lit ? 'text-[#c2622a]' : 'text-[#acb0cd]'}`}>
          {region.name}
        </h3>
      </div>
    </div>
  );
}

// ── Modal aéroports ────────────────────────────────────────────────────────────
function AirportModal({ region, onClose }) {
  if (!region) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(38,39,42,0.92)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-2xl border border-white/10 px-6 py-8 md:px-10 md:py-10"
        style={{ backgroundColor: '#2e2f32', backgroundImage: 'url(/images/nuagesAncien.png)', backgroundSize: 'contain' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-[#acb0cd]/50 hover:text-[#c2622a] text-2xl transition-colors duration-200 cursor-pointer"
        >
          ×
        </button>

        {/* Titre */}
        <p className="text-[10px] uppercase tracking-[0.3em] mb-1" style={{ color: '#C0C0C0' }}>Airports</p>
        <h2 className="trajan-regular text-xl md:text-2xl text-[#acb0cd] uppercase tracking-[0.1em] mb-1">{region.name}</h2>
        <div className="w-8 h-px mb-6" style={{ backgroundColor: '#c2622a' }} />

        {/* Liste par île */}
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

// ── Page principale ────────────────────────────────────────────────────────────
export default function AirportPage() {
  const [selectedRegion, setSelectedRegion] = useState(null);

  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-hidden">

      {/* ══ HERO ══ */}
      <div className="relative h-[60vh] md:h-[75vh]">
        <Image
          src="/images/airport/airport_hero.jpeg"
          alt="Airport"
          fill
          priority
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #26272a 0%, rgba(38,39,42,0.5) 20%, transparent 38%, transparent 52%, rgba(38,39,42,0.5) 78%, #26272a 100%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-10 md:pb-16 z-10 px-4">
          <h1 className="trajan-regular text-3xl md:text-6xl lg:text-7xl uppercase tracking-[0.1em] md:tracking-[0.15em] text-[#acb0cd] text-center">
            Caribbean Airports
          </h1>
          <p className="text-[#acb0cd]/70 text-xs md:text-sm uppercase tracking-[0.25em] font-light text-center mt-3">
            Gateway to the Islands
          </p>
        </div>
      </div>

      {/* ══ GRILLE RÉGIONS ══ */}
      <div
        className="py-14 md:py-20 px-4 md:px-16"
        style={{ backgroundImage: 'url(/images/nuagesAncien.png)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundColor: '#2e2f32' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: '#C0C0C0' }}>Select a Destination</p>
            <h2 className="trajan-regular text-xl md:text-3xl text-[#acb0cd] uppercase tracking-[0.1em]">
              Airports by Destination
            </h2>
            <div className="w-12 h-px mx-auto mt-4" style={{ backgroundColor: '#c2622a' }} />
          </div>

          {/* Ligne 1 : 2 col mobile / 4 col desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 mb-px">
            {regions.slice(0, 4).map((region, i) => (
              <RegionCard key={i} region={region} onClick={setSelectedRegion} />
            ))}
          </div>
          {/* Ligne 2 : 2 col mobile / 3 centré desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {regions.slice(4, 6).map((region, i) => (
              <RegionCard key={i} region={region} onClick={setSelectedRegion} />
            ))}
            <div className="col-span-2 md:col-span-1">
              <RegionCard region={regions[6]} onClick={setSelectedRegion} />
            </div>
          </div>
        </div>
      </div>

      {/* ══ MODAL ══ */}
      <AirportModal region={selectedRegion} onClose={() => setSelectedRegion(null)} />
    </div>
  );
}
