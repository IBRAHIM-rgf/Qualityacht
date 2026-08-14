import ThemeLandingPage from '../components/ThemeLandingPage';

export const metadata = {
  title: 'Art & Culture | Qualityacht',
  description: 'Museums, galleries, exhibitions and iconic cultural sites — an ultra-premium reference for discerning private clients, destination by destination.',
};

export default function ArtCulturePage() {
  return (
    <ThemeLandingPage
      eyebrow="Ultra-Premium Reference"
      title="Art & Culture"
      heroImage="/images/art-culture/Art et culture halo 2.jpg"
      intro="Museums, galleries, exhibitions and iconic sites — a curated reference through the cultural heritage of the world's most inspiring destinations, chosen for excellence and their resonance with the most sophisticated tastes."
      caribbeanHref="/art-culture/caribbean"
      animated
      heroZoomDuration="6s"
    />
  );
}
