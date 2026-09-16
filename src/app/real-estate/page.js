import Image from 'next/image';
import RealEstateMap from './RealEstateMap';
import ProgrammeGrid from './ProgrammeGrid';
import { MARKETS, PARTNERS, QUALITYACHT, whatsappFor } from './partner-data';

export const metadata = {
  title: 'Real Estate | Qualityacht',
  description:
    'International real-estate opportunities introduced by Qualityacht through its selected partners — Dubai, Marrakech, Batumi and Monaco.',
};

// Photo hero fournie par le client (2026-09-15) — verticale, montree entiere.
const HERO_IMAGE = '/media/client/lydie/2026-09-15/real-estate/hero-cliff-night.jpg';

const FOCUS =
  'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]';

const CTA_CUIVRE =
  'inline-flex min-h-[48px] max-w-full items-center justify-center text-center px-8 py-3.5 ' +
  'rounded-full border border-[#C0C0C0] bg-[#26272a] text-[15px] font-semibold uppercase ' +
  'tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] ' +
  'transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] ' +
  'hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] ' + FOCUS;

const CTA_ARGENT =
  'inline-flex min-h-[48px] max-w-full items-center justify-center text-center px-8 py-3.5 ' +
  'rounded-full border border-[#C0C0C0] bg-[#26272a]/50 text-[15px] font-semibold uppercase ' +
  'tracking-[0.18em] text-[#C0C0C0] transition-[border-color,box-shadow] duration-300 ' +
  'hover:border-[#c2622a] hover:shadow-[0_0_18px_rgba(194,98,42,0.35)] ' + FOCUS;

// Marrakech et Batumi : aucun programme individuel n'est confirme, on ne montre
// donc que le marche et les deux portes d'entree. Monaco en est exclu — il a son
// propre partenaire et apparait dans la grille partenaires et sur la carte.
const AUTRES_MARCHES = MARKETS.filter(
  (m) => m.id !== 'dubai' && m.partnerIds.includes('gustave-immo')
);

