'use client';

import { useState, useEffect } from 'react';
import { Filter, X, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import MonthPicker from '@/components/MonthPicker';

const YACHT_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'motor', label: 'Motor' },
  { value: 'sailing', label: 'Sailing' },
];

// Seulement les 7 destinations Caribbean + All Caribbean
const DESTINATIONS = [
  { value: 'caribbean',        label: 'All Caribbean' },
  { value: 'greater-antilles', label: 'Greater Antilles' },
  { value: 'leeward-islands',  label: 'Leeward Islands' },
  { value: 'leeward-antilles', label: 'Leeward Antilles' },
  { value: 'windward-islands', label: 'Windward Islands' },
  { value: 'turks-caicos',     label: 'Turks & Caicos' },
  { value: 'trinidad-tobago',  label: 'Trinidad & Tobago' },
  { value: 'grand-cayman',     label: 'Grand Cayman' },
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
      {/* Desktop */}
      <div className="hidden md:block sticky top-20 z-40 bg-[#3a3b3f]/95 backdrop-blur-sm py-4 px-6 rounded-2xl border border-white/10">
        <div className="flex items-center gap-4 flex-wrap">

          {/* Type */}
          <div className="flex-1 min-w-[150px] max-w-[180px]">
            <select value={localFilters.type} onChange={e => handleChange('type', e.target.value)}
              className="w-full px-4 py-2.5 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#acb0cd] focus:ring-2 focus:ring-[#d39478] focus:border-transparent accent-[#B03E00]">
              {YACHT_TYPES.map(t => <option key={t.value} value={t.value} className="bg-[#3a3b3f]">{t.label}</option>)}
            </select>
          </div>

          {/* Destination Caribbean seulement */}
          <div className="flex-1 min-w-[180px] max-w-[220px]">
            <select value={localFilters.destination} onChange={e => handleChange('destination', e.target.value)}
              className="w-full px-4 py-2.5 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#acb0cd] focus:ring-2 focus:ring-[#d39478] focus:border-transparent accent-[#B03E00]">
              {DESTINATIONS.map(d => <option key={d.value} value={d.value} className="bg-[#3a3b3f]">{d.label}</option>)}
            </select>
          </div>

          {/* Dates (MonthPicker custom) */}
          <div className="flex items-center gap-2">
            <div className="w-40"><MonthPicker value={(localFilters.startDate || '').slice(0, 7)} onChange={(v) => handleChange('startDate', v)} placeholder="From" /></div>
            <span className="text-gray-400">-</span>
            <div className="w-40"><MonthPicker value={(localFilters.endDate || '').slice(0, 7)} onChange={(v) => handleChange('endDate', v)} placeholder="To" /></div>
          </div>

          {/* Prix */}
          <div className="flex items-center gap-2 min-w-[260px]">
            <label className="text-sm text-[#C0C0C0] whitespace-nowrap">Price:</label>
            <select value={selectedPriceTier} onChange={e => handlePriceTierChange(Number(e.target.value))}
              className="flex-1 px-2 py-1.5 bg-[#3a3b3f] border border-white/20 rounded-lg text-[#acb0cd] text-xs accent-[#B03E00]">
              {PRICE_TIERS.map((tier, i) => <option key={i} value={i} className="bg-[#3a3b3f]">{getPriceTierLabel(tier, CURRENCY_SYMBOLS[selectedCurrency])}</option>)}
            </select>
            <select value={selectedCurrency} onChange={e => handleCurrencyChange(e.target.value)}
              className="px-2 py-1.5 bg-[#3a3b3f] border border-white/20 rounded-lg text-[#acb0cd] text-xs accent-[#B03E00]">
              {CURRENCIES.map(c => <option key={c.value} value={c.value} className="bg-[#3a3b3f]">{c.label}</option>)}
            </select>
          </div>

          {/* More Options */}
          <button onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-4 py-2.5 bg-transparent border border-white/20 rounded-xl text-[#acb0cd] hover:bg-white/5 transition-colors">
            <span className="text-sm">More Options</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Bouton Filter — fond gris, contour argenté, écriture orange brûlé */}
          <button onClick={applyFilters}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-colors hover:opacity-80"
            style={{ backgroundColor: '#26272a', borderColor: '#C0C0C0', border: '1px solid #C0C0C0', color: '#B03E00' }}>
            <Filter className="w-4 h-4" />
            <span className="text-sm">Explore Yachts</span>
          </button>

          {activeCount > 0 && (
            <button onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#d39478]/20 border border-[#d39478]/50 rounded-xl text-[#d39478] hover:bg-[#d39478]/30 transition-colors">
              <X className="w-4 h-4" />
              <span className="text-sm">{activeCount} filter{activeCount > 1 ? 's' : ''}</span>
            </button>
          )}
        </div>

        {/* Options étendues */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-[#C0C0C0]">Length:</label>
              {(() => {
                const dMin = unitPreference === 'meters' ? MIN_LENGTH_M : MIN_LENGTH_FT;
                const dMax = unitPreference === 'meters' ? MAX_LENGTH_M : MAX_LENGTH_FT;
                const pL = ((lengthRange[0] - dMin) / (dMax - dMin)) * 100;
                const pR = ((lengthRange[1] - dMin) / (dMax - dMin)) * 100;
                const unit = unitPreference === 'meters' ? 'm' : 'ft';
                return (
                  <div className="relative min-w-[180px]">
                    {/* Bulles dynamiques au-dessus des thumbs */}
                    <div className="relative h-4 mb-1">
                      <span className="absolute text-[10px] font-bold text-[#B03E00] -translate-x-1/2" style={{ left: `${pL}%` }}>{lengthRange[0]}{unit}</span>
                      <span className="absolute text-[10px] font-bold text-[#B03E00] -translate-x-1/2" style={{ left: `${pR}%` }}>{lengthRange[1]}{unit}</span>
                    </div>
                    <div className="relative h-6 flex items-center">
                      <div className="absolute w-full h-1 rounded-full" style={{ background: `linear-gradient(to right, #4b5563 0%, #4b5563 ${pL}%, #B03E00 ${pL}%, #B03E00 ${pR}%, #4b5563 ${pR}%, #4b5563 100%)` }} />
                      {/* Tick marks */}
                      {unitPreference === 'meters'
                        ? Array.from({ length: Math.floor((MAX_LENGTH_M - MIN_LENGTH_M) / 10) + 1 }, (_, i) => {
                            const val = MIN_LENGTH_M + i * 10;
                            const pct = ((val - dMin) / (dMax - dMin)) * 100;
                            return <div key={val} className="absolute w-px h-3 bg-[#C0C0C0]/80 pointer-events-none" style={{ left: `${pct}%`, transform: 'translateX(-50%)' }} />;
                          })
                        : Array.from({ length: 14 }, (_, i) => {
                            const val = MIN_LENGTH_FT + i * 30;
                            if (val > MAX_LENGTH_FT) return null;
                            const pct = ((val - dMin) / (dMax - dMin)) * 100;
                            return <div key={val} className="absolute w-px h-3 bg-[#C0C0C0]/80 pointer-events-none" style={{ left: `${pct}%`, transform: 'translateX(-50%)' }} />;
                          })
                      }
                      <input type="range" min={dMin} max={dMax} step={unitPreference === 'meters' ? 5 : 10} value={lengthRange[0]}
                        onChange={e => handleLengthChange(0, Math.min(Number(e.target.value), lengthRange[1] - 10))}
                        className="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-sm [&::-webkit-slider-thumb]:bg-[#B03E00] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-sm [[&::-moz-range-thumb]:bg-[#B03E00]::-moz-range-thumb]:bg-[#B03E00] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none [&::-moz-range-track]:bg-transparent"
                        style={{ zIndex: 5 }} />
                      <input type="range" min={dMin} max={dMax} step={unitPreference === 'meters' ? 5 : 10} value={lengthRange[1]}
                        onChange={e => handleLengthChange(1, Math.max(Number(e.target.value), lengthRange[0] + 10))}
                        className="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-sm [&::-webkit-slider-thumb]:bg-[#B03E00] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-sm [[&::-moz-range-thumb]:bg-[#B03E00]::-moz-range-thumb]:bg-[#B03E00] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none [&::-moz-range-track]:bg-transparent"
                        style={{ zIndex: 5 }} />
                    </div>
                    {/* Labels under tick marks */}
                    <div className="relative h-4">
                      {unitPreference === 'meters'
                        ? Array.from({ length: Math.floor((MAX_LENGTH_M - MIN_LENGTH_M) / 10) + 1 }, (_, i) => {
                            const val = MIN_LENGTH_M + i * 10;
                            const pct = ((val - dMin) / (dMax - dMin)) * 100;
                            return i % 3 === 0 ? <span key={val} className="absolute text-[10px] text-[#acb0cd]" style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}>{val}</span> : null;
                          })
                        : Array.from({ length: 14 }, (_, i) => {
                            const val = MIN_LENGTH_FT + i * 30;
                            if (val > MAX_LENGTH_FT) return null;
                            const pct = ((val - dMin) / (dMax - dMin)) * 100;
                            return i % 2 === 0 ? <span key={val} className="absolute text-[10px] text-[#acb0cd]" style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}>{val}</span> : null;
                          })
                      }
                    </div>
                  </div>
                );
              })()}
              <div className="flex gap-2 mt-1">
                {['meters', 'feet'].map(u => (
                  <button key={u} onClick={() => handleUnitChange(u)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium bg-[#3a3b3f] border border-white/20 ${unitPreference === u ? 'text-[#B03E00]' : 'text-gray-400'}`}>
                    {u.charAt(0).toUpperCase() + u.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm text-[#C0C0C0] min-w-[60px]">Min guests:</label>
              <input type="number" min="1" max="50" value={localFilters.capacity || ''} onChange={e => handleChange('capacity', e.target.value ? Number(e.target.value) : '')}
                className="w-20 px-3 py-2 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#acb0cd] focus:ring-2 focus:ring-[#d39478]" />
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              {[['petFriendly', 'Pet Friendly'], ['groupFriendly', 'Group Friendly']].map(([key, label]) => (
                <button key={key} onClick={() => handleChange(key, !localFilters[key])}
                  className={`px-4 py-2 rounded-lg text-sm font-medium bg-[#3a3b3f] border border-white/20 ${localFilters[key] ? 'text-[#B03E00]' : 'text-gray-400'}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

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

      {/* Mobile — panel */}
      <div className={`md:hidden fixed inset-0 z-50 transition-transform duration-300 ${isMobileOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)} />
        <div className="absolute bottom-0 left-0 right-0 bg-[#2e2f32] rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto">
          <div className="sticky top-0 bg-[#2e2f32] border-b border-white/10 px-6 py-4 flex items-center justify-between rounded-t-3xl">
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
            {activeCount > 0 && (
              <button onClick={handleReset} className="w-full px-4 py-3 bg-transparent border-2 border-[#C0C0C0] text-[#C0C0C0] rounded-xl font-medium hover:bg-white/5 transition">
                Reset ({activeCount})
              </button>
            )}
          </div>
          <div className="sticky bottom-0 bg-[#2e2f32] border-t border-white/10 p-6">
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
