// components/Footer.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1b223d] text-white py-10 px-6 md:px-20">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">

        {/* Logo */}
        <div className="min-w-0">
          <Image
            src="/images/logoFondTrans.png"
            alt="Qualityacht Logo"
            width={150}
            height={50}
            // La colonne descend sous 150 px vers 1024 px : l'image doit pouvoir retrecir.
            className="h-auto w-full max-w-[150px]"
          />
          {/* Mot insecable de 159 px : il debordait la colonne de 147 px vers 1024 px.
              Reduit uniquement sur cette plage, taille d'origine des 1280 px. */}
          <h2 className="text-lg lg:text-base xl:text-xl font-bold text-[#f97316] mt-2">QUALITYACHT</h2>
        </div>

        {/* Services */}
        <div className="min-w-0 break-words">
          <h3 className="font-semibold mb-3 uppercase underline decoration-[#B87333] underline-offset-8 text-sm tracking-wider">Services</h3>
          <ul className="space-y-2 text-[#acb0cd]">
            <li><Link href="/charters">Yacht Charter</Link></li>
            <li><Link href="/sales">Sales</Link></li>
            <li><Link href="/management">Management</Link></li>
            <li><Link href="/conciergery">Conciergery</Link></li>
          </ul>
        </div>

        {/* Yacht Charter Types */}
        <div className="min-w-0 break-words">
          <h3 className="font-semibold mb-3 uppercase underline decoration-[#B87333] underline-offset-8 text-sm tracking-wider">On-Demand Charter</h3>
          <ul className="space-y-2 text-[#acb0cd]">
            <li><Link href="/charters/on-demand">On-Demand Yacht Charter</Link></li>
            <li><Link href="/charters/pet-friendly">Pet-Friendly Yacht Charter</Link></li>
            <li><Link href="/charters/last-minute">Last-Minute Charter</Link></li>
            <li><Link href="/charters/accessible">Accessible Charter Yacht</Link></li>
            <li><Link href="/yachts">View All Fleet</Link></li>
          </ul>

          <h3 className="font-semibold mt-5 mb-3 uppercase underline decoration-[#B87333] underline-offset-8 text-sm tracking-wider">Other Charters</h3>
          <ul className="space-y-2 text-[#acb0cd]">
            <li><Link href="/charters/group">Group Yacht Charter</Link></li>
            <li><Link href="/charters/sports">Sports Yacht Charter</Link></li>
            <li><Link href="/charters/halal">Tailored Halal Private Charter</Link></li>
          </ul>
        </div>

        {/* Destinations */}
        <div className="min-w-0 break-words">
          <h3 className="font-semibold mb-3 uppercase underline decoration-[#B87333] underline-offset-8 text-sm tracking-wider">Destinations</h3>
          <ul className="space-y-2 text-[#acb0cd]">
            <li><Link href="/charters/destinations">All Destinations</Link></li>
            <li><Link href="/charters/destinations/caribbean-v15">Caribbean</Link></li>
            <li><Link href="/charters/destinations/western-mediterranean">Western Mediterranean</Link></li>
            <li><Link href="/charters/destinations/eastern-mediterranean">Eastern Mediterranean</Link></li>
            <li><Link href="/charters/destinations/bahamas">Bahamas</Link></li>
            <li><Link href="/charters/destinations/indian-ocean">Indian Ocean</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="min-w-0 break-words">
          <h3 className="font-semibold mb-3 uppercase underline decoration-[#B87333] underline-offset-8 text-sm tracking-wider">Contact</h3>
          <ul className="space-y-2 text-[#acb0cd] break-words">
            {/* Adresse sur sa propre ligne : partagee avec le libelle, elle depassait
                la colonne de 230 px et se retrouvait rognee. */}
            <li>
              Email:{' '}
              <a
                href="mailto:info@qualityacht.ch"
                aria-label="Email Qualityacht at info@qualityacht.ch"
                className="underline block break-all focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]"
              >
                info@qualityacht.ch
              </a>
            </li>
            <li>Phone: <a href="tel:+41767365781" aria-label="Call Qualityacht on +41 76 736 57 81" className="underline focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]">+41 76 736 57 81</a></li>
            <li><a href="https://wa.me/41767365781" target="_blank" rel="noopener noreferrer" aria-label="Contact Qualityacht on WhatsApp" className="underline focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]">WhatsApp</a></li>
            <li>Office: Zurich</li>
            <li><Link href="/charters/destinations">Destinations</Link></li>
            <li><Link href="/events">Events</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} All rights reserved —{' '}
        <a href="https://qualityacht.ch" className="hover:text-gray-400 transition">qualityacht.ch</a>
        <span className="mx-2">|</span>
        <Link href="/privacy-policy" className="hover:text-gray-400 transition">
          Privacy Policy
        </Link>
        <span className="mx-2">|</span>
        <Link href="/admin/yachts" className="hover:text-gray-400 transition">
          Admin
        </Link>
      </div>
    </footer>
  );
}
