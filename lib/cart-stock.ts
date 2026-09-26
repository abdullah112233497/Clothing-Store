"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type StockCartItem = {
  slug?: string;
  variantId?: number;
  name: string;
  price: number;
  size: string;
  color?: string;
  quantity: number;
  image: string;
  availableQuantity?: number;
};

type Option = { value: string; displayValue?: string };
type StockProduct = {
  name: string;
  slug: string;
  variants: Array<{
    id: number;
    price: number;
    stock: number;
    available: boolean;
    options: Record<string, Option>;
  }>;
};

const normalize = (value: string | undefined) => (value || "").trim().toLowerCase();
const matchesOption = (selected: string | undefined, option?: Option) =>
  !selected || !option || [option.value, option.displayValue].some((value) => normalize(value) === normalize(selected));

export function reconcileCartStock(items: StockCartItem[], products: StockProduct[]) {
  const remaining = new Map<number, number>();
  const updated: StockCartItem[] = [];
  let changed = false;

  for (const item of items) {
    const product = products.find((candidate) => item.variantId
      ? candidate.variants.some((variant) => variant.id === item.variantId)
      : item.slug ? candidate.slug === item.slug : normalize(candidate.name) === normalize(item.name));
    const candidates = product?.variants.filter((variant) => variant.available && Number(variant.stock) > 0 && (item.variantId
      ? variant.id === item.variantId
      : matchesOption(item.size, variant.options.size || variant.options.shoe_size || variant.options.waist)
        && matchesOption(item.color, variant.options.color))) || [];
    const variant = candidates.length === 1 ? candidates[0] : undefined;
    const available = variant ? (remaining.get(variant.id) ?? Math.floor(Number(variant.stock))) : 0;
    if (!variant || !product || available < 1) {
      changed = true;
      continue;
    }

    const quantity = Math.min(Math.max(1, Math.floor(Number(item.quantity) || 1)), available);
    const price = Number(variant.price);
    if (quantity !== item.quantity || price !== item.price) changed = true;
    remaining.set(variant.id, available - quantity);
    updated.push({ ...item, slug: product.slug, variantId: variant.id, quantity, price, availableQuantity: Number(variant.stock) });
  }

  return { items: updated, changed };
}

function readCart(): StockCartItem[] {
  try {
    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

export function useStockCart() {
  const [cartItems, setCartItems] = useState<StockCartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [checkingStock, setCheckingStock] = useState(true);
  const [stockMessage, setStockMessage] = useState("");
  const [stockError, setStockError] = useState("");
  const lastSaved = useRef<string | null>(null);
  const requestId = useRef(0);

  const updateCart = useCallback((items: StockCartItem[]) => {
    setCartItems(items);
    const saved = JSON.stringify(items);
    lastSaved.current = saved;
    localStorage.setItem("cartItems", saved);
    window.dispatchEvent(new Event("cartUpdated"));
  }, []);

  const refreshStock = useCallback(async () => {
    const currentRequest = ++requestId.current;
    const savedItems = readCart();
    setCartItems(savedItems);
    setCheckingStock(true);
    setStockError("");
    try {
      if (!savedItems.length) return { items: savedItems, changed: false };
      const response = await fetch("/api/products", { cache: "no-store" });
      if (!response.ok) throw new Error("Stock check failed");
      const data = await response.json();
      if (!Array.isArray(data.products)) throw new Error("Stock check failed");
      if (currentRequest !== requestId.current) return null;
      // Read again so changes made in another tab while fetching are preserved.
      const result = reconcileCartStock(readCart(), data.products);
      updateCart(result.items);
      if (result.changed) setStockMessage("Your bag has been updated to reflect current availability and prices. Unavailable items were removed and quantities adjusted where needed. Please review your order.");
      return result;
    } catch {
      if (currentRequest === requestId.current) setStockError("We couldn't confirm availability. Your bag is saved. Please retry before checking out.");
      return null;
    } finally {
      if (currentRequest === requestId.current) {
        setCheckingStock(false);
        setLoaded(true);
      }
    }
  }, [updateCart]);

  useEffect(() => {
    const timer = window.setTimeout(() => void refreshStock(), 0);
    const handleUpdate = () => {
      if (localStorage.getItem("cartItems") !== lastSaved.current) void refreshStock();
    };
    const handleFocus = () => void refreshStock();
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("cartUpdated", handleUpdate);
    window.addEventListener("focus", handleFocus);
    return () => {
      window.clearTimeout(timer);
      requestId.current++;
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("cartUpdated", handleUpdate);
      window.removeEventListener("focus", handleFocus);
    };
  }, [refreshStock]);

  return { cartItems, loaded, checkingStock, stockMessage, stockError, refreshStock, updateCart };
}
