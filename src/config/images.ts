export const PLACEHOLDER_IMAGE = "/vite.svg";

function getBaseUrl(): string {
  const fromVite = (import.meta as any).env?.VITE_BASE_URL as
    | string
    | undefined;
  const legacy = (import.meta as any).env?.BaseUrl as string | undefined;
  return fromVite || legacy || "https://voomgo.zadulmead.org";
}

export function resolveMediaUrl(url?: string | null): string {
  if (!url || url.trim() === "") return PLACEHOLDER_IMAGE;
  if (/^https?:\/\//i.test(url)) return url;
  const base = getBaseUrl().replace(/\/$/, "");
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${base}${path}`;
}
