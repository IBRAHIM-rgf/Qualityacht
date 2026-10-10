// /charters/destinations/antarctica — page destination Antarctica (client 2026-10-10),
// sur le modele de la page Bahamas : meme hero video (kicker, titre, trait,
// sous-titre, 2 boutons). Les sections suivantes (iles, regions, FAQ...) seront
// ajoutees quand le client aura fourni leur contenu.
// (Republie 2026-10-10 : le deploiement de la video avait fini apres celui de la page.)

import Link from 'next/link';
import VideoHero from '@/components/vibe/VideoHero';

const HERO = '/media/client/2026-10-10/antarctica-hero';

export const metadata = {
  title: 'Antarctica | Qualityacht',
};

export default function AntarcticaPage() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-clip">
      <VideoHero
        videoLandscape={`${HERO}/hero.mp4`}
        posterLandscape={`${HERO}/poster.jpg`}
        kicker="Qualityacht · Antarctica"
        title="Antarctica"
        subtitle="The Ultimate Luxury Yachting Destination"
        align="center"
        contentClassName="pt-[210px] md:pt-[190px]"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/request-quote"
            className="inline-flex min-h-[48px] max-w-full items-center justify-center text-center rounded-full border border-[#C0C0C0] bg-[#26272a] px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
          >
            Design Your Charter
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#C0C0C0] bg-[#26272a]/40 backdrop-blur-sm px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C0C0C0] transition-colors duration-300 hover:border-[#c2622a] hover:text-[#c2622a] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
          >
            Contact a Broker
          </Link>
        </div>
      </VideoHero>
    </div>
  );
}
