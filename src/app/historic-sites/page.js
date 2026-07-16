import ThemeLandingPage from '../components/ThemeLandingPage';

export const metadata = {
  title: 'Historic Sites | Qualityacht',
  description: 'Landmarks and heritage sites of historic consequence, with exclusive private access arranged — destination by destination.',
};

export default function HistoricSitesPage() {
  return (
    <ThemeLandingPage
      eyebrow="Private Client Guide"
      title="Historic Sites"
      heroImage="/images/monument historic/jivan-garcha-Lul2or0sxNk-unsplash (1) (1).jpg"
      intro="Forts, plantation houses, sunken cities and Georgian towns — landmarks of historic consequence, with exclusive private access and after-hours experiences arranged at each."
      caribbeanHref="/historic-sites/caribbean-v2"
    />
  );
}
