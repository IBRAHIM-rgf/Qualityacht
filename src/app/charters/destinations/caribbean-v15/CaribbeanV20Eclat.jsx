'use client';

// ══ Bloc injecte dans caribbean-v20 (via introNode), juste apres le hero ══
// L'ECLAT = cartes flottantes DISPERSEES (facon alethia) qui JAILLISSENT DU CENTRE
// vers l'exterieur (fromCenter par defaut).
// Contenu : 4 cartes TEXTE (les 4 paragraphes) + 4 PHOTOS (yacht / mer / plage
// turquoise — PAS de cheval ni carnaval, on est un site de YACHT) + 2 VIDEOS
// HORIZONTALES (dauphins + drone turquoise). Puis le 2e BANDEAU video beach-band.

import VibeCard from '@/components/vibe/VibeCard';
import FloatingScatter from '@/components/vibe/FloatingScatter';
import { VideoBand } from '@/components/vibe/blocks';

// medias — fichiers dedies, inedits ailleurs sur le site (100% yacht / mer / plage turquoise)
const photoAerial = { src: '/media/quality/eclat-v15/aerial-coves.jpg', desc: 'Aerial beach club, palms and turquoise shallows' };
const photoLagoon = { src: '/media/quality/eclat-v15/lagoon-sands.jpg', desc: 'Palm frond framing powder-white sands' };
const photoDock = { src: '/media/quality/eclat-v15/hidden-anchorages.jpg', desc: 'Hidden lagoon anchorage with tender' };
const photoYacht = { src: '/media/quality/eclat-v15/sail-away.jpg', desc: 'Tender adrift on crystal-clear water' };
const vidDolphin = { src: '/media/quality/eclat-v15/dolphins.mp4', poster: '/media/quality/eclat-v15/dolphins.jpg' };
const vidTurq = { src: '/media/quality/eclat-v15/at-anchor.mp4', poster: '/media/quality/eclat-v15/at-anchor.jpg' };
const treeBand = { src: '/media/quality/eclat-v15/sunset-band.mp4', poster: '/media/quality/eclat-v15/sunset-band.jpg' };

// carte texte (meme allure qu'une carte photo)
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

const T1 = (
  <TextCard kicker="Paradise">
    A paradise of <span className="text-[#d39478] font-semibold">turquoise waters</span>,{' '}
    <span className="text-[#d39478] font-semibold">powder-white beaches</span> and{' '}
    <span className="text-[#d39478] font-semibold">vibrant coral reefs</span> — the world's premier destination for luxury yacht charters.
  </TextCard>
);
const T2 = (
  <TextCard kicker="Glamour & legend">
    From the pirate legends of the Leeward and Windward Islands to the{' '}
    <span className="text-[#d39478] font-semibold">Michelin-starred tables</span> of St. Martin and St. Barts — an unparalleled sailing experience.
  </TextCard>
);
const T3 = (
  <TextCard kicker="700+ islands">
    <span className="text-[#d39478] font-semibold">Twenty-six nations</span> and over{' '}
    <span className="text-[#d39478] font-semibold">seven hundred islands</span>, cays and islets — crystal-clear seas and palm-fringed shores.
  </TextCard>
);
const T4 = (
  <TextCard kicker="Curated around you">
    The glamour of <span className="text-[#d39478] font-semibold">Turks &amp; Caicos</span>, the sophistication of{' '}
    <span className="text-[#d39478] font-semibold">St. Barts</span>, private islands reachable only by sea — crafted for the extraordinary.
  </TextCard>
);

const P = (m, label, accent, aspect = 'aspect-[4/3]') => m && <VibeCard src={m.src} alt={m.desc} aspect={aspect} accent={accent} label={label} />;
const Vd = (m, badge, accent) => m && <VibeCard videoSrc={m.src} poster={m.poster} aspect="aspect-video" accent={accent} badge={badge} />;

// scatter : dispose autour d'un centre laisse libre pour le titre
const scatterCards = [
  { key: 't1', pos: { left: '0.5%', top: '2%', width: '236px' }, depth: 40, fd: '7s', d: 0, node: T1 },
  photoAerial && { key: 'p1', pos: { left: '26%', top: '4%', width: '208px' }, depth: -30, fd: '6.5s', d: 150, node: P(photoAerial, 'Turquoise coves', '#2fd6c4') },
  vidDolphin && { key: 'v1', pos: { right: '1%', top: '2%', width: '292px' }, depth: 52, fd: '8.5s', d: 300, node: Vd(vidDolphin, 'Dolphins', '#4ea8ff') },
  photoLagoon && { key: 'p2', pos: { left: '0.5%', top: '27%', width: '206px' }, depth: -44, fd: '6.8s', d: 450, node: P(photoLagoon, 'Powder-white sands', '#4ea8ff') },
  { key: 't2', pos: { right: '0.5%', top: '26%', width: '236px' }, depth: 34, fd: '7.5s', d: 600, node: T2 },
  vidTurq && { key: 'v2', pos: { left: '1%', bottom: '25%', width: '292px' }, depth: -50, fd: '8s', d: 750, node: Vd(vidTurq, 'At anchor', '#2fd6c4') },
  photoDock && { key: 'p3', pos: { right: '1%', bottom: '25%', width: '206px' }, depth: 46, fd: '6.2s', d: 900, node: P(photoDock, 'Hidden anchorages', '#ffb03a') },
  { key: 't3', pos: { left: '0.5%', bottom: '2%', width: '236px' }, depth: 28, fd: '5.8s', d: 1050, node: T3 },
  photoYacht && { key: 'p4', pos: { left: '28%', bottom: '3%', width: '208px' }, depth: -26, fd: '7.2s', d: 1200, node: P(photoYacht, 'Sail away', '#4ea8ff') },
  { key: 't4', pos: { right: '0.5%', bottom: '2%', width: '236px' }, depth: 30, fd: '6.6s', d: 1350, node: T4 },
].filter(Boolean);

const mobileNodes = [
  P(photoAerial, 'Turquoise coves', '#2fd6c4'), T1,
  Vd(vidDolphin, 'Dolphins', '#4ea8ff'), T2,
  P(photoLagoon, 'Powder-white sands', '#4ea8ff'), T3,
  Vd(vidTurq, 'At anchor', '#2fd6c4'), T4,
  P(photoDock, 'Hidden anchorages', '#ffb03a'),
  P(photoYacht, 'Sail away', '#4ea8ff'),
].filter(Boolean);

export default function CaribbeanV20Eclat() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd]">
      {/* ══ ECLAT — cartes flottantes qui jaillissent du centre ══ */}
      <section className="px-4 md:px-16 py-16 md:py-24">
        <FloatingScatter cards={scatterCards} mobileNodes={mobileNodes} minHeightClass="lg:min-h-[1180px]" revealDurationMs={2800}>
          <span className="inline-block rounded-full border border-[#C0C0C0]/40 bg-[#2e2f32] px-4 py-1.5 text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#c2622a] mb-6">At a glance</span>
          <h2 className="trajan-regular text-2xl md:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[#acb0cd] leading-tight max-w-2xl mx-auto">
            The Caribbean,<br className="hidden md:block" /> Curated Around You
          </h2>
        </FloatingScatter>
      </section>

      {/* ══ 2e BANDEAU : beach-band (arbre / bois flotte au coucher de soleil) ══ */}
      <VideoBand media={treeBand} title="Where The Map Runs Out" sub="Powder-white sands, all to yourself" height="h-[60vh] md:h-[80vh]" />
    </div>
  );
}
