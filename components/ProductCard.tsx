"use client";

import Link from "next/link";

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

export default function ProductCard({
  name,
  price,
  category,
  image,
}: ProductCardProps) {
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

        <button
          onClick={handleQuickAdd}
          className="absolute bottom-0 left-0 right-0 translate-y-full bg-[#080808] py-3 text-center text-xs font-medium uppercase tracking-wider text-white transition duration-300 group-hover:translate-y-0 hover:bg-[#A06E31]"
        >
          Quick Add
        </button>
      </div>

      <div className="pt-4">
        <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[#A06E31]">
          {category}
        </p>

        <div className="flex items-start justify-between gap-3">
          <Link
            href={productLink}
            className="text-sm font-medium transition hover:text-[#A06E31]"
          >
            {name}
          </Link>

          <p className="whitespace-nowrap text-sm font-medium">
            {price}
          </p>
        </div>

        <div className="mt-3 flex gap-1.5">
          <span className="h-3 w-3 rounded-full border border-black/20 bg-black" />
          <span className="h-3 w-3 rounded-full border border-black/20 bg-[#D5C1A9]" />
          <span className="h-3 w-3 rounded-full border border-black/20 bg-white" />
        </div>
      </div>
    </article>
  );
}