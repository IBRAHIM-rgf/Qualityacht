'use client';

import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  return (
    <button
      type="button"
      onClick={() => { if (typeof window !== 'undefined') window.history.back(); }}
      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#acb0cd] hover:text-[#B03E00] transition-colors"
    >
      <ArrowLeft className="w-4 h-4" /> Back
    </button>
  );
}
