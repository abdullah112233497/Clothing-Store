"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import jsPDF from "jspdf";

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
      // Hydrate the completed order from browser storage after mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const handleDownloadReceipt = () => {
    if (!order) return;
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Dark Header Bar
      doc.setFillColor(8, 8, 8);
      doc.rect(0, 0, 210, 32, "F");

      // Brand Name
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("WEARWELL", 15, 18);

      doc.setFontSize(8);
      doc.setTextColor(190, 150, 90);
      doc.setFont("helvetica", "normal");
      doc.text("LUXURY APPAREL & READY TO WEAR", 15, 24);

      // Receipt badge & order ID on right
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("OFFICIAL RECEIPT", 195, 15, { align: "right" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(200, 200, 200);
      doc.text(`Order: ${orderNumber}`, 195, 21, { align: "right" });
      doc.text("Status: Confirmed", 195, 26, { align: "right" });

      // Customer & Order Info Box
      doc.setFillColor(248, 246, 242);
      doc.roundedRect(15, 40, 180, 32, 2, 2, "F");

      doc.setTextColor(120, 120, 120);
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "bold");
      doc.text("CUSTOMER NAME", 20, 47);
      doc.text("CONTACT NUMBER", 110, 47);
      doc.text("DELIVERY ADDRESS", 20, 59);

      doc.setTextColor(15, 15, 15);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text(order.customer.name || "Valued Customer", 20, 53);
      doc.text(order.customer.phone || "N/A", 110, 53);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      const deliveryAddress = `${order.customer.address}, ${order.customer.city}`;
      const splitAddress = doc.splitTextToSize(deliveryAddress, 170);
      doc.text(splitAddress, 20, 65);

      // Table Header
      let y = 80;
      doc.setFillColor(8, 8, 8);
      doc.rect(15, y, 180, 8, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.text("ITEM DESCRIPTION", 20, y + 5.5);
      doc.text("SIZE", 120, y + 5.5);
      doc.text("QTY", 145, y + 5.5);
      doc.text("TOTAL", 190, y + 5.5, { align: "right" });

      // Items Rows
      y += 8;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(20, 20, 20);

      order.items.forEach((item, index) => {
        if (index % 2 === 1) {
          doc.setFillColor(252, 252, 252);
          doc.rect(15, y, 180, 9, "F");
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.text(item.name, 20, y + 6);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.text(item.size || "M", 120, y + 6);
        doc.text(String(item.quantity), 145, y + 6);
        doc.text(`Rs. ${(item.price * item.quantity).toLocaleString()}`, 190, y + 6, { align: "right" });

        doc.setDrawColor(240, 240, 240);
        doc.line(15, y + 9, 195, y + 9);
        y += 9;
      });

      // Price Summary
      y += 6;
      const summaryX = 120;
      doc.setFontSize(8.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(90, 90, 90);

      doc.text("Subtotal:", summaryX, y);
      doc.setTextColor(15, 15, 15);
      doc.text(`Rs. ${order.subtotal.toLocaleString()}`, 190, y, { align: "right" });

      y += 6;
      doc.setTextColor(90, 90, 90);
      doc.text("Express Shipping:", summaryX, y);
      doc.setTextColor(22, 163, 74);
      doc.setFont("helvetica", "bold");
      doc.text("FREE", 190, y, { align: "right" });

      y += 7;
      doc.setDrawColor(8, 8, 8);
      doc.setLineWidth(0.3);
      doc.line(summaryX, y - 2, 195, y - 2);

      doc.setFontSize(10.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(8, 8, 8);
      doc.text("Total Paid:", summaryX, y + 4);
      doc.text(`Rs. ${order.total.toLocaleString()}`, 190, y + 4, { align: "right" });

      // Guarantee footer
      y += 24;
      doc.setFillColor(248, 246, 242);
      doc.roundedRect(15, y, 180, 16, 2, 2, "F");
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "normal");
      doc.text("GUARANTEE: 14-Day Hassle-Free Returns & Exchanges across Pakistan.", 20, y + 7);
      doc.text("Customer Care: support@wearwell.pk | Official E-Commerce Store", 20, y + 12);

      // Save/Download PDF directly
      const cleanNum = orderNumber.replace(/[^a-zA-Z0-9-_]/g, "");
      doc.save(`WEARWELL-Receipt-${cleanNum}.pdf`);
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("Failed to download PDF. Please try again.");
    }
  };

  if (!order) {
    return (
      <>
        <Header />

        <main className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-500 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
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
            <div className="flex gap-4 items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <div>
                <h2 className="font-semibold text-white">
                  What happens next?
                </h2>

                <p className="mt-1.5 text-sm leading-6 text-gray-300">
                  Our dispatch team has received your order request and will contact you directly via phone/WhatsApp to confirm order dispatch details. Delivery typically takes 2–4 business days.
                </p>
              </div>
            </div>
          </section>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={handleDownloadReceipt}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-black bg-white px-8 py-4 text-center text-sm font-semibold text-black transition hover:bg-black hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Receipt
            </button>

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