export default function RealEstatePage() {
  return (
    <main className="bg-[#26272a] text-[#acb0cd]">
      {/* HERO — cadre 1400 x 900 px sur desktop. La photo est verticale : elle
          est montree ENTIERE (object-contain, calee a droite). Le cote texte
          est un aplat #26272A, demande par le client. Aucun rognage. */}
      <section className="relative mx-auto max-w-[1400px] pt-[70px] md:pt-0 h-[70vh] min-h-[460px] lg:h-[900px] bg-[#26272a] overflow-hidden">
        {/* Premier plan : la photo ENTIERE, nette, calee a droite. Elle est
            placee SOUS l'en-tete fixe du site, sinon celui-ci recouvrait le
            haut de l'image (le yacht disparaissait). */}
        <div className="absolute left-0 right-0 top-[70px] bottom-0">
          <Image
            src={HERO_IMAGE}
            alt="Cliffside villa lit at night above the sea, with a yacht passing offshore"
            fill
            priority
            sizes="100vw"
            className="object-contain object-right"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-start justify-center text-left px-6 md:px-14">
          <div className="max-w-xl">
            {/* Trait lumineux : se deploie de gauche a droite, il ouvre la sequence. */}
            <span aria-hidden className="reRule" />
            <p className="reEyebrow text-sm md:text-base uppercase tracking-[0.35em] text-[#B87333] mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              A Global Portfolio
            </p>
            {/* Titre en trois lignes : chaque ligne remonte de sous son masque. */}
            <h1 className="reTitle trajan-regular text-3xl md:text-5xl lg:text-[3.35rem] uppercase tracking-[0.08em] text-[#C0C0C0] leading-[1.15] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              <span className="reLine"><span>Real Estate &amp;</span></span>
              <span className="reLine"><span>Private</span></span>
              <span className="reLine"><span>Residences</span></span>
            </h1>
            <p className="reSub mt-6 text-[15px] md:text-lg font-medium leading-[1.8] text-[#acb0cd] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              From yacht to residence: one private office for your life between sea and shore.
            </p>
          </div>
        </div>
        {/* Sequence d'apparition, en CSS pur (aucune librairie, aucun JS) : les
            retards d'animation reproduisent exactement le sequencage demande —
            trait 0ms, sur-titre 150ms, lignes du titre 450ms + 180ms chacune,
            sous-titre juste apres la derniere ligne. */}
        <style>{`
          .reRule {
            display: block;
            width: 46px;
            height: 1px;
            margin-bottom: 22px;
            background: #B87333;
            transform: scaleX(0);
            transform-origin: left;
            animation: reGrowLine 0.7s ease-out 0s forwards;
          }
          .reEyebrow, .reSub {
            opacity: 0;
            transform: translateY(8px);
          }
          .reEyebrow { animation: reFadeUp 0.9s cubic-bezier(.2,.7,.3,1) 0.15s forwards; }
          .reSub     { animation: reFadeUp 1s   cubic-bezier(.2,.7,.3,1) 1.24s forwards; }
          /* Le masque de chaque ligne deborde legerement au-dessus et en dessous
             du corps de texte : les hauts de lettres (le S, le R...) et les
             jambages ne sont plus rognes par overflow: hidden. La marge
             negative annule ce debord pour garder l'interligne d'origine. */
          .reLine {
            display: block;
            overflow: hidden;
            padding: 0.18em 0.08em 0.12em 0;
            margin-top: -0.18em;
            margin-bottom: -0.12em;
          }
          .reLine > span {
            display: inline-block;
            opacity: 0;
            transform: translateY(125%);
            animation: reRiseIn 1s cubic-bezier(.2,.8,.2,1) forwards;
          }
          .reLine:nth-child(1) > span { animation-delay: 0.45s; }
          .reLine:nth-child(2) > span { animation-delay: 0.63s; }
          .reLine:nth-child(3) > span { animation-delay: 0.81s; }
          @keyframes reGrowLine { to { transform: scaleX(1); } }
          @keyframes reFadeUp   { to { opacity: 1; transform: translateY(0); } }
          @keyframes reRiseIn   { to { opacity: 1; transform: translateY(0); } }
          @media (prefers-reduced-motion: reduce) {
            .reRule, .reEyebrow, .reSub, .reLine > span {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}</style>
      </section>

      {/* ══ GRILLE DES PARTENAIRES ══
          Structure evolutive : la grille se remplit depuis PARTNERS, donc les
          futurs partenaires Monaco n'exigeront aucune retouche de ce fichier.
          Aucune brochure, aucun programme et aucun prix n'est affiche pour un
          partenaire qui n'en a pas de confirme. */}
      <section className="px-6 md:px-14 pt-14 md:pt-20 pb-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm md:text-base uppercase tracking-[0.24em] text-[#B87333] font-semibold">
              Our Real Estate Partners
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-[15px] md:text-base font-medium leading-[1.75] text-[#acb0cd]">
              Qualityacht introduces clients to selected partners. Every enquiry is handled by
              Qualityacht — {QUALITYACHT.email} · {QUALITYACHT.phone}.
            </p>
          </div>

          {/* Deux colonnes seulement a partir de lg : a 768px, deux CTA cote a
              cote dans une demi-largeur debordaient de 2px. */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {PARTNERS.map((partenaire) => (
              <article
                key={partenaire.id}
                className="rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32] p-7 flex flex-col text-center"
              >
                {/* La plaque suit la couleur du logo, jamais l'inverse : aucun
                    logo n'est recolore. Gustave a un wordmark blanc (plaque
                    sombre) ; BNBRICKEYS est pour moitie gris tres sombre
                    (#3a3a3a, soit 1,18:1 sur nos fonds) et exige une plaque
                    claire. La plaque n'affecte que la boite du logo. */}
                <div
                  className={`flex items-center justify-center rounded-xl px-6 py-5 min-h-[104px] ${
                    partenaire.logoPlate === 'light'
                      ? 'bg-[#f4f4f4]'
                      : 'bg-[#26272a] border border-[#C0C0C0]/25'
                  }`}
                >
                  <Image
                    src={partenaire.logoWordmark}
                    alt={partenaire.name}
                    width={partenaire.logoWidth}
                    height={partenaire.logoHeight}
                    className="w-[180px] md:w-[240px] h-auto object-contain"
                  />
                </div>

                <p className="mt-6 text-[15px] md:text-base font-medium leading-[1.75] text-[#acb0cd] flex-1">
                  {partenaire.type}.
                </p>
                <p className="mt-3 text-[15px] md:text-base uppercase tracking-[0.14em] text-[#C0C0C0]">
                  {partenaire.markets.join(' · ')}
                </p>

                <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
                  <a
                    href={partenaire.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${partenaire.name} — opens in a new tab`}
                    className={CTA_CUIVRE}
                  >
                    Visit Partner
                  </a>
                  <a
                    href={whatsappFor(`${partenaire.name} real estate`, partenaire.markets[0])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={CTA_ARGENT}
                  >
                    Contact Qualityacht
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CARTE DES MARCHES ══ */}
      <RealEstateMap />

      {/* ══ PROGRAMMES DUBAI ══ */}
      <ProgrammeGrid />

      {/* ══ MARRAKECH ET BATUMI ══ */}
      <section className="px-6 md:px-14 pb-20 md:pb-28 bg-[#26272a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm md:text-base uppercase tracking-[0.24em] text-[#B87333] font-medium mb-2">
              Also Covered
            </p>
            <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">
              Marrakech &amp; Batumi
            </h2>
          </div>

          {/* Deux colonnes a partir de lg seulement : a 768px, les deux CTA
              d'une carte en demi-largeur debordaient de 2px. Defaut preexistant
              au lot, corrige ici puisque la page est ouverte. */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {AUTRES_MARCHES.map((m) => (
              <article
                key={m.id}
                className="rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32] p-7 flex flex-col"
              >
                <h3 className="trajan-regular text-2xl uppercase tracking-[0.08em] text-[#C0C0C0]">{m.name}</h3>
                <p className="mt-4 text-[15px] md:text-base leading-relaxed text-[#acb0cd] flex-1">{m.desc}</p>
                <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
                  <a href={m.href} target="_blank" rel="noopener noreferrer" className={CTA_CUIVRE}>
                    Explore the Market
                  </a>
                  <a
                    href={whatsappFor(`${m.name} real estate`, m.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={CTA_ARGENT}
                  >
                    Contact Qualityacht
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
