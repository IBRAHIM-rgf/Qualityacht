// src/app/api/admin/yachts/processed-hero/route.js
import { NextResponse } from 'next/server';
import { saveProcessedHero, getProcessedHeroes } from '@/lib/db';

function checkAuth(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  if (!process.env.ADMIN_SECRET_TOKEN) return false;
  return token === process.env.ADMIN_SECRET_TOKEN;
}

/**
 * GET - Récupérer toutes les images hero détourées
 */
export async function GET(request) {
  try {
    const rows = await getProcessedHeroes();
    const heroMap = {};
    rows.forEach(r => { heroMap[r.yacht_id] = r.processed_hero; });
    return NextResponse.json({ heroes: heroMap });
  } catch (error) {
    console.error('Erreur GET processed-hero:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

/**
 * POST - Sauvegarder une image hero détourée
 */
export async function POST(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const { yacht_id, processed_hero } = await request.json();

    if (!yacht_id || !processed_hero) {
      return NextResponse.json({ error: 'yacht_id et processed_hero requis' }, { status: 400 });
    }

    const result = await saveProcessedHero(yacht_id, processed_hero);

    if (!result) {
      return NextResponse.json({ error: 'Yacht non trouvé en BDD' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      yacht_id: result.yacht_id,
      yacht_name: result.yacht_name,
    });
  } catch (error) {
    console.error('Erreur POST processed-hero:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
