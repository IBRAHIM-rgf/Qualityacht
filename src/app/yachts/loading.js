// src/app/yachts/loading.js
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
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
          Chargement des yachts...
        </p>
      </div>
    </div>
  );
}
