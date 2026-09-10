// ══ Layout /sales/** ══
// Applique a /sales et a toutes ses sous-pages, presentes et futures, sans
// modifier les pages elles-memes :
//  - le fond commun nuages (.qy-sales-bg, globals.css) — meme fond que la
//    section "A World-Class Experience" de l'accueil ;
//  - le voile bleu (.sales-blue-overlay, globals.css).
export default function SalesLayout({ children }) {
  return (
    <div className="sales-blue-overlay">
      <div aria-hidden className="qy-sales-bg" />
      {children}
    </div>
  );
}
