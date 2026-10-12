// /events/bahamas — Events Bahamas (client 2026-10-12), calquee sur /events/caribbean :
// meme hero (photo fournie par le client, sur-titre, titre, sous-titre, 2 boutons).
// + carrousel photos (client 2026-10-12). Le calendrier des evenements sera ajoute quand le client aura fourni la liste.
import Image from "next/image";
import Link from "next/link";
import EventsCarousel from "../caribbean/EventsCarousel";
import CaribbeanEventsMap from "../CaribbeanEventsMap";
import { BAHAMAS_EVENTS, BAHAMAS_SECTORS } from "./bahamas-events";

export const metadata = {
  title: "Bahamas Events | Qualityacht",
};

const HERO = "/media/client/2026-10-12/events-bahamas-hero.webp";

// Carrousel (client 2026-10-12) : meme composant que /events/caribbean, photos
// fournies par le client dans l'ordre recu, fichiers non recadres (cadrage a l'affichage).
const CD = "/media/client/2026-10-12/events-bahamas-carousel";
const CAROUSEL = [
  { src: `${CD}/evb-01.jpg`, alt: "Junkanoo dancer in a costume decorated with billiard balls" },
  { src: `${CD}/evb-02.jpg`, alt: "Silhouette kicking up sea spray at sunset" },
  { src: `${CD}/evb-03.jpg`, alt: "Queen conch shells on display" },
  { src: `${CD}/evb-04.jpg`, alt: "Street drummer playing a snare drum" },
  { src: `${CD}/evb-05.jpg`, alt: "Keyboard player and microphone at an open-air concert" },
  { src: `${CD}/evb-06.jpg`, alt: "Sportfishing yacht at sunset" },
  { src: `${CD}/evb-07.jpg`, alt: "Nurse sharks gliding in turquoise shallows" },
  { src: `${CD}/evb-08.jpg`, alt: "Freediver swimming among sharks in open water" },
  { src: `${CD}/evb-09.jpg`, alt: "Carnival guest in a feathered straw hat" },
  { src: `${CD}/evb-10.jpg`, alt: "Friends laughing on a beach volleyball court" },
  { src: `${CD}/evb-11.jpg`, alt: "Beachfront dinner table set with red roses" },
  { src: `${CD}/evb-12.jpg`, alt: "Colorful water slide tower under a blue sky" },
  { src: `${CD}/evb-13.jpg`, alt: "Night beach volleyball under floodlights" },
];

// Calendrier (client 2026-10-12), calque sur /events/caribbean : une photo par
// categorie, prise parmi les photos du carrousel (choix du client).
const CATEGORY_IMAGES = {
  carnaval: `${CD}/evb-01.jpg`,
  voile: `${CD}/evb-06.jpg`,
  gastronomie: `${CD}/evb-03.jpg`,
  musique: `${CD}/evb-04.jpg`,
  peche: `${CD}/evb-06.jpg`,
  plongee: `${CD}/evb-08.jpg`,
  sport: `${CD}/evb-10.jpg`,
  lifestyle: `${CD}/evb-11.jpg`,
  patrimoine: `${CD}/evb-09.jpg`,
};
const EVENTS = BAHAMAS_EVENTS.map((e) => ({ ...e, img: CATEGORY_IMAGES[e.category] }));

export default function EventsBahamasPage() {
  return (
    <main>
      <section className="relative pt-[70px] md:pt-0 overflow-hidden h-[60vh] md:h-[82vh] bg-[#26272a]">
        <style>{`
          .events-hero-zoom { animation: eventsHeroZoom 9s ease-in-out infinite alternate; will-change: transform; }
          @keyframes eventsHeroZoom { from { transform: scale(1); } to { transform: scale(1.15); } }
          @media (prefers-reduced-motion: reduce) { .events-hero-zoom { animation: none !important; } }
        `}</style>
        <Image src={HERO} alt="Exclusive Event Experiences" fill priority sizes="100vw" className="object-cover object-center saturate-[1.4] contrast-[1.1] brightness-[1.03] events-hero-zoom" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-3/5 bg-gradient-to-t from-[#26272a] via-[#26272a]/70 to-transparent" />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-end text-center px-6 pb-8 md:pb-12">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#B87333] mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">Bahamas · Cultural & Nautical Calendar</p>
          <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">Exclusive Event Experiences</h1>
          <div className="relative w-28 md:w-40 h-5 mt-4"><Image src="/images/title-line.png" alt="" fill className="object-contain" /></div>
          <p className="mt-3 text-[13px] text-[#8b90a0] uppercase tracking-[0.14em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">Carnivals · Regattas · Heritage · Music</p>

          {/* Parcours depuis le hero : la flotte d'un cote, la prise de contact de
              l'autre. Style CTA deja valide sur les autres pages. */}
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/yachts?destination=bahamas" className="inline-flex min-h-[48px] max-w-full items-center justify-center text-center px-8 py-3.5 rounded-full border border-[#C0C0C0] bg-[#26272a] text-[13px] font-semibold uppercase tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]">
              Explore Event Charters
            </Link>
            <Link href="/contact" className="inline-flex min-h-[48px] max-w-full items-center justify-center text-center px-8 py-3.5 rounded-full border border-[#C0C0C0] bg-[#26272a]/50 backdrop-blur-sm text-[13px] font-semibold uppercase tracking-[0.18em] text-[#C0C0C0] transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_18px_rgba(194,98,42,0.35)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]">
              Plan Your Event
            </Link>
          </div>
        </div>
      </section>

      {/* Carrousel SOUS le hero, comme sur /events/caribbean. */}
      <div className="relative z-10">
        <EventsCarousel photos={CAROUSEL} label="Bahamas events in pictures" />
      </div>

      {/* Carte -> filtres (groupe d'iles + categorie) -> cards, comme Caraibes. */}
      <CaribbeanEventsMap
        items={EVENTS}
        sectorList={BAHAMAS_SECTORS}
        center={[24.6, -76.8]}
        zoom={6}
        kicker="Across The Islands"
        title="The Bahamas Event Calendar"
        intro="Follow the rhythm of the islands through regattas, Junkanoo, culinary traditions, music and sport."
      />
    </main>
  );
}
