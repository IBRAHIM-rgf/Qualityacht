'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Users, Ruler, Ship, Trash2, RotateCcw, Plane, PawPrint, Accessibility } from 'lucide-react';

// Yachts par défaut chargés si le panier localStorage est vide
const INITIAL = [
  { id: 1, name: 'OKTO',       image: '/images/yachts/yatch2.jpeg',                 length: '66 m', guests: 12, type: 'Motor',     price: '€ 600,000' },
  { id: 2, name: 'SH DIANA',   image: '/images/yachts/yacht1.jpeg',                 length: '38 m', guests: 10, type: 'Sailing',   price: '€ 180,000' },
  { id: 3, name: 'KING BENJI', image: '/images/pagesCaraibes/cocomer.jpeg',         length: '50 m', guests: 11, type: 'Motor',     price: '€ 350,000' },
  { id: 4, name: 'LUNA ROSSA', image: '/images/pagesCaraibes/thankyou-sail.jpg',    length: '44 m', guests: 8,  type: 'Catamaran', price: '€ 220,000' },
];

const inputClass =
  'w-full bg-[#3a3b3f] border border-[#C0C0C0] rounded-xl px-4 py-2.5 text-[#acb0cd] text-sm placeholder-[#6a6b6e] focus:outline-none focus:border-[#c2622a] transition-colors';

// Liste des mois sur 24 mois glissants
function buildMonths() {
  const out = [];
  const now = new Date();
  for (let i = 0; i < 24; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    out.push({ value, label });
  }
  return out;
}

export default function Page() {
  const [initialBoats, setInitialBoats] = useState([]);
  const [boats, setBoats] = useState([]);
  const [pets, setPets] = useState(false);
  const [accessible, setAccessible] = useState(false);
  const months = buildMonths();

  // Au montage : charge le panier depuis localStorage (rempli depuis yacht-detail-v11
  // via Enquire / Add to cart). Si vide, utilise INITIAL comme démo.
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('quote_cart') || '[]');
      const source = stored.length > 0 ? stored : INITIAL;
      const normalized = source.map((b, idx) => ({
        id: b.id || `yacht-${idx}`,
        name: b.name || 'Yacht',
        image: b.image || b.img || '/images/yachts/yatch2.jpeg',
        length: b.length || null,
        guests: b.guests || null,
        type: b.type || null,
        cabins: b.cabins || null,
        price: b.price || null,
        startMonth: '',
        endMonth: '',
        guestsRequested: '',
      }));
      setInitialBoats(normalized);
      setBoats(normalized);
    } catch {
      setInitialBoats(INITIAL);
      setBoats(INITIAL);
    }
  }, []);

  const remove = (id) => setBoats((bs) => bs.filter((b) => b.id !== id));
  const update = (id, key, val) => setBoats((bs) => bs.map((b) => (b.id === id ? { ...b, [key]: val } : b)));
  const restart = () => {
    setBoats(initialBoats);
    try {
      const stored = JSON.parse(localStorage.getItem('quote_cart') || '[]');
      if (stored.length > 0) localStorage.setItem('quote_cart', JSON.stringify(stored));
    } catch {}
  };
  const removed = initialBoats.filter((ib) => !boats.find((b) => b.id === ib.id));

  return (
    <div className="min-h-screen bg-[#26272a] text-[#acb0cd] pt-24 pb-20 px-4">
      <div className="trajan-regular font-bold text-2xl md:text-4xl text-center uppercase tracking-[0.15em] mb-3 text-[#C0C0C0]">
        Your Charter Quote
      </div>
      <p className="text-center text-[#acb0cd]/70 text-sm mb-10">Cart · monthly availability per yacht · options &amp; preferences</p>

      <div className="max-w-3xl mx-auto space-y-5">
        {boats.length === 0 && (
          <div className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-8 text-center text-[#acb0cd]/70">
            Your quote is empty. Click <span className="text-[#B03E00] font-medium">Restart yachts</span> below to bring removed yachts back, or browse the fleet.
          </div>
        )}

        {boats.map((b) => (
          <div key={b.id} className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] overflow-hidden">
            <div className="flex flex-col sm:flex-row gap-4 p-4">
              <div className="relative w-full sm:w-44 h-40 sm:h-28 shrink-0 rounded-lg overflow-hidden border border-[#C0C0C0]">
                <Image src={b.image} alt={b.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="trajan-regular text-lg text-[#acb0cd] uppercase tracking-[0.1em]">{b.name}</h3>
                <div className="flex flex-wrap gap-2 mt-2 text-xs">
                  {b.length && <span className="inline-flex items-center gap-1 border border-[#C0C0C0] rounded-lg px-2.5 py-1 bg-[#3a3b3f] text-[#acb0cd]"><Ruler className="w-3 h-3 text-[#B03E00]" />{b.length}</span>}
                  {b.guests && <span className="inline-flex items-center gap-1 border border-[#C0C0C0] rounded-lg px-2.5 py-1 bg-[#3a3b3f] text-[#acb0cd]"><Users className="w-3 h-3 text-[#B03E00]" />{b.guests}</span>}
                  {b.type && <span className="inline-flex items-center gap-1 border border-[#C0C0C0] rounded-lg px-2.5 py-1 bg-[#3a3b3f] text-[#acb0cd]"><Ship className="w-3 h-3 text-[#B03E00]" />{b.type}</span>}
                  {b.price && <span className="inline-flex items-center gap-1 border border-[#C0C0C0] rounded-lg px-2.5 py-1 bg-[#3a3b3f] text-[#acb0cd]">{b.price}/wk</span>}
                </div>
              </div>
              <button onClick={() => remove(b.id)} title="Remove from quote"
                className="shrink-0 self-start w-10 h-10 rounded-xl border border-[#C0C0C0] text-[#acb0cd] flex items-center justify-center hover:text-[#B03E00] hover:border-[#B03E00] transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="border-t border-[#C0C0C0]/40 p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd] mb-1">Departure month</label>
                <select value={b.startMonth} onChange={(e) => update(b.id, 'startMonth', e.target.value)} className={inputClass}>
                  <option value="" className="bg-[#3a3b3f]">— select —</option>
                  {months.map((m) => <option key={m.value} value={m.value} className="bg-[#3a3b3f]">{m.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd] mb-1">Return month</label>
                <select value={b.endMonth} onChange={(e) => update(b.id, 'endMonth', e.target.value)} className={inputClass}>
                  <option value="" className="bg-[#3a3b3f]">— select —</option>
                  {months.map((m) => <option key={m.value} value={m.value} className="bg-[#3a3b3f]">{m.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd] mb-1">Guests</label>
                <input type="number" min="1" max="50" value={b.guestsRequested} onChange={(e) => update(b.id, 'guestsRequested', e.target.value)} className={inputClass} placeholder={b.guests ? `max ${b.guests}` : '—'} />
              </div>
            </div>
          </div>
        ))}

        {/* Restart yachts (réapparaît les bateaux supprimés) */}
        {removed.length > 0 && (
          <div className="flex justify-center">
            <button onClick={restart}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#C0C0C0] px-5 py-2 text-xs uppercase tracking-[0.2em] font-medium text-[#B03E00] hover:bg-[#B03E00]/10 transition-colors">
              <RotateCcw className="w-4 h-4" />
              Restart yachts ({removed.length})
            </button>
          </div>
        )}

        {/* Options : Pets + Accessible (style American Airlines Business) */}
        <div className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-5">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#B03E00] mb-3">Special requirements</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors ${pets ? 'border-[#B03E00] bg-[#B03E00]/10' : 'border-[#C0C0C0]/40 hover:border-[#C0C0C0]'}`}>
              <input type="checkbox" checked={pets} onChange={(e) => setPets(e.target.checked)} className="sr-only" />
              <span className={`inline-flex w-6 h-6 items-center justify-center rounded-md border ${pets ? 'border-[#B03E00] bg-[#B03E00] text-white' : 'border-[#C0C0C0]/60'}`}>{pets && '✓'}</span>
              <PawPrint className="w-5 h-5 text-[#B03E00]" />
              <span className="text-sm text-[#C0C0C0]">Pets on board</span>
            </label>
            <label className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors ${accessible ? 'border-[#B03E00] bg-[#B03E00]/10' : 'border-[#C0C0C0]/40 hover:border-[#C0C0C0]'}`}>
              <input type="checkbox" checked={accessible} onChange={(e) => setAccessible(e.target.checked)} className="sr-only" />
              <span className={`inline-flex w-6 h-6 items-center justify-center rounded-md border ${accessible ? 'border-[#B03E00] bg-[#B03E00] text-white' : 'border-[#C0C0C0]/60'}`}>{accessible && '✓'}</span>
              <Accessibility className="w-5 h-5 text-[#B03E00]" />
              <span className="text-sm text-[#C0C0C0]">Reduced mobility access</span>
            </label>
          </div>
        </div>

        {/* Jet phrase */}
        <div className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-5 flex items-start gap-3">
          <Plane className="w-5 h-5 text-[#B03E00] shrink-0 mt-0.5" />
          <p className="text-sm text-[#acb0cd] italic">
            Need to fly in? We coordinate private jet transfers to and from your charter location — just mention it when our broker contacts you.
          </p>
        </div>

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
