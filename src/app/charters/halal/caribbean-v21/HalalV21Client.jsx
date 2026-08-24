'use client';

// ══ Halal Caraibes V21 — VERSION 2 : plus libre, exploite les VIDEOS ══
// Meme grammaire visuelle que la V2 Caraibes, orientee halal : familles, mode
// pudique coloree, cuisine halal, discretion — mais lumineuse, coloree et joyeuse.

import { media, one } from '@/lib/quality-media';
import VideoHero from '@/components/vibe/VideoHero';
import Reveal from '@/components/vibe/Reveal';
import VibeCard from '@/components/vibe/VibeCard';
import FunMarquee from '@/components/vibe/FunMarquee';
import FloatingScatter, { StatChip, Pill } from '@/components/vibe/FloatingScatter';
import { SectionHead, VideoBand, CtaButton } from '@/components/vibe/blocks';

const V = (f) => one({ ...f, kind: 'video' });
const I = (f) => media({ ...f, kind: 'image' });

const heroVid = V({ cat: 'halal', role: 'hero-bg' });
const heroVidP = one({ cat: 'halal', kind: 'video', role: 'card', orientation: 'portrait' });
const beachBand = V({ cat: 'beach', role: 'section-band' });
const interiorBand = V({ cat: 'interiors', role: 'section-band' });

const exploreCards = [
  I({ cat: 'beach', role: 'hero-bg' })[0],
  I({ cat: 'beach', role: 'card' })[0],
  I({ cat: 'aerial', role: 'section-band' })[0],
  I({ cat: 'beach', role: 'card' })[1],
  I({ cat: 'aerial', role: 'card' })[0],
  I({ cat: 'boats', role: 'section-band' })[0],
].filter(Boolean);
const accents = ['#2fd6c4', '#ff7a59', '#4ea8ff', '#ffb03a', '#2fd6c4', '#ff7a59'];

// Familles / mode pudique / cuisine — le coeur "halal"
const halalImgs = I({ cat: 'halal' }).filter((m) => m.orientation === 'portrait');
const playItems = [
  { m: heroVidP, label: 'Family time', accent: '#2fd6c4' },
  { m: halalImgs[0], label: 'Together', accent: '#ff7a59' },
  { m: I({ cat: 'food', role: 'card' })[0] || I({ cat: 'food' })[0], label: 'Halal cuisine', accent: '#ffb03a' },
  { m: I({ cat: 'interiors', role: 'card' })[0], label: 'Privacy at sea', accent: '#4ea8ff' },
  { m: halalImgs[1], label: 'Modest & free', accent: '#2fd6c4' },
  { m: I({ cat: 'beach', role: 'card' })[2] || I({ cat: 'beach', role: 'card' })[0], label: 'Secluded coves', accent: '#ff7a59' },
].filter((x) => x.m);

const marqueeItems = [
  ...halalImgs.slice(0, 6),
  ...I({ cat: 'halal', role: 'fun-gallery' }),
].filter(Boolean).map((m, i) => ({ src: m.src, alt: m.desc, accent: i % 2 ? '#ff7a59' : '#2fd6c4' }));

// showcase
const halalPortV = one({ cat: 'halal', kind: 'video', role: 'card', orientation: 'portrait' });
const beachHero = I({ cat: 'beach', role: 'hero-bg' })[0];
const foodImg = I({ cat: 'food' })[0];

const scatterCards = [
  halalPortV && { key: 'v1', pos: { left: '1.5%', top: '4%', width: '190px' }, depth: 42, fd: '7s', d: 60,
    node: <VibeCard videoSrc={halalPortV.src} poster={halalPortV.poster} aspect="aspect-[3/4]" accent="#2fd6c4" badge="Family" /> },
  { key: 's1', pos: { left: '27%', top: '6%', width: '228px' }, depth: -32, fd: '6s', d: 150,
    node: <StatChip kicker="Bespoke catering" big="100%" unit="Halal" label="Alcohol-free options" accent="#ffb03a" /> },
  beachHero && { key: 'big', pos: { right: '3%', top: '1%', width: '300px' }, depth: 58, fd: '8.5s', d: 110,
    node: <VibeCard src={beachHero.src} aspect="aspect-[4/3]" accent="#4ea8ff" label="Turquoise lagoons" /> },
  halalImgs[0] && { key: 'h1', pos: { right: '1.5%', top: '40%', width: '176px' }, depth: -40, fd: '7.5s', d: 300,
    node: <VibeCard src={halalImgs[0].src} aspect="aspect-[3/4]" accent="#ff7a59" badge="Together" /> },
  foodImg && { key: 'food', pos: { left: '2.5%', top: '50%', width: '196px' }, depth: 36, fd: '6.5s', d: 340,
    node: <VibeCard src={foodImg.src} aspect="aspect-[4/3]" accent="#ffb03a" label="Halal cuisine" /> },
  halalImgs[1] && { key: 'h2', pos: { left: '21%', bottom: '3%', width: '210px' }, depth: -34, fd: '6.2s', d: 230,
    node: <VibeCard src={halalImgs[1].src} aspect="aspect-[3/4]" accent="#2fd6c4" /> },
  { key: 's2', pos: { right: '4%', bottom: '2%', width: '242px' }, depth: 50, fd: '8s', d: 200,
    node: <StatChip kicker="Discretion" big="24/7" unit="Private" label="Crew shaped around you" heights={[40, 55, 72, 48, 88, 66]} accent="#2fd6c4" /> },
  { key: 'p1', pos: { left: '18%', top: '30%' }, depth: -20, fd: '5.5s', d: 420, node: <Pill accent="#ffb03a">Alcohol-free</Pill> },
  { key: 'p2', pos: { right: '20%', bottom: '26%' }, depth: 26, fd: '6.2s', d: 480, node: <Pill accent="#2fd6c4">Family-friendly</Pill> },
].filter(Boolean);

