// ══ /sport-fishing ══
//
// Remplace l'ancienne page d'attente, illustree par une photo d'aquarium et une
// phrase generique. Reconstruite directement ici : le composant partage
// Text4Images2Section n'est plus utilise par cette route, ses autres
// consommateurs restent intacts.
//
// AUCUNE espece, zone ou reglementation n'est ajoutee ici : tout ce qui est
// factuel vient de fishing-zones.js, sourcee et tracee dans
// docs/research/fishing-zones-sources.md. Le texte ci-dessous ne promet ni
// prise, ni saison, ni disponibilite.

import Image from 'next/image';
import Link from 'next/link';
import FishingZonesMap from './FishingZonesMap';
import { FISHING_ZONES } from './fishing-zones';

export const metadata = {
  title: 'Sport Fishing | Qualityacht',
  description:
    'Offshore and inshore fishing grounds across the Caribbean, reached by private charter — planned with Qualityacht and local licensed professionals.',
};

// Visuel local deja present dans le depot. Aucune image n'a ete telechargee.
const HERO_IMAGE = '/media/quality/boats/pexels-frans-van-heerden-201846-625418.jpg';

const FOCUS =
  'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]';

const CTA_CUIVRE =
  'inline-flex min-h-[48px] max-w-full items-center justify-center text-center px-8 py-3.5 ' +
  'rounded-full border border-[#C0C0C0] bg-[#26272a] text-[13px] font-semibold uppercase ' +
  'tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] ' +
  'transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] ' +
  'hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] ' + FOCUS;

const CTA_ARGENT =
  'inline-flex min-h-[48px] max-w-full items-center justify-center text-center px-8 py-3.5 ' +
  'rounded-full border border-[#C0C0C0] bg-[#26272a]/50 backdrop-blur-sm text-[13px] font-semibold ' +
  'uppercase tracking-[0.18em] text-[#C0C0C0] transition-[border-color,box-shadow] duration-300 ' +
  'hover:border-[#c2622a] hover:shadow-[0_0_18px_rgba(194,98,42,0.35)] ' + FOCUS;

// Les trois axes demandes. Rien de reglementaire, aucun quota, aucune licence,
// aucune saison garantie, aucun taux de capture, aucun prix, aucune promesse de
// disponibilite, aucun partenaire non confirme.
const PRESTATIONS = [
  {
    titre: 'Blue-Water Pursuits',
    texte:
      'The shelf falls away within reach of most anchorages. Offshore days are run from a boat set up for open water, with crew who know how far out is worth going that morning.',
  },
  {
    titre: 'Flats & Coastal Fishing',
    texte:
      'Shallow banks fished on foot or from a skiff, and reef edges within sight of the yacht. Quieter days, closer in, often the ones guests remember.',
  },
  {
    titre: 'Yacht-Supported Expeditions',
    texte:
      'Fishing as one part of a charter rather than the whole of it: the yacht moves with you, and the day is built around where you want to be at dawn.',
  },
];

export default function SportFishingPage() {
  const zones = FISHING_ZONES.length;

  return (
    <main className="bg-[#26272a] text-[#acb0cd]">
      {/* ══ HERO ══ */}
      <section className="relative w-full h-[62vh] min-h-[440px] md:h-[78vh] overflow-hidden bg-[#26272a]">
        <Image
          src={HERO_IMAGE}
          alt="Motor yacht under way on open water"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center max-md:object-[58%_50%]"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(38,39,42,0.50) 0%, rgba(38,39,42,0.20) 32%, rgba(38,39,42,0.72) 60%, rgba(38,39,42,0.96) 100%)',
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-10 md:pb-16">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.32em] text-[#B87333] mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
            Caribbean · Tailored Sport Fishing
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Sport Fishing Charters
          </h1>
          <p className="mt-5 max-w-2xl text-sm md:text-base leading-relaxed text-[#acb0cd] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            From blue-water pursuits to shallow flats, Qualityacht coordinates private fishing days and
            yacht-supported itineraries throughout the Caribbean.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/yachts?destination=caribbean" className={CTA_CUIVRE}>
              Explore the Caribbean Fleet
            </Link>
            <Link href="/#contact" className={CTA_ARGENT}>
              Plan Your Fishing Charter
            </Link>
          </div>
        </div>
      </section>

      {/* ══ CE QUE NOUS ORGANISONS ══ */}
      <section className="px-6 md:px-14 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-[#B87333] font-medium mb-2">
              How It Works
            </p>
            <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">
              Arranged, Not Improvised
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {PRESTATIONS.map((p) => (
              <article
                key={p.titre}
                className="rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32] p-7 flex flex-col"
              >
                <span aria-hidden className="h-1 w-1 rounded-full bg-[#c2622a] mb-5" />
                <h3 className="trajan-regular text-lg md:text-xl uppercase tracking-[0.08em] text-[#C0C0C0] leading-snug">
                  {p.titre}
                </h3>
                <p className="mt-4 text-[13px] md:text-[14px] leading-relaxed text-[#acb0cd]">{p.texte}</p>
              </article>
            ))}
          </div>

          <p className="mt-10 max-w-3xl mx-auto text-center text-[12px] leading-relaxed text-[#8b90a0]">
            The map below shows {zones} grounds across the Caribbean, each documented from an official
            source. Nothing here is a guarantee of a catch, and local rules are confirmed before departure.
          </p>
        </div>
      </section>

      {/* ══ CARTE DES ZONES ══
          Composant et donnees strictement inchanges. Le titre et l'introduction
          demandes avant la carte existent deja dans le composant — « Grounds Across
          The Islands » / « Caribbean Fishing Zones » — sur le meme fond #26272a,
          donc sans rupture. En ajouter un second aurait fait doublon. */}
      <FishingZonesMap />

      {/* ══ CTA FINAL ══ */}
      <section className="px-6 md:px-14 pb-20 md:pb-28">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-[#B87333] font-medium mb-3">
            Tailored Around Your Day at Sea
          </p>
          <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">
            Tell Us How You Want to Fish
          </h2>
          <p className="mt-5 text-[13px] md:text-base leading-relaxed text-[#acb0cd]">
            Share your preferred waters, group size and style of fishing. Our team will help shape the
            right private experience.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact" className={CTA_CUIVRE}>
              Speak to Our Team
            </Link>
            <Link href="/yachts?destination=caribbean" className={CTA_ARGENT}>
              Explore the Fleet
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
