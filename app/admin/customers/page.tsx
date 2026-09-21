"use client";

import Link from "next/link";

type Customer = {
  name: string;
  email: string;
  orders: number;
  spent: string;
  status: "Active" | "New";
};

const customers: Customer[] = [
  {
    name: "Ayesha Khan",
    email: "ayesha@example.com",
    orders: 12,
    spent: "Rs. 48,500",
    status: "Active",
  },
  {
    name: "Sara Ahmed",
    email: "sara@example.com",
    orders: 8,
    spent: "Rs. 32,800",
    status: "Active",
  },
  {
    name: "Hina Malik",
    email: "hina@example.com",
    orders: 5,
    spent: "Rs. 21,400",
    status: "Active",
  },
  {
    name: "Maham Ali",
    email: "maham@example.com",
    orders: 3,
    spent: "Rs. 14,700",
    status: "New",
  },
  {
    name: "Zainab Noor",
    email: "zainab@example.com",
    orders: 9,
    spent: "Rs. 39,900",
    status: "Active",
  },
  {
    name: "Fatima Raza",
    email: "fatima@example.com",
    orders: 2,
    spent: "Rs. 8,999",
    status: "New",
  },
];

export default function CustomersPage() {
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
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white"
            >
              ◫ Inventory
            </Link>

            <Link
              href="/admin/customers"
              className="mb-2 flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm font-medium text-white"
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
                Admin / Customers
              </p>

              <h1 className="mt-1 text-xl font-semibold">
                Customers
              </h1>
            </div>

            <button className="rounded-lg bg-[#07111d] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-black">
              Export Customers
            </button>

          </header>

          {/* CONTENT */}
          <div className="p-5 sm:p-7 lg:p-8">

            {/* INTRO */}
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Customer management
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Customer Overview
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                View your customers, orders and total spending.
              </p>
            </div>

            {/* STATS */}
            <div className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-xs text-gray-400">
                  Total Customers
                </p>

                <p className="mt-2 text-2xl font-semibold">
                  248
                </p>

                <p className="mt-1 text-xs text-emerald-600">
                  +12% this month
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-xs text-gray-400">
                  Active Customers
                </p>

                <p className="mt-2 text-2xl font-semibold">
                  214
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Regular shoppers
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-xs text-gray-400">
                  New Customers
                </p>

                <p className="mt-2 text-2xl font-semibold">
                  34
                </p>

                <p className="mt-1 text-xs text-emerald-600">
                  This month
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-xs text-gray-400">
                  Average Spend
                </p>

                <p className="mt-2 text-2xl font-semibold">
                  Rs. 18,450
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Per customer
                </p>
              </div>

            </div>

            {/* SEARCH */}
            <div className="mb-5 rounded-xl border border-gray-200 bg-white p-4">

              <input
                type="text"
                placeholder="Search customers by name or email..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
              />

            </div>

            {/* CUSTOMER TABLE */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

              <div className="border-b border-gray-200 px-5 py-5">
                <h3 className="font-semibold">
                  Recent Customers
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  Customer activity and purchase history
                </p>
              </div>

              <div className="overflow-x-auto">

                <table className="w-full min-w-[800px] text-left">

                  <thead className="border-b border-gray-200 bg-gray-50">

                    <tr>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-gray-400">
                        Customer
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-gray-400">
                        Orders
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-gray-400">
                        Total Spent
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-gray-400">
                        Status
                      </th>

                      <th className="px-5 py-4"></th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-gray-100">

                    {customers.map((customer) => (

                      <tr
                        key={customer.email}
                        className="transition hover:bg-gray-50"
                      >

                        <td className="px-5 py-5">

                          <div className="flex items-center gap-4">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#07111d] text-xs font-semibold text-white">
                              {customer.name
                                .split(" ")
                                .map((word) => word[0])
                                .join("")}
                            </div>

                            <div>
                              <p className="text-sm font-semibold">
                                {customer.name}
                              </p>

                              <p className="mt-1 text-xs text-gray-400">
                                {customer.email}
                              </p>
                            </div>

                          </div>

                        </td>

                        <td className="px-5 py-5 text-sm font-medium">
                          {customer.orders}
                        </td>

                        <td className="px-5 py-5 text-sm font-semibold">
                          {customer.spent}
                        </td>

                        <td className="px-5 py-5">

                          <span
                            className={`rounded-full px-3 py-1.5 text-[10px] font-semibold ${
                              customer.status === "Active"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-blue-50 text-blue-700"
                            }`}
                          >
                            {customer.status}
                          </span>

                        </td>

                        <td className="px-5 py-5">

                          <button className="rounded-lg px-3 py-2 text-lg text-gray-400 hover:bg-gray-100 hover:text-black">
                            ⋯
                          </button>

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