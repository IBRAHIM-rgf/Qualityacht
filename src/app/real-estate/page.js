import Image from 'next/image';
import HeroTriptych from './HeroTriptych';
import RealEstateMap from './RealEstateMap';
import ProgrammeGrid from './ProgrammeGrid';
import { MARKETS, PARTNER, QUALITYACHT, whatsappFor } from './partner-data';

export const metadata = {
  title: 'Real Estate | Qualityacht',
  description:
    'International real-estate opportunities introduced by Qualityacht through its specialist partner, Gustave Immo — Dubai, Marrakech and Batumi.',
};

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
  'rounded-full border border-[#C0C0C0] bg-[#26272a]/50 text-[13px] font-semibold uppercase ' +
  'tracking-[0.18em] text-[#C0C0C0] transition-[border-color,box-shadow] duration-300 ' +
  'hover:border-[#c2622a] hover:shadow-[0_0_18px_rgba(194,98,42,0.35)] ' + FOCUS;

// Marrakech et Batumi : aucun programme individuel n'est confirme, on ne montre
// donc que le marche et les deux portes d'entree.
const AUTRES_MARCHES = MARKETS.filter((m) => m.id !== 'dubai');

export default function RealEstatePage() {
  return (
    <main className="bg-[#26272a] text-[#acb0cd]">
      {/* HERO — triptyque video, variantes optimisees, poster par colonne */}
      <section className="relative pt-[70px] md:pt-0 h-[62vh] md:h-[85vh] bg-[#26272a] overflow-hidden grid grid-cols-3 gap-[2px]">
        <HeroTriptych />
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#26272a] via-[#26272a]/70 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-8 md:pb-12">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#B87333] mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
            A Global Portfolio
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
            Real Estate
          </h1>
        </div>
      </section>

      {/* ══ BLOC PARTENAIRE ══ */}
      <section className="px-6 md:px-14 pt-14 md:pt-20 pb-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-[#B87333] font-medium">
            International Real Estate Partner
          </p>
          <p className="mt-3 text-sm uppercase tracking-[0.16em] text-[#C0C0C0]">
            In partnership with {PARTNER.name}
          </p>
          <a
            href={PARTNER.site}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${PARTNER.name} — opens in a new tab`}
            className={`mt-6 inline-flex min-h-[48px] items-center justify-center rounded-xl border border-[#C0C0C0]/40 bg-[#2e2f32] px-6 py-3 transition-colors hover:border-[#c2622a] ${FOCUS}`}
          >
            <Image
              src={PARTNER.logo}
              alt={PARTNER.name}
              width={140}
              height={40}
              className="h-9 w-auto object-contain"
            />
          </a>
          <p className="mt-6 text-[13px] md:text-base leading-relaxed text-[#acb0cd]">
            Qualityacht connects clients with selected international real-estate opportunities through its
            specialist partner, {PARTNER.name}.
          </p>
          <p className="mt-4 text-[12px] leading-relaxed text-[#8b90a0]">
            All enquiries are handled by Qualityacht — {QUALITYACHT.email} · {QUALITYACHT.phone}.
          </p>
        </div>
      </section>

      {/* ══ CARTE DES TROIS MARCHES ══ */}
      <RealEstateMap />

      {/* ══ PROGRAMMES DUBAI ══ */}
      <ProgrammeGrid />

      {/* ══ MARRAKECH ET BATUMI ══ */}
      <section className="px-6 md:px-14 pb-20 md:pb-28 bg-[#26272a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-[#B87333] font-medium mb-2">
              Also Covered
            </p>
            <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">
              Marrakech &amp; Batumi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {AUTRES_MARCHES.map((m) => (
              <article
                key={m.id}
                className="rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32] p-7 flex flex-col"
              >
                <h3 className="trajan-regular text-2xl uppercase tracking-[0.08em] text-[#C0C0C0]">{m.name}</h3>
                <p className="mt-4 text-[13px] leading-relaxed text-[#acb0cd] flex-1">{m.desc}</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
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
