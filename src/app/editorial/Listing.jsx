// Liste d'articles Editorial (client 2026-11-05) : en-tete, onglets de rubriques
// (All, Charter Guide, Destinations, News, Lifestyle) et grille de cartes.
import Image from 'next/image';
import Link from 'next/link';
import { CATEGORIES, getCategory, articleUrl, formatDate } from './articles';
import { Line } from './_shared';

function Tabs({ active }) {
  const tabs = [{ slug: null, label: 'All', href: '/editorial' }, ...CATEGORIES.map((c) => ({ ...c, href: `/editorial/${c.slug}` }))];
  return (
    <nav aria-label="Editorial categories" className="flex flex-wrap justify-center gap-2 md:gap-3 mt-8">
      {tabs.map((t) => {
        const on = t.slug === active;
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={on ? 'page' : undefined}
            className={`rounded-full border px-4 py-1.5 text-[11px] md:text-xs uppercase tracking-[0.2em] transition-colors ${
              on ? 'border-[#c2622a] text-[#c2622a]' : 'border-[#C0C0C0]/40 text-[#acb0cd] hover:border-[#c2622a] hover:text-[#c2622a]'
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function Listing({ category = null, articles }) {
  const cat = category ? getCategory(category) : null;
  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen overflow-x-clip">
      <section className="pt-32 md:pt-40 pb-10 md:pb-14 px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#B87333] mb-3">The Art of Private Yachting</p>
        <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.12em] text-[#C0C0C0]">
          {cat ? cat.label : 'Editorial'}
        </h1>
        <Line />
        <p className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          {cat ? cat.intro : 'Guides, destinations, news and the art of life on board, from an independent broker in Zurich.'}
        </p>
        <Tabs active={category} />
      </section>

      <section className="px-6 md:px-14 pb-20 md:pb-28">
        {articles.length === 0 ? (
          <p className="text-center text-sm md:text-base uppercase tracking-[0.25em] text-[#acb0cd]/70 py-10">
            New articles coming soon.
          </p>
        ) : (
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            {articles.map((a) => (
              <Link key={a.slug} href={articleUrl(a)} className="group block">
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-sm">
                  <Image src={a.hero} alt={a.heroAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className="mt-5 text-[11px] uppercase tracking-[0.3em] text-[#B87333]">
                  {getCategory(a.category)?.label} · {formatDate(a.date)}
                </p>
                <h2 className="trajan-regular mt-3 text-lg md:text-2xl uppercase tracking-[0.08em] text-[#C0C0C0] leading-snug group-hover:text-[#c2622a] transition-colors">
                  {a.title}
                </h2>
                <p className="mt-3 text-sm md:text-base leading-relaxed">{a.excerpt}</p>
                <span className="inline-block mt-4 text-xs uppercase tracking-[0.25em] text-[#c2622a]">Read the article →</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
