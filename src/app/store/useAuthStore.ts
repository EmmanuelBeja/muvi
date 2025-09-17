import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  sessionId: string | null;
  accountId: number | null;
  requestToken: string | null;
  accountUsername: string | null;
  setSessionId: (sessionId: string | null) => void;
  setAccountId: (accountId: number | null) => void;
  setAccountUsername: (username: string | null) => void;
  setRequestToken: (token: string | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      sessionId: null,
      accountId: null,
      requestToken: null,
      accountUsername: null,
      setSessionId: (sessionId) => set({ sessionId }),
      setAccountId: (accountId) => set({ accountId }),
      setAccountUsername: (accountUsername) => set({ accountUsername }),
      setRequestToken: (token) => set({ requestToken: token }),
      logout: () =>
        set({
          sessionId: null,
          accountId: null,
          requestToken: null,
          accountUsername: null,
        }),
    }),
    { name: 'auth-storage' } // localStorage key
  )
);
