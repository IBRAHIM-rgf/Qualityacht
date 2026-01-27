'use client';

import { useState, useCallback } from 'react';
import {
  Search, Plus, Minus, Eye, EyeOff, Star, GripVertical, Ruler, Users,
  Calendar, Filter, ChevronDown, Check, X, Loader2, Edit3, Trash2, RefreshCw
} from 'lucide-react';
import { getAnkorImageUrl } from '@/lib/utils';
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core';
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Constantes
const YACHT_TYPES = [
  { value: '', label: 'Tous les types' },
  { value: 'motor', label: 'Moteur' },
  { value: 'sailing', label: 'Voilier' },
  { value: 'catamaran', label: 'Catamaran' },
  { value: 'gulet', label: 'Gulet' },
];

const DESTINATIONS = [
  { value: '', label: 'Toutes destinations' },
  { value: 'caribbean', label: 'Caraïbes' },
  { value: 'west-mediterranean', label: 'Méditerranée Ouest' },
  { value: 'east-mediterranean', label: 'Méditerranée Est' },
  { value: 'indian-ocean', label: 'Océan Indien' },
  { value: 'south-pacific', label: 'Pacifique Sud' },
];

const CATEGORIES = [
  { value: '', label: 'Sans catégorie' },
  { value: 'luxe', label: 'Luxe' },
  { value: 'sport', label: 'Sport' },
  { value: 'famille', label: 'Famille' },
  { value: 'aventure', label: 'Aventure' },
  { value: 'classique', label: 'Classique' },
];

