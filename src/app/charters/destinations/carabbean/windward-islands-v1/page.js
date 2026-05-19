import { fetchVisibleYachtsForSubRegion } from '@/lib/yachts';
import WindwardIslandsClient from './WindwardIslandsClient';

export const dynamic = 'force-dynamic';

export default async function Page() {
  try {
    const { yachts, totalYachts } = await fetchVisibleYachtsForSubRegion('caribbean', 'windward-islands');
    return <WindwardIslandsClient yachts={yachts} totalYachts={totalYachts} />;
  } catch (error) {
    console.error('Windward Islands page error:', error);
    return <WindwardIslandsClient yachts={[]} totalYachts={0} />;
  }
}
