"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";

type Product = {
  name: string;
  price: number;
  oldPrice: number;
  category: string;
  image: string;
  images: string[];
  description: string;
};

const products: Product[] = [
  {
    name: "Essential Oversized Tee",
    price: 3499,
    oldPrice: 4299,
    category: "Women",
    image: "/images/product-1.png",
    images: [
      "/images/product-1.png",
      "/images/product-2.png",
      "/images/product-3.png",
    ],
    description:
      "A relaxed oversized tee designed for everyday comfort and effortless style.",
  },
  {
    name: "Classic Casual Shirt",
    price: 4999,
    oldPrice: 5999,
    category: "Men",
    image: "/images/product-2.png",
    images: [
      "/images/product-2.png",
      "/images/product-3.png",
      "/images/product-4.png",
    ],
    description:
      "A clean and versatile casual shirt made for modern everyday dressing.",
  },
  {
    name: "Minimal Shoulder Bag",
    price: 5499,
    oldPrice: 6499,
    category: "Accessories",
    image: "/images/product-3.png",
    images: [
      "/images/product-3.png",
      "/images/product-4.png",
      "/images/product-5.png",
    ],
    description:
      "A minimal shoulder bag that adds a refined touch to your everyday look.",
  },
  {
    name: "Relaxed Fit Trousers",
    price: 6499,
    oldPrice: 7499,
    category: "Women",
    image: "/images/product-4.png",
    images: [
      "/images/product-4.png",
      "/images/product-5.png",
      "/images/product-6.png",
    ],
    description:
      "Relaxed trousers with a modern silhouette designed for comfort and style.",
  },
  {
    name: "Urban Denim Jacket",
    price: 7999,
    oldPrice: 8999,
    category: "Men",
    image: "/images/product-5.png",
    images: [
      "/images/product-5.png",
      "/images/product-6.png",
      "/images/product-7.png",
    ],
    description:
      "A timeless denim jacket with an urban edge for effortless layering.",
  },
  {
    name: "Everyday Sneakers",
    price: 8499,
    oldPrice: 9499,
    category: "Accessories",
    image: "/images/product-6.png",
    images: [
      "/images/product-6.png",
      "/images/product-7.png",
      "/images/product-8.png",
    ],
    description:
      "Comfortable everyday sneakers designed to complement your casual wardrobe.",
  },
  {
    name: "Premium Basic Hoodie",
    price: 5999,
    oldPrice: 6999,
    category: "Women",
    image: "/images/product-7.png",
    images: [
      "/images/product-7.png",
      "/images/product-8.png",
      "/images/product-1.png",
    ],
    description:
      "A premium basic hoodie with a comfortable fit and clean minimal design.",
  },
  {
    name: "Modern Cargo Pants",
    price: 6999,
    oldPrice: 7999,
    category: "Men",
    image: "/images/product-8.png",
    images: [
      "/images/product-8.png",
      "/images/product-1.png",
      "/images/product-2.png",
    ],
    description:
      "Modern cargo pants combining utility-inspired details with everyday comfort.",
  },
];

type CartItem = {
  name: string;
  price: number;
  size: string;
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

        <main className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
              Product
            </p>

            <h1 className="mt-3 text-3xl font-bold">
              Product Not Found
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              Sorry, this product could not be found.
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-block rounded-xl bg-black px-7 py-3 text-sm font-semibold text-white"
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

    alert(`${product.name} added to cart!`);
  };

  const handleAddToCart = () => {
    addToCart();
    router.push("/cart");
  };

  const handleBuyNow = () => {
    addToCart();
    router.push("/checkout");
  };

  return (
    <>
      <Header />

      <main className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="mb-8 text-sm text-gray-500">
            <Link href="/" className="hover:text-black">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-black">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">
              {product.name}
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* Images */}
            <div className="grid gap-4 sm:grid-cols-[90px_1fr]">
              <div className="order-2 flex gap-3 sm:order-1 sm:flex-col">
                {product.images.map((img, index) => (
                  <button
                    key={img}
                    onClick={() => setSelectedImage(img)}
                    className={`overflow-hidden border-2 ${
                      selectedImage === img
                        ? "border-black"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="h-24 w-20 object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="order-1 overflow-hidden bg-[#F1EEE9] sm:order-2">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="h-full max-h-[700px] w-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="py-2 lg:py-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A06E31]">
                {product.category}
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.name}
              </h1>

              <div className="mt-4 flex items-center gap-3">
                <div className="text-yellow-500">
                  ★★★★★
                </div>

                <span className="text-sm text-gray-500">
                  4.8 (124 reviews)
                </span>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <span className="text-2xl font-bold">
                  Rs. {product.price.toLocaleString()}
                </span>

                <span className="text-base text-gray-400 line-through">
                  Rs. {product.oldPrice.toLocaleString()}
                </span>

                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                  SALE
                </span>
              </div>

              <p className="mt-6 leading-7 text-gray-600">
                {product.description}
              </p>

              {/* Color */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">
                    Color
                  </p>

                  <span className="text-sm text-gray-500">
                    {selectedColor}
                  </span>
                </div>

                <div className="mt-3 flex gap-3">
                  {["Black", "Beige", "White"].map(
                    (color) => (
                      <button
                        key={color}
                        onClick={() =>
                          setSelectedColor(color)
                        }
                        className={`rounded-full border-2 p-1 ${
                          selectedColor === color
                            ? "border-black"
                            : "border-transparent"
                        }`}
                      >
                        <span
                          className={`block h-8 w-8 rounded-full border ${
                            color === "Black"
                              ? "bg-black"
                              : color === "Beige"
                                ? "bg-[#D5C1A9]"
                                : "bg-white"
                          }`}
                        />
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Size */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">
                    Select Size
                  </p>

                  <button className="text-xs underline">
                    Size Guide
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-5 gap-2">
                  {["XS", "S", "M", "L", "XL"].map(
                    (size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`border py-3 text-sm font-medium transition ${
                          selectedSize === size
                            ? "border-black bg-black text-white"
                            : "border-gray-200 hover:border-black"
                        }`}
                      >
                        {size}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-8">
                <p className="text-sm font-semibold">
                  Quantity
                </p>

                <div className="mt-3 flex w-fit items-center border border-gray-200">
                  <button
                    onClick={() =>
                      setQuantity(Math.max(1, quantity - 1))
                    }
                    className="px-5 py-3 text-lg"
                  >
                    −
                  </button>

                  <span className="w-10 text-center text-sm">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity(quantity + 1)
                    }
                    className="px-5 py-3 text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <button
                  onClick={handleAddToCart}
                  className="rounded-xl border border-black py-4 text-sm font-semibold transition hover:bg-gray-100"
                >
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="rounded-xl bg-black py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  Buy Now
                </button>
              </div>

              {/* Benefits */}
              <div className="mt-8 space-y-3 border-t pt-6 text-sm text-gray-600">
                <p>✓ Free shipping on all orders</p>
                <p>✓ Secure checkout</p>
                <p>✓ Easy returns & exchanges</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}