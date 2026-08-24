'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, LogIn } from 'lucide-react';

// Le secret est envoye dans le CORPS d'une requete POST. Il ne transite jamais par
// l'URL et n'est jamais conserve cote navigateur : le serveur repond en posant un
// cookie de session HttpOnly, inaccessible au JavaScript.

export default function AdminLogin() {
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!secret.trim()) {
      setError('Veuillez entrer le token');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: secret.trim() }),
      });

      if (res.ok) {
        setSecret('');
        router.replace('/admin/yachts');
        router.refresh();
        return;
      }
      if (res.status === 503) {
        setError("L'administration n'est pas configuree sur ce serveur.");
      } else {
        // Message volontairement generique : ne rien apprendre a un attaquant.
        setError('Identifiants invalides.');
      }
    } catch {
      setError('Connexion impossible. Reessayez.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#303135] flex items-center justify-center p-4">
      <div className="bg-[#1b223d] border border-gray-700 rounded-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-copper-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-copper-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Qualityacht</h1>
          <p className="text-gray-400 text-sm">Entrez votre token pour acceder au panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-secret" className="block text-sm text-gray-300 mb-2">
              Token d&apos;acces
            </label>
            <input
              id="admin-secret"
              name="secret"
              type="password"
              autoComplete="current-password"
              value={secret}
              onChange={(e) => { setSecret(e.target.value); setError(''); }}
              placeholder="Votre token secret..."
              className="w-full px-4 py-3 bg-[#252540] border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-copper-500 focus:border-transparent transition"
              autoFocus
            />
            {error && <p role="alert" className="text-red-400 text-sm mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-copper-500 hover:bg-copper-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            <LogIn className="w-5 h-5" />
            {loading ? 'Connexion…' : 'Connexion'}
          </button>
        </form>

        <p className="text-gray-500 text-xs text-center mt-6">
          Acces reserve aux administrateurs
        </p>
      </div>
    </div>
  );
}
