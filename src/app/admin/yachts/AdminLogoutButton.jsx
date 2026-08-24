'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

// Deconnexion : SEUL le serveur efface le cookie. Le JavaScript n'y touche jamais
// (il est HttpOnly) et n'affirme la deconnexion que si l'API a repondu OK.

export default function AdminLogoutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const logout = async () => {
    if (loading) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/auth/logout', { method: 'POST' });
      if (!res.ok) {
        // La session est toujours active : ne pas laisser croire le contraire.
        setError('Deconnexion echouee. Vous etes toujours connecte.');
        return;
      }
      router.replace('/admin/yachts');
      router.refresh();
    } catch {
      setError('Deconnexion impossible. Verifiez votre connexion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-none flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={logout}
        disabled={loading}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400 disabled:opacity-60 text-sm font-medium transition-colors whitespace-nowrap"
      >
        <LogOut className="w-4 h-4" aria-hidden />
        {loading ? 'Deconnexion…' : 'Deconnexion'}
      </button>
      {error && (
        <p role="alert" className="text-xs text-red-400 max-w-[16rem] text-right">{error}</p>
      )}
    </div>
  );
}
