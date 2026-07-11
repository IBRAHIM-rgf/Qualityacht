import Image from 'next/image';
import CaribbeanExplore from '../../components/CaribbeanExplore';
import ExperienceColumns from './ExperienceColumns';

export const metadata = {
  title: 'Caribbean — Historic Sites, Hiking & Cycling | Qualityacht',
  description:
    'A private client guide to the Caribbean by land: historic monuments, hiking trails and cycling routes, presented in a three-column editorial gallery.',
};

// 3 colonnes facon Badrutt. MONUMENTS = contenu reel (Jamaique, page historic-sites
// canonique). RANDONNEE + CYCLISME = placeholders a completer (titres plausibles).
// Ajouter une photo a une tuile = renseigner `img: '/images/...'`.
const columns = [
  {
    key: 'monuments',
    title: 'Historic Monuments',
    subtitle: 'Jamaica — Ten Sites of Consequence',
    items: [
      { name: 'Port Royal', meta: '17th c. · Yacht access · UNESCO 2025', tone: 'navy' },
      { name: 'Fort Charles', meta: '1655–1660 · Yacht access', tone: 'slate' },
      { name: 'Spanish Town', meta: '1534–1872 · Inland transfer', tone: 'copper' },
      { name: 'Rose Hall Great House', meta: '1770s · Yacht access', tone: 'slate' },
      { name: 'Greenwood Great House', meta: '1780–1800 · Yacht access', tone: 'navy' },
      { name: 'Falmouth', meta: '1769–1840s · Yacht access', tone: 'saumon' },
      { name: 'Seville Heritage Park', meta: 'Since 650 AD · Yacht access', tone: 'slate' },
      { name: 'Devon House', meta: '1881 · Kingston', tone: 'copper' },
      { name: 'Good Hope Plantation', meta: '1755 · Yacht access', tone: 'navy' },
      { name: 'Port Antonio', meta: 'Superyacht marina', tone: 'saumon' },
    ],
  },
  {
    key: 'hiking',
    title: 'Hiking',
    subtitle: 'Trails & waterfalls',
    placeholder: true,
    items: [
      { name: 'Blue Mountain Peak' },
      { name: 'Holywell Nature Trail' },
      { name: 'Cinchona Botanical Gardens' },
      { name: 'Reach Falls' },
      { name: 'YS Falls' },
      { name: 'Cockpit Country' },
    ],
  },
  {
    key: 'cycling',
    title: 'Cycling',
    subtitle: 'Routes & rides',
    placeholder: true,
    items: [
      { name: 'Blue Mountain Descent' },
      { name: 'North Coast Coastal Ride' },
      { name: 'Negril — Seven Mile' },
      { name: 'Cockpit Country Gravel' },
      { name: 'Port Antonio Hills' },
      { name: 'Kingston — St. Thomas Loop' },
    ],
  },
];

export default function HistoricSitesCaribbeanV2Page() {
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

      {/* GALERIE 3 COLONNES */}
      <ExperienceColumns columns={columns} />

      {/* Sections communes Caraibes (Explore / Regions / FAQ) */}
      <CaribbeanExplore />
    </div>
  );
}
