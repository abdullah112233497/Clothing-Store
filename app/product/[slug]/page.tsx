"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";
import WishlistAuthPrompt from "@/components/WishlistAuthPrompt";
import { readWishlistItems, writeWishlistItems } from "@/lib/wishlist-client";
import { catalogFetch, subscribeCatalogRefresh } from "@/lib/catalog-client";

type Product = {
id?: number;
name: string;
price: number;
oldPrice: number;
category: "Women" | "Men" | "Accessories";
image: string;
images: string[];
description: string;
details: string[];
variants?: Array<{ id: number; sku: string; price: number; stock: number; available: boolean; options: Record<string, { label: string; value: string; displayValue?: string; colorHex?: string }> }>;
attributes?: Array<{ code: string; name: string; displayType: string; required: boolean; variant: boolean }>;
};

const products: Product[] = [
// ==================== WOMEN ====================

{
name: "Essential Oversized Tee",
price: 3499,
oldPrice: 4299,
category: "Women",
image: "/images/product-1.png",
images: ["/images/product-1.png"],
description:
"An effortless oversized tee designed for everyday comfort. Its relaxed silhouette and clean minimal look make it an easy choice for casual days, layered outfits and everyday styling.",
details: [
"Relaxed oversized fit",
"Soft everyday fabric",
"Minimal clean design",
"Easy to style",
],
},

{
name: "Relaxed Fit Trousers",
price: 6499,
oldPrice: 7499,
category: "Women",
image: "/images/product-4.png",
images: ["/images/product-4.png"],
description:
"Relaxed fit trousers designed with a modern silhouette and effortless movement. A versatile wardrobe essential that works beautifully with everyday tops, shirts and relaxed layers.",
details: [
"Relaxed fit silhouette",
"Comfortable everyday wear",
"Modern minimal styling",
"Versatile wardrobe essential",
],
},

{
name: "Premium Basic Hoodie",
price: 5999,
oldPrice: 6999,
category: "Women",
image: "/images/product-7.png",
images: ["/images/product-7.png"],
description:
"A premium everyday hoodie combining comfort with a clean contemporary aesthetic. Perfect for relaxed weekends, travel and effortless casual outfits.",
details: [
"Comfortable relaxed fit",
"Soft feel",
"Minimal design",
"Perfect for layering",
],
},

{
name: "Ribbed Knit Top",
price: 3999,
oldPrice: 4799,
category: "Women",
image: "/images/women-4.png",
images: ["/images/women-4.png"],
description:
"A refined ribbed knit top with a flattering silhouette and versatile styling. Designed to bring a polished touch to everyday outfits while keeping the look effortless.",
details: [
"Ribbed texture",
"Modern feminine silhouette",
"Easy everyday styling",
"Lightweight feel",
],
},

{
name: "Relaxed Linen Shirt",
price: 4499,
oldPrice: 5499,
category: "Women",
image: "/images/women-5.png",
images: ["/images/women-5.png"],
description:
"A relaxed linen-inspired shirt designed for an easy, breathable everyday look. Its timeless shape makes it perfect for casual styling and warm-weather wardrobes.",
details: [
"Relaxed silhouette",
"Lightweight feel",
"Timeless shirt design",
"Easy to layer",
],
},

{
name: "Wide Leg Denim",
price: 5499,
oldPrice: 6499,
category: "Women",
image: "/images/women-6.png",
images: ["/images/women-6.png"],
description:
"Modern wide-leg denim designed for a relaxed and contemporary wardrobe. The statement silhouette pairs effortlessly with fitted tops, shirts and everyday layers.",
details: [
"Wide-leg silhouette",
"Contemporary fit",
"Everyday denim",
"Easy styling",
],
},

{
name: "Oversized Blazer",
price: 8499,
oldPrice: 9999,
category: "Women",
image: "/images/women-7.png",
images: ["/images/women-7.png"],
description:
"An oversized blazer designed to elevate everyday outfits with a sophisticated modern finish. Wear it over casual basics or style it for a more polished look.",
details: [
"Oversized fit",
"Structured silhouette",
"Modern tailoring",
"Versatile layering piece",
],
},

{
name: "Satin Midi Dress",
price: 6999,
oldPrice: 7999,
category: "Women",
image: "/images/women-8.png",
images: ["/images/women-8.png"],
description:
"A sophisticated satin-inspired midi dress with an elegant flowing silhouette. Designed for effortless styling from special occasions to elevated everyday looks.",
details: [
"Midi length",
"Elegant flowing silhouette",
"Soft satin-inspired finish",
"Statement wardrobe piece",
],
},

{
name: "Cropped Denim Jacket",
price: 6499,
oldPrice: 7499,
category: "Women",
image: "/images/women-9.png",
images: ["/images/women-9.png"],
description:
"A contemporary cropped denim jacket that adds an effortless edge to everyday outfits. A versatile layering piece designed for modern casual styling.",
details: [
"Cropped silhouette",
"Classic denim look",
"Easy layering",
"Everyday styling",
],
},

{
name: "Everyday Co-ord Set",
price: 7499,
oldPrice: 8999,
category: "Women",
image: "/images/women-10.png",
images: ["/images/women-10.png"],
description:
"A coordinated everyday set created for effortless dressing. Its matching design gives you a polished look while keeping your everyday style comfortable and relaxed.",
details: [
"Matching two-piece look",
"Relaxed everyday fit",
"Easy styling",
"Modern coordinated design",
],
},

// ==================== MEN ====================

{
name: "Classic Casual Shirt",
price: 4999,
oldPrice: 5999,
category: "Men",
image: "/images/product-2.png",
images: ["/images/product-2.png"],
description:
"A clean and versatile casual shirt designed for modern everyday dressing. Its timeless silhouette works effortlessly with denim, trousers and relaxed everyday looks.",
details: [
"Classic casual silhouette",
"Versatile everyday design",
"Easy to style",
"Modern wardrobe essential",
],
},

{
name: "Urban Denim Jacket",
price: 7999,
oldPrice: 8999,
category: "Men",
image: "/images/product-5.png",
images: ["/images/product-5.png"],
description:
"A timeless denim jacket with a contemporary urban edge. Designed as an easy layering piece that adds character to everyday outfits throughout the season.",
details: [
"Classic denim construction",
"Urban-inspired styling",
"Easy layering",
"Versatile everyday piece",
],
},

{
name: "Modern Cargo Pants",
price: 6999,
oldPrice: 7999,
category: "Men",
image: "/images/product-8.png",
images: ["/images/product-8.png"],
description:
"Modern cargo pants combining utility-inspired details with everyday comfort. The relaxed contemporary fit makes them ideal for casual and street-inspired outfits.",
details: [
"Utility-inspired design",
"Modern relaxed fit",
"Functional pocket details",
"Everyday comfort",
],
},

{
name: "Essential Oxford Shirt",
price: 4999,
oldPrice: 5999,
category: "Men",
image: "/images/men-4.png",
images: ["/images/men-4.png"],
description:
"A refined Oxford-inspired shirt designed to bring timeless style to your everyday wardrobe. Perfect for smart-casual outfits and effortless layering.",
details: [
"Classic Oxford-inspired look",
"Smart-casual styling",
"Timeless design",
"Easy layering",
],
},

{
name: "Relaxed Fit Polo",
price: 3999,
oldPrice: 4799,
category: "Men",
image: "/images/men-5.png",
images: ["/images/men-5.png"],
description:
"A relaxed polo designed for comfortable everyday dressing. Its clean silhouette makes it a versatile choice for casual weekends and easy everyday looks.",
details: [
"Relaxed fit",
"Classic polo styling",
"Comfortable everyday wear",
"Versatile design",
],
},

{
name: "Straight Fit Jeans",
price: 6499,
oldPrice: 7499,
category: "Men",
image: "/images/men-6.png",
images: ["/images/men-6.png"],
description:
"Classic straight-fit jeans designed with a clean contemporary silhouette. An everyday denim essential that pairs effortlessly with tees, shirts and jackets.",
details: [
"Straight-leg silhouette",
"Classic denim styling",
"Everyday wardrobe essential",
"Easy to pair",
],
},

{
name: "Classic Overshirt",
price: 5499,
oldPrice: 6499,
category: "Men",
image: "/images/men-7.png",
images: ["/images/men-7.png"],
description:
"A versatile overshirt designed for modern layering. Its clean structure works beautifully over tees and shirts for an effortless contemporary look.",
details: [
"Versatile overshirt design",
"Ideal layering piece",
"Modern silhouette",
"Everyday styling",
],
},

{
name: "Premium Bomber Jacket",
price: 8999,
oldPrice: 10499,
category: "Men",
image: "/images/men-8.png",
images: ["/images/men-8.png"],
description:
"A premium bomber-inspired jacket designed to give casual outfits a refined contemporary edge. An easy statement layer for cooler days and evening looks.",
details: [
"Bomber-inspired silhouette",
"Contemporary design",
"Statement layering piece",
"Versatile casual styling",
],
},

{
name: "Regular Fit Chinos",
price: 5999,
oldPrice: 6999,
category: "Men",
image: "/images/men-9.png",
images: ["/images/men-9.png"],
description:
"Classic regular-fit chinos designed for versatile everyday styling. Their clean appearance makes them suitable for both relaxed and smart-casual outfits.",
details: [
"Regular fit",
"Clean tailored appearance",
"Smart-casual styling",
"Everyday versatility",
],
},

{
name: "Essential Cotton Sweatshirt",
price: 5499,
oldPrice: 6499,
category: "Men",
image: "/images/men-10.png",
images: ["/images/men-10.png"],
description:
"A clean cotton-inspired sweatshirt designed for comfortable everyday layering. Its minimal aesthetic makes it an easy essential for casual wardrobes.",
details: [
"Classic sweatshirt silhouette",
"Comfortable everyday fit",
"Minimal design",
"Easy layering",
],
},

// ==================== ACCESSORIES ====================

{
name: "Minimal Shoulder Bag",
price: 5499,
oldPrice: 6499,
category: "Accessories",
image: "/images/product-3.png",
images: ["/images/product-3.png"],
description:
"A minimal shoulder bag designed to complement everyday outfits with a refined finish. Compact yet practical, it is an effortless accessory for modern styling.",
details: [
"Minimal silhouette",
"Everyday practical design",
"Easy to style",
"Compact and versatile",
],
},

{
name: "Everyday Sneakers",
price: 8499,
oldPrice: 9499,
category: "Accessories",
image: "/images/product-6.png",
images: ["/images/product-6.png"],
description:
"Comfortable everyday sneakers designed to complement your casual wardrobe. Their clean aesthetic makes them an easy choice for everyday city styling.",
details: [
"Everyday sneaker silhouette",
"Comfort-focused design",
"Clean modern appearance",
"Versatile casual styling",
],
},

{
name: "Classic Leather Handbag",
price: 7499,
oldPrice: 8499,
category: "Accessories",
image: "/images/accessories-4.png",
images: ["/images/accessories-4.png"],
description:
"A classic handbag designed with a refined silhouette and timeless appeal. An elegant everyday accessory that complements both casual and polished outfits.",
details: [
"Classic handbag silhouette",
"Refined everyday design",
"Timeless styling",
"Versatile accessory",
],
},

{
name: "Minimal Crossbody Bag",
price: 5999,
oldPrice: 6999,
category: "Accessories",
image: "/images/accessories-5.png",
images: ["/images/accessories-5.png"],
description:
"A minimalist crossbody bag designed for effortless everyday carrying. Its clean appearance makes it an easy match for modern casual wardrobes.",
details: [
"Crossbody design",
"Minimal styling",
"Practical everyday accessory",
"Easy to pair",
],
},

{
name: "Everyday Backpack",
price: 6499,
oldPrice: 7499,
category: "Accessories",
image: "/images/accessories-6.png",
images: ["/images/accessories-6.png"],
description:
"A practical everyday backpack combining a clean modern appearance with functional styling. Designed for daily routines, travel and casual city looks.",
details: [
"Practical backpack design",
"Everyday functionality",
"Modern minimal look",
"Travel-friendly styling",
],
},

{
name: "Classic Leather Belt",
price: 2999,
oldPrice: 3499,
category: "Accessories",
image: "/images/accessories-7.png",
images: ["/images/accessories-7.png"],
description:
"A classic belt designed to add a polished finishing touch to everyday outfits. Its timeless appearance makes it a reliable wardrobe accessory.",
details: [
"Classic belt design",
"Timeless styling",
"Everyday accessory",
"Easy to pair",
],
},

{
name: "Premium Sunglasses",
price: 4499,
oldPrice: 5499,
category: "Accessories",
image: "/images/accessories-8.png",
images: ["/images/accessories-8.png"],
description:
"Contemporary sunglasses designed to complete modern everyday looks. A simple statement accessory that adds a refined finishing touch.",
details: [
"Modern frame styling",
"Everyday accessory",
"Contemporary appearance",
"Easy statement piece",
],
},

{
name: "Everyday Watch",
price: 9499,
oldPrice: 10999,
category: "Accessories",
image: "/images/accessories-9.png",
images: ["/images/accessories-9.png"],
description:
"A refined everyday watch designed to add a polished touch to modern outfits. Its versatile appearance makes it suitable for both casual and smart-casual styling.",
details: [
"Everyday watch design",
"Refined appearance",
"Versatile styling",
"Modern accessory",
],
},

{
name: "Essential Cap",
price: 2499,
oldPrice: 2999,
category: "Accessories",
image: "/images/accessories-10.png",
images: ["/images/accessories-10.png"],
description:
"A clean everyday cap designed for effortless casual styling. A simple accessory that adds a relaxed finishing touch to modern outfits.",
details: [
"Classic cap silhouette",
"Casual everyday styling",
"Minimal appearance",
"Easy to pair",
],
},

{
name: "Classic Canvas Tote",
price: 3499,
oldPrice: 4299,
category: "Accessories",
image: "/images/accessories-4.png",
images: ["/images/accessories-4.png"],
description:
"A classic canvas-inspired tote designed for practical everyday use. Its simple and versatile appearance makes it an easy companion for shopping, work and casual outings.",
details: [
"Classic tote silhouette",
"Practical everyday design",
"Minimal styling",
"Versatile accessory",
],
},
];

