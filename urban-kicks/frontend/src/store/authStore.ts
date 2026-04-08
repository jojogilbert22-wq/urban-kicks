import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  accessToken: string | null;
  email: string | null;
  role: string | null;
  setAuth: (token: string, email: string, role: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      accessToken: null,
      email: null,
      role: null,
      setAuth: (accessToken, email, role) => set({ accessToken, email, role }),
      logout: () => set({ accessToken: null, email: null, role: null }),
      isAuthenticated: () => !!get().accessToken,
    }),
    { name: 'urban-kicks-auth' }
  )
);
