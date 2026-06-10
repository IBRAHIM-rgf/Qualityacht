import ItemsGrid from "../../components/ItemsGrid";
import { destinations } from "../destinationsData";

export default function OnlyCoupleCharter() {
  return (
    <ItemsGrid
      title="Only Couple Charter"
      bgImage="/images/services-bg.png"
      items={destinations}
    />
  );
}
