import YachtPageClient from '@/app/yachts/YachtPageClient';
import { fetchYachtsForDestination } from '@/lib/yachts';

export const dynamic = 'force-dynamic';

export default async function Page() {
  // Note: northern-europe retourne erreur 400 de l'API
  const { yachts, totalYachts, filters } = await fetchYachtsForDestination('northern-europe');

  return (
    <YachtPageClient
      initialFilters={filters}
      initialData={yachts}
      totalYachts={totalYachts}
    />
  );
}
