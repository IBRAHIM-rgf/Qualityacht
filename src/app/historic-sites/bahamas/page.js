// /historic-sites/bahamas — hub Bahamas (client 2026-10-09), meme presentation que
// /historic-sites/caribbean : en-tete puis 3 tuiles (Historic Monuments, Hiking, Cycling).
// Monuments ouvre /historic-sites/bahamas/monuments ; Hiking et Cycling : « Coming Soon »
// en attendant les listes du client.
import Image from 'next/image';
import HistoricHub from '../caribbean/HistoricHub';

export const metadata = {
  title: 'Bahamas by Land — Monuments, Hiking & Cycling | Qualityacht',
  description: 'Heritage sites, hiking and cycling across The Bahamas, for private yacht clients.',
};

const panels = [
  { key: 'monuments', title: 'Historic Monuments', img: '/media/client/lydie/2026-09-28/bahamas-cards/card-1-color.jpg' },
  { key: 'hiking', title: 'Hiking', img: '/media/client/lydie/2026-09-27/bahamas-flowers/andros-color.jpg', soon: true },
  { key: 'cycling', title: 'Cycling', img: '/media/client/lydie/2026-09-28/bahamas-cards/card-5-color.jpg', soon: true },
];

export default function HistoricSitesBahamasPage() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen">
      <div className="px-6 md:px-14 pt-28 md:pt-32 pb-8 border-b border-[#C0C0C0]/10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#B87333] font-medium mb-3">
            Bahamas · Private Client Guide
          </p>
          <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] text-[#C0C0C0] leading-tight">
            The Bahamas by Land
          </h1>
          <div className="relative w-32 md:w-40 h-6 mt-4">
            <Image src="/images/title-line.png" alt="" fill className="object-contain" />
          </div>
          <p className="mt-3 text-[13px] text-[#8b90a0] uppercase tracking-[0.14em]">
            Monuments · Hiking · Cycling
          </p>
        </div>
      </div>

      <HistoricHub panels={panels} basePath="/historic-sites/bahamas" />
    </div>
  );
}
