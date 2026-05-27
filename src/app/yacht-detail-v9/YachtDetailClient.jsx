'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getAnkorImageUrl } from '@/lib/utils';
import {
  Ruler, Users, BedDouble, Anchor, Calendar, ChevronLeft, ChevronRight, X, Map,
  Gauge, Fuel, Wrench, Building2, Sparkles, Tv, Ship, UserCircle2, ChevronDown,
} from 'lucide-react';

const GALLERY_PAGE = 6;

function formatMoney(cents, currency) {
  if (cents == null) return null;
  const amount = cents / 100;
  const sym = { EUR: '€', USD: '$', GBP: '£' }[currency] || currency || '€';
  return `${new Intl.NumberFormat('fr-FR').format(amount)} ${sym}`;
}

function seasonGroup(s) {
  const name = (s?.name || '').toLowerCase();
  if (/(summer|high|été|haute|été)/.test(name)) return 'summer';
  if (/(winter|low|hiver|basse)/.test(name)) return 'winter';
  const zones = (s?.inclusionZones || []).map((z) => (z?.label || '').toLowerCase()).join(' ');
  if (/(caribbean|bahamas|antille|antill)/.test(zones)) return 'winter';
  const dates = (s?.effectiveDates || []).filter((d) => d?.from && d?.to);
  if (dates.length) {
    const months = dates.map((d) => {
      const mid = (new Date(d.from).getTime() + new Date(d.to).getTime()) / 2;
      return new Date(mid).getUTCMonth() + 1;
    });
    const avg = months.reduce((a, b) => a + b, 0) / months.length;
    return avg >= 5 && avg <= 9 ? 'summer' : 'winter';
  }
  return 'summer';
}

