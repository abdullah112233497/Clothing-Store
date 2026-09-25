"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const sizes = ["S", "M", "L", "XL"];

const colors = [
  { name: "Black", value: "bg-black" },
  { name: "White", value: "bg-white" },
  { name: "Grey", value: "bg-gray-400" },
];

const images = [
  "/images/product-1.png",
  "/images/product-2.png",
  "/images/product-3.png",
];

export default function ProductPage() {
  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const price = 3499;
  const oldPrice = 4299;
  const total = price * quantity;

  const addToCart = () => {
    const cartItem = {
      name: "Essential Oversized Tee",
      price: price,
      size: selectedSize,
      quantity: quantity,
      image: "/images/product-1.png",
    };

    localStorage.setItem(
      "cartItem",
      JSON.stringify(cartItem)
    );

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleAddToCart = () => {
    addToCart();

    alert("Product added to cart!");

    router.push("/cart");
  };

  const handleBuyNow = () => {
    addToCart();

    router.push("/checkout");
  };

  return (
    <>

      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="border-b px-6 py-5">
          <div className="mx-auto max-w-7xl text-sm text-gray-500">
            <Link href="/" className="hover:text-black">
              Home
            </Link>

            <span className="mx-2">/</span>

            <Link href="/shop" className="hover:text-black">
              Shop
            </Link>

            <span className="mx-2">/</span>

            <span className="text-gray-900">
              Essential Oversized Tee
            </span>
          </div>
        </div>

        {/* Product Section */}
        <section className="px-6 py-12">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">

            {/* Product Images */}
            <div>
              <div className="relative overflow-hidden rounded-2xl bg-gray-100">
                <span className="absolute left-5 top-5 z-10 rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white">
                  Sale
                </span>

                <img
                  src={selectedImage}
                  alt="Essential Oversized Tee"
                  className="h-[550px] w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <button
                    key={image}
                    onClick={() => setSelectedImage(image)}
                    className={`overflow-hidden rounded-xl border-2 transition ${
                      selectedImage === image
                        ? "border-black"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Product preview ${index + 1}`}
                      className="h-28 w-full object-cover transition hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="flex flex-col justify-center">

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                Women / New Arrival
              </p>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Essential Oversized Tee
              </h1>

              {/* Rating */}
              <div className="mt-5 flex items-center gap-3">
                <div className="text-sm tracking-wider">
                  ★★★★★
                </div>

                <span className="text-sm text-gray-500">
                  4.8 (124 Reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mt-5 flex items-center gap-3">
                <p className="text-2xl font-bold text-gray-900">
                  Rs. {total.toLocaleString()}
                </p>

                <p className="text-lg text-gray-400 line-through">
                  Rs. {(oldPrice * quantity).toLocaleString()}
                </p>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                  19% OFF
                </span>
              </div>

              {/* Description */}
              <p className="mt-6 max-w-xl text-sm leading-7 text-gray-600">
                A modern oversized essential designed for everyday
                comfort. Made with a clean silhouette and effortless
                styling in mind. Perfect for casual, relaxed and
                streetwear looks.
              </p>

              {/* Stock */}
              <div className="mt-5 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                <span className="text-sm font-medium text-gray-700">
                  In Stock — Ready to Ship
                </span>
              </div>

              <div className="my-8 border-t" />

              {/* Color */}
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-gray-900">
                    Color
                  </h2>

                  <span className="text-sm text-gray-500">
                    {selectedColor}
                  </span>
                </div>

                <div className="mt-4 flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() =>
                        setSelectedColor(color.name)
                      }
                      aria-label={color.name}
                      className={`h-9 w-9 rounded-full border-2 p-0.5 ${
                        selectedColor === color.name
                          ? "border-black"
                          : "border-gray-200"
                      }`}
                    >
                      <span
                        className={`block h-full w-full rounded-full ${color.value}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-gray-900">
                    Select Size
                  </h2>

                  <button className="text-xs font-medium underline">
                    Size Guide
                  </button>
                </div>

                <div className="mt-4 flex gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 w-14 rounded-lg border text-sm font-medium transition ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-200 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-8">
                <h2 className="text-sm font-semibold text-gray-900">
                  Quantity
                </h2>

                <div className="mt-4 flex w-fit items-center rounded-lg border border-gray-200">
                  <button
                    onClick={() =>
                      setQuantity((current) =>
                        Math.max(1, current - 1)
                      )
                    }
                    className="px-5 py-3 text-lg hover:bg-gray-50"
                  >
                    −
                  </button>

                  <span className="min-w-12 text-center text-sm font-medium">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity((current) => current + 1)
                    }
                    className="px-5 py-3 text-lg hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add To Cart */}
              <button
                onClick={handleAddToCart}
                className="mt-8 w-full rounded-xl bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Add to Cart — Rs. {total.toLocaleString()}
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                className="mt-3 w-full rounded-xl border border-black px-6 py-4 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
              >
                Buy Now — Rs. {total.toLocaleString()}
              </button>

              {/* Delivery */}
              <div className="mt-8 rounded-xl border border-gray-200/70 bg-gray-50/60 p-5">
                <div className="flex gap-4 items-start">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-xs border border-gray-100 text-black">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Free Express Delivery
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Free shipping on all orders across Pakistan.
                    </p>
                  </div>
                </div>

                <div className="mt-4 border-t border-gray-200/60 pt-4">
                  <div className="flex gap-4 items-start">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-xs border border-gray-100 text-black">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        14-Day Returns
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Simple return process for eligible items.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mt-8 space-y-5 border-t pt-8">

                <div className="flex gap-4">
                  <span className="text-lg">✓</span>

                  <div>
                    <p className="text-sm font-semibold">
                      Premium Quality
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Carefully selected materials and finish.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-lg">✓</span>

                  <div>
                    <p className="text-sm font-semibold">
                      Secure Checkout
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Your checkout experience is simple and secure.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-lg">✓</span>

                  <div>
                    <p className="text-sm font-semibold">
                      Fast Delivery
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Delivery available across Pakistan.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Product Details */}
        <section className="border-t bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-7xl">

            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                Product Information
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900">
                Product Details
              </h2>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-3">

              <div className="rounded-2xl bg-white p-7">
                <h3 className="font-semibold text-gray-900">
                  Fit
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Relaxed oversized fit designed for everyday
                  wear and comfortable movement.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-7">
                <h3 className="font-semibold text-gray-900">
                  Style
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Minimal design that works perfectly with
                  casual and modern streetwear looks.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-7">
                <h3 className="font-semibold text-gray-900">
                  Care
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Follow the care instructions on the product
                  label to maintain fabric quality.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}
