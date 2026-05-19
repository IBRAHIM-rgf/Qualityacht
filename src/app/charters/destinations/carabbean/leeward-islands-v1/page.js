import { fetchVisibleYachtsForSubRegion } from '@/lib/yachts';
import LeewardIslandsClient from './LeewardIslandsClient';

export const dynamic = 'force-dynamic';

export default async function Page() {
  try {
    const { yachts, totalYachts } = await fetchVisibleYachtsForSubRegion('caribbean', 'leeward-islands');
    return <LeewardIslandsClient yachts={yachts} totalYachts={totalYachts} />;
  } catch (error) {
    console.error('Leeward Islands page error:', error);
    return <LeewardIslandsClient yachts={[]} totalYachts={0} />;
  }
}
