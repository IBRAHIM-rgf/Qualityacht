'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { YACHTS, TYPE_FILTERS } from './data';

// "Notre liste exclusive" facon globaljet : barre de filtres en haut, SIDEBAR de filtres
// a gauche, et LIGNES de listing COMPACTES a droite (petite vignette + colonnes de specs
// + prix + "view detail"). Photos petites. AUCUN emoji.

function MiniSpec({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-[9px] uppercase tracking-[0.16em] text-[#8b90a0]">{label}</span>
      <span className="text-[13px] text-[#C0C0C0] mt-0.5">{value}</span>
    </div>
  );
}

export default function MotorListings() {
  const [active, setActive] = useState('all');
  const shown = active === 'all' ? YACHTS : YACHTS.filter((y) => y.category === active);

  return (
    <div className="px-6 md:px-14">
      <div className="max-w-6xl mx-auto">
        <h2 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.12em] text-[#C0C0C0] text-center mb-10">
          Our Exclusive List
        </h2>

        {/* barre de filtres */}
        <div className="flex items-center gap-8 border-y border-[#C0C0C0]/15 py-4 mb-8 text-[11px] uppercase tracking-[0.18em]">
          <span className="text-[#c2622a]">Filters</span>
          <span className="text-[#8b90a0]">Price</span>
          <span className="text-[#8b90a0]">Year</span>
          <span className="ml-auto text-[#8b90a0]">
            {shown.length} yacht{shown.length > 1 ? 's' : ''}
          </span>
        </div>

        <div className="grid md:grid-cols-[150px_1fr] gap-6 md:gap-10">
          {/* SIDEBAR filtres par type */}
          <aside className="flex md:flex-col gap-3 md:gap-2 flex-wrap text-[11px] uppercase tracking-[0.16em]">
            {TYPE_FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setActive(f.key)}
                className={`text-left py-1 transition-colors duration-300 ${
                  active === f.key ? 'text-[#c2622a]' : 'text-[#8b90a0] hover:text-[#acb0cd]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </aside>

          {/* LIGNES de listing */}
          <div className="divide-y divide-[#C0C0C0]/10 border-t border-[#C0C0C0]/10">
            {shown.map((y) => (
              <div
                key={y.id}
                className="group grid grid-cols-[110px_1fr] md:grid-cols-[150px_1fr_auto] gap-4 md:gap-6 items-center py-5"
              >
                {/* vignette + badge */}
                <Link
                  href={`/sales/motor/${y.id}`}
                  className="relative block w-full h-[80px] md:h-[95px] rounded-md overflow-hidden"
                >
                  <Image
                    src={encodeURI(y.img)}
                    alt={y.name}
                    fill
                    sizes="150px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                {/* nom + specs */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#c2622a] text-[9px] font-semibold uppercase tracking-[0.12em] text-[#0a1432]">
                      {y.badge}
                    </span>
                    <h3 className="trajan-regular text-sm md:text-base uppercase tracking-[0.08em] text-[#C0C0C0]">
                      {y.name}
                    </h3>
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-[#B87333] mt-1">
                    {y.builder} {y.model}
                  </p>
                  <div className="hidden sm:grid grid-cols-4 gap-3 mt-3 max-w-md">
                    <MiniSpec label="Year" value={y.refit ? `${y.year} · R${y.refit}` : y.year} />
                    <MiniSpec label="Length" value={y.length} />
                    <MiniSpec label="Cabins" value={y.cabins} />
                    <MiniSpec label="Flag" value={y.flag} />
                  </div>
                </div>

                {/* prix + view (passe sous le nom en mobile) */}
                <div className="col-span-2 md:col-span-1 flex items-center justify-between md:flex-col md:items-end gap-2 md:text-right md:pl-4">
                  <div>
                    <p className="text-sm md:text-base text-[#d39478] whitespace-nowrap">{y.price}</p>
                    {y.priceNote && <p className="text-[9px] text-[#8b90a0]">{y.priceNote}</p>}
                  </div>
                  <Link
                    href={`/sales/motor/${y.id}`}
                    className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-[#acb0cd] hover:text-[#c2622a] transition-colors duration-300 whitespace-nowrap"
                  >
                    View detail
                    <span aria-hidden>&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
