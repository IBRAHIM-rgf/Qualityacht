'use client';

import Image from 'next/image';
import { useState } from 'react';

// ── Données jets privés Caribbean ─────────────────────────────────────────────
const caribbeanJetGroups = [
  { island: 'Cuba', airports: ['José Martí International Airport (HAV) — grands jets privés', 'Juan Gualberto Gómez Airport (VRA) — jets privés moyens', 'Cayo Largo Airport (CYL) — petits jets privés'] },
  { island: 'République Dominicaine', airports: ['Punta Cana International Airport (PUJ) — tous jets privés', 'Casa de Campo International Airport (LRM) — jets privés moyens', 'Las Américas International Airport (SDQ) — tous jets privés', 'La Romana International Airport (LRM) — jets privés moyens'] },
  { island: 'Haïti', airports: ['Toussaint Louverture International Airport (PAP) — jets privés moyens', 'Cap-Haïtien International Airport (CAP) — petits jets privés'] },
  { island: 'Jamaïque', airports: ['Sangster International Airport (MBJ) — tous jets privés', 'Norman Manley International Airport (KIN) — tous jets privés', 'Ian Fleming International Airport (OCJ) — petits jets privés'] },
  { island: 'Porto Rico', airports: ['Luis Muñoz Marín International Airport (SJU) — tous jets privés', 'Fernando Luis Ribas Dominicci Airport (SIG) — petits jets privés', 'Mercedita Airport (PSE) — jets privés moyens'] },
  { island: 'Anguilla', airports: ['Clayton J. Lloyd International Airport (AXA) — petits jets privés'] },
  { island: 'Saint-Martin / Sint Maarten', airports: ['Princess Juliana International Airport (SXM) — tous jets privés', 'Grand Case Airport (SFG) — jets privés moyens'] },
  { island: 'Saint-Barthélemy', airports: ['Gustavia Airport (SBH) — avions STOL uniquement'] },
  { island: 'Saba', airports: ['Juancho E. Yrausquin Airport (SAB) — avions STOL uniquement'] },
  { island: 'Saint-Eustatius', airports: ['F.D. Roosevelt Airport (EUX) — petits jets privés'] },
  { island: 'Saint-Kitts & Nevis', airports: ['Robert L. Bradshaw International Airport (SKB) — tous jets privés', 'Vance W. Amory International Airport (NEV) — petits jets privés'] },
  { island: 'Antigua & Barbuda', airports: ['V.C. Bird International Airport (ANU) — tous jets privés', 'Barbuda Codrington Airport (BBQ) — petits jets privés'] },
  { island: 'Montserrat', airports: ['John A. Osborne Airport (MNI) — petits jets privés'] },
  { island: 'Guadeloupe', airports: ['Pointe-à-Pitre International Airport (PTP) — tous jets privés'] },
  { island: 'Aruba', airports: ['Queen Beatrix International Airport (AUA) — tous jets privés'] },
  { island: 'Bonaire', airports: ['Flamingo International Airport (BON) — jets privés moyens'] },
  { island: 'Curaçao', airports: ['Curaçao International Airport (CUR) — tous jets privés'] },
  { island: 'Dominique', airports: ['Douglas-Charles Airport (DOM) — jets privés moyens', 'Canefield Airport (DCF) — petits jets privés'] },
  { island: 'Martinique', airports: ['Martinique Aimé Césaire International Airport (FDF) — tous jets privés'] },
  { island: 'Sainte-Lucie', airports: ['Hewanorra International Airport (UVF) — tous jets privés', 'George F.L. Charles Airport (SLU) — petits jets privés'] },
  { island: 'Saint-Vincent & les Grenadines', airports: ['Argyle International Airport (SVD) — jets privés moyens/grands', 'Mustique Airport (MQS) — petits jets privés', 'Canouan Airport (CIW) — jets privés moyens'] },
  { island: 'Grenade', airports: ['Maurice Bishop International Airport (GND) — tous jets privés', 'Lauriston Airport (CRU) — petits jets privés'] },
  { island: 'Barbade', airports: ['Grantley Adams International Airport (BGI) — tous jets privés'] },
  { island: 'Turks & Caicos', airports: ['Providenciales International Airport (PLS) — jets privés moyens/grands', 'Grand Turk International Airport (GDT) — petits jets privés'] },
  { island: 'Trinité-et-Tobago', airports: ['Piarco International Airport (POS) — tous jets privés', 'A.N.R. Robinson International Airport (TAB) — jets privés moyens'] },
  { island: 'Barbuda', airports: ['Barbuda Codrington Airport (BBQ) — petits jets privés'] },
  { island: 'Carriacou', airports: ['Lauriston Airport (CRU) — petits jets privés'] },
  { island: 'Petite Martinique', airports: ['Pas d\'aéroport — accès par bateau uniquement'] },
  { island: 'Redonda', airports: ['Pas d\'aéroport'] },
  { island: 'Aves Island', airports: ['Pas d\'aéroport'] },
  { island: 'Navassa Island', airports: ['Pas d\'aéroport'] },
  { island: 'Sombrero Island', airports: ['Pas d\'aéroport'] },
];

