'use client';

// CrewHairline — le filet horizontal de la section "premise". Il se dessine de
// gauche a droite a l'entree : c'est la PREMIERE apparition de la timeline qui va
// ensuite traverser verticalement les cinq heures du recit.
import useInView from './useInView';

export default function CrewHairline({ className = '', style }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  return (
    <span
      ref={ref}
      className={`crew-hairline ${inView ? 'is-drawn' : ''} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}
