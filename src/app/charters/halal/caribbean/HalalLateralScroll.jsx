'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

// Section facon Mamounia, sur le meme principe que caribbean-v16 : la section se fige
// (sticky) et le scroll vertical pilote un translateX du rail horizontal, puis la page
// reprend son scroll normal. Aucune lib externe, transform posee directement sur le DOM
// (pas de re-render React par frame).
//
// Slide 1 : texte halal a gauche + photo a droite.
// Slide 2 : colonne texte laissee VIDE (demande client) + derniere photo a droite.
// Chaque photo se revele par un rideau qui s'ouvre de GAUCHE a DROITE (clip-path),
// declenche quand la photo entre dans le viewport (progression de scroll, pas d'IO :
// l'IO est peu fiable sur un rail deplace par transform).
// AUCUN emoji.

const REVEAL_RATIO = 0.88; // la photo se revele quand son bord gauche passe sous 88% du viewport

function Photo({ src, alt, priority = false }) {
  return (
    <div className="curtain relative h-full w-full overflow-hidden rounded-2xl border border-[#C0C0C0]/15">
      <Image
        src={encodeURI(src)}
        alt={alt}
        fill
        sizes="(max-width:768px) 100vw, 55vw"
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}

function TextBlock({ eyebrow, title, paragraphs }) {
  return (
    <div className="flex h-full flex-col justify-center">
      {eyebrow && (
        <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#B87333] font-medium">{eyebrow}</p>
      )}
      <h2 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.08em] text-[#C0C0C0] leading-tight">
        {title}
      </h2>
      <div className="relative mt-4 h-5 w-28">
        <Image src="/images/title-line.png" alt="" fill className="object-contain" />
      </div>
      <div className="mt-6 space-y-4 max-w-lg">
        {paragraphs.map((t) => (
          <p key={t.slice(0, 24)} className="text-sm md:text-base leading-relaxed text-[#acb0cd]">
            {t}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function HalalLateralScroll({ eyebrow, title, paragraphs, photos = [] }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const compute = () => {
      const wrap = wrapRef.current;
      const track = trackRef.current;

      // 1) Rail horizontal (desktop) : progression du scroll -> translateX
      if (wrap && track && wrap.offsetHeight > 0) {
        const scrollable = wrap.offsetHeight - window.innerHeight;
        if (scrollable <= 0) {
          track.style.transform = 'translate3d(0,0,0)';
        } else {
          const progress = Math.min(1, Math.max(0, -wrap.getBoundingClientRect().top / scrollable));
          const maxX = Math.max(0, track.scrollWidth - track.clientWidth);
          track.style.transform = `translate3d(${-progress * maxX}px,0,0)`;
        }
      }

      // 2) Rideau : ouvert des que la photo entre dans le viewport (horizontalement en
      //    desktop, verticalement en mobile). Une fois ouvert, on n'y revient pas.
      const root = rootRef.current;
      if (!root) return;
      root.querySelectorAll('.curtain').forEach((el) => {
        if (el.classList.contains('is-open')) return;
        const r = el.getBoundingClientRect();
        const inX = r.left < window.innerWidth * REVEAL_RATIO && r.right > 0;
        const inY = r.top < window.innerHeight * REVEAL_RATIO && r.bottom > 0;
        if (inX && inY) el.classList.add('is-open');
      });
    };

    compute();
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, []);

  const text = <TextBlock eyebrow={eyebrow} title={title} paragraphs={paragraphs} />;

  return (
    <div ref={rootRef} className="bg-[#26272a]">
      <style>{`
        .curtain > img,
        .curtain > span > img {
          clip-path: inset(0 100% 0 0);
          transition: clip-path 1.15s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .curtain.is-open > img,
        .curtain.is-open > span > img {
          clip-path: inset(0 0 0 0);
        }
      `}</style>

      {/* ── MOBILE : pas de pin, empilement vertical (meme rideau) ── */}
      <div className="md:hidden px-5 py-14 space-y-8">
        {text}
        {photos.map((src, i) => (
          <div key={src} className="h-[58vh]">
            <Photo src={src} alt={title} priority={i === 0} />
          </div>
        ))}
      </div>

      {/* ── DESKTOP : pin + scroll lateral (technique v16) ──
          1 slide par photo. Slide 1 = texte + photo ; slides suivants = colonne texte
          laissee VIDE + photo. Hauteur de la section proportionnelle au nombre de
          slides pour garder le meme rythme de scroll (150vh par slide). */}
      <section
        ref={wrapRef}
        className="hidden md:block relative"
        style={{ height: `${Math.max(2, photos.length) * 150}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <div ref={trackRef} className="flex h-[74vh] w-full will-change-transform">
            {photos.map((src, i) => (
              <div key={src} className="shrink-0 w-screen h-full grid grid-cols-2 gap-10 px-[6vw]">
                {i === 0 ? text : <div aria-hidden />}
                <Photo src={src} alt={title} priority={i === 0} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
