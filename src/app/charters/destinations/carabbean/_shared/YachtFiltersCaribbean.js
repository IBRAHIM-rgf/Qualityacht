'use client';

import { useState, useEffect } from 'react';
import { Filter, X, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import MonthPicker from '@/components/MonthPicker';

const YACHT_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'motor', label: 'Motor' },
  { value: 'sailing', label: 'Sailing' },
];

// 8 sous-regions Caribbean = les 8 cards de caribbean-v15
const DESTINATIONS = [
  { value: 'caribbean',             label: 'All Caribbean' },
  { value: 'greater-antilles',      label: 'Greater Antilles' },
  { value: 'leeward-islands',       label: 'Leeward Islands' },
  { value: 'leeward-antilles',      label: 'Leeward Antilles' },
  { value: 'windward-islands',      label: 'Windward Islands' },
  { value: 'turks-caicos',          label: 'Turks & Caicos' },
  { value: 'trinidad-tobago',       label: 'Trinidad & Tobago' },
  { value: 'grand-cayman',          label: 'Grand Cayman' },
  { value: 'emerging-destinations', label: 'Emerging Destinations' },
];

const CURRENCIES = [
  { value: 'EUR', label: '€ EUR' },
  { value: 'USD', label: '$ USD' },
  { value: 'GBP', label: '£ GBP' },
];

const PRICE_TIERS = [
  { min: 0, max: null },
  { min: 1000, max: 10000 },
  { min: 10000, max: 100000 },
  { min: 100000, max: 1000000 },
  { min: 1000000, max: null },
];

const CURRENCY_SYMBOLS = { EUR: '€', USD: '$', GBP: '£' };

function getPriceTierLabel(tier, symbol) {
  if (tier.min === 0) return 'All prices';
  if (tier.max === null) return `1M ${symbol}+`;
  const fmt = (v) => v >= 1000000 ? `${v / 1000000}M` : `${v / 1000}k`;
  return `${fmt(tier.min)} – ${fmt(tier.max)} ${symbol}`;
}

const MIN_LENGTH_M = 10;
const MAX_LENGTH_M = 140;
const MIN_LENGTH_FT = 33;
const MAX_LENGTH_FT = 459;

