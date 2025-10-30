export const SITE_URL = (() => {
  const envUrl = (import.meta.env as any)?.VITE_SITE_URL as string | undefined;
  const normalized = envUrl ? envUrl.replace(/\/$/, "") : undefined;
  if (normalized) return normalized;
  if (typeof window !== "undefined" && window.location?.origin) return window.location.origin;
  return "";
})();

