'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Lock, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const AdminAuthContext = createContext<{
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
} | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('delicacy_admin_auth') === 'true';
    }
    return null;
  });
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Synchronization if needed, but handled by initializer for initial render
  }, []);

  const login = (password: string) => {
    if (password === 'admin123') { // Simple hardcoded password
      localStorage.setItem('delicacy_admin_auth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('delicacy_admin_auth');
    setIsAuthenticated(false);
    router.push('/');
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-200" />
      </div>
    );
  }

  if (!isAuthenticated && pathname !== '/admin') {
    router.push('/admin');
    return null;
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return context;
};

function AdminLogin({ onLogin }: { onLogin: (password: string) => boolean }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(password)) {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white border border-neutral-100 rounded-3xl p-8 shadow-xl shadow-neutral-900/5">
          <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center mb-8 mx-auto">
            <Lock className="w-8 h-8 text-white" />
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Admin Portal</h1>
            <p className="text-neutral-500 text-sm">Secure access to property management</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input 
                type="password" 
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className={`w-full px-6 py-4 bg-neutral-50 border ${error ? 'border-red-200 ring-4 ring-red-500/5' : 'border-neutral-100'} rounded-2xl focus:outline-none focus:ring-4 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all text-center text-lg tracking-widest`}
              />
              {error && (
                <p className="mt-2 text-center text-xs font-bold text-red-500 uppercase tracking-wider">
                  Incorrect access key
                </p>
              )}
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-neutral-900 text-white rounded-2xl font-bold hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-neutral-900/10"
            >
              Access Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-neutral-50 text-center">
            <Link href="/" className="text-sm font-medium text-neutral-400 hover:text-neutral-900 transition-colors uppercase tracking-widest">
              Return to Site
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
