'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const { login } = useAdminAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const ok = login(email, password);
    if (ok) {
      router.push('/admin');
    } else {
      setError('E-mail ou senha incorretos');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-page px-4"
      style={{ fontFamily: "'Mozilla Text', 'Plus Jakarta Sans', sans-serif" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Mozilla+Text:wght@200..700&display=swap"
        rel="stylesheet"
      />

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-card-clean border border-border-clean rounded-card-clean p-8"
          style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <img src="/icone.svg" alt="Anacli" className="w-14 h-14 mb-4" />
            <h1 className="text-2xl font-bold text-text-primary-clean">Painel Anacli</h1>
            <p className="text-text-secondary-clean text-sm mt-1">Acesso restrito à administração</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-text-primary-clean mb-1.5">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@anacli.com.br"
                className="w-full px-4 py-3 rounded-button-clean bg-gray-50 border border-border-clean text-text-primary-clean placeholder:text-text-secondary-clean focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-text-primary-clean mb-1.5">Senha</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-button-clean bg-gray-50 border border-border-clean text-text-primary-clean placeholder:text-text-secondary-clean focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary-clean hover:text-text-primary-clean transition-colors"
                >
                  {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded-button-clean py-2">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-button-clean bg-brand-accent hover:bg-brand-accent/90 disabled:bg-brand-accent/50 text-white font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          {/* Hint */}
          <div className="mt-6 p-3 rounded-button-clean bg-gray-50 border border-border-clean">
            <p className="text-xs text-text-secondary-clean text-center">
              Acesso demo: <span className="text-text-primary-clean font-medium">admin@anacli.com.br</span> / <span className="text-text-primary-clean font-medium">admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
