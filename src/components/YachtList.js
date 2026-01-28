// src/components/YachtList.js

"use client";
import { useState } from "react";
import YachtCardV2 from "./YachtCardV2";
import YachtModal from "./YachtModal";

export default function YachtList({ yachts }) {
  const [selectedYacht, setSelectedYacht] = useState(null);

  if (!yachts.length) {
    return <div className="text-center text-gray-500 py-12">No yachts found for your criteria.</div>;
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
