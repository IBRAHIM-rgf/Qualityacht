'use client';

// Reveal — apparition au scroll propre a la direction Golden Hour.
// Ici on ne fait QUE du fondu + une montee courte (18 a 32px). Pas de blur (sur une
// serif fine comme Fraunces le blur donne de la bouillie), pas de scale qui rebondit.
// Durees longues (1000-1400ms) et courbe cubic-bezier(0.16,1,0.3,1) : ca se pose,
// ca n'arrive pas. prefers-reduced-motion : etat final immediat.

import { useEffect, useRef, useState } from 'react';

export default function Reveal({
  as: Tag = 'div',
  y = 24,               // amplitude de montee en px
  scaleFrom = 1,        // 1.04 -> 1 pour le "settle" des images de la section 7
  delay = 0,
  duration = 1200,
  threshold = 0.2,
  className = '',
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  const t = `${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
  const hidden = {
    opacity: 0,
    transform: `translateY(${y}px) scale(${scaleFrom})`,
  };

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        willChange: 'opacity, transform',
        transition: `opacity ${t}, transform ${t}`,
        ...(shown ? { opacity: 1, transform: 'translateY(0) scale(1)' } : hidden),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
