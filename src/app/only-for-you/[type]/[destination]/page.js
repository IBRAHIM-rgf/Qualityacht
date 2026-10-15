// /only-for-you/<type>/<destination> (client 2026-10-14) — voir DestinationHero.
// Caraibes (/carribbean) et Bahamas (/bahamas) ont leur propre dossier.
import { notFound } from 'next/navigation';
import { getSailingTypeBySlug, getDestinationBySlug } from '../../data';
import DestinationHero from './DestinationHero';

export async function generateMetadata({ params }) {
  const { type, destination } = await params;
  const boat = getSailingTypeBySlug(type);
  const dest = getDestinationBySlug(destination);
  if (!boat || !dest) return {};
  return { title: `${boat.name} — ${dest.title} | Qualityacht` };
}

export default async function OnlyForYouDestinationPage({ params }) {
  const { type, destination } = await params;
  const boat = getSailingTypeBySlug(type);
  const dest = getDestinationBySlug(destination);
  if (!boat || !dest) notFound();
  return <DestinationHero boat={boat} typeSlug={type} title={dest.title} image={dest.image} />;
}
