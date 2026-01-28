'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, LogIn } from 'lucide-react';

export default function AdminLogin() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token.trim()) {
      setError('Veuillez entrer le token');
      return;
    }
    // Rediriger vers la page avec le token
    router.push(`/admin/yachts?token=${encodeURIComponent(token.trim())}`);
  };

  return (
    <div className="min-h-screen bg-[#303135] flex items-center justify-center p-4">
      <div className="bg-[#1b223d] border border-gray-700 rounded-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Qualityacht</h1>
          <p className="text-gray-400 text-sm">Entrez votre token pour acceder au panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Token d'acces</label>
            <input
              type="password"
              value={token}
              onChange={(e) => { setToken(e.target.value); setError(''); }}
              placeholder="Votre token secret..."
              className="w-full px-4 py-3 bg-[#252540] border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            <LogIn className="w-5 h-5" />
            Connexion
          </button>
        </form>

        <p className="text-gray-500 text-xs text-center mt-6">
          Acces reserve aux administrateurs
        </p>
      </div>
    </div>
  );
}
