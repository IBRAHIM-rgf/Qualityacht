'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Grande card unique decoupee en 3 panneaux verticaux. Au survol (desktop) ou au
// clic (mobile/tactile), le panneau actif s'elargit et devoile son contenu ; les
// deux autres se retractent. Palette sombre Qualityacht, jamais de blanc.

export default function SplitPanels({ panels }) {
  const [active, setActive] = useState(0);

  return (
    <div className="px-4 md:px-10 lg:px-14 py-14 md:py-20">
      {/* flex-grow / flex-basis UNIQUEMENT en desktop : en mobile le conteneur est en
          flex-col, flex-basis:0 piloterait la HAUTEUR et ecraserait les panneaux a 0px
          (conteneur en h-auto = aucun espace libre a distribuer). En mobile on laisse
          donc les hauteurs h-[180px] / h-[440px] faire le travail. */}
      <style>{`
        @media (min-width: 768px) {
          .sp-panel { flex-grow: var(--sp-grow); flex-basis: 0; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden border border-[#C0C0C0]/20 bg-[#2e2f32] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
        <div className="flex flex-col md:flex-row h-auto md:h-[90vh] md:min-h-[720px]">
          {panels.map((p, i) => {
            const isActive = active === i;
            return (
              <article
                key={p.key}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`sp-panel group relative overflow-hidden cursor-pointer transition-[flex-grow,height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  i > 0 ? 'border-t md:border-t-0 md:border-l border-[#C0C0C0]/15' : ''
                } ${isActive ? 'h-[560px] md:h-auto' : 'h-[240px] md:h-auto'}`}
                style={{ '--sp-grow': isActive ? 2.4 : 1 }}
              >
                {/* Photo de fond : plus large + plus lumineuse quand le panneau est actif.
                    p.boost = photo terne a l'origine -> saturation/contraste remontes une
                    fois le panneau ouvert (le gris du panneau ferme reste inchange). */}
                <Image
                  src={encodeURI(p.img)}
                  alt={p.title}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className={`object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive
                      ? `scale-105 grayscale-0 opacity-100 ${
                          p.boost ? 'saturate-[1.45] contrast-[1.12] brightness-[1.05]' : ''
                        }`
                      : 'scale-100 grayscale opacity-60'
                  }`}
                  priority={i === 0}
                />

                {/* Voiles de lisibilite */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    isActive ? 'opacity-100' : 'opacity-100'
                  } bg-gradient-to-t from-[#26272a] via-[#26272a]/55 to-transparent`}
                />
                <div
                  className={`absolute inset-0 bg-[#26272a] transition-opacity duration-700 ${
                    isActive ? 'opacity-0' : 'opacity-40'
                  }`}
                />

                {/* Voile sombre supplementaire quand le panneau ouvert porte du texte :
                    sans lui, le paragraphe et les puces passent sur les zones claires de
                    la photo et deviennent illisibles. Les cards sans texte
                    (historic-sites/caribbean-v3) gardent leur photo pleinement lumineuse. */}
                {(p.text || p.bullets) && (
                  <div
                    className={`absolute inset-0 bg-[#26272a] transition-opacity duration-700 ${
                      isActive ? 'opacity-60' : 'opacity-0'
                    }`}
                  />
                )}

                {/* Filet cuivre en bas du panneau actif */}
                <div
                  className={`absolute inset-x-0 bottom-0 h-[3px] bg-[#B03E00] origin-left transition-transform duration-700 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />

                {/* Contenu : titre centre + Discover en bas.
                    p.text / p.bullets sont OPTIONNELS et ne s'affichent que dans le
                    panneau ouvert (cf. /art-culture/caribbean). Sans eux, la card ne
                    porte que son titre : c'est le cas de historic-sites/caribbean-v3,
                    dont les cards doivent rester vides. */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 md:p-8">
                  <h2 className="trajan-regular text-center text-2xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {p.title}
                  </h2>

                  {(p.text || p.bullets) && (
                    <div
                      className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive ? 'max-h-[420px] opacity-100 mt-5' : 'max-h-0 opacity-0 mt-0'
                      }`}
                    >
                      {p.text && (
                        <p className="max-w-xl mx-auto text-center text-[13px] md:text-sm leading-relaxed text-[#acb0cd] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                          {p.text}
                        </p>
                      )}

                      {p.bullets && (
                        <ul className="mt-4 space-y-2 max-w-xl mx-auto">
                          {p.bullets.map((b) => (
                            <li key={b} className="flex items-baseline gap-3">
                              <span className="h-px w-4 shrink-0 bg-[#B87333]/80 translate-y-[-3px]" />
                              <span className="text-[12px] md:text-[13px] leading-relaxed text-[#acb0cd] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                                {b}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-6 md:bottom-8 flex justify-center">
                    <Link
                      href={p.href}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C0C0C0] text-[11px] uppercase tracking-[0.18em] text-[#acb0cd] transition-colors duration-300 hover:border-[#B03E00] hover:text-[#c2622a]"
                    >
                      Discover
                      <span aria-hidden className="text-[13px] leading-none">
                        &rarr;
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
