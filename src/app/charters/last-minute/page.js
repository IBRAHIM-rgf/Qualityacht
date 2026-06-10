import ItemsGrid from "../../components/ItemsGrid";
import { destinations } from "../destinationsData";

export default function LastMinuteCharter() {
  return (
    <ItemsGrid
      title="Last-Minute Charter"
      bgImage="/images/services-bg.png"
      items={destinations}
    />
  );
}
