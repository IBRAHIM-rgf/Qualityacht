import Image from "next/image";
import Link from "next/link";

export default function HeroBaner() {
  return (
    <>
      {/* Desktop section */}
      <section
        className="w-screen h-screen bg-cover bg-center bg-blend-normal relative py-20 px-6 hidden md:block"
        style={{
          backgroundImage: "url('/images/FondHero.jpg')",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-end px-6">
          <Link href="/choices" className="pulse-animation">
            <Image
              src="/images/trans.png"
              alt="Qualityacht Logo"
              width={350}
              height={350}
              className="cursor-pointer"
            />
          </Link>
        </div>
      </section>

      {/* Mobile section */}
      <section className="w-screen h-screen relative py-20 px-6 block md:hidden overflow-hidden">
        {/* Background image using next/image */}
        <Image
          src="/images/features17.png"
          alt="Background"
          fill
          priority
          className="object-cover z-0"
        />

        <div className="absolute bottom-8 left-0 right-0 flex justify-center px-6 z-10">
          <Link href="/choices">
            <div className="overflow-hidden h-[200px] mb-[71px] w-[200px] flex items-end justify-center cursor-pointer">
              <Image
                src="/images/logoFondTrans.png"
                alt="Image mobile"
                width={200}
                height={200}
                className="animate-rise-mobile"
                priority
              />
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
