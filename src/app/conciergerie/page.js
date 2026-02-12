import Text4ImagesSection from "../components/sections/new/Text4Images";

// Section conciergerie
const conciergerieSection = {
  title: "Exclusive Concierge Services",
  content:
    "Beyond expert yacht management, we provide bespoke concierge services designed to elevate your cruising experience to unparalleled levels of comfort and ease. Leveraging our privileged network across the Mediterranean and Caribbean, we expertly coordinate every detail of your voyages.\n\nFrom securing premier berths to arranging exclusive accommodations and dining tailored to your preferences, we orchestrate seamless travel experiences that reflect your lifestyle and desires. Always at your service, we remain available to address any requests or inquiries, ensuring your journeys are as effortless as they are memorable.",
  images: [
    "/images/management/photo-1586859392094-6f2017b22a03 (1).jpeg",
    "/images/management/photo-1632468168457-a4c82df30e8c.jpeg",
    "/images/management/photo-1650006326113-7e83026a7f32.jpeg",
    "/images/management/photo-1650006326113-7e83026a7f32 (1).jpeg"
  ],
};

export default function ConciergeriePage() {
  return (
    <main className="bg-[#2e2f32] pt-9"
      style={{ backgroundImage: 'url(/images/nuagesAncien.png)', backgroundSize: 'contain', backgroundPosition: 'center' }}
    >
      <Text4ImagesSection
        title={conciergerieSection.title}
        content={conciergerieSection.content}
        images={conciergerieSection.images}
      />
    </main>
  );
}
