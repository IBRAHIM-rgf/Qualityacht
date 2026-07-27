'use client';

// ══ Caraibes V22 — VERSION 3 : totalement libre, tres animee, "gens qui s'amusent" ══
// Experience de scroll immersive : hero video, bandeaux video plein cadre en
// alternance, doubles marquees, mosaique d'activites, showcase flottant riche en
// videos. Palette Qualityacht + accents tropicaux ; jamais de blanc.

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

// heros / bandeaux
const heroV = V({ cat: 'people', role: 'hero-bg' });
const heroVp = one({ cat: 'people', kind: 'video', role: 'card', orientation: 'portrait' });
const aerialBand = V({ cat: 'aerial', role: 'hero-bg', orientation: 'landscape' });
const beachBand = V({ cat: 'beach', role: 'section-band' });
const dolphin = one({ cat: 'aerial', kind: 'video', role: 'card', orientation: 'landscape' });
const interiorBand = V({ cat: 'interiors', role: 'section-band' });

// marquees
const marqueeTop = [
  ...I({ cat: 'people' }).filter((m) => m.orientation === 'portrait').slice(0, 5),
  ...I({ cat: 'beach', role: 'fun-gallery' }).slice(0, 3),
].filter(Boolean).map((m, i) => ({ src: m.src, alt: m.desc, accent: i % 2 ? '#ff7a59' : '#2fd6c4', label: undefined }));

const marqueeBottom = [
  ...I({ cat: 'horses' }).slice(0, 4),
  ...I({ cat: 'divers' }).slice(0, 3),
  ...I({ cat: 'boats', role: 'fun-gallery' }).slice(0, 2),
].filter(Boolean).map((m, i) => ({ src: m.src, alt: m.desc, accent: i % 2 ? '#ffb03a' : '#4ea8ff' }));

// mosaique activites (grande = span)
const acts = [
  { m: heroVp, label: 'Jet skis', big: true, accent: '#2fd6c4' },
  { m: I({ cat: 'horses', role: 'hero-bg' })[0], label: 'Beach riding', accent: '#ff7a59' },
  { m: I({ cat: 'people', role: 'fun-gallery' })[0], label: 'Carnival', accent: '#ff7a59' },
  { m: I({ cat: 'food', role: 'section-band' })[0], label: 'Island feasts', accent: '#ffb03a' },
  { m: I({ cat: 'interiors', role: 'activity' })[0], label: 'Jacuzzi at sea', accent: '#4ea8ff' },
  { m: I({ cat: 'boats', role: 'fun-gallery' })[1] || I({ cat: 'boats', role: 'fun-gallery' })[0], label: 'Regatta', big: true, accent: '#4ea8ff' },
  { m: I({ cat: 'cycling' })[0], label: 'Island rides', accent: '#2fd6c4' },
  { m: I({ cat: 'beach', role: 'card' })[0], label: 'Hidden coves', accent: '#2fd6c4' },
].filter((x) => x.m);

// showcase flottant riche en videos
const aerialPorts = Vs({ cat: 'aerial', role: 'card', orientation: 'portrait' });
const peoplePorts = Vs({ cat: 'people', role: 'card', orientation: 'portrait' });
const beachPort = V({ cat: 'beach', role: 'card', orientation: 'portrait' });
const boatPort = V({ cat: 'boats', role: 'card', orientation: 'portrait' });
const beachHero = I({ cat: 'beach', role: 'hero-bg' })[0];

const vcard = (m, extra = {}) => m && (m.kind === 'video'
  ? <VibeCard videoSrc={m.src} poster={m.poster} {...extra} />
  : <VibeCard src={m.src} alt={m.desc} {...extra} />);

const scatterCards = [
  aerialPorts[0] && { key: 'a1', pos: { left: '1.5%', top: '4%', width: '190px' }, depth: 44, fd: '7s', d: 60, node: vcard(aerialPorts[0], { aspect: 'aspect-[3/4]', accent: '#2fd6c4', badge: 'Aerial' }) },
  { key: 's1', pos: { left: '27%', top: '6%', width: '224px' }, depth: -30, fd: '6s', d: 150, node: <StatChip kicker="Luxury Fleet" big="182" unit="Yachts" label="Available this season" accent="#2fd6c4" /> },
  beachHero && { key: 'big', pos: { right: '3%', top: '1%', width: '300px' }, depth: 56, fd: '8.5s', d: 110, node: <VibeCard src={beachHero.src} aspect="aspect-[4/3]" accent="#4ea8ff" label="Turquoise lagoons" /> },
  peoplePorts[1] && { key: 'p2', pos: { right: '1.5%', top: '40%', width: '176px' }, depth: -40, fd: '7.5s', d: 300, node: vcard(peoplePorts[1], { aspect: 'aspect-[3/4]', accent: '#ff7a59', badge: 'Fun' }) },
  boatPort && { key: 'bo', pos: { left: '2.5%', top: '50%', width: '190px' }, depth: 36, fd: '6.5s', d: 340, node: vcard(boatPort, { aspect: 'aspect-[3/4]', accent: '#ffb03a', badge: 'Sail' }) },
  beachPort && { key: 'be', pos: { left: '21%', bottom: '3%', width: '210px' }, depth: -34, fd: '6.2s', d: 230, node: vcard(beachPort, { aspect: 'aspect-[3/4]', accent: '#2fd6c4' }) },
  { key: 's2', pos: { right: '4%', bottom: '2%', width: '240px' }, depth: 50, fd: '8s', d: 200, node: <StatChip kicker="Playground" big="700" unit="+ islands" label="Across 26 nations" heights={[40, 55, 72, 48, 88, 66]} accent="#ff7a59" /> },
  { key: 'pill1', pos: { left: '18%', top: '30%' }, depth: -20, fd: '5.5s', d: 420, node: <Pill accent="#2fd6c4">Good times only</Pill> },
  { key: 'pill2', pos: { right: '20%', bottom: '26%' }, depth: 26, fd: '6.2s', d: 480, node: <Pill accent="#ff7a59">24/7 concierge</Pill> },
].filter(Boolean);

