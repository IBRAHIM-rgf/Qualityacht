// src/components/YachtList.js

import YachtCard from "./YachtCard";
import YachtCardV2 from "./YachtCardV2";

export default function YachtList({ yachts }) {
  if (!yachts.length) {
    return <div className="text-center text-gray-500 py-12">No yachts found for your criteria.</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {yachts.map((yacht) => (
        <YachtCardV2 key={yacht.id} yacht={yacht} />
      ))}
    </div>
  );
}
