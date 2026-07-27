'use client';

// CrewRail — segment de la timeline : un filet de 1px en braise qui se dessine du
// haut vers le bas a l'entree de la section. Un segment par heure ; comme les
// sections se touchent, les segments forment une ligne continue de 06:40 a 21:00.
//
// `left` suit la colonne de TEXTE de la section, pour que le point de l'heure
// tombe TOUJOURS exactement sur le filet. La seule heure sans rail est 09:15 :
// la grande photo l'avale, et c'est le propos (l'heure a ete avalee par l'eau).
import useInView from './useInView';

export default function CrewRail({ top = 0, bottom = 0, left }) {
  const [ref, inView] = useInView({ threshold: 0.05 });
  return (
    <div
      ref={ref}
      className={`crew-rail ${inView ? 'is-drawn' : ''}`}
      style={{ top, bottom, ...(left ? { '--rail-x': left } : null) }}
      aria-hidden="true"
    />
  );
}
