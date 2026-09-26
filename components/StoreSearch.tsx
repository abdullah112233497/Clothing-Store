"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Suggestion = {
  id: number;
  slug: string;
  name: string;
  category_slug: string;
  base_price: number;
  sale_price: number | null;
  images: Array<{ url: string }>;
};

export default function StoreSearch({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const listId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<{ term: string; products: Suggestion[] }>({ term: "", products: [] });
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const term = search.trim();
  const suggestions = results.term === term ? results.products : [];

  useEffect(() => {
    if (term.length < 2) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/products?search=${encodeURIComponent(term)}&suggest=1`,
          { cache: "no-store", signal: controller.signal },
        );
        if (!response.ok) throw new Error("Search is unavailable");
        const data = await response.json();
        if (!controller.signal.aborted) {
          setResults({ term, products: Array.isArray(data.products) ? data.products : [] });
          setFailed(false);
        }
      } catch {
        if (!controller.signal.aborted) setFailed(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 250);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [term]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("[data-store-search-toggle]")) return;
      if (panelRef.current && !panelRef.current.contains(target)) onClose();
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [onClose]);

  const searchHref = `/shop?search=${encodeURIComponent(term)}`;
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!term) return;
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      router.push(`/product/${suggestions[activeIndex].slug}`);
    } else {
      router.push(searchHref);
    }
    onClose();
  };

  return (
    <div id="store-search-panel" ref={panelRef} className="border-b border-black/10 bg-white px-4 py-4 shadow-lg sm:px-6">
      <div className="relative mx-auto max-w-2xl">
        <form onSubmit={handleSubmit} role="search" className="flex gap-2">
          <input
            type="search"
            value={search}
            onChange={(event) => {
              const value = event.target.value;
              setSearch(value);
              setActiveIndex(-1);
              setLoading(value.trim().length >= 2);
              setFailed(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.preventDefault();
                onClose();
              } else if (event.key === "ArrowDown" && suggestions.length) {
                event.preventDefault();
                setActiveIndex((index) => (index + 1) % suggestions.length);
              } else if (event.key === "ArrowUp" && suggestions.length) {
                event.preventDefault();
                setActiveIndex((index) => (index - 1 + suggestions.length) % suggestions.length);
              }
            }}
            placeholder="Search products, colors, styles..."
            aria-label="Search products"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={term.length >= 2 && suggestions.length > 0}
            aria-controls={suggestions.length ? listId : undefined}
            aria-activedescendant={activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
            autoComplete="off"
            autoFocus
            className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
          />
          <button type="submit" disabled={!term} className="rounded-lg bg-black px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#A06E31] disabled:opacity-50 sm:px-5">
            Search
          </button>
          <button type="button" onClick={onClose} aria-label="Close search" className="rounded-lg px-2 text-gray-500 hover:text-black sm:hidden">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="1.7" strokeLinecap="round" d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </form>

        {term.length >= 2 && (
          <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-black/10 bg-white shadow-xl">
            {loading ? (
              <p role="status" className="px-4 py-5 text-sm text-gray-500">Searching products...</p>
            ) : failed ? (
              <p role="status" className="px-4 py-5 text-sm text-gray-500">Search is temporarily unavailable. Please try again.</p>
            ) : suggestions.length ? (
              <>
                <p className="border-b border-gray-100 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-500">Suggestions</p>
                <div id={listId} role="listbox" aria-label="Product suggestions" className="max-h-[55vh] overflow-y-auto">
                  {suggestions.map((product, index) => (
                    <Link
                      key={product.id}
                      id={`${listId}-${index}`}
                      role="option"
                      aria-selected={activeIndex === index}
                      href={`/product/${product.slug}`}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={onClose}
                      className={`flex items-center gap-3 border-b border-gray-50 px-4 py-2.5 transition last:border-0 ${activeIndex === index ? "bg-[#F8F6F2]" : "hover:bg-[#F8F6F2]"}`}
                    >
                      <span className="h-14 w-11 shrink-0 overflow-hidden rounded bg-gray-100">
                        {product.images?.[0]?.url && <img src={product.images[0].url} alt="" className="h-full w-full object-cover" />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-gray-900">{product.name}</span>
                        <span className="block text-xs text-gray-500">{product.category_slug?.startsWith("ladies-") ? "Women" : product.category_slug?.startsWith("men-") ? "Men" : "Accessories"}</span>
                      </span>
                      <span className="shrink-0 text-xs font-semibold text-gray-900">Rs. {Number(product.sale_price ?? product.base_price).toLocaleString()}</span>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <p role="status" className="px-4 py-5 text-sm text-gray-500">No matching products found.</p>
            )}
            {!failed && <Link href={searchHref} onClick={onClose} className="block bg-[#F8F6F2] px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-900 transition hover:bg-[#EEE8E1]">View all results</Link>}
          </div>
        )}
      </div>
    </div>
  );
}
