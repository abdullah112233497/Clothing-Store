"use client";

const memory = new Map<string, { value: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000;

function cachedResponse(value: unknown) {
  return new Response(JSON.stringify(value), {
    status: 200,
    headers: { "Content-Type": "application/json", "X-Admin-Cache": "HIT" },
  });
}

function readCache(input: string) {
  const now = Date.now();
  const inMemory = memory.get(input);
  if (inMemory && now - inMemory.timestamp < CACHE_TTL) return inMemory;
  if (inMemory) memory.delete(input);
  try {
    const stored = sessionStorage.getItem(`admin-cache:${input}`);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as { value: unknown; timestamp: number };
    if (now - parsed.timestamp >= CACHE_TTL) {
      sessionStorage.removeItem(`admin-cache:${input}`);
      return null;
    }
    memory.set(input, parsed);
    return parsed;
  } catch {
    return null;
  }
}

export async function adminFetch(input: string, init?: RequestInit) {
  const method = (init?.method || "GET").toUpperCase();
  if (method !== "GET" || typeof window === "undefined") return fetch(input, init);
  const cached = readCache(input);
  if (cached) return cachedResponse(cached.value);
  const response = await fetch(input, init);
  if (response.ok) {
    const entry = { value: await response.clone().json(), timestamp: Date.now() };
    memory.set(input, entry);
    try { sessionStorage.setItem(`admin-cache:${input}`, JSON.stringify(entry)); } catch { /* Ignore storage quota errors. */ }
  } else if (response.status === 401 || response.status === 403) {
    clearAdminCache();
  }
  return response;
}

export async function prefetchAdminData(input: string) {
  if (typeof window === "undefined" || readCache(input)) return;
  try {
    await adminFetch(input);
  } catch {
    // Normal page loading still owns user-visible error handling.
  }
}

export function invalidateAdminCache(prefix: string) {
  for (const key of memory.keys()) if (key.startsWith(prefix)) memory.delete(key);
  try { for (let i = sessionStorage.length - 1; i >= 0; i--) { const key = sessionStorage.key(i); if (key?.startsWith(`admin-cache:${prefix}`)) sessionStorage.removeItem(key); } } catch { /* Ignore storage errors. */ }
}

export function clearAdminCache() {
  memory.clear();
  try {
    for (let i = sessionStorage.length - 1; i >= 0; i--) {
      const key = sessionStorage.key(i);
      if (key?.startsWith("admin-cache:")) sessionStorage.removeItem(key);
    }
  } catch { /* Ignore unavailable browser storage. */ }
}
