// ══ /contact ══
// Nouvelle page contact (client, 2026-09-17) : section fournie dans
// contact-section.html, adaptee aux composants et a la charte du site.
import ContactSection from './ContactSection';

export const metadata = {
  title: 'Contact | Qualityacht',
  description:
    'Tell us which experience you have in mind — charter, sales or luxury experiences — and our concierge team will prepare a discreet, personalised response.',
};

export default function ContactPage() {
  return (
    <main className="bg-[#26272a] text-[#acb0cd]">
      <ContactSection />
    </main>
  );
}
