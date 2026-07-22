import Image from 'next/image';
import ArtCultureLateral from './ArtCultureLateral';

export const metadata = {
  title: 'Art & Culture — Caribbean v2 | Qualityacht',
  description:
    'Caribbean art and culture presented in a Mamounia-style lateral showcase: ART and CULTURE, sub-region by sub-region.',
};

// v2 de /art-culture/caribbean, dans l'esprit de mamounia.com/fr : meme hero + texte
// que la v1, mais les 2 cards (survol) sont remplacees par un SLIDE LATERAL (galerie
// horizontale qui defile au scroll) a 2 panneaux ART et CULTURE.
const HERO_IMAGE = '/images/art-culture/louis-renaudineau-79dDz5e_vdE-unsplash.jpg';

const HERO_TEXT =
  'A rarefied expression of Caribbean art and culture, curated for the most discerning clientele.';

export default function CaribbeanArtCultureV2Page() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      {/* HERO (identique a la v1 : taxi cubain, cadrage bas, couleurs vives, voile
          floute derriere le titre) */}
      <section className="relative pt-[70px] md:pt-0 h-[58vh] md:h-[78vh]">
        <Image
          src={encodeURI(HERO_IMAGE)}
          alt="Art & Culture — Caribbean"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom saturate-[1.4] contrast-[1.1] brightness-[1.03]"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#26272a]/85 via-[#26272a]/35 to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-28 md:pb-48">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-x-12 -inset-y-6 md:-inset-x-24 md:-inset-y-10 rounded-[50%] bg-[#26272a]/70 blur-2xl"
            />
            <div className="relative flex flex-col items-center">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#B87333] mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                Caribbean · Private Client Edition
              </p>
              <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                Art &amp; Culture
              </h1>
              <div className="relative w-28 md:w-40 h-5 mt-4">
                <Image src="/images/title-line.png" alt="" fill className="object-contain" />
              </div>
              <p className="mt-3 text-[13px] text-[#8b90a0] uppercase tracking-[0.14em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                Museums · Galleries · Exhibitions — Carnivals · Festivals · Seasons
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEXTE SOUS LE HERO */}
      <div className="px-6 md:px-14 pt-12 md:pt-16">
        <p className="max-w-3xl mx-auto text-center text-base md:text-lg leading-relaxed text-[#acb0cd]">
          {HERO_TEXT}
        </p>
      </div>

      {/* SLIDE LATERAL facon Mamounia (2 panneaux ART / CULTURE) */}
      <ArtCultureLateral />
    </div>
  );
}
