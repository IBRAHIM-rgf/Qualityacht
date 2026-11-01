// src/app/charters/destinations/greater-antilles/page.js

import { seo } from '@/lib/seoMeta';
import GreaterAntillesClient from './GreaterAntillesClient';
import { fetchVisibleYachts } from '@/lib/yachts';


// Titre et description Google (SEO etape 3, client 2026-11-01).
export const metadata = seo('/charters/destinations/greater-antilles');
export const dynamic = 'force-dynamic';

export default async function Page() {
  try {
    const { yachts, totalYachts } = await fetchVisibleYachts({ destination: 'caribbean' });
    return <GreaterAntillesClient initialData={yachts} totalYachts={totalYachts} />;
  } catch (error) {
    console.error('Greater Antilles page error:', error);
    return <GreaterAntillesClient initialData={[]} totalYachts={0} />;
  }
}
