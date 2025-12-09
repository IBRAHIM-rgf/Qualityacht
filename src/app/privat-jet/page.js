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

// Exemple de structure de sections pour la page
const privatJetSections = [
  {
    chooseSection: 0, // 0 = Text4Images2Section
    title: "Private Jet Experience",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    images: [
      "/images/gridLosange/jet2.png",
      "/images/new/invest.jpg",
      "/images/new/FB_IMG_1749967381497.jpg",
      "/images/new/photo-1715627211239-f9961ad5f794.jpeg"
    ]
  },
  {
    chooseSection: 1, // 1 = Text4ImagesSection
    title: "Onboard Services",
    content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    images: [
      "/images/new/pexels-gibran-riojas-2153089565-32551597.jpg",
      "/images/new/fillemasque.png",
      "/images/new/17500843321894246574840682884355.jpg",
      "/images/new/invest.jpg"
    ]
  },
  {
    chooseSection: 2, // 2 = Text2imagesSection
    title: "Your Crew",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    images: [
      "/images/gridLosange/cheval2.png",
      "/images/new/realestate.jpeg"
    ]
  },
  {
    chooseSection: 3, // 3 = ImageTextImage
    title: "Destinations",
    content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    images: [
      "/images/new/pexels-valentina-bondarenko-111153662-10076104.jpg",
      "/images/gridLosange/luxury.png"
    ]
  }
];

// Tableau des composants disponibles
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

export default function PrivatJetPage() {
  return (
    <main>
      {privatJetSections.map((section, idx) => {
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