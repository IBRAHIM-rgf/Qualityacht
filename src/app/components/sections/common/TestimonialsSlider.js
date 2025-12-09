"use client";
import { useState } from "react";

export default function TestimonialsSlider({ title, testimonials = [] }) {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  if (!testimonials.length) return null;

  const t = testimonials[current];

  return (
    <section className="py-16 px-4 md:px-12 bg-[#f8f8f8]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">{title}</h2>
        <div className="bg-white rounded-xl shadow-md p-8">
          {t.avatar && (
            <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mx-auto mb-4" />
          )}
          <p className="text-lg italic mb-4">&ldquo;{t.content}&rdquo;</p>
          <div className="font-semibold">{t.name}</div>
          <div className="text-sm text-gray-500">{t.role}</div>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <button onClick={prev} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">&larr;</button>
          <button onClick={next} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">&rarr;</button>
        </div>
      </div>
    </section>
  );
}
