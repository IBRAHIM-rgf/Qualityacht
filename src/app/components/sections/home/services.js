import ServiceItem from "@/app/components/sevices/ServiceItem";
import Image from "next/image";

export default function ServicesGrid() {
  return (
    <section className=" text-white py-32 px-4 text-center"
    style={{
      backgroundImage: "url('/images/nuagesAncien.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
    }}>
      <div>
        <h2 className="text-3xl md:text-4xl  tracking-wide">
          SERVICES
        </h2>
        <Image
          src="/images/title-line.png"
          alt="Decorative line"
          width={200}
          height={10}
          className="mx-auto mb-12"
        />
      </div>
      <div className="relative max-w-5xl mx-auto h-[800px]">
      <ServiceItem
  title={["SALES"]}
  image="/images/services/sales.png"
  className=" top-[10%] left-[20%]  md:top-[25%] md:left-[-3%]"
  href={"/sales"}

  />
  <ServiceItem
    title={["CHARTER"]}
    image="/images/services/charter.png"
    className="top-[40%] left-[36%] md:top-[9%] md:left-[44%]"
    href={"/charters"}
  />
  <ServiceItem
    title={["MANAGEMENT"]}
    image="/images/services/management.png"
    className="top-[100%] left-[36%] md:top-[65%] md:left-[27%]"
    href={"/management"}
  />
  <ServiceItem
    title={["ONLY","FOR YOU"]}
    image="/images/services/regatta2.jpg"
    className="top-[70%] left-[20%] md:top-[47%] md:left-[75%]"
    href={"/only-for-you"}
  />

      </div>
    </section>
  );
}
