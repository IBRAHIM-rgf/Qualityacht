// ══ Parcours Day Charter — memoire de session ══
//
// Le formulaire /request-quote n'affiche le titre Day Charter que pour les
// visiteurs venus de la section Day Charter (client 2026-09-18). Comme cette
// section mene au formulaire par de nombreux chemins (regions, iles, yachts,
// fiches) qui ne portent pas ?day=1, le signal est memorise dans le navigateur
// le temps de la visite, puis efface des qu'on entre dans une autre section.

export const DAY_CHARTER_KEY = 'qy-day-charter-journey';

/** Pages qui DEMARRENT le parcours Day Charter. */
export function isDayCharterEntry(pathname) {
  return pathname.startsWith('/charters/day-charter');
}

/** Pages qui TERMINENT le parcours : entree d'une autre section du site.
 *  Les pages intermediaires (regions, iles, /yachts, fiches yachts,
 *  /request-quote) ne sont pas listees : elles conservent le signal. */
export function isDayCharterExit(pathname) {
  if (pathname === '/' || pathname === '/contact' || pathname === '/partners') return true;
  if (pathname === '/charters/destinations/caribbean-v15') return true;
  if (pathname === '/charters/destinations/caribbean-v18') return true;
  return [
    '/charters/halal',
    '/charters/group',
    '/charters/pet-friendly',
    '/charters/accessible',
    '/charters/sports',
    '/charters/on-demand',
    '/events',
    '/only-for-you',
    '/sales',
    '/invest-with-impact',
    '/real-estate',
  ].some((p) => pathname === p || pathname.startsWith(p + '/'));
}

export function readDayCharterJourney() {
  try {
    return typeof window !== 'undefined' && window.sessionStorage.getItem(DAY_CHARTER_KEY) === '1';
  } catch {
    return false;
  }
}

export function syncDayCharterJourney(pathname) {
  try {
    if (isDayCharterEntry(pathname)) window.sessionStorage.setItem(DAY_CHARTER_KEY, '1');
    else if (isDayCharterExit(pathname)) window.sessionStorage.removeItem(DAY_CHARTER_KEY);
  } catch {
    /* stockage indisponible : le lien ?day=1 du hero continue de fonctionner */
  }
}
