import SubregionClient from '../_shared/SubregionClient';
import { CARIBBEAN_SUBREGIONS } from '../_shared/configs';
import { fetchVisibleYachts } from '@/lib/yachts';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const config = CARIBBEAN_SUBREGIONS['windward-islands'];
  try {
    const { yachts, totalYachts } = await fetchVisibleYachts({ destination: 'caribbean' });
    return <SubregionClient {...config} initialData={yachts} totalYachts={totalYachts} />;
  } catch (error) {
    console.error('Windward Islands page error:', error);
    return <SubregionClient {...config} initialData={[]} totalYachts={0} />;
  }
}