// ============================================
// Composant Modal d'édition
// ============================================
function EditModal({ yacht, onClose, onSave, token }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    custom_title: yacht.custom_title || '',
    custom_description: yacht.custom_description || '',
    custom_price: yacht.custom_price || '',
    internal_notes: yacht.internal_notes || '',
    category: yacht.category || '',
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/yachts?token=${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'enrich',
          yacht_id: yacht.yacht_id,
          ...form,
        })
      });
      if (res.ok) {
        onSave(yacht.yacht_id, form);
        onClose();
      }
    } catch (err) {
      console.error('Erreur save:', err);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[#2a2a30] rounded-2xl p-6 w-full max-w-lg border border-gray-700 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#C0C0C0]">Modifier {yacht.yacht_name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Titre personnalisé</label>
            <input
              type="text"
              value={form.custom_title}
              onChange={(e) => setForm({ ...form, custom_title: e.target.value })}
              className="w-full px-4 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0]"
              placeholder="Titre affiché sur le site"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Description personnalisée</label>
            <textarea
              value={form.custom_description}
              onChange={(e) => setForm({ ...form, custom_description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0] resize-none"
              placeholder="Description en français..."
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Prix affiché</label>
            <input
              type="text"
              value={form.custom_price}
              onChange={(e) => setForm({ ...form, custom_price: e.target.value })}
              className="w-full px-4 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0]"
              placeholder="Ex: 50 000 €/semaine"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Catégorie</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0]"
            >
              {CATEGORIES.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Notes internes (non visibles)</label>
            <textarea
              value={form.internal_notes}
              onChange={(e) => setForm({ ...form, internal_notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0] resize-none"
              placeholder="Notes pour l'équipe..."
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Composant Carte Yacht Sélectionné (Draggable)
// ============================================
function SelectedYachtCard({ yacht, token, onUpdate, onRemove, onEdit }) {
  const [loading, setLoading] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: yacht.yacht_id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isVisible = yacht.is_visible !== false;
  const isFeatured = yacht.is_featured === true;

  const toggleVisibility = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/yachts?token=${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'visibility', yacht_id: yacht.yacht_id, is_visible: !isVisible })
      });
      if (res.ok) onUpdate(yacht.yacht_id, { is_visible: !isVisible });
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const toggleFeatured = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/yachts?token=${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'featured', yacht_id: yacht.yacht_id, is_featured: !isFeatured })
      });
      if (res.ok) onUpdate(yacht.yacht_id, { is_featured: !isFeatured });
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const cached = yacht.cached_data || {};
  const imageUrl = cached.images?.[0] ? getAnkorImageUrl(cached.images[0], '320w') : '/placeholder.jpg';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
        !isVisible ? 'bg-[#252528] border-gray-800 opacity-60' :
        isFeatured ? 'bg-[#2a2a30] border-yellow-700/50' : 'bg-[#2a2a30] border-gray-700'
      }`}
    >
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 text-gray-500">
        <GripVertical className="w-5 h-5" />
      </button>

      <img src={imageUrl} alt={yacht.yacht_name} className="w-20 h-14 object-cover rounded-lg" />

      <div className="flex-1 min-w-0">
        <h3 className="text-[#C0C0C0] font-medium truncate">{yacht.custom_title || yacht.yacht_name}</h3>
        <div className="flex gap-2 text-xs text-gray-400 mt-1">
          {cached.length && <span>{cached.length}</span>}
          {cached.guests && <span>• {cached.guests} guests</span>}
          {yacht.category && <span className="text-blue-400">• {yacht.category}</span>}
        </div>
      </div>

      <button onClick={() => onEdit(yacht)} className="p-2 text-gray-400 hover:text-blue-400">
        <Edit3 className="w-4 h-4" />
      </button>

      <button onClick={toggleFeatured} disabled={loading}
        className={`p-2 rounded-lg ${isFeatured ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-400'}`}>
        <Star className="w-4 h-4" fill={isFeatured ? 'currentColor' : 'none'} />
      </button>

      <button onClick={toggleVisibility} disabled={loading}
        className={`p-2 rounded-lg ${isVisible ? 'text-green-400' : 'text-red-400'}`}>
        {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
      </button>

      <button onClick={() => onRemove(yacht.yacht_id)} className="p-2 text-gray-400 hover:text-red-400">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

// ============================================
// Composant Carte Yacht Ankor (pour recherche)
// ============================================
function AnkorYachtCard({ yacht, isSelected, onAdd }) {
  const [loading, setLoading] = useState(false);
  const imageUrl = yacht.images?.[0] ? getAnkorImageUrl(yacht.images[0], '320w') : '/placeholder.jpg';

  const handleAdd = async () => {
    setLoading(true);
    await onAdd(yacht);
    setLoading(false);
  };

  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border ${
      isSelected ? 'bg-green-900/20 border-green-700' : 'bg-[#2a2a30] border-gray-700'
    }`}>
      <img src={imageUrl} alt={yacht.name} className="w-20 h-14 object-cover rounded-lg" />

      <div className="flex-1 min-w-0">
        <h3 className="text-[#C0C0C0] font-medium truncate">{yacht.name}</h3>
        <div className="flex gap-2 text-xs text-gray-400 mt-1">
          {yacht.length && <span>{yacht.length}</span>}
          {yacht.guests && <span>• {yacht.guests} guests</span>}
          {yacht.pricePerHour && <span>• {yacht.pricePerHour}</span>}
        </div>
      </div>

      {isSelected ? (
        <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-lg text-sm flex items-center gap-1">
          <Check className="w-4 h-4" /> Sélectionné
        </span>
      ) : (
        <button
          onClick={handleAdd}
          disabled={loading}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center gap-1 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Ajouter
        </button>
      )}
    </div>
  );
}

// ============================================
// Composant Principal
// ============================================
export default function AdminYachtPanel({ initialSelections, initialStats, token }) {
  // State
  const [selections, setSelections] = useState(initialSelections || []);
  const [stats, setStats] = useState(initialStats);
  const [selectedIds, setSelectedIds] = useState(new Set((initialSelections || []).map(s => s.yacht_id)));

  // Recherche Ankor
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [filters, setFilters] = useState({ type: '', destination: '', capacity: '', search: '' });

  // Modal
  const [editingYacht, setEditingYacht] = useState(null);

  // Tab active
  const [activeTab, setActiveTab] = useState('selections'); // 'selections' | 'search'

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Recherche dans Ankor
  const handleSearch = async () => {
    setSearching(true);
    try {
      const params = new URLSearchParams();
      if (filters.type) params.set('type', filters.type);
      if (filters.destination) params.set('destination', filters.destination);
      if (filters.capacity) params.set('capacity', filters.capacity);

      const res = await fetch(`/api/admin/yachts/search?token=${token}&${params.toString()}`);
      const data = await res.json();
      setSearchResults(data.yachts || []);
      setActiveTab('search');
    } catch (err) {
      console.error('Erreur recherche:', err);
    }
    setSearching(false);
  };

  // Ajouter un yacht à la sélection
  const handleAddYacht = async (yacht) => {
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
        if (data.selection) {
          setSelections(prev => [...prev, data.selection]);
          setSelectedIds(prev => new Set([...prev, yacht.id]));
          setStats(prev => ({ ...prev, total: prev.total + 1, visible: prev.visible + 1 }));
        }
      }
    } catch (err) {
      console.error('Erreur ajout:', err);
    }
  };

  // Supprimer un yacht de la sélection
  const handleRemoveYacht = async (yacht_id) => {
    if (!confirm('Supprimer ce yacht de la sélection ?')) return;

    try {
      const res = await fetch(`/api/admin/yachts?token=${token}&yacht_id=${yacht_id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setSelections(prev => prev.filter(s => s.yacht_id !== yacht_id));
        setSelectedIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(yacht_id);
          return newSet;
        });
        setStats(prev => ({ ...prev, total: prev.total - 1 }));
      }
    } catch (err) {
      console.error('Erreur suppression:', err);
    }
  };

  // Update local après modification
  const handleUpdate = useCallback((yachtId, updates) => {
    setSelections(prev => prev.map(s =>
      s.yacht_id === yachtId ? { ...s, ...updates } : s
    ));
  }, []);

  // Drag & Drop
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = selections.findIndex(s => s.yacht_id === active.id);
      const newIndex = selections.findIndex(s => s.yacht_id === over.id);
      const newOrder = arrayMove(selections, oldIndex, newIndex);

      setSelections(newOrder.map((s, i) => ({ ...s, display_order: i })));

      // Sauvegarder
      await fetch(`/api/admin/yachts?token=${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'order',
          updates: newOrder.map((s, i) => ({ yacht_id: s.yacht_id, display_order: i }))
        })
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header avec stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#2a2a30] rounded-xl p-4 border border-gray-700">
          <div className="text-2xl font-bold text-[#C0C0C0]">{stats.total}</div>
          <div className="text-gray-400 text-sm">Sélectionnés</div>
        </div>
        <div className="bg-[#2a2a30] rounded-xl p-4 border border-gray-700">
          <div className="text-2xl font-bold text-green-400">{stats.visible}</div>
          <div className="text-gray-400 text-sm">Visibles</div>
        </div>
        <div className="bg-[#2a2a30] rounded-xl p-4 border border-gray-700">
          <div className="text-2xl font-bold text-yellow-400">{stats.featured}</div>
          <div className="text-gray-400 text-sm">Featured</div>
        </div>
        <div className="bg-[#2a2a30] rounded-xl p-4 border border-gray-700">
          <div className="text-2xl font-bold text-blue-400">{searchResults.length}</div>
          <div className="text-gray-400 text-sm">Résultats recherche</div>
        </div>
      </div>

      {/* Filtres Ankor */}
      <div className="bg-[#2a2a30] rounded-xl p-4 border border-gray-700">
        <h3 className="text-[#C0C0C0] font-medium mb-4 flex items-center gap-2">
          <Filter className="w-5 h-5" /> Rechercher des yachts (API Ankor)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
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
            {DESTINATIONS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
          </select>

          <input
            type="number"
            placeholder="Capacité min"
            value={filters.capacity}
            onChange={(e) => setFilters({ ...filters, capacity: e.target.value })}
            className="px-3 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0] text-sm"
          />

          <button
            onClick={handleSearch}
            disabled={searching}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 col-span-2 md:col-span-2"
          >
            {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            {searching ? 'Recherche...' : 'Rechercher'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-700 pb-2">
        <button
          onClick={() => setActiveTab('selections')}
          className={`px-4 py-2 rounded-t-lg font-medium ${
            activeTab === 'selections' ? 'bg-[#2a2a30] text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Ma Sélection ({selections.length})
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`px-4 py-2 rounded-t-lg font-medium ${
            activeTab === 'search' ? 'bg-[#2a2a30] text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Résultats Ankor ({searchResults.length})
        </button>
      </div>

      {/* Contenu Tab */}
      {activeTab === 'selections' ? (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={selections.map(s => s.yacht_id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {selections.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <p>Aucun yacht sélectionné</p>
                  <p className="text-sm mt-2">Utilisez la recherche pour trouver et ajouter des yachts</p>
                </div>
              ) : (
                selections.map(yacht => (
                  <SelectedYachtCard
                    key={yacht.yacht_id}
                    yacht={yacht}
                    token={token}
                    onUpdate={handleUpdate}
                    onRemove={handleRemoveYacht}
                    onEdit={setEditingYacht}
                  />
                ))
              )}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {searchResults.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p>Aucun résultat</p>
              <p className="text-sm mt-2">Modifiez les filtres et relancez la recherche</p>
            </div>
          ) : (
            searchResults.map(yacht => (
              <AnkorYachtCard
                key={yacht.id}
                yacht={yacht}
                isSelected={selectedIds.has(yacht.id)}
                onAdd={handleAddYacht}
              />
            ))
          )}
        </div>
      )}

      {/* Modal édition */}
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
