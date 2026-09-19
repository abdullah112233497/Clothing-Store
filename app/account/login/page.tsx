"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/profile";
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await login(email, password);

      if (!res.success) {
        setError(res.error || "Invalid email or password. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Successful login
      router.push(redirectUrl);
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
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
        <h1 className="text-3xl font-medium tracking-tight">Welcome Back</h1>
        <p className="mt-3 text-sm leading-6 text-gray-500">
          Sign in to your account and continue shopping with WEARWELL.
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

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            className="w-full rounded-none border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-black disabled:opacity-50"
          />
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
              Password
            </label>
            <button
              type="button"
              className="text-xs text-gray-500 underline underline-offset-4 transition hover:text-black"
              onClick={() =>
                alert("Password reset instructions have been sent to your email.")
              }
            >
              Forgot Password?
            </button>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-none border border-gray-200 bg-white px-4 py-3.5 pr-20 text-sm outline-none transition focus:border-black disabled:opacity-50"
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
            className="h-4 w-4 accent-black cursor-pointer"
            defaultChecked
          />
          <span>Remember me on this device</span>
        </label>

        {/* Sign In Button */}
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
              <span>Authenticating...</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
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

      {/* Register / Sign Up Link */}
      <Link
        href={`/account/signup${redirectUrl !== "/profile" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
        className="block w-full border border-black bg-transparent py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-black hover:text-white"
      >
        Create an Account
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
  );
}

export default function LoginPage() {
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
              WEARWELL ATELIER
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
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent" />
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}