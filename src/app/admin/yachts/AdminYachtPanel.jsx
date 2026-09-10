'use client';

// Admin yachts v2 — branché sur la BDD réelle.
// Structure : Dashboard (stats permanentes) + 3 onglets (Ankor / BDD / Publiés) + modal édition.
// Remplace le wizard 5 étapes précédent. Pour la démo standalone : /admin/yachts-mock

import { useState, useMemo, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { getAnkorImageUrl } from '@/lib/utils';
import {
  Plus, Check, X, Eye, EyeOff, Star, Edit3, Trash2,
  Database, Globe, Loader2, Users,
} from 'lucide-react';
import { HANDICAPS_BY_CAT, HANDICAP_LABELS, parseHandicaps } from '@/lib/handicaps';

// ════════════════════════════════════════════════════════════
// CONSTANTES
// ════════════════════════════════════════════════════════════
const REGION_LABELS = {
  'arctic': 'Arctique',
  'bahamas': 'Bahamas',
  'central-america': 'Amérique Centrale',
  'east-asia': "Asie de l'Est",
  'east-mediterranean': 'Méditerranée Est',
  'indian-ocean': 'Océan Indien',
  'indonesia': 'Indonésie',
  'north-america': 'Amérique du Nord',
  'pacific-ocean': 'Océan Pacifique',
  'arabian-gulf': "Golfe d'Oman",
  'south-east-asia': 'Asie du Sud-Est',
  'west-mediterranean': 'Méditerranée Ouest',
  'africa': 'Afrique',
  'northern-europe': 'Europe du Nord',
  'caribbean': 'Caraïbes',
  'oceania': 'Océanie',
};

const SUB_REGION_LABELS = {
  'greater-antilles': 'Greater Antilles',
  'leeward-islands': 'Leeward Islands',
  'windward-islands': 'Windward Islands',
  'leeward-antilles': 'Leeward Antilles',
  'turks-caicos': 'Turks & Caicos',
  'trinidad-tobago': 'Trinidad & Tobago',
  'bvi': 'British Virgin Islands',
  'grand-cayman': 'Grand Cayman',
  'nassau': 'Nassau & New Providence',
  'exumas': 'Exumas',
  'abacos': 'Abacos',
  'eleuthera': 'Eleuthera & Harbour Island',
};

const SUB_REGIONS_BY_REGION = {
  caribbean: ['greater-antilles', 'leeward-islands', 'windward-islands', 'leeward-antilles', 'turks-caicos', 'trinidad-tobago', 'bvi', 'grand-cayman'],
  bahamas: ['nassau', 'exumas', 'abacos', 'eleuthera'],
};

// Axe "Catégories charter" — indépendant des régions géo, multi-sélection.
// Un yacht peut appartenir à plusieurs catégories. 'Only for You' a des sous-catégories
// (clés préfixées 'only-for-you/...'). Les clés sont stockées à plat dans categories[].
const CHARTER_CATEGORIES = [
  { id: 'only-for-couple', label: 'Only for Couple' },
  {
    id: 'only-for-you', label: 'Only for You',
    subs: [
      { id: 'only-for-you/classic-sailing-yacht', label: 'Classic Sailing Yacht' },
      { id: 'only-for-you/catamaran',             label: 'Catamaran' },
      { id: 'only-for-you/trimaran',              label: 'Trimaran' },
      { id: 'only-for-you/sport-classic',         label: 'Sport Classic Yacht' },
      { id: 'only-for-you/traditional',           label: 'Traditional Sailboat' },
      { id: 'only-for-you/regatta',               label: 'Sailboat Regatta' },
    ],
  },
  { id: 'last-minute',  label: 'Last Minute Charter' },
  { id: 'accessible',   label: 'Accessible Yacht Charter' },
];

// Map clé → libellé lisible (sections + sous-catégories).
const CATEGORY_LABELS = CHARTER_CATEGORIES.reduce((acc, c) => {
  acc[c.id] = c.label;
  (c.subs || []).forEach((s) => { acc[s.id] = `${c.label} › ${s.label}`; });
  return acc;
}, {});

// Types de navire (mêmes clés que TYPE_MAP côté recherche Ankor, src/lib/yachts.js).
const TYPE_LABELS = {
  motor: 'Motor',
  sailing: 'Sailing',
  catamaran: 'Catamaran',
  gulet: 'Gulet',
  'power catamaran': 'Power Catamaran',
  classic: 'Classic',
  expedition: 'Expedition',
  'sport fishing': 'Sport fishing',
};

// Parse robuste d'une valeur categories venant de la BDD (JSONB array, string, ou null).
function parseCategories(raw) {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string') {
    try { const v = JSON.parse(raw); return Array.isArray(v) ? v : []; } catch { return []; }
  }
  return [];
}

// Adapte une row BDD au format yacht-like utilisé par l'UI
function adaptYacht(s) {
  const parse = (raw) => {
    if (!raw) return {};
    if (typeof raw === 'string') {
      try { return JSON.parse(raw); } catch { return {}; }
    }
    return raw;
  };
  const light = parse(s.light_data);
  const cached = parse(s.cached_data);
  const heroRaw = light.hero_image || cached.images?.[0] || null;
  return {
    id: s.yacht_id,
    name: s.yacht_name || light.name || cached.name,
    image: heroRaw ? getAnkorImageUrl(heroRaw, '320w') : '/placeholder.jpg',
    length: light.length || cached.length,
    guests: light.guests || cached.guests || cached.capacity,
    cabins: light.cabins || cached.cabins,
    region: s.region,
    sub_region: s.sub_region,
    // Multi-selection (client 2026-09-10) : listes, repli sur la valeur unique.
    regions: parseCategories(s.regions).length ? parseCategories(s.regions) : (s.region ? [s.region] : []),
    sub_regions: parseCategories(s.sub_regions).length ? parseCategories(s.sub_regions) : (s.sub_region ? [s.sub_region] : []),
    ankor_region: s.ankor_region,
    is_visible: s.is_visible !== false,
    is_featured: s.is_featured === true,
    custom_title: s.custom_title || '',
    custom_price: s.custom_price || '',
    custom_description: s.custom_description || '',
    categories: parseCategories(s.categories),
    handicaps: parseHandicaps(s.handicaps),
    pets_allowed: s.pets_allowed,
    groups_allowed: s.groups_allowed,
    water_toys: s.water_toys,
    extra_info: s.extra_info,
  };
}

// ════════════════════════════════════════════════════════════
// DASHBOARD
// ════════════════════════════════════════════════════════════
function Dashboard({ yachts }) {
  const stats = useMemo(() => {
    const total = yachts.length;
    const visible = yachts.filter(y => y.is_visible).length;
    const hidden = total - visible;
    const featured = yachts.filter(y => y.is_featured && y.is_visible).length;
    const byRegion = {};
    const bySubRegion = {};
    const byCategory = {};
    for (const y of yachts) {
      const r = (y.regions && y.regions[0]) || y.region || '_none';
      byRegion[r] = (byRegion[r] || 0) + 1;
      for (const sr of (y.sub_regions && y.sub_regions.length ? y.sub_regions : (y.sub_region ? [y.sub_region] : []))) bySubRegion[sr] = (bySubRegion[sr] || 0) + 1;
      for (const c of (y.categories || [])) byCategory[c] = (byCategory[c] || 0) + 1;
    }
    return { total, visible, hidden, featured, byRegion, bySubRegion, byCategory };
  }, [yachts]);

  return (
    <div className="bg-[#2a2a30] rounded-2xl border border-[#C0C0C0]/20 p-5 md:p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Database className="w-5 h-5 text-[#B03E00]" />
        <h2 className="trajan-regular text-base md:text-lg uppercase tracking-[0.15em] text-[#C0C0C0]">État de la base</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="rounded-xl bg-[#3a3b3f] border border-[#C0C0C0]/20 p-3">
          <p className="text-[10px] uppercase tracking-wider text-[#acb0cd]/60">En BDD</p>
          <p className="trajan-regular text-3xl text-[#C0C0C0]">{stats.total}</p>
          <p className="text-xs text-[#acb0cd]/50">bateaux au total</p>
        </div>
        <div className="rounded-xl bg-[#B03E00]/10 border border-[#B03E00]/40 p-3">
          <p className="text-[10px] uppercase tracking-wider text-[#B03E00]">Publiés</p>
          <p className="trajan-regular text-3xl text-[#C0C0C0]">{stats.visible}</p>
          <p className="text-xs text-[#acb0cd]/70">visibles sur le site</p>
        </div>
        <div className="rounded-xl bg-[#3a3b3f] border border-[#C0C0C0]/20 p-3">
          <p className="text-[10px] uppercase tracking-wider text-[#acb0cd]/60">En stock</p>
          <p className="trajan-regular text-3xl text-[#acb0cd]/70">{stats.hidden}</p>
          <p className="text-xs text-[#acb0cd]/50">cachés au public</p>
        </div>
        <div className="rounded-xl bg-[#3a3b3f] border border-[#C0C0C0]/20 p-3">
          <p className="text-[10px] uppercase tracking-wider text-[#acb0cd]/60">Featured ★</p>
          <p className="trajan-regular text-3xl text-[#C0C0C0]">{stats.featured}</p>
          <p className="text-xs text-[#acb0cd]/50">mis en avant</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60 mb-2">Répartition par région</p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(stats.byRegion).length === 0 && <span className="text-[#acb0cd]/50 text-xs italic">—</span>}
            {Object.entries(stats.byRegion).map(([r, count]) => (
              <span key={r} className="px-3 py-1.5 rounded-full border border-[#C0C0C0]/30 bg-[#3a3b3f] text-xs">
                <span className="text-[#acb0cd]">{r === '_none' ? 'Sans région' : (REGION_LABELS[r] || r)}</span>
                <span className="text-[#B03E00] font-bold ml-2">{count}</span>
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60 mb-2">Répartition par sous-région</p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(stats.bySubRegion).length === 0 ? (
              <span className="text-[#acb0cd]/50 text-xs italic">Aucune sous-région assignée</span>
            ) : Object.entries(stats.bySubRegion).map(([s, count]) => (
              <span key={s} className="px-3 py-1.5 rounded-full border border-[#C0C0C0]/30 bg-[#3a3b3f] text-xs">
                <span className="text-[#acb0cd]">{SUB_REGION_LABELS[s] || s}</span>
                <span className="text-[#B03E00] font-bold ml-2">{count}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60 mb-2">Répartition par catégorie charter</p>
        <div className="flex flex-wrap gap-2">
          {Object.keys(stats.byCategory).length === 0 ? (
            <span className="text-[#acb0cd]/50 text-xs italic">Aucune catégorie assignée</span>
          ) : Object.entries(stats.byCategory).map(([c, count]) => (
            <span key={c} className="px-3 py-1.5 rounded-full border border-[#C0C0C0]/30 bg-[#3a3b3f] text-xs">
              <span className="text-[#acb0cd]">{CATEGORY_LABELS[c] || c}</span>
              <span className="text-[#B03E00] font-bold ml-2">{count}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ONGLET 1 — Recherche Ankor (vrai endpoint)
// ════════════════════════════════════════════════════════════
function AnkorSearchTab({ existingIds, onAdd }) {
  const [filters, setFilters] = useState({ search: '', type: '', destination: '' });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(null);
  // Le catalogue complet fait ~1 700 yachts : afficher tout d'un coup figeait
  // la page. On affiche par paquets de 60 (bouton « Afficher plus »).
  const PAGE = 60;
  const [shown, setShown] = useState(PAGE);
  const visible = results.slice(0, shown);

  const doSearch = async () => {
    setShown(PAGE);
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.type) params.set('type', filters.type);
      if (filters.destination) params.set('destination', filters.destination);
      const res = await fetch(`/api/admin/yachts/search?${params}`);
      const data = await res.json();
      let yachts = data.yachts || [];
      if (filters.search) {
        const q = filters.search.toLowerCase();
        yachts = yachts.filter(y => y.name?.toLowerCase().includes(q));
      }
      setResults(yachts);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div>
      <div className="bg-[#2a2a30] border border-[#C0C0C0]/20 rounded-2xl p-5 mb-4">
        <div className="flex items-start gap-3 mb-4">
          <Globe className="w-6 h-6 text-[#B03E00] shrink-0" />
          <div>
            <h3 className="trajan-regular text-base uppercase tracking-wider text-[#C0C0C0] mb-1">Recherche sur Ankor</h3>
            <p className="text-sm text-[#acb0cd]/70">
              Catalogue externe Ankor. Clique &laquo;&nbsp;Ajouter à ma BDD&nbsp;&raquo; pour importer un yacht en stock.
              Les yachts déjà en BDD sont marqués.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-4 gap-3">
          <input
            type="text" value={filters.search} onChange={e => setFilters({ ...filters, search: e.target.value })}
            placeholder="Rechercher par nom…"
            className="sm:col-span-2 px-4 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-xl text-[#acb0cd] text-sm focus:border-[#B03E00] outline-none"
          />
          <select
            value={filters.destination} onChange={e => setFilters({ ...filters, destination: e.target.value })}
            className="px-4 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-xl text-[#acb0cd] text-sm"
          >
            <option value="">Toutes régions</option>
            {Object.entries(REGION_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <button
            onClick={doSearch} disabled={loading}
            className="px-4 py-2 rounded-xl border-2 border-[#B03E00] bg-[#B03E00]/20 text-[#B03E00] hover:bg-[#B03E00]/30 disabled:opacity-50 text-sm uppercase tracking-wider font-medium flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
            Rechercher
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {results.length === 0 && !loading && (
          <div className="text-center py-12 text-[#acb0cd]/50">Lance une recherche pour voir les yachts Ankor.</div>
        )}
        {loading && (
          <div className="text-center py-12 text-[#acb0cd]/70 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Chargement du catalogue Ankor (environ 15 secondes)…
          </div>
        )}
        {results.length > 0 && !loading && (
          <div className="text-xs text-[#acb0cd]/60 px-1 pb-1">{results.length} yachts trouvés — {Math.min(shown, results.length)} affichés</div>
        )}
        {visible.map(yacht => {
          const inBdd = existingIds.has(yacht.id);
          const img = yacht.images?.[0] ? getAnkorImageUrl(yacht.images[0], '320w') : '/placeholder.jpg';
          return (
            <div key={yacht.id} className="flex items-center gap-3 p-3 rounded-xl border border-[#C0C0C0]/20 bg-[#2a2a30]">
              <Image src={img} alt={yacht.name} width={80} height={56} className="rounded-lg object-cover h-14" />
              <div className="flex-1 min-w-0">
                <h4 className="text-[#C0C0C0] font-medium truncate">{yacht.name}</h4>
                <div className="flex flex-wrap gap-3 text-xs text-[#acb0cd]/70 mt-1">
                  {yacht.length && <span>{yacht.length}</span>}
                  {yacht.guests && <span>{yacht.guests} guests</span>}
                  {yacht.pricePerHour && <span className="text-[#B03E00] font-bold">{yacht.pricePerHour}</span>}
                </div>
              </div>
              {inBdd ? (
                <span className="px-3 py-1.5 rounded-full bg-[#acb0cd]/10 border border-[#acb0cd]/30 text-[#acb0cd]/70 text-xs flex items-center gap-1.5">
                  <Check className="w-3 h-3" /> Déjà en BDD
                </span>
              ) : (
                <button
                  onClick={async () => { setAdding(yacht.id); await onAdd(yacht); setAdding(null); }}
                  disabled={adding === yacht.id}
                  className="px-4 py-2 rounded-xl border-2 border-[#B03E00] text-[#B03E00] hover:bg-[#B03E00]/10 disabled:opacity-50 text-xs uppercase tracking-wider font-medium flex items-center gap-1.5"
                >
                  {adding === yacht.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Ajouter à ma BDD
                </button>
              )}
            </div>
          );
        })}
        {shown < results.length && !loading && (
          <button
            onClick={() => setShown((n) => n + PAGE)}
            className="w-full mt-2 px-4 py-3 rounded-xl border border-[#C0C0C0]/30 text-[#acb0cd] hover:border-[#B03E00] hover:text-[#B03E00] text-sm uppercase tracking-wider"
          >
            Afficher plus ({results.length - shown} restants)
          </button>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ONGLET — Ajout manuel (hors Ankor)
// ════════════════════════════════════════════════════════════
function slugify(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD').replace(new RegExp('[̀-ͯ]', 'g'), '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ── Cases a cocher Regions / Sous-regions (multi-selection) ──
// Le yacht apparait sur chaque region et sous-region cochee. Les sous-regions
// n'apparaissent que sous une region cochee qui en possede (Caraibes, Bahamas).
function RegionCheckboxes({ regions, subRegions, onChange }) {
  const toggleRegion = (id) => {
    const on = regions.includes(id);
    const nextRegions = on ? regions.filter((r) => r !== id) : [...regions, id];
    // Region decochee → ses sous-regions sont decochees aussi.
    const subsOfRegion = SUB_REGIONS_BY_REGION[id] || [];
    const nextSubs = on ? subRegions.filter((sr) => !subsOfRegion.includes(sr)) : subRegions;
    onChange(nextRegions, nextSubs);
  };
  const toggleSub = (id) => {
    onChange(regions, subRegions.includes(id) ? subRegions.filter((sr) => sr !== id) : [...subRegions, id]);
  };
  return (
    <div className="bg-[#3a3b3f] rounded-lg p-3 space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
        {Object.entries(REGION_LABELS).map(([id, label]) => {
          const on = regions.includes(id);
          const subs = SUB_REGIONS_BY_REGION[id] || [];
          return (
            <div key={id} className={subs.length && on ? 'sm:col-span-2' : ''}>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={on} onChange={() => toggleRegion(id)} className="w-4 h-4 accent-[#B03E00]" />
                <span className={on ? 'text-[#B03E00] font-medium' : 'text-[#acb0cd]'}>{label}</span>
              </label>
              {on && subs.length > 0 && (
                <div className="mt-1.5 mb-1 ml-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                  {subs.map((sid) => {
                    const son = subRegions.includes(sid);
                    return (
                      <label key={sid} className="flex items-center gap-2 text-xs cursor-pointer">
                        <input type="checkbox" checked={son} onChange={() => toggleSub(sid)} className="w-3.5 h-3.5 accent-[#B03E00]" />
                        <span className={son ? 'text-[#B03E00]' : 'text-[#acb0cd]/80'}>{SUB_REGION_LABELS[sid] || sid}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ManualAddTab({ onAdd }) {
  const emptyForm = {
    name: '', type: '', make: '', year: '', refit: '', location: '',
    length: '', guests: '', cabins: '', crew: '', price: '',
    description: '', images: '', regions: [], sub_regions: [],
    categories: [], handicaps: [],
    pets_allowed: false, groups_allowed: false, water_toys: false,
    extra_info: '', internal_notes: '',
  };
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const hasCategory = (id) => form.categories.includes(id);
  const toggleCategory = (id) => setForm((f) => ({
    ...f,
    categories: f.categories.includes(id) ? f.categories.filter((c) => c !== id) : [...f.categories, id],
  }));

  // ── Picker handicaps (catégorie → handicap, + bouton Ajouter) ──
  const [hCat, setHCat] = useState('');
  const [hType, setHType] = useState('');
  const hOptions = HANDICAPS_BY_CAT.find((c) => c.id === hCat)?.items || [];
  const addHandicap = () => {
    if (!hType || form.handicaps.includes(hType)) return;
    setForm((f) => ({ ...f, handicaps: [...f.handicaps, hType] }));
    setHType('');
  };
  const removeHandicap = (id) => setForm((f) => ({ ...f, handicaps: f.handicaps.filter((h) => h !== id) }));

  // Rien n'est obligatoire : un champ vide n'empêche jamais l'enregistrement.
  const submit = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const images = form.images.split('\n').map(s => s.trim()).filter(Boolean);
      const name = form.name.trim() || 'Navire sans nom';
      const yacht_id = `manual-${slugify(name) || 'yacht'}-${Date.now().toString(36)}`;
      await onAdd({
        yacht_id,
        yacht_name: name,
        type: form.type || null,
        make: form.make.trim() || null,
        year: form.year ? Number(form.year) : null,
        refit: form.refit ? Number(form.refit) : null,
        location: form.location.trim() || null,
        images,
        length: form.length.trim() || null,
        guests: form.guests ? Number(form.guests) : null,
        cabins: form.cabins ? Number(form.cabins) : null,
        crew: form.crew ? Number(form.crew) : null,
        price: form.price.trim() || null,
        description: form.description.trim() || null,
        region: form.regions[0] || null,
        sub_region: form.sub_regions[0] || null,
        regions: form.regions,
        sub_regions: form.sub_regions,
        categories: form.categories,
        handicaps: form.handicaps,
        pets_allowed: form.pets_allowed,
        groups_allowed: form.groups_allowed,
        water_toys: form.water_toys,
        extra_info: form.extra_info.trim() || null,
        internal_notes: form.internal_notes.trim() || null,
      });
      setForm(emptyForm);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="bg-[#2a2a30] border border-[#C0C0C0]/20 rounded-2xl p-5 mb-4">
        <div className="flex items-start gap-3 mb-4">
          <Plus className="w-6 h-6 text-[#B03E00] shrink-0" />
          <div>
            <h3 className="trajan-regular text-base uppercase tracking-wider text-[#C0C0C0] mb-1">Ajouter un navire manuellement</h3>
            <p className="text-sm text-[#acb0cd]/70">
              Pour un bateau hors catalogue Ankor. Tous les champs sont facultatifs — laisse vide ce que tu ne connais pas
              encore, tu pourras compléter plus tard. Il est créé « en stock » (masqué) — publie-le ensuite depuis
              l'onglet <strong>Mes bateaux en BDD</strong>.
            </p>
          </div>
        </div>

        {/* Identité */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Nom du navire</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Ex : Belle Étoile"
              className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] focus:border-[#B03E00] outline-none" />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Type de navire</label>
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
              className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd]">
              <option value="">— Non renseigné —</option>
              {Object.entries(TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Constructeur</label>
            <input type="text" value={form.make} onChange={e => setForm({ ...form, make: e.target.value })}
              placeholder="Ex : Sunseeker"
              className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] focus:border-[#B03E00] outline-none" />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Année de construction</label>
            <input type="number" min="1900" max="2100" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })}
              className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] focus:border-[#B03E00] outline-none" />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Année de refit</label>
            <input type="number" min="1900" max="2100" value={form.refit} onChange={e => setForm({ ...form, refit: e.target.value })}
              className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] focus:border-[#B03E00] outline-none" />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Port d'attache / Localisation</label>
            <input type="text" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
              placeholder="Ex : Gustavia, St-Barthélemy"
              className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] focus:border-[#B03E00] outline-none" />
          </div>
        </div>

        {/* Caractéristiques */}
        <div className="grid sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-[#C0C0C0]/10">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Longueur</label>
            <input type="text" value={form.length} onChange={e => setForm({ ...form, length: e.target.value })}
              placeholder="Ex : 24m"
              className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] focus:border-[#B03E00] outline-none" />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Prix affiché</label>
            <input type="text" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
              placeholder="Ex : 15 000 €/semaine"
              className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] focus:border-[#B03E00] outline-none" />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Invités</label>
            <input type="number" min="0" value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })}
              className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] focus:border-[#B03E00] outline-none" />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Cabines</label>
            <input type="number" min="0" value={form.cabins} onChange={e => setForm({ ...form, cabins: e.target.value })}
              className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] focus:border-[#B03E00] outline-none" />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Équipage</label>
            <input type="number" min="0" value={form.crew} onChange={e => setForm({ ...form, crew: e.target.value })}
              className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] focus:border-[#B03E00] outline-none" />
          </div>
        </div>

        {/* Régions / sous-régions (multi-sélection) */}
        <div className="mt-3 pt-3 border-t border-[#C0C0C0]/10">
          <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-2">Régions et sous-régions</label>
          <RegionCheckboxes regions={form.regions} subRegions={form.sub_regions}
            onChange={(regions, sub_regions) => setForm((f) => ({ ...f, regions, sub_regions }))} />
        </div>

        {/* Description + photos */}
        <div className="grid sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-[#C0C0C0]/10">
          <div className="sm:col-span-2">
            <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Description</label>
            <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] focus:border-[#B03E00] outline-none resize-y" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Photos (une URL par ligne, la 1ère = photo principale)</label>
            <textarea rows={3} value={form.images} onChange={e => setForm({ ...form, images: e.target.value })}
              placeholder={'https://exemple.com/photo1.jpg\nhttps://exemple.com/photo2.jpg'}
              className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] focus:border-[#B03E00] outline-none resize-y" />
          </div>
        </div>

        {/* Catégories charter */}
        <div className="mt-3 pt-3 border-t border-[#C0C0C0]/10">
          <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-2">Catégories charter</label>
          <div className="bg-[#3a3b3f] rounded-lg p-3 space-y-3">
            {CHARTER_CATEGORIES.map((cat) => (
              <div key={cat.id}>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={hasCategory(cat.id)} onChange={() => toggleCategory(cat.id)} className="w-4 h-4 accent-[#B03E00]" />
                  <span className={hasCategory(cat.id) ? 'text-[#B03E00] font-medium' : 'text-[#acb0cd]'}>{cat.label}</span>
                </label>
                {cat.subs && (
                  <div className="mt-2 ml-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                    {cat.subs.map((sub) => (
                      <label key={sub.id} className="flex items-center gap-2 text-xs cursor-pointer">
                        <input type="checkbox" checked={hasCategory(sub.id)} onChange={() => toggleCategory(sub.id)} className="w-3.5 h-3.5 accent-[#B03E00]" />
                        <span className={hasCategory(sub.id) ? 'text-[#B03E00]' : 'text-[#acb0cd]/80'}>{sub.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Handicaps accommodés */}
        <div className="mt-3">
          <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-2">Handicaps accommodés</label>
          <div className="bg-[#3a3b3f] rounded-lg p-3 space-y-3">
            <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-2 items-end">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/50 mb-1">Catégorie</label>
                <select value={hCat} onChange={e => { setHCat(e.target.value); setHType(''); }}
                  className="w-full px-3 py-2 bg-[#2a2a30] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] text-sm">
                  <option value="">— Choisir —</option>
                  {HANDICAPS_BY_CAT.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/50 mb-1">Handicap</label>
                <select value={hType} onChange={e => setHType(e.target.value)} disabled={!hCat}
                  className="w-full px-3 py-2 bg-[#2a2a30] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] text-sm disabled:opacity-40">
                  <option value="">— Choisir —</option>
                  {hOptions.map(h => <option key={h.id} value={h.id}>{h.type}</option>)}
                </select>
              </div>
              <button type="button" onClick={addHandicap} disabled={!hType}
                className="px-4 py-2 rounded-lg border border-[#B03E00] text-[#B03E00] hover:bg-[#B03E00]/15 disabled:opacity-40 text-sm font-medium flex items-center gap-1 whitespace-nowrap">
                <Plus className="w-4 h-4" /> Ajouter
              </button>
            </div>
            {form.handicaps.length === 0 ? (
              <p className="text-[#acb0cd]/40 text-xs italic">Aucun handicap assigné.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {form.handicaps.map(id => (
                  <span key={id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-[#B03E00]/15 border border-[#B03E00]/40 text-[#e3a892]">
                    {HANDICAP_LABELS[id] || id}
                    <button type="button" onClick={() => removeHandicap(id)} className="text-[#e3a892]/70 hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Options + notes internes */}
        <div className="mt-3 pt-3 border-t border-[#C0C0C0]/10">
          <div className="bg-[#3a3b3f] rounded-lg p-3 grid grid-cols-3 gap-2 mb-3">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.pets_allowed} onChange={e => setForm({ ...form, pets_allowed: e.target.checked })} className="w-4 h-4" />
              <span className="text-[#acb0cd]">Animaux</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.groups_allowed} onChange={e => setForm({ ...form, groups_allowed: e.target.checked })} className="w-4 h-4" />
              <span className="text-[#acb0cd]">Groupes</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.water_toys} onChange={e => setForm({ ...form, water_toys: e.target.checked })} className="w-4 h-4" />
              <span className="text-[#acb0cd]">Water toys</span>
            </label>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Infos additionnelles (public)</label>
              <textarea rows={2} value={form.extra_info} onChange={e => setForm({ ...form, extra_info: e.target.value })}
                className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] focus:border-[#B03E00] outline-none resize-y" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Notes internes (usage admin uniquement)</label>
              <textarea rows={2} value={form.internal_notes} onChange={e => setForm({ ...form, internal_notes: e.target.value })}
                className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] focus:border-[#B03E00] outline-none resize-y" />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button onClick={submit} disabled={saving}
            className="px-6 py-2 rounded-xl border-2 border-[#B03E00] bg-[#B03E00]/20 text-[#B03E00] hover:bg-[#B03E00]/30 disabled:opacity-50 text-sm uppercase tracking-wider font-medium flex items-center gap-2">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Ajouter en stock
          </button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ONGLET 2 — Catalogue BDD (toggle visible)
// ════════════════════════════════════════════════════════════
function BddCatalogueTab({ yachts, onToggleVisible, onToggleFeatured, onDelete, onEdit }) {
  const [filterRegion, setFilterRegion] = useState('');
  const [filterVisibility, setFilterVisibility] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => yachts.filter(y => {
    if (filterRegion && !(y.regions || []).includes(filterRegion) && y.region !== filterRegion) return false;
    if (filterVisibility === 'visible' && !y.is_visible) return false;
    if (filterVisibility === 'hidden' && y.is_visible) return false;
    if (search && !(y.name || '').toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [yachts, filterRegion, filterVisibility, search]);

  const allRegions = useMemo(() => [...new Set(yachts.flatMap(y => (y.regions && y.regions.length ? y.regions : [y.region])).filter(Boolean))].sort(), [yachts]);

  return (
    <div>
      <div className="bg-[#2a2a30] border border-[#C0C0C0]/20 rounded-2xl p-5 mb-4">
        <div className="flex items-start gap-3 mb-4">
          <Database className="w-6 h-6 text-[#B03E00] shrink-0" />
          <div>
            <h3 className="trajan-regular text-base uppercase tracking-wider text-[#C0C0C0] mb-1">Mes bateaux en BDD</h3>
            <p className="text-sm text-[#acb0cd]/70">
              Tous les yachts en base. Toggle <strong className="text-[#B03E00]">Publié</strong> pour les afficher/cacher sur le site.
              L'édition (titre, prix, photos…) se fait sur l'onglet <strong>Mes bateaux publiés</strong>.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher par nom…"
            className="px-4 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-xl text-[#acb0cd] text-sm focus:border-[#B03E00] outline-none"
          />
          <select value={filterRegion} onChange={e => setFilterRegion(e.target.value)}
            className="px-4 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-xl text-[#acb0cd] text-sm">
            <option value="">Toutes régions ({allRegions.length})</option>
            {allRegions.map(r => <option key={r} value={r}>{REGION_LABELS[r] || r}</option>)}
          </select>
          <select value={filterVisibility} onChange={e => setFilterVisibility(e.target.value)}
            className="px-4 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-xl text-[#acb0cd] text-sm">
            <option value="all">Visibles + En stock</option>
            <option value="visible">Publiés uniquement</option>
            <option value="hidden">En stock uniquement</option>
          </select>
        </div>
      </div>

      <div className="text-xs text-[#acb0cd]/60 mb-2 px-1">{filtered.length} bateau{filtered.length > 1 ? 'x' : ''} sur {yachts.length}</div>

      <div className="space-y-2 max-h-[800px] overflow-y-auto pr-1">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-[#acb0cd]/50">Aucun bateau ne correspond.</div>
        ) : filtered.map(y => (
          <div key={y.id} className={`flex items-center gap-3 p-3 rounded-xl border ${y.is_visible ? 'border-[#B03E00]/40 bg-[#B03E00]/5' : 'border-[#C0C0C0]/20 bg-[#2a2a30]'}`}>
            <Image src={y.image} alt={y.name} width={80} height={56} className="rounded-lg object-cover h-14 shrink-0" unoptimized />
            <div className="flex-1 min-w-0">
              <h4 className="text-[#C0C0C0] font-medium flex items-center gap-2 truncate">
                {y.name}
                {y.is_featured && <Star className="w-3 h-3 text-[#B03E00] shrink-0" fill="currentColor" />}
              </h4>
              <div className="flex flex-wrap gap-3 text-xs text-[#acb0cd]/70 mt-1">
                {y.length && <span>{y.length}</span>}
                {y.guests && <span>{y.guests} guests</span>}
                {y.cabins && <span>{y.cabins} cabines</span>}
                {(y.regions || []).length > 0 && <span className="text-[#B03E00]">{y.regions.map(r => REGION_LABELS[r] || r).join(', ')}</span>}
                {(y.sub_regions || []).length > 0 && <span className="text-[#B03E00]/70">› {y.sub_regions.map(sr => SUB_REGION_LABELS[sr] || sr).join(', ')}</span>}
              </div>
            </div>

            <button
              onClick={() => onToggleVisible(y)}
              className={`px-3 py-2 rounded-xl text-xs uppercase tracking-wider font-medium flex items-center gap-2 shrink-0 ${
                y.is_visible
                  ? 'bg-[#B03E00]/20 border border-[#B03E00] text-[#B03E00]'
                  : 'bg-[#3a3b3f] border border-[#C0C0C0]/30 text-[#acb0cd]/70 hover:border-[#B03E00] hover:text-[#B03E00]'
              }`}
              title={y.is_visible ? 'Cliquer pour cacher' : 'Cliquer pour publier'}
            >
              {y.is_visible ? <><Eye className="w-4 h-4" /> Publié</> : <><EyeOff className="w-4 h-4" /> En stock</>}
            </button>

            <button onClick={() => onToggleFeatured(y)} disabled={!y.is_visible}
              className={`p-2 rounded-lg shrink-0 ${y.is_visible ? (y.is_featured ? 'text-[#B03E00]' : 'text-[#acb0cd]/50 hover:text-[#B03E00]') : 'text-[#acb0cd]/20 cursor-not-allowed'}`}
              title={y.is_visible ? 'Mettre en avant' : 'Publie d\'abord'}>
              <Star className="w-4 h-4" fill={y.is_featured ? 'currentColor' : 'none'} />
            </button>

            <button onClick={() => y.is_visible && onEdit(y)} disabled={!y.is_visible}
              className={`p-2 rounded-lg shrink-0 ${y.is_visible ? 'text-[#acb0cd] hover:text-[#B03E00]' : 'text-[#acb0cd]/20 cursor-not-allowed'}`}
              title={y.is_visible ? 'Éditer' : 'Publie d\'abord pour éditer'}>
              <Edit3 className="w-4 h-4" />
            </button>

            <button onClick={() => onDelete(y)}
              className="p-2 rounded-lg text-[#acb0cd]/50 hover:text-red-400 shrink-0"
              title="Supprimer définitivement de la BDD">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ONGLET 3 — Publiés (édition)
// ════════════════════════════════════════════════════════════
function VisibleEditTab({ yachts, onEdit }) {
  const visible = useMemo(() => yachts.filter(y => y.is_visible), [yachts]);

  return (
    <div>
      <div className="bg-[#2a2a30] border border-[#C0C0C0]/20 rounded-2xl p-5 mb-4">
        <div className="flex items-start gap-3">
          <Eye className="w-6 h-6 text-[#B03E00] shrink-0" />
          <div>
            <h3 className="trajan-regular text-base uppercase tracking-wider text-[#C0C0C0] mb-1">Mes bateaux publiés</h3>
            <p className="text-sm text-[#acb0cd]/70">
              Édition complète : titre custom, description, prix affiché, options, région/sous-région.
              Pour cacher un yacht, va dans <strong>Mes bateaux en BDD</strong>.
            </p>
          </div>
        </div>
      </div>

      <div className="text-xs text-[#acb0cd]/60 mb-2 px-1">{visible.length} bateau{visible.length > 1 ? 'x' : ''} publié{visible.length > 1 ? 's' : ''}</div>

      <div className="grid md:grid-cols-2 gap-3 max-h-[800px] overflow-y-auto pr-1">
        {visible.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-[#acb0cd]/50">
            Aucun bateau publié. Va dans <strong>Mes bateaux en BDD</strong> pour en publier.
          </div>
        ) : visible.map(y => (
          <button key={y.id} onClick={() => onEdit(y)}
            className="flex items-center gap-3 p-4 rounded-xl border border-[#B03E00]/30 bg-[#B03E00]/5 text-left hover:bg-[#B03E00]/10 hover:border-[#B03E00] transition-colors">
            <Image src={y.image} alt={y.name} width={100} height={70} className="rounded-lg object-cover h-16 shrink-0" unoptimized />
            <div className="flex-1 min-w-0">
              <h4 className="text-[#C0C0C0] font-medium flex items-center gap-2 truncate">
                {y.name}
                {y.is_featured && <Star className="w-3 h-3 text-[#B03E00] shrink-0" fill="currentColor" />}
              </h4>
              {y.custom_title && <p className="text-xs text-[#acb0cd] italic truncate">« {y.custom_title} »</p>}
              <div className="flex flex-wrap gap-2 text-xs text-[#acb0cd]/70 mt-1">
                {y.length && <span>{y.length}</span>}
                {y.guests && <span>{y.guests} guests</span>}
                {(y.regions || []).length > 0 && <span>{y.regions.map(r => REGION_LABELS[r] || r).join(', ')}</span>}
              </div>
              {y.custom_price && <p className="text-[#B03E00] font-bold text-sm mt-1">{y.custom_price}</p>}
            </div>
            <Edit3 className="w-5 h-5 text-[#B03E00] shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// MODAL Édition
// ════════════════════════════════════════════════════════════
function EditModal({ yacht, onClose, onSave }) {
  const [form, setForm] = useState({
    custom_title: yacht.custom_title || '',
    custom_description: yacht.custom_description || '',
    custom_price: yacht.custom_price || '',
    regions: Array.isArray(yacht.regions) ? yacht.regions : (yacht.region ? [yacht.region] : []),
    sub_regions: Array.isArray(yacht.sub_regions) ? yacht.sub_regions : (yacht.sub_region ? [yacht.sub_region] : []),
    categories: Array.isArray(yacht.categories) ? yacht.categories : [],
    handicaps: Array.isArray(yacht.handicaps) ? yacht.handicaps : [],
    pets_allowed: !!yacht.pets_allowed,
    groups_allowed: !!yacht.groups_allowed,
    water_toys: !!yacht.water_toys,
    extra_info: yacht.extra_info || '',
  });
  const [saving, setSaving] = useState(false);

  const hasCategory = (id) => form.categories.includes(id);
  const toggleCategory = (id) => setForm((f) => ({
    ...f,
    categories: f.categories.includes(id)
      ? f.categories.filter((c) => c !== id)
      : [...f.categories, id],
  }));

  // ── Picker handicaps (style région → sous-région : catégorie puis handicap, + bouton Ajouter) ──
  const [hCat, setHCat] = useState('');
  const [hType, setHType] = useState('');
  const hOptions = HANDICAPS_BY_CAT.find((c) => c.id === hCat)?.items || [];
  const addHandicap = () => {
    if (!hType || form.handicaps.includes(hType)) return;
    setForm((f) => ({ ...f, handicaps: [...f.handicaps, hType] }));
    setHType('');
  };
  const removeHandicap = (id) => setForm((f) => ({
    ...f,
    handicaps: f.handicaps.filter((h) => h !== id),
  }));

  const save = async () => {
    setSaving(true);
    await onSave(yacht.id, form);
    setSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#2a2a30] rounded-2xl border border-[#C0C0C0]/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-[#C0C0C0]/20 flex items-center justify-between sticky top-0 bg-[#2a2a30]">
          <h3 className="trajan-regular text-lg uppercase tracking-wider text-[#C0C0C0]">Éditer {yacht.name}</h3>
          <button onClick={onClose} className="text-[#acb0cd]/60 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Titre personnalisé</label>
            <input type="text" value={form.custom_title} onChange={e => setForm({ ...form, custom_title: e.target.value })}
              placeholder={yacht.name} className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] focus:border-[#B03E00] outline-none" />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Description FR</label>
            <textarea rows={3} value={form.custom_description} onChange={e => setForm({ ...form, custom_description: e.target.value })}
              className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] focus:border-[#B03E00] outline-none resize-y" />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Prix affiché</label>
            <input type="text" value={form.custom_price} onChange={e => setForm({ ...form, custom_price: e.target.value })}
              className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] focus:border-[#B03E00] outline-none" />
          </div>
          {/* Régions / sous-régions : cases à cocher, le yacht apparaît sur chaque zone cochée */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-2">Régions et sous-régions</label>
            <RegionCheckboxes regions={form.regions} subRegions={form.sub_regions}
              onChange={(regions, sub_regions) => setForm((f) => ({ ...f, regions, sub_regions }))} />
          </div>
          {/* Catégories charter (multi-sélection, indépendant des régions) */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-2">Catégories charter</label>
            <div className="bg-[#3a3b3f] rounded-lg p-3 space-y-3">
              {CHARTER_CATEGORIES.map((cat) => (
                <div key={cat.id}>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={hasCategory(cat.id)} onChange={() => toggleCategory(cat.id)} className="w-4 h-4 accent-[#B03E00]" />
                    <span className={hasCategory(cat.id) ? 'text-[#B03E00] font-medium' : 'text-[#acb0cd]'}>{cat.label}</span>
                  </label>
                  {cat.subs && (
                    <div className="mt-2 ml-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                      {cat.subs.map((sub) => (
                        <label key={sub.id} className="flex items-center gap-2 text-xs cursor-pointer">
                          <input type="checkbox" checked={hasCategory(sub.id)} onChange={() => toggleCategory(sub.id)} className="w-3.5 h-3.5 accent-[#B03E00]" />
                          <span className={hasCategory(sub.id) ? 'text-[#B03E00]' : 'text-[#acb0cd]/80'}>{sub.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Handicaps accommodés — style région → sous-région : catégorie puis handicap, + bouton Ajouter */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-2">Handicaps accommodés</label>
            <div className="bg-[#3a3b3f] rounded-lg p-3 space-y-3">
              <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-2 items-end">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/50 mb-1">Catégorie</label>
                  <select value={hCat} onChange={e => { setHCat(e.target.value); setHType(''); }}
                    className="w-full px-3 py-2 bg-[#2a2a30] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] text-sm">
                    <option value="">— Choisir —</option>
                    {HANDICAPS_BY_CAT.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/50 mb-1">Handicap</label>
                  <select value={hType} onChange={e => setHType(e.target.value)} disabled={!hCat}
                    className="w-full px-3 py-2 bg-[#2a2a30] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] text-sm disabled:opacity-40">
                    <option value="">— Choisir —</option>
                    {hOptions.map(h => <option key={h.id} value={h.id}>{h.type}</option>)}
                  </select>
                </div>
                <button type="button" onClick={addHandicap} disabled={!hType}
                  className="px-4 py-2 rounded-lg border border-[#B03E00] text-[#B03E00] hover:bg-[#B03E00]/15 disabled:opacity-40 text-sm font-medium flex items-center gap-1 whitespace-nowrap">
                  <Plus className="w-4 h-4" /> Ajouter
                </button>
              </div>
              {form.handicaps.length === 0 ? (
                <p className="text-[#acb0cd]/40 text-xs italic">Aucun handicap assigné.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {form.handicaps.map(id => (
                    <span key={id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-[#B03E00]/15 border border-[#B03E00]/40 text-[#e3a892]">
                      {HANDICAP_LABELS[id] || id}
                      <button type="button" onClick={() => removeHandicap(id)} className="text-[#e3a892]/70 hover:text-white">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#3a3b3f] rounded-lg p-3 grid grid-cols-3 gap-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.pets_allowed} onChange={e => setForm({ ...form, pets_allowed: e.target.checked })} className="w-4 h-4" />
              <span className="text-[#acb0cd]">Animaux</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.groups_allowed} onChange={e => setForm({ ...form, groups_allowed: e.target.checked })} className="w-4 h-4" />
              <span className="text-[#acb0cd]">Groupes</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.water_toys} onChange={e => setForm({ ...form, water_toys: e.target.checked })} className="w-4 h-4" />
              <span className="text-[#acb0cd]">Water toys</span>
            </label>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Infos additionnelles</label>
            <textarea rows={2} value={form.extra_info} onChange={e => setForm({ ...form, extra_info: e.target.value })}
              className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] focus:border-[#B03E00] outline-none resize-y" />
          </div>
        </div>
        <div className="p-5 border-t border-[#C0C0C0]/20 flex justify-end gap-2 sticky bottom-0 bg-[#2a2a30]">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-[#C0C0C0]/30 text-[#acb0cd] hover:border-[#B03E00] hover:text-[#B03E00] text-sm">Annuler</button>
          <button onClick={save} disabled={saving}
            className="px-6 py-2 rounded-xl border-2 border-[#B03E00] bg-[#B03E00]/20 text-[#B03E00] hover:bg-[#B03E00]/30 disabled:opacity-50 text-sm uppercase tracking-wider font-medium flex items-center gap-2">
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL
// ════════════════════════════════════════════════════════════
export default function AdminYachtPanel({ initialSelections, initialStats }) {
  const [rawYachts, setRawYachts] = useState(initialSelections || []);
  const [activeTab, setActiveTab] = useState('bdd');
  const [editingYacht, setEditingYacht] = useState(null);
  const [activeAdmins, setActiveAdmins] = useState(1);

  const yachts = useMemo(() => rawYachts.map(adaptYacht), [rawYachts]);
  const existingIds = useMemo(() => new Set(yachts.map(y => y.id)), [yachts]);

  // ── Heartbeat : ping toutes les 30s pour signaler qu'on est en ligne ──
  useEffect(() => {
    // Identifiant de PRESENCE, propre a l'onglet. Ce n'est PAS un secret et ce n'est
    // pas la session d'authentification : il sert uniquement a compter les admins en
    // ligne. La vraie session est le cookie HttpOnly, invisible d'ici.
    let presenceSessionId = sessionStorage.getItem('admin_presence_session_id');
    if (!presenceSessionId) {
      presenceSessionId = (crypto.randomUUID && crypto.randomUUID()) || `s-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      sessionStorage.setItem('admin_presence_session_id', presenceSessionId);
    }

    const ping = async () => {
      try {
        const res = await fetch('/api/admin/heartbeat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionToken: presenceSessionId }),
        });
        const data = await res.json();
        if (typeof data.activeCount === 'number') setActiveAdmins(data.activeCount);
      } catch (e) { /* silent */ }
    };

    ping(); // immédiat
    const interval = setInterval(ping, 30000);
    return () => clearInterval(interval);
  }, []);

  // Recharge depuis BDD après chaque action mutante
  const reload = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/yachts');
      const data = await res.json();
      setRawYachts(data.selections || []);
    } catch (e) { console.error('reload:', e); }
  }, []);

  const onAddFromAnkor = async (yacht) => {
    try {
      const res = await fetch('/api/admin/yachts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          yacht_id: yacht.id, yacht_name: yacht.name, cached_data: yacht,
        }),
      });
      if (res.ok) {
        await reload();
        // L'API met is_visible=true par défaut. On le met en stock (false) pour cohérence UX.
        await fetch('/api/admin/yachts', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'visibility', yacht_id: yacht.id, is_visible: false }),
        });
        await reload();
        alert(`${yacht.name} ajouté en stock. Va dans "Mes bateaux en BDD" pour le publier.`);
      }
    } catch (e) { console.error(e); }
  };

  const onAddManual = async (data) => {
    try {
      const {
        yacht_id, yacht_name, type, make, year, refit, location,
        images, length, guests, cabins, crew, price, description,
        region, sub_region, categories, handicaps,
        pets_allowed, groups_allowed, water_toys, extra_info, internal_notes,
      } = data;
      const cached_data = {
        id: yacht_id, name: yacht_name, type, make, year, refit, location,
        images, length, guests, cabins, crew, price, description,
      };
      // Pas de ?token= : depuis a4638bb l'authentification passe par la session
      // signee HMAC en cookie httpOnly. La branche d'origine datait d'avant.
      const res = await fetch('/api/admin/yachts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          yacht_id, yacht_name, cached_data, region, sub_region,
          pets_allowed, groups_allowed, water_toys, extra_info,
        }),
      });
      if (res.ok) {
        // Champs non gérés par la création (uniquement via l'enrichissement) : catégories, handicaps, notes internes.
        await fetch('/api/admin/yachts', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'enrich', yacht_id, categories, handicaps, internal_notes }),
        });
        // Comme pour l'import Ankor : créé en stock, l'admin publie ensuite explicitement.
        await fetch('/api/admin/yachts', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'visibility', yacht_id, is_visible: false }),
        });
        await reload();
        alert(`${yacht_name} ajouté en stock. Va dans "Mes bateaux en BDD" pour le publier.`);
      } else {
        const err = await res.json().catch(() => ({}));
        alert(`Erreur lors de l'ajout : ${err.error || res.status}`);
      }
    } catch (e) {
      console.error(e);
      alert("Erreur réseau lors de l'ajout.");
    }
  };

  const onToggleVisible = async (y) => {
    try {
      await fetch('/api/admin/yachts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'visibility', yacht_id: y.id, is_visible: !y.is_visible }),
      });
      setRawYachts(prev => prev.map(s => s.yacht_id === y.id ? { ...s, is_visible: !y.is_visible } : s));
    } catch (e) { console.error(e); }
  };

  const onToggleFeatured = async (y) => {
    try {
      await fetch('/api/admin/yachts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'featured', yacht_id: y.id, is_featured: !y.is_featured }),
      });
      setRawYachts(prev => prev.map(s => s.yacht_id === y.id ? { ...s, is_featured: !y.is_featured } : s));
    } catch (e) { console.error(e); }
  };

  const onDelete = async (y) => {
    if (!confirm(`Supprimer définitivement ${y.name} de la BDD ?`)) return;
    try {
      await fetch(`/api/admin/yachts?yacht_id=${encodeURIComponent(y.id)}`, { method: 'DELETE' });
      setRawYachts(prev => prev.filter(s => s.yacht_id !== y.id));
    } catch (e) { console.error(e); }
  };

  const onSaveEdit = async (id, updates) => {
    try {
      await fetch('/api/admin/yachts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'enrich', yacht_id: id, ...updates }),
      });
      setRawYachts(prev => prev.map(s => s.yacht_id === id
        ? { ...s, ...updates, region: (updates.regions && updates.regions[0]) || null, sub_region: (updates.sub_regions && updates.sub_regions[0]) || null }
        : s));
    } catch (e) { console.error(e); }
  };

  const TABS = [
    { id: 'ankor', label: 'Recherche Ankor', icon: Globe, desc: 'Catalogue externe à importer' },
    { id: 'manual', label: 'Ajout manuel', icon: Plus, desc: 'Navire hors catalogue Ankor' },
    { id: 'bdd', label: 'Mes bateaux en BDD', icon: Database, desc: 'Toute la base · publier/cacher' },
    { id: 'visible', label: 'Mes bateaux publiés', icon: Eye, desc: 'Édition complète des publiés' },
  ];

  return (
    <div>
      {/* Indicateur multi-admin */}
      {activeAdmins > 1 ? (
        <div className="mb-4 rounded-xl border border-amber-700/50 bg-amber-900/20 px-4 py-3 flex items-center gap-3">
          <Users className="w-5 h-5 text-amber-400 shrink-0" />
          <div className="text-sm text-amber-200">
            <strong className="text-amber-300">{activeAdmins} sessions admin actives</strong> en ce moment.
            <span className="ml-1 text-amber-200/70">Attention à ne pas éditer le même yacht en simultané (le dernier qui sauvegarde écrase l'autre).</span>
          </div>
        </div>
      ) : (
        <div className="mb-4 inline-flex items-center gap-2 text-xs text-[#acb0cd]/50">
          <Users className="w-3 h-3" />
          <span>1 session admin active (toi)</span>
        </div>
      )}

      <Dashboard yachts={yachts} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                active ? 'border-[#B03E00] bg-[#B03E00]/10' : 'border-[#C0C0C0]/20 bg-[#2a2a30] hover:border-[#B03E00]/40'
              }`}>
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${active ? 'text-[#B03E00]' : 'text-[#acb0cd]/60'}`} />
                <h3 className={`text-xs md:text-sm uppercase tracking-wider font-medium ${active ? 'text-[#B03E00]' : 'text-[#acb0cd]'}`}>{tab.label}</h3>
              </div>
              <p className={`text-[10px] md:text-xs ${active ? 'text-[#acb0cd]' : 'text-[#acb0cd]/50'}`}>{tab.desc}</p>
            </button>
          );
        })}
      </div>

      {activeTab === 'ankor' && <AnkorSearchTab existingIds={existingIds} onAdd={onAddFromAnkor} />}
      {activeTab === 'manual' && <ManualAddTab onAdd={onAddManual} />}
      {activeTab === 'bdd' && <BddCatalogueTab yachts={yachts} onToggleVisible={onToggleVisible} onToggleFeatured={onToggleFeatured} onDelete={onDelete} onEdit={(y) => setEditingYacht(y)} />}
      {activeTab === 'visible' && <VisibleEditTab yachts={yachts} onEdit={(y) => setEditingYacht(y)} />}

      {editingYacht && <EditModal yacht={editingYacht} onClose={() => setEditingYacht(null)} onSave={onSaveEdit} />}
    </div>
  );
}
