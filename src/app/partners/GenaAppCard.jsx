// ══ Carte partenaire Gena-App ══
// HTML + CSS fournis par la cliente, proportions alignees sur la carte de
// reference Gustave Immo (meme gabarit que Froggy Gourmet). Textes anglais,
// couleurs, contenu et liens repris tels quels. Logo horizontal : variante
// « grande largeur » (~70 % de la largeur utile du panneau), jamais deforme
// ni recadre.

const LOGO = '/media/client/lydie/2026-09-18/gena/logo.png';

export default function GenaAppCard() {
  return (
    <>
      <article className="gena-card" aria-labelledby="gena-name">
        <div className="gena-logo-panel">
          <img
            className="gena-logo"
            src={LOGO}
            alt="Gena-App – Intergenerational Digital Play"
            width={484}
            height={157}
          />
        </div>
        <p className="gena-category">INTERGENERATIONAL CONNECTION</p>
        <h3 id="gena-name" className="gena-title">GENA-APP</h3>
        <p className="gena-locations">FAMILIES · SENIORS · SHARED MOMENTS</p>
        <p className="gena-description">
          Gena-App is an accessible digital play platform designed to bring generations closer
          together. Through personalized games and simple tools, it helps families, seniors and
          care organizations create meaningful shared moments, strengthen social connection and
          make digital interaction easier for everyone.
        </p>
        <div className="gena-actions">
          <a className="gena-button gena-button--primary" href="#gena-app">
            DISCOVER GENA
          </a>
          <a
            className="gena-button gena-button--secondary"
            href="https://gena-app.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Partner — Gena-App, opens in a new tab"
          >
            VISIT PARTNER
          </a>
        </div>
      </article>

      <style>{`
        .gena-card {
          width: min(100%, 720px);
          box-sizing: border-box;
          margin: 0 auto;
          padding: 40px;
          background: #303132;
          border: 1px solid #48494c;
          border-radius: 24px;
          color: #d7d4d0;
          text-align: left;
        }
        .gena-logo-panel {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 180px;
          padding: 22px 32px;
          background: #252629;
          border: 1px solid #4a4b4f;
          border-radius: 20px;
          overflow: hidden;
        }
        .gena-logo {
          display: block;
          width: min(78%, 460px);
          height: auto;
          max-width: 100%;
          max-height: 125px;
          object-fit: contain;
        }
        .gena-category {
          margin: 36px 0 0;
          color: #b87842;
          font-family: Inter, Manrope, Montserrat, var(--font-montserrat), Arial, sans-serif;
          font-size: 15px;
          font-weight: 500;
          line-height: 1.4;
          letter-spacing: 0.22em;
        }
        .gena-title {
          margin: 14px 0 0;
          color: #d7d4d0;
          font-family: "Cormorant Garamond", "Playfair Display", Georgia, serif;
          font-size: clamp(30px, 5vw, 42px);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: 0.08em;
        }
        .gena-locations {
          margin: 16px 0 0;
          color: #c8ae90;
          font-family: Inter, Manrope, Montserrat, var(--font-montserrat), Arial, sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.55;
          letter-spacing: 0.16em;
        }
        .gena-description {
          max-width: 620px;
          margin: 30px 0 0;
          color: #c1c0cf;
          font-family: Inter, Manrope, var(--font-montserrat), Arial, sans-serif;
          font-size: 17px;
          font-weight: 400;
          line-height: 1.6;
        }
        .gena-actions {
          display: flex;
          gap: 16px;
          margin-top: 38px;
        }
        .gena-button {
          display: inline-flex;
          flex: 1;
          align-items: center;
          justify-content: center;
          min-height: 90px;
          padding: 16px 24px;
          border: 1px solid #d1cfcc;
          border-radius: 999px;
          box-sizing: border-box;
          font-family: Inter, Manrope, Montserrat, var(--font-montserrat), Arial, sans-serif;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.35;
          letter-spacing: 0.16em;
          text-align: center;
          text-decoration: none;
          transition: background-color 180ms ease, border-color 180ms ease,
            color 180ms ease, box-shadow 180ms ease;
        }
        .gena-button--primary {
          color: #c2743b;
          background: transparent;
          box-shadow: 0 0 22px rgba(218, 182, 145, 0.16);
        }
        .gena-button--secondary {
          color: #d7d4d0;
          background: transparent;
        }
        .gena-button--primary:hover {
          color: #d28a52;
          background: #3a3b3c;
          box-shadow: 0 0 28px rgba(218, 182, 145, 0.24);
        }
        .gena-button--secondary:hover {
          background: #373839;
          border-color: #e0ddd8;
        }
        .gena-button:focus { outline: none; }
        .gena-button:focus-visible {
          outline: 2px solid #d28a52;
          outline-offset: 4px;
        }
        @media (max-width: 560px) {
          .gena-card {
            padding: 24px;
            border-radius: 22px;
          }
          .gena-logo-panel {
            min-height: 145px;
            padding: 18px 22px;
          }
          .gena-logo {
            width: min(68%, 280px);
            max-height: 105px;
          }
          .gena-category {
            margin-top: 32px;
            font-size: 13px;
          }
          .gena-locations {
            font-size: 14px;
            letter-spacing: 0.13em;
          }
          .gena-description {
            margin-top: 26px;
            font-size: 16px;
          }
          .gena-actions {
            flex-direction: column;
            gap: 12px;
            margin-top: 32px;
          }
          .gena-button {
            min-height: 68px;
            font-size: 14px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .gena-button { transition: none; }
        }
      `}</style>
    </>
  );
}
