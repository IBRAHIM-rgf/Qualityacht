// Listing yachts Caraïbes filtré par handicap — cible du bouton "Voir les yachts
// correspondants" de la page accessible (/charters/accessible/caribbean).
// Réutilise le même composant que "Explore Yacht" (caribbean-v15), filtré via ?handicap=<id>.

import ExploreYachtClient from '../../../destinations/caribbean-v15/exploreyacht/ExploreYachtClient';
import { fetchVisibleYachtsForDestination } from '@/lib/yachts';
import { getYachtSelections } from '@/lib/db';
import { parseHandicaps, getHandicapById } from '@/lib/handicaps';

export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }) {
  const sp = (await searchParams) || {};
  const handicap = typeof sp.handicap === 'string' ? sp.handicap : '';

  try {
    let { yachts, totalYachts, filters } = await fetchVisibleYachtsForDestination('caribbean');
    let handicapFilter = null;

    if (handicap) {
      // On ne garde que les yachts dont la colonne `handicaps` (BDD) contient cet id.
      const selections = await getYachtSelections();
      const allowed = new Set(
        selections
          .filter((s) => parseHandicaps(s.handicaps).includes(handicap))
          .map((s) => s.yacht_id)
      );
      yachts = yachts.filter((y) => allowed.has(y.id));
      totalYachts = yachts.length;
      const h = getHandicapById(handicap);
      handicapFilter = { id: handicap, label: h ? h.type : handicap };
    }

    return (
      <ExploreYachtClient
        initialFilters={filters}
        initialData={yachts}
        totalYachts={totalYachts}
        handicapFilter={handicapFilter}
      />
    );
  } catch (error) {
    console.error('Accessible caribbean yacht page error:', error);
    return (
      <ExploreYachtClient
        initialFilters={{}}
        initialData={[]}
        totalYachts={0}
        handicapFilter={handicap ? { id: handicap, label: getHandicapById(handicap)?.type || handicap } : null}
      />
    );
  }
}
