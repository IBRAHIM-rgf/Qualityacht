// src/app/admin/yachts/page.js - Page d'administration des yachts V2

import AdminYachtPanel from './AdminYachtPanel';
import './admin-calque.css';
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
    const { getSelectedYachtsWithData, getSelectionStats, ensureV3Schema } = await import('@/lib/db');
    // Colonnes recentes (dont custom_pricing) creees si besoin avant lecture.
    await ensureV3Schema();
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
    // Design « Calque Central Agent » (client 2026-10-31) : styles dans admin-calque.css,
    // limites a .qa-admin. `pt-24` degage la barre du header fixe du site.
    <div className="qa-admin pt-24">
      <div className="wrap">
        {/* ===== HEADER ===== */}
        <div className="topbar">
          <div className="left">
            <div>
              <h1>Administration des Yachts</h1>
              <div className="sub">Recherchez dans le catalogue et gérez les yachts affichés sur le site</div>
            </div>
          </div>
          <div className="right">
            <a href="/admin/regatta" className="btn-ghost">🏁 Régates</a>
            <a href="/admin/voiliers" className="btn-ghost">⛵ Voiliers</a>
            <AdminLogoutButton />
            <span style={{ background: 'var(--green-soft)', color: 'var(--green)', border: '1px solid rgba(52,201,142,.4)', padding: '7px 13px', borderRadius: 18, fontSize: 12, fontWeight: 600 }}>{stats.visible} visibles</span>
            <span style={{ background: 'var(--purple-soft)', color: 'var(--purple)', border: '1px solid rgba(232,133,58,.5)', padding: '7px 13px', borderRadius: 18, fontSize: 12, fontWeight: 600 }}>{stats.featured} featured</span>
          </div>
        </div>

        {error ? (
          <div className="priv-note" style={{ marginTop: 18 }}>
            Erreur de chargement : {error}
            <div style={{ fontWeight: 400, marginTop: 4 }}>Vérifiez la configuration de la base de données.</div>
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
