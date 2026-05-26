'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getAnkorImageUrl } from '@/lib/utils';
import { Ruler, Users, BedDouble, Anchor, Ship, Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';

const SECTIONS = [
  { t: 'Interior Design & Engineering', d: 'A timeless combination of refined interiors and impeccable engineering. The most recent refit brought a contemporary freshness to the salons and staterooms while preserving the vessel’s classic character, with full stabilisation underway and at anchor for absolute comfort.' },
  { t: 'Facilities & Entertainment', d: 'Generous sun deck with jacuzzi, an elegant main salon, sky lounge and a sea-level beach club that opens onto the water — the ideal setting for both lively gatherings and quiet escapes.' },
  { t: 'Toys & Crew', d: 'A complete selection of water toys for every guest, served by a discreet, professional crew dedicated to crafting a seamless and bespoke experience throughout your charter.' },
];

const RATES = [
  { season: 'Summer 2026', region: 'West Mediterranean', from: 'From €145,000 / week' },
  { season: 'Winter 2026 — 2027', region: 'Caribbean', from: 'From €140,000 / week' },
];

function Spec({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex flex-col items-center text-center px-3 py-4">
      <Icon className="w-6 h-6 text-[#c2622a] mb-2" />
      <span className="text-[#acb0cd] text-base">{value}</span>
      <span className="text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/50 mt-1">{label}</span>
    </div>
  );
}

export default function YachtDetailClient({ yacht, similar = [] }) {
  const [lightbox, setLightbox] = useState(-1);

  if (!yacht) {
    return <div className="min-h-screen bg-[#26272a] flex items-center justify-center text-[#acb0cd]">Aucun yacht disponible.</div>;
  }

  const imgs = (yacht.images || []).filter(Boolean).map((i) => getAnkorImageUrl(i, '1280w'));
  const hero = imgs[0] || '/images/yachts/yatch2.jpeg';
  const gallery = imgs.slice(1);
  const price = yacht.pricePerHour || yacht.price;
  const year = yacht.year && yacht.refit ? `${yacht.year} / ${yacht.refit}` : (yacht.year || yacht.refit);

  const closeLb = () => setLightbox(-1);
  const prevLb = () => setLightbox((i) => (i - 1 + imgs.length) % imgs.length);
  const nextLb = () => setLightbox((i) => (i + 1) % imgs.length);

  return (
    <div className="bg-[#26272a] text-[#acb0cd]">

      {/* ══ HERO (photo en card) ══ */}
      <div className="pt-24 pb-6 px-4 md:px-10">
        <div className="max-w-6xl mx-auto relative aspect-[16/10] md:aspect-[21/9] rounded-xl overflow-hidden border border-[#C0C0C0] bg-[#3a3b3f]">
          <Image src={hero} alt={yacht.name} fill priority className="object-contain md:object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-5 md:px-10 pb-6 md:pb-10">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#c2622a] mb-2">Luxury Yacht Charter</p>
            <h1 className="trajan-regular text-3xl md:text-6xl uppercase tracking-[0.1em] text-[#C0C0C0]">{yacht.name}</h1>
            {yacht.location && <p className="text-[#acb0cd]/80 text-sm mt-1">{yacht.location}</p>}
          </div>
        </div>
      </div>

      {/* ══ BLOC ENTÊTE : prix + enquire + specs ══ */}
      <div className="border-b border-[#C0C0C0]/20">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-8 flex flex-col lg:flex-row lg:items-center gap-8">
          <div className="flex-1">
            {price && <p className="trajan-regular text-2xl md:text-3xl text-[#acb0cd]">From {price}<span className="text-sm text-[#acb0cd]/50"> / week</span></p>}
            <a href="/request-quote-test-v10" className="inline-block mt-4 rounded-xl border-2 border-[#C0C0C0] px-8 py-3 text-sm uppercase tracking-[0.2em] font-medium text-[#B03E00] transition-all hover:bg-[#B03E00]/10 shadow-[0_4px_15px_rgba(192,192,192,0.3)] hover:shadow-[0_6px_20px_rgba(192,192,192,0.4)]">
              Enquire about {yacht.name}
            </a>
          </div>
          <div className="lg:flex-[1.4] grid grid-cols-3 sm:grid-cols-6 rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] divide-x divide-[#C0C0C0]/20">
            <Spec icon={Anchor} label="Builder" value={yacht.make} />
            <Spec icon={Ruler} label="Length" value={yacht.length} />
            <Spec icon={Calendar} label="Year" value={year} />
            <Spec icon={Users} label="Guests" value={yacht.guests || yacht.capacity} />
            <Spec icon={BedDouble} label="Cabins" value={yacht.cabins} />
            <Spec icon={Ship} label="Crew" value={yacht.crew} />
          </div>
        </div>
      </div>

      {/* ══ DESCRIPTION ══ */}
      <div className="max-w-4xl mx-auto px-5 md:px-10 py-14 md:py-20 text-center">
        <div className="relative w-40 h-7 mx-auto mb-8">
          <Image src="/images/title-line.png" alt="" fill className="object-contain" />
        </div>
        <p className="text-lg md:text-xl leading-relaxed text-[#acb0cd]">
          {yacht.description || `${yacht.name} offers a classic combination of elegant interiors, generous outdoor spaces and an exceptional crew — the perfect canvas for an unforgettable charter across the world’s most beautiful waters.`}
        </p>
      </div>

      {/* ══ SECTIONS ══ */}
      <div className="max-w-5xl mx-auto px-5 md:px-10 pb-10 grid md:grid-cols-3 gap-6">
        {SECTIONS.map((s, i) => (
          <div key={i} className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-6">
            <h3 className="trajan-regular text-sm uppercase tracking-[0.15em] text-[#C0C0C0] mb-3">{s.t}</h3>
            <p className="text-sm text-[#acb0cd]/80 leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>

      {/* ══ GALERIE ══ */}
      {gallery.length > 0 && (
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-14 md:py-20">
          <div className="text-center mb-10">
            <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.12em] text-[#C0C0C0]">Gallery</h2>
            <div className="relative w-32 h-6 mx-auto mt-4"><Image src="/images/title-line.png" alt="" fill className="object-contain" /></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {gallery.map((src, i) => (
              <button key={i} onClick={() => setLightbox(i + 1)} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#C0C0C0] group">
                <Image src={src} alt={`${yacht.name} ${i + 2}`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ══ SPECIFICATIONS ══ */}
      <div className="max-w-4xl mx-auto px-5 md:px-10 pb-14 md:pb-20">
        <div className="text-center mb-8">
          <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.12em] text-[#C0C0C0]">Specifications</h2>
        </div>
        <div className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] divide-y divide-[#C0C0C0]/20">
          {[
            ['Builder', yacht.make],
            ['Length', yacht.length],
            ['Year built / refit', year],
            ['Guests', yacht.guests || yacht.capacity],
            ['Cabins', yacht.cabins],
            ['Crew', yacht.crew],
            ['Type', yacht.type && yacht.type.charAt(0).toUpperCase() + yacht.type.slice(1)],
            ['Base port', yacht.location],
          ].filter(([, v]) => v).map(([k, v]) => (
            <div key={k} className="flex items-center justify-between px-5 py-3.5 text-sm">
              <span className="text-[#acb0cd]/50 uppercase tracking-[0.15em] text-[11px]">{k}</span>
              <span className="text-[#acb0cd]">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══ REGIONS & RATES ══ */}
      <div className="max-w-4xl mx-auto px-5 md:px-10 pb-14 md:pb-20">
        <div className="text-center mb-8">
          <h2 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.12em] text-[#C0C0C0]">Regions &amp; Rates</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {RATES.map((r, i) => (
            <div key={i} className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-6 text-center">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#c2622a] mb-2">{r.season}</p>
              <p className="trajan-regular text-lg text-[#C0C0C0] uppercase tracking-[0.1em] mb-2">{r.region}</p>
              <p className="text-[#acb0cd]">{r.from}</p>
            </div>
          ))}
        </div>
      </div>

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
          <button onClick={closeLb} className="absolute top-5 right-5 text-[#C0C0C0] hover:text-[#B03E00]"><X className="w-7 h-7" /></button>
          <button onClick={(e) => { e.stopPropagation(); prevLb(); }} className="absolute left-4 text-[#C0C0C0] hover:text-[#B03E00]"><ChevronLeft className="w-9 h-9" /></button>
          <div className="relative w-[90vw] h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={imgs[lightbox]} alt="" fill className="object-contain" />
          </div>
          <button onClick={(e) => { e.stopPropagation(); nextLb(); }} className="absolute right-4 text-[#C0C0C0] hover:text-[#B03E00]"><ChevronRight className="w-9 h-9" /></button>
        </div>
      )}
    </div>
  );
}
