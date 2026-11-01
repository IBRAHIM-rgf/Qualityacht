// Titre et description Google de /airport (SEO etape 3, client 2026-11-01) : la page est
// un composant client, ses metadonnees passent donc par ce layout.
import { seo } from '@/lib/seoMeta';

export const metadata = seo('/airport');

export default function Layout({ children }) {
  return children;
}
