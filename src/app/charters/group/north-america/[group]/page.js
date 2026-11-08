// /charters/group/north-america/<region> — page d'une case North America du parcours Group :
// bateaux coches Group + region de la case (client 2026-11-08), comme Group Bahamas.
import { CaseYachtsPage, caseMetadata } from '../../../_shared/categoryCasePages';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { group: slug } = await params;
  return caseMetadata('north-america', slug, 'Group Charter North America');
}

export default async function Page({ params }) {
  const { group: slug } = await params;
  return <CaseYachtsPage region="north-america" slug={slug} groups />;
}
