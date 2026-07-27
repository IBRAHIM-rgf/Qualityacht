'use client';

// Halal Caraibes V19 — meme squelette exact que la version standard.
// Seul le jeu de medias et de copy change (voir crewContent.js) : visages,
// horaires et faits d'equipage. L'observance y est enoncee comme un FAIT de la
// journee, jamais comme un argument de vente ni comme un badge.
import CrewDay from '@/components/vibe/crew/CrewDay';
import { halalDay } from '@/components/vibe/crew/crewContent';

export default function HalalV19Client({ fontClass = '' }) {
  return <CrewDay fontClass={fontClass} content={halalDay} />;
}
