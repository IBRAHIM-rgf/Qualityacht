import { seo } from '@/lib/seoMeta';
import YachtPageClient from '@/app/yachts/YachtPageClient';
import { fetchYachtsForDestination } from '@/lib/yachts';


// Titre et description Google (SEO etape 3, client 2026-11-01).
export const metadata = seo('/charters/destinations/africa');
export const dynamic = 'force-dynamic';

export default async function Page() {
  // Note: africa retourne erreur 400 de l'API
  const { yachts, totalYachts, filters } = await fetchYachtsForDestination('africa');

  return (
    <YachtPageClient
      initialFilters={filters}
      initialData={yachts}
      totalYachts={totalYachts}
    />
  );
}
