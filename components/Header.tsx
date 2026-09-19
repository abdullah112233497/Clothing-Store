"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type CartItem = {
  quantity: number;
};

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.6}
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.6}
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 20.25a7.5 7.5 0 0 1 15 0"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.6}
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.6}
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 8.25h10.5l.75 11.25H6l.75-11.25Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 8.25V6a3 3 0 0 1 6 0v2.25"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.7}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 7h16M4 12h16M4 17h16"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.7}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 6l12 12M18 6 6 18"
      />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const updateCartQuantity = () => {
      const savedCart = localStorage.getItem("cartItems");

      if (savedCart) {
        const items: CartItem[] = JSON.parse(savedCart);

        const totalQuantity = items.reduce(
          (total, item) => total + item.quantity,
          0
        );

        setCartQuantity(totalQuantity);
      } else {
        setCartQuantity(0);
      }
    };

    const updateWishlist = () => {
      const saved = localStorage.getItem("wishlistItems");
      if (saved) {
        try {
          const items = JSON.parse(saved);
          setWishlistCount(items.length);
        } catch {
          setWishlistCount(0);
        }
      } else {
        setWishlistCount(0);
      }
    };

    updateCartQuantity();
    updateWishlist();

    window.addEventListener("storage", updateCartQuantity);
    window.addEventListener("cartUpdated", updateCartQuantity);
    window.addEventListener("storage", updateWishlist);
    window.addEventListener("wishlistUpdated", updateWishlist);

    return () => {
      window.removeEventListener("storage", updateCartQuantity);
      window.removeEventListener("cartUpdated", updateCartQuantity);
      window.removeEventListener("storage", updateWishlist);
      window.removeEventListener("wishlistUpdated", updateWishlist);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    window.location.href = `/shop?search=${encodeURIComponent(
      search.trim()
    )}`;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur">
      {/* Announcement Bar */}
      <div className="bg-[#A06E31] px-4 py-2.5 text-center text-[10px] font-medium tracking-[0.2em] text-white">
        FREE SHIPPING ON ALL ORDERS
      </div>

      {/* Main Header */}
      <div className="border-b border-black/10">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-black tracking-[0.2em] text-black transition-opacity hover:opacity-70 sm:text-xl"
          >
            WEARWELL
          </Link>



          
          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 md:flex lg:gap-9">
            <Link
              href="/"
              className="relative text-[13px] font-medium text-gray-700 transition hover:text-black"
            >
              Home
            </Link>

            <Link
              href="/shop"
              className="relative text-[13px] font-medium text-gray-700 transition hover:text-black"
            >
              Shop
            </Link>

            <Link
              href="/shop?category=Women"
              className="relative text-[13px] font-medium text-gray-700 transition hover:text-black"
            >
              Women
            </Link>

            <Link
              href="/shop?category=Men"
              className="relative text-[13px] font-medium text-gray-700 transition hover:text-black"
            >
              Men
            </Link>

            <Link
              href="/shop?category=Accessories"
              className="relative text-[13px] font-medium text-gray-700 transition hover:text-black"
            >
              Accessories
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4 sm:gap-5">

            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className="hidden rounded-full p-2 text-gray-700 transition hover:bg-gray-100 hover:text-black sm:block"
            >
              <SearchIcon />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/profile"
              aria-label="Wishlist"
              title="My Wishlist"
              className="relative flex items-center justify-center rounded-full p-1.5 text-gray-700 transition hover:bg-gray-100 hover:text-black sm:p-2"
            >
              <HeartIcon />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#A06E31] text-[9px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account / Profile (Visible on all devices including small mobile) */}
            <Link
              href="/profile"
              aria-label="Account"
              title="My Profile"
              className="flex items-center justify-center rounded-full p-1.5 text-gray-700 transition hover:bg-gray-100 hover:text-black sm:p-2"
            >
              <UserIcon />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="group flex items-center gap-2 text-[13px] font-semibold text-gray-900"
            >
              <span className="transition group-hover:opacity-60">
                <BagIcon />
              </span>

              <span className="hidden sm:inline">
                Bag ({cartQuantity})
              </span>

              <span className="sm:hidden">
                {cartQuantity}
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-full p-1.5 text-gray-800 transition hover:bg-gray-100 md:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Box */}
      {
        searchOpen && (
          <div className="border-b border-black/10 bg-white px-5 py-5 sm:px-6">
            <form
              onSubmit={handleSearch}
              className="mx-auto flex max-w-2xl gap-2"
            >
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
                autoFocus
                className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
              />

              <button
                type="submit"
                className="rounded-lg bg-black px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800"
              >
                Search
              </button>
            </form>
          </div>
        )
      }

    </header>

    {/* Mobile Right Slide-Over Navigation Drawer (Placed OUTSIDE sticky header to fix stacking context) */}
    {/* 1. Backdrop Overlay */}
    <div
      className={`fixed inset-0 z-[999] bg-black/60 transition-opacity duration-300 md:hidden ${
        menuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        zIndex: 999,
      }}
      onClick={() => setMenuOpen(false)}
    />

    {/* 2. Slide-Over Side Drawer (Solid white background, full screen view size height, slides in from right) */}
    <aside
      className={`fixed inset-y-0 right-0 z-[1000] flex w-[85vw] max-w-xs flex-col justify-between bg-white text-[#080808] shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
        menuOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        right: 0,
        height: "100vh",
        minHeight: "100vh",
        maxHeight: "100dvh",
        backgroundColor: "#ffffff",
        zIndex: 1000,
      }}
    >
      <div
        className="flex h-full min-h-full flex-col justify-between overflow-y-auto bg-white"
        style={{ height: "100%", minHeight: "100%" }}
      >
        <div>
          {/* Drawer Top Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 bg-white">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-base font-black tracking-[0.2em] text-black"
            >
              WEARWELL
            </Link>

            <button
              onClick={() => setMenuOpen(false)}
              className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 p-5 text-xs font-semibold uppercase tracking-wider text-gray-800 bg-white">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 transition hover:bg-gray-100 hover:text-black"
            >
              Home
            </Link>

            <Link
              href="/shop"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 transition hover:bg-gray-100 hover:text-black"
            >
              Shop All
            </Link>

            <Link
              href="/shop?category=Women"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 transition hover:bg-gray-100 hover:text-black"
            >
              Women
            </Link>

            <Link
              href="/shop?category=Men"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 transition hover:bg-gray-100 hover:text-black"
            >
              Men
            </Link>

            <Link
              href="/shop?category=Accessories"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 transition hover:bg-gray-100 hover:text-black"
            >
              Accessories
            </Link>

            <div className="my-2 h-px bg-gray-100" />

            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-3 transition hover:bg-gray-100 hover:text-black"
            >
              <div className="flex items-center gap-3">
                <HeartIcon />
                <span>My Wishlist</span>
              </div>
              {wishlistCount > 0 && (
                <span className="rounded-full bg-[#A06E31] px-2.5 py-0.5 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-gray-100 hover:text-black"
            >
              <UserIcon />
              <span>My Profile</span>
            </Link>

            <Link
              href="/cart"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-3 transition hover:bg-gray-100 hover:text-black"
            >
              <div className="flex items-center gap-3">
                <BagIcon />
                <span>Shopping Bag</span>
              </div>
              <span className="rounded-full bg-black px-2.5 py-0.5 text-[10px] font-bold text-white">
                {cartQuantity}
              </span>
            </Link>
          </nav>
        </div>

        {/* Drawer Footer Announcement */}
        <div className="p-6 border-t border-gray-100 bg-[#F8F6F2] text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
            WEARWELL ESSENTIALS
          </p>
          <p className="mt-1 text-xs text-gray-600">
            Free shipping on all orders
          </p>
        </div>
      </div>
    </aside>
  </>
);
}