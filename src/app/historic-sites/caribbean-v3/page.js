import Image from 'next/image';
import SplitPanels from './SplitPanels';

export const metadata = {
  title: 'Caribbean by Land — Monuments, Hiking & Cycling | Qualityacht',
  description:
    'One card, three worlds: Caribbean historic monuments, hiking trails and cycling routes. Hover a panel to open it.',
};

// v3 : une seule grande card decoupee en 3 panneaux verticaux. Le panneau survole
// s'elargit et devoile son contenu (voir SplitPanels.jsx). Contenu synthetise
// depuis la v2 (monuments Jamaique, 20 randonnees, cyclisme a completer).
const panels = [
  {
    key: 'monuments',
    eyebrow: 'Jamaica & the Greater Antilles',
    title: 'Historic Monuments',
    img: '/images/destinations/gretar antilles-original.jpg',
    text: 'Ten sites of consequence, from the sunken city of Port Royal to the great houses of the north coast — most reachable by tender, all opened privately for our clients.',
    count: '10 sites',
    href: '/historic-sites/caribbean-v2',
    highlights: [
      { name: 'Port Royal', meta: '17th c. · UNESCO 2025' },
      { name: 'Fort Charles', meta: '1655–1660 · Yacht access' },
      { name: 'Rose Hall Great House', meta: '1770s · Yacht access' },
      { name: 'Seville Heritage Park', meta: 'Since 650 AD' },
    ],
  },
  {
    key: 'hiking',
    eyebrow: 'Windward & Leeward Islands',
    title: 'Hiking',
    img: '/images/isaw-company-hBtl2SojFic-unsplash.jpg',
    text: 'Twenty exceptional ascents across the arc of volcanoes — crater rims, cloud forests and boiling lakes — with private guides, helicopter transfers and a table set at altitude.',
    count: '20 hikes · VIP access',
    href: '/historic-sites/caribbean-v2',
    highlights: [
      { name: 'La Soufrière', meta: 'Guadeloupe · +1,467 m' },
      { name: 'Boiling Lake', meta: 'Dominica · 6–8 h' },
      { name: 'Petit Piton Summit', meta: 'St Lucia · +743 m' },
      { name: 'Blue Mountains', meta: 'Jamaica · +2,256 m' },
    ],
  },
  {
    key: 'cycling',
    eyebrow: 'Coastal roads & gravel',
    title: 'Cycling',
    img: '/images/carlos-mendoza-utvLhSfiqpo-unsplash(1).jpg',
    text: 'Descents from the Blue Mountains to the sea, coastal ribbons along the north shore and gravel lines through Cockpit Country — routes and support fleet in preparation.',
    count: 'Routes in preparation',
    href: null,
    highlights: [
      { name: 'Blue Mountain Descent', meta: 'Jamaica' },
      { name: 'North Coast Coastal Ride', meta: 'Jamaica' },
      { name: 'Cockpit Country Gravel', meta: 'Gravel' },
      { name: 'Port Antonio Hills', meta: 'Climbing' },
    ],
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

      {/* GRANDE CARD 3 PANNEAUX — seul contenu de la page (sections communes
          Explore / Regions / FAQ retirees a la demande) */}
      <SplitPanels panels={panels} />
    </div>
  );
}
