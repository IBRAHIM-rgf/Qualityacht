import { fetchVisibleYachtsForSubRegion } from '@/lib/yachts';
import BahamasClient from './BahamasClient';

export const dynamic = 'force-dynamic';

export default async function Page() {
  try {
    // subRegion=null → tous les yachts taggés region='bahamas'
    const { yachts, totalYachts } = await fetchVisibleYachtsForSubRegion('bahamas', null);
    return <BahamasClient yachts={yachts} totalYachts={totalYachts} />;
  } catch (error) {
    console.error('Bahamas page error:', error);
    return <BahamasClient yachts={[]} totalYachts={0} />;
  }
}
