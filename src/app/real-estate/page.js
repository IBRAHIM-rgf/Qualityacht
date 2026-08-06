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


export default function RealEstatePage() {
  return (
    <main className="bg-[#26272a] text-[#acb0cd]">
      {/* Intro texte (plus aucune photo — la navigation se fait sur la planisphere) */}
      <section className="px-6 md:px-14 pt-28 md:pt-32 pb-6 text-center">
        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-[#B87333] font-medium mb-3">A Global Portfolio</p>
        <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight">Real Estate</h1>
        <p className="max-w-2xl mx-auto mt-5 text-[13px] md:text-base text-[#acb0cd] leading-relaxed">
          A curated map of the addresses that hold their rank — introductions arranged by concierge.
        </p>
      </section>

      {/* Planisphere des localisations immobilieres de luxe */}
      <WorldPinsMap
        items={PROPERTIES}
        kicker="A Global Portfolio"
        title="Where The World Lives Best"
        intro="From St-Barth to Monaco, Mustique to Aspen — a curated map of the addresses that hold their rank. Editorial selection; introductions arranged by concierge."
      />
    </main>
  );
}