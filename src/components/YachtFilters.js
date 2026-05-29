'use client';

import { useState, useEffect } from 'react';
import { Filter, X, ChevronDown, ChevronUp, Calendar } from 'lucide-react';

const YACHT_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'motor', label: 'Motor' },
  { value: 'sailing', label: 'Sailing' },
];

const DESTINATIONS = [
  { value: '', label: 'All Destinations' },
  { value: 'arctic', label: 'Arctic' },
  { value: 'bahamas', label: 'Bahamas' },
  { value: 'central-america', label: 'Central America' },
  { value: 'east-asia', label: 'East Asia' },
  { value: 'east-mediterranean', label: 'Eastern Mediterranean' },
  { value: 'indian-ocean', label: 'Indian Ocean' },
  { value: 'indonesia', label: 'Indonesia' },
  { value: 'north-america', label: 'North America' },
  { value: 'pacific-ocean', label: 'Pacific Ocean' },
  { value: 'arabian-gulf', label: 'Oman Gulf' },
  { value: 'south-east-asia', label: 'South East Asia' },
  { value: 'west-mediterranean', label: 'Western Mediterranean' },
  { value: 'africa', label: 'Africa' },
  { value: 'northern-europe', label: 'Northern Europe' },
  { value: 'caribbean', label: 'Caribbean' },
  { value: 'oceania', label: 'Oceania' },
];

// Sous-régions par région principale (cascade dans le dropdown subRegion)
const SUB_REGIONS_BY_REGION = {
  caribbean: [
    { value: '', label: 'All Caribbean sub-regions' },
    { value: 'greater-antilles', label: 'Greater Antilles' },
    { value: 'leeward-islands', label: 'Leeward Islands' },
    { value: 'windward-islands', label: 'Windward Islands' },
    { value: 'leeward-antilles', label: 'Leeward Antilles (ABC)' },
    { value: 'turks-caicos', label: 'Turks & Caicos' },
    { value: 'trinidad-tobago', label: 'Trinidad & Tobago' },
    { value: 'bvi', label: 'British Virgin Islands' },
    { value: 'grand-cayman', label: 'Grand Cayman' },
  ],
  bahamas: [
    { value: '', label: 'All Bahamas sub-regions' },
    { value: 'nassau', label: 'Nassau & New Providence' },
    { value: 'exumas', label: 'Exumas' },
    { value: 'abacos', label: 'Abacos' },
    { value: 'eleuthera', label: 'Eleuthera & Harbour Island' },
  ],
};

const getSubRegionsFor = (region) => SUB_REGIONS_BY_REGION[region] || [];

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
  const fmt = (v) => v >= 1000000 ? `${v/1000000}M` : `${v/1000}k`;
  return `${fmt(tier.min)} – ${fmt(tier.max)} ${symbol}`;
}
const MIN_LENGTH_M = 10;
const MAX_LENGTH_M = 140;
const MIN_LENGTH_FT = 33; // ~10m
const MAX_LENGTH_FT = 459; // ~140m

