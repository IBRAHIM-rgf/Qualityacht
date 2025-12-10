// src/app/yachts/YachtPageClient.jsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import YachtList from '@/components/YachtList';
import YachtFilters from '@/components/YachtFilters';

export default function YachtPageClient({ initialFilters, initialData }) {
  const router = useRouter();
  const searchParams = useSearchParams();

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
          <p className="text-gray-600">
            {filteredYachts.length} yacht{filteredYachts.length > 1 ? 's' : ''} available
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">Non yachts found</h3>
                <p className="text-gray-600">Try adjusting your search filters</p>
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
