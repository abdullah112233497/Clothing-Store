"use client";

import { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminDateRangeFilter, { DateRangeValue } from "@/components/AdminDateRangeFilter";

/* =========================
   ICONS
========================= */

function DashboardIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function OrdersIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M6 3h12v18H6z" />
      <path d="M9 7h6M9 11h6M9 15h4" />
    </svg>
  );
}

function ProductsIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 7h16v13H4z" />
      <path d="M8 7a4 4 0 0 1 8 0" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
    </svg>
  );
}

function InventoryIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M3 7l9-4 9 4-9 4-9-4Z" />
      <path d="M3 7v10l9 4 9-4V7" />
      <path d="M12 11v10" />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 15h4" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2 2-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21h-2.8v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-2-2 .1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H5V11h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 2-2 .1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V3h2.8v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 2 2-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v2.8h-.2a1.7 1.7 0 0 0-1.6 1Z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function RevenueIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
      <circle cx="12" cy="15" r="2" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-[#A06E31]">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" />
    </svg>
  );
}

/* =========================
   DATA
========================= */

const stats = [
  {
    title: "Total Revenue (COD)",
    value: "Rs. 245,890",
    change: "+12.5%",
    icon: <RevenueIcon />,
  },
  {
    title: "Total Orders",
    value: "128",
    change: "+8.2%",
    icon: <OrdersIcon />,
  },
  {
    title: "Customers",
    value: "86",
    change: "+14.8%",
    icon: <UsersIcon />,
  },
  {
    title: "Products",
    value: "42",
    change: "+5.4%",
    icon: <ProductsIcon />,
  },
];

const recentOrders = [
  {
    id: "#1001",
    customer: "Ayesha Khan (Lahore)",
    product: "Essential Oversized Tee (M)",
    amount: "Rs. 3,499",
    status: "Delivered",
  },
  {
    id: "#1002",
    customer: "Sara Ahmed (Karachi)",
    product: "Urban Denim Jacket (L)",
    amount: "Rs. 7,999",
    status: "Shipped",
  },
  {
    id: "#1003",
    customer: "Ali Raza (Islamabad)",
    product: "Minimal Shoulder Bag",
    amount: "Rs. 5,499",
    status: "Confirmed",
  },
  {
    id: "#1004",
    customer: "Hina Malik (Rawalpindi)",
    product: "Premium Basic Hoodie (S)",
    amount: "Rs. 5,999",
    status: "Delivered",
  },
  {
    id: "#1005",
    customer: "Hamza Ali (Faisalabad)",
    product: "Modern Cargo Pants (32)",
    amount: "Rs. 6,999",
    status: "Pending",
  },
];

const salesData = [
  { month: "Jan", value: 45 },
  { month: "Feb", value: 58 },
  { month: "Mar", value: 52 },
  { month: "Apr", value: 70 },
  { month: "May", value: 64 },
  { month: "Jun", value: 82 },
  { month: "Jul", value: 76 },
  { month: "Aug", value: 94 },
  { month: "Sep", value: 88 },
  { month: "Oct", value: 100 },
  { month: "Nov", value: 91 },
  { month: "Dec", value: 108 },
];

/* =========================
   STATUS STYLE
========================= */

