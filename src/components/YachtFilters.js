'use client';

import { useState, useEffect } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

const YACHT_TYPES = [
  { value: '', label: 'Tous les types' },
  { value: 'motor', label: 'Moteur' },
  { value: 'sailing', label: 'Voilier' },
];

const DESTINATIONS = [
  { value: '', label: 'Toutes destinations' },
  { value: 'caribbean', label: 'Caraïbes' },
  { value: 'west-mediterranean', label: 'Méditerranée Ouest' },
  { value: 'east-mediterranean', label: 'Méditerranée Est' },
  { value: 'bahamas', label: 'Bahamas' },
  { value: 'indian-ocean', label: 'Océan Indien' },
  { value: 'south-pacific', label: 'Pacifique Sud' },
];

const CURRENCIES = [
  { value: 'EUR', label: '€ EUR' },
  { value: 'USD', label: '$ USD' },
  { value: 'GBP', label: '£ GBP' },
];

export default function YachtFilters({ filters, onChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => setLocalFilters(filters), [filters]);

  const handleChange = (key, value) => {
    const newFilters = {
      ...localFilters,
      [key]: value === '' || value === null ? '' : value
    };
    setLocalFilters(newFilters);
    onChange(newFilters);
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
      groupFriendly: false
    };
    setLocalFilters(emptyFilters);
    onChange(emptyFilters);
  };

  const activeCount = Object.entries(localFilters).filter(([key, v]) => {
    if (key === 'currency' && v === '') return false;
    return v && v !== '' && v !== false;
  }).length;

  return (
    <>
      {/* Desktop - Filtres horizontaux sticky */}
      <div className="hidden md:block sticky top-20 z-40 bg-[#1b223d]/95 backdrop-blur-sm py-4 -mx-4 px-4 border-b border-white/10">
        {/* Ligne principale des filtres */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Type */}
          <div className="flex-1 min-w-[150px] max-w-[200px]">
            <select
              value={localFilters.type}
              onChange={e => handleChange('type', e.target.value)}
              className="w-full px-4 py-2.5 bg-[#252540] border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {YACHT_TYPES.map(t => (
                <option key={t.value} value={t.value} className="bg-[#252540]">{t.label}</option>
              ))}
            </select>
          </div>

          {/* Destination */}
          <div className="flex-1 min-w-[180px] max-w-[220px]">
            <select
              value={localFilters.destination}
              onChange={e => handleChange('destination', e.target.value)}
              className="w-full px-4 py-2.5 bg-[#252540] border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {DESTINATIONS.map(d => (
                <option key={d.value} value={d.value} className="bg-[#252540]">{d.label}</option>
              ))}
            </select>
          </div>

          {/* Longueur */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Long. min"
              value={localFilters.minLength || ''}
              onChange={e => handleChange('minLength', e.target.value ? Number(e.target.value) : '')}
              className="w-24 px-3 py-2.5 bg-[#252540] border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="max (m)"
              value={localFilters.maxLength || ''}
              onChange={e => handleChange('maxLength', e.target.value ? Number(e.target.value) : '')}
              className="w-24 px-3 py-2.5 bg-[#252540] border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Prix */}
          <div className="flex items-center gap-2">
            <select
              value={localFilters.currency || 'EUR'}
              onChange={e => handleChange('currency', e.target.value)}
              className="w-20 px-2 py-2.5 bg-[#252540] border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            >
              {CURRENCIES.map(c => (
                <option key={c.value} value={c.value} className="bg-[#252540]">{c.label}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Prix min"
              value={localFilters.priceMin || ''}
              onChange={e => handleChange('priceMin', e.target.value ? Number(e.target.value) : '')}
              className="w-24 px-3 py-2.5 bg-[#252540] border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="max"
              value={localFilters.priceMax || ''}
              onChange={e => handleChange('priceMax', e.target.value ? Number(e.target.value) : '')}
              className="w-24 px-3 py-2.5 bg-[#252540] border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Bouton Plus d'options */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-4 py-2.5 bg-transparent border border-white/20 rounded-xl text-white hover:bg-white/5 transition-colors"
          >
            <span className="text-sm">Plus d'options</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Compteur actif + Reset */}
          {activeCount > 0 && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2.5 bg-orange-500/20 border border-orange-500/50 rounded-xl text-orange-400 hover:bg-orange-500/30 transition-colors"
            >
              <X className="w-4 h-4" />
              <span className="text-sm">{activeCount} filtre{activeCount > 1 ? 's' : ''}</span>
            </button>
          )}
        </div>

        {/* Options étendues */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-6 flex-wrap bg-transparent">
            {/* Capacité */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-300">Passagers min:</label>
              <input
                type="number"
                min="1"
                max="50"
                value={localFilters.capacity || ''}
                onChange={e => handleChange('capacity', e.target.value ? Number(e.target.value) : '')}
                placeholder="8"
                className="w-20 px-3 py-2 bg-[#252540] border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Checkboxes */}
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300">
              <input
                type="checkbox"
                checked={localFilters.petFriendly || false}
                onChange={e => handleChange('petFriendly', e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-[#252540] text-orange-500 focus:ring-orange-500 focus:ring-offset-0"
              />
              Animaux acceptés
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300">
              <input
                type="checkbox"
                checked={localFilters.groupFriendly || false}
                onChange={e => handleChange('groupFriendly', e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-[#252540] text-orange-500 focus:ring-orange-500 focus:ring-offset-0"
              />
              Groupes acceptés
            </label>
          </div>
        )}
      </div>

      {/* Mobile - Bouton fixe en bas */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1b223d] border-t border-white/10 shadow-lg">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full flex items-center justify-center gap-2 py-4 px-6 text-white font-medium"
        >
          <Filter className="w-5 h-5" />
          <span>Filtres</span>
          {activeCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full">{activeCount}</span>
          )}
        </button>
      </div>

      {/* Mobile - Panel de filtres */}
      <div className={`md:hidden fixed inset-0 z-50 transition-transform duration-300 ${isMobileOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)} />
        <div className="absolute bottom-0 left-0 right-0 bg-[#1b223d] rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto">
          <div className="sticky top-0 bg-[#1b223d] border-b border-white/10 px-6 py-4 flex items-center justify-between rounded-t-3xl">
            <h2 className="text-lg font-bold text-white">Filtres</h2>
            <button onClick={() => setIsMobileOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Type de yacht</label>
              <select
                value={localFilters.type}
                onChange={e => handleChange('type', e.target.value)}
                className="w-full px-4 py-3 bg-[#252540] border border-white/20 rounded-xl text-white"
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
                className="w-full px-4 py-3 bg-[#252540] border border-white/20 rounded-xl text-white"
              >
                {DESTINATIONS.map(d => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </div>

            {/* Longueur */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Longueur (m)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={localFilters.minLength || ''}
                  onChange={e => handleChange('minLength', e.target.value ? Number(e.target.value) : '')}
                  className="flex-1 px-4 py-3 bg-[#252540] border border-white/20 rounded-xl text-white"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={localFilters.maxLength || ''}
                  onChange={e => handleChange('maxLength', e.target.value ? Number(e.target.value) : '')}
                  className="flex-1 px-4 py-3 bg-[#252540] border border-white/20 rounded-xl text-white"
                />
              </div>
            </div>

            {/* Prix */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Prix par semaine</label>
              <select
                value={localFilters.currency || 'EUR'}
                onChange={e => handleChange('currency', e.target.value)}
                className="w-full px-4 py-3 bg-[#252540] border border-white/20 rounded-xl text-white mb-2"
              >
                {CURRENCIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Prix min"
                  value={localFilters.priceMin || ''}
                  onChange={e => handleChange('priceMin', e.target.value ? Number(e.target.value) : '')}
                  className="flex-1 px-4 py-3 bg-[#252540] border border-white/20 rounded-xl text-white"
                />
                <input
                  type="number"
                  placeholder="Prix max"
                  value={localFilters.priceMax || ''}
                  onChange={e => handleChange('priceMax', e.target.value ? Number(e.target.value) : '')}
                  className="flex-1 px-4 py-3 bg-[#252540] border border-white/20 rounded-xl text-white"
                />
              </div>
            </div>

            {/* Capacité */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Passagers minimum</label>
              <input
                type="number"
                min="1"
                max="50"
                placeholder="8"
                value={localFilters.capacity || ''}
                onChange={e => handleChange('capacity', e.target.value ? Number(e.target.value) : '')}
                className="w-full px-4 py-3 bg-[#252540] border border-white/20 rounded-xl text-white"
              />
            </div>

            {/* Options */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.petFriendly || false}
                  onChange={e => handleChange('petFriendly', e.target.checked)}
                  className="w-5 h-5 rounded border-white/20 bg-[#252540] text-orange-500"
                />
                <span className="text-white">Animaux acceptés</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.groupFriendly || false}
                  onChange={e => handleChange('groupFriendly', e.target.checked)}
                  className="w-5 h-5 rounded border-white/20 bg-[#252540] text-orange-500"
                />
                <span className="text-white">Groupes acceptés</span>
              </label>
            </div>

            {activeCount > 0 && (
              <button
                onClick={handleReset}
                className="w-full px-4 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition"
              >
                Réinitialiser ({activeCount})
              </button>
            )}
          </div>

          <div className="sticky bottom-0 bg-[#1b223d] border-t border-white/10 p-6">
            <button
              onClick={() => setIsMobileOpen(false)}
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-medium hover:bg-orange-600 transition"
            >
              Voir les résultats
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
