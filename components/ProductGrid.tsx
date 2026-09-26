"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ProductGridSkeleton } from "./ProductCardSkeleton";
import { catalogFetch, subscribeCatalogRefresh } from "@/lib/catalog-client";

type Product = {
  id: number | string;
  slug?: string;
  name: string;
  price: string;
  category: string;
  image: string;
  variants?: Array<{
    id: number;
    stock: number;
    available: boolean;
    price: number;
    options: Record<string, { value: string; displayValue?: string; colorHex?: string }>;
  }>;
};

const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "Relaxed Fit Coat",
    price: "Rs. 4,500",
    category: "Women",
    image: "/images/product-1.png",
  },
  {
    id: 2,
    name: "Classic Oversized Black Dress",
    price: "Rs. 2,990",
    category: "Men",
    image: "/images/product-2.png",
  },
  {
    id: 3,
    name: "Brown Blazer",
    price: "Rs. 4,990",
    category: "Women",
    image: "/images/product-3.png",
  },
  {
    id: 4,
    name: "Brown leather Bag",
    price: "Rs. 6,490",
    category: "Men",
    image: "/images/product-4.png",
  },
  {
    id: 5,
    name: "Minimal Shoulder Bag",
    price: "Rs. 3,990",
    category: "Accessories",
    image: "/images/product-5.png",
  },
  {
    id: 6,
    name: "Everyday Sneakers",
    price: "Rs. 5,490",
    category: "Accessories",
    image: "/images/product-6.png",
  },
  {
    id: 7,
    name: "Premium Knit Top",
    price: "Rs. 3,790",
    category: "Women",
    image: "/images/product-7.png",
  },
  {
    id: 8,
    name: "Relaxed Cargo Pants",
    price: "Rs. 4,490",
    category: "Men",
    image: "/images/product-8.png",
  },
];

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const refresh = () => catalogFetch("/api/products")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active) return;
        if (Array.isArray(data?.products) && data.products.length > 0) {
          const mapped = data.products.slice(0, 8).map(
            (p: {
              id: number;
              slug: string;
              name: string;
              category_slug: string;
              base_price: number;
              sale_price: number | null;
              images: Array<{ url: string }>;
              variants: Product["variants"];
            }) => ({
              id: p.id,
              slug: p.slug,
              name: p.name,
              price: `Rs. ${Number(p.sale_price ?? p.base_price).toLocaleString()}`,
              category: p.category_slug?.startsWith("ladies-")
                ? "Women"
                : p.category_slug?.startsWith("men-")
                ? "Men"
                : "Accessories",
              image: p.images?.[0]?.url || "",
              variants: p.variants,
            })
          );
          setProducts(mapped);
        } else {
          setProducts([]);
        }
      })
      .catch(() => {
        if (active) {
          setProducts([]);
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    void refresh();
    const unsubscribe = subscribeCatalogRefresh(() => void refresh());
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  return (
    <section className="w-full">
      {/* Product Heading */}
      <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#A06E31]">
            New Season
          </p>

          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Latest Arrivals
          </h2>
        </div>

        <a
          href="/shop"
          className="text-sm font-medium underline underline-offset-4 transition hover:text-[#A06E31]"
        >
          View All Products
        </a>
      </div>

      {/* Skeletons while loading or live products grid */}
      {isLoading ? (
        <ProductGridSkeleton count={8} />
      ) : products.length === 0 ? (
        <p className="rounded-xl border border-black/10 bg-[#F8F6F2] px-6 py-10 text-center text-sm text-gray-600">
          New arrivals are currently unavailable. Check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-x-3.5 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              slug={product.slug}
              name={product.name}
              price={product.price}
              category={product.category}
              image={product.image}
              variants={product.variants}
            />
          ))}
        </div>
      )}
    </section>
  );
}
