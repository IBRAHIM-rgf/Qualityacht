'use client';

// Widget réutilisable de réservation jet privé.
// Utilisé sur /privat-jet/[slug]/contact-broker et dans la step "Contact Info"
// du wizard /request-quote-test-v10 quand l'utilisateur a coché "private jets".
//
// Toute logique d'état est interne ; pas besoin de prop pour fonctionner.
// Aéroports source : caribbeanJetGroups (seule région active actuellement).

import { useState, useMemo } from 'react';
import { Calendar, Clock, User, Plane, Plus, X as XIcon } from 'lucide-react';
import { caribbeanJetGroups } from '../app/privat-jet/data';

function parseAirport(str) {
  const m = str.match(/^(.+?)\s*\(([A-Z]{2,4})\)\s*[—-]\s*(.+)$/);
  if (m) return { name: m[1].trim(), code: m[2], size: m[3].trim() };
  return null;
}

const CARIBBEAN_AIRPORTS = caribbeanJetGroups.flatMap(({ island, airports }) =>
  airports.map(parseAirport).filter(Boolean).map(a => ({ island, ...a }))
);

const AIRCRAFT_TYPES = [
  'Any',
  'Light jet',
  'Medium jet',
  'Medium/Large jet',
  'Large jet',
  'STOL aircraft',
];

