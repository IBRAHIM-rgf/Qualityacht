// Pages du silo SEO halal : /halal-yacht-charter/<slug> (client 2026-10-23).
// Les pages caribbean, bahamas, usa et faq ont leur propre dossier (prioritaires).
import { notFound } from 'next/navigation';
import SiloPage from '../_silo/SiloPage';
import { SILO } from '../_silo/content';
import { getHalalYachts } from '@/lib/halalYachts';

export const dynamic = 'force-dynamic';

const BASE = 'https://www.qualityacht.ch/halal-yacht-charter';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = SILO[slug];
  if (!p) return {};
  return { title: p.title, description: p.description, alternates: { canonical: `${BASE}/${slug}` } };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const page = SILO[slug];
  if (!page) notFound();
  // Yachts coches « Halal Charter » dans les regions de la page (sans doublon).
  const lists = await Promise.all(page.regions.map((r) => getHalalYachts(r)));
  const seen = new Set();
  const yachts = lists.flat().filter((y) => (seen.has(y.id) ? false : seen.add(y.id)));
  return <SiloPage slug={slug} page={page} yachts={yachts} />;
}
