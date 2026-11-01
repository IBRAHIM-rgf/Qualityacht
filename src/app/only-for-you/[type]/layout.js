// Titre et description Google de /only-for-you/<type> (SEO etape 3, client 2026-11-01) :
// la page est un composant client, ses metadonnees passent donc par ce layout.
import { getSailingTypeBySlug } from '../data';

export async function generateMetadata({ params }) {
  const { type } = await params;
  const boat = getSailingTypeBySlug(type);
  if (!boat) return {};
  return {
    title: `${boat.name} Charters | Qualityacht`,
    description: `${boat.tagline}. ${boat.name} charters in the Caribbean and the Bahamas with Qualityacht.`,
  };
}

export default function Layout({ children }) {
  return children;
}
