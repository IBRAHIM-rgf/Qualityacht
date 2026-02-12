'use client';

import { useState, useCallback } from 'react';
import {
  Search, Plus, Eye, EyeOff, Star, GripVertical,
  Filter, ChevronDown, ChevronUp, Check, X, Loader2, Edit3, Trash2,
  Ship, Anchor, PawPrint, Users, Waves, FolderOpen
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
];

// Régions communes pour l'API Ankor ET le classement interne
const REGIONS = [
  { value: '', label: 'Toutes régions' },
  { value: 'west-mediterranean', label: 'Méditerranée Ouest' },
  { value: 'east-mediterranean', label: 'Méditerranée Est' },
  { value: 'caribbean', label: 'Caraïbes' },
  { value: 'central-america', label: 'Amérique Centrale' },
  { value: 'indian-ocean', label: 'Océan Indien' },
  { value: 'south-pacific', label: 'Pacifique Sud' },
  { value: 'arabian-gulf', label: 'Golfe Arabique' },
  { value: 'antarctica', label: 'Antarctique' },
];

// ============================================
// Modal d'édition enrichie
// ============================================
function EditModal({ yacht, onClose, onSave, token }) {
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  let cached = {};
  try {
    cached = typeof yacht.cached_data === 'string'
      ? JSON.parse(yacht.cached_data)
      : (yacht.cached_data || {});
  } catch (e) {
    cached = yacht.cached_data || {};
  }
  const images = Array.isArray(cached.images) ? cached.images : [];

  const [form, setForm] = useState({
    custom_title: yacht.custom_title || '',
    custom_description: yacht.custom_description || '',
    custom_price: yacht.custom_price || '',
    internal_notes: yacht.internal_notes || '',
    region: yacht.region || '',
    pets_allowed: yacht.pets_allowed || false,
    groups_allowed: yacht.groups_allowed || false,
    water_toys: yacht.water_toys || false,
    extra_info: yacht.extra_info || '',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-[#2a2a30] rounded-2xl w-full max-w-4xl border border-gray-700 max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-[#C0C0C0]">Modifier {yacht.yacht_name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Colonne gauche - Photos et infos Ankor */}
            <div className="space-y-4">
              {/* Galerie photos */}
              {images.length > 0 && (
                <div className="space-y-3">
                  <div className="relative aspect-video rounded-xl overflow-hidden">
                    <img
                      src={getAnkorImageUrl(images[currentImageIndex], '640w')}
                      alt={yacht.yacht_name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute bottom-3 right-3 bg-black/60 px-2 py-1 rounded-lg text-white text-sm">
                      {currentImageIndex + 1}/{images.length}
                    </div>
                  </div>
                  {images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {images.slice(0, 8).map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 ${
                            idx === currentImageIndex ? 'border-copper-500' : 'border-transparent'
                          }`}
                        >
                          <img
                            src={getAnkorImageUrl(img, '320w')}
                            alt=""
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <span className="absolute bottom-0 right-0 bg-black/60 text-white text-[10px] px-1 rounded-tl">
                            {idx + 1}/{images.length}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Infos Ankor */}
              <div className="bg-[#303135] rounded-xl p-4 space-y-3">
                <h3 className="text-sm font-semibold text-copper-400 flex items-center gap-2">
                  <Anchor className="w-4 h-4" /> Données Ankor
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Nom:</span>
                    <p className="text-[#C0C0C0]">{cached.name || yacht.yacht_name}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Type:</span>
                    <p className="text-[#C0C0C0] capitalize">{cached.type || '-'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Longueur:</span>
                    <p className="text-[#C0C0C0]">{cached.length || '-'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Capacité:</span>
                    <p className="text-[#C0C0C0]">{cached.guests || cached.capacity || '-'} guests</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Cabines:</span>
                    <p className="text-[#C0C0C0]">{cached.cabins || '-'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Crew:</span>
                    <p className="text-[#C0C0C0]">{cached.crew || '-'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Prix Ankor:</span>
                    <p className="text-[#C0C0C0]">{cached.pricePerHour || cached.price || '-'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Port base:</span>
                    <p className="text-[#C0C0C0]">{cached.location || '-'}</p>
                  </div>
                </div>
                {cached.description && (
                  <div>
                    <span className="text-gray-500 text-sm">Description:</span>
                    <p className="text-[#C0C0C0] text-sm mt-1 line-clamp-3">{cached.description}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Colonne droite - Formulaire personnalisation */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Région d'affichage</label>
                <select
                  value={form.region}
                  onChange={(e) => setForm({ ...form, region: e.target.value })}
                  className="w-full px-4 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0]"
                >
                  {REGIONS.map(r => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Titre personnalisé</label>
                <input
                  type="text"
                  value={form.custom_title}
                  onChange={(e) => setForm({ ...form, custom_title: e.target.value })}
                  className="w-full px-4 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0]"
                  placeholder={cached.name || "Titre affiché sur le site"}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Description personnalisée</label>
                <textarea
                  value={form.custom_description}
                  onChange={(e) => setForm({ ...form, custom_description: e.target.value })}
                  rows={3}
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
                  placeholder={cached.pricePerHour || "Ex: 50 000 €/semaine"}
                />
              </div>

              {/* Options checkboxes */}
              <div className="bg-[#303135] rounded-xl p-4 space-y-3">
                <h3 className="text-sm font-semibold text-copper-400">Options</h3>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.pets_allowed}
                    onChange={(e) => setForm({ ...form, pets_allowed: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-600 text-copper-500 focus:ring-copper-500"
                  />
                  <PawPrint className="w-4 h-4 text-gray-400" />
                  <span className="text-[#C0C0C0]">Animaux acceptés</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.groups_allowed}
                    onChange={(e) => setForm({ ...form, groups_allowed: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-600 text-copper-500 focus:ring-copper-500"
                  />
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-[#C0C0C0]">Adapté aux groupes</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.water_toys}
                    onChange={(e) => setForm({ ...form, water_toys: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-600 text-copper-500 focus:ring-copper-500"
                  />
                  <Waves className="w-4 h-4 text-gray-400" />
                  <span className="text-[#C0C0C0]">Water toys inclus</span>
                </label>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Informations annexes</label>
                <textarea
                  value={form.extra_info}
                  onChange={(e) => setForm({ ...form, extra_info: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0] resize-none"
                  placeholder="Autres infos à afficher..."
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Notes internes (non visibles)</label>
                <textarea
                  value={form.internal_notes}
                  onChange={(e) => setForm({ ...form, internal_notes: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0] resize-none"
                  placeholder="Notes pour l'équipe..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-copper-500 text-white rounded-xl hover:bg-copper-600 disabled:opacity-50 flex items-center justify-center gap-2"
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
// Modal création manuelle
// ============================================
function CreateManualModal({ onClose, onSave, token }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    type: 'motor',
    length: '',
    guests: '',
    cabins: '',
    crew: '',
    year: '',
    price: '',
    location: '',
    description: '',
    region: '',
    pets_allowed: false,
    groups_allowed: false,
    water_toys: false,
    extra_info: '',
  });

  const handleSave = async () => {
    if (!form.name) return alert('Le nom est requis');

    setLoading(true);
    try {
      const yachtId = `manual-${Date.now()}`;
      const cachedData = {
        id: yachtId,
        name: form.name,
        type: form.type,
        length: form.length ? `${form.length}m` : null,
        guests: form.guests ? parseInt(form.guests) : null,
        cabins: form.cabins ? parseInt(form.cabins) : null,
        crew: form.crew ? parseInt(form.crew) : null,
        year: form.year ? parseInt(form.year) : null,
        pricePerHour: form.price,
        location: form.location,
        description: form.description,
        images: [],
      };

      const res = await fetch(`/api/admin/yachts?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          yacht_id: yachtId,
          yacht_name: form.name,
          cached_data: cachedData,
          region: form.region,
          pets_allowed: form.pets_allowed,
          groups_allowed: form.groups_allowed,
          water_toys: form.water_toys,
          extra_info: form.extra_info,
        })
      });

      if (res.ok) {
        const data = await res.json();
        onSave(data.selection);
        onClose();
      }
    } catch (err) {
      console.error('Erreur création:', err);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-[#2a2a30] rounded-2xl w-full max-w-2xl border border-gray-700 max-h-[95vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-[#C0C0C0] flex items-center gap-2">
            <Ship className="w-5 h-5 text-copper-400" /> Ajouter un yacht manuellement
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Nom *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0]"
                placeholder="Nom du yacht"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-4 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0]"
              >
                <option value="motor">Moteur</option>
                <option value="sailing">Voilier</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Longueur (m)</label>
              <input
                type="number"
                value={form.length}
                onChange={(e) => setForm({ ...form, length: e.target.value })}
                className="w-full px-4 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0]"
                placeholder="45"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Capacité (guests)</label>
              <input
                type="number"
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: e.target.value })}
                className="w-full px-4 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0]"
                placeholder="12"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Cabines</label>
              <input
                type="number"
                value={form.cabins}
                onChange={(e) => setForm({ ...form, cabins: e.target.value })}
                className="w-full px-4 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0]"
                placeholder="6"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Crew</label>
              <input
                type="number"
                value={form.crew}
                onChange={(e) => setForm({ ...form, crew: e.target.value })}
                className="w-full px-4 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0]"
                placeholder="8"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Prix</label>
              <input
                type="text"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-4 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0]"
                placeholder="50 000 €/semaine"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Port de base</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-4 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0]"
                placeholder="Monaco"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Région d'affichage</label>
            <select
              value={form.region}
              onChange={(e) => setForm({ ...form, region: e.target.value })}
              className="w-full px-4 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0]"
            >
              {REGIONS.map(r => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0] resize-none"
            />
          </div>

          <div className="bg-[#303135] rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-copper-400">Options</h3>
            <div className="grid grid-cols-3 gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.pets_allowed}
                  onChange={(e) => setForm({ ...form, pets_allowed: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <span className="text-[#C0C0C0] text-sm">Animaux</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.groups_allowed}
                  onChange={(e) => setForm({ ...form, groups_allowed: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <span className="text-[#C0C0C0] text-sm">Groupes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.water_toys}
                  onChange={(e) => setForm({ ...form, water_toys: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <span className="text-[#C0C0C0] text-sm">Water toys</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Informations annexes</label>
            <textarea
              value={form.extra_info}
              onChange={(e) => setForm({ ...form, extra_info: e.target.value })}
              rows={2}
              className="w-full px-4 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0] resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 p-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={loading || !form.name}
            className="flex-1 px-4 py-2 bg-copper-500 text-white rounded-xl hover:bg-copper-600 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Créer le yacht
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Carte Yacht Sélectionné (Draggable)
// ============================================
function SelectedYachtCard({ yacht, token, onUpdate, onRemove, onEdit, isSelectedForDeletion, onToggleSelect }) {
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

  let cached = {};
  try {
    cached = typeof yacht.cached_data === 'string'
      ? JSON.parse(yacht.cached_data)
      : (yacht.cached_data || {});
  } catch (e) {
    cached = yacht.cached_data || {};
  }
  const images = Array.isArray(cached.images) ? cached.images : [];
  const imageUrl = images.length > 0 && images[0] ? getAnkorImageUrl(images[0], '320w') : '/placeholder.jpg';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
        isSelectedForDeletion ? 'bg-red-900/20 border-red-700' :
        !isVisible ? 'bg-[#252528] border-gray-800 opacity-60' :
        isFeatured ? 'bg-[#2a2a30] border-copper-700/50' : 'bg-[#2a2a30] border-gray-700'
      }`}
    >
      <input
        type="checkbox"
        checked={isSelectedForDeletion}
        onChange={() => onToggleSelect(yacht.yacht_id)}
        className="w-5 h-5 rounded border-gray-600 text-red-500 focus:ring-red-500 cursor-pointer"
      />

      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 text-gray-500">
        <GripVertical className="w-5 h-5" />
      </button>

      <div className="relative w-20 h-14 flex-shrink-0">
        <img src={imageUrl} alt={yacht.yacht_name} className="w-full h-full object-cover rounded-lg" />
        {images.length > 0 && (
          <span className="absolute bottom-0 right-0 bg-black/70 text-white text-[10px] px-1 rounded-tl">
            1/{images.length}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-[#C0C0C0] font-medium truncate">{yacht.custom_title || yacht.yacht_name}</h3>
        <div className="flex flex-wrap gap-2 text-xs text-gray-400 mt-1">
          {cached.length && <span>{cached.length}</span>}
          {cached.guests && <span>• {cached.guests} guests</span>}
          {cached.crew && <span>• {cached.crew} crew</span>}
          {yacht.region && (
            <span className="text-copper-400">• {REGIONS.find(r => r.value === yacht.region)?.label || yacht.region}</span>
          )}
        </div>
        <div className="flex gap-1 mt-1">
          {yacht.pets_allowed && <PawPrint className="w-3 h-3 text-green-400" />}
          {yacht.groups_allowed && <Users className="w-3 h-3 text-blue-400" />}
          {yacht.water_toys && <Waves className="w-3 h-3 text-cyan-400" />}
        </div>
      </div>

      <button onClick={() => onEdit(yacht)} className="p-2 text-gray-400 hover:text-copper-400">
        <Edit3 className="w-4 h-4" />
      </button>

      <button onClick={toggleFeatured} disabled={loading}
        className={`p-2 rounded-lg ${isFeatured ? 'text-copper-400' : 'text-gray-500 hover:text-copper-400'}`}>
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
// Carte Yacht Ankor (recherche)
// ============================================
function AnkorYachtCard({ yacht, isSelected, onAdd, selectedRegion }) {
  const [loading, setLoading] = useState(false);
  const images = Array.isArray(yacht.images) ? yacht.images : [];
  const imageUrl = images.length > 0 && images[0] ? getAnkorImageUrl(images[0], '320w') : '/placeholder.jpg';

  const handleAdd = async () => {
    setLoading(true);
    await onAdd(yacht, selectedRegion);
    setLoading(false);
  };

  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border ${
      isSelected ? 'bg-green-900/20 border-green-700' : 'bg-[#2a2a30] border-gray-700'
    }`}>
      <div className="relative w-20 h-14 flex-shrink-0">
        <img src={imageUrl} alt={yacht.name} className="w-full h-full object-cover rounded-lg" />
        {images.length > 0 && (
          <span className="absolute bottom-0 right-0 bg-black/70 text-white text-[10px] px-1 rounded-tl">
            1/{images.length}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-[#C0C0C0] font-medium truncate">{yacht.name}</h3>
        <div className="flex gap-2 text-xs text-gray-400 mt-1">
          {yacht.type && <span className="capitalize">{yacht.type}</span>}
          {yacht.length && <span>• {yacht.length}</span>}
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
          className="px-3 py-1 bg-copper-500 hover:bg-copper-600 text-white rounded-lg text-sm flex items-center gap-1 disabled:opacity-50"
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
  const [selections, setSelections] = useState(initialSelections || []);
  const [stats, setStats] = useState(initialStats);
  const [selectedIds, setSelectedIds] = useState(new Set((initialSelections || []).map(s => s.yacht_id)));

  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    destination: '',
    minLength: '',
    maxLength: '',
    priceMin: '',
    priceMax: '',
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');

  const [editingYacht, setEditingYacht] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [activeTab, setActiveTab] = useState('selections');
  const [filterRegion, setFilterRegion] = useState('');

  // Sélection multiple pour suppression
  const [selectedForDeletion, setSelectedForDeletion] = useState(new Set());

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const filteredSelections = filterRegion === 'unassigned'
    ? selections.filter(s => !s.region)
    : filterRegion
      ? selections.filter(s => s.region === filterRegion)
      : selections;

  const selectionsByRegion = REGIONS.slice(1).reduce((acc, region) => {
    acc[region.value] = selections.filter(s => s.region === region.value);
    return acc;
  }, {});
  selectionsByRegion[''] = selections.filter(s => !s.region);

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
        const searchLower = filters.search.toLowerCase();
        results = results.filter(y => y.name?.toLowerCase().includes(searchLower));
      }

      setSearchResults(results);
      setActiveTab('search');
    } catch (err) {
      console.error('Erreur recherche:', err);
    }
    setSearching(false);
  };

  const handleAddYacht = async (yacht, region) => {
    try {
      const res = await fetch(`/api/admin/yachts?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          yacht_id: yacht.id,
          yacht_name: yacht.name,
          cached_data: yacht,
          region: region || '',
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

  const handleAddManualYacht = (selection) => {
    setSelections(prev => [...prev, selection]);
    setSelectedIds(prev => new Set([...prev, selection.yacht_id]));
    setStats(prev => ({ ...prev, total: prev.total + 1, visible: prev.visible + 1 }));
  };

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

  const toggleSelectForDeletion = (yacht_id) => {
    setSelectedForDeletion(prev => {
      const newSet = new Set(prev);
      if (newSet.has(yacht_id)) {
        newSet.delete(yacht_id);
      } else {
        newSet.add(yacht_id);
      }
      return newSet;
    });
  };

  const handleBulkDelete = async () => {
    if (selectedForDeletion.size === 0) return;
    if (!confirm(`Supprimer ${selectedForDeletion.size} yacht(s) de la sélection ?`)) return;

    try {
      const promises = Array.from(selectedForDeletion).map(yacht_id =>
        fetch(`/api/admin/yachts?token=${token}&yacht_id=${yacht_id}`, {
          method: 'DELETE'
        })
      );

      await Promise.all(promises);

      setSelections(prev => prev.filter(s => !selectedForDeletion.has(s.yacht_id)));
      setSelectedIds(prev => {
        const newSet = new Set(prev);
        selectedForDeletion.forEach(id => newSet.delete(id));
        return newSet;
      });
      setStats(prev => ({ ...prev, total: prev.total - selectedForDeletion.size }));
      setSelectedForDeletion(new Set());
    } catch (err) {
      console.error('Erreur suppression multiple:', err);
    }
  };

  const handleUpdate = useCallback((yachtId, updates) => {
    setSelections(prev => prev.map(s =>
      s.yacht_id === yachtId ? { ...s, ...updates } : s
    ));
  }, []);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const items = filteredSelections;
      const oldIndex = items.findIndex(s => s.yacht_id === active.id);
      const newIndex = items.findIndex(s => s.yacht_id === over.id);
      const newOrder = arrayMove(items, oldIndex, newIndex);

      if (filterRegion && filterRegion !== 'unassigned') {
        const otherSelections = selections.filter(s => s.region !== filterRegion);
        setSelections([...otherSelections, ...newOrder.map((s, i) => ({ ...s, display_order: i }))]);
      } else if (filterRegion === 'unassigned') {
        const otherSelections = selections.filter(s => s.region);
        setSelections([...otherSelections, ...newOrder.map((s, i) => ({ ...s, display_order: i }))]);
      } else {
        setSelections(newOrder.map((s, i) => ({ ...s, display_order: i })));
      }

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
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-[#2a2a30] rounded-xl p-4 border border-gray-700">
          <div className="text-2xl font-bold text-[#C0C0C0]">{stats.total}</div>
          <div className="text-gray-400 text-sm">Sélectionnés</div>
        </div>
        <div className="bg-[#2a2a30] rounded-xl p-4 border border-gray-700">
          <div className="text-2xl font-bold text-green-400">{stats.visible}</div>
          <div className="text-gray-400 text-sm">Visibles</div>
        </div>
        <div className="bg-[#2a2a30] rounded-xl p-4 border border-gray-700">
          <div className="text-2xl font-bold text-copper-400">{stats.featured}</div>
          <div className="text-gray-400 text-sm">Featured</div>
        </div>
        <div className="bg-[#2a2a30] rounded-xl p-4 border border-gray-700">
          <div className="text-2xl font-bold text-blue-400">{searchResults.length}</div>
          <div className="text-gray-400 text-sm">Résultats</div>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-copper-500/20 hover:bg-copper-500/30 rounded-xl p-4 border border-copper-700/50 flex flex-col items-center justify-center gap-1 transition-colors"
        >
          <Plus className="w-6 h-6 text-copper-400" />
          <span className="text-copper-400 text-sm font-medium">Créer manuel</span>
        </button>
      </div>

      {/* Filtres Ankor */}
      <div className="bg-[#2a2a30] rounded-xl p-4 border border-gray-700">
        <h3 className="text-[#C0C0C0] font-medium mb-4 flex items-center gap-2">
          <Filter className="w-5 h-5 text-copper-400" /> Rechercher des yachts (API Ankor)
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-3">
          <input
            type="text"
            placeholder="Rechercher par nom..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="px-3 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0] text-sm col-span-2"
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

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-3 py-2 bg-[#303135] border border-copper-700/50 rounded-xl text-copper-400 text-sm"
          >
            <option value="">→ Ajouter à: Toutes</option>
            {REGIONS.slice(1).map(r => <option key={r.value} value={r.value}>→ {r.label}</option>)}
          </select>

          <button
            onClick={handleSearch}
            disabled={searching}
            className="px-4 py-2 bg-copper-500 hover:bg-copper-600 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Rechercher
          </button>
        </div>

        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="text-sm text-gray-400 hover:text-[#C0C0C0] flex items-center gap-1"
        >
          {showAdvancedFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          Filtres avancés (longueur, prix)
        </button>

        {showAdvancedFilters && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 pt-3 border-t border-gray-700">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Longueur min (m)</label>
              <input
                type="number"
                placeholder="20"
                value={filters.minLength}
                onChange={(e) => setFilters({ ...filters, minLength: e.target.value })}
                className="w-full px-3 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Longueur max (m)</label>
              <input
                type="number"
                placeholder="100"
                value={filters.maxLength}
                onChange={(e) => setFilters({ ...filters, maxLength: e.target.value })}
                className="w-full px-3 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Prix min (€/semaine)</label>
              <input
                type="number"
                placeholder="10000"
                value={filters.priceMin}
                onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                className="w-full px-3 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Prix max (€/semaine)</label>
              <input
                type="number"
                placeholder="500000"
                value={filters.priceMax}
                onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                className="w-full px-3 py-2 bg-[#303135] border border-gray-700 rounded-xl text-[#C0C0C0] text-sm"
              />
            </div>
          </div>
        )}
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

      {activeTab === 'selections' ? (
        <div className="space-y-4">
          {/* Barre d'actions sélection multiple */}
          {selectedForDeletion.size > 0 && (
            <div className="bg-red-900/20 border border-red-700 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedForDeletion.size === filteredSelections.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedForDeletion(new Set(filteredSelections.map(s => s.yacht_id)));
                    } else {
                      setSelectedForDeletion(new Set());
                    }
                  }}
                  className="w-5 h-5 rounded border-gray-600 text-red-500 focus:ring-red-500 cursor-pointer"
                />
                <span className="text-red-400 font-medium">
                  {selectedForDeletion.size} yacht(s) sélectionné(s)
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedForDeletion(new Set())}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-xl text-sm flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Annuler
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Supprimer la sélection
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 flex-wrap">
            <FolderOpen className="w-5 h-5 text-copper-400" />
            <button
              onClick={() => setFilterRegion('')}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                filterRegion === '' ? 'bg-copper-500 text-white' : 'bg-[#303135] text-gray-400 hover:text-white'
              }`}
            >
              Toutes ({selections.length})
            </button>
            {REGIONS.slice(1).map(region => {
              const count = selectionsByRegion[region.value]?.length || 0;
              return (
                <button
                  key={region.value}
                  onClick={() => setFilterRegion(region.value)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    filterRegion === region.value ? 'bg-copper-500 text-white' : 'bg-[#303135] text-gray-400 hover:text-white'
                  }`}
                >
                  {region.label} ({count})
                </button>
              );
            })}
            {selectionsByRegion['']?.length > 0 && (
              <button
                onClick={() => setFilterRegion('unassigned')}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  filterRegion === 'unassigned' ? 'bg-copper-500 text-white' : 'bg-[#303135] text-gray-400 hover:text-white'
                }`}
              >
                Non classés ({selectionsByRegion['']?.length})
              </button>
            )}
          </div>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={filteredSelections.map(s => s.yacht_id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {filteredSelections.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <p>Aucun yacht {filterRegion ? 'dans cette région' : 'sélectionné'}</p>
                    <p className="text-sm mt-2">Utilisez la recherche pour trouver et ajouter des yachts</p>
                  </div>
                ) : (
                  filteredSelections.map(yacht => (
                    <SelectedYachtCard
                      key={yacht.yacht_id}
                      yacht={yacht}
                      token={token}
                      onUpdate={handleUpdate}
                      onRemove={handleRemoveYacht}
                      onEdit={setEditingYacht}
                      isSelectedForDeletion={selectedForDeletion.has(yacht.yacht_id)}
                      onToggleSelect={toggleSelectForDeletion}
                    />
                  ))
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>
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
                selectedRegion={selectedRegion}
              />
            ))
          )}
        </div>
      )}

      {editingYacht && (
        <EditModal
          yacht={editingYacht}
          token={token}
          onClose={() => setEditingYacht(null)}
          onSave={handleUpdate}
        />
      )}

      {showCreateModal && (
        <CreateManualModal
          token={token}
          onClose={() => setShowCreateModal(false)}
          onSave={handleAddManualYacht}
        />
      )}
    </div>
  );
}