export default function YachtFilters({ filters, onChange, mobileButtonClass = 'text-[#B03E00]', mobileLabelClass = 'border border-[#C0C0C0] rounded-full px-5 py-2', customDestinations = null }) {
  const destinationsList = customDestinations || DESTINATIONS;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);
  const [selectedPriceTier, setSelectedPriceTier] = useState(0);
  const [lengthRange, setLengthRange] = useState([MIN_LENGTH_M, MAX_LENGTH_M]);
  const [unitPreference, setUnitPreference] = useState('meters');
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');

  useEffect(() => {
    setLocalFilters(filters);
    setLengthRange([
      filters.minLength || MIN_LENGTH_M,
      filters.maxLength || MAX_LENGTH_M
    ]);
  }, [filters]);

  const handleChange = (key, value) => {
    const newFilters = {
      ...localFilters,
      [key]: value === '' || value === null ? '' : value
    };
    // Changer de destination réinitialise la sous-région
    if (key === 'destination') {
      newFilters.subRegion = '';
    }
    setLocalFilters(newFilters);
  };

  const availableSubRegions = getSubRegionsFor(localFilters.destination);

  const metersToFeet = (meters) => Math.round(meters * 3.28084);
  const feetToMeters = (feet) => Math.round(feet / 3.28084);

  const handleUnitChange = (newUnit) => {
    if (newUnit === unitPreference) return;

    setUnitPreference(newUnit);

    if (newUnit === 'feet') {
      // Convert meters to feet
      const minFt = metersToFeet(lengthRange[0]);
      const maxFt = metersToFeet(lengthRange[1]);
      setLengthRange([minFt, maxFt]);
    } else {
      // Convert feet to meters
      const minM = feetToMeters(lengthRange[0]);
      const maxM = feetToMeters(lengthRange[1]);
      setLengthRange([minM, maxM]);
    }
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
    // Re-apply current tier with new currency symbol (values unchanged)
    handlePriceTierChange(selectedPriceTier, currency);
  };

  const handleLengthChange = (index, value) => {
    const newRange = [...lengthRange];
    newRange[index] = Number(value);
    setLengthRange(newRange);

    if (unitPreference === 'feet') {
      handleChange(index === 0 ? 'minLength' : 'maxLength', feetToMeters(Number(value)));
    } else {
      handleChange(index === 0 ? 'minLength' : 'maxLength', Number(value));
    }
  };

  const applyFilters = () => {
    onChange(localFilters);
  };

  const handleReset = () => {
    const emptyFilters = {
      type: '',
      destination: '',
      subRegion: '',
      capacity: '',
      priceMax: '',
      priceMin: '',
      minLength: '',
      maxLength: '',
      charterType: '',
      currency: '',
      petFriendly: false,
      groupFriendly: false,
      waterToys: false,
      couplesFriendly: false,
      startDate: '',
      endDate: ''
    };
    setLocalFilters(emptyFilters);
    setSelectedPriceTier(0);
    setLengthRange([MIN_LENGTH_M, MAX_LENGTH_M]);
    onChange(emptyFilters);
  };

  const activeCount = Object.entries(localFilters).filter(([key, v]) => {
    if (key === 'currency' && v === '') return false;
    return v && v !== '' && v !== false;
  }).length;

  return (
    <>
      {/* Desktop - Horizontal sticky filters */}
      <div className="hidden md:block sticky top-20 z-40 bg-[#3a3b3f]/95 backdrop-blur-sm py-4 px-6 rounded-2xl border border-white/10">
        {/* Main filter row */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Type */}
          <div className="flex-1 min-w-[150px] max-w-[180px]">
            <select
              value={localFilters.type}
              onChange={e => handleChange('type', e.target.value)}
              className="w-full px-4 py-2.5 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#acb0cd] focus:ring-2 focus:ring-[#d39478] focus:border-transparent accent-[#B03E00]"
            >
              {YACHT_TYPES.map(t => (
                <option key={t.value} value={t.value} className="bg-[#3a3b3f]">{t.label}</option>
              ))}
            </select>
          </div>

          {/* Destination */}
          <div className="flex-1 min-w-[180px] max-w-[200px]">
            <select
              value={localFilters.destination}
              onChange={e => handleChange('destination', e.target.value)}
              className="w-full px-4 py-2.5 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#acb0cd] focus:ring-2 focus:ring-[#d39478] focus:border-transparent accent-[#B03E00]"
            >
              {destinationsList.map(d => (
                <option key={d.value} value={d.value} className="bg-[#3a3b3f]">{d.label}</option>
              ))}
            </select>
          </div>

          {/* Sub-region (cascade quand destination a des sous-régions) */}
          {availableSubRegions.length > 0 && (
            <div className="flex-1 min-w-[180px] max-w-[220px]">
              <select
                value={localFilters.subRegion || ''}
                onChange={e => handleChange('subRegion', e.target.value)}
                className="w-full px-4 py-2.5 bg-[#3a3b3f] border border-[#B87333]/40 rounded-xl text-[#d39478] focus:ring-2 focus:ring-[#d39478] focus:border-transparent accent-[#B03E00]"
              >
                {availableSubRegions.map(sr => (
                  <option key={sr.value} value={sr.value} className="bg-[#3a3b3f]">{sr.label}</option>
                ))}
              </select>
            </div>
          )}

          {/* Date Picker (mois uniquement) */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="month"
                value={(localFilters.startDate || '').slice(0, 7)}
                onChange={e => handleChange('startDate', e.target.value)}
                placeholder="yyyy-mm"
                className="w-36 pl-9 pr-3 py-2.5 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#acb0cd] focus:ring-2 focus:ring-[#d39478] focus:border-transparent [color-scheme:light]"
                lang="en-US"
              />
            </div>
            <span className="text-gray-400">-</span>
            <input
              type="month"
              value={(localFilters.endDate || '').slice(0, 7)}
              onChange={e => handleChange('endDate', e.target.value)}
              placeholder="yyyy-mm"
              className="w-36 px-3 py-2.5 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#acb0cd] focus:ring-2 focus:ring-[#d39478] focus:border-transparent [color-scheme:light]"
              lang="en-US"
            />
          </div>

          {/* Price Range - Select paliers + Currency */}
          <div className="flex items-center gap-2 min-w-[260px]">
            <label className="text-sm text-[#C0C0C0] whitespace-nowrap">Price:</label>
            <select
              value={selectedPriceTier}
              onChange={e => handlePriceTierChange(Number(e.target.value))}
              className="flex-1 px-2 py-1.5 bg-[#3a3b3f] border border-white/20 rounded-lg text-[#acb0cd] text-xs accent-[#B03E00]"
            >
              {PRICE_TIERS.map((tier, i) => (
                <option key={i} value={i} className="bg-[#3a3b3f]">{getPriceTierLabel(tier, CURRENCY_SYMBOLS[selectedCurrency])}</option>
              ))}
            </select>
            <select
              value={selectedCurrency}
              onChange={e => handleCurrencyChange(e.target.value)}
              className="px-2 py-1.5 bg-[#3a3b3f] border border-white/20 rounded-lg text-[#acb0cd] text-xs accent-[#B03E00]"
            >
              {CURRENCIES.map(c => (
                <option key={c.value} value={c.value} className="bg-[#3a3b3f]">{c.label}</option>
              ))}
            </select>
          </div>

          {/* More options button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-4 py-2.5 bg-transparent border border-white/20 rounded-xl text-[#C0C0C0] hover:bg-white/5 transition-colors"
          >
            <span className="text-sm">More Options</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Filter button */}
          <button
            onClick={applyFilters}
            className="flex items-center gap-2 px-6 py-2.5 bg-transparent border border-[#B03E00] rounded-xl text-[#B03E00] font-medium transition-colors hover:bg-[#B03E00]/10"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filter</span>
          </button>

          {/* Active count + Reset */}
          {activeCount > 0 && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#d39478]/20 border border-[#d39478]/50 rounded-xl text-[#d39478] hover:bg-[#d39478]/30 transition-colors"
            >
              <X className="w-4 h-4" />
              <span className="text-sm">{activeCount} filter{activeCount > 1 ? 's' : ''}</span>
            </button>
          )}
        </div>

        {/* Extended options */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-4 bg-transparent">
            {/* Length with dual slider */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-[#C0C0C0]">Length:</label>
              {(() => {
                const dlenMin = unitPreference === 'meters' ? MIN_LENGTH_M : MIN_LENGTH_FT;
                const dlenMax = unitPreference === 'meters' ? MAX_LENGTH_M : MAX_LENGTH_FT;
                const pctDLL = ((lengthRange[0] - dlenMin) / (dlenMax - dlenMin)) * 100;
                const pctDLR = ((lengthRange[1] - dlenMin) / (dlenMax - dlenMin)) * 100;
                return (
                  <div className="relative min-w-[180px]">
                    {/* Track + tick marks container */}
                    <div className="relative h-6 flex items-center">
                      <div className="absolute w-full h-1 rounded-full" style={{
                        background: `linear-gradient(to right, #4b5563 0%, #4b5563 ${pctDLL}%, #B03E00 ${pctDLL}%, #B03E00 ${pctDLR}%, #4b5563 ${pctDLR}%, #4b5563 100%)`
                      }} />
                      {/* Tick marks overlaid on the track */}
                      {unitPreference === 'meters'
                        ? Array.from({ length: Math.floor((MAX_LENGTH_M - MIN_LENGTH_M) / 10) + 1 }, (_, i) => {
                            const val = MIN_LENGTH_M + i * 10;
                            const pct = ((val - dlenMin) / (dlenMax - dlenMin)) * 100;
                            return (
                              <div key={val} className="absolute flex flex-col items-center pointer-events-none" style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}>
                                <div className="w-px h-3 bg-[#C0C0C0]/80" />
                              </div>
                            );
                          })
                        : Array.from({ length: 14 }, (_, i) => {
                            const val = MIN_LENGTH_FT + i * 30;
                            if (val > MAX_LENGTH_FT) return null;
                            const pct = ((val - dlenMin) / (dlenMax - dlenMin)) * 100;
                            return (
                              <div key={val} className="absolute flex flex-col items-center pointer-events-none" style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}>
                                <div className="w-px h-3 bg-[#C0C0C0]/80" />
                              </div>
                            );
                          })
                      }
                      <input
                        type="range"
                        min={dlenMin}
                        max={dlenMax}
                        step={unitPreference === 'meters' ? 5 : 10}
                        value={lengthRange[0]}
                        onChange={(e) => handleLengthChange(0, Math.min(Number(e.target.value), lengthRange[1] - 10))}
                        className="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-sm [&::-webkit-slider-thumb]:bg-[#B03E00] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-sm [[&::-moz-range-thumb]:bg-[#B03E00]::-moz-range-thumb]:bg-[#B03E00] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none [&::-moz-range-track]:bg-transparent"
                        style={{ zIndex: 5 }}
                      />
                      <input
                        type="range"
                        min={dlenMin}
                        max={dlenMax}
                        step={unitPreference === 'meters' ? 5 : 10}
                        value={lengthRange[1]}
                        onChange={(e) => handleLengthChange(1, Math.max(Number(e.target.value), lengthRange[0] + 10))}
                        className="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-sm [&::-webkit-slider-thumb]:bg-[#B03E00] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-sm [[&::-moz-range-thumb]:bg-[#B03E00]::-moz-range-thumb]:bg-[#B03E00] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none [&::-moz-range-track]:bg-transparent"
                        style={{ zIndex: 5 }}
                      />
                    </div>
                    {/* Labels under tick marks */}
                    <div className="relative h-4">
                      {unitPreference === 'meters'
                        ? Array.from({ length: Math.floor((MAX_LENGTH_M - MIN_LENGTH_M) / 10) + 1 }, (_, i) => {
                            const val = MIN_LENGTH_M + i * 10;
                            const pct = ((val - dlenMin) / (dlenMax - dlenMin)) * 100;
                            return i % 3 === 0 ? (
                              <span key={val} className="absolute text-[10px] text-[#acb0cd]" style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}>{val}</span>
                            ) : null;
                          })
                        : Array.from({ length: 14 }, (_, i) => {
                            const val = MIN_LENGTH_FT + i * 30;
                            if (val > MAX_LENGTH_FT) return null;
                            const pct = ((val - dlenMin) / (dlenMax - dlenMin)) * 100;
                            return i % 2 === 0 ? (
                              <span key={val} className="absolute text-[10px] text-[#acb0cd]" style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}>{val}</span>
                            ) : null;
                          })
                      }
                    </div>
                  </div>
                );
              })()}
              <span className="text-xs text-gray-400 text-center">
                {lengthRange[0]}{unitPreference === 'meters' ? 'm' : 'ft'} - {lengthRange[1]}{unitPreference === 'meters' ? 'm' : 'ft'}
              </span>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => handleUnitChange('meters')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition bg-[#3a3b3f] border border-white/20 ${
                    unitPreference === 'meters' ? 'text-[#B03E00]' : 'text-[#B03E00]'
                  }`}
                >
                  Meters
                </button>
                <button
                  onClick={() => handleUnitChange('feet')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition bg-[#3a3b3f] border border-white/20 ${
                    unitPreference === 'feet' ? 'text-[#B03E00]' : 'text-[#B03E00]'
                  }`}
                >
                  Feet
                </button>
              </div>
            </div>

            {/* Capacity */}
            <div className="flex items-center gap-4">
              <label className="text-sm text-[#C0C0C0] min-w-[60px]">Min guests:</label>
              <input
                type="number"
                min="1"
                max="50"
                value={localFilters.capacity || ''}
                onChange={e => handleChange('capacity', e.target.value ? Number(e.target.value) : '')}
                placeholder=""
                className="w-20 px-3 py-2 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#acb0cd] focus:ring-2 focus:ring-[#d39478] focus:border-transparent"
              />
            </div>

            {/* Options as toggle buttons */}
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={() => handleChange('petFriendly', !localFilters.petFriendly)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition bg-[#3a3b3f] border border-white/20 ${
                  localFilters.petFriendly
                    ? 'text-[#B03E00]'
                    : 'text-[#B03E00]'
                }`}
              >
                Pet Friendly
              </button>
              <button
                onClick={() => handleChange('groupFriendly', !localFilters.groupFriendly)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition bg-[#3a3b3f] border border-white/20 ${
                  localFilters.groupFriendly
                    ? 'text-[#B03E00]'
                    : 'text-[#B03E00]'
                }`}
              >
                Group Friendly
              </button>
              <button
                onClick={() => handleChange('waterToys', !localFilters.waterToys)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition bg-[#3a3b3f] border border-white/20 ${
                  localFilters.waterToys
                    ? 'text-[#B03E00]'
                    : 'text-[#B03E00]'
                }`}
              >
                Water Toys
              </button>
              <button
                onClick={() => handleChange('couplesFriendly', !localFilters.couplesFriendly)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition bg-[#3a3b3f] border border-white/20 ${
                  localFilters.couplesFriendly
                    ? 'text-[#B03E00]'
                    : 'text-[#B03E00]'
                }`}
              >
                Couples Friendly
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile - Fixed button at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#2e2f32] border-t border-white/10 shadow-lg">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`w-full flex items-center justify-center gap-2 py-4 px-6 font-medium ${mobileButtonClass}`}
        >
          <span className={`inline-flex items-center gap-2 ${mobileLabelClass}`}>
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </span>
          {activeCount > 0 && (
            <span className="ml-2 px-2 py-0.5 border border-[#C0C0C0] text-[#C0C0C0] text-xs rounded-full font-semibold">{activeCount}</span>
          )}
        </button>
      </div>

      {/* Mobile - Filter panel */}
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
            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-[#C0C0C0] mb-2">Yacht Type</label>
              <select
                value={localFilters.type}
                onChange={e => handleChange('type', e.target.value)}
                className="w-full px-4 py-3 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#acb0cd] accent-[#B03E00]"
              >
                {YACHT_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-[#C0C0C0] mb-2">Destination</label>
              <select
                value={localFilters.destination}
                onChange={e => handleChange('destination', e.target.value)}
                className="w-full px-4 py-3 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#acb0cd] accent-[#B03E00]"
              >
                {DESTINATIONS.map(d => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </div>

            {/* Sub-region (cascade quand destination a des sous-régions) */}
            {availableSubRegions.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-[#d39478] mb-2">Sub-region</label>
                <select
                  value={localFilters.subRegion || ''}
                  onChange={e => handleChange('subRegion', e.target.value)}
                  className="w-full px-4 py-3 bg-[#3a3b3f] border border-[#B87333]/40 rounded-xl text-[#d39478] accent-[#B03E00]"
                >
                  {availableSubRegions.map(sr => (
                    <option key={sr.value} value={sr.value}>{sr.label}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Dates */}
            <div>
              <label className="block text-sm font-medium text-[#C0C0C0] mb-2">Charter Dates</label>
              <div className="flex gap-2">
                <input
                  type="month"
                  value={(localFilters.startDate || '').slice(0, 7)}
                  onChange={e => handleChange('startDate', e.target.value)}
                  placeholder="yyyy-mm"
                  className="flex-1 px-4 py-3 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#acb0cd] [color-scheme:light]"
                  lang="en-US"
                />
                <input
                  type="month"
                  value={(localFilters.endDate || '').slice(0, 7)}
                  onChange={e => handleChange('endDate', e.target.value)}
                  placeholder="yyyy-mm"
                  className="flex-1 px-4 py-3 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#acb0cd] [color-scheme:light]"
                  lang="en-US"
                />
              </div>
            </div>

            {/* Length with Dual Slider */}
            <div>
              <label className="block text-sm font-medium text-[#C0C0C0] mb-2">Length</label>
              <div className="space-y-3">
                <div className="px-2">
                  {(() => {
                    const lenMin = unitPreference === 'meters' ? MIN_LENGTH_M : MIN_LENGTH_FT;
                    const lenMax = unitPreference === 'meters' ? MAX_LENGTH_M : MAX_LENGTH_FT;
                    const pctL = ((lengthRange[0] - lenMin) / (lenMax - lenMin)) * 100;
                    const pctR = ((lengthRange[1] - lenMin) / (lenMax - lenMin)) * 100;
                    return (
                      <div className="relative">
                        {/* Track + tick marks container */}
                        <div className="relative h-6 flex items-center">
                          <div className="absolute w-full h-1 rounded-full" style={{
                            background: `linear-gradient(to right, #4b5563 0%, #4b5563 ${pctL}%, #B03E00 ${pctL}%, #B03E00 ${pctR}%, #4b5563 ${pctR}%, #4b5563 100%)`
                          }} />
                          {/* Tick marks overlaid on the track */}
                          {unitPreference === 'meters'
                            ? Array.from({ length: Math.floor((MAX_LENGTH_M - MIN_LENGTH_M) / 10) + 1 }, (_, i) => {
                                const val = MIN_LENGTH_M + i * 10;
                                const pct = ((val - lenMin) / (lenMax - lenMin)) * 100;
                                return (
                                  <div key={val} className="absolute flex flex-col items-center pointer-events-none" style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}>
                                    <div className="w-px h-3 bg-[#C0C0C0]/80" />
                                  </div>
                                );
                              })
                            : Array.from({ length: 14 }, (_, i) => {
                                const val = MIN_LENGTH_FT + i * 30;
                                if (val > MAX_LENGTH_FT) return null;
                                const pct = ((val - lenMin) / (lenMax - lenMin)) * 100;
                                return (
                                  <div key={val} className="absolute flex flex-col items-center pointer-events-none" style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}>
                                    <div className="w-px h-3 bg-[#C0C0C0]/80" />
                                  </div>
                                );
                              })
                          }
                          <input
                            type="range"
                            min={lenMin}
                            max={lenMax}
                            step={unitPreference === 'meters' ? 5 : 10}
                            value={lengthRange[0]}
                            onChange={(e) => handleLengthChange(0, Math.min(Number(e.target.value), lengthRange[1] - 10))}
                            className="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-sm [&::-webkit-slider-thumb]:bg-[#B03E00] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-sm [[&::-moz-range-thumb]:bg-[#B03E00]::-moz-range-thumb]:bg-[#B03E00] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none [&::-moz-range-track]:bg-transparent"
                            style={{ zIndex: 5 }}
                          />
                          <input
                            type="range"
                            min={lenMin}
                            max={lenMax}
                            step={unitPreference === 'meters' ? 5 : 10}
                            value={lengthRange[1]}
                            onChange={(e) => handleLengthChange(1, Math.max(Number(e.target.value), lengthRange[0] + 10))}
                            className="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-sm [&::-webkit-slider-thumb]:bg-[#B03E00] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-sm [[&::-moz-range-thumb]:bg-[#B03E00]::-moz-range-thumb]:bg-[#B03E00] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none [&::-moz-range-track]:bg-transparent"
                            style={{ zIndex: 5 }}
                          />
                        </div>
                        {/* Labels under tick marks */}
                        <div className="relative h-4">
                          {unitPreference === 'meters'
                            ? Array.from({ length: Math.floor((MAX_LENGTH_M - MIN_LENGTH_M) / 10) + 1 }, (_, i) => {
                                const val = MIN_LENGTH_M + i * 10;
                                const pct = ((val - lenMin) / (lenMax - lenMin)) * 100;
                                return i % 3 === 0 ? (
                                  <span key={val} className="absolute text-[10px] text-[#acb0cd]" style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}>{val}</span>
                                ) : null;
                              })
                            : Array.from({ length: 14 }, (_, i) => {
                                const val = MIN_LENGTH_FT + i * 30;
                                if (val > MAX_LENGTH_FT) return null;
                                const pct = ((val - lenMin) / (lenMax - lenMin)) * 100;
                                return i % 2 === 0 ? (
                                  <span key={val} className="absolute text-[10px] text-[#acb0cd]" style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}>{val}</span>
                                ) : null;
                              })
                          }
                        </div>
                      </div>
                    );
                  })()}
                  <div className="flex justify-between text-sm text-gray-400 mt-1">
                    <span>{lengthRange[0]}{unitPreference === 'meters' ? 'm' : 'ft'}</span>
                    <span className="text-[#B03E00] font-medium">
                      {lengthRange[1]}{unitPreference === 'meters' ? 'm' : 'ft'}
                    </span>
                  </div>
                </div>

                {/* Toggle Unité - après le slider */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleUnitChange('meters')}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition bg-[#3a3b3f] border border-white/20 ${
                      unitPreference === 'meters' ? 'text-[#B03E00]' : 'text-[#B03E00]'
                    }`}
                  >
                    Meters
                  </button>
                  <button
                    onClick={() => handleUnitChange('feet')}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition bg-[#3a3b3f] border border-white/20 ${
                      unitPreference === 'feet' ? 'text-[#B03E00]' : 'text-[#B03E00]'
                    }`}
                  >
                    Feet
                  </button>
                </div>
              </div>
            </div>

            {/* Price - Select paliers + Currency */}
            <div>
              <label className="block text-sm font-medium text-[#C0C0C0] mb-2">Price</label>
              <div className="flex gap-2">
                <select
                  value={selectedPriceTier}
                  onChange={e => handlePriceTierChange(Number(e.target.value))}
                  className="flex-1 px-4 py-3 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#acb0cd] accent-[#B03E00]"
                >
                  {PRICE_TIERS.map((tier, i) => (
                    <option key={i} value={i} className="bg-[#3a3b3f]">{getPriceTierLabel(tier, CURRENCY_SYMBOLS[selectedCurrency])}</option>
                  ))}
                </select>
                <select
                  value={selectedCurrency}
                  onChange={e => handleCurrencyChange(e.target.value)}
                  className="px-3 py-3 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#acb0cd] accent-[#B03E00]"
                >
                  {CURRENCIES.map(c => (
                    <option key={c.value} value={c.value} className="bg-[#3a3b3f]">{c.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Capacity */}
            <div>
              <label className="block text-sm font-medium text-[#C0C0C0] mb-2">Minimum Guests</label>
              <input
                type="number"
                min="1"
                max="50"
                placeholder=""
                value={localFilters.capacity || ''}
                onChange={e => handleChange('capacity', e.target.value ? Number(e.target.value) : '')}
                className="w-full px-4 py-3 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#acb0cd]"
              />
            </div>

            {/* Options as toggle buttons */}
            <div className="space-y-3">
              <button
                onClick={() => handleChange('petFriendly', !localFilters.petFriendly)}
                className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition bg-[#3a3b3f] border border-white/20 ${
                  localFilters.petFriendly
                    ? 'text-[#B03E00]'
                    : 'text-[#B03E00]'
                }`}
              >
                Pet Friendly
              </button>
              <button
                onClick={() => handleChange('groupFriendly', !localFilters.groupFriendly)}
                className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition bg-[#3a3b3f] border border-white/20 ${
                  localFilters.groupFriendly
                    ? 'text-[#B03E00]'
                    : 'text-[#B03E00]'
                }`}
              >
                Group Friendly
              </button>
              <button
                onClick={() => handleChange('waterToys', !localFilters.waterToys)}
                className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition bg-[#3a3b3f] border border-white/20 ${
                  localFilters.waterToys
                    ? 'text-[#B03E00]'
                    : 'text-[#B03E00]'
                }`}
              >
                Water Toys
              </button>
              <button
                onClick={() => handleChange('couplesFriendly', !localFilters.couplesFriendly)}
                className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition bg-[#3a3b3f] border border-white/20 ${
                  localFilters.couplesFriendly
                    ? 'text-[#B03E00]'
                    : 'text-[#B03E00]'
                }`}
              >
                Couples Friendly
              </button>
            </div>

            {activeCount > 0 && (
              <button
                onClick={handleReset}
                className="w-full px-4 py-3 bg-transparent border-2 border-[#C0C0C0] text-[#C0C0C0] rounded-xl font-medium hover:bg-white/5 transition"
              >
                Reset ({activeCount})
              </button>
            )}
          </div>

          <div className="sticky bottom-0 bg-[#2e2f32] border-t border-white/10 p-6">
            <button
              onClick={() => { applyFilters(); setIsMobileOpen(false); }}
              className="w-full bg-transparent border-2 border-[#C0C0C0] rounded-xl py-3 font-medium transition-all text-[#B03E00] hover:bg-[#B03E00]/10 shadow-[0_4px_15px_rgba(192,192,192,0.3)] hover:shadow-[0_6px_20px_rgba(192,192,192,0.4)]"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
