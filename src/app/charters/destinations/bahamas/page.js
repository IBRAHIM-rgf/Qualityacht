import YachtPageClient from '@/app/yachts/YachtPageClient';
import { fetchVisibleYachtsForDestination } from '@/lib/yachts';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const { yachts, totalYachts, filters } = await fetchVisibleYachtsForDestination('bahamas');

  return (
    <YachtPageClient
      initialFilters={filters}
      initialData={yachts}
      totalYachts={totalYachts}
    />
  );
}
