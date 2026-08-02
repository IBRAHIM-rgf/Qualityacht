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
import WorldPinsMap from "@/components/vibe/WorldPinsMap";
import FunMarquee from "@/components/vibe/FunMarquee";
import { media } from "@/lib/quality-media";

// Pool d'images (aerien / plage / divers) pour illustrer les evenements + le marquee.
const IMG_POOL = [
  ...media({ cat: "aerial", kind: "image" }),
  ...media({ cat: "divers", kind: "image" }),
  ...media({ cat: "beach", kind: "image" }),
  ...media({ cat: "boats", kind: "image" }),
].map((m) => m.src);

// Evenements luxe dans le MONDE (selection editoriale, a titre indicatif).
const WORLD_EVENTS = [
  { name: "St Barth Bucket Regatta", place: "Gustavia — St-Barth", when: "March", badge: "Regatta", coords: [17.897, -62.851], desc: "The world’s finest superyachts race off St-Barth." },
  { name: "Les Voiles de St-Barth", place: "St-Barthélemy", when: "April", badge: "Sailing", coords: [17.90, -62.83], desc: "A week of racing and beachfront soirées." },
  { name: "Antigua Sailing Week", place: "Antigua", when: "Apr–May", badge: "Regatta", coords: [17.05, -61.75], desc: "The Caribbean’s legendary end-of-season regatta." },
  { name: "Monaco Grand Prix", place: "Monaco", when: "May", badge: "Motorsport", coords: [43.735, 7.421], desc: "Formula 1 through the streets — the ultimate yachting weekend." },
  { name: "Monaco Yacht Show", place: "Port Hercule — Monaco", when: "September", badge: "Yachting", coords: [43.735, 7.427], desc: "The superyacht world gathers in the principality." },
  { name: "Cannes Film Festival", place: "Cannes", when: "May", badge: "Culture", coords: [43.551, 7.017], desc: "Red carpet by day, yacht parties by night." },
  { name: "Les Voiles de St-Tropez", place: "St-Tropez", when: "October", badge: "Sailing", coords: [43.272, 6.640], desc: "Classic and modern yachts close the Med season." },
  { name: "Art Basel", place: "Basel", when: "June", badge: "Art", coords: [47.564, 7.591], desc: "The world’s premier modern & contemporary art fair." },
  { name: "Art Basel Miami Beach", place: "Miami", when: "December", badge: "Art", coords: [25.79, -80.13], desc: "Art, design and winter-sun glamour." },
  { name: "Venice Biennale", place: "Venice", when: "Apr–Nov", badge: "Art", coords: [45.435, 12.335], desc: "The most prestigious art biennial in the world." },
  { name: "Royal Ascot", place: "Ascot — UK", when: "June", badge: "Racing", coords: [51.411, -0.681], desc: "Racing, hats and Royal Enclosure tradition." },
  { name: "F1 Abu Dhabi Grand Prix", place: "Yas Marina — Abu Dhabi", when: "December", badge: "Motorsport", coords: [24.467, 54.603], desc: "Season finale with marina berths at the circuit." },
].map((e, i) => ({ ...e, img: IMG_POOL[i % IMG_POOL.length] }));

const EVENT_MARQUEE = IMG_POOL.slice(0, 10).map((src, i) => ({ src, accent: i % 2 ? "#ff7a59" : "#2fd6c4" }));

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

      {/* Rouleau d'images + planisphere des evenements luxe dans le monde */}
      <section className="bg-[#26272a] py-10 md:py-14">
        <FunMarquee items={EVENT_MARQUEE} speed={52} direction="left" />
      </section>
      <WorldPinsMap
        items={WORLD_EVENTS}
        kicker="Around The World"
        title="The Luxury Events Calendar"
        intro="From the St Barth Bucket to the Monaco Grand Prix and Art Basel — we place you where the world’s elite gathers, by land and by sea. Editorial selection; dates and access confirmed by concierge."
      />
    </main>
  );
}