import Text4Images2Section from "../components/sections/new/Text4Images2Section";
import Text4ImagesSection from "../components/sections/new/Text4Images";
import Text2imagesSection from "../components/sections/new/text2images";
import ImageTextImage from "../components/sections/new/ImageTextImage";
import FAQAccordion from "../components/sections/common/FAQAccordion";
import FullWidthBanner from "../components/sections/common/FullWidthBanner";
import HeroImageBackground from "../components/sections/common/HeroImageBackground";
import TestimonialsSlider from "../components/sections/common/TestimonialsSlider";
import ThreeColumnFeatures from "../components/sections/common/ThreeColumnFeatures";
import TimelineSection from "../components/sections/common/TimelineSection";

const realEstateSections = [
  {
    chooseSection: 0,
    title: "Real Estate",
    content: "Discover our Real Estate opportunities. (Content coming soon)",
    images: [
      "/images/new/pexels-valentina-bondarenko-111153662-10076104.jpg"
    ]
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

export default function RealEstatePage() {
  return (
    <main>
      {realEstateSections.map((section, idx) => {
        const SectionComponent = sectionComponents[section.chooseSection ?? (idx % sectionComponents.length)];
        return (
          <SectionComponent
            key={idx}
            {...section}
          />
        );
      })}
    </main>
  );
}