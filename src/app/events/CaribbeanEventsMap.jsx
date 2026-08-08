'use client';

// ══ CaribbeanEventsMap — filtres (ile + categorie) au-dessus de WorldPinsMap ══
// Les 54 evenements Caraibes se filtrent par ile et par categorie ; la carte + les
// cards en dessous ne montrent que la selection. key={filterKey} force WorldPinsMap
// a se remonter (il n'observe pas les changements d'items sinon).

import { useMemo, useState } from 'react';
import WorldPinsMap from '@/components/vibe/WorldPinsMap';

const CAT_LABELS = {
  patrimoine: 'Heritage', carnaval: 'Carnival', gastronomie: 'Gastronomy',
  musique: 'Music', ferie: 'Public Holiday', regate: 'Regatta',
  voile_traditionnelle: 'Traditional Sailing',
};

export default function CaribbeanEventsMap({ items, kicker, title, intro }) {
  const islands = useMemo(
    () => Array.from(new Set(items.map((e) => e.island))).sort(),
    [items]
  );
  const categories = useMemo(
    () => Array.from(new Set(items.map((e) => e.category))).sort(),
    [items]
  );

  const [island, setIsland] = useState('all');
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => items.filter((e) =>
    (island === 'all' || e.island === island) &&
    (category === 'all' || e.category === category)
  ), [items, island, category]);

  const pillCls = (active) =>
    `px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.14em] border transition-colors duration-300 ${
      active ? 'border-[#c2622a] text-[#c2622a] bg-[#c2622a]/10' : 'border-[#C0C0C0]/30 text-[#acb0cd] hover:border-[#B87333]'
    }`;

  return (
    <div className="bg-[#26272a]">
      <div className="max-w-7xl mx-auto px-6 md:px-14 pt-14 md:pt-20 flex flex-col items-center gap-5">
        {/* Filtre categorie */}
        <div className="flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => setCategory('all')} className={pillCls(category === 'all')}>All Categories</button>
          {categories.map((c) => (
            <button key={c} type="button" onClick={() => setCategory(c)} className={pillCls(category === c)}>
              {CAT_LABELS[c] || c}
            </button>
          ))}
        </div>
        {/* Filtre ile */}
        <div className="flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => setIsland('all')} className={pillCls(island === 'all')}>All Islands</button>
          {islands.map((i) => (
            <button key={i} type="button" onClick={() => setIsland(i)} className={pillCls(island === i)}>
              {i}
            </button>
          ))}
        </div>
      </div>

      <WorldPinsMap
        key={`${island}-${category}`}
        items={filtered}
        kicker={kicker}
        title={title}
        intro={filtered.length === 0 ? 'No event matches this filter — try another island or category.' : intro}
        center={[15.5, -66]}
        zoom={5}
      />
    </div>
  );
}
