'use client';

// Calendrier des regates Bahamas 2026 par zone (client 2026-10-09) : une carte par regate,
// qui s'ouvre au clic (description, parcours, bateaux admis, public, niveau, lien).

import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { CARDS } from '../../../charters/destinations/bahamas/bahamasGroups';
import { BAHAMAS_REGATTA_ZONES, BAHAMAS_REGATTA_TYPES } from './regattas-bahamas';

const LABEL = 'block text-[10px] uppercase tracking-[0.2em] text-[#c2622a] mb-1';

// Photo de la zone (client 2026-10-09 : cases avec photo comme la page regate Caraibes) :
// memes photos couleur que les 8 cases Bahamas (bahamasGroups).
const ZONE_PHOTO = {
  nassau: 1, grandbah: 2, exuma: 3, abacos: 4, eleuthera: 5, andros: 6, bimini: 7, catlong: 8,
};
const zonePhoto = (id) => `${CARDS}/card-${ZONE_PHOTO[id] || 1}-color.jpg`;

const CHIP = 'inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] tracking-wide bg-[#26272a] border border-[#C0C0C0]/20 text-[#acb0cd]';

// Card calquee sur RegattaEventCard (/only-for-you/regatta/carribbean) : photo en tete
// avec date, nom et lieu par-dessus, puis etiquettes et « Read more ».
function EventCard({ ev, zoneId, index = 0 }) {
  const [open, setOpen] = useState(false);
  const delay = (index * 1.5) % 7;
  return (
    <article className="rounded-2xl border border-[#C0C0C0]/30 bg-[#3a3b3f]/80 backdrop-blur-sm overflow-hidden transition-all hover:border-[#B03E00]/60">
      <div className="relative h-44 md:h-52 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${encodeURI(zonePhoto(zoneId))}')`, opacity: 0.55 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#26272a]/40 via-[#26272a]/25 to-[#26272a]/75" />
        <span className="absolute top-3 right-3 inline-block px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold tracking-wide bg-[#B03E00] text-[#C0C0C0] whitespace-nowrap shadow-lg z-10">
          {ev.dates}
        </span>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5"
          style={{ animation: 'cardTextFade 7s ease-in-out infinite', animationDelay: `${delay}s` }}>
          <h3 className="trajan-regular font-bold text-sm md:text-base uppercase tracking-[0.12em] text-[#C0C0C0] leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            {ev.name}
          </h3>
          <p className="trajan-regular text-base md:text-xl uppercase tracking-[0.15em] text-[#acb0cd] mt-3 flex items-center justify-center gap-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 inline text-[#c2622a]" /> {ev.loc}
          </p>
        </div>
      </div>
      <div className="px-5 pt-4 pb-4 flex flex-wrap gap-1.5 items-center">
        <span className={`${CHIP} uppercase`}>{ev.type}</span>
        {[ev.boats, ev.level, ev.audience].filter(Boolean).map((info, i) => (
          <span key={i} className={`${CHIP} text-[#acb0cd]/90`}>{info}</span>
        ))}
      </div>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}
        className="w-full px-5 py-2 text-[11px] uppercase tracking-[0.2em] text-[#c2622a] border-t border-[#C0C0C0]/15 hover:bg-[#B03E00]/5 transition-colors">
        {open ? 'Show less' : 'Read more'}
      </button>
      {open && (
        <div className="px-5 py-4 border-t border-[#C0C0C0]/15 space-y-4 text-xs md:text-sm text-[#acb0cd]/80">
          <p className="leading-relaxed">{ev.desc}</p>
          <div>
            <span className={LABEL}>Race Course</span>
            <div className="flex flex-wrap gap-2">
              {ev.course.map((c) => (
                <span key={c} className="rounded-full bg-[#26272a] px-3 py-1 text-[12px] text-[#acb0cd]">{c}</span>
              ))}
            </div>
          </div>
          <div>
            <span className={LABEL}>More Info</span>
            <a href={ev.url} target="_blank" rel="noopener noreferrer" className="text-[#c2622a] hover:underline break-all">{ev.url} ↗</a>
          </div>
        </div>
      )}
    </article>
  );
}

export default function RegattaBahamasClient() {
  return (
    <div className="space-y-14 md:space-y-20">
      <style>{`
        @keyframes cardTextFade {
          0%, 100% { opacity: 0; }
          25%, 75% { opacity: 1; }
        }
      `}</style>
      <div className="flex flex-wrap justify-center gap-2">
        {BAHAMAS_REGATTA_TYPES.map((t) => (
          <span key={t} className="rounded-full border border-[#c2622a]/60 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#c2622a]">{t}</span>
        ))}
      </div>
      {BAHAMAS_REGATTA_ZONES.map((z, zi) => (
        <section key={z.id}>
          <div className="mb-6 text-center">
            <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">{z.title}</h2>
            <p className="mt-2 text-[13px] uppercase tracking-[0.14em] text-[#8b90a0]">{z.sub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            {z.events.map((ev, ei) => <EventCard key={ev.name} ev={ev} zoneId={z.id} index={zi * 2 + ei} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
