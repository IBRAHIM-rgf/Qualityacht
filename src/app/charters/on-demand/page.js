// ══ /charters/on-demand ══
//
// La page n'affichait que le composant partage ItemsGrid avec la liste des
// destinations. Elle est reconstruite ici avec des composants locaux :
// ItemsGrid n'est plus utilise par cette route et reste intact pour ses dix
// autres consommateurs.
//
// HERO : media PROVISOIRE. Les quatre videos citees par la cliente ne sont pas
// dans le depot et l'ordre demande reste ambigu. Le hero utilise donc l'image
// locale actuelle, et la constante ci-dessous suffira a basculer sur une video
// une fois celle-ci fournie et validee.
//
// Regle editoriale : aucune experience n'est garantie. Les formulations
// « subject to availability », « where permissions allow », etc. sont
// volontaires et ne doivent pas etre retirees.

import Image from 'next/image';
import Link from 'next/link';
import UniverseSelector from './UniverseSelector';

export const metadata = {
  title: 'On-Demand Charter | Qualityacht',
  description:
    'A yacht as the starting point, not the destination — encounters, adventures and creative projects shaped around what you actually want.',
};

// Media du hero. A remplacer par la video validee le moment venu.
const HERO_MEDIA = '/images/charters/on-demande.png';

// Photos fournies par la cliente, deja optimisees en WebP dans le depot.
const IMG_AVENTURE = '/media/client/lydie/2026-08-25/on-demand/local-adventure.webp';
const IMG_RENCONTRE = '/media/client/lydie/2026-08-25/on-demand/cultural-encounter.webp';

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

// Trois blocs d'inspiration. Le troisieme n'a pas de photo : le depot n'en
// contient que deux pour cette page, et une image detournee vaudrait moins
// qu'un bloc typographique assume.
const BLOCS = [
  {
    titre: 'Local Encounters',
    texte:
      'A photographer who knows the light here, a family that has cooked the same dish for three generations, a musician who plays where no one films. We look for the people worth an evening — subject to availability and to their saying yes.',
    image: IMG_RENCONTRE,
    alt: 'A photographer at work during a cultural encounter',
    position: 'object-center',
  },
  {
    titre: 'Adventure & Exploration',
    texte:
      'Water you reach on foot after an hour of walking, a coastline seen from the tender at first light. What is possible depends on the location and on local regulations, and our team will assess feasibility before anything is promised.',
    image: IMG_AVENTURE,
    alt: 'Lush natural landscape with access to water',
    position: 'object-center',
  },
  {
    titre: 'Creative Experiences',
    texte:
      'A shoot, a recording, a project that needs a place no one else has booked. Tell us what you are making and we will look at what can be arranged, where permissions allow.',
    image: null,
    alt: '',
    position: '',
  },
];

export default function OnDemandCharterPage() {
  return (
    <main className="bg-[#26272a] text-[#acb0cd]">
      {/* ══ HERO ══ */}
      <section className="relative w-full h-[70vh] min-h-[520px] md:h-[86vh] overflow-hidden bg-[#26272a]">
        <Image
          src={HERO_MEDIA}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Voile sombre neutre, uniquement pour la lisibilite. Aucun bleu. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(38,39,42,0.55) 0%, rgba(38,39,42,0.28) 26%, rgba(38,39,42,0.76) 62%, rgba(38,39,42,0.97) 100%)',
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-10 md:pb-16">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.32em] text-[#B87333] mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
            On-Demand Charter
          </p>
          <h1 className="trajan-regular text-2xl md:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[#C0C0C0] leading-tight max-w-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            Not Just a Yacht. A Story You Could Not Have Lived Any Other Way.
          </h1>
          <p className="mt-5 max-w-2xl text-sm md:text-base leading-relaxed text-[#acb0cd] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Tell us what moves you. We will shape the yacht, the setting and the people around an
            experience designed entirely for you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/request-quote" className={CTA_CUIVRE}>
              Create My Impossible Charter
            </Link>
            <Link href="/yachts" className={CTA_ARGENT}>
              Explore the Fleet
            </Link>
          </div>
        </div>
      </section>

      {/* ══ LE CONCEPT ══ */}
      <section className="px-6 md:px-14 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-[#B87333] font-medium mb-3">
            The Idea
          </p>
          <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">
            The Yacht Is Where It Starts
          </h2>
          <p className="mt-6 text-[14px] md:text-base leading-relaxed text-[#acb0cd]">
            Most charters begin with a boat and end with an itinerary. This one begins with what you
            actually want out of the week — the people you would like to meet, the thing you have
            always wanted to try, the project you have been carrying around.
          </p>
          <p className="mt-4 text-[14px] md:text-base leading-relaxed text-[#acb0cd]">
            The yacht then becomes the base: it moves to where the idea lives, rather than the idea
            being squeezed into a route.
          </p>
        </div>
      </section>

      {/* ══ TROIS BLOCS D'INSPIRATION ══ */}
      <section className="px-6 md:px-14 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {BLOCS.map((b) => (
            <article
              key={b.titre}
              className="flex flex-col rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32] overflow-hidden"
            >
              {b.image ? (
                <div className="relative aspect-[3/4] bg-[#26272a]">
                  <Image
                    src={b.image}
                    alt={b.alt}
                    fill
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className={`object-cover ${b.position}`}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[#2e2f32] via-transparent to-transparent"
                  />
                </div>
              ) : (
                <div aria-hidden className="h-2 w-full bg-[#c2622a]/25" />
              )}
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <span aria-hidden className="h-1 w-1 rounded-full bg-[#c2622a] mb-4" />
                <h3 className="trajan-regular text-lg md:text-xl uppercase tracking-[0.08em] text-[#C0C0C0] leading-snug">
                  {b.titre}
                </h3>
                <p className="mt-4 text-[13px] md:text-[14px] leading-relaxed text-[#acb0cd]">{b.texte}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 max-w-3xl mx-auto text-center text-[12px] leading-relaxed text-[#8b90a0]">
          Everything on this page is an inspiration, not an offer. Access, permissions and availability
          are checked case by case, and our team will tell you plainly what can and cannot be arranged.
        </p>
      </section>

      {/* ══ SELECTEUR D'ENVIES ══ */}
      <section className="px-6 md:px-14 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-[#B87333] font-medium mb-2">
              Where To Begin
            </p>
            <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">
              What Are You After?
            </h2>
          </div>
          <UniverseSelector />
        </div>
      </section>

      {/* ══ BLOC FINAL ══ */}
      <section className="px-6 md:px-14 pb-20 md:pb-28">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">
            Your Vision, Shaped at Sea
          </h2>
          <p className="mt-5 text-[13px] md:text-base leading-relaxed text-[#acb0cd]">
            Tell us the idea, however unlikely it sounds. We will come back with what is genuinely
            possible for your dates and your destination.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/request-quote" className={CTA_CUIVRE}>
              Start Your On-Demand Charter
            </Link>
            <Link href="/#contact" className={CTA_ARGENT}>
              Speak to Our Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
