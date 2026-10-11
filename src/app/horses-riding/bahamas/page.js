// /horses-riding/bahamas — Horses & Riding Bahamas 2027 (client 2026-10-11), calquee sur
// /horses-riding/caribbean : hero photo + titre, stats, Seasonal Circuits, Islands by
// Region (une carte par groupe d'iles), puis les sections Bahamas (cases, regions,
// destinations populaires, CTA, FAQ). Textes repris des 2 fichiers client.
// La section « eclat » Caraibes n'est pas reprise : ses textes sont propres aux Caraibes.
import Image from 'next/image';
import { CircuitCard, RegionGroupCard } from '../caribbean-v2/HorsesCards';
import { media } from '@/lib/quality-media';
import { GROUPS, groupSlug } from '../../charters/destinations/bahamas/bahamasGroups';
import { BahamasIslandsGrid, BahamasDestinationsByRegion, BahamasCtaAndFaq } from '../../charters/destinations/bahamas/BahamasRegions';
import BahamasPopularDestinations from '../../charters/destinations/bahamas/BahamasPopularDestinations';

export const metadata = {
  title: 'Horses & Riding 2027 — Bahamas Private Guide | Qualityacht',
  description: 'A private client guide to riding across the Bahamas in 2027: seasonal circuits and private rides, island group by island group.',
};

const HERO = '/media/client/2026-10-11/horses-bahamas-hero.jpg';

const stats = [
  { value: '8', label: 'Regions covered' },
  { value: '10', label: 'Private rides' },
  { value: '5', label: 'Seasonal circuits' },
];

// [nom, mois, extremites, etapes, texte] — fichier « Horses & Riding · Bahamas 2027 ».
const circuits = [
  ['Nassau Horse Shows', 'Nov–Apr', 'Camperdown → Albany', '3 stops', 'Public jumper and equitation shows on New Providence through the season, including events at Camperdown Equestrian Centre, Mariposa Stables and Albany Equestrian Center.'],
  ['Nassau & Grand Bahama Beach Trails', 'Dec–Apr', 'Nassau → Grand Bahama', '3 stops', 'Coral Harbour Beach with Happy Trails Stables in Nassau, then the forest-and-dune trail at Pinetree Stables and the family pony ride at Coral Beach in Grand Bahama.'],
  ['Pink Sand & Atlantic Shores', 'Dec–May', 'Harbour Island → Eleuthera', '2 stops', 'A relaxed ride on Harbour Island’s Pink Sand Beach, followed by a private ride along Eleuthera’s quiet Atlantic shore.'],
  ['Exumas & Abacos by Arrangement', 'Mar–May', 'Great Exuma → Treasure Cay', '2 stops', 'Private beach rides near George Town and on the crescent of Treasure Cay Beach, with horses brought in by a licensed handler.'],
  ['Out Island Expedition Rides', 'Nov–Apr', 'Andros → Long Island', '3 stops', 'Private rides on the pine tracks of North Andros, the beaches of Great Harbour Cay and Cape Santa Maria on Long Island, for adventurous guests.'],
].map(([name, dates, route, stopsLabel, detail]) => ({ name, dates, route, stopsLabel, detail }));

// Une carte par groupe d'iles (meme ordre que les 8 groupes) — fichier « Riding · The Bahamas · Regions ».
const REGION_DATA = [
  ['Nassau & Paradise Island', [
    ['New Providence (Nassau · Coral Harbour)', 'Nov–Apr', [['Riding', 'Happy Trails Stables: wooded trail to Coral Harbour Beach (2 hrs), small herd, beginner instruction.'], ['Shows', 'Equestrian Bahamas jumper and equitation shows at Camperdown, Mariposa and Albany.']]],
  ]],
  ['Grand Bahama', [
    ['Grand Bahama (Freeport · Lucaya)', 'Dec–Apr', [['Riding', 'Pinetree Stables: pine forest, dunes and sea trail (2 hrs); horses wade into the water.'], ['Family', 'Coral Beach pony rides at a slow walk; sunset rides on request.']]],
  ]],
  ['The Exumas', [
    ['Great Exuma (George Town)', 'Mar–May', [['Riding', 'Private beach ride in the cool of the morning or the late-afternoon light, by arrangement.']]],
  ]],
  ['The Abacos', [
    ['Great Abaco (Treasure Cay)', 'Mar–May', [['Riding', 'Private ride along the white crescent of Treasure Cay Beach, by arrangement.']]],
  ]],
  ['Eleuthera & Harbour Island', [
    ['Harbour Island (Dunmore Town)', 'Dec–May', [['Riding', 'BB’s Horseback Riding: Pink Sand Beach, three miles of pale sand and clear water.']]],
    ['Eleuthera (Atlantic Shore)', 'Dec–May', [['Riding', 'Private ride on long, empty Atlantic beaches with low dunes, by arrangement.']]],
  ]],
  ['Andros', [
    ['North Andros (Nicholls Town)', 'Nov–Apr', [['Riding', 'Sandy pine-forest tracks and quiet shoreline over the shallow flats, by arrangement.']]],
  ]],
  ['Bimini & Berry Islands', [
    ['Berry Islands (Great Harbour Cay)', 'Nov–Apr', [['Riding', 'Private ride on near-empty beaches and quiet paved roads, by arrangement.']]],
  ]],
  ['Southern Bahamas / Out Islands', [
    ['Long Island (Cape Santa Maria)', 'Nov–Apr', [['Riding', 'Private ride on the white-sand crescent at the island’s northern tip, by arrangement.']]],
  ]],
];

