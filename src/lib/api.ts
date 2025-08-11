import { useAuthStore } from "../store/auth";
import type { RefreshResponse } from "../types/auth";

const DEFAULT_BASE_URL = "https://voomgo.zadulmead.org";

const getBaseUrl = (): string => {
  // Prefer Vite-exposed env, then legacy, else default
  const fromVite = (import.meta as any).env?.VITE_BASE_URL;
  const legacy = (import.meta as any).env?.BaseUrl;
  return fromVite || legacy || DEFAULT_BASE_URL;
};

const BASE_URL = getBaseUrl();

type ApiFetchOptions = RequestInit & {
  skipAuth?: boolean;
};

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
  const { skipAuth, headers, ...rest } = options;

  const auth = useAuthStore.getState();

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string> | undefined),
  };

  if (!skipAuth && auth.accessToken) {
    finalHeaders["Authorization"] = `${auth.tokenType || "Bearer"} ${
      auth.accessToken
    }`;
  }

  let response = await fetch(url, {
    ...rest,
    headers: finalHeaders,
  });

  // If unauthorized, try refresh once
  if (
    response.status === 401 &&
    !options.skipAuth &&
    auth.refreshToken &&
    auth.user?._id
  ) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      const authAfter = useAuthStore.getState();
      const retryHeaders: Record<string, string> = {
        ...finalHeaders,
        Authorization: `${authAfter.tokenType || "Bearer"} ${
          authAfter.accessToken
        }`,
      };
      response = await fetch(url, { ...rest, headers: retryHeaders });
    }
  }

  // If still unauthorized, clear session for a clean redirect via guard
  if (response.status === 401 && !options.skipAuth) {
    const { clearAuth } = useAuthStore.getState();
    clearAuth();
  }

  if (!response.ok) {
    // Try to parse error message
    let message = `Request failed with status ${response.status}`;
    try {
      const data = await response.json();
      message = data?.message || data?.error || message;
    } catch (_) {}
    throw new Error(message);
  }

  // Try to parse JSON; some endpoints may return empty
  const text = await response.text();
  return text ? (JSON.parse(text) as T) : (undefined as unknown as T);
}

export async function refreshAccessToken(): Promise<boolean> {
  const { refreshToken, user, setAccessToken } = useAuthStore.getState();
  if (!refreshToken || !user?._id) return false;

  try {
    const res = await fetch(`${BASE_URL}/api/v1/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken, userId: user._id }),
    });

    if (!res.ok) return false;

    const json: RefreshResponse = await res.json();
    if (json?.success && json.data?.accessToken) {
      setAccessToken(
        json.data.accessToken,
        json.data.tokenType,
        json.data.expiresIn
      );
      return true;
    }
  } catch (_) {
    // Ignore and treat as failed refresh
  }
  return false;
}
