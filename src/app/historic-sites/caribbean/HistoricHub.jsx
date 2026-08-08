'use client';

// ══ HistoricHub — 3 tuiles (Monuments/Hiking/Cycling) + contenu revele en dessous ══
// Les 3 tuiles restent visibles en haut (comme SplitPanels) ; cliquer sur l'une
// affiche son contenu reel (ExperienceColumns, une seule colonne) juste en dessous,
// sur toute la largeur — plus de navigation vers une autre URL, tout reste sur
// /historic-sites/caribbean. Une seule section ouverte a la fois.

import Image from 'next/image';
import { useState } from 'react';
import ExperienceColumns from '../caribbean-v2/ExperienceColumns';

export default function HistoricHub({ panels, columns }) {
  const [active, setActive] = useState(null);
  const activeColumn = active ? columns.find((c) => c.key === active) : null;

  return (
    <div>
      {/* 3 TUILES */}
      <div className="px-4 md:px-10 lg:px-14 py-14 md:py-20">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden border border-[#C0C0C0]/20 bg-[#2e2f32] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
          <div className="flex flex-col md:flex-row h-auto md:h-[60vh] md:min-h-[420px]">
            {panels.map((p, i) => {
              const isActive = active === p.key;
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setActive(isActive ? null : p.key)}
                  className={`group relative overflow-hidden text-left transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex-1 ${
                    i > 0 ? 'border-t md:border-t-0 md:border-l border-[#C0C0C0]/15' : ''
                  } h-[220px] md:h-auto`}
                >
                  <Image
                    src={encodeURI(p.img)}
                    alt={p.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className={`object-cover transition-all duration-700 ${
                      isActive ? 'scale-105 grayscale-0 opacity-100' : 'scale-100 grayscale opacity-60 group-hover:opacity-80 group-hover:grayscale-0'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#26272a] via-[#26272a]/45 to-[#26272a]/10" />
                  <div
                    className={`absolute inset-x-0 bottom-0 h-[3px] bg-[#B03E00] origin-left transition-transform duration-700 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                  <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
                    <h2 className="trajan-regular text-center text-xl md:text-2xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      {p.title}
                    </h2>
                    <span className={`mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full border text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                      isActive ? 'border-[#c2622a] text-[#c2622a]' : 'border-[#C0C0C0] text-[#acb0cd]'
                    }`}>
                      {isActive ? 'Close' : 'Discover'}
                      <span aria-hidden className="text-[13px] leading-none">{isActive ? '×' : '→'}</span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONTENU REVELE — la section active, pleine largeur */}
      <div
        className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          activeColumn ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {activeColumn && <ExperienceColumns columns={[activeColumn]} />}
      </div>
    </div>
  );
}
