// /charters/destinations/north-america — page destination (client 2026-10-15), sur le
// modele des pages Bahamas / The Antarctica : hero video (kicker, titre, trait,
// sous-titre, 2 boutons) puis « Destinations by Region » (fichier client).
// Remplace l'ancienne liste de yachts (l'API renvoyait une erreur pour cette destination).

import Link from 'next/link';
import VideoHero from '@/components/vibe/VideoHero';
import NorthAmericaRegions from './NorthAmericaRegions';
import NorthAmericaRegionCards from './NorthAmericaRegionCards';

const HERO = '/media/client/2026-10-15/north-america-hero';

export const metadata = {
  title: 'North America | Qualityacht',
};

export default function NorthAmericaPage() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-clip">
      <VideoHero
        videoLandscape={`${HERO}/hero.mp4`}
        posterLandscape={`${HERO}/poster.jpg`}
        kicker="Qualityacht · North America"
        title="North America"
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
      {/* Cases des regions (client 2026-10-15), comme les cases Bahamas. */}
      <NorthAmericaRegionCards />
      <NorthAmericaRegions />
    </div>
  );
}
