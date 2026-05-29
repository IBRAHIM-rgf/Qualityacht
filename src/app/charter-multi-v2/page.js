'use client';

// charter-multi-v2 — Page "Charter details" du wizard request-quote.
// - Step indicator en haut (logo Qualityacht, comme dans request-quote-test-v4)
// - Cart depuis localStorage (rempli par yacht-detail-v11 via Enquire)
// - Vignettes empilées (style v2 d'origine) + Restart yachts si on supprime
// - Trip details : mois uniquement (24 mois glissants)
// - Checkboxes Pets / Reduced mobility / Private jets : style CocoCheckbox v4
//   (logo Qualityacht trans.png affiché quand coché)

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, RotateCcw, PawPrint, Accessibility, Plane } from 'lucide-react';

const STEPS = ['Charter Details', 'Contact Information', 'Confirmation'];

const INITIAL = [
  { id: 1, name: 'OKTO',       image: '/images/yachts/yatch2.jpeg',                 length: '66 m', guests: 12, type: 'Motor',     price: '€ 600,000' },
  { id: 2, name: 'SH DIANA',   image: '/images/yachts/yacht1.jpeg',                 length: '38 m', guests: 10, type: 'Sailing',   price: '€ 180,000' },
  { id: 3, name: 'KING BENJI', image: '/images/pagesCaraibes/cocomer.jpeg',         length: '50 m', guests: 11, type: 'Motor',     price: '€ 350,000' },
  { id: 4, name: 'LUNA ROSSA', image: '/images/pagesCaraibes/thankyou-sail.jpg',    length: '44 m', guests: 8,  type: 'Catamaran', price: '€ 220,000' },
];

const inputClass =
  'w-full bg-[#3a3b3f] border border-[#C0C0C0] rounded-xl px-4 py-3 text-[#acb0cd] text-sm placeholder-[#6a6b6e] focus:outline-none focus:border-[#c2622a] transition-colors';

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

// Checkbox conforme à la charte : carré cococo qui révèle le logo Qualityacht
// quand coché (même style que CocoCheckbox de request-quote-test-v4).
function CocoCheckbox({ checked }) {
  return (
    <span className="relative w-6 h-6 rounded border border-[#C0C0C0] bg-[#3a3b3f] flex items-center justify-center shrink-0 overflow-hidden">
      {checked && <Image src="/images/trans.png" alt="" fill className="object-cover scale-110" />}
    </span>
  );
}

// Step indicator du wizard — Charter Details est l'étape 0 (active ici).
function StepIndicator({ step = 0 }) {
  return (
    <div className="flex items-center justify-center gap-0 max-w-3xl mx-auto px-4 mb-10 md:mb-14 overflow-x-auto [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
      {STEPS.map((label, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <div key={i} className="flex items-center shrink-0 md:flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center overflow-hidden transition-all duration-500"
                style={{ borderColor: done || active ? '#C0C0C0' : 'transparent' }}
              >
                <Image
                  src={done ? '/images/logoFondTrans.png' : '/images/trans.png'}
                  alt=""
                  fill
                  className={`object-cover transition-opacity duration-500 ${done ? 'scale-110' : 'scale-150'} ${i <= step ? 'opacity-100' : 'opacity-50'}`}
                />
              </div>
              <span
                className={`mt-2 text-[12px] md:text-[14px] uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-500 ${active ? 'opacity-100' : 'opacity-50'}`}
                style={{ color: active ? '#acb0cd' : '#C0C0C0' }}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="hidden md:block flex-1 h-px bg-[#C0C0C0]/40 mx-3" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Page() {
  const [initialBoats, setInitialBoats] = useState([]);
  const [boats, setBoats] = useState([]);
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [guests, setGuests] = useState('');
  const [pets, setPets] = useState(false);
  const [accessible, setAccessible] = useState(false);
  const [jets, setJets] = useState(false);
  const months = buildMonths();

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
        price: b.price || null,
      }));
      setInitialBoats(normalized);
      setBoats(normalized);
    } catch {
      setInitialBoats(INITIAL);
      setBoats(INITIAL);
    }
  }, []);

  const remove = (id) => setBoats((bs) => bs.filter((b) => b.id !== id));
  const restart = () => setBoats(initialBoats);
  const removed = initialBoats.filter((ib) => !boats.find((b) => b.id === ib.id));

  return (
    <div className="min-h-screen bg-[#26272a] text-[#acb0cd] pt-20 pb-20 px-4">
      <StepIndicator step={0} />

      <div className="trajan-regular font-bold text-2xl md:text-4xl text-center uppercase tracking-[0.15em] mb-3 text-[#C0C0C0]">
        Your Charter Quote
      </div>
      <p className="text-center text-[#acb0cd]/70 text-sm mb-10">Cart · monthly availability · options &amp; preferences</p>

      <div className="max-w-5xl mx-auto">
        {boats.length === 0 ? (
          <div className="rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-8 text-center text-[#acb0cd]/70">
            Your quote is empty.
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {boats.map((b) => (
              <div key={b.id} className="relative rounded-xl overflow-hidden border-2 border-[#C0C0C0]">
                <div className="relative aspect-[3/4]">
                  <Image src={b.image} alt={b.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <button onClick={() => remove(b.id)} title="Remove from quote"
                    className="absolute top-3 right-3 w-8 h-8 rounded-full border border-[#C0C0C0] bg-black/40 text-[#C0C0C0] flex items-center justify-center hover:text-[#B03E00] hover:border-[#B03E00] transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="trajan-regular text-sm text-[#C0C0C0] uppercase tracking-[0.1em]">{b.name}</h3>
                    <p className="text-[11px] text-[#acb0cd]/80 mt-1">
                      {[b.length, b.guests && `${b.guests} guests`, b.type].filter(Boolean).join(' · ')}
                    </p>
                    {b.price && <p className="text-[11px] text-[#acb0cd]">{b.price}/wk</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Restart yachts (réapparaît les bateaux supprimés) */}
        {removed.length > 0 && (
          <div className="flex justify-center mt-6">
            <button onClick={restart}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#C0C0C0] px-5 py-2 text-xs uppercase tracking-[0.2em] font-medium text-[#B03E00] hover:bg-[#B03E00]/10 transition-colors">
              <RotateCcw className="w-4 h-4" />
              Restart yachts ({removed.length})
            </button>
          </div>
        )}

        {/* Trip details : mois uniquement (24 mois glissants) */}
        <div className="mt-8 rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-5">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#acb0cd] mb-4">Trip details</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd] mb-1">Departure month</label>
              <select value={startMonth} onChange={(e) => setStartMonth(e.target.value)} className={inputClass}>
                <option value="" className="bg-[#3a3b3f]">— select —</option>
                {months.map((m) => <option key={m.value} value={m.value} className="bg-[#3a3b3f]">{m.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd] mb-1">Return month</label>
              <select value={endMonth} onChange={(e) => setEndMonth(e.target.value)} className={inputClass}>
                <option value="" className="bg-[#3a3b3f]">— select —</option>
                {months.map((m) => <option key={m.value} value={m.value} className="bg-[#3a3b3f]">{m.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd] mb-1">Guests</label>
              <input type="number" min="1" max="50" placeholder="e.g. 8" value={guests} onChange={(e) => setGuests(e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Options : Pets, Reduced mobility, Private jets — style CocoCheckbox v4 */}
        <div className="mt-6 rounded-xl border border-[#C0C0C0] bg-[#3a3b3f] p-5 space-y-3">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#acb0cd] mb-1">Special requests</p>

          <label onClick={() => setPets((v) => !v)} className="flex items-center gap-3 cursor-pointer select-none">
            <CocoCheckbox checked={pets} />
            <span className="text-sm flex items-center gap-2 text-[#acb0cd]">
              <PawPrint className="w-4 h-4 text-[#B03E00]" />
              Bringing pets on board
            </span>
          </label>

          <label onClick={() => setAccessible((v) => !v)} className="flex items-center gap-3 cursor-pointer select-none">
            <CocoCheckbox checked={accessible} />
            <span className="text-sm flex items-center gap-2 text-[#acb0cd]">
              <Accessibility className="w-4 h-4 text-[#B03E00]" />
              Reduced mobility access required
            </span>
          </label>

          <label onClick={() => setJets((v) => !v)} className="flex items-center gap-3 cursor-pointer select-none">
            <CocoCheckbox checked={jets} />
            <span className="text-sm flex items-center gap-2 text-[#acb0cd]">
              <Plane className="w-4 h-4 text-[#B03E00]" />
              Also propose matching private jets for my trip
            </span>
          </label>
        </div>

        <div className="flex items-center justify-between gap-4 mt-8">
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
