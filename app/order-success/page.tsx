"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

type CartItem = {
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
};

type OrderData = {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: string;
};

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    const savedOrder = localStorage.getItem("lastOrder");

    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }

    const savedOrderNumber = localStorage.getItem(
      "orderNumber"
    );

    if (savedOrderNumber) {
      setOrderNumber(savedOrderNumber);
    } else {
      const newOrderNumber =
        "#OUT-" +
        Math.floor(100000 + Math.random() * 900000);

      localStorage.setItem(
        "orderNumber",
        newOrderNumber
      );

      setOrderNumber(newOrderNumber);
    }
  }, []);

  if (!order) {
    return (
      <>
        <Header />

        <main className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="text-center">
            <div className="text-5xl">📦</div>

            <h1 className="mt-5 text-2xl font-bold text-gray-900">
              Order information not found
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Please continue shopping and place a new order.
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-block rounded-xl bg-black px-7 py-3 text-sm font-semibold text-white"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
      </>
    );
  }

  const totalQuantity = order.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Success Header */}
          <section className="rounded-2xl border bg-white px-6 py-12 text-center sm:px-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
              ✓
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-green-600">
              Order Confirmed
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
              Thank You, {order.customer.name}!
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500">
              Your order has been successfully placed.
              We&apos;ll prepare your items and get them ready
              for delivery.
            </p>

            <div className="mt-7 inline-flex flex-col items-center rounded-xl bg-gray-50 px-8 py-4">
              <span className="text-xs uppercase tracking-wider text-gray-500">
                Order Number
              </span>

              <span className="mt-1 text-lg font-bold text-gray-900">
                {orderNumber}
              </span>
            </div>
          </section>

          {/* Order Progress */}
          <section className="mt-6 rounded-2xl border bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900">
              Order Status
            </h2>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm text-white">
                  ✓
                </div>

                <p className="mt-3 text-xs font-semibold">
                  Order Placed
                </p>

                <p className="mt-1 text-[11px] text-gray-500">
                  Confirmed
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 text-sm text-gray-400">
                  2
                </div>

                <p className="mt-3 text-xs font-semibold text-gray-700">
                  Processing
                </p>

                <p className="mt-1 text-[11px] text-gray-500">
                  Preparing
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 text-sm text-gray-400">
                  3
                </div>

                <p className="mt-3 text-xs font-semibold text-gray-700">
                  Delivered
                </p>

                <p className="mt-1 text-[11px] text-gray-500">
                  3–5 days
                </p>
              </div>
            </div>

            <div className="mt-6 h-1 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-1/3 bg-black" />
            </div>
          </section>

          {/* Order Details */}
          <section className="mt-6 rounded-2xl border bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {totalQuantity} item
                  {totalQuantity > 1 ? "s" : ""}
                </p>
              </div>

              <span className="rounded-full bg-gray-100 px-4 py-2 text-xs font-medium text-gray-700">
                {order.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : "Card Payment"}
              </span>
            </div>

            {/* Products */}
            <div className="mt-7 space-y-6">
              {order.items.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="flex gap-4 border-b pb-6 last:border-b-0 last:pb-0"
                >
                  <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-1 items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        Size: {item.size}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-sm font-semibold text-gray-900">
                      Rs.{" "}
                      {(
                        item.price * item.quantity
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div className="mt-7 space-y-4 border-t pt-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-medium">
                  Rs. {order.subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Shipping
                </span>

                <span className="font-medium">
                  FREE
                </span>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-base font-bold">
                    Total
                  </span>

                  <span className="text-xl font-bold">
                    Rs. {order.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Delivery Information */}
          <section className="mt-6 rounded-2xl border bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900">
              Delivery Information
            </h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400">
                  Name
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {order.customer.name}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400">
                  Phone
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {order.customer.phone}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400">
                  Email
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {order.customer.email}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400">
                  City
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {order.customer.city}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-xs uppercase tracking-wider text-gray-400">
                  Delivery Address
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {order.customer.address}
                </p>

                {order.customer.postalCode && (
                  <p className="mt-1 text-sm text-gray-500">
                    Postal Code: {order.customer.postalCode}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Delivery Note */}
          <section className="mt-6 rounded-2xl bg-black p-6 text-white sm:p-8">
            <div className="flex gap-4">
              <div className="text-2xl">🚚</div>

              <div>
                <h2 className="font-semibold">
                  What happens next?
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Your order will be processed shortly. You
                  can expect delivery within 3–5 business
                  days. A confirmation has been recorded for
                  your order.
                </p>
              </div>
            </div>
          </section>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/shop"
              className="rounded-xl bg-black px-8 py-4 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Continue Shopping
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-gray-300 bg-white px-8 py-4 text-center text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}