// src/app/yachts/YachtPageClient.jsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import YachtList from '@/components/YachtList';
import YachtFilters from '@/components/YachtFilters';
import Link from 'next/link';
import { readCart, subscribeCart } from '@/lib/quoteCart';

// ── Boutons de parcours (demande client 2026-09-10) ──
// « Return to the Islands » : retour a la section Explore Caribbean Islands.
// « Proceed to Confirmation — N Yachts Selected » : compteur = selection partagee
// (lib/quoteCart, alimentee par les coeurs des cartes) ; desactive si vide.
const ISLANDS_HREF = '/charters/destinations/caribbean-v15#explore-caribbean-islands';
const CONFIRM_HREF = '/request-quote';

const FOCUS =
  'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]';
const BTN_BASE =
  'inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center text-center px-6 py-2.5 rounded-full border ' +
  'text-[12px] font-semibold uppercase tracking-[0.16em] transition-[border-color,box-shadow,opacity] duration-300 ' + FOCUS;
const BTN_ARGENT =
  BTN_BASE + ' border-[#C0C0C0] bg-[#26272a]/60 backdrop-blur-sm text-[#C0C0C0] hover:border-[#c2622a] hover:shadow-[0_0_18px_rgba(194,98,42,0.35)]';
const BTN_CUIVRE =
  BTN_BASE + ' border-[#C0C0C0] bg-[#26272a] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] hover:border-[#c2622a] hover:shadow-[0_0_24px_rgba(194,98,42,0.45)]';
const BTN_OFF =
  BTN_BASE + ' border-[#C0C0C0]/30 bg-[#26272a]/60 text-[#8b90a0] cursor-not-allowed';

function ProceedButton({ count }) {
  if (count < 1) {
    return (
      <span role="button" aria-disabled="true" className={BTN_OFF}>
        Select at Least One Yacht to Continue
      </span>
    );
  }
  return (
    <Link href={CONFIRM_HREF} className={BTN_CUIVRE}>
      Proceed to Confirmation &mdash; {count} Yacht{count > 1 ? 's' : ''} Selected
    </Link>
  );
}

const YACHTS_PER_PAGE = 40;

export default function YachtPageClient({ initialFilters, initialData, totalYachts }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  // Nombre de yachts selectionnes (selection partagee, synchronisee entre onglets).
  const [selectedCount, setSelectedCount] = useState(0);
  useEffect(() => {
    setSelectedCount(readCart().length);
    return subscribeCart((list) => setSelectedCount(list.length));
  }, []);

  const [filters, setFilters] = useState(() => ({
    ...initialFilters,
    capacity: initialFilters.capacity || '',
    priceMax: initialFilters.priceMax || '',
  }));

  const filteredYachts = useMemo(() => {
    let result = [...initialData];

    // Filter by type
    if (filters.type) {
      result = result.filter(y => {
        if (!y.type) return false;
        return y.type.toLowerCase() === filters.type.toLowerCase();
      });
    }

    // Filter by destination/region
    if (filters.destination) {
      result = result.filter(y => {
        // Vérifier la région assignée dans la BDD
        if (y.region === filters.destination) {
          return true;
        }
        // Vérifier les destinations du yacht
        if (y.destinations && Array.isArray(y.destinations)) {
          return y.destinations.some(d =>
            d.toLowerCase().includes(filters.destination.toLowerCase())
          );
        }
        // Vérifier la location du yacht
        if (y.location) {
          return y.location.toLowerCase().includes(filters.destination.toLowerCase());
        }
        return false;
      });
    }

    // Filter by sub-region (cascade depuis destination)
    if (filters.subRegion) {
      result = result.filter(y => y.subRegion === filters.subRegion);
    }

    // Filter by capacity
    if (filters.capacity) {
      const requiredCapacity = Number(filters.capacity);
      result = result.filter(y => {
        const yachtCapacity = Number(y.capacity || y.guests || 0);
        return yachtCapacity >= requiredCapacity;
      });
    }

    // Filter by length
    if (filters.minLength) {
      const minLen = Number(filters.minLength);
      result = result.filter(y => {
        const length = parseFloat(String(y.length).replace(/[^0-9.]/g, '')) || 0;
        return length >= minLen;
      });
    }

    if (filters.maxLength) {
      const maxLen = Number(filters.maxLength);
      result = result.filter(y => {
        const length = parseFloat(String(y.length).replace(/[^0-9.]/g, '')) || 0;
        return length <= maxLen;
      });
    }

    // Filter by price (with Infinity handling)
    if (filters.priceMax && filters.priceMax !== Infinity) {
      const maxPrice = Number(filters.priceMax);
      result = result.filter(y => {
        if (!y.price && !y.pricePerHour) return true;
        const priceStr = String(y.price || y.pricePerHour || '0').replace(/[^0-9]/g, '');
        const price = parseInt(priceStr) || 0;
        return price <= maxPrice;
      });
    }

    if (filters.priceMin) {
      const minPrice = Number(filters.priceMin);
      result = result.filter(y => {
        if (!y.price && !y.pricePerHour) return false;
        const priceStr = String(y.price || y.pricePerHour || '0').replace(/[^0-9]/g, '');
        const price = parseInt(priceStr) || 0;
        return price >= minPrice;
      });
    }

    // Extra filters
    if (filters.petFriendly) {
      result = result.filter(y => y.pets_allowed === true || y.petFriendly === true);
    }
    if (filters.groupFriendly) {
      result = result.filter(y => y.groups_allowed === true || y.groupFriendly === true);
    }

    // Tri par taille (longueur) decroissante.
    result.sort((a, b) => {
      const la = parseFloat(String(a.length).replace(/[^0-9.]/g, '')) || 0;
      const lb = parseFloat(String(b.length).replace(/[^0-9.]/g, '')) || 0;
      return lb - la;
    });
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
      subRegion: searchParams.get('subRegion') || '',
      capacity: searchParams.get('capacity') ? Number(searchParams.get('capacity')) : '',
      minLength: searchParams.get('minLength') ? Number(searchParams.get('minLength')) : '',
      maxLength: searchParams.get('maxLength') ? Number(searchParams.get('maxLength')) : '',
      priceMin: searchParams.get('priceMin') ? Number(searchParams.get('priceMin')) : '',
      priceMax: searchParams.get('priceMax') ? Number(searchParams.get('priceMax')) : '',
      currency: searchParams.get('currency') || '',
      petFriendly: searchParams.get('petFriendly') === 'true',
      groupFriendly: searchParams.get('groupFriendly') === 'true',
    };
    setFilters(urlFilters);
  }, [searchParams]);

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
          <h1 className="text-3xl md:text-4xl font-bold text-[#C0C0C0] mb-2 text-center">Our Yacht Fleet</h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-gray-300">
              {filteredYachts.length} yacht{filteredYachts.length > 1 ? 's' : ''} available
              {totalYachts && totalYachts > filteredYachts.length && ` (${totalYachts} total)`}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link href={ISLANDS_HREF} className={BTN_ARGENT}>Return to the Islands</Link>
              <ProceedButton count={selectedCount} />
            </div>
          </div>
        </div>

        {/* Filters (horizontal, sticky) */}
        <YachtFilters filters={filters} onChange={handleFilterChange} />

        {/* Yacht Grid */}
        <main className="mt-6">
          {filteredYachts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 rounded-2xl bg-[#3a3b3f]/50">
              <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6">
                <Image
                  src="/images/trans.png"
                  alt="Qualityacht"
                  fill
                  className="object-contain"
                />
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
                    className="px-4 py-2 bg-[#bd9973] text-[#0B0F1A] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#c4826a] transition-colors"
                  >
                    Previous
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
                              ? 'bg-[#bd9973] text-[#0B0F1A]'
                              : 'bg-[#3a3b3f] text-gray-300 hover:bg-[#4a4b4f]'
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
                    className="px-4 py-2 bg-[#bd9973] text-[#0B0F1A] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#c4826a] transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}

              <p className="text-center text-gray-400 text-sm">
                Page {currentPage} of {totalPages} - Showing {((currentPage - 1) * YACHTS_PER_PAGE) + 1} to {Math.min(currentPage * YACHTS_PER_PAGE, filteredYachts.length)} of {filteredYachts.length}
              </p>
            </>
          )}
        </main>

        {/* Bouton de confirmation repete en bas de la liste, aligne a droite */}
        {filteredYachts.length > 0 && (
          <div className="mt-8 flex justify-end">
            <ProceedButton count={selectedCount} />
          </div>
        )}
      </div>
    </div>
  );
}
