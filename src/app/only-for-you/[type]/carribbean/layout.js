// Titre et description Google de /only-for-you/<type>/carribbean (SEO etape 3, client
// 2026-11-01) : la page est un composant client, ses metadonnees passent par ce layout.
import { getSailingTypeBySlug } from '../../data';

export async function generateMetadata({ params }) {
  const { type } = await params;
  const boat = getSailingTypeBySlug(type);
  if (!boat) return {};
  return {
    title: `${boat.name} — Caribbean | Qualityacht`,
    description: `${boat.name} charters in the Caribbean. ${boat.tagline}. Browse the yachts available and request a quote.`,
  };
}

export default function Layout({ children }) {
  return children;
}
