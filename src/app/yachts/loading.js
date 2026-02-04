// src/app/yachts/loading.js
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#2e2f32] flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-32 h-32 animate-spin">
          <Image
            src="/images/logoFondTrans.png"
            alt="Loading"
            fill
            className="object-contain"
            priority
          />
        </div>
        <p className="text-[#C0C0C0] text-lg font-medium">
          Loading yachts...
        </p>
      </div>
    </div>
  );
}
