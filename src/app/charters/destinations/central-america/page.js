import YachtPageClient from '@/app/yachts/YachtPageClient';
import { fetchYachtsForDestination } from '@/lib/yachts';

export const dynamic = 'force-dynamic';

export default async function Page() {
  // Note: south-central-america retourne erreur 400 de l'API
  const { yachts, totalYachts, filters } = await fetchYachtsForDestination('south-central-america');

  return (
    <YachtPageClient
      initialFilters={filters}
      initialData={yachts}
      totalYachts={totalYachts}
    />
  );
}
