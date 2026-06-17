'use client';

// Composant partagé pour toutes les sous-régions Caraïbes (Greater Antilles,
// Leeward Islands, Leeward Antilles, Windward Islands, Turks & Caicos,
// Trinidad & Tobago, Grand Cayman). Reçoit une config qui définit le nom,
// le hero (NB initial + originale colorée), la liste d'îles, le sous-titre
// et les paragraphes de description.

import Image from 'next/image';
import { useState, useMemo, useEffect, useRef } from 'react';
import YachtFiltersCaribbean from './YachtFiltersCaribbean';
import YachtList from '@/components/YachtList';

function BurntLine() {
  return (
    <div className="flex items-center justify-center gap-3 my-3 md:my-4 w-full max-w-xs mx-auto">
      <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, #B03E00)' }} />
      <div className="w-1.5 h-1.5 rotate-45 bg-[#B03E00] shrink-0" />
      <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, #B03E00)' }} />
    </div>
  );
}

export default function SubregionClient({
  name,
  heroImage,
  heroImageOriginal,
  topIslands = [],
  subTitle,
  intro,
  extraParagraphs = [],
  initialData,
  totalYachts,
}) {
  const [showMore, setShowMore] = useState(false);
  const [heroLit, setHeroLit] = useState(false);
  const heroRef = useRef(null);
  useEffect(() => {
    const t = setTimeout(() => setHeroLit(true), 2000);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    requestAnimationFrame(() => { el.classList.add('revealed'); });
  }, []);

  const [filters, setFilters] = useState({
    type: '', destination: 'caribbean', capacity: '', priceMax: '', priceMin: '',
    minLength: '', maxLength: '', currency: '', petFriendly: false, groupFriendly: false,
  });

  const filteredYachts = useMemo(() => {
    let result = [...(initialData || [])];
    if (filters.type) result = result.filter((y) => y.type && y.type.toLowerCase() === filters.type.toLowerCase());
    if (filters.capacity) result = result.filter((y) => Number(y.capacity || y.guests || 0) >= Number(filters.capacity));
    if (filters.minLength) result = result.filter((y) => (parseFloat(String(y.length).replace(/[^0-9.]/g, '')) || 0) >= Number(filters.minLength));
    if (filters.maxLength) result = result.filter((y) => (parseFloat(String(y.length).replace(/[^0-9.]/g, '')) || 0) <= Number(filters.maxLength));
    if (filters.priceMax && filters.priceMax !== Infinity) {
      result = result.filter((y) => {
        const p = parseInt(String(y.price || y.pricePerHour || '0').replace(/[^0-9]/g, '')) || 0;
        return p <= Number(filters.priceMax);
      });
    }
    if (filters.priceMin) {
      result = result.filter((y) => {
        const p = parseInt(String(y.price || y.pricePerHour || '0').replace(/[^0-9]/g, '')) || 0;
        return p >= Number(filters.priceMin);
      });
    }
    if (filters.petFriendly) result = result.filter((y) => y.pets_allowed === true || y.petFriendly === true);
    if (filters.groupFriendly) result = result.filter((y) => y.groups_allowed === true || y.groupFriendly === true);
    return result;
  }, [initialData, filters]);

  // Découpe les top islands en lignes de 3 pour le hero
  const islandRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < topIslands.length; i += 3) rows.push(topIslands.slice(i, i + 3));
    return rows;
  }, [topIslands]);

  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-hidden">

      {/* ══ HERO (filtre NB / card au chargement, transition vers originale à 2s) ══ */}
      <div className="relative h-[60vh] md:h-[75vh]">
        {/* Fondu enchaîné asymétrique : sortante 3s delay 0, entrante 2.5s delay 1.2s */}
        <Image
          src={heroImage}
          alt={name}
          fill
          priority
          className={`object-cover object-center ease-[cubic-bezier(0.4,0,0.2,1)] ${heroLit ? 'opacity-0 blur-md' : 'opacity-100 blur-0'}`}
          style={{ transitionProperty: 'opacity, filter', transitionDuration: heroLit ? '3000ms' : '2500ms', transitionDelay: heroLit ? '0ms' : '1200ms' }}
        />
        <Image
          src={heroImageOriginal}
          alt={name}
          fill
          className={`object-cover object-center ease-[cubic-bezier(0.4,0,0.2,1)] ${heroLit ? 'opacity-100 blur-0' : 'opacity-0 blur-md'}`}
          style={{ transitionProperty: 'opacity, filter', transitionDuration: heroLit ? '2500ms' : '3000ms', transitionDelay: heroLit ? '1200ms' : '0ms' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #26272a 0%, rgba(38,39,42,0.5) 20%, transparent 38%, transparent 52%, rgba(38,39,42,0.5) 78%, #26272a 100%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-10 md:pb-16 z-10 px-4">
          <div ref={heroRef} className="reveal-up flex flex-col items-center w-full">
            <h1 className="trajan-regular text-3xl md:text-6xl lg:text-7xl uppercase tracking-[0.1em] md:tracking-[0.15em] text-[#acb0cd] text-center">
              {name}
            </h1>
            {islandRows.length > 0 && (
              <div className="text-[#acb0cd] text-xs md:text-base uppercase tracking-[0.2em] md:tracking-[0.3em] font-light text-center mt-3 flex flex-col items-center gap-1">
                {islandRows.map((row, ri) => (
                  <div key={ri} className="flex items-center justify-center gap-2 flex-wrap">
                    <span className="w-1.5 h-1.5 rotate-45 inline-block shrink-0" style={{ backgroundColor: '#c2622a' }} />
                    {row.map((isl, ii) => (
                      <span key={ii} className="flex items-center gap-2">
                        <span>{isl}</span>
                        <span className="w-1.5 h-1.5 rotate-45 inline-block shrink-0" style={{ backgroundColor: '#c2622a' }} />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        :global(.reveal-up) { opacity: 0; transform: translateY(40px); transition: opacity 1.6s ease, transform 1.6s ease; }
        :global(.reveal-up.revealed) { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* ══ DESCRIPTION + FILTRES + YACHTS — même fond ══ */}
      <div
        className="min-h-screen pb-24 md:pb-8 px-4"
        style={{
          backgroundImage: 'url(/images/nuagesAncien.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundColor: '#2e2f32',
        }}
      >
        {/* Description */}
        <div className="max-w-3xl mx-auto text-center leading-relaxed space-y-6 py-16 md:py-24">

          <h2 className="trajan-regular text-lg md:text-2xl text-[#acb0cd] leading-snug">
            The Ultimate Yacht Charter Guide to the{' '}
            <span style={{ color: '#d39478' }}>{name}</span>
            {subTitle && <>:{' '}{subTitle}</>}
          </h2>

          {intro && (
            <p className="text-sm md:text-base text-[#acb0cd]/90 leading-relaxed">
              {intro}
            </p>
          )}

          {showMore && extraParagraphs.length > 0 && (
            <div className="space-y-6">
              {extraParagraphs.map((p, i) =>
                p.heading ? (
                  <div key={i}>
                    <h3 className="trajan-regular text-sm md:text-base uppercase tracking-[0.2em] text-[#acb0cd] mb-3">
                      {p.heading}
                    </h3>
                    <p className="text-sm md:text-base text-[#acb0cd]/90 leading-relaxed">{p.text}</p>
                  </div>
                ) : p.italic ? (
                  <p key={i} className="text-sm md:text-base italic text-[#acb0cd]/70">{p.text}</p>
                ) : (
                  <p key={i} className="text-sm md:text-base text-[#acb0cd]/90 leading-relaxed">{p.text}</p>
                )
              )}
            </div>
          )}

          {extraParagraphs.length > 0 && (
            <button
              onClick={() => setShowMore((v) => !v)}
              className="inline-flex items-center px-6 py-2 border text-[10px] uppercase tracking-[0.3em] transition-all duration-300 hover:opacity-80 cursor-pointer rounded-full"
              style={{ color: '#c2622a', borderColor: '#C0C0C0', backgroundColor: '#2e2f32' }}
            >
              {showMore ? 'See less' : 'See more'}
            </button>
          )}
        </div>

        <div className="max-w-3xl mx-auto flex justify-end pr-2 md:pr-6 mt-10 md:mt-12">
          <a
            href="/request-quote-test-v10?step=1"
            className="inline-flex items-center px-6 py-2 border text-[10px] uppercase tracking-[0.3em] transition-all duration-300 hover:opacity-80 cursor-pointer rounded-full"
            style={{ color: '#c2622a', borderColor: '#C0C0C0', backgroundColor: '#2e2f32' }}
          >
            Contact broker
          </a>
        </div>

        <div className="max-w-7xl mx-auto pt-10">
          <div className="mb-8 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: '#C0C0C0' }}>
              Available Fleet
            </p>
            <h2 className="trajan-regular text-xl md:text-3xl text-[#acb0cd] uppercase tracking-[0.1em]">
              Yachts in the Caribbean
            </h2>
            <p className="text-xl md:text-3xl mt-3" style={{ color: '#B03E00' }}>
              {filteredYachts.length} yacht{filteredYachts.length !== 1 ? 's' : ''} available
            </p>
          </div>

          <YachtFiltersCaribbean filters={filters} onChange={setFilters} />

          <main className="mt-6">
            {filteredYachts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 rounded-2xl bg-[#3a3b3f]/50">
                <div className="relative w-48 h-48 mb-6">
                  <Image src="/images/trans.png" alt="Qualityacht" fill className="object-contain" />
                </div>
                <h3 className="text-xl font-bold text-[#C0C0C0] mb-2">No yachts found</h3>
                <p className="text-gray-400">Try adjusting your filters</p>
              </div>
            ) : (
              <YachtList yachts={filteredYachts} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
