// src/app/admin/yachts-mock/page.js
// Composant SERVEUR : verifie la session avant de rendre quoi que ce soit.
// L'interface de la maquette vit dans AdminYachtsMockClient.jsx, inchangee.

import { redirect } from 'next/navigation';
import { hasValidAdminSession } from '@/lib/adminAuth';
import AdminYachtsMockClient from './AdminYachtsMockClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Maquette Admin Yachts | Qualityacht',
  robots: 'noindex, nofollow',
};

export default async function AdminYachtsMockPage({ searchParams }) {
  const params = (await searchParams) || {};

  // Ancienne URL portant encore un ancien parametre secret dans l'URL : on nettoie sans lire sa valeur.
  if ('token' in params) {
    redirect('/admin/yachts-mock');
  }

  // Page interne : aucune session valide, aucun contenu rendu.
  if (!(await hasValidAdminSession())) {
    redirect('/admin/yachts');
  }

  return <AdminYachtsMockClient />;
}
