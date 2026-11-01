import { seo } from '@/lib/seoMeta';
import YachtPageClient from '@/app/yachts/YachtPageClient';
import { fetchYachtsForDestination } from '@/lib/yachts';


// Titre et description Google (SEO etape 3, client 2026-11-01).
export const metadata = seo('/charters/destinations/pacific-ocean');
export const dynamic = 'force-dynamic';

export default async function Page() {
  const { yachts, totalYachts, filters } = await fetchYachtsForDestination('south-pacific');

  return (
    <YachtPageClient
      initialFilters={filters}
      initialData={yachts}
      totalYachts={totalYachts}
    />
  );
}
