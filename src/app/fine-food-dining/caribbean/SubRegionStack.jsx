'use client';

import Image from 'next/image';
import { useState } from 'react';

// Sous-regions empilees les unes SOUS les autres (bandes photo collees, colonne centree
// — meme parti pris que /art-culture/caribbean et /historic-sites/caribbean-v3/[section]).
// La bande est CLIQUABLE : au clic, elle se deplie et affiche les adresses.
//
// Fine Food et Dining partagent la MEME forme de donnees (ile -> venues), un seul rendu
// suffit donc ici — contrairement a art-culture, ou Art (lieux) et Culture (calendrier)
// ont deux formes distinctes et deux rendus.
//
// AUCUN emoji.

function Venues({ groups }) {
  return (
    <div className="space-y-8">
      {groups.map((g) => (
        <div key={g.island}>
          <div className="flex items-center gap-3 mb-4">
            <h3 className="trajan-regular text-base md:text-lg text-[#C0C0C0] whitespace-nowrap">{g.island}</h3>
            <div className="flex-1 h-px bg-[#B87333]/25" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            {g.venues.map((v) => (
              <article
                key={v.name}
                className="bg-[#3a3b3f] border border-[#C0C0C0]/15 rounded-2xl p-5 flex flex-col"
              >
                <div className="flex items-center flex-wrap gap-2 mb-3">
                  <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-[0.14em] text-[#B87333] border border-[#B87333]/40">
                    {v.type}
                  </span>
                  {v.signature && (
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.12em] text-[#d8be7e]">
                      <span aria-hidden>★</span> Signature Selection
                    </span>
                  )}
                </div>
                <h4 className="text-[#C0C0C0] font-semibold text-[15px] leading-snug mb-2">{v.name}</h4>
                <p className="text-[#acb0cd] text-[13px] leading-relaxed">{v.desc}</p>
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SubRegion({ region, groups }) {
  const [open, setOpen] = useState(false);
  const count = groups.length;
  const empty = count === 0;

  return (
    <section id={region.slug}>
      <button
        type="button"
        onClick={() => !empty && setOpen((v) => !v)}
        aria-expanded={open}
        disabled={empty}
        className="relative block w-full h-[40vh] md:h-[46vh] overflow-hidden text-left disabled:cursor-default"
      >
        <Image
          src={encodeURI(region.img)}
          alt={region.name}
          fill
          sizes="(max-width:768px) 100vw, 768px"
          className={`object-cover transition-transform duration-700 ${open ? 'scale-105' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#26272a] via-[#26272a]/50 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {region.name}
            </h2>
            <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#B87333]">
              {empty ? 'Nothing listed yet' : `${count} island${count > 1 ? 's' : ''} listed`}
            </p>
          </div>

          {!empty && (
            <span className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C0C0C0] text-[10px] uppercase tracking-[0.18em] text-[#acb0cd]">
              {open ? 'Close' : 'See more'}
              <span
                aria-hidden
                className={`text-[13px] leading-none transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
              >
                &darr;
              </span>
            </span>
          )}
        </div>
      </button>

      {/* Infos de la sous-region — depliees au clic */}
      <div
        className={`grid transition-all duration-500 ease-out bg-[#2e2f32] ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-6 md:p-8 border-t border-[#C0C0C0]/10">
            <Venues groups={groups} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SubRegionStack({ regions, bySub }) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      {regions.map((r) => (
        <SubRegion key={r.slug} region={r} groups={bySub[r.slug] || []} />
      ))}
    </div>
  );
}
