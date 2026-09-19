"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/profile";
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "Prefer not to say",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    // Validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("Please provide your first and last name.");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await signup({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        phone: formData.phone.trim(),
        gender: formData.gender,
      });

      if (!res.success) {
        setError(res.error || "Failed to create account. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Successful registration
      router.push(redirectUrl);
    } catch {
      setError("An unexpected network error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md my-8">
      {/* Logo */}
      <Link
        href="/"
        className="mb-8 block text-center text-xl font-black tracking-[0.25em] transition-opacity hover:opacity-60"
      >
        WEARWELL
      </Link>

      {/* Heading */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-medium tracking-tight">Create Account</h1>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          Join the WEARWELL circle for exclusive drops and VIP privileges.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-800 animate-in fade-in">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 shrink-0 text-red-600 mt-0.5"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
              clipRule="evenodd"
            />
          </svg>
          <div className="flex-1 leading-relaxed">{error}</div>
        </div>
      )}

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-700">
              First Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Sarah"
              required
              autoComplete="given-name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              disabled={isSubmitting}
              className="w-full rounded-none border border-gray-200 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-black disabled:opacity-50"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-700">
              Last Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Khan"
              required
              autoComplete="family-name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              disabled={isSubmitting}
              className="w-full rounded-none border border-gray-200 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-black disabled:opacity-50"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-700">
            Email Address *
          </label>
          <input
            type="email"
            placeholder="sarah@example.com"
            required
            autoComplete="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled={isSubmitting}
            className="w-full rounded-none border border-gray-200 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-black disabled:opacity-50"
          />
        </div>

        {/* Phone Number & Gender */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+92 300 1234567"
              autoComplete="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              disabled={isSubmitting}
              className="w-full rounded-none border border-gray-200 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-black disabled:opacity-50"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-700">
              Gender
            </label>
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              disabled={isSubmitting}
              className="w-full rounded-none border border-gray-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-black disabled:opacity-50"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-700">
            Password *
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="At least 6 characters"
              required
              autoComplete="new-password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              disabled={isSubmitting}
              className="w-full rounded-none border border-gray-200 bg-white px-3.5 py-3 pr-16 text-sm outline-none transition focus:border-black disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 transition hover:text-black"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-700">
            Confirm Password *
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Re-enter your password"
            required
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            disabled={isSubmitting}
            className="w-full rounded-none border border-gray-200 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-black disabled:opacity-50"
          />
        </div>

        {/* Terms Agreement */}
        <label className="flex items-start gap-2.5 pt-1 text-xs text-gray-500">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 accent-black cursor-pointer"
            defaultChecked
          />
          <span className="leading-relaxed">
            I agree to the{" "}
            <span className="underline underline-offset-2 text-black cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="underline underline-offset-2 text-black cursor-pointer">
              Privacy Policy
            </span>
            .
          </span>
        </label>

        {/* Sign Up Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </div>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-black/10" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
          Already a Member?
        </span>
        <div className="h-px flex-1 bg-black/10" />
      </div>

      {/* Sign In Link */}
      <Link
        href={`/account/login${redirectUrl !== "/profile" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
        className="block w-full border border-black bg-transparent py-3.5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-black hover:text-white"
      >
        Sign In to Account
      </Link>

      {/* Back to Home */}
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-xs text-gray-500 underline underline-offset-4 transition hover:text-black"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-8 border-t border-black/10 pt-4 text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
          © 2026 WEARWELL. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#080808]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Fashion Hero Image */}
        <div className="relative hidden min-h-screen overflow-hidden lg:block">
          <img
            src="/images/hero-fashion.png"
            alt="WEARWELL fashion"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-12 left-12 text-white">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] font-medium text-white/80">
              EXCLUSIVE MEMBERSHIP
            </p>
            <h2 className="max-w-md text-4xl font-light leading-tight">
              Elevate your wardrobe
              <br />
              with WEARWELL.
            </h2>
          </div>
        </div>

        {/* Right Signup Section */}
        <div className="flex min-h-screen items-center justify-center px-6 py-10 sm:px-10">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent" />
              </div>
            }
          >
            <SignupForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
