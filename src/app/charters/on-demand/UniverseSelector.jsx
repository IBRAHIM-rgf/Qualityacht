'use client';

// ══ Selecteur d'envies — OUTIL D'INSPIRATION ══
//
// IMPORTANT : /request-quote ne lit que des parametres yacht (id, name, image,
// guests, type, region, price). Il n'existe AUCUN mecanisme cote formulaire pour
// recevoir des univers. Ce selecteur ne transmet donc rien et n'ajoute aucun
// parametre d'URL qui serait ignore.
//
// Il sert a aider le visiteur a formuler son envie ; le texte sous la grille le
// dit clairement pour ne pas laisser croire que la selection est envoyee.

import { useState } from 'react';

const FOCUS =
  'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]';

const UNIVERS = [
  'Local Encounters',
  'Food & Private Dining',
  'Parties & Nightlife',
  'Adventure & Exploration',
  'Style, Image & Content',
  'Creative Projects',
  'Privacy & Security',
];

export default function UniverseSelector() {
  const [choisis, setChoisis] = useState([]);

  const basculer = (u) =>
    setChoisis((prev) => (prev.includes(u) ? prev.filter((x) => x !== u) : [...prev, u]));

  return (
    <div>
      {/* De vrais boutons : utilisables au clavier, etat annonce par aria-pressed. */}
      <ul className="flex flex-wrap justify-center gap-3 list-none p-0 m-0">
        {UNIVERS.map((u) => {
          const actif = choisis.includes(u);
          return (
            <li key={u}>
              <button
                type="button"
                onClick={() => basculer(u)}
                aria-pressed={actif}
                className={`inline-flex min-h-[48px] items-center justify-center rounded-full border px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] transition-[border-color,box-shadow,color] duration-300 ${FOCUS} ${
                  actif
                    ? 'border-[#c2622a] bg-[#26272a] text-[#c2622a] shadow-[0_0_18px_rgba(194,98,42,0.35)]'
                    : 'border-[#C0C0C0]/70 bg-[#26272a] text-[#C0C0C0] hover:border-[#c2622a] hover:shadow-[0_0_16px_rgba(192,192,192,0.25)]'
                }`}
              >
                {u}
              </button>
            </li>
          );
        })}
      </ul>

      <p aria-live="polite" className="mt-8 text-center text-[13px] leading-relaxed text-[#acb0cd]">
        {choisis.length === 0
          ? 'Pick whatever speaks to you. Nothing is sent from this page — it is simply there to help you put words on what you are after.'
          : `You have picked ${choisis.length} ${choisis.length > 1 ? 'themes' : 'theme'}: ${choisis.join(', ')}. Mention them when you get in touch and we will build from there.`}
      </p>
    </div>
  );
}
