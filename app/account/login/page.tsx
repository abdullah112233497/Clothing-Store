"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 1. Mark user as logged in
    localStorage.setItem("isLoggedIn", "true");

    // 2. Derive user name from email
    const cleanEmail = email.trim();
    const namePart = cleanEmail.includes("@")
      ? cleanEmail.split("@")[0]
      : "User";
    const formattedName =
      namePart.charAt(0).toUpperCase() + namePart.slice(1);

    const savedProfile = localStorage.getItem("userProfile");
    let currentProfile = savedProfile ? JSON.parse(savedProfile) : {};

    const updatedProfile = {
      firstName: currentProfile.firstName || formattedName,
      lastName: currentProfile.lastName || "Khan",
      email: cleanEmail,
      phone: currentProfile.phone || "+92 300 1234567",
      birthday: currentProfile.birthday || "1998-05-14",
      gender: currentProfile.gender || "Male",
      membershipTier: currentProfile.membershipTier || "VIP Black",
      memberSince: currentProfile.memberSince || "November 2024",
      rewardPoints: currentProfile.rewardPoints || 450,
    };

    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));

    // 3. Navigate to profile
    router.push("/profile");
  };

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#080808]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left Fashion Image */}
        <div className="relative hidden min-h-screen overflow-hidden lg:block">
          <img
            src="/images/hero-fashion.png"
            alt="WEARWELL fashion"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute bottom-12 left-12 text-white">
            <p className="mb-3 text-xs uppercase tracking-[0.3em]">
              WEARWELL
            </p>

            <h2 className="max-w-md text-4xl font-light leading-tight">
              Style that
              <br />
              speaks for you.
            </h2>
          </div>
        </div>

        {/* Right Login Section */}
        <div className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">

            {/* Logo */}
            <Link
              href="/"
              className="mb-12 block text-center text-xl font-black tracking-[0.25em] transition-opacity hover:opacity-60"
            >
              WEARWELL
            </Link>

            {/* Heading */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-medium tracking-tight">
                Welcome Back
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Sign in to your account and continue shopping with WEARWELL.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-black"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-xs font-medium uppercase tracking-wider">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs text-gray-500 underline underline-offset-4 transition hover:text-black"
                    onClick={() => alert("Password reset link sent to your email.")}
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-200 bg-white px-4 py-3.5 pr-20 text-sm outline-none transition focus:border-black"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 transition hover:text-black"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <label className="flex items-center gap-3 text-xs text-gray-500">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-black"
                />

                <span>Remember me</span>
              </label>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-black py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-gray-800"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-black/10" />

              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                New to WEARWELL?
              </span>

              <div className="h-px flex-1 bg-black/10" />
            </div>

            {/* Register */}
            <Link
              href="/profile"
              className="block w-full border border-black bg-transparent py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-black hover:text-white"
            >
              Continue to Profile
            </Link>

            {/* Back to Home */}
            <div className="mt-8 text-center">
              <Link
                href="/"
                className="text-xs text-gray-500 underline underline-offset-4 transition hover:text-black"
              >
                ← Back to Home
              </Link>
            </div>

            {/* Footer */}
            <div className="mt-12 border-t border-black/10 pt-6 text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                © 2026 WEARWELL. All Rights Reserved.
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}