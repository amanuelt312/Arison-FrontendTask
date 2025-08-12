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

// Refresh slightly before expiry to avoid 401s due to clock skew
const REFRESH_EARLY_MS = 30_000;
let refreshingPromise: Promise<boolean> | null = null;

const maskToken = (token: string | null | undefined): string => {
  if (!token) return String(token);
  return token.length > 12
    ? `${token.slice(0, 6)}...${token.slice(-4)}`
    : token;
};

async function ensureFreshToken(): Promise<boolean> {
  const { accessToken, refreshToken, user, expiresAt } =
    useAuthStore.getState();

  const now = Date.now();
  const skewMs = (expiresAt ?? 0) - now;
  const needsRefresh =
    !!accessToken &&
    !!refreshToken &&
    !!user?._id &&
    typeof expiresAt === "number" &&
    skewMs <= REFRESH_EARLY_MS;

  console.log("[auth] ensureFreshToken", {
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken,
    userId: user?._id,
    expiresAt,
    now,
    skewMs,
    needsRefresh,
    inflight: !!refreshingPromise,
  });

  if (!accessToken || !refreshToken || !user?._id) return false;
  if (!needsRefresh) return true;

  if (!refreshingPromise) {
    refreshingPromise = refreshAccessToken().finally(() => {
      refreshingPromise = null;
    });
  }
  return refreshingPromise;
}

type ApiFetchOptions = RequestInit & {
  skipAuth?: boolean;
};

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
  const { skipAuth, headers, ...rest } = options;

  console.log("[auth] apiFetch ->", {
    url,
    skipAuth,
    method: rest.method || "GET",
  });

  // Preflight refresh if token is near expiry
  if (!skipAuth) {
    await ensureFreshToken().catch((e) => {
      console.warn("[auth] ensureFreshToken failed", e);
    });
  }

  const authNow = useAuthStore.getState();

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string> | undefined),
  };

  if (!skipAuth && authNow.accessToken) {
    finalHeaders["Authorization"] = `${authNow.tokenType || "Bearer"} ${
      authNow.accessToken
    }`;
  }

  let response = await fetch(url, {
    ...rest,
    headers: finalHeaders,
  });
  console.log("[auth] apiFetch initial response", { status: response.status });

  // If unauthorized, try refresh once via shared promise and retry
  if (
    response.status === 401 &&
    !options.skipAuth &&
    authNow.refreshToken &&
    authNow.user?._id
  ) {
    console.warn("[auth] 401 received; attempting refresh then retry", {
      userId: authNow.user?._id,
      hasRefreshToken: !!authNow.refreshToken,
    });
    const refreshed = await (refreshingPromise ?? refreshAccessToken());
    console.log("[auth] refresh result after 401", { refreshed });
    if (refreshed) {
      const authAfter = useAuthStore.getState();
      const retryHeaders: Record<string, string> = {
        ...finalHeaders,
        Authorization: `${authAfter.tokenType || "Bearer"} ${
          authAfter.accessToken
        }`,
      };
      response = await fetch(url, { ...rest, headers: retryHeaders });
      console.log("[auth] retry response", { status: response.status });
    }
  }

  // If still unauthorized, clear session for a clean redirect via guard
  if (response.status === 401 && !options.skipAuth) {
    console.warn("[auth] still 401 after refresh attempt; clearing auth");
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
    console.error("[auth] apiFetch error", {
      url,
      status: response.status,
      message,
    });
    throw new Error(message);
  }

  // Try to parse JSON; some endpoints may return empty
  const text = await response.text();
  return text ? (JSON.parse(text) as T) : (undefined as unknown as T);
}

export async function refreshAccessToken(): Promise<boolean> {
  const { refreshToken, user, setAccessToken } = useAuthStore.getState();
  if (!refreshToken || !user?._id) {
    console.warn("[auth] refreshAccessToken missing creds", {
      hasRefreshToken: !!refreshToken,
      userId: user?._id,
    });
    return false;
  }

  try {
    console.log("[auth] refreshAccessToken start", {
      userId: user._id,
      refreshToken: maskToken(refreshToken),
    });

    const res = await fetch(`${BASE_URL}/api/v1/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Some backends accept refresh token in Authorization header
        Authorization: `Bearer ${refreshToken}`,
      },
      body: JSON.stringify({ refreshToken, userId: user._id }),
    });

    console.log("[auth] refreshAccessToken response", { status: res.status });
    if (!res.ok) return false;

    const json: RefreshResponse = await res.json();
    console.log("[auth] refreshAccessToken payload", {
      success: json?.success,
      hasAccessToken: !!json?.data?.accessToken,
      tokenType: json?.data?.tokenType,
      expiresIn: json?.data?.expiresIn,
    });

    if (json?.success && json.data?.accessToken) {
      setAccessToken(
        json.data.accessToken,
        json.data.tokenType,
        json.data.expiresIn
      );
      console.log("[auth] setAccessToken applied");
      return true;
    }
  } catch (e) {
    console.error("[auth] refreshAccessToken error", e);
  }
  return false;
}
