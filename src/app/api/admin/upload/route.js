// src/app/api/admin/upload/route.js — Import de photos depuis l'ordinateur (client 2026-10-29).
// Le navigateur envoie la photo directement vers Vercel Blob (pas de limite de taille
// des fonctions) ; cette route ne fait que delivrer le jeton d'envoi, et seulement a
// une session d'administration valide. Photos publiques, rangees sous yachts/.

import { guardAdminRoute } from '@/lib/adminAuth';

export async function POST(request) {
  const denied = guardAdminRoute(request);
  if (denied) return denied;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json({ error: 'blob_not_configured' }, { status: 503 });
  }

  const { handleUpload } = await import('@vercel/blob/client');
  try {
    const body = await request.json();
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith('yachts/')) throw new Error('bad_path');
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
          maximumSizeInBytes: 30 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
    });
    return Response.json(json);
  } catch (error) {
    console.error('admin upload error:', error);
    return Response.json({ error: 'upload_failed' }, { status: 400 });
  }
}
