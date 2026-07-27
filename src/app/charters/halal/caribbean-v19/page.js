// ══ Halal Caraibes V19 — direction "A Day Aboard" ═════════════════════════════
// MEME direction que /charters/destinations/caribbean-v19 : meme palette, meme
// typo, meme grille, meme motion, memes cinq heures. Ce qui change n'est pas
// decoratif — c'est le CASTING et le CALENDRIER. Ce n'est pas une version
// adoucie ni une version "en plus" : c'est la meme page, avec d'autres
// personnes dedans. Les fontes sont donc rigoureusement les memes.
import { Newsreader, Geist } from 'next/font/google';
import HalalV19Client from './HalalV19Client';

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
  title: 'A day aboard — the halal Caribbean, hour by hour | Qualityacht',
  description:
    'Sixteen hours in the Caribbean, told the way you will actually live them. Awake before first light, everyone swimming by 09:15, a halal galley, prayer times held on the ship’s clock, and a table that runs long past 21:00.',
};

export default function Page() {
  return <HalalV19Client fontClass={`${display.variable} ${ui.variable}`} />;
}
