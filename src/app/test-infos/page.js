// test-infos : page exemple qui affiche TOUT ce qu'Ankor renvoie pour un yacht.
// Yacht ciblé par défaut : CORAL OCEAN (le plus complet de la BDD : 82 images, 38 crew avec bio, 4 saisons).
// Les champs absents côté Ankor sont remplis avec des valeurs d'exemple marquées EN ROUGE
// pour montrer ce qui serait possible si l'API les retournait.

import { getSelectionYachtFullByName } from '@/lib/db';
import TestInfosClient from './TestInfosClient';

export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const target = params?.name || 'Coral Ocean';
  const yacht = await getSelectionYachtFullByName(target);
  return <TestInfosClient yacht={yacht} />;
}
