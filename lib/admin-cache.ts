"use client";

const memory = new Map<string, { value: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000;

export async function adminFetch(input: string, init?: RequestInit) {
  const method = (init?.method || "GET").toUpperCase();
  if (method !== "GET" || typeof window === "undefined") return fetch(input, init);
  const now = Date.now();
  const inMemory = memory.get(input);
  if (inMemory && now - inMemory.timestamp < CACHE_TTL) return new Response(JSON.stringify(inMemory.value), { status: 200 });
  try {
    const stored = sessionStorage.getItem(`admin-cache:${input}`);
    if (stored) {
      const parsed = JSON.parse(stored) as { value: unknown; timestamp: number };
      if (now - parsed.timestamp < CACHE_TTL) {
        memory.set(input, parsed);
        return new Response(JSON.stringify(parsed.value), { status: 200 });
      }
    }
  } catch { /* Ignore unavailable browser storage. */ }
  const response = await fetch(input, init);
  if (response.ok) {
    const entry = { value: await response.clone().json(), timestamp: now };
    memory.set(input, entry);
    try { sessionStorage.setItem(`admin-cache:${input}`, JSON.stringify(entry)); } catch { /* Ignore storage quota errors. */ }
  }
  return response;
}

export function invalidateAdminCache(prefix: string) {
  for (const key of memory.keys()) if (key.startsWith(prefix)) memory.delete(key);
  try { for (let i = sessionStorage.length - 1; i >= 0; i--) { const key = sessionStorage.key(i); if (key?.startsWith(`admin-cache:${prefix}`)) sessionStorage.removeItem(key); } } catch { /* Ignore storage errors. */ }
}
