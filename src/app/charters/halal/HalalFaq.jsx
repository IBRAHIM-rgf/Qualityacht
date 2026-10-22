'use client';

import { useState } from 'react';

// FAQ "Discreet Details" — halal private charter.
import { HALAL_FAQ as FAQ } from './halalFaqData';

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between py-5 text-left group cursor-pointer gap-4"
      >
        <span className="trajan-regular text-[#acb0cd] text-sm md:text-base uppercase tracking-[0.12em] group-hover:text-[#c2622a] transition-colors duration-300 leading-snug">
          {q}
        </span>
        <span className={`text-[#B87333] text-3xl leading-none mt-0.5 shrink-0 font-light transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-[#acb0cd]/80 text-sm md:text-[15px] leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

// extra : questions propres a une region, affichees en premier (client 2026-10-23).
// withSection : ajoute le meme cadre que la page Halal (fond nuages, « Discreet Details »),
// utilise sur les pages regions.
// only : n'affiche que `extra` (pages du silo /halal-yacht-charter/<page>).
export default function HalalFaq({ extra = [], withSection = false, only = false } = {}) {
  const list = (
    <div className="max-w-3xl mx-auto">
      {(only ? extra : [...extra, ...FAQ]).map((item) => (
        <FaqItem key={item.q} {...item} />
      ))}
    </div>
  );
  if (!withSection) return list;
  return (
    <section
      className="relative py-16 md:py-24 px-6 md:px-14 bg-[#2e2f32]"
      style={{ backgroundImage: "url('/images/nuagesAncien.png')", backgroundSize: 'contain', backgroundPosition: 'center' }}
    >
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#B87333] mb-4">Discreet Details</p>
        <p className="text-[#acb0cd] text-base md:text-lg leading-relaxed">
          For guests who value discretion, refinement, and a fully tailored experience.
        </p>
      </div>
      {list}
    </section>
  );
}
