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

// boost : couleurs accentuees sur CETTE photo en particulier (cf. slide #1, la photo
// "collee" trop pastel). La classe Tailwind l'emporte sur le filtre global
// `img { filter: saturate(1.3) }` (globals.css) -> saturation portee a 1.6 + contraste
// + luminosite, la photo devient plus vive malgre le filtre deja present.
function Photo({ src, alt, priority = false, boost = false }) {
  return (
    <div className="curtain group relative h-full w-full overflow-hidden">
      <Image
        src={encodeURI(src)}
        alt={alt}
        fill
        sizes="(max-width:768px) 100vw, 55vw"
        className={`object-cover ${
          boost ? 'saturate-[1.6] contrast-[1.12] brightness-[1.05]' : ''
        }`}
        priority={priority}
      />
    </div>
  );
}

// Un TextBlock par slide : 1 entree { title, text } = 1 photo. Le paragraphe est pose
// DIRECTEMENT sur le fond de la page (nuages gris continus), SANS cadre ni fond propre :
// son fond doit etre le meme que le reste de la page. Seule separation : le "trait" de
// section (la ligne title-line sous le titre).
function TextBlock({ item }) {
  if (!item) return <div aria-hidden />;
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="max-w-lg">
        {item.title && (
          <>
            <h3 className="trajan-regular text-lg md:text-2xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight">
              {item.title}
            </h3>
            <div className="relative my-4 h-4 w-24 mx-auto">
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

export default function HalalLateralScroll({ intro = null, paragraphs = [], photos = [], alt = 'Caribbean halal charter' }) {
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
      {/* Fond nuages gris CONTINU avec le reste de la page : meme texture
          (nuagesAncien), meme couleur (gris), meme opacite (55%) que les CloudSection
          de caribbean-v15. Tuilage vertical (100% de large, hauteur naturelle, repete)
          au lieu d'un cover unique : le cover s'etirait sur toute la hauteur du slide
          (~450vh) et donnait un fond zoome qui "recommencait". Le tuilage garde une
          echelle constante et l'alternance des bandes de nuages sur toute la page. */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-55 grayscale"
        style={{
          backgroundImage: "url('/images/nuagesAncien.png')",
          backgroundSize: '100% auto',
          backgroundRepeat: 'repeat-y',
          backgroundPosition: 'top center',
        }}
      />

      <style>{`
        .curtain > img,
        .curtain > span > img {
          clip-path: inset(0 100% 0 0);
          transform: scale(1);
          transition: clip-path 1.15s cubic-bezier(0.22, 1, 0.36, 1);
        }
        /* Rideau ouvert : la photo se devoile (clip-path 1.15s), PUIS un zoom LENT et LONG
           se declenche (delay 1.3s ~= fin du rideau) et reste en place (forwards). */
        .curtain.is-open > img,
        .curtain.is-open > span > img {
          clip-path: inset(0 0 0 0);
          animation: halalSlowZoom 16s ease-out 1.3s forwards;
        }
        @keyframes halalSlowZoom {
          from { transform: scale(1); }
          to   { transform: scale(1.13); }
        }
        @media (prefers-reduced-motion: reduce) {
          .curtain.is-open > img,
          .curtain.is-open > span > img { animation: none; }
        }
      `}</style>

      {/* INTRO (le paragraphe AVANT le slide) : rendu DANS ce meme fond nuageux continu,
          pour que le fond du reste de la page ENGLOBE ce paragraphe. Il n'est donc plus une
          section separee avec son propre fond -> plus de "trait" entre le paragraphe et le
          slide. */}
      {intro && (
        <div className="relative z-10 max-w-3xl mx-auto px-5 md:px-20 pt-14 md:pt-24 pb-4 md:pb-8 text-center">
          <p className="text-[#acb0cd] text-base md:text-lg leading-relaxed">{intro}</p>
        </div>
      )}

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
              <Photo src={src} alt={alt} priority={i === 0} boost={i === 0} />
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
        {/* h-full (et non h-[74vh] centre) : les photos occupent toute la hauteur du
            viewport et TOUCHENT le header pendant le pin — plus de marge haut/bas. */}
        <div className="sticky top-0 h-screen overflow-hidden flex">
          <div ref={trackRef} className="flex h-full w-full will-change-transform">
            {photos.map((src, i) => (
              <div key={src} className="shrink-0 w-screen h-full grid grid-cols-2 gap-10 px-[6vw]">
                <TextBlock item={paragraphs[i]} />
                <Photo src={src} alt={alt} priority={i === 0} boost={i === 0} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
