import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { LoginResponse, User } from "../types/auth";

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  tokenType: string | null;
  expiresAt: number | null; // epoch ms
  setAuth: (payload: LoginResponse) => void;
  setAccessToken: (token: string, tokenType: string, expiresIn: number) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      tokenType: null,
      expiresAt: null,
      setAuth: (payload) => {
        const expiresAt = Date.now() + payload.expiresIn * 1000;
        set({
          user: payload.user,
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken,
          tokenType: payload.tokenType ?? "Bearer",
          expiresAt,
        });
      },
      setAccessToken: (token, tokenType, expiresIn) => {
        const expiresAt = Date.now() + expiresIn * 1000;
        set({
          accessToken: token,
          tokenType: tokenType ?? "Bearer",
          expiresAt,
        });
      },
      clearAuth: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          tokenType: null,
          expiresAt: null,
        }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        tokenType: state.tokenType,
        expiresAt: state.expiresAt,
      }),
    }
  )
);
