// src/app/api/admin/yachts/search/route.js - Recherche Ankor pour admin

import { NextResponse } from 'next/server';
import { guardAdminRoute } from '@/lib/adminAuth';

/**
 * GET /api/admin/yachts/search - Recherche dans l'API Ankor
 * Query params: type, destination, capacity, minLength, maxLength, priceMin, priceMax
 */
export async function GET(request) {
  const denied = guardAdminRoute(request);
  if (denied) return denied;

  try {

    // Chargement APRES la garde : aucun module susceptible d'ouvrir une connexion
    // n'est initialise avant que l'authentification soit etablie.
    const { fetchYachtsWithFilters } = await import('@/lib/yachts');
    const { searchParams } = new URL(request.url);

    const filters = {
      type: searchParams.get('type') || '',
      destination: searchParams.get('destination') || '',
      capacity: searchParams.get('capacity') ? parseInt(searchParams.get('capacity')) : null,
      minLength: searchParams.get('minLength') ? parseInt(searchParams.get('minLength')) : null,
      maxLength: searchParams.get('maxLength') ? parseInt(searchParams.get('maxLength')) : null,
      priceMin: searchParams.get('priceMin') ? parseInt(searchParams.get('priceMin')) : null,
      priceMax: searchParams.get('priceMax') ? parseInt(searchParams.get('priceMax')) : null,
    };

    const result = await fetchYachtsWithFilters(filters);

    return NextResponse.json({
      yachts: result.yachts || [],
      totalYachts: result.totalYachts || 0,
    });
  } catch (error) {
    console.error('Erreur GET /api/admin/yachts/search:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error.message },
      { status: 500 }
    );
  }
}
