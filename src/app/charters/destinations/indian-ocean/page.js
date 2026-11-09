// /charters/destinations/indian-ocean — page destination (client 2026-11-09), sur le
// modele de /charters/destinations/north-america : hero, cases des 7 regions, « Destinations
// by Region » (tableau client, sans Arabian Sea / Gulf of Oman) et bandeau CTA.
// Medias provisoires (choix du client) : image Indian Ocean deja sur le site, en attendant
// la video hero et les photos du client. Remplace l'ancienne liste de bateaux : chaque case
// ouvre la page des bateaux de sa region.

import { seo } from '@/lib/seoMeta';
import Link from 'next/link';
import VideoHero from '@/components/vibe/VideoHero';
import IndianOceanRegionCards from './IndianOceanRegionCards';
import IndianOceanRegions from './IndianOceanRegions';
import IndianOceanCta from './IndianOceanCta';
import { IO_CARD_PHOTO } from './indianOceanGroups';

// Titre et description Google (SEO etape 3, client 2026-11-01).
export const metadata = seo('/charters/destinations/indian-ocean');

export default function IndianOceanPage() {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-clip">
      <VideoHero
        posterLandscape={IO_CARD_PHOTO}
        kicker="Qualityacht · Indian Ocean"
        title="Indian Ocean"
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
      <IndianOceanRegionCards />
      <IndianOceanRegions />
      <IndianOceanCta />
    </div>
  );
}
