'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getAnkorImageUrl } from '@/lib/utils';
import {
  Ruler, Users, BedDouble, Anchor, Calendar, ChevronLeft, ChevronRight, X, Map,
  Gauge, Fuel, Wrench, Building2, Sparkles, Tv, Waves, Ship, UserCircle2,
} from 'lucide-react';

const GALLERY_PAGE = 6;

// ── Helpers ────────────────────────────────────────────────────────────────
function formatPriceObj(p) {
  if (!p?.price) return null;
  const amount = p.price / 100;
  const sym = { EUR: '€', USD: '$', GBP: '£' }[p.currency] || p.currency || '€';
  return `${new Intl.NumberFormat('fr-FR').format(amount)} ${sym}`;
}

function Section({ title, children, dense = false }) {
  return (
    <section className={`max-w-6xl mx-auto px-5 md:px-10 ${dense ? 'py-8 md:py-10' : 'py-12 md:py-16'}`}>
      <div className="text-center mb-8 md:mb-10">
        <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.12em] text-[#C0C0C0]">{title}</h2>
        <div className="relative w-32 h-6 mx-auto mt-3">
          <Image src="/images/title-line.png" alt="" fill className="object-contain" />
        </div>
      </div>
      {children}
    </section>
  );
}

function Spec({ icon: Icon, img, label, value }) {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div className="flex flex-col items-center text-center px-3 py-4">
      {img ? (
        <Image src={img} alt={label} width={24} height={24} className="mb-2" />
      ) : (
        <Icon className="w-6 h-6 text-[#c2622a] mb-2" />
      )}
      <span className="text-[#acb0cd] text-base">{value}</span>
      <span className="text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/50 mt-1">{label}</span>
    </div>
  );
}

