import ItemsGrid from "../../components/ItemsGrid";
import { destinations } from "../destinationsData";

// "Caraibes en premier" : seule region avec une page Last-Minute dediee pour l'instant
// (cf. meme pattern que /charters/accessible) ; ajouter les autres ici au fur et a
// mesure (cle = titre exact dans destinationsData).
const LAST_MINUTE_GUIDES = {
  Caraïbes: "/charters/last-minute/caribbean",
  Bahamas: "/charters/last-minute/bahamas",
};

const lastMinuteItems = destinations.map((d) =>
  LAST_MINUTE_GUIDES[d.title] ? { ...d, href: LAST_MINUTE_GUIDES[d.title] } : d
);

export default function LastMinuteCharter() {
  return (
    <ItemsGrid
      title="Last-Minute Charter"
      // Hero video unique fournie par le client (2026-09-29), affichee en
      // entier et sans degrade flou par-dessus.
      heroVideo="/media/client/lydie/2026-09-29/last-minute-hero.mp4"
      heroVideoPoster="/media/client/lydie/2026-09-29/last-minute-hero.jpg"
      heroVideoFull
      bgImage="/images/services-bg.png"
      items={lastMinuteItems}
    />
  );
}
