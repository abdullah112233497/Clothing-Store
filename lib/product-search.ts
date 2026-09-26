export type SearchableProduct = {
  name: string;
  category?: string | null;
  category_slug?: string | null;
  description?: string | null;
  brand?: string | null;
  base_sku?: string | null;
  variants?: Array<{
    options?: Record<string, { value?: string; displayValue?: string }>;
  }> | null;
};

export function searchProducts<T extends SearchableProduct>(products: T[], query: string): T[] {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return products;

  return products
    .map((product, index) => {
      const name = product.name.toLowerCase();
      const category = product.category_slug?.startsWith("ladies-")
        ? "women"
        : product.category_slug?.startsWith("men-")
          ? "men"
          : product.category_slug?.startsWith("accessories") ||
              ["bags", "shoes", "other-accessories"].includes(product.category_slug || "")
            ? "accessories"
            : product.category?.toLowerCase() || "";
      const details = [
        name,
        product.brand?.toLowerCase() || "",
        product.description?.toLowerCase() || "",
        product.base_sku?.toLowerCase() || "",
        ...(product.variants || []).flatMap((variant) =>
          Object.values(variant.options || {}).flatMap((option) => [option.value || "", option.displayValue || ""]),
        ),
      ].join(" ").toLowerCase();

      const categoryWords = `${category} ${product.category || ""}`.toLowerCase().split(/\W+/);
      const detailWords = details.split(/\W+/);
      if (!terms.every((term) => categoryWords.some((word) => word.startsWith(term)) ||
        (["men", "women"].includes(term)
          ? detailWords.some((word) => word.startsWith(term))
          : details.includes(term)))) return null;

      const phrase = terms.join(" ");
      const score = name === phrase ? 0
        : name.startsWith(phrase) ? 1
          : name.split(/\s+/).some((word) => word.startsWith(phrase)) ? 2
            : name.includes(phrase) ? 3
              : terms.every((term) => name.includes(term)) ? 4
                : categoryWords.some((word) => word.startsWith(phrase)) ? 5 : 6;
      return { product, index, score };
    })
    .filter((item): item is { product: T; index: number; score: number } => item !== null)
    .sort((a, b) => a.score - b.score || a.index - b.index)
    .map((item) => item.product);
}
