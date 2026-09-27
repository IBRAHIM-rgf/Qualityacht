'use client';

// ══ Bahamas — hero video + « Destinations by Region » ══
// Meme rendu que /charters/destinations/caribbean-v15 (demande client 2026-09-27) :
// hero video plein cadre, puis accordeons par ile avec les sous-destinations en
// pastilles ; un clic sur une pastille ouvre la carte (meme modale que la v15).
// Donnees : fichier client « Bahamas_16_Iles_Officielles2.xlsx » (16 iles officielles).
// Coordonnees : positions approximatives de chaque lieu (carte affichee au zoom 5).

import { useState } from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { IslandMapModal, CloudSection, RevealBlock } from '../caribbean-v15/CaribbeanV15Base';

const HERO = '/media/client/lydie/2026-09-27/bahamas-hero';

// [nom, lat, lng]
const GROUPS = [
  { name: 'The Abacos', islands: [
    ['Great Abaco', 26.4, -77.1], ['Marsh Harbour', 26.54, -77.06], ['Treasure Cay', 26.67, -77.29],
    ['Elbow Cay', 26.53, -76.96], ['Hope Town', 26.54, -76.96], ['Man-O-War Cay', 26.59, -77.01],
    ['Great Guana Cay', 26.66, -77.12], ['Green Turtle Cay', 26.76, -77.33], ['Little Harbour', 26.33, -76.99],
    ['Tilloo Cay', 26.47, -76.99], ['Lubbers Quarters Cay', 26.49, -76.99], ['No Name Cay', 26.73, -77.25],
    ['Scotland Cay', 26.63, -77.07]] },
  { name: 'Acklins & Crooked Island', islands: [
    ['Acklins', 22.37, -74.0], ['Crooked Island', 22.75, -74.2], ['Long Cay', 22.58, -74.35]] },
  { name: 'Andros', islands: [
    ['North Andros', 24.7, -78.0], ['Mangrove Cay', 24.25, -77.65], ['South Andros', 23.95, -77.6],
    ['Andros Town', 24.7, -77.77], ['Fresh Creek', 24.73, -77.79]] },
  { name: 'The Berry Islands', islands: [
    ['Great Harbour Cay', 25.75, -77.85], ['Chub Cay', 25.41, -77.9], ["Frazer's Hog Cay", 25.4, -77.84],
    ["Bond's Cay", 25.52, -77.77]] },
  { name: 'Bimini', islands: [
    ['North Bimini', 25.73, -79.28], ['South Bimini', 25.7, -79.29], ['Gun Cay', 25.57, -79.3]] },
  { name: 'Cat Island', islands: [
    ['New Bight', 24.29, -75.42], ["Arthur's Town", 24.62, -75.67], ['Orange Creek', 24.64, -75.7]] },
  { name: 'Eleuthera & Harbour Island', islands: [
    ['Eleuthera', 25.1, -76.15], ['Gregory Town', 25.39, -76.56], ["Governor's Harbour", 25.2, -76.24],
    ['Rock Sound', 24.87, -76.16], ['Hatchet Bay', 25.35, -76.49], ['Harbour Island', 25.5, -76.64],
    ['Dunmore Town', 25.5, -76.64], ['Spanish Wells', 25.54, -76.75], ['Current Cut', 25.4, -76.79]] },
  { name: 'The Exumas', islands: [
    ['Ship Channel Cay', 24.82, -76.83], ["Allan's Cay", 24.75, -76.84], ['Highborne Cay', 24.71, -76.82],
    ["Norman's Cay", 24.6, -76.81], ['Shroud Cay', 24.53, -76.79], ['Warderick Wells', 24.39, -76.63],
    ['Compass Cay', 24.26, -76.51], ['Big Major Cay', 24.18, -76.46], ['Staniel Cay', 24.17, -76.44],
    ['Sampson Cay', 24.21, -76.48], ['Musha Cay', 23.9, -76.26], ['Great Exuma', 23.55, -75.9],
    ['Georgetown', 23.51, -75.78], ['Stocking Island', 23.53, -75.76], ['Little Exuma', 23.45, -75.62]] },
  { name: 'Freeport - Grand Bahama Island', islands: [
    ['Freeport', 26.53, -78.7], ['Lucaya', 26.51, -78.65], ['West End', 26.69, -78.97]] },
  { name: 'Inagua', islands: [
    ['Great Inagua', 21.08, -73.35], ['Matthew Town', 20.95, -73.67], ['Little Inagua', 21.47, -73.02]] },
  { name: 'Long Island', islands: [
    ['Stella Maris', 23.58, -75.27], ["Deadman's Cay", 23.18, -75.1], ['Clarence Town', 23.1, -74.98]] },
  { name: 'Mayaguana', islands: [
    ["Abraham's Bay", 22.36, -73.0], ["Pirate's Well", 22.43, -73.1]] },
  { name: 'Nassau & Paradise Island', islands: [
    ['New Providence', 25.03, -77.4], ['Nassau', 25.06, -77.35], ['Paradise Island', 25.08, -77.32],
    ['Rose Island', 25.1, -77.2]] },
  { name: 'Ragged Island', islands: [
    ['Duncan Town', 22.19, -75.73], ['Water Cay', 22.95, -75.85], ['Raccoon Cay', 22.4, -75.83],
    ['Nurse Cay', 22.53, -75.85], ['Flamingo Cay', 22.88, -75.87]] },
  { name: 'Rum Cay', islands: [['Port Nelson', 23.65, -74.84]] },
  { name: 'San Salvador', islands: [['Cockburn Town', 24.05, -74.53]] },
];

