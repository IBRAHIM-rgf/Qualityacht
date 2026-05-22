import { fetchYachtsForDestination } from '@/lib/yachts';
import YachtDetailClient from './YachtDetailClient';

export const dynamic = 'force-dynamic';

export default async function Page() {
  try {
    const { yachts } = await fetchYachtsForDestination('caribbean');
    // On prend un vrai bateau qui a une belle galerie de photos
    const withPhotos = (yachts || []).filter((y) => Array.isArray(y.images) && y.images.length >= 5);
    const yacht = withPhotos[0] || (yachts || [])[0] || null;
    const similar = (yachts || []).filter((y) => y.id !== yacht?.id).slice(0, 5);
    return <YachtDetailClient yacht={yacht} similar={similar} />;
  } catch (error) {
    console.error('yacht-detail-v1 error:', error);
    return <YachtDetailClient yacht={null} similar={[]} />;
  }
}
