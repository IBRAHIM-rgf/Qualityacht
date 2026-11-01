import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackButton from "./components/BackButton";
import ScrollRise from "./components/ScrollRise";
import { Michroma, Montserrat } from 'next/font/google';
import { JsonLd, ORGANIZATION_LD } from '@/components/seo/JsonLd';

const michroma = Michroma({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-michroma',
});

// Police de CORPS de texte par defaut (alternative gratuite proche de Proxima Nova)
const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const eurostileFont = localFont({
  src: "./fonts/eurostile-2-extended.ttf",
  variable: "--font-eurostile",
});


const trajanRegular = localFont({
  src: "./fonts/TrajanPro-Regular.ttf",
  variable: "--font-trajan-regular",
  weight: "400",
});

const trajanBold = localFont({
  src: "./fonts/TrajanPro-Bold.otf",
  variable: "--font-trajan-bold",
  weight: "700",
});

export const metadata = {
  // SEO etape 1 (client 2026-11-01) : adresse principale du site, base de toutes les URL
  // de metadonnees (canonical, Open Graph, images).
  metadataBase: new URL("https://www.qualityacht.ch"),
  title: "Qualityacht - Luxury Yacht Charters",
  keywords: "yacht, luxury, charter, sailing, adventure, travel, bespoke services, yacht management, yacht sales",
  authors: [{ name: "Qualityacht" }],
  creator: "Qualityacht",
  publisher: "Qualityacht",
  openGraph: {
    title: "Qualityacht - Luxury Yacht Charters",
    description: "Explore the world of luxury yacht charters with Qualityacht. Experience bespoke services, adrenaline, elegance, and discovery.",
    url: "./",
    siteName: "Qualityacht",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Qualityacht - Luxury Yacht Charters",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qualityacht - Luxury Yacht Charters",
    description: "Explore the world of luxury yacht charters with Qualityacht. Experience bespoke services, adrenaline, elegance, and discovery.",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
  themeColor: "#1b223d",
  colorScheme: "dark light",
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
  applicationName: "Qualityacht",
  appleWebApp: {
    capable: true,
    title: "Qualityacht",
    statusBarStyle: "black-translucent",
  },
  manifest: "/manifest.json",
  category: "Travel & Leisure", 
  description: "Explore the world of luxury yacht charters with Qualityacht. Experience bespoke services, adrenaline, elegance, and discovery.",
  // Canonical = adresse de la page elle-meme sur qualityacht.ch (avant : ancienne adresse
  // Vercel pour toutes les pages). Liens /en et /fr retires : ces pages n'existent pas.
  alternates: {
    canonical: "./",
  },
  verification: {
    google: "google-site-verification-code",
    bing: "bing-site-verification-code",
    yandex: "yandex-site-verification-code",
  },
  twitterCard: "summary_large_image",
  twitterSite: "@Qualityacht",
  twitterCreator: "@Qualityacht",
  twitterTitle: "Qualityacht - Luxury Yacht Charters",
  twitterDescription: "Explore the world of luxury yacht charters with Qualityacht. Experience bespoke services, adrenaline, elegance, and discovery.",
  twitterImage: "/images/og-image.jpg",
  twitterImageAlt: "Qualityacht - Luxury Yacht Charters",   
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${michroma.variable} ${geistMono.variable} ${eurostileFont.variable} ${trajanRegular.variable} ${trajanBold.variable} ${montserrat.variable} `}>
      <body className="bg-[#303135] text-gray-900 antialiased flex flex-col min-h-screen">
        {/* Donnees structurees : Qualityacht + site (SEO etape 4, client 2026-11-01). */}
        <JsonLd data={ORGANIZATION_LD} />
        <Header />
        <BackButton />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Montee des textes au scroll sur TOUT le site (voir ScrollRise + globals.css) */}
        <ScrollRise />
      </body>
    </html>
  );
}
