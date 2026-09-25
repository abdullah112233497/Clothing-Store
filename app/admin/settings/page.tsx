"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";

export default function SettingsPage() {
  const [storeStatus, setStoreStatus] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [orderNotifications, setOrderNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const [adminName, setAdminName] = useState("Admin");
  const [adminEmail, setAdminEmail] = useState("admin@outfitters.com");

  // Load admin profile
  useEffect(() => {
    const loadProfile = () => {
      const savedProfile = localStorage.getItem("adminProfile");

      if (!savedProfile) {
        return;
      }

      try {
        const profile = JSON.parse(savedProfile);

        setAdminName(profile.name || "Admin");
        setAdminEmail(
          profile.email || "admin@outfitters.com"
        );
      } catch {
        setAdminName("Admin");
        setAdminEmail("admin@outfitters.com");
      }
    };

    loadProfile();

    window.addEventListener("adminProfileUpdated", loadProfile);
    window.addEventListener("storage", loadProfile);

    return () => {
      window.removeEventListener(
        "adminProfileUpdated",
        loadProfile
      );
      window.removeEventListener("storage", loadProfile);
    };
  }, []);

  const firstLetter =
    adminName.trim().charAt(0).toUpperCase() || "A";

  const handleSave = () => {
    const settings = {
      storeStatus,
      emailNotifications,
      orderNotifications,
    };

    localStorage.setItem(
      "adminSettings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#080808]">
      <AdminSidebar currentTab="settings" />

      {/* MAIN */}
      <section className="lg:ml-64">

        {/* HEADER */}
        <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between gap-4 border-b border-[#D5C1A9]/60 bg-[#FAF7F2]/95 px-5 py-3 backdrop-blur-md sm:px-8 lg:px-10">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A06E31]">
              Admin Portal
            </p>

            <h2 className="text-lg font-semibold tracking-tight text-[#1D1612] sm:text-xl">
              Store Settings
            </h2>
          </div>

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={handleSave}
              className="rounded-xl bg-[#1D1612] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#A06E31] active:scale-95"
            >
              Save Changes
            </button>

            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-[#1D1612]">
                {adminName}
              </p>

              <p className="text-xs text-[#8B7A6C]">
                Store Manager
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#A06E31]/40 bg-[#1D1612] text-sm font-semibold text-[#D5C1A9] shadow-sm">
              {firstLetter}
            </div>

          </div>
        </header>

        {/* CONTENT */}
        <div className="space-y-7 px-5 py-7 sm:px-8 lg:px-10">

          {/* INTRO */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A06E31]">
              Store Configuration
            </p>

            <h2 className="mt-1.5 text-2xl font-semibold text-[#1D1612]">
              General Preferences
            </h2>

            <p className="mt-1 max-w-3xl text-sm text-[#8B7A6C]">
              Manage your store information, notifications,
              logistics defaults, and administrator credentials.
            </p>
          </div>

          {/* SUCCESS MESSAGE */}
          {saved && (
            <div className="flex items-center gap-3 rounded-2xl border border-[#D5C1A9]/60 bg-white p-4 shadow-sm">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#A06E31] text-xs font-bold text-white">
                ✓
              </span>

              <div>
                <p className="text-sm font-semibold text-[#1D1612]">
                  Settings saved successfully
                </p>

                <p className="text-xs text-[#8B7A6C]">
                  Your updated store configurations are live.
                </p>
              </div>
            </div>
          )}

          {/* GRID */}
          <div className="grid gap-6 xl:grid-cols-3">

            {/* LEFT */}
            <div className="space-y-6 xl:col-span-2">

              {/* STORE INFORMATION */}
              <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-6 shadow-sm">

                <div className="border-b border-[#D5C1A9]/40 pb-4">
                  <h3 className="text-base font-semibold text-[#1D1612]">
                    Store Information
                  </h3>

                  <p className="mt-1 text-xs text-[#8B7A6C]">
                    Basic information about your WEARWELL brand
                    and official contact touchpoints.
                  </p>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#694F3D]">
                      Store Name
                    </label>

                    <input
                      type="text"
                      defaultValue="WEARWELL"
                      className="w-full rounded-xl border border-[#D5C1A9]/80 bg-[#FAF7F2] px-3.5 py-2.5 text-xs text-[#1D1612] outline-none transition focus:border-[#A06E31]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#694F3D]">
                      Store Email
                    </label>

                    <input
                      type="email"
                      defaultValue="hello@wearwell.pk"
                      className="w-full rounded-xl border border-[#D5C1A9]/80 bg-[#FAF7F2] px-3.5 py-2.5 text-xs text-[#1D1612] outline-none transition focus:border-[#A06E31]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#694F3D]">
                      Support Hotline
                    </label>

                    <input
                      type="text"
                      defaultValue="+92 300 1234567"
                      className="w-full rounded-xl border border-[#D5C1A9]/80 bg-[#FAF7F2] px-3.5 py-2.5 text-xs text-[#1D1612] outline-none transition focus:border-[#A06E31]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#694F3D]">
                      Website URL
                    </label>

                    <input
                      type="text"
                      defaultValue="www.wearwell.pk"
                      className="w-full rounded-xl border border-[#D5C1A9]/80 bg-[#FAF7F2] px-3.5 py-2.5 text-xs text-[#1D1612] outline-none transition focus:border-[#A06E31]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-medium text-[#694F3D]">
                      Store Head Office & Warehouse Address
                    </label>

                    <textarea
                      rows={3}
                      defaultValue="Plot 12-B, Industrial Area, Faisalabad, Punjab, Pakistan"
                      className="w-full resize-none rounded-xl border border-[#D5C1A9]/80 bg-[#FAF7F2] px-3.5 py-2.5 text-xs text-[#1D1612] outline-none transition focus:border-[#A06E31]"
                    />
                  </div>

                </div>
              </div>

              {/* NOTIFICATIONS */}
              <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-6 shadow-sm">

                <div className="border-b border-[#D5C1A9]/40 pb-4">
                  <h3 className="text-base font-semibold text-[#1D1612]">
                    Notifications
                  </h3>

                  <p className="mt-1 text-xs text-[#8B7A6C]">
                    Choose which notifications you wish to
                    receive for live store activities.
                  </p>
                </div>

                <div className="mt-2 divide-y divide-[#D5C1A9]/30">

                  {/* Email Notifications */}
                  <div className="flex items-center justify-between gap-4 py-4">

                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#1D1612]">
                        Email Notifications
                      </p>

                      <p className="mt-0.5 text-xs text-[#8B7A6C]">
                        Receive daily order and settlement
                        summaries via email.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setEmailNotifications(
                          !emailNotifications
                        )
                      }
                      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                        emailNotifications
                          ? "bg-[#A06E31]"
                          : "bg-[#D5C1A9]/50"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                          emailNotifications
                            ? "left-6"
                            : "left-1"
                        }`}
                      />
                    </button>

                  </div>

                  {/* Order Notifications */}
                  <div className="flex items-center justify-between gap-4 py-4">

                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#1D1612]">
                        Instant New Order Alerts
                      </p>

                      <p className="mt-0.5 text-xs text-[#8B7A6C]">
                        Get immediate desktop sound
                        notifications whenever a customer
                        places an order.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setOrderNotifications(
                          !orderNotifications
                        )
                      }
                      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                        orderNotifications
                          ? "bg-[#A06E31]"
                          : "bg-[#D5C1A9]/50"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
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

            {/* RIGHT */}
            <div className="space-y-6">

              {/* STORE STATUS */}
              <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-6 shadow-sm">

                <div className="flex items-start justify-between gap-3">

                  <div>
                    <h3 className="text-base font-semibold text-[#1D1612]">
                      Storefront Status
                    </h3>

                    <p className="mt-1 text-xs text-[#8B7A6C]">
                      Control live customer ordering and public
                      availability.
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${
                      storeStatus
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-[#D5C1A9] bg-[#F4EEE7] text-[#8B7A6C]"
                    }`}
                  >
                    {storeStatus ? "ONLINE" : "OFFLINE"}
                  </span>

                </div>

                <div className="mt-5 rounded-xl border border-[#D5C1A9]/60 bg-[#FAF7F2] p-4">

                  <div className="flex items-center justify-between gap-3">

                    <div>
                      <p className="text-xs font-semibold text-[#1D1612]">
                        Public Store Availability
                      </p>

                      <p className="mt-0.5 text-xs text-[#8B7A6C]">
                        {storeStatus
                          ? "Customers can browse products and checkout."
                          : "Storefront is in maintenance mode."}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setStoreStatus(!storeStatus)
                      }
                      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                        storeStatus
                          ? "bg-[#A06E31]"
                          : "bg-[#D5C1A9]/50"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
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
              <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-6 shadow-sm">

                <h3 className="text-base font-semibold text-[#1D1612]">
                  Active Administrator
                </h3>

                <p className="mt-1 text-xs text-[#8B7A6C]">
                  Account authenticated for managing this
                  admin console.
                </p>

                <div className="mt-5 flex items-center gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#A06E31]/40 bg-[#1D1612] text-sm font-bold text-[#D5C1A9]">
                    {firstLetter}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#1D1612]">
                      {adminName}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-[#8B7A6C]">
                      {adminEmail}
                    </p>
                  </div>

                </div>

                {/* Security Link */}
                <Link
                  href="/admin/security"
                  className="mt-5 block w-full rounded-xl border border-[#D5C1A9] bg-white py-2.5 text-center text-xs font-semibold text-[#1D1612] transition hover:bg-[#1D1612] hover:text-white"
                >
                  Manage Security & Credentials
                </Link>

              </div>

              {/* BRAND CARD */}
              <div className="rounded-2xl border border-[#3A2C22] bg-[#1D1612] p-6 text-white shadow-sm">

                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A06E31]">
                  Brand Identity
                </p>

                <h3 className="mt-2 text-xl font-bold tracking-[0.12em] text-[#F8F6F2]">
                  WEARWELL
                </h3>

                <p className="mt-3 text-xs leading-relaxed text-[#D5C1A9]">
                  Premium luxury everyday apparel manufactured
                  in Pakistan with timeless craftsmanship and
                  modern silhouettes.
                </p>

              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}