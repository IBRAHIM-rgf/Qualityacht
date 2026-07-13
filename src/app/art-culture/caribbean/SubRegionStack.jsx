'use client';

import Image from 'next/image';
import { useState } from 'react';

// Sous-regions empilees les unes SOUS les autres (bandes photo collees, colonne
// centree — meme parti pris que /historic-sites/caribbean-v3/[section]).
// Ici la bande est CLIQUABLE : au clic, elle se deplie et affiche les infos de la
// sous-region (musees/galeries pour Art, calendrier culturel pour Culture).
// AUCUN emoji.

const VIP_TONE = {
  'Very High': 'text-[#d39478] border-[#d39478]/40',
  High: 'text-[#B87333] border-[#B87333]/40',
  Medium: 'text-[#acb0cd] border-[#C0C0C0]/25',
  Low: 'text-[#acb0cd]/60 border-[#C0C0C0]/15',
};

function ArtVenues({ groups }) {
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
                      <span>★</span> Signature Selection
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

function CultureRows({ rows }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
      {rows.map((r) => (
        <article
          key={r.name}
          className="bg-[#3a3b3f] border border-[#C0C0C0]/15 rounded-2xl p-5 flex flex-col"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <h4 className="text-[#C0C0C0] font-semibold text-[15px] leading-snug">{r.name}</h4>
            <span
              className={`shrink-0 px-2.5 py-0.5 rounded-full border text-[9px] uppercase tracking-[0.12em] ${
                VIP_TONE[r.vip] || VIP_TONE.Medium
              }`}
            >
              {r.vip} VIP
            </span>
          </div>

          <p className="text-[#acb0cd] text-[13px] leading-relaxed">{r.period}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] uppercase tracking-wide bg-[#26272a] border border-[#C0C0C0]/20 text-[#acb0cd]">
              Season {r.season}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] uppercase tracking-wide bg-[#26272a] border border-[#C0C0C0]/20 text-[#acb0cd]">
              Charter {r.months}
            </span>
          </div>

          <p className="mt-3 text-[11px] leading-relaxed text-[#acb0cd]/60 italic">{r.note}</p>
        </article>
      ))}
    </div>
  );
}

function SubRegion({ region, section, artGroups, cultureRows }) {
  const [open, setOpen] = useState(false);
  const count = section === 'art' ? artGroups.length : cultureRows.length;
  const label = section === 'art' ? 'islands with venues' : 'destinations';
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
              {empty ? 'Nothing listed yet' : `${count} ${label}`}
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
            {section === 'art' ? <ArtVenues groups={artGroups} /> : <CultureRows rows={cultureRows} />}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SubRegionStack({ regions, section, artBySub, cultureBySub }) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      {regions.map((r) => (
        <SubRegion
          key={r.slug}
          region={r}
          section={section}
          artGroups={artBySub[r.slug] || []}
          cultureRows={cultureBySub[r.slug] || []}
        />
      ))}
    </div>
  );
}
