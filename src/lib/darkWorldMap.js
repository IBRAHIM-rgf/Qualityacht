// Style commun des cartes Leaflet du site (client 2026-09-30) : meme rendu que
// la carte « Our Markets » de /real-estate — tuiles OpenStreetMap assombries,
// boutons +/- sombres, attribution discrete — et ouverture sur le MONDE ENTIER.
// Seul le calque de tuiles est filtre : marqueurs, popups et tooltips gardent
// leurs couleurs.

// Emprise du monde habite (Mercator) : tout est visible a l'ouverture.
export const WORLD_BOUNDS = [[-58, -170], [78, 180]];

// Options a ajouter a L.map() : zoom fractionnaire pour que le monde remplisse
// le cadre, sans limite de zoom minimale qui empecherait la vue monde.
export const WORLD_MAP_OPTIONS = { zoomSnap: 0.25, minZoom: 0 };

// A appeler une fois la carte dans le DOM (apres ouverture d'une modale, etc.).
export function fitWholeWorld(map) {
  if (!map) return;
  map.invalidateSize();
  map.fitBounds(WORLD_BOUNDS, { padding: [8, 8] });
}

// CSS a injecter, limite au conteneur portant la classe `scope`.
export function darkMapCss(scope) {
  return `
    .${scope}.leaflet-container, .${scope} .leaflet-container { background:#1a1b1e; }
    .${scope} .leaflet-tile-pane { filter: grayscale(1) invert(1) brightness(0.72) contrast(1.12); }
    .${scope} .leaflet-control-attribution, .${scope} .leaflet-control-attribution span { background:rgba(38,39,42,0.88) !important; color:#8b90a0 !important; font-size:11px !important; }
    .${scope} .leaflet-control-attribution a { color:#acb0cd !important; }
    .${scope} .leaflet-control-zoom a { background:#2e2f32 !important; color:#C0C0C0 !important; border-color:rgba(192,192,192,0.25) !important; }
    .${scope} .leaflet-control-zoom a:hover { background:#3a3b3f !important; }
  `;
}
