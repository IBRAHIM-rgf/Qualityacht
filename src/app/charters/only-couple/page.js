import ItemsGrid from "../../components/ItemsGrid";
import { destinations } from "../destinationsData";

// Override : depuis Only Couple, la card Caraibes ouvre une copie dediee
// (variante texte 'Luxury, Serenity, and Bliss' dans la 2eme section).
//
// Hero : la video de bois flotte au coucher de soleil (beach-band.mp4) remplace
// la photo. Elle passe par le mode cover de ItemsGrid — hauteur reelle,
// object-cover, sans bande — avec son poster pour prefers-reduced-motion.
const onlyCoupleDestinations = destinations.map((d) =>
  d.title === 'Caraïbes' ? { ...d, href: '/charters/only-couple/carribbean' } : d
);

const INTRO = (
  <p className="text-base md:text-xl text-[#acb0cd] leading-relaxed">
    Turn your next unforgettable memory into a{' '}
    <span className="text-[#bd9973] font-semibold">luxury escape on the water</span>.
    Experience{' '}
    <span className="text-[#bd9973] font-semibold">absolute intimacy</span>{' '}
    aboard an exceptional yacht.
  </p>
);

export default function OnlyCoupleCharter() {
  return (
    <ItemsGrid
      title="Only Couple Charter"
      heroVideo="/media/quality/beach/beach-band.mp4"
      heroVideoPoster="/media/quality/beach/beach-band.jpg"
      heroVideoCover
      bgImage="/images/services-bg.png"
      items={onlyCoupleDestinations}
      intro={INTRO}
    />
  );
}
