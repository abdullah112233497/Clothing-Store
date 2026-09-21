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
              ▦ Dashboard
            </Link>

            <Link
              href="/admin/orders"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white"
            >
              ▤ Orders
            </Link>

            <Link
              href="/admin/products"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white"
            >
              □ Products
            </Link>

            <Link
              href="/admin/inventory"
              className="mb-2 flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm font-medium text-white"
            >
              ◫ Inventory
            </Link>

            <Link
              href="/admin/customers"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white"
            >
              ♙ Customers
            </Link>

            <Link
              href="/admin/payments"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white"
            >
              ◈ Payments
            </Link>

            <Link
              href="/admin/settings"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white"
            >
              ⚙ Settings
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
                Admin / Inventory
              </p>

              <h1 className="mt-1 text-xl font-semibold">
                Inventory
              </h1>
            </div>

            <button className="rounded-lg bg-[#07111d] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-black">
              Update Stock
            </button>
          </header>

          {/* CONTENT */}
          <div className="p-5 sm:p-7 lg:p-8">

            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Stock management
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Inventory Overview
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Monitor product stock and identify items that need attention.
              </p>
            </div>

            {/* STATS */}
            <div className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-xs text-gray-400">
                  Total Stock
                </p>

                <p className="mt-2 text-2xl font-semibold">
                  {totalStock}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Units available
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-xs text-gray-400">
                  Products
                </p>

                <p className="mt-2 text-2xl font-semibold">
                  {inventory.length}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Total SKUs
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-xs text-gray-400">
                  Low Stock
                </p>

                <p className="mt-2 text-2xl font-semibold text-amber-600">
                  {lowStock}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Need attention
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-xs text-gray-400">
                  Out of Stock
                </p>

                <p className="mt-2 text-2xl font-semibold text-red-600">
                  {outOfStock}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Currently unavailable
                </p>
              </div>

            </div>

            {/* ALERT */}
            <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg">
                  !
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-amber-900">
                    Inventory attention required
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-amber-800">
                    {lowStock} products are running low and{" "}
                    {outOfStock} product is currently out of stock.
                  </p>
                </div>
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

              <div className="border-b border-gray-200 px-5 py-5">
                <h3 className="font-semibold">
                  Stock Levels
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  Current inventory by product
                </p>
              </div>

              <div className="overflow-x-auto">

                <table className="w-full min-w-[800px] text-left">

                  <thead className="border-b border-gray-200 bg-gray-50">
                    <tr>
                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-gray-400">
                        Product
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-gray-400">
                        SKU
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-gray-400">
                        Category
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-gray-400">
                        Stock
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-gray-400">
                        Sold
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-gray-400">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">

                    {inventory.map((item) => (
                      <tr
                        key={item.sku}
                        className="transition hover:bg-gray-50"
                      >

                        <td className="px-5 py-5">
                          <p className="text-sm font-semibold">
                            {item.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            WEARWELL Collection
                          </p>
                        </td>

                        <td className="px-5 py-5 text-xs font-medium text-gray-500">
                          {item.sku}
                        </td>

                        <td className="px-5 py-5 text-sm text-gray-600">
                          {item.category}
                        </td>

                        <td className="px-5 py-5">
                          <span className="text-sm font-semibold">
                            {item.stock}
                          </span>
                        </td>

                        <td className="px-5 py-5 text-sm text-gray-600">
                          {item.sold}
                        </td>

                        <td className="px-5 py-5">
                          <span
                            className={`rounded-full px-3 py-1.5 text-[10px] font-semibold ${
                              item.status === "In Stock"
                                ? "bg-emerald-50 text-emerald-700"
                                : item.status === "Low Stock"
                                ? "bg-amber-50 text-amber-700"
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