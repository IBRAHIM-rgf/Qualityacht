// /charters/destinations/bahamas — page destination (client 2026-09-27/28) :
// hero video (meme hero que la page Caraibes : kicker, titre, trait, sous-titre,
// 2 boutons — titre centre dans le hero), eclat, grille des 8 iles,
// « Destinations by Region », « Popular Destinations », bandeau CTA et FAQ.
// Les props servent au parcours Day Charter (/charters/day-charter/bahamas),
// comme pour les Caraibes ; les defauts laissent cette page inchangee.

import Link from 'next/link';
import VideoHero from '@/components/vibe/VideoHero';
import { BahamasIslandsGrid, BahamasDestinationsByRegion, BahamasCtaAndFaq } from './BahamasRegions';
import BahamasPopularDestinations from './BahamasPopularDestinations';
import BahamasEclat from './BahamasEclat';

const HERO = '/media/client/lydie/2026-09-27/bahamas-hero';

export default function BahamasRoutePage({
  quoteHref = '/request-quote',
  heroOverTitle = null,
  quoteLabel = 'Design Your Charter',
  heroRuleColor = null,
  // Parcours Last Minute (/charters/last-minute/bahamas) : pastille et sous-titre.
  heroKicker = 'Qualityacht · Bahamas',
  heroSubtitle = 'The Ultimate Luxury Yachting Destination',
  // Video du hero : par defaut celle des Bahamas ; le parcours Last Minute passe
  // sa propre video (client 2026-09-30).
  heroVideo = `${HERO}/hero.mp4`,
  heroPoster = `${HERO}/poster.jpg`,
  // Cases « Bahamas Islands » cliquables vers la page de chaque groupe d'iles
  // (client 2026-10-02) : uniquement sur /charters/destinations/bahamas.
  islandLinks = true,
}) {
  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-clip">
      <VideoHero
        videoLandscape={heroVideo}
        posterLandscape={heroPoster}
        kicker={heroKicker}
        overTitle={heroOverTitle}
        ruleColor={heroRuleColor}
        title="The Bahamas"
        subtitle={heroSubtitle}
        align="center"
        // Titre descendu au centre vertical du hero (client 2026-09-29).
        contentClassName="pt-[210px] md:pt-[190px]"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={quoteHref}
            className="inline-flex min-h-[48px] max-w-full items-center justify-center text-center rounded-full border border-[#C0C0C0] bg-[#26272a] px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
          >
            {quoteLabel}
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#C0C0C0] bg-[#26272a]/40 backdrop-blur-sm px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C0C0C0] transition-colors duration-300 hover:border-[#c2622a] hover:text-[#c2622a] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
          >
            Contact a Broker
          </Link>
        </div>
      </VideoHero>
      {/* Eclat (cartes flottantes), comme la page Caraibes : juste sous le hero. */}
      <BahamasEclat />
      <BahamasIslandsGrid linked={islandLinks} />
      <BahamasDestinationsByRegion />
      <BahamasPopularDestinations />
      <BahamasCtaAndFaq />
    </div>
  );
}
