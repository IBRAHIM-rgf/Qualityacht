'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Users, Ruler, Ship, Trash2 } from 'lucide-react';

const INITIAL = [
  { id: 1, name: 'OKTO',       img: '/images/yachts/yatch2.jpeg',                 length: '66 m', guests: 12, type: 'Motor',     price: '€ 600,000' },
  { id: 2, name: 'SH DIANA',   img: '/images/yachts/yacht1.jpeg',                 length: '38 m', guests: 10, type: 'Sailing',   price: '€ 180,000' },
  { id: 3, name: 'KING BENJI', img: '/images/pagesCaraibes/cocomer.jpeg',         length: '50 m', guests: 11, type: 'Motor',     price: '€ 350,000' },
  { id: 4, name: 'LUNA ROSSA', img: '/images/pagesCaraibes/thankyou-sail.jpg',    length: '44 m', guests: 8,  type: 'Catamaran', price: '€ 220,000' },
];

const inputClass =
  'w-full bg-[#3a3b3f] border border-[#C0C0C0] rounded-xl px-4 py-2.5 text-[#acb0cd] text-sm placeholder-[#6a6b6e] focus:outline-none focus:border-[#c2622a] transition-colors';

export default function Page() {
  const [boats, setBoats] = useState(() => INITIAL.map((b) => ({ ...b, startDate: '', endDate: '', guests: '' })));

  const remove = (id) => setBoats((bs) => bs.filter((b) => b.id !== id));
  const update = (id, key, val) => setBoats((bs) => bs.map((b) => (b.id === id ? { ...b, [key]: val } : b)));

  return (
    <div className="min-h-screen bg-[#26272a] text-[#acb0cd] pt-24 pb-20 px-4">
      <div className="trajan-regular font-bold text-2xl md:text-4xl text-center uppercase tracking-[0.15em] mb-3 text-[#C0C0C0]">
        Your Quote — Approche 1
      </div>
      <p className="text-center text-[#acb0cd]/70 text-sm mb-10">Panier · cards empilées, dates &amp; invités par bateau, suppression à droite</p>

      <div className="max-w-3xl mx-auto space-y-5">
        {boats.length === 0 && (
          <div className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-8 text-center text-[#acb0cd]/70">
            Votre devis est vide.
          </div>
        )}

        {boats.map((b) => (
          <div key={b.id} className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] overflow-hidden">
            <div className="flex flex-col sm:flex-row gap-4 p-4">
              <div className="relative w-full sm:w-44 h-40 sm:h-28 shrink-0 rounded-lg overflow-hidden border border-[#C0C0C0]">
                <Image src={b.img} alt={b.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="trajan-regular text-lg text-[#acb0cd] uppercase tracking-[0.1em]">{b.name}</h3>
                <div className="flex flex-wrap gap-2 mt-2 text-xs">
                  <span className="inline-flex items-center gap-1 border border-[#C0C0C0] rounded-lg px-2.5 py-1 bg-[#3a3b3f] text-[#acb0cd]"><Ruler className="w-3 h-3 text-[#c2622a]" />{b.length}</span>
                  <span className="inline-flex items-center gap-1 border border-[#C0C0C0] rounded-lg px-2.5 py-1 bg-[#3a3b3f] text-[#acb0cd]"><Users className="w-3 h-3 text-[#c2622a]" />{b.guests}</span>
                  <span className="inline-flex items-center gap-1 border border-[#C0C0C0] rounded-lg px-2.5 py-1 bg-[#3a3b3f] text-[#acb0cd]"><Ship className="w-3 h-3 text-[#c2622a]" />{b.type}</span>
                  <span className="inline-flex items-center gap-1 border border-[#C0C0C0] rounded-lg px-2.5 py-1 bg-[#3a3b3f] text-[#acb0cd]">{b.price}/wk</span>
                </div>
              </div>
              <button onClick={() => remove(b.id)} title="Retirer du devis"
                className="shrink-0 self-start w-10 h-10 rounded-xl border border-[#C0C0C0] text-[#acb0cd] flex items-center justify-center hover:text-[#B03E00] hover:border-[#B03E00] transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="border-t border-[#C0C0C0]/40 p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd] mb-1">Departure</label>
                <input type="date" value={b.startDate} onChange={(e) => update(b.id, 'startDate', e.target.value)} className={`${inputClass} [color-scheme:dark]`} />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd] mb-1">Return</label>
                <input type="date" value={b.endDate} onChange={(e) => update(b.id, 'endDate', e.target.value)} className={`${inputClass} [color-scheme:dark]`} />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd] mb-1">Guests</label>
                <input type="number" min="1" max="50" value={b.guests} onChange={(e) => update(b.id, 'guests', e.target.value)} className={inputClass} placeholder={`max ${b.guests}`} />
              </div>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between gap-4 pt-4">
          <p className="text-sm text-[#acb0cd]">
            <span className="text-[#B03E00] text-lg font-medium">{boats.length}</span> yacht{boats.length !== 1 ? 's' : ''} in your quote
          </p>
          <button className="rounded-xl border-2 border-[#C0C0C0] px-10 py-4 text-sm uppercase tracking-[0.2em] font-medium text-[#B03E00] transition-all hover:bg-[#B03E00]/10 shadow-[0_4px_15px_rgba(192,192,192,0.3)] hover:shadow-[0_6px_20px_rgba(192,192,192,0.4)]">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
