// Zustand store for authentication state management
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * AuthState type
 * Defines the shape of authentication state and actions
 */
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

/**
 * useAuthStore
 * Zustand store for managing authentication state and actions
 * Persists state in localStorage under 'auth-storage' key
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state values
      sessionId: null,
      accountId: null,
      requestToken: null,
      accountUsername: null,
      // Setters for each state property
      setSessionId: (sessionId) => set({ sessionId }),
      setAccountId: (accountId) => set({ accountId }),
      setAccountUsername: (accountUsername) => set({ accountUsername }),
      setRequestToken: (token) => set({ requestToken: token }),
      // Logout resets all state properties
      logout: () => {
        set({
          sessionId: null,
          accountId: null,
          requestToken: null,
          accountUsername: null,
        });
        // 👇 then wipe persisted storage
        localStorage.removeItem('auth-storage');
      },
    }),
    { name: 'auth-storage' } // localStorage key
  )
);
