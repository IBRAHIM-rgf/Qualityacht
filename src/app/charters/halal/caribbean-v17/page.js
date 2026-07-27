// ══ Halal Caraibes v17 — GOLDEN HOUR (direction A) ═════════════════════════════
// Page AUTONOME, meme direction artistique que /charters/destinations/caribbean-v17 :
// memes tokens, meme typo, memes composants (src/components/vibe/gold/). Seuls le
// casting photo et le registre du copy changent.
// Composant serveur : chargement de la display + metadonnees, rien d'autre.
import { Fraunces } from 'next/font/google';
import HalalGoldClient from './HalalGoldClient';

const displayFont = Fraunces({
  subsets: ['latin'],
  axes: ['SOFT', 'WONK', 'opsz'],
  style: ['normal', 'italic'],
  variable: '--font-gh-display',
  display: 'swap',
});

export const metadata = {
  title: 'Halal charters, and the hour nobody wants to end | Qualityacht',
  description:
    'A private Caribbean week planned around five o’clock: closed sight lines, a fully halal galley, prayer times kept on the bridge and beaches that empty out after four.',
};

export default function HalalCaribbeanV17Page() {
  return <HalalGoldClient fontClass={displayFont.variable} />;
}
