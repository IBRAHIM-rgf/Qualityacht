// /charters/day-charter/north-america/<region> — page d'une case North America du parcours Day Charter : bateaux coches Day Charter + sous-region de la case (client 2026-10-27).
import { CaseYachtsPage, caseMetadata } from '../../../_shared/categoryCasePages';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { group: slug } = await params;
  return caseMetadata('north-america', slug, 'Day Charter North America');
}

export default async function Page({ params }) {
  const { group: slug } = await params;
  return <CaseYachtsPage region="north-america" slug={slug} dayCharter />;
}
