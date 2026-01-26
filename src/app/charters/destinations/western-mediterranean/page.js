import YachtPageClient from '@/app/yachts/YachtPageClient';
import { fetchYachtsForDestination } from '@/lib/yachts';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const { yachts, totalYachts, filters } = await fetchYachtsForDestination('west-mediterranean');

  return (
    <YachtPageClient
      initialFilters={filters}
      initialData={yachts}
      totalYachts={totalYachts}
    />
  );
}
