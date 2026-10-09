'use client';

// Choix de l'ile en haut de /historic-sites/caribbean/monuments (client 2026-10-09) :
// un bouton par ile, les sites de l'ile choisie s'affichent dessous avec les memes
// cartes que la Jamaique (ExperienceColumns, variante monument).

import { useState } from 'react';
import ExperienceColumns from '../caribbean-v2/ExperienceColumns';

export default function MonumentIslands({ islands }) {
  const [active, setActive] = useState(islands[0].key);
  const island = islands.find((i) => i.key === active) || islands[0];

  return (
    <div>
      <div className="px-6 md:px-14 pt-10 md:pt-12">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2 md:gap-3" role="tablist">
          {islands.map((i) => {
            const on = i.key === active;
            return (
              <button
                key={i.key}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i.key)}
                className={`rounded-full border px-4 py-2 text-[12px] md:text-[13px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                  on
                    ? 'border-[#c2622a] bg-[#c2622a]/15 text-[#c2622a]'
                    : 'border-[#C0C0C0]/40 text-[#acb0cd] hover:border-[#c2622a] hover:text-[#c2622a]'
                }`}
              >
                {i.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* key : la vue agrandie et l'animation repartent a zero a chaque ile. */}
      <ExperienceColumns key={island.key} columns={[island.column]} />
    </div>
  );
}
