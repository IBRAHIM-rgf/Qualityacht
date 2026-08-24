"use client";
import { useState } from "react";
import Image from "next/image";

export default function WorldClassExperience() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      className="py-16 px-6 md:px-20 md:min-h-screen text-center"
      style={{
        // Voile sombre sur la photo : derriere les glyphes, le fond montait jusqu'a
        // 1,82:1 dans les zones claires, sous le seuil de 3:1 du grand texte.
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/services-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div>
        <h2 className="text-3xl md:text-4xl tracking-wide">
          A WORLD-CLASS EXPERIENCE
        </h2>
        <Image
          src="/images/title-line.png"
          alt="Decorative line"
          width={200}
          height={10}
          className="mx-auto mb-12"
        />
      </div>

      <div
        className={`max-w-4xl mx-auto space-y-6 text-sm md:text-2xl leading-relaxed text-center transition-all duration-300 ${
          isExpanded ? "" : "line-clamp-5"
        }`}
      >
        <span className="text-[#bd9973]">
          Wishing to design a society where luxury, sea and adrenaline would be
          at the<br />
          center of activity.
        </span>{" "}
        It is in fact a matter of course: Know how to present a company
        <br />
        whose DNA would be the image of the craze that drives us.
        <br />
        <span className="text-[#bd9973]">
          Qualityacht has been in the luxury sector for more than 33 years,
        </span>{" "}
        including 13
        <br />
        years in the prestigious world of yachting. Very involved in everyday
        life, the
        <br />
        Qualityacht family has allowed many customers to sail with an
        <br />
        unmatched commitment.
        <br />
        Qualityacht is{" "}
        <span className="text-[#bd9973]">
          {" "}
          committed to providing its customers with a customized solution.
          <br />
        </span>
        It is about facing a wide range of problems, with reactivity and
        imagination,
        <br />
        while placing the luxury universe as an obvious solution.
        <br />
        It must be said that the founders of the brand are themselves aware of
        the
        <br />
        prestige transports they particularly like.
        <br />
        Our team travels the coves to make you discover or rediscover the charms
        of
        <br />
        our planet. Paradise destinations and your desires as a guideline to
        create your
        <br />
        holidays fully ready to embar.
        <span className="text-[#bd9973]">
          {" "}
          Our expertise includes: a collection of sailboats.
          <br />
          classic sailboats, regattas, different sizes of yachts related to your
          needs.
          <br />
        </span>
        Thus, the company satisfies various profiles; of the customer who needs a
        <br />
        comfortable solution aboard a private jet to join the
        <br />
        Dubai International Horse Fair.
        <br />
        Drive or be driven in a beautiful sedan to go to the Monaco Grand Prix.
        <br />
        Meet at the next DJ party with friends in St Barth. All is possible.
        <br />
        <br />
        Our team is thus able to{" "}
        <span className="text-[#bd9973]"> guarantee a 5-star service</span>{" "}
        regardless of the situation
        <br />
        they face because Qualityacht unites a whole team of professionals from
        various
        <br />
        backgrounds with a single common thread: Provide the best possible
        service
        <br />
        <br />
        <span className="text-[#bd9973]">
          {" "}
          Far beyond a service provider, we will be your partner.
          <br />
        </span>
      </div>

      {/* Bouton En savoir plus */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-6 inline-block  py-4 text-sm md:text-base font-medium rounded-full bg-black/40 trajan-regular text-[#C0C0C0] border border-[#C0C0C0] px-6 py-2"
      >
        {isExpanded ? "Reduce" : "See more"}
      </button>
    </section>
  );
}
