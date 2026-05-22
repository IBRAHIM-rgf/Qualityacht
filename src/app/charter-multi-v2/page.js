'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Calendar, Users, Check } from 'lucide-react';

const BOATS = [
  { id: 1, name: 'OKTO',       img: '/images/yachts/yatch2.jpeg',                 length: '66 m', guests: 12, type: 'Motor',     price: '€ 600,000' },
  { id: 2, name: 'SH DIANA',   img: '/images/yachts/yacht1.jpeg',                 length: '38 m', guests: 10, type: 'Sailing',   price: '€ 180,000' },
  { id: 3, name: 'KING BENJI', img: '/images/pagesCaraibes/cocomer.jpeg',         length: '50 m', guests: 11, type: 'Motor',     price: '€ 350,000' },
  { id: 4, name: 'LUNA ROSSA', img: '/images/pagesCaraibes/thankyou-sail.jpg',    length: '44 m', guests: 8,  type: 'Catamaran', price: '€ 220,000' },
];

const inputClass =
  'w-full bg-[#3a3b3f] border border-[#C0C0C0] rounded-xl px-4 py-3 text-[#acb0cd] text-sm placeholder-[#6a6b6e] focus:outline-none focus:border-[#c2622a] transition-colors';

export default function Page() {
  const [selected, setSelected] = useState([]);

  const toggle = (id) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div className="min-h-screen bg-[#26272a] text-[#acb0cd] pt-24 pb-20 px-4">
      <div className="trajan-regular font-bold text-2xl md:text-4xl text-center uppercase tracking-[0.15em] mb-3 text-[#C0C0C0]">
        Charter Details — Approche 2
      </div>
      <p className="text-center text-[#acb0cd]/70 text-sm mb-10">Galerie multi-sélection · clique les bateaux, dates &amp; invités communs au voyage</p>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {BOATS.map((b) => {
            const on = selected.includes(b.id);
            return (
              <button key={b.id} onClick={() => toggle(b.id)}
                className={`group relative text-left rounded-xl overflow-hidden border-2 transition-all ${on ? 'border-[#B03E00]' : 'border-[#C0C0C0] hover:border-[#B03E00]'}`}>
                <div className="relative aspect-[3/4]">
                  <Image src={b.img} alt={b.name} fill className={`object-cover transition-all ${on ? 'brightness-100' : 'brightness-75 group-hover:brightness-90'}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  {/* coche sélection */}
                  <span className={`absolute top-3 right-3 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${on ? 'bg-[#B03E00] border-[#B03E00]' : 'border-[#C0C0C0] bg-black/30'}`}>
                    {on && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="trajan-regular text-sm text-[#C0C0C0] uppercase tracking-[0.1em]">{b.name}</h3>
                    <p className="text-[11px] text-[#acb0cd]/80 mt-1">{b.length} · {b.guests} guests · {b.type}</p>
                    <p className="text-[11px] text-[#acb0cd]">{b.price}/wk</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dates & invités communs */}
        <div className="mt-8 rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-5">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#acb0cd] mb-4">Trip details</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd] mb-1">Departure</label>
              <input type="date" className={`${inputClass} [color-scheme:dark]`} />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd] mb-1">Return</label>
              <input type="date" className={`${inputClass} [color-scheme:dark]`} />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd] mb-1">Guests</label>
              <input type="number" min="1" max="50" placeholder="e.g. 8" className={inputClass} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 mt-8">
          <p className="text-sm text-[#acb0cd]">
            <span className="text-[#B03E00] text-lg font-medium">{selected.length}</span> yacht{selected.length !== 1 ? 's' : ''} selected
          </p>
          <button className="rounded-xl border-2 border-[#C0C0C0] px-10 py-4 text-sm uppercase tracking-[0.2em] font-medium text-[#B03E00] transition-all hover:bg-[#B03E00]/10 shadow-[0_4px_15px_rgba(192,192,192,0.3)] hover:shadow-[0_6px_20px_rgba(192,192,192,0.4)]">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
