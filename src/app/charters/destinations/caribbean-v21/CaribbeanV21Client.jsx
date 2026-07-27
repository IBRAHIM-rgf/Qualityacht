'use client';

// ══ Caraibes V21 — VERSION 2 : plus libre, exploite les VIDEOS ══
// Hero video drone, bandeaux video plein cadre, grilles de cartes colorees,
// galerie defilante "gens qui s'amusent", showcase flottant (facon alethia) et
// sections activites. Palette Qualityacht + accents tropicaux ; jamais de blanc.

import { media, one } from '@/lib/quality-media';
import VideoHero from '@/components/vibe/VideoHero';
import Reveal from '@/components/vibe/Reveal';
import VibeCard from '@/components/vibe/VibeCard';
import FunMarquee from '@/components/vibe/FunMarquee';
import FloatingScatter, { StatChip, Pill } from '@/components/vibe/FloatingScatter';

const V = (f) => one({ ...f, kind: 'video' });
const I = (f) => media({ ...f, kind: 'image' });

// ── selections media ──────────────────────────────────────────────────────────
const heroVid = V({ cat: 'aerial', role: 'hero-bg', orientation: 'landscape' });
const heroVidP = V({ cat: 'aerial', role: 'hero-bg', orientation: 'portrait' });
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

// Activites / gens qui s'amusent (mix photo + video)
const playItems = [
  { m: V({ cat: 'people', role: 'card', orientation: 'portrait' }), label: 'Watersports', accent: '#2fd6c4' },
  { m: I({ cat: 'horses', role: 'card' })[0], label: 'Beach riding', accent: '#ff7a59' },
  { m: I({ cat: 'interiors', role: 'card' })[0], label: 'Jacuzzi at sea', accent: '#4ea8ff' },
  { m: I({ cat: 'food', role: 'section-band' })[0], label: 'Island dining', accent: '#ffb03a' },
  { m: V({ cat: 'aerial', role: 'card', orientation: 'portrait' }), label: 'Drone views', accent: '#2fd6c4' },
  { m: I({ cat: 'people', role: 'fun-gallery' })[0], label: 'Carnival', accent: '#ff7a59' },
].filter((x) => x.m);

// Bandeau marquee "gens qui s'amusent"
const marqueeItems = [
  ...I({ cat: 'people' }).filter((m) => m.orientation === 'portrait').slice(0, 6),
  ...I({ cat: 'beach', role: 'fun-gallery' }).slice(0, 3),
].filter(Boolean).map((m, i) => ({ src: m.src, alt: m.desc, accent: i % 2 ? '#ff7a59' : '#2fd6c4' }));

// Showcase flottant
const aerialPort = V({ cat: 'aerial', role: 'card', orientation: 'portrait' });
const peopleFunV = V({ cat: 'people', role: 'card', orientation: 'portrait' });
const beachHero = I({ cat: 'beach', role: 'hero-bg' })[0];
const beachCard = I({ cat: 'beach', role: 'card' })[1];
const housesDivers = I({ cat: 'divers', role: 'section-band' })[0];

