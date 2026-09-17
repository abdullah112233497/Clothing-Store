"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    name: "Essential Oversized Tee",
    price: "Rs. 3,499",
    category: "Women",
    image: "/images/product-1.png",
  },
  {
    name: "Classic Casual Shirt",
    price: "Rs. 4,999",
    category: "Men",
    image: "/images/product-2.png",
  },
  {
    name: "Minimal Shoulder Bag",
    price: "Rs. 5,499",
    category: "Accessories",
    image: "/images/product-3.png",
  },
  {
    name: "Relaxed Fit Trousers",
    price: "Rs. 6,499",
    category: "Women",
    image: "/images/product-4.png",
  },
  {
    name: "Urban Denim Jacket",
    price: "Rs. 7,999",
    category: "Men",
    image: "/images/product-5.png",
  },
  {
    name: "Everyday Sneakers",
    price: "Rs. 8,499",
    category: "Accessories",
    image: "/images/product-6.png",
  },
  {
    name: "Premium Basic Hoodie",
    price: "Rs. 5,999",
    category: "Women",
    image: "/images/product-7.png",
  },
  {
    name: "Modern Cargo Pants",
    price: "Rs. 6,999",
    category: "Men",
    image: "/images/product-8.png",
  },
];

const categories = ["All", "Women", "Men", "Accessories"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const category = params.get("category");
    const search = params.get("search");

    if (category && categories.includes(category)) {
      setActiveCategory(category);
    }

    if (search) {
      setSearchQuery(search);
    }
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" ||
      product.category === activeCategory;

    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        {/* Shop Header */}
        <section className="border-b bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-xs font-semibold tracking-[0.3em] text-gray-500">
              OUTFITTERS COLLECTION
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Shop All
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500">
              Discover our latest collection of modern essentials,
              everyday styles and statement pieces.
            </p>

            {searchQuery && (
              <p className="mt-5 text-sm text-gray-600">
                Search results for{" "}
                <span className="font-semibold text-black">
                  "{searchQuery}"
                </span>
              </p>
            )}
          </div>
        </section>

        {/* Filters */}
        <section className="border-b bg-white px-6 py-6">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-6 py-3 text-sm font-medium transition ${
                  activeCategory === category
                    ? "bg-black text-white"
                    : "border border-gray-200 bg-white text-gray-700 hover:border-black hover:text-black"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Product Count */}
        <section className="px-6 pt-10">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {searchQuery
                  ? "Search Results"
                  : activeCategory === "All"
                  ? "All Products"
                  : activeCategory}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {filteredProducts.length} products
              </p>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="px-6 py-10">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.name}
                name={product.name}
                price={product.price}
                category={product.category}
                image={product.image}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="mx-auto max-w-2xl py-20 text-center">
              <div className="text-5xl">🔍</div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                No products found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Try another product name or select a different category.
              </p>

              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                  window.history.replaceState({}, "", "/shop");
                }}
                className="mt-6 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                View All Products
              </button>
            </div>
          )}
        </section>

        {/* Newsletter */}
        <section className="bg-black px-6 py-16 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold tracking-[0.3em] text-gray-400">
              STAY UPDATED
            </p>

            <h2 className="mt-4 text-3xl font-bold">
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

        {/* Footer */}
        <footer className="bg-white px-6 py-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 text-center text-sm text-gray-500 md:flex-row md:items-center md:justify-between md:text-left">
            <p>© 2026 OUTFITTERS. All rights reserved.</p>

            <div className="flex justify-center gap-6">
              <Link href="/" className="hover:text-black">
                Home
              </Link>

              <Link href="/shop" className="hover:text-black">
                Shop
              </Link>

              <Link href="/cart" className="hover:text-black">
                Cart
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}