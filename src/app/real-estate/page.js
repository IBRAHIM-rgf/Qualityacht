import Image from 'next/image';
import HeroTriptych from './HeroTriptych';
import RealEstateMap from './RealEstateMap';
import ProgrammeGrid from './ProgrammeGrid';
import { MARKETS, PARTNERS, QUALITYACHT, whatsappFor } from './partner-data';

export const metadata = {
  title: 'Real Estate | Qualityacht',
  description:
    'International real-estate opportunities introduced by Qualityacht through its selected partners — Dubai, Marrakech, Batumi and Monaco.',
};

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
      {/* HERO — triptyque video, variantes optimisees, poster par colonne */}
      <section className="relative pt-[70px] md:pt-0 h-[62vh] md:h-[85vh] bg-[#26272a] overflow-hidden grid grid-cols-3 gap-[2px]">
        <HeroTriptych />
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#26272a] via-[#26272a]/70 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-8 md:pb-12">
          <p className="text-sm md:text-base uppercase tracking-[0.35em] text-[#B87333] mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
            A Global Portfolio
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
            Real Estate
          </h1>
        </div>
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