const scatterCards = [
  aerialPort && { key: 'a', pos: { left: '1.5%', top: '4%', width: '196px' }, depth: 42, fd: '7s', d: 60,
    node: <VibeCard videoSrc={aerialPort.src} poster={aerialPort.poster} aspect="aspect-[3/4]" accent="#2fd6c4" badge="Aerial" /> },
  { key: 'stat1', pos: { left: '27%', top: '6%', width: '228px' }, depth: -32, fd: '6s', d: 150,
    node: <StatChip kicker="Luxury Fleet" big="182" unit="Yachts" label="Available this season" /> },
  beachHero && { key: 'big', pos: { right: '3%', top: '1%', width: '300px' }, depth: 58, fd: '8.5s', d: 110,
    node: <VibeCard src={beachHero.src} aspect="aspect-[4/3]" accent="#4ea8ff" label="Turquoise lagoons" /> },
  peopleFunV && { key: 'v2', pos: { right: '1.5%', top: '40%', width: '176px' }, depth: -40, fd: '7.5s', d: 300,
    node: <VibeCard videoSrc={peopleFunV.src} poster={peopleFunV.poster} aspect="aspect-[3/4]" accent="#ff7a59" badge="Fun" /> },
  housesDivers && { key: 'c1', pos: { left: '2.5%', top: '50%', width: '196px' }, depth: 36, fd: '6.5s', d: 340,
    node: <VibeCard src={housesDivers.src} aspect="aspect-[4/3]" accent="#ffb03a" /> },
  beachCard && { key: 'beach', pos: { left: '21%', bottom: '3%', width: '236px' }, depth: -34, fd: '6.2s', d: 230,
    node: <VibeCard src={beachCard.src} aspect="aspect-[4/3]" accent="#2fd6c4" label="Powder-white sands" /> },
  { key: 'stat2', pos: { right: '4%', bottom: '2%', width: '242px' }, depth: 50, fd: '8s', d: 200,
    node: <StatChip kicker="Cruising grounds" big="700" unit="+ islands" label="Across 26 nations" heights={[40, 55, 72, 48, 88, 66]} accent="#2fd6c4" /> },
  { key: 'p1', pos: { left: '18%', top: '30%' }, depth: -20, fd: '5.5s', d: 420, node: <Pill>24/7 concierge</Pill> },
  { key: 'p2', pos: { right: '20%', bottom: '26%' }, depth: 26, fd: '6.2s', d: 480, node: <Pill accent="#2fd6c4">26 countries</Pill> },
].filter(Boolean);

const scatterMobile = [aerialPort, peopleFunV].filter(Boolean).map((m, i) => (
  <VibeCard key={i} videoSrc={m.src} poster={m.poster} aspect="aspect-[3/4]" accent={i ? '#ff7a59' : '#2fd6c4'} />
)).concat([beachHero, beachCard, housesDivers].filter(Boolean).map((m, i) => (
  <VibeCard key={'i' + i} src={m.src} aspect="aspect-[4/3]" accent={['#4ea8ff', '#2fd6c4', '#ffb03a'][i % 3]} />
)));

// ── petits blocs ────────────────────────────────────────────────────────────
function SectionHead({ kicker, title, sub }) {
  return (
    <div className="text-center mb-10 md:mb-14">
      {kicker && <Reveal variant="fade"><p className="text-[#c2622a] text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-light">{kicker}</p></Reveal>}
      <Reveal variant="up" delay={80}>
        <h2 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.1em] text-[#acb0cd]">{title}</h2>
      </Reveal>
      <Reveal variant="scale" delay={200}>
        <span className="block h-[2px] w-24 mx-auto my-5 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #c2622a 30%, #d39478 70%, transparent)' }} />
      </Reveal>
      {sub && <Reveal variant="up" delay={260}><p className="text-[#acb0cd]/55 text-sm md:text-base uppercase tracking-[0.1em] px-4">{sub}</p></Reveal>}
    </div>
  );
}

function VideoBand({ media: m, title, sub, height = 'h-[60vh] md:h-[80vh]' }) {
  if (!m) return null;
  return (
    <section className={`relative w-full ${height} overflow-hidden`}>
      <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={m.poster}>
        <source src={m.src} type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #26272a 0%, transparent 24%, transparent 56%, rgba(38,39,42,0.65) 88%, #26272a 100%)' }} />
      <div className="absolute inset-0 mix-blend-soft-light pointer-events-none" style={{ background: 'radial-gradient(55% 55% at 22% 30%, rgba(47,214,196,0.22), transparent 60%), radial-gradient(60% 60% at 82% 82%, rgba(255,122,89,0.18), transparent 60%)' }} />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5">
        <Reveal variant="blur" duration={1200}>
          <h2 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] text-[#acb0cd] drop-shadow-[0_3px_14px_rgba(0,0,0,0.7)] max-w-4xl">{title}</h2>
        </Reveal>
        {sub && <Reveal variant="up" delay={250}><p className="mt-5 text-[#acb0cd] text-sm md:text-lg uppercase tracking-[0.2em] drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]">{sub}</p></Reveal>}
      </div>
    </section>
  );
}

