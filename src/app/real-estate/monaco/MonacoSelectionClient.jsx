'use client';

// ══ /real-estate/monaco — Monaco Private Residences (client 2026-09-30) ══
// Hero 100 % video (aucun texte), puis presentation editoriale alternee de
// Sim Palace (photos dans des cadres asymetriques flottants), galerie privee
// avec lightbox (compteur, fleches, clavier, swipe), bien 02 « Coming Soon »
// (aucun prix ni surface inventes, decision client), CTA final + mention legale.
// Textes fournis par le client, en anglais US, repris tels quels.

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

const VIDEO = '/media/client/lydie/2026-09-29/monaco-hero.mp4';
const POSTER = '/media/client/lydie/2026-09-29/monaco-hero.jpg';
const P = '/media/client/lydie/2026-09-30/monaco-sim-palace';
const WHATSAPP = 'https://wa.me/41767365781';

// 10 blocs editoriaux (photo + texte), dans l'ordre fourni par le client.
const ROWS = [
  { src: `${P}/Photo-01-carte-de-selection-image-signature.jpg`, title: 'Refined Family Residence', signature: true },
  { src: `${P}/Photo-02-introduction-et-volumes.jpg`, title: 'Light & Volumes', text: 'Generous spaces and refined finishes providing ideal comfort for family life.' },
  { src: `${P}/Photo-03-sejour.jpg`, title: 'The Reception Lounge', text: 'Sunlit living area with bespoke acoustic wooden paneling.' },
  { src: `${P}/Photo-04-salle-a-manger.jpg`, title: 'Independent Dining', text: 'Dedicated dining room designed for effortless private entertaining.' },
  { src: `${P}/Photo-05-cuisine.jpg`, title: 'Bespoke Kitchen', text: 'Large separate culinary space featuring calacatta viola marble and high-end cabinetry.' },
  { src: `${P}/Photo-06-suite-principale.jpg`, title: 'The Principal Suite', text: 'Master bedroom with custom mirrored dressing and serene atmosphere.' },
  { src: `${P}/Photo-07-salle-de-bains-principale.jpg`, title: 'Master Bathroom', text: 'En-suite with walk-in shower and premium double vanity.' },
  { src: `${P}/Photo-08-chambre-secondaire.jpg`, title: 'Secondary Bedroom', text: 'Ideal private bedroom for family or guests with direct outdoor access.' },
  { src: `${P}/Photo-09-detail-couloir-finition.jpg`, title: 'Study & Integrated Storage', text: 'Custom architectural woodwork and comfortable home-office setup.' },
  { src: `${P}/Photo-10-vue-ou-dernier-plan-fort.jpg`, title: 'Circulation & Private Amenities', text: 'Includes 1 private parking space, a basement cellar, and a laundry room.' },
];

// Galerie privee : photos 11 a 20. Seules 11 a 16 ont ete recues ; ajouter
// les suivantes ici des qu'elles arrivent (le compteur s'adapte seul).
const GALLERY_EXTRA = [11, 12, 13, 14, 15, 16].map((n) => `${P}/${n}galerie-privee-complete.jpg`);
const ALL_PHOTOS = [...ROWS.map((r) => r.src), ...GALLERY_EXTRA];

const BTN_PRIMARY =
  'inline-flex min-h-[48px] max-w-full items-center justify-center text-center rounded-full border border-[#C0C0C0] bg-[#26272a] px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]';
const BTN_SECONDARY =
  'inline-flex min-h-[48px] max-w-full items-center justify-center text-center rounded-full border border-[#C0C0C0] bg-[#26272a]/40 px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#C0C0C0] transition-colors duration-300 hover:border-[#c2622a] hover:text-[#c2622a] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]';

const pad = (n) => String(n).padStart(2, '0');