type CartItem = {
variantId?: number;
slug?: string;
name: string;
price: number;
size: string;
color: string;
quantity: number;
image: string;
};

type WishlistCacheItem = {
id: number;
name: string;
price: number;
category: string;
image: string;
inStock: boolean;
};

export default function DynamicProductPage() {
const params = useParams();
const router = useRouter();

const slug = params.slug as string;

const [loadedProduct, setLoadedProduct] = useState<{ slug: string; product: Product | null } | null>(null);
const isLoading = loadedProduct?.slug !== slug;
const product = isLoading ? null : loadedProduct.product;
const [selectedSize, setSelectedSize] = useState("");
const [selectedColor, setSelectedColor] = useState("");
const [quantity, setQuantity] = useState(1);
const [isAdding, setIsAdding] = useState(false);
const [cartMessage, setCartMessage] = useState("");
const [selectedImage, setSelectedImage] = useState(
product?.image || ""
);

const { isLoggedIn } = useAuth();
const [isWishlisted, setIsWishlisted] = useState(false);
const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false);
const [showAuthPrompt, setShowAuthPrompt] = useState(false);

useLayoutEffect(() => {
  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo({ top: 0, left: 0 });
  root.style.scrollBehavior = previousBehavior;
}, [slug]);

useEffect(() => {
  const refreshAvailability = async () => {
    try {
      const response = await catalogFetch(`/api/products?slug=${encodeURIComponent(slug)}`);
      if (!response.ok) return;
      const data = await response.json();
      const variants: NonNullable<Product["variants"]> = data.products?.[0]?.variants || [];
      if (!variants.length) {
        setLoadedProduct((current) => current?.slug === slug ? { slug, product: null } : current);
        return;
      }
      setLoadedProduct((current) => current?.slug === slug && current.product
        ? { slug, product: { ...current.product, variants } }
        : current);
      let chosen = variants.find((variant) => {
        const size = variant.options.size || variant.options.shoe_size || variant.options.waist;
        return (!size || size.value === selectedSize) &&
          (!variant.options.color || variant.options.color.value === selectedColor);
      });
      if (!chosen) {
        chosen = variants[0];
        const size = chosen.options.size || chosen.options.shoe_size || chosen.options.waist;
        setSelectedColor(chosen.options.color?.value || "");
        setSelectedSize(size?.value || "");
        setCartMessage("Availability has changed. Please review the available options.");
      }
      setQuantity((current) => Math.min(current, chosen.stock));
    } catch { /* Keep the current view if the stock service is temporarily unavailable. */ }
  };
  return subscribeCatalogRefresh(() => void refreshAvailability());
}, [slug, selectedColor, selectedSize]);

