"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { readWishlistItems, writeWishlistItems } from "@/lib/wishlist-client";
import WishlistAuthPrompt from "@/components/WishlistAuthPrompt";

type ProductCardProps = {
  slug?: string;
  name: string;
  price: string;
  category: string;
  image: string;
  variants?: ProductVariant[];
};

type ProductVariant = {
  id: number;
  stock: number;
  available: boolean;
  price: number;
  options: Record<string, { value: string; displayValue?: string; colorHex?: string }>;
};

type CartItem = {
  variantId?: number;
  slug?: string;
  name: string;
  price: number;
  size: string;
  color?: string;
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
  slug,
  name,
  price,
  category,
  image,
  variants,
}: ProductCardProps) {
  const { isLoggedIn } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  useEffect(() => {
    const checkWishlist = () => {
      if (!isLoggedIn) {
        setIsWishlisted(false);
        return;
      }
      const items = readWishlistItems<WishlistItem>();
      setIsWishlisted(items.some((item) => item.name === name));
    };

    checkWishlist();
    window.addEventListener("wishlistUpdated", checkWishlist);
    window.addEventListener("storage", checkWishlist);
    return () => {
      window.removeEventListener("wishlistUpdated", checkWishlist);
      window.removeEventListener("storage", checkWishlist);
    };
  }, [name, isLoggedIn]);

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      setShowAuthPrompt(true);
      return;
    }
    if (isUpdatingWishlist) return;

    const numericPrice = Number(price.replace(/[^0-9]/g, "")) || 3990;
    const nextState = !isWishlisted;
    const previousItems = readWishlistItems<WishlistItem>();
    const optimisticItems = nextState
      ? previousItems.some((item) => item.name === name)
        ? previousItems
        : [...previousItems, { id: Date.now(), name, price: numericPrice, category, image, inStock: true }]
      : previousItems.filter((item) => item.name !== name);
    setIsWishlisted(nextState);
    setIsUpdatingWishlist(true);
    writeWishlistItems(optimisticItems);

    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: numericPrice,
          category,
          image,
          inStock: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setIsWishlisted(!nextState);
        writeWishlistItems(previousItems);
        return;
      }

      let items = readWishlistItems<WishlistItem>();
      if (data.wishlisted) {
        const confirmed = { id: data.item?.id || Date.now(), name, price: numericPrice, category, image, inStock: true };
        items = [...items.filter((item) => item.name !== name), confirmed];
      } else {
        items = items.filter((i) => i.name !== name);
      }
      setIsWishlisted(Boolean(data.wishlisted));
      writeWishlistItems(items);
    } catch {
      setIsWishlisted(!nextState);
      writeWishlistItems(previousItems);
    } finally {
      setIsUpdatingWishlist(false);
    }
  };

  const resolvedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const productLink = `/product/${resolvedSlug}`;

  const handleQuickAdd = () => {
    const numericPrice = Number(
      price.replace("Rs. ", "").replace(",", "")
    );

    const firstAvailable = variants?.find((variant) => variant.available && variant.stock > 0);
    if (variants && !firstAvailable) {
      alert(`${name} is currently out of stock.`);
      return;
    }
    const sizeOption = firstAvailable?.options.size || firstAvailable?.options.shoe_size || firstAvailable?.options.waist;
    const newItem: CartItem = {
      variantId: firstAvailable?.id,
      slug: resolvedSlug,
      name,
      price: firstAvailable?.price || numericPrice,
      size: sizeOption?.value || "",
      color: firstAvailable?.options.color?.value || "",
      quantity: 1,
      image,
    };

    const savedCart = localStorage.getItem("cartItems");

    const cartItems: CartItem[] = savedCart
      ? JSON.parse(savedCart)
      : [];

    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item.name === newItem.name &&
        item.size === newItem.size && item.color === newItem.color
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
    <>
    <article className="group">
      <div className="relative block aspect-[3/4] overflow-hidden bg-[#F1EEE9]">
        <Link
          href={productLink}
          scroll
          className="block h-full w-full"
        >
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
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
          aria-busy={isUpdatingWishlist}
          disabled={isUpdatingWishlist}
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
            scroll
            className="text-xs sm:text-sm font-medium leading-snug transition hover:text-[#A06E31] line-clamp-2"
          >
            {name}
          </Link>

          <p className="whitespace-nowrap text-xs sm:text-sm font-semibold sm:font-medium text-gray-900">
            {price}
          </p>
        </div>

        {variants ? (
          <div className="mt-2 space-y-1.5">
            <div className="flex gap-1.5" aria-label="Available colors">
              {Array.from(new Map(variants.filter((variant) => variant.available && variant.stock > 0 && variant.options.color).map((variant) => [variant.options.color.value, variant.options.color])).values()).map((color) => (
                <span key={color.value} title={color.displayValue || color.value} className="h-2.5 w-2.5 rounded-full border border-black/20 sm:h-3 sm:w-3" style={{ backgroundColor: color.colorHex || color.value }} />
              ))}
            </div>
            <div className="flex flex-wrap gap-1" aria-label="Available sizes">
              {Array.from(new Set(variants.filter((variant) => variant.available && variant.stock > 0).map((variant) => variant.options.size?.value || variant.options.shoe_size?.value || variant.options.waist?.value).filter(Boolean))).map((size) => (
                <span key={size} className="rounded border border-black/15 px-1.5 py-0.5 text-[8px] font-medium text-gray-600 sm:text-[9px]">{size}</span>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-2 flex gap-1.5">
            <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border border-black/20 bg-black" />
            <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border border-black/20 bg-[#D5C1A9]" />
            <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border border-black/20 bg-white" />
          </div>
        )}
      </div>
    </article>
    <WishlistAuthPrompt
      open={showAuthPrompt}
      onClose={() => setShowAuthPrompt(false)}
      redirectTo={productLink}
    />
    </>
  );
}
