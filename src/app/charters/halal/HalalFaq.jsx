'use client';

import { useState } from 'react';

// FAQ "Discreet Details" — halal private charter.
const FAQ = [
  {
    q: 'Is your service halal-friendly?',
    a: 'Absolutely. With extensive experience in halal-friendly hospitality, we curate private yacht experiences with refined catering, alcohol-free arrangements, and meticulous attention to detail.',
  },
  {
    q: 'Is privacy a priority?',
    a: 'Always. Discretion is intrinsic to the experience and never treated as an afterthought.',
  },
  {
    q: 'Can the charter be fully tailored?',
    a: 'Yes. Every charter is shaped around your preferences, pace, and expectations, ensuring a seamless and highly personal experience.',
  },
  {
    q: 'Do you accommodate bespoke requests?',
    a: 'Of course. Our team is accustomed to delivering highly individual arrangements with precision, care, and complete discretion.',
  },
  {
    q: 'Do you offer prayer-friendly arrangements?',
    a: 'Yes, upon request. We ensure a calm, respectful onboard environment with thoughtful provisions for your comfort.',
  },
  {
    q: 'Can you arrange a completely private experience?',
    a: 'Certainly. We specialise in fully private charters for guests who value seclusion, ease, and understated elegance.',
  },
  {
    q: 'Can you assist with special catering requests?',
    a: 'Certainly. From halal-friendly menus to specific dietary preferences, every detail is handled with care.',
  },
  {
    q: 'How early should we reserve?',
    a: 'For the most refined experience and the best vessel selection, we recommend reserving well in advance.',
  },
];

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

export default function HalalFaq() {
  return (
    <div className="max-w-3xl mx-auto">
      {FAQ.map((item) => (
        <FaqItem key={item.q} {...item} />
      ))}
    </div>
  );
}
