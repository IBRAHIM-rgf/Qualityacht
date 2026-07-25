'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Liste des yachts a la vente — structure facon globaljet.aero/en/sales (liste verticale
// de listings pleine largeur), mais aux couleurs Qualityacht sur le fond bleu marine
// #0a1432. Chaque ligne : photo + badge de statut a gauche, nom + type + prix + specs +
// bouton a droite. Filtres par type au-dessus. LES 3 YACHTS SONT FICTIFS (demo design).
// AUCUN emoji.

// Yachts REELS (annonces Ventura Europe). Specs telles que publiees uniquement — aucune
// donnee inventee (guests/vitesse non communiques => non affiches).
const YACHTS = [
  {
    id: 'last-man-standing',
    name: 'Last Man Standing',
    type: 'Motor Yacht',
    builder: 'Astondoa 102 GLX',
    year: 2003,
    length: '34 m',
    beam: '7 m',
    cabins: 4,
    crew: 2,
    flag: 'British',
    price: '€ 2,200,000',
    priceNote: 'VAT paid',
    badge: 'For Sale',
    category: 'motor',
    img: '/images/Sales/last-man-standing.jpg',
  },
  {
    id: 'pobedy-i',
    name: 'Pobedy I',
    type: 'Motor Yacht',
    builder: 'Maiora 26',
    year: 2004,
    refit: 2025,
    length: '26.5 m',
    beam: '5.58 m',
    cabins: 4,
    crew: 2,
    flag: 'Portuguese',
    price: '€ 1,195,000',
    priceNote: 'VAT paid',
    badge: 'Price Reduced',
    category: 'motor',
    img: '/images/Sales/pobedy-i.jpg',
  },
];

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'motor', label: 'Motor' },
  { key: 'sailing', label: 'Sailing' },
  { key: 'explorer', label: 'Explorer' },
];

function Spec({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] uppercase tracking-[0.16em] text-[#8b90a0]">{label}</span>
      <span className="text-sm md:text-base text-[#C0C0C0] mt-0.5">{value}</span>
    </div>
  );
}

export default function SalesList() {
  const [active, setActive] = useState('all');
  const shown = active === 'all' ? YACHTS : YACHTS.filter((y) => y.category === active);

  return (
    <div className="px-6 md:px-14 pb-6">
      <div className="max-w-6xl mx-auto">
        {/* BARRE DE FILTRES (seul "Filters" est orange, cf. charte) */}
        <div className="flex flex-wrap items-center gap-3 mb-8 md:mb-10">
          <span className="inline-flex items-center px-4 py-2 rounded-full border border-[#C0C0C0] text-[11px] uppercase tracking-[0.2em] text-[#c2622a]">
            Filters
          </span>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActive(f.key)}
              className={`px-4 py-2 rounded-full border text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                active === f.key
                  ? 'border-[#C0C0C0] text-[#C0C0C0] bg-white/[0.05]'
                  : 'border-[#C0C0C0]/30 text-[#acb0cd] hover:border-[#B03E00] hover:text-[#c2622a]'
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto text-[12px] text-[#8b90a0]">
            {shown.length} yacht{shown.length > 1 ? 's' : ''}
          </span>
        </div>

        {/* LISTE DES LISTINGS */}
        <div className="space-y-6 md:space-y-8">
          {shown.map((y) => (
            <article
              key={y.id}
              className="group grid md:grid-cols-[minmax(0,44%)_1fr] rounded-2xl overflow-hidden border border-[#C0C0C0]/20 bg-white/[0.03] shadow-[0_30px_80px_-50px_rgba(0,0,0,0.9)]"
            >
              {/* PHOTO + badge de statut */}
              <div className="relative h-[240px] md:h-auto md:min-h-[300px] overflow-hidden">
                <Image
                  src={encodeURI(y.img)}
                  alt={y.name}
                  fill
                  sizes="(max-width:768px) 100vw, 45vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1432]/70 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0a1432]/40" />
                <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full bg-[#c2622a] text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0a1432]">
                  {y.badge}
                </span>
              </div>

              {/* INFOS */}
              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="trajan-regular text-xl md:text-2xl uppercase tracking-[0.08em] text-[#C0C0C0] leading-tight">
                      {y.name}
                    </h2>
                    <p className="mt-1 text-[12px] uppercase tracking-[0.16em] text-[#B87333]">
                      {y.type} &middot; {y.builder}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#8b90a0]">Asking</p>
                    <p className="text-lg md:text-2xl text-[#d39478] leading-tight">{y.price}</p>
                    {y.priceNote && <p className="text-[10px] text-[#8b90a0] mt-0.5">{y.priceNote}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                  <Spec label="Length" value={y.length} />
                  <Spec label="Year" value={y.refit ? `${y.year} · Refit ${y.refit}` : y.year} />
                  <Spec label="Beam" value={y.beam} />
                  <Spec label="Cabins" value={y.cabins} />
                  <Spec label="Crew" value={y.crew} />
                  <Spec label="Flag" value={y.flag} />
                </div>

                <div className="mt-7 md:mt-auto pt-6 flex items-center justify-between gap-4 border-t border-[#C0C0C0]/10">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-[#8b90a0]">
                    Ref. QA-{y.id.slice(0, 3).toUpperCase()}-{y.year}
                  </span>
                  <Link
                    href="/request-quote"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C0C0C0] text-[11px] uppercase tracking-[0.18em] text-[#acb0cd] transition-colors duration-300 hover:border-[#B03E00] hover:text-[#c2622a]"
                  >
                    View details
                    <span aria-hidden className="text-[13px] leading-none">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
