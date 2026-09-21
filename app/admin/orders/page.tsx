"use client";

import { useState } from "react";
import Link from "next/link";

type Order = {
  id: string;
  customer: string;
  email: string;
  type: string;
  status: "Paid" | "Pending" | "Cancelled" | "Refunded";
  product: string;
  total: string;
  date: string;
};

const orders: Order[] = [
  {
    id: "#192541",
    customer: "Esther Howard",
    email: "esther@example.com",
    type: "Shipping",
    status: "Paid",
    product: "Essential Oversized Tee",
    total: "Rs. 3,499",
    date: "Jun 19, 2026",
  },
  {
    id: "#192540",
    customer: "David Miller",
    email: "david@example.com",
    type: "Pickup",
    status: "Paid",
    product: "Classic Casual Shirt",
    total: "Rs. 4,999",
    date: "Jun 19, 2026",
  },
  {
    id: "#192539",
    customer: "James Moore",
    email: "james@example.com",
    type: "Shipping",
    status: "Paid",
    product: "Urban Denim Jacket",
    total: "Rs. 7,999",
    date: "Jun 18, 2026",
  },
  {
    id: "#192538",
    customer: "Robert Anderson",
    email: "robert@example.com",
    type: "Shipping",
    status: "Pending",
    product: "Modern Cargo Pants",
    total: "Rs. 6,999",
    date: "Jun 18, 2026",
  },
  {
    id: "#192537",
    customer: "Jessica Martinez",
    email: "jessica@example.com",
    type: "Shipping",
    status: "Refunded",
    product: "Minimal Shoulder Bag",
    total: "Rs. 5,499",
    date: "Jun 17, 2026",
  },
  {
    id: "#192536",
    customer: "William Jackson",
    email: "william@example.com",
    type: "Shipping",
    status: "Paid",
    product: "Relaxed Fit Trousers",
    total: "Rs. 6,499",
    date: "Jun 17, 2026",
  },
  {
    id: "#192535",
    customer: "Christopher Harris",
    email: "christopher@example.com",
    type: "Pickup",
    status: "Paid",
    product: "Premium Basic Hoodie",
    total: "Rs. 5,999",
    date: "Jun 16, 2026",
  },
  {
    id: "#192534",
    customer: "Marcus Kent",
    email: "marcus@example.com",
    type: "Shipping",
    status: "Paid",
    product: "Everyday Sneakers",
    total: "Rs. 8,499",
    date: "Jun 16, 2026",
  },
];

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.product.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusClass = (status: Order["status"]) => {
    if (status === "Paid") {
      return "bg-emerald-50 text-emerald-700";
    }

    if (status === "Pending") {
      return "bg-amber-50 text-amber-700";
    }

    if (status === "Cancelled") {
      return "bg-red-50 text-red-700";
    }

    return "bg-gray-100 text-gray-600";
  };

  return (
    <main className="min-h-screen bg-[#f5f6f8] text-[#111827]">
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="hidden w-64 flex-col bg-[#07111d] text-white lg:flex">

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
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              <span>▦</span>
              Dashboard
            </Link>

            <Link
              href="/admin/orders"
              className="mb-2 flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm font-medium text-white"
            >
              <span>▤</span>
              Orders
            </Link>

            <Link
              href="/admin/products"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              <span>□</span>
              Products
            </Link>

            <Link
              href="/admin/inventory"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              <span>◫</span>
              Inventory
            </Link>

            <Link
              href="/admin/customers"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              <span>♙</span>
              Customers
            </Link>

            <Link
              href="/admin/payments"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              <span>◈</span>
              Payments
            </Link>

            <Link
              href="/admin/settings"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              <span>⚙</span>
              Settings
            </Link>

          </nav>

          <div className="border-t border-white/10 p-5">
            <p className="text-xs text-gray-400">
              Signed in as
            </p>

            <p className="mt-1 text-sm font-medium">
              Admin
            </p>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <section className="min-w-0 flex-1">

          {/* TOP BAR */}
          <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-6 lg:px-8">

            <div>
              <p className="text-xs text-gray-400">
                Admin / Orders
              </p>

              <h1 className="mt-1 text-xl font-semibold">
                Orders
              </h1>
            </div>

            <div className="flex items-center gap-3">

              <button className="hidden rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-xs font-medium transition hover:bg-gray-50 sm:block">
                ↓ Export
              </button>

              <button className="rounded-lg bg-[#07111d] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-black">
                ↑ Import
              </button>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8ded2] text-xs font-semibold">
                KM
              </div>

            </div>
          </header>

          {/* CONTENT */}
          <div className="p-5 sm:p-7 lg:p-8">

            {/* PAGE HEADER */}
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                  Store management
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  All Orders
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage customer orders and track their status.
                </p>
              </div>

              <p className="text-sm text-gray-500">
                {filteredOrders.length} orders
              </p>

            </div>

            {/* FILTER BAR */}
            <div className="mb-5 rounded-xl border border-gray-200 bg-white p-4">

              <div className="flex flex-col gap-3 md:flex-row">

                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    ⌕
                  </span>

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search order, customer or product..."
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none"
                >
                  <option value="All">All Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Refunded">Refunded</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <button
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("All");
                  }}
                  className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium transition hover:bg-gray-50"
                >
                  Reset
                </button>

              </div>
            </div>

            {/* ORDERS TABLE */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

              <div className="overflow-x-auto">

                <table className="w-full min-w-[900px] text-left">

                  <thead className="border-b border-gray-200 bg-gray-50">
                    <tr>
                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                        Order
                      </th>

                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                        Customer
                      </th>

                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                        Type
                      </th>

                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                        Status
                      </th>

                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                        Product
                      </th>

                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                        Total
                      </th>

                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                        Date
                      </th>

                      <th className="px-5 py-4"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">

                    {filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="transition hover:bg-gray-50"
                      >

                        <td className="px-5 py-5">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="font-semibold text-gray-900 hover:underline"
                          >
                            {order.id}
                          </button>
                        </td>

                        <td className="px-5 py-5">
                          <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e9e0d6] text-xs font-semibold">
                              {order.customer
                                .split(" ")
                                .map((word) => word[0])
                                .join("")}
                            </div>

                            <div>
                              <p className="text-sm font-medium">
                                {order.customer}
                              </p>

                              <p className="text-xs text-gray-400">
                                {order.email}
                              </p>
                            </div>

                          </div>
                        </td>

                        <td className="px-5 py-5 text-sm text-gray-600">
                          {order.type}
                        </td>

                        <td className="px-5 py-5">
                          <span
                            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${getStatusClass(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>

                        <td className="max-w-[190px] px-5 py-5">
                          <p className="truncate text-sm text-gray-700">
                            {order.product}
                          </p>
                        </td>

                        <td className="px-5 py-5 text-sm font-semibold">
                          {order.total}
                        </td>

                        <td className="px-5 py-5 text-sm text-gray-500">
                          {order.date}
                        </td>

                        <td className="px-5 py-5">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="rounded-lg px-3 py-2 text-lg text-gray-400 transition hover:bg-gray-100 hover:text-black"
                          >
                            ⋯
                          </button>
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

              {/* EMPTY STATE */}
              {filteredOrders.length === 0 && (
                <div className="px-6 py-20 text-center">

                  <div className="text-4xl">⌕</div>

                  <h3 className="mt-4 text-lg font-semibold">
                    No orders found
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Try changing your search or filter.
                  </p>

                </div>
              )}

            </div>

            {/* FOOTER INFO */}
            <div className="mt-5 flex flex-col justify-between gap-2 text-xs text-gray-400 sm:flex-row">
              <p>
                Showing {filteredOrders.length} of {orders.length} orders
              </p>

              <p>
                WEARWELL Admin Panel
              </p>
            </div>

          </div>
        </section>
      </div>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedOrder(null)}
        >

          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

              <div>
                <p className="text-xs text-gray-400">
                  Order details
                </p>

                <h3 className="mt-1 text-lg font-semibold">
                  {selectedOrder.id}
                </h3>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-black"
              >
                ×
              </button>

            </div>

            {/* CUSTOMER */}
            <div className="border-b border-gray-100 px-6 py-5">

              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                Customer
              </p>

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e9e0d6] font-semibold">
                  {selectedOrder.customer
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>

                <div>
                  <p className="font-semibold">
                    {selectedOrder.customer}
                  </p>

                  <p className="text-sm text-gray-500">
                    {selectedOrder.email}
                  </p>
                </div>

              </div>

            </div>

            {/* ORDER INFORMATION */}
            <div className="grid grid-cols-2 gap-5 px-6 py-5">

              <div>
                <p className="text-xs text-gray-400">
                  Order type
                </p>

                <p className="mt-1 text-sm font-medium">
                  {selectedOrder.type}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Status
                </p>

                <span
                  className={`mt-1 inline-block rounded-full px-3 py-1 text-[11px] font-semibold ${getStatusClass(
                    selectedOrder.status
                  )}`}
                >
                  {selectedOrder.status}
                </span>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Product
                </p>

                <p className="mt-1 text-sm font-medium">
                  {selectedOrder.product}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Order date
                </p>

                <p className="mt-1 text-sm font-medium">
                  {selectedOrder.date}
                </p>
              </div>

            </div>

            {/* TOTAL */}
            <div className="mx-6 mb-6 flex items-center justify-between rounded-xl bg-gray-50 px-5 py-4">

              <span className="text-sm text-gray-500">
                Total amount
              </span>

              <span className="text-lg font-bold">
                {selectedOrder.total}
              </span>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}