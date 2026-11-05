// /editorial — tous les articles (client 2026-11-05), modele Burgess / Edmiston.
// Lien dans le menu principal et le pied de page.
import Listing from './Listing';
import { sortedArticles } from './articles';

export const metadata = {
  title: 'Editorial | Qualityacht',
  description: 'Charter guides, destinations, news and lifestyle from Qualityacht, an independent yacht charter broker in Zurich.',
  alternates: { canonical: 'https://www.qualityacht.ch/editorial' },
};

export default function EditorialPage() {
  return <Listing articles={sortedArticles()} />;
}
