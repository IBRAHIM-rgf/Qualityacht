// ══ /luxury-living ══
// Page d'activite reliee a la carte du meme nom sur /invest-with-impact.
// Meme identite visuelle que la section cartes ; gabarit partage ActivityPage.
import ActivityPage from '../components/activity/ActivityPage';
import { Sofa, Armchair, Layers, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Luxury Living | Qualityacht',
  description: 'Furniture, rugs, linens and carefully chosen pieces for interiors with character, comfort and timeless appeal, curated by Qualityacht.',
};

const SECTIONS = [
    { Icone: Armchair, titre: 'Furniture', texte: 'Sofas, tables, seating and storage with honest proportions and materials that age well: oak, walnut, leather, stone and brass.' },
    { Icone: Layers, titre: 'Rugs, Linens & Textiles', texte: 'Hand-knotted rugs, bed and bath linens, throws and cushions in wool, linen and cotton, selected for touch as much as for look.' },
    { Icone: Sparkles, titre: 'Selected Pieces', texte: 'Lighting, ceramics and objects that give a room its character. A small edit, refreshed with the seasons.' },
];

export default function Page() {
  return (
    <ActivityPage
      Icone={Sofa}
      eyebrow='Luxury Living'
      title='Objects With Presence'
      subtitle='Furniture, rugs, linens and refined pieces chosen to shape interiors with character and lasting appeal.'
      heroImage='/media/client/lydie/2026-09-16/activities/luxury-living.jpg'
      heroAlt='Dark living room with a grey sofa, cushions and a marble coffee table'
      heroPosition='50% 60%'
      intro='Luxury Living brings together a considered selection of furniture, textiles and decorative pieces for homes and yachts alike. We favour natural materials, quiet lines and makers who still work by hand, so that every piece settles into a space rather than competing with it.'
      sections={SECTIONS}
      cta={{ titre: 'Furnish With Intent', texte: 'Share the space you are working on, at home or on board. We will suggest pieces that fit it, and arrange delivery wherever you are.', label: 'Speak To Our Team', href: '/#contact' }}
    />
  );
}
