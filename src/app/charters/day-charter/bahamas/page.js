// ══ /charters/day-charter/bahamas ══
// Page Bahamas du parcours Day Charter : rendu identique a
// /charters/destinations/bahamas, avec « Day Charter » au-dessus du titre et le
// CTA « Create Your Day at Sea » (?day=1), comme /charters/day-charter/caribbean.
import BahamasRoutePage from '../../destinations/bahamas/page';

export default function DayCharterBahamasPage() {
  return (
    <BahamasRoutePage
      quoteHref="/request-quote?day=1"
      heroOverTitle="Day Charter"
      quoteLabel="Create Your Day at Sea"
      heroRuleColor="#C0C0C0"
      // 8 cases -> page bateaux de chaque case (client 2026-10-04).
      islandLinkBase="/charters/day-charter/bahamas"
    />
  );
}
