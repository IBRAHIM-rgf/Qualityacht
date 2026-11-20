'use client';

// Grille de cases sans case vide (client 2026-11-19, fichier « dispositions impairs 1 a 13 ») :
// carres + un rectangle double largeur. `cols` = colonnes sur ordinateur, `wide` = index
// des cases en rectangle. Variantes utilisees :
//   3B : cols 4, wide [1]   (carre, rectangle, carre)
//   5B : cols 3, wide [0]   (rectangle a gauche + carre / 3 carres)
//   7B : cols 4, wide [1]   (carre, rectangle, carre / 4 carres)
//   7F : cols 4, wide [6]   (4 carres / 2 carres + rectangle a droite)
// Telephone : 2 colonnes, le rectangle prend toute la largeur ; « dense » comble les trous.
import { DestCard } from '../caribbean-v15/CaribbeanV15Base';

const COLS = { 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' };

// mobileOne : 1 colonne sur telephone (le rectangle ne s'elargit qu'a partir de md).
// gapClass / className : espacement et fond de la grille (defaut : 1 px, sans fond).
export default function MosaicCards({ cards, cols = 4, wide = [], offset = 0, mobileOne = false, gapClass = 'gap-px', className = '' }) {
  const w = new Set(wide);
  const base = mobileOne ? 'grid-cols-1' : 'grid-cols-2 grid-flow-dense md:grid-flow-row';
  const span = mobileOne ? 'md:col-span-2' : 'col-span-2';
  return (
    <div className={`grid ${base} ${COLS[cols]} ${gapClass} ${className}`}>
      {cards.map((c, i) => (
        <div key={c.name} className={w.has(i) ? span : ''}>
          <DestCard index={offset + i} name={c.name} image={c.image} imageOld={c.imageOld} href={c.href} />
        </div>
      ))}
    </div>
  );
}
