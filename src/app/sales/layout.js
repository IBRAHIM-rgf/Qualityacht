// ══ Layout /sales/** ══
// Applique le voile bleu (.sales-blue-overlay, globals.css) a /sales et a toutes
// ses sous-pages, presentes et futures, sans modifier les pages elles-memes.
export default function SalesLayout({ children }) {
  return <div className="sales-blue-overlay">{children}</div>;
}
