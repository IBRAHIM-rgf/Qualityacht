'use client';

// Calendrier des regates Bahamas 2026 par zone (client 2026-10-09) : une carte par regate,
// qui s'ouvre au clic (description, parcours, bateaux admis, public, niveau, lien).

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { BAHAMAS_REGATTA_ZONES, BAHAMAS_REGATTA_TYPES } from './regattas-bahamas';

const LABEL = 'block text-[11px] uppercase tracking-[0.22em] text-[#B87333] font-semibold mb-1.5';

function EventCard({ ev }) {
  const [open, setOpen] = useState(false);
  return (
    <article className={`rounded-2xl border bg-[#2e2f32] transition-colors ${open ? 'border-[#c2622a]/70' : 'border-[#C0C0C0]/20 hover:border-[#c2622a]/50'}`}>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}
        className="w-full flex items-start justify-between gap-4 p-5 md:p-6 text-left">
        <div className="min-w-0 flex-1">
          <h3 className="trajan-regular text-base md:text-lg uppercase tracking-[0.06em] text-[#C0C0C0] leading-snug">{ev.name}</h3>
          <p className="mt-1 text-[14px] text-[#acb0cd]">{ev.loc}</p>
          <span className="mt-3 inline-block rounded-full border border-[#c2622a]/60 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#c2622a]">{ev.type}</span>
        </div>
        <div className="max-w-[40%] flex flex-col items-end gap-2">
          <span className="text-[12px] md:text-[13px] uppercase tracking-[0.1em] text-[#C0C0C0] text-right">{ev.dates}</span>
          <ChevronDown className={`w-5 h-5 text-[#acb0cd] transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>
      {open && (
        <div className="px-5 md:px-6 pb-6 space-y-5 border-t border-[#C0C0C0]/10 pt-5">
          <p className="text-[15px] leading-relaxed text-[#acb0cd]">{ev.desc}</p>
          <div>
            <span className={LABEL}>Race Course</span>
            <div className="flex flex-wrap gap-2">
              {ev.course.map((c) => (
                <span key={c} className="rounded-full bg-[#3a3b3f] px-3 py-1 text-[13px] text-[#acb0cd]">{c}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div><span className={LABEL}>Boats Allowed</span><p className="text-[14px] text-[#acb0cd]">{ev.boats}</p></div>
            <div><span className={LABEL}>Audience</span><p className="text-[14px] text-[#acb0cd]">{ev.audience}</p></div>
          </div>
          <div><span className={LABEL}>Difficulty</span><p className="text-[14px] text-[#acb0cd]">{ev.level}</p></div>
          <div>
            <span className={LABEL}>More Info</span>
            <a href={ev.url} target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#c2622a] hover:underline break-all">{ev.url} ↗</a>
          </div>
        </div>
      )}
    </article>
  );
}

export default function RegattaBahamasClient() {
  return (
    <div className="space-y-14 md:space-y-20">
      <div className="flex flex-wrap justify-center gap-2">
        {BAHAMAS_REGATTA_TYPES.map((t) => (
          <span key={t} className="rounded-full border border-[#c2622a]/60 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#c2622a]">{t}</span>
        ))}
      </div>
      {BAHAMAS_REGATTA_ZONES.map((z) => (
        <section key={z.id}>
          <div className="mb-6 text-center">
            <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">{z.title}</h2>
            <p className="mt-2 text-[13px] uppercase tracking-[0.14em] text-[#8b90a0]">{z.sub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            {z.events.map((ev) => <EventCard key={ev.name} ev={ev} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
