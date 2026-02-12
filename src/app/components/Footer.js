// components/Footer.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1b223d] text-white py-10 px-6 md:px-20">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 text-sm">

        {/* Logo */}
        <div>
          <Image
            src="/images/logoFondTrans.png"
            alt="Qualityacht Logo"
            width={150}
            height={50}
          />
          <h2 className="text-xl font-bold text-[#f97316] mt-2">QUALITYACHT</h2>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold mb-3 uppercase underline decoration-[#B87333] underline-offset-8 text-sm tracking-wider">Services</h3>
          <ul className="space-y-2 text-[#acb0cd]">
            <li><Link href="/charters">Yacht Charter</Link></li>
            <li><Link href="/sales">Sales</Link></li>
            <li><Link href="/management">Management</Link></li>
            <li><Link href="/conciergery">Conciergery</Link></li>
            <li><Link href="/crypto-payments">Crypto Payments</Link></li>
          </ul>
        </div>

        {/* Yacht Charter Types */}
        <div>
          <h3 className="font-semibold mb-3 uppercase underline decoration-[#B87333] underline-offset-8 text-sm tracking-wider">On-Demand Charter</h3>
          <ul className="space-y-2 text-[#acb0cd]">
            <li><Link href="/charters">On-Demand Yacht Charter</Link></li>
            <li><Link href="/charters">Pet-Friendly Yacht Charter</Link></li>
            <li><Link href="/charters">Last-Minute Charter</Link></li>
            <li><Link href="/charters">Accessible Charter Yacht</Link></li>
            <li><Link href="/charters">View All Fleet</Link></li>
          </ul>

          <h3 className="font-semibold mt-5 mb-3 uppercase underline decoration-[#B87333] underline-offset-8 text-sm tracking-wider">Other Charters</h3>
          <ul className="space-y-2 text-[#acb0cd]">
            <li><Link href="/charters">Group Yacht Charter</Link></li>
            <li><Link href="/charters">Sports Yacht Charter</Link></li>
            <li><Link href="/charters">Helicopter Yacht Charter</Link></li>
          </ul>
        </div>

        {/* Destinations */}
        <div>
          <h3 className="font-semibold mb-3 uppercase underline decoration-[#B87333] underline-offset-8 text-sm tracking-wider">Destinations</h3>
          <ul className="space-y-2 text-[#acb0cd]">
            <li><Link href="/destinations/cities">Cities</Link></li>
            <li><Link href="/destinations/countries">Countries</Link></li>
            <li><Link href="/destinations/airports">Airports</Link></li>
            <li><Link href="/destinations/routes">Routes</Link></li>
            <li><Link href="/events">Events</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3 uppercase underline decoration-[#B87333] underline-offset-8 text-sm tracking-wider">Contact</h3>
          <ul className="space-y-2 text-[#acb0cd]">
            <li>Email: <a href="mailto:info@gmail.com" className="underline">info@gmail.com</a></li>
            <li>Office: Zurich</li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/charters/destinations">Destinations</Link></li>
            <li><Link href="/events">Events</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} Qualityacht.ch All rights reserved.
        <span className="mx-2">|</span>
        <Link href="/admin/yachts" className="hover:text-gray-400 transition">
          Admin
        </Link>
      </div>
    </footer>
  );
}
