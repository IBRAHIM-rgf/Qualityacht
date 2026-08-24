'use client';

import { useState, useEffect } from 'react';
import { Filter, X, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import MonthPicker from './MonthPicker';

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
// Caribbean : 8 sous-regions = les 8 cards de caribbean-v15.
const SUB_REGIONS_BY_REGION = {
  caribbean: [
    { value: '', label: 'All Caribbean sub-regions' },
    { value: 'greater-antilles',      label: 'Greater Antilles' },
    { value: 'leeward-islands',       label: 'Leeward Islands' },
    { value: 'leeward-antilles',      label: 'Leeward Antilles' },
    { value: 'windward-islands',      label: 'Windward Islands' },
    { value: 'turks-caicos',          label: 'Turks & Caicos' },
    { value: 'trinidad-tobago',       label: 'Trinidad & Tobago' },
    { value: 'grand-cayman',          label: 'Grand Cayman' },
    { value: 'emerging-destinations', label: 'Emerging Destinations' },
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
      {/* Desktop - Bouton Filter flottant en bas au CENTRE (translucide, ouvre un volet a droite) */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-40 items-center gap-2 px-6 py-3 bg-[#3a3b3f]/80 backdrop-blur-md border border-[#C0C0C0] rounded-xl text-[#B03E00] font-medium shadow-2xl transition-colors hover:bg-[#B03E00]/10"
      >
        <Filter className="w-5 h-5" />
        <span className="text-sm uppercase tracking-[0.15em]">Filter</span>
        {activeCount > 0 && (
          <span className="ml-1 px-2 py-0.5 border border-[#C0C0C0] text-[#C0C0C0] text-xs rounded-full font-semibold">{activeCount}</span>
        )}
      </button>

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
                <label className="block text-sm font-medium text-[#bd9973] mb-2">Sub-region</label>
                <select
                  value={localFilters.subRegion || ''}
                  onChange={e => handleChange('subRegion', e.target.value)}
                  className="w-full px-4 py-3 bg-[#3a3b3f] border border-[#B87333]/40 rounded-xl text-[#bd9973] accent-[#B03E00]"
                >
                  {availableSubRegions.map(sr => (
                    <option key={sr.value} value={sr.value}>{sr.label}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Dates : MonthPicker custom (popover avec grille mois + logo Qualityacht sur passés) */}
            <div>
              <label className="block text-sm font-medium text-[#C0C0C0] mb-2">Charter Dates</label>
              <div className="grid grid-cols-2 gap-2">
                <MonthPicker
                  value={(localFilters.startDate || '').slice(0, 7)}
                  onChange={(v) => handleChange('startDate', v)}
                  placeholder="From"
                />
                <MonthPicker
                  value={(localFilters.endDate || '').slice(0, 7)}
                  onChange={(v) => handleChange('endDate', v)}
                  placeholder="To"
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
                    const unit = unitPreference === 'meters' ? 'm' : 'ft';
                    return (
                      <div className="relative">
                        {/* Bulles dynamiques au-dessus des thumbs (suivent la valeur) */}
                        <div className="relative h-4 mb-1">
                          <span className="absolute text-[10px] font-bold text-[#B03E00] -translate-x-1/2" style={{ left: `${pctL}%` }}>
                            {lengthRange[0]}{unit}
                          </span>
                          <span className="absolute text-[10px] font-bold text-[#B03E00] -translate-x-1/2" style={{ left: `${pctR}%` }}>
                            {lengthRange[1]}{unit}
                          </span>
                        </div>
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
                </div>

                {/* Toggle Unité - après le slider */}
                <div className="flex gap-3">
                  {['meters', 'feet'].map((u) => {
                    const active = unitPreference === u;
                    return (
                      <button key={u} onClick={() => handleUnitChange(u)}
                        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition border ${
                          active
                            ? 'bg-[#B03E00] border-[#B03E00] text-white'
                            : 'bg-[#3a3b3f] border-white/20 text-[#B03E00] hover:border-[#B03E00]'
                        }`}>
                        {u === 'meters' ? 'Meters' : 'Feet'}
                      </button>
                    );
                  })}
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
              <button
                onClick={handleReset}
                className="w-full px-4 py-3 bg-transparent border-2 border-[#C0C0C0] text-[#C0C0C0] rounded-xl font-medium hover:bg-white/5 transition"
              >
                Reset ({activeCount})
              </button>
            )}
          </div>

          <div className="sticky bottom-0 bg-[#2e2f32]/95 backdrop-blur-sm border-t border-white/10 p-6">
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
