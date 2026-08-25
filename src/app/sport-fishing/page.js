import Text4Images2Section from "../components/sections/new/Text4Images2Section";
import FishingZonesMap from "./FishingZonesMap";
import Text4ImagesSection from "../components/sections/new/Text4Images";
import Text2imagesSection from "../components/sections/new/text2images";
import ImageTextImage from "../components/sections/new/ImageTextImage";
import FAQAccordion from "../components/sections/common/FAQAccordion";
import FullWidthBanner from "../components/sections/common/FullWidthBanner";
import HeroImageBackground from "../components/sections/common/HeroImageBackground";
import TestimonialsSlider from "../components/sections/common/TestimonialsSlider";
import ThreeColumnFeatures from "../components/sections/common/ThreeColumnFeatures";
import TimelineSection from "../components/sections/common/TimelineSection";

const sportFishingSections = [
  {
    chooseSection: 0,
    title: "Sport Fishing",
    content: "Discover our Sport Fishing experiences. (Content coming soon)",
    images: [
      "/images/gridLosange/fish.jpg"
    ],
    // Activite nautique : la flotte Caraibes est la seule destination reellement
    // filtrable. Aucun parametre "fishing" n'est lu par /yachts.
    cta: { label: "Explore the Fleet", href: "/yachts?destination=caribbean" }
  }
];

const sectionComponents = [
  Text4Images2Section,
  Text4ImagesSection,
  Text2imagesSection,
  ImageTextImage,
  FAQAccordion,
  FullWidthBanner,
  HeroImageBackground,
  TestimonialsSlider,
  ThreeColumnFeatures,
  TimelineSection,
];

export default function SportFishingPage() {
  return (
    <main>
      {sportFishingSections.map((section, idx) => {
        const SectionComponent = sectionComponents[section.chooseSection ?? (idx % sectionComponents.length)];
        return (
          <SectionComponent
            key={idx}
            {...section}
          />
        );
      })}

      {/* Carte des zones de peche — meme dispositif que la carte des tables
          etoilees : marqueurs au logo Qualityacht, popup au clic. */}
      <FishingZonesMap />
    </main>
  );
}