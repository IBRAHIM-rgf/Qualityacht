import ItemsGrid from "../../components/ItemsGrid";
import { destinations } from "../destinationsData";

export default function PetFriendlyCharter() {
  return (
    <ItemsGrid
      title="Pet-Friendly Charter"
      bgImage="/images/services-bg.png"
      items={destinations}
    />
  );
}
