'use client';

// ══ Halal Caraibes V22 — VERSION 3 : totalement libre, tres animee, familles ══
// Experience immersive orientee familles : hero video, bandeaux video, doubles
// marquees de familles qui s'amusent, mosaique d'activites family-friendly,
// showcase flottant. Lumineux, colore, joyeux ; halal, discret ; jamais de blanc.

import { media, one } from '@/lib/quality-media';
import VideoHero from '@/components/vibe/VideoHero';
import Reveal from '@/components/vibe/Reveal';
import VibeCard from '@/components/vibe/VibeCard';
import FunMarquee from '@/components/vibe/FunMarquee';
import FloatingScatter, { StatChip, Pill } from '@/components/vibe/FloatingScatter';
import { SectionHead, VideoBand, CtaButton, StatStrip } from '@/components/vibe/blocks';

const V = (f) => one({ ...f, kind: 'video' });
const Vs = (f) => media({ ...f, kind: 'video' });
const I = (f) => media({ ...f, kind: 'image' });

const heroV = V({ cat: 'halal', role: 'hero-bg' });
const heroVp = one({ cat: 'halal', kind: 'video', role: 'card', orientation: 'portrait' });
const aerialBand = V({ cat: 'aerial', role: 'hero-bg', orientation: 'landscape' });
const beachBand = V({ cat: 'beach', role: 'section-band' });
const dolphin = one({ cat: 'aerial', kind: 'video', role: 'card', orientation: 'landscape' });
const interiorBand = V({ cat: 'interiors', role: 'section-band' });

const halalImgs = I({ cat: 'halal' }).filter((m) => m.orientation === 'portrait');

const marqueeTop = [
  ...halalImgs.slice(0, 5),
  ...I({ cat: 'halal', role: 'fun-gallery' }),
].filter(Boolean).map((m, i) => ({ src: m.src, alt: m.desc, accent: i % 2 ? '#ff7a59' : '#2fd6c4' }));

const marqueeBottom = [
  ...I({ cat: 'food' }).slice(0, 3),
  ...I({ cat: 'divers' }).slice(0, 3),
  ...I({ cat: 'horses' }).slice(0, 2),
].filter(Boolean).map((m, i) => ({ src: m.src, alt: m.desc, accent: i % 2 ? '#ffb03a' : '#4ea8ff' }));

const acts = [
  { m: heroVp, label: 'Family time', big: true, accent: '#2fd6c4' },
  { m: halalImgs[0], label: 'Together', accent: '#ff7a59' },
  { m: I({ cat: 'halal', role: 'fun-gallery' })[0], label: 'Kids aboard', accent: '#4ea8ff' },
  { m: I({ cat: 'food', role: 'card' })[0] || I({ cat: 'food' })[0], label: 'Halal feasts', accent: '#ffb03a' },
  { m: I({ cat: 'interiors', role: 'activity' })[0], label: 'Jacuzzi at sea', accent: '#4ea8ff' },
  { m: I({ cat: 'horses' })[0], label: 'Beach riding', big: true, accent: '#ff7a59' },
  { m: halalImgs[1], label: 'Modest & free', accent: '#2fd6c4' },
  { m: I({ cat: 'beach', role: 'card' })[0], label: 'Secluded coves', accent: '#2fd6c4' },
].filter((x) => x.m);

const halalPortsV = Vs({ cat: 'halal', role: 'card', orientation: 'portrait' });
const beachHero = I({ cat: 'beach', role: 'hero-bg' })[0];
const foodImg = I({ cat: 'food' })[0];

const vcard = (m, extra = {}) => m && (m.kind === 'video'
  ? <VibeCard videoSrc={m.src} poster={m.poster} {...extra} />
  : <VibeCard src={m.src} alt={m.desc} {...extra} />);

const scatterCards = [
  halalPortsV[0] && { key: 'v1', pos: { left: '1.5%', top: '4%', width: '190px' }, depth: 44, fd: '7s', d: 60, node: vcard(halalPortsV[0], { aspect: 'aspect-[3/4]', accent: '#2fd6c4', badge: 'Family' }) },
  { key: 's1', pos: { left: '27%', top: '6%', width: '224px' }, depth: -30, fd: '6s', d: 150, node: <StatChip kicker="Catering" big="100%" unit="Halal" label="Alcohol-free options" accent="#ffb03a" /> },
  beachHero && { key: 'big', pos: { right: '3%', top: '1%', width: '300px' }, depth: 56, fd: '8.5s', d: 110, node: <VibeCard src={beachHero.src} aspect="aspect-[4/3]" accent="#4ea8ff" label="Turquoise lagoons" /> },
  halalPortsV[1] && { key: 'v2', pos: { right: '1.5%', top: '40%', width: '176px' }, depth: -40, fd: '7.5s', d: 300, node: vcard(halalPortsV[1], { aspect: 'aspect-[3/4]', accent: '#ff7a59', badge: 'Joy' }) },
  foodImg && { key: 'food', pos: { left: '2.5%', top: '50%', width: '190px' }, depth: 36, fd: '6.5s', d: 340, node: <VibeCard src={foodImg.src} aspect="aspect-[4/3]" accent="#ffb03a" label="Halal cuisine" /> },
  halalImgs[0] && { key: 'h1', pos: { left: '21%', bottom: '3%', width: '210px' }, depth: -34, fd: '6.2s', d: 230, node: <VibeCard src={halalImgs[0].src} aspect="aspect-[3/4]" accent="#2fd6c4" /> },
  { key: 's2', pos: { right: '4%', bottom: '2%', width: '240px' }, depth: 50, fd: '8s', d: 200, node: <StatChip kicker="Discretion" big="24/7" unit="Private" label="Crew shaped around you" heights={[40, 55, 72, 48, 88, 66]} accent="#2fd6c4" /> },
  { key: 'pill1', pos: { left: '18%', top: '30%' }, depth: -20, fd: '5.5s', d: 420, node: <Pill accent="#ffb03a">Family-first</Pill> },
  { key: 'pill2', pos: { right: '20%', bottom: '26%' }, depth: 26, fd: '6.2s', d: 480, node: <Pill accent="#2fd6c4">Utterly discreet</Pill> },
].filter(Boolean);

