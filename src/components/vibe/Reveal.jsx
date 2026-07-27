'use client';

// Reveal — wrapper d'animation au scroll (facon alethia.earth). Quand l'element
// entre dans le viewport, il passe de son etat "cache" (variant) a son etat visible
// via une transition douce. Entierement autonome (aucun CSS global requis).
//
// variant : 'up' | 'fade' | 'scale' | 'left' | 'right' | 'blur' | 'zoom'
// delay   : ms (cascade). once : ne se joue qu'une fois (defaut true).
// prefers-reduced-motion : affiche directement sans animation.

import { useEffect, useRef, useState } from 'react';

function hiddenStyle(variant) {
  switch (variant) {
    case 'fade':  return { opacity: 0 };
    case 'scale': return { opacity: 0, transform: 'scale(0.9)' };
    case 'left':  return { opacity: 0, transform: 'translateX(-56px)' };
    case 'right': return { opacity: 0, transform: 'translateX(56px)' };
    case 'blur':  return { opacity: 0, filter: 'blur(14px)', transform: 'scale(1.03)' };
    case 'zoom':  return { opacity: 0, transform: 'scale(1.12)' };
    case 'up':
    default:      return { opacity: 0, transform: 'translateY(48px)' };
  }
}

export default function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  duration = 1000,
  threshold = 0.15,
  once = true,
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
      entries.forEach((e) => {
        if (e.isIntersecting) { setShown(true); if (once) io.disconnect(); }
        else if (!once) setShown(false);
      });
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold]);

  const hidden = hiddenStyle(variant);
  const t = `${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        willChange: 'opacity, transform, filter',
        transition: `opacity ${t}, transform ${t}, filter ${duration * 0.9}ms ease ${delay}ms`,
        ...(shown ? { opacity: 1, transform: 'none', filter: 'none' } : hidden),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
