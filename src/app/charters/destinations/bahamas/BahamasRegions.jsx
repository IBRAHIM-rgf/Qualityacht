'use client';

// ══ Bahamas — hero video + « Destinations by Region » ══
// Meme rendu que /charters/destinations/caribbean-v15 (demande client 2026-09-27) :
// hero video plein cadre, puis accordeons par ile avec les sous-destinations en
// pastilles ; un clic sur une pastille ouvre la carte (meme modale que la v15).
// Donnees : fichier client « Bahamas_8_Groupes2.xlsx » (8 groupes, 2026-09-27).
// Coordonnees : positions approximatives de chaque lieu (carte affichee au zoom 5).

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { IslandMapModal, CloudSection, RevealBlock, DestCard, caribbeanIslands, StBarthBandeau, FaqItem, faqItems } from '../caribbean-v15/CaribbeanV15Base';

const HERO = '/media/client/lydie/2026-09-27/bahamas-hero';
const CARDS = '/media/client/lydie/2026-09-28/bahamas-cards';
const BAHAMAS_CARD_PHOTOS = 8;

// [nom, lat, lng] — fichier client « Bahamas_8_Groupes2.xlsx » (8 groupes).
const GROUPS = [
  { name: 'Nassau & Paradise Island', islands: [
    ['New Providence', 25.03, -77.4],
    ['Nassau', 25.06, -77.35],
    ['Paradise Island', 25.08, -77.32],
    ['Rose Island', 25.1, -77.2]] },
  { name: 'Grand Bahama', islands: [
    ['Freeport', 26.53, -78.7],
    ['Lucaya', 26.51, -78.65],
    ['West End', 26.69, -78.97]] },
  { name: 'The Exumas', islands: [
    ['Ship Channel Cay', 24.82, -76.83],
    ["Allan's Cay", 24.75, -76.84],
    ['Highborne Cay', 24.71, -76.82],
    ["Norman's Cay", 24.6, -76.81],
    ['Shroud Cay', 24.53, -76.79],
    ['Warderick Wells', 24.39, -76.63],
    ['Compass Cay', 24.26, -76.51],
    ['Big Major Cay', 24.18, -76.46],
    ['Staniel Cay', 24.17, -76.44],
    ['Sampson Cay', 24.21, -76.48],
    ['Musha Cay', 23.9, -76.26],
    ['Great Exuma', 23.55, -75.9],
    ['Georgetown', 23.51, -75.78],
    ['Stocking Island', 23.53, -75.76],
    ['Little Exuma', 23.45, -75.62]] },
  { name: 'The Abacos', islands: [
    ['Great Abaco', 26.4, -77.1],
    ['Marsh Harbour', 26.54, -77.06],
    ['Treasure Cay', 26.67, -77.29],
    ['Elbow Cay', 26.53, -76.96],
    ['Hope Town', 26.54, -76.96],
    ['Man-O-War Cay', 26.59, -77.01],
    ['Great Guana Cay', 26.66, -77.12],
    ['Green Turtle Cay', 26.76, -77.33],
    ['Little Harbour', 26.33, -76.99],
    ['Tilloo Cay', 26.47, -76.99],
    ['Lubbers Quarters Cay', 26.49, -76.99],
    ['No Name Cay', 26.73, -77.25],
    ['Scotland Cay', 26.63, -77.07]] },
  { name: 'Eleuthera & Harbour Island', islands: [
    ['Eleuthera', 25.1, -76.15],
    ['Gregory Town', 25.39, -76.56],
    ["Governor's Harbour", 25.2, -76.24],
    ['Rock Sound', 24.87, -76.16],
    ['Hatchet Bay', 25.35, -76.49],
    ['Harbour Island', 25.5, -76.64],
    ['Dunmore Town', 25.5, -76.64],
    ['Spanish Wells', 25.54, -76.75],
    ['Current Cut', 25.4, -76.79]] },
  { name: 'Andros', islands: [
    ['North Andros', 24.7, -78.0],
    ['Mangrove Cay', 24.25, -77.65],
    ['South Andros', 23.95, -77.6],
    ['Andros Town', 24.7, -77.77],
    ['Fresh Creek', 24.73, -77.79]] },
  { name: 'Bimini & Berry Islands', islands: [
    ['North Bimini', 25.73, -79.28],
    ['South Bimini', 25.7, -79.29],
    ['Gun Cay', 25.57, -79.3],
    ['Great Harbour Cay', 25.75, -77.85],
    ['Chub Cay', 25.41, -77.9],
    ["Frazer's Hog Cay", 25.4, -77.84],
    ["Bond's Cay", 25.52, -77.77]] },
  { name: 'Îles du Sud / Out Islands', islands: [
    ['Cat Island', 24.4, -75.55],
    ['New Bight', 24.29, -75.42],
    ["Arthur's Town", 24.62, -75.67],
    ['Orange Creek', 24.64, -75.7],
    ['Long Island', 23.3, -75.1],
    ['Stella Maris', 23.58, -75.27],
    ["Deadman's Cay", 23.18, -75.1],
    ['Clarence Town', 23.1, -74.98],
    ['San Salvador', 24.05, -74.48],
    ['Cockburn Town', 24.05, -74.53],
    ['Rum Cay', 23.68, -74.85],
    ['Port Nelson', 23.65, -74.84],
    ['Acklins & Crooked Island', 22.55, -74.1],
    ['Long Cay', 22.58, -74.35],
    ['Mayaguana', 22.38, -72.95],
    ["Abraham's Bay", 22.36, -73.0],
    ["Pirate's Well", 22.43, -73.1],
    ['Inagua', 21.1, -73.4],
    ['Matthew Town', 20.95, -73.67],
    ['Little Inagua', 21.47, -73.02],
    ['Ragged Island', 22.2, -75.72],
    ['Duncan Town', 22.19, -75.73],
    ['Water Cay', 22.95, -75.85],
    ['Raccoon Cay', 22.4, -75.83],
    ['Nurse Cay', 22.53, -75.85],
    ['Flamingo Cay', 22.88, -75.87]] },
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
  // Meme effet que le titre du hero Caraibes : apparition en fondu + montee (2.8 s).
  const titleRef = useRef(null);
  useEffect(() => {
    const el = titleRef.current;
    if (el) requestAnimationFrame(() => el.classList.add('revealed'));
  }, []);
  return (
    <section className="relative pt-[70px] md:pt-0 h-[70vh] md:h-[86vh] overflow-hidden bg-[#26272a]">
      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 2.8s ease, transform 2.8s ease; }
        .reveal-up.revealed { opacity: 1; transform: translateY(0); }
      `}</style>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video src={`${HERO}/hero.mp4`} poster={`${HERO}/poster.jpg`} autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
      {/* Titre dans la partie foncee (eau profonde, a gauche de la video). Mobile : en bas. */}
      <div className="absolute inset-x-0 bottom-[8%] md:bottom-auto md:inset-x-auto md:left-[4%] md:top-1/2 md:-translate-y-1/2 md:w-[30%] flex flex-col items-center px-4">
        <div ref={titleRef} className="reveal-up flex flex-col items-center w-full">
          <h1 className="trajan-regular text-4xl md:text-5xl lg:text-6xl uppercase tracking-[0.15em] leading-tight text-[#acb0cd] text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            The Bahamas
          </h1>
          <div className="relative w-32 h-6 mx-auto my-4 md:my-6">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Grille de photos : 8 cartes 4 + 4 (une par groupe), memes photos et meme
// effet que la grille Caraibes en attendant les photos Bahamas (client 2026-09-27).
export function BahamasIslandsGrid({ sub = 'The most sought-after islands for luxury yacht charters' } = {}) {
  // Photos Bahamas du client (2026-09-28) : version filtree au repos, couleur revelee,
  // meme transition que la grille Caraibes. 7 photos recues pour 8 cartes : la 8e garde
  // provisoirement la photo Caraibes en attendant la sienne.
  const cards = GROUPS.map((g, i) => {
    if (i < BAHAMAS_CARD_PHOTOS) {
      const n = i + 1;
      return { name: g.name, image: `${CARDS}/card-${n}-filtered.jpg`, imageOld: `${CARDS}/card-${n}-color.jpg` };
    }
    const photo = caribbeanIslands[i % caribbeanIslands.length];
    return { name: g.name, image: photo.image, imageOld: photo.imageOld };
  });
  const rows = [0, 4].map((start) => cards.slice(start, start + 4));
  return (
    <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16">
      <div className="max-w-7xl mx-auto">
        <RevealBlock label="Explore" title="Bahamas Islands" sub={sub} />
        {rows.map((row, r) => (
          <div key={r} className={`grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 ${r < rows.length - 1 ? 'mb-px' : ''}`}>
            {row.map((c, i) => <DestCard key={c.name} index={r * 4 + i} {...c} />)}
          </div>
        ))}
      </div>
    </CloudSection>
  );
}

export function BahamasDestinationsByRegion({ sub = '' } = {}) {
  const [activeIsland, setActiveIsland] = useState(null);
  const main = GROUPS.slice(0, -2);
  const last = GROUPS.slice(-2);
  return (
    <>
      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 2.8s ease, transform 2.8s ease; }
        .reveal-up.revealed { opacity: 1; transform: translateY(0); }
      `}</style>
      <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <RevealBlock label="Archipelagos" title="Destinations by Region" sub={sub} />
          {/* 3 + 3 puis les 2 derniers centres en paire (comme la v15) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
            {main.map((group, i) => (
              <IslandGroup key={group.name} group={group} defaultOpen={i < 3} onIslandSelect={setActiveIsland} />
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-12 gap-y-6">
            {last.map((group) => (
              <div key={group.name} className="w-full md:w-[calc((100%-3rem)/3)]">
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

// Bandeau CTA « Ready to Sail » + FAQ : copie conforme de la fin de page Caraibes
// (client 2026-09-28), photo Bahamas et titre « Plan Your Bahamas Charter ».
export function BahamasCtaAndFaq({
  ctaTitle = 'Plan Your Bahamas Charter',
  ctaText = 'Our team of experts is available 24/7 to create your bespoke yachting itinerary across the Caribbean.',
} = {}) {
  return (
    <>
      <StBarthBandeau src="/media/client/lydie/2026-09-28/bahamas-cta/atlantis.jpg">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6 gap-5">
          <div className="rounded-2xl border border-[#C0C0C0] bg-[#3a3b3f]/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 max-w-xs md:max-w-xl">
            <p className="text-[10px] md:text-sm uppercase tracking-[0.3em] mb-2 md:mb-3 text-[#acb0cd]">Ready to Sail</p>
            <h2 className="trajan-regular text-xl md:text-5xl uppercase tracking-[0.08em] md:tracking-[0.12em] leading-tight text-[#acb0cd]">
              {ctaTitle}
            </h2>
          </div>
          <div className="rounded-2xl border border-[#C0C0C0] bg-[#3a3b3f]/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 max-w-xs md:max-w-md">
            <p className="text-sm md:text-base leading-relaxed text-[#acb0cd]">
              {ctaText}
            </p>
          </div>
          <a href="/charters/destinations/caribbean-v15/exploreyacht"
            style={{ color: '#c2622a', backgroundColor: '#26272a', borderColor: '#C0C0C0' }}
            className="trajan-regular text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] px-7 md:px-10 py-3 md:py-4 border rounded-full hover:bg-[#c2622a] hover:text-white hover:border-[#c2622a] transition-all duration-300">
            Explore Yachts
          </a>
        </div>
      </StBarthBandeau>

      <CloudSection className="bg-[#26272a] py-12 md:py-20 px-4 md:px-16" bg="/images/nuagesAncien.png">
        <div className="max-w-7xl mx-auto">
          <RevealBlock label="Frequently Asked Questions" title="Your Luxury Yacht Charter, Explained" sub="" useTitleLine />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
            {faqItems.map((item, i) => (
              <div key={i} className={faqItems.length % 3 !== 0 && i === faqItems.length - 1 ? 'md:col-start-2' : ''}>
                <FaqItem q={item.q} a={item.a} />
              </div>
            ))}
          </div>
        </div>
      </CloudSection>
    </>
  );
}
