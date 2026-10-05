'use client';

// Widget réutilisable de réservation jet privé.
// Utilisé sur /privat-jet/[slug]/contact-broker et dans la step "Contact Info"
// du wizard /request-quote-test-v10 quand l'utilisateur a coché "private jets".
//
// Toute logique d'état est interne ; pas besoin de prop pour fonctionner.
// Aéroports : Caraïbes puis Bahamas (selection region > iles > aeroport, client 2026-10-05).

import { useState, useMemo, useEffect } from 'react';
import { Calendar, Clock, User, Plane, Plus, X as XIcon, ChevronRight, ChevronLeft, ChevronDown } from 'lucide-react';
import { caribbeanJetGroups, bahamasJetGroups } from '../app/privat-jet/data';

function parseAirport(str) {
  const m = str.match(/^(.+?)\s*\(([A-Z]{2,4})\)\s*[—-]\s*(.+)$/);
  if (m) return { name: m[1].trim(), code: m[2], size: m[3].trim() };
  return null;
}

// Selection d'aeroport en 3 niveaux (client 2026-10-05) : region (Caribbean, Bahamas...)
// puis ses iles / groupes d'iles, puis leurs aeroports. Pour ajouter une region :
// une ligne de plus dans REGIONS.
const REGIONS = [
  { name: 'Caribbean', groups: caribbeanJetGroups },
  { name: 'Bahamas', groups: bahamasJetGroups },
].map((r) => ({
  name: r.name,
  groups: r.groups
    .map(({ island, airports }) => ({ island, airports: airports.map(parseAirport).filter(Boolean) }))
    .filter((g) => g.airports.length),
}));

const AIRPORT_LABELS = new Map(
  REGIONS.flatMap((r) => r.groups.flatMap((g) => g.airports.map((a) => [`${a.code}|${g.island}`, `${a.name} (${a.code})`])))
);

function AirportPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [region, setRegion] = useState(null);
  const [group, setGroup] = useState(null);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  const openPicker = () => { setRegion(null); setGroup(null); setOpen(true); };
  const back = () => (group ? setGroup(null) : setRegion(null));
  const title = group ? group.island : region ? region.name : 'Select airport…';
  const row = 'w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm text-[#C0C0C0] border-b border-[#C0C0C0]/10 hover:bg-[#3a3b3f] hover:text-[#c2622a] transition-colors';
  return (
    <>
      <button type="button" onClick={openPicker}
        className="w-full flex items-center justify-between gap-2 bg-transparent text-left text-sm focus:outline-none">
        <span className="truncate text-[#C0C0C0]">{AIRPORT_LABELS.get(value) || 'Select airport…'}</span>
        <ChevronDown className="w-4 h-4 text-[#acb0cd] shrink-0" />
      </button>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/60 p-0 md:p-6" onClick={() => setOpen(false)}>
          <div role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}
            className="w-full md:max-w-md max-h-[80vh] flex flex-col rounded-t-2xl md:rounded-2xl border border-[#C0C0C0]/30 bg-[#26272a] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#C0C0C0]/20">
              {region && (
                <button type="button" onClick={back} aria-label="Back" className="text-[#acb0cd] hover:text-[#c2622a]">
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              <p className="flex-1 text-[13px] font-bold uppercase tracking-[0.2em] text-[#acb0cd] truncate">{title}</p>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="text-[#acb0cd] hover:text-[#c2622a]">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto">
              {!region && REGIONS.map((r) => (
                <button key={r.name} type="button" onClick={() => setRegion(r)} className={row}>
                  <span>{r.name}</span><ChevronRight className="w-4 h-4 shrink-0" />
                </button>
              ))}
              {region && !group && region.groups.map((g) => (
                <button key={g.island} type="button" onClick={() => setGroup(g)} className={row}>
                  <span>{g.island}</span><ChevronRight className="w-4 h-4 shrink-0" />
                </button>
              ))}
              {group && group.airports.map((a, idx) => (
                <button key={`${a.code}-${idx}`} type="button"
                  onClick={() => { onChange(`${a.code}|${group.island}`); setOpen(false); }}
                  className={row}>
                  <span>{a.name} ({a.code})<span className="block text-xs text-[#acb0cd]/70">{a.size}</span></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

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
      {/* Tabs — cards arrondies, fond commun ; actif = bordure + texte orange */}
      <div className="flex gap-2 mb-3 max-w-2xl mx-auto">
        {[
          { key: 'one-way', label: 'One Way' },
          { key: 'round-trip', label: 'Round Trip' },
          { key: 'multi', label: 'Multiple Destinations' },
        ].map(({ key, label }) => (
          <button key={key} type="button" onClick={() => handleTripType(key)}
            className={`flex-1 px-4 md:px-6 py-3 rounded-xl text-xs md:text-sm uppercase tracking-[0.15em] font-medium border-2 bg-[#3a3b3f]/40 transition-colors ${
              tripType === key
                ? 'border-[#c2622a] text-[#c2622a]'
                : 'border-[#C0C0C0]/30 text-[#acb0cd] hover:border-[#c2622a] hover:text-[#c2622a]'
            }`}>
            {label}
          </button>
        ))}
      </div>

      {/* Legs (single row, scroll horizontal si besoin) */}
      <div className="space-y-3">
        {visibleLegs.map((leg, i) => (
          <div key={i} className="md:flex md:flex-nowrap gap-px bg-[#3a3b3f]/40 border border-[#C0C0C0]/30 rounded-2xl overflow-hidden md:overflow-x-auto">
            {/* Groupe aéroports (mobile : 2 colonnes ; desktop : direct children du flex via md:contents) */}
            <div className="grid grid-cols-2 gap-px md:contents">
              {/* FROM */}
              <div className="px-4 py-3 bg-[#26272a] border-r border-[#C0C0C0]/20 md:flex-1 md:min-w-[160px]">
                <p className="text-[13px] font-bold uppercase tracking-[0.25em] text-[#acb0cd] mb-1">From</p>
                {i === 0 ? (
                  <input value={leg.from} onChange={e => updateLeg(i, 'from', e.target.value)}
                    placeholder="City or airport"
                    className="w-full bg-transparent text-[#C0C0C0] text-sm focus:outline-none placeholder-[#6a6b6e]" />
                ) : (
                  <AirportPicker value={leg.from} onChange={v => updateLeg(i, 'from', v)} />
                )}
              </div>

              {/* TO */}
              <div className="px-4 py-3 bg-[#26272a] border-r border-[#C0C0C0]/20 md:flex-1 md:min-w-[160px]">
                <p className="text-[13px] font-bold uppercase tracking-[0.25em] text-[#acb0cd] mb-1">To</p>
                {i === 0 ? (
                  <AirportPicker value={leg.to} onChange={v => updateLeg(i, 'to', v)} />
                ) : (
                  <input value={leg.to} onChange={e => updateLeg(i, 'to', e.target.value)}
                    placeholder="City or airport"
                    className="w-full bg-transparent text-[#C0C0C0] text-sm focus:outline-none placeholder-[#6a6b6e]" />
                )}
              </div>
            </div>

            {/* Trait séparateur mobile entre aéroports et date/time */}
            <div className="md:hidden h-px bg-[#C0C0C0]/30" />

            {/* Groupe Date + Time (mobile : 2 cols ; desktop : md:contents) */}
            <div className="grid grid-cols-2 gap-px md:contents">
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
            </div>

            {/* Trait séparateur mobile entre date/time et pax/aircraft */}
            <div className="md:hidden h-px bg-[#C0C0C0]/30" />

            {/* Groupe Pax + Aircraft (mobile : 2 cols ; desktop : md:contents) */}
            <div className="grid grid-cols-2 gap-px md:contents">
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
