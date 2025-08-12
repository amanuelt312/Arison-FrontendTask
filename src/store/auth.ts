import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { LoginResponse, User } from "../types/auth";

const maskToken = (token: string | null | undefined): string => {
  if (!token) return String(token);
  return token.length > 12
    ? `${token.slice(0, 6)}...${token.slice(-4)}`
    : token;
};

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
        console.log("[auth] setAuth", {
          userId: payload.user?._id,
          tokenType: payload.tokenType ?? "Bearer",
          accessToken: maskToken(payload.accessToken),
          refreshToken: maskToken(payload.refreshToken),
          expiresIn: payload.expiresIn,
          expiresAt,
        });
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
        console.log("[auth] setAccessToken", {
          tokenType: tokenType ?? "Bearer",
          accessToken: maskToken(token),
          expiresIn,
          expiresAt,
        });
        set({
          accessToken: token,
          tokenType: tokenType ?? "Bearer",
          expiresAt,
        });
      },
      clearAuth: () =>
        set(() => {
          console.warn("[auth] clearAuth called");
          return {
            user: null,
            accessToken: null,
            refreshToken: null,
            tokenType: null,
            expiresAt: null,
          };
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
