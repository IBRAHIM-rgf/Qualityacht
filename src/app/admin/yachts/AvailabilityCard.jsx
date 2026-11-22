'use client';

// Carte « Availability Period » (client 2026-11-22), admin seulement, lecture seule :
// periodes des tarifs Ankor + periodes citees dans les descriptions Ankor.
import { useState } from 'react';

export default function AvailabilityCard({ data }) {
  const [open, setOpen] = useState(true);
  const rates = data?.rates || [];
  const desc = data?.descriptions || [];
  return (
    <div className={`acc ${open ? 'open' : ''}`} style={{ marginBottom: 16 }}>
      <div className="ah" onClick={() => setOpen((o) => !o)}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '12px 14px', border: '1px solid #FF8C1A', borderRadius: 8 }}>
        <span>📅 Availability Period</span>
        <span style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span className="tagcount">{rates.length + desc.length} période(s)</span><span className="fl">▼</span>
        </span>
      </div>
      {open && (
        <div className="ab" style={{ padding: '12px 14px', fontSize: 13 }}>
          {!data && <div style={{ opacity: 0.6 }}>Chargement…</div>}
          {data && !rates.length && !desc.length && <div style={{ opacity: 0.6 }}>Aucune période sur Ankor pour ce bateau.</div>}
          {rates.length > 0 && (
            <>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Dates des tarifs Ankor</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 12 }}>
                <tbody>
                  {rates.map((r, i) => (
                    <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      <td style={{ padding: '6px 8px', opacity: 0.75 }}>{r.name || '—'}</td>
                      <td style={{ padding: '6px 8px', whiteSpace: 'nowrap' }}>{r.period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          {desc.length > 0 && (
            <>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Périodes dans les descriptions Ankor</div>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {desc.map((d, i) => (
                  <li key={i} style={{ marginBottom: 6 }}><span style={{ opacity: 0.6 }}>{d.from} : </span>{d.text}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
