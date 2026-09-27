import YachtPageClient from '@/app/yachts/YachtPageClient';
import { fetchVisibleYachtsForDestination } from '@/lib/yachts';
import BahamasPopularDestinations from './BahamasPopularDestinations';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const { yachts, totalYachts, filters } = await fetchVisibleYachtsForDestination('bahamas');

  return (
    <>
      {/* Section « Popular Destinations » (fleurs), meme rendu que caribbean-v15. */}
      <BahamasPopularDestinations />
      <YachtPageClient
        initialFilters={filters}
        initialData={yachts}
        totalYachts={totalYachts}
      />
    </>
  );
}
