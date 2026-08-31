// Page annexe : comparateur de fonds de carte Leaflet (relief terre + fond marin) pour
// choisir le fond de la carte monde de /hotel-palace.
import ReliefMaps from './ReliefMaps';

export const metadata = {
  title: 'Fonds relief — comparateur | Qualityacht',
  description: 'Comparateur de fonds de carte Leaflet montrant le relief terrestre et la bathymetrie (fond marin).',
};

export default function TestWorldReliefPage() {
  return <ReliefMaps />;
}
