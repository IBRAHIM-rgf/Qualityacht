import ThemeLandingPage from '../components/ThemeLandingPage';

export const metadata = {
  title: 'Historic Sites | Qualityacht',
  description: 'Landmarks and heritage sites of historic consequence, with exclusive private access arranged — destination by destination.',
};

// Cases regions en format paysage (client 2026-10-24) pour que les photos
// (paysage) ne soient plus coupees. Position d'affichage ajustee seulement pour les
// photos dont le format differe encore de la carte. Fichiers non recadres.
const CARD_POSITIONS = {
  Bahamas: '50% 45%',
  'East Asia': '50% 42%',
  'Indian Ocean': '70% 50%',
  Africa: '60% 45%',
  'Northern Europe': '50% 60%',
  'Western Mediterranean': '50% 0%',
};

export default function HistoricSitesPage() {
  return (
    <ThemeLandingPage
      eyebrow="Private Client Guide"
      title="Historic Sites"
      heroImage="/images/monument historic/jivan-garcha-Lul2or0sxNk-unsplash (1) (1).jpg"
      intro="Forts, plantation houses, sunken cities and Georgian towns — landmarks of historic consequence, with exclusive private access and after-hours experiences arranged at each."
      caribbeanHref="/historic-sites/caribbean"
      // Case Bahamas (client 2026-10-09) : sites historiques des Bahamas.
      links={{ Bahamas: '/historic-sites/bahamas', 'North America': '/historic-sites/north-america' }}
      cardAspect="aspect-[3/2]"
      cardPositions={CARD_POSITIONS}
      animated
      heroGradientSoft
    />
  );
}
