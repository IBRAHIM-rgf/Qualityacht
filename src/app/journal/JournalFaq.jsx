'use client';

// FAQ depliable des articles du Journal (client 2026-11-05), meme style que les FAQ du site.
import { useState } from 'react';

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between py-5 text-left group cursor-pointer gap-4"
      >
        <span className="trajan-regular text-[#acb0cd] text-sm md:text-base uppercase tracking-[0.12em] group-hover:text-[#c2622a] transition-colors duration-300 leading-snug">
          {q}
        </span>
        <span className={`text-[#B87333] text-3xl leading-none mt-0.5 shrink-0 font-light transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-[#acb0cd]/80 text-sm md:text-[15px] leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function JournalFaq({ items = [] }) {
  return (
    <div className="max-w-3xl mx-auto">
      {items.map((item) => <FaqItem key={item.q} {...item} />)}
    </div>
  );
}
