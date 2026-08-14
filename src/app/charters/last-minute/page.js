import ItemsGrid from "../../components/ItemsGrid";
import { destinations } from "../destinationsData";

export default function LastMinuteCharter() {
  return (
    <ItemsGrid
      title="Last-Minute Charter"
      heroTriptych={[
        '/media/quality/beach/last-minute-1.mp4',
        '/media/quality/beach/last-minute-2.mp4',
        '/media/quality/beach/last-minute-3.mp4',
      ]}
      bgImage="/images/services-bg.png"
      items={destinations}
    />
  );
}
