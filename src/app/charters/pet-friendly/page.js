import ItemsGrid from "../../components/ItemsGrid";
import { destinations } from "../destinationsData";

// Hero : photo du dalmatien fournie par la cliente, optimisee en WebP
// (4928x3264 et 1,9 Mo -> 2200px et 337 Ko).
//
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
      heroImage="/media/client/pet-friendly/dalmatien-hero.webp"
      bgImage="/images/services-bg.png"
      items={petItems}
    />
  );
}
