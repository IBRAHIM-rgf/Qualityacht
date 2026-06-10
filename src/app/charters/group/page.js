import ItemsGrid from "../../components/ItemsGrid";
import { destinations } from "../destinationsData";

export default function GroupCharter() {
  return (
    <ItemsGrid
      title="Group Yacht Charter"
      bgImage="/images/services-bg.png"
      items={destinations}
    />
  );
}
