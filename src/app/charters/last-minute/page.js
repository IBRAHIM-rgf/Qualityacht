import ItemsGrid from "../../components/ItemsGrid";
import { destinations } from "../destinationsData";

export default function LastMinuteCharter() {
  return (
    <ItemsGrid
      title="Last-Minute Charter"
      heroImage="/images/charters/last-minute.png"
      bgImage="/images/services-bg.png"
      items={destinations}
    />
  );
}
