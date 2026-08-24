// src/app/admin/yachts/page.js - Page d'administration des yachts V2

import AdminYachtPanel from './AdminYachtPanel';
import AdminLogin from './AdminLogin';
import AdminLogoutButton from './AdminLogoutButton';
import { redirect } from 'next/navigation';
import { hasValidAdminSession } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Admin - Gestion des Yachts | Qualityacht',
  robots: 'noindex, nofollow'
};

export default async function AdminYachtsPage({ searchParams }) {
  const params = await searchParams;

  // Ancienne URL portant encore un ancien parametre secret dans l'URL : on nettoie immediatement sans lire ni
  // valider le parametre, pour qu'il cesse de circuler dans l'historique et les logs.
  if (params && 'token' in params) {
    redirect('/admin/yachts');
  }

  // Seule la session signee du cookie fait foi.
  if (!(await hasValidAdminSession())) {
    return <AdminLogin />;
  }

  let selections = [];
  let stats = { total: 0, visible: 0, featured: 0, categories: 0 };
  let error = null;

  try {
    // Chargement APRES verification de la session : sans authentification, aucun
    // module susceptible d'ouvrir une connexion n'est initialise.
    const { getSelectedYachtsWithData, getSelectionStats } = await import('@/lib/db');
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
      {/* Header Admin. `pt-24` degage la barre du header fixe du site, qui la
          recouvrait et rendait ses boutons inclicables. */}
      <div className="bg-[#1b223d] border-b border-gray-700 px-6 py-4 pt-24">
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
            <a
              href="/admin/regatta"
              className="flex-none px-4 py-2 rounded-lg border border-[#B87333]/60 text-[#B87333] hover:bg-[#B87333]/10 hover:text-[#bd9973] text-sm font-medium transition-colors whitespace-nowrap"
            >
              🏁 Régates
            </a>
            <a
              href="/admin/voiliers"
              className="flex-none px-4 py-2 rounded-lg border border-[#B87333]/60 text-[#B87333] hover:bg-[#B87333]/10 hover:text-[#bd9973] text-sm font-medium transition-colors whitespace-nowrap"
            >
              ⛵ Voiliers
            </a>
            <AdminLogoutButton />
            <div className="text-right text-sm">
              <div className="text-[#C0C0C0]">
                <span className="text-green-400 font-semibold">{stats.visible}</span> visibles
              </div>
              <div className="text-gray-400">
                <span className="text-copper-400 font-semibold">{stats.featured}</span> featured
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
          />
        )}
      </div>
    </div>
  );
}
