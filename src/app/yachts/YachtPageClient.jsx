// src/app/yachts/YachtPageClient.jsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import YachtList from '@/components/YachtList';
import YachtFilters from '@/components/YachtFilters';

const YACHTS_PER_PAGE = 35;

export default function YachtPageClient({ initialFilters, initialData, totalYachts }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState(() => ({
    ...initialFilters,
    capacity: initialFilters.capacity || '',
    priceMax: initialFilters.priceMax || '',
  }));

  const filteredYachts = useMemo(() => {
    let result = [...initialData];

    // Filter by type
    if (filters.type) {
      result = result.filter(y => y.type?.toLowerCase() === filters.type.toLowerCase());
    }

    // Filter by destination
    if (filters.destination) {
      result = result.filter(y => {
        // Ankor yachts use "destination" (string), local yachts use "destinations" (array)
        if (y.destination) {
          return y.destination.toLowerCase().includes(filters.destination.toLowerCase());
        } else if (y.destinations && Array.isArray(y.destinations)) {
          return y.destinations.some(d =>
            d.toLowerCase().includes(filters.destination.toLowerCase())
          );
        }
        return true; // keep if no destination data
      });
    }

    // Filter by capacity
    if (filters.capacity) {
      result = result.filter(y => (y.capacity || y.guests || 0) >= filters.capacity);
    }

    // Filter by max price
    if (filters.priceMax) {
      result = result.filter(y => {
        if (!y.price && !y.pricePerHour) return true;
        return parseFloat(y.price || y.pricePerHour || 0) <= filters.priceMax;
      });
    }

    // Extra filters
    if (filters.petFriendly) result = result.filter(y => y.petFriendly === true);
    if (filters.groupFriendly) result = result.filter(y => y.groupFriendly === true);

    return result;
  }, [initialData, filters]);

  // Paginate filtered yachts
  const totalPages = Math.ceil(filteredYachts.length / YACHTS_PER_PAGE);
  const paginatedYachts = useMemo(() => {
    const startIndex = (currentPage - 1) * YACHTS_PER_PAGE;
    return filteredYachts.slice(startIndex, startIndex + YACHTS_PER_PAGE);
  }, [filteredYachts, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Update URL without reloading
  const updateUrl = (newFilters) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && value !== false) {
        params.set(key, value.toString());
      }
    });
    const queryString = params.toString();
    router.replace(queryString ? `/yachts?${queryString}` : '/yachts', { scroll: false });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    updateUrl(newFilters);
  };

  // Sync filters with URL on mount
  useEffect(() => {
    const urlFilters = {
      type: searchParams.get('type') || '',
      destination: searchParams.get('destination') || '',
      capacity: searchParams.get('capacity') ? Number(searchParams.get('capacity')) : '',
      priceMax: searchParams.get('priceMax') ? Number(searchParams.get('priceMax')) : '',
      petFriendly: searchParams.get('petFriendly') === 'true',
      groupFriendly: searchParams.get('groupFriendly') === 'true',
    };
    setFilters(urlFilters);
  }, [searchParams]);

  return (
    <div
      className="min-h-screen bg-[#1b223d] pt-20 pb-24 md:pb-8"
      style={{
        backgroundImage: 'url(/images/nuagesAncien.png)',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Our Yacht Fleet</h1>
          <p className="text-white">
            {filteredYachts.length} yacht{filteredYachts.length > 1 ? 's' : ''} disponible{filteredYachts.length > 1 ? 's' : ''}
            {totalYachts && totalYachts > filteredYachts.length && ` (${totalYachts} au total)`}
          </p>
        </div>

        {/* Layout */}
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-80 md:flex-shrink-0">
            <YachtFilters filters={filters} onChange={handleFilterChange} />
          </aside>

          <main className="flex-1">
            {filteredYachts.length === 0 ? (
              <div className="text-center py-16 rounded-2xl shadow-lg">
                <div className="text-6xl mb-4">⛵</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun yacht trouvé</h3>
                <p className="text-gray-600">Essayez de modifier vos filtres</p>
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
                      className="px-4 py-2 bg-[#C0A060] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#A08040] transition-colors"
                    >
                      Précédent
                    </button>

                    <div className="flex gap-2">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 rounded-lg transition-colors ${
                              currentPage === pageNum
                                ? 'bg-[#C0A060] text-white'
                                : 'bg-[#2a2a4a] text-gray-300 hover:bg-[#3a3a5a]'
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
                      className="px-4 py-2 bg-[#C0A060] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#A08040] transition-colors"
                    >
                      Suivant
                    </button>
                  </div>
                )}

                <p className="text-center text-gray-400 text-sm">
                  Page {currentPage} sur {totalPages} - Affichage {((currentPage - 1) * YACHTS_PER_PAGE) + 1} à {Math.min(currentPage * YACHTS_PER_PAGE, filteredYachts.length)} sur {filteredYachts.length}
                </p>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
