"use client";

import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/admin-login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const data = await response.json();
      if (!response.ok) { setError(data.error || "Invalid administrator credentials. Please try again."); return; }
      router.replace(redirectUrl);
      router.refresh();
    } catch { setError("An unexpected error occurred. Please try again."); }
    finally { setIsSubmitting(false); }
  }

  return <div className="w-full max-w-md">
    <Link href="/" className="mb-12 block text-center text-xl font-black tracking-[0.25em] transition-opacity hover:opacity-60">WEARWELL</Link>
    <div className="mb-8 text-center"><h1 className="text-3xl font-medium tracking-tight">Admin Portal</h1><p className="mt-3 text-sm leading-6 text-gray-500">Sign in with your administrator account to manage WEARWELL.</p></div>
    {error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium leading-relaxed text-red-800" role="alert">{error}</div>}
    <form onSubmit={handleSubmit} className="space-y-5">
      <div><label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-700">Email Address</label><input type="email" placeholder="Enter your email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} disabled={isSubmitting} className="w-full rounded-none border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-black disabled:opacity-50" /></div>
      <div><div className="mb-2 flex items-center justify-between"><label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">Password</label><button type="button" className="text-xs text-gray-500 underline underline-offset-4 transition hover:text-black" onClick={() => alert("Please contact the store owner to reset administrator access.")}>Forgot Password?</button></div><div className="relative"><input type={showPassword ? "text" : "password"} placeholder="Enter your password" required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} disabled={isSubmitting} className="w-full rounded-none border border-gray-200 bg-white px-4 py-3.5 pr-20 text-sm outline-none transition focus:border-black disabled:opacity-50" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 transition hover:text-black">{showPassword ? "Hide" : "Show"}</button></div></div>
      <label className="flex items-center gap-3 text-xs text-gray-500"><input type="checkbox" className="h-4 w-4 cursor-pointer accent-black" defaultChecked /><span>Remember me on this device</span></label>
      <button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 bg-black py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800 disabled:opacity-60">{isSubmitting ? "Authenticating..." : "Sign In"}</button>
    </form>
    <div className="my-8 flex items-center gap-4"><div className="h-px flex-1 bg-black/10" /><span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Authorized access only</span><div className="h-px flex-1 bg-black/10" /></div>
    <Link href="/" className="block w-full border border-black bg-transparent py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-black hover:text-white">Back to Store</Link>
    <div className="mt-8 text-center"><Link href="/" className="text-xs text-gray-500 underline underline-offset-4 transition hover:text-black">← Back to Home</Link></div>
    <div className="mt-12 border-t border-black/10 pt-6 text-center"><p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">© 2026 WEARWELL. All Rights Reserved.</p></div>
  </div>;
}

export default function AdminLoginPage() {
  return <main className="min-h-screen bg-[#F8F6F2] text-[#080808]"><div className="grid min-h-screen lg:grid-cols-2"><div className="relative hidden min-h-screen overflow-hidden lg:block"><img src="/images/hero-fashion.png" alt="WEARWELL fashion" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-black/30" /><div className="absolute bottom-12 left-12 text-white"><p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-white/80">WEARWELL ATELIER</p><h2 className="max-w-md text-4xl font-light leading-tight">Manage your<br />store with confidence.</h2></div></div><div className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10"><Suspense fallback={<div className="flex items-center justify-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent" /></div>}><AdminLoginForm /></Suspense></div></div></main>;
}
