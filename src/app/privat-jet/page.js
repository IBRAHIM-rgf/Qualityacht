'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { destinations } from './data';
import VideoHero from '@/components/vibe/VideoHero';
import { one } from '@/lib/quality-media';

// Hero : vidéo "ciel nuageux" (au-dessus des nuages, coucher de soleil) — remplace
// l'ancien hero photo sombre.
const cloudsVideo = one({ cat: 'aerial', kind: 'video', role: 'hero-bg', orientation: 'landscape' });

// ── Card ───────────────────────────────────────────────────────────────────────
function DestCard({ dest }) {
  return (
    <Link
      href={`/privat-jet/${dest.slug}`}
      className="min-w-0 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform cursor-pointer"
    >
      <div className="w-full relative mb-6 overflow-hidden h-48 rounded-xl">
        <Image src={dest.image} alt={dest.name} fill className="object-cover rounded-xl" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <h2 className="text-lg font-semibold text-[#acb0cd] mb-2 trajan-regular uppercase text-center break-words leading-tight w-full hyphens-auto hover:text-[#c2622a] transition-colors duration-300">
        {dest.name}
      </h2>
    </Link>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function PrivatJetPage() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) el.classList.add('revealed'); });
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-hidden">
      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 2.8s ease, transform 2.8s ease; }
        .reveal-up.revealed { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* ══ HERO VIDEO — ciel nuageux (au-dessus des nuages), remplace l'ancien hero sombre ══ */}
      <VideoHero
        videoLandscape={cloudsVideo?.src}
        posterLandscape={cloudsVideo?.poster}
        title="Private Jets"
        subtitle="Your Gateway to Every Destination"
        height="tall"
        objectPosition="top"
      />

      {/* ══ GRILLE ══ */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat py-24 px-4"
        style={{ backgroundImage: "url('/images/services-bg.png')" }}
      >
        {/* text-balance : le titre remplissait la largeur bord a bord et se
            coupait mal selon la fenetre (releve "Coupe ?" du document client).
            Meme traitement que "Contact Broker Jet". */}
        <h2 className="text-3xl md:text-5xl font-bold trajan-regular mb-4 text-center uppercase tracking-wide text-balance max-w-4xl" style={{ color: '#acb0cd' }}>
          Private Jet Destinations
        </h2>
        <Image src="/images/title-line.png" alt="" width={200} height={10} className="mx-auto mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
          {destinations.map((dest) => (
            <DestCard key={dest.slug} dest={dest} />
          ))}
        </div>
      </section>
    </div>
  );
}
