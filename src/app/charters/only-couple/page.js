import ItemsGrid from "../../components/ItemsGrid";
import { destinations } from "../destinationsData";

export default function OnlyCoupleCharter() {
  return (
    <ItemsGrid
      title="Only Couple Charter"
      heroImage="/images/management/only_couple.jpeg"
      bgImage="/images/services-bg.png"
      items={destinations}
    />
  );
}
