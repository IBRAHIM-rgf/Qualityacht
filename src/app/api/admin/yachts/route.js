// src/app/api/admin/yachts/route.js - API Admin pour les présélections V2

import { NextResponse } from 'next/server';
import {
  getYachtSelections,
  getSelectionStats,
  addYachtToSelection,
  updateYachtVisibility,
  updateYachtFeatured,
  updateYachtOrder,
  updateYachtEnrichedData,
  removeYachtFromSelection,
  getSelectedYachtsWithData,
} from '@/lib/db';

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
 * GET /api/admin/yachts - Récupère toutes les sélections avec leurs données
 */
export async function GET(request) {
  if (!checkAuth(request)) {
    return NextResponse.json(
      { error: 'Non autorisé' },
      { status: 401 }
    );
  }

  try {
    const [selections, stats] = await Promise.all([
      getSelectedYachtsWithData(),
      getSelectionStats()
    ]);

    return NextResponse.json({
      selections,
      stats
    });
  } catch (error) {
    console.error('Erreur GET /api/admin/yachts:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/yachts - Ajouter un yacht à la sélection
 * Body: { yacht_id, yacht_name, cached_data }
 */
export async function POST(request) {
  if (!checkAuth(request)) {
    return NextResponse.json(
      { error: 'Non autorisé' },
      { status: 401 }
    );
  }

  try {
    const data = await request.json();

    if (!data.yacht_id) {
      return NextResponse.json(
        { error: 'yacht_id requis' },
        { status: 400 }
      );
    }

    const result = await addYachtToSelection({
      yacht_id: data.yacht_id,
      yacht_name: data.yacht_name,
      cached_data: data.cached_data || null,
    });

    return NextResponse.json({
      success: true,
      selection: result
    });
  } catch (error) {
    console.error('Erreur POST /api/admin/yachts:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/yachts - Mises à jour partielles
 * Body: { action: 'visibility' | 'featured' | 'order' | 'enrich', ... }
 */
export async function PATCH(request) {
  if (!checkAuth(request)) {
    return NextResponse.json(
      { error: 'Non autorisé' },
      { status: 401 }
    );
  }

  try {
    const data = await request.json();
    const { action } = data;

    switch (action) {
      case 'visibility': {
        const { yacht_id, is_visible } = data;
        if (!yacht_id) {
          return NextResponse.json({ error: 'yacht_id requis' }, { status: 400 });
        }
        const result = await updateYachtVisibility(yacht_id, is_visible);
        return NextResponse.json({ success: true, selection: result });
      }

      case 'featured': {
        const { yacht_id, is_featured } = data;
        if (!yacht_id) {
          return NextResponse.json({ error: 'yacht_id requis' }, { status: 400 });
        }
        const result = await updateYachtFeatured(yacht_id, is_featured);
        return NextResponse.json({ success: true, selection: result });
      }

      case 'order': {
        const { updates } = data;
        if (!updates || !Array.isArray(updates)) {
          return NextResponse.json({ error: 'updates requis (array)' }, { status: 400 });
        }
        await updateYachtOrder(updates);
        return NextResponse.json({ success: true });
      }

      case 'enrich': {
        const { yacht_id, custom_title, custom_description, custom_price, category, internal_notes } = data;
        if (!yacht_id) {
          return NextResponse.json({ error: 'yacht_id requis' }, { status: 400 });
        }
        const result = await updateYachtEnrichedData(yacht_id, {
          custom_title,
          custom_description,
          custom_price,
          category,
          internal_notes,
        });
        return NextResponse.json({ success: true, selection: result });
      }

      default:
        return NextResponse.json(
          { error: 'Action non reconnue' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Erreur PATCH /api/admin/yachts:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/yachts - Supprimer un yacht de la sélection
 * Query: ?yacht_id=xxx
 */
export async function DELETE(request) {
  if (!checkAuth(request)) {
    return NextResponse.json(
      { error: 'Non autorisé' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const yacht_id = searchParams.get('yacht_id');

    if (!yacht_id) {
      return NextResponse.json(
        { error: 'yacht_id requis' },
        { status: 400 }
      );
    }

    await removeYachtFromSelection(yacht_id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE /api/admin/yachts:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
