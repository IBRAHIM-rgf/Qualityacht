'use client';

import Image from 'next/image';
import Link from 'next/link';

// /art-culture/caribbean : les 2 lignes ART et CULTURE empilees l'une SOUS l'autre
// (facon destinyhousebahamas.com). Chaque ligne = DEUX cards SEPAREES cote a cote : une
// card PHOTO et une card TEXTE, avec un espace entre elles (le fond nuages gris passe
// dans l'ecart) ET un DECALAGE vertical (elles ne sont pas pile en face). La 2e ligne
// (CULTURE) est INVERSEE : texte a gauche, photo a droite. Le decalage etant porte par
// la card texte, le cote "plus bas" alterne naturellement d'une ligne a l'autre (zigzag).
// Toute la ligne est cliquable -> page des sous-regions.
//
// APPARITION DU TEXTE : geree par le ScrollRise GLOBAL (layout racine), desormais en
// balayage LATERAL gauche->droite. On ne recree AUCUN etat cache/anime en CSS ici : le
// nom est un <h2> et l'eyebrow un <p>, pris en charge automatiquement. La photo reste
// TOUJOURS visible (aucun rideau qui pourrait la laisser masquee). AUCUN emoji.

function Bullet({ children }) {
  return (
    <li className="flex items-baseline gap-3 justify-center text-center">
      <span className="h-px w-4 shrink-0 bg-[#B87333]/80 translate-y-[-3px]" />
      <span className="text-[12px] md:text-[13px] leading-relaxed text-[#acb0cd]">{children}</span>
    </li>
  );
}

export default function ArtCultureStack({ cards }) {
  return (
    <div className="relative">
      {/* Fond nuages gris CONTINU (meme texture/couleur/opacite/tuilage que la page) */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-55 grayscale"
        style={{
          backgroundImage: "url('/images/nuagesAncien.png')",
          backgroundSize: '100% auto',
          backgroundRepeat: 'repeat-y',
          backgroundPosition: 'top center',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10 py-10 md:py-16 space-y-10 md:space-y-20">
        {cards.map((c, i) => {
          // 2e ligne (CULTURE) inversee : la card texte passe a gauche, la photo a droite.
          const reversed = i % 2 === 1;
          return (
            <Link key={c.key} href={c.href} className="group block">
              <div className="grid md:grid-cols-2 gap-6 md:gap-10 md:items-start">
                {/* CARD PHOTO (separee) + nom EN GRAND */}
                <div
                  className={`relative h-[40vh] md:h-[60vh] overflow-hidden rounded-3xl border border-[#C0C0C0]/20 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.9)] ${
                    reversed ? 'md:order-2' : ''
                  }`}
                >
                  <Image
                    src={encodeURI(c.img)}
                    alt={c.title}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#26272a]/80 via-[#26272a]/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center px-4">
                    <h2 className="trajan-regular text-4xl md:text-6xl uppercase tracking-[0.14em] text-[#C0C0C0] drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
                      {c.title}
                    </h2>
                  </div>
                </div>

                {/* CARD TEXTE (separee), centree et DECALEE vers le bas (pas pile en face) */}
                <div
                  className={`flex flex-col items-center justify-center text-center gap-5 p-7 md:p-12 rounded-3xl border border-[#C0C0C0]/20 bg-[#2e2f32]/70 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.9)] md:mt-24 ${
                    reversed ? 'md:order-1' : ''
                  }`}
                >
                  {c.eyebrow && (
                    <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-[#B87333]">{c.eyebrow}</p>
                  )}
                  <div className="relative w-24 md:w-32 h-5" data-no-rise>
                    <Image src="/images/title-line.png" alt="" fill className="object-contain" />
                  </div>
                  {c.text && (
                    <p className="max-w-md text-[13px] md:text-sm leading-relaxed text-[#acb0cd]">{c.text}</p>
                  )}
                  {c.bullets && (
                    <ul className="space-y-2 max-w-md">
                      {c.bullets.map((b) => (
                        <Bullet key={b}>{b}</Bullet>
                      ))}
                    </ul>
                  )}
                  <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C0C0C0] text-[11px] uppercase tracking-[0.18em] text-[#acb0cd] transition-colors duration-300 group-hover:border-[#B03E00] group-hover:text-[#c2622a]">
                    Discover
                    <span aria-hidden className="text-[13px] leading-none">
                      &rarr;
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
