import Image from "next/image";
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

const fineFoodDiningSections = [
  {
    chooseSection: 0,
    title: "Fine Food & Dining",
    content: "Discover our Fine Food & Dining selection. (Content coming soon)",
    images: [
      "/images/new/17500843321894246574840682884355.jpg"
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

export default function FineFoodDiningPage() {
  return (
    <main>
      {fineFoodDiningSections.map((section, idx) => {
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