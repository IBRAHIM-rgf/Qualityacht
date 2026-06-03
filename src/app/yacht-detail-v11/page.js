// yacht-detail-v11 : v10 + phrase sous le prix hero indiquant la possibilité
// de réserver par cabine (en plus du whole-boat charter).
//
// Similar Yachts = même région que le yacht courant, triés par proximité de prix.

import { getSelectionYachtFullByName } from '@/lib/db';
import { fetchVisibleYachts } from '@/lib/yachts';
import YachtDetailClient from './YachtDetailClient';

export const dynamic = 'force-dynamic';

// Prix normalisé en cents (day prioritaire ; week → /7 pour estimer un day)
function yachtPriceCents(y) {
  const p = y?.full?.pricing || y?._rawPricing || y?.pricing;
  if (!p) return null;
  if (p.dayPricingFrom?.price) return p.dayPricingFrom.price;
  if (p.weekPricingFrom?.price) return Math.round(p.weekPricingFrom.price / 7);
  if (p.hourPricingFrom?.price) return p.hourPricingFrom.price * 8;
  return null;
}

function sameRegion(a, b) {
  if (!a || !b) return false;
  const ra = (a || '').toString().trim().toLowerCase();
  const rb = (b || '').toString().trim().toLowerCase();
  return ra && rb && ra === rb;
}

export default async function Page({ searchParams }) {
  try {
    const params = await searchParams;
    const targetName = params?.name || 'Coral Ocean';
    const yacht = await getSelectionYachtFullByName(targetName);

    let similar = [];
    if (yacht) {
      const { yachts: allVisible } = await fetchVisibleYachts({});
      const refRegion = yacht.region || yacht.subRegion || null;
      const refPrice = yachtPriceCents(yacht);

      const others = allVisible.filter((y) => y.id !== yacht.id);
      // 1) Cible : même région ; si vide ou pas de région, on prend tous les autres.
      let pool = refRegion ? others.filter((y) => sameRegion(y.region, refRegion)) : [];
      if (pool.length === 0) pool = others;

      // 2) Tri par proximité de prix (jour normalisé en cents).
      if (refPrice != null) {
        pool.sort((a, b) => {
          const pa = yachtPriceCents(a);
          const pb = yachtPriceCents(b);
          if (pa == null && pb == null) return 0;
          if (pa == null) return 1;
          if (pb == null) return -1;
          return Math.abs(pa - refPrice) - Math.abs(pb - refPrice);
        });
      }

      similar = pool.slice(0, 8);
    }

    return <YachtDetailClient yacht={yacht} similar={similar} />;
  } catch (error) {
    console.error('yacht-detail-v11 error:', error);
    return <YachtDetailClient yacht={null} similar={[]} />;
  }
}
