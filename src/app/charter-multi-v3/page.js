'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Users, Ruler, Ship, ChevronLeft, ChevronRight, X } from 'lucide-react';

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
  const [idx, setIdx] = useState(0);

  const safeIdx = boats.length === 0 ? 0 : idx >= boats.length ? boats.length - 1 : idx;
  const b = boats[safeIdx];

  const prev = () => setIdx((i) => (i - 1 + boats.length) % boats.length);
  const next = () => setIdx((i) => (i + 1) % boats.length);
  const remove = (id) =>
    setBoats((bs) => {
      const nb = bs.filter((x) => x.id !== id);
      if (idx >= nb.length) setIdx(Math.max(0, nb.length - 1));
      return nb;
    });
  const update = (id, key, val) => setBoats((bs) => bs.map((x) => (x.id === id ? { ...x, [key]: val } : x)));

  return (
    <div className="min-h-screen bg-[#26272a] text-[#acb0cd] pt-24 pb-20 px-4">
      <div className="trajan-regular font-bold text-2xl md:text-4xl text-center uppercase tracking-[0.15em] mb-3 text-[#C0C0C0]">
        Your Quote — Approche 3
      </div>
      <p className="text-center text-[#acb0cd]/70 text-sm mb-10">Panier · carrousel des bateaux, miniatures en bas, suppression à tout moment</p>

      <div className="max-w-3xl mx-auto">
        {boats.length === 0 ? (
          <div className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-8 text-center text-[#acb0cd]/70">
            Votre devis est vide.
          </div>
        ) : (
          <>
            {/* Carrousel */}
            <div className="relative">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-[#C0C0C0] bg-[#3a3b3f]">
                <Image key={b.id} src={b.img} alt={b.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <button onClick={() => remove(b.id)} title="Retirer du devis"
                  className="absolute top-3 right-3 w-9 h-9 rounded-full border border-[#C0C0C0] bg-black/40 text-[#C0C0C0] flex items-center justify-center hover:text-[#B03E00] hover:border-[#B03E00] transition-colors">
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="trajan-regular text-2xl text-[#C0C0C0] uppercase tracking-[0.1em]">{b.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="inline-flex items-center gap-1 border border-[#C0C0C0] rounded-lg px-2.5 py-1 bg-black/40 text-[#acb0cd] text-xs"><Ruler className="w-3 h-3 text-[#c2622a]" />{b.length}</span>
                    <span className="inline-flex items-center gap-1 border border-[#C0C0C0] rounded-lg px-2.5 py-1 bg-black/40 text-[#acb0cd] text-xs"><Users className="w-3 h-3 text-[#c2622a]" />{b.guests}</span>
                    <span className="inline-flex items-center gap-1 border border-[#C0C0C0] rounded-lg px-2.5 py-1 bg-black/40 text-[#acb0cd] text-xs"><Ship className="w-3 h-3 text-[#c2622a]" />{b.type}</span>
                    <span className="inline-flex items-center gap-1 border border-[#C0C0C0] rounded-lg px-2.5 py-1 bg-black/40 text-[#acb0cd] text-xs">{b.price}/wk</span>
                  </div>
                </div>
              </div>
              {boats.length > 1 && (
                <>
                  <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-[#C0C0C0] bg-black/40 text-[#C0C0C0] flex items-center justify-center hover:text-[#B03E00] hover:border-[#B03E00] transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-[#C0C0C0] bg-black/40 text-[#C0C0C0] flex items-center justify-center hover:text-[#B03E00] hover:border-[#B03E00] transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {boats.map((x, i) => (
                <button key={x.id} onClick={() => setIdx(i)} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === safeIdx ? 'bg-[#B03E00]' : 'bg-[#C0C0C0]/40'}`} />
              ))}
            </div>

            {/* Dates du bateau courant */}
            <div className="mt-5 rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                <input type="number" min="1" max="50" value={b.guests} onChange={(e) => update(b.id, 'guests', e.target.value)} placeholder={`max ${b.guests}`} className={inputClass} />
              </div>
            </div>

            {/* Bandeau miniatures */}
            <div className="mt-8">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#acb0cd] mb-3">Your quote ({boats.length})</p>
              <div className="flex gap-3 flex-wrap">
                {boats.map((x, i) => (
                  <div key={x.id} className="relative w-24">
                    <button onClick={() => setIdx(i)} className={`block relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${i === safeIdx ? 'border-[#B03E00]' : 'border-[#C0C0C0]'}`}>
                      <Image src={x.img} alt={x.name} fill className="object-cover" />
                    </button>
                    <button onClick={() => remove(x.id)} className="absolute -top-2 -right-2 w-6 h-6 rounded-full border border-[#C0C0C0] bg-[#26272a] text-[#acb0cd] flex items-center justify-center hover:text-[#B03E00] hover:border-[#B03E00]">
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <p className="text-[9px] uppercase tracking-[0.1em] text-[#acb0cd] text-center mt-1 truncate">{x.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="flex justify-end mt-8">
          <button className="rounded-xl border-2 border-[#C0C0C0] px-10 py-4 text-sm uppercase tracking-[0.2em] font-medium text-[#B03E00] transition-all hover:bg-[#B03E00]/10 shadow-[0_4px_15px_rgba(192,192,192,0.3)] hover:shadow-[0_6px_20px_rgba(192,192,192,0.4)]">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