const scatterMobile = [halalPortV].filter(Boolean).map((m, i) => (
  <VibeCard key={'v' + i} videoSrc={m.src} poster={m.poster} aspect="aspect-[3/4]" accent="#2fd6c4" />
)).concat([beachHero, foodImg, halalImgs[0], halalImgs[1]].filter(Boolean).map((m, i) => (
  <VibeCard key={'i' + i} src={m.src} aspect="aspect-[4/3]" accent={['#4ea8ff', '#ffb03a', '#ff7a59', '#2fd6c4'][i % 4]} />
)));

export default function HalalV21Client() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-clip">
      <VideoHero
        videoLandscape={heroVid?.src}
        posterLandscape={heroVid?.poster}
        videoPortrait={heroVidP?.src}
        posterPortrait={heroVidP?.poster}
        kicker="Qualityacht · Halal Caribbean"
        title={<>The Halal Caribbean</>}
        subtitle="A private charter, perfectly considered"
        tintA="rgba(255,176,58,0.18)"
        tintB="rgba(47,214,196,0.20)"
      >
        <CtaButton href="/yachts">Plan your charter</CtaButton>
      </VideoHero>

      <section className="px-5 md:px-20 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal variant="up">
            <p className="text-lg md:text-2xl leading-relaxed text-[#acb0cd]">
              A world of <span className="text-[#bd9973] font-semibold">turquoise privacy</span> for the whole family —
              refined <span className="text-[#bd9973] font-semibold">halal cuisine</span>,{' '}
              <span className="text-[#bd9973] font-semibold">alcohol-free</span> sundowners and a crew who anticipates
              every wish, discreetly.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-4 md:px-16 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <SectionHead kicker="Explore" title="Turquoise, In Total Privacy" sub="The most beautiful waters, exclusively yours" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {exploreCards.map((m, i) => (
              <Reveal key={i} variant="up" delay={i * 90}>
                <VibeCard src={m.src} alt={m.desc} aspect="aspect-[4/5] md:aspect-[4/3]" accent={accents[i % accents.length]} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <VideoBand media={beachBand} title="Seclusion, By Design" sub="Anchor away from the crowds" />

      <section className="px-4 md:px-16 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <SectionHead kicker="For everyone aboard" title="Made For The Whole Family" sub="Joyful days, considered in every detail" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {playItems.map((it, i) => (
              <Reveal key={i} variant="up" delay={i * 80}>
                {it.m.kind === 'video'
                  ? <VibeCard videoSrc={it.m.src} poster={it.m.poster} aspect="aspect-[4/5]" accent={it.accent} label={it.label} />
                  : <VibeCard src={it.m.src} alt={it.m.desc} aspect="aspect-[4/5]" accent={it.accent} label={it.label} />}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <SectionHead kicker="Good times, together" title="Joy, Uncompromised" />
        <FunMarquee items={marqueeItems} speed={54} direction="left" accent="#ffb03a" />
      </section>

      <section className="px-4 md:px-16 py-16 md:py-24">
        <FloatingScatter cards={scatterCards} mobileNodes={scatterMobile}>
          <span className="inline-block rounded-full border border-[#C0C0C0]/40 bg-[#2e2f32] px-4 py-1.5 text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#c2622a] mb-6">Considered in every detail</span>
          <h2 className="trajan-regular text-2xl md:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[#acb0cd] leading-tight max-w-3xl mx-auto">
            Luxury Without Noise,<br className="hidden md:block" /> Service Without Excess
          </h2>
          <p className="mt-5 text-sm md:text-base text-[#acb0cd]/60 max-w-xl mx-auto leading-relaxed">
            Halal-friendly, family-first and endlessly discreet — a Caribbean charter shaped entirely around your preferences.
          </p>
        </FloatingScatter>
      </section>

      <VideoBand media={interiorBand} title="Your Private World At Sea" sub="Space, calm and complete privacy" height="h-[55vh] md:h-[75vh]" />

      <section className="px-5 py-20 md:py-28 text-center">
        <Reveal variant="up">
          <p className="text-[#c2622a] text-xs md:text-sm uppercase tracking-[0.3em] mb-4">At your service</p>
          <h2 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.1em] text-[#acb0cd] mb-8 max-w-3xl mx-auto">Plan Your Halal Charter</h2>
          <CtaButton href="/yachts">Start planning</CtaButton>
        </Reveal>
      </section>
    </div>
  );
}
