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

    updateCartQuantity();

    window.addEventListener("storage", updateCartQuantity);
    window.addEventListener("cartUpdated", updateCartQuantity);

    return () => {
      window.removeEventListener("storage", updateCartQuantity);
      window.removeEventListener("cartUpdated", updateCartQuantity);
    };
  }, []);

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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur">
      {/* Announcement Bar */}
      <div className="bg-black px-4 py-2.5 text-center text-[10px] font-medium tracking-[0.2em] text-white">
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
            WE ARE WELL
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

            {/* Account */}
            <button
              aria-label="Account"
              className="hidden rounded-full p-2 text-gray-700 transition hover:bg-gray-100 hover:text-black sm:block"
            >
              <UserIcon />
            </button>

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
      {searchOpen && (
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
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-b border-black/10 bg-white px-6 py-7 md:hidden">
          <nav className="flex flex-col gap-6">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-800 transition hover:text-black"
            >
              Home
            </Link>

            <Link
              href="/shop"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-800 transition hover:text-black"
            >
              Shop
            </Link>

            <Link
              href="/shop?category=Women"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-800 transition hover:text-black"
            >
              Women
            </Link>

            <Link
              href="/shop?category=Men"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-800 transition hover:text-black"
            >
              Men
            </Link>

            <Link
              href="/shop?category=Accessories"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-800 transition hover:text-black"
            >
              Accessories
            </Link>

            <div className="h-px bg-gray-100" />

            <Link
              href="/cart"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-semibold text-black"
            >
              <BagIcon />
              Bag ({cartQuantity})
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}