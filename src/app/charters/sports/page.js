import ItemsGrid from "../../components/ItemsGrid";
import { destinations } from "../destinationsData";

export default function SportsCharter() {
  return (
    <ItemsGrid
      title="Sports Yacht Charter"
      bgImage="/images/services-bg.png"
      items={destinations}
    />
  );
}