// ── Destinations ───────────────────────────────────────────────────────────────
const destinations = [
  { name: 'Caribbean',           image: '/images/destinations/animals/caraibes.jpg',               groups: caribbeanJetGroups },
  { name: 'Arctic',              image: '/images/destinations/animals/Arctic.png',                  groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'Bahamas',             image: '/images/destinations/animals/Bahamas.jpg',                 groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'Central America',     image: '/images/destinations/animals/Central-America.jpg',         groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'East Asia',           image: '/images/destinations/animals/EAST-ASIA.jpg',               groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'Eastern Mediterranean', image: '/images/destinations/animals/Eastern-Mediterranean.jpg', groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'Indian Ocean',        image: '/images/destinations/animals/Indian-Ocean.jpg',            groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'Indonesia',           image: '/images/destinations/animals/Indonesia.jpg',               groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'North America',       image: '/images/destinations/animals/Nord-America.jpg',            groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'Pacific Ocean',       image: '/images/destinations/animals/Ocean-Pacific.jpeg',          groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'Oman Gulf',           image: '/images/destinations/animals/Oman-Gulf.jpeg',              groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'South East Asia',     image: '/images/destinations/animals/SOUTH-EAST-ASIA.jpeg',        groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'Western Mediterranean', image: '/images/destinations/animals/Western-Mediterranean.webp', groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'Africa',              image: '/images/destinations/animals/africa.jpeg',                 groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'Northern Europe',     image: '/images/destinations/animals/articbynortherneurope.jpg',   groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
  { name: 'Oceania',             image: '/images/destinations/animals/oceania.jpeg',                groups: [{ island: 'Coming Soon', airports: ['Information coming soon'] }] },
];

// ── Card ───────────────────────────────────────────────────────────────────────
function DestCard({ dest, onClick }) {
  return (
    <div
      onClick={() => onClick(dest)}
      className="min-w-0 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform cursor-pointer"
    >
      <div className="w-full relative mb-6 overflow-hidden h-48 rounded-xl">
        <Image src={dest.image} alt={dest.name} fill className="object-cover rounded-xl" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <h2 className="text-lg font-semibold text-[#acb0cd] mb-2 trajan-regular uppercase text-center break-words leading-tight w-full hyphens-auto hover:text-[#c2622a] transition-colors duration-300">
        {dest.name}
      </h2>
    </div>
  );
}

// ── Modal ──────────────────────────────────────────────────────────────────────
function JetModal({ dest, onClose }) {
  if (!dest) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: 'rgba(10,20,50,0.92)' }} onClick={onClose}>
      <style>{`
        .modal-scroll::-webkit-scrollbar { width: 4px; }
        .modal-scroll::-webkit-scrollbar-track { background: transparent; }
        .modal-scroll::-webkit-scrollbar-thumb { background: #acb0cd; border-radius: 2px; }
        .modal-scroll { scrollbar-width: thin; scrollbar-color: #acb0cd transparent; }
      `}</style>
      <div
        className="modal-scroll relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-2xl border border-white/10 px-6 py-8 md:px-10 md:py-10"
        style={{ backgroundColor: '#0a1432' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-5 text-[#acb0cd]/50 hover:text-white text-2xl transition-colors duration-200 cursor-pointer">×</button>
        <h2 className="trajan-regular text-xl md:text-2xl text-[#acb0cd] uppercase tracking-[0.1em] mb-6 text-center">{dest.name}</h2>
        <div className="space-y-6">
          {dest.groups.map((group, i) => (
            <div key={i}>
              <p className="text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-2 text-center" style={{ color: '#acb0cd' }}>{group.island}</p>
              <ul className="space-y-1.5">
                {group.airports.map((airport, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm md:text-base text-[#acb0cd]">
                    <span className="mt-1 w-1.5 h-1.5 rotate-45 shrink-0 inline-block" style={{ backgroundColor: '#acb0cd' }} />
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
export default function PrivatJetPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-hidden">

      {/* ══ HERO ══ */}
      <div className="relative h-[60vh] md:h-[75vh]">
        <Image
          src="/images/private_jet/jet_hero.jpeg"
          alt="Private Jet"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #26272a 0%, rgba(38,39,42,0.5) 20%, transparent 38%, transparent 52%, rgba(38,39,42,0.5) 78%, #26272a 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-10 md:pb-16 z-10 px-4">
          <h1 className="trajan-regular text-3xl md:text-6xl lg:text-7xl uppercase tracking-[0.1em] md:tracking-[0.15em] text-[#acb0cd] text-center">
            Private Jets
          </h1>
          <p className="text-[#acb0cd]/70 text-xs md:text-sm uppercase tracking-[0.25em] font-light text-center mt-3">
            Your Gateway to Every Destination
          </p>
        </div>
      </div>

      {/* ══ GRILLE ══ */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat py-24 px-4"
        style={{ backgroundImage: "url('/images/services-bg.png')" }}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white trajan-regular mb-4 text-center uppercase tracking-wide">
          Private Jet Destinations
        </h2>
        <Image src="/images/title-line.png" alt="" width={200} height={10} className="mx-auto mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
          {destinations.map((dest, i) => (
            <DestCard key={i} dest={dest} onClick={setSelected} />
          ))}
        </div>
      </section>

      <JetModal dest={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
