"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";

export default function SettingsPage() {
  const [storeStatus, setStoreStatus] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [orderNotifications, setOrderNotifications] = useState(true);
  const [saved, setSaved] = useState(false);
  const [storeName, setStoreName] = useState("WEARWELL");
  const [storeEmail, setStoreEmail] = useState("hello@wearwell.pk");
  const [supportPhone, setSupportPhone] = useState("+92 300 1234567");
  const [websiteUrl, setWebsiteUrl] = useState("www.wearwell.pk");
  const [address, setAddress] = useState("Pakistan");
  const [adminName, setAdminName] = useState("Store Admin");
  const [adminEmail, setAdminEmail] = useState("administrator@wearwell.pk");

  useEffect(() => {
    fetch("/api/admin/settings", { cache: "no-store" }).then((response) => response.ok ? response.json() : null).then((data) => {
      const settings = data?.settings;
      if (!settings) return;
      setStoreName(settings.store_name); setStoreEmail(settings.store_email); setSupportPhone(settings.support_phone); setWebsiteUrl(settings.website_url); setAddress(settings.address); setStoreStatus(settings.store_status); setEmailNotifications(settings.email_notifications); setOrderNotifications(settings.order_notifications);
    }).catch((error) => console.error("Settings load failed:", error));
    fetch("/api/auth/me", { cache: "no-store" }).then((response) => response.ok ? response.json() : null).then((data) => {
      if (data?.user) { setAdminName(`${data.user.firstName} ${data.user.lastName}`); setAdminEmail(data.user.email); }
    }).catch((error) => console.error("Admin profile load failed:", error));
  }, []);

  const handleSave = async () => {
    const response = await fetch("/api/admin/settings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ storeName, storeEmail, supportPhone, websiteUrl, address, storeStatus, emailNotifications, orderNotifications }) });
    if (!response.ok) return;
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#080808]">
      <AdminSidebar currentTab="settings" />

      {/* ================= MAIN ================= */}
      <section className="transition-[margin] duration-300 lg:ml-[var(--admin-sidebar-width)]">
        {/* ================= HEADER ================= */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#D5C1A9]/60 bg-[#FAF7F2]/95 px-5 backdrop-blur-md sm:px-8 lg:px-10">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#A06E31] font-semibold">
                Admin Portal
              </p>
              <h2 className="text-lg font-semibold tracking-tight text-[#1D1612] sm:text-xl">
                Store Settings
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="rounded-xl bg-[#1D1612] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#A06E31] shadow-xs active:scale-95"
            >
              Save Changes
            </button>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-[#1D1612]">Admin</p>
              <p className="text-xs text-[#8B7A6C]">Store Manager</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1D1612] text-sm font-semibold text-[#D5C1A9] border border-[#A06E31]/40 shadow-xs">
              A
            </div>
          </div>
        </header>

        {/* ================= CONTENT ================= */}
        <div className="px-5 py-7 sm:px-8 lg:px-10 space-y-7">
          {/* INTRO */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#A06E31] font-semibold">
              Store Configuration
            </p>
            <h2 className="mt-1.5 text-2xl font-semibold text-[#1D1612]">
              General Preferences
            </h2>
            <p className="mt-1 text-sm text-[#8B7A6C]">
              Manage your store information, notifications, logistics defaults, and administrator credentials.
            </p>
          </div>

          {/* SUCCESS MESSAGE */}
          {saved && (
            <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-4 shadow-xs animate-fade-in flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#A06E31] text-xs font-bold text-white shadow-xs">
                ✓
              </span>
              <div>
                <p className="text-sm font-semibold text-[#1D1612]">Settings saved successfully</p>
                <p className="text-xs text-[#8B7A6C]">Your updated store configurations are live.</p>
              </div>
            </div>
          )}

          {/* ================= RESPONSIVE GRID ================= */}
          <div className="grid gap-6 xl:grid-cols-3">
            {/* ================= LEFT ================= */}
            <div className="space-y-6 xl:col-span-2">
              {/* STORE INFORMATION */}
              <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-6 shadow-xs">
                <div className="border-b border-[#D5C1A9]/40 pb-4">
                  <h3 className="font-semibold text-base text-[#1D1612]">Store Information</h3>
                  <p className="mt-1 text-xs text-[#8B7A6C]">
                    Basic information about your WEARWELL brand and official contact touchpoints.
                  </p>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#694F3D]">
                      Store Name
                    </label>
                    <input
                      type="text"
                      value={storeName}
                      onChange={(event) => setStoreName(event.target.value)}
                      className="w-full rounded-xl border border-[#D5C1A9]/80 bg-[#FAF7F2] px-3.5 py-2.5 text-xs text-[#1D1612] outline-none transition focus:border-[#A06E31]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#694F3D]">
                      Store Email
                    </label>
                    <input
                      type="email"
                      value={storeEmail}
                      onChange={(event) => setStoreEmail(event.target.value)}
                      className="w-full rounded-xl border border-[#D5C1A9]/80 bg-[#FAF7F2] px-3.5 py-2.5 text-xs text-[#1D1612] outline-none transition focus:border-[#A06E31]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#694F3D]">
                      Support Hotline
                    </label>
                    <input
                      type="text"
                      value={supportPhone}
                      onChange={(event) => setSupportPhone(event.target.value)}
                      className="w-full rounded-xl border border-[#D5C1A9]/80 bg-[#FAF7F2] px-3.5 py-2.5 text-xs text-[#1D1612] outline-none transition focus:border-[#A06E31]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#694F3D]">
                      Website URL
                    </label>
                    <input
                      type="text"
                      value={websiteUrl}
                      readOnly
                      aria-readonly="true"
                      className="w-full cursor-not-allowed rounded-xl border border-[#D5C1A9]/80 bg-[#F1ECE6] px-3.5 py-2.5 text-xs text-[#8B7A6C] outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-medium text-[#694F3D]">
                      Store Head Office & Warehouse Address
                    </label>
                    <textarea
                      rows={3}
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      className="w-full resize-none rounded-xl border border-[#D5C1A9]/80 bg-[#FAF7F2] px-3.5 py-2.5 text-xs text-[#1D1612] outline-none transition focus:border-[#A06E31]"
                    />
                  </div>
                </div>
              </div>

              {/* NOTIFICATIONS */}
              <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-6 shadow-xs">
                <div className="border-b border-[#D5C1A9]/40 pb-4">
                  <h3 className="font-semibold text-base text-[#1D1612]">Notifications</h3>
                  <p className="mt-1 text-xs text-[#8B7A6C]">
                    Choose which notifications you wish to receive for live store activities.
                  </p>
                </div>

                <div className="divide-y divide-[#D5C1A9]/30 mt-2">
                  <div className="flex items-center justify-between gap-4 py-4">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#1D1612]">Email Notifications</p>
                      <p className="mt-0.5 text-xs text-[#8B7A6C]">
                        Receive daily order and settlement summaries via email.
                      </p>
                    </div>

                    <button
                      onClick={() => setEmailNotifications(!emailNotifications)}
                      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${emailNotifications ? "bg-[#A06E31]" : "bg-[#D5C1A9]/50"
                        }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${emailNotifications ? "left-6" : "left-1"
                          }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-4 py-4">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#1D1612]">Instant New Order Alerts</p>
                      <p className="mt-0.5 text-xs text-[#8B7A6C]">
                        Get immediate desktop sound notifications whenever a customer places an order.
                      </p>
                    </div>

                    <button
                      onClick={() => setOrderNotifications(!orderNotifications)}
                      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${orderNotifications ? "bg-[#A06E31]" : "bg-[#D5C1A9]/50"
                        }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${orderNotifications ? "left-6" : "left-1"
                          }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="space-y-6">
              {/* STORE STATUS */}
              <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-6 shadow-xs">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-base text-[#1D1612]">Storefront Status</h3>
                    <p className="mt-1 text-xs text-[#8B7A6C]">
                      Control live customer ordering and public availability.
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-bold tracking-wider uppercase ${storeStatus
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-[#F4EEE7] text-[#8B7A6C] border border-[#D5C1A9]"
                      }`}
                  >
                    {storeStatus ? "ONLINE" : "OFFLINE"}
                  </span>
                </div>

                <div className="mt-5 rounded-xl border border-[#D5C1A9]/60 bg-[#FAF7F2] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-[#1D1612]">Public Store Availability</p>
                      <p className="mt-0.5 text-xs text-[#8B7A6C]">
                        {storeStatus
                          ? "Customers can browse products and checkout."
                          : "Storefront is in maintenance mode."}
                      </p>
                    </div>

                    <button
                      onClick={() => setStoreStatus(!storeStatus)}
                      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${storeStatus ? "bg-[#A06E31]" : "bg-[#D5C1A9]/50"
                        }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${storeStatus ? "left-6" : "left-1"
                          }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* ADMIN PROFILE */}
              <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-6 shadow-xs">
                <h3 className="font-semibold text-base text-[#1D1612]">Active Administrator</h3>
                <p className="mt-1 text-xs text-[#8B7A6C]">
                  Account authenticated for managing this admin console.
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1D1612] text-sm font-bold text-[#D5C1A9] border border-[#A06E31]/40 shadow-xs">
                    A
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#1D1612]">
                      {adminName}
                    </p>
                    <p className="mt-0.5 text-xs text-[#8B7A6C]">
                      {adminEmail}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  className="mt-5 w-full rounded-xl border border-[#D5C1A9] bg-white py-2.5 text-xs font-semibold text-[#1D1612] transition hover:bg-[#1D1612] hover:text-white"
                >
                  Manage Security & Credentials
                </button>
              </div>

              {/* BRAND CARD */}
              <div className="rounded-2xl bg-[#1D1612] p-6 text-white border border-[#3A2C22] shadow-sm">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#A06E31] font-semibold">
                  Brand Identity
                </p>
                <h3 className="mt-2 text-xl font-bold tracking-[0.12em] text-[#F8F6F2]">
                  WEARWELL
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[#D5C1A9]">
                  Premium luxury everyday apparel manufactured in Pakistan with timeless craftsmanship and modern silhouettes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
