import ItemsGrid from "../../components/ItemsGrid";
import { destinations } from "../destinationsData";

// Hero : nouvelle photo fournie par la cliente. Le badge present dans l'image
// fait partie du media client : il n'est ni retire ni retouche.
//
// Copie LOCALE des destinations : seule la carte Caraibes est redirigee vers le
// guide Group dedie, pour ne pas contaminer les autres funnels Charter. Les
// quinze autres conservent strictement leur destination actuelle, et
// destinationsData.js n'est pas modifie — meme schema que last-minute,
// accessible et pet-friendly. ItemsGrid, partage, n'est pas touche.
const GROUP_GUIDES = {
  "Caraïbes": "/charters/group/carribbean",
};

const groupItems = destinations.map((d) =>
  GROUP_GUIDES[d.title] ? { ...d, href: GROUP_GUIDES[d.title] } : d
);

export default function GroupCharter() {
  return (
    <ItemsGrid
      title="Group Yacht Charter"
      heroImage="/media/client/lydie/2026-08-27/group-charter/hero/group-charter-hero.jpg"
      bgImage="/images/services-bg.png"
      items={groupItems}
    />
  );
}
