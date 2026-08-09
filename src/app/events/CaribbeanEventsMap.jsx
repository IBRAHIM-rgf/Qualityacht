'use client';

// ══ CaribbeanEventsMap — carte, PUIS filtres, PUIS cards evenements ══
// Ordre voulu par le client : carte -> filtres (secteur + categorie) -> cards. Les
// filtres sont passes a WorldPinsMap via `between` (rendu entre la carte et sa grille
// de cards), donc rien n'est melange ni renvoye tout en bas de la page.
// Secteurs = 8 regroupements standard (island-sectors.js), pas les 30 villes brutes.

import { useMemo, useState } from 'react';
import WorldPinsMap from '@/components/vibe/WorldPinsMap';
import { SECTORS, toSector } from './island-sectors';

const CAT_LABELS = {
  patrimoine: 'Heritage', carnaval: 'Carnival', gastronomie: 'Gastronomy',
  musique: 'Music', ferie: 'Public Holiday', regate: 'Regatta',
  voile_traditionnelle: 'Traditional Sailing',
};

export default function CaribbeanEventsMap({ items, kicker, title, intro }) {
  const itemsWithSector = useMemo(
    () => items.map((e) => ({ ...e, sector: toSector(e.island) })),
    [items]
  );
  const sectors = useMemo(
    () => SECTORS.filter((s) => itemsWithSector.some((e) => e.sector === s)),
    [itemsWithSector]
  );
  // Categories connues (CAT_LABELS) affichees individuellement ; toute categorie
  // presente dans les donnees mais absente de CAT_LABELS tombe sous "Other".
  const categories = useMemo(
    () => Array.from(new Set(items.map((e) => e.category))).filter((c) => CAT_LABELS[c]).sort(),
    [items]
  );
  const hasOther = useMemo(
    () => items.some((e) => !CAT_LABELS[e.category]),
    [items]
  );

  const [sector, setSector] = useState('all');
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => itemsWithSector.filter((e) =>
    (sector === 'all' || e.sector === sector) &&
    (category === 'all' || (category === 'other' ? !CAT_LABELS[e.category] : e.category === category))
  ), [itemsWithSector, sector, category]);

  const pillCls = (active) =>
    `px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.14em] border transition-colors duration-300 ${
      active ? 'border-[#c2622a] text-[#c2622a] bg-[#c2622a]/10' : 'border-[#C0C0C0]/30 text-[#acb0cd] hover:border-[#B87333]'
    }`;

  const filters = (
    <div className="flex flex-col items-center gap-5 mt-8">
      {/* Filtre categorie */}
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={() => setCategory('all')} className={pillCls(category === 'all')}>All Categories</button>
        {categories.map((c) => (
          <button key={c} type="button" onClick={() => setCategory(c)} className={pillCls(category === c)}>
            {CAT_LABELS[c]}
          </button>
        ))}
        {hasOther && (
          <button type="button" onClick={() => setCategory('other')} className={pillCls(category === 'other')}>
            Other
          </button>
        )}
      </div>
      {/* Filtre secteur (8 regroupements, pas les 30 villes brutes) */}
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={() => setSector('all')} className={pillCls(sector === 'all')}>All Sectors</button>
        {sectors.map((s) => (
          <button key={s} type="button" onClick={() => setSector(s)} className={pillCls(sector === s)}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <WorldPinsMap
      key={`${sector}-${category}`}
      items={filtered}
      kicker={kicker}
      title={title}
      intro={filtered.length === 0 ? 'No event matches this filter — try another sector or category.' : intro}
      center={[15.5, -66]}
      zoom={5}
      between={filters}
    />
  );
}
