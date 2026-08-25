'use client';

// ══ Real Estate — programmes Dubai ══
// Cinq cartes. `Request the Brochure` ouvre un formulaire QUALITYACHT : la
// brochure du partenaire n'est ouverte qu'apres un envoi reellement confirme.
// `Discuss This Project` ouvre le WhatsApp officiel Qualityacht, avec le nom du
// programme prerempli. Aucun prix n'est affiche.

import Image from 'next/image';
import { useState } from 'react';
import BrochureModal from './BrochureModal';
import { DUBAI_PROGRAMMES, whatsappFor } from './partner-data';

const FOCUS =
  'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]';

const CTA_CUIVRE =
  'inline-flex min-h-[48px] max-w-full flex-1 items-center justify-center text-center px-5 py-3 ' +
  'rounded-full border border-[#C0C0C0] bg-[#26272a] text-[13px] font-semibold uppercase ' +
  'tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] ' +
  'transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] ' +
  'hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] ' + FOCUS;

const CTA_ARGENT =
  'inline-flex min-h-[48px] max-w-full flex-1 items-center justify-center text-center px-5 py-3 ' +
  'rounded-full border border-[#C0C0C0] bg-[#26272a]/50 text-[13px] font-semibold uppercase ' +
  'tracking-[0.18em] text-[#C0C0C0] transition-[border-color,box-shadow] duration-300 ' +
  'hover:border-[#c2622a] hover:shadow-[0_0_18px_rgba(194,98,42,0.35)] ' + FOCUS;

export default function ProgrammeGrid() {
  const [ouvert, setOuvert] = useState(null);

  return (
    <section className="px-6 md:px-14 py-16 md:py-20 bg-[#26272a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-[#B87333] font-medium mb-2">Dubai</p>
          <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">
            Selected Dubai Opportunities
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-[13px] text-[#8b90a0] leading-relaxed">
            Programmes currently presented by our partner. Brochures are sent on request through Qualityacht;
            no pricing is reproduced here, as it changes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {DUBAI_PROGRAMMES.map((p) => (
            <article
              key={p.id}
              className="flex flex-col rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32] overflow-hidden"
            >
              <div className="relative aspect-[4/3] bg-[#26272a]">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="trajan-regular text-lg uppercase tracking-[0.08em] text-[#C0C0C0] leading-snug">
                  {p.name}
                </h3>
                {p.developer && (
                  <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[#B87333]">{p.developer}</p>
                )}
                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <button type="button" onClick={() => setOuvert(p)} className={CTA_CUIVRE}>
                    Request the Brochure
                  </button>
                  <a
                    href={whatsappFor(p.name, 'Dubai')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={CTA_ARGENT}
                  >
                    Discuss This Project
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {ouvert && <BrochureModal programme={ouvert} onClose={() => setOuvert(null)} />}
    </section>
  );
}
