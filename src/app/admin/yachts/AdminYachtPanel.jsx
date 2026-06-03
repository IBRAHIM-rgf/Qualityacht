'use client';

// Admin yachts v2 — branché sur la BDD réelle.
// Structure : Dashboard (stats permanentes) + 3 onglets (Ankor / BDD / Publiés) + modal édition.
// Remplace le wizard 5 étapes précédent. Pour la démo standalone : /admin/yachts-mock

import { useState, useMemo, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { getAnkorImageUrl } from '@/lib/utils';
import {
  Plus, Check, X, Eye, EyeOff, Star, Edit3, Trash2,
  Database, Globe, Loader2,
} from 'lucide-react';

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
    ankor_region: s.ankor_region,
    is_visible: s.is_visible !== false,
    is_featured: s.is_featured === true,
    custom_title: s.custom_title || '',
    custom_price: s.custom_price || '',
    custom_description: s.custom_description || '',
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
    for (const y of yachts) {
      const r = y.region || '_none';
      byRegion[r] = (byRegion[r] || 0) + 1;
      if (y.sub_region) bySubRegion[y.sub_region] = (bySubRegion[y.sub_region] || 0) + 1;
    }
    return { total, visible, hidden, featured, byRegion, bySubRegion };
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
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ONGLET 1 — Recherche Ankor (vrai endpoint)
// ════════════════════════════════════════════════════════════
function AnkorSearchTab({ existingIds, onAdd, token }) {
  const [filters, setFilters] = useState({ search: '', type: '', destination: '' });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(null);

  const doSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.type) params.set('type', filters.type);
      if (filters.destination) params.set('destination', filters.destination);
      const res = await fetch(`/api/admin/yachts/search?token=${token}&${params}`);
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
        {results.map(yacht => {
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
    if (filterRegion && y.region !== filterRegion) return false;
    if (filterVisibility === 'visible' && !y.is_visible) return false;
    if (filterVisibility === 'hidden' && y.is_visible) return false;
    if (search && !(y.name || '').toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [yachts, filterRegion, filterVisibility, search]);

  const allRegions = useMemo(() => [...new Set(yachts.map(y => y.region).filter(Boolean))].sort(), [yachts]);

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
                {y.region && <span className="text-[#B03E00]">{REGION_LABELS[y.region] || y.region}</span>}
                {y.sub_region && <span className="text-[#B03E00]/70">› {SUB_REGION_LABELS[y.sub_region] || y.sub_region}</span>}
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
                {y.region && <span>{REGION_LABELS[y.region] || y.region}</span>}
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
    region: yacht.region || '',
    sub_region: yacht.sub_region || '',
    pets_allowed: !!yacht.pets_allowed,
    groups_allowed: !!yacht.groups_allowed,
    water_toys: !!yacht.water_toys,
    extra_info: yacht.extra_info || '',
  });
  const [saving, setSaving] = useState(false);
  const availableSubRegions = SUB_REGIONS_BY_REGION[form.region] || [];

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
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Région</label>
              <select value={form.region} onChange={e => setForm({ ...form, region: e.target.value, sub_region: '' })}
                className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd]">
                <option value="">— Aucune —</option>
                {Object.entries(REGION_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            {availableSubRegions.length > 0 && (
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Sous-région</label>
                <select value={form.sub_region} onChange={e => setForm({ ...form, sub_region: e.target.value })}
                  className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd]">
                  <option value="">— Aucune —</option>
                  {availableSubRegions.map(s => <option key={s} value={s}>{SUB_REGION_LABELS[s] || s}</option>)}
                </select>
              </div>
            )}
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
export default function AdminYachtPanel({ initialSelections, initialStats, token }) {
  const [rawYachts, setRawYachts] = useState(initialSelections || []);
  const [activeTab, setActiveTab] = useState('bdd');
  const [editingYacht, setEditingYacht] = useState(null);

  const yachts = useMemo(() => rawYachts.map(adaptYacht), [rawYachts]);
  const existingIds = useMemo(() => new Set(yachts.map(y => y.id)), [yachts]);

  // Recharge depuis BDD après chaque action mutante
  const reload = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/yachts?token=${token}`);
      const data = await res.json();
      setRawYachts(data.selections || []);
    } catch (e) { console.error('reload:', e); }
  }, [token]);

  const onAddFromAnkor = async (yacht) => {
    try {
      const res = await fetch(`/api/admin/yachts?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          yacht_id: yacht.id, yacht_name: yacht.name, cached_data: yacht,
        }),
      });
      if (res.ok) {
        await reload();
        // L'API met is_visible=true par défaut. On le met en stock (false) pour cohérence UX.
        await fetch(`/api/admin/yachts?token=${token}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'visibility', yacht_id: yacht.id, is_visible: false }),
        });
        await reload();
        alert(`${yacht.name} ajouté en stock. Va dans "Mes bateaux en BDD" pour le publier.`);
      }
    } catch (e) { console.error(e); }
  };

  const onToggleVisible = async (y) => {
    try {
      await fetch(`/api/admin/yachts?token=${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'visibility', yacht_id: y.id, is_visible: !y.is_visible }),
      });
      setRawYachts(prev => prev.map(s => s.yacht_id === y.id ? { ...s, is_visible: !y.is_visible } : s));
    } catch (e) { console.error(e); }
  };

  const onToggleFeatured = async (y) => {
    try {
      await fetch(`/api/admin/yachts?token=${token}`, {
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
      await fetch(`/api/admin/yachts?token=${token}&yacht_id=${encodeURIComponent(y.id)}`, { method: 'DELETE' });
      setRawYachts(prev => prev.filter(s => s.yacht_id !== y.id));
    } catch (e) { console.error(e); }
  };

  const onSaveEdit = async (id, updates) => {
    try {
      await fetch(`/api/admin/yachts?token=${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'enrich', yacht_id: id, ...updates }),
      });
      setRawYachts(prev => prev.map(s => s.yacht_id === id ? { ...s, ...updates } : s));
    } catch (e) { console.error(e); }
  };

  const TABS = [
    { id: 'ankor', label: 'Recherche Ankor', icon: Globe, desc: 'Catalogue externe à importer' },
    { id: 'bdd', label: 'Mes bateaux en BDD', icon: Database, desc: 'Toute la base · publier/cacher' },
    { id: 'visible', label: 'Mes bateaux publiés', icon: Eye, desc: 'Édition complète des publiés' },
  ];

  return (
    <div>
      <Dashboard yachts={yachts} />

      <div className="grid grid-cols-3 gap-2 mb-6">
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

      {activeTab === 'ankor' && <AnkorSearchTab existingIds={existingIds} onAdd={onAddFromAnkor} token={token} />}
      {activeTab === 'bdd' && <BddCatalogueTab yachts={yachts} onToggleVisible={onToggleVisible} onToggleFeatured={onToggleFeatured} onDelete={onDelete} onEdit={(y) => setEditingYacht(y)} />}
      {activeTab === 'visible' && <VisibleEditTab yachts={yachts} onEdit={(y) => setEditingYacht(y)} />}

      {editingYacht && <EditModal yacht={editingYacht} onClose={() => setEditingYacht(null)} onSave={onSaveEdit} />}
    </div>
  );
}
