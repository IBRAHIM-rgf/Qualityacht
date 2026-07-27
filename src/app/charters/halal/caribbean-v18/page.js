// ══ SALT — Caraibes HALAL (slot v18) — COMPOSANT SERVEUR ═════════════════════
// Mêmes fontes que la version principale, chargees ici aussi (chaque page charge
// SA display : on ne touche jamais a layout.js ni a globals.css, partages).
// Archivo variable pour le Black Expanded des titres, IBM Plex Mono pour les
// seules donnees techniques.

import { Archivo, IBM_Plex_Mono } from 'next/font/google';
import HalalV18Client from './HalalV18Client';

const display = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--salt-display',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--salt-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Halal Caribbean charter — the deck is yours | Qualityacht',
  description:
    'A private Caribbean week for the whole family: a deck that closes on request, a halal-provisioned galley, prayer times on the bridge display, and eleven anchorages a morning apart.',
};

export default function Page() {
  return <HalalV18Client fontClass={`${display.variable} ${mono.variable}`} />;
}
