import ItemsGrid from "../../components/ItemsGrid";
import { destinations } from "../destinationsData";

export default function OnDemandCharter() {
  return (
    <ItemsGrid
      title="On-Demand Yacht Charter"
      heroImage="/images/charters/on-demande.png"
      bgImage="/images/services-bg.png"
      items={destinations}
    />
  );
}
