// /charters/sports/bahamas/fleet — bouton « Explore the Bahamas Fleet » de /charters/sports/bahamas
// (client 2026-10-04) : uniquement les bateaux coches « Sport Yacht Charter » + Bahamas dans l'admin.
import { CategoryFleetPage } from '../../../_shared/categoryCasePages';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Bahamas Sports Yacht Charters — Fleet | Qualityacht',
};

export default function SportsFleetPage() {
  return (
    <CategoryFleetPage
      region="bahamas"
      category="sport"
      name="Bahamas"
      heroImage="/media/client/lydie/2026-08-27/sport-yacht-caribbean/hero/sports-caribbean-hero-poster.webp"
      fleetTitle="Yachts in the Bahamas"
    />
  );
}
