'use client';

// Page d'un type de voilier (/only-for-you/<slug>) — accessible depuis /only-for-you.
// Hero (image + titre qui monte), presentation editoriale du type, puis un
// choix de destination honnete : la seule qui existe reellement.

import Image from 'next/image';
import Link from 'next/link';
import { use, useEffect, useRef } from 'react';
import { getSailingTypeBySlug, destinationItems } from '../data';

// Raccord entre sections — meme parti que Caribbean v15 : une texture nuageuse
// discrete posee derriere la section adoucit la jonction au lieu d'une cassure
// nette entre deux aplats.
function CloudSection({ children, className = '', bg = '/images/nuagesAncien.png' }) {
  return (
    <div className={`relative ${className}`}>
      <div aria-hidden className="absolute inset-0 z-0">
        <Image src={bg} alt="" fill className="object-cover opacity-55" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Photo Caraibes deja utilisee par l'ancienne grille de destinations.
const CARIBBEAN_IMAGE =
  destinationItems.find((d) => d.caribbean)?.image || '/images/destinations/animals/caraibes.jpg';

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

export default function RentalTypePage({ params }) {
  const { type } = use(params);
  const boat = getSailingTypeBySlug(type);

  const heroRef = useRef(null);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const t = setTimeout(() => el.classList.add('revealed'), 200);
    return () => clearTimeout(t);
  }, []);

  if (!boat) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#26272a]">
        <p className="text-[#acb0cd] text-lg">Type de bateau inconnu.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#26272a]">
      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 2.8s ease, transform 2.8s ease; }
        .reveal-up.revealed { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* ══ HERO image + texte qui monte ══ */}
      <div className="relative w-full pt-[70px] md:pt-0 bg-[#26272a]">
        <div className="relative w-full h-[55vh] md:h-[75vh] overflow-hidden">
          <Image src={boat.image} alt={boat.name} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
          {/* Raccord hero -> section suivante : fondu vers le fond de page. */}
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-28 md:h-40 bg-gradient-to-b from-transparent to-[#26272a] pointer-events-none" />

          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-4 pb-6 md:pb-12">
            <div ref={heroRef} className="reveal-up flex flex-col items-center text-center w-full">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#c2622a] mb-2 md:mb-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                Sailing Charter
              </p>
              <h1 className="trajan-regular text-2xl md:text-5xl lg:text-6xl uppercase tracking-[0.12em] md:tracking-[0.15em] text-[#acb0cd] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                {boat.name}
              </h1>
              <div className="relative w-24 md:w-32 h-5 md:h-6 mt-3 md:mt-4">
                <Image src="/images/title-line.png" alt="" fill className="object-contain" />
              </div>
              <p className="text-[#acb0cd]/80 text-xs md:text-sm uppercase tracking-[0.2em] font-light mt-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                {boat.tagline}
              </p>
              {/* Le hero n'avait aucun CTA : il fallait faire defiler pres de
                  1 900 px avant de trouver la premiere action. */}
              <Link href={`/only-for-you/${type}/carribbean`} className={`${CTA_CUIVRE} mt-6`}>
                Explore in the Caribbean
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ══ PRESENTATION DU TYPE ══
          Utilise boat.intro et boat.highlights, deja presents dans data.js mais
          jusqu'ici jamais affiches. */}
      <CloudSection className="bg-[#26272a] px-5 md:px-10 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-5 text-center">
            {boat.intro.map((paragraphe, i) => (
              <p key={i} className="text-[14px] md:text-base leading-relaxed text-[#acb0cd]">
                {paragraphe}
              </p>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {boat.highlights.map((h) => (
              <article
                key={h.title}
                className="rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32] p-6 flex flex-col"
              >
                <span aria-hidden className="h-1 w-1 rounded-full bg-[#c2622a] mb-4" />
                <h3 className="trajan-regular text-base md:text-lg uppercase tracking-[0.08em] text-[#C0C0C0] leading-snug">
                  {h.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-[#acb0cd]">{h.text}</p>
              </article>
            ))}
          </div>
        </div>
      </CloudSection>

      {/* ══ DESTINATION ══
          La grille des 16 destinations est retiree : une seule existait
          reellement, les 15 autres etaient des cartes mortes sans lien. */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-16 md:py-24 px-5 md:px-10"
        style={{ backgroundImage: "url('/images/services-bg.png')" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.12em] text-[#acb0cd]">
              Where To Sail
            </h2>
            <div className="relative w-32 h-7 mx-auto mt-4">
              <Image src="/images/title-line.png" alt="" fill className="object-contain" />
            </div>
          </div>

          <article className="rounded-2xl border border-[#C0C0C0]/25 bg-[#2e2f32] overflow-hidden">
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              <Image
                src={CARIBBEAN_IMAGE}
                alt="The Caribbean"
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#26272a]/95 via-[#26272a]/35 to-transparent"
              />
              <h3 className="absolute inset-x-0 bottom-0 p-6 trajan-regular text-2xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                The Caribbean
              </h3>
            </div>
            <div className="p-6 md:p-8 text-center">
              <Link href={`/only-for-you/${type}/carribbean`} className={CTA_CUIVRE}>
                {`Explore ${boat.name} in the Caribbean`}
              </Link>
            </div>
          </article>

          {/* Autres destinations : aucune fausse disponibilite affichee. */}
          <div className="mt-8 rounded-2xl border border-[#C0C0C0]/25 bg-[#2e2f32]/70 p-7 md:p-8 text-center">
            <h3 className="trajan-regular text-lg md:text-xl uppercase tracking-[0.08em] text-[#C0C0C0]">
              Considering Another Destination?
            </h3>
            <p className="mt-4 text-[13px] md:text-[14px] leading-relaxed text-[#acb0cd] max-w-2xl mx-auto">
              The Caribbean is where we currently charter this type of yacht. Other regions can be
              studied case by case, depending on the yacht, the season and what is actually available
              at the time. Tell us where you have in mind and we will look into it.
            </p>
            <Link href="/#contact" className={`${CTA_ARGENT} mt-6 w-auto`}>
              Speak to Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
