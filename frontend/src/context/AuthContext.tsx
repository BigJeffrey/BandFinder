import { createContext, useMemo, useState } from 'react';
import { authStorage } from '../utils/storage';
import type { AuthResponse, User } from '../types/auth';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  login: (session: AuthResponse) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => authStorage.getUser());
  const [token, setToken] = useState<string | null>(() => authStorage.getToken());

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      login: (session) => {
        authStorage.setSession(session.token, session.user);
        setUser(session.user);
        setToken(session.token);
      },
      logout: () => {
        authStorage.clearSession();
        setUser(null);
        setToken(null);
      },
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
