'use client';

// ══ /real-estate/monaco — Monaco Private Residences (client 2026-09-30) ══
// Hero 100 % video (aucun texte), puis presentation editoriale alternee de
// Sim Palace (photos dans des cadres asymetriques flottants), galerie privee
// avec lightbox (compteur, fleches, clavier, swipe), bien 02 « Contemporary Monaco
// Residence » (client 2026-10-03 : 11 photos, textes valides), CTA final + mention legale.
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

// Galerie privee : photos 11 a 20 (17 a 20 recues le 2026-09-30). Ajouter
// d.autres photos ici si besoin (le compteur s.adapte seul).
const GALLERY_EXTRA = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((n) => `${P}/${n}galerie-privee-complete.jpg`);
const ALL_PHOTOS = [...ROWS.map((r) => r.src), ...GALLERY_EXTRA];

// ── Bien 02 — Contemporary Monaco Residence (client 2026-10-03) ──
// 11 photos recues (8 blocs + 3 en galerie). w/h = dimensions reelles des photos.
const P2 = '/media/client/lydie/2026-10-03/monaco-bien2';
const ROWS_2 = [
  { src: `${P2}/Bien2-Photo-01.jpg`, w: 561, h: 352, title: 'Contemporary Monaco Residence', signature: true },
  { src: `${P2}/Bien2-Photo-02.jpg`, w: 554, h: 369, title: 'Atmosphere & Proportions', text: 'Warm oak joinery and ambient lighting create a calm, balanced atmosphere throughout.' },
  { src: `${P2}/Bien2-Photo-03.jpg`, w: 561, h: 328, title: 'The Living Room', text: 'A bright, generous living area designed for relaxed everyday living and private entertaining.' },
  { src: `${P2}/Bien2-Photo-04.jpg`, w: 561, h: 368, title: 'Dining Space', text: 'A refined dining setting around a natural stone table, open to the living spaces.' },
  { src: `${P2}/Bien2-Photo-05.jpg`, w: 310, h: 369, title: 'Terrace & Facade', text: 'A classic Monaco facade with a discreet, gated private entrance.' },
  { src: `${P2}/Bien2-Photo-06.jpg`, w: 561, h: 358, title: 'The Principal Suite', text: 'A serene principal bedroom with a bespoke upholstered headboard and integrated wardrobes.' },
  { src: `${P2}/Bien2-Photo-07.jpg`, w: 262, h: 369, title: 'Designer En-Suite', text: 'A designer bathroom with a backlit mirror, natural textures and a walk-in shower.' },
  { src: `${P2}/Bien2-Photo-08.jpg`, w: 561, h: 359, title: 'Guest Suite', text: 'A comfortable guest bedroom with built-in storage and abundant natural light.' },
];
const GALLERY_2 = [
  { src: `${P2}/Bien2-09.jpg`, w: 561, h: 350 },
  { src: `${P2}/Bien2-10.jpg`, w: 561, h: 339 },
  { src: `${P2}/Bien2-11.jpg`, w: 367, h: 369 },
];
const ALL_PHOTOS_2 = [...ROWS_2.map((r) => r.src), ...GALLERY_2.map((g) => g.src)];

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
function FramedImage({ src, alt, offset = 'tr', onOpen, priority = false, floatDelay = 0, width = 554, height = 369 }) {
  const shift = offset === 'tr' ? 'translate-x-6 -translate-y-6' : '-translate-x-6 translate-y-6';
  // Photo verticale : largeur limitee pour ne pas devenir demesuree dans la colonne.
  const portrait = height > width;
  return (
    <div className={`mr-float relative ${portrait ? 'max-w-[340px] mx-auto' : ''}`} style={{ animationDelay: `${floatDelay}s` }}>
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
          width={width}
          height={height}
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="mr-zoom w-full h-auto"
        />
      </button>
    </div>
  );
}

