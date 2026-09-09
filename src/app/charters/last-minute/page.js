import ItemsGrid from "../../components/ItemsGrid";
import { destinations } from "../destinationsData";

// "Caraibes en premier" : seule region avec une page Last-Minute dediee pour l'instant
// (cf. meme pattern que /charters/accessible) ; ajouter les autres ici au fur et a
// mesure (cle = titre exact dans destinationsData).
const LAST_MINUTE_GUIDES = {
  Caraïbes: "/charters/last-minute/caribbean",
};

const lastMinuteItems = destinations.map((d) =>
  LAST_MINUTE_GUIDES[d.title] ? { ...d, href: LAST_MINUTE_GUIDES[d.title] } : d
);

export default function LastMinuteCharter() {
  return (
    <ItemsGrid
      title="Last-Minute Charter"
      heroTriptych={[
        '/media/quality/beach/last-minute-1.mp4',
        '/media/quality/beach/last-minute-2.mp4',
        '/media/quality/beach/last-minute-3.mp4',
      ]}
      // Video du milieu acceleree a 1,5x (demande client) ; les deux autres
      // gardent leur vitesse normale.
      heroTriptychRates={[1, 1.5, 1]}
      bgImage="/images/services-bg.png"
      items={lastMinuteItems}
    />
  );
}
