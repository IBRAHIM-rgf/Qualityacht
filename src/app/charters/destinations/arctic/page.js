// /charters/destinations/arctic — page destination Arctic, comme Indian Ocean (client
// 2026-11-19) : hero, cases (chacune ouvre sa page de region), Destinations by Region.
// La liste des bateaux en bas de page a ete retiree (client 2026-11-19).
// Hero video (client 2026-11-18), comme la page Antarctica.
import { seo } from '@/lib/seoMeta';
import Link from 'next/link';
import VideoHero from '@/components/vibe/VideoHero';
import ArcticRegions from './ArcticRegions';
import ArcticRegionCards from './ArcticRegionCards';
import BahamasPopularDestinations from '../bahamas/BahamasPopularDestinations';
import ArcticCta from './ArcticCta';
import ArcticEclat from './ArcticEclat';

const HERO = '/media/client/2026-11-18/arctic-hero';

// Ronds fleurs (client 2026-11-20), comme Indian Ocean : photo filtree au repos,
// couleur au survol. Ordre du client.
const F = '/media/client/2026-11-20/arctic-flowers';
const ARCTIC_FLOWERS = [
  { name: 'Greenland', slug: 'greenland', rest: `${F}/greenland-filtered.webp`, hover: `${F}/greenland-color.webp` },
  { name: 'Svalbard', slug: 'svalbard', rest: `${F}/svalbard-filtered.webp`, hover: `${F}/svalbard-color.webp` },
  { name: 'Northern Norway', slug: 'northern-norway', rest: `${F}/northern-norway-filtered.webp`, hover: `${F}/northern-norway-color.webp` },
  { name: 'Iceland', slug: 'iceland', rest: `${F}/iceland-filtered.webp`, hover: `${F}/iceland-color.webp` },
  { name: 'Canadian Arctic', slug: 'canadian-arctic', rest: `${F}/canadian-arctic-filtered.webp`, hover: `${F}/canadian-arctic-color.webp` },
];

// Titre et description Google (SEO etape 3, client 2026-11-01).
export const metadata = seo('/charters/destinations/arctic');
export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <>
      <div className="bg-[#26272a] text-[#acb0cd] overflow-x-clip">
        <VideoHero
          videoLandscape={`${HERO}/hero.mp4`}
          posterLandscape={`${HERO}/poster.jpg`}
          kicker="Qualityacht · Arctic"
          title="The Arctic"
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
      {/* Eclat (cartes flottantes), comme Antarctica : juste sous le hero (client 2026-11-24). */}
      <ArcticEclat />
      {/* Cases Arctic (client 2026-11-19), comme Indian Ocean. */}
      <ArcticRegionCards />
      <ArcticRegions />
      <BahamasPopularDestinations items={ARCTIC_FLOWERS} />
      {/* Image du bas + CTA (client 2026-11-21), comme Antarctica. */}
      <ArcticCta />
    </>
  );
}
