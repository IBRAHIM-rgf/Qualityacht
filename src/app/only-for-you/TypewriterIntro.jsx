'use client';

// ══ /only-for-you — paragraphe d'introduction (client 2026-09-12) ══
//
// Le texte est agrandi, mis en gras, et s'ecrit a la machine a ecrire lorsqu'il
// entre dans l'ecran (une seule fois). Le texte lui-meme n'est pas modifie : il
// est passe en enfant depuis la page et seulement revele progressivement.
// `prefers-reduced-motion` : le texte s'affiche d'un coup, sans animation.

import { useEffect, useRef, useState } from 'react';

export default function TypewriterIntro({ text, className = '' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);

  // Declenchement a l'arrivee dans l'ecran.
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') {
      setShown(text.length);
      setStarted(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStarted(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [text.length]);

  // Frappe : ~18 ms par caractere, par petits paquets pour rester fluide.
  useEffect(() => {
    if (!started || shown >= text.length) return undefined;
    const id = setTimeout(() => setShown((n) => Math.min(text.length, n + 2)), 18);
    return () => clearTimeout(id);
  }, [started, shown, text.length]);

  const done = shown >= text.length;

  return (
    <p ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{text.slice(0, shown)}</span>
      {/* Curseur de frappe, retire une fois le texte complet. */}
      {!done && (
        <span
          aria-hidden
          className="inline-block w-[2px] translate-y-[2px] bg-[#c2622a] align-middle"
          style={{ height: '1em', animation: 'qyCaret 0.9s steps(1) infinite' }}
        />
      )}
      <style jsx>{`
        @keyframes qyCaret {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </p>
  );
}
