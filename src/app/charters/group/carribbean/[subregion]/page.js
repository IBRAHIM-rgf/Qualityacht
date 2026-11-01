// /charters/group/carribbean/<subregion> — page d'une case Caraibes du parcours Group : bateaux coches Group + sous-region de la case (client 2026-11-01).
import { CaseYachtsPage, caseMetadata } from '../../../_shared/categoryCasePages';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { subregion: slug } = await params;
  return caseMetadata('caribbean', slug, 'Group Charter Caribbean');
}

export default async function Page({ params }) {
  const { subregion: slug } = await params;
  return <CaseYachtsPage region="caribbean" slug={slug} groups />;
}