useEffect(() => {
  let active = true;
  catalogFetch(`/api/products?slug=${encodeURIComponent(slug)}`)
    .then((response) => response.ok ? response.json() : null)
    .then((data) => {
      const row = data?.products?.[0];
      if (!active) return;
      if (!row) {
        setLoadedProduct({ slug, product: null });
        return;
      }
      const mapped: Product = {
        id: Number(row.id), name: row.name, price: Number(row.sale_price ?? row.base_price),
        oldPrice: Number(row.base_price), category: row.category_slug?.startsWith("men-") ? "Men" : row.category_slug?.startsWith("ladies-") ? "Women" : "Accessories",
        image: row.images?.[0]?.url || "", images: row.images?.map((image: { url: string }) => image.url) || [],
        description: row.description || "", details: [], variants: row.variants || [], attributes: row.attributes || [],
      };
      setLoadedProduct({ slug, product: mapped });
      setSelectedImage(mapped.image);
      const options = mapped.variants?.find((variant) => variant.available && variant.stock > 0)?.options || {};
      const sizeOption = options.size || options.shoe_size || options.waist;
      setSelectedSize(sizeOption?.value || "");
      setSelectedColor(options.color?.value || "");
      setQuantity(1);
      setCartMessage("");
    })
    .catch(() => {
      if (!active) return;
      setLoadedProduct({ slug, product: null });
    });
  return () => { active = false; };
}, [slug]);

