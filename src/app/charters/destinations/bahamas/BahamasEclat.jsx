'use client';

// ══ Bahamas — « l'eclat » (cartes flottantes qui jaillissent du centre) ══
// Meme composant et meme mise en scene que /charters/destinations/caribbean-v15
// (CaribbeanV20Eclat), avec les photos et videos Bahamas du client (2026-09-28).
// Chaque media garde son format d'origine (aucun recadrage) : photo portrait en
// 3/4, video verticale en 9/16. Textes des 4 cartes : specifiques aux Bahamas.

import Link from 'next/link';
import VibeCard from '@/components/vibe/VibeCard';
import FloatingScatter from '@/components/vibe/FloatingScatter';

const D = '/media/client/lydie/2026-09-28/bahamas-eclat';
const photoCamera = { src: `${D}/underwater-camera.jpg`, desc: 'Underwater camera in crystal-clear water', aspect: 'aspect-[4/3]' };
const photoSwim = { src: `${D}/swimmers.jpg`, desc: 'Swimming in turquoise shallows', aspect: 'aspect-[3/4]' };
const photoAtlantis = { src: `${D}/atlantis.jpg`, desc: 'Paradise Island seen from the sea', aspect: 'aspect-[3/2]' };
const vidH = { src: `${D}/video-horizontal.mp4`, poster: `${D}/video-horizontal.jpg`, aspect: 'aspect-video' };
const vidV = { src: `${D}/video-vertical.mp4`, poster: `${D}/video-vertical.jpg`, aspect: 'aspect-[9/16]' };

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
// Textes Bahamas (client 2026-09-28). Chiffre des iles : site officiel du
// gouvernement des Bahamas (bahamas.gov.bs) — « 700 islands and 2,400 cays ».
const T1 = (
  <TextCard kicker="Paradise">
    <span className={hl}>Crystal-clear waters</span>, <span className={hl}>powder-white sand</span> and the most dazzling{' '}
    <span className={hl}>shades of turquoise</span> — The Bahamas is paradise, a short hop from Florida.
  </TextCard>
);
const T2 = (
  <TextCard kicker="Glamour & legend">
    From the <span className={hl}>pirate legends of Nassau</span> to the glamour of <span className={hl}>Paradise Island</span> and the
    famous <span className={hl}>swimming pigs of the Exumas</span> — history and high style, side by side.
  </TextCard>
);
const T3 = (
  <TextCard kicker="700 islands & 2,400 cays">
    <span className={hl}>700 islands</span> and <span className={hl}>2,400 cays</span> — secluded anchorages, shimmering sandbars
    and private beaches reachable only by sea.
  </TextCard>
);
const T4 = (
  <TextCard kicker="Curated around you">
    Island-hopping from <span className={hl}>Nassau</span> to <span className={hl}>the Exumas</span>, the pink sands of{' '}
    <span className={hl}>Harbour Island</span> and private cays — every itinerary tailored to you.
  </TextCard>
);

const P = (m) => <VibeCard src={m.src} alt={m.desc} aspect={m.aspect} />;
const Vd = (m) => <VibeCard videoSrc={m.src} poster={m.poster} aspect={m.aspect} />;

const scatterCards = [
  { key: 't1', pos: { left: '0.5%', top: '2%', width: '236px' }, depth: 40, fd: '7s', d: 0, node: T1 },
  { key: 'p1', pos: { left: '26%', top: '4%', width: '208px' }, depth: -30, fd: '6.5s', d: 150, node: P(photoCamera) },
  { key: 'v1', pos: { right: '1%', top: '2%', width: '292px' }, depth: 52, fd: '8.5s', d: 300, node: Vd(vidH) },
  { key: 'p2', pos: { left: '0.5%', top: '27%', width: '180px' }, depth: -44, fd: '6.8s', d: 450, node: P(photoSwim) },
  { key: 't2', pos: { right: '0.5%', top: '26%', width: '236px' }, depth: 34, fd: '7.5s', d: 600, node: T2 },
  { key: 'v2', pos: { left: '3%', bottom: '14%', width: '170px' }, depth: -50, fd: '8s', d: 750, node: Vd(vidV) },
  { key: 'p3', pos: { right: '1%', bottom: '25%', width: '236px' }, depth: 46, fd: '6.2s', d: 900, node: P(photoAtlantis) },
  { key: 't3', pos: { left: '24%', bottom: '2%', width: '236px' }, depth: 28, fd: '5.8s', d: 1050, node: T3 },
  { key: 't4', pos: { right: '0.5%', bottom: '2%', width: '236px' }, depth: 30, fd: '6.6s', d: 1350, node: T4 },
];

const mobileNodes = [P(photoCamera), T1, Vd(vidH), T2, P(photoSwim), T3, Vd(vidV), T4, P(photoAtlantis)];

export default function BahamasEclat() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd]">
      <section className="px-4 md:px-16 py-16 md:py-24">
        <FloatingScatter cards={scatterCards} mobileNodes={mobileNodes} minHeightClass="lg:min-h-[1180px]" revealDurationMs={2800}>
          <span className="inline-block rounded-full border border-[#C0C0C0]/40 bg-[#2e2f32] px-4 py-1.5 text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#c2622a] mb-6">At a glance</span>
          <h2 className="trajan-regular text-2xl md:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[#acb0cd] leading-tight max-w-2xl mx-auto">
            The Bahamas,<br className="hidden md:block" /> Curated Around You
          </h2>
          <Link
            href="/yachts?destination=caribbean"
            className="group mt-8 inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full border border-[#C0C0C0] bg-[#2e2f32]/60 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#acb0cd] transition-colors duration-300 hover:border-[#c2622a] hover:text-[#c2622a] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
          >
            Explore the Bahamas Fleet
            <span aria-hidden className="text-[#c2622a] transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </FloatingScatter>
      </section>
    </div>
  );
}
