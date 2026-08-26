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

// Le hero video s'effondrait a ~150px : son conteneur n'avait aucune hauteur et
// la video etait en object-contain, d'ou une large bande vide. On active le mode
// cover de ItemsGrid, avec une source reencodee (11,8 Mo -> 3,0 Mo, fast-start,
// sans piste audio) et un poster pour prefers-reduced-motion.
export default function AccessibleCharter() {
  return (
    <ItemsGrid
      title="Accessible Charter Yacht"
      heroVideo="/media/quality/accessibility/accessible-hero.mp4"
      heroVideoPoster="/media/quality/accessibility/accessible-hero-poster.webp"
      heroVideoCover
      bgImage="/images/services-bg.png"
      items={accessibleItems}
    />
  );
}
