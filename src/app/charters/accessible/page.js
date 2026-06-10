import ItemsGrid from "../../components/ItemsGrid";
import { destinations } from "../destinationsData";

export default function AccessibleCharter() {
  return (
    <ItemsGrid
      title="Accessible Charter Yacht"
      heroImage="/images/charters/acces.png"
      bgImage="/images/services-bg.png"
      items={destinations}
    />
  );
}
