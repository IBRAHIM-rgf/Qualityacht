// Page annexe pour démo de la carte région.
// Affichera un modal-like avec carte Leaflet : sous-régions (cercles) + aéroports (markers).
// URL ex : /test-region-map?region=caribbean

import MapClient from './MapClient';

export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const region = params?.region || 'caribbean';
  return <MapClient region={region} />;
}
