// ══ Caraibes v17 — GOLDEN HOUR (direction A) ═══════════════════════════════════
// Page AUTONOME : elle ne delegue plus rien a caribbean-v15.
// Composant serveur : il ne fait que charger la display de la direction et exporter
// les metadonnees. Toute la page vit dans CaribbeanGoldClient.jsx.
//
// FRAUNCES — pourquoi elle et pas une autre : serif a fort contraste mais aux
// terminaisons ADOUCIES (axe SOFT), avec un axe optique qui, pousse a opsz 120 en
// display, affine les empattements jusqu'a un trait de lumiere — la sensation exacte
// d'un contre-jour de fin de journee. L'axe WONK reintroduit des glyphes legerement
// irreguliers (le g a boucle, le y a queue courbe) qui donnent a une phrase en casse
// minuscule un timbre parle : le ton d'un article, pas d'une signaletique. Sa hauteur
// d'x genereuse garde la casse de phrase lisible en tres gros corps sur photo.
// Ecartees : Playfair (le defaut generique du "luxe" web), Instrument Serif (un seul
// poids, rien a moduler entre 84px et 20px), Newsreader (excellente mais neutre :
// elle raconte "presse quotidienne", pas "lumiere de 17h").
// Le corps de texte reste Geist Sans, deja chargee dans layout.js (--font-geist-sans).
import { Fraunces } from 'next/font/google';
import CaribbeanGoldClient from './CaribbeanGoldClient';

const displayFont = Fraunces({
  subsets: ['latin'],
  axes: ['SOFT', 'WONK', 'opsz'],
  style: ['normal', 'italic'],
  variable: '--font-gh-display',
  display: 'swap',
});

export const metadata = {
  title: 'The hour nobody wants to end — Caribbean charters | Qualityacht',
  description:
    'Between five and seven the Caribbean stops performing: the day boats leave, the trade wind drops and the water goes gold. We plan the week backwards from that hour.',
};

export default function CaribbeanV17Page() {
  return <CaribbeanGoldClient fontClass={displayFont.variable} />;
}
