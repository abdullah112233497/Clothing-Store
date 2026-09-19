"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ProductCardProps = {
  name: string;
  price: string;
  category: string;
  image: string;
};

type CartItem = {
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
};

type WishlistItem = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
};

export default function ProductCard({
  name,
  price,
  category,
  image,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const checkWishlist = () => {
      const saved = localStorage.getItem("wishlistItems");
      if (saved) {
        try {
          const items: WishlistItem[] = JSON.parse(saved);
          setIsWishlisted(items.some((item) => item.name === name));
        } catch {
          setIsWishlisted(false);
        }
      } else {
        setIsWishlisted(false);
      }
    };

    checkWishlist();
    window.addEventListener("wishlistUpdated", checkWishlist);
    window.addEventListener("storage", checkWishlist);
    return () => {
      window.removeEventListener("wishlistUpdated", checkWishlist);
      window.removeEventListener("storage", checkWishlist);
    };
  }, [name]);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const saved = localStorage.getItem("wishlistItems");
    let items: WishlistItem[] = saved ? JSON.parse(saved) : [];

    const numericPrice = Number(price.replace(/[^0-9]/g, "")) || 3990;

    const exists = items.some((item) => item.name === name);
    if (exists) {
      items = items.filter((item) => item.name !== name);
      setIsWishlisted(false);
    } else {
      const newItem: WishlistItem = {
        id: Date.now(),
        name,
        price: numericPrice,
        category,
        image,
        inStock: true,
      };
      items.push(newItem);
      setIsWishlisted(true);
    }

    localStorage.setItem("wishlistItems", JSON.stringify(items));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const productSlug = name
    .toLowerCase()
    .replace(/\s+/g, "-");

  const productLink = `/product/${productSlug}`;

  const handleQuickAdd = () => {
    const numericPrice = Number(
      price.replace("Rs. ", "").replace(",", "")
    );

    const newItem: CartItem = {
      name,
      price: numericPrice,
      size: "M",
      quantity: 1,
      image,
    };

    const savedCart = localStorage.getItem("cartItems");

    let cartItems: CartItem[] = savedCart
      ? JSON.parse(savedCart)
      : [];

    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item.name === newItem.name &&
        item.size === newItem.size
    );

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex] = {
        ...cartItems[existingItemIndex],
        quantity:
          cartItems[existingItemIndex].quantity + 1,
      };
    } else {
      cartItems.push(newItem);
    }

    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );

    window.dispatchEvent(new Event("cartUpdated"));

    alert(`${name} added to cart!`);
  };

  return (
    <article className="group">
      <div className="relative block aspect-[3/4] overflow-hidden bg-[#F1EEE9]">
        <Link
          href={productLink}
          className="block h-full w-full"
        >
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </Link>

        <span className="absolute left-3 top-3 bg-white px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider">
          New
        </span>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleToggleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-110 hover:bg-white"
        >
          <svg
            className={`h-4 w-4 transition duration-200 ${
              isWishlisted
                ? "fill-red-500 text-red-500 scale-110"
                : "fill-none text-gray-700 hover:text-red-500"
            }`}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.75"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        <button
          onClick={handleQuickAdd}
          className="absolute bottom-0 left-0 right-0 translate-y-full bg-[#080808] py-3 text-center text-xs font-medium uppercase tracking-wider text-white transition duration-300 group-hover:translate-y-0 hover:bg-[#A06E31]"
        >
          Quick Add
        </button>
      </div>

      <div className="pt-3 sm:pt-4">
        <p className="mb-1 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#A06E31]">
          {category}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-3">
          <Link
            href={productLink}
            className="text-xs sm:text-sm font-medium leading-snug transition hover:text-[#A06E31] line-clamp-2"
          >
            {name}
          </Link>

          <p className="whitespace-nowrap text-xs sm:text-sm font-semibold sm:font-medium text-gray-900">
            {price}
          </p>
        </div>

        <div className="mt-2 flex gap-1.5">
          <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border border-black/20 bg-black" />
          <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border border-black/20 bg-[#D5C1A9]" />
          <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border border-black/20 bg-white" />
        </div>
      </div>
    </article>
  );
}