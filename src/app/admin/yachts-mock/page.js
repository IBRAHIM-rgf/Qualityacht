'use client';

// MAQUETTE admin v2 (mock) — pas de connexion BDD.
// Démontre l'UX : dashboard + 3 onglets (Ankor / BDD / Visibles) + édition.

import { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Search, Plus, Check, X, Eye, EyeOff, Star, Edit3, Trash2,
  Database, Globe, Filter, ChevronDown, Loader2, AlertCircle,
  Anchor, Users, Ruler, BedDouble,
} from 'lucide-react';
import { mockBddYachts, mockAnkorResults, REGION_LABELS, SUB_REGION_LABELS, SUB_REGIONS_BY_REGION } from './mock-data';

// ════════════════════════════════════════════════════════════
// DASHBOARD — toujours visible en haut
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
      if (y.sub_region) {
        bySubRegion[y.sub_region] = (bySubRegion[y.sub_region] || 0) + 1;
      }
    }
    return { total, visible, hidden, featured, byRegion, bySubRegion };
  }, [yachts]);

  return (
    <div className="bg-[#2a2a30] rounded-2xl border border-[#C0C0C0]/20 p-5 md:p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Database className="w-5 h-5 text-[#B03E00]" />
        <h2 className="trajan-regular text-base md:text-lg uppercase tracking-[0.15em] text-[#C0C0C0]">État de la base</h2>
      </div>

      {/* Chiffres clés */}
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

      {/* Par région */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60 mb-2">Répartition par région</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(stats.byRegion).map(([r, count]) => (
              <span key={r} className="px-3 py-1.5 rounded-full border border-[#C0C0C0]/30 bg-[#3a3b3f] text-xs">
                <span className="text-[#acb0cd]">{REGION_LABELS[r] || r}</span>
                <span className="text-[#B03E00] font-bold ml-2">{count}</span>
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60 mb-2">Répartition par sous-région</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(stats.bySubRegion).length > 0 ? (
              Object.entries(stats.bySubRegion).map(([s, count]) => (
                <span key={s} className="px-3 py-1.5 rounded-full border border-[#C0C0C0]/30 bg-[#3a3b3f] text-xs">
                  <span className="text-[#acb0cd]">{SUB_REGION_LABELS[s] || s}</span>
                  <span className="text-[#B03E00] font-bold ml-2">{count}</span>
                </span>
              ))
            ) : (
              <span className="text-[#acb0cd]/50 text-xs italic">Aucune sous-région assignée</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ONGLET 1 — Recherche Ankor
// ════════════════════════════════════════════════════════════
function AnkorSearchTab({ existingIds, onAdd }) {
  const [search, setSearch] = useState('');
  const filtered = mockAnkorResults.filter(y => !search || y.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="bg-[#2a2a30] border border-[#C0C0C0]/20 rounded-2xl p-5 mb-4">
        <div className="flex items-start gap-3">
          <Globe className="w-6 h-6 text-[#B03E00] shrink-0" />
          <div>
            <h3 className="trajan-regular text-base uppercase tracking-wider text-[#C0C0C0] mb-1">Recherche sur Ankor</h3>
            <p className="text-sm text-[#acb0cd]/70">
              Catalogue externe Ankor. Clique "Ajouter à ma BDD" pour importer un yacht.
              Les yachts déjà en BDD sont marqués.
            </p>
          </div>
        </div>
        <div className="mt-4">
          <input
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un yacht sur Ankor…"
            className="w-full px-4 py-2.5 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-xl text-[#acb0cd] text-sm focus:border-[#B03E00] outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map(yacht => {
          const inBdd = yacht.alreadyInBdd || existingIds.has(yacht.id);
          return (
            <div key={yacht.id} className="flex items-center gap-3 p-3 rounded-xl border border-[#C0C0C0]/20 bg-[#2a2a30]">
              <Image src={yacht.image} alt={yacht.name} width={80} height={56} className="rounded-lg object-cover h-14" />
              <div className="flex-1 min-w-0">
                <h4 className="text-[#C0C0C0] font-medium">{yacht.name}</h4>
                <div className="flex flex-wrap gap-3 text-xs text-[#acb0cd]/70 mt-1">
                  <span>{yacht.length}</span>
                  <span>{yacht.guests} guests</span>
                  <span>{REGION_LABELS[yacht.region]}</span>
                  <span className="text-[#B03E00] font-bold">{yacht.pricePerWeek}/sem</span>
                </div>
              </div>
              {inBdd ? (
                <span className="px-3 py-1.5 rounded-full bg-[#acb0cd]/10 border border-[#acb0cd]/30 text-[#acb0cd]/70 text-xs flex items-center gap-1.5">
                  <Check className="w-3 h-3" /> Déjà en BDD
                </span>
              ) : (
                <button
                  onClick={() => onAdd(yacht)}
                  className="px-4 py-2 rounded-xl border-2 border-[#B03E00] text-[#B03E00] hover:bg-[#B03E00]/10 text-xs uppercase tracking-wider font-medium flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Ajouter à ma BDD
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
// ONGLET 2 — Mes bateaux BDD (tous)
// ════════════════════════════════════════════════════════════
function BddCatalogueTab({ yachts, onToggleVisible, onToggleFeatured, onDelete, onEdit }) {
  const [filterRegion, setFilterRegion] = useState('');
  const [filterVisibility, setFilterVisibility] = useState('all'); // all | visible | hidden
  const [search, setSearch] = useState('');

  const filtered = yachts.filter(y => {
    if (filterRegion && y.region !== filterRegion) return false;
    if (filterVisibility === 'visible' && !y.is_visible) return false;
    if (filterVisibility === 'hidden' && y.is_visible) return false;
    if (search && !y.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const allRegions = [...new Set(yachts.map(y => y.region).filter(Boolean))];

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
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom…"
            className="px-4 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-xl text-[#acb0cd] text-sm focus:border-[#B03E00] outline-none"
          />
          <select
            value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)}
            className="px-4 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-xl text-[#acb0cd] text-sm"
          >
            <option value="">Toutes régions</option>
            {allRegions.map(r => <option key={r} value={r}>{REGION_LABELS[r] || r}</option>)}
          </select>
          <select
            value={filterVisibility} onChange={(e) => setFilterVisibility(e.target.value)}
            className="px-4 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-xl text-[#acb0cd] text-sm"
          >
            <option value="all">Visibles + En stock</option>
            <option value="visible">Publiés uniquement</option>
            <option value="hidden">En stock uniquement</option>
          </select>
        </div>
      </div>

      <div className="text-xs text-[#acb0cd]/60 mb-2 px-1">{filtered.length} bateau{filtered.length > 1 ? 'x' : ''} sur {yachts.length}</div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-[#acb0cd]/50">Aucun bateau ne correspond.</div>
        ) : filtered.map(y => (
          <div key={y.id} className={`flex items-center gap-3 p-3 rounded-xl border ${y.is_visible ? 'border-[#B03E00]/40 bg-[#B03E00]/5' : 'border-[#C0C0C0]/20 bg-[#2a2a30]'}`}>
            <Image src={y.image} alt={y.name} width={80} height={56} className="rounded-lg object-cover h-14" />
            <div className="flex-1 min-w-0">
              <h4 className="text-[#C0C0C0] font-medium flex items-center gap-2">
                {y.name}
                {y.is_featured && <Star className="w-3 h-3 text-[#B03E00]" fill="currentColor" />}
              </h4>
              <div className="flex flex-wrap gap-3 text-xs text-[#acb0cd]/70 mt-1">
                <span>{y.length}</span>
                <span>{y.guests} guests</span>
                <span>{y.cabins} cabines</span>
                <span className="text-[#B03E00]">{REGION_LABELS[y.region]}</span>
                {y.sub_region && <span className="text-[#B03E00]/70">› {SUB_REGION_LABELS[y.sub_region]}</span>}
              </div>
            </div>

            {/* Toggle Publier — action principale */}
            <button
              onClick={() => onToggleVisible(y.id)}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-medium flex items-center gap-2 ${
                y.is_visible
                  ? 'bg-[#B03E00]/20 border border-[#B03E00] text-[#B03E00]'
                  : 'bg-[#3a3b3f] border border-[#C0C0C0]/30 text-[#acb0cd]/70 hover:border-[#B03E00] hover:text-[#B03E00]'
              }`}
            >
              {y.is_visible ? <><Eye className="w-4 h-4" /> Publié</> : <><EyeOff className="w-4 h-4" /> En stock</>}
            </button>

            {/* Featured (uniquement si publié) */}
            <button
              onClick={() => onToggleFeatured(y.id)}
              disabled={!y.is_visible}
              className={`p-2 rounded-lg ${y.is_visible ? (y.is_featured ? 'text-[#B03E00]' : 'text-[#acb0cd]/50 hover:text-[#B03E00]') : 'text-[#acb0cd]/20 cursor-not-allowed'}`}
              title={y.is_visible ? 'Mettre en avant' : 'Publie d\'abord pour mettre en avant'}
            >
              <Star className="w-4 h-4" fill={y.is_featured ? 'currentColor' : 'none'} />
            </button>

            {/* Édition (uniquement si publié) */}
            <button
              onClick={() => y.is_visible && onEdit(y)}
              disabled={!y.is_visible}
              className={`p-2 rounded-lg ${y.is_visible ? 'text-[#acb0cd] hover:text-[#B03E00]' : 'text-[#acb0cd]/20 cursor-not-allowed'}`}
              title={y.is_visible ? 'Éditer (titre, prix, etc.)' : 'Publie d\'abord pour pouvoir éditer'}
            >
              <Edit3 className="w-4 h-4" />
            </button>

            {/* Supprimer */}
            <button
              onClick={() => onDelete(y.id)}
              className="p-2 rounded-lg text-[#acb0cd]/50 hover:text-red-400"
              title="Supprimer définitivement de la BDD"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ONGLET 3 — Mes bateaux visibles (édition complète)
// ════════════════════════════════════════════════════════════
function VisibleEditTab({ yachts, onEdit }) {
  const visible = yachts.filter(y => y.is_visible);

  return (
    <div>
      <div className="bg-[#2a2a30] border border-[#C0C0C0]/20 rounded-2xl p-5 mb-4">
        <div className="flex items-start gap-3">
          <Eye className="w-6 h-6 text-[#B03E00] shrink-0" />
          <div>
            <h3 className="trajan-regular text-base uppercase tracking-wider text-[#C0C0C0] mb-1">Mes bateaux publiés</h3>
            <p className="text-sm text-[#acb0cd]/70">
              Édition complète : titre custom, description, prix affiché, photos, options.
              Pour cacher un yacht, va dans <strong>Mes bateaux en BDD</strong>.
            </p>
          </div>
        </div>
      </div>

      <div className="text-xs text-[#acb0cd]/60 mb-2 px-1">{visible.length} bateau{visible.length > 1 ? 'x' : ''} publié{visible.length > 1 ? 's' : ''}</div>

      <div className="grid md:grid-cols-2 gap-3">
        {visible.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-[#acb0cd]/50">
            Aucun bateau publié. Va dans <strong>Mes bateaux en BDD</strong> pour en publier.
          </div>
        ) : visible.map(y => (
          <button
            key={y.id} onClick={() => onEdit(y)}
            className="flex items-center gap-3 p-4 rounded-xl border border-[#B03E00]/30 bg-[#B03E00]/5 text-left hover:bg-[#B03E00]/10 hover:border-[#B03E00] transition-colors"
          >
            <Image src={y.image} alt={y.name} width={100} height={70} className="rounded-lg object-cover h-16" />
            <div className="flex-1 min-w-0">
              <h4 className="text-[#C0C0C0] font-medium flex items-center gap-2">
                {y.name}
                {y.is_featured && <Star className="w-3 h-3 text-[#B03E00]" fill="currentColor" />}
              </h4>
              {y.custom_title && (
                <p className="text-xs text-[#acb0cd] italic">« {y.custom_title} »</p>
              )}
              <div className="flex flex-wrap gap-2 text-xs text-[#acb0cd]/70 mt-1">
                <span>{y.length}</span>
                <span>{y.guests} guests</span>
                <span>{REGION_LABELS[y.region]}</span>
              </div>
              <p className="text-[#B03E00] font-bold text-sm mt-1">{y.custom_price}</p>
            </div>
            <Edit3 className="w-5 h-5 text-[#B03E00]" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// MODAL Édition (simple, démonstratif)
// ════════════════════════════════════════════════════════════
function EditModal({ yacht, onClose, onSave }) {
  const [form, setForm] = useState({
    custom_title: yacht.custom_title || '',
    custom_price: yacht.custom_price || '',
    region: yacht.region,
    sub_region: yacht.sub_region || '',
  });
  const availableSubRegions = SUB_REGIONS_BY_REGION[form.region] || [];

  const save = () => {
    onSave(yacht.id, form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#2a2a30] rounded-2xl border border-[#C0C0C0]/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-[#C0C0C0]/20 flex items-center justify-between">
          <h3 className="trajan-regular text-lg uppercase tracking-wider text-[#C0C0C0]">Éditer {yacht.name}</h3>
          <button onClick={onClose} className="text-[#acb0cd]/60 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Titre personnalisé</label>
            <input
              type="text" value={form.custom_title}
              onChange={e => setForm({ ...form, custom_title: e.target.value })}
              placeholder={yacht.name}
              className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] focus:border-[#B03E00] outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Prix affiché</label>
            <input
              type="text" value={form.custom_price}
              onChange={e => setForm({ ...form, custom_price: e.target.value })}
              className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd] focus:border-[#B03E00] outline-none"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Région</label>
              <select
                value={form.region}
                onChange={e => setForm({ ...form, region: e.target.value, sub_region: '' })}
                className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd]"
              >
                {Object.entries(REGION_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            {availableSubRegions.length > 0 && (
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#acb0cd]/60 mb-1">Sous-région</label>
                <select
                  value={form.sub_region}
                  onChange={e => setForm({ ...form, sub_region: e.target.value })}
                  className="w-full px-3 py-2 bg-[#3a3b3f] border border-[#C0C0C0]/30 rounded-lg text-[#acb0cd]"
                >
                  <option value="">— Aucune —</option>
                  {availableSubRegions.map(s => <option key={s} value={s}>{SUB_REGION_LABELS[s]}</option>)}
                </select>
              </div>
            )}
          </div>
        </div>
        <div className="p-5 border-t border-[#C0C0C0]/20 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-[#C0C0C0]/30 text-[#acb0cd] hover:border-[#B03E00] hover:text-[#B03E00] text-sm">Annuler</button>
          <button onClick={save} className="px-6 py-2 rounded-xl border-2 border-[#B03E00] bg-[#B03E00]/20 text-[#B03E00] hover:bg-[#B03E00]/30 text-sm uppercase tracking-wider font-medium">Sauvegarder</button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// PAGE PRINCIPALE
// ════════════════════════════════════════════════════════════
export default function AdminYachtsMockPage() {
  const [yachts, setYachts] = useState(mockBddYachts);
  const [activeTab, setActiveTab] = useState('bdd');
  const [editingYacht, setEditingYacht] = useState(null);

  const onAddFromAnkor = (yacht) => {
    const newYacht = {
      id: yacht.id,
      name: yacht.name,
      image: yacht.image,
      length: yacht.length,
      guests: yacht.guests,
      cabins: yacht.cabins || 0,
      region: yacht.region,
      sub_region: null,
      is_visible: false,  // en stock par défaut
      is_featured: false,
      custom_title: '',
      custom_price: yacht.pricePerWeek + '/sem',
    };
    setYachts(prev => [...prev, newYacht]);
    alert(`${yacht.name} ajouté à la BDD (en stock). Va dans "Mes bateaux en BDD" pour le publier.`);
  };

  const onToggleVisible = (id) => setYachts(prev => prev.map(y => y.id === id ? { ...y, is_visible: !y.is_visible, is_featured: !y.is_visible ? y.is_featured : false } : y));
  const onToggleFeatured = (id) => setYachts(prev => prev.map(y => y.id === id ? { ...y, is_featured: !y.is_featured } : y));
  const onDelete = (id) => {
    if (!confirm('Supprimer ce yacht de la BDD ? (cette action est définitive)')) return;
    setYachts(prev => prev.filter(y => y.id !== id));
  };
  const onSaveEdit = (id, updates) => setYachts(prev => prev.map(y => y.id === id ? { ...y, ...updates } : y));

  const existingIds = new Set(yachts.map(y => y.id));

  const TABS = [
    { id: 'ankor', label: 'Recherche Ankor', icon: Globe, desc: 'Catalogue externe à importer' },
    { id: 'bdd', label: 'Mes bateaux en BDD', icon: Database, desc: 'Toute la base · publier/cacher' },
    { id: 'visible', label: 'Mes bateaux publiés', icon: Eye, desc: 'Édition complète des publiés' },
  ];

  return (
    <div className="min-h-screen bg-[#26272a] pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h1 className="trajan-regular text-2xl md:text-3xl uppercase tracking-[0.12em] text-[#C0C0C0]">Admin yachts — maquette</h1>
          <p className="text-xs text-amber-300 mt-2 italic">⚠️ Maquette non connectée à la BDD. Données mock pour valider l'UX. Aucune action n'est sauvegardée.</p>
        </div>

        {/* Dashboard */}
        <Dashboard yachts={yachts} />

        {/* Onglets */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  active
                    ? 'border-[#B03E00] bg-[#B03E00]/10'
                    : 'border-[#C0C0C0]/20 bg-[#2a2a30] hover:border-[#B03E00]/40'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 ${active ? 'text-[#B03E00]' : 'text-[#acb0cd]/60'}`} />
                  <h3 className={`text-xs md:text-sm uppercase tracking-wider font-medium ${active ? 'text-[#B03E00]' : 'text-[#acb0cd]'}`}>{tab.label}</h3>
                </div>
                <p className={`text-[10px] md:text-xs ${active ? 'text-[#acb0cd]' : 'text-[#acb0cd]/50'}`}>{tab.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Contenu de l'onglet */}
        {activeTab === 'ankor' && <AnkorSearchTab existingIds={existingIds} onAdd={onAddFromAnkor} />}
        {activeTab === 'bdd' && <BddCatalogueTab yachts={yachts} onToggleVisible={onToggleVisible} onToggleFeatured={onToggleFeatured} onDelete={onDelete} onEdit={(y) => setEditingYacht(y)} />}
        {activeTab === 'visible' && <VisibleEditTab yachts={yachts} onEdit={(y) => setEditingYacht(y)} />}

        {editingYacht && <EditModal yacht={editingYacht} onClose={() => setEditingYacht(null)} onSave={onSaveEdit} />}
      </div>
    </div>
  );
}