const scatterMobile = [halalPortsV[0], halalPortsV[1]].filter(Boolean).map((m, i) => vcard(m, { key: i, aspect: 'aspect-[3/4]', accent: i ? '#ff7a59' : '#2fd6c4' }))
  .concat([beachHero, foodImg, halalImgs[0]].filter(Boolean).map((m, i) => <VibeCard key={'i' + i} src={m.src} aspect="aspect-[4/3]" accent={['#4ea8ff', '#ffb03a', '#2fd6c4'][i % 3]} />));

export default function HalalV22Client() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-clip">
      <VideoHero
        videoLandscape={heroV?.src}
        posterLandscape={heroV?.poster}
        videoPortrait={heroVp?.src}
        posterPortrait={heroVp?.poster}
        kicker="Qualityacht · Halal Caribbean"
        title={<>Joy,<br className="hidden md:block" /> The Halal Way</>}
        subtitle="The Caribbean, for everyone you love"
        tintA="rgba(255,176,58,0.18)"
        tintB="rgba(47,214,196,0.20)"
      >
        <CtaButton href="/yachts">Begin the journey</CtaButton>
      </VideoHero>

      <section className="px-5 md:px-20 py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <Reveal variant="up">
            <p className="text-xl md:text-3xl leading-relaxed text-[#acb0cd]">
              Warm days on the water, <span className="text-[#d39478] font-semibold">laughter shared with the ones you love</span>,
              and every detail — from <span className="text-[#d39478] font-semibold">halal cuisine</span> to complete privacy —
              quietly taken care of.
            </p>
          </Reveal>
          <Reveal variant="up" delay={200} className="mt-12">
            <StatStrip stats={[{ big: '700+', label: 'Islands & cays' }, { big: '100%', label: 'Halal catering' }, { big: '0', label: 'Alcohol, if you wish' }, { big: '24/7', label: 'Discreet crew' }]} />
          </Reveal>
        </div>
      </section>

      <VideoBand media={aerialBand} title="A Private Horizon" sub="Seclusion from the sky to the sea" />

      <section className="px-4 md:px-16 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <SectionHead kicker="Ways to play" title="Something For Everyone" sub="Joyful days, considered in every detail" />
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[190px] gap-3 md:gap-4">
            {acts.map((a, i) => (
              <Reveal key={i} variant="scale" delay={i * 70} className={a.big ? 'col-span-2 row-span-2' : ''} style={{ display: 'block', height: '100%' }}>
                {a.m.kind === 'video'
                  ? <VibeCard videoSrc={a.m.src} poster={a.m.poster} aspect="" className="h-full" accent={a.accent} label={a.label} />
                  : <VibeCard src={a.m.src} alt={a.m.desc} aspect="" className="h-full" accent={a.accent} label={a.label} />}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 space-y-4 md:space-y-5">
        <SectionHead kicker="Good times, together" title="Families Having Fun" />
        <FunMarquee items={marqueeTop} speed={54} direction="left" height="h-52 md:h-64" />
        <FunMarquee items={marqueeBottom} speed={62} direction="right" height="h-52 md:h-64" accent="#ffb03a" />
      </section>

      <VideoBand media={beachBand} title="Coves Of Your Own" sub="Powder-white sands, complete privacy" height="h-[55vh] md:h-[75vh]" />

      <section className="px-4 md:px-16 py-16 md:py-24">
        <FloatingScatter cards={scatterCards} mobileNodes={scatterMobile}>
          <span className="inline-block rounded-full border border-[#C0C0C0]/40 bg-[#2e2f32] px-4 py-1.5 text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#c2622a] mb-6">Considered in every detail</span>
          <h2 className="trajan-regular text-2xl md:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[#acb0cd] leading-tight max-w-3xl mx-auto">
            All The Joy,<br className="hidden md:block" /> None Of The Compromise
          </h2>
          <p className="mt-5 text-sm md:text-base text-[#acb0cd]/60 max-w-xl mx-auto leading-relaxed">
            Halal cuisine, alcohol-free sundowners, family-first days and a crew who anticipates every wish — discreetly.
          </p>
        </FloatingScatter>
      </section>

      <VideoBand media={dolphin} title="Say Hello To The Locals" sub="Dolphins, on the house" height="h-[50vh] md:h-[70vh]" tint={false} />

      <section className="px-5 py-20 md:py-28 text-center">
        <Reveal variant="up">
          <p className="text-[#c2622a] text-xs md:text-sm uppercase tracking-[0.3em] mb-4">At your service</p>
          <h2 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] text-[#acb0cd] mb-8 max-w-3xl mx-auto">Your Family's Best Summer</h2>
          <CtaButton href="/yachts">Plan my charter</CtaButton>
        </Reveal>
      </section>
    </div>
  );
}
