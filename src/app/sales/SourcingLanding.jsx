// ══ Landing de sourcing Sales ══
//
// Composant LOCAL a la famille Sales, partage uniquement par /sales/sailing et
// /sales/toys pour eviter de dupliquer la meme structure deux fois. Aucun
// composant global n'est touche.
//
// Il n'affiche AUCUN inventaire, AUCUN prix et AUCUN produit : ces deux
// categories n'ont pas de selection publique. La page presente la methode de
// recherche et ouvre le formulaire Sales existant.
//
// Les `intent` passes ici doivent exister dans lib/salesEnquiry.js. Les trois
// utilises — buy, general, listings — y sont bien definis.

import Image from 'next/image';
import Link from 'next/link';

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

export default function SourcingLanding({
  eyebrow,
  title,
  intro,
  heroImage = null,
  heroAlt = '',
  heroPosition = 'object-center',
  // heroFrame : cadre standard 1400x800 centre (.qy-hero-frame, globals.css) a la
  // place du hero plein ecran en vh. Demande client 2026-09-09 pour /sales/sailing
  // (photo 3:2 trop recadree). Defaut false : les autres pages ne changent pas.
  heroFrame = false,
  // belowHeroFilter : filtre de l'ancienne page d'attente (fond gris #111827 +
  // nuages gris a 30 %) sur toute la page, sans le voile bleu commun (retire du
  // hero aussi le 2026-09-10 a la demande du client).
  // Demande client 2026-09-10 pour /sales/sailing. Defaut false.
  belowHeroFilter = false,
  primary,
  secondary,
  axes = [],
  final,
}) {
  return (
    // Pas de fond propre : le fond nuages commun vient du layout /sales.
    <main className={`text-[#acb0cd] ${belowHeroFilter ? 'qy-no-blue relative isolate' : ''}`}>
      {/* Filtre de l'ancienne page d'attente sur toute la page (derriere le hero
          aussi, pour que la photo se fonde dans le gris et non dans les nuages
          colores du layout) : fond gris #111827 + nuages gris a 30 %. */}
      {belowHeroFilter && (
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gray-900" />
          <Image src="/images/nuagesAncien.png" alt="" fill sizes="100vw" className="object-cover opacity-30 grayscale" />
        </div>
      )}
      {/* ══ HERO ══ */}
      {heroImage ? (
        <section
          className={
            heroFrame
              ? 'qy-hero-frame'
              : 'relative w-full h-[58vh] min-h-[420px] md:h-[72vh] overflow-hidden'
          }
        >
          {/* Meme degrade que le hero de /sales/motor (demande client 2026-09-10) :
              le masque fait DISPARAITRE la photo vers le bas au lieu de la recouvrir
              d'une couleur, le fond nuages du layout reapparait progressivement. Le
              voile noir leger sert uniquement a garder le titre lisible. */}
          <div
            aria-hidden
            className="absolute inset-0 z-0"
            style={{
              maskImage: 'linear-gradient(to bottom, black 45%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 45%, transparent 100%)',
            }}
          >
            <Image
              src={heroImage}
              alt={heroAlt}
              fill
              priority
              sizes="100vw"
              className={`object-cover ${heroPosition}`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-end text-center px-6 pb-10 md:pb-14">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#B87333] mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
              {eyebrow}
            </p>
            <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm md:text-base leading-relaxed text-[#acb0cd] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              {intro}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={primary.href} className={CTA_CUIVRE}>{primary.label}</Link>
              <Link href={secondary.href} className={CTA_ARGENT}>{secondary.label}</Link>
            </div>
          </div>
        </section>
      ) : (
        /* Sans visuel local pertinent, hero typographique plutot qu'une image
           hors sujet. */
        <section className="px-6 md:px-14 pt-28 md:pt-36 pb-14 md:pb-20 border-b border-[#C0C0C0]/10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#B87333] mb-3">{eyebrow}</p>
            <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight">
              {title}
            </h1>
            <p className="mt-6 text-sm md:text-base leading-relaxed text-[#acb0cd]">{intro}</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={primary.href} className={CTA_CUIVRE}>{primary.label}</Link>
              <Link href={secondary.href} className={CTA_ARGENT}>{secondary.label}</Link>
            </div>
          </div>
        </section>
      )}

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
          {/* Retour Sales : lien tertiaire discret, pas un CTA. */}
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
