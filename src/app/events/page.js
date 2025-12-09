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

const eventsSections = [
  {
    chooseSection: 6, // HeroImageBackground
    title: "Exclusive Event Experiences",
    subtitle: "Create unforgettable moments at sea and on land",
    buttonText: "Plan Your Event",
    backgroundImage: "/images/new/photo-1722009040906-0fc91b7e2942.jpeg",
  },
  {
    chooseSection: 1, // Text4ImagesSection
    title: "Tailor-Made Celebrations",
    content: "From intimate dinners to grand galas, our team curates unique experiences with attention to every detail. Imagine your wedding, corporate gathering, or private celebration in an exceptional setting.",
    images: [
      "/images/events/dinner.jpg",
      "/images/events/gala.jpg",
      "/images/events/wedding.jpg",
      "/images/events/corporate.jpg"
    ]
  },
  {
    chooseSection: 8, // ThreeColumnFeatures
    title: "Why Choose Our Event Services",
    features: [
      { icon: "Calendar", title: "Personalized Planning", content: "Every event is customized to your vision, from theme to logistics." },
      { icon: "Star", title: "Luxury Venues", content: "Access to prestigious yachts, villas, and exclusive locations worldwide." },
      { icon: "Users", title: "Professional Staff", content: "Our experienced crew and event specialists ensure flawless execution." }
    ],
    images: []
  },
  {
    chooseSection: 7, // TestimonialsSlider
    title: "What Our Clients Say",
    testimonials: [
      { avatar: "/images/avatars/emma.jpg", name: "Emma R.", content: "Our wedding onboard was magical, beyond our dreams.", role: "Bride" },
      { avatar: "/images/avatars/marc.jpg", name: "Marc D.", content: "The corporate retreat was perfectly orchestrated, our team was impressed.", role: "CEO" }
    ],
    images: []
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

export default function EventsPage() {
  return (
    <main>
      {eventsSections.map((section, idx) => {
        const SectionComponent = sectionComponents[section.chooseSection ?? (idx % sectionComponents.length)];
        // Correction : passer toutes les props, pas seulement title/content/images
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