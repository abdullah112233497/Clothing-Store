"use client";

import Link from "next/link";

type InventoryItem = {
  name: string;
  category: string;
  sku: string;
  stock: number;
  sold: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
};

const inventory: InventoryItem[] = [
  {
    name: "Essential Oversized Tee",
    category: "Women",
    sku: "OUT-W-001",
    stock: 24,
    sold: 18,
    status: "In Stock",
  },
  {
    name: "Classic Casual Shirt",
    category: "Men",
    sku: "OUT-M-002",
    stock: 18,
    sold: 12,
    status: "In Stock",
  },
  {
    name: "Minimal Shoulder Bag",
    category: "Accessories",
    sku: "OUT-A-003",
    stock: 7,
    sold: 21,
    status: "Low Stock",
  },
  {
    name: "Relaxed Fit Trousers",
    category: "Women",
    sku: "OUT-W-004",
    stock: 15,
    sold: 14,
    status: "In Stock",
  },
  {
    name: "Urban Denim Jacket",
    category: "Men",
    sku: "OUT-M-005",
    stock: 3,
    sold: 27,
    status: "Low Stock",
  },
  {
    name: "Everyday Sneakers",
    category: "Accessories",
    sku: "OUT-A-006",
    stock: 0,
    sold: 32,
    status: "Out of Stock",
  },
  {
    name: "Premium Basic Hoodie",
    category: "Women",
    sku: "OUT-W-007",
    stock: 21,
    sold: 16,
    status: "In Stock",
  },
  {
    name: "Modern Cargo Pants",
    category: "Men",
    sku: "OUT-M-008",
    stock: 11,
    sold: 19,
    status: "In Stock",
  },
];

export default function InventoryPage() {
  const totalStock = inventory.reduce(
    (total, item) => total + item.stock,
    0
  );

  const lowStock = inventory.filter(
    (item) => item.status === "Low Stock"
  ).length;

  const outOfStock = inventory.filter(
    (item) => item.status === "Out of Stock"
  ).length;

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#080808]">
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="hidden w-64 shrink-0 flex-col bg-[#080808] text-white lg:flex">

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

          <nav className="flex-1 px-4 py-6">

            {/* Dashboard */}
            <Link
              href="/admin"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <span className="text-base">▦</span>
              Dashboard
            </Link>

            {/* Orders */}
            <Link
              href="/admin/orders"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <span className="text-base">▤</span>
              Orders
            </Link>

            {/* Products */}
            <Link
              href="/admin/products"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <span className="text-base">□</span>
              Products
            </Link>

            {/* Inventory - ACTIVE */}
            <Link
              href="/admin/inventory"
              className="mb-2 flex items-center gap-3 rounded-lg bg-[#A06E31] px-4 py-3 text-sm font-semibold text-white shadow-sm"
            >
              <span className="text-base">◫</span>
              Inventory
            </Link>

            {/* Customers */}
            <Link
              href="/admin/customers"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <span className="text-base">♙</span>
              Customers
            </Link>

            {/* Payments */}
            <Link
              href="/admin/payments"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <span className="text-base">◈</span>
              Payments
            </Link>

            {/* Settings */}
            <Link
              href="/admin/settings"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <span className="text-base">⚙</span>
              Settings
            </Link>

          </nav>

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
          <header className="flex h-20 items-center justify-between border-b border-[#D5C1A9]/50 bg-white px-6 lg:px-8">

            <div>
              <p className="text-xs text-[#8B7A6C]">
                Admin / Inventory
              </p>

              <h1 className="mt-1 text-xl font-semibold">
                Inventory
              </h1>
            </div>

            <button
              className="rounded-lg bg-[#080808] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#A06E31]"
            >
              Update Stock
            </button>

          </header>

          {/* CONTENT */}
          <div className="p-5 sm:p-7 lg:p-8">

            {/* PAGE INTRO */}
            <div className="mb-7">

              <p className="text-xs uppercase tracking-[0.2em] text-[#A06E31]">
                Stock management
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Inventory Overview
              </h2>

              <p className="mt-1 text-sm text-[#8B7A6C]">
                Monitor product stock and identify items that need attention.
              </p>

            </div>

            {/* STATS */}
            <div className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {/* Total Stock */}
              <div className="rounded-xl border border-[#D5C1A9]/60 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">

                <div className="flex items-center justify-between">
                  <p className="text-xs text-[#8B7A6C]">
                    Total Stock
                  </p>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D5C1A9]/40 text-[#A06E31]">
                    ◫
                  </span>
                </div>

                <p className="mt-3 text-2xl font-semibold">
                  {totalStock}
                </p>

                <p className="mt-1 text-xs text-[#8B7A6C]">
                  Units available
                </p>

              </div>

              {/* Products */}
              <div className="rounded-xl border border-[#D5C1A9]/60 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">

                <div className="flex items-center justify-between">
                  <p className="text-xs text-[#8B7A6C]">
                    Products
                  </p>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D5C1A9]/40 text-[#A06E31]">
                    □
                  </span>
                </div>

                <p className="mt-3 text-2xl font-semibold">
                  {inventory.length}
                </p>

                <p className="mt-1 text-xs text-[#8B7A6C]">
                  Total SKUs
                </p>

              </div>

              {/* Low Stock */}
              <div className="rounded-xl border border-[#D5C1A9]/60 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">

                <div className="flex items-center justify-between">
                  <p className="text-xs text-[#8B7A6C]">
                    Low Stock
                  </p>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D5C1A9]/40 text-[#A06E31]">
                    !
                  </span>
                </div>

                <p className="mt-3 text-2xl font-semibold text-[#A06E31]">
                  {lowStock}
                </p>

                <p className="mt-1 text-xs text-[#8B7A6C]">
                  Need attention
                </p>

              </div>

              {/* Out of Stock */}
              <div className="rounded-xl border border-[#D5C1A9]/60 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">

                <div className="flex items-center justify-between">
                  <p className="text-xs text-[#8B7A6C]">
                    Out of Stock
                  </p>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-[#080808]">
                    ×
                  </span>
                </div>

                <p className="mt-3 text-2xl font-semibold">
                  {outOfStock}
                </p>

                <p className="mt-1 text-xs text-[#8B7A6C]">
                  Currently unavailable
                </p>

              </div>

            </div>

            {/* ALERT */}
            <div className="mb-6 rounded-xl border border-[#D5C1A9] bg-[#D5C1A9]/30 p-5">

              <div className="flex items-start gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#A06E31] text-lg font-bold text-white">
                  !
                </div>

                <div>

                  <h3 className="text-sm font-semibold text-[#080808]">
                    Inventory attention required
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#8B7A6C]">
                    {lowStock} products are running low and{" "}
                    {outOfStock} product is currently out of stock.
                  </p>

                </div>

              </div>

            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-xl border border-[#D5C1A9]/60 bg-white shadow-sm">

              <div className="border-b border-[#D5C1A9]/50 px-5 py-5">

                <h3 className="font-semibold">
                  Stock Levels
                </h3>

                <p className="mt-1 text-xs text-[#8B7A6C]">
                  Current inventory by product
                </p>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full min-w-[800px] text-left">

                  <thead className="border-b border-[#D5C1A9]/50 bg-[#F8F6F2]">

                    <tr>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-[#8B7A6C]">
                        Product
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-[#8B7A6C]">
                        SKU
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-[#8B7A6C]">
                        Category
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-[#8B7A6C]">
                        Stock
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-[#8B7A6C]">
                        Sold
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-[#8B7A6C]">
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-[#D5C1A9]/30">

                    {inventory.map((item) => (

                      <tr
                        key={item.sku}
                        className="transition hover:bg-[#F8F6F2]"
                      >

                        <td className="px-5 py-5">

                          <p className="text-sm font-semibold">
                            {item.name}
                          </p>

                          <p className="mt-1 text-xs text-[#8B7A6C]">
                            WEARWELL Collection
                          </p>

                        </td>

                        <td className="px-5 py-5 text-xs font-medium text-[#8B7A6C]">
                          {item.sku}
                        </td>

                        <td className="px-5 py-5 text-sm text-[#8B7A6C]">
                          {item.category}
                        </td>

                        <td className="px-5 py-5">

                          <span
                            className={`text-sm font-semibold ${
                              item.stock === 0
                                ? "text-red-600"
                                : item.stock <= 7
                                ? "text-[#A06E31]"
                                : "text-[#080808]"
                            }`}
                          >
                            {item.stock}
                          </span>

                        </td>

                        <td className="px-5 py-5 text-sm text-[#8B7A6C]">
                          {item.sold}
                        </td>

                        <td className="px-5 py-5">

                          <span
                            className={`rounded-full px-3 py-1.5 text-[10px] font-semibold ${
                              item.status === "In Stock"
                                ? "bg-[#F8F6F2] text-[#080808]"
                                : item.status === "Low Stock"
                                ? "bg-[#D5C1A9]/50 text-[#A06E31]"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {item.status}
                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </div>
        </section>
      </div>
    </main>
  );
}