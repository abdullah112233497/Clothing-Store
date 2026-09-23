"use client";

import { useState } from "react";
import Link from "next/link";

type Product = {
  name: string;
  category: string;
  price: string;
  stock: number;
  status: "Active" | "Low Stock" | "Out of Stock";
  image: string;
};

const products: Product[] = [
  {
    name: "Essential Oversized Tee",
    category: "Women",
    price: "Rs. 3,499",
    stock: 24,
    status: "Active",
    image: "/images/product-1.png",
  },
  {
    name: "Classic Casual Shirt",
    category: "Men",
    price: "Rs. 4,999",
    stock: 18,
    status: "Active",
    image: "/images/product-2.png",
  },
  {
    name: "Minimal Shoulder Bag",
    category: "Accessories",
    price: "Rs. 5,499",
    stock: 7,
    status: "Low Stock",
    image: "/images/product-3.png",
  },
  {
    name: "Relaxed Fit Trousers",
    category: "Women",
    price: "Rs. 6,499",
    stock: 15,
    status: "Active",
    image: "/images/product-4.png",
  },
  {
    name: "Urban Denim Jacket",
    category: "Men",
    price: "Rs. 7,999",
    stock: 3,
    status: "Low Stock",
    image: "/images/product-5.png",
  },
  {
    name: "Everyday Sneakers",
    category: "Accessories",
    price: "Rs. 8,499",
    stock: 0,
    status: "Out of Stock",
    image: "/images/product-6.png",
  },
  {
    name: "Premium Basic Hoodie",
    category: "Women",
    price: "Rs. 5,999",
    stock: 21,
    status: "Active",
    image: "/images/product-7.png",
  },
  {
    name: "Modern Cargo Pants",
    category: "Men",
    price: "Rs. 6,999",
    stock: 11,
    status: "Active",
    image: "/images/product-8.png",
  },
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#080808]">
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="hidden w-64 shrink-0 flex-col bg-[#080808] text-white lg:flex">

          {/* LOGO */}
          <div className="border-b border-white/10 px-6 py-7">
            <Link
              href="/admin"
              className="text-xl font-black tracking-[0.2em]"
            >
              WEARWELL
            </Link>

            <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#8B7A6C]">
              Admin Panel
            </p>
          </div>

          {/* NAVIGATION */}
          <nav className="flex-1 px-4 py-6">

            <Link
              href="/admin"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#8B7A6C] transition hover:bg-white/10 hover:text-white"
            >
              <span>▦</span>
              Dashboard
            </Link>

            <Link
              href="/admin/orders"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#8B7A6C] transition hover:bg-white/10 hover:text-white"
            >
              <span>▤</span>
              Orders
            </Link>

            <Link
              href="/admin/products"
              className="mb-2 flex items-center gap-3 rounded-lg bg-[#A06E31] px-4 py-3 text-sm font-medium text-white shadow-sm"
            >
              <span>□</span>
              Products
            </Link>

            <Link
              href="/admin/inventory"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#8B7A6C] transition hover:bg-white/10 hover:text-white"
            >
              <span>◫</span>
              Inventory
            </Link>

            <Link
              href="/admin/customers"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#8B7A6C] transition hover:bg-white/10 hover:text-white"
            >
              <span>♙</span>
              Customers
            </Link>

            <Link
              href="/admin/payments"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#8B7A6C] transition hover:bg-white/10 hover:text-white"
            >
              <span>◈</span>
              Payments
            </Link>

            <Link
              href="/admin/settings"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#8B7A6C] transition hover:bg-white/10 hover:text-white"
            >
              <span>⚙</span>
              Settings
            </Link>

          </nav>

          {/* ADMIN INFO */}
          <div className="border-t border-white/10 p-5">
            <p className="text-xs text-[#8B7A6C]">
              Signed in as
            </p>

            <p className="mt-1 text-sm font-medium">
              Khizra Malik
            </p>
          </div>

        </aside>

        {/* MAIN */}
        <section className="min-w-0 flex-1">

          {/* HEADER */}
          <header className="flex h-20 items-center justify-between border-b border-[#8B7A6C]/20 bg-white px-6 lg:px-8">

            <div>
              <p className="text-xs text-[#8B7A6C]">
                Admin / Products
              </p>

              <h1 className="mt-1 text-xl font-semibold">
                Products
              </h1>
            </div>

            <div className="flex items-center gap-3">

              <button className="hidden rounded-lg border border-[#8B7A6C]/25 px-4 py-2.5 text-xs font-medium transition hover:bg-[#F8F6F2] sm:block">
                Export
              </button>

              <button className="rounded-lg bg-[#080808] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#A06E31]">
                + Add Product
              </button>

            </div>

          </header>

          {/* CONTENT */}
          <div className="p-5 sm:p-7 lg:p-8">

            {/* TITLE */}
            <div className="mb-7">

              <p className="text-xs uppercase tracking-[0.2em] text-[#8B7A6C]">
                Store management
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Product Catalog
              </h2>

              <p className="mt-1 text-sm text-[#8B7A6C]">
                Manage your products, prices and stock levels.
              </p>

            </div>

            {/* STATS */}
            <div className="mb-6 grid gap-4 sm:grid-cols-3">

              {/* TOTAL */}
              <div className="rounded-xl border border-[#8B7A6C]/20 bg-white p-5 shadow-sm">

                <p className="text-xs text-[#8B7A6C]">
                  Total Products
                </p>

                <p className="mt-2 text-2xl font-semibold">
                  {products.length}
                </p>

              </div>

              {/* ACTIVE */}
              <div className="rounded-xl border border-[#8B7A6C]/20 bg-white p-5 shadow-sm">

                <p className="text-xs text-[#8B7A6C]">
                  Active Products
                </p>

                <p className="mt-2 text-2xl font-semibold text-[#A06E31]">
                  {products.filter((p) => p.status === "Active").length}
                </p>

              </div>

              {/* LOW STOCK */}
              <div className="rounded-xl border border-[#8B7A6C]/20 bg-white p-5 shadow-sm">

                <p className="text-xs text-[#8B7A6C]">
                  Low / Out of Stock
                </p>

                <p className="mt-2 text-2xl font-semibold text-[#8B7A6C]">
                  {
                    products.filter(
                      (p) =>
                        p.status === "Low Stock" ||
                        p.status === "Out of Stock"
                    ).length
                  }
                </p>

              </div>

            </div>

            {/* SEARCH + FILTER */}
            <div className="mb-5 flex flex-col gap-3 rounded-xl border border-[#8B7A6C]/20 bg-white p-4 shadow-sm md:flex-row">

              <div className="relative flex-1">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7A6C]">
                  ⌕
                </span>

                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-[#8B7A6C]/25 bg-[#F8F6F2] px-4 py-3 pl-10 text-sm outline-none transition focus:border-[#A06E31] focus:bg-white"
                />

              </div>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-lg border border-[#8B7A6C]/25 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A06E31]"
              >
                <option value="All">All Categories</option>
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Accessories">Accessories</option>
              </select>

            </div>

            {/* PRODUCT TABLE */}
            <div className="overflow-hidden rounded-xl border border-[#8B7A6C]/20 bg-white shadow-sm">

              <div className="overflow-x-auto">

                <table className="w-full min-w-[850px] text-left">

                  <thead className="border-b border-[#8B7A6C]/20 bg-[#F8F6F2]">

                    <tr>

                      <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-[#8B7A6C]">
                        Product
                      </th>

                      <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-[#8B7A6C]">
                        Category
                      </th>

                      <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-[#8B7A6C]">
                        Price
                      </th>

                      <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-[#8B7A6C]">
                        Stock
                      </th>

                      <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-[#8B7A6C]">
                        Status
                      </th>

                      <th className="px-5 py-4"></th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-[#8B7A6C]/10">

                    {filteredProducts.map((product) => (

                      <tr
                        key={product.name}
                        className="transition hover:bg-[#F8F6F2]"
                      >

                        {/* PRODUCT */}
                        <td className="px-5 py-4">

                          <div className="flex items-center gap-4">

                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-14 w-12 rounded-lg object-cover"
                            />

                            <div>

                              <p className="text-sm font-semibold">
                                {product.name}
                              </p>

                              <p className="mt-1 text-xs text-[#8B7A6C]">
                                WEARWELL Collection
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* CATEGORY */}
                        <td className="px-5 py-4 text-sm text-[#8B7A6C]">
                          {product.category}
                        </td>

                        {/* PRICE */}
                        <td className="px-5 py-4 text-sm font-semibold">
                          {product.price}
                        </td>

                        {/* STOCK */}
                        <td className="px-5 py-4 text-sm">
                          {product.stock}
                        </td>

                        {/* STATUS */}
                        <td className="px-5 py-4">

                          <span
                            className={`rounded-full px-3 py-1.5 text-[10px] font-semibold ${
                              product.status === "Active"
                                ? "bg-[#eee6dc] text-[#6f4b2d]"
                                : product.status === "Low Stock"
                                ? "bg-[#D5C1A9] text-[#5d4634]"
                                : "bg-[#f1dfdc] text-[#8a3f35]"
                            }`}
                          >
                            {product.status}
                          </span>

                        </td>

                        {/* ACTION */}
                        <td className="px-5 py-4">

                          <button className="rounded-lg px-3 py-2 text-lg text-[#8B7A6C] transition hover:bg-[#D5C1A9]/40 hover:text-[#080808]">
                            ⋯
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

              {/* EMPTY STATE */}
              {filteredProducts.length === 0 && (
                <div className="py-20 text-center">

                  <p className="text-3xl text-[#8B7A6C]">
                    ⌕
                  </p>

                  <h3 className="mt-3 font-semibold">
                    No products found
                  </h3>

                  <p className="mt-1 text-sm text-[#8B7A6C]">
                    Try another search or category.
                  </p>

                </div>
              )}

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}