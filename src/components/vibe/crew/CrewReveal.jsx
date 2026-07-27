'use client';

// CrewReveal — le SEUL mouvement autorise sur cette direction : un fondu montant.
// Pas de blur, pas de rotation, pas de rebond. La sobriete du mouvement sert
// l'intimite du propos. Sous prefers-reduced-motion, l'element apparait deja pose
// (double securite : etat JS immediat + regle CSS !important dans CrewStyles).
import { useEffect, useRef, useState } from 'react';

export default function CrewReveal({
  as: Tag = 'div',
  y = 24,                 // translation verticale de depart, en px
  duration = 900,         // ms
  delay = 0,              // ms (cascade)
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
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setShown(true); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } });
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={`crew-reveal ${className}`}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : `translateY(${y}px)`,
        transition: `opacity ${duration}ms cubic-bezier(.16,1,.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(.16,1,.3,1) ${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
