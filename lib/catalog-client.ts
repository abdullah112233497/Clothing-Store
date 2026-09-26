"use client";

const memory = new Map<string, { value: unknown; timestamp: number }>();
const inFlight = new Map<string, Promise<Response>>();
const CACHE_TTL = 5 * 60 * 1000;

function responseFrom(value: unknown) {
  return new Response(JSON.stringify(value), {
    status: 200,
    headers: { "Content-Type": "application/json", "X-Catalog-Cache": "HIT" },
  });
}

function read(url: string) {
  const now = Date.now();
  const current = memory.get(url);
  if (current && now - current.timestamp < CACHE_TTL) return current;
  if (current) memory.delete(url);
  try {
    const raw = sessionStorage.getItem(`catalog-cache:${url}`);
    if (!raw) return null;
    const stored = JSON.parse(raw) as { value: unknown; timestamp: number };
    if (now - stored.timestamp >= CACHE_TTL) {
      sessionStorage.removeItem(`catalog-cache:${url}`);
      return null;
    }
    memory.set(url, stored);
    return stored;
  } catch {
    return null;
  }
}

export async function catalogFetch(url: string) {
  if (typeof window === "undefined") return fetch(url);
  const cached = read(url);
  if (cached) return responseFrom(cached.value);

  const pending = inFlight.get(url);
  if (pending) return (await pending).clone();

  const request = fetch(url).then(async (response) => {
    if (response.ok) {
      const entry = { value: await response.clone().json(), timestamp: Date.now() };
      memory.set(url, entry);
      try { sessionStorage.setItem(`catalog-cache:${url}`, JSON.stringify(entry)); } catch { /* Storage can be unavailable. */ }
    }
    return response;
  }).finally(() => inFlight.delete(url));
  inFlight.set(url, request);
  return (await request).clone();
}

export function invalidateCatalogClientCache() {
  memory.clear();
  try {
    for (let index = sessionStorage.length - 1; index >= 0; index -= 1) {
      const key = sessionStorage.key(index);
      if (key?.startsWith("catalog-cache:")) sessionStorage.removeItem(key);
    }
  } catch { /* Storage can be unavailable. */ }
}
