// src/app/charters/destinations/greater-antilles/page.js

import GreaterAntillesClient from './GreaterAntillesClient';
import { fetchVisibleYachts } from '@/lib/yachts';

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
