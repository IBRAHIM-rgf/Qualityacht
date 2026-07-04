import ThemeLandingPage from '../components/ThemeLandingPage';

export const metadata = {
  title: 'Horses & Riding | Qualityacht',
  description: 'Equestrian experiences and racing traditions curated for a discerning private clientele, destination by destination.',
};

export default function HorsesRidingPage() {
  return (
    <ThemeLandingPage
      eyebrow="Private Client Guide"
      title="Horses & Riding"
      heroImage="/images/gridLosange/cheval2.png"
      intro="Beach rides, mountain trails, and the great racing traditions of each destination — equestrian experiences shaped around superyacht itineraries for a discerning private clientele."
      caribbeanHref="/horses-riding/caribbean"
    />
  );
}
