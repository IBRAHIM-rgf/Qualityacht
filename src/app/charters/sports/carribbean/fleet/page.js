// /charters/sports/carribbean/fleet — bouton « Explore the Caribbean Fleet » de /charters/sports/carribbean
// (client 2026-10-04) : uniquement les bateaux coches « Sport Yacht Charter » + Caribbean dans l'admin.
import { CategoryFleetPage } from '../../../_shared/categoryCasePages';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Caribbean Sports Yacht Charters — Fleet | Qualityacht',
};

export default function SportsFleetPage() {
  return (
    <CategoryFleetPage
      region="caribbean"
      category="sport"
      name="Caribbean"
      heroImage="/media/client/lydie/2026-08-27/sport-yacht-caribbean/hero/sports-caribbean-hero-poster.webp"
      fleetTitle="Yachts in the Caribbean"
    />
  );
}
