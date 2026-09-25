"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("admin@outfitters.com");
  const [phone, setPhone] = useState("+92 300 1234567");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("adminProfile");

    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);

        setName(profile.name || "Admin");
        setEmail(profile.email || "admin@outfitters.com");
        setPhone(profile.phone || "+92 300 1234567");
      } catch {
        console.log("Profile data could not be loaded");
      }
    }
  }, []);

  const handleSave = () => {
    const profile = {
      name,
      email,
      phone,
    };

    localStorage.setItem("adminProfile", JSON.stringify(profile));

    window.dispatchEvent(new Event("adminProfileUpdated"));

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const firstLetter =
    name.trim().charAt(0).toUpperCase() || "A";

  return (
    <main className="min-h-screen bg-[#F8F6F2] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#A06E31]">
            Admin Panel
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#080808] sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your personal information and account details.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">

          <div className="border-b border-black/10 px-6 py-8 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#1D1612] text-3xl font-semibold text-white">
                {firstLetter}
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#080808]">
                  {name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Administrator
                </p>

                <p className="mt-2 text-sm text-[#A06E31]">
                  {email}
                </p>
              </div>

            </div>
          </div>

          <div className="px-6 py-8 sm:px-8">

            <h3 className="mb-6 text-lg font-semibold text-[#080808]">
              Personal Information
            </h3>

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-[#F8F6F2] px-4 py-3 text-sm text-[#080808] outline-none transition focus:border-[#A06E31]"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-[#F8F6F2] px-4 py-3 text-sm text-[#080808] outline-none transition focus:border-[#A06E31]"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-[#F8F6F2] px-4 py-3 text-sm text-[#080808] outline-none transition focus:border-[#A06E31]"
                  placeholder="Enter your phone"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Role
                </label>

                <input
                  type="text"
                  value="Administrator"
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-500"
                />
              </div>

            </div>

            <div className="mt-8 flex items-center justify-end gap-4">

              {saved && (
                <p className="text-sm font-medium text-green-600">
                  ✓ Profile updated successfully
                </p>
              )}

              <button
                type="button"
                onClick={handleSave}
                className="rounded-xl bg-[#1D1612] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#A06E31]"
              >
                Save Changes
              </button>

            </div>

          </div>
        </div>

      </div>
    </main>
  );
}