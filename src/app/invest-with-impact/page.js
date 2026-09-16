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
import { House, Sofa, Flower2, Droplet, Waves } from 'lucide-react';
import { MARKETS, PARTNER, QUALITYACHT } from '../real-estate/partner-data';

export const metadata = {
  title: 'Beyond The Ordinary | Qualityacht',
  description:
    'Tangible assets, curated opportunities and a long-term perspective — international real-estate introductions arranged by Qualityacht with its specialist partner.',
};

// Visuel local, deja present et documente dans docs/research/gustave-immo-assets.md.
// Photo hero fournie par le client : version paysage (2026-09-15).
const HERO_IMAGE = '/media/client/lydie/2026-09-14/invest-hero/hero-marina-paysage.jpg';

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

// Cartes activites — images fournies par le client (2026-09-16), utilisees
// telles quelles, jamais deformees (object-fit: cover).
const ACTIVITES = [
  {
    id: 'real-estate',
    Icone: House,
    titre: 'International Real Estate',
    texte: 'Selected properties and development opportunities in sought-after destinations.',
    image: '/media/client/lydie/2026-09-16/activities/real-estate.jpg',
    alt: 'Aerial view of a waterfront estate on a wooded headland',
    filtre: 'brightness(.82) saturate(.95)',
  },
  {
    id: 'luxury-living',
    Icone: Sofa,
    titre: 'Luxury Living',
    texte: 'Furniture, rugs and linens chosen for interiors with character and lasting appeal.',
    image: '/media/client/lydie/2026-09-16/activities/luxury-living.jpg',
    alt: 'Dark living room with a grey sofa, cushions and a marble coffee table',
    filtre: 'brightness(.62) saturate(.85)',
  },
  {
    id: 'wellness',
    Icone: Flower2,
    titre: 'Wellness & Care',
    texte: 'Products and experiences built around comfort, balance and everyday well-being.',
    image: '/media/client/lydie/2026-09-16/activities/wellness.jpg',
    alt: 'Woman resting on a sofa by candlelight against a dark botanical wall',
    filtre: 'brightness(.58) saturate(.85)',
  },
  {
    id: 'technology',
    Icone: Droplet,
    titre: 'Onboard & Residence Technology',
    texte: 'Advanced water-filtration and technical solutions for yachts and residences.',
    image: '/media/client/lydie/2026-09-16/activities/technology.jpg',
    alt: 'A water droplet rippling a deep blue surface',
    filtre: 'brightness(.68) saturate(.90)',
  },
  {
    id: 'water-toys',
    Icone: Waves,
    titre: 'Water Toys',
    texte: 'Premium equipment for movement, play and unforgettable moments on the water.',
    image: '/media/client/lydie/2026-09-16/activities/water-toys.jpg',
    alt: 'Red jet ski resting on wet sand at sunset',
    filtre: 'brightness(.62) saturate(.88)',
  },
];

export default function InvestWithImpactPage() {
  const marches = MARKETS.map((m) => m.name).join(' · ');

  return (
    <main className="bg-[#26272a] text-[#acb0cd]">
      {/* ══ HERO ══ */}
      {/* Cadre 1400 px de large, hauteur mini 800 px. La photo couvre toute la
          section (object-cover, recadrage 60% pour garder les bateaux et les
          residences a droite) et le bloc de texte tient la colonne de gauche,
          aligne a gauche et centre verticalement. */}
      <section className="heroInvest relative w-full max-w-[1400px] mx-auto min-h-[600px] md:min-h-[800px] overflow-hidden bg-[#26272a]">
        <Image
          src={HERO_IMAGE}
          alt="Aerial view of a marina with berthed yachts"
          fill
          priority
          sizes="100vw"
          className="heroInvestImg"
          style={{ filter: 'saturate(1.07) contrast(1.03) brightness(1.03) sepia(0.10) hue-rotate(-8deg)' }}
        />
        <style>{`
          .heroInvestImg {
            object-fit: cover;
            object-position: 60% center;
            transform-origin: center center;
            animation: luxuryZoom 24s ease-in-out infinite alternate;
            will-change: transform;
            z-index: 0;
          }
          @keyframes luxuryZoom {
            from { transform: scale(1); }
            to   { transform: scale(1.07); }
          }
          /* Voile sombre : dense a gauche derriere le texte, transparent a droite. */
          .heroInvest::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(
              90deg,
              rgba(15, 16, 16, 0.72) 0%,
              rgba(15, 16, 16, 0.38) 46%,
              rgba(15, 16, 16, 0.18) 100%
            );
            pointer-events: none;
            z-index: 1;
          }
          /* z-index seul : le positionnement vient des classes utilitaires, sinon
             un position: relative ici casserait le centrage vertical. */
          .heroInvestContent { z-index: 2; text-align: left; }
          @media (prefers-reduced-motion: reduce) {
            .heroInvestImg { animation: none; }
          }
        `}</style>
        {/* Lumiere chaude rasante, discrete, par-dessus la photo. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            mixBlendMode: 'soft-light',
            background:
              'radial-gradient(58% 48% at 78% 22%, rgba(243,186,122,0.26) 0%, transparent 66%), radial-gradient(70% 55% at 50% 18%, rgba(226,202,160,0.16) 0%, transparent 62%)',
          }}
        />
        <div className="heroInvestContent absolute inset-0 flex items-center px-6 md:px-14">
          <div className="w-full md:w-1/2 max-w-xl">
            <h1 className="trajan-regular text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Beyond The Ordinary
            </h1>
            <p className="mt-5 text-[15px] md:text-base font-medium leading-[1.75] text-[#acb0cd] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Tangible assets, chosen one by one, held for the long term — and someone alongside you
              from the first conversation to the keys.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4">
              <Link href="/real-estate" className={CTA_CUIVRE}>
                Explore Real Estate Opportunities
              </Link>
              <Link href="/#contact" className={CTA_ARGENT}>
                Speak to Our Team
              </Link>
            </div>
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

      {/* ══ ACTIVITES — cinq cartes premium ══
          Chaque carte a deux zones distinctes : l'image en haut, sans aucun
          texte ni pictogramme dessus, puis un bloc sombre qui porte l'icone,
          le titre et la description. */}
      <section className="px-6 md:px-14 pb-16 md:pb-24">
        <div className="activitiesWrap mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-[12px] md:text-[13px] uppercase tracking-[0.24em] text-[#B87333] font-semibold mb-2">
              What We Do
            </p>
            <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">
              Our Activities
            </h2>
          </div>
          <div className="activitiesGrid">
            {ACTIVITES.map(({ id, Icone, titre, texte, image, alt, filtre }) => (
              <article key={id} className="activityCard">
                <div className="activityImage">
                  <Image
                    src={image}
                    alt={alt}
                    width={900}
                    height={600}
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 20vw"
                    style={{ filter: filtre }}
                  />
                </div>
                <div className="activityContent">
                  <Icone className="activityIcon" strokeWidth={1.4} fill="none" aria-hidden />
                  <h3>{titre}</h3>
                  <p>{texte}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          .activitiesWrap { max-width: 1320px; }
          .activitiesGrid {
            display: grid;
            grid-template-columns: repeat(5, minmax(0, 1fr));
            gap: 22px;
          }
          .activityCard {
            min-height: 300px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            background: #26272A;
            border: 1px solid rgba(192, 192, 192, 0.22);
            border-radius: 6px;
          }
          .activityImage {
            height: 150px;
            overflow: hidden;
          }
          .activityImage img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
            object-position: center;
          }
          .activityContent {
            flex: 1;
            min-height: 145px;
            padding: 18px 14px 20px;
            text-align: center;
            background: #26272A;
          }
          .activityIcon {
            width: 27px;
            height: 27px;
            margin: 0 auto 12px;
            color: #C2622A;
          }
          .activityContent h3 {
            margin: 0;
            color: #C0C0C0;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.45;
            letter-spacing: 2.2px;
            text-transform: uppercase;
          }
          .activityContent p {
            margin: 10px 0 0;
            color: #ACB0CD;
            font-size: 13px;
            line-height: 1.5;
          }
          /* Tablette : trois puis deux colonnes, jamais cinq cartes ecrasees. */
          @media (max-width: 1279px) {
            .activitiesGrid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          }
          @media (max-width: 899px) {
            .activitiesGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
          @media (max-width: 639px) {
            .activitiesGrid { grid-template-columns: 1fr; }
            .activityImage { height: 180px; }
          }
        `}</style>
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
