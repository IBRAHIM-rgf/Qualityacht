// Listing yachts Bahamas filtré par handicap — cible du bouton "Voir les yachts
// correspondants" de la page accessible (/charters/accessible/bahamas). Copie de la
// version Caraïbes (client 2026-10-02) : yachts selectionnes pour les Bahamas.
// Réutilise le même composant que "Explore Yacht" (caribbean-v15), filtré via ?handicap=<id>.

import ExploreYachtClient from '../../../destinations/caribbean-v15/exploreyacht/ExploreYachtClient';
import { fetchVisibleYachtsForSubRegion } from '@/lib/yachts';
import { getYachtSelections } from '@/lib/db';
import { parseHandicaps, getHandicapById } from '@/lib/handicaps';

export const dynamic = 'force-dynamic';

// Filtre destination : pas de sous-regions Bahamas dans ce filtre.
const BAHAMAS_DESTINATIONS = [{ value: '', label: 'All Bahamas' }];

export default async function Page({ searchParams }) {
  const sp = (await searchParams) || {};
  const handicap = typeof sp.handicap === 'string' ? sp.handicap : '';

  try {
    let { yachts, totalYachts, filters } = await fetchVisibleYachtsForSubRegion('bahamas', null);
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
        regionTitle="Bahamas"
        destinationOptions={BAHAMAS_DESTINATIONS}
        initialFilters={filters}
        initialData={yachts}
        totalYachts={totalYachts}
        handicapFilter={handicapFilter}
      />
    );
  } catch (error) {
    console.error('Accessible bahamas yacht page error:', error);
    return (
      <ExploreYachtClient
        regionTitle="Bahamas"
        destinationOptions={BAHAMAS_DESTINATIONS}
        initialFilters={{}}
        initialData={[]}
        totalYachts={0}
        handicapFilter={handicap ? { id: handicap, label: getHandicapById(handicap)?.type || handicap } : null}
      />
    );
  }
}
