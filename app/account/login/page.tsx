"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
    } else {
      setActiveCategory("All");
    }

    if (search) {
      setSearchQuery(search);
    }
  }, []);

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      activeCategory === "All" ||
      product.category === activeCategory;

    const searchMatch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

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

        {/* Hero / Category Header */}
        <section className="border-b border-black/10 bg-[#E8E0D6] px-6 py-20">
          <div className="mx-auto max-w-7xl text-center">

            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-500">
              OUTFITTERS COLLECTION
            </p>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-gray-900 md:text-6xl">
              {pageTitle}
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-600">
              {pageDescription}
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

        {/* Category Navigation */}
        <section className="border-b border-black/10 bg-white px-6 py-6">
          <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-3">

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => changeCategory(category)}
                className={`rounded-full px-7 py-3 text-xs font-semibold uppercase tracking-wider transition ${
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

        {/* Products Heading */}
        <section className="px-6 pt-14">
          <div className="mx-auto max-w-7xl">

            <div className="flex items-end justify-between border-b border-black/10 pb-5">

              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#A06E31]">
                  {activeCategory === "All"
                    ? "Complete Collection"
                    : `${activeCategory} Collection`}
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-gray-900">
                  {activeCategory === "All"
                    ? "All Products"
                    : `${activeCategory} Products`}
                </h2>
              </div>

              <p className="text-xs text-gray-500">
                {filteredProducts.length} products
              </p>

            </div>

          </div>
        </section>

        {/* Product Cards */}
        <section className="px-6 py-12">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">

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

        {/* Collection Information */}
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

        {/* Newsletter */}
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

        {/* Footer */}
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