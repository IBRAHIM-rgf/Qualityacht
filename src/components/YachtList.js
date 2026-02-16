// src/components/YachtList.js

"use client";
import { useState } from "react";
import Image from "next/image";
import YachtCardV2 from "./YachtCardV2";
import YachtModal from "./YachtModal";

export default function YachtList({ yachts }) {
  const [selectedYacht, setSelectedYacht] = useState(null);

  if (!yachts.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative w-48 h-48 md:w-64 md:h-64 opacity-30 grayscale mb-6">
          <Image
            src="/images/logoFondTrans.png"
            alt="Qualityacht"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-gray-400 text-lg">No yachts found for your criteria.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {yachts.map((yacht) => (
          <div
            key={yacht.id}
            onClick={() => setSelectedYacht(yacht)}
            className="cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <YachtCardV2 yacht={yacht} />
          </div>
        ))}
      </div>

      <YachtModal
        yacht={selectedYacht}
        isOpen={!!selectedYacht}
        onClose={() => setSelectedYacht(null)}
      />
    </>
  );
}
