// /charters/group/bahamas/<group> — page d'une case Bahamas du parcours Group : bateaux coches Group + sous-region de la case (client 2026-11-01).
import { CaseYachtsPage, caseMetadata } from '../../../_shared/categoryCasePages';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { group: slug } = await params;
  return caseMetadata('bahamas', slug, 'Group Charter Bahamas');
}

export default async function Page({ params }) {
  const { group: slug } = await params;
  return <CaseYachtsPage region="bahamas" slug={slug} groups />;
}
