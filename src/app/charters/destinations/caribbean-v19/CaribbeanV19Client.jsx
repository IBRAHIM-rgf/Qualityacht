'use client';

// Caraibes V19 — version standard de la direction "A Day Aboard".
// Tout le montage vit dans CrewDay ; ce fichier ne fait que brancher le contenu
// et appliquer les variables de fonte sur le conteneur racine .crew-day.
import CrewDay from '@/components/vibe/crew/CrewDay';
import { caribbeanDay } from '@/components/vibe/crew/crewContent';

export default function CaribbeanV19Client({ fontClass = '' }) {
  return <CrewDay fontClass={fontClass} content={caribbeanDay} />;
}
