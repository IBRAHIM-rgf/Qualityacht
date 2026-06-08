'use client';

// Page destination jet privé : hero image dédiée à la région + texte "Private Jets"
// qui monte (reveal-up) sur la photo. Liste d'aéroports en dessous.

import Link from 'next/link';
import Image from 'next/image';
import { use, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { getDestinationBySlug } from '../data';

// ── Parsing identique au modal précédent ─────────────────────────────────────
function parseAirport(str) {
  const m = str.match(/^(.+?)\s*\(([A-Z]{2,4})\)\s*[—-]\s*(.+)$/);
  if (m) return { name: m[1].trim(), code: m[2], size: m[3].trim() };
  const noCode = str.split(/\s*[—-]\s*/);
  return { name: noCode[0].trim(), code: null, size: (noCode[1] || '').trim() || null };
}

const CATEGORY_LABEL = {
  'large jets': 'Large jets',
  'all jets': 'All jets',
  'medium/large jets': 'Medium & large jets',
  'medium jets': 'Medium jets',
  'light jets': 'Light jets',
  'stol aircraft only': 'STOL aircraft only',
};
function categoryLabel(size) {
  if (!size) return 'Other';
  const lower = size.toLowerCase();
  for (const key of Object.keys(CATEGORY_LABEL)) {
    if (lower.includes(key)) return CATEGORY_LABEL[key];
  }
  return size.charAt(0).toUpperCase() + size.slice(1);
}
function categoryRank(label) {
  const l = label.toLowerCase();
  if (l.includes('large jets') && !l.includes('medium')) return 0;
  if (l.includes('all jets')) return 1;
  if (l.includes('medium & large') || l.includes('medium/large')) return 2;
  if (l.includes('medium jets')) return 3;
  if (l.includes('light jets')) return 4;
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

  const heroRef = useRef(null);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const t = setTimeout(() => el.classList.add('revealed'), 200);
    return () => clearTimeout(t);
  }, []);

  // ── Accordéon par île ──
  const [openIslands, setOpenIslands] = useState(new Set());
  const toggleIsland = (i) => setOpenIslands(prev => {
    const next = new Set(prev);
    if (next.has(i)) next.delete(i); else next.add(i);
    return next;
  });

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
    <div className="min-h-screen relative bg-[#26272a]">
      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 1.6s ease, transform 1.6s ease; }
        .reveal-up.revealed { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* ══ HERO image région + texte qui monte ══ */}
      {/* Image en entier (max-w/h-viewport, w/h auto) → ratio naturel.
          Wrapper s'adapte à la taille réelle de l'image → texte overlay TOUJOURS sur la photo. */}
      <div className="relative z-20 w-full pt-[70px] md:pt-0 bg-[#26272a]">
        <div className="relative w-full flex justify-center">
          <div className="relative inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={dest.image}
              alt={dest.name}
              className="block w-auto h-auto max-w-full max-h-[calc(100vh-70px)] md:max-h-screen"
            />
            {/* Dégradé bas pour lisibilité du texte */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

            {/* Texte qui monte sur la photo */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-4 pb-4 md:pb-10">
              <div ref={heroRef} className="reveal-up flex flex-col items-center text-center w-full">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#c2622a] mb-2 md:mb-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                  Private Jets
                </p>
                <h1 className="trajan-regular text-2xl md:text-5xl lg:text-6xl uppercase tracking-[0.12em] md:tracking-[0.15em] text-[#acb0cd] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  {dest.name}
                </h1>
                <div className="relative w-24 md:w-32 h-5 md:h-6 mt-3 md:mt-4">
                  <Image src="/images/title-line.png" alt="" fill className="object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fond nuages derrière le contenu (sous le hero) — absolute pour ne pas masquer le Footer */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gray-900" />
          <Image src="/images/nuagesAncien.png" alt="Background clouds" fill className="object-cover opacity-30 grayscale" />
        </div>

        <div className="relative z-10 pt-10 md:pt-16 pb-16 px-5 md:px-10">
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
                href={`/privat-jet/${slug}/contact-broker`}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#C0C0C0] px-5 py-2 text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-[#B03E00] transition-all hover:bg-[#B03E00]/10 hover:border-[#B03E00] shadow-[0_4px_15px_rgba(192,192,192,0.2)]"
              >
                Contact a broker
              </Link>
            </div>

            {/* ══ Groupes îles + aéroports (accordéon : triangle ouvre/ferme la section) ══ */}
            <div className="space-y-6">
              {dest.groups.map((group, i) => {
                const grouped = groupAirports(group.airports);
                const isOpen = openIslands.has(i);
                return (
                  <div key={i}>
                    {/* Titre île cliquable : titre + title-line + triangle dessous */}
                    <button type="button" onClick={() => toggleIsland(i)}
                      className="w-full flex flex-col items-center group">
                      <h2 className="trajan-regular text-base md:text-xl text-[#acb0cd] uppercase tracking-[0.25em] text-center group-hover:text-[#c2622a] transition-colors">
                        {group.island}
                      </h2>
                      <div className="relative w-32 h-6 mt-3">
                        <Image src="/images/title-line.png" alt="" fill className="object-contain" />
                      </div>
                      <ChevronDown className={`w-5 h-5 text-[#c2622a] mt-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Contenu de l'île (déplié si ouvert) */}
                    {isOpen && (
                      <div className="space-y-5 mt-6 animate-[fadeIn_0.3s_ease-out]">
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
                    )}
                  </div>
                );
              })}
            </div>

            {/* ══ CTA bas ══ */}
            <div className="text-center mt-16">
              <Link
                href={`/privat-jet/${slug}/contact-broker`}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#C0C0C0] px-10 py-3 text-sm uppercase tracking-[0.2em] font-medium text-[#B03E00] transition-all hover:bg-[#B03E00]/10 hover:border-[#B03E00] shadow-[0_4px_15px_rgba(192,192,192,0.3)] hover:shadow-[0_6px_20px_rgba(192,192,192,0.4)]"
              >
                Contact a broker
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
