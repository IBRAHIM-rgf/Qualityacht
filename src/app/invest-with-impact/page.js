// ══ /invest-with-impact ══
//
// Remplace l'ancienne page d'attente. Reconstruite directement
// ici : le composant partage Text4Images2Section n'est plus utilise par cette
// route, ce qui laisse ses autres consommateurs (management, sport-fishing,
// luxury-cars-racing) strictement intacts.
//
// Les donnees du partenaire viennent de real-estate/partner-data.js, deja
// valide : rien n'est duplique. AUCUN rendement, pourcentage, plus-value,
// revenu garanti, temoignage ni chiffre non source n'apparait sur cette page.

import Image from 'next/image';
import Link from 'next/link';
import { MARKETS, PARTNER, QUALITYACHT } from '../real-estate/partner-data';

export const metadata = {
  title: 'Invest With Impact | Qualityacht',
  description:
    'Tangible assets, curated opportunities and a long-term perspective — international real-estate introductions arranged by Qualityacht with its specialist partner.',
};

// Visuel local, deja present et documente dans docs/research/gustave-immo-assets.md.
const HERO_IMAGE = '/images/partners/gustave-immo/piazza-roma-valencia.webp';

const FOCUS =
  'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]';

const CTA_CUIVRE =
  'inline-flex min-h-[48px] max-w-full items-center justify-center text-center px-8 py-3.5 ' +
  'rounded-full border border-[#C0C0C0] bg-[#26272a] text-[14px] font-semibold uppercase ' +
  'tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] ' +
  'transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] ' +
  'hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] ' + FOCUS;

const CTA_ARGENT =
  'inline-flex min-h-[48px] max-w-full items-center justify-center text-center px-8 py-3.5 ' +
  'rounded-full border border-[#C0C0C0] bg-[#26272a]/50 backdrop-blur-sm text-[14px] font-semibold ' +
  'uppercase tracking-[0.18em] text-[#C0C0C0] transition-[border-color,box-shadow] duration-300 ' +
  'hover:border-[#c2622a] hover:shadow-[0_0_18px_rgba(194,98,42,0.35)] ' + FOCUS;

const PRINCIPES = [
  {
    titre: 'Curated Opportunities',
    texte:
      'We do not publish a catalogue. Each opportunity reaches you because it has been examined first, and because it fits what you told us you were looking for.',
  },
  {
    titre: 'Tangible Assets',
    texte:
      'Property you can visit, walk through and hold in your own name. Our focus is on real, physical assets rather than financial products.',
  },
  {
    titre: 'Long-Term Perspective',
    texte:
      'We work on the assumption that you are building something to keep. Decisions are discussed calmly, with the time they deserve.',
  },
];

export default function InvestWithImpactPage() {
  const marches = MARKETS.map((m) => m.name).join(' · ');

  return (
    <main className="bg-[#26272a] text-[#acb0cd]">
      {/* ══ HERO ══ */}
      <section className="relative w-full h-[62vh] min-h-[440px] md:h-[76vh] overflow-hidden bg-[#26272a]">
        <Image
          src={HERO_IMAGE}
          alt="Aerial view of a residential development at night"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(38,39,42,0.55) 0%, rgba(38,39,42,0.28) 30%, rgba(38,39,42,0.72) 52%, rgba(38,39,42,0.88) 74%, rgba(38,39,42,0.97) 100%)',
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-10 md:pb-16">
          <p className="text-[12px] md:text-[13px] uppercase tracking-[0.32em] text-[#B87333] font-semibold mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
            Qualityacht · Investment
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Invest With Impact
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] md:text-base font-medium leading-[1.75] text-[#acb0cd] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Tangible assets, chosen one by one, held for the long term — and someone alongside you
            from the first conversation to the keys.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/real-estate" className={CTA_CUIVRE}>
              Explore Real Estate Opportunities
            </Link>
            <Link href="/#contact" className={CTA_ARGENT}>
              Speak to Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* ══ PRINCIPES ══ */}
      <section className="px-6 md:px-14 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[12px] md:text-[13px] uppercase tracking-[0.24em] text-[#B87333] font-semibold mb-2">
              How We Work
            </p>
            <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">
              Three Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {PRINCIPES.map((p) => (
              <article
                key={p.titre}
                className="rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32] p-7 flex flex-col"
              >
                <span aria-hidden className="h-1 w-1 rounded-full bg-[#c2622a] mb-5" />
                <h3 className="trajan-regular text-lg md:text-xl uppercase tracking-[0.08em] text-[#C0C0C0] leading-snug">
                  {p.titre}
                </h3>
                <p className="mt-4 text-[15px] md:text-base leading-[1.75] text-[#acb0cd]">{p.texte}</p>
              </article>
            ))}
          </div>

          <p className="mt-10 max-w-3xl mx-auto text-center text-[14px] leading-[1.7] text-[#8b90a0]">
            Nothing on this page is an offer, a forecast or investment advice. Every opportunity is
            presented individually, with its own documentation, and discussed with you before anything
            is decided.
          </p>
        </div>
      </section>

      {/* ══ PARTENAIRE ══ */}
      <section className="px-6 md:px-14 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto rounded-2xl border border-[#C0C0C0]/25 bg-[#2e2f32] p-8 md:p-10 text-center">
          <p className="text-[12px] md:text-[13px] uppercase tracking-[0.24em] text-[#B87333] font-semibold">
            In Partnership with {PARTNER.name}
          </p>
          <a
            href={PARTNER.site}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${PARTNER.name} — opens in a new tab`}
            className={`mt-7 inline-flex min-h-[48px] items-center justify-center rounded-xl border border-[#C0C0C0]/40 bg-[#26272a] px-7 py-5 transition-colors hover:border-[#c2622a] ${FOCUS}`}
          >
            {/* logo-wordmark.webp : meme fichier recadre de son vide (le carre
                420x420 n'etait rempli qu'a 24%). Ratio 416x118 conserve, donc
                180px de large sur mobile et 240px a partir de md, sans
                deformation ni recoloration. */}
            <Image
              src={PARTNER.logoWordmark}
              alt={PARTNER.name}
              width={416}
              height={118}
              className="w-[180px] md:w-[240px] h-auto object-contain"
            />
          </a>
          <p className="mt-7 text-[15px] md:text-base font-medium leading-[1.75] text-[#acb0cd]">
            {PARTNER.name} is our international real-estate partner. Their work covers{' '}
            <span className="text-[#C0C0C0]">{marches}</span>, and it is through them that the
            opportunities presented on this site are sourced.
          </p>
          <p className="mt-4 text-[14px] leading-[1.7] text-[#8b90a0]">
            Your enquiry stays with Qualityacht — {QUALITYACHT.email} · {QUALITYACHT.phone}.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/real-estate" className={CTA_CUIVRE}>
              Discover Real Estate
            </Link>
            <a href={PARTNER.site} target="_blank" rel="noopener noreferrer" className={CTA_ARGENT}>
              Visit {PARTNER.name}
            </a>
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL ══ */}
      <section className="px-6 md:px-14 pb-20 md:pb-28">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">
            Ready When You Are
          </h2>
          <p className="mt-5 text-[15px] md:text-base font-medium leading-[1.75] text-[#acb0cd]">
            Tell us what you are trying to build. We will tell you honestly whether we can help.
          </p>
          <Link href="/#contact" className={`${CTA_CUIVRE} mt-8`}>
            Discuss Your Investment Goals
          </Link>
        </div>
      </section>
    </main>
  );
}
