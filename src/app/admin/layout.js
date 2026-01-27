// src/app/admin/layout.js - Layout pour les pages d'administration
// Ce layout supprime le header et footer du site pour les pages admin

export const metadata = {
  title: 'Administration | Qualityacht',
  robots: 'noindex, nofollow'
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#303135]">
      {children}
    </div>
  );
}
