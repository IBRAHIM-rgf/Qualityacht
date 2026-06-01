'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  Search, Plus, Eye, EyeOff, Star, Filter, ChevronDown, ChevronUp, Check, X,
  Loader2, Edit3, Trash2, Ship, Anchor, PawPrint, Users, Waves,
  ArrowLeft, ArrowRight, AlertTriangle, Download, MapPin, Tag,
} from 'lucide-react';
import { getAnkorImageUrl } from '@/lib/utils';
import { formatLength } from '@/lib/unitConversion';

// ============================================
// Constantes
// ============================================
const YACHT_TYPES = [
  { value: '', label: 'Tous les types' },
  { value: 'motor', label: 'Moteur' },
  { value: 'sailing', label: 'Voilier' },
];

const REGIONS = [
  { value: '', label: 'Toutes régions' },
  { value: 'arctic', label: 'Arctique' },
  { value: 'bahamas', label: 'Bahamas' },
  { value: 'central-america', label: 'Amérique Centrale' },
  { value: 'east-asia', label: "Asie de l'Est" },
  { value: 'east-mediterranean', label: 'Méditerranée Est' },
  { value: 'indian-ocean', label: 'Océan Indien' },
  { value: 'indonesia', label: 'Indonésie' },
  { value: 'north-america', label: 'Amérique du Nord' },
  { value: 'pacific-ocean', label: 'Océan Pacifique' },
  { value: 'arabian-gulf', label: "Golfe d'Oman" },
  { value: 'south-east-asia', label: 'Asie du Sud-Est' },
  { value: 'west-mediterranean', label: 'Méditerranée Ouest' },
  { value: 'africa', label: 'Afrique' },
  { value: 'northern-europe', label: 'Europe du Nord' },
  { value: 'caribbean', label: 'Caraïbes' },
  { value: 'oceania', label: 'Océanie' },
];

const SUB_REGIONS_BY_REGION = {
  caribbean: [
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
    { value: 'nassau', label: 'Nassau & New Providence' },
    { value: 'exumas', label: 'Exumas' },
    { value: 'abacos', label: 'Abacos' },
    { value: 'eleuthera', label: 'Eleuthera & Harbour Island' },
  ],
};

const getSubRegionsFor = (region) => SUB_REGIONS_BY_REGION[region] || [];

const STEPS = [
  { id: 1, label: 'Rechercher', icon: Search },
  { id: 2, label: 'Ajouter', icon: Download },
  { id: 3, label: 'Région', icon: MapPin },
  { id: 4, label: 'Sous-région', icon: Tag },
  { id: 5, label: 'Personnaliser', icon: Edit3 },
];

// ============================================
// Helper : lire light_data ou cached_data
// ============================================
function readYachtData(yacht) {
  const parse = (raw) => {
    if (!raw) return null;
    if (typeof raw === 'string') {
      try { return JSON.parse(raw); } catch { return null; }
    }
    return raw;
  };
  const light = parse(yacht.light_data);
  const cached = parse(yacht.cached_data);
  return {
    light: light || {},
    cached: cached || {},
    heroImage: light?.hero_image || cached?.images?.[0] || null,
    description: light?.description || cached?.description || null,
    length: light?.length || cached?.length || null,
    guests: light?.guests || cached?.guests || cached?.capacity || null,
    cabins: light?.cabins || cached?.cabins || null,
    crew: light?.crew || cached?.crew || null,
    type: light?.type || cached?.type || null,
    location: light?.location || cached?.location || null,
    year: light?.year || cached?.year || null,
    price: light?.price || cached?.pricePerHour || cached?.price || null,
  };
}