function IslandGroup({ group, defaultOpen, onIslandSelect }) {
  const [open, setOpen] = useState(defaultOpen || false);
  return (
    <div className="border-b border-white/10">
      <button onClick={() => setOpen((o) => !o)}
        className="w-full flex flex-col items-center py-4 text-left group cursor-pointer">
        <span className="trajan-regular text-[#acb0cd] text-xs md:text-sm uppercase tracking-[0.2em] group-hover:text-[#c2622a] transition-colors duration-300 text-center w-full">
          {group.name}
        </span>
        <div className="relative w-24 h-6 my-1">
          <Image src="/images/title-line.png" alt="" fill className="object-contain" />
        </div>
        <span className={`text-[#c2622a] transition-transform duration-300 text-2xl leading-none ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="pb-5 flex flex-wrap justify-center gap-2 px-1">
          {group.islands.map(([name, lat, lng]) => (
            <button key={name} type="button"
              onClick={() => onIslandSelect({ name, coords: [lat, lng] })}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#C0C0C0]/40 bg-[#26272a] text-[#acb0cd] text-xs transition-colors hover:border-[#c2622a] hover:text-[#c2622a] cursor-pointer">
              <span className="text-[#c2622a] text-[8px]">›</span>
              {name}
              <MapPin className="w-3 h-3 text-[#c2622a]/70" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function BahamasHero() {
  return (
    <section className="relative pt-[70px] md:pt-0 h-[70vh] md:h-[86vh] overflow-hidden bg-[#26272a]">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video src={`${HERO}/hero.mp4`} poster={`${HERO}/poster.jpg`} autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
    </section>
  );
}

export function BahamasDestinationsByRegion() {
  const [activeIsland, setActiveIsland] = useState(null);
  const main = GROUPS.slice(0, 15);
  const last = GROUPS.slice(15);
  return (
    <>
      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 2.8s ease, transform 2.8s ease; }
        .reveal-up.revealed { opacity: 1; transform: translateY(0); }
      `}</style>
      <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <RevealBlock label="Archipelagos" title="Destinations by Region" sub="" />
          {/* 15 iles en 3 colonnes, la 16e centree */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
            {main.map((group, i) => (
              <IslandGroup key={group.name} group={group} defaultOpen={i < 3} onIslandSelect={setActiveIsland} />
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-12 gap-y-6">
            {last.map((group) => (
              <div key={group.name} className="w-full md:w-[calc((100%-6rem)/3)]">
                <IslandGroup group={group} defaultOpen={false} onIslandSelect={setActiveIsland} />
              </div>
            ))}
          </div>
        </div>
      </CloudSection>
      <IslandMapModal island={activeIsland} onClose={() => setActiveIsland(null)} />
    </>
  );
}
