// src/app/admin/yachts/page.js - Page d'administration des yachts

import { redirect } from 'next/navigation';
import AdminYachtPanel from './AdminYachtPanel';
import { fetchYachtsWithFilters } from '@/lib/yachts';
import { getYachtSelections, getSelectionStats } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Admin - Gestion des Yachts | Qualityacht',
  robots: 'noindex, nofollow'
};

export default async function AdminYachtsPage({ searchParams }) {
  const token = searchParams?.token;

  // Protection par token secret
  if (!token || token !== process.env.ADMIN_SECRET_TOKEN) {
    return (
      <div className="min-h-screen bg-[#303135] flex items-center justify-center">
        <div className="bg-[#1b223d] border border-red-700 rounded-xl p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Accès Refusé</h1>
          <p className="text-gray-400 mb-4">
            {!token ? 'Token manquant dans l\'URL' : 'Token invalide'}
          </p>
          <p className="text-gray-500 text-sm">
            Utilisez : /admin/yachts?token=VOTRE_TOKEN
          </p>
          <p className="text-gray-600 text-xs mt-4">
            Token attendu configuré : {process.env.ADMIN_SECRET_TOKEN ? 'Oui' : 'Non (variable manquante)'}
          </p>
        </div>
      </div>
    );
  }

  let allYachts = [];
  let selections = [];
  let stats = { total: 0, visible: 0, featured: 0, categories: 0 };
  let error = null;

  try {
    // Fetch les yachts Ankor et les sélections en parallèle
    const [ankorData, dbSelections, dbStats] = await Promise.all([
      fetchYachtsWithFilters({}),
      getYachtSelections(),
      getSelectionStats()
    ]);

    allYachts = ankorData.yachts || [];
    selections = dbSelections || [];
    stats = dbStats || { total: 0, visible: 0, featured: 0, categories: 0 };

    // Merger les données Ankor avec les sélections
    const selectionsMap = new Map(selections.map(s => [s.yacht_id, s]));

    allYachts = allYachts.map(yacht => ({
      ...yacht,
      selection: selectionsMap.get(yacht.id) || null
    }));

  } catch (err) {
    console.error('Erreur chargement admin:', err);
    error = err.message;
  }

  return (
    <div className="min-h-screen bg-[#303135]">
      {/* Header Admin */}
      <div className="bg-[#1b223d] border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#C0C0C0] trajan-regular">
              Gestion des Yachts
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Présélection et organisation des yachts affichés sur le site
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right text-sm">
              <div className="text-[#C0C0C0]">
                <span className="text-green-400 font-semibold">{stats.visible}</span> visibles
              </div>
              <div className="text-gray-400">
                <span className="text-yellow-400 font-semibold">{stats.featured}</span> featured
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {error ? (
          <div className="bg-red-900/30 border border-red-700 rounded-xl p-6 text-center">
            <p className="text-red-300">Erreur de chargement : {error}</p>
            <p className="text-gray-400 text-sm mt-2">
              Vérifiez la configuration de la base de données et de l'API Ankor.
            </p>
          </div>
        ) : (
          <AdminYachtPanel
            initialYachts={allYachts}
            initialStats={stats}
            token={token}
          />
        )}
      </div>
    </div>
  );
}
