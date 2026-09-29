'use client';

// ══ Bouton « Back » present sur chaque page (client 2026-09-29) ══
// Retourne a la page precedente (historique du navigateur). Si le visiteur est
// arrive directement sur la page (pas d'historique interne), il est renvoye a
// l'accueil. Masque sur la page d'accueil. Place sous le header fixe, a gauche.

import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const pathname = usePathname();
  const router = useRouter();
  if (!pathname || pathname === '/') return null;

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push('/');
  };

  return (
    <button
      type="button"
      onClick={goBack}
      aria-label="Back to the previous page"
      className="fixed left-3 md:left-5 top-[82px] md:top-[92px] z-40 inline-flex items-center gap-2 rounded-full border border-[#C0C0C0]/60 bg-[#26272a]/75 backdrop-blur-sm px-4 py-2 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#acb0cd] shadow-[0_4px_14px_rgba(0,0,0,0.35)] transition-colors duration-300 hover:border-[#c2622a] hover:text-[#c2622a] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
    >
      <ArrowLeft aria-hidden className="w-3.5 h-3.5 text-[#c2622a]" />
      Back
    </button>
  );
}