// Apparition au scroll : fondu + remontee de 24px.
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`mr-reveal ${shown ? 'mr-shown' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Cadre asymetrique : un bloc teinte decale derriere la photo, le tout flotte.
function FramedImage({ src, alt, offset = 'tr', onOpen, priority = false, floatDelay = 0 }) {
  const shift = offset === 'tr' ? 'translate-x-6 -translate-y-6' : '-translate-x-6 translate-y-6';
  return (
    <div className="mr-float relative" style={{ animationDelay: `${floatDelay}s` }}>
      <div aria-hidden className={`absolute inset-0 rounded-xl bg-[#1d2233] ${shift}`} />
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open photo: ${alt}`}
        className="group relative block w-full overflow-hidden rounded-xl shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c2622a]"
      >
        <Image
          src={src}
          alt={alt}
          width={554}
          height={369}
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="mr-zoom w-full h-auto"
        />
      </button>
    </div>
  );
}

function Lightbox({ index, onClose, onPrev, onNext }) {
  const touch = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow; };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Private gallery"
      className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center"
      onClick={onClose}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touch.current == null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 40) (dx < 0 ? onNext : onPrev)();
        touch.current = null;
      }}
    >
      <p className="absolute top-5 left-1/2 -translate-x-1/2 text-sm tracking-[0.3em] text-[#c2622a] font-semibold">
        {pad(index + 1)} / {pad(ALL_PHOTOS.length)}
      </p>
      <button type="button" onClick={onClose} aria-label="Close gallery"
        className="absolute top-3 right-4 w-11 h-11 rounded-full border border-[#C0C0C0]/40 text-[#C0C0C0] text-2xl leading-none hover:border-[#c2622a] hover:text-[#c2622a]">×</button>
      <button type="button" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous photo"
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full border border-[#C0C0C0]/40 bg-black/40 text-[#C0C0C0] text-2xl hover:border-[#c2622a] hover:text-[#c2622a]">‹</button>
      <div className="relative w-[92vw] max-w-5xl aspect-[3/2]" onClick={(e) => e.stopPropagation()}>
        <Image src={ALL_PHOTOS[index]} alt={`Sim Palace photo ${index + 1}`} fill sizes="92vw" className="object-contain" />
      </div>
      <button type="button" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next photo"
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full border border-[#C0C0C0]/40 bg-black/40 text-[#C0C0C0] text-2xl hover:border-[#c2622a] hover:text-[#c2622a]">›</button>
    </div>
  );
}

export default function MonacoSelectionClient() {
  const [lb, setLb] = useState(null);
  const open = useCallback((i) => setLb(i), []);
  const close = useCallback(() => setLb(null), []);
  const prev = useCallback(() => setLb((i) => (i - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length), []);
  const next = useCallback(() => setLb((i) => (i + 1) % ALL_PHOTOS.length), []);

  return (
    <main className="bg-[#26272a] text-[#acb0cd] overflow-x-clip">
      <style>{`
        @keyframes floatSlow { 0% { transform: translateY(0px); } 50% { transform: translateY(-7px); } 100% { transform: translateY(0px); } }
        .mr-float { animation: floatSlow 7s ease-in-out infinite alternate; }
        .mr-zoom { transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1); }
        .group:hover .mr-zoom { transform: scale(1.025); }
        .mr-reveal { opacity: 0; transform: translateY(24px); transition: opacity 1.1s ease, transform 1.1s cubic-bezier(0.22, 1, 0.36, 1); }
        .mr-reveal.mr-shown { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          .mr-float { animation: none; }
          .mr-reveal { opacity: 1; transform: none; transition: none; }
        }
      `}</style>

      {/* ══ HERO — video seule, aucun texte ══ */}
      <section className="relative w-full h-[100svh] min-h-[560px] overflow-hidden bg-[#26272a]">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={VIDEO}
          poster={POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </section>

      {/* ══ INTRO ══ */}
      <section className="px-6 md:px-14 pt-24 md:pt-32 pb-16 md:pb-20">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight">
            Monaco Private Residences
          </h1>
          <p className="mt-6 text-[15px] md:text-lg leading-[1.8] text-[#acb0cd]">
            A private selection of two Monaco residences, carefully chosen from the portfolio of Balkin Monaco Real Estate.
          </p>
          <p className="mt-4 text-xs md:text-sm uppercase tracking-[0.22em] text-[#8b90a0]">
            Selected from the portfolio of Balkin Monaco Real Estate.
          </p>
        </Reveal>
      </section>

      {/* ══ PROPERTY 01 — SIM PALACE ══ */}
      <section className="px-6 md:px-14 pb-10">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14 md:mb-20">
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#c2622a]">Property 01</p>
            <h2 className="trajan-regular mt-3 text-2xl md:text-4xl uppercase tracking-[0.1em] text-[#C0C0C0]">Sim Palace</h2>
          </Reveal>

          <div className="space-y-20 md:space-y-28">
            {ROWS.map((row, i) => {
              const imageLeft = i % 2 === 0;
              return (
                <div key={row.src} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                  <Reveal className={`px-6 lg:px-0 ${imageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                    <FramedImage
                      src={row.src}
                      alt={row.title}
                      offset={imageLeft ? 'tr' : 'bl'}
                      onOpen={() => open(i)}
                      priority={i === 0}
                      floatDelay={(i % 3) * 1.2}
                    />
                  </Reveal>
                  <Reveal delay={150} className={imageLeft ? 'lg:order-2' : 'lg:order-1'}>
                    <p className="text-xs uppercase tracking-[0.3em] text-[#8b90a0]">{pad(i + 1)}</p>
                    <h3 className="trajan-regular mt-3 text-xl md:text-3xl uppercase tracking-[0.08em] text-[#C0C0C0]">{row.title}</h3>
                    {row.signature ? (
                      <>
                        <p className="mt-4 text-sm uppercase tracking-[0.2em] text-[#acb0cd]">Monaco, Moneghetti · Sim Palace</p>
                        <p className="mt-5 text-2xl md:text-3xl font-semibold text-[#c2622a]">€8,950,000</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#8b90a0]">Co-Exclusive Listing · Law 887</p>
                        <p className="mt-5 text-[15px] md:text-base leading-[1.8]">190 sq. m. turnkey apartment with 3.20m ceiling height.</p>
                        <p className="mt-5 text-[13px] md:text-sm leading-[1.9] text-[#C0C0C0]">
                          190 sq. m. · 5 Rooms · 4 Bedrooms · 4 Bathrooms · 1 Private Parking · 1 Cellar · 2nd Floor · City View
                        </p>
                      </>
                    ) : (
                      <p className="mt-5 text-[15px] md:text-base leading-[1.8]">{row.text}</p>
                    )}
                  </Reveal>
                </div>
              );
            })}
          </div>

          {/* ── Galerie privee ── */}
          <div className="mt-24 md:mt-32">
            <Reveal className="text-center mb-10">
              <h3 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">Private Dossier Gallery</h3>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {GALLERY_EXTRA.map((src, k) => (
                <Reveal key={src} delay={k * 80}>
                  <button
                    type="button"
                    onClick={() => open(ROWS.length + k)}
                    aria-label={`Open gallery photo ${ROWS.length + k + 1}`}
                    className="group block w-full overflow-hidden rounded-lg focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
                  >
                    <Image src={src} alt={`Sim Palace gallery photo ${ROWS.length + k + 1}`} width={554} height={369} sizes="(max-width: 768px) 50vw, 33vw" className="mr-zoom w-full h-auto" />
                  </button>
                </Reveal>
              ))}
            </div>
            <div className="mt-10 text-center">
              <button type="button" onClick={() => open(0)} className={BTN_PRIMARY}>
                View Complete Private Dossier &amp; Gallery ({ALL_PHOTOS.length} Photos)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROPERTY 02 — COMING SOON (aucune donnee inventee, decision client) ══ */}
      <section className="px-6 md:px-14 pt-24 md:pt-32 pb-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:order-2 px-6 lg:px-0">
            <div className="mr-float relative">
              <div aria-hidden className="absolute inset-0 rounded-xl bg-[#1d2233] -translate-x-6 translate-y-6" />
              <div className="relative aspect-[3/2] rounded-xl border border-[#C0C0C0]/20 bg-[#2e2f32] flex items-center justify-center">
                <span className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.2em] text-[#c2622a]">Coming Soon</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150} className="lg:order-1">
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#c2622a]">Property 02 · Coming Soon</p>
            <h2 className="trajan-regular mt-3 text-2xl md:text-4xl uppercase tracking-[0.08em] text-[#C0C0C0]">The Monte-Carlo Horizon Residence</h2>
            <p className="mt-5 text-[15px] md:text-base leading-[1.8]">A second private residence will be unveiled soon.</p>
          </Reveal>
        </div>
      </section>

      {/* ══ CTA FINAL + MENTION LEGALE ══ */}
      <section className="px-6 md:px-14 pt-24 md:pt-32 pb-20 md:pb-28">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.08em] text-[#C0C0C0] leading-tight">
            Arrange a Confidential Private Viewing in Monaco
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className={BTN_PRIMARY}>Request Confidential Dossier</Link>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={BTN_SECONDARY}>Speak with Private Advisor</a>
          </div>
          <p className="mt-14 text-xs md:text-[13px] leading-[1.8] text-[#8b90a0]">
            Property information presented through an authorised professional relationship with Balkin Monaco Real Estate. All specifications, surfaces, and prices are subject to confirmation.
          </p>
        </Reveal>
      </section>

      {lb != null && <Lightbox index={lb} onClose={close} onPrev={prev} onNext={next} />}
    </main>
  );
}
