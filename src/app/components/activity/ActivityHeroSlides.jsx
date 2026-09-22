'use client';

// ══ Diaporama de hero (pages activite) ══
// Meme mecanique que les fichiers client hero-*.html (2026-09-20/22) : fondu
// croise 1600 ms, chaque image affichee 5500 ms, couverture totale du cadre,
// arc en bas dans la couleur de la page. Seule la 1re image se charge d'abord,
// les autres apres le chargement de la page. Sous prefers-reduced-motion :
// image fixe.
//
// Deux facons de gerer le telephone (<= 700 px) :
//  - `slides[i].mobile` : version verticale de la meme image ; `desktopOnly`
//    marque une image a ignorer sur telephone ;
//  - `mobileSlides` : un jeu d'images independant (fichier hero mobile a part),
//    affiche a la place de `slides` sur telephone.

import { useEffect, useState } from 'react';

const DELAY = 5500;
const FADE_MS = 1600;
const MOBILE_MQ = '(max-width: 700px)';

function useMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener?.('change', apply);
    return () => mq.removeEventListener?.('change', apply);
  }, []);
  return mobile;
}

function usePageLoaded() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const onLoad = () => setLoaded(true);
    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad, { once: true });
    return () => window.removeEventListener('load', onLoad);
  }, []);
  return loaded;
}

/** Un jeu d'images qui defile. `active` : ce jeu est celui affiche (charge et anime). */
function SlideSet({ slides, active, mobile, className }) {
  const [current, setCurrent] = useState(0);
  const loaded = usePageLoaded();

  useEffect(() => {
    if (!loaded || !active) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => {
      setCurrent((c) => {
        let next = (c + 1) % slides.length;
        while (mobile && slides[next].desktopOnly) next = (next + 1) % slides.length;
        return next;
      });
    }, DELAY);
    return () => clearInterval(id);
  }, [loaded, active, mobile, slides]);

  return (
    <div aria-hidden className={`absolute inset-0 z-0 ${className}`}>
      {slides.map((s, i) => {
        const desktopOnly = s.desktopOnly === true;
        const eager = (i === 0 || (loaded && active)) && !(mobile && desktopOnly);
        return (
          <picture key={s.desktop} className="contents">
            {eager && s.mobile && <source media={MOBILE_MQ} srcSet={s.mobile} />}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={eager ? s.desktop : undefined}
              alt=""
              decoding="async"
              fetchPriority={i === 0 ? 'high' : undefined}
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{
                opacity: i === current ? 1 : 0,
                transition: `opacity ${FADE_MS}ms ease-in-out`,
              }}
            />
          </picture>
        );
      })}
    </div>
  );
}

export default function ActivityHeroSlides({ slides, mobileSlides = null }) {
  const mobile = useMobile();

  return (
    <>
      {mobileSlides ? (
        <>
          <SlideSet slides={slides} active={!mobile} mobile={false} className="max-[700px]:hidden" />
          <SlideSet slides={mobileSlides} active={mobile} mobile className="hidden max-[700px]:block" />
        </>
      ) : (
        <SlideSet slides={slides} active mobile={mobile} className="" />
      )}
      {/* Arc en bas : hauteur max 180 px, bords au ras du bas, couleur de la
          page. Au-dessus du voile (z 1), sous les textes (z 2, rendus apres). */}
      <div
        aria-hidden
        className="absolute left-0 right-0 bottom-[-1px] z-[2] leading-[0] pointer-events-none"
        style={{ height: 'clamp(60px, 12vw, 180px)' }}
      >
        <svg viewBox="0 0 1736 80" preserveAspectRatio="none" className="block w-full h-full">
          <path d="M0 80 Q868 -80 1736 80 L1736 82 L0 82 Z" fill="#26272a" />
        </svg>
      </div>
    </>
  );
}
