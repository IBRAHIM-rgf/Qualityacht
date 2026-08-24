// src/app/api/admin/heartbeat/route.js
// Heartbeat de présence admin. Appelé toutes les 30s depuis le panel admin.
// Retourne le nombre de sessions admin actives (vues dans la dernière minute).

import { NextResponse } from 'next/server';
import { guardAdminRoute } from '@/lib/adminAuth';

export async function POST(request) {
  const denied = guardAdminRoute(request);
  if (denied) return denied;

  try {

    // Chargement APRES la garde : aucun module susceptible d'ouvrir une connexion
    // n'est initialise avant que l'authentification soit etablie.
    const { heartbeatAdmin } = await import('@/lib/db');
    const body = await request.json();
    const { sessionToken } = body;
    if (!sessionToken || typeof sessionToken !== 'string') {
      return NextResponse.json({ error: 'sessionToken requis' }, { status: 400 });
    }
    const { activeCount } = await heartbeatAdmin(sessionToken);
    return NextResponse.json({ success: true, activeCount });
  } catch (error) {
    console.error('Erreur POST /api/admin/heartbeat:', error);
    return NextResponse.json({ error: 'Erreur serveur', details: error.message }, { status: 500 });
  }
}
