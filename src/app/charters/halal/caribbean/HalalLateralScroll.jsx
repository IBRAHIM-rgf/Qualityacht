'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

// Section facon Mamounia, sur le meme principe que caribbean-v16 : la section se fige
// (sticky) et le scroll vertical pilote un translateX du rail horizontal, puis la page
// reprend son scroll normal. Aucune lib externe, transform posee directement sur le DOM
// (pas de re-render React par frame).
//
// 1 slide par photo : le paragraphe de meme rang est affiche a gauche, sa photo a
// droite. Ni chapo ni titre dans la section.
// Chaque photo se revele par un rideau qui s'ouvre de GAUCHE a DROITE (clip-path),
// declenche quand la photo entre dans le viewport (progression de scroll, pas d'IO :
// l'IO est peu fiable sur un rail deplace par transform).
// AUCUN emoji.

const REVEAL_RATIO = 0.88; // la photo se revele quand son bord gauche passe sous 88% du viewport

function Photo({ src, alt, priority = false }) {
  return (
    <div className="curtain group relative h-full w-full overflow-hidden rounded-2xl border border-[#C0C0C0]/15">
      <Image
        src={encodeURI(src)}
        alt={alt}
        fill
        sizes="(max-width:768px) 100vw, 55vw"
        className="object-cover group-hover:scale-110"
        priority={priority}
      />
    </div>
  );
}

// Un TextBlock par slide : 1 entree { title, text } = 1 photo. Titre + paragraphe poses
// dans un CADRE gris clair (#3a3b3f) a contour cococo (#C0C0C0).
function TextBlock({ item }) {
  if (!item) return <div aria-hidden />;
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="max-w-lg rounded-2xl border border-[#C0C0C0] bg-[#3a3b3f] p-6 md:p-8 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.9)]">
        {item.title && (
          <>
            <h3 className="trajan-regular text-lg md:text-2xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight">
              {item.title}
            </h3>
            <div className="relative my-4 h-4 w-24">
              <Image src="/images/title-line.png" alt="" fill className="object-contain" />
            </div>
          </>
        )}
        <p className="text-sm md:text-base leading-relaxed text-[#acb0cd]">{item.text}</p>
      </div>
    </div>
  );
}

// Phrase d'accroche des 3 photos (au-dessus du slide).
const TAGLINE = 'Halal without compromise. Luxury without noise.';

export default function HalalLateralScroll({ paragraphs = [], photos = [], alt = 'Caribbean halal charter' }) {
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

  return (
    <div ref={rootRef} className="relative bg-[#26272a]">
      {/* Fond NUAGES GRIS continu : prolonge, en gris, les nuages de l'intro (qui
          s'arretaient net). grayscale sur l'image seule (pas le contenu, qui est en
          z-10). */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-45 grayscale"
        style={{
          backgroundImage: "url('/images/nuagesAncien.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      />

      <style>{`
        .curtain > img,
        .curtain > span > img {
          clip-path: inset(0 100% 0 0);
          /* transitionne clip-path (rideau) ET transform (zoom au survol) : sans
             transform ici, la regle .curtain > img (plus specifique) ecraserait la
             transition du scale et le zoom serait instantane. */
          transition: clip-path 1.15s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .curtain.is-open > img,
        .curtain.is-open > span > img {
          clip-path: inset(0 0 0 0);
        }
      `}</style>

      {/* Phrase d'accroche des 3 photos */}
      <div className="relative z-10 px-6 md:px-14 pt-6 md:pt-12 text-center">
        <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.12em] text-[#C0C0C0]">
          {TAGLINE}
        </h2>
      </div>

      {/* ── MOBILE : pas de pin, chaque paragraphe suivi de SA photo ── */}
      <div className="md:hidden relative z-10 px-5 py-14 space-y-8">
        {photos.map((src, i) => (
          <div key={src} className="space-y-5">
            <TextBlock item={paragraphs[i]} />
            <div className="h-[58vh]">
              <Photo src={src} alt={alt} priority={i === 0} />
            </div>
          </div>
        ))}
      </div>

      {/* ── DESKTOP : pin + scroll lateral (technique v16) ──
          1 slide par photo, et 1 PARAGRAPHE par photo en face d'elle. Hauteur de la
          section proportionnelle au nombre de slides (150vh par slide) pour garder le
          meme rythme de scroll quel que soit le nombre de photos. */}
      <section
        ref={wrapRef}
        className="hidden md:block relative z-10"
        style={{ height: `${Math.max(2, photos.length) * 150}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <div ref={trackRef} className="flex h-[74vh] w-full will-change-transform">
            {photos.map((src, i) => (
              <div key={src} className="shrink-0 w-screen h-full grid grid-cols-2 gap-10 px-[6vw]">
                <TextBlock item={paragraphs[i]} />
                <Photo src={src} alt={alt} priority={i === 0} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
