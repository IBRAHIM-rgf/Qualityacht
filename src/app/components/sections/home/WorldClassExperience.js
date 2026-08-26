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

      {/* Les sauts de ligne etaient ecrits en dur : cales pour le mobile, ils
          produisaient sur desktop des lignes tres irregulieres. Ils sont
          conserves en `md:hidden` — le rendu mobile valide par la cliente est
          donc inchange — et le navigateur repartit librement les lignes a partir
          de md. Chaque saut est precede d'une espace explicite : le `<br />`
          servait de separateur entre les mots, et sans elle « at the<br />center »
          devenait « thecenter » une fois le saut masque. Sur mobile l'espace
          tombe en fin de ligne, donc invisible. Aucun texte et aucune couleur
          n'a ete modifie. */}
      <div
        className={`max-w-4xl mx-auto space-y-6 text-sm md:text-xl leading-relaxed md:leading-[1.8] text-center md:text-left transition-all duration-300 ${
          isExpanded ? "" : "line-clamp-5"
        }`}
      >
        <span className="text-[#bd9973]">
          Wishing to design a society where luxury, sea and adrenaline would be
          at the{' '}<br className="md:hidden" />
          center of activity.
        </span>{" "}
        It is in fact a matter of course: Know how to present a company
        {' '}<br className="md:hidden" />
        whose DNA would be the image of the craze that drives us.
        {' '}<br className="md:hidden" />
        <span className="text-[#bd9973]">
          Qualityacht has been in the luxury sector for more than 33 years,
        </span>{" "}
        including 13
        {' '}<br className="md:hidden" />
        years in the prestigious world of yachting. Very involved in everyday
        life, the
        {' '}<br className="md:hidden" />
        Qualityacht family has allowed many customers to sail with an
        {' '}<br className="md:hidden" />
        unmatched commitment.
        {' '}<br className="md:hidden" />
        Qualityacht is{" "}
        <span className="text-[#bd9973]">
          {" "}
          committed to providing its customers with a customized solution.
          {' '}<br className="md:hidden" />
        </span>
        It is about facing a wide range of problems, with reactivity and
        imagination,
        {' '}<br className="md:hidden" />
        while placing the luxury universe as an obvious solution.
        {' '}<br className="md:hidden" />
        It must be said that the founders of the brand are themselves aware of
        the
        {' '}<br className="md:hidden" />
        prestige transports they particularly like.
        {' '}<br className="md:hidden" />
        Our team travels the coves to make you discover or rediscover the charms
        of
        {' '}<br className="md:hidden" />
        our planet. Paradise destinations and your desires as a guideline to
        create your
        {' '}<br className="md:hidden" />
        holidays fully ready to embar.
        <span className="text-[#bd9973]">
          {" "}
          Our expertise includes: a collection of sailboats.
          {' '}<br className="md:hidden" />
          classic sailboats, regattas, different sizes of yachts related to your
          needs.
          {' '}<br className="md:hidden" />
        </span>
        Thus, the company satisfies various profiles; of the customer who needs a
        {' '}<br className="md:hidden" />
        comfortable solution aboard a private jet to join the
        {' '}<br className="md:hidden" />
        Dubai International Horse Fair.
        {' '}<br className="md:hidden" />
        Drive or be driven in a beautiful sedan to go to the Monaco Grand Prix.
        {' '}<br className="md:hidden" />
        Meet at the next DJ party with friends in St Barth. All is possible.
        <span aria-hidden className="block h-5" />
        Our team is thus able to{" "}
        <span className="text-[#bd9973]"> guarantee a 5-star service</span>{" "}
        regardless of the situation
        {' '}<br className="md:hidden" />
        they face because Qualityacht unites a whole team of professionals from
        various
        {' '}<br className="md:hidden" />
        backgrounds with a single common thread: Provide the best possible
        service
        <span aria-hidden className="block h-5" />
        <span className="text-[#bd9973]">
          {" "}
          Far beyond a service provider, we will be your partner.
          {' '}<br className="md:hidden" />
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