const scatterMobile = [aerialPorts[0], peoplePorts[1], boatPort, beachPort].filter(Boolean)
  .map((m, i) => vcard(m, { key: i, aspect: 'aspect-[3/4]', accent: ['#2fd6c4', '#ff7a59', '#ffb03a', '#4ea8ff'][i % 4] }));

export default function CaribbeanV22Client() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-clip">
      {/* ══ HERO ══ */}
      <VideoHero
        videoLandscape={heroV?.src}
        posterLandscape={heroV?.poster}
        videoPortrait={heroVp?.src}
        posterPortrait={heroVp?.poster}
        kicker="Qualityacht · Caribbean"
        title={<>Made For<br className="hidden md:block" /> The Good Times</>}
        subtitle="Your Caribbean, unfiltered"
        tintA="rgba(255,122,89,0.20)"
        tintB="rgba(47,214,196,0.20)"
      >
        <CtaButton href="/yachts">Start the adventure</CtaButton>
      </VideoHero>

      {/* ══ INTRO manifeste ══ */}
      <section className="px-5 md:px-20 py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <Reveal variant="up">
            <p className="text-xl md:text-3xl leading-relaxed text-[#acb0cd]">
              Sun on your skin, <span className="text-[#d39478] font-semibold">laughter over the water</span>, and a wake
              full of <span className="text-[#d39478] font-semibold">stories worth telling</span>. This is the Caribbean
              the way it was meant to be lived.
            </p>
          </Reveal>
          <Reveal variant="up" delay={200} className="mt-12">
            <StatStrip stats={[{ big: '700+', label: 'Islands & cays' }, { big: '26', label: 'Nations' }, { big: '5.0', label: 'Guest rating' }, { big: '24/7', label: 'Concierge' }]} />
          </Reveal>
        </div>
      </section>

      {/* ══ BANDEAU VIDEO aerien ══ */}
      <VideoBand media={aerialBand} title="From The Sky To The Sea" sub="Every anchorage, a new adventure" />

      {/* ══ MOSAIQUE activites ══ */}
      <section className="px-4 md:px-16 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <SectionHead kicker="Ways to play" title="Never A Dull Wave" sub="Pick your thrill — we handle the rest" />
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[190px] gap-3 md:gap-4">
            {acts.map((a, i) => (
              <Reveal key={i} variant="scale" delay={i * 70}
                className={a.big ? 'col-span-2 row-span-2' : ''} style={{ display: 'block', height: '100%' }}>
                {a.m.kind === 'video'
                  ? <VibeCard videoSrc={a.m.src} poster={a.m.poster} aspect="" className="h-full" accent={a.accent} label={a.label} />
                  : <VibeCard src={a.m.src} alt={a.m.desc} aspect="" className="h-full" accent={a.accent} label={a.label} />}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DOUBLE MARQUEE gens qui s'amusent ══ */}
      <section className="py-12 md:py-16 space-y-4 md:space-y-5">
        <SectionHead kicker="Good vibes" title="People Having Fun" />
        <FunMarquee items={marqueeTop} speed={54} direction="left" height="h-52 md:h-64" />
        <FunMarquee items={marqueeBottom} speed={62} direction="right" height="h-52 md:h-64" accent="#ffb03a" />
      </section>

      {/* ══ BANDEAU VIDEO plage ══ */}
      <VideoBand media={beachBand} title="Where The Map Runs Out" sub="Powder-white sands, all to yourself" height="h-[55vh] md:h-[75vh]" />

      {/* ══ SHOWCASE flottant ══ */}
      <section className="px-4 md:px-16 py-16 md:py-24">
        <FloatingScatter cards={scatterCards} mobileNodes={scatterMobile}>
          <span className="inline-block rounded-full border border-[#C0C0C0]/40 bg-[#2e2f32] px-4 py-1.5 text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#c2622a] mb-6">The good stuff</span>
          <h2 className="trajan-regular text-2xl md:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[#acb0cd] leading-tight max-w-3xl mx-auto">
            All Play,<br className="hidden md:block" /> Zero Compromise
          </h2>
          <p className="mt-5 text-sm md:text-base text-[#acb0cd]/60 max-w-xl mx-auto leading-relaxed">
            Watersports, sundowners, hidden coves and a crew who says yes — the Caribbean, curated entirely around your idea of fun.
          </p>
        </FloatingScatter>
      </section>

      {/* ══ DOLPHIN moment ══ */}
      <VideoBand media={dolphin} title="Say Hello To The Locals" sub="Dolphins included, on the house" height="h-[50vh] md:h-[70vh]" tint={false} />

      {/* ══ CTA ══ */}
      <section className="px-5 py-20 md:py-28 text-center">
        <Reveal variant="up">
          <p className="text-[#c2622a] text-xs md:text-sm uppercase tracking-[0.3em] mb-4">Let's go</p>
          <h2 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] text-[#acb0cd] mb-8 max-w-3xl mx-auto">Your Best Summer, Booked</h2>
          <CtaButton href="/yachts">Plan my charter</CtaButton>
        </Reveal>
      </section>
    </div>
  );
}
