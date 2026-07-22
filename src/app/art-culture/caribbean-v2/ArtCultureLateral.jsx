'use client';

// Slide lateral facon Mamounia (mamounia.com/fr, section "Vivre La Mamounia") : la
// section se fige (sticky) et le scroll vertical pilote un translateX du rail
// horizontal. MEME technique que caribbean-v16 : aucune lib externe, transform pose
// directement sur le DOM.
//
// Chaque panneau = TEXTE A COTE de la PHOTO (texte a gauche, photo a droite), comme sur
// Mamounia. Le texte ET la photo se REVELENT de GAUCHE A DROITE (sens du slide) quand le
// panneau entre dans le champ (clip-path anime). 2 panneaux : ART et CULTURE.
//
// data-no-rise sur la racine : ScrollRise (layout) animerait sinon chaque h3/p/li en
// double. AUCUN emoji.

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SECTIONS } from '../caribbean/data';

const REVEAL_RATIO = 0.85; // revele quand le bord gauche passe sous 85% du viewport

const PANELS = [
  {
    key: 'art',
    eyebrow: 'Museums · Galleries · Exhibitions',
    title: 'Art',
    img: SECTIONS.art.img,
    href: '/art-culture/caribbean/art',
    text: 'Caribbean art blends heritage and contemporary refinement, offering a subtle yet compelling cultural dimension to any yachting journey.',
    bullets: [
      'Exclusive access to curated galleries and private exhibitions',
      'Meetings with established and emerging regional artists',
      'Private visits to ateliers and artisan workshops',
      'Opportunities to acquire distinctive, collectible works',
      'Seamless integration of cultural moments into bespoke itineraries',
    ],
  },
  {
    key: 'culture',
    eyebrow: 'Carnivals · Festivals · Seasons',
    title: 'Culture',
    img: SECTIONS.culture.img,
    href: '/art-culture/caribbean/culture',
    text: 'Caribbean culture unfolds in refined layers of heritage, tradition, and understated authenticity, enriching each journey with a sense of place that is both timeless and deeply immersive.',
    bullets: [
      'Privileged access to historic estates and cultural landmarks',
      'Curated encounters with local traditions and heritage experts',
      'Private culinary experiences inspired by regional influences',
      'Refined selection of fresh, non-alcoholic cocktails crafted from local fruits, suitable for all ages',
      'Discreet participation in select cultural events and celebrations',
      'Seamless integration of cultural immersion within bespoke itineraries',
    ],
  },
];

function TextCol({ panel }) {
  // ac-reveal : se devoile de gauche a droite (voir CSS). delay leger vs la photo.
  return (
    <div className="ac-reveal flex h-full flex-col justify-center" style={{ '--d': '0ms' }}>
      <p className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-[#B87333] mb-3">{panel.eyebrow}</p>
      <h3 className="trajan-regular text-4xl md:text-5xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight">
        {panel.title}
      </h3>
      <div className="relative mt-4 mb-5 h-5 w-28">
        <Image src="/images/title-line.png" alt="" fill className="object-contain" />
      </div>
      <p className="max-w-md text-sm md:text-base leading-relaxed text-[#acb0cd]">{panel.text}</p>
      <ul className="mt-4 space-y-2 max-w-md">
        {panel.bullets.map((b) => (
          <li key={b} className="flex items-baseline gap-3">
            <span className="h-px w-4 shrink-0 bg-[#B87333]/80 translate-y-[-3px]" />
            <span className="text-[13px] leading-relaxed text-[#acb0cd]">{b}</span>
          </li>
        ))}
      </ul>
      <Link
        href={panel.href}
        className="mt-6 inline-flex w-max items-center gap-2 px-5 py-2.5 rounded-full border border-[#C0C0C0] text-[11px] uppercase tracking-[0.2em] text-[#acb0cd] transition-colors duration-300 hover:border-[#B03E00] hover:text-[#c2622a]"
      >
        Discover
        <span aria-hidden className="text-[13px] leading-none">&rarr;</span>
      </Link>
    </div>
  );
}

function Photo({ panel, priority }) {
  return (
    <div
      className="ac-reveal relative h-full w-full overflow-hidden rounded-2xl border border-[#C0C0C0]/15"
      style={{ '--d': '140ms' }}
    >
      <Image
        src={encodeURI(panel.img)}
        alt={panel.title}
        fill
        sizes="(max-width:768px) 100vw, 45vw"
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}

export default function ArtCultureLateral() {
  const rootRef = useRef(null);
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const compute = () => {
      // 1) Revelation gauche->droite : des qu'un bloc (texte ou photo) entre dans le
      //    champ, on l'ouvre. Une fois ouvert, on n'y revient pas.
      const root = rootRef.current;
      if (root) {
        root.querySelectorAll('.ac-reveal').forEach((el) => {
          if (el.classList.contains('is-in')) return;
          const r = el.getBoundingClientRect();
          const inX = r.left < window.innerWidth * REVEAL_RATIO && r.right > 0;
          const inY = r.top < window.innerHeight * REVEAL_RATIO && r.bottom > 0;
          if (inX && inY) el.classList.add('is-in');
        });
      }

      // 2) Rail horizontal (desktop) : progression du scroll -> translateX
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;
      const scrollable = wrap.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        track.style.transform = 'translate3d(0,0,0)';
        return;
      }
      const progress = Math.min(1, Math.max(0, -wrap.getBoundingClientRect().top / scrollable));
      const maxX = Math.max(0, track.scrollWidth - track.clientWidth);
      track.style.transform = `translate3d(${-progress * maxX}px,0,0)`;
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
    <div ref={rootRef} data-no-rise>
      <style>{`
        /* Revelation de GAUCHE A DROITE (sens du slide) : clip ferme a droite -> ouvert.
           Le texte comme la photo. */
        .ac-reveal {
          clip-path: inset(0 100% 0 0);
          opacity: 0;
          transition: clip-path 1s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms),
                      opacity 0.7s ease var(--d, 0ms);
        }
        .ac-reveal.is-in { clip-path: inset(0 0 0 0); opacity: 1; }
        @media (prefers-reduced-motion: reduce) {
          .ac-reveal { clip-path: none; opacity: 1; transition: none; }
        }
      `}</style>

      {/* En-tete facon Mamounia : titre + tagline au-dessus du rail */}
      <div className="bg-[#26272a] px-6 md:px-14 pt-14 md:pt-20 text-center">
        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#B87333] mb-3">
          The Caribbean, two worlds
        </p>
        <h2 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.1em] text-[#C0C0C0]">
          Art &amp; Culture
        </h2>
      </div>

      {/* Mobile : pas de pin — texte puis photo empiles, meme revelation gauche->droite */}
      <div className="md:hidden px-5 py-12 space-y-14 bg-[#26272a]">
        {PANELS.map((p, i) => (
          <div key={p.key} className="space-y-5">
            <TextCol panel={p} />
            <div className="h-[52vh]">
              <Photo panel={p} priority={i === 0} />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop : pin + scroll lateral. Chaque panneau = texte a cote de la photo. */}
      <section ref={wrapRef} className="hidden md:block relative bg-[#26272a]" style={{ height: '260vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <div ref={trackRef} className="flex gap-[6vw] px-[7vw] h-[74vh] w-full will-change-transform">
            {PANELS.map((p, i) => (
              <div key={p.key} className="shrink-0 w-[84vw] h-full grid grid-cols-2 gap-10 items-stretch">
                <TextCol panel={p} />
                <Photo panel={p} priority={i === 0} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
