// /charters/destinations/indian-ocean — bateaux publies dans l'admin avec la region « indian-ocean »
// cochee (client 2026-11-01, comme Caribbean et Bahamas).
import { seo } from '@/lib/seoMeta';
import RegionYachtsPage from '../_shared/RegionYachtsPage';

// Titre et description Google (SEO etape 3, client 2026-11-01).
export const metadata = seo('/charters/destinations/indian-ocean');
export const dynamic = 'force-dynamic';

export default function Page() {
  return <RegionYachtsPage region="indian-ocean" />;
}
