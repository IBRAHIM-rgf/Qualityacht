// src/app/admin/yachts/page.js - Page d'administration des yachts V2

import AdminYachtPanel from './AdminYachtPanel';
import { getSelectedYachtsWithData, getSelectionStats } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Admin - Gestion des Yachts | Qualityacht',
  robots: 'noindex, nofollow'
};

export default async function AdminYachtsPage({ searchParams }) {
  const params = await searchParams;
  const token = params?.token;

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

  let selections = [];
  let stats = { total: 0, visible: 0, featured: 0, categories: 0 };
  let error = null;

  try {
    // Fetch les sélections et stats depuis la base de données
    const [dbSelections, dbStats] = await Promise.all([
      getSelectedYachtsWithData(),
      getSelectionStats()
    ]);

    selections = dbSelections || [];
    stats = dbStats || { total: 0, visible: 0, featured: 0, categories: 0 };

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
              Recherchez dans Ankor et sélectionnez les yachts à afficher
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right text-sm">
              <div className="text-[#C0C0C0]">
                <span className="text-green-400 font-semibold">{stats.visible}</span> visibles
              </div>
              <div className="text-gray-400">
                <span className="text-orange-400 font-semibold">{stats.featured}</span> featured
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
              Vérifiez la configuration de la base de données.
            </p>
          </div>
        ) : (
          <AdminYachtPanel
            initialSelections={selections}
            initialStats={stats}
            token={token}
          />
        )}
      </div>
    </div>
  );
}
