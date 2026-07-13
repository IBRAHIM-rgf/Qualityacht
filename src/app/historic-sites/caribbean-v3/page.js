import Image from 'next/image';
import SplitPanels from './SplitPanels';

export const metadata = {
  title: 'Caribbean by Land — Monuments, Hiking & Cycling | Qualityacht',
  description:
    'One card, three worlds: Caribbean historic monuments, hiking trails and cycling routes. Hover a panel to open it.',
};

// v3 : une seule grande card decoupee en 3 panneaux verticaux. Le panneau survole
// s'elargit ; il ne porte QUE son titre (centre) et un bouton Discovery qui ouvre la
// page des sous-regions empilees (/historic-sites/caribbean-v3/<key>).
// boost : photo terne a l'origine -> saturation/contraste remontes une fois ouverte.
const panels = [
  {
    key: 'monuments',
    title: 'Historic Monuments',
    img: '/images/stephan-hinni-ZHdkEO_oFRc-unsplash.jpg',
    href: '/historic-sites/caribbean-v3/monuments',
  },
  {
    key: 'hiking',
    title: 'Hiking',
    img: '/images/isaw-company-hBtl2SojFic-unsplash.jpg',
    boost: true,
    href: '/historic-sites/caribbean-v3/hiking',
  },
  {
    key: 'cycling',
    title: 'Cycling',
    img: '/images/carlos-mendoza-utvLhSfiqpo-unsplash(1).jpg',
    boost: true,
    href: '/historic-sites/caribbean-v3/cycling',
  },
];

export default function HistoricSitesCaribbeanV3Page() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      {/* MASTHEAD */}
      <div className="px-6 md:px-14 pt-28 md:pt-32 pb-8 border-b border-[#C0C0C0]/10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#B87333] font-medium mb-3">
            Caribbean · Private Client Guide
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight">
            The Caribbean by Land
          </h1>
          <div className="relative w-32 md:w-40 h-6 mt-4">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
          <p className="mt-3 text-[13px] text-[#8b90a0] uppercase tracking-[0.14em]">
            Monuments · Hiking · Cycling
          </p>
        </div>
      </div>

      {/* GRANDE CARD 3 PANNEAUX — seul contenu de la page */}
      <SplitPanels panels={panels} />
    </div>
  );
}
