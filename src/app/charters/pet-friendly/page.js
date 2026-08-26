import ItemsGrid from "../../components/ItemsGrid";
import { destinations } from "../destinationsData";

// Les Caraibes ont desormais leur guide Pet-Friendly dedie ; les autres regions
// mènent toujours vers leur page destination classique. Meme schema que
// /charters/accessible et /charters/last-minute : la redirection se fait ici,
// destinationsData.js n'est pas touche (cle = titre exact du jeu de donnees).
const PET_GUIDES = {
  "Caraïbes": "/charters/pet-friendly/carribbean",
};

const petItems = destinations.map((d) =>
  PET_GUIDES[d.title] ? { ...d, href: PET_GUIDES[d.title] } : d
);

export default function PetFriendlyCharter() {
  return (
    <ItemsGrid
      title="Pet-Friendly Charter"
      heroImage="/images/charters/pet-friendly.png"
      bgImage="/images/services-bg.png"
      items={petItems}
    />
  );
}
