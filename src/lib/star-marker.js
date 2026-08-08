// ══ Logo Qualityacht (trans.png, fond transparent) reutilise comme marker Leaflet ══
// Remplace les points colores classiques sur les cartes (WorldPinsMap, HotelMap,
// DiningMap). Meme logo que celui deja utilise sur WorldMapClient (Hotel Palace monde).

export function starMarkerHtml(on) {
  const size = on ? 32 : 24;
  const shadow = on ? '0 2px 8px rgba(0,0,0,0.8)' : '0 2px 5px rgba(0,0,0,0.7)';
  return `<img src="/images/trans.png" alt="" width="${size}" height="${size}" style="display:block;width:${size}px;height:${size}px;filter:drop-shadow(${shadow});transition:width .2s,height .2s" />`;
}

export function starIconSize(on) {
  const s = on ? 32 : 24;
  return { iconSize: [s, s], iconAnchor: [s / 2, s / 2] };
}
