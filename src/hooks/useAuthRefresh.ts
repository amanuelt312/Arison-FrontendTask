import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/auth";
import { refreshAccessToken } from "../lib/api";

// Refresh a bit before actual expiry (e.g., 20 seconds earlier)
const REFRESH_EARLY_MS = 20_000;

export function useAuthRefresh() {
  const expiresAt = useAuthStore((s) => s.expiresAt);
  const accessToken = useAuthStore((s) => s.accessToken);
  const refreshToken = useAuthStore((s) => s.refreshToken);
  const userId = useAuthStore((s) => s.user?._id);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // If missing creds, nothing to do
    if (!accessToken || !refreshToken || !userId || !expiresAt) return;

    const delay = Math.max(0, expiresAt - Date.now() - REFRESH_EARLY_MS);

    const schedule = async () => {
      const ok = await refreshAccessToken();
      if (!ok) {
        clearAuth();
        return;
      }
      // Reschedule next refresh based on updated store values
      const nextExpiresAt = useAuthStore.getState().expiresAt ?? 0;
      const nextDelay = Math.max(
        0,
        nextExpiresAt - Date.now() - REFRESH_EARLY_MS
      );
      timerRef.current = window.setTimeout(schedule, nextDelay);
    };

    timerRef.current = window.setTimeout(schedule, delay);

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [accessToken, refreshToken, userId, expiresAt, clearAuth]);
}
