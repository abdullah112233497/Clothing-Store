"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="mt-20 border-t border-black/10 bg-[#080808] text-white">
      {/* ================= NEWSLETTER SECTION ================= */}
      <div className="border-b border-white/10 px-6 py-14 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A06E31]">
            WEARWELL INSIDER
          </p>

          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Join the WEARWELL Club
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm leading-relaxed text-gray-400">
            Be the first to access new seasonal arrivals, private sales, and limited edition capsule collections.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="mx-auto mt-7 flex max-w-md flex-col gap-2.5 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs sm:text-sm text-white placeholder:text-gray-400 outline-none backdrop-blur transition focus:border-white focus:bg-white/15"
            />

            <button
              type="submit"
              className="rounded-xl bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-[#A06E31] hover:text-white"
            >
              {subscribed ? "Subscribed ✓" : "Subscribe"}
            </button>
          </form>

          {subscribed && (
            <p className="mt-3 text-xs font-medium text-emerald-400">
              Welcome to the WEARWELL community. Check your inbox soon!
            </p>
          )}
        </div>
      </div>

      {/* ================= TRUST BADGES ================= */}
      <div className="border-b border-white/10 px-6 py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 sm:grid-cols-4 text-center">
          <div className="flex flex-col items-center">
            <svg className="h-5 w-5 text-[#A06E31]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="mt-2 text-xs font-bold text-white uppercase tracking-wider">Free Nationwide Shipping</p>
            <p className="mt-0.5 text-[11px] text-gray-400">On all qualifying orders</p>
          </div>

          <div className="flex flex-col items-center">
            <svg className="h-5 w-5 text-[#A06E31]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <p className="mt-2 text-xs font-bold text-white uppercase tracking-wider">14-Day Easy Returns</p>
            <p className="mt-0.5 text-[11px] text-gray-400">Hassle-free exchange policy</p>
          </div>

          <div className="flex flex-col items-center">
            <svg className="h-5 w-5 text-[#A06E31]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <p className="mt-2 text-xs font-bold text-white uppercase tracking-wider">Original Certified</p>
            <p className="mt-0.5 text-[11px] text-gray-400">100% premium quality fabric</p>
          </div>

          <div className="flex flex-col items-center">
            <svg className="h-5 w-5 text-[#A06E31]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="mt-2 text-xs font-bold text-white uppercase tracking-wider">Cash on Delivery</p>
            <p className="mt-0.5 text-[11px] text-gray-400">Pay securely upon arrival</p>
          </div>
        </div>
      </div>

      {/* ================= MAIN NAVIGATION COLUMNS ================= */}
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Manifesto */}
          <div>
            <Link href="/" className="text-xl font-black tracking-[0.25em] text-white">
              WEARWELL
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-gray-400">
              Modern essentials and timeless silhouettes curated for elevated everyday living. Crafted with meticulous attention to tailoring and enduring comfort.
            </p>
            <p className="mt-4 text-[11px] font-semibold text-[#A06E31]">
              Autumn / Winter 2026 Edition
            </p>
          </div>

          {/* Shop Collections */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Collections
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-gray-400">
              <li>
                <Link href="/shop" className="transition hover:text-white">
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Women" className="transition hover:text-white">
                  Women&apos;s Collection
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Men" className="transition hover:text-white">
                  Men&apos;s Collection
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Accessories" className="transition hover:text-white">
                  Accessories & Bags
                </Link>
              </li>
              <li>
                <Link href="/shop" className="transition hover:text-white">
                  New Season Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Client Care
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-gray-400">
              <li>
                <Link href="/cart" className="transition hover:text-white">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="transition hover:text-white">
                  Checkout
                </Link>
              </li>
              <li>
                <Link href="/profile" className="transition hover:text-white">
                  My Profile & Orders
                </Link>
              </li>
              <li>
                <Link href="/profile" className="transition hover:text-white">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <a href="mailto:support@wearwell.pk" className="transition hover:text-white">
                  Support: help@wearwell.pk
                </a>
              </li>
            </ul>
          </div>

          {/* About & Assurance */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Store & Assurance
            </h3>
            <p className="mt-4 text-xs leading-relaxed text-gray-400">
              Every WEARWELL garment passes comprehensive inspection to guarantee authentic fabric weight and durability.
            </p>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-[11px] text-gray-300">
              <p className="font-semibold text-white">Need Assistance?</p>
              <p className="mt-0.5 text-gray-400">Direct order dispatch hotline: Mon–Sat 9AM–8PM</p>
            </div>
          </div>
        </div>

        {/* ================= COPYRIGHT & LEGAL ================= */}
        <div className="mt-14 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © 2026 WEARWELL. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-6 text-[11px] text-gray-400">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Shipping Policy</span>
            <span>Return Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
