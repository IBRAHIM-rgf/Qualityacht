// /charters/only-couple/carribbean/<subregion> — page d'une case Caraibes du parcours Only Couple : bateaux coches Only for Couple + sous-region de la case (client 2026-10-04).
import { CaseYachtsPage, caseMetadata } from '../../../_shared/categoryCasePages';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { subregion: slug } = await params;
  return caseMetadata('caribbean', slug, 'Only Couple Caribbean');
}

export default async function Page({ params }) {
  const { subregion: slug } = await params;
  return <CaseYachtsPage region="caribbean" slug={slug} category="only-for-couple" />;
}
