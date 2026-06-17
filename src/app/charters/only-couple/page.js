import ItemsGrid from "../../components/ItemsGrid";
import { destinations } from "../destinationsData";

// Override : depuis Only Couple, la card Caraibes ouvre une copie dediee
// (variante texte 'Luxury, Serenity, and Bliss' dans la 2eme section).
const onlyCoupleDestinations = destinations.map((d) =>
  d.title === 'Caraïbes' ? { ...d, href: '/charters/only-couple/carribbean' } : d
);

const INTRO = (
  <p className="text-base md:text-xl text-[#acb0cd] leading-relaxed">
    Turn your next unforgettable memory into a{' '}
    <span className="text-[#d39478] font-semibold">luxury escape on the water</span>.
    Experience{' '}
    <span className="text-[#d39478] font-semibold">absolute intimacy</span>{' '}
    aboard an exceptional yacht.
  </p>
);

export default function OnlyCoupleCharter() {
  return (
    <ItemsGrid
      title="Only Couple Charter"
      heroImage="/images/management/only_couple.jpeg"
      bgImage="/images/services-bg.png"
      items={onlyCoupleDestinations}
      intro={INTRO}
    />
  );
}
