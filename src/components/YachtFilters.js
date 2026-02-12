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
  { value: 'west-mediterranean', label: 'Western Mediterranean' },
  { value: 'east-mediterranean', label: 'Eastern Mediterranean' },
  { value: 'caribbean', label: 'Caribbean' },
  { value: 'central-america', label: 'Central America' },
  { value: 'indian-ocean', label: 'Indian Ocean' },
  { value: 'south-pacific', label: 'South Pacific' },
  { value: 'arabian-gulf', label: 'Arabian Gulf' },
  { value: 'antarctica', label: 'Antarctica' },
];

const CURRENCIES = [
  { value: 'EUR', label: '€ EUR' },
  { value: 'USD', label: '$ USD' },
  { value: 'GBP', label: '£ GBP' },
];

const MAX_PRICE = 6000000; // 6M = unlimited

export default function YachtFilters({ filters, onChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);
  const [priceRange, setPriceRange] = useState([0, MAX_PRICE]);

  useEffect(() => {
    setLocalFilters(filters);
    setPriceRange([
      filters.priceMin || 0,
      filters.priceMax || MAX_PRICE
    ]);
  }, [filters]);

  const handleChange = (key, value) => {
    const newFilters = {
      ...localFilters,
      [key]: value === '' || value === null ? '' : value
    };
    setLocalFilters(newFilters);
  };

  const handlePriceSliderChange = (e) => {
    const value = Number(e.target.value);
    const newRange = [...priceRange];
    newRange[1] = value;
    setPriceRange(newRange);
    handleChange('priceMax', value === MAX_PRICE ? '' : value);
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
                className="w-36 pl-9 pr-3 py-2.5 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#C0C0C0] focus:ring-2 focus:ring-[#d39478] focus:border-transparent [color-scheme:dark]"
              />
            </div>
            <span className="text-gray-400">-</span>
            <input
              type="date"
              value={localFilters.endDate || ''}
              onChange={e => handleChange('endDate', e.target.value)}
              className="w-36 px-3 py-2.5 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#C0C0C0] focus:ring-2 focus:ring-[#d39478] focus:border-transparent [color-scheme:dark]"
            />
          </div>

          {/* Price Slider */}
          <div className="flex items-center gap-3 min-w-[200px]">
            <select
              value={localFilters.currency || 'EUR'}
              onChange={e => handleChange('currency', e.target.value)}
              className="w-20 px-2 py-2.5 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#C0C0C0] focus:ring-2 focus:ring-[#d39478] focus:border-transparent text-sm"
            >
              {CURRENCIES.map(c => (
                <option key={c.value} value={c.value} className="bg-[#3a3b3f]">{c.label}</option>
              ))}
            </select>
            <div className="flex flex-col gap-1 w-32">
              <input
                type="range"
                min="0"
                max={MAX_PRICE}
                step="10000"
                value={priceRange[1]}
                onChange={handlePriceSliderChange}
                className="w-full h-2 bg-[#3a3b3f] rounded-lg appearance-none cursor-pointer accent-[#d39478]"
              />
              <span className="text-xs text-gray-400 text-center">
                Max: {formatPrice(priceRange[1], true)}{priceRange[1] < MAX_PRICE ? '/week' : ''}
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
            className="flex items-center gap-2 px-6 py-2.5 bg-[#d39478] hover:bg-[#c4826a] rounded-xl text-[#C0C0C0] font-medium transition-colors"
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
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-6 flex-wrap bg-transparent">
            {/* Length */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-300">Length (m):</label>
              <input
                type="number"
                placeholder="Min"
                value={localFilters.minLength || ''}
                onChange={e => handleChange('minLength', e.target.value ? Number(e.target.value) : '')}
                className="w-20 px-3 py-2 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#C0C0C0] focus:ring-2 focus:ring-[#d39478] focus:border-transparent"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="Max"
                value={localFilters.maxLength || ''}
                onChange={e => handleChange('maxLength', e.target.value ? Number(e.target.value) : '')}
                className="w-20 px-3 py-2 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#C0C0C0] focus:ring-2 focus:ring-[#d39478] focus:border-transparent"
              />
            </div>

            {/* Capacity */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-300">Min guests:</label>
              <input
                type="number"
                min="1"
                max="50"
                value={localFilters.capacity || ''}
                onChange={e => handleChange('capacity', e.target.value ? Number(e.target.value) : '')}
                placeholder="8"
                className="w-20 px-3 py-2 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#C0C0C0] focus:ring-2 focus:ring-[#d39478] focus:border-transparent"
              />
            </div>

            {/* Checkboxes */}
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300">
              <input
                type="checkbox"
                checked={localFilters.petFriendly || false}
                onChange={e => handleChange('petFriendly', e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-[#3a3b3f] text-[#d39478] focus:ring-[#d39478] focus:ring-offset-0"
              />
              Pet Friendly
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300">
              <input
                type="checkbox"
                checked={localFilters.groupFriendly || false}
                onChange={e => handleChange('groupFriendly', e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-[#3a3b3f] text-[#d39478] focus:ring-[#d39478] focus:ring-offset-0"
              />
              Group Friendly
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300">
              <input
                type="checkbox"
                checked={localFilters.waterToys || false}
                onChange={e => handleChange('waterToys', e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-[#3a3b3f] text-[#d39478] focus:ring-[#d39478] focus:ring-offset-0"
              />
              Water Toys
            </label>
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
                  className="flex-1 px-4 py-3 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#C0C0C0] [color-scheme:dark]"
                />
                <input
                  type="date"
                  value={localFilters.endDate || ''}
                  onChange={e => handleChange('endDate', e.target.value)}
                  className="flex-1 px-4 py-3 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#C0C0C0] [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Length */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Length (m)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={localFilters.minLength || ''}
                  onChange={e => handleChange('minLength', e.target.value ? Number(e.target.value) : '')}
                  className="flex-1 px-4 py-3 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#C0C0C0]"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={localFilters.maxLength || ''}
                  onChange={e => handleChange('maxLength', e.target.value ? Number(e.target.value) : '')}
                  className="flex-1 px-4 py-3 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#C0C0C0]"
                />
              </div>
            </div>

            {/* Price Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Price per week</label>
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
                <input
                  type="range"
                  min="0"
                  max={MAX_PRICE}
                  step="10000"
                  value={priceRange[1]}
                  onChange={handlePriceSliderChange}
                  className="w-full h-3 bg-[#3a3b3f] rounded-lg appearance-none cursor-pointer accent-[#d39478]"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>0</span>
                  <span className="text-[#d39478] font-medium">Max: {formatPrice(priceRange[1], true)}</span>
                  <span>∞</span>
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
                placeholder="8"
                value={localFilters.capacity || ''}
                onChange={e => handleChange('capacity', e.target.value ? Number(e.target.value) : '')}
                className="w-full px-4 py-3 bg-[#3a3b3f] border border-white/20 rounded-xl text-[#C0C0C0]"
              />
            </div>

            {/* Options */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.petFriendly || false}
                  onChange={e => handleChange('petFriendly', e.target.checked)}
                  className="w-5 h-5 rounded border-white/20 bg-[#3a3b3f] text-[#d39478]"
                />
                <span className="text-[#C0C0C0]">Pet Friendly</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.groupFriendly || false}
                  onChange={e => handleChange('groupFriendly', e.target.checked)}
                  className="w-5 h-5 rounded border-white/20 bg-[#3a3b3f] text-[#d39478]"
                />
                <span className="text-[#C0C0C0]">Group Friendly</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.waterToys || false}
                  onChange={e => handleChange('waterToys', e.target.checked)}
                  className="w-5 h-5 rounded border-white/20 bg-[#3a3b3f] text-[#d39478]"
                />
                <span className="text-[#C0C0C0]">Water Toys</span>
              </label>
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
              className="w-full bg-[#d39478] text-[#C0C0C0] py-3 rounded-xl font-medium hover:bg-[#c4826a] transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
