"use client";

import Link from "next/link";

export default function RegisterPage() {
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
              Your style,
              <br />
              your story.
            </h2>
          </div>
        </div>

        {/* Right Register Section */}
        <div className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">

            {/* Logo */}
            <Link
              href="/"
              className="mb-12 block text-center text-xl font-black tracking-[0.25em]"
            >
              WEARWELL
            </Link>

            {/* Heading */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-medium tracking-tight">
                Create Account
              </h1>

              <p className="mt-3 text-sm text-gray-500">
                Create your account and enjoy a personalized shopping
                experience.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5">

              {/* First & Last Name */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider">
                    First Name
                  </label>

                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider">
                    Last Name
                  </label>

                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-black"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-black"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-black"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-black"
                />
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 text-xs leading-5 text-gray-500">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-black"
                />

                <span>
                  I agree to the{" "}
                  <span className="font-medium text-black">
                    Terms & Conditions
                  </span>{" "}
                  and Privacy Policy.
                </span>
              </label>

              {/* Create Account */}
              <button
                type="submit"
                className="w-full bg-black py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-gray-800"
              >
                Create Account
              </button>
            </form>

            {/* Sign In */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/account/login"
                  className="font-semibold text-black underline underline-offset-4 transition hover:opacity-60"
                >
                  Sign In
                </Link>
              </p>
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