function statusStyle(status: string) {
  if (status === "Delivered" || status === "Paid") {
    return "bg-green-50 text-green-700 border-green-200";
  }

  if (status === "Pending") {
    return "bg-yellow-50 text-yellow-700 border-yellow-200";
  }

  if (status === "Shipped") {
    return "bg-blue-50 text-blue-700 border-blue-200";
  }

  if (status === "Confirmed" || status === "Processing") {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  return "bg-orange-50 text-orange-700 border-orange-200";
}

/* =========================
   ADMIN DASHBOARD
========================= */

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState<DateRangeValue>({
    startDate: "",
    endDate: "",
    preset: "all",
    label: "All Dates",
  });

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#080808]">
      <AdminSidebar currentTab="dashboard" />

      {/* ================= MAIN ================= */}

      <section className="lg:ml-64">

        {/* TOP BAR */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#D5C1A9]/60 bg-[#FAF7F2]/95 px-5 backdrop-blur-md sm:px-8 lg:px-10">

          <div className="flex items-center gap-4">

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#A06E31] font-semibold">
                Admin Panel
              </p>

              <h2 className="text-lg font-semibold tracking-tight text-[#1D1612] sm:text-xl">
                Dashboard
              </h2>
            </div>

          </div>

          <div className="flex items-center gap-3">
            <AdminDateRangeFilter
              value={dateRange}
              onChange={setDateRange}
            />

            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-[#1D1612]">
                Admin
              </p>
              <p className="text-xs text-[#8B7A6C]">
                Administrator
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1D1612] text-sm font-semibold text-[#D5C1A9] border border-[#A06E31]/40">
              A
            </div>

          </div>

        </header>

        {/* CONTENT */}
        <div className="px-5 py-7 sm:px-8 lg:px-10">

          {/* WELCOME BANNER */}
          <section className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#D5C1A9] to-[#C9B195] p-6 sm:p-8 lg:p-10 border border-[#A06E31]/30">

            <div className="relative z-10 max-w-2xl">

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/50">
                Welcome Back
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Manage your store
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-black/65 sm:text-base">
                Keep track of your orders, customers, products and cash on delivery sales
                from one simple dashboard.
              </p>

              <Link
                href="/admin/orders"
                className="mt-6 inline-flex rounded-full bg-[#1D1612] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#A06E31] shadow-xs"
              >
                View Orders
              </Link>

            </div>

            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/20" />
            <div className="absolute -bottom-24 right-20 h-48 w-48 rounded-full bg-black/5" />

          </section>

          {/* STATS */}
          <section className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat) => (
              <div
                key={stat.title}
                className="group rounded-2xl border border-[#D5C1A9]/60 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >

                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#8B7A6C] font-semibold">
                      {stat.title}
                    </p>

                    <h3 className="mt-3 text-2xl font-bold text-[#1D1612]">
                      {stat.value}
                    </h3>

                    <p className="mt-2 text-xs font-semibold text-emerald-700">
                      {stat.change} this month
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FAF7F2] text-[#A06E31] border border-[#D5C1A9]/50 transition-transform duration-300 group-hover:scale-110">
                    {stat.icon}
                  </div>

                </div>

              </div>
            ))}

          </section>

          {/* CHART + ORDER STATUS */}
          <section className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-[1.7fr_1fr]">

            {/* SALES CHART */}
            <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-6 shadow-xs">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#A06E31] font-semibold">
                    Performance
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-[#1D1612]">
                    Monthly Sales (PKR)
                  </h2>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 border border-emerald-200">
                  +18.4%
                </span>

              </div>

              <div className="mt-8 flex h-64 items-end gap-2 sm:gap-3">

                {salesData.map((item) => (
                  <div
                    key={item.month}
                    className="group flex h-full flex-1 flex-col items-center justify-end"
                  >

                    <div className="relative flex w-full flex-1 items-end">

                      <div
                        className="w-full rounded-t-lg bg-[#1D1612] opacity-85 transition-all duration-300 group-hover:bg-[#A06E31] group-hover:opacity-100"
                        style={{
                          height: `${(item.value / 108) * 100}%`,
                        }}
                      />

                      <span className="absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded-md bg-[#1D1612] px-2 py-1 text-[10px] text-white group-hover:block whitespace-nowrap shadow-xs">
                        {item.value}k
                      </span>

                    </div>

                    <span className="mt-3 text-[10px] text-[#8B7A6C] sm:text-xs">
                      {item.month}
                    </span>

                  </div>
                ))}

              </div>

            </div>

            {/* ORDER STATUS */}
            <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-6 shadow-xs">

              <p className="text-xs uppercase tracking-[0.18em] text-[#A06E31] font-semibold">
                Overview
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#1D1612]">
                Order Status Breakdown
              </h2>

              <div className="mt-7 space-y-6">

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-[#1D1612] font-medium">Delivered & Paid (COD)</span>
                    <span className="font-bold text-[#1D1612]">68%</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#D5C1A9]/30">
                    <div className="h-full w-[68%] rounded-full bg-[#A06E31]" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-[#1D1612] font-medium">Shipped (In Transit)</span>
                    <span className="font-bold text-[#1D1612]">18%</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#D5C1A9]/30">
                    <div className="h-full w-[18%] rounded-full bg-[#1D1612]" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-[#1D1612] font-medium">Pending Verification</span>
                    <span className="font-bold text-[#1D1612]">9%</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#D5C1A9]/30">
                    <div className="h-full w-[9%] rounded-full bg-[#8B7A6C]" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-[#1D1612] font-medium">Cancelled / Returned</span>
                    <span className="font-bold text-[#1D1612]">5%</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#D5C1A9]/30">
                    <div className="h-full w-[5%] rounded-full bg-rose-500" />
                  </div>
                </div>

              </div>

            </div>

          </section>

          {/* RECENT ORDERS */}
          <section className="mt-7 rounded-2xl border border-[#D5C1A9]/60 bg-white shadow-xs overflow-hidden">

            <div className="flex flex-col gap-3 border-b border-[#D5C1A9]/60 p-6 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#A06E31] font-semibold">
                  Store Activity
                </p>

                <h2 className="mt-1 text-xl font-bold text-[#1D1612]">
                  Recent Orders
                </h2>
              </div>

              <Link
                href="/admin/orders"
                className="text-sm font-semibold text-[#A06E31] underline underline-offset-4 transition-opacity hover:opacity-75"
              >
                View all orders
              </Link>

            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden overflow-x-auto md:block">

              <table className="w-full min-w-[700px]">

                <thead>
                  <tr className="border-b border-black/5 text-left text-xs uppercase tracking-wider text-black/40">
                    <th className="px-6 py-4 font-medium">
                      Order
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Customer
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Product
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Amount (COD)
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-black/5 last:border-0 transition-colors hover:bg-[#F8F6F2]"
                    >

                      <td className="px-6 py-5 text-sm font-semibold">
                        <Link href="/admin/orders" className="hover:underline">
                          {order.id}
                        </Link>
                      </td>

                      <td className="px-6 py-5 text-sm">
                        {order.customer}
                      </td>

                      <td className="px-6 py-5 text-sm text-black/60">
                        {order.product}
                      </td>

                      <td className="px-6 py-5 text-sm font-medium">
                        {order.amount}
                      </td>

                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${statusStyle(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

            {/* MOBILE ORDERS */}
            <div className="divide-y divide-black/5 md:hidden">

              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-5 transition-colors hover:bg-[#F8F6F2]"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div>
                      <p className="text-sm font-semibold">
                        {order.id}
                      </p>

                      <p className="mt-1 text-sm">
                        {order.customer}
                      </p>
                    </div>

                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${statusStyle(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>

                  </div>

                  <div className="mt-4 flex items-center justify-between">

                    <p className="text-xs text-black/45">
                      {order.product}
                    </p>

                    <p className="text-sm font-semibold">
                      {order.amount}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </section>

          {/* BOTTOM CARDS */}
          <section className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* TOP PRODUCT */}
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-black/40">
                    Best Seller
                  </p>

                  <h2 className="mt-1 text-xl font-semibold">
                    Top Product
                  </h2>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F8F6F2] border border-black/5">
                  <StarIcon />
                </div>

              </div>

              <div className="mt-6 flex items-center gap-4 rounded-2xl bg-[#F8F6F2] p-4 border border-black/5">

                <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-[#D5C1A9] text-[#080808]">
                  <ProductsIcon />
                </div>

                <div className="flex-1">

                  <h3 className="font-semibold">
                    Essential Oversized Tee
                  </h3>

                  <p className="mt-1 text-sm text-black/45">
                    Women · Clothing
                  </p>

                  <div className="mt-3 flex items-center gap-3">

                    <span className="text-sm font-semibold">
                      Rs. 3,499
                    </span>

                    <span className="text-xs text-green-600 font-medium">
                      42 sold
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* QUICK ACTIONS */}
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">

              <p className="text-xs uppercase tracking-[0.18em] text-black/40">
                Shortcuts
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Quick Actions
              </h2>

              <div className="mt-6 grid grid-cols-2 gap-3">

                <Link
                  href="/admin/products"
                  className="rounded-xl border border-black/10 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-[#F8F6F2] hover:shadow-md"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F8F6F2] text-[#080808]">
                    <PlusIcon />
                  </div>

                  <p className="mt-3 text-sm font-medium">
                    Add Product
                  </p>

                  <p className="mt-1 text-xs text-black/40">
                    Create new item
                  </p>
                </Link>

                <Link
                  href="/admin/orders"
                  className="rounded-xl border border-black/10 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-[#F8F6F2] hover:shadow-md"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F8F6F2] text-[#080808]">
                    <ClipboardIcon />
                  </div>

                  <p className="mt-3 text-sm font-medium">
                    Manage Orders
                  </p>

                  <p className="mt-1 text-xs text-black/40">
                    Check order list
                  </p>
                </Link>

                <Link
                  href="/admin/customers"
                  className="rounded-xl border border-black/10 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-[#F8F6F2] hover:shadow-md"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F8F6F2] text-[#080808]">
                    <UsersIcon />
                  </div>

                  <p className="mt-3 text-sm font-medium">
                    Customers
                  </p>

                  <p className="mt-1 text-xs text-black/40">
                    View customers
                  </p>
                </Link>

                <Link
                  href="/admin/settings"
                  className="rounded-xl border border-black/10 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-[#F8F6F2] hover:shadow-md"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F8F6F2] text-[#080808]">
                    <SettingsIcon />
                  </div>

                  <p className="mt-3 text-sm font-medium">
                    Settings
                  </p>

                  <p className="mt-1 text-xs text-black/40">
                    Store settings
                  </p>
                </Link>

              </div>

            </div>

          </section>

          {/* FOOTER */}
          <footer className="py-8 text-center text-xs text-black/35">
            © 2026 WEARWELL Admin Portal. All rights reserved.
          </footer>

        </div>

      </section>

    </main>
  );
}