// src/app/api/admin/yachts/search/route.js - Recherche Ankor pour admin

import { NextResponse } from 'next/server';
import { fetchYachtsWithFilters } from '@/lib/yachts';

/**
 * Vérifie le token d'authentification admin
 */
function checkAuth(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!process.env.ADMIN_SECRET_TOKEN) {
    console.error('ADMIN_SECRET_TOKEN non configuré');
    return false;
  }

  return token === process.env.ADMIN_SECRET_TOKEN;
}

/**
 * GET /api/admin/yachts/search - Recherche dans l'API Ankor
 * Query params: type, destination, capacity
 */
export async function GET(request) {
  if (!checkAuth(request)) {
    return NextResponse.json(
      { error: 'Non autorisé' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);

    const filters = {
      type: searchParams.get('type') || '',
      destination: searchParams.get('destination') || '',
      capacity: searchParams.get('capacity') ? parseInt(searchParams.get('capacity')) : null,
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
