'use client';

// CrewPhoto — cadre photo de la direction "A Day Aboard".
// Regle absolue de la DA : AUCUN scrim, AUCUN filtre, AUCUN mix-blend sur les photos.
// La classe .crew-photo annule aussi le img{filter:saturate(1.3)} global de globals.css
// (specificite 0,2,1 > 0,0,1) : le turquoise reste turquoise, la peau reste de la peau.
//
// Hauteurs : passees en variables CSS (--h-m mobile / --h-d desktop) parce qu'un
// style inline ne peut pas porter de media query.
// Parallax : 4% MAXIMUM, desktop >=1024px uniquement, coupe sous reduced-motion.
// C'est le seul parallax de la page (section 09:15).
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function CrewPhoto({
  src,
  alt,
  sizes = '(max-width: 768px) 100vw, 58vw',
  objectPosition = 'center',
  priority = false,
  duration = 1400,        // ms — fondu + scale de l'image
  delay = 0,
  threshold = 0.2,
  scaleFrom = 1.04,       // 1 = pas de scale (utilise pour les vignettes)
  parallax = false,
  hMobile = '60svh',
  hDesktop = 'clamp(62vh, 74vh, 880px)',
  className = '',
  style,
}) {
  const frameRef = useRef(null);
  const shiftRef = useRef(null);
  const [shown, setShown] = useState(false);

  // Reveal : fondu + leger scale sortant, sur l'image seule (le cadre ne bouge pas).
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setShown(true); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } });
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  // Parallax quasi imperceptible, pilote au scroll via rAF.
  useEffect(() => {
    if (!parallax) return;
    const frame = frameRef.current;
    const shift = shiftRef.current;
    if (!frame || !shift) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 1024) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = frame.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // p dans [-1, 1] : -1 = cadre en bas de l'ecran, 1 = cadre sorti par le haut.
      const p = Math.max(-1, Math.min(1, (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2)));
      shift.style.transform = `translate3d(0, ${(p * 2).toFixed(3)}%, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [parallax]);

  return (
    <figure
      ref={frameRef}
      className={`crew-photo ${className}`}
      style={{ '--h-m': hMobile, '--h-d': hDesktop, ...style }}
    >
      {/* couche parallax (surdimensionnee de 4% pour ne jamais laisser de vide) */}
      <div ref={shiftRef} className={parallax ? 'crew-photo__shift crew-photo__shift--px' : 'crew-photo__shift'}>
        {/* couche reveal */}
        <div
          className="crew-photo__in"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? 'scale(1)' : `scale(${scaleFrom})`,
            transition: `opacity ${duration}ms cubic-bezier(.16,1,.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(.16,1,.3,1) ${delay}ms`,
          }}
        >
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: 'cover', objectPosition }} />
        </div>
      </div>
    </figure>
  );
}
