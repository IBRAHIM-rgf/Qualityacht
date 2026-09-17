// ══ Carte partenaire Froggy Gourmet ══
// Construite d'apres la carte de reference Gustave Immo (structure, proportions,
// espacements, deux boutons pilule). HTML + CSS purs, aucun JavaScript, aucune
// icone ni decoration. Le panneau logo est pret : le logo officiel viendra
// remplacer le bloc vide quand la cliente le fournira (jamais de texte a la place).

const LOGO = '/media/client/lydie/2026-09-17/froggy/logo.png';

export default function FroggyGourmetCard() {
  return (
    <>
      <article className="froggy-card" aria-labelledby="froggy-name">
        <div className="froggy-logo-panel">
          {LOGO && (
            <img
              src={LOGO}
              alt="Froggy Gourmet – Yacht & Villa Provisioning"
              className="froggy-logo"
              width={220}
              height={110}
            />
          )}
        </div>

        <p className="froggy-category">Yacht &amp; Villa Provisioning</p>
        <h3 id="froggy-name" className="froggy-name">Froggy Gourmet</h3>
        <p className="froggy-destinations">Antibes · French Riviera · Mediterranean. Caribbean.</p>
        <p className="froggy-description">
          Based in Antibes, Froggy Gourmet provides tailored provisioning for yachts, villas and
          private chefs. From daily selected produce, and premium seafood to fine foods, wines and
          specialist ingredients, Halal, its refrigerated logistics ensure every order arrives
          fresh, precise and ready for exceptional onboard or villa dining.
        </p>

        <div className="froggy-actions">
          <a href="#provisioning" className="froggy-button froggy-button--primary">
            Explore Provisioning
          </a>
          <a
            href="https://www.froggygourmet.fr/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Partner — Froggy Gourmet, opens in a new tab"
            className="froggy-button froggy-button--secondary"
          >
            Visit Partner
          </a>
        </div>
      </article>

      <style>{`
        .froggy-card {
          box-sizing: border-box;
          width: 100%;
          max-width: 720px;
          margin: 0 auto;
          padding: 40px;
          background: #303132;
          border: 1px solid #48494C;
          border-radius: 24px;
          color: #C1C0CF;
          font-family: var(--font-montserrat), 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
          text-align: left;
        }
        .froggy-logo-panel {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 140px;
          background: #252629;
          border: 1px solid #4A4B4F;
          border-radius: 20px;
          overflow: hidden;
        }
        .froggy-logo {
          max-width: 70%;
          max-height: 70%;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
        }
        .froggy-category {
          margin: 32px 0 0;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #B87842;
        }
        .froggy-name {
          margin: 10px 0 0;
          font-family: var(--font-trajan-regular), 'Trajan Pro', 'Cormorant Garamond', Georgia, serif;
          font-weight: 400;
          font-size: 34px;
          line-height: 1.15;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #D7D4D0;
        }
        .froggy-destinations {
          margin: 12px 0 0;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C8AE90;
        }
        .froggy-description {
          margin: 26px 0 0;
          font-size: 16px;
          line-height: 1.75;
          color: #C1C0CF;
        }
        .froggy-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 36px;
        }
        .froggy-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-sizing: border-box;
          min-height: 90px;
          padding: 14px 22px;
          border: 1px solid #D1CFCC;
          border-radius: 999px;
          background: transparent;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          transition: border-color 300ms ease, box-shadow 300ms ease;
        }
        .froggy-button:hover { border-color: #C2743B; }
        .froggy-button:focus { outline: none; }
        .froggy-button:focus-visible {
          outline: 2px solid #C2743B;
          outline-offset: 3px;
        }
        .froggy-button--primary {
          color: #C2743B;
          box-shadow: 0 0 18px rgba(194, 116, 59, 0.18);
        }
        .froggy-button--primary:hover { box-shadow: 0 0 24px rgba(194, 116, 59, 0.3); }
        .froggy-button--secondary { color: #D7D4D0; }
        @media (max-width: 767px) {
          .froggy-card { padding: 24px; }
          .froggy-logo-panel { height: 112px; }
          .froggy-name { font-size: 28px; }
        }
        @media (max-width: 560px) {
          .froggy-actions { grid-template-columns: 1fr; }
          .froggy-button { min-height: 68px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .froggy-button { transition: none; }
        }
      `}</style>
    </>
  );
}
