// ══ SALT — Caraibes (slot v18) — COMPOSANT SERVEUR ═══════════════════════════
// Les deux fontes de la direction sont chargees ICI (jamais dans layout.js, qui
// est partage entre plusieurs chantiers) puis passees au client en variables CSS :
//   Archivo — grotesque VARIABLE (axes wght + wdth) : elle donne dans une seule
//     famille le Black Expanded du hero (wght 900 / wdth 112) et un condense pour
//     les labels. Ses pleins tiennent quand on la detoure a grande echelle sur une
//     video qui bouge, et sa bas-de-casse a une hauteur d'x enorme — c'est l'arme
//     contre la capitale romaine Trajan imposee par globals.css.
//   IBM Plex Mono — strictement reserve aux DONNEES : coordonnees, vent,
//     distances, numeros de chapitre. La texture d'un afficheur de passerelle.

import { Archivo, IBM_Plex_Mono } from 'next/font/google';
import CaribbeanV18Client from './CaribbeanV18Client';

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
  title: 'Caribbean charter — the sea is 28°C | Qualityacht',
  description:
    'Seven days of open water between St Barths, Anguilla and St Martin: dolphins on the bow wave, kites over the reef, eleven anchorages a morning apart. Tell us the week, we find the boat.',
};

export default function Page() {
  return <CaribbeanV18Client fontClass={`${display.variable} ${mono.variable}`} />;
}
