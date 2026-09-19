"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";

type Product = {
name: string;
price: number;
oldPrice: number;
category: "Women" | "Men" | "Accessories";
image: string;
images: string[];
description: string;
details: string[];
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
name: string;
price: number;
size: string;
color: string;
quantity: number;
image: string;
};

export default function DynamicProductPage() {
const params = useParams();
const router = useRouter();

const slug = params.slug as string;

const product = products.find(
(item) =>
item.name.toLowerCase().replace(/\s+/g, "-") === slug
);

const [selectedSize, setSelectedSize] = useState("M");
const [selectedColor, setSelectedColor] = useState("Black");
const [quantity, setQuantity] = useState(1);
const [selectedImage, setSelectedImage] = useState(
product?.image || ""
);

if (!product) {
    return (
      <>
        <Header />
        <main className="flex min-h-[70vh] items-center justify-center bg-[#F8F6F2] px-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
              WEARWELL
            </p>

            <h1 className="mt-4 text-3xl font-semibold text-gray-900">
              Product Not Found
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              Sorry, this product could not be found.
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

  const addToCart = () => {
    const newItem: CartItem = {
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
      image: product.image,
    };

    const savedCart = localStorage.getItem("cartItems");

    let cartItems: CartItem[] = savedCart
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

};

const handleAddToCart = () => {
addToCart();
alert(`${product.name} added to your bag!`);
};

const handleBuyNow = () => {
addToCart();
router.push("/checkout");
};

return (
<> <Header />
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

          <div className="order-1 overflow-hidden bg-[#EAE4DC] sm:order-2">
            <img
              src={selectedImage}
              alt={product.name}
              className="aspect-[3/4] w-full object-cover transition duration-700 hover:scale-[1.02]"
            />
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
          <div className="mt-7">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">
                Color
              </p>

              <span className="text-xs text-gray-500">
                {selectedColor}
              </span>
            </div>

            <div className="mt-4 flex gap-3">
              {[
                { name: "Black", className: "bg-black" },
                {
                  name: "Beige",
                  className: "bg-[#D5C1A9]",
                },
                {
                  name: "White",
                  className: "bg-white",
                },
              ].map((color) => (
                <button
                  key={color.name}
                  onClick={() =>
                    setSelectedColor(color.name)
                  }
                  aria-label={`Select ${color.name}`}
                  className={`rounded-full border-2 p-1 transition ${
                    selectedColor === color.name
                      ? "border-black"
                      : "border-transparent"
                  }`}
                >
                  <span
                    className={`block h-8 w-8 rounded-full border border-black/10 ${color.className}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* SIZE */}
          <div className="mt-7">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">
                Select Size
              </p>

              <button className="text-xs text-gray-500 underline underline-offset-4 transition hover:text-black">
                Size Guide
              </button>
            </div>

            <div className="mt-4 grid grid-cols-5 gap-2">
              {["XS", "S", "M", "L", "XL"].map(
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
          </div>

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
                onClick={() =>
                  setQuantity(quantity + 1)
                }
                className="px-5 py-3 text-lg transition hover:bg-gray-100"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <button
              onClick={handleAddToCart}
              className="rounded-xl border border-black bg-white py-4 text-sm font-semibold transition hover:bg-black hover:text-white"
            >
              Add to Bag
            </button>

            <button
              onClick={handleBuyNow}
              className="rounded-xl bg-black py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Buy Now
            </button>
          </div>

          {/* DELIVERY BENEFITS */}
          <div className="mt-8 space-y-3 border-t border-black/10 pt-6 text-xs text-gray-600">
            <p>✓ Free shipping on all orders</p>
            <p>✓ Secure checkout</p>
            <p>✓ Easy returns & exchanges</p>
          </div>
        </div>
      </div>

      {/* PRODUCT DETAILS */}
      <section className="mt-20 border-t border-black/10 py-14">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A06E31]">
              Product Information
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-gray-900">
              Product Details
            </h2>
          </div>

          <div>
            <p className="text-sm leading-7 text-gray-600">
              {product.description}
            </p>

            <ul className="mt-6 space-y-3 text-sm text-gray-600">
              {product.details.map((detail) => (
                <li key={detail} className="flex gap-3">
                  <span className="text-black">✓</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SHIPPING INFO */}
      <section className="border-y border-black/10 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold">
              Free Shipping
            </p>

            <p className="mt-2 text-xs leading-6 text-gray-500">
              Enjoy free shipping on all orders.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">
              Easy Returns
            </p>

            <p className="mt-2 text-xs leading-6 text-gray-500">
              Simple returns and exchanges for eligible items.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">
              Secure Checkout
            </p>

            <p className="mt-2 text-xs leading-6 text-gray-500">
              Your checkout experience is designed to be safe and secure.
            </p>
          </div>
        </div>
      </section>
    </div>

    {/* NEWSLETTER */}
    <section className="mt-16 bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
          WEARWELL
        </p>

        <h2 className="mt-4 text-3xl font-semibold">
          Stay in the loop
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-400">
          Get updates about new arrivals, exclusive offers and
          the latest collection.
        </p>

        <div className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-xl px-4 py-3 text-sm text-black outline-none"
          />

          <button className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  </main>
</>
);
}