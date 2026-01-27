// src/app/loading.js - Loader global pour tout le site
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex items-center justify-center py-32">
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
          Chargement...
        </p>
      </div>
    </div>
  );
}
