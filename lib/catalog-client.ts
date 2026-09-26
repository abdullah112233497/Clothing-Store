"use client";

const inFlight = new Map<string, Promise<Response>>();

// Stock is live data. Only share simultaneous requests, never cached inventory.
export async function catalogFetch(url: string) {
  const pending = inFlight.get(url);
  if (pending) return (await pending).clone();

  const request = fetch(url, { cache: "no-store" }).finally(() => inFlight.delete(url));
  inFlight.set(url, request);
  return (await request).clone();
}

export function subscribeCatalogRefresh(refresh: () => void) {
  const onVisible = () => {
    if (document.visibilityState === "visible") refresh();
  };
  const timer = window.setInterval(onVisible, 30_000);
  window.addEventListener("focus", onVisible);
  window.addEventListener("catalogUpdated", onVisible);
  document.addEventListener("visibilitychange", onVisible);
  return () => {
    window.clearInterval(timer);
    window.removeEventListener("focus", onVisible);
    window.removeEventListener("catalogUpdated", onVisible);
    document.removeEventListener("visibilitychange", onVisible);
  };
}

export function invalidateCatalogClientCache() {
  try {
    for (let index = sessionStorage.length - 1; index >= 0; index -= 1) {
      const key = sessionStorage.key(index);
      if (key?.startsWith("catalog-cache:")) sessionStorage.removeItem(key);
    }
  } catch { /* Storage can be unavailable. */ }
  window.dispatchEvent(new Event("catalogUpdated"));
}
