// Page Caraibes canonique : redirige vers la version de reference
// caribbean-v15 (lien « Caribbean » du menu) — client 2026-09-29, alignement
// sur le modele Caribbean (une seule version de la page).
import { redirect } from 'next/navigation';

export default function CaribbeanPage() {
  redirect('/charters/destinations/caribbean-v15');
}
