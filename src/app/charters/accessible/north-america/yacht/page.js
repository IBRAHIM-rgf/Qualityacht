// Listing yachts North America filtré par handicap — cible du bouton "View Yacht"
// de la page accessible (/charters/accessible/north-america). Copie de la version
// Bahamas (client 2026-10-20) : yachts selectionnes pour l'Amerique du Nord.
// Réutilise le même composant que "Explore Yacht" (caribbean-v15), filtré via ?handicap=<id>.

import ExploreYachtClient from '../../../destinations/caribbean-v15/exploreyacht/ExploreYachtClient';
import { fetchVisibleYachtsForSubRegion } from '@/lib/yachts';
import { getYachtSelections } from '@/lib/db';
import { parseHandicaps, getHandicapById } from '@/lib/handicaps';

export const dynamic = 'force-dynamic';

// Filtre destination : pas de sous-regions dans ce filtre (comme Bahamas).
const NA_DESTINATIONS = [{ value: '', label: 'All North America' }];

export default async function Page({ searchParams }) {
  const sp = (await searchParams) || {};
  const handicap = typeof sp.handicap === 'string' ? sp.handicap : '';

  try {
    let { yachts, totalYachts, filters } = await fetchVisibleYachtsForSubRegion('north-america', null);
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
        regionTitle="North America"
        destinationOptions={NA_DESTINATIONS}
        initialFilters={filters}
        initialData={yachts}
        totalYachts={totalYachts}
        handicapFilter={handicapFilter}
      />
    );
  } catch (error) {
    console.error('Accessible north-america yacht page error:', error);
    return (
      <ExploreYachtClient
        regionTitle="North America"
        destinationOptions={NA_DESTINATIONS}
        initialFilters={{}}
        initialData={[]}
        totalYachts={0}
        handicapFilter={handicap ? { id: handicap, label: getHandicapById(handicap)?.type || handicap } : null}
      />
    );
  }
}
