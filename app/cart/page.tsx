"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";

type CartItem = {
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
};

const sizes = ["XS", "S", "M", "L", "XL"];
const colors = ["Black", "Beige", "White"];

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

  const productName = "Essential Oversized Tee";
  const price = 3499;
  const oldPrice = 4299;

  const addToCart = () => {
    const newItem: CartItem = {
      name: productName,
      price,
      size: selectedSize,
      quantity,
      image: selectedImage,
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

    alert(`${productName} added to cart!`);

    router.push("/cart");
  };

  const handleBuyNow = () => {
    addToCart();

    router.push("/checkout");
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="text-sm text-gray-500">
            <Link href="/" className="hover:text-black">
              Home
            </Link>

            <span className="mx-2">/</span>

            <Link href="/shop" className="hover:text-black">
              Shop
            </Link>

            <span className="mx-2">/</span>

            <span className="text-gray-900">
              {productName}
            </span>
          </div>
        </div>

        {/* Product Section */}
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Images */}
            <div className="grid gap-4 sm:grid-cols-[90px_1fr]">
              <div className="order-2 flex gap-3 sm:order-1 sm:flex-col">
                {images.map((image) => (
                  <button
                    key={image}
                    onClick={() => setSelectedImage(image)}
                    className={`h-24 w-20 overflow-hidden rounded-lg border ${
                      selectedImage === image
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt="Product thumbnail"
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="order-1 aspect-[3/4] overflow-hidden bg-gray-100 sm:order-2">
                <img
                  src={selectedImage}
                  alt={productName}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="flex flex-col justify-center">
              <div className="mb-4 flex items-center gap-3">
                <span className="bg-black px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  Sale
                </span>

                <span className="text-sm text-gray-500">
                  New Arrival
                </span>
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A06E31]">
                Women
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                {productName}
              </h1>

              {/* Rating */}
              <div className="mt-5 flex items-center gap-3">
                <span className="text-sm tracking-wider">
                  ★★★★★
                </span>

                <span className="text-sm text-gray-500">
                  4.8 · 126 reviews
                </span>
              </div>

              {/* Price */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-2xl font-bold text-gray-900">
                  Rs. {price.toLocaleString()}
                </span>

                <span className="text-lg text-gray-400 line-through">
                  Rs. {oldPrice.toLocaleString()}
                </span>

                <span className="text-sm font-semibold text-green-600">
                  19% OFF
                </span>
              </div>

              <p className="mt-6 max-w-xl text-sm leading-7 text-gray-500">
                A relaxed oversized essential designed for
                everyday comfort. Clean details, premium feel
                and an effortless modern silhouette make it a
                wardrobe staple.
              </p>

              {/* Color */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">
                    Color
                  </p>

                  <p className="text-sm text-gray-500">
                    {selectedColor}
                  </p>
                </div>

                <div className="mt-3 flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`rounded-full border px-5 py-2 text-sm transition ${
                        selectedColor === color
                          ? "border-black bg-black text-white"
                          : "border-gray-200 hover:border-black"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">
                    Size
                  </p>

                  <button className="text-xs underline">
                    Size Guide
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-5 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-lg border py-3 text-sm font-medium transition ${
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
                <p className="mb-3 text-sm font-semibold">
                  Quantity
                </p>

                <div className="flex w-fit items-center rounded-lg border">
                  <button
                    onClick={() =>
                      setQuantity(Math.max(1, quantity - 1))
                    }
                    className="px-5 py-3 text-lg hover:bg-gray-100"
                  >
                    −
                  </button>

                  <span className="min-w-12 text-center text-sm font-medium">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity(quantity + 1)
                    }
                    className="px-5 py-3 text-lg hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <button
                  onClick={handleAddToCart}
                  className="rounded-xl border border-black bg-white px-6 py-4 text-sm font-semibold uppercase tracking-wider text-black transition hover:bg-black hover:text-white"
                >
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="rounded-xl bg-black px-6 py-4 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800"
                >
                  Buy Now
                </button>
              </div>

              {/* Delivery */}
              <div className="mt-8 space-y-4 border-t pt-7">
                <div className="flex gap-4">
                  <span className="text-lg">🚚</span>

                  <div>
                    <p className="text-sm font-semibold">
                      Free Delivery
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Free shipping on all orders.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-lg">↩</span>

                  <div>
                    <p className="text-sm font-semibold">
                      Easy Returns
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Easy returns and exchanges available.
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
                      Your order information is secure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t bg-gray-50 px-6 py-16">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900">
                Premium Quality
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Carefully selected materials made for
                everyday wear.
              </p>
            </div>

            <div className="text-center">
              <h3 className="font-semibold text-gray-900">
                Modern Fit
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Designed with a relaxed contemporary
                silhouette.
              </p>
            </div>

            <div className="text-center">
              <h3 className="font-semibold text-gray-900">
                Easy Returns
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Shop confidently with our easy return
                policy.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}