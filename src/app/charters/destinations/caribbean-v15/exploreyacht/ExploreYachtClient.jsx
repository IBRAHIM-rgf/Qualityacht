'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import YachtList from '@/components/YachtList';
import YachtFilters from '@/components/YachtFilters';

const YACHTS_PER_PAGE = 40;

export default function ExploreYachtClient({ initialFilters, initialData, totalYachts }) {
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState(() => ({
    type: '',
    destination: '',
    capacity: '',
    minLength: '',
    maxLength: '',
    priceMin: '',
    priceMax: '',
    currency: '',
    petFriendly: false,
    groupFriendly: false,
    waterToys: false,
    couplesFriendly: false,
    startDate: '',
    endDate: '',
    ...initialFilters,
    capacity: initialFilters?.capacity || '',
    priceMax: initialFilters?.priceMax || '',
    // Les yachts sont déjà filtrés "caribbean" côté serveur : on n'applique PAS
    // de filtre destination côté client (sinon il élimine tout, les yachts bruts
    // Ankor ne portant pas de tag region 'caribbean').
    destination: '',
  }));

  const filteredYachts = useMemo(() => {
    let result = [...initialData];

    if (filters.type) {
      result = result.filter(y => y.type && y.type.toLowerCase() === filters.type.toLowerCase());
    }
    if (filters.destination) {
      result = result.filter(y => {
        if (y.region === filters.destination) return true;
        if (y.destinations && Array.isArray(y.destinations)) {
          return y.destinations.some(d => d.toLowerCase().includes(filters.destination.toLowerCase()));
        }
        if (y.location) return y.location.toLowerCase().includes(filters.destination.toLowerCase());
        return false;
      });
    }
    if (filters.capacity) {
      const req = Number(filters.capacity);
      result = result.filter(y => Number(y.capacity || y.guests || 0) >= req);
    }
    if (filters.minLength) {
      const minLen = Number(filters.minLength);
      result = result.filter(y => (parseFloat(String(y.length).replace(/[^0-9.]/g, '')) || 0) >= minLen);
    }
    if (filters.maxLength) {
      const maxLen = Number(filters.maxLength);
      result = result.filter(y => (parseFloat(String(y.length).replace(/[^0-9.]/g, '')) || 0) <= maxLen);
    }
    if (filters.priceMax && filters.priceMax !== Infinity) {
      const maxPrice = Number(filters.priceMax);
      result = result.filter(y => {
        if (!y.price && !y.pricePerHour) return true;
        const price = parseInt(String(y.price || y.pricePerHour || '0').replace(/[^0-9]/g, '')) || 0;
        return price <= maxPrice;
      });
    }
    if (filters.priceMin) {
      const minPrice = Number(filters.priceMin);
      result = result.filter(y => {
        if (!y.price && !y.pricePerHour) return false;
        const price = parseInt(String(y.price || y.pricePerHour || '0').replace(/[^0-9]/g, '')) || 0;
        return price >= minPrice;
      });
    }
    if (filters.petFriendly) result = result.filter(y => y.pets_allowed === true || y.petFriendly === true);
    if (filters.groupFriendly) result = result.filter(y => y.groups_allowed === true || y.groupFriendly === true);

    return result;
  }, [initialData, filters]);

  const totalPages = Math.ceil(filteredYachts.length / YACHTS_PER_PAGE);
  const paginatedYachts = useMemo(() => {
    const startIndex = (currentPage - 1) * YACHTS_PER_PAGE;
    return filteredYachts.slice(startIndex, startIndex + YACHTS_PER_PAGE);
  }, [filteredYachts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <div
      className="min-h-screen bg-[#2e2f32] pt-20 pb-24 md:pb-8"
      style={{
        backgroundImage: 'url(/images/nuagesAncien.png)',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="trajan-regular text-3xl md:text-4xl text-[#C0C0C0] mb-2 text-center uppercase tracking-[0.1em]">
            Caribbean<br />Our Yacht Fleet
          </h1>
          <p className="text-[#acb0cd] text-center">
            {filteredYachts.length} yacht{filteredYachts.length > 1 ? 's' : ''} available
            {totalYachts && totalYachts > filteredYachts.length ? ` (${totalYachts} total)` : ''}
          </p>
        </div>

        {/* Filters (mobile bouton orange) */}
        <YachtFilters filters={filters} onChange={setFilters} mobileButtonClass="text-[#B03E00]" />

        {/* Yacht Grid */}
        <main className="mt-6">
          {filteredYachts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 rounded-2xl bg-[#3a3b3f]/50">
              <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6">
                <Image src="/images/trans.png" alt="Qualityacht" fill className="object-contain" />
              </div>
              <h3 className="text-xl font-bold text-[#C0C0C0] mb-2">No yachts found</h3>
              <p className="text-gray-400">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <YachtList yachts={paginatedYachts} />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8 mb-8">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-[#C0C0C0] text-[#acb0cd] bg-[#3a3b3f] transition-colors hover:border-[#B03E00] hover:text-[#B03E00] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#C0C0C0] disabled:hover:text-[#acb0cd]"
                  >
                    Previous
                  </button>

                  <div className="flex gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) pageNum = i + 1;
                      else if (currentPage <= 3) pageNum = i + 1;
                      else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                      else pageNum = currentPage - 2 + i;
                      const isActive = currentPage === pageNum;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-lg border transition-colors ${
                            isActive
                              ? 'bg-[#B03E00] border-[#B03E00] text-white'
                              : 'bg-[#3a3b3f] border-[#C0C0C0] text-[#acb0cd] hover:border-[#B03E00] hover:text-[#B03E00]'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-[#C0C0C0] text-[#acb0cd] bg-[#3a3b3f] transition-colors hover:border-[#B03E00] hover:text-[#B03E00] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#C0C0C0] disabled:hover:text-[#acb0cd]"
                  >
                    Next
                  </button>
                </div>
              )}

              <p className="text-center text-[#acb0cd]/70 text-sm">
                Page {currentPage} of {totalPages} — Showing {((currentPage - 1) * YACHTS_PER_PAGE) + 1} to {Math.min(currentPage * YACHTS_PER_PAGE, filteredYachts.length)} of {filteredYachts.length}
              </p>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
