'use client';

import Image from 'next/image';
import { useState, useMemo } from 'react';
import YachtFiltersCaribbean from './YachtFiltersCaribbean';
import YachtList from '@/components/YachtList';

// ── Ligne décorative ────────────────────────────────────────────────────────
function BurntLine() {
  return (
    <div className="flex items-center justify-center gap-3 my-3 md:my-4 w-full max-w-xs mx-auto">
      <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, #B03E00)' }} />
      <div className="w-1.5 h-1.5 rotate-45 bg-[#B03E00] shrink-0" />
      <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, #B03E00)' }} />
    </div>
  );
}

// ── Page client ─────────────────────────────────────────────────────────────
export default function GreaterAntillesClient({ initialData, totalYachts }) {
  const [showMore, setShowMore] = useState(false);

  const [filters, setFilters] = useState({
    type: '',
    destination: 'caribbean',
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
    let result = [...initialData];
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
  }, [initialData, filters]);

  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-hidden">

      {/* ══ HERO ══ */}
      <div className="relative h-[60vh] md:h-[75vh]">
        <Image
          src="/images/destinations/greater antillesNB.jpg"
          alt="Greater Antilles"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Overlay général + fondu total en bas vers #26272a */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #26272a 0%, rgba(38,39,42,0.3) 25%, transparent 40%, transparent 50%, rgba(38,39,42,0.3) 72%, #26272a 100%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-10 md:pb-16 z-10 px-4">
          <h1 className="trajan-regular text-3xl md:text-6xl lg:text-7xl uppercase tracking-[0.1em] md:tracking-[0.15em] text-[#acb0cd] text-center">
            Greater Antilles
          </h1>
          <p className="text-[#acb0cd] text-xs md:text-base uppercase tracking-[0.2em] md:tracking-[0.3em] font-light text-center mt-3">
            Cuba &nbsp;·&nbsp; Puerto Rico &nbsp;·&nbsp; Jamaica &nbsp;·&nbsp; Cayman Islands
          </p>
        </div>
      </div>

      {/* ══ DESCRIPTION ══ */}
      <div className="relative">
      <div
        className="py-20 md:py-28 px-5 md:px-20"
        style={{
          backgroundImage: 'url(/images/nuagesAncien.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundColor: '#26272a',
        }}
      >
        <div className="max-w-3xl mx-auto text-center leading-relaxed space-y-6">

          {/* Titre principal */}
          <h2 className="trajan-regular text-lg md:text-2xl text-[#acb0cd] leading-snug">
            The Ultimate Yacht Charter Guide to the{' '}
            <span style={{ color: '#bd9973' }}>Greater Antilles</span>:{' '}
            Where Culture Meets Adventure
          </h2>

          {/* Paragraphe 1 — visible jusqu'à "destination" */}
          <p className="text-sm md:text-base text-[#acb0cd]/90 leading-relaxed">
            The <span style={{ color: '#bd9973' }}>Greater Antilles</span>—home to{' '}
            <span style={{ color: '#bd9973' }}>Cuba, Puerto Rico, Jamaica</span>, and the{' '}
            <span style={{ color: '#bd9973' }}>Cayman Islands</span>—stand as the Caribbean&rsquo;s premier yachting{' '}
            <span style={{ color: '#bd9973' }}>destination</span>.
          </p>

          {/* Partie cachée — à partir de "This archipelago..." */}
          {showMore && (
            <div className="space-y-6">
              <p className="text-sm md:text-base text-[#acb0cd]/90 leading-relaxed">
                This archipelago offers an unmatched blend of{' '}
                <span style={{ color: '#bd9973' }}>rich cultural heritage</span> and{' '}
                <span style={{ color: '#bd9973' }}>breathtaking natural beauty</span>, making it the ideal setting for a{' '}
                <span style={{ color: '#bd9973' }}>luxury yacht charter</span> experience.
              </p>
              <div>
                <h3 className="trajan-regular text-sm md:text-base uppercase tracking-[0.2em] text-[#acb0cd] mb-3">
                  A Journey Through History and Tradition
                </h3>
                <p className="text-sm md:text-base text-[#acb0cd]/90 leading-relaxed">
                  From <span style={{ color: '#bd9973' }}>Cuba&rsquo;s iconic colonial ruins</span> and{' '}
                  <span style={{ color: '#bd9973' }}>legendary cigar lounges</span> to{' '}
                  <span style={{ color: '#bd9973' }}>Puerto Rico&rsquo;s vibrant fusion</span> of Spanish and Caribbean influences,
                  every port delivers a unique, immersive cultural experience.
                </p>
              </div>
              <div>
                <h3 className="trajan-regular text-sm md:text-base uppercase tracking-[0.2em] text-[#acb0cd] mb-3">
                  Unparalleled Natural Wonders
                </h3>
                <p className="text-sm md:text-base text-[#acb0cd]/90 leading-relaxed">
                  The Greater Antilles also boast some of the world&rsquo;s most stunning natural attractions:
                  the <span style={{ color: '#bd9973' }}>second-largest coral reef system</span> off Cuba&rsquo;s coast,{' '}
                  <span style={{ color: '#bd9973' }}>Puerto Rico&rsquo;s pristine beaches</span> and hidden islands,
                  and <span style={{ color: '#bd9973' }}>Jamaica&rsquo;s mystical Blue Mountains</span> and bioluminescent bays.
                  These landscapes create the perfect backdrop for an unforgettable adventure.
                </p>
              </div>
              <p className="text-sm md:text-base italic text-[#acb0cd]/70">
                Ready to set sail for an experience beyond compare? Let&rsquo;s make it happen.
              </p>
            </div>
          )}

          {/* Bouton See More / See Less */}
          <button
            onClick={() => setShowMore(v => !v)}
            className="inline-flex items-center px-6 py-2 border text-[10px] uppercase tracking-[0.3em] transition-all duration-300 hover:opacity-80 cursor-pointer rounded-full"
            style={{ color: '#c2622a', borderColor: '#C0C0C0', backgroundColor: '#26272a' }}
          >
            {showMore ? 'See less' : 'See more'}
          </button>
        </div>
      </div>
      </div>{/* fin relative description */}

      {/* ══ FILTRES + YACHTS ══ */}
      <div
        className="min-h-screen pb-24 md:pb-8 px-4"
        style={{
          backgroundImage: 'url(/images/nuagesAncien.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundColor: '#2e2f32',
        }}
      >
        <div className="max-w-7xl mx-auto pt-10">
          <div className="mb-8 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: '#C0C0C0' }}>
              Available Fleet
            </p>
            <h2 className="trajan-regular text-xl md:text-3xl text-[#acb0cd] uppercase tracking-[0.1em]">
              Yachts in the Caribbean
            </h2>
            <p className="text-xl md:text-3xl mt-3 font-bold" style={{ color: '#B03E00' }}>
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
