import ItemsGrid from "../../components/ItemsGrid";
import { destinations } from "../destinationsData";

export default function HelicopterCharter() {
  return (
    <ItemsGrid
      title="Helicopter Yacht Charter"
      bgImage="/images/services-bg.png"
      items={destinations}
    />
  );
}
