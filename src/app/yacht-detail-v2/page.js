import { getTestYachts } from '@/lib/db';
import YachtDetailClient from './YachtDetailClient';

export const dynamic = 'force-dynamic';

export default async function Page() {
  try {
    // Lecture instantanée depuis la BDD (table test_yachts seedée via scripts/seed-test-yachts.js)
    // — plus aucun appel Ankor à chaque rendu
    const yachts = await getTestYachts();
    const yacht = yachts[0] || null;
    const similar = yachts.filter((y) => y.id !== yacht?.id).slice(0, 5);
    return <YachtDetailClient yacht={yacht} similar={similar} />;
  } catch (error) {
    console.error('yacht-detail-v1 error:', error);
    return <YachtDetailClient yacht={null} similar={[]} />;
  }
}