useEffect(() => {
  if (!product) return;
  const checkWishlist = () => {
    if (!isLoggedIn) {
      setIsWishlisted(false);
      return;
    }
    const items = readWishlistItems<WishlistCacheItem>();
    setIsWishlisted(items.some((item) => item.name === product.name));
  };

  checkWishlist();
  window.addEventListener("wishlistUpdated", checkWishlist);
  window.addEventListener("storage", checkWishlist);
  return () => {
    window.removeEventListener("wishlistUpdated", checkWishlist);
    window.removeEventListener("storage", checkWishlist);
  };
}, [product, isLoggedIn]);

const handleToggleWishlist = async () => {
  if (!product) return;
  if (!isLoggedIn) {
    setShowAuthPrompt(true);
    return;
  }
  if (isUpdatingWishlist) return;

  const nextState = !isWishlisted;
  const previousItems = readWishlistItems<WishlistCacheItem>();
  const optimisticItems = nextState
    ? previousItems.some((item) => item.name === product.name)
      ? previousItems
      : [...previousItems, { id: Date.now(), name: product.name, price: product.price, category: product.category, image: product.image, inStock: true }]
    : previousItems.filter((item) => item.name !== product.name);
  setIsWishlisted(nextState);
  setIsUpdatingWishlist(true);
  writeWishlistItems(optimisticItems);

  try {
    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: product.name,
        price: product.price,
        originalPrice: product.oldPrice,
        category: product.category,
        image: product.image,
        inStock: true,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setIsWishlisted(!nextState);
      writeWishlistItems(previousItems);
      return;
    }

    let items = readWishlistItems<WishlistCacheItem>();
    if (data.wishlisted) {
      const confirmed = { id: data.item?.id || Date.now(), name: product.name, price: product.price, category: product.category, image: product.image, inStock: true };
      items = [...items.filter((item) => item.name !== product.name), confirmed];
    } else {
      items = items.filter((item) => item.name !== product.name);
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

if (isLoading) {
  return <ProductDetailSkeleton />;
}

if (!product || !product.variants?.some((variant) => variant.available && variant.stock > 0)) {
    return (
      <>
        <main className="flex min-h-[70vh] items-center justify-center bg-[#F8F6F2] px-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
              WEARWELL
            </p>

            <h1 className="mt-4 text-3xl font-semibold text-gray-900">
              Product Unavailable
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              This product is currently unavailable. Explore our collection to find something you love.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-block rounded-xl bg-black px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Back to Shop
            </Link>
          </div>
        </main>
      </>
    );
  }

  const availableVariants = product.variants.filter((variant) => variant.available && variant.stock > 0);
  const selectedVariant = availableVariants.find((item) => {
    const size = item.options.size || item.options.shoe_size || item.options.waist;
    return (!size || size.value === selectedSize) && (!item.options.color || item.options.color.value === selectedColor);
  });

  const addToCart = async () => {
    if (isAdding || !selectedVariant) return false;
    setIsAdding(true);
    setCartMessage("");
    try {
    const response = await catalogFetch(`/api/products?slug=${encodeURIComponent(slug)}`);
    if (!response.ok) throw new Error("Unable to check availability");
    const data = await response.json();
    const freshVariants: NonNullable<Product["variants"]> = data.products?.[0]?.variants || [];
    setLoadedProduct({ slug, product: { ...product, variants: freshVariants } });
    const variant = freshVariants.find((item) => item.id === selectedVariant.id && item.available && item.stock > 0);
    if (!variant) {
      const nextVariant = freshVariants.find((item) => item.available && item.stock > 0);
      const nextSize = nextVariant && (nextVariant.options.size || nextVariant.options.shoe_size || nextVariant.options.waist);
      setSelectedColor(nextVariant?.options.color?.value || "");
      setSelectedSize(nextSize?.value || "");
      setQuantity(1);
      setCartMessage("Availability has changed. Please review the available options.");
      return false;
    }
    if (variant.stock < quantity) {
      setQuantity(Math.max(1, variant.stock));
      setCartMessage(`Only ${variant.stock} available. We've updated the quantity; please review your selection.`);
      return false;
    }
    const size = variant.options.size || variant.options.shoe_size || variant.options.waist;
    const newItem: CartItem = {
      variantId: variant.id,
      slug,
      name: product.name,
      price: variant.price,
      size: size?.value || "",
      color: variant.options.color?.value || "",
      quantity,
      image: product.image,
    };

    const savedCart = localStorage.getItem("cartItems");
    const cartItems: CartItem[] = savedCart ? JSON.parse(savedCart) : [];
    const matchesVariant = (item: CartItem) => item.variantId
      ? item.variantId === variant.id
      : item.name === newItem.name && item.size === newItem.size && (item.color || "") === newItem.color;
    const existingItemIndex = cartItems.findIndex(matchesVariant);
    const inCart = cartItems.filter(matchesVariant).reduce((total, item) => total + Number(item.quantity), 0);
    if (inCart + quantity > variant.stock) {
      const remaining = Math.max(0, variant.stock - inCart);
      if (remaining > 0) setQuantity(remaining);
      setCartMessage(remaining > 0
        ? `You already have ${inCart} in your bag. You can add ${remaining} more; please review the quantity.`
        : "You already have all available items for this option in your bag.");
      return false;
    }
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex] = { ...newItem, quantity: Number(cartItems[existingItemIndex].quantity) + quantity };
    } else {
      cartItems.push(newItem);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("cartUpdated"));
    return true;
    } catch {
      setCartMessage("We couldn't check availability. Please try again.");
      return false;
    } finally {
      setIsAdding(false);
    }
  };

