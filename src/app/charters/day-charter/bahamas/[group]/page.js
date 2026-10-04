// /charters/day-charter/bahamas/<group> — page d'une case Bahamas du parcours Day Charter : bateaux coches Day Charter + sous-region de la case (client 2026-10-04).
import { CaseYachtsPage, caseMetadata } from '../../../_shared/categoryCasePages';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { group: slug } = await params;
  return caseMetadata('bahamas', slug, 'Day Charter Bahamas');
}

export default async function Page({ params }) {
  const { group: slug } = await params;
  return <CaseYachtsPage region="bahamas" slug={slug} dayCharter />;
}
