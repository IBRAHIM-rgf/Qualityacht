// /only-for-you/<type>/<destination> (client 2026-10-14/15) : meme modele que la case
// The Caribbean — liste des yachts « Only for You » de la destination, filtree sur le
// type de voilier. Caraibes (/only-for-you/caribbean) et Bahamas (/bahamas) a part.
import { notFound } from 'next/navigation';
import { getSailingTypeBySlug, getDestinationBySlug, DESTINATION_REGION } from '../../data';
import OnlyForYouRegionYachts from '../../OnlyForYouRegionYachts';

export const dynamic = 'force-dynamic';

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
  return (
    <OnlyForYouRegionYachts
      region={DESTINATION_REGION[dest.slug] || null}
      name={dest.title}
      heroImage={dest.image}
      type={type}
      fleetTitle={`Yachts in ${dest.title.replace(/^The /, 'the ')}`}
    />
  );
}
