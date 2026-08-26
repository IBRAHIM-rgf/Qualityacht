"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Bitcoin, MessageCircle, Phone } from "lucide-react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const MOBILE_MENU_ID = 'mobile-menu-panel';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const burgerRef = useRef(null);

  // Escape ferme le menu et rend le focus au bouton, pour ne pas perdre
  // l'utilisateur au clavier.
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  return (
      <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#071E33] to-[#0E2438] text-white shadow-md z-50">
      <div className="michroma leading-none text-center py-4 hidden md:hidden text-lg md:text-2xl text-[#B15333] tracking-wide">
          QUALITYACHT
        </div>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo + desktop nav */}
        <div className="flex items-center gap-4">
          <Link href="/" className="hidden md:block">
            <Image
              src="/images/logoFondTrans.png"
              alt="Qualityacht Logo"
              width={40}
              height={40}
              className="rounded-full md:mr-8"
            />
          </Link>
          
          <div className="hidden md:flex gap-9 text-sm items-center text-white/90">
            <Link href="/charters/on-demand" className="hover:text-white transition">YACHTS FOR<br /> DAY CHARTER</Link>
            <Link href="/charters/destinations" className="hover:text-white transition">Destinations</Link>
          </div>
        <Link
          href="/crypto-payments"
          aria-label="Crypto Payments"
          className="hover:text-white block md:hidden focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
        >
          <Bitcoin aria-hidden />
        </Link>
        </div>
        {/* Center: Brand name */}
        <Link href="/" className="">
        <div className="michroma leading-none block md:block text-sm md:text-2xl text-[#f97316]  tracking-wide">
          QUALITYACHT
        </div>
        </Link>
        {/* Right: Desktop links + Burger mobile */}
        <div className="flex items-center gap-9 text-sm text-white/90">
          <Link href="/charters/last-minute" className="hover:text-white transition hidden md:inline">YACHTS FOR <br />LAST MINUTE</Link>
          {/* `Link` et non `<a>` : un rechargement complet perd le saut vers l'ancre,
              la page etant encore en cours de mise en page quand le navigateur essaie. */}
          <Link href="/#contact" className="hover:text-white transition hidden md:inline">Contact</Link>
          <Link
            href="/crypto-payments"
            aria-label="Crypto Payments"
            className="hover:text-white transition hidden md:block focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
          >
            <Bitcoin aria-hidden />
          </Link>
          <a
            href="https://wa.me/41767365781"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact Qualityacht on WhatsApp"
            title="WhatsApp Qualityacht"
            className="p-2 rounded-full bg-green-700/80 hover:bg-white/20 transition focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
          >
            <div className="relative w-6 h-6">
              <Phone className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" size={10} />
              <MessageCircle className="absolute top-0 left-0 text-white" size={24} strokeWidth={1} />
            </div>
          </a>

          {/* Burger menu mobile only */}
          <button
            ref={burgerRef}
            onClick={() => setIsMenuOpen((v) => !v)}
            className="md:hidden text-white"
            aria-expanded={isMenuOpen}
            aria-controls={MOBILE_MENU_ID}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div id={MOBILE_MENU_ID} className="md:hidden absolute top-full right-0 w-full bg-[#0E2438] text-white shadow-lg z-50 max-h-screen overflow-y-auto">
          {/* Un seul gestionnaire en capture : tout clic sur un lien du menu le referme,
              sans empecher la navigation. Vaut aussi pour le lien WhatsApp. */}
          <nav
            className="flex flex-col p-4 gap-6 text-sm text-[#acb0cd]"
            onClick={(e) => { if (e.target.closest('a')) setIsMenuOpen(false); }}
          >
            
            {/* Services */}
            <div>
              <h3 className="font-semibold mb-3 uppercase underline decoration-[#B87333] underline-offset-8 text-sm tracking-wider">Services</h3>
              <ul className="space-y-2">
                <li><Link href="/charters" className="hover:text-white transition">Yacht Charter</Link></li>
                <li><Link href="/charters/destinations" className="hover:text-white transition">Destinations Charter</Link></li>
                <li><Link href="/sales" className="hover:text-white transition">Sales</Link></li>
                <li><Link href="/management" className="hover:text-white transition">Management</Link></li>
                <li><Link href="/conciergery" className="hover:text-white transition">Conciergery</Link></li>
                <li><Link href="/crypto-payments" className="hover:text-white transition">Crypto Payments</Link></li>
              </ul>
            </div>

            {/* On-Demand Charter */}
            <div>
              <h3 className="font-semibold mb-3 uppercase underline decoration-[#B87333] underline-offset-8 text-sm tracking-wider">On-Demand Charter</h3>
              <ul className="space-y-2">
                <li><Link href="/charters/on-demand" className="hover:text-white transition">On-Demand Yacht Charter</Link></li>
                <li><Link href="/charters/pet-friendly" className="hover:text-white transition">Pet-Friendly Yacht Charter</Link></li>
                <li><Link href="/charters/last-minute" className="hover:text-white transition">Last-Minute Charter</Link></li>
                <li><Link href="/charters/accessible" className="hover:text-white transition">Accessible Charter Yacht</Link></li>
                <li><Link href="/yachts" className="hover:text-white transition">View All Fleet</Link></li>
              </ul>
            </div>

            {/* Other Charters */}
            <div>
              <h3 className="font-semibold mb-3 mt-2 uppercase underline decoration-[#B87333] underline-offset-8 text-sm tracking-wider">Other Charters</h3>
              <ul className="space-y-2">
                <li><Link href="/charters/group" className="hover:text-white transition">Group Yacht Charter</Link></li>
                <li><Link href="/charters/sports" className="hover:text-white transition">Sports Yacht Charter</Link></li>
                <li><Link href="/charters/halal" className="hover:text-white transition">Tailored Halal Private Charter</Link></li>
              </ul>
            </div>

            {/* Destinations */}
            <div>
              <h3 className="font-semibold mb-3 mt-2 uppercase underline decoration-[#B87333] underline-offset-8 text-sm tracking-wider">Destinations</h3>
              <ul className="space-y-2">
                <li><Link href="/charters/destinations" className="hover:text-white transition">All Destinations</Link></li>
                <li><Link href="/charters/destinations/caribbean-v15" className="hover:text-white transition">Caribbean</Link></li>
                <li><Link href="/charters/destinations/western-mediterranean" className="hover:text-white transition">Western Mediterranean</Link></li>
                <li><Link href="/charters/destinations/eastern-mediterranean" className="hover:text-white transition">Eastern Mediterranean</Link></li>
                <li><Link href="/charters/destinations/bahamas" className="hover:text-white transition">Bahamas</Link></li>
                <li><Link href="/charters/destinations/indian-ocean" className="hover:text-white transition">Indian Ocean</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-3 mt-2 uppercase underline decoration-[#B87333] underline-offset-8 text-sm tracking-wider">Contact</h3>
              <ul className="space-y-2">
                <li>Email: <a href="mailto:info@qualityacht.ch" aria-label="Email Qualityacht at info@qualityacht.ch" className="underline hover:text-white focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]">info@qualityacht.ch</a></li>
                <li>Phone: <a href="tel:+41767365781" aria-label="Call Qualityacht on +41 76 736 57 81" className="underline hover:text-white focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]">+41 76 736 57 81</a></li>
                <li><a href="https://wa.me/41767365781" target="_blank" rel="noopener noreferrer" aria-label="Contact Qualityacht on WhatsApp" className="underline hover:text-white focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]">WhatsApp</a></li>
                <li>Office: Zurich</li>
                <li><Link href="/charters/destinations" className="hover:text-white transition">Destinations</Link></li>
                <li><Link href="/events" className="hover:text-white transition">Events</Link></li>
              </ul>
            </div>
          </nav>
        </div>
      )}

    </header>
  );
}
