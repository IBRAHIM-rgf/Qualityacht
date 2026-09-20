// ══ ActivityPage — gabarit des cinq pages d'activite ══
// Meme identite visuelle que la section cartes de /invest-with-impact :
// fond #26272A, titres Trajan #C0C0C0, textes #ACB0CD, accents #C2622A,
// bordures fines argent, photo en cover jamais deformee, zoom lent.
// Composant serveur : aucune librairie, aucun JS cote client.

import Image from 'next/image';
import Link from 'next/link';

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

export default function ActivityPage({
  eyebrow,
  title,
  subtitle,
  heroImage,
  heroAlt,
  heroPosition = '50% 50%',
  intro,
  sections,          // [{ Icone, titre, texte }]
  gallery = [],      // [{ src, alt }] — optionnel
  cta,               // { titre, texte, label, href }
  Icone,
  heroNode = null,   // fond de hero fourni par la page (ex. diaporama) a la place de la photo
}) {
  return (
    <main className="bg-[#26272a] text-[#acb0cd]">
      {/* ══ HERO ══ */}
      <section className="activityHero relative w-full max-w-[1400px] mx-auto min-h-[560px] md:min-h-[720px] overflow-hidden bg-[#26272a]">
        {heroNode || (
          <Image
            src={heroImage}
            alt={heroAlt}
            fill
            priority
            sizes="100vw"
            className="activityHeroImg"
            style={{ objectPosition: heroPosition }}
          />
        )}
        <style>{`
          .activityHeroImg {
            object-fit: cover;
            transform-origin: center center;
            animation: activityZoom 24s ease-in-out infinite alternate;
            will-change: transform;
            z-index: 0;
          }
          @keyframes activityZoom {
            from { transform: scale(1); }
            to   { transform: scale(1.06); }
          }
          .activityHero::after {
            content: "";
            position: absolute;
            inset: 0;
            background:
              linear-gradient(90deg, rgba(15,16,16,0.76) 0%, rgba(15,16,16,0.42) 46%, rgba(15,16,16,0.18) 100%),
              linear-gradient(180deg, transparent 60%, rgba(38,39,42,0.85) 100%);
            pointer-events: none;
            z-index: 1;
          }
          .activityHeroContent { z-index: 2; text-align: left; }
          @media (prefers-reduced-motion: reduce) {
            .activityHeroImg { animation: none; }
          }
        `}</style>
        <div className="activityHeroContent absolute inset-0 flex items-center px-6 md:px-14">
          <div className="w-full md:w-1/2 max-w-xl">
            <Link
              href="/invest-with-impact"
              className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[#acb0cd] hover:text-[#c2622a] transition-colors duration-300 ${FOCUS}`}
            >
              <span aria-hidden>&larr;</span> Beyond The Ordinary
            </Link>
            <p className="mt-8 text-[12px] md:text-[13px] uppercase tracking-[0.32em] text-[#B87333] font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
              {eyebrow}
            </p>
            <h1 className="mt-4 trajan-regular text-3xl md:text-5xl lg:text-[3.35rem] uppercase tracking-[0.08em] text-[#C0C0C0] leading-[1.15] md:leading-[1.15] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              {title}
            </h1>
            <p className="mt-5 text-[15px] md:text-lg font-medium leading-[1.75] text-[#acb0cd] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              {subtitle}
            </p>
            <div className="mt-8">
              <Link href={cta.href} className={CTA_CUIVRE}>{cta.label}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ INTRODUCTION ══ */}
      <section className="px-6 md:px-14 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          {Icone && <Icone className="mx-auto mb-6 h-8 w-8 text-[#C2622A]" strokeWidth={1.4} fill="none" aria-hidden />}
          <p className="text-[15px] md:text-lg leading-[1.85] text-[#acb0cd]">{intro}</p>
        </div>
      </section>

      {/* ══ SECTIONS ══ */}
      <section className="px-6 md:px-14 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {sections.map(({ Icone: I, titre, texte }) => (
            <article
              key={titre}
              className="rounded-md border border-[rgba(192,192,192,0.22)] bg-[#26272A] p-8 flex flex-col transition-[border-color] duration-500 hover:border-[rgba(194,98,42,0.55)]"
            >
              {I && <I className="h-7 w-7 text-[#C2622A] mb-5" strokeWidth={1.4} fill="none" aria-hidden />}
              <h2 className="trajan-regular uppercase tracking-[0.1em] text-base md:text-lg text-[#C0C0C0] leading-snug">
                {titre}
              </h2>
              <p className="mt-4 text-[14px] leading-[1.8] text-[#acb0cd]">{texte}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ══ GALERIE (optionnelle) ══ */}
      {gallery.length > 0 && (
        <section className="px-6 md:px-14 pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map(({ src, alt }) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-md border border-[rgba(192,192,192,0.22)]">
                <Image src={src} alt={alt} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ APPEL A L'ACTION ══ */}
      <section className="px-6 md:px-14 pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto rounded-md border border-[rgba(192,192,192,0.22)] bg-[#2D2E32] p-8 md:p-12 text-center">
          <h2 className="trajan-regular uppercase tracking-[0.1em] text-xl md:text-3xl text-[#C0C0C0]">{cta.titre}</h2>
          <p className="mt-5 max-w-xl mx-auto text-[15px] md:text-base leading-[1.8] text-[#acb0cd]">{cta.texte}</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={cta.href} className={CTA_CUIVRE}>{cta.label}</Link>
            <Link href="/invest-with-impact" className={CTA_ARGENT}>Back to Beyond The Ordinary</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
