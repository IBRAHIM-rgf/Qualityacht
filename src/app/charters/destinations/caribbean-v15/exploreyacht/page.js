import ExploreYachtClient from './ExploreYachtClient';
import { fetchVisibleYachtsForDestination } from '@/lib/yachts';

export const dynamic = 'force-dynamic';

export default async function Page() {
  try {
    const { yachts, totalYachts, filters } = await fetchVisibleYachtsForDestination('caribbean');
    return (
      <ExploreYachtClient
        initialFilters={filters}
        initialData={yachts}
        totalYachts={totalYachts}
      />
    );
  } catch (error) {
    console.error('Caribbean explore yacht page error:', error);
    return (
      <ExploreYachtClient
        initialFilters={{}}
        initialData={[]}
        totalYachts={0}
      />
    );
  }
}
