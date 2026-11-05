// /journal/<slug> — article du Journal (client 2026-11-05).
// Hero photo + H1, introduction, sections H2, FAQ (+ donnees structurees Article et
// FAQPage), conclusion et demande de devis. Journal generaliste : aucun lien ni
// composant du silo halal (decision client 2026-11-05).
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JournalFaq from '../JournalFaq';
import { ARTICLES, getArticle, formatDate } from '../articles';
import { Line, Rich } from '../_shared';

const BASE = 'https://www.qualityacht.ch';

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  const url = `${BASE}/journal/${a.slug}`;
  return {
    title: a.seoTitle,
    description: a.description,
    alternates: { canonical: url },
    openGraph: {
      title: a.title,
      description: a.description,
      url,
      type: 'article',
      publishedTime: a.date,
      images: [{ url: a.hero, alt: a.heroAlt }],
    },
  };
}

function ArticleJsonLd({ a }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    image: `${BASE}${a.hero}`,
    datePublished: a.date,
    dateModified: a.date,
    author: { '@type': 'Organization', name: 'Qualityacht', url: BASE },
    publisher: { '@type': 'Organization', name: 'Qualityacht', url: BASE },
    mainEntityOfPage: `${BASE}/journal/${a.slug}`,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

function FaqJsonLd({ items }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

function JournalCta() {
  return (
    <section className="bg-[#2e2f32] py-16 md:py-20 px-6 md:px-14">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#B87333] mb-3">Bespoke Enquiry</p>
        <h2 className="trajan-regular text-2xl md:text-4xl uppercase tracking-[0.08em] text-[#C0C0C0] mb-4">Plan Your Charter</h2>
        <p className="text-[#acb0cd] text-base md:text-lg leading-relaxed mb-8">
          Tell us your dates, your guests and the experience you have in mind. We prepare every detail with you before you board.
        </p>
        <Link
          href="/request-quote"
          className="inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-4 rounded-full border text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] trajan-regular text-[#c2622a] border-[#C0C0C0] bg-[#26272a] hover:bg-[#c2622a] hover:text-white hover:border-[#c2622a] transition-all duration-300"
        >
          Request Your Charter
        </Link>
      </div>
    </section>
  );
}

function Block({ title, paragraphs }) {
  return (
    <div className="pt-10 md:pt-14">
      <h2 className="trajan-regular text-xl md:text-2xl uppercase tracking-[0.08em] text-[#C0C0C0] text-center leading-snug">{title}</h2>
      <Line />
      <div className="space-y-5">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[#acb0cd] text-base md:text-[17px] leading-relaxed">
            <Rich parts={p} />
          </p>
        ))}
      </div>
    </div>
  );
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  return (
    <div className="bg-[#26272a] text-[#acb0cd] overflow-x-clip">
      <ArticleJsonLd a={a} />
      <FaqJsonLd items={a.faq} />

      {/* HERO */}
      <section className="relative pt-[70px] md:pt-0 h-[62vh] md:h-[78vh]">
        <Image src={a.hero} alt={a.heroAlt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#26272a] via-[#26272a]/45 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-10 md:pb-14">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#B87333] mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            <Link href="/journal" className="hover:text-[#c2622a] transition-colors">Journal</Link> · {a.kicker}
          </p>
          <h1 className="trajan-regular text-2xl md:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[#C0C0C0] leading-tight max-w-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
            {a.title}
          </h1>
          <Line />
          <p className="text-[#acb0cd] text-xs md:text-sm uppercase tracking-[0.25em] font-light">{formatDate(a.date)}</p>
        </div>
      </section>

      {/* ARTICLE */}
      <article className="px-6 md:px-14 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-5">
            {a.intro.map((p, i) => (
              <p key={i} className="text-[#acb0cd] text-base md:text-lg leading-relaxed">
                <Rich parts={p} />
              </p>
            ))}
          </div>
          {a.sections.map((s) => <Block key={s.title} {...s} />)}
        </div>
      </article>

      {/* FAQ */}
      <section className="py-14 md:py-20 px-6 md:px-14 bg-[#2e2f32]">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#B87333] mb-3">Questions</p>
          <h2 className="trajan-regular text-xl md:text-3xl uppercase tracking-[0.1em] text-[#C0C0C0]">Frequently Asked Questions</h2>
          <Line />
        </div>
        <JournalFaq items={a.faq} />
      </section>

      {/* CONCLUSION */}
      <section className="px-6 md:px-14 pb-14 md:pb-20">
        <div className="max-w-3xl mx-auto">
          <Block {...a.conclusion} />
        </div>
      </section>

      <JournalCta />
    </div>
  );
}
