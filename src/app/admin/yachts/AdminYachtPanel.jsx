'use client';

import { useState, useCallback } from 'react';
import {
  Search,
  RefreshCw,
  Eye,
  EyeOff,
  Star,
  GripVertical,
  Ruler,
  Users,
  Calendar,
  Filter,
  ChevronDown,
  Check,
  X,
  Loader2
} from 'lucide-react';
import { getAnkorImageUrl } from '@/lib/utils';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Catégories prédéfinies
const CATEGORIES = [
  { value: '', label: 'Sans catégorie' },
  { value: 'luxe', label: 'Luxe' },
  { value: 'sport', label: 'Sport' },
  { value: 'famille', label: 'Famille' },
  { value: 'aventure', label: 'Aventure' },
  { value: 'classique', label: 'Classique' },
  { value: 'expedition', label: 'Expédition' },
];

// Composant carte yacht sortable
function SortableYachtCard({ yacht, token, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: yacht.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isVisible = yacht.selection?.is_visible !== false;
  const isFeatured = yacht.selection?.is_featured === true;

  // Toggle visibilité
  const toggleVisibility = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/yachts?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          yacht_id: yacht.id,
          yacht_name: yacht.name,
          is_visible: !isVisible,
          is_featured: isFeatured,
          display_order: yacht.selection?.display_order ?? 0,
          category: yacht.selection?.category ?? null,
        })
      });
      if (res.ok) {
        onUpdate(yacht.id, { is_visible: !isVisible });
      }
    } catch (err) {
      console.error('Erreur toggle visibility:', err);
    }
    setLoading(false);
  };

  // Toggle featured
  const toggleFeatured = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/yachts?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          yacht_id: yacht.id,
          yacht_name: yacht.name,
          is_visible: isVisible,
          is_featured: !isFeatured,
          display_order: yacht.selection?.display_order ?? 0,
          category: yacht.selection?.category ?? null,
        })
      });
      if (res.ok) {
        onUpdate(yacht.id, { is_featured: !isFeatured });
      }
    } catch (err) {
      console.error('Erreur toggle featured:', err);
    }
    setLoading(false);
  };

  // Changer catégorie
  const changeCategory = async (category) => {
    setLoading(true);
    setShowCategory(false);
    try {
      const res = await fetch(`/api/admin/yachts?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          yacht_id: yacht.id,
          yacht_name: yacht.name,
          is_visible: isVisible,
          is_featured: isFeatured,
          display_order: yacht.selection?.display_order ?? 0,
          category: category || null,
        })
      });
      if (res.ok) {
        onUpdate(yacht.id, { category });
      }
    } catch (err) {
      console.error('Erreur change category:', err);
    }
    setLoading(false);
  };

  const imageUrl = yacht.images?.[0]
    ? getAnkorImageUrl(yacht.images[0], '320w')
    : '/placeholder-yacht.jpg';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
        !isVisible
          ? 'bg-[#252528] border-gray-800 opacity-60'
          : isFeatured
          ? 'bg-[#2a2a30] border-yellow-700/50'
          : 'bg-[#2a2a30] border-gray-700'
      }`}
    >
      {/* Handle drag */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 text-gray-500 hover:text-gray-300"
      >
        <GripVertical className="w-5 h-5" />
      </button>

      {/* Image */}
      <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={imageUrl}
          alt={yacht.name || 'Yacht'}
          className="w-full h-full object-cover"
        />
        {isFeatured && (
          <div className="absolute top-1 left-1 bg-yellow-500 rounded px-1">
            <Star className="w-3 h-3 text-black" fill="black" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-[#C0C0C0] font-medium truncate">{yacht.name || 'Sans nom'}</h3>
        <div className="flex items-center gap-3 text-gray-400 text-sm mt-1">
          {yacht.length && (
            <span className="flex items-center gap-1">
              <Ruler className="w-3 h-3" />
              {yacht.length}
            </span>
          )}
          {yacht.guests && (
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {yacht.guests}
            </span>
          )}
          {yacht.year && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {yacht.year}
            </span>
          )}
        </div>
        {yacht.selection?.category && (
          <span className="inline-block mt-1 px-2 py-0.5 bg-blue-900/30 text-blue-300 text-xs rounded">
            {CATEGORIES.find(c => c.value === yacht.selection.category)?.label || yacht.selection.category}
          </span>
        )}
      </div>

      {/* Catégorie dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowCategory(!showCategory)}
          className="px-3 py-1.5 rounded-lg bg-[#303135] text-gray-400 text-sm hover:bg-[#3a3a40] transition flex items-center gap-1"
        >
          <Filter className="w-4 h-4" />
          <ChevronDown className="w-3 h-3" />
        </button>
        {showCategory && (
          <div className="absolute right-0 top-full mt-1 z-10 bg-[#252528] border border-gray-700 rounded-lg shadow-xl py-1 min-w-[150px]">
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => changeCategory(cat.value)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-[#303135] flex items-center justify-between ${
                  yacht.selection?.category === cat.value ? 'text-blue-400' : 'text-gray-300'
                }`}
              >
                {cat.label}
                {yacht.selection?.category === cat.value && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Toggle Featured */}
      <button
        onClick={toggleFeatured}
        disabled={loading}
        className={`p-2 rounded-lg transition ${
          isFeatured
            ? 'bg-yellow-900/50 text-yellow-400 hover:bg-yellow-900/70'
            : 'bg-[#303135] text-gray-500 hover:text-yellow-400 hover:bg-[#3a3a40]'
        }`}
        title={isFeatured ? 'Retirer de la mise en avant' : 'Mettre en avant'}
      >
        <Star className="w-5 h-5" fill={isFeatured ? 'currentColor' : 'none'} />
      </button>

      {/* Toggle Visible */}
      <button
        onClick={toggleVisibility}
        disabled={loading}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
          isVisible
            ? 'bg-green-900/50 text-green-400 hover:bg-green-900/70'
            : 'bg-red-900/50 text-red-400 hover:bg-red-900/70'
        }`}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : isVisible ? (
          <>
            <Eye className="w-4 h-4" />
            Visible
          </>
        ) : (
          <>
            <EyeOff className="w-4 h-4" />
            Masqué
          </>
        )}
      </button>
    </div>
  );
}

// Composant principal
export default function AdminYachtPanel({ initialYachts, initialStats, token }) {
  const [yachts, setYachts] = useState(initialYachts);
  const [stats, setStats] = useState(initialStats);
  const [search, setSearch] = useState('');
  const [filterVisibility, setFilterVisibility] = useState('all'); // all, visible, hidden
  const [filterFeatured, setFilterFeatured] = useState('all'); // all, featured, normal
  const [syncing, setSyncing] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);

  // Sensors pour drag & drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Filtrer les yachts
  const filteredYachts = yachts.filter(yacht => {
    // Recherche
    if (search && !yacht.name?.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    // Filtre visibilité
    if (filterVisibility === 'visible' && yacht.selection?.is_visible === false) {
      return false;
    }
    if (filterVisibility === 'hidden' && yacht.selection?.is_visible !== false) {
      return false;
    }
    // Filtre featured
    if (filterFeatured === 'featured' && !yacht.selection?.is_featured) {
      return false;
    }
    if (filterFeatured === 'normal' && yacht.selection?.is_featured) {
      return false;
    }
    return true;
  });

  // Update local state après modification
  const handleUpdate = useCallback((yachtId, updates) => {
    setYachts(prev => prev.map(y =>
      y.id === yachtId
        ? { ...y, selection: { ...y.selection, ...updates } }
        : y
    ));

    // Mettre à jour les stats
    setStats(prev => {
      const newStats = { ...prev };
      if ('is_visible' in updates) {
        newStats.visible = updates.is_visible ? prev.visible + 1 : prev.visible - 1;
      }
      if ('is_featured' in updates) {
        newStats.featured = updates.is_featured ? prev.featured + 1 : prev.featured - 1;
      }
      return newStats;
    });
  }, []);

  // Gestion du drag & drop
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = filteredYachts.findIndex(y => y.id === active.id);
      const newIndex = filteredYachts.findIndex(y => y.id === over.id);

      const newOrder = arrayMove(filteredYachts, oldIndex, newIndex);

      // Mettre à jour l'ordre local
      setYachts(prev => {
        const newYachts = [...prev];
        newOrder.forEach((yacht, index) => {
          const yachtIndex = newYachts.findIndex(y => y.id === yacht.id);
          if (yachtIndex !== -1) {
            newYachts[yachtIndex] = {
              ...newYachts[yachtIndex],
              selection: {
                ...newYachts[yachtIndex].selection,
                display_order: index
              }
            };
          }
        });
        return newYachts;
      });

      // Sauvegarder l'ordre côté serveur
      setSavingOrder(true);
      try {
        const updates = newOrder.map((yacht, index) => ({
          yacht_id: yacht.id,
          display_order: index
        }));

        await fetch(`/api/admin/yachts?token=${token}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'order', updates })
        });
      } catch (err) {
        console.error('Erreur sauvegarde ordre:', err);
      }
      setSavingOrder(false);
    }
  };

  // Synchronisation avec Ankor
  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch(`/api/admin/yachts/sync?token=${token}`, {
        method: 'POST'
      });
      const data = await res.json();

      if (data.success && data.added > 0) {
        // Recharger la page pour voir les nouveaux yachts
        window.location.reload();
      }
    } catch (err) {
      console.error('Erreur sync:', err);
    }
    setSyncing(false);
  };

  return (
    <div className="space-y-6">
      {/* Barre d'outils */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-[#2a2a30] rounded-xl p-4 border border-gray-700">
        {/* Recherche */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher un yacht..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0] placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Filtres */}
        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={filterVisibility}
            onChange={(e) => setFilterVisibility(e.target.value)}
            className="px-3 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0] text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="all">Tous ({yachts.length})</option>
            <option value="visible">Visibles ({stats.visible})</option>
            <option value="hidden">Masqués ({yachts.length - stats.visible})</option>
          </select>

          <select
            value={filterFeatured}
            onChange={(e) => setFilterFeatured(e.target.value)}
            className="px-3 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0] text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="all">Tous types</option>
            <option value="featured">Featured ({stats.featured})</option>
            <option value="normal">Normal</option>
          </select>

          {/* Bouton sync */}
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Sync...' : 'Synchroniser'}
          </button>
        </div>
      </div>

      {/* Indicateur sauvegarde ordre */}
      {savingOrder && (
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          Sauvegarde de l'ordre...
        </div>
      )}

      {/* Stats rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#2a2a30] rounded-xl p-4 border border-gray-700">
          <div className="text-2xl font-bold text-[#C0C0C0]">{yachts.length}</div>
          <div className="text-gray-400 text-sm">Total yachts</div>
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
          <div className="text-2xl font-bold text-red-400">{yachts.length - stats.visible}</div>
          <div className="text-gray-400 text-sm">Masqués</div>
        </div>
      </div>

      {/* Liste des yachts avec drag & drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredYachts.map(y => y.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {filteredYachts.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p>Aucun yacht trouvé</p>
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="mt-2 text-blue-400 hover:underline"
                  >
                    Effacer la recherche
                  </button>
                )}
              </div>
            ) : (
              filteredYachts.map((yacht) => (
                <SortableYachtCard
                  key={yacht.id}
                  yacht={yacht}
                  token={token}
                  onUpdate={handleUpdate}
                />
              ))
            )}
          </div>
        </SortableContext>
      </DndContext>

      {/* Résumé */}
      <div className="text-center text-gray-500 text-sm py-4">
        Affichage de {filteredYachts.length} yacht{filteredYachts.length > 1 ? 's' : ''} sur {yachts.length}
      </div>
    </div>
  );
}
