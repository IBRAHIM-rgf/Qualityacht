import ItemsGrid from "../../components/ItemsGrid";
import { destinations } from "../destinationsData";

export default function GroupCharter() {
  return (
    <ItemsGrid
      title="Group Yacht Charter"
      heroImage="/images/new/photo-1722009040906-0fc91b7e2942.jpeg"
      bgImage="/images/services-bg.png"
      items={destinations}
    />
  );
}