// Photos des cartes : photos de chevaux de la mediatheque (comme la page Caraibes).
const horsePhotos = media({ cat: 'horses', kind: 'image' }).map((m) => m.src);
const regions = REGION_DATA.map(([name, islands], i) => ({
  name,
  photo: horsePhotos[i % horsePhotos.length],
  // « Discover » : page bateaux du groupe d'iles correspondant.
  href: `/charters/destinations/bahamas/${groupSlug(GROUPS[i].name)}`,
  islands: islands.map(([iname, season, lines]) => ({ name: iname, season, lines })),
}));

const NOTE_CIRCUITS = 'Horse show dates change each year and are confirmed in advance with the local federation. Private rides in regions without a resident stable are arranged on request, subject to local approval, weather and the welfare of the horses.';
const NOTE_REGIONS = 'Horse show dates change each year and are confirmed in advance. Rides marked “by arrangement” have no resident stable: a licensed handler brings suitable horses, subject to local approval, weather and the welfare of the animals.';

export default function BahamasHorsesRidingPage() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      <style>{`
        .hero-rise { opacity: 0; animation: heroRise 2.2s cubic-bezier(0.22,1,0.36,1) 0.15s forwards; }
        @keyframes heroRise { from { opacity: 0; transform: translateY(48px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* HERO — photo entiere (ratio naturel) + titre qui monte du bas, comme la page Caraibes */}
      <section className="pt-[70px]">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HERO} alt="Horses & Riding — Bahamas" className="block w-full h-auto" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#26272a] via-[#26272a]/45 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-4 md:pb-6">
            <div className="hero-rise flex flex-col items-center">
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#B87333] font-medium mb-3">
                Bahamas 2027 · Private Client Guide
              </p>
              <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
                Horses &amp; Riding
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* STATS ROW */}
      <div className="bg-[#26272a] px-6 md:px-14 py-5 md:py-6 border-b border-[#C0C0C0]/10">
        <div className="flex flex-wrap justify-center gap-2.5">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-1 bg-[#3a3b3f] border border-[#C0C0C0]/15 rounded-lg px-1.5 py-0.5">
              <span className="trajan-regular text-lg md:text-xl font-bold text-[#C0C0C0] leading-none">{s.value}</span>
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.06em] text-[#8b90a0] leading-tight">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SEASONAL CIRCUITS */}
      <section className="relative px-6 md:px-14 py-14 md:py-20 bg-[#26272a]">
        <div className="absolute inset-0 z-0">
          <Image src="/images/nuagesAncien.png" alt="" fill className="object-cover opacity-55" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <h2 className="trajan-regular text-lg md:text-2xl text-[#C0C0C0] whitespace-nowrap">Seasonal Circuits</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {circuits.map((c) => (
              <div key={c.name} className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] max-w-md">
                <CircuitCard circuit={c} />
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl mx-auto text-center text-[11px] md:text-xs leading-relaxed text-[#acb0cd]/60">{NOTE_CIRCUITS}</p>
        </div>
      </section>

      {/* ISLANDS BY REGION */}
      <section className="relative px-6 md:px-14 py-14 md:py-20 bg-[#26272a]">
        <div
          className="absolute inset-0 z-0 opacity-55"
          style={{ backgroundImage: "url('/images/nuagesAncien.png')", backgroundSize: '100% auto', backgroundRepeat: 'repeat-y', backgroundPosition: 'top center' }}
        />
        <div className="absolute inset-0 z-0 bg-[#26272a]/20" />
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-8">
            <h2 className="trajan-regular text-lg md:text-2xl text-[#C0C0C0] whitespace-nowrap">Islands by Region</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto items-start">
            {regions.map((region) => (
              <RegionGroupCard key={region.name} region={region} />
            ))}
          </div>
          <p className="mt-8 max-w-3xl mx-auto text-center text-[11px] md:text-xs leading-relaxed text-[#acb0cd]/60">{NOTE_REGIONS}</p>
        </div>
      </section>

      {/* Sections Bahamas (equivalent de CaribbeanExplore sur la page Caraibes). */}
      <BahamasIslandsGrid linked />
      <BahamasDestinationsByRegion />
      <BahamasPopularDestinations />
      <BahamasCtaAndFaq />
    </div>
  );
}
