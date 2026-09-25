"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function UserIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.7 1.7-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V22h-2.4v-.2a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.7-1.7.06-.06A1.7 1.7 0 0 0 8.46 17a1.7 1.7 0 0 0-1.56-1.03H6.7v-2.4h.2A1.7 1.7 0 0 0 8.46 12a1.7 1.7 0 0 0-.34-1.88l-.06-.06 1.7-1.7.06.06a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 12.73 7.2V7h2.4v.2a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.7 1.7-.06.06A1.7 1.7 0 0 0 19.4 12c.25.62.86 1.03 1.53 1.03h.2v2.4h-.2A1.7 1.7 0 0 0 19.4 15Z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 3 5 6v5c0 4.8 2.9 8.8 7 10 4.1-1.2 7-5.2 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M21 3v18" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function AdminProfile() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("admin@outfitters.com");

  useEffect(() => {
    const loadProfile = () => {
      const savedProfile = localStorage.getItem("adminProfile");

      if (!savedProfile) {
        return;
      }

      try {
        const profile = JSON.parse(savedProfile);

        setName(profile.name || "Admin");
        setEmail(profile.email || "admin@outfitters.com");
      } catch {
        setName("Admin");
        setEmail("admin@outfitters.com");
      }
    };

    loadProfile();

    window.addEventListener("storage", loadProfile);
    window.addEventListener("adminProfileUpdated", loadProfile);

    return () => {
      window.removeEventListener("storage", loadProfile);
      window.removeEventListener("adminProfileUpdated", loadProfile);
    };
  }, []);

  const firstLetter =
    name.trim().charAt(0).toUpperCase() || "A";

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmed) {
      setOpen(false);

      // Logout ke baad dashboard par redirect
      window.location.href = "/admin";
    }
  };

  return (
    <div className="relative">

      {/* Profile Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-full transition hover:opacity-80"
      >
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-[#080808]">
            {name}
          </p>

          <p className="text-xs text-gray-500">
            Administrator
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1D1612] text-sm font-semibold text-white">
          {firstLetter}
        </div>

        <ChevronIcon />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl">

          {/* Profile Header */}
          <div className="border-b border-black/10 px-4 py-4">
            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1D1612] font-semibold text-white">
                {firstLetter}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#080808]">
                  {name}
                </p>

                <p className="truncate text-xs text-gray-500">
                  {email}
                </p>
              </div>

            </div>
          </div>

          {/* Menu */}
          <div className="p-2">

            {/* My Profile */}
            <Link
              href="/admin/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-700 transition hover:bg-[#F8F6F2] hover:text-[#A06E31]"
            >
              <UserIcon />
              <span>My Profile</span>
            </Link>

            {/* Settings */}
            <Link
              href="/admin/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-700 transition hover:bg-[#F8F6F2] hover:text-[#A06E31]"
            >
              <SettingsIcon />
              <span>Settings</span>
            </Link>

            {/* Account Security */}
            <Link
              href="/admin/security"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-700 transition hover:bg-[#F8F6F2] hover:text-[#A06E31]"
            >
              <ShieldIcon />
              <span>Account Security</span>
            </Link>

            {/* Divider */}
            <div className="my-2 border-t border-black/10" />

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-600 transition hover:bg-red-50"
            >
              <LogoutIcon />
              <span>Logout</span>
            </button>

          </div>
        </div>
      )}
    </div>
  );
}