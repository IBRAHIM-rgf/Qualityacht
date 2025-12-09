'use client';

import { useState, useEffect } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';

const YACHT_TYPES = [
  { value: '', label: 'Tous les types' },
  { value: 'motor', label: 'Moteur' },
  { value: 'sailing', label: 'Voilier' },
  { value: 'catamaran', label: 'Catamaran' },
  { value: 'gulet', label: 'Gulet' },
  { value: 'power catamaran', label: 'Catamaran à Moteur' },
  { value: 'classic', label: 'Classique' },
  { value: 'expedition', label: 'Expedition' },
  { value: 'sport fishing', label: 'Pêche Sportive' },
];

const DESTINATIONS = [
  { value: '', label: 'Toutes les destinations' },
  { value: 'caribbean', label: 'Caraïbes' },
  { value: 'west-mediterranean', label: 'Méditerranée Occidentale' },
  { value: 'east-mediterranean', label: 'Méditerranée Orientale' },
  { value: 'bahamas', label: 'Bahamas' },
  { value: 'north-america', label: 'Amérique du Nord' },
  { value: 'northern-europe', label: 'Europe du Nord' },
  { value: 'indian-ocean', label: 'Océan Indien' },
  { value: 'south-pacific', label: 'Pacifique Sud' },
];

const CHARTER_TYPES = [
  { value: '', label: 'Tous les charters' },
  { value: 'Crewed', label: 'Avec équipage' },
  { value: 'Bareboat', label: 'Sans équipage (Bareboat)' },
];

const CURRENCIES = [
  { value: 'EUR', label: 'Euro (€)' },
  { value: 'USD', label: 'Dollar US ($)' },
  { value: 'GBP', label: 'Livre Sterling (£)' },
];

export default function YachtFilters({ filters, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  // Utiliser les filtres initiaux pour l'état local
  const [localFilters, setLocalFilters] = useState(filters);

  // Synchronise l'état local si les props 'filters' changent (ex: via l'URL)
  useEffect(() => setLocalFilters(filters), [filters]);

  const handleChange = (key, value) => {
    const newFilters = { 
      ...localFilters, 
      [key]: value === '' || value === null ? '' : value // Assure que les champs vides sont bien des chaînes vides
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
      currency: '', // Définir une devise par défaut
      petFriendly: false, 
      groupFriendly: false 
    };
    setLocalFilters(emptyFilters);
    onChange(emptyFilters);
  };

  // Correction de la façon de compter les filtres actifs
  const activeCount = Object.entries(localFilters).filter(([key, v]) => {
    // Exclure la devise si c'est la valeur par défaut pour ne pas la compter comme filtre actif
    if (key === 'currency' && v === '') return false;
    // Compte toutes les autres valeurs non nulles, non vides, et non fausses
    return v && v !== '' && v !== false;
  }).length;
  
  // Initialise la devise locale si elle n'est pas définie
  


  return (
    <>
      {/* Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1b223d] border-t border-gray-200 shadow-lg">
        <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-center gap-2 py-4 px-6 text-white font-medium">
          <Filter className="w-5 h-5" />
          <span>Filtres</span>
          {activeCount > 0 && <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">{activeCount}</span>}
        </button>
      </div>

      <div className={`md:hidden fixed inset-0 z-50 transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
            <h2 className="text-lg font-bold text-gray-900">Filtres</h2>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 space-y-6">
            <FilterContent localFilters={localFilters} handleChange={handleChange} handleReset={handleReset} activeCount={activeCount} />
          </div>
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
            <button onClick={() => setIsOpen(false)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition">Voir les résultats</button>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block bg-white rounded-2xl shadow-lg p-6 sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Filtres</h2>
          {activeCount > 0 && <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">{activeCount} actif{activeCount>1?'s':''}</span>}
        </div>
        <FilterContent localFilters={localFilters} handleChange={handleChange} handleReset={handleReset} activeCount={activeCount} />
      </div>
    </>
  );
}

function FilterContent({ localFilters, handleChange, handleReset, activeCount }) {
  const [expandedSections, setExpandedSections] = useState({ type: true, destination: true, details: true, pricing: true, options: false });
  const toggleSection = section => setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));

  return (
    <div className="space-y-4">
      {/* Type */}
      <div className="space-y-3 border-b border-gray-200 pb-4">
        <button onClick={() => toggleSection('type')} className="w-full flex items-center justify-between text-left">
          <label className="text-sm font-semibold text-gray-900">Type de yacht</label>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.type ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.type && (
          <select value={localFilters.type} onChange={e => handleChange('type', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900">
            {YACHT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        )}
      </div>

      {/* Destination */}
      <div className="space-y-3 border-b border-gray-200 pb-4">
        <button onClick={() => toggleSection('destination')} className="w-full flex items-center justify-between text-left">
          <label className="text-sm font-semibold text-gray-900">Destination</label>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.destination ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.destination && (
          <select value={localFilters.destination} onChange={e => handleChange('destination', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900">
            {DESTINATIONS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
          </select>
        )}
      </div>

      {/* Détails techniques (Longueur et Capacité) */}
      <div className="space-y-3 border-b border-gray-200 pb-4">
        <button onClick={() => toggleSection('details')} className="w-full flex items-center justify-between text-left">
          <label className="text-sm font-semibold text-gray-900">Spécifications</label>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.details ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.details && (
          <div className="space-y-4 pt-2">
            {/* Capacité (sleeps) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Passagers (min)</label>
              <input type="number" min="1" max="50" value={localFilters.capacity || ''} onChange={e => handleChange('capacity', e.target.value ? Number(e.target.value) : '')} placeholder="8" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900" />
            </div>
            
            {/* Longueur min */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Longueur min (m)</label>
              <input type="number" min="10" step="5" value={localFilters.minLength || ''} onChange={e => handleChange('minLength', e.target.value ? Number(e.target.value) : '')} placeholder="40" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900" />
            </div>

            {/* Longueur max */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Longueur max (m)</label>
              <input type="number" min="10" step="5" value={localFilters.maxLength || ''} onChange={e => handleChange('maxLength', e.target.value ? Number(e.target.value) : '')} placeholder="45" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900" />
            </div>
          </div>
        )}
      </div>

      {/* Prix (Currency et min/max) */}
      <div className="space-y-3 border-b border-gray-200 pb-4">
        <button onClick={() => toggleSection('pricing')} className="w-full flex items-center justify-between text-left">
          <label className="text-sm font-semibold text-gray-900">Prix & Devises</label>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.pricing ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.pricing && (
          <div className="space-y-4 pt-2">
            {/* Devise */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Devise</label>
              <select value={localFilters.currency || CURRENCIES[0].value} onChange={e => handleChange('currency', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900">
                {CURRENCIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            
            {/* Prix Min */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Prix min (/semaine)</label>
              <input type="number" min="0" step="1000" value={localFilters.priceMin || ''} onChange={e => handleChange('priceMin', e.target.value ? Number(e.target.value) : '')} placeholder="1000" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900" />
            </div>

            {/* Prix Max (existait déjà) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Prix max (/semaine)</label>
              <input type="number" min="0" step="1000" value={localFilters.priceMax || ''} onChange={e => handleChange('priceMax', e.target.value ? Number(e.target.value) : '')} placeholder="50000" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900" />
            </div>
          </div>
        )}
      </div>
      
      {/* Type de Charter (Bareboat / Crewed) */}
      <div className="space-y-3 border-b border-gray-200 pb-4">
        <label className="block text-sm font-semibold text-gray-900">Type de Charter</label>
        <select value={localFilters.charterType} onChange={e => handleChange('charterType', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900">
          {CHARTER_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>


      {/* Options supplémentaires */}
      <div className="space-y-3 pt-4">
        <button onClick={() => toggleSection('options')} className="w-full flex items-center justify-between text-left">
          <label className="text-sm font-semibold text-gray-900">Options supplémentaires</label>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.options ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.options && (
          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={localFilters.petFriendly || false} onChange={e => handleChange('petFriendly', e.target.checked)} className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
              <span className="text-sm text-gray-700">Animaux acceptés</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={localFilters.groupFriendly || false} onChange={e => handleChange('groupFriendly', e.target.checked)} className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
              <span className="text-sm text-gray-700">Adapté aux groupes</span>
            </label>
          </div>
        )}
      </div>

      {activeCount > 0 && <button onClick={handleReset} className="w-full mt-6 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition">Réinitialiser les filtres ({activeCount})</button>}
    </div>
  );
}