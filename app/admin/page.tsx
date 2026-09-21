"use client";

import Link from "next/link";

const stats = [
  {
    title: "Total Revenue",
    value: "Rs. 245,890",
    change: "+12.5%",
    icon: "₨",
  },
  {
    title: "Total Orders",
    value: "128",
    change: "+8.2%",
    icon: "O",
  },
  {
    title: "Customers",
    value: "86",
    change: "+5.4%",
    icon: "C",
  },
  {
    title: "Products",
    value: "42",
    change: "+3 new",
    icon: "P",
  },
];

const recentOrders = [
  {
    id: "#1001",
    customer: "Ayesha Khan",
    product: "Essential Oversized Tee",
    amount: "Rs. 3,499",
    status: "Paid",
  },
  {
    id: "#1002",
    customer: "Sara Ahmed",
    product: "Urban Denim Jacket",
    amount: "Rs. 7,999",
    status: "Pending",
  },
  {
    id: "#1003",
    customer: "Ali Raza",
    product: "Minimal Shoulder Bag",
    amount: "Rs. 5,499",
    status: "Shipped",
  },
  {
    id: "#1004",
    customer: "Hina Malik",
    product: "Premium Basic Hoodie",
    amount: "Rs. 5,999",
    status: "Paid",
  },
  {
    id: "#1005",
    customer: "Hamza Ali",
    product: "Modern Cargo Pants",
    amount: "Rs. 6,999",
    status: "Processing",
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

function DashboardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </svg>
  );
}

function OrdersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <path d="M6 3h12v18H6z" />
      <path d="M9 7h6M9 11h6M9 15h4" />
    </svg>
  );
}

function ProductsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <path d="m4 7 8-4 8 4-8 4-8-4Z" />
      <path d="m4 12 8 4 8-4M4 17l8 4 8-4" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="9" r="2.3" />
      <path d="M15.5 14.5a4.5 4.5 0 0 1 5 4.5" />
    </svg>
  );
}

function InventoryIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <path d="M4 7h16v13H4z" />
      <path d="M8 7V4h8v3M8 12h8M8 16h5" />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18M7 15h4" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.5v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H4.5v-2.5h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V4h2.5v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2v2.5h-.2a1.7 1.7 0 0 0-1.5 1Z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <path d="M10 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5" />
      <path d="m14 8 4 4-4 4M18 12H9" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-6 w-6"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-[#F5F3EF] text-[#111111]">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col bg-[#111111] text-white lg:flex">

          {/* Brand */}
          <div className="border-b border-white/10 px-7 py-7">
            <Link href="/" className="block">
              <p className="text-lg font-black tracking-[0.25em]">
                WEARWELL
              </p>

              <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-white/40">
                Admin Portal
              </p>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-7">

            <p className="mb-4 px-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/30">
              Management
            </p>

            <div className="space-y-1">

              <Link
                href="/admin"
                className="flex items-center gap-3 rounded-lg bg-white/10 px-3 py-3 text-sm font-medium text-white"
              >
                <DashboardIcon />
                Dashboard
              </Link>

              <Link
                href="/admin/orders"
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
              >
                <OrdersIcon />
                Orders
              </Link>

              <Link
                href="/admin/products"
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
              >
                <ProductsIcon />
                Products
              </Link>

              <Link
                href="/admin/customers"
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
              >
                <UsersIcon />
                Customers
              </Link>

              <Link
                href="/admin/inventory"
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
              >
                <InventoryIcon />
                Inventory
              </Link>

              <Link
                href="/admin/payments"
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
              >
                <PaymentIcon />
                Payments
              </Link>
            </div>

            <p className="mb-4 mt-10 px-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/30">
              System
            </p>

            <Link
              href="/admin/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
            >
              <SettingsIcon />
              Settings
            </Link>
          </nav>

          {/* Admin Profile */}
          <div className="border-t border-white/10 p-4">

            <div className="flex items-center gap-3 rounded-lg px-3 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
                K
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  Khizra Malik
                </p>

                <p className="truncate text-[10px] text-white/40">
                  Administrator
                </p>
              </div>
            </div>

            <Link
              href="/account/login"
              className="mt-2 flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/50 transition hover:bg-white/5 hover:text-white"
            >
              <LogoutIcon />
              Logout
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <section className="min-w-0 flex-1">

          {/* Top Bar */}
          <header className="border-b border-black/10 bg-white px-5 py-5 sm:px-7 lg:px-10">

            <div className="flex items-center justify-between gap-4">

              <div className="flex items-center gap-4">
                <button
                  className="rounded-lg border border-black/10 p-2 lg:hidden"
                  aria-label="Open menu"
                >
                  <MenuIcon />
                </button>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#A06E31]">
                    WEARWELL ADMIN
                  </p>

                  <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                    Dashboard
                  </h1>
                </div>
              </div>

              <div className="hidden text-right sm:block">
                <p className="text-xs font-medium">
                  Welcome back, Khizra
                </p>

                <p className="mt-1 text-[10px] text-gray-400">
                  Manage your store from one place
                </p>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-5 sm:p-7 lg:p-10">

            {/* Welcome */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Welcome back, Khizra.
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Here&apos;s what&apos;s happening with your store today.
              </p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {stats.map((stat) => (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-black/10 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">

                    <div>
                      <p className="text-xs text-gray-500">
                        {stat.title}
                      </p>

                      <p className="mt-3 text-2xl font-semibold tracking-tight">
                        {stat.value}
                      </p>

                      <p className="mt-2 text-[11px] font-medium text-emerald-600">
                        {stat.change}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3EEE7] text-sm font-bold">
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}

            </div>

            {/* Chart + Orders */}
            <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_1fr]">

              {/* Sales Chart */}
              <div className="rounded-2xl border border-black/10 bg-white p-5 sm:p-7">

                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                      Store performance
                    </p>

                    <h3 className="mt-2 text-lg font-semibold">
                      Sales Overview
                    </h3>
                  </div>

                  <button className="rounded-lg border border-black/10 px-3 py-2 text-[10px] font-medium">
                    This Year
                  </button>
                </div>

                <div className="mt-8 flex h-64 items-end gap-2 sm:gap-4">

                  {salesData.map((item) => (
                    <div
                      key={item.month}
                      className="flex h-full flex-1 flex-col justify-end"
                    >
                      <div
                        className="w-full rounded-t-md bg-[#171717] transition hover:bg-[#A06E31]"
                        style={{
                          height: `${item.value * 2}px`,
                        }}
                        title={`${item.month}: ${item.value}`}
                      />

                      <p className="mt-3 text-center text-[9px] text-gray-400">
                        {item.month}
                      </p>
                    </div>
                  ))}

                </div>
              </div>

              {/* Order Status */}
              <div className="rounded-2xl border border-black/10 bg-white p-5 sm:p-7">

                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                      Order activity
                    </p>

                    <h3 className="mt-2 text-lg font-semibold">
                      Order Status
                    </h3>
                  </div>

                  <Link
                    href="/admin/orders"
                    className="text-xs font-medium underline underline-offset-4"
                  >
                    View all
                  </Link>
                </div>

                <div className="mt-8 space-y-6">

                  <div>
                    <div className="mb-2 flex justify-between text-xs">
                      <span>Paid</span>
                      <span className="font-medium">72%</span>
                    </div>

                    <div className="h-2 rounded-full bg-gray-100">
                      <div className="h-2 w-[72%] rounded-full bg-black" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-xs">
                      <span>Shipped</span>
                      <span className="font-medium">18%</span>
                    </div>

                    <div className="h-2 rounded-full bg-gray-100">
                      <div className="h-2 w-[18%] rounded-full bg-[#A06E31]" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-xs">
                      <span>Pending</span>
                      <span className="font-medium">7%</span>
                    </div>

                    <div className="h-2 rounded-full bg-gray-100">
                      <div className="h-2 w-[7%] rounded-full bg-gray-500" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-xs">
                      <span>Cancelled</span>
                      <span className="font-medium">3%</span>
                    </div>

                    <div className="h-2 rounded-full bg-gray-100">
                      <div className="h-2 w-[3%] rounded-full bg-red-400" />
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="mt-6 rounded-2xl border border-black/10 bg-white">

              <div className="flex flex-col gap-4 border-b border-black/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                    Latest activity
                  </p>

                  <h3 className="mt-2 text-lg font-semibold">
                    Recent Orders
                  </h3>
                </div>

                <Link
                  href="/admin/orders"
                  className="text-xs font-semibold underline underline-offset-4"
                >
                  View all orders →
                </Link>
              </div>

              <div className="overflow-x-auto">

                <table className="w-full min-w-[700px] text-left">

                  <thead>
                    <tr className="border-b border-black/10 text-[10px] uppercase tracking-wider text-gray-400">
                      <th className="px-5 py-4 font-medium sm:px-7">
                        Order
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Customer
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Product
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Total
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-black/5 last:border-0 transition hover:bg-gray-50"
                      >
                        <td className="px-5 py-5 text-sm font-semibold sm:px-7">
                          {order.id}
                        </td>

                        <td className="px-5 py-5 text-sm text-gray-600">
                          {order.customer}
                        </td>

                        <td className="px-5 py-5 text-sm text-gray-600">
                          {order.product}
                        </td>

                        <td className="px-5 py-5 text-sm font-medium">
                          {order.amount}
                        </td>

                        <td className="px-5 py-5">
                          <span
                            className={`rounded-full px-3 py-1.5 text-[10px] font-semibold ${
                              order.status === "Paid"
                                ? "bg-emerald-50 text-emerald-700"
                                : order.status === "Pending"
                                ? "bg-amber-50 text-amber-700"
                                : order.status === "Shipped"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </div>

            {/* Bottom Cards */}
            <div className="mt-6 grid gap-6 md:grid-cols-2">

              {/* Top Products */}
              <div className="rounded-2xl border border-black/10 bg-white p-5 sm:p-7">

                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  Best performers
                </p>

                <h3 className="mt-2 text-lg font-semibold">
                  Top Products
                </h3>

                <div className="mt-6 space-y-4">

                  {[
                    ["Essential Oversized Tee", "128 sold"],
                    ["Urban Denim Jacket", "94 sold"],
                    ["Minimal Shoulder Bag", "81 sold"],
                  ].map(([name, sold], index) => (
                    <div
                      key={name}
                      className="flex items-center gap-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F3EEE7] text-xs font-bold">
                        0{index + 1}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {name}
                        </p>

                        <p className="mt-1 text-[11px] text-gray-400">
                          {sold}
                        </p>
                      </div>
                    </div>
                  ))}

                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-2xl border border-black/10 bg-[#111111] p-5 text-white sm:p-7">

                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Quick actions
                </p>

                <h3 className="mt-2 text-lg font-semibold">
                  Manage your store
                </h3>

                <div className="mt-6 grid grid-cols-2 gap-3">

                  <Link
                    href="/admin/products"
                    className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                  >
                    <p className="text-sm font-medium">
                      Add Product
                    </p>

                    <p className="mt-1 text-[10px] text-white/40">
                      Create new item
                    </p>
                  </Link>

                  <Link
                    href="/admin/orders"
                    className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                  >
                    <p className="text-sm font-medium">
                      View Orders
                    </p>

                    <p className="mt-1 text-[10px] text-white/40">
                      Manage orders
                    </p>
                  </Link>

                  <Link
                    href="/admin/inventory"
                    className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                  >
                    <p className="text-sm font-medium">
                      Inventory
                    </p>

                    <p className="mt-1 text-[10px] text-white/40">
                      Check stock
                    </p>
                  </Link>

                  <Link
                    href="/admin/customers"
                    className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                  >
                    <p className="text-sm font-medium">
                      Customers
                    </p>

                    <p className="mt-1 text-[10px] text-white/40">
                      Customer list
                    </p>
                  </Link>

                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}