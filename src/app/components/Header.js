"use client";

import { useState } from "react";
import Image from "next/image";
import { Bitcoin, MessageCircle, Phone } from "lucide-react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <a href="#" className="hover:text-white transition">YACHTS FOR<br /> DAY CHARTER</a>
            <a href="/charters/destinations" className="hover:text-white transition">Destinations</a>
          </div>
        <Link href="#" className="hover:text-white  block md:hidden">
          <Bitcoin  />
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
          <a href="#" className="hover:text-white transition hidden md:inline">YACHTS FOR <br />LAST MINUTE</a>
          {/* <a href="#" className="hover:text-white transition hidden md:inline">SUGGESTIONS</a> */}
          <a href="#contact" className="hover:text-white transition hidden md:inline">Contact</a>
          <Link href="#" className="hover:text-white transition hidden md:block">
          <Bitcoin  />
          </Link> 
          <a
            href="tel:+000000000"
            className="p-2 rounded-full bg-green-700/80 hover:bg-white/20 transition"
            title="Call us"
          >
            <div className="relative w-6 h-6">
              <Phone className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" size={10} />
              <MessageCircle className="absolute top-0 left-0 text-white" size={24} strokeWidth={1} />
            </div>
          </a>

          {/* Burger menu mobile only */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full right-0 w-full bg-[#0E2438] text-white shadow-lg z-50 max-h-screen overflow-y-auto">
          <nav className="flex flex-col p-4 gap-6 text-sm text-[#acb0cd]">
            
            {/* Services */}
            <div>
              <h3 className="font-semibold mb-3 uppercase underline decoration-[#B87333] underline-offset-8 text-sm tracking-wider">Services</h3>
              <ul className="space-y-2">
                <li><a href="/charters" className="hover:text-white transition">Yacht Charter</a></li>
                <li><a href="/charters/destinations" className="hover:text-white transition">Destinations Charter</a></li>
                <li><a href="/sales" className="hover:text-white transition">Sales</a></li>
                <li><a href="/management" className="hover:text-white transition">Management</a></li>
                <li><a href="/concierge" className="hover:text-white transition">Concierge</a></li>
                <li><a href="/crypto-payments" className="hover:text-white transition">Crypto Payments</a></li>
              </ul>
            </div>

            {/* On-Demand Charter */}
            <div>
              <h3 className="font-semibold mb-3 uppercase underline decoration-[#B87333] underline-offset-8 text-sm tracking-wider">On-Demand Charter</h3>
              <ul className="space-y-2">
                <li><a href="/charters" className="hover:text-white transition">On-Demand Yacht Charter</a></li>
                <li><a href="/charters" className="hover:text-white transition">Pet-Friendly Yacht Charter</a></li>
                <li><a href="/charters" className="hover:text-white transition">Last-Minute Charter</a></li>
                <li><a href="/charters" className="hover:text-white transition">Accessible Charter Yacht</a></li>
                <li><a href="/charters" className="hover:text-white transition">View All Fleet</a></li>
              </ul>
            </div>

            {/* Other Charters */}
            <div>
              <h3 className="font-semibold mb-3 mt-2 uppercase underline decoration-[#B87333] underline-offset-8 text-sm tracking-wider">Other Charters</h3>
              <ul className="space-y-2">
                <li><a href="/charters" className="hover:text-white transition">Group Yacht Charter</a></li>
                <li><a href="/charters" className="hover:text-white transition">Sports Yacht Charter</a></li>
                <li><a href="/charters" className="hover:text-white transition">Helicopter Yacht Charter</a></li>
              </ul>
            </div>

            {/* Destinations */}
            <div>
              <h3 className="font-semibold mb-3 mt-2 uppercase underline decoration-[#B87333] underline-offset-8 text-sm tracking-wider">Destinations</h3>
              <ul className="space-y-2">
                <li><a href="/destinations/cities" className="hover:text-white transition">Cities</a></li>
                <li><a href="/destinations/countries" className="hover:text-white transition">Countries</a></li>
                <li><a href="/airport" className="hover:text-white transition">Airports</a></li>
                <li><a href="/privat-jet" className="hover:text-white transition">Private Jet</a></li>
                <li><a href="/destinations/routes" className="hover:text-white transition">Routes</a></li>
                <li><a href="/events" className="hover:text-white transition">Events</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-3 mt-2 uppercase underline decoration-[#B87333] underline-offset-8 text-sm tracking-wider">Contact</h3>
              <ul className="space-y-2">
                <li>Email: <a href="mailto:info@gmail.com" className="underline hover:text-white">info@gmail.com</a></li>
                <li>Office: Zurich</li>
                <li><a href="/about" className="hover:text-white transition">About</a></li>
                <li><a href="/charters/destinations" className="hover:text-white transition">Destinations</a></li>
                <li><a href="/events" className="hover:text-white transition">Events</a></li>
              </ul>
            </div>
          </nav>
        </div>
      )}

    </header>
  );
}
