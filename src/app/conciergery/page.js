// ══ /conciergery ══
//
// Refonte du 2026-09-11 (demande client) : hero video (extrait 0–9 s du fichier
// fourni) puis les quatre paragraphes fournis, avec deux photos posees a droite.
// L'ancienne mise en page Text4ImagesSection n'est plus utilisee par cette route
// (le composant partage reste intact pour les autres pages).

import ConciergeryContent from './ConciergeryContent';

export const metadata = {
  title: 'Exclusive Concierge Services | Qualityacht',
  description:
    'A private playground on every voyage: secret anchorages, forgotten islands and ideas that shift the lines, arranged by Qualityacht.',
};

export default function ConciergeriePage() {
  return (
    <main
      className="bg-[#2e2f32]"
      style={{ backgroundImage: 'url(/images/nuagesAncien.png)', backgroundSize: 'contain', backgroundPosition: 'center' }}
    >
      <ConciergeryContent />
    </main>
  );
}
