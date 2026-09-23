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
      return "bg-[#eee6dc] text-[#6f4b2d]";
    }

    if (status === "Pending") {
      return "bg-[#D5C1A9] text-[#5d4634]";
    }

    if (status === "Cancelled") {
      return "bg-[#f1dfdc] text-[#8a3f35]";
    }

    return "bg-[#ebe8e4] text-[#6f665f]";
  };

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#080808]">
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="hidden w-64 flex-col bg-[#080808] text-white lg:flex">

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
              className="mb-2 flex items-center gap-3 rounded-lg bg-[#A06E31] px-4 py-3 text-sm font-medium text-white shadow-sm"
            >
              <span>▤</span>
              Orders
            </Link>

            <Link
              href="/admin/products"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#8B7A6C] transition hover:bg-white/10 hover:text-white"
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
              Admin
            </p>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <section className="min-w-0 flex-1">

          {/* TOP BAR */}
          <header className="flex h-20 items-center justify-between border-b border-[#8B7A6C]/20 bg-white px-6 lg:px-8">

            <div>
              <p className="text-xs text-[#8B7A6C]">
                Admin / Orders
              </p>

              <h1 className="mt-1 text-xl font-semibold">
                Orders
              </h1>
            </div>

            <div className="flex items-center gap-3">

              <button className="hidden rounded-lg border border-[#8B7A6C]/30 bg-white px-4 py-2.5 text-xs font-medium transition hover:bg-[#F8F6F2] sm:block">
                ↓ Export
              </button>

              <button className="rounded-lg bg-[#080808] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-[#A06E31]">
                ↑ Import
              </button>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D5C1A9] text-xs font-semibold text-[#080808]">
                KM
              </div>

            </div>
          </header>

          {/* CONTENT */}
          <div className="p-5 sm:p-7 lg:p-8">

            {/* PAGE HEADER */}
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#8B7A6C]">
                  Store management
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  All Orders
                </h2>

                <p className="mt-1 text-sm text-[#8B7A6C]">
                  Manage customer orders and track their status.
                </p>
              </div>

              <p className="text-sm text-[#8B7A6C]">
                {filteredOrders.length} orders
              </p>

            </div>

            {/* FILTER BAR */}
            <div className="mb-5 rounded-xl border border-[#8B7A6C]/20 bg-white p-4 shadow-sm">

              <div className="flex flex-col gap-3 md:flex-row">

                <div className="relative flex-1">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7A6C]">
                    ⌕
                  </span>

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search order, customer or product..."
                    className="w-full rounded-lg border border-[#8B7A6C]/25 bg-[#F8F6F2] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#A06E31] focus:bg-white"
                  />

                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-lg border border-[#8B7A6C]/25 bg-white px-4 py-3 text-sm outline-none focus:border-[#A06E31]"
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
                  className="rounded-lg border border-[#8B7A6C]/25 px-5 py-3 text-sm font-medium transition hover:border-[#A06E31] hover:bg-[#D5C1A9]/30"
                >
                  Reset
                </button>

              </div>
            </div>

            {/* ORDERS TABLE */}
            <div className="overflow-hidden rounded-xl border border-[#8B7A6C]/20 bg-white shadow-sm">

              <div className="overflow-x-auto">

                <table className="w-full min-w-[900px] text-left">

                  <thead className="border-b border-[#8B7A6C]/20 bg-[#F8F6F2]">
                    <tr>

                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#8B7A6C]">
                        Order
                      </th>

                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#8B7A6C]">
                        Customer
                      </th>

                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#8B7A6C]">
                        Type
                      </th>

                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#8B7A6C]">
                        Status
                      </th>

                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#8B7A6C]">
                        Product
                      </th>

                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#8B7A6C]">
                        Total
                      </th>

                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#8B7A6C]">
                        Date
                      </th>

                      <th className="px-5 py-4"></th>

                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#8B7A6C]/10">

                    {filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="transition hover:bg-[#F8F6F2]"
                      >

                        <td className="px-5 py-5">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="font-semibold text-[#080808] hover:text-[#A06E31] hover:underline"
                          >
                            {order.id}
                          </button>
                        </td>

                        <td className="px-5 py-5">

                          <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D5C1A9] text-xs font-semibold text-[#080808]">
                              {order.customer
                                .split(" ")
                                .map((word) => word[0])
                                .join("")}
                            </div>

                            <div>
                              <p className="text-sm font-medium">
                                {order.customer}
                              </p>

                              <p className="text-xs text-[#8B7A6C]">
                                {order.email}
                              </p>
                            </div>

                          </div>

                        </td>

                        <td className="px-5 py-5 text-sm text-[#8B7A6C]">
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
                          <p className="truncate text-sm text-[#5f554e]">
                            {order.product}
                          </p>
                        </td>

                        <td className="px-5 py-5 text-sm font-semibold">
                          {order.total}
                        </td>

                        <td className="px-5 py-5 text-sm text-[#8B7A6C]">
                          {order.date}
                        </td>

                        <td className="px-5 py-5">

                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="rounded-lg px-3 py-2 text-lg text-[#8B7A6C] transition hover:bg-[#D5C1A9]/40 hover:text-[#080808]"
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

                  <div className="text-4xl text-[#8B7A6C]">
                    ⌕
                  </div>

                  <h3 className="mt-4 text-lg font-semibold">
                    No orders found
                  </h3>

                  <p className="mt-2 text-sm text-[#8B7A6C]">
                    Try changing your search or filter.
                  </p>

                </div>
              )}

            </div>

            {/* FOOTER INFO */}
            <div className="mt-5 flex flex-col justify-between gap-2 text-xs text-[#8B7A6C] sm:flex-row">

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
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808]/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedOrder(null)}
        >

          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-[#8B7A6C]/15 px-6 py-5">

              <div>
                <p className="text-xs text-[#8B7A6C]">
                  Order details
                </p>

                <h3 className="mt-1 text-lg font-semibold">
                  {selectedOrder.id}
                </h3>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F8F6F2] text-[#8B7A6C] transition hover:bg-[#D5C1A9] hover:text-[#080808]"
              >
                ×
              </button>

            </div>

            {/* CUSTOMER */}
            <div className="border-b border-[#8B7A6C]/15 px-6 py-5">

              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B7A6C]">
                Customer
              </p>

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D5C1A9] font-semibold">
                  {selectedOrder.customer
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>

                <div>

                  <p className="font-semibold">
                    {selectedOrder.customer}
                  </p>

                  <p className="text-sm text-[#8B7A6C]">
                    {selectedOrder.email}
                  </p>

                </div>

              </div>

            </div>

            {/* ORDER INFORMATION */}
            <div className="grid grid-cols-2 gap-5 px-6 py-5">

              <div>
                <p className="text-xs text-[#8B7A6C]">
                  Order type
                </p>

                <p className="mt-1 text-sm font-medium">
                  {selectedOrder.type}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#8B7A6C]">
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
                <p className="text-xs text-[#8B7A6C]">
                  Product
                </p>

                <p className="mt-1 text-sm font-medium">
                  {selectedOrder.product}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#8B7A6C]">
                  Order date
                </p>

                <p className="mt-1 text-sm font-medium">
                  {selectedOrder.date}
                </p>
              </div>

            </div>

            {/* TOTAL */}
            <div className="mx-6 mb-6 flex items-center justify-between rounded-xl bg-[#D5C1A9]/35 px-5 py-4">

              <span className="text-sm text-[#8B7A6C]">
                Total amount
              </span>

              <span className="text-lg font-bold text-[#080808]">
                {selectedOrder.total}
              </span>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}