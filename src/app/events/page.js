import Image from "next/image";
import WorldPinsMap from "@/components/vibe/WorldPinsMap";
import FunMarquee from "@/components/vibe/FunMarquee";
import { media } from "@/lib/quality-media";
import { CARIBBEAN_EVENTS } from "./caribbean-events";

// Hero : VUE DRONE d'ile (image aerienne turquoise) — plus de video fete, plus
// d'evenements hors Caraibes.
const HERO_IMAGE = (media({ cat: "aerial", role: "hero-bg", kind: "image" }).find((m) => (m.tags || []).includes("island"))
  || media({ cat: "aerial", role: "hero-bg", kind: "image" })[0])?.src
  || "/media/quality/aerial/golden-pearvilla-wzj0ewkvche-unsplash.jpg";

// Pool d'images (aerien / plage / divers) pour illustrer les evenements + le marquee.
const IMG_POOL = [
  ...media({ cat: "aerial", kind: "image" }),
  ...media({ cat: "divers", kind: "image" }),
  ...media({ cat: "beach", kind: "image" }),
  ...media({ cat: "boats", kind: "image" }),
].map((m) => m.src);

// Evenements CARAIBES uniquement (54, geocodes par ile depuis le fichier client).
const CARIB_EVENTS = CARIBBEAN_EVENTS.map((e, i) => ({ ...e, img: IMG_POOL[i % IMG_POOL.length] }));

const EVENT_MARQUEE = IMG_POOL.slice(0, 10).map((src, i) => ({ src, accent: i % 2 ? "#ff7a59" : "#2fd6c4" }));

// La section "Tailor-Made Celebrations" (images inexistantes -> icones cassees) a ete
// retiree. La page = hero drone + marquee + planisphere des evenements Caraibes.
export default function EventsPage() {
  return (
    <main>
      {/* ══ HERO : VUE DRONE D'ILE ══ */}
      <section className="relative pt-[70px] md:pt-0 h-[58vh] md:h-[78vh]">
        <Image src={encodeURI(HERO_IMAGE)} alt="Caribbean Events" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#26272a] via-[#26272a]/70 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-8 md:pb-12">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#B87333] mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">Caribbean · Cultural & Nautical Calendar</p>
          <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">Exclusive Event Experiences</h1>
          <div className="relative w-28 md:w-40 h-5 mt-4"><Image src="/images/title-line.png" alt="" fill className="object-contain" /></div>
          <p className="mt-3 text-[13px] text-[#8b90a0] uppercase tracking-[0.14em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">Carnivals · Regattas · Heritage · Music</p>
        </div>
      </section>

      {/* Rouleau d'images + planisphere des evenements Caraibes */}
      <section className="bg-[#26272a] py-10 md:py-14">
        <FunMarquee items={EVENT_MARQUEE} speed={52} direction="left" />
      </section>
      <WorldPinsMap
        items={CARIB_EVENTS}
        center={[15.5, -66]}
        zoom={5}
        kicker="Across The Islands"
        title="The Caribbean Events Calendar"
        intro="From island carnivals and heritage feasts to the great regattas — 54 cultural and nautical events across the Caribbean, 2026–2027. Editorial selection; some dates are estimated and confirmed by concierge before travel."
      />
    </main>
  );
}
