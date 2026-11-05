// Elements communs du Journal (client 2026-11-05) : texte enrichi des articles et filet
// cuivre du site.
import Image from 'next/image';
import Link from 'next/link';

export function Line() {
  return (
    <div className="relative w-28 md:w-40 h-5 mx-auto my-4">
      <Image src="/images/title-line.png" alt="" fill className="object-contain" />
    </div>
  );
}

const LINK = 'text-[#c2622a] underline underline-offset-4 decoration-[#c2622a]/50 hover:decoration-[#c2622a] transition-colors';

export function Rich({ parts }) {
  return parts.map((p, i) => {
    if (typeof p === 'string') return <span key={i}>{p}</span>;
    if (p.b) return <strong key={i} className="font-semibold text-[#C0C0C0]">{p.b}</strong>;
    if (p.external) {
      const isMail = p.href.startsWith('mailto:');
      return (
        <a key={i} href={p.href} className={LINK} {...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}>
          {p.text}
        </a>
      );
    }
    return <Link key={i} href={p.href} className={LINK}>{p.text}</Link>;
  });
}
