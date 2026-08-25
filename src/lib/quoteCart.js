// ══ Selection de yachts — source de verite unique ══
//
// Le projet stockait deja la selection sous la cle localStorage `quote_cart`,
// ecrite par la fiche yacht. On la REUTILISE telle quelle : aucun second systeme
// de favoris n'est cree. Les petits coeurs des cartes, le CTA de la fiche et la
// page Request Quote lisent et ecrivent tous cette meme cle.
//
// Aucune donnee personnelle n'est stockee ici : uniquement l'identite et les
// caracteristiques publiques du bateau, deja affichees sur le site.

export const CART_KEY = 'quote_cart';
const EVENT = 'quote-cart-change';

/** Identite stable d'un yacht : l'id quand il existe, sinon le nom normalise. */
export function yachtKey(y) {
  if (!y) return '';
  if (y.id != null && y.id !== '') return `id:${String(y.id)}`;
  return `name:${String(y.name || '').trim().toLowerCase()}`;
}

export function readCart() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    if (!Array.isArray(raw)) return [];
    // Dedoublonnage defensif : un panier ecrit par une version anterieure peut
    // contenir deux fois le meme bateau.
    const vus = new Set();
    return raw.filter((y) => {
      const k = yachtKey(y);
      if (!k || vus.has(k)) return false;
      vus.add(k);
      return true;
    });
  } catch {
    return [];
  }
}

function writeCart(list) {
  if (typeof window === 'undefined') return list;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent(EVENT, { detail: list }));
  } catch {}
  return list;
}

export function isInCart(y) {
  const k = yachtKey(y);
  return !!k && readCart().some((x) => yachtKey(x) === k);
}

/** Ajoute sans jamais creer de doublon. Retourne le panier resultant. */
export function addToCart(y) {
  const k = yachtKey(y);
  if (!k) return readCart();
  const cart = readCart();
  if (cart.some((x) => yachtKey(x) === k)) return cart;
  return writeCart([...cart, y]);
}

export function removeFromCart(y) {
  const k = yachtKey(y);
  if (!k) return readCart();
  return writeCart(readCart().filter((x) => yachtKey(x) !== k));
}

/** Bascule et retourne le nouvel etat de presence. */
export function toggleCart(y) {
  if (isInCart(y)) {
    removeFromCart(y);
    return false;
  }
  addToCart(y);
  return true;
}

/**
 * S'abonne aux changements du panier, y compris depuis un autre onglet.
 * Retourne la fonction de desabonnement.
 */
export function subscribeCart(fn) {
  if (typeof window === 'undefined') return () => {};
  const local = () => fn(readCart());
  const cross = (e) => { if (e.key === CART_KEY) fn(readCart()); };
  window.addEventListener(EVENT, local);
  window.addEventListener('storage', cross);
  return () => {
    window.removeEventListener(EVENT, local);
    window.removeEventListener('storage', cross);
  };
}

/** Reduit un yacht aux champs publics utiles a la page de devis. */
export function toCartEntry(y, extra = {}) {
  return {
    id: y?.id ?? null,
    name: y?.name ?? '',
    image: extra.image ?? (Array.isArray(y?.images) ? y.images[0] : y?.image) ?? null,
    length: extra.length ?? y?.length ?? null,
    guests: extra.guests ?? y?.guests ?? y?.capacity ?? null,
    cabins: extra.cabins ?? y?.cabins ?? null,
    type: extra.type ?? y?.type ?? null,
    price: extra.price ?? y?.pricePerHour ?? y?.price ?? null,
  };
}
