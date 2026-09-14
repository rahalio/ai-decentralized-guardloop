'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  clearAuthTokens,
  getAccessToken,
  getApiKey,
  isAuthenticated,
  setApiKey,
  setAuthTokens,
} from '@/services/shared/infrastructure/auth-tokens';

type AuthContextValue = {
  ready: boolean;
  signedIn: boolean;
  signInWithDemoKey: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const DEMO_KEY = 'guardloop_demo_local_dev_key';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready] = useState(true);
  const [signedIn, setSignedIn] = useState(() =>
    typeof window === 'undefined' ? false : isAuthenticated(),
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      ready,
      signedIn,
      signInWithDemoKey: () => {
        setApiKey(DEMO_KEY);
        setSignedIn(true);
      },
      signIn: async (email, _password) => {
        // Demo stub: accept any credentials and issue a local session token.
        const access = `demo.${btoa(unescape(encodeURIComponent(email || 'cro@demo.local')))}`;
        setAuthTokens({
          accessToken: access,
          refreshToken: 'demo-refresh',
        });
        setApiKey(DEMO_KEY);
        setSignedIn(true);
      },
      signOut: () => {
        clearAuthTokens();
        setSignedIn(false);
      },
    }),
    [ready, signedIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth requires AuthProvider');
  return ctx;
}

export function useOptionalAuth() {
  return useContext(AuthContext);
}

export function peekAuthHeaders() {
  return { token: getAccessToken(), key: getApiKey() };
}
