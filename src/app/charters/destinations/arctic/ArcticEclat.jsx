'use client';

// ══ The Arctic — « l'eclat » (cartes flottantes qui jaillissent du centre) ══
// Meme composant et meme mise en scene qu'Antarctica (AntarcticaEclat), avec les
// 3 photos et les 2 videos du client (2026-11-24). Aucun recadrage : chaque media garde son
// format (photos 3/2 et 9/16, video a son format d'origine).
// Textes des 4 cartes rediges sur le modele d'Antarctica.

import Link from 'next/link';
import VibeCard from '@/components/vibe/VibeCard';
import FloatingScatter from '@/components/vibe/FloatingScatter';

const D = '/media/client/2026-11-24/arctic-eclat';
const photoIceberg = { src: `${D}/iceberg.jpg`, desc: 'Expedition tender beside an arched iceberg', aspect: 'aspect-[3/2]' };
const photoFjord = { src: `${D}/fjord.jpg`, desc: 'Colorful waterfront houses along a Norwegian fjord', aspect: 'aspect-[3/2]' };
const photoAurora = { src: `${D}/aurora.jpg`, desc: 'Northern lights over snow-capped peaks reflected in a fjord', aspect: 'aspect-[9/16]' };
const vid1 = { src: `${D}/video-1.mp4`, poster: `${D}/video-1.jpg`, aspect: 'aspect-[1326/720]' };
const vid2 = { src: `${D}/video-2.mp4`, poster: `${D}/video-2.jpg`, aspect: 'aspect-video' };

function TextCard({ kicker, children }) {
  return (
    <div className="rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32]/95 backdrop-blur-sm shadow-[0_20px_45px_-15px_rgba(0,0,0,0.7)] p-5">
      {kicker && (
        <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#c2622a] mb-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c2622a]" />{kicker}
        </span>
      )}
      <p className="text-[13px] md:text-sm leading-relaxed text-[#acb0cd]">{children}</p>
    </div>
  );
}

const hl = 'text-[#bd9973] font-semibold';
const T1 = (
  <TextCard kicker="The High Arctic">
    From <span className={hl}>Svalbard</span> to <span className={hl}>Greenland</span> — glaciers, icebergs and
    the midnight sun at the top of the world.
  </TextCard>
);
const T2 = (
  <TextCard kicker="Northern Norway">
    <span className={hl}>Tromsø</span> and the <span className={hl}>Norwegian fjords</span> — snow-capped peaks,
    fishing villages and the northern lights.
  </TextCard>
);
const T3 = (
  <TextCard kicker="Wildlife">
    Polar bears, walrus and whales — from <span className={hl}>Svalbard</span> to the{' '}
    <span className={hl}>Canadian Arctic</span>.
  </TextCard>
);
const T4 = (
  <TextCard kicker="Curated around you">
    Expedition-ready yachts and itineraries tailored to you, from <span className={hl}>Iceland</span> to the{' '}
    <span className={hl}>Northwest Passage</span>.
  </TextCard>
);

const P = (m) => <VibeCard src={m.src} alt={m.desc} aspect={m.aspect} />;
const Vd = (m) => <VibeCard videoSrc={m.src} poster={m.poster} aspect={m.aspect} />;

const scatterCards = [
  { key: 't1', pos: { left: '0.5%', top: '2%', width: '236px' }, depth: 40, fd: '7s', d: 0, node: T1 },
  { key: 'p1', pos: { left: '24%', top: '4%', width: '236px' }, depth: -30, fd: '6.5s', d: 150, node: P(photoIceberg) },
  { key: 'v1', pos: { right: '1%', top: '2%', width: '292px' }, depth: 52, fd: '8.5s', d: 300, node: Vd(vid1) },
  { key: 'p3', pos: { left: '0.5%', top: '27%', width: '180px' }, depth: -44, fd: '6.8s', d: 450, node: P(photoAurora) },
  { key: 't2', pos: { right: '0.5%', top: '26%', width: '236px' }, depth: 34, fd: '7.5s', d: 600, node: T2 },
  { key: 'p2', pos: { right: '1%', bottom: '25%', width: '236px' }, depth: 46, fd: '6.2s', d: 900, node: P(photoFjord) },
  { key: 'v2', pos: { left: '0.5%', bottom: '18%', width: '292px' }, depth: -50, fd: '8s', d: 750, node: Vd(vid2) },
  { key: 't3', pos: { left: '24%', bottom: '2%', width: '236px' }, depth: 28, fd: '5.8s', d: 1050, node: T3 },
  { key: 't4', pos: { right: '0.5%', bottom: '2%', width: '236px' }, depth: 30, fd: '6.6s', d: 1350, node: T4 },
];

const mobileNodes = [P(photoIceberg), T1, Vd(vid1), T2, P(photoAurora), T3, Vd(vid2), T4, P(photoFjord)];

export default function ArcticEclat() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd]">
      <section className="px-4 md:px-16 py-16 md:py-24">
        <FloatingScatter cards={scatterCards} mobileNodes={mobileNodes} minHeightClass="lg:min-h-[1180px]" revealDurationMs={2800}>
          <span className="inline-block rounded-full border border-[#C0C0C0]/40 bg-[#2e2f32] px-4 py-1.5 text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#c2622a] mb-6">At a glance</span>
          <h2 className="trajan-regular text-2xl md:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[#acb0cd] leading-tight max-w-2xl mx-auto">
            The Arctic,<br className="hidden md:block" /> Curated Around You
          </h2>
          <Link
            href="/yachts?destination=arctic"
            className="group mt-8 inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full border border-[#C0C0C0] bg-[#2e2f32]/60 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#acb0cd] transition-colors duration-300 hover:border-[#c2622a] hover:text-[#c2622a] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
          >
            Explore the Arctic Fleet
            <span aria-hidden className="text-[#c2622a] transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </FloatingScatter>
      </section>
    </div>
  );
}
