import ItemsGrid from "../../components/ItemsGrid";
import { destinations } from "../destinationsData";

// Sur la page "Accessible", chaque region mene vers son guide d'accessibilite
// (choix du handicap + besoins) au lieu de la page destination classique.
// "Caraibes en premier" : seule region avec un guide pour l'instant ; ajouter
// les autres ici au fur et a mesure (cle = titre exact dans destinationsData).
const ACCESSIBLE_GUIDES = {
  "Caraïbes": "/charters/accessible/caribbean",
};

const accessibleItems = destinations.map((d) =>
  ACCESSIBLE_GUIDES[d.title] ? { ...d, href: ACCESSIBLE_GUIDES[d.title] } : d
);

export default function AccessibleCharter() {
  return (
    <ItemsGrid
      title="Accessible Charter Yacht"
      heroImage="/images/charters/acces.png"
      bgImage="/images/services-bg.png"
      items={accessibleItems}
    />
  );
}
