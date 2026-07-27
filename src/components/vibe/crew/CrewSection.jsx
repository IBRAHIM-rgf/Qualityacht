'use client';

// CrewSection — enveloppe d'une section du recit.
//  • `tone="warm"` : le fond passe de #1C1A19 a #262220 a l'entree, par une
//    transition de couleur (600ms) et NON par un degrade — c'est la nappe de 13:00.
//  • `pace="slow"` : padding vertical double (17:30, le creux emotionnel).
//  • `rail` : pose le segment de timeline avant le contenu dans le DOM, pour qu'une
//    grande photo posee apres puisse l'avaler proprement (cas de 09:15).
import CrewRail from './CrewRail';
import useInView from './useInView';

export default function CrewSection({
  tone,                 // 'warm' | undefined
  pace,                 // 'slow' | 'premise' | undefined
  rail = false,
  railLeft,             // position du filet = bord gauche de la colonne de texte
  className = '',
  children,
  ...rest
}) {
  const [ref, inView] = useInView({ threshold: 0.12 });

  const classes = [
    'crew-sec',
    pace === 'slow' ? 'crew-sec--slow' : '',
    pace === 'premise' ? 'crew-sec--premise' : '',
    tone === 'warm' ? 'crew-sec--warm' : '',
    tone === 'warm' && inView ? 'is-warm' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <section ref={ref} className={classes} {...rest}>
      {rail && <CrewRail left={railLeft} />}
      {children}
    </section>
  );
}