function Spec({ icon: Icon, img, label, value }) {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div className="flex flex-col items-center text-center px-3 py-4">
      {img ? (
        <Image src={img} alt={label} width={24} height={24} className="mb-2" />
      ) : (
        <Icon className="w-6 h-6 text-[#B03E00] mb-2" />
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
      <Icon className="w-5 h-5 text-[#B03E00] shrink-0" />
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

function Collapsible({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-6 md:px-8 py-5 text-left hover:bg-[#3a3b3f]/70 transition-colors"
      >
        <h3 className="trajan-regular text-lg md:text-xl uppercase tracking-[0.12em] text-[#C0C0C0]">{title}</h3>
        <ChevronDown
          className={`w-6 h-6 text-[#B03E00] shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          strokeWidth={2.5}
        />
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function YachtDetailClient({ yacht, similar = [] }) {
  const [lightbox, setLightbox] = useState(-1);
  const [galleryPage, setGalleryPage] = useState(0);

  if (!yacht) {
    return (
      <div className="min-h-screen bg-[#26272a] flex items-center justify-center text-[#acb0cd] px-4 text-center">
        <div>
          <p>Yacht non trouvé en BDD.</p>
          <p className="text-sm text-[#acb0cd]/60 mt-2">Vérifie que <code className="text-[#B03E00]">yacht_selections.full_data</code> est rempli pour ce yacht.</p>
        </div>
      </div>
    );
  }

  const full = yacht.full || {};
  const bp = full.blueprint || {};
  const pricing = full.pricing || {};
  const description = full.description || yacht.description;

  const imgs = (yacht.images || []).filter(Boolean).map((i) => getAnkorImageUrl(i, '1280w'));
  const hero = imgs[0] || '/images/yachts/yatch2.jpeg';
  const gallery = imgs.slice(1);
  const price = yacht.pricePerHour || yacht.price;
  const year = yacht.year && yacht.refit ? `${yacht.year} / ${yacht.refit}` : (yacht.year || yacht.refit);

  const closeLb = () => setLightbox(-1);
  const prevLb = () => setLightbox((i) => (i - 1 + imgs.length) % imgs.length);
  const nextLb = () => setLightbox((i) => (i + 1) % imgs.length);

  const cabinLayout = Array.isArray(bp.cabinLayout) ? bp.cabinLayout : [];
  const amenities = Array.isArray(bp.amenities) ? bp.amenities : [];
  const toys = Array.isArray(bp.toys) ? bp.toys : [];
  const entertainment = Array.isArray(bp.entertainment) ? bp.entertainment : [];
  const tenders = Array.isArray(bp.tenders) ? bp.tenders : [];
  const crew = Array.isArray(full.crew) ? full.crew : [];
  const seasons = Array.isArray(pricing.pricingInfo) ? pricing.pricingInfo : [];

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

  const hasSpecs = specsTech.some((s) => s.value);
  const hasAmenities = amenities.length > 0 || entertainment.length > 0;

  return (
    <div className="bg-[#26272a] text-[#acb0cd]">

      {/* ══ HERO ══ */}
      <div className="pt-24 pb-6 px-4 md:px-10">
        <div className="max-w-6xl mx-auto relative aspect-[16/10] md:aspect-[21/9] rounded-xl overflow-hidden border border-[#C0C0C0] bg-[#3a3b3f]">
          <Image src={hero} alt={yacht.name} fill priority className="object-cover object-center" />
        </div>
      </div>

      {/* ══ NOM (à gauche) + FROM juste en dessous ══ */}
      <div className="max-w-6xl mx-auto px-5 md:px-10 pt-6 pb-2 text-left">
        <h1 className="trajan-regular text-3xl md:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0]">{yacht.name}</h1>
        {price && (
          <p className="trajan-regular text-2xl md:text-3xl text-[#acb0cd] mt-2">
            From {price}<span className="text-sm text-[#acb0cd]/50"> / week</span>
          </p>
        )}
      </div>

      {/* ══ ENTÊTE : enquire + specs grid ══ */}
      <div className="border-b border-[#C0C0C0]/20">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-8 flex flex-col lg:flex-row lg:items-center gap-8">
          <div className="flex-1 w-full">
            <a href="/request-quote-test-v10" className="flex flex-col items-start w-full lg:w-auto lg:inline-flex lg:items-center rounded-xl border-2 border-[#C0C0C0] px-8 py-3 transition-all hover:bg-[#B03E00]/10 shadow-[0_4px_15px_rgba(192,192,192,0.3)] hover:shadow-[0_6px_20px_rgba(192,192,192,0.4)] text-left lg:text-center">
              <span className="text-sm uppercase tracking-[0.2em] font-medium text-[#B03E00]">Enquire about</span>
              <span className="trajan-regular text-base md:text-lg uppercase tracking-[0.15em] mt-1" style={{ color: '#B03E00' }}>{yacht.name}</span>
            </a>
          </div>
          <div className="lg:flex-[1.4] grid grid-cols-3 sm:grid-cols-6 rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] divide-x divide-y sm:divide-y-0 divide-[#C0C0C0]/20">
            <Spec icon={Anchor} label="Builder" value={yacht.make || bp.make} />
            <Spec icon={Ruler} label="Length" value={yacht.length} />
            <Spec icon={Calendar} label="Year" value={year} />
            <Spec icon={Users} label="Guests" value={yacht.guests || yacht.capacity || (yacht.cabins ? yacht.cabins * 2 : null)} />
            <Spec icon={BedDouble} label="Cabins" value={yacht.cabins} />
            <Spec img="/casquette-capitaine.svg" label="Crew" value={yacht.crew || bp.maxCrew} />
          </div>
        </div>

        {/* Base port compacte sous le bloc Builder/Crew */}
        {(bp.basePort?.name || yacht.location) && (
          <div className="max-w-6xl mx-auto px-5 md:px-10 pb-6">
            <div className="inline-flex items-center gap-3 rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] px-4 py-2">
              <Map className="w-5 h-5 text-[#B03E00] shrink-0" strokeWidth={2} />
              <p className="text-base md:text-lg leading-none">
                <span className="text-[#acb0cd]">Base Port&nbsp;:</span>{' '}
                <span className="text-[#C0C0C0] font-bold">
                  {bp.basePort?.name || yacht.location}
                  {bp.basePort?.country && ` (${bp.basePort.country})`}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ══ 4 ZONES COLLAPSIBLES ══ */}
      <div className="max-w-5xl mx-auto px-5 md:px-10 py-12 md:py-16 space-y-4">

        {/* Zone 1 — Description */}
        {description && (
          <Collapsible title="Description">
            <p className="text-lg md:text-xl leading-relaxed text-[#acb0cd]">
              {description
                .split(/(?<=\.)\s+/)
                .filter(Boolean)
                .map((sentence, i, arr) => (
                  <span key={i}>
                    {sentence}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
            </p>
          </Collapsible>
        )}

        {/* Zone 2 — Specifications */}
        {hasSpecs && (
          <Collapsible title="Specifications">
            <div className="grid md:grid-cols-2 md:gap-x-12">
              {specsTech.map((s, i) => (
                <SpecRow key={i} icon={s.icon} label={s.label} value={s.value} />
              ))}
            </div>
          </Collapsible>
        )}

        {/* Zone 3 — Amenities & Entertainment */}
        {hasAmenities && (
          <Collapsible title="Amenities & Entertainment">
            <div className="space-y-8">
              {amenities.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#B03E00] mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Amenities
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {amenities.map((a, i) => (
                      <Badge key={i}>{a.label}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {entertainment.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#B03E00] mb-3 flex items-center gap-2">
                    <Tv className="w-4 h-4" /> Entertainment
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {entertainment.map((e, i) => (
                      <Badge key={i}>{e}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Collapsible>
        )}

        {/* Zone 4 — Water Toys */}
        {toys.length > 0 && (
          <Collapsible title="Water Toys">
            <ul className="grid sm:grid-cols-2 gap-x-8">
              {toys.map((t, i) => (
                <li key={i} className="flex items-start gap-3 py-1.5 border-b border-[#C0C0C0]/10">
                  <span className="text-[#B03E00] mt-0.5">›</span>
                  <span className="text-[#acb0cd] text-sm flex-1">{t.label}</span>
                  {t.quantity && (
                    <span className="text-[#C0C0C0] text-xs font-bold border border-[#C0C0C0]/40 rounded-full px-2 py-0.5">
                      ×{t.quantity}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Collapsible>
        )}
      </div>

      {/* ══ CABIN LAYOUT (cards compactes empilées, triées par prestige) ══ */}
      {cabinLayout.length > 0 && (() => {
        const prestige = (label) => {
          const l = (label || '').toLowerCase();
          if (l.includes('master') || l.includes('primary') || l.includes('owner')) return 0;
          if (l.includes('vip')) return 1;
          if (l.includes('double')) return 2;
          if (l.includes('queen') || l.includes('king')) return 3;
          if (l.includes('twin')) return 4;
          if (l.includes('single') || l.includes('pullman')) return 5;
          return 6;
        };
        const sorted = [...cabinLayout].sort((a, b) => prestige(a.label) - prestige(b.label));
        return (
          <div className="max-w-5xl mx-auto px-5 md:px-10 pb-8">
            <div className="text-center mb-8">
              <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.12em] text-[#C0C0C0]">Cabin Layout</h2>
              <div className="relative w-32 h-6 mx-auto mt-3"><Image src="/images/title-line.png" alt="" fill className="object-contain" /></div>
            </div>
            <div className="flex flex-col items-start gap-3">
              {sorted.map((c, i) => (
                <div key={i} className="inline-flex items-center gap-3 rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] px-4 py-2">
                  <BedDouble className="w-5 h-5 text-[#B03E00] shrink-0" strokeWidth={2} />
                  <p className="text-base md:text-lg leading-none">
                    <span className="text-[#acb0cd]">{c.label}&nbsp;:</span>{' '}
                    <span className="text-[#C0C0C0] font-bold">{c.value}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* ══ TENDERS (card dédiée, ouverte) ══ */}
      {tenders.length > 0 && (
        <div className="max-w-5xl mx-auto px-5 md:px-10 pb-8">
          <div className="text-center mb-8">
            <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.12em] text-[#C0C0C0]">Tenders</h2>
            <div className="relative w-32 h-6 mx-auto mt-3"><Image src="/images/title-line.png" alt="" fill className="object-contain" /></div>
          </div>
          <div className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-6 md:p-8">
            <Ship className="w-6 h-6 text-[#B03E00] mb-4 mx-auto" />
            <ul className="space-y-2">
              {tenders.map((t, i) => (
                <li key={i} className="flex items-start gap-3 py-2 border-b border-[#C0C0C0]/10 last:border-b-0">
                  <span className="text-[#B03E00] mt-0.5">›</span>
                  <span className="text-[#acb0cd] text-sm">{typeof t === 'string' ? t : t.label || JSON.stringify(t)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ══ REGIONS AND RATES (regroupé par unité Ankor : Weekly / Daily / Hourly,
            avec sous-regroupement Summer / Winter pour Weekly) ══ */}
      {seasons.length > 0 && (() => {
        const byUnit = { WEEK: [], DAY: [], HOUR: [] };
        seasons.forEach((s) => {
          const u = s?.pricing?.unit;
          if (byUnit[u]) byUnit[u].push(s);
        });
        const unitLabel = { WEEK: '/ week', DAY: '/ day', HOUR: '/ hour' };
        const renderCard = (s, i) => {
          const p = s.pricing || {};
          const total = formatMoney(p.total, p.currency);
          const zones = (s.inclusionZones || [])
            .filter((z) => z?.label)
            .filter((z, idx, arr) => arr.findIndex((zz) => zz.label === z.label) === idx);
          const expandName = (n) => (n || '')
            .replace(/\bMed\b/gi, 'Mediterranean')
            .replace(/\bCarib\b/gi, 'Caribbean')
            .replace(/\bBaha\b/gi, 'Bahamas');
          const parts = expandName(s.name).split(/\s*[:\-–—]\s+/);
          const titleMain = parts[0] || s.name;
          const titleInfo = parts.slice(1).join(' — ');
          return (
            <div key={i} className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-6 flex flex-col items-center gap-4 relative text-center">
              {s.petsAllowed && (
                <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.2em] text-[#B03E00] border border-[#B03E00]/40 rounded-full px-2 py-1">Pets OK</span>
              )}
              <div>
                <h3 className="trajan-regular text-base md:text-lg uppercase tracking-[0.12em] text-[#C0C0C0]">{titleMain}</h3>
                {titleInfo && (
                  <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#acb0cd]/70 mt-1">{titleInfo}</p>
                )}
              </div>
              {total && (
                <p className="trajan-regular text-2xl md:text-3xl text-[#C0C0C0]">
                  {total}<span className="text-sm text-[#acb0cd]/50"> {unitLabel[p.unit] || ''}</span>
                </p>
              )}
              {zones.length > 0 && (
                <div className="w-full">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#B03E00] mb-2">Zones</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {zones.map((z, zi) => (
                      <Badge key={zi}>{z.label}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        };
        const weekly = byUnit.WEEK;
        const weeklyGrouped = { summer: [], winter: [] };
        weekly.forEach((s) => weeklyGrouped[seasonGroup(s)].push(s));
        return (
          <div className="max-w-5xl mx-auto px-5 md:px-10 pb-12 md:pb-16">
            <div className="text-center mb-8">
              <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.12em] text-[#C0C0C0]">Regions and Rates</h2>
              <div className="relative w-32 h-6 mx-auto mt-3"><Image src="/images/title-line.png" alt="" fill className="object-contain" /></div>
            </div>
            <div className="space-y-12">
              {weekly.length > 0 && (
                <div className="space-y-8">
                  <p className="trajan-regular text-xl md:text-2xl uppercase tracking-[0.2em] text-[#C0C0C0] text-center">Weekly Charter</p>
                  {weeklyGrouped.summer.length > 0 && (
                    <div>
                      <p className="trajan-regular text-base uppercase tracking-[0.2em] text-[#B03E00] mb-4 text-center">Summer</p>
                      <div className="grid md:grid-cols-2 gap-5">
                        {weeklyGrouped.summer.map(renderCard)}
                      </div>
                    </div>
                  )}
                  {weeklyGrouped.winter.length > 0 && (
                    <div>
                      <p className="trajan-regular text-base uppercase tracking-[0.2em] text-[#B03E00] mb-4 text-center">Winter</p>
                      <div className="grid md:grid-cols-2 gap-5">
                        {weeklyGrouped.winter.map(renderCard)}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {byUnit.DAY.length > 0 && (
                <div>
                  <p className="trajan-regular text-xl md:text-2xl uppercase tracking-[0.2em] text-[#C0C0C0] text-center mb-6">Daily Charter</p>
                  <div className="grid md:grid-cols-2 gap-5">
                    {byUnit.DAY.map(renderCard)}
                  </div>
                </div>
              )}
              {byUnit.HOUR.length > 0 && (
                <div>
                  <p className="trajan-regular text-xl md:text-2xl uppercase tracking-[0.2em] text-[#C0C0C0] text-center mb-6">Hourly Rates</p>
                  <div className="grid md:grid-cols-2 gap-5">
                    {byUnit.HOUR.map(renderCard)}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ══ GALERIE (v5 design : dots petits espacés) ══ */}
      {gallery.length > 0 && (() => {
        const totalPages = Math.ceil(gallery.length / GALLERY_PAGE);
        const safe = Math.min(galleryPage, totalPages - 1);
        const start = safe * GALLERY_PAGE;
        const slice = gallery.slice(start, start + GALLERY_PAGE);
        const prevG = () => setGalleryPage((p) => (p - 1 + totalPages) % totalPages);
        const nextG = () => setGalleryPage((p) => (p + 1) % totalPages);
        return (
          <div className="max-w-6xl mx-auto px-5 md:px-10 py-14 md:py-20">
            <div className="text-center mb-10">
              <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.12em] text-[#C0C0C0]">Gallery</h2>
              <div className="relative w-32 h-6 mx-auto mt-4"><Image src="/images/title-line.png" alt="" fill className="object-contain" /></div>
              <p className="text-base md:text-lg font-bold tracking-[0.15em] text-[#acb0cd] mt-3">{start + 1}–{Math.min(start + GALLERY_PAGE, gallery.length)} / {gallery.length}</p>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {slice.map((src, i) => {
                  const gi = start + i;
                  return (
                    <button key={gi} onClick={() => setLightbox(gi + 1)} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#C0C0C0] group">
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
              <div className="flex justify-center gap-4 mt-6">
                {Array.from({ length: totalPages }, (_, p) => (
                  <button key={p} onClick={() => setGalleryPage(p)} aria-label={`Page ${p + 1}`}
                    className={`w-2 h-2 rotate-45 transition-colors ${p === safe ? 'bg-[#B03E00]' : 'bg-[#C0C0C0]/40 hover:bg-[#C0C0C0]'}`} />
                ))}
              </div>
            )}
          </div>
        );
      })()}

      {/* ══ CREW (collapsible fermé, après la galerie) ══ */}
      {crew.length > 0 && (
        <div className="max-w-5xl mx-auto px-5 md:px-10 pb-12 md:pb-16">
          <Collapsible title={`The Crew — ${crew.length} members`}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {crew.map((c, i) => {
                const avatar = c.avatar ? getAnkorImageUrl(c.avatar, '320w') : null;
                return (
                  <div key={i} className="rounded-xl border border-[#C0C0C0]/40 bg-[#26272a] overflow-hidden">
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
                        <p className="text-[10px] uppercase tracking-[0.15em] text-[#B03E00] mt-1 truncate">{c.role}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Collapsible>
        </div>
      )}

      {/* ══ CTA ══ */}
      <div className="max-w-4xl mx-auto px-5 md:px-10 pb-16 text-center">
        <a href="/request-quote-test-v10" className="inline-block rounded-xl border-2 border-[#C0C0C0] px-12 py-4 text-sm uppercase tracking-[0.2em] font-medium text-[#B03E00] transition-all hover:bg-[#B03E00]/10 shadow-[0_4px_15px_rgba(192,192,192,0.3)] hover:shadow-[0_6px_20px_rgba(192,192,192,0.4)]">
          Request a Quote
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
              {similar.map((s) => {
                const simg = (s.images || []).filter(Boolean).map((i) => getAnkorImageUrl(i, '640w'))[0] || '/images/yachts/yatch2.jpeg';
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
          <button onClick={closeLb} aria-label="Close" className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full border-2 border-[#C0C0C0] bg-[#26272a] text-[#B03E00] flex items-center justify-center shadow-[0_4px_15px_rgba(192,192,192,0.3)]">
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prevLb(); }} aria-label="Previous" className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border-2 border-[#C0C0C0] bg-[#26272a] text-[#B03E00] flex items-center justify-center shadow-[0_4px_15px_rgba(192,192,192,0.3)]">
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <div className="relative w-[88vw] md:w-[85vw] h-[75vh] md:h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={imgs[lightbox]} alt="" fill className="object-contain" />
          </div>
          <button onClick={(e) => { e.stopPropagation(); nextLb(); }} aria-label="Next" className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border-2 border-[#C0C0C0] bg-[#26272a] text-[#B03E00] flex items-center justify-center shadow-[0_4px_15px_rgba(192,192,192,0.3)]">
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      )}
    </div>
  );
}
