// ══ Landing /sales/sailing — variante propre a la page (client 2026-09-11) ══
//
// Copie locale de ../SourcingLanding (partage avec /sales/toys et /sales/motor,
// laisse intact) avec un hero specifique :
//  - photo hero-sale-sailing.jpg en mouvement lent (Ken Burns, origine coin
//    superieur droit), voile bleu, texte a droite avec apparition douce ;
//  - les deux boutons du hero (les "deux cartes") restent fixes, hors animation ;
//  - cadre 1400x800 centre, bloc independant du fond nuages, degrade bleu seul.
// Le fond nuages + voile bleu 22 % vient du layout /sales (page de reference) :
// aucun opt-out ici. Les sections suivantes (Three Ways In, CTA final) et tous
// les textes sont repris tels quels.

import Image from 'next/image';
import Link from 'next/link';
import styles from './sailing-hero.module.css';

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

export default function SailingSaleLanding({
  eyebrow,
  title,
  intro,
  heroImage,
  heroAlt = '',
  primary,
  secondary,
  axes = [],
  final,
}) {
  return (
    // Pas de fond propre : nuages + voile bleu communs du layout /sales.
    <main className="text-[#acb0cd]">
      {/* ══ HERO (section independante, hors du fond nuages) ══ */}
      <section className={styles.hero}>
        <div aria-hidden className={styles.visual}>
          <div className={styles.imageWrapper}>
            <Image
              src={heroImage}
              alt={heroAlt}
              fill
              priority
              sizes="(min-width: 1400px) 1400px, 100vw"
              className={styles.image}
            />
          </div>
          <div className={styles.overlay} />
          <div className={styles.bottomFade} />
        </div>

        <div className={styles.contentColumn}>
          <div className={`${styles.content} text-left`}>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#B87333] mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
              {eyebrow}
            </p>
            <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {title}
            </h1>
            <p className="mt-5 text-sm md:text-base leading-relaxed text-[#acb0cd] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              {intro}
            </p>
          </div>
          {/* Les deux cartes : fixes, independantes de l'animation. */}
          <div className={`${styles.cards} mt-8 flex flex-col sm:flex-row items-start gap-4`}>
            <Link href={primary.href} className={CTA_CUIVRE}>{primary.label}</Link>
            <Link href={secondary.href} className={CTA_ARGENT}>{secondary.label}</Link>
          </div>
        </div>
      </section>

      {/* ══ LES TROIS AXES ══ */}
      <section className="px-6 md:px-14 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-[#B87333] font-medium mb-2">
              How We Search
            </p>
            <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">
              Three Ways In
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {axes.map((a) => (
              <article
                key={a.titre}
                className="rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32] p-7 flex flex-col"
              >
                <span aria-hidden className="h-1 w-1 rounded-full bg-[#c2622a] mb-5" />
                <h3 className="trajan-regular text-lg md:text-xl uppercase tracking-[0.08em] text-[#C0C0C0] leading-snug">
                  {a.titre}
                </h3>
                <p className="mt-4 text-[13px] md:text-[14px] leading-relaxed text-[#acb0cd]">{a.texte}</p>
              </article>
            ))}
          </div>

          <p className="mt-10 max-w-3xl mx-auto text-center text-[12px] leading-relaxed text-[#8b90a0]">
            We do not publish a public listing for this category. Each search is opened on request, and
            what we come back with depends on what is genuinely on the market at the time.
          </p>
        </div>
      </section>

      {/* ══ CTA FINAL ══ */}
      <section className="px-6 md:px-14 pb-20 md:pb-28">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">
            {final.title}
          </h2>
          <p className="mt-5 text-[13px] md:text-base leading-relaxed text-[#acb0cd]">{final.texte}</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={final.primary.href} className={CTA_CUIVRE}>{final.primary.label}</Link>
            <Link href={final.secondary.href} className={CTA_ARGENT}>{final.secondary.label}</Link>
          </div>
          <p className="mt-8">
            <Link
              href="/sales"
              className={`inline-flex min-h-[48px] items-center text-[11px] uppercase tracking-[0.18em] text-[#acb0cd] underline underline-offset-4 transition-colors hover:text-[#c2622a] ${FOCUS}`}
            >
              <span aria-hidden className="mr-2">&larr;</span> Back to Sales
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
