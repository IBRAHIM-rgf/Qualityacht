'use client';

// Page destination jet privé : fond identique à /not-found (bg-gray-900 + nuagesAncien grayscale).
// Affiche tous les aéroports de la destination (groupés par île, triés par taille).

import Link from 'next/link';
import Image from 'next/image';
import { use } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getDestinationBySlug } from '../data';

// ── Parsing identique au modal précédent ─────────────────────────────────────
function parseAirport(str) {
  const m = str.match(/^(.+?)\s*\(([A-Z]{2,4})\)\s*[—-]\s*(.+)$/);
  if (m) return { name: m[1].trim(), code: m[2], size: m[3].trim() };
  const noCode = str.split(/\s*[—-]\s*/);
  return { name: noCode[0].trim(), code: null, size: (noCode[1] || '').trim() || null };
}

const CATEGORY_LABEL = {
  'grands jets privés': 'Grands jets privés',
  'tous jets privés': 'Tous jets privés',
  'jets privés moyens/grands': 'Jets privés moyens & grands',
  'jets privés moyens': 'Jets privés moyens',
  'petits jets privés': 'Petits jets privés',
  'avions STOL uniquement': 'Avions STOL uniquement',
};
function categoryLabel(size) {
  if (!size) return 'Autre';
  const lower = size.toLowerCase();
  for (const key of Object.keys(CATEGORY_LABEL)) {
    if (lower.includes(key)) return CATEGORY_LABEL[key];
  }
  return size.charAt(0).toUpperCase() + size.slice(1);
}
function categoryRank(label) {
  const l = label.toLowerCase();
  if (l.includes('grands jets privés') && !l.includes('moyens')) return 0;
  if (l.includes('tous jets')) return 1;
  if (l.includes('moyens & grands') || l.includes('moyens/grands')) return 2;
  if (l.includes('jets privés moyens')) return 3;
  if (l.includes('petits jets')) return 4;
  if (l.includes('stol')) return 5;
  return 99;
}
function groupAirports(airports) {
  const buckets = new Map();
  for (const a of airports) {
    const parsed = parseAirport(a);
    const cat = categoryLabel(parsed.size);
    if (!buckets.has(cat)) buckets.set(cat, []);
    buckets.get(cat).push(parsed);
  }
  return [...buckets.entries()].sort((a, b) => categoryRank(a[0]) - categoryRank(b[0]));
}

export default function PrivatJetDestinationPage({ params }) {
  const { slug } = use(params);
  const dest = getDestinationBySlug(slug);

  if (!dest) {
    return (
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gray-900" />
          <Image src="/images/nuagesAncien.png" alt="" fill className="object-cover opacity-30 grayscale" priority />
        </div>
        <div className="relative z-10 text-center px-4">
          <p className="text-gray-400 text-lg mb-6">Destination inconnue.</p>
          <Link href="/privat-jet" className="inline-flex items-center gap-2 text-gray-300 hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fond identique à /not-found */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gray-900" />
        <Image src="/images/nuagesAncien.png" alt="" fill className="object-cover opacity-30 grayscale" priority />
      </div>

      <div className="relative z-10 pt-24 md:pt-28 pb-16 px-5 md:px-10">
        <div className="max-w-5xl mx-auto">

          {/* ══ HEADER ══ */}
          <div className="flex items-start justify-between gap-4 mb-10 flex-wrap">
            <Link
              href="/privat-jet"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#C0C0C0]/40 text-[#acb0cd] hover:border-[#B03E00] hover:text-[#B03E00] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Retour
            </Link>
            <Link
              href="/contact-broker"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#C0C0C0] px-5 py-2 text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-[#B03E00] transition-all hover:bg-[#B03E00]/10 hover:border-[#B03E00] shadow-[0_4px_15px_rgba(192,192,192,0.2)]"
            >
              Contact a broker
            </Link>
          </div>

          <div className="text-center mb-12">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#c2622a] mb-3">Private Jets</p>
            <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.15em] text-[#acb0cd]">{dest.name}</h1>
            <div className="relative w-32 h-6 mx-auto mt-4">
              <Image src="/images/title-line.png" alt="" fill className="object-contain" />
            </div>
          </div>

          {/* ══ Groupes îles + aéroports ══ */}
          <div className="space-y-12">
            {dest.groups.map((group, i) => {
              const grouped = groupAirports(group.airports);
              return (
                <div key={i}>
                  {/* Titre île */}
                  <div className="flex flex-col items-center mb-6">
                    <h2 className="trajan-regular text-base md:text-xl text-[#acb0cd] uppercase tracking-[0.25em] text-center">
                      {group.island}
                    </h2>
                    <div className="w-24 md:w-32 h-px bg-white/20 mt-3" />
                    <span className="text-[#c2622a] text-xs mt-1">▴</span>
                  </div>

                  {/* Sous-sections par catégorie + pills */}
                  <div className="space-y-5">
                    {grouped.map(([cat, airports], gi) => (
                      <div key={gi} className="text-center">
                        {airports.length > 0 && airports[0].code !== null && (
                          <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#acb0cd]/60 italic mb-2">
                            {cat}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2 justify-center">
                          {airports.map((a, ai) => (
                            <span
                              key={ai}
                              className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full border border-[#C0C0C0]/30 bg-[#26272a]/80 backdrop-blur-sm"
                            >
                              <span className="w-1.5 h-1.5 rotate-45 bg-[#c2622a] shrink-0" />
                              <span className="text-[#acb0cd] text-xs md:text-sm">{a.name}</span>
                              {a.code && <span className="text-[#C0C0C0]/70 text-[10px] md:text-xs font-mono">({a.code})</span>}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ══ CTA bas ══ */}
          <div className="text-center mt-16">
            <Link
              href="/contact-broker"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#C0C0C0] px-10 py-3 text-sm uppercase tracking-[0.2em] font-medium text-[#B03E00] transition-all hover:bg-[#B03E00]/10 hover:border-[#B03E00] shadow-[0_4px_15px_rgba(192,192,192,0.3)] hover:shadow-[0_6px_20px_rgba(192,192,192,0.4)]"
            >
              Contact a broker
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
