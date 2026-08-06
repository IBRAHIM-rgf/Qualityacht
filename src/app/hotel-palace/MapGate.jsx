'use client';

// Verrou : la carte (children) ne s'affiche QU'APRES avoir coche la reconnaissance
// que les etablissements ne sont pas affilies a Qualityacht. Palette maison.

import { useState } from 'react';

export default function MapGate({ children, note }) {
  const [checked, setChecked] = useState(false);
  const [ok, setOk] = useState(false);
  if (ok) return children;
  return (
    <section className="bg-[#26272a] px-6 md:px-14 py-14 md:py-20">
      <div className="max-w-md mx-auto text-center rounded-2xl border border-[#C0C0C0]/20 bg-[#2e2f32] px-6 py-10 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]">
        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-[#B87333] font-medium mb-4">Before you explore</p>
        <p className="text-[13px] md:text-sm text-[#acb0cd] leading-relaxed mb-6">{note}</p>
        <label className="flex items-start gap-3 text-left text-[13px] text-[#acb0cd] cursor-pointer mb-6">
          <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} className="mt-0.5 w-4 h-4 accent-[#c2622a] shrink-0" />
          <span>I understand this is an independent selection and that Qualityacht is not affiliated with these establishments.</span>
        </label>
        <button
          type="button"
          disabled={!checked}
          onClick={() => setOk(true)}
          style={{ color: '#c2622a', backgroundColor: '#26272a', borderColor: '#C0C0C0' }}
          className="trajan-regular text-xs uppercase tracking-[0.25em] px-8 py-3.5 border rounded-full transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:bg-[#c2622a] enabled:hover:text-[#26272a] enabled:hover:border-[#c2622a] enabled:cursor-pointer"
        >
          Show the map
        </button>
      </div>
    </section>
  );
}
