'use client';

// ══ CaribbeanEventsMap — carte + filtres (secteur + categorie) ══
// Les 54 evenements Caraibes se filtrent par SECTEUR (8 regroupements standard, cf.
// island-sectors.js — plus les 30 villes/iles brutes du fichier client) et par
// categorie. filtersBelow=true place les filtres SOUS la carte (entre la carte et le
// marquee d'images, cf. /events/caribbean) au lieu d'au-dessus (defaut).
// key={filterKey} force WorldPinsMap a se remonter (il n'observe pas les items sinon).

import { useMemo, useState } from 'react';
import WorldPinsMap from '@/components/vibe/WorldPinsMap';
import { SECTORS, toSector } from './island-sectors';

const CAT_LABELS = {
  patrimoine: 'Heritage', carnaval: 'Carnival', gastronomie: 'Gastronomy',
  musique: 'Music', ferie: 'Public Holiday', regate: 'Regatta',
  voile_traditionnelle: 'Traditional Sailing',
};

export default function CaribbeanEventsMap({ items, kicker, title, intro, filtersBelow = false }) {
  const itemsWithSector = useMemo(
    () => items.map((e) => ({ ...e, sector: toSector(e.island) })),
    [items]
  );
  const sectors = useMemo(
    () => SECTORS.filter((s) => itemsWithSector.some((e) => e.sector === s)),
    [itemsWithSector]
  );
  const categories = useMemo(
    () => Array.from(new Set(items.map((e) => e.category))).sort(),
    [items]
  );

  const [sector, setSector] = useState('all');
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => itemsWithSector.filter((e) =>
    (sector === 'all' || e.sector === sector) &&
    (category === 'all' || e.category === category)
  ), [itemsWithSector, sector, category]);

  const pillCls = (active) =>
    `px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.14em] border transition-colors duration-300 ${
      active ? 'border-[#c2622a] text-[#c2622a] bg-[#c2622a]/10' : 'border-[#C0C0C0]/30 text-[#acb0cd] hover:border-[#B87333]'
    }`;

  const filters = (
    <div className="max-w-7xl mx-auto px-6 md:px-14 py-10 md:py-14 flex flex-col items-center gap-5">
      {/* Filtre categorie */}
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={() => setCategory('all')} className={pillCls(category === 'all')}>All Categories</button>
        {categories.map((c) => (
          <button key={c} type="button" onClick={() => setCategory(c)} className={pillCls(category === c)}>
            {CAT_LABELS[c] || c}
          </button>
        ))}
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
    <div className="bg-[#26272a]">
      {!filtersBelow && filters}

      <WorldPinsMap
        key={`${sector}-${category}`}
        items={filtered}
        kicker={kicker}
        title={title}
        intro={filtered.length === 0 ? 'No event matches this filter — try another sector or category.' : intro}
        center={[15.5, -66]}
        zoom={5}
      />

      {filtersBelow && filters}
    </div>
  );
}
