// src/app/api/admin/heartbeat/route.js
// Heartbeat de présence admin. Appelé toutes les 30s depuis le panel admin.
// Retourne le nombre de sessions admin actives (vues dans la dernière minute).

import { NextResponse } from 'next/server';
import { heartbeatAdmin } from '@/lib/db';

function checkAuth(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  if (!process.env.ADMIN_SECRET_TOKEN) return false;
  return token === process.env.ADMIN_SECRET_TOKEN;
}

export async function POST(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
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
