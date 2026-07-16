import ThemeLandingPage from '../components/ThemeLandingPage';

export const metadata = {
  title: 'Fine Food & Dining | Qualityacht',
  description:
    'Provisioning, producers, fine grocery, tables and private chefs — a curated reference for discerning private clients, destination by destination.',
};

// Meme landing generique que /art-culture et /historic-sites : hero + intro + les 16
// destinations, seules les Caraibes ouvertes pour l'instant.
// Le hero garde la photo deja associee a Fine Food & Dining sur la page d'accueil
// (losange de luxuryandcontactsection) : la section se reconnait d'une page a l'autre.
export default function FineFoodDiningPage() {
  return (
    <ThemeLandingPage
      eyebrow="Ultra-Premium Reference"
      title="Fine Food & Dining"
      heroImage="/images/new/17500843321894246574840682884355.jpg"
      intro="Provisioning, producers and fine grocery on one side; tables, chefs and beach clubs on the other — a curated reference through the flavours of the world's most inspiring destinations, chosen for excellence and for what they bring to a charter at anchor."
      caribbeanHref="/fine-food-dining/caribbean"
    />
  );
}
