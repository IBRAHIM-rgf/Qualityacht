'use client';

// Apparition douce au scroll, propre a /group. Fail-safe : si le JS ne tourne
// pas, le contenu reste visible (l'opacite n'est baissee que dans l'effet).
import { useEffect, useRef, useState } from 'react';
import styles from './group.module.css';

export default function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  const [arme, setArme] = useState(false);

  useEffect(() => {
    setArme(true);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setOn(true), delay);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${arme ? styles.reveal : ''} ${on ? styles.revealOn : ''} ${className}`}
    >
      {children}
    </div>
  );
}