export default function YachtFiltersCaribbean({ filters, onChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);
  const [selectedPriceTier, setSelectedPriceTier] = useState(0);
  const [lengthRange, setLengthRange] = useState([MIN_LENGTH_M, MAX_LENGTH_M]);
  const [unitPreference, setUnitPreference] = useState('meters');
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');

  useEffect(() => {
    setLocalFilters(filters);
    setLengthRange([filters.minLength || MIN_LENGTH_M, filters.maxLength || MAX_LENGTH_M]);
  }, [filters]);

  const handleChange = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value === '' || value === null ? '' : value }));
  };

  const metersToFeet = (m) => Math.round(m * 3.28084);
  const feetToMeters = (ft) => Math.round(ft / 3.28084);

  const handleUnitChange = (newUnit) => {
    if (newUnit === unitPreference) return;
    setUnitPreference(newUnit);
    if (newUnit === 'feet') setLengthRange([metersToFeet(lengthRange[0]), metersToFeet(lengthRange[1])]);
    else setLengthRange([feetToMeters(lengthRange[0]), feetToMeters(lengthRange[1])]);
  };

  const handlePriceTierChange = (idx, currency = selectedCurrency) => {
    const tier = PRICE_TIERS[idx];
    setSelectedPriceTier(idx);
    handleChange('priceMin', tier.min > 0 ? tier.min : '');
    handleChange('priceMax', tier.max !== null ? tier.max : '');
    handleChange('currency', currency);
  };

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    handleChange('currency', currency);
    handlePriceTierChange(selectedPriceTier, currency);
  };

  const handleLengthChange = (index, value) => {
    const newRange = [...lengthRange];
    newRange[index] = Number(value);
    setLengthRange(newRange);
    handleChange(index === 0 ? 'minLength' : 'maxLength',
      unitPreference === 'feet' ? feetToMeters(Number(value)) : Number(value));
  };

  const applyFilters = () => onChange(localFilters);

  const handleReset = () => {
    const empty = {
      type: '', destination: 'caribbean', capacity: '',
      priceMax: '', priceMin: '', minLength: '', maxLength: '',
      currency: '', petFriendly: false, groupFriendly: false,
      waterToys: false, couplesFriendly: false,
    };
    setLocalFilters(empty);
    setSelectedPriceTier(0);
    setLengthRange([MIN_LENGTH_M, MAX_LENGTH_M]);
    onChange(empty);
  };

  const activeCount = Object.entries(localFilters).filter(([key, v]) => {
    if (key === 'destination' && v === 'caribbean') return false;
    if (key === 'currency' && v === '') return false;
    return v && v !== '' && v !== false;
  }).length;

  return (
    <>
      {/* Desktop - Bouton Filter flottant en bas a droite (translucide) */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2 px-6 py-3 bg-[#3a3b3f]/80 backdrop-blur-md border border-[#C0C0C0] rounded-xl text-[#B03E00] font-medium shadow-2xl transition-colors hover:bg-[#B03E00]/10"
      >
        <Filter className="w-5 h-5" />
        <span className="text-sm uppercase tracking-[0.15em]">Filter</span>
        {activeCount > 0 && (
          <span className="ml-1 px-2 py-0.5 border border-[#C0C0C0] text-[#C0C0C0] text-xs rounded-full font-semibold">{activeCount}</span>
        )}
      </button>

      {/* Mobile — bouton fixe en bas */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#2e2f32] border-t border-white/10 shadow-lg">
        <button onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full flex items-center justify-center gap-2 py-4 px-6 text-[#B03E00] font-medium">
          <span className="inline-flex items-center gap-2 border border-[#C0C0C0] rounded-full px-5 py-2">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </span>
          {activeCount > 0 && (
            <span className="ml-2 px-2 py-0.5 border border-[#C0C0C0] text-[#C0C0C0] text-xs rounded-full font-semibold">{activeCount}</span>
          )}
        </button>
      </div>

      {/* Filter panel — Mobile: drawer bas / Desktop: volet lateral droite translucide */}
      <div className={`fixed inset-0 z-50 transition-transform duration-300 ${
        isMobileOpen
          ? 'translate-y-0 md:translate-x-0'
          : 'translate-y-full md:translate-y-0 md:translate-x-full'
      }`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
        <div className="absolute bottom-0 left-0 right-0 md:left-auto md:top-0 md:w-[440px] md:max-w-[90vw] bg-[#2e2f32] md:bg-[#2e2f32]/80 md:backdrop-blur-md rounded-t-3xl md:rounded-t-none md:rounded-l-3xl shadow-2xl max-h-[85vh] md:max-h-none md:h-full overflow-y-auto">
          <div className="sticky top-0 bg-[#2e2f32]/95 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex items-center justify-between rounded-t-3xl md:rounded-t-none">
            <h2 className="text-lg font-bold text-[#C0C0C0]">Filters</h2>
            <button onClick={() => setIsMobileOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition">
              <X className="w-5 h-5 text-[#C0C0C0]" />
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#C0C0C0] mb-2">Yacht Type</label>
              <select value={localFilters.type} onChange={e => handleChange('type', e.target.value)}
                className="w-full px-4 py-3 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#acb0cd] accent-[#B03E00]">
                {YACHT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#C0C0C0] mb-2">Caribbean Destination</label>
              <select value={localFilters.destination} onChange={e => handleChange('destination', e.target.value)}
                className="w-full px-4 py-3 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#acb0cd] accent-[#B03E00]">
                {DESTINATIONS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#C0C0C0] mb-2">Charter Dates</label>
              <div className="grid grid-cols-2 gap-2">
                <MonthPicker value={(localFilters.startDate || '').slice(0, 7)} onChange={(v) => handleChange('startDate', v)} placeholder="From" />
                <MonthPicker value={(localFilters.endDate || '').slice(0, 7)} onChange={(v) => handleChange('endDate', v)} placeholder="To" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#C0C0C0] mb-2">Price</label>
              <div className="flex gap-2">
                <select value={selectedPriceTier} onChange={e => handlePriceTierChange(Number(e.target.value))}
                  className="flex-1 px-4 py-3 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#acb0cd] accent-[#B03E00]">
                  {PRICE_TIERS.map((tier, i) => <option key={i} value={i}>{getPriceTierLabel(tier, CURRENCY_SYMBOLS[selectedCurrency])}</option>)}
                </select>
                <select value={selectedCurrency} onChange={e => handleCurrencyChange(e.target.value)}
                  className="px-3 py-3 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#acb0cd] accent-[#B03E00]">
                  {CURRENCIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#C0C0C0] mb-2">Length</label>
              {(() => {
                const lenMin = unitPreference === 'meters' ? MIN_LENGTH_M : MIN_LENGTH_FT;
                const lenMax = unitPreference === 'meters' ? MAX_LENGTH_M : MAX_LENGTH_FT;
                const pL = ((lengthRange[0] - lenMin) / (lenMax - lenMin)) * 100;
                const pR = ((lengthRange[1] - lenMin) / (lenMax - lenMin)) * 100;
                const unit = unitPreference === 'meters' ? 'm' : 'ft';
                return (
                  <div className="px-2">
                    {/* Bulles dynamiques au-dessus des thumbs */}
                    <div className="relative h-4 mb-1">
                      <span className="absolute text-[10px] font-bold text-[#B03E00] -translate-x-1/2" style={{ left: `${pL}%` }}>{lengthRange[0]}{unit}</span>
                      <span className="absolute text-[10px] font-bold text-[#B03E00] -translate-x-1/2" style={{ left: `${pR}%` }}>{lengthRange[1]}{unit}</span>
                    </div>
                    <div className="relative h-6 flex items-center mb-1">
                      <div className="absolute w-full h-1 rounded-full" style={{ background: `linear-gradient(to right, #4b5563 0%, #4b5563 ${pL}%, #B03E00 ${pL}%, #B03E00 ${pR}%, #4b5563 ${pR}%, #4b5563 100%)` }} />
                      {/* Tick marks mobile */}
                      {unitPreference === 'meters'
                        ? Array.from({ length: Math.floor((MAX_LENGTH_M - MIN_LENGTH_M) / 10) + 1 }, (_, i) => {
                            const val = MIN_LENGTH_M + i * 10;
                            const pct = ((val - lenMin) / (lenMax - lenMin)) * 100;
                            return <div key={val} className="absolute w-px h-3 bg-[#C0C0C0]/80 pointer-events-none" style={{ left: `${pct}%`, transform: 'translateX(-50%)' }} />;
                          })
                        : Array.from({ length: 14 }, (_, i) => {
                            const val = MIN_LENGTH_FT + i * 30;
                            if (val > MAX_LENGTH_FT) return null;
                            const pct = ((val - lenMin) / (lenMax - lenMin)) * 100;
                            return <div key={val} className="absolute w-px h-3 bg-[#C0C0C0]/80 pointer-events-none" style={{ left: `${pct}%`, transform: 'translateX(-50%)' }} />;
                          })
                      }
                      <input type="range" min={lenMin} max={lenMax} step={unitPreference === 'meters' ? 5 : 10} value={lengthRange[0]}
                        onChange={e => handleLengthChange(0, Math.min(Number(e.target.value), lengthRange[1] - 10))}
                        className="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-sm [&::-webkit-slider-thumb]:bg-[#B03E00] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-sm [[&::-moz-range-thumb]:bg-[#B03E00]::-moz-range-thumb]:bg-[#B03E00] [&::-moz-range-thumb]:border-none [&::-moz-range-track]:bg-transparent"
                        style={{ zIndex: 5 }} />
                      <input type="range" min={lenMin} max={lenMax} step={unitPreference === 'meters' ? 5 : 10} value={lengthRange[1]}
                        onChange={e => handleLengthChange(1, Math.max(Number(e.target.value), lengthRange[0] + 10))}
                        className="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-sm [&::-webkit-slider-thumb]:bg-[#B03E00] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-sm [[&::-moz-range-thumb]:bg-[#B03E00]::-moz-range-thumb]:bg-[#B03E00] [&::-moz-range-thumb]:border-none [&::-moz-range-track]:bg-transparent"
                        style={{ zIndex: 5 }} />
                    </div>
                    {/* Labels under tick marks mobile */}
                    <div className="relative h-4 mb-2">
                      {unitPreference === 'meters'
                        ? Array.from({ length: Math.floor((MAX_LENGTH_M - MIN_LENGTH_M) / 10) + 1 }, (_, i) => {
                            const val = MIN_LENGTH_M + i * 10;
                            const pct = ((val - lenMin) / (lenMax - lenMin)) * 100;
                            return i % 3 === 0 ? <span key={val} className="absolute text-[10px] text-[#acb0cd]" style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}>{val}</span> : null;
                          })
                        : Array.from({ length: 14 }, (_, i) => {
                            const val = MIN_LENGTH_FT + i * 30;
                            if (val > MAX_LENGTH_FT) return null;
                            const pct = ((val - lenMin) / (lenMax - lenMin)) * 100;
                            return i % 2 === 0 ? <span key={val} className="absolute text-[10px] text-[#acb0cd]" style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}>{val}</span> : null;
                          })
                      }
                    </div>
                    <div className="flex gap-3 mt-2">
                      {['meters', 'feet'].map(u => (
                        <button key={u} onClick={() => handleUnitChange(u)}
                          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-[#3a3b3f] border border-white/20 ${unitPreference === u ? 'text-[#B03E00]' : 'text-gray-400'}`}>
                          {u.charAt(0).toUpperCase() + u.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#C0C0C0] mb-2">Minimum Guests</label>
              <input type="number" min="1" max="50" value={localFilters.capacity || ''} onChange={e => handleChange('capacity', e.target.value ? Number(e.target.value) : '')}
                className="w-full px-4 py-3 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#acb0cd]" />
            </div>

            {/* Options as toggle buttons */}
            <div className="space-y-3">
              {[
                { key: 'petFriendly',     label: 'Pet Friendly' },
                { key: 'groupFriendly',   label: 'Group Friendly' },
                { key: 'waterToys',       label: 'Water Toys' },
                { key: 'couplesFriendly', label: 'Couples Friendly' },
              ].map(({ key, label }) => {
                const active = !!localFilters[key];
                return (
                  <button key={key} onClick={() => handleChange(key, !active)}
                    className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition border ${
                      active
                        ? 'bg-[#B03E00] border-[#B03E00] text-white'
                        : 'bg-[#3a3b3f] border-white/20 text-[#B03E00] hover:border-[#B03E00]'
                    }`}>
                    {label}
                  </button>
                );
              })}
            </div>

            {activeCount > 0 && (
              <button onClick={handleReset} className="w-full px-4 py-3 bg-transparent border-2 border-[#C0C0C0] text-[#C0C0C0] rounded-xl font-medium hover:bg-white/5 transition">
                Reset ({activeCount})
              </button>
            )}
          </div>
          <div className="sticky bottom-0 bg-[#2e2f32]/95 backdrop-blur-sm border-t border-white/10 p-6">
            <button onClick={() => { applyFilters(); setIsMobileOpen(false); }}
              className="w-full bg-transparent border-2 border-[#C0C0C0] rounded-xl py-3 font-medium transition-all text-[#B03E00] hover:bg-[#B03E00]/10">
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
