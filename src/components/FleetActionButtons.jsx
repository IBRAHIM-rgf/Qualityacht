'use client';

// ── Boutons de parcours des pages qui listent les yachts en charter ──
// Demande client 2026-09-10 (d'abord sur /yachts, puis etendu aux pages
// Explore Yachts / liste accessible / 8 pages d'iles Caraibes).
//
// - « Return to the Islands » : retour a la section « Explore Caribbean Islands »
//   de /charters/destinations/caribbean-v15 (ancre #explore-caribbean-islands).
// - « Proceed to Confirmation — N Yachts Selected » : compteur = selection
//   partagee (lib/quoteCart, alimentee par les coeurs des cartes). Desactive
//   avec « Select at Least One Yacht to Continue » si la selection est vide.
//
// Styles identiques aux CTA du site (pilule, bord argent, texte cuivre).

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { readCart, subscribeCart } from '@/lib/quoteCart';

export const ISLANDS_HREF = '/charters/destinations/caribbean-v15#explore-caribbean-islands';
export const CONFIRM_HREF = '/request-quote';

const FOCUS =
  'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]';
const BTN_BASE =
  'inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center text-center px-6 py-2.5 rounded-full border ' +
  'text-[12px] font-semibold uppercase tracking-[0.16em] transition-[border-color,box-shadow,opacity] duration-300 ' + FOCUS;
const BTN_ARGENT =
  BTN_BASE + ' border-[#C0C0C0] bg-[#26272a]/60 backdrop-blur-sm text-[#C0C0C0] hover:border-[#c2622a] hover:shadow-[0_0_18px_rgba(194,98,42,0.35)]';
const BTN_CUIVRE =
  BTN_BASE + ' border-[#C0C0C0] bg-[#26272a] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] hover:border-[#c2622a] hover:shadow-[0_0_24px_rgba(194,98,42,0.45)]';
const BTN_OFF =
  BTN_BASE + ' border-[#C0C0C0]/30 bg-[#26272a]/60 text-[#8b90a0] cursor-not-allowed';

/** Nombre de yachts dans la selection partagee, synchronise en direct. */
export function useSelectedCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(readCart().length);
    return subscribeCart((list) => setCount(list.length));
  }, []);
  return count;
}

export function ReturnToIslandsButton() {
  return (
    <Link href={ISLANDS_HREF} className={BTN_ARGENT}>
      Return to the Islands
    </Link>
  );
}

export function ProceedButton({ count }) {
  if (count < 1) {
    return (
      <span role="button" aria-disabled="true" className={BTN_OFF}>
        Select at Least One Yacht to Continue
      </span>
    );
  }
  return (
    <Link href={CONFIRM_HREF} className={BTN_CUIVRE}>
      Proceed to Confirmation &mdash; {count} Yacht{count > 1 ? 's' : ''} Selected
    </Link>
  );
}

/** Ligne d'en-tete : compteur a gauche, les deux boutons a droite. */
export function FleetHeaderRow({ children, count }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>{children}</div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <ReturnToIslandsButton />
        <ProceedButton count={count} />
      </div>
    </div>
  );
}

/** Bouton de confirmation repete en bas de la liste, aligne a droite. */
export function FleetFooterRow({ count }) {
  return (
    <div className="mt-8 flex justify-end">
      <ProceedButton count={count} />
    </div>
  );
}