export default function JetBookingWidget() {
  const [tripType, setTripType] = useState('one-way');
  const [legs, setLegs] = useState([{ from: '', to: '', date: '', time: '' }]);
  const [passengers, setPassengers] = useState(1);
  const [aircraft, setAircraft] = useState('');

  const updateLeg = (i, key, val) => setLegs(prev => {
    const next = [...prev];
    while (next.length <= i) next.push({ from: '', to: '', date: '', time: '' });
    next[i] = { ...next[i], [key]: val };
    return next;
  });
  const addLeg = () => setLegs(prev => [...prev, { from: '', to: '', date: '', time: '' }]);
  const removeLeg = (i) => setLegs(prev => prev.filter((_, idx) => idx !== i));

  const handleTripType = (type) => {
    setTripType(type);
    if (type === 'round-trip') {
      setLegs(prev => prev.length >= 2 ? prev : [...prev, { from: '', to: '', date: '', time: '' }]);
    }
  };

  const visibleLegs = useMemo(() => {
    if (tripType === 'one-way') return legs.slice(0, 1);
    if (tripType === 'round-trip') {
      const out = [...legs];
      while (out.length < 2) out.push({ from: '', to: '', date: '', time: '' });
      return out.slice(0, 2);
    }
    return legs;
  }, [legs, tripType]);

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-px mb-3 max-w-2xl">
        {[
          { key: 'one-way', label: 'One Way' },
          { key: 'round-trip', label: 'Round Trip' },
          { key: 'multi', label: 'Multiple Destinations' },
        ].map(({ key, label }) => (
          <button key={key} type="button" onClick={() => handleTripType(key)}
            className={`flex-1 px-4 md:px-6 py-3 text-xs md:text-sm uppercase tracking-[0.15em] font-medium border transition-colors ${
              tripType === key
                ? 'bg-[#c2622a] text-[#26272a] border-[#c2622a]'
                : 'bg-[#3a3b3f]/40 text-[#acb0cd] border-[#C0C0C0]/30 hover:border-[#c2622a]'
            }`}>
            {label}
          </button>
        ))}
      </div>

      {/* Legs (single row, scroll horizontal si besoin) */}
      <div className="space-y-3">
        {visibleLegs.map((leg, i) => (
          <div key={i} className="grid grid-cols-3 md:flex md:flex-nowrap gap-px bg-[#3a3b3f]/40 border border-[#C0C0C0]/30 md:overflow-x-auto">
            {/* FROM */}
            <div className="px-4 py-3 bg-[#26272a] border-r border-[#C0C0C0]/20 md:flex-1 md:min-w-[160px]">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#acb0cd]/60 mb-1">From</p>
              {i === 0 ? (
                <input value={leg.from} onChange={e => updateLeg(i, 'from', e.target.value)}
                  placeholder="City or airport"
                  className="w-full bg-transparent text-[#C0C0C0] text-sm focus:outline-none placeholder-[#6a6b6e]" />
              ) : (
                <select value={leg.from} onChange={e => updateLeg(i, 'from', e.target.value)}
                  className="w-full bg-transparent text-[#C0C0C0] text-sm focus:outline-none">
                  <option value="" className="bg-[#2e2f32]">Select airport…</option>
                  {CARIBBEAN_AIRPORTS.map((a, idx) => (
                    <option key={`${a.island}-${a.code}-${idx}`} value={`${a.code}|${a.island}`} className="bg-[#2e2f32]">
                      {a.island} — {a.name} ({a.code})
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* TO */}
            <div className="px-4 py-3 bg-[#26272a] border-r border-[#C0C0C0]/20 md:flex-1 md:min-w-[160px]">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#acb0cd]/60 mb-1">To</p>
              {i === 0 ? (
                <select value={leg.to} onChange={e => updateLeg(i, 'to', e.target.value)}
                  className="w-full bg-transparent text-[#C0C0C0] text-sm focus:outline-none">
                  <option value="" className="bg-[#2e2f32]">Select airport…</option>
                  {CARIBBEAN_AIRPORTS.map((a, idx) => (
                    <option key={`${a.island}-${a.code}-${idx}`} value={`${a.code}|${a.island}`} className="bg-[#2e2f32]">
                      {a.island} — {a.name} ({a.code})
                    </option>
                  ))}
                </select>
              ) : (
                <input value={leg.to} onChange={e => updateLeg(i, 'to', e.target.value)}
                  placeholder="City or airport"
                  className="w-full bg-transparent text-[#C0C0C0] text-sm focus:outline-none placeholder-[#6a6b6e]" />
              )}
            </div>

            {/* Date */}
            <div className="px-4 py-3 bg-[#26272a] border-r border-[#C0C0C0]/20 flex items-center gap-2 md:min-w-[150px]">
              <Calendar className="w-4 h-4 text-[#c2622a] shrink-0" />
              <input type="date" value={leg.date} onChange={e => updateLeg(i, 'date', e.target.value)}
                className="w-full bg-transparent text-[#C0C0C0] text-sm focus:outline-none [color-scheme:dark]" />
            </div>

            {/* Time */}
            <div className="px-4 py-3 bg-[#26272a] border-r border-[#C0C0C0]/20 flex items-center gap-2 md:min-w-[120px]">
              <Clock className="w-4 h-4 text-[#c2622a] shrink-0" />
              <input type="time" value={leg.time} onChange={e => updateLeg(i, 'time', e.target.value)}
                className="w-full bg-transparent text-[#C0C0C0] text-sm focus:outline-none [color-scheme:dark]" />
            </div>

            {/* Pax + Aircraft (1ère ligne uniquement) */}
            {i === 0 ? (
              <>
                <div className="px-4 py-3 bg-[#26272a] border-r border-[#C0C0C0]/20 flex items-center gap-2 md:min-w-[90px]">
                  <User className="w-4 h-4 text-[#c2622a] shrink-0" />
                  <input type="number" min="1" max="50" value={passengers}
                    onChange={e => setPassengers(Math.max(1, Number(e.target.value) || 1))}
                    className="w-full bg-transparent text-[#C0C0C0] text-sm focus:outline-none" />
                </div>
                <div className="px-4 py-3 bg-[#26272a] flex items-center gap-2 md:min-w-[170px]">
                  <Plane className="w-4 h-4 text-[#c2622a] shrink-0" />
                  <select value={aircraft} onChange={e => setAircraft(e.target.value)}
                    className="w-full bg-transparent text-[#C0C0C0] text-sm focus:outline-none">
                    <option value="" className="bg-[#2e2f32]">Type of aircraft</option>
                    {AIRCRAFT_TYPES.map(a => <option key={a} value={a} className="bg-[#2e2f32]">{a}</option>)}
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="bg-[#26272a]" />
                <div className="px-4 py-3 bg-[#26272a] flex items-center justify-end">
                  {tripType === 'multi' && (
                    <button type="button" onClick={() => removeLeg(i)}
                      aria-label="Remove leg"
                      className="text-[#acb0cd]/70 hover:text-[#B03E00] transition-colors">
                      <XIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        ))}

        {tripType === 'multi' && (
          <button type="button" onClick={addLeg}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c2622a] hover:text-[#B03E00] transition-colors">
            <Plus className="w-4 h-4" /> Add destination
          </button>
        )}
      </div>
    </div>
  );
}
