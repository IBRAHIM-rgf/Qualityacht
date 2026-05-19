'use client';

// Template de page sous-région (style greater-antilles-v11 généralisé)
// Hero NB→couleur au hover + losanges îles, description See more/less,
// compteur yachts, filtres, liste yachts.

import Image from 'next/image';
import { useState, useMemo } from 'react';
import YachtFiltersRegion from './YachtFiltersRegion';
import YachtList from '@/components/YachtList';

function HeroLosangeGroup({ items }) {
  // Mise en page : 2 lignes max, losanges autour de chaque nom
  if (!items || items.length === 0) return null;
  const mid = Math.ceil(items.length / 2);
  const row1 = items.slice(0, mid);
  const row2 = items.slice(mid);
  const renderRow = (row, key) => (
    <div key={key} className="flex items-center justify-center gap-2 flex-wrap">
      <span className="w-1.5 h-1.5 rotate-45 inline-block shrink-0" style={{ backgroundColor: '#c2622a' }} />
      {row.map((name, i) => (
        <span key={i} className="flex items-center gap-2">
          <span>{name}</span>
          <span className="w-1.5 h-1.5 rotate-45 inline-block shrink-0" style={{ backgroundColor: '#c2622a' }} />
        </span>
      ))}
    </div>
  );
  return (
    <div className="text-[#acb0cd] text-xs md:text-base uppercase tracking-[0.2em] md:tracking-[0.3em] font-light text-center mt-3 flex flex-col items-center gap-1">
      {renderRow(row1, 'r1')}
      {row2.length > 0 && renderRow(row2, 'r2')}
    </div>
  );
}

export default function SubRegionPage({
  title,
  heroImage,
  heroIslands = [],
  shortDescription,
  longDescription = null,
  fleetTitle,
  yachts,
  destinationsDropdown = [],
  defaultDestinationValue = '',
}) {
  const [showMore, setShowMore] = useState(false);

  const [filters, setFilters] = useState({
    type: '',
    destination: defaultDestinationValue,
    capacity: '',
    priceMax: '',
    priceMin: '',
    minLength: '',
    maxLength: '',
    currency: '',
    petFriendly: false,
    groupFriendly: false,
  });

  const filteredYachts = useMemo(() => {
    let result = [...(yachts || [])];
    if (filters.type) {
      result = result.filter(y => y.type && y.type.toLowerCase() === filters.type.toLowerCase());
    }
    if (filters.capacity) {
      result = result.filter(y => Number(y.capacity || y.guests || 0) >= Number(filters.capacity));
    }
    if (filters.minLength) {
      result = result.filter(y => (parseFloat(String(y.length).replace(/[^0-9.]/g, '')) || 0) >= Number(filters.minLength));
    }
    if (filters.maxLength) {
      result = result.filter(y => (parseFloat(String(y.length).replace(/[^0-9.]/g, '')) || 0) <= Number(filters.maxLength));
    }
    if (filters.priceMax && filters.priceMax !== Infinity) {
      result = result.filter(y => {
        const p = parseInt(String(y.price || y.pricePerHour || '0').replace(/[^0-9]/g, '')) || 0;
        return p <= Number(filters.priceMax);
      });
    }
    if (filters.priceMin) {
      result = result.filter(y => {
        const p = parseInt(String(y.price || y.pricePerHour || '0').replace(/[^0-9]/g, '')) || 0;
        return p >= Number(filters.priceMin);
      });
    }
    if (filters.petFriendly) result = result.filter(y => y.pets_allowed === true || y.petFriendly === true);
    if (filters.groupFriendly) result = result.filter(y => y.groups_allowed === true || y.groupFriendly === true);
    return result;
  }, [yachts, filters]);

  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-hidden">

      {/* ══ HERO ══ */}
      <div className="relative h-[60vh] md:h-[75vh]">
        <Image
          src={heroImage}
          alt={title}
          fill
          priority
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #26272a 0%, rgba(38,39,42,0.5) 20%, transparent 38%, transparent 52%, rgba(38,39,42,0.5) 78%, #26272a 100%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-10 md:pb-16 z-10 px-4">
          <h1 className="trajan-regular text-3xl md:text-6xl lg:text-7xl uppercase tracking-[0.1em] md:tracking-[0.15em] text-[#acb0cd] text-center">
            {title}
          </h1>
          <HeroLosangeGroup items={heroIslands} />
        </div>
      </div>

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
        <div className="max-w-3xl mx-auto text-center leading-relaxed space-y-6 py-16 md:py-24">
          {shortDescription}

          {showMore && longDescription && (
            <div className="space-y-6">
              {longDescription}
            </div>
          )}

          {longDescription && (
            <button
              onClick={() => setShowMore(v => !v)}
              className="inline-flex items-center px-6 py-2 border text-[10px] uppercase tracking-[0.3em] transition-all duration-300 hover:opacity-80 cursor-pointer rounded-full"
              style={{ color: '#c2622a', borderColor: '#C0C0C0', backgroundColor: '#2e2f32' }}
            >
              {showMore ? 'See less' : 'See more'}
            </button>
          )}
        </div>

        <div className="max-w-7xl mx-auto pt-10">
          <div className="mb-8 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: '#C0C0C0' }}>
              Available Fleet
            </p>
            <h2 className="trajan-regular text-xl md:text-3xl text-[#acb0cd] uppercase tracking-[0.1em]">
              {fleetTitle || `Yachts in the ${title}`}
            </h2>
            <p className="text-xl md:text-3xl mt-3" style={{ color: '#B03E00' }}>
              {filteredYachts.length} yacht{filteredYachts.length !== 1 ? 's' : ''} available
            </p>
          </div>

          <YachtFiltersRegion
            filters={filters}
            onChange={setFilters}
            destinations={destinationsDropdown}
            defaultDestinationValue={defaultDestinationValue}
          />

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