function SpecRow({ icon: Icon, label, value }) {
  if (value === undefined || value === null || value === '' || value === 0) return null;
  return (
    <div className="flex items-center gap-4 py-3 border-b border-[#C0C0C0]/10 last:border-b-0">
      <Icon className="w-5 h-5 text-[#c2622a] shrink-0" />
      <span className="text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60 flex-1">{label}</span>
      <span className="text-[#C0C0C0] text-sm font-medium">{value}</span>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-block px-3 py-1.5 rounded-full border border-[#C0C0C0]/40 bg-[#3a3b3f] text-[#acb0cd] text-xs">
      {children}
    </span>
  );
}

// ── Composant principal ────────────────────────────────────────────────────
export default function YachtDetailClient({ yacht, similar = [] }) {
  const [lightbox, setLightbox] = useState(-1);
  const [galleryPage, setGalleryPage] = useState(0);

  if (!yacht) {
    return (
      <div className="min-h-screen bg-[#26272a] flex items-center justify-center text-[#acb0cd] px-4 text-center">
        <div>
          <p>Yacht non trouvé en BDD.</p>
          <p className="text-sm text-[#acb0cd]/60 mt-2">Lance <code className="text-[#c2622a]">node scripts/seed-coral-ocean.mjs</code> pour le seeder.</p>
        </div>
      </div>
    );
  }

  const full = yacht.full || {};
  const bp = full.blueprint || {};
  const pricing = full.pricing || {};
  const description = full.description || yacht.description;

  const imgs = (yacht.images || []).filter(Boolean).map(i => getAnkorImageUrl(i, '1280w'));
  const hero = imgs[0] || '/images/yachts/yatch2.jpeg';
  const gallery = imgs.slice(1);
  const price = yacht.pricePerHour || yacht.price;
  const year = yacht.year && yacht.refit ? `${yacht.year} / ${yacht.refit}` : (yacht.year || yacht.refit);

  const closeLb = () => setLightbox(-1);
  const prevLb = () => setLightbox(i => (i - 1 + imgs.length) % imgs.length);
  const nextLb = () => setLightbox(i => (i + 1) % imgs.length);

  const cabinLayout = Array.isArray(bp.cabinLayout) ? bp.cabinLayout : [];
  const amenities = Array.isArray(bp.amenities) ? bp.amenities : [];
  const toys = Array.isArray(bp.toys) ? bp.toys : [];
  const entertainment = Array.isArray(bp.entertainment) ? bp.entertainment : [];
  const tenders = Array.isArray(bp.tenders) ? bp.tenders : [];
  const crew = Array.isArray(full.crew) ? full.crew : [];
  const weekFrom = formatPriceObj(pricing.weekPricingFrom);
  const dayFrom = formatPriceObj(pricing.dayPricingFrom);

  // Specs détaillées : on n'affiche que celles renseignées (SpecRow filtre)
  const specsTech = [
    { icon: Ruler, label: 'Length overall', value: bp.length ? `${bp.length} m` : null },
    { icon: Ruler, label: 'Beam', value: bp.beam ? `${bp.beam} m` : null },
    { icon: Ruler, label: 'Draft', value: bp.draft ? `${bp.draft} m` : null },
    { icon: Gauge, label: 'Top speed', value: bp.topSpeed ? `${bp.topSpeed} kn` : null },
    { icon: Gauge, label: 'Cruise speed', value: bp.cruiseSpeed ? `${bp.cruiseSpeed} kn` : null },
    { icon: Wrench, label: 'Engines', value: bp.engines },
    { icon: Building2, label: 'Hull construction', value: bp.hullConstruction },
    { icon: Fuel, label: 'Fuel capacity', value: bp.fuelCapacity || null },
    { icon: Ship, label: 'Model', value: bp.model },
    { icon: Ship, label: 'Architect', value: bp.architect },
    { icon: Ship, label: 'Interior designer', value: bp.interiorDesigner },
    { icon: Ship, label: 'Tonnage', value: bp.tonnage || null },
  ];

  return (
    <div className="bg-[#26272a] text-[#acb0cd]">

      {/* ══ HERO ══ */}
      <div className="pt-24 pb-6 px-4 md:px-10">
        <div className="max-w-6xl mx-auto relative aspect-[16/10] md:aspect-[21/9] rounded-xl overflow-hidden border border-[#C0C0C0] bg-[#3a3b3f]">
          <Image src={hero} alt={yacht.name} fill priority className="object-contain md:object-cover object-center" />
        </div>
      </div>

      {/* ══ NOM ══ */}
      <div className="max-w-6xl mx-auto px-5 md:px-10 pt-6 pb-2 text-center">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#c2622a] mb-3">Luxury Yacht Charter</p>
        <h1 className="trajan-regular text-3xl md:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0]">{yacht.name}</h1>
        {bp.make && bp.model && (
          <p className="text-sm md:text-base text-[#acb0cd]/70 mt-3 tracking-wider">
            {bp.make} <span className="text-[#c2622a]">·</span> {bp.model}
          </p>
        )}
      </div>

      {/* ══ ENTÊTE : prix + enquire + base port + specs résumées ══ */}
      <div className="border-b border-[#C0C0C0]/20">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-8 flex flex-col lg:flex-row lg:items-center gap-8">
          <div className="flex-1">
            {price && (
              <p className="trajan-regular text-2xl md:text-3xl text-[#acb0cd]">
                From {price}<span className="text-sm text-[#acb0cd]/50"> / week</span>
              </p>
            )}
            <a href="/request-quote-test-v10"
              className="inline-block mt-4 rounded-xl border-2 border-[#C0C0C0] px-8 py-3 text-sm uppercase tracking-[0.2em] font-medium text-[#B03E00] transition-all hover:bg-[#B03E00]/10 shadow-[0_4px_15px_rgba(192,192,192,0.3)] hover:shadow-[0_6px_20px_rgba(192,192,192,0.4)]">
              Enquire about {yacht.name}
            </a>
            {(bp.basePort?.name || yacht.location) && (
              <div className="mt-5 rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] px-5 py-4 flex items-center gap-3">
                <Map className="w-7 h-7 text-[#B03E00] shrink-0" strokeWidth={2} />
                <p className="text-base md:text-lg min-w-0 truncate">
                  <span className="text-[#acb0cd]">Base Port :</span>{' '}
                  <span className="text-[#C0C0C0] font-bold">
                    {bp.basePort?.name || yacht.location}
                    {bp.basePort?.country && ` (${bp.basePort.country})`}
                  </span>
                </p>
              </div>
            )}
          </div>
          <div className="lg:flex-[1.4] grid grid-cols-3 sm:grid-cols-6 rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] divide-x divide-[#C0C0C0]/20">
            <Spec icon={Anchor} label="Builder" value={yacht.make || bp.make} />
            <Spec icon={Ruler} label="Length" value={yacht.length} />
            <Spec icon={Calendar} label="Year" value={year} />
            <Spec icon={Users} label="Guests" value={yacht.guests || yacht.capacity} />
            <Spec icon={BedDouble} label="Cabins" value={yacht.cabins} />
            <Spec img="/casquette-capitaine.svg" label="Crew" value={yacht.crew || bp.maxCrew} />
          </div>
        </div>
      </div>

      {/* ══ DESCRIPTION ══ */}
      {description && (
        <div className="max-w-4xl mx-auto px-5 md:px-10 py-14 md:py-20">
          <div className="relative w-40 h-7 mx-auto mb-8">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
          <p className="text-base md:text-lg leading-relaxed text-[#acb0cd] whitespace-pre-line">
            {description}
          </p>
        </div>
      )}

      {/* ══ SPECIFICATIONS TECHNIQUES ══ */}
      {specsTech.some(s => s.value) && (
        <Section title="Specifications">
          <div className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] px-6 md:px-8 py-4">
            <div className="grid md:grid-cols-2 md:gap-x-12">
              {specsTech.map((s, i) => (
                <SpecRow key={i} icon={s.icon} label={s.label} value={s.value} />
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ══ CABIN LAYOUT ══ */}
      {cabinLayout.length > 0 && (
        <Section title="Cabin Layout">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cabinLayout.map((c, i) => (
              <div key={i} className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-5 text-center">
                <BedDouble className="w-6 h-6 text-[#c2622a] mx-auto mb-2" />
                <p className="text-2xl font-bold text-[#C0C0C0]">{c.value}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60 mt-1">{c.label}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ══ AMENITIES ══ */}
      {amenities.length > 0 && (
        <Section title="Amenities">
          <div className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-6 md:p-8">
            <Sparkles className="w-6 h-6 text-[#c2622a] mb-4 mx-auto" />
            <div className="flex flex-wrap justify-center gap-2">
              {amenities.map((a, i) => (
                <Badge key={i}>{a.label}</Badge>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ══ ENTERTAINMENT ══ */}
      {entertainment.length > 0 && (
        <Section title="Entertainment" dense>
          <div className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-6 md:p-8">
            <Tv className="w-6 h-6 text-[#c2622a] mb-4 mx-auto" />
            <div className="flex flex-wrap justify-center gap-2">
              {entertainment.map((e, i) => (
                <Badge key={i}>{e}</Badge>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ══ WATER TOYS ══ */}
      {toys.length > 0 && (
        <Section title="Water Toys">
          <div className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-6 md:p-8">
            <Waves className="w-6 h-6 text-[#c2622a] mb-4 mx-auto" />
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
              {toys.map((t, i) => (
                <li key={i} className="flex items-start gap-3 py-1.5 border-b border-[#C0C0C0]/10">
                  <span className="text-[#c2622a] mt-0.5">›</span>
                  <span className="text-[#acb0cd] text-sm flex-1">{t.label}</span>
                  {t.quantity && (
                    <span className="text-[#C0C0C0] text-xs font-bold border border-[#C0C0C0]/40 rounded-full px-2 py-0.5">
                      ×{t.quantity}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* ══ TENDERS ══ */}
      {tenders.length > 0 && (
        <Section title="Tenders" dense>
          <div className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-6 md:p-8">
            <Ship className="w-6 h-6 text-[#c2622a] mb-4 mx-auto" />
            <ul className="space-y-2">
              {tenders.map((t, i) => (
                <li key={i} className="flex items-start gap-3 py-2 border-b border-[#C0C0C0]/10 last:border-b-0">
                  <span className="text-[#c2622a] mt-0.5">›</span>
                  <span className="text-[#acb0cd] text-sm">{typeof t === 'string' ? t : t.label || JSON.stringify(t)}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* ══ CREW ══ */}
      {crew.length > 0 && (
        <Section title="The Crew">
          <p className="text-center text-[#acb0cd]/60 text-sm mb-8">
            {crew.length} crew members dedicated to your charter
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {crew.map((c, i) => {
              const avatar = c.avatar ? getAnkorImageUrl(c.avatar, '320w') : null;
              return (
                <div key={i} className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] overflow-hidden">
                  <div className="relative aspect-square bg-[#26272a]">
                    {avatar ? (
                      <Image src={avatar} alt={c.name} fill className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <UserCircle2 className="w-12 h-12 text-[#C0C0C0]/30" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-xs font-bold text-[#C0C0C0] truncate">{c.name}</p>
                    {c.role && (
                      <p className="text-[10px] uppercase tracking-[0.15em] text-[#c2622a] mt-1 truncate">{c.role}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {/* ══ PRICING ══ */}
      {(weekFrom || dayFrom) && (
        <Section title="Pricing" dense>
          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {weekFrom && (
              <div className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-6 text-center">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#c2622a] mb-2">Weekly charter</p>
                <p className="trajan-regular text-2xl text-[#C0C0C0]">From {weekFrom}</p>
                <p className="text-xs text-[#acb0cd]/50 mt-1">per week</p>
              </div>
            )}
            {dayFrom && (
              <div className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-6 text-center">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#c2622a] mb-2">Daily charter</p>
                <p className="trajan-regular text-2xl text-[#C0C0C0]">From {dayFrom}</p>
                <p className="text-xs text-[#acb0cd]/50 mt-1">per day</p>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* ══ GALERIE ══ */}
      {gallery.length > 0 && (() => {
        const totalPages = Math.ceil(gallery.length / GALLERY_PAGE);
        const safe = Math.min(galleryPage, totalPages - 1);
        const start = safe * GALLERY_PAGE;
        const slice = gallery.slice(start, start + GALLERY_PAGE);
        const prevG = () => setGalleryPage(p => (p - 1 + totalPages) % totalPages);
        const nextG = () => setGalleryPage(p => (p + 1) % totalPages);
        return (
          <Section title="Gallery">
            <p className="text-center text-base md:text-lg font-bold tracking-[0.15em] text-[#acb0cd] mb-6 -mt-4">
              {start + 1}–{Math.min(start + GALLERY_PAGE, gallery.length)} / {gallery.length}
            </p>
            <div className="relative">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {slice.map((src, i) => {
                  const gi = start + i;
                  return (
                    <button key={gi} onClick={() => setLightbox(gi + 1)}
                      className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#C0C0C0] group">
                      <Image src={src} alt={`${yacht.name} ${gi + 2}`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </button>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <>
                  <button onClick={prevG} aria-label="Previous"
                    className="absolute top-1/2 -translate-y-1/2 -left-3 md:-left-5 w-11 h-11 rounded-full border-2 border-[#C0C0C0] bg-[#26272a] text-[#B03E00] flex items-center justify-center transition-all hover:bg-[#B03E00]/10 hover:border-[#B03E00] shadow-[0_4px_15px_rgba(192,192,192,0.3)]">
                    <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
                  </button>
                  <button onClick={nextG} aria-label="Next"
                    className="absolute top-1/2 -translate-y-1/2 -right-3 md:-right-5 w-11 h-11 rounded-full border-2 border-[#C0C0C0] bg-[#26272a] text-[#B03E00] flex items-center justify-center transition-all hover:bg-[#B03E00]/10 hover:border-[#B03E00] shadow-[0_4px_15px_rgba(192,192,192,0.3)]">
                    <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
                  </button>
                </>
              )}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }, (_, p) => (
                  <button key={p} onClick={() => setGalleryPage(p)} aria-label={`Page ${p + 1}`}
                    className={`w-3 h-3 rotate-45 transition-colors ${p === safe ? 'bg-[#B03E00]' : 'bg-[#C0C0C0]/40 hover:bg-[#C0C0C0]'}`} />
                ))}
              </div>
            )}
          </Section>
        );
      })()}

      {/* ══ CTA ══ */}
      <div className="max-w-4xl mx-auto px-5 md:px-10 pb-16 text-center">
        <a href="/request-quote-test-v10"
          className="inline-block rounded-xl border-2 border-[#C0C0C0] px-12 py-4 text-sm uppercase tracking-[0.2em] font-medium text-[#B03E00] transition-all hover:bg-[#B03E00]/10 shadow-[0_4px_15px_rgba(192,192,192,0.3)] hover:shadow-[0_6px_20px_rgba(192,192,192,0.4)]">
          Design Your Charter
        </a>
      </div>

      {/* ══ SIMILAR YACHTS ══ */}
      {similar.length > 0 && (
        <div className="border-t border-[#C0C0C0]/20 py-14 md:py-20">
          <div className="max-w-6xl mx-auto px-5 md:px-10">
            <div className="text-center mb-10">
              <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.12em] text-[#C0C0C0]">Similar Yachts</h2>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
              {similar.map(s => {
                const simg = (s.images || []).filter(Boolean).map(i => getAnkorImageUrl(i, '640w'))[0] || '/images/yachts/yatch2.jpeg';
                return (
                  <div key={s.id} className="shrink-0 w-64 rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] overflow-hidden">
                    <div className="relative aspect-[4/3]"><Image src={simg} alt={s.name} fill className="object-cover" /></div>
                    <div className="p-4">
                      <h3 className="trajan-regular text-sm text-[#C0C0C0] uppercase tracking-[0.1em] truncate">{s.name}</h3>
                      <p className="text-xs text-[#acb0cd]/70 mt-1">{[s.length, s.guests && `${s.guests} guests`, s.type].filter(Boolean).join(' · ')}</p>
                      {(s.pricePerHour || s.price) && <p className="text-xs text-[#acb0cd] mt-1">From {s.pricePerHour || s.price}/wk</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ══ LIGHTBOX ══ */}
      {lightbox >= 0 && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={closeLb}>
          <button onClick={closeLb} aria-label="Close"
            className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full border-2 border-[#C0C0C0] bg-[#26272a] text-[#B03E00] flex items-center justify-center shadow-[0_4px_15px_rgba(192,192,192,0.3)]">
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <button onClick={e => { e.stopPropagation(); prevLb(); }} aria-label="Previous"
            className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border-2 border-[#C0C0C0] bg-[#26272a] text-[#B03E00] flex items-center justify-center shadow-[0_4px_15px_rgba(192,192,192,0.3)]">
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <div className="relative w-[88vw] md:w-[85vw] h-[75vh] md:h-[80vh]" onClick={e => e.stopPropagation()}>
            <Image src={imgs[lightbox]} alt="" fill className="object-contain" />
          </div>
          <button onClick={e => { e.stopPropagation(); nextLb(); }} aria-label="Next"
            className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border-2 border-[#C0C0C0] bg-[#26272a] text-[#B03E00] flex items-center justify-center shadow-[0_4px_15px_rgba(192,192,192,0.3)]">
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      )}
    </div>
  );
}
