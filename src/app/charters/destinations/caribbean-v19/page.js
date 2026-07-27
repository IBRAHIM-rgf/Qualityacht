// ══ Caraibes V19 — direction "A Day Aboard" ═══════════════════════════════════
// On ne vend pas un bateau, on vend une journee de votre vie : documentaire,
// intime, incarne. Cinq heures reelles, cinq grands portraits.
//
// Composant SERVEUR : il charge ici les deux fontes de la direction et passe
// leurs variables au client. layout.js et globals.css ne sont JAMAIS touches.
//  • Newsreader = serif de LECTURE a axe optique (opsz 6-72) : la meme famille
//    donne un titre resserre de 84px ET un paragraphe intime de 20px, ouvert.
//    Une seule voix, deux registres. Vrai italique cursif pour les legendes.
//  • Geist = UNIQUEMENT les heures, les labels et les boutons (tabular-nums,
//    pour que 06:40 / 09:15 / 13:00 / 17:30 / 21:00 s'alignent au pixel).
import { Newsreader, Geist } from 'next/font/google';
import CaribbeanV19Client from './CaribbeanV19Client';

const display = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-crew-display',
});

const ui = Geist({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-crew-ui',
});

export const metadata = {
  title: 'A day aboard — the Caribbean, hour by hour | Qualityacht',
  description:
    'Sixteen hours in the Caribbean, told the way you will actually live them. Flat water at 06:40, everyone swimming by 09:15, salt still in your hair when dinner starts at 21:00.',
};

export default function Page() {
  return <CaribbeanV19Client fontClass={`${display.variable} ${ui.variable}`} />;
}
