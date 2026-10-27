// /events/north-america — Events North America (PDF client 2026-10-23), calquee sur
// /events/bahamas : meme hero, meme carte + filtres + cards. Pas de carrousel (aucune
// photo fournie) . Hero = photo fournie par le client (2026-10-27).
import Image from "next/image";
import Link from "next/link";
import CaribbeanEventsMap from "../CaribbeanEventsMap";
import { NORTH_AMERICA_EVENTS, NORTH_AMERICA_SECTORS } from "./north-america-events";

export const metadata = {
  title: "North America Events | Qualityacht",
};

const HERO = "/media/client/2026-10-27/events-north-america-hero.jpg";

// Pas de photos fournies dans le PDF : photo provisoire par secteur = photo de la
// case region (page destination North America), en attendant les photos du client.
const C = "/media/client/2026-10-16/north-america-cards";
const SECTOR_IMAGES = {
  "East Coast United States": `${C}/east-coast.jpg`,
  "West Coast United States": `${C}/west-coast.jpg`,
  Canada: `${C}/canada.jpg`,
  Mexico: "/media/client/2026-10-19/north-america-cards/mexico-cenote.jpg",
};
const EVENTS = NORTH_AMERICA_EVENTS.map((e) => ({ ...e, img: SECTOR_IMAGES[e.sector] }));

export default function EventsNorthAmericaPage() {
  return (
    <main>
      {/* HERO (client 2026-10-27) : photo entiere (ratio naturel, sans zoom ni recadrage)
          et titre centre sur la photo ; sur mobile le texte passe sous la photo. */}
      <section className="relative pt-[70px] bg-[#26272a]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={HERO} alt="Exclusive Event Experiences" className="block w-full h-auto saturate-[1.4] contrast-[1.1] brightness-[1.03]" />
        <div className="pointer-events-none hidden md:block absolute inset-x-0 top-[70px] bottom-0 z-10 bg-[#26272a]/35" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/4 bg-gradient-to-t from-[#26272a] to-transparent" />
        <div className="relative md:absolute md:inset-x-0 md:top-[70px] md:bottom-0 z-20 flex flex-col items-center justify-center text-center px-6 py-8 md:py-0">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#B87333] mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">North America · Cultural & Nautical Calendar</p>
          <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">Exclusive Event Experiences</h1>
          <div className="relative w-28 md:w-40 h-5 mt-4"><Image src="/images/title-line.png" alt="" fill className="object-contain" /></div>
          <p className="mt-3 text-[13px] text-[#8b90a0] uppercase tracking-[0.14em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">Carnivals · Regattas · Heritage · Music</p>

          {/* Parcours depuis le hero : la flotte d'un cote, la prise de contact de
              l'autre. Style CTA deja valide sur les autres pages. */}
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/yachts?destination=north-america" className="inline-flex min-h-[48px] max-w-full items-center justify-center text-center px-8 py-3.5 rounded-full border border-[#C0C0C0] bg-[#26272a] text-[13px] font-semibold uppercase tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]">
              Explore Event Charters
            </Link>
            <Link href="/contact" className="inline-flex min-h-[48px] max-w-full items-center justify-center text-center px-8 py-3.5 rounded-full border border-[#C0C0C0] bg-[#26272a]/50 backdrop-blur-sm text-[13px] font-semibold uppercase tracking-[0.18em] text-[#C0C0C0] transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_18px_rgba(194,98,42,0.35)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]">
              Plan Your Event
            </Link>
          </div>
        </div>
      </section>

      {/* Carte -> filtres (secteur + categorie) -> cards, comme Caraibes. */}
      <CaribbeanEventsMap
        items={EVENTS}
        sectorList={NORTH_AMERICA_SECTORS}
        center={[36, -95]}
        zoom={3}
        kicker="Across North America"
        title="The North America Event Calendar"
        intro="Music festivals, carnivals, regattas, culinary gatherings and heritage celebrations across the United States, Canada and Mexico."
      />
    </main>
  );
}