const handleAddToCart = async () => {
if (await addToCart()) setCartMessage("Added to your bag.");
};

const handleBuyNow = async () => {
if (await addToCart()) router.push("/checkout");
};

/*
    const variant = product.variants?.find((item) => {
      const size = item.options.size || item.options.shoe_size || item.options.waist;
      return (!size || size.value === selectedSize) && (!item.options.color || item.options.color.value === selectedColor);
    });
    if (product.variants && (!variant || !variant.available || variant.stock < quantity)) {
      alert("This option does not have enough stock.");
      return false;
    }
    const newItem: CartItem = {
      variantId: variant?.id,
      slug,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
      image: product.image,
    };

    const savedCart = localStorage.getItem("cartItems");

    const cartItems: CartItem[] = savedCart
      ? JSON.parse(savedCart)
      : [];

const existingItemIndex = cartItems.findIndex(
  (item) =>
    item.name === newItem.name &&
    item.size === newItem.size &&
    item.color === newItem.color
);

if (existingItemIndex !== -1) {
  cartItems[existingItemIndex] = {
    ...cartItems[existingItemIndex],
    quantity:
      cartItems[existingItemIndex].quantity +
      newItem.quantity,
  };
} else {
  cartItems.push(newItem);
}

localStorage.setItem(
  "cartItems",
  JSON.stringify(cartItems)
);

window.dispatchEvent(new Event("cartUpdated"));
return true;
};

const handleAddToCart = () => {
if (addToCart()) alert(`${product.name} added to your bag!`);
};

const handleBuyNow = () => {
if (addToCart()) router.push("/checkout");
};

if (isLoading) {
  return <ProductDetailSkeleton />;
}

if (!product) {
  return (
    <>
      <main className="min-h-screen bg-[#F8F6F2] py-28 text-center px-4">
        <div className="mx-auto max-w-md">
          <div className="text-5xl">🛍️</div>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Product Not Found</h1>
          <p className="mt-3 text-sm text-gray-500">
            The product you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block rounded-xl bg-black px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Explore All Products
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

*/
const colorOptions = availableVariants
  ? Array.from(new Map(availableVariants.flatMap((variant) => variant.options.color ? [[variant.options.color.value, variant.options.color]] : [])).values())
  : [{ value: "Black", colorHex: "#111111" }, { value: "Beige", colorHex: "#D5C1A9" }, { value: "White", colorHex: "#FFFFFF" }];