// ============================================
// Wizard Stepper (barre de progression)
// ============================================
function WizardStepper({ currentStep, onStepClick }) {
  return (
    <div className="bg-[#2a2a30] rounded-xl p-4 border border-gray-700">
      <div className="flex items-center justify-between gap-2">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isPast = currentStep > step.id;
          return (
            <div key={step.id} className="flex items-center flex-1 min-w-0">
              <button
                onClick={() => onStepClick(step.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all min-w-0 ${
                  isActive
                    ? 'bg-copper-500 border-copper-400 text-white'
                    : isPast
                    ? 'bg-[#303135] border-copper-700/40 text-copper-300 hover:border-copper-500'
                    : 'bg-[#303135] border-gray-700 text-gray-500 hover:text-gray-300'
                }`}
              >
                <span className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold ${
                  isActive ? 'bg-white text-copper-600' : isPast ? 'bg-copper-700/40 text-copper-200' : 'bg-gray-700 text-gray-400'
                }`}>
                  {isPast ? <Check className="w-4 h-4" /> : step.id}
                </span>
                <span className="hidden md:flex items-center gap-1 text-sm font-medium">
                  <Icon className="w-4 h-4" />
                  {step.label}
                </span>
              </button>
              {idx < STEPS.length - 1 && (
                <ArrowRight className={`w-4 h-4 mx-1 flex-shrink-0 ${isPast ? 'text-copper-400' : 'text-gray-600'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// Wizard Navigation (boutons précédent/suivant)
// ============================================
function WizardNav({ currentStep, onPrev, onNext, nextLabel, nextDisabled }) {
  return (
    <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-700">
      <button
        onClick={onPrev}
        disabled={currentStep === 1}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#C0C0C0]/40 text-[#C0C0C0] hover:border-copper-500 hover:text-copper-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Précédent
      </button>
      <span className="text-gray-500 text-sm">Étape {currentStep}/5</span>
      <button
        onClick={onNext}
        disabled={currentStep === 5 || nextDisabled}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#C0C0C0]/40 text-[#C0C0C0] hover:border-copper-500 hover:text-copper-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        {nextLabel || 'Suivant'}
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// ============================================
// Étape 1 — Rechercher dans Ankor
// ============================================
function Step1Search({ filters, setFilters, onSearch, searching, searchResults }) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="space-y-4">
      <div className="bg-[#2a2a30] rounded-xl p-4 border border-gray-700">
        <h3 className="text-[#C0C0C0] font-medium mb-4 flex items-center gap-2">
          <Filter className="w-5 h-5 text-copper-400" />
          Rechercher des yachts (API Ankor)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
          <input
            type="text"
            placeholder="Rechercher par nom..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="px-3 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0] text-sm md:col-span-2"
          />
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-3 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0] text-sm"
          >
            {YACHT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          <select
            value={filters.destination}
            onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
            className="px-3 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0] text-sm"
          >
            {REGIONS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
          </select>
        </div>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-gray-400 hover:text-[#C0C0C0] flex items-center gap-1 mb-2"
        >
          {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          Filtres avancés (longueur, prix)
        </button>

        {showAdvanced && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 pt-3 border-t border-gray-700">
            <input type="number" placeholder="Longueur min (m)" value={filters.minLength}
              onChange={(e) => setFilters({ ...filters, minLength: e.target.value })}
              className="px-3 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0] text-sm" />
            <input type="number" placeholder="Longueur max (m)" value={filters.maxLength}
              onChange={(e) => setFilters({ ...filters, maxLength: e.target.value })}
              className="px-3 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0] text-sm" />
            <input type="number" placeholder="Prix min (€/sem)" value={filters.priceMin}
              onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
              className="px-3 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0] text-sm" />
            <input type="number" placeholder="Prix max (€/sem)" value={filters.priceMax}
              onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
              className="px-3 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0] text-sm" />
          </div>
        )}

        <button
          onClick={onSearch}
          disabled={searching}
          className="px-6 py-2 border border-[#C0C0C0] text-[#C0C0C0] hover:border-copper-500 hover:text-copper-300 rounded-xl font-medium flex items-center gap-2 disabled:opacity-50 transition-colors"
        >
          {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          Lancer la recherche
        </button>
      </div>

      {searchResults.length > 0 && (
        <div className="bg-[#2a2a30] rounded-xl p-4 border border-gray-700">
          <p className="text-sm text-copper-300">
            {searchResults.length} résultats trouvés. Passez à l'étape suivante pour les ajouter à la BDD.
          </p>
        </div>
      )}
    </div>
  );
}

// ============================================
// Étape 2 — Ajouter les yachts sélectionnés à la BDD
// ============================================
function Step2Add({ searchResults, selectedIds, ankorPicks, setAnkorPicks, onBulkAdd, adding }) {
  const togglePick = (id) => {
    setAnkorPicks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  if (searchResults.length === 0) {
    return (
      <div className="bg-[#2a2a30] rounded-xl p-12 border border-gray-700 text-center text-gray-400">
        <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>Aucun résultat de recherche.</p>
        <p className="text-sm mt-2">Revenez à l'étape 1 pour lancer une recherche.</p>
      </div>
    );
  }

  const newYachts = searchResults.filter(y => !selectedIds.has(y.id));
  const alreadyIn = searchResults.length - newYachts.length;

  return (
    <div className="space-y-3">
      <div className="bg-[#2a2a30] rounded-xl p-4 border border-gray-700 flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[#C0C0C0]">
            <span className="font-bold">{newYachts.length}</span> yachts nouveaux,
            <span className="text-gray-500"> {alreadyIn} déjà en BDD</span>
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Cochez ceux à ajouter. Région principale sera pré-remplie depuis Ankor.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setAnkorPicks(new Set(newYachts.map(y => y.id)))}
            className="px-3 py-1.5 text-sm rounded-lg border border-[#C0C0C0]/40 text-[#C0C0C0] hover:border-copper-500 hover:text-copper-300 transition-colors"
          >
            Tout cocher
          </button>
          <button
            onClick={() => setAnkorPicks(new Set())}
            className="px-3 py-1.5 text-sm rounded-lg border border-[#C0C0C0]/40 text-[#C0C0C0] hover:border-copper-500 hover:text-copper-300 transition-colors"
          >
            Tout décocher
          </button>
          <button
            onClick={onBulkAdd}
            disabled={ankorPicks.size === 0 || adding}
            className="px-4 py-1.5 text-sm rounded-lg border border-copper-500 bg-copper-500/20 text-copper-300 hover:bg-copper-500/30 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Ajouter {ankorPicks.size} yacht(s)
          </button>
        </div>
      </div>

      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {searchResults.map(yacht => {
          const inBdd = selectedIds.has(yacht.id);
          const picked = ankorPicks.has(yacht.id);
          const images = Array.isArray(yacht.images) ? yacht.images : [];
          const imageUrl = images.length > 0 ? getAnkorImageUrl(images[0], '320w') : '/placeholder.jpg';

          return (
            <div key={yacht.id}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                inBdd ? 'bg-[#252528] border-gray-800 opacity-50' :
                picked ? 'bg-copper-900/20 border-copper-700' : 'bg-[#2a2a30] border-gray-700'
              }`}
            >
              <input
                type="checkbox"
                checked={picked}
                disabled={inBdd}
                onChange={() => togglePick(yacht.id)}
                className="w-5 h-5 rounded border-gray-600 text-copper-500 focus:ring-copper-500 cursor-pointer disabled:cursor-not-allowed"
              />
              <img src={imageUrl} alt={yacht.name} className="w-20 h-14 object-cover rounded-lg flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-[#C0C0C0] font-medium truncate">{yacht.name}</h3>
                <div className="flex gap-2 text-xs text-gray-400 mt-1 flex-wrap">
                  {yacht.type && <span className="capitalize">{yacht.type}</span>}
                  {yacht.length && <span>• {formatLength(yacht.length, 'both')}</span>}
                  {yacht.guests && <span>• {yacht.guests} guests</span>}
                  {yacht.pricePerHour && <span>• {yacht.pricePerHour}</span>}
                </div>
              </div>
              {inBdd && (
                <span className="px-3 py-1 bg-gray-800 text-gray-400 rounded-lg text-xs flex items-center gap-1">
                  <Check className="w-3 h-3" /> Déjà en BDD
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// Étape 3 — Vérifier/Assigner la région principale
// ============================================
function Step3AssignRegion({ selections, onUpdateRegion, onBulkImportRegion, onApplyWhitelist, importing, applyingWhitelist }) {
  const [whitelistText, setWhitelistText] = useState('');
  const [whitelistRegion, setWhitelistRegion] = useState('caribbean');
  const [whitelistResult, setWhitelistResult] = useState(null);

  const byRegion = useMemo(() => {
    const map = {};
    for (const s of selections) {
      const r = s.region || '_unassigned';
      if (!map[r]) map[r] = [];
      map[r].push(s);
    }
    return map;
  }, [selections]);

  const mismatches = useMemo(
    () => selections.filter(s => s.ankor_region && s.region && s.ankor_region !== s.region),
    [selections]
  );

  const visibleByRegion = useMemo(() => {
    const map = {};
    for (const s of selections) {
      const r = s.region;
      if (!r) continue;
      if (!map[r]) map[r] = { visible: 0, total: 0 };
      map[r].total++;
      if (s.is_visible !== false) map[r].visible++;
    }
    return map;
  }, [selections]);

  const handleApply = async () => {
    const names = whitelistText.split('\n').map(s => s.trim()).filter(Boolean);
    if (names.length === 0) return;
    if (!confirm(`Appliquer la whitelist : ${names.length} yachts visibles, le reste de la région "${whitelistRegion}" sera MASQUÉ. Continuer ?`)) return;
    const result = await onApplyWhitelist(whitelistRegion, names);
    setWhitelistResult(result);
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#2a2a30] rounded-xl p-4 border border-gray-700">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
          <div>
            <h3 className="text-[#C0C0C0] font-medium mb-1 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-copper-400" />
              Répartition par région
            </h3>
            <p className="text-sm text-gray-400">
              Chaque yacht est rangé dans une région. Ankor fournit une région source — on la respecte par défaut.
            </p>
          </div>
          <button
            onClick={() => onBulkImportRegion('caribbean')}
            disabled={importing}
            className="px-3 py-2 text-sm rounded-lg border border-copper-500 bg-copper-500/20 text-copper-300 hover:bg-copper-500/30 disabled:opacity-50 flex items-center gap-2"
          >
            {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Ré-importer Caraïbes
          </button>
        </div>

        {mismatches.length > 0 && (
          <div className="bg-amber-900/20 border border-amber-700/50 rounded-xl p-3 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-amber-300 font-medium text-sm">
                {mismatches.length} incohérence(s) entre région Ankor et région admin
              </p>
              <p className="text-amber-200/70 text-xs mt-1">
                Ces yachts ont une région assignée différente de ce qu'Ankor renvoie. Vérifiez à l'étape suivante.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ──── Whitelist : ne publier que la liste validée ──── */}
      <div className="bg-[#2a2a30] rounded-xl p-4 border border-copper-700/40">
        <h3 className="text-[#C0C0C0] font-medium mb-1 flex items-center gap-2">
          <Check className="w-5 h-5 text-copper-400" />
          Liste validée (whitelist) — seuls ces yachts seront publiés
        </h3>
        <p className="text-sm text-gray-400 mb-3">
          Colle ici la liste des yachts (1 par ligne) à <strong className="text-copper-300">PUBLIER</strong> dans la région choisie.
          Tous les autres yachts de cette région seront <strong className="text-amber-300">MASQUÉS</strong> (is_visible=false).
          Ils restent en BDD mais n'apparaissent ni sur /yachts ni sur /charters/destinations/...
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          {Object.entries(visibleByRegion).map(([r, stats]) => (
            <span key={r} className="px-2 py-1 text-xs rounded-lg bg-[#303135] text-gray-400 border border-gray-700">
              {r} : <span className="text-green-400 font-bold">{stats.visible}</span> visibles / {stats.total} total
            </span>
          ))}
        </div>

        <div className="flex gap-3 mb-3 flex-wrap">
          <select
            value={whitelistRegion}
            onChange={(e) => setWhitelistRegion(e.target.value)}
            className="px-3 py-2 bg-[#303135] border border-gray-700 rounded-lg text-[#C0C0C0] text-sm"
          >
            <option value="caribbean">Caraïbes</option>
            <option value="bahamas">Bahamas</option>
            <option value="west-mediterranean">Méditerranée Ouest</option>
            <option value="east-mediterranean">Méditerranée Est</option>
            <option value="indian-ocean">Océan Indien</option>
            <option value="pacific-ocean">Océan Pacifique</option>
          </select>
          <button
            onClick={handleApply}
            disabled={applyingWhitelist || !whitelistText.trim()}
            className="px-4 py-2 text-sm rounded-lg border border-copper-500 bg-copper-500/20 text-copper-300 hover:bg-copper-500/30 disabled:opacity-50 flex items-center gap-2"
          >
            {applyingWhitelist ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            Appliquer la whitelist
          </button>
        </div>

        <textarea
          value={whitelistText}
          onChange={(e) => setWhitelistText(e.target.value)}
          rows={10}
          placeholder={"Un nom par ligne, ex :\nCORAL OCEAN\nOKINAWA\nAPOLLO 99\n..."}
          className="w-full px-3 py-2 bg-[#303135] border border-gray-700 rounded-lg text-[#C0C0C0] text-sm font-mono resize-vertical"
        />

        {whitelistResult && (
          <div className="mt-3 rounded-lg border border-gray-700 bg-[#303135] p-3 text-xs space-y-1">
            <p className="text-[#C0C0C0]">
              <Check className="inline w-3 h-3 text-green-400 mr-1" />
              Whitelist appliquée à <strong>{whitelistResult.region}</strong> :
              <span className="text-green-400 ml-2">{whitelistResult.shown} visibles</span> ·
              <span className="text-amber-300 ml-2">{whitelistResult.hidden} masqués</span> sur {whitelistResult.total_in_region} en BDD
            </p>
            {whitelistResult.shown_changed > 0 && (
              <p className="text-gray-400">→ {whitelistResult.shown_changed} yacht(s) rendus visibles à l'instant</p>
            )}
            {whitelistResult.hidden_changed > 0 && (
              <p className="text-gray-400">→ {whitelistResult.hidden_changed} yacht(s) masqués à l'instant</p>
            )}
            {whitelistResult.not_found?.length > 0 && (
              <div>
                <p className="text-amber-300">⚠️ {whitelistResult.not_found.length} nom(s) introuvables en BDD :</p>
                <p className="text-amber-200/70 ml-3">{whitelistResult.not_found.join(', ')}</p>
              </div>
            )}
            {whitelistResult.ambiguous?.length > 0 && (
              <div>
                <p className="text-amber-300">⚠️ {whitelistResult.ambiguous.length} nom(s) ambigus (plusieurs matches, tous rendus visibles) :</p>
                {whitelistResult.ambiguous.map((a, i) => (
                  <p key={i} className="text-amber-200/70 ml-3">"{a.name}" → {a.candidates.join(', ')}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {REGIONS.slice(1).map(region => {
          const count = byRegion[region.value]?.length || 0;
          if (count === 0) return null;
          return (
            <div key={region.value} className="bg-[#2a2a30] rounded-xl p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <h4 className="text-[#C0C0C0] font-medium">{region.label}</h4>
                <span className="text-copper-300 font-bold">{count}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {getSubRegionsFor(region.value).length > 0 && `${getSubRegionsFor(region.value).length} sous-régions disponibles`}
              </div>
            </div>
          );
        })}

        {byRegion._unassigned?.length > 0 && (
          <div className="bg-[#2a2a30] rounded-xl p-4 border border-amber-700/50 md:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-amber-300 font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Sans région assignée
              </h4>
              <span className="text-amber-300 font-bold">{byRegion._unassigned.length}</span>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {byRegion._unassigned.map(y => (
                <div key={y.yacht_id} className="flex items-center gap-3 p-2 bg-[#303135] rounded-lg">
                  <span className="text-[#C0C0C0] text-sm flex-1 truncate">{y.yacht_name}</span>
                  <select
                    defaultValue={y.ankor_region || ''}
                    onChange={(e) => onUpdateRegion(y.yacht_id, e.target.value)}
                    className="px-2 py-1 bg-[#26272a] border border-gray-700 rounded text-[#C0C0C0] text-xs"
                  >
                    <option value="">— Choisir —</option>
                    {REGIONS.slice(1).map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// Étape 4 — Répartir en sous-régions
// ============================================
function Step4SubRegion({ selections, onUpdate, activeRegion, setActiveRegion, onEdit }) {
  const regionsWithYachts = useMemo(() => {
    const set = new Set();
    for (const s of selections) {
      if (s.region && getSubRegionsFor(s.region).length > 0) set.add(s.region);
    }
    return [...set];
  }, [selections]);

  const yachtsInRegion = useMemo(
    () => selections.filter(s => s.region === activeRegion),
    [selections, activeRegion]
  );

  const subRegions = getSubRegionsFor(activeRegion);
  const [selectedYachts, setSelectedYachts] = useState(new Set());

  const toggle = (id) => {
    setSelectedYachts(prev => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  };

  const assignBulk = async (subRegion) => {
    for (const id of selectedYachts) {
      await onUpdate(id, { sub_region: subRegion });
    }
    setSelectedYachts(new Set());
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#2a2a30] rounded-xl p-4 border border-gray-700">
        <h3 className="text-[#C0C0C0] font-medium mb-3 flex items-center gap-2">
          <Tag className="w-5 h-5 text-copper-400" />
          Répartition en sous-régions
        </h3>
        <p className="text-sm text-gray-400 mb-3">
          Choisis une région principale, sélectionne les yachts à déplacer, puis clique sur une sous-région.
        </p>
        <div className="flex flex-wrap gap-2">
          {regionsWithYachts.length === 0 && (
            <span className="text-sm text-gray-500">
              Aucune région avec sous-régions disponibles pour le moment.
            </span>
          )}
          {regionsWithYachts.map(r => {
            const region = REGIONS.find(reg => reg.value === r);
            const count = selections.filter(s => s.region === r).length;
            return (
              <button
                key={r}
                onClick={() => { setActiveRegion(r); setSelectedYachts(new Set()); }}
                className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                  activeRegion === r
                    ? 'bg-copper-500 border-copper-400 text-white'
                    : 'bg-[#303135] border-[#C0C0C0]/40 text-[#C0C0C0] hover:border-copper-500'
                }`}
              >
                {region?.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {activeRegion && subRegions.length > 0 && (
        <>
          {/* Sticky bulk action bar */}
          {selectedYachts.size > 0 && (
            <div className="bg-copper-900/20 border border-copper-700 rounded-xl p-3 sticky top-0 z-10 flex items-center justify-between flex-wrap gap-2">
              <span className="text-copper-300 font-medium">
                {selectedYachts.size} yacht(s) sélectionné(s) → assigner :
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => assignBulk(null)}
                  className="px-3 py-1 text-xs rounded border border-[#C0C0C0]/40 text-[#C0C0C0] hover:border-copper-500 hover:text-copper-300"
                >
                  Aucune
                </button>
                {subRegions.map(sr => (
                  <button
                    key={sr.value}
                    onClick={() => assignBulk(sr.value)}
                    className="px-3 py-1 text-xs rounded border border-copper-500 text-copper-300 hover:bg-copper-500/30"
                  >
                    {sr.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Buckets par sous-région */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {[...subRegions, { value: null, label: 'Sans sous-région' }].map(sr => {
              const yachts = yachtsInRegion.filter(y => (sr.value === null ? !y.sub_region : y.sub_region === sr.value));
              return (
                <div key={sr.value || 'none'} className="bg-[#2a2a30] rounded-xl p-3 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-medium ${sr.value === null ? 'text-amber-300' : 'text-[#C0C0C0]'}`}>
                      {sr.label}
                    </h4>
                    <span className="text-copper-300 text-sm font-bold">{yachts.length}</span>
                  </div>
                  <div className="space-y-1 max-h-80 overflow-y-auto">
                    {yachts.length === 0 ? (
                      <p className="text-gray-500 text-xs italic">vide</p>
                    ) : (
                      yachts.map(y => {
                        const data = readYachtData(y);
                        const imageUrl = data.heroImage ? getAnkorImageUrl(data.heroImage, '320w') : '/placeholder.jpg';
                        const picked = selectedYachts.has(y.yacht_id);
                        return (
                          <div key={y.yacht_id}
                            onClick={() => toggle(y.yacht_id)}
                            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                              picked ? 'bg-copper-900/30 border border-copper-700' : 'bg-[#303135] hover:bg-[#383a3e] border border-transparent'
                            }`}
                          >
                            <input type="checkbox" readOnly checked={picked}
                              className="w-4 h-4 rounded border-gray-600 text-copper-500" />
                            <img src={imageUrl} alt="" className="w-10 h-10 rounded object-cover" />
                            <span className="text-[#C0C0C0] text-xs flex-1 truncate">
                              {y.custom_title || y.yacht_name}
                            </span>
                            <button
                              onClick={(e) => { e.stopPropagation(); onEdit(y); }}
                              className="text-gray-400 hover:text-copper-400 p-1"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// ============================================
// Étape 5 — Personnaliser (édition individuelle)
// ============================================
function Step5Customize({ selections, onUpdate, onEdit, onRemove, onToggleVisibility, onToggleFeatured, filterRegion, setFilterRegion }) {
  const filtered = filterRegion
    ? selections.filter(s => s.region === filterRegion)
    : selections;

  return (
    <div className="space-y-3">
      <div className="bg-[#2a2a30] rounded-xl p-4 border border-gray-700">
        <h3 className="text-[#C0C0C0] font-medium mb-3 flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-copper-400" />
          Personnalisation par yacht
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterRegion('')}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              !filterRegion ? 'bg-copper-500 text-white' : 'bg-[#303135] text-[#C0C0C0] border border-gray-700 hover:border-copper-500'
            }`}
          >
            Tous ({selections.length})
          </button>
          {REGIONS.slice(1).map(r => {
            const count = selections.filter(s => s.region === r.value).length;
            if (count === 0) return null;
            return (
              <button
                key={r.value}
                onClick={() => setFilterRegion(r.value)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  filterRegion === r.value
                    ? 'bg-copper-500 text-white'
                    : 'bg-[#303135] text-[#C0C0C0] border border-gray-700 hover:border-copper-500'
                }`}
              >
                {r.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2 max-h-[700px] overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">Aucun yacht.</div>
        ) : (
          filtered.map(y => <CustomizeRow key={y.yacht_id} yacht={y}
            onEdit={onEdit} onRemove={onRemove}
            onToggleVisibility={onToggleVisibility} onToggleFeatured={onToggleFeatured} />)
        )}
      </div>
    </div>
  );
}

function CustomizeRow({ yacht, onEdit, onRemove, onToggleVisibility, onToggleFeatured }) {
  const data = readYachtData(yacht);
  const imageUrl = data.heroImage ? getAnkorImageUrl(data.heroImage, '320w') : '/placeholder.jpg';
  const isVisible = yacht.is_visible !== false;
  const isFeatured = yacht.is_featured === true;
  const regionLabel = REGIONS.find(r => r.value === yacht.region)?.label;
  const subRegionLabel = getSubRegionsFor(yacht.region).find(sr => sr.value === yacht.sub_region)?.label;
  const mismatch = yacht.ankor_region && yacht.region && yacht.ankor_region !== yacht.region;

  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border ${
      !isVisible ? 'bg-[#252528] border-gray-800 opacity-60' :
      isFeatured ? 'bg-[#2a2a30] border-copper-700/50' : 'bg-[#2a2a30] border-gray-700'
    }`}>
      <img src={imageUrl} alt={yacht.yacht_name} className="w-20 h-14 object-cover rounded-lg flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <h3 className="text-[#C0C0C0] font-medium truncate">{yacht.custom_title || yacht.yacht_name}</h3>
        <div className="flex flex-wrap gap-2 text-xs text-gray-400 mt-1">
          {data.length && <span>{data.length}</span>}
          {data.guests && <span>• {data.guests} guests</span>}
          {regionLabel && <span className="text-copper-400">• {regionLabel}</span>}
          {subRegionLabel && <span className="text-copper-300/80">› {subRegionLabel}</span>}
          {mismatch && (
            <span className="text-amber-400 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Ankor: {yacht.ankor_region}
            </span>
          )}
        </div>
        <div className="flex gap-1 mt-1">
          {yacht.pets_allowed && <PawPrint className="w-3 h-3 text-green-400" />}
          {yacht.groups_allowed && <Users className="w-3 h-3 text-blue-400" />}
          {yacht.water_toys && <Waves className="w-3 h-3 text-cyan-400" />}
        </div>
      </div>
      <button onClick={() => onEdit(yacht)} className="p-2 text-gray-400 hover:text-copper-400"><Edit3 className="w-4 h-4" /></button>
      <button onClick={() => onToggleFeatured(yacht)}
        className={`p-2 ${isFeatured ? 'text-copper-400' : 'text-gray-500 hover:text-copper-400'}`}>
        <Star className="w-4 h-4" fill={isFeatured ? 'currentColor' : 'none'} />
      </button>
      <button onClick={() => onToggleVisibility(yacht)}
        className={`p-2 ${isVisible ? 'text-green-400' : 'text-red-400'}`}>
        {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
      </button>
      <button onClick={() => onRemove(yacht.yacht_id)} className="p-2 text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
    </div>
  );
}

// ============================================
// Modal d'édition enrichie (avec verrou souple)
// ============================================
function EditModal({ yacht, onClose, onSave, token }) {
  const [loading, setLoading] = useState(false);
  const data = readYachtData(yacht);
  const [form, setForm] = useState({
    custom_title: yacht.custom_title || '',
    custom_description: yacht.custom_description || '',
    custom_price: yacht.custom_price || '',
    internal_notes: yacht.internal_notes || '',
    region: yacht.region || yacht.ankor_region || '',
    sub_region: yacht.sub_region || '',
    pets_allowed: yacht.pets_allowed || false,
    groups_allowed: yacht.groups_allowed || false,
    water_toys: yacht.water_toys || false,
    extra_info: yacht.extra_info || '',
  });

  const availableSubRegions = getSubRegionsFor(form.region);
  const mismatch = yacht.ankor_region && form.region && yacht.ankor_region !== form.region;
  const ankorRegionLabel = REGIONS.find(r => r.value === yacht.ankor_region)?.label;

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/yachts?token=${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'enrich', yacht_id: yacht.yacht_id, ...form })
      });
      if (res.ok) {
        onSave(yacht.yacht_id, form);
        onClose();
      }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-[#2a2a30] rounded-2xl w-full max-w-3xl border border-gray-700 max-h-[95vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-[#C0C0C0]">Modifier {yacht.yacht_name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {data.heroImage && (
            <img src={getAnkorImageUrl(data.heroImage, '640w')} alt={yacht.yacht_name}
              className="w-full aspect-video object-cover rounded-xl" />
          )}

          <div className="bg-[#303135] rounded-xl p-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {data.type && <div><span className="text-gray-500">Type:</span> <span className="text-[#C0C0C0] capitalize">{data.type}</span></div>}
            {data.length && <div><span className="text-gray-500">Long:</span> <span className="text-[#C0C0C0]">{data.length}</span></div>}
            {data.guests && <div><span className="text-gray-500">Guests:</span> <span className="text-[#C0C0C0]">{data.guests}</span></div>}
            {data.location && <div><span className="text-gray-500">Port:</span> <span className="text-[#C0C0C0]">{data.location}</span></div>}
          </div>

          {ankorRegionLabel && (
            <div className={`rounded-xl p-3 border flex items-start gap-2 ${
              mismatch ? 'bg-amber-900/20 border-amber-700/50' : 'bg-[#303135] border-gray-700'
            }`}>
              {mismatch ? <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" /> : <Anchor className="w-4 h-4 text-copper-400 flex-shrink-0 mt-0.5" />}
              <p className={`text-sm ${mismatch ? 'text-amber-200' : 'text-gray-400'}`}>
                Région Ankor : <span className="font-semibold">{ankorRegionLabel}</span>
                {mismatch && ' — incohérent avec la région admin choisie.'}
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Région d'affichage</label>
              <select value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value, sub_region: '' })}
                className="w-full px-3 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0]">
                {REGIONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>
            {availableSubRegions.length > 0 && (
              <div>
                <label className="block text-sm text-gray-400 mb-1">Sous-région</label>
                <select value={form.sub_region}
                  onChange={(e) => setForm({ ...form, sub_region: e.target.value })}
                  className="w-full px-3 py-2 bg-[#303135] border border-copper-700/50 rounded-xl text-copper-400">
                  <option value="">— Aucune —</option>
                  {availableSubRegions.map(sr => <option key={sr.value} value={sr.value}>{sr.label}</option>)}
                </select>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Titre personnalisé</label>
            <input type="text" value={form.custom_title}
              onChange={(e) => setForm({ ...form, custom_title: e.target.value })}
              placeholder={data.light?.name || yacht.yacht_name}
              className="w-full px-3 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0]" />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Description FR</label>
            <textarea value={form.custom_description} rows={3}
              onChange={(e) => setForm({ ...form, custom_description: e.target.value })}
              className="w-full px-3 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0] resize-none" />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Prix affiché</label>
            <input type="text" value={form.custom_price}
              onChange={(e) => setForm({ ...form, custom_price: e.target.value })}
              placeholder={data.price || ''}
              className="w-full px-3 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0]" />
          </div>

          <div className="bg-[#303135] rounded-xl p-3 grid grid-cols-3 gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.pets_allowed}
                onChange={(e) => setForm({ ...form, pets_allowed: e.target.checked })}
                className="w-4 h-4 rounded" />
              <PawPrint className="w-4 h-4 text-gray-400" />
              <span className="text-[#C0C0C0] text-sm">Animaux</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.groups_allowed}
                onChange={(e) => setForm({ ...form, groups_allowed: e.target.checked })}
                className="w-4 h-4 rounded" />
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-[#C0C0C0] text-sm">Groupes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.water_toys}
                onChange={(e) => setForm({ ...form, water_toys: e.target.checked })}
                className="w-4 h-4 rounded" />
              <Waves className="w-4 h-4 text-gray-400" />
              <span className="text-[#C0C0C0] text-sm">Water toys</span>
            </label>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Notes internes (privées)</label>
            <textarea value={form.internal_notes} rows={2}
              onChange={(e) => setForm({ ...form, internal_notes: e.target.value })}
              className="w-full px-3 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0] resize-none" />
          </div>
        </div>

        <div className="flex gap-3 p-4 border-t border-gray-700">
          <button onClick={onClose}
            className="flex-1 px-4 py-2 border border-[#C0C0C0]/40 text-[#C0C0C0] hover:border-copper-500 rounded-xl">
            Annuler
          </button>
          <button onClick={handleSave} disabled={loading}
            className="flex-1 px-4 py-2 border border-copper-500 bg-copper-500/20 text-copper-300 hover:bg-copper-500/30 disabled:opacity-50 rounded-xl flex items-center justify-center gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Composant Principal
// ============================================
export default function AdminYachtPanel({ initialSelections, initialStats, token }) {
  const [selections, setSelections] = useState(initialSelections || []);
  const [stats, setStats] = useState(initialStats);
  const [selectedIds, setSelectedIds] = useState(new Set((initialSelections || []).map(s => s.yacht_id)));

  const [currentStep, setCurrentStep] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [filters, setFilters] = useState({
    search: '', type: '', destination: '', minLength: '', maxLength: '', priceMin: '', priceMax: '',
  });
  const [ankorPicks, setAnkorPicks] = useState(new Set());
  const [adding, setAdding] = useState(false);
  const [importing, setImporting] = useState(false);
  const [editingYacht, setEditingYacht] = useState(null);
  const [activeRegionStep4, setActiveRegionStep4] = useState('caribbean');
  const [filterRegionStep5, setFilterRegionStep5] = useState('');

  const handleSearch = async () => {
    setSearching(true);
    try {
      const params = new URLSearchParams();
      if (filters.type) params.set('type', filters.type);
      if (filters.destination) params.set('destination', filters.destination);
      if (filters.minLength) params.set('minLength', filters.minLength);
      if (filters.maxLength) params.set('maxLength', filters.maxLength);
      if (filters.priceMin) params.set('priceMin', filters.priceMin);
      if (filters.priceMax) params.set('priceMax', filters.priceMax);

      const res = await fetch(`/api/admin/yachts/search?token=${token}&${params.toString()}`);
      const data = await res.json();
      let results = data.yachts || [];
      if (filters.search) {
        const q = filters.search.toLowerCase();
        results = results.filter(y => y.name?.toLowerCase().includes(q));
      }
      setSearchResults(results);
    } catch (err) {
      console.error('Erreur recherche:', err);
    }
    setSearching(false);
  };

  const handleBulkAdd = async () => {
    setAdding(true);
    const toAdd = searchResults.filter(y => ankorPicks.has(y.id));
    const added = [];
    for (const yacht of toAdd) {
      try {
        const res = await fetch(`/api/admin/yachts?token=${token}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            yacht_id: yacht.id,
            yacht_name: yacht.name,
            cached_data: yacht,
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.selection) added.push(data.selection);
        }
      } catch (err) { console.error(err); }
    }
    if (added.length > 0) {
      setSelections(prev => [...prev, ...added]);
      setSelectedIds(prev => new Set([...prev, ...added.map(s => s.yacht_id)]));
      setStats(prev => ({ ...prev, total: prev.total + added.length, visible: prev.visible + added.length }));
    }
    setAnkorPicks(new Set());
    setAdding(false);
  };

  const handleBulkImportRegion = async (region) => {
    setImporting(true);
    try {
      const res = await fetch(`/api/admin/yachts/import-region?token=${token}&region=${region}`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success) {
        // Recharger les sélections après l'import
        const sel = await fetch(`/api/admin/yachts?token=${token}`).then(r => r.json());
        setSelections(sel.selections || []);
        setStats(sel.stats || stats);
        setSelectedIds(new Set((sel.selections || []).map(s => s.yacht_id)));
        alert(`Import OK : ${data.inserted} nouveaux, ${data.updated} mis à jour`);
      } else {
        alert(`Erreur: ${data.error || 'inconnue'}`);
      }
    } catch (err) {
      console.error('Erreur import région:', err);
    }
    setImporting(false);
  };

  const [applyingWhitelist, setApplyingWhitelist] = useState(false);
  const handleApplyWhitelist = async (region, names) => {
    setApplyingWhitelist(true);
    try {
      const res = await fetch(`/api/admin/yachts/apply-whitelist?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ region, names }),
      });
      const data = await res.json();
      if (data.success) {
        // Recharger les sélections pour refléter is_visible
        const sel = await fetch(`/api/admin/yachts?token=${token}`).then(r => r.json());
        setSelections(sel.selections || []);
        setStats(sel.stats || stats);
        setApplyingWhitelist(false);
        return data;
      }
      alert(`Erreur whitelist : ${data.error || 'inconnue'}`);
      setApplyingWhitelist(false);
      return data;
    } catch (err) {
      console.error('Erreur whitelist:', err);
      setApplyingWhitelist(false);
      return { error: err.message };
    }
  };

  const handleUpdateRegion = async (yacht_id, region) => {
    try {
      await fetch(`/api/admin/yachts?token=${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'enrich', yacht_id, region })
      });
      setSelections(prev => prev.map(s => s.yacht_id === yacht_id ? { ...s, region } : s));
    } catch (err) { console.error(err); }
  };

  const handleUpdate = useCallback(async (yacht_id, updates) => {
    setSelections(prev => prev.map(s => s.yacht_id === yacht_id ? { ...s, ...updates } : s));
    try {
      await fetch(`/api/admin/yachts?token=${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'enrich', yacht_id, ...updates })
      });
    } catch (err) { console.error(err); }
  }, [token]);

  const handleRemove = async (yacht_id) => {
    if (!confirm('Supprimer ce yacht de la sélection ?')) return;
    try {
      const res = await fetch(`/api/admin/yachts?token=${token}&yacht_id=${yacht_id}`, { method: 'DELETE' });
      if (res.ok) {
        setSelections(prev => prev.filter(s => s.yacht_id !== yacht_id));
        setSelectedIds(prev => { const n = new Set(prev); n.delete(yacht_id); return n; });
        setStats(prev => ({ ...prev, total: prev.total - 1 }));
      }
    } catch (err) { console.error(err); }
  };

  const handleToggleVisibility = async (yacht) => {
    const newVal = !(yacht.is_visible !== false);
    try {
      await fetch(`/api/admin/yachts?token=${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'visibility', yacht_id: yacht.yacht_id, is_visible: newVal })
      });
      setSelections(prev => prev.map(s => s.yacht_id === yacht.yacht_id ? { ...s, is_visible: newVal } : s));
    } catch (err) { console.error(err); }
  };

  const handleToggleFeatured = async (yacht) => {
    const newVal = !yacht.is_featured;
    try {
      await fetch(`/api/admin/yachts?token=${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'featured', yacht_id: yacht.yacht_id, is_featured: newVal })
      });
      setSelections(prev => prev.map(s => s.yacht_id === yacht.yacht_id ? { ...s, is_featured: newVal } : s));
    } catch (err) { console.error(err); }
  };

  return (
    <div className="space-y-4">
      {/* Stats globales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-[#2a2a30] rounded-xl p-3 border border-gray-700">
          <div className="text-2xl font-bold text-[#C0C0C0]">{stats.total}</div>
          <div className="text-gray-400 text-xs">En BDD</div>
        </div>
        <div className="bg-[#2a2a30] rounded-xl p-3 border border-gray-700">
          <div className="text-2xl font-bold text-green-400">{stats.visible}</div>
          <div className="text-gray-400 text-xs">Visibles</div>
        </div>
        <div className="bg-[#2a2a30] rounded-xl p-3 border border-gray-700">
          <div className="text-2xl font-bold text-copper-400">{stats.featured}</div>
          <div className="text-gray-400 text-xs">Featured</div>
        </div>
        <div className="bg-[#2a2a30] rounded-xl p-3 border border-gray-700">
          <div className="text-2xl font-bold text-blue-400">
            {selections.filter(s => s.region === 'caribbean').length}
          </div>
          <div className="text-gray-400 text-xs">Caraïbes</div>
        </div>
      </div>

      {/* Wizard stepper */}
      <WizardStepper currentStep={currentStep} onStepClick={setCurrentStep} />

      {/* Contenu de l'étape */}
      <div className="min-h-[400px]">
        {currentStep === 1 && (
          <Step1Search
            filters={filters}
            setFilters={setFilters}
            onSearch={handleSearch}
            searching={searching}
            searchResults={searchResults}
          />
        )}
        {currentStep === 2 && (
          <Step2Add
            searchResults={searchResults}
            selectedIds={selectedIds}
            ankorPicks={ankorPicks}
            setAnkorPicks={setAnkorPicks}
            onBulkAdd={handleBulkAdd}
            adding={adding}
          />
        )}
        {currentStep === 3 && (
          <Step3AssignRegion
            selections={selections}
            onUpdateRegion={handleUpdateRegion}
            onBulkImportRegion={handleBulkImportRegion}
            onApplyWhitelist={handleApplyWhitelist}
            applyingWhitelist={applyingWhitelist}
            importing={importing}
          />
        )}
        {currentStep === 4 && (
          <Step4SubRegion
            selections={selections}
            onUpdate={handleUpdate}
            activeRegion={activeRegionStep4}
            setActiveRegion={setActiveRegionStep4}
            onEdit={setEditingYacht}
          />
        )}
        {currentStep === 5 && (
          <Step5Customize
            selections={selections}
            onUpdate={handleUpdate}
            onEdit={setEditingYacht}
            onRemove={handleRemove}
            onToggleVisibility={handleToggleVisibility}
            onToggleFeatured={handleToggleFeatured}
            filterRegion={filterRegionStep5}
            setFilterRegion={setFilterRegionStep5}
          />
        )}
      </div>

      <WizardNav
        currentStep={currentStep}
        onPrev={() => setCurrentStep(Math.max(1, currentStep - 1))}
        onNext={() => setCurrentStep(Math.min(5, currentStep + 1))}
      />

      {editingYacht && (
        <EditModal
          yacht={editingYacht}
          token={token}
          onClose={() => setEditingYacht(null)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}
