// ══ /charters/day-charter/caribbean ══
// Page Caraibes du parcours Day Charter : rendu identique a
// /charters/destinations/caribbean-v15 (meme composant, meme metadata), sans
// dupliquer le code. Seule difference : le CTA « Design Your Charter » porte
// ?day=1 pour que /request-quote affiche le titre Day Charter (client 2026-09-13).
import CaribbeanV15RoutePage from '../../destinations/caribbean-v15/page';

export { metadata } from '../../destinations/caribbean-v15/page';

export default function DayCharterCaribbeanPage() {
  return <CaribbeanV15RoutePage quoteHref="/request-quote?day=1" />;
}
