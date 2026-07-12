'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Scroll lateral facon Mamounia : la section se fige (sticky) et le scroll vertical
// pilote un translateX du rail horizontal, puis la page reprend son scroll vertical.
// AUCUNE lib externe (pas de GSAP/Lenis) : sticky + progression de scroll en JS,
// transform pose directement sur le DOM (pas de re-render React par frame).
// Fine Food & Dining = panneau visuel sans lien (pas de page dediee) ; les 3 autres
// sont cliquables. AUCUN emoji.
const PANELS = [
  {
    eyebrow: 'By Air',
    title: 'Private Jet',
    text: 'Seamless island-to-island transfers, on your schedule.',
    img: '/images/gridLosange/jet.png',
    href: '/privat-jet',
  },
  {
    eyebrow: 'By Land',
    title: 'Horses & Riding',
    text: 'Beach rides and the great Caribbean racing traditions.',
    img: '/images/horse/hero_caraibes.png',
    href: '/horses-riding/caribbean',
  },
  {
    eyebrow: 'On Board',
    title: 'Fine Food & Dining',
    text: 'Private chefs and refined cuisine, tailored to your table.',
    img: null, // pas d'image dediee -> fond degrade (placeholder), a remplacer plus tard
    href: null,
  },
  {
    eyebrow: 'Ashore',
    title: 'Historic Sites',
    text: 'Forts, great houses and UNESCO landmarks reached by yacht.',
    img: '/images/destinations/gretar antilles-original.jpg',
    href: '/historic-sites/caribbean-v2',
  },
];

function Panel({ panel }) {
  const inner = (
    <div className="relative h-full w-full overflow-hidden">
      {panel.img ? (
        <Image
          src={encodeURI(panel.img)}
          alt={panel.title}
          fill
          sizes="(max-width:768px) 85vw, 62vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#B87333]/60 via-[#2e2f32] to-[#26272a]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#26272a]/90 via-[#26272a]/20 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-14">
        <p className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-[#B87333] mb-3">{panel.eyebrow}</p>
        <h3 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.08em] text-[#C0C0C0] leading-tight">
          {panel.title}
        </h3>
        <p className="mt-4 max-w-md text-[#acb0cd] text-sm md:text-base leading-relaxed">{panel.text}</p>
        {panel.href && (
          <span className="mt-6 inline-flex items-center px-5 py-2.5 rounded-full border border-[#C0C0C0] text-[11px] uppercase tracking-[0.25em] text-[#c2622a] group-hover:border-[#c2622a] group-hover:text-[#B03E00] transition-colors">
            Discover
          </span>
        )}
      </div>
    </div>
  );
  const cls = 'group relative shrink-0 h-full rounded-2xl overflow-hidden border border-[#C0C0C0]/15';
  return panel.href ? (
    <Link href={panel.href} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export default function HorizontalPanels() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const compute = () => {
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
    <>
      {/* Mobile : scroll horizontal natif (snap), pas de pin */}
      <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 py-10 bg-[#26272a] scrollbar-hide">
        {PANELS.map((p) => (
          <div key={p.title} className="snap-center shrink-0 w-[85vw] h-[58vh]">
            <Panel panel={p} />
          </div>
        ))}
      </div>

      {/* Desktop : pin + scroll lateral facon Mamounia */}
      <section ref={wrapRef} className="hidden md:block relative bg-[#26272a]" style={{ height: '360vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <div
            ref={trackRef}
            className="flex gap-6 px-[9vw] h-[76vh] w-full will-change-transform"
          >
            {PANELS.map((p) => (
              <div key={p.title} className="shrink-0 w-[62vw] h-full">
                <Panel panel={p} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
