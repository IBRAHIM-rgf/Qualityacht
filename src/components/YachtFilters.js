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

const CURRENCIES = [
  { value: 'EUR', label: '€ EUR' },
  { value: 'USD', label: '$ USD' },
  { value: 'GBP', label: '£ GBP' },
];

const MAX_PRICE = 6000000;
const MIN_LENGTH_M = 10;
const MAX_LENGTH_M = 140;
const MIN_LENGTH_FT = 33; // ~10m
const MAX_LENGTH_FT = 459; // ~140m

export default function YachtFilters({ filters, onChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);
  const [priceRange, setPriceRange] = useState([0, MAX_PRICE]);
  const [lengthRange, setLengthRange] = useState([MIN_LENGTH_M, MAX_LENGTH_M]);
  const [unitPreference, setUnitPreference] = useState('meters');

  useEffect(() => {
    setLocalFilters(filters);
    setPriceRange([
      filters.priceMin || 0,
      filters.priceMax || MAX_PRICE
    ]);
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
    setLocalFilters(newFilters);
  };

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

  const handleLengthChange = (index, value) => {
    const newRange = [...lengthRange];
    newRange[index] = Number(value);
    setLengthRange(newRange);

    // Convert to meters for filters
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
      startDate: '',
      endDate: ''
    };
    setLocalFilters(emptyFilters);
    setPriceRange([0, MAX_PRICE]);
    setLengthRange([MIN_LENGTH_M, MAX_LENGTH_M]);
    onChange(emptyFilters);
  };

  const activeCount = Object.entries(localFilters).filter(([key, v]) => {
    if (key === 'currency' && v === '') return false;
    return v && v !== '' && v !== false;
  }).length;

  const formatPrice = (price, showUnlimited = false) => {
    if (showUnlimited && price >= MAX_PRICE) return 'Unlimited';
    if (price >= 1000000) return `${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `${(price / 1000).toFixed(0)}k`;
    return price.toString();
  };

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
              className="w-full px-4 py-2.5 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#C0C0C0] focus:ring-2 focus:ring-[#d39478] focus:border-transparent"
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
              className="w-full px-4 py-2.5 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#C0C0C0] focus:ring-2 focus:ring-[#d39478] focus:border-transparent"
            >
              {DESTINATIONS.map(d => (
                <option key={d.value} value={d.value} className="bg-[#3a3b3f]">{d.label}</option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={localFilters.startDate || ''}
                onChange={e => handleChange('startDate', e.target.value)}
                className="w-36 pl-9 pr-3 py-2.5 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#C0C0C0] focus:ring-2 focus:ring-[#d39478] focus:border-transparent [color-scheme:light]"
                lang="en-US"
              />
            </div>
            <span className="text-gray-400">-</span>
            <input
              type="date"
              value={localFilters.endDate || ''}
              onChange={e => handleChange('endDate', e.target.value)}
              className="w-36 px-3 py-2.5 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#C0C0C0] focus:ring-2 focus:ring-[#d39478] focus:border-transparent [color-scheme:light]"
              lang="en-US"
            />
          </div>

          {/* Price Range - Dual Slider */}
          <div className="flex items-center gap-3 min-w-[220px]">
            <select
              value={localFilters.currency || 'EUR'}
              onChange={e => handleChange('currency', e.target.value)}
              className="w-16 px-2 py-2.5 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#C0C0C0] focus:ring-2 focus:ring-[#f97316] focus:border-transparent text-xs"
            >
              {CURRENCIES.map(c => (
                <option key={c.value} value={c.value} className="bg-[#3a3b3f]">{c.label}</option>
              ))}
            </select>
            <div className="flex flex-col gap-1 flex-1">
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max={MAX_PRICE}
                  step="10000"
                  value={priceRange[0]}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value < priceRange[1]) {
                      setPriceRange([value, priceRange[1]]);
                      handleChange('priceMin', value === 0 ? '' : value);
                    }
                  }}
                  className="absolute w-full h-1 bg-transparent rounded-lg appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#B03E00] [&::-webkit-slider-thumb]:border border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#B03E00] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md"
                  style={{ zIndex: priceRange[0] > MAX_PRICE * 0.5 ? 5 : 3 }}
                />
                <input
                  type="range"
                  min="0"
                  max={MAX_PRICE}
                  step="10000"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value > priceRange[0]) {
                      setPriceRange([priceRange[0], value]);
                      handleChange('priceMax', value === MAX_PRICE ? '' : value);
                    }
                  }}
                  className="relative w-full h-1 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-runnable-track]:bg-[#B03E00] [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#B03E00] [&::-webkit-slider-thumb]:border border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-track]:bg-[#B03E00] [&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-lg [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#B03E00] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md"
                />
              </div>
              <span className="text-xs text-gray-400 text-center">
                {formatPrice(priceRange[0])} - {formatPrice(priceRange[1], true)}
              </span>
            </div>
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
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-300 min-w-[60px]">Length:</label>
              <div className="flex gap-2">
                <button
                  onClick={() => handleUnitChange('meters')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    unitPreference === 'meters'
                      ? 'bg-[#B03E00] text-[#C0C0C0]'
                      : 'bg-[#3a3b3f] text-gray-400'
                  }`}
                >
                  Meters
                </button>
                <button
                  onClick={() => handleUnitChange('feet')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    unitPreference === 'feet'
                      ? 'bg-[#B03E00] text-[#C0C0C0]'
                      : 'bg-[#3a3b3f] text-gray-400'
                  }`}
                >
                  Feet
                </button>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <div className="relative">
                  <input
                    type="range"
                    min={unitPreference === 'meters' ? MIN_LENGTH_M : MIN_LENGTH_FT}
                    max={unitPreference === 'meters' ? MAX_LENGTH_M : MAX_LENGTH_FT}
                    step={unitPreference === 'meters' ? 5 : 10}
                    value={lengthRange[0]}
                    onChange={(e) => handleLengthChange(0, e.target.value)}
                    className="absolute w-full h-1 bg-transparent rounded-lg appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#B03E00] [&::-webkit-slider-thumb]:border border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#B03E00] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md"
                    style={{ zIndex: 5 }}
                  />
                  <input
                    type="range"
                    min={unitPreference === 'meters' ? MIN_LENGTH_M : MIN_LENGTH_FT}
                    max={unitPreference === 'meters' ? MAX_LENGTH_M : MAX_LENGTH_FT}
                    step={unitPreference === 'meters' ? 5 : 10}
                    value={lengthRange[1]}
                    onChange={(e) => handleLengthChange(1, e.target.value)}
                    className="relative w-full h-1 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-runnable-track]:bg-[#B03E00] [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#B03E00] [&::-webkit-slider-thumb]:border border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-track]:bg-[#B03E00] [&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-lg [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#B03E00] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md"
                  />
                </div>
                <span className="text-xs text-gray-400 text-center">
                  {lengthRange[0]}{unitPreference === 'meters' ? 'm' : 'ft'} - {lengthRange[1]}{unitPreference === 'meters' ? 'm' : 'ft'}
                </span>
              </div>
            </div>

            {/* Capacity */}
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-300 min-w-[60px]">Min guests:</label>
              <input
                type="number"
                min="1"
                max="50"
                value={localFilters.capacity || ''}
                onChange={e => handleChange('capacity', e.target.value ? Number(e.target.value) : '')}
                placeholder=""
                className="w-20 px-3 py-2 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#C0C0C0] focus:ring-2 focus:ring-[#d39478] focus:border-transparent"
              />
            </div>

            {/* Options as toggle buttons */}
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={() => handleChange('petFriendly', !localFilters.petFriendly)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  localFilters.petFriendly
                    ? 'bg-[#B03E00] text-[#C0C0C0]'
                    : 'bg-[#3a3b3f] text-gray-400 border border-white/20'
                }`}
              >
                Pet Friendly
              </button>
              <button
                onClick={() => handleChange('groupFriendly', !localFilters.groupFriendly)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  localFilters.groupFriendly
                    ? 'bg-[#B03E00] text-[#C0C0C0]'
                    : 'bg-[#3a3b3f] text-gray-400 border border-white/20'
                }`}
              >
                Group Friendly
              </button>
              <button
                onClick={() => handleChange('waterToys', !localFilters.waterToys)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  localFilters.waterToys
                    ? 'bg-[#B03E00] text-[#C0C0C0]'
                    : 'bg-[#3a3b3f] text-gray-400 border border-white/20'
                }`}
              >
                Water Toys
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile - Fixed button at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#2e2f32] border-t border-white/10 shadow-lg">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full flex items-center justify-center gap-2 py-4 px-6 text-[#C0C0C0] font-medium"
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
          {activeCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-[#d39478] text-[#C0C0C0] text-xs rounded-full">{activeCount}</span>
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
              <label className="block text-sm font-medium text-gray-300 mb-2">Yacht Type</label>
              <select
                value={localFilters.type}
                onChange={e => handleChange('type', e.target.value)}
                className="w-full px-4 py-3 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#C0C0C0]"
              >
                {YACHT_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Destination</label>
              <select
                value={localFilters.destination}
                onChange={e => handleChange('destination', e.target.value)}
                className="w-full px-4 py-3 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#C0C0C0]"
              >
                {DESTINATIONS.map(d => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </div>

            {/* Dates */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Charter Dates</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={localFilters.startDate || ''}
                  onChange={e => handleChange('startDate', e.target.value)}
                  className="flex-1 px-4 py-3 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#C0C0C0] [color-scheme:light]"
                  lang="en-US"
                />
                <input
                  type="date"
                  value={localFilters.endDate || ''}
                  onChange={e => handleChange('endDate', e.target.value)}
                  className="flex-1 px-4 py-3 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#C0C0C0] [color-scheme:light]"
                  lang="en-US"
                />
              </div>
            </div>

            {/* Length with Dual Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Length</label>
              <div className="space-y-3">
                {/* Toggle Unité */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleUnitChange('meters')}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
                      unitPreference === 'meters'
                        ? 'bg-[#B03E00] text-[#C0C0C0]'
                        : 'bg-[#3a3b3f] text-gray-400'
                    }`}
                  >
                    Meters
                  </button>
                  <button
                    onClick={() => handleUnitChange('feet')}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
                      unitPreference === 'feet'
                        ? 'bg-[#B03E00] text-[#C0C0C0]'
                        : 'bg-[#3a3b3f] text-gray-400'
                    }`}
                  >
                    Feet
                  </button>
                </div>

                <div className="px-2">
                  <div className="relative h-8">
                    <input
                      type="range"
                      min={unitPreference === 'meters' ? MIN_LENGTH_M : MIN_LENGTH_FT}
                      max={unitPreference === 'meters' ? MAX_LENGTH_M : MAX_LENGTH_FT}
                      step={unitPreference === 'meters' ? 5 : 10}
                      value={lengthRange[0]}
                      onChange={(e) => handleLengthChange(0, e.target.value)}
                      className="absolute w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#B03E00] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#B03E00] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg"
                      style={{ zIndex: 5 }}
                    />
                    <input
                      type="range"
                      min={unitPreference === 'meters' ? MIN_LENGTH_M : MIN_LENGTH_FT}
                      max={unitPreference === 'meters' ? MAX_LENGTH_M : MAX_LENGTH_FT}
                      step={unitPreference === 'meters' ? 5 : 10}
                      value={lengthRange[1]}
                      onChange={(e) => handleLengthChange(1, e.target.value)}
                      className="absolute w-full h-2 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-runnable-track]:bg-[#B03E00] [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#B03E00] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-track]:bg-[#B03E00] [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-lg [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#B03E00] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>{lengthRange[0]}{unitPreference === 'meters' ? 'm' : 'ft'}</span>
                    <span className="text-[#B03E00] font-medium">
                      {lengthRange[1]}{unitPreference === 'meters' ? 'm' : 'ft'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Range with Dual Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
              <select
                value={localFilters.currency || 'EUR'}
                onChange={e => handleChange('currency', e.target.value)}
                className="w-full px-4 py-3 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#C0C0C0] mb-3"
              >
                {CURRENCIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>

              <div className="px-2">
                <div className="relative h-8">
                  <input
                    type="range"
                    min="0"
                    max={MAX_PRICE}
                    step="10000"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value < priceRange[1]) {
                        setPriceRange([value, priceRange[1]]);
                        handleChange('priceMin', value === 0 ? '' : value);
                      }
                    }}
                    className="absolute w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#B03E00] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#B03E00] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg"
                    style={{ zIndex: 5 }}
                  />
                  <input
                    type="range"
                    min="0"
                    max={MAX_PRICE}
                    step="10000"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value > priceRange[0]) {
                        setPriceRange([priceRange[0], value]);
                        handleChange('priceMax', value === MAX_PRICE ? '' : value);
                      }
                    }}
                    className="absolute w-full h-2 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-runnable-track]:bg-[#B03E00] [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#B03E00] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-track]:bg-[#B03E00] [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-lg [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#B03E00] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span className="text-[#B03E00] font-medium">
                    {formatPrice(priceRange[1], true)}
                  </span>
                </div>
              </div>
            </div>

            {/* Capacity */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Minimum Guests</label>
              <input
                type="number"
                min="1"
                max="50"
                placeholder=""
                value={localFilters.capacity || ''}
                onChange={e => handleChange('capacity', e.target.value ? Number(e.target.value) : '')}
                className="w-full px-4 py-3 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#C0C0C0]"
              />
            </div>

            {/* Options as toggle buttons */}
            <div className="space-y-3">
              <button
                onClick={() => handleChange('petFriendly', !localFilters.petFriendly)}
                className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition ${
                  localFilters.petFriendly
                    ? 'bg-[#B03E00] text-[#C0C0C0]'
                    : 'bg-[#3a3b3f] text-gray-400 border border-white/20'
                }`}
              >
                Pet Friendly
              </button>
              <button
                onClick={() => handleChange('groupFriendly', !localFilters.groupFriendly)}
                className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition ${
                  localFilters.groupFriendly
                    ? 'bg-[#B03E00] text-[#C0C0C0]'
                    : 'bg-[#3a3b3f] text-gray-400 border border-white/20'
                }`}
              >
                Group Friendly
              </button>
              <button
                onClick={() => handleChange('waterToys', !localFilters.waterToys)}
                className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition ${
                  localFilters.waterToys
                    ? 'bg-[#B03E00] text-[#C0C0C0]'
                    : 'bg-[#3a3b3f] text-gray-400 border border-white/20'
                }`}
              >
                Water Toys
              </button>
            </div>

            {activeCount > 0 && (
              <button
                onClick={handleReset}
                className="w-full px-4 py-3 bg-white/10 text-[#C0C0C0] rounded-xl font-medium hover:bg-white/20 transition"
              >
                Reset ({activeCount})
              </button>
            )}
          </div>

          <div className="sticky bottom-0 bg-[#2e2f32] border-t border-white/10 p-6">
            <button
              onClick={() => { applyFilters(); setIsMobileOpen(false); }}
              className="w-full bg-gradient-to-r from-[#3a3b3f]/50 via-[#f97316] to-[#3a3b3f]/50 hover:from-[#3a3b3f]/60 hover:via-[#f97316]/90 hover:to-[#3a3b3f]/60 rounded-xl py-3 border border-[#C0C0C0] font-medium transition-all shadow-[0_4px_15px_rgba(192,192,192,0.3)] hover:shadow-[0_6px_20px_rgba(192,192,192,0.4)] text-[#C0C0C0]"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
