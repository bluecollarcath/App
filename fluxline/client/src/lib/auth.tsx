import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { api, tokenStore, type User } from './api';

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, acceptTerms: boolean) => Promise<void>;
  setSession: (token: string, user: User) => void;
  logout: () => void;
  refresh: () => Promise<void>;
}

const Ctx = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!tokenStore.get()) { setUser(null); setLoading(false); return; }
    try {
      const { user } = await api<{ user: User }>('/me');
      setUser(user);
    } catch {
      tokenStore.set(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  const login = async (email: string, password: string) => {
    const r = await api<{ token: string; user: User }>('/auth/login', { body: { email, password } });
    tokenStore.set(r.token);
    setUser(r.user);
  };
  const signup = async (name: string, email: string, password: string, acceptTerms: boolean) => {
    const r = await api<{ token: string; user: User }>('/auth/signup', { body: { name, email, password, acceptTerms } });
    tokenStore.set(r.token);
    setUser(r.user);
  };
  const logout = () => { tokenStore.set(null); setUser(null); };
  const setSession = (token: string, u: User) => { tokenStore.set(token); setUser(u); };

  return <Ctx.Provider value={{ user, loading, login, signup, logout, refresh, setSession }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAuth outside AuthProvider');
  return v;
}
