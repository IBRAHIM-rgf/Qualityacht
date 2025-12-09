import Link from "next/link";
import Image from "next/image";

export default function Choices() {
  return (
    <div className="bg-[#1b223d]">
    <section
      className="relative flex items-center justify-center h-screen bg-[#1b223d] text-white"
      style={{
        backgroundImage: "url('/images/services-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Nouveau menu mobile au-dessus du logo, centré */}
      
      {/* Central logo */}
      <div className="relative z-10">
        <Image
          src="/images/trans.png"
          alt="QualityYatch Choices"
          width={800}
          height={800}
          priority
        />
      </div>
      {/* Texts positioned absolute z-30ly around the logo (PC uniquement) */}
      <div className="hidden md:block">
        <Link
          href="/sales"
          className="absolute z-30 top-72 left-60 text-center group"
          prefetch={false}
        >
          <span className="trajan-regular text-[#C0C0C0] text-xl md:text-xl transition-colors font-semibold group-hover:text-orange-500">
            YACHT SALES <br /> & <br /> ACQUISITIONS
          </span>
        </Link>

        <Link
          href="/management"
          className="absolute z-30 bottom-56 left-64 text-center group"
          prefetch={false}
        >
          <span className="trajan-regular text-[#C0C0C0] text-xl md:text-xl transition-colors font-semibold group-hover:text-orange-500">
            YACHT BOAT <br /> MANAGEMENT
          </span>
        </Link>

        <Link
          href="/charters"
          className="absolute z-30 top-72 right-72 text-center group"
          prefetch={false}
        >
          <span className="trajan-regular text-[#C0C0C0] text-xl md:text-xl transition-colors font-semibold group-hover:text-orange-500">
            CHARTER <br /> FLEET
          </span>
        </Link>

        <Link
          href="/management"
          className="absolute z-30 bottom-56 right-72 text-center group"
          prefetch={false}
        >
          <span className="trajan-regular text-[#C0C0C0] text-xl md:text-xl transition-colors font-semibold group-hover:text-orange-500">
            CHARTER <br /> MANAGEMENT
          </span>
        </Link>
      </div>
      
    </section>
    <div className="md:hidden bg-[#1b223d] flex flex-col items-center justify-center  top-0 -translate-y-1/2 left-0 w-full z-40">
        <div className="bg-cover bg-center p-6 w-full max-w-md mx-auto text-white">
          <ul className="divide-y divide-white/20 text-center">
            <li className="py-8 trajan-regular uppercase tracking-wider font-light text-xl">
              <Link href="/sales" prefetch={false}>
                YACHT SALES & ACQUISITIONS
              </Link>
            </li>
            <li className="py-8 trajan-regular uppercase tracking-wider font-light text-xl">
              <Link href="/management" prefetch={false}>
                YACHT BOAT MANAGEMENT
              </Link>
            </li>
            <li className="py-8 trajan-regular uppercase tracking-wider font-light text-xl">
              <Link href="/charters" prefetch={false}>
                CHARTER FLEET
              </Link>
            </li>
            <li className="py-8 trajan-regular uppercase tracking-wider font-light text-xl">
              <Link href="/management" prefetch={false}>
                CHARTER MANAGEMENT
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
  );
}
