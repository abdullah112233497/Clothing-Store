"use client";

export const WISHLIST_STORAGE_KEY = "wishlistItems";

export function readWishlistItems<T = Record<string, unknown>>(): T[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed as T[] : [];
  } catch {
    return [];
  }
}

export function writeWishlistItems<T>(items: T[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("wishlistUpdated", {
    detail: { items, count: items.length },
  }));
}

