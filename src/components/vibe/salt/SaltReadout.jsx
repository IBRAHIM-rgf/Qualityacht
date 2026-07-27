'use client';

// Section 2 — THE READOUT. Contrepoint sec juste apres l'emotion du hero :
// aucun media, que de la mesure. Respiration technique entre deux videos.
// Les chiffres s'incrementent une seule fois, en tabular-nums OBLIGATOIRE
// (sinon la largeur saute pendant le comptage).

import SaltReveal from './SaltReveal';
import { useCountUp, useInView } from './useSalt';

function Stat({ value, suffix = '', label, active, delay }) {
  const n = useCountUp(value, active, 900, delay);
  return (
    <div className="px-5 py-8 md:py-12 border-t border-[rgba(47,214,196,0.22)] md:border-t-0 md:border-l md:first:border-l-0">
      <p className="salt-num">
        <span style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>{n}</span>
        {suffix && (
          <span
            className="ml-1 align-baseline"
            style={{ fontSize: '40%', fontVariationSettings: "'wght' 700, 'wdth' 105" }}
          >
            {suffix}
          </span>
        )}
      </p>
      <p className="salt-mono salt-mono--ctx mt-4 max-w-[26ch]">{label}</p>
    </div>
  );
}

export default function SaltReadout({ data }) {
  const [ref, inView] = useInView({ threshold: 0.4 });

  return (
    <section ref={ref} className="relative w-full bg-[var(--sg2)]">
      <span className="salt-rule" />
      <div className="px-[5vw] pt-12 md:pt-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h3 className="salt-h3">{data.h3}</h3>
          <p className="salt-body md:text-right md:max-w-[38ch]">{data.lead}</p>
        </div>
      </div>
      <div className="px-[5vw] pb-4 md:pb-8 mt-8 md:mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {data.stats.map((s, i) => (
            <Stat
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              active={inView}
              delay={i * 70}
            />
          ))}
        </div>
      </div>
      <SaltReveal variant="wipe" duration={500}>
        <span className="salt-rule" />
      </SaltReveal>
    </section>
  );
}
