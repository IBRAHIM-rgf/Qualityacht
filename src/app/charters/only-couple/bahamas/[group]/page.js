// /charters/only-couple/bahamas/<group> — page d'une case Bahamas du parcours Only Couple : bateaux coches Only for Couple + sous-region de la case (client 2026-10-04).
import { CaseYachtsPage, caseMetadata } from '../../../_shared/categoryCasePages';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { group: slug } = await params;
  return caseMetadata('bahamas', slug, 'Only Couple Bahamas');
}

export default async function Page({ params }) {
  const { group: slug } = await params;
  return <CaseYachtsPage region="bahamas" slug={slug} category="only-for-couple" />;
}
