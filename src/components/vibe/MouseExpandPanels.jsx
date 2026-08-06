'use client';

// ══ MouseExpandPanels — panneaux qui s'etendent selon la position de la souris ══
// Reproduction de la section comohotels.com : une rangee de panneaux verticaux ;
// celui SURVOLE (sous la souris) s'agrandit et revele numero + titre + description
// + lien "Explore", les autres se reduisent en fines bandes (numero + titre
// vertical). Palette Qualityacht — JAMAIS de blanc (fonds sombres, texte lavande/
// argent, accent orange). Mobile : cartes empilees.

import Image from 'next/image';
import { useState } from 'react';

export default function MouseExpandPanels({ panels = [], height = 'h-[70vh] md:h-[80vh]' }) {
  const [active, setActive] = useState(0);
  if (!panels.length) return null;

  return (
    <section className="bg-[#26272a]">
      {/* ── Desktop : rangee expansible a la souris ── */}
      <div className={`hidden md:flex ${height} w-full overflow-hidden`}>
        {panels.map((p, i) => {
          const isActive = i === active;
          return (
            <div
              key={i}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              tabIndex={0}
              className="group relative h-full min-w-0 overflow-hidden cursor-pointer border-l border-[#26272a] outline-none"
              style={{ flexGrow: isActive ? 6 : 1, flexBasis: 0, transition: 'flex-grow 0.7s cubic-bezier(0.22,1,0.36,1)' }}
            >
              <Image
                src={p.img}
                alt={p.title}
                fill
                sizes="70vw"
                className="object-cover"
                style={{ transform: isActive ? 'scale(1)' : 'scale(1.12)', transition: 'transform 1.2s cubic-bezier(0.22,1,0.36,1)', filter: 'saturate(1.08)' }}
              />
              {/* voile : sombre uniforme si inactif, degrade bas si actif */}
              <div
                className="absolute inset-0"
                style={{
                  background: isActive
                    ? 'linear-gradient(180deg, rgba(38,39,42,0.15) 0%, transparent 35%, rgba(38,39,42,0.35) 65%, rgba(38,39,42,0.9) 100%)'
                    : 'rgba(38,39,42,0.62)',
                  transition: 'background 0.7s ease',
                }}
              />

              {/* Numero (grand, discret) */}
              <span
                className="absolute font-light leading-none pointer-events-none"
                style={{
                  top: isActive ? '2rem' : '1.5rem',
                  left: isActive ? '2.5rem' : '0',
                  right: isActive ? 'auto' : '0',
                  textAlign: isActive ? 'left' : 'center',
                  fontSize: isActive ? '4.5rem' : '2.5rem',
                  color: isActive ? 'rgba(192,192,192,0.35)' : 'rgba(192,192,192,0.7)',
                  transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                {p.number}
              </span>

              {/* Contenu revele (actif) */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12"
                style={{ opacity: isActive ? 1 : 0, transition: 'opacity 0.5s ease', transitionDelay: isActive ? '0.2s' : '0s', pointerEvents: isActive ? 'auto' : 'none' }}
              >
                <h3 className="trajan-regular text-3xl lg:text-5xl uppercase tracking-[0.08em] text-[#C0C0C0] drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] whitespace-nowrap">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-md text-[#acb0cd] text-sm lg:text-base leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
                  {p.desc}
                </p>
                {p.href && (
                  <a href={p.href} className="mt-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#acb0cd] hover:text-[#c2622a] transition-colors w-fit">
                    <span className="w-10 h-px bg-current" /> Explore
                  </a>
                )}
              </div>

              {/* Titre vertical (inactif) */}
              <div
                className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-8 pointer-events-none"
                style={{ opacity: isActive ? 0 : 1, transition: 'opacity 0.4s ease' }}
              >
                <span className="[writing-mode:vertical-rl] rotate-180 trajan-regular text-[18px] lg:text-[24px] uppercase tracking-[0.3em] text-[#C0C0C0] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  {p.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Mobile : cartes empilees ── */}
      <div className="md:hidden flex flex-col gap-1">
        {panels.map((p, i) => (
          <div key={i} className="relative h-64 overflow-hidden">
            <Image src={p.img} alt={p.title} fill sizes="100vw" className="object-cover" style={{ filter: 'saturate(1.08)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(38,39,42,0.1) 0%, transparent 40%, rgba(38,39,42,0.9) 100%)' }} />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <span className="text-[#C0C0C0]/50 text-3xl font-light leading-none">{p.number}</span>
              <h3 className="trajan-regular text-2xl uppercase tracking-[0.08em] text-[#C0C0C0] mt-1">{p.title}</h3>
              <p className="mt-2 text-[#acb0cd] text-sm leading-relaxed">{p.desc}</p>
              {p.href && <a href={p.href} className="mt-3 text-[11px] uppercase tracking-[0.25em] text-[#c2622a]">Explore →</a>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
