// /editorial/<rubrique> — articles d'une rubrique (client 2026-11-05).
// Rubrique sans article : message « coming soon » et page non indexee.
import { notFound } from 'next/navigation';
import Listing from '../Listing';
import { CATEGORIES, getCategory, sortedArticles } from '../articles';

const BASE = 'https://www.qualityacht.ch/editorial';

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  const empty = sortedArticles(category).length === 0;
  return {
    title: `${c.label} | Editorial | Qualityacht`,
    description: c.intro,
    alternates: { canonical: `${BASE}/${c.slug}` },
    ...(empty ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  if (!getCategory(category)) notFound();
  return <Listing category={category} articles={sortedArticles(category)} />;
}
