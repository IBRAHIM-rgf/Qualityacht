import ThemeLandingPage from '../components/ThemeLandingPage';

export const metadata = {
  title: 'Horses & Riding | Qualityacht',
  description: 'Equestrian experiences and racing traditions curated for a discerning private clientele, destination by destination.',
};

// Photos des cards destination (public/images/horse). Western Med & Northern
// Europe n'ont pas de photo horse -> fallback sur l'image par defaut.
const HORSE_IMAGES = {
  'Arctic': '/images/horse/horse artic.png',
  'Bahamas': '/images/horse/horse bahamas.png',
  'Central America': '/images/horse/Central America.png',
  'East Asia': '/images/horse/horse East asia.png',
  'Eastern Mediterranean': '/images/horse/horse est mediterannée.png',
  'Indian Ocean': '/images/horse/horse india ocean.png',
  'Indonesia': '/images/horse/horse indonesia.png',
  'North America': '/images/horse/Horse nord american.png',
  'Pacific Ocean': '/images/horse/horse pacific ocean.png',
  'Oman Gulf': '/images/horse/Horse oman gulf.png',
  'South East Asia': '/images/horse/horse south east asia.png',
  'Africa': '/images/horse/Horse Africa.png',
  'Caraïbes': '/images/horse/Horses caraibes.png',
  'Oceania': '/images/horse/horse Oceania.png',
  'Western Mediterranean': '/images/horse/leo_visions-0cVfIh1GVcs-unsplash.jpg',
};

export default function HorsesRidingPage() {
  return (
    <ThemeLandingPage
      eyebrow="Private Client Guide"
      title="Horses & Riding"
      heroImage="/images/horse/resized_1440x800.png"
      intro="Beach rides, mountain trails, and the great racing traditions of each destination — equestrian experiences shaped around superyacht itineraries for a discerning private clientele."
      caribbeanHref="/horses-riding/caribbean"
      links={{
        'Western Mediterranean': '/horses-riding/western-mediterranean',
        'Eastern Mediterranean': '/horses-riding/eastern-mediterranean',
        'Bahamas': '/horses-riding/bahamas',
        'Indian Ocean': '/horses-riding/indian-ocean',
      }}
      cardImages={HORSE_IMAGES}
    />
  );
}