function CtaButton({ href = '/yachts', children }) {
  return (
    <a href={href} style={{ color: '#c2622a', backgroundColor: '#26272a', borderColor: '#C0C0C0' }}
      className="trajan-regular inline-block text-xs md:text-sm uppercase tracking-[0.25em] px-8 md:px-10 py-3.5 md:py-4 border rounded-full hover:bg-[#c2622a] hover:text-[#26272a] hover:border-[#c2622a] transition-all duration-300">
      {children}
    </a>
  );
}

export default function CaribbeanV21Client() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-clip">
      {/* ══ HERO VIDEO ══ */}
      <VideoHero
        videoLandscape={heroVid?.src}
        posterLandscape={heroVid?.poster}
        videoPortrait={heroVidP?.src}
        posterPortrait={heroVidP?.poster}
        kicker="Qualityacht · Caribbean"
        title={<>The Caribbean</>}
        subtitle="Turquoise waters, curated for the extraordinary"
      >
        <CtaButton href="/yachts">Explore the fleet</CtaButton>
      </VideoHero>

      {/* ══ INTRO ══ */}
      <section className="px-5 md:px-20 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal variant="up">
            <p className="text-lg md:text-2xl leading-relaxed text-[#acb0cd]">
              A mosaic of <span className="text-[#d39478] font-semibold">turquoise lagoons</span>,{' '}
              <span className="text-[#d39478] font-semibold">powder-white sands</span> and{' '}
              <span className="text-[#d39478] font-semibold">vivid coral reefs</span> — seven hundred islands
              where every day at sea is designed around your idea of joy.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ EXPLORE — grille de cartes colorees ══ */}
      <section className="px-4 md:px-16 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <SectionHead kicker="Explore" title="Turquoise, Everywhere" sub="The most sought-after waters in the world" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {exploreCards.map((m, i) => (
              <Reveal key={i} variant="up" delay={i * 90}>
                <VibeCard src={m.src} alt={m.desc} aspect="aspect-[4/5] md:aspect-[4/3]" accent={accents[i % accents.length]} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BANDEAU VIDEO plage ══ */}
      <VideoBand media={beachBand} title="Seven Hundred Islands, One Horizon" sub="Anchor where the map runs out" />

      {/* ══ WAYS TO PLAY — activites / gens qui s'amusent ══ */}
      <section className="px-4 md:px-16 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <SectionHead kicker="On the water & ashore" title="Ways to Play" sub="Because a charter is what you make of it" />
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

      {/* ══ MARQUEE gens qui s'amusent ══ */}
      <section className="py-10 md:py-16">
        <SectionHead kicker="Good times" title="Made For Joy" />
        <FunMarquee items={marqueeItems} speed={52} direction="left" />
      </section>

      {/* ══ SHOWCASE flottant (facon alethia) ══ */}
      <section className="px-4 md:px-16 py-16 md:py-24">
        <FloatingScatter cards={scatterCards} mobileNodes={scatterMobile}>
          <span className="inline-block rounded-full border border-[#C0C0C0]/40 bg-[#2e2f32] px-4 py-1.5 text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#c2622a] mb-6">At a glance</span>
          <h2 className="trajan-regular text-2xl md:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[#acb0cd] leading-tight max-w-3xl mx-auto">
            The Caribbean,<br className="hidden md:block" /> Curated Around You
          </h2>
          <p className="mt-5 text-sm md:text-base text-[#acb0cd]/60 max-w-xl mx-auto leading-relaxed">
            Seven hundred islands, twenty-six nations, one seamless charter experience — quantified, curated and crafted for the extraordinary.
          </p>
        </FloatingScatter>
      </section>

      {/* ══ BANDEAU VIDEO interieur ══ */}
      <VideoBand media={interiorBand} title="Life On Board" sub="Your floating private residence" height="h-[55vh] md:h-[75vh]" />

      {/* ══ CTA ══ */}
      <section className="px-5 py-20 md:py-28 text-center">
        <Reveal variant="up">
          <p className="text-[#c2622a] text-xs md:text-sm uppercase tracking-[0.3em] mb-4">Ready to sail</p>
          <h2 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.1em] text-[#acb0cd] mb-8 max-w-3xl mx-auto">Plan Your Caribbean Charter</h2>
          <CtaButton href="/yachts">Start planning</CtaButton>
        </Reveal>
      </section>
    </div>
  );
}
