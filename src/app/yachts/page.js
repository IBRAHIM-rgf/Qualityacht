// src/app/yachts/page.js

import YachtPageClient from './YachtPageClient';
import { fetchYachtsWithFilters } from '@/lib/yachts';

export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }) {
  try {
    const params = await searchParams;

    const initialFilters = {
      type: params.type || '',
      destination: params.destination || '',
      capacity: params.capacity ? Number(params.capacity) : null,
      petFriendly: params.petFriendly === 'true',
      charterType: params.charterType || '',
      minLength: params.minLength ? Number(params.minLength) : null,
      maxLength: params.maxLength ? Number(params.maxLength) : null,
      currency: params.currency || '',
      priceMin: params.priceMin ? Number(params.priceMin) : null,
      priceMax: params.priceMax ? Number(params.priceMax) : null,
    };

    const { yachts, totalYachts } = await fetchYachtsWithFilters(initialFilters);

    return (
      <YachtPageClient
        initialFilters={initialFilters}
        initialData={yachts}
        totalYachts={totalYachts}
      />
    );
  } catch (error) {
    console.error("Échec de l'initialisation de l'API Ankor:", error);
    return <p>Erreur de chargement des yachts: Veuillez vérifier l authentification.</p>;
  }
}
