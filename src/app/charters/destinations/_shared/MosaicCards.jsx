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

export default function MosaicCards({ cards, cols = 4, wide = [], offset = 0 }) {
  const w = new Set(wide);
  return (
    <div className={`grid grid-cols-2 ${COLS[cols]} gap-px grid-flow-dense md:grid-flow-row`}>
      {cards.map((c, i) => (
        <div key={c.name} className={w.has(i) ? 'col-span-2' : ''}>
          <DestCard index={offset + i} name={c.name} image={c.image} imageOld={c.imageOld} href={c.href} />
        </div>
      ))}
    </div>
  );
}
