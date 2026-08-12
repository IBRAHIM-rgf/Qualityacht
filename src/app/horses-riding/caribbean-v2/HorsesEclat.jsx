'use client';

// ══ Horse Riding — ECLAT (cartes flottantes façon alethia) ══
// Placé APRES "Islands by Region". Photos de chevaux (galop plage, cheval dans la
// mer turquoise, cavaliers) + quelques stats, qui jaillissent du centre (ralenti).

import { media } from '@/lib/quality-media';
import VibeCard from '@/components/vibe/VibeCard';
import FloatingScatter, { StatChip, Pill } from '@/components/vibe/FloatingScatter';

// La section "Islands by Region" (page.js) consomme deja les 8 photos horses en
// commencant a l'index 0 (une par tuile de region). Ici on repart apres cette
// plage pour ne pas reafficher les memes chevaux — avec 13 images au total,
// les 6 cartes Eclat prennent les index 8..12 puis 6..7 (jamais 0..7).
const ALL = media({ cat: 'horses', kind: 'image' });
const H = ALL.length ? Array.from({ length: 6 }, (_, i) => ALL[8 + (i % Math.max(1, ALL.length - 8))]) : [];
const P = (m, label, accent, aspect = 'aspect-[4/3]') => m && <VibeCard src={m.src} alt={m.desc} aspect={aspect} accent={accent} label={label} />;

const cards = [
  H[0] && { key: 'h0', pos: { left: '1%', top: '3%', width: '236px' }, depth: 42, fd: '7s', d: 0, node: P(H[0], 'Gallop the shallows', '#2fd6c4') },
  { key: 's1', pos: { left: '27%', top: '5%', width: '224px' }, depth: -30, fd: '6.5s', d: 150, node: <StatChip kicker="Cruising grounds" big="48" unit="islands" label="Ride & racing covered" accent="#c2622a" /> },
  H[1] && { key: 'h1', pos: { right: '2%', top: '2%', width: '250px' }, depth: 54, fd: '8.5s', d: 300, node: P(H[1], 'Beach riders', '#ff7a59') },
  H[2] && { key: 'h2', pos: { right: '1%', top: '43%', width: '210px' }, depth: -42, fd: '6.8s', d: 450, node: P(H[2], 'Along the coast', '#4ea8ff', 'aspect-[3/4]') },
  H[3] && { key: 'h3', pos: { left: '0.5%', top: '45%', width: '210px' }, depth: 36, fd: '7.5s', d: 600, node: P(H[3], 'Into the sea', '#2fd6c4', 'aspect-[3/4]') },
  { key: 's2', pos: { right: '4%', bottom: '3%', width: '236px' }, depth: 50, fd: '8s', d: 750, node: <StatChip kicker="On the calendar" big="8" unit="races" label="Across the season" heights={[40, 55, 72, 48, 88, 66]} accent="#d39478" /> },
  H[4] && { key: 'h4', pos: { left: '19%', bottom: '3%', width: '240px' }, depth: -34, fd: '6.2s', d: 900, node: P(H[4], 'Clifftop trails', '#ffb03a') },
  H[5] && { key: 'h5', pos: { right: '25%', bottom: '4%', width: '212px' }, depth: 28, fd: '6.6s', d: 1050, node: P(H[5], 'Sea swims', '#4ea8ff') },
  { key: 'p1', pos: { left: '18%', top: '31%' }, depth: -20, fd: '5.5s', d: 1200, node: <Pill accent="#c2622a">5 seasonal circuits</Pill> },
  { key: 'p2', pos: { right: '20%', top: '30%' }, depth: 26, fd: '6.2s', d: 1350, node: <Pill accent="#2fd6c4">Sea swims included</Pill> },
].filter(Boolean);

const mobileNodes = [H[0], H[1], H[2], H[3], H[4], H[5]]
  .filter(Boolean)
  .map((m, i) => P(m, null, ['#2fd6c4', '#ff7a59', '#4ea8ff', '#2fd6c4', '#ffb03a', '#4ea8ff'][i % 6]));

export default function HorsesEclat() {
  return (
    <section className="relative px-4 md:px-16 py-16 md:py-24 bg-[#26272a]">
      <FloatingScatter cards={cards} mobileNodes={mobileNodes} minHeightClass="lg:min-h-[1120px]" revealDurationMs={2600}>
        <span className="inline-block rounded-full border border-[#C0C0C0]/40 bg-[#2e2f32] px-4 py-1.5 text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#B87333] mb-6">Saddle up</span>
        <h2 className="trajan-regular text-2xl md:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[#C0C0C0] leading-tight max-w-2xl mx-auto">
          Ride The Caribbean,<br className="hidden md:block" /> Hoof To Horizon
        </h2>
        <p className="mt-5 text-sm md:text-base text-[#acb0cd]/60 max-w-xl mx-auto leading-relaxed">
          Gallop through turquoise shallows, ride clifftop trails and swim horses at sea — coordinated by concierge, anchor to saddle.
        </p>
      </FloatingScatter>
    </section>
  );
}
