// Pages destinations hors Caraibes / Bahamas / North America (client 2026-11-01) :
// comme Caribbean et Bahamas, seuls les bateaux publies dans l'admin avec la region
// cochee s'affichent (avant : tout le catalogue Ankor de la region, fiche par fiche,
// 25 a 40 s de chargement, et plusieurs pages montraient les memes bateaux).
import YachtPageClient from '@/app/yachts/YachtPageClient';
import { getCategoryYachts } from '@/lib/categoryYachts';

// Filtres vides : la liste est deja filtree par region cote serveur (un filtre
// destination cote client retirerait les bateaux a plusieurs regions).
const FILTERS = {
  destination: '', type: '', capacity: null, charterType: '',
  minLength: null, maxLength: null, currency: '', priceMin: null, priceMax: null,
};

export default async function RegionYachtsPage({ region }) {
  const yachts = await getCategoryYachts({ region });
  return <YachtPageClient initialFilters={FILTERS} initialData={yachts} totalYachts={yachts.length} />;
}
