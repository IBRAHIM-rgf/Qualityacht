'use client';

// ══ North America — « l'eclat » (cartes flottantes qui jaillissent du centre) ══
// Meme composant et meme mise en scene que la page Bahamas (BahamasEclat), avec les
// 3 photos et 2 videos du client (2026-10-22). Aucun recadrage : chaque media garde
// son format (photos 3/2 et 2/3, videos 16/9). Textes des 4 cartes : rediges a la demande
// du client (2026-10-22).

import Link from 'next/link';
import VibeCard from '@/components/vibe/VibeCard';
import FloatingScatter from '@/components/vibe/FloatingScatter';

const D = '/media/client/2026-10-22/north-america-eclat';
const photoVancouver = { src: `${D}/vancouver.jpg`, desc: 'Marina and autumn trees in Vancouver', aspect: 'aspect-[3/2]' };
const photoCancun = { src: `${D}/cancun.jpg`, desc: 'Palapas on a turquoise beach in Cancun', aspect: 'aspect-[3/2]' };
const photoCenote = { src: `${D}/cenote.jpg`, desc: 'Stone steps descending into a turquoise cenote', aspect: 'aspect-[2/3]' };
const vid1 = { src: `${D}/video-1.mp4`, poster: `${D}/video-1.jpg`, aspect: 'aspect-video' };
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
  <TextCard kicker="Two coastlines">
    From the <span className={hl}>New England</span> shoreline to <span className={hl}>California</span> and the{' '}
    <span className={hl}>Pacific Northwest</span> — two coastlines, two distinct ways to cruise in style.
  </TextCard>
);
const T2 = (
  <TextCard kicker="Canada">
    The sheltered waters of <span className={hl}>British Columbia</span>, the <span className={hl}>Thousand Islands</span> and the
    shores of <span className={hl}>Nova Scotia</span> — unspoiled scenery and quiet anchorages.
  </TextCard>
);
const T3 = (
  <TextCard kicker="Miami & Mexico">
    The glamour of <span className={hl}>Miami</span>, the turquoise waters of the <span className={hl}>Mexican Caribbean</span> and
    the wild beauty of the <span className={hl}>Sea of Cortez</span>.
  </TextCard>
);
const T4 = (
  <TextCard kicker="Curated around you">
    Coast to coast, from <span className={hl}>Florida</span> to <span className={hl}>Cabo San Lucas</span> — every itinerary
    tailored to you.
  </TextCard>
);

const P = (m) => <VibeCard src={m.src} alt={m.desc} aspect={m.aspect} />;
const Vd = (m) => <VibeCard videoSrc={m.src} poster={m.poster} aspect={m.aspect} />;

const scatterCards = [
  { key: 't1', pos: { left: '0.5%', top: '2%', width: '236px' }, depth: 40, fd: '7s', d: 0, node: T1 },
  { key: 'p1', pos: { left: '24%', top: '4%', width: '236px' }, depth: -30, fd: '6.5s', d: 150, node: P(photoVancouver) },
  { key: 'v1', pos: { right: '1%', top: '2%', width: '292px' }, depth: 52, fd: '8.5s', d: 300, node: Vd(vid1) },
  { key: 'p3', pos: { left: '0.5%', top: '27%', width: '180px' }, depth: -44, fd: '6.8s', d: 450, node: P(photoCenote) },
  { key: 't2', pos: { right: '0.5%', top: '26%', width: '236px' }, depth: 34, fd: '7.5s', d: 600, node: T2 },
  { key: 'v2', pos: { left: '0.5%', bottom: '18%', width: '292px' }, depth: -50, fd: '8s', d: 750, node: Vd(vid2) },
  { key: 'p2', pos: { right: '1%', bottom: '25%', width: '236px' }, depth: 46, fd: '6.2s', d: 900, node: P(photoCancun) },
  { key: 't3', pos: { left: '24%', bottom: '2%', width: '236px' }, depth: 28, fd: '5.8s', d: 1050, node: T3 },
  { key: 't4', pos: { right: '0.5%', bottom: '2%', width: '236px' }, depth: 30, fd: '6.6s', d: 1350, node: T4 },
];

const mobileNodes = [P(photoVancouver), T1, Vd(vid1), T2, P(photoCenote), T3, Vd(vid2), T4, P(photoCancun)];

// Eclat de la page Day Charter North America (client 2026-10-27) : 3 photos puis
// 2 videos, places dans l'ordre recu sur les 5 emplacements medias (meme ordre
// d'apparition que la page destination). Largeurs adaptees au format de chaque media
// (aucun recadrage). Memes textes que la page destination.
const SLOTS = [
  { key: 'm1', pos: { left: '24%', top: '4%' }, depth: -30, fd: '6.5s', d: 150 },
  { key: 'm2', pos: { right: '1%', top: '2%' }, depth: 52, fd: '8.5s', d: 300 },
  { key: 'm3', pos: { left: '0.5%', top: '27%' }, depth: -44, fd: '6.8s', d: 450 },
  { key: 'm4', pos: { left: '0.5%', bottom: '18%' }, depth: -50, fd: '8s', d: 750 },
  { key: 'm5', pos: { right: '1%', bottom: '25%' }, depth: 46, fd: '6.2s', d: 900 },
];
const TEXT_SLOTS = scatterCards.filter((c) => c.key.startsWith('t'));
const mediaNode = (m) => (m.video ? Vd(m) : P(m));

export default function NorthAmericaEclat({ media = null }) {
  const cards = media
    ? [
        ...TEXT_SLOTS,
        ...SLOTS.map((sl, i) => ({ ...sl, pos: { ...sl.pos, width: media[i].width }, node: mediaNode(media[i]) })),
      ]
    : scatterCards;
  const mobile = media
    ? [mediaNode(media[0]), T1, mediaNode(media[1]), T2, mediaNode(media[2]), T3, mediaNode(media[3]), T4, mediaNode(media[4])]
    : mobileNodes;
  return (
    <div className="bg-[#26272a] text-[#acb0cd]">
      <section className="px-4 md:px-16 py-16 md:py-24">
        <FloatingScatter cards={cards} mobileNodes={mobile} minHeightClass="lg:min-h-[1180px]" revealDurationMs={2800}>
          <span className="inline-block rounded-full border border-[#C0C0C0]/40 bg-[#2e2f32] px-4 py-1.5 text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#c2622a] mb-6">At a glance</span>
          <h2 className="trajan-regular text-2xl md:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[#acb0cd] leading-tight max-w-2xl mx-auto">
            North America,<br className="hidden md:block" /> Curated Around You
          </h2>
          <Link
            href="/yachts?destination=north-america"
            className="group mt-8 inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full border border-[#C0C0C0] bg-[#2e2f32]/60 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#acb0cd] transition-colors duration-300 hover:border-[#c2622a] hover:text-[#c2622a] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
          >
            Explore the North America Fleet
            <span aria-hidden className="text-[#c2622a] transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </FloatingScatter>
      </section>
    </div>
  );
}
