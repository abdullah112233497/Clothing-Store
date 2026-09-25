"use client";

import { useState } from "react";
import Link from "next/link";

export default function Page() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    localStorage.setItem("adminPassword", newPassword);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setMessage("Password updated successfully!");
  };

  return (
    <main className="min-h-screen bg-[#F8F6F2] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="mb-5 inline-flex text-sm font-medium text-[#A06E31] transition hover:opacity-70"
          >
            ← Back to Dashboard
          </Link>

          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#A06E31]">
            Admin Panel
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#080808] sm:text-4xl">
            Account Security
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your password and keep your admin account secure.
          </p>
        </div>

        {/* Security Card */}
        <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">

          {/* Card Header */}
          <div className="border-b border-black/10 px-6 py-7 sm:px-8">
            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F8F6F2] text-xl">
                🔐
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[#080808]">
                  Change Password
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Update your password regularly for better security.
                </p>
              </div>

            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="px-6 py-8 sm:px-8"
          >

            <div className="space-y-6">

              {/* Current Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Current Password
                </label>

                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full rounded-xl border border-gray-200 bg-[#F8F6F2] px-4 py-3 pr-20 text-sm text-[#080808] outline-none transition focus:border-[#A06E31] focus:ring-2 focus:ring-[#A06E31]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 hover:text-[#A06E31]"
                  >
                    {showCurrent ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full rounded-xl border border-gray-200 bg-[#F8F6F2] px-4 py-3 pr-20 text-sm text-[#080808] outline-none transition focus:border-[#A06E31] focus:ring-2 focus:ring-[#A06E31]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 hover:text-[#A06E31]"
                  >
                    {showNew ? "Hide" : "Show"}
                  </button>
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Use at least 6 characters.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>

                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full rounded-xl border border-gray-200 bg-[#F8F6F2] px-4 py-3 pr-20 text-sm text-[#080808] outline-none transition focus:border-[#A06E31] focus:ring-2 focus:ring-[#A06E31]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 hover:text-[#A06E31]"
                  >
                    {showConfirm ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

            </div>

            {/* Message */}
            {message && (
              <div className="mt-6 rounded-xl border border-black/5 bg-[#F8F6F2] px-4 py-3">
                <p
                  className={`text-sm font-medium ${
                    message.includes("successfully")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              </div>
            )}

            {/* Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="rounded-xl bg-[#1D1612] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#A06E31] active:scale-[0.98]"
              >
                Update Password
              </button>
            </div>

          </form>
        </div>

        {/* Security Note */}
        <div className="mt-6 rounded-2xl border border-black/10 bg-white px-5 py-4">
          <p className="text-sm font-medium text-[#080808]">
            🔒 Security Tip
          </p>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            Never share your admin password with anyone. Use a unique password
            that you do not use on other websites.
          </p>
        </div>

      </div>
    </main>
  );
}