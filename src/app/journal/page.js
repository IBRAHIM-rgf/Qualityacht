// /journal — liste des articles du blog Qualityacht (client 2026-11-05).
// Lien discret en pied de page uniquement (pas dans le menu principal).
import Image from 'next/image';
import Link from 'next/link';
import { ARTICLES, formatDate } from './articles';
import { Line } from './_shared';

export const metadata = {
  title: 'Journal | Qualityacht',
  description: 'Insights from an independent yacht charter broker in Zurich: charter etiquette, destinations, seasons and how to choose the right yacht.',
  alternates: { canonical: 'https://www.qualityacht.ch/journal' },
};

export default function JournalPage() {
  const articles = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen overflow-x-clip">
      <section className="pt-32 md:pt-40 pb-10 md:pb-14 px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#B87333] mb-3">The Art of Private Yachting</p>
        <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.12em] text-[#C0C0C0]">Journal</h1>
        <Line />
        <p className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Notes from an independent broker: how to choose, what to ask, and where to go.
        </p>
      </section>

      <section className="px-6 md:px-14 pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {articles.map((a) => (
            <Link key={a.slug} href={`/journal/${a.slug}`} className="group block">
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-sm">
                <Image src={a.hero} alt={a.heroAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-5 text-[11px] uppercase tracking-[0.3em] text-[#B87333]">
                {a.kicker} · {formatDate(a.date)}
              </p>
              <h2 className="trajan-regular mt-3 text-lg md:text-2xl uppercase tracking-[0.08em] text-[#C0C0C0] leading-snug group-hover:text-[#c2622a] transition-colors">
                {a.title}
              </h2>
              <p className="mt-3 text-sm md:text-base leading-relaxed">{a.excerpt}</p>
              <span className="inline-block mt-4 text-xs uppercase tracking-[0.25em] text-[#c2622a]">Read the article →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
