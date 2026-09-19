
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";

type Product = {
  name: string;
  price: string;
  category: "Women" | "Men" | "Accessories";
  image: string;
};

const products: Product[] = [
  // WOMEN
  {
    name: "Essential Oversized Tee",
    price: "Rs. 3,499",
    category: "Women",
    image: "/images/product-1.png",
  },
  {
    name: "Relaxed Fit Trousers",
    price: "Rs. 6,499",
    category: "Women",
    image: "/images/product-4.png",
  },
  {
    name: "Premium Basic Hoodie",
    price: "Rs. 5,999",
    category: "Women",
    image: "/images/product-7.png",
  },
  {
    name: "Ribbed Knit Top",
    price: "Rs. 3,999",
    category: "Women",
    image: "/images/women-4.png",
  },
  {
    name: "Relaxed Linen Shirt",
    price: "Rs. 4,499",
    category: "Women",
    image: "/images/women-5.png",
  },
  {
    name: "Wide Leg Denim",
    price: "Rs. 5,499",
    category: "Women",
    image: "/images/women-6.png",
  },
  {
    name: "Oversized Blazer",
    price: "Rs. 8,499",
    category: "Women",
    image: "/images/women-7.png",
  },
  {
    name: "Satin Midi Dress",
    price: "Rs. 6,999",
    category: "Women",
    image: "/images/women-8.png",
  },
  {
    name: "Cropped Denim Jacket",
    price: "Rs. 6,499",
    category: "Women",
    image: "/images/women-9.png",
  },
  {
    name: "Everyday Co-ord Set",
    price: "Rs. 7,499",
    category: "Women",
    image: "/images/women-10.png",
  },

  // MEN
  {
    name: "Classic Casual Shirt",
    price: "Rs. 4,999",
    category: "Men",
    image: "/images/product-2.png",
  },
  {
    name: "Urban Denim Jacket",
    price: "Rs. 7,999",
    category: "Men",
    image: "/images/product-5.png",
  },
  {
    name: "Modern Cargo Pants",
    price: "Rs. 6,999",
    category: "Men",
    image: "/images/product-8.png",
  },
  {
    name: "Essential Oxford Shirt",
    price: "Rs. 4,999",
    category: "Men",
    image: "/images/men-4.png",
  },
  {
    name: "Relaxed Fit Polo",
    price: "Rs. 3,999",
    category: "Men",
    image: "/images/men-5.png",
  },
  {
    name: "Straight Fit Jeans",
    price: "Rs. 6,499",
    category: "Men",
    image: "/images/men-6.png",
  },
  {
    name: "Classic Overshirt",
    price: "Rs. 5,499",
    category: "Men",
    image: "/images/men-7.png",
  },
  {
    name: "Premium Bomber Jacket",
    price: "Rs. 8,999",
    category: "Men",
    image: "/images/men-8.png",
  },
  {
    name: "Regular Fit Chinos",
    price: "Rs. 5,999",
    category: "Men",
    image: "/images/men-9.png",
  },
  {
    name: "Essential Cotton Sweatshirt",
    price: "Rs. 5,499",
    category: "Men",
    image: "/images/men-10.png",
  },

  // ACCESSORIES
  {
    name: "Minimal Shoulder Bag",
    price: "Rs. 5,499",
    category: "Accessories",
    image: "/images/product-3.png",
  },
  {
    name: "Everyday Sneakers",
    price: "Rs. 8,499",
    category: "Accessories",
    image: "/images/product-6.png",
  },
  {
    name: "Classic Leather Handbag",
    price: "Rs. 7,499",
    category: "Accessories",
    image: "/images/accessories-4.png",
  },
  {
    name: "Minimal Crossbody Bag",
    price: "Rs. 5,999",
    category: "Accessories",
    image: "/images/accessories-5.png",
  },
  {
    name: "Everyday Backpack",
    price: "Rs. 6,499",
    category: "Accessories",
    image: "/images/accessories-6.png",
  },
  {
    name: "Classic Leather Belt",
    price: "Rs. 2,999",
    category: "Accessories",
    image: "/images/accessories-7.png",
  },
  {
    name: "Premium Sunglasses",
    price: "Rs. 4,499",
    category: "Accessories",
    image: "/images/accessories-8.png",
  },
  {
    name: "Everyday Watch",
    price: "Rs. 9,499",
    category: "Accessories",
    image: "/images/accessories-9.png",
  },
  {
    name: "Essential Cap",
    price: "Rs. 2,499",
    category: "Accessories",
    image: "/images/accessories-10.png",
  },
  {
    name: "Classic Canvas Tote",
    price: "Rs. 3,499",
    category: "Accessories",
    image: "/images/accessories-4.png",
  },
];

const categories = ["All", "Women", "Men", "Accessories"];

export default function ShopPage() {
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    if (category && categories.includes(category)) {
      setActiveCategory(category);
    } else {
      setActiveCategory("All");
    }

    setSearchQuery(search || "");
  }, [searchParams]);

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      activeCategory === "All" ||
      product.category === activeCategory;

    const searchText = searchQuery.toLowerCase();

    const searchMatch =
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText);

    return categoryMatch && searchMatch;
  });

  const changeCategory = (category: string) => {
    setActiveCategory(category);
    setSearchQuery("");

    if (category === "All") {
      window.history.pushState({}, "", "/shop");
    } else {
      window.history.pushState(
        {},
        "",
        `/shop?category=${category}`
      );
    }
  };

  const pageTitle =
    activeCategory === "All"
      ? "Shop All"
      : activeCategory;

  const pageDescription =
    activeCategory === "All"
      ? "Discover our latest collection of modern essentials, everyday styles and statement pieces."
      : `Explore our ${activeCategory.toLowerCase()} collection featuring modern styles and everyday essentials.`;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F8F6F2]">

        {/* COMPACT HERO SECTION */}
        <section className="border-b border-black/10 bg-[#E8E0D6] px-4 py-6 sm:px-6 sm:py-9 text-center">
          <div className="mx-auto max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500">
              WEARWELL COLLECTION
            </p>

            <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
              {pageTitle}
            </h1>

            <p className="mx-auto mt-1 max-w-lg text-xs leading-relaxed text-gray-600 sm:text-sm">
              {pageDescription}
            </p>

            {searchQuery && (
              <p className="mt-2 text-xs sm:text-sm text-gray-600">
                Search results for{" "}
                <span className="font-semibold text-black">
                  "{searchQuery}"
                </span>
              </p>
            )}
          </div>
        </section>

        {/* COMPACT CATEGORY BUTTONS */}
        <section className="sticky top-20 z-30 border-b border-black/10 bg-white/95 backdrop-blur px-4 py-2.5 sm:py-3.5">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div className="flex flex-1 items-center justify-center sm:justify-start gap-2 overflow-x-auto py-0.5 scrollbar-none">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => changeCategory(category)}
                  className={`whitespace-nowrap rounded-full px-4 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition ${
                    activeCategory === category
                      ? "bg-black text-white shadow-sm"
                      : "border border-gray-200 bg-white text-gray-700 hover:border-black hover:text-black"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <p className="hidden whitespace-nowrap text-xs font-medium text-gray-500 sm:block">
              {filteredProducts.length} items
            </p>
          </div>
        </section>

        {/* PRODUCTS HEADER (Compact & Clean) */}
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A06E31]">
              {activeCategory === "All"
                ? "Complete Collection"
                : `${activeCategory} Collection`}
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              {activeCategory === "All"
                ? "All Products"
                : `${activeCategory} Products`}
            </h2>
          </div>

          <p className="text-xs font-medium text-gray-500 sm:hidden">
            {filteredProducts.length} products
          </p>
        </div>

        {/* PRODUCT GRID - 2 columns on small devices / mobile */}
        <section className="px-4 py-4 sm:px-6 sm:py-8">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-3.5 gap-y-8 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={`${product.category}-${product.name}`}
                name={product.name}
                price={product.price}
                category={product.category}
                image={product.image}
              />
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredProducts.length === 0 && (
            <div className="mx-auto max-w-2xl py-24 text-center">
              <div className="text-5xl">🔍</div>

              <h3 className="mt-6 text-2xl font-semibold text-gray-900">
                No products found
              </h3>

              <p className="mt-3 text-sm text-gray-500">
                Try another product name or choose another category.
              </p>

              <button
                onClick={() => changeCategory("All")}
                className="mt-7 rounded-xl bg-black px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                View All Products
              </button>
            </div>
          )}
        </section>

        {/* COLLECTION INFORMATION */}
        <section className="border-y border-black/10 bg-white px-6 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A06E31]">
              OUTFITTERS
            </p>

            <h2 className="mt-4 text-3xl font-light tracking-tight md:text-4xl">
              Designed for everyday elegance.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500">
              Explore carefully selected pieces created for modern,
              effortless style. Choose a category above and discover
              your next favourite look.
            </p>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="bg-black px-6 py-16 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
              STAY UPDATED
            </p>

            <h2 className="mt-4 text-3xl font-semibold">
              Get the latest from OUTFITTERS
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-400">
              Sign up for new arrivals, exclusive offers and fashion updates.
            </p>

            <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-xl px-4 py-3 text-sm text-black outline-none"
              />

              <button className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-white px-6 py-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 text-center text-sm text-gray-500 md:flex-row md:items-center md:justify-between md:text-left">
            <p>
              © 2026 OUTFITTERS. All rights reserved.
            </p>

            <div className="flex justify-center gap-6">
              <Link
                href="/"
                className="transition hover:text-black"
              >
                Home
              </Link>

              <Link
                href="/shop"
                className="transition hover:text-black"
              >
                Shop
              </Link>

              <Link
                href="/cart"
                className="transition hover:text-black"
              >
                Cart
              </Link>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}