function Lightbox({ photos, name, index, onClose, onPrev, onNext }) {
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
        {pad(index + 1)} / {pad(photos.length)}
      </p>
      <button type="button" onClick={onClose} aria-label="Close gallery"
        className="absolute top-3 right-4 w-11 h-11 rounded-full border border-[#C0C0C0]/40 text-[#C0C0C0] text-2xl leading-none hover:border-[#c2622a] hover:text-[#c2622a]">×</button>
      <button type="button" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous photo"
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full border border-[#C0C0C0]/40 bg-black/40 text-[#C0C0C0] text-2xl hover:border-[#c2622a] hover:text-[#c2622a]">‹</button>
      <div className="relative w-[92vw] max-w-5xl aspect-[3/2]" onClick={(e) => e.stopPropagation()}>
        <Image src={photos[index]} alt={`${name} photo ${index + 1}`} fill sizes="92vw" className="object-contain" />
      </div>
      <button type="button" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next photo"
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full border border-[#C0C0C0]/40 bg-black/40 text-[#C0C0C0] text-2xl hover:border-[#c2622a] hover:text-[#c2622a]">›</button>
    </div>
  );
}

export default function MonacoSelectionClient() {
  // lb = { photos, name, index } : une lightbox par bien (compteur propre a chaque bien).
  const [lb, setLb] = useState(null);
  const open = useCallback((i) => setLb({ photos: ALL_PHOTOS, name: 'Sim Palace', index: i }), []);
  const open2 = useCallback((i) => setLb({ photos: ALL_PHOTOS_2, name: 'Contemporary Monaco Residence', index: i }), []);
  const close = useCallback(() => setLb(null), []);
  const prev = useCallback(() => setLb((l) => ({ ...l, index: (l.index - 1 + l.photos.length) % l.photos.length })), []);
  const next = useCallback(() => setLb((l) => ({ ...l, index: (l.index + 1) % l.photos.length })), []);

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

      {/* ══ PROPERTY 02 — CONTEMPORARY MONACO RESIDENCE (client 2026-10-03) ══ */}
      <section className="px-6 md:px-14 pt-24 md:pt-32 pb-10">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14 md:mb-20">
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#c2622a]">Property 02</p>
            <h2 className="trajan-regular mt-3 text-2xl md:text-4xl uppercase tracking-[0.1em] text-[#C0C0C0]">Contemporary Monaco Residence</h2>
          </Reveal>

          <div className="space-y-20 md:space-y-28">
            {ROWS_2.map((row, i) => {
              const imageLeft = i % 2 === 0;
              return (
                <div key={row.src} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                  <Reveal className={`px-6 lg:px-0 ${imageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                    <FramedImage
                      src={row.src}
                      alt={row.title}
                      width={row.w}
                      height={row.h}
                      offset={imageLeft ? 'tr' : 'bl'}
                      onOpen={() => open2(i)}
                      floatDelay={(i % 3) * 1.2}
                    />
                  </Reveal>
                  <Reveal delay={150} className={imageLeft ? 'lg:order-2' : 'lg:order-1'}>
                    <p className="text-xs uppercase tracking-[0.3em] text-[#8b90a0]">{pad(i + 1)}</p>
                    <h3 className="trajan-regular mt-3 text-xl md:text-3xl uppercase tracking-[0.08em] text-[#C0C0C0]">{row.title}</h3>
                    {row.signature ? (
                      <>
                        <p className="mt-4 text-sm uppercase tracking-[0.2em] text-[#acb0cd]">Monaco Address</p>
                        <p className="mt-5 text-2xl md:text-3xl font-semibold text-[#c2622a]">Price Upon Request</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#8b90a0]">Bespoke Modern Renovation &amp; Natural Stone</p>
                        <p className="mt-5 text-[15px] md:text-base leading-[1.8]">A fully renovated residence where contemporary design meets natural stone and warm oak.</p>
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 items-start">
              {GALLERY_2.map((g, k) => (
                <Reveal key={g.src} delay={k * 80}>
                  <button
                    type="button"
                    onClick={() => open2(ROWS_2.length + k)}
                    aria-label={`Open gallery photo ${ROWS_2.length + k + 1}`}
                    className="group block w-full overflow-hidden rounded-lg focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
                  >
                    <Image src={g.src} alt={`Contemporary Monaco Residence gallery photo ${ROWS_2.length + k + 1}`} width={g.w} height={g.h} sizes="(max-width: 768px) 50vw, 33vw" className="mr-zoom w-full h-auto" />
                  </button>
                </Reveal>
              ))}
            </div>
            <div className="mt-10 text-center">
              <button type="button" onClick={() => open2(0)} className={BTN_PRIMARY}>
                View Complete Private Dossier &amp; Gallery ({ALL_PHOTOS_2.length} Photos)
              </button>
            </div>
          </div>
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

      {lb != null && <Lightbox photos={lb.photos} name={lb.name} index={lb.index} onClose={close} onPrev={prev} onNext={next} />}
    </main>
  );
}
