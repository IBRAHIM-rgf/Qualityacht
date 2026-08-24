'use client';

// ══ Hotel Caraibes — cartes "piscine privee" ══
// Grille de photos aeriennes (resort / cote). Au CLIC, la carte s'agrandit dans une
// modale et le NOM apparait, avec lieu, etoiles et une courte description (critere :
// piscine privee). AUCUN lien. Photos = vues aeriennes GENERIQUES de la mediatheque
// (pas les vrais hotels) — selection a titre indicatif, aucune affiliation.

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { media } from '@/lib/quality-media';

// Pool de photos aeriennes / cotes (generiques) pour illustrer les cartes.
const POOL = [
  ...media({ cat: 'aerial', kind: 'image' }),
  ...media({ cat: 'beach', kind: 'image' }),
].map((m) => m.src);

// Selection d'adresses 5 etoiles reputees pour leurs villas a piscine privee.
// (Editorial / a titre indicatif — voir disclaimer sur la page.)
const HOTELS = [
  { name: 'Eden Rock', location: 'St-Barthélemy', stars: 5, desc: 'Suites perchées sur le rocher, piscines à débordement privées face à la baie de St-Jean.' },
  { name: 'Cheval Blanc Isle de France', location: 'St-Barthélemy', stars: 5, desc: 'Villas les pieds dans le sable et piscines privées sur la baie des Flamands.' },
  { name: 'Rosewood Little Dix Bay', location: 'Virgin Gorda, BVI', stars: 5, desc: 'Baie préservée, villas à piscine privée ouvertes sur le récif.' },
  { name: 'Amanyara', location: 'Providenciales, Turks & Caicos', stars: 5, desc: 'Pavillons épurés avec piscines privées face à l’océan.' },
  { name: 'Jade Mountain', location: 'Sainte-Lucie', stars: 5, desc: 'Sanctuaires ouverts, piscines à débordement privées face aux Pitons.' },
  { name: 'Sugar Beach, A Viceroy Resort', location: 'Sainte-Lucie', stars: 5, desc: 'Villas dans la forêt tropicale, piscines privées entre les deux Pitons.' },
  { name: 'Belmond Cap Juluca', location: 'Anguilla', stars: 5, desc: 'Architecture mauresque en front de mer, suites à piscine privée sur Maundays Bay.' },
  { name: 'Sandy Lane', location: 'Barbade', stars: 5, desc: 'Grande dame de la côte ouest, villas à piscine privée et service de majordome.' },
].map((h, i) => ({ ...h, img: POOL[i % POOL.length] }));

function Stars({ n, className = '' }) {
  return (
    <span className={`tracking-[0.2em] text-[#bd9973] ${className}`} aria-label={`${n} étoiles`}>
      {'★'.repeat(n)}
    </span>
  );
}

export default function HotelPoolCards() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (active == null) return;
    const onKey = (e) => { if (e.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [active]);

  const hotel = active != null ? HOTELS[active] : null;

  return (
    <section className="px-6 md:px-14 py-14 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* En-tete + disclaimer */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-[#B87333] font-medium mb-3">Private Pool · Selection</p>
          <h2 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.1em] text-[#C0C0C0]">Palaces With A Private Pool</h2>
          <div className="relative w-28 md:w-36 h-5 mx-auto mt-4">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
          <p className="mt-5 max-w-2xl mx-auto text-[13px] md:text-sm text-[#8b90a0] leading-relaxed">
            A curated shortlist for our charter guests — chosen on one non-negotiable criterion: a truly private pool.
            Selection for reference only; Qualityacht has no affiliation or commercial link with these properties.
          </p>
        </div>

        {/* Grille de cartes photo (clic pour agrandir) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {HOTELS.map((h, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#C0C0C0]/15 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.75)] cursor-pointer text-left"
            >
              {h.img && (
                <Image src={h.img} alt="" fill sizes="(max-width:768px) 45vw, 300px"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" style={{ filter: 'saturate(1.1) contrast(1.03)' }} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              {/* etoiles discretes + invite au clic */}
              <div className="absolute top-3 left-3"><Stars n={h.stars} className="text-[11px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]" /></div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C0C0C0]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">View</span>
                <span className="w-8 h-8 rounded-full border border-[#C0C0C0]/40 bg-[#26272a]/60 backdrop-blur-sm flex items-center justify-center text-[#C0C0C0] text-lg leading-none group-hover:border-[#B87333] group-hover:text-[#B87333] transition-colors">+</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modale : carte agrandie + nom / lieu / etoiles / desc (sans lien) */}
      {hotel && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm" onClick={() => setActive(null)}>
          <div className="relative w-full max-w-4xl bg-[#2e2f32] rounded-2xl border border-[#C0C0C0]/25 overflow-hidden shadow-2xl grid md:grid-cols-2" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[360px]">
              {hotel.img && <Image src={hotel.img} alt="" fill sizes="(max-width:768px) 100vw, 560px" className="object-cover" style={{ filter: 'saturate(1.1)' }} />}
              <div className="absolute inset-0 md:hidden bg-gradient-to-t from-[#2e2f32] via-transparent to-transparent" />
            </div>
            <div className="p-6 md:p-8 flex flex-col">
              <Stars n={hotel.stars} className="text-sm mb-4" />
              <h3 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.06em] text-[#C0C0C0] leading-tight">{hotel.name}</h3>
              <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-[#B87333]">{hotel.location}</p>
              <p className="mt-5 text-sm md:text-[15px] leading-relaxed text-[#acb0cd]">{hotel.desc}</p>
              <p className="mt-auto pt-6 text-[10px] text-[#8b90a0]/70 italic">Reference only — no affiliation or commercial link.</p>
            </div>
            <button onClick={() => setActive(null)} aria-label="Fermer"
              className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full border border-[#C0C0C0]/30 bg-[#26272a]/70 text-[#acb0cd] hover:border-[#B87333] hover:text-[#B87333] transition-colors">✕</button>
          </div>
        </div>
      )}
    </section>
  );
}
