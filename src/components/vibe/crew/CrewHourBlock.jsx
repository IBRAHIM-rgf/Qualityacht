'use client';

// CrewHourBlock — le bloc narratif d'une heure : le point de la timeline s'allume,
// puis l'heure, le label, le titre et le paragraphe montent ensemble.
// L'heure est en Geist tabular-nums : 06:40 / 09:15 / 13:00 / 17:30 / 21:00
// s'alignent au pixel les uns sous les autres le long du filet.
//
// `dot={false}` : utilise a 09:15 uniquement, ou la timeline est interrompue par
// la grande photo — pas de filet a cet endroit, donc pas de point orphelin.
import CrewReveal from './CrewReveal';
import useInView from './useInView';

export default function CrewHourBlock({
  hour, label, title, body,
  dot = true,
  delay = 180,
  duration = 900,
}) {
  const [ref, inView] = useInView({ threshold: 0.35 });

  return (
    <div className={`crew-hourblock ${dot ? '' : 'crew-hourblock--flush'}`} ref={ref}>
      {dot && <span className={`crew-dot ${inView ? 'is-lit' : ''}`} aria-hidden="true" />}
      <CrewReveal y={24} duration={duration} delay={delay}>
        <p className="crew-hour">{hour}</p>
        <p className="crew-label" style={{ marginTop: '20px' }}>{label}</p>
        <h2 className="crew-h2" style={{ marginTop: '18px' }}>{title}</h2>
        <p className="crew-body" style={{ marginTop: '26px' }}>{body}</p>
      </CrewReveal>
    </div>
  );
}