const sizeAttribute = product.attributes?.find((attribute) => ["size", "shoe_size", "waist"].includes(attribute.code));
const sizeOptions = availableVariants
  ? Array.from(new Set(availableVariants.filter((variant) => !variant.options.color || variant.options.color.value === selectedColor).map((variant) => variant.options.size?.value || variant.options.shoe_size?.value || variant.options.waist?.value).filter(Boolean))) as string[]
  : ["XS", "S", "M", "L", "XL"];
const hasColor = colorOptions.length > 0;

return (
<>
  <main className="min-h-screen bg-[#F8F6F2]">
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-8 flex flex-wrap items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="transition hover:text-black">
          Home
        </Link>

        <span>/</span>

        <Link href="/shop" className="transition hover:text-black">
          Shop
        </Link>

        <span>/</span>

        <span className="text-gray-900">
          {product.name}
        </span>
      </div>
   {/* PRODUCT */}
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* IMAGE GALLERY */}
        <div className="grid gap-4 sm:grid-cols-[82px_1fr]">
          <div className="order-2 flex gap-3 overflow-x-auto sm:order-1 sm:flex-col">
            {product.images.map((img, index) => (
              <button
                key={`${img}-${index}`}
                onClick={() => setSelectedImage(img)}
                className={`h-24 w-20 shrink-0 overflow-hidden border-2 transition ${
                  selectedImage === img
                    ? "border-black"
                    : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} view ${index + 1}`}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </button>
            ))}
          </div>

          <div className="relative order-1 overflow-hidden bg-[#EAE4DC] sm:order-2 rounded-2xl">
            <img
              src={selectedImage}
              alt={product.name}
              className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
            {/* Floating Wishlist Heart */}
            <button
              onClick={handleToggleWishlist}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              aria-busy={isUpdatingWishlist}
              disabled={isUpdatingWishlist}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition hover:scale-110 hover:bg-white"
            >
              <svg
                className={`h-5 w-5 transition duration-200 ${
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
          </div>
        </div>

        {/* PRODUCT INFORMATION */}
        <div className="py-2 lg:py-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A06E31]">
            {product.category}
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mt-4 flex items-center gap-3">
            <span className="tracking-[0.2em] text-black">
              ★★★★★
            </span>

            <span className="text-xs text-gray-500">
              4.8 · 124 reviews
            </span>
          </div>

          {/* PRICE */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-2xl font-semibold text-gray-900">
              Rs. {product.price.toLocaleString()}
            </span>

            <span className="text-sm text-gray-400 line-through">
              Rs. {product.oldPrice.toLocaleString()}
            </span>

            <span className="rounded-full bg-black px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
              Sale
            </span>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-7 border-y border-black/10 py-6">
            <p className="text-sm leading-7 text-gray-600">
              {product.description}
            </p>
          </div>

          {/* COLOR */}
          {hasColor && <div className="mt-7">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">
                Color
              </p>

              <span className="text-xs text-gray-500">
                {selectedColor}
              </span>
            </div>

            <div className="mt-4 flex gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() =>
                    {
                      setSelectedColor(color.value);
                      const matching = availableVariants?.find((variant) => variant.options.color?.value === color.value);
                      const matchingSize = matching && (matching.options.size || matching.options.shoe_size || matching.options.waist);
                      if (matchingSize?.value) setSelectedSize(matchingSize.value);
                    }
                  }
                  aria-label={`Select ${color.value}`}
                  className={`rounded-full border-2 p-1 transition ${
                    selectedColor === color.value
                      ? "border-black"
                      : "border-transparent"
                  }`}
                >
                  <span
                    className="block h-8 w-8 rounded-full border border-black/10"
                    style={{ backgroundColor: color.colorHex || color.value }}
                  />
                </button>
              ))}
            </div>
          </div>}

          {/* SIZE */}
          {sizeOptions.length > 0 && <div className="mt-7">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">
                {sizeAttribute?.name || "Select Size"}
              </p>

              <button className="text-xs text-gray-500 underline underline-offset-4 transition hover:text-black">
                Size Guide
              </button>
            </div>

            <div className="mt-4 grid grid-cols-5 gap-2">
              {sizeOptions.map(
                (size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border py-3 text-xs font-semibold transition ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                )
              )}
            </div>
          </div>}

          {/* QUANTITY */}
          <div className="mt-7">
            <p className="text-sm font-semibold text-gray-900">
              Quantity
            </p>

            <div className="mt-4 flex w-fit items-center border border-gray-200 bg-white">
              <button
                onClick={() =>
                  setQuantity(Math.max(1, quantity - 1))
                }
                className="px-5 py-3 text-lg transition hover:bg-gray-100"
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span className="w-10 text-center text-sm font-medium">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity(Math.min(quantity + 1, selectedVariant?.stock || 1))}
                disabled={!selectedVariant || quantity >= selectedVariant.stock}
                className="px-5 py-3 text-lg transition hover:bg-gray-100"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-8 space-y-3">
            {cartMessage && <p role="status" className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">{cartMessage}</p>}
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={handleAddToCart}
                disabled={isAdding || !selectedVariant}
                className="rounded-xl border border-black bg-white py-4 text-sm font-semibold transition hover:bg-black hover:text-white"
              >
                {isAdding ? "Checking stock..." : "Add to Bag"}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isAdding || !selectedVariant}
                className="rounded-xl bg-black py-4 text-sm font-semibold text-white transition hover:bg-[#A06E31]"
              >
                Buy Now
              </button>
            </div>

            <button
              onClick={handleToggleWishlist}
              className={`w-full rounded-xl border py-3.5 text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-2 ${
                isWishlisted
                  ? "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                  : "border-gray-200 bg-white text-gray-800 hover:border-black hover:bg-gray-50"
              }`}
            >
              <svg
                className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : "fill-none text-gray-700"}`}
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
              {isWishlisted ? "Saved in Wishlist (Remove)" : "Add to Wishlist"}
            </button>
          </div>

          {/* DELIVERY MINI PERKS */}
          <div className="mt-8 grid grid-cols-3 gap-2 border-t border-black/10 pt-5 text-center text-[11px] text-gray-600">
            <div className="rounded-xl border border-gray-100 bg-white p-2.5 shadow-sm flex flex-col items-center">
              <svg className="w-4 h-4 text-black mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="font-semibold text-gray-900">Free Shipping</span>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-2.5 shadow-sm flex flex-col items-center">
              <svg className="w-4 h-4 text-black mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="font-semibold text-gray-900">14-Day Returns</span>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-2.5 shadow-sm flex flex-col items-center">
              <svg className="w-4 h-4 text-black mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="font-semibold text-gray-900">Secure Order</span>
            </div>
          </div>
        </div>
      </div>

      {/* LUXURY SPECIFICATIONS & CRAFTSMANSHIP */}
      <section className="mt-16 sm:mt-20 border-t border-black/10 pt-12 sm:pt-14">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 shadow-sm">
            <span className="inline-block rounded-full bg-[#A06E31]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#A06E31]">
              Craftsmanship & Features
            </span>
            <h2 className="mt-3 text-xl sm:text-2xl font-bold text-gray-900">
              Product Overview
            </h2>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-gray-600">
              {product.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-[11px] font-semibold text-gray-700">
                Category: {product.category}
              </span>
              <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-[11px] font-semibold text-gray-700">
                Fit: Tailored Contemporary
              </span>
              <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-[11px] font-semibold text-gray-700">
                Season: 2026 Collection
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 shadow-sm">
            <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-700">
              Material & Care
            </span>
            <h2 className="mt-3 text-xl sm:text-2xl font-bold text-gray-900">
              Key Details
            </h2>
            <ul className="mt-4 space-y-3">
              {product.details.map((detail) => (
                <li key={detail} className="flex items-center gap-3 text-xs sm:text-sm text-gray-600">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                    ✓
                  </span>
                  <span>{detail}</span>
                </li>
              ))}
              <li className="flex items-center gap-3 text-xs sm:text-sm text-gray-600">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                  ✓
                </span>
                <span>Pre-shrunk finish for consistent everyday sizing</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SHIPPING & GUARANTEE RIBBON */}
      <section className="mt-8 border-y border-black/10 bg-white py-8 px-4 sm:px-6 rounded-2xl shadow-sm">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#F8F6F2] text-black">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </span>
            <div>
              <p className="text-xs sm:text-sm font-bold text-gray-900">
                Free Express Shipping
              </p>
              <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                Door-to-door delivery within 2–4 business days across Pakistan.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#F8F6F2] text-black">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </span>
            <div>
              <p className="text-xs sm:text-sm font-bold text-gray-900">
                14-Day Easy Returns
              </p>
              <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                Hassle-free exchanges or refunds within 14 days of receipt.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#F8F6F2] text-black">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <div>
              <p className="text-xs sm:text-sm font-bold text-gray-900">
                Encrypted Checkout
              </p>
              <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                Safe and secure order processing with direct customer support.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

    {/* UNIFIED LUXURY FOOTER */}
    <Footer />
  </main>
  <WishlistAuthPrompt
    open={showAuthPrompt}
    onClose={() => setShowAuthPrompt(false)}
    redirectTo={`/product/${slug}`}
  />
</>
);
}
