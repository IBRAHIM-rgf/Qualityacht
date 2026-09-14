import Image from "next/image";
import EventsHeroPanels from './EventsHeroPanels';
import Link from "next/link";
import CaribbeanEventsMap from "../CaribbeanEventsMap";
import EventsCarousel from "./EventsCarousel";
import { media } from "@/lib/quality-media";
import { CARIBBEAN_EVENTS } from "../caribbean-events";

export const metadata = {
  title: "Caribbean Events | Qualityacht",
  description:
    "54 cultural and nautical events across the Caribbean, 2026-2027 — carnivals, heritage feasts and the great regattas, filterable by island and category.",
};

// ══ Visuels de la page ══
//
// Tous les fichiers ci-dessous existent deja dans le depot et ont ete ouverts et
// controles un par un — jamais choisis d'apres leur nom. Aucune image externe,
// aucun hotlink.
//
// Hero : course au large avec equipage, le visuel evenementiel le plus fort
// disponible localement. Il remplace une vue de drone generique.
const HERO_IMAGE = '/media/quality/boats/gregor-volvo-ocean-race-816438-1920.jpg';

// ══ Illustration editoriale PAR CATEGORIE ══
//
// Remplace l'ancienne attribution par simple modulo d'index, qui posait une
// plage ou un plongeur sur un carnaval au hasard.
//
// ATTENTION : ces images N'ILLUSTRENT PAS l'evenement exact. Ce sont des visuels
// editoriaux choisis pour rester coherents avec la CATEGORIE. Une meme image se
// repete donc sur plusieurs evenements d'une meme categorie — c'est assume, et
// preferable a une correspondance inventee.
const CATEGORY_IMAGES = {
  // Flotte de spinnakers en regate.
  regate: '/media/quality/boats/davor25-regatta-1049741-1920.jpg',
  // Voiliers classiques sous voile.
  voile_traditionnelle: '/media/quality/boats/mackinacdesign-sailing-4945855-1920.jpg',
  // Costume colore et masque peint : registre de fete.
  carnaval: '/images/art-culture/kid-having-fun-jungle-party.jpg',
  // Lieu caribeen anime en soiree.
  musique: '/images/art-culture/x-f-8JPo6SBuZGw-unsplash.jpg',
  // Etal de fruits des Antilles.
  gastronomie: '/media/quality/food/fruits-1440x800.jpg',
  // La Havane : voiture classique, drapeau cubain, arche du quartier chinois.
  patrimoine: '/images/art-culture/louis-renaudineau-79dDz5e_vdE-unsplash.jpg',
  // Jour ferie : pas de photo d'evenement, on reste sur une vue d'ile neutre.
  ferie: '/media/quality/aerial/golden-pearvilla-wzj0ewkvche-unsplash.jpg',
};

const IMAGE_NEUTRE = CATEGORY_IMAGES.ferie;

// Evenements CARAIBES uniquement (54). Les donnees — nom, date, lieu, coords,
// description, confiance — ne sont PAS touchees : on ajoute seulement `img`.
const CARIB_EVENTS = CARIBBEAN_EVENTS.map((e) => ({
  ...e,
  img: CATEGORY_IMAGES[e.category] || IMAGE_NEUTRE,
}));

// Page Caraibes (ex-/events, deplacee ici : /events est desormais la landing
// multi-destinations). La page = hero drone + marquee + planisphere filtrable.
export default function EventsCaribbeanPage() {
  return (
    <main>
      {/* ══ HERO : TROIS PANNEAUX ══
          Seul le fond change : sur-titre, H1, sous-titre et les deux CTA sont
          strictement conserves, et rien sous le hero n'est touche. */}
      <section className="relative pt-[70px] md:pt-0 bg-[#04070D]">
        <EventsHeroPanels />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-3/5 bg-gradient-to-t from-[#26272a] via-[#26272a]/70 to-transparent" />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-end text-center px-6 pb-8 md:pb-12">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#B87333] mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">Caribbean · Cultural & Nautical Calendar</p>
          <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">Exclusive Event Experiences</h1>
          <div className="relative w-28 md:w-40 h-5 mt-4"><Image src="/images/title-line.png" alt="" fill className="object-contain" /></div>
          <p className="mt-3 text-[13px] text-[#8b90a0] uppercase tracking-[0.14em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">Carnivals · Regattas · Heritage · Music</p>

          {/* Parcours depuis le hero : la flotte d'un cote, la prise de contact de
              l'autre. Style CTA deja valide sur les autres pages. */}
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/yachts?destination=caribbean" className="inline-flex min-h-[48px] max-w-full items-center justify-center text-center px-8 py-3.5 rounded-full border border-[#C0C0C0] bg-[#26272a] text-[13px] font-semibold uppercase tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]">
              Explore Event Charters
            </Link>
            <Link href="/#contact" className="inline-flex min-h-[48px] max-w-full items-center justify-center text-center px-8 py-3.5 rounded-full border border-[#C0C0C0] bg-[#26272a]/50 backdrop-blur-sm text-[13px] font-semibold uppercase tracking-[0.18em] text-[#C0C0C0] transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_18px_rgba(194,98,42,0.35)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]">
              Plan Your Event
            </Link>
          </div>
        </div>
      </section>

      {/* Carrousel : SOUS le hero, jamais par-dessus. Il vit dans son propre
          fichier (./EventsCarousel) et porte lui-meme le fondu qui relie le
          hero au contenu de la page. Demande client 2026-09-14. */}
      <div className="relative z-10">
        <EventsCarousel />
      </div>

      {/* Carte -> filtres (secteur + categorie) -> cards evenements, tout regroupe */}
      <CaribbeanEventsMap
        items={CARIB_EVENTS}
        kicker="Across The Islands"
        title="The Caribbean Events Calendar"
        intro="From island carnivals and heritage feasts to the great regattas — 54 cultural and nautical events across the Caribbean, 2026–2027. Editorial selection; some dates are estimated and confirmed by concierge before travel."
      />
    </main>
  );
}
