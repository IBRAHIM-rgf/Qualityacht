import { getTestYachts } from '@/lib/db';
import YachtDetailClient from './YachtDetailClient';

export const dynamic = 'force-dynamic';

export default async function Page() {
  try {
    const yachts = await getTestYachts();
    const yacht = yachts[0] || null;
    const similar = yachts.filter((y) => y.id !== yacht?.id).slice(0, 5);
    return <YachtDetailClient yacht={yacht} similar={similar} />;
  } catch (error) {
    console.error('yacht-detail-v5 error:', error);
    return <YachtDetailClient yacht={null} similar={[]} />;
  }
}
