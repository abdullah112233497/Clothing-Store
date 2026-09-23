"use client";

import Link from "next/link";
import { useState } from "react";

export default function SettingsPage() {
  const [storeStatus, setStoreStatus] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [orderNotifications, setOrderNotifications] = useState(true);
  const [saved, setSaved] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#080808]">
      <div className="flex min-h-screen">

        {/* ================= DESKTOP SIDEBAR ================= */}
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

            <Link
              href="/admin"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <span>▦</span>
              Dashboard
            </Link>

            <Link
              href="/admin/orders"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <span>▤</span>
              Orders
            </Link>

            <Link
              href="/admin/products"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <span>□</span>
              Products
            </Link>

            <Link
              href="/admin/inventory"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <span>◫</span>
              Inventory
            </Link>

            <Link
              href="/admin/customers"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <span>♙</span>
              Customers
            </Link>

            <Link
              href="/admin/payments"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <span>◈</span>
              Payments
            </Link>

            <Link
              href="/admin/settings"
              className="mb-2 flex items-center gap-3 rounded-lg bg-[#A06E31] px-4 py-3 text-sm font-semibold text-white"
            >
              <span>⚙</span>
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

        {/* ================= MAIN ================= */}
        <section className="min-w-0 flex-1">

          {/* ================= HEADER ================= */}
          <header className="sticky top-0 z-40 border-b border-[#D5C1A9]/50 bg-white">

            <div className="flex min-h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

              <div className="min-w-0">
                <p className="truncate text-[11px] text-[#8B7A6C] sm:text-xs">
                  Admin / Settings
                </p>

                <h1 className="mt-1 text-lg font-semibold sm:text-xl">
                  Settings
                </h1>
              </div>

              <div className="flex items-center gap-2">

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  className="rounded-lg bg-[#080808] px-3 py-2 text-[11px] font-semibold text-white transition hover:bg-[#A06E31] sm:px-5 sm:py-2.5 sm:text-xs"
                >
                  <span className="hidden sm:inline">
                    Save Changes
                  </span>

                  <span className="sm:hidden">
                    Save
                  </span>
                </button>

                {/* Mobile Menu */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D5C1A9] bg-[#F8F6F2] text-lg lg:hidden"
                  aria-label="Open menu"
                >
                  {menuOpen ? "×" : "☰"}
                </button>

              </div>

            </div>

            {/* ================= MOBILE MENU ================= */}
            {menuOpen && (
              <div className="border-t border-[#D5C1A9]/50 bg-[#080808] px-4 py-4 lg:hidden">

                <nav className="grid grid-cols-2 gap-2">

                  <Link
                    href="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-3 text-xs text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    ▦ Dashboard
                  </Link>

                  <Link
                    href="/admin/orders"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-3 text-xs text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    ▤ Orders
                  </Link>

                  <Link
                    href="/admin/products"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-3 text-xs text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    □ Products
                  </Link>

                  <Link
                    href="/admin/inventory"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-3 text-xs text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    ◫ Inventory
                  </Link>

                  <Link
                    href="/admin/customers"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-3 text-xs text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    ♙ Customers
                  </Link>

                  <Link
                    href="/admin/payments"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-3 text-xs text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    ◈ Payments
                  </Link>

                  <Link
                    href="/admin/settings"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg bg-[#A06E31] px-3 py-3 text-xs font-semibold text-white"
                  >
                    ⚙ Settings
                  </Link>

                </nav>

              </div>
            )}

          </header>

          {/* ================= CONTENT ================= */}
          <div className="p-4 sm:p-6 lg:p-8">

            {/* INTRO */}
            <div className="mb-6 sm:mb-7">

              <p className="text-[10px] uppercase tracking-[0.2em] text-[#A06E31] sm:text-xs">
                Store configuration
              </p>

              <h2 className="mt-2 text-xl font-semibold sm:text-2xl">
                Store Settings
              </h2>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-[#8B7A6C] sm:text-sm">
                Manage your store information, notifications and account
                preferences.
              </p>

            </div>

            {/* SUCCESS MESSAGE */}
            {saved && (
              <div className="mb-6 rounded-xl border border-[#A06E31]/30 bg-[#D5C1A9]/30 p-4">

                <div className="flex items-start gap-3">

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#A06E31] text-sm text-white">
                    ✓
                  </span>

                  <div>
                    <p className="text-sm font-semibold">
                      Settings saved successfully
                    </p>

                    <p className="mt-0.5 text-xs text-[#8B7A6C]">
                      Your latest changes have been saved.
                    </p>
                  </div>

                </div>

              </div>
            )}

            {/* ================= RESPONSIVE GRID ================= */}
            <div className="grid gap-5 xl:grid-cols-3 xl:gap-6">

              {/* ================= LEFT ================= */}
              <div className="space-y-5 xl:col-span-2 xl:space-y-6">

                {/* STORE INFORMATION */}
                <div className="rounded-xl border border-[#D5C1A9]/60 bg-white">

                  <div className="border-b border-[#D5C1A9]/50 px-4 py-4 sm:px-5 sm:py-5">

                    <h3 className="font-semibold">
                      Store Information
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-[#8B7A6C]">
                      Basic information about your WEARWELL store.
                    </p>

                  </div>

                  <div className="grid gap-4 p-4 sm:grid-cols-2 sm:gap-5 sm:p-5">

                    <div>
                      <label className="mb-2 block text-xs font-semibold">
                        Store Name
                      </label>

                      <input
                        type="text"
                        defaultValue="WEARWELL"
                        className="w-full rounded-lg border border-[#D5C1A9] bg-[#F8F6F2] px-3 py-3 text-sm outline-none transition focus:border-[#A06E31] focus:ring-2 focus:ring-[#A06E31]/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold">
                        Store Email
                      </label>

                      <input
                        type="email"
                        defaultValue="hello@wearwell.com"
                        className="w-full rounded-lg border border-[#D5C1A9] bg-[#F8F6F2] px-3 py-3 text-sm outline-none transition focus:border-[#A06E31] focus:ring-2 focus:ring-[#A06E31]/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold">
                        Phone Number
                      </label>

                      <input
                        type="text"
                        defaultValue="+92 300 1234567"
                        className="w-full rounded-lg border border-[#D5C1A9] bg-[#F8F6F2] px-3 py-3 text-sm outline-none transition focus:border-[#A06E31] focus:ring-2 focus:ring-[#A06E31]/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold">
                        Website
                      </label>

                      <input
                        type="text"
                        defaultValue="www.wearwell.com"
                        className="w-full rounded-lg border border-[#D5C1A9] bg-[#F8F6F2] px-3 py-3 text-sm outline-none transition focus:border-[#A06E31] focus:ring-2 focus:ring-[#A06E31]/10"
                      />
                    </div>

                    <div className="sm:col-span-2">

                      <label className="mb-2 block text-xs font-semibold">
                        Store Address
                      </label>

                      <textarea
                        rows={3}
                        defaultValue="Faisalabad, Punjab, Pakistan"
                        className="w-full resize-none rounded-lg border border-[#D5C1A9] bg-[#F8F6F2] px-3 py-3 text-sm outline-none transition focus:border-[#A06E31] focus:ring-2 focus:ring-[#A06E31]/10"
                      />

                    </div>

                  </div>

                </div>

                {/* NOTIFICATIONS */}
                <div className="rounded-xl border border-[#D5C1A9]/60 bg-white">

                  <div className="border-b border-[#D5C1A9]/50 px-4 py-4 sm:px-5 sm:py-5">

                    <h3 className="font-semibold">
                      Notifications
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-[#8B7A6C]">
                      Choose which notifications you want to receive.
                    </p>

                  </div>

                  <div className="divide-y divide-[#D5C1A9]/40">

                    <div className="flex items-center justify-between gap-4 px-4 py-5 sm:px-5">

                      <div className="min-w-0">

                        <p className="text-sm font-semibold">
                          Email Notifications
                        </p>

                        <p className="mt-1 text-xs leading-5 text-[#8B7A6C]">
                          Receive important store updates by email.
                        </p>

                      </div>

                      <button
                        onClick={() =>
                          setEmailNotifications(!emailNotifications)
                        }
                        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                          emailNotifications
                            ? "bg-[#A06E31]"
                            : "bg-[#D5C1A9]"
                        }`}
                      >

                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                            emailNotifications
                              ? "left-6"
                              : "left-1"
                          }`}
                        />

                      </button>

                    </div>

                    <div className="flex items-center justify-between gap-4 px-4 py-5 sm:px-5">

                      <div className="min-w-0">

                        <p className="text-sm font-semibold">
                          New Order Notifications
                        </p>

                        <p className="mt-1 text-xs leading-5 text-[#8B7A6C]">
                          Get notified whenever a new order is placed.
                        </p>

                      </div>

                      <button
                        onClick={() =>
                          setOrderNotifications(!orderNotifications)
                        }
                        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                          orderNotifications
                            ? "bg-[#A06E31]"
                            : "bg-[#D5C1A9]"
                        }`}
                      >

                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                            orderNotifications
                              ? "left-6"
                              : "left-1"
                          }`}
                        />

                      </button>

                    </div>

                  </div>

                </div>

              </div>

              {/* ================= RIGHT ================= */}
              <div className="grid gap-5 sm:grid-cols-2 xl:block xl:space-y-6">

                {/* STORE STATUS */}
                <div className="rounded-xl border border-[#D5C1A9]/60 bg-white p-4 sm:p-5">

                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <h3 className="font-semibold">
                        Store Status
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-[#8B7A6C]">
                        Control your online store availability.
                      </p>

                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                        storeStatus
                          ? "bg-[#D5C1A9]/50 text-[#A06E31]"
                          : "bg-black/5 text-[#8B7A6C]"
                      }`}
                    >
                      {storeStatus ? "ONLINE" : "OFFLINE"}
                    </span>

                  </div>

                  <div className="mt-5 rounded-lg bg-[#F8F6F2] p-3 sm:p-4">

                    <div className="flex items-center justify-between gap-3">

                      <div className="min-w-0">

                        <p className="text-sm font-medium">
                          Online Store
                        </p>

                        <p className="mt-1 text-xs leading-5 text-[#8B7A6C]">
                          Customers can browse and place orders.
                        </p>

                      </div>

                      <button
                        onClick={() => setStoreStatus(!storeStatus)}
                        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                          storeStatus
                            ? "bg-[#A06E31]"
                            : "bg-[#D5C1A9]"
                        }`}
                      >

                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                            storeStatus
                              ? "left-6"
                              : "left-1"
                          }`}
                        />

                      </button>

                    </div>

                  </div>

                </div>

                {/* ADMIN PROFILE */}
                <div className="rounded-xl border border-[#D5C1A9]/60 bg-white p-4 sm:p-5">

                  <h3 className="font-semibold">
                    Admin Profile
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#8B7A6C]">
                    Account currently managing the store.
                  </p>

                  <div className="mt-5 flex items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D5C1A9] text-sm font-bold">
                      KM
                    </div>

                    <div className="min-w-0">

                      <p className="truncate text-sm font-semibold">
                        Khizra Malik
                      </p>

                      <p className="mt-1 text-xs text-[#8B7A6C]">
                        Store Administrator
                      </p>

                    </div>

                  </div>

                  <button className="mt-5 w-full rounded-lg border border-[#D5C1A9] px-4 py-2.5 text-xs font-semibold transition hover:border-[#A06E31] hover:bg-[#F8F6F2]">
                    Edit Profile
                  </button>

                </div>

                {/* BRAND CARD */}
                <div className="rounded-xl bg-[#D5C1A9] p-5 sm:col-span-2 xl:col-span-1">

                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B7A6C]">
                    Brand Identity
                  </p>

                  <h3 className="mt-2 text-xl font-black tracking-[0.12em]">
                    WEARWELL
                  </h3>

                  <p className="mt-3 text-xs leading-5 text-[#080808]/70">
                    Modern everyday fashion with timeless style and
                    effortless elegance.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}