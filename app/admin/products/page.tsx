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
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#f5f6f8] text-[#111827]">
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="hidden w-64 shrink-0 flex-col bg-[#07111d] text-white lg:flex">

          <div className="border-b border-white/10 px-6 py-7">
            <Link
              href="/admin"
              className="text-xl font-black tracking-[0.2em]"
            >
              WEARWELL
            </Link>

            <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-gray-400">
              Admin Panel
            </p>
          </div>

          <nav className="flex-1 px-4 py-6">

            <Link
              href="/admin"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white"
            >
              ▦
              Dashboard
            </Link>

            <Link
              href="/admin/orders"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white"
            >
              ▤
              Orders
            </Link>

            <Link
              href="/admin/products"
              className="mb-2 flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm font-medium text-white"
            >
              □
              Products
            </Link>

            <Link
              href="/admin/inventory"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white"
            >
              ◫
              Inventory
            </Link>

            <Link
              href="/admin/customers"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white"
            >
              ♙
              Customers
            </Link>

            <Link
              href="/admin/payments"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white"
            >
              ◈
              Payments
            </Link>

            <Link
              href="/admin/settings"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white"
            >
              ⚙
              Settings
            </Link>

          </nav>

          <div className="border-t border-white/10 p-5">
            <p className="text-xs text-gray-400">Signed in as</p>
            <p className="mt-1 text-sm font-medium">Khizra Malik</p>
          </div>
        </aside>

        {/* MAIN */}
        <section className="min-w-0 flex-1">

          {/* HEADER */}
          <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-6 lg:px-8">

            <div>
              <p className="text-xs text-gray-400">
                Admin / Products
              </p>

              <h1 className="mt-1 text-xl font-semibold">
                Products
              </h1>
            </div>

            <div className="flex items-center gap-3">

              <button className="hidden rounded-lg border border-gray-200 px-4 py-2.5 text-xs font-medium hover:bg-gray-50 sm:block">
                Export
              </button>

              <button className="rounded-lg bg-[#07111d] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-black">
                + Add Product
              </button>

            </div>
          </header>

          {/* CONTENT */}
          <div className="p-5 sm:p-7 lg:p-8">

            {/* TITLE */}
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Store management
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Product Catalog
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage your products, prices and stock levels.
              </p>
            </div>

            {/* STATS */}
            <div className="mb-6 grid gap-4 sm:grid-cols-3">

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-xs text-gray-400">
                  Total Products
                </p>

                <p className="mt-2 text-2xl font-semibold">
                  {products.length}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-xs text-gray-400">
                  Active Products
                </p>

                <p className="mt-2 text-2xl font-semibold text-emerald-600">
                  {products.filter((p) => p.status === "Active").length}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-xs text-gray-400">
                  Low / Out of Stock
                </p>

                <p className="mt-2 text-2xl font-semibold text-amber-600">
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
            <div className="mb-5 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 md:flex-row">

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-400 focus:bg-white"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none"
              >
                <option value="All">All Categories</option>
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Accessories">Accessories</option>
              </select>

            </div>

            {/* PRODUCT TABLE */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

              <div className="overflow-x-auto">

                <table className="w-full min-w-[850px] text-left">

                  <thead className="border-b border-gray-200 bg-gray-50">

                    <tr>
                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-gray-400">
                        Product
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-gray-400">
                        Category
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-gray-400">
                        Price
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-gray-400">
                        Stock
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-gray-400">
                        Status
                      </th>

                      <th className="px-5 py-4"></th>
                    </tr>

                  </thead>

                  <tbody className="divide-y divide-gray-100">

                    {filteredProducts.map((product) => (

                      <tr
                        key={product.name}
                        className="transition hover:bg-gray-50"
                      >

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

                              <p className="mt-1 text-xs text-gray-400">
                                WEARWELL Collection
                              </p>
                            </div>

                          </div>

                        </td>

                        <td className="px-5 py-4 text-sm text-gray-600">
                          {product.category}
                        </td>

                        <td className="px-5 py-4 text-sm font-semibold">
                          {product.price}
                        </td>

                        <td className="px-5 py-4 text-sm">
                          {product.stock}
                        </td>

                        <td className="px-5 py-4">

                          <span
                            className={`rounded-full px-3 py-1.5 text-[10px] font-semibold ${
                              product.status === "Active"
                                ? "bg-emerald-50 text-emerald-700"
                                : product.status === "Low Stock"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {product.status}
                          </span>

                        </td>

                        <td className="px-5 py-4">
                          <button className="rounded-lg px-3 py-2 text-lg text-gray-400 hover:bg-gray-100 hover:text-black">
                            ⋯
                          </button>
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

              {filteredProducts.length === 0 && (
                <div className="py-20 text-center">

                  <p className="text-3xl">⌕</p>

                  <h3 className="mt-3 font-semibold">
                    No products found
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
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