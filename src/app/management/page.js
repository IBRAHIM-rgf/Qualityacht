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

// Copie du JSON directement dans la page
const managementSections = [
  {
    title: "International Yacht Management",
    content:
      "At the heart of every successful yacht acquisition lies a deep understanding of your lifestyle, aspirations, and specific expectations. That’s why we take the time to explore your preferences — from motor or sailing yacht, to size, performance, interior volume, and guest capacity. We also advise you on crew configuration and assist you in defining whether your yacht will be reserved exclusively for private use or entrusted to our refined charter management service. This highly personalised approach allows us to present only the most fitting opportunities — ensuring your future yacht is a true reflection of your world and the excellence you seek at sea.",
    images: [
      "/images/management/first3.jpg",
      "/images/management/first1.jpg",
      "/images/management/first4.jpg",
      "/images/management/first2.jpg",
    ],
    chooseSection: 0,
  },
  {
    title: null,
    content:
      "In today’s sophisticated maritime landscape, the sea has become a highly regulated domain, where legal navigation demands meticulous oversight. Yacht owners and their crews must adhere to a complex framework of international maritime conventions, safety protocols, and fiscal obligations tied to the vessel’s flag — all within an environment shaped by constant technological advancement.\n\nGiven the substantial financial stakes involved in the management of a yacht, enlisting a distinguished and experienced management company is not just a strategic advantage — it is an essential safeguard. We provide shipowners with a comprehensive operational vision, enabling them to optimize their expenditures with precision and confidence.\n\nOur role is equally strategic and protective: we stand as vigilant custodians of our clients’ interests and assets, ensuring every decision aligns with their long-term goals. Unbounded by geography, our operational reach extends across all seas, accompanying each vessel wherever it may voyage.",
    images: [
      "/images/management/Internatio 2 rempl  les deux femmes.png",
      "/images/management/Interna2crempl le livre des comptes management.png",
      "/images/management/International 2 rempl calcula.png",
      "/images/management/International1.png"
    ],
    chooseSection: 1,
  },
  {
    title: "Strategic Berth and Port Management",
    content:
      "As seasoned yachting professionals, we provide seamless, high-level management of your vessel’s positioning and transitions between ports. From the meticulous planning of berth allocations to the smooth coordination of movements between moorings, we handle every detail with precision and discretion.\n\nThroughout the year, we ensure your yacht is granted priority access to the most prestigious marinas, securing prime berths in alignment with your cruising calendar. Our expertise also allows us to advise you on the most suitable ports of call — taking into account your lifestyle, seasonal preferences, and the unique specifications of your vessel.\n\nWith us, the logistics of movement become effortless, ensuring your yacht is always exactly where it should be, when it should be.",
    images: [
      "/images/management/Strategic.png",
      "/images/management/Strategic2.png",
      "/images/management/photo-1650006326113-7e83026a7f32.jpeg",
      "/images/management/photo-1650006326113-7e83026a7f32 (1).jpeg"
    ],
    chooseSection: 2,
  },
  {
    title: "Shipyard Planning and Strategic Maintenance Coordination",
    content:
      "Beyond the meticulous management of your yacht’s berths and movements, we orchestrate every aspect of shipyard preparation with foresight and precision. By aligning closely with your personal cruising schedule, we ensure that all maintenance operations are strategically planned to minimise any disruption to your enjoyment of the vessel.\n\nOur proactive approach allows us to anticipate essential servicing, repairs, or upgrades — ensuring that every intervention at the shipyard is both timely and discreet. The result is a vessel that is always impeccably maintained, ready to sail in complete safety and elegance, whenever you desire.",
    images: [
      "/images/management/Shipyard5.png",
      "/images/management/Shipyard4.png",
      "/images/management/Shipyard.png",
      "/images/management/Shipyard2.jpeg",
    ],
    chooseSection: 3,
  },
  {
    title: "Winterization & Seasonal Preservation",
    content:
      "Preserving the longevity and pristine condition of your yacht begins with a meticulous winterization process. This essential phase ensures not only the protection of your vessel during the off-season but also a seamless return to the sea when the next yachting season arrives.\n\nWe oversee every detail of the winterization procedure — from thorough cleaning and technical preparation to securing the most suitable and secure storage facilities tailored to your vessel’s specifications. Our proactive stewardship guarantees that your yacht remains safeguarded against the elements, preserving its performance, aesthetics, and mechanical integrity for the seasons ahead.",
    images: [
      "/images/management/witerznitation.png",
      "/images/management/witertination.png",
      "/images/management/Winterization3.jpg",
      "/images/management/winsternization.png",
    ],
    chooseSection: 0,
  },
  {
    title: "Modernisation & Refit Scheduling",
    content:
      "The orchestration of your vessel’s repair and modernisation schedule is a key component of refined yacht management. At the close of each season, we compile a comprehensive and structured report — integrating insights from both crew and guest feedback — outlining all necessary upgrades, refinements, and technical interventions.\n\nEach recommendation is meticulously prioritised, empowering you to make informed decisions aligned with your vision, expectations, and investment strategy. From there, we craft a bespoke work schedule, balancing urgency, aesthetics, and budget — ensuring that your yacht continues to reflect the highest standards of comfort, safety, and sophistication.",
    images: [
      "/images/management/Modernisation.webp",
      "/images/management/Modernisation et refit à la place du bridge bureau.png",
      "/images/management/.jpeg",
      "/images/management/.jpeg"
    ],
    chooseSection: 2,
  },
  {
    title: "Financial Oversight & Budgetary Excellence",
    content:
      "At the heart of our yacht management philosophy lies a rigorous commitment to financial transparency and control. As trusted stewards of your vessel, we deliver precise, itemised accounting — offering you a comprehensive and real-time view of all expenditures.\n\nThis clarity empowers you to navigate your budget with confidence, ensuring that every financial decision aligns seamlessly with your strategic objectives. Our team remains at your disposal to provide guidance, answer any inquiries, and help you interpret the nuances of your yacht’s financial management, with the same discretion and professionalism that define all our services.",
    images: [
      "/images/management/photo-1658899817643-0f1c74149717.jpeg",
      "/images/management/Engine-Control-Room-768x512 (1).jpg",
      "/images/management/FB_IMG_1757344921683.jpg",
      "/images/management/ai-generated-8585737_1280.jpg"
    ],
    chooseSection: 2,
  },
  {
    title: "Comprehensive Maintenance & Technical Stewardship",
    content:
      "Preserving the integrity and performance of your yacht begins with meticulous, ongoing maintenance. Our network of highly qualified professionals, combined with our trusted partners across the industry, ensures that every aspect of your vessel is cared for with the utmost precision and excellence.\n\nFrom routine servicing to complex technical interventions, we respond swiftly and expertly to all maintenance requirements. Our proactive oversight guarantees that your yacht remains in impeccable condition — always ready to set sail in total safety, comfort, and elegance.",
    images: [
      "/images/management/gros-plan-de-deux-femmes-d-affaires-se-serrant-la-main-et-assis-au-bureau.jpg",
      "/images/management/ledger-1428230_1280.jpg",
      "/images/management/new-year-1680905_1280.jpg",
      "/images/management/photo-1586859392094-6f2017b22a03.jpeg"
    ],
    chooseSection: 3,
  },
  // {
  //   title: "Tailored Insurance Solutions for Vessel & Crew",
  //   content:
  //     "Insurance is a cornerstone of responsible yacht ownership, ensuring peace of mind for both owner and crew. Navigating the complexities of maritime insurance requires expertise and discernment — qualities we bring to every client relationship.\n\nAs your trusted advisors, we guide you in selecting insurance solutions that are precisely aligned with the profile of your vessel, the composition of your crew, and your operational expectations. From hull coverage to crew welfare, we help you secure optimal protection — discreetly and efficiently — while respecting your financial framework.",
  //   images: [
  //     "/images/management/photo-1586859392094-6f2017b22a03 (1).jpeg",
  //     "/images/management/photo-1632468168457-a4c82df30e8c.jpeg",
  //     "/images/management/photo-1650006326113-7e83026a7f32.jpeg",
  //     "/images/management/photo-1650006326113-7e83026a7f32 (1).jpeg"
  //   ],
  //   chooseSection: 0,
  // },
  {
    title: "Coordination & Oversight of External Providers",
    content:
      "We handle the seamless coordination and supervision of all external service providers involved in the maintenance and repair of your vessel. From scheduling appointments to ensuring timely execution, we oversee each phase with diligence and discretion.\n\nFollowing every onboard intervention, we provide you with a detailed photographic report accompanied by clear explanations, allowing you to monitor progress remotely with full transparency. We ensure that every professional involved meets the highest standards of craftsmanship, adheres to deadlines, and delivers quality work consistent with your expectations.\n\nThroughout the process, we remain your dedicated point of contact — available to answer any questions and keep you continuously informed.",
    images: [
      "/images/management/photo-1658899817643-0f1c74149717.jpeg",
      "/images/management/Engine-Control-Room-768x512 (1).jpg",
      "/images/management/FB_IMG_1757344921683.jpg",
      "/images/management/ai-generated-8585737_1280.jpg"
    ],
    chooseSection: 1,
  },
  {
    title: "Flag Administration & Regulatory Compliance",
    content:
      "We oversee the full management of your vessel’s flag-related obligations with discretion and precision. From monitoring compliance requirements to coordinating mandatory annual surveys, we ensure that your yacht remains in full accordance with the applicable maritime regulations and international standards.\n\nOur team handles all administrative procedures, guarantees the validity of essential documentation and certifications, and provides continuous support throughout the compliance process. Acting as your trusted liaison, we ensure that your vessel’s registration remains impeccably managed, freeing you from bureaucratic complexity while safeguarding your legal standing across all jurisdictions.",
    images: [
      "/images/management/Flag management.png",
      "/images/management/flag.png",
      "/images/management/new-year-1680905_1280.jpg",
      "/images/management/photo-1586859392094-6f2017b22a03.jpeg"
    ],
    chooseSection: 2,
  },
  {
    title: "Vessel Registration & Tax Optimization",
    content:
      "The registration of your vessel, combined with the strategic optimisation of fiscal and administrative processes, demands vigilant expertise and an up-to-date understanding of maritime law and taxation frameworks.\n\nWe stand beside you at every step, guiding the registration process with precision while advising on the most advantageous fiscal and administrative structures tailored to your unique circumstances. Ensuring full compliance with prevailing regulations and standards, we meticulously manage all required documentation and certifications.\n\nOur dedicated support extends beyond administration — we remain readily available to address your queries and to facilitate a seamless and efficient management of your vessel’s legal and fiscal obligations.",
    images: [
      "/images/management/photo-1586859392094-6f2017b22a03 (1).jpeg",
      "/images/management/photo-1632468168457-a4c82df30e8c.jpeg",
      "/images/management/photo-1650006326113-7e83026a7f32.jpeg",
      "/images/management/photo-1650006326113-7e83026a7f32 (1).jpeg"
    ],
    chooseSection: 3,
  },
  // {
  //   title: "Crew Recruitment & Tailored Placement",
  //   content:
  //     "As expert ship managers, we leverage our extensive network and industry insight to identify and secure crew members who perfectly align with your specific requirements and standards. We take the time to fully understand your selection criteria, ensuring a bespoke recruitment strategy that targets highly qualified and experienced professionals.\n\nOur commitment is to assemble a crew that not only meets your operational needs but also integrates seamlessly with the spirit and ethos of your vessel, elevating the onboard experience to the highest level of excellence.",
  //   images: [
  //     "/images/management/photo-1658899817643-0f1c74149717.jpeg",
  //     "/images/management/Engine-Control-Room-768x512 (1).jpg",
  //     "/images/management/FB_IMG_1757344921683.jpg",
  //     "/images/management/ai-generated-8585737_1280.jpg"
  //   ],
  //   chooseSection: 0,
  // },
  {
    title: "Exclusive Concierge Services",
    content:
      "Beyond expert yacht management, we provide bespoke concierge services designed to elevate your cruising experience to unparalleled levels of comfort and ease. Leveraging our privileged network across the Mediterranean and Caribbean, we expertly coordinate every detail of your voyages.\n\nFrom securing premier berths to arranging exclusive accommodations and dining tailored to your preferences, we orchestrate seamless travel experiences that reflect your lifestyle and desires. Always at your service, we remain available to address any requests or inquiries, ensuring your journeys are as effortless as they are memorable.",
    images: [
      "/images/management/photo-1586859392094-6f2017b22a03 (1).jpeg",
      "/images/management/photo-1632468168457-a4c82df30e8c.jpeg",
      "/images/management/photo-1650006326113-7e83026a7f32.jpeg",
      "/images/management/photo-1650006326113-7e83026a7f32 (1).jpeg"
    ],
    chooseSection: 1,
  },
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

export default function ManagementPage() {
  return (
    <main className="bg-[#0B132B] pt-9"
    style={{ backgroundImage: 'url(/images/nuagesAncien.png)', backgroundSize: 'contain', backgroundPosition: 'center' }} // corrected 'conyain' to 'contain'
    >
      {managementSections.map((section, idx) => {
        const SectionComponent = sectionComponents[section.chooseSection ?? (idx % sectionComponents.length)];
        return (
          <SectionComponent
            key={idx}
            title={section.title}
            content={section.content}
            images={section.images}
          />
        );
      })}
    </main>
  );
}