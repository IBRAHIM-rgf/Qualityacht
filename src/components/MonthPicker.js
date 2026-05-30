'use client';

// MonthPicker — popover custom (grid 4x3 mois + sélecteur année).
// Mois passés en faible opacité avec logo Qualityacht transparent en fond.
// Mois sélectionné en orange brûlé. Boutons "Clear" et "This month".
// Utilisé dans les filtres mobile (YachtFilters) et la step Charter Details
// du wizard request-quote-test-v10.

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * value : 'YYYY-MM' ou ''.
 * onChange : reçoit 'YYYY-MM' ou ''.
 * placeholder : texte quand pas de valeur.
 */
export default function MonthPicker({ value = '', onChange, placeholder = 'Select month', className = '' }) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const currentY = today.getFullYear();
  const currentM = today.getMonth(); // 0-based
  const [year, setYear] = useState(() => {
    const m = String(value || '').match(/^(\d{4})-(\d{2})$/);
    return m ? Number(m[1]) : currentY;
  });
  const selM = String(value || '').match(/^(\d{4})-(\d{2})$/);
  const selectedYear = selM ? Number(selM[1]) : null;
  const selectedMonth = selM ? Number(selM[2]) - 1 : null;

  const rootRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const label = value
    ? `${MONTHS_EN[selectedMonth]} ${selectedYear}`
    : placeholder;

  const isPast = (y, m) => y < currentY || (y === currentY && m < currentM);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button type="button" onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2 px-4 py-2.5 bg-[#3a3b3f] border border-[#C0C0C0] rounded-xl text-[#acb0cd] text-sm hover:border-[#B03E00] transition-colors">
        <Calendar className="w-4 h-4 text-[#B03E00]" />
        <span className="flex-1 text-left capitalize">{label}</span>
      </button>
      {open && (
        <div className="absolute z-50 left-0 top-full mt-1 w-[300px] rounded-xl border border-[#C0C0C0] bg-[#2e2f32] shadow-2xl overflow-hidden">
          {/* Sélecteur année */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-[#C0C0C0]/30 bg-[#3a3b3f]">
            <button type="button" onClick={() => setYear((y) => y - 1)}
              className="w-7 h-7 rounded-full border border-[#C0C0C0] text-[#acb0cd] hover:text-[#B03E00] hover:border-[#B03E00] flex items-center justify-center transition-colors">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[#C0C0C0] font-bold text-base">{year}</span>
            <button type="button" onClick={() => setYear((y) => y + 1)}
              className="w-7 h-7 rounded-full border border-[#C0C0C0] text-[#acb0cd] hover:text-[#B03E00] hover:border-[#B03E00] flex items-center justify-center transition-colors">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Grille mois 4x3 avec lignes de séparation orange */}
          <div className="grid grid-cols-4 gap-px bg-[#B03E00]/40 p-px">
            {MONTHS_EN.map((m, i) => {
              const past = isPast(year, i);
              const selected = selectedYear === year && selectedMonth === i;
              return (
                <button type="button" key={i}
                  onClick={() => {
                    const mm = String(i + 1).padStart(2, '0');
                    onChange?.(`${year}-${mm}`);
                    setOpen(false);
                  }}
                  className={`relative h-12 text-sm font-medium transition-colors overflow-hidden ${
                    selected
                      ? 'bg-[#B03E00] text-white'
                      : past
                        ? 'bg-[#2e2f32] text-[#acb0cd]/40 hover:text-[#acb0cd]'
                        : 'bg-[#2e2f32] text-[#acb0cd] hover:text-[#B03E00] hover:bg-[#3a3b3f]'
                  }`}
                >
                  {past && !selected && (
                    <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <Image src="/images/trans.png" alt="" width={40} height={40} className="opacity-25" />
                    </span>
                  )}
                  <span className="relative">{m}</span>
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-[#C0C0C0]/30 bg-[#3a3b3f]">
            <button type="button" onClick={() => { onChange?.(''); setOpen(false); }}
              className="text-[11px] uppercase tracking-[0.15em] text-[#acb0cd] hover:text-[#B03E00] transition-colors">
              Clear
            </button>
            <button type="button" onClick={() => {
                const mm = String(currentM + 1).padStart(2, '0');
                onChange?.(`${currentY}-${mm}`);
                setYear(currentY);
                setOpen(false);
              }}
              className="text-[11px] uppercase tracking-[0.15em] text-[#B03E00] hover:underline">
              This month
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
