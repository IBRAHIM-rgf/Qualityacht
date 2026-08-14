import WorldPinsMap from "@/components/vibe/WorldPinsMap";
import { media } from "@/lib/quality-media";

const RE_POOL = [
  ...media({ cat: "beach", kind: "image" }),
  ...media({ cat: "aerial", kind: "image" }),
  ...media({ cat: "divers", kind: "image" }),
  ...media({ cat: "interiors", kind: "image" }),
].map((m) => m.src);

// Localisations immobilieres de luxe dans le monde (selection editoriale, indicatif).
const PROPERTIES = [
  { name: "Beachfront villas", place: "St-Barthélemy", badge: "Villas", coords: [17.90, -62.83], desc: "Hillside and beachfront estates with private pools." },
  { name: "Penthouses & duplexes", place: "Monaco", badge: "Penthouse", coords: [43.740, 7.427], desc: "The world’s most exclusive square metres." },
  { name: "Belle Époque estates", place: "Cap Ferrat — Riviera", badge: "Estate", coords: [43.685, 7.330], desc: "Gated waterfront villas on the Côte d’Azur." },
  { name: "Private-island villas", place: "Mustique", badge: "Private island", coords: [12.88, -61.19], desc: "Discreet retreats on a legendary private island." },
  { name: "Ski chalets", place: "Gstaad", badge: "Chalet", coords: [46.472, 7.286], desc: "Palace-town chalets in the Swiss Alps." },
  { name: "Palm & marina residences", place: "Dubai", badge: "Waterfront", coords: [25.112, 55.138], desc: "Signature waterfront living and sky penthouses." },
  { name: "Mayfair townhouses", place: "London", badge: "Townhouse", coords: [51.510, -0.147], desc: "Prime central-London addresses." },
  { name: "Cliffside villas", place: "Ibiza", badge: "Villa", coords: [38.98, 1.43], desc: "Sunset-facing estates above the Balearic sea." },
  { name: "Waterfront estates", place: "Miami Beach", badge: "Waterfront", coords: [25.79, -80.13], desc: "Private-dock mansions on the bay." },
  { name: "Lakefront villas", place: "Lake Como", badge: "Villa", coords: [45.99, 9.26], desc: "Historic villas on Italy’s most storied lake." },
  { name: "Mountain lodges", place: "Aspen", badge: "Lodge", coords: [39.19, -106.82], desc: "Retreats in America’s glamour resort town." },
  { name: "Ocean-view estates", place: "Turks & Caicos", badge: "Estate", coords: [21.77, -72.27], desc: "Private-beach estates on Providenciales." },
].map((p, i) => ({ ...p, img: RE_POOL[i % RE_POOL.length] }));


const HERO_TRIPTYCH = [
  '/media/quality/real-estate/real-estate-1.mp4',
  '/media/quality/real-estate/real-estate-2.mp4',
  '/media/quality/real-estate/real-estate-3.mp4',
];

export default function RealEstatePage() {
  return (
    <main className="bg-[#26272a] text-[#acb0cd]">
      {/* HERO — 3 videos cote a cote (remplit la largeur, pas de vide lateral) */}
      <section className="relative pt-[70px] md:pt-0 h-[62vh] md:h-[85vh] bg-[#26272a] overflow-hidden grid grid-cols-3 gap-[2px]">
        {HERO_TRIPTYCH.map((src) => (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video key={src} src={src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#26272a] via-[#26272a]/70 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-8 md:pb-12">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#B87333] mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
            A Global Portfolio
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
            Real Estate
          </h1>
        </div>
      </section>

      {/* Intro texte */}
      <section className="px-6 md:px-14 pt-12 md:pt-16 pb-6 text-center">
        <p className="max-w-2xl mx-auto text-[13px] md:text-base text-[#acb0cd] leading-relaxed">
          A curated map of the addresses that hold their rank — introductions arranged by concierge.
        </p>
      </section>

      {/* Planisphere des localisations immobilieres de luxe */}
      <WorldPinsMap
        items={PROPERTIES}
        kicker="A Global Portfolio"
        title="Where The World Lives Best"
        intro="From St-Barth to Monaco, Mustique to Aspen — a curated map of the addresses that hold their rank. Editorial selection; introductions arranged by concierge."
        hideCards
        hidePins
      />
    </main>
  );
}