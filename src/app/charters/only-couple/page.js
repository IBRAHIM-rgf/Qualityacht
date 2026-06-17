import ItemsGrid from "../../components/ItemsGrid";
import { destinations } from "../destinationsData";

// Override : depuis Only Couple, la card Caraibes ouvre une copie dediee
// (variante texte 'Luxury, Serenity, and Bliss' dans la 2eme section).
const onlyCoupleDestinations = destinations.map((d) =>
  d.title === 'Caraïbes' ? { ...d, href: '/charters/only-couple/carribbean' } : d
);

const INTRO = (
  <>
    <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.12em] text-[#acb0cd] mb-2">
      Caribbean
    </h2>
    <p className="text-base md:text-xl text-[#d39478] italic mb-5">
      Luxury, Serenity, and Bliss
    </p>
    <p className="text-base md:text-lg text-[#acb0cd] leading-relaxed">
      Discretion is the ultimate luxury. Here, the Caribbean unfolds in private coves
      and secluded anchorages, where the only witnesses to your escape are the endless
      horizon and the gentle rhythm of the waves. Your yacht, a sanctuary of elegance,
      blends seamlessly with the turquoise waters&mdash;because true exclusivity is
      found in the art of going unnoticed.
    </p>
  </>
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
