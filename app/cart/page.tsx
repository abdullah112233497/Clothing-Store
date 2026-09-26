"use client";

import { useState } from "react";
import Link from "next/link";
import { useStockCart } from "@/lib/cart-stock";

export default function CartPage() {
  const { cartItems, loaded, checkingStock, stockMessage, stockError, refreshStock, updateCart: updateLocalStorage } = useStockCart();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Promo Code State
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState(0);

  // Show Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Update Quantity
  const handleQuantityChange = (index: number, newQty: number) => {
    const item = cartItems[index];
    const alreadyInOtherRows = cartItems.reduce((total, row, rowIndex) => total + (rowIndex !== index && row.variantId === item.variantId ? row.quantity : 0), 0);
    if (newQty < 1 || checkingStock || stockError || newQty + alreadyInOtherRows > (item.availableQuantity || 0)) return;
    const updated = [...cartItems];
    updated[index] = { ...item, quantity: newQty };
    updateLocalStorage(updated);
    showToast(`Updated quantity to ${newQty}`);
  };

  // Remove Item
  const handleRemoveItem = (index: number) => {
    const itemToRemove = cartItems[index];
    const updated = cartItems.filter((_, i) => i !== index);
    updateLocalStorage(updated);
    showToast(`Removed "${itemToRemove.name}" from your bag`);
  };

  // Clear Cart
  const handleClearCart = () => {
    if (confirm("Are you sure you want to clear your shopping bag?")) {
      updateLocalStorage([]);
      showToast("Your shopping bag has been cleared");
    }
  };

  // Apply Promo Code
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();

    if (!cleanCode) return;

    if (cleanCode === "WEARWELL10" || cleanCode === "SAVE10" || cleanCode === "WELCOME10") {
      setAppliedPromo(cleanCode);
      setDiscountPercent(10);
      showToast(`Promo code "${cleanCode}" applied! 10% discount added.`);
      setPromoCode("");
    } else if (cleanCode === "WEARWELL20" || cleanCode === "SALE20") {
      setAppliedPromo(cleanCode);
      setDiscountPercent(20);
      showToast(`Promo code "${cleanCode}" applied! 20% discount added.`);
      setPromoCode("");
    } else {
      showToast("Invalid promo code. Try 'WEARWELL10'");
    }
  };

  // Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingFee = 0; // Free shipping
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const totalItemsCount = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F6F2]">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
            WEARWELL
          </p>
          <p className="mt-2 text-sm text-gray-500">Loading your shopping bag...</p>
        </div>
      </div>
    );
  }

  return (
    <>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-black px-5 py-3.5 text-xs font-medium text-white shadow-2xl">
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-black text-white">
            ✓
          </span>
          {toastMessage}
        </div>
      )}

      <main className="min-h-screen bg-[#F8F6F2] text-[#080808]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">

          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400">
            <Link href="/" className="transition hover:text-black">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="transition hover:text-black">
              Shop
            </Link>
            <span>/</span>
            <span className="font-semibold text-black">Shopping Bag</span>
          </nav>

          {/* Page Heading */}
          <div className="mb-8 flex flex-col justify-between gap-3 border-b border-black/10 pb-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A06E31]">
                Your Selection
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Shopping Bag ({totalItemsCount})
              </h1>
            </div>

            {cartItems.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-xs font-semibold text-red-600 transition hover:underline"
              >
                Clear Shopping Bag
              </button>
            )}
          </div>

          {stockMessage && <p role="status" className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">{stockMessage}</p>}
          {stockError && <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">{stockError} <button type="button" onClick={() => void refreshStock()} disabled={checkingStock} className="ml-2 font-semibold underline">Retry</button></div>}

          {/* ================= EMPTY CART STATE ================= */}
          {cartItems.length === 0 ? (
            <section className="mx-auto my-12 max-w-lg rounded-2xl border border-black/10 bg-white p-8 text-center shadow-sm sm:p-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F6F2] text-gray-800 shadow-sm border border-black/5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>

              <h2 className="mt-6 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                Your Shopping Bag is Empty
              </h2>

              <p className="mt-3 text-xs leading-relaxed text-gray-500 sm:text-sm">
                Looks like you haven&apos;t added any products to your bag yet. Explore our latest arrivals and build your signature look.
              </p>

              <div className="mt-8">
                <Link
                  href="/shop"
                  className="inline-block rounded-xl bg-black px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#A06E31]"
                >
                  Explore Collection
                </Link>
              </div>
            </section>
          ) : (
            /* ================= CART ITEMS + ORDER SUMMARY GRID ================= */
            <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

              {/* LEFT COLUMN: ITEMS LIST */}
              <div className="space-y-4">
                {cartItems.map((item, index) => {
                  const itemSlug = item.slug || item.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "");

                  return (
                    <div
                      key={`${item.name}-${item.size}-${item.color}-${index}`}
                      className="group flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-4 shadow-sm transition hover:border-black/20 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                    >
                      {/* Item Image & Details */}
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/product/${itemSlug}`}
                          scroll
                          className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-[#F1EEE9]"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        </Link>

                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/product/${itemSlug}`}
                            scroll
                            className="text-sm font-bold text-gray-900 transition hover:text-[#A06E31]"
                          >
                            {item.name}
                          </Link>

                          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                            <span className="rounded-md bg-gray-100 px-2 py-0.5 font-medium text-gray-700">
                              Size: {item.size || "M"}
                            </span>
                            {item.color && (
                              <span className="rounded-md bg-gray-100 px-2 py-0.5 font-medium text-gray-700">
                                Color: {item.color}
                              </span>
                            )}
                          </div>

                          <p className="mt-2 text-xs font-semibold text-gray-900 sm:hidden">
                            Rs. {item.price.toLocaleString()} × {item.quantity}
                          </p>
                        </div>
                      </div>

                      {/* Controls: Price, Quantity & Remove */}
                      <div className="flex items-center justify-between gap-6 border-t border-gray-100 pt-3 sm:border-none sm:pt-0">

                        {/* Price (Desktop) */}
                        <div className="hidden text-right sm:block">
                          <p className="text-xs text-gray-400">Unit Price</p>
                          <p className="text-sm font-semibold text-gray-900">
                            Rs. {item.price.toLocaleString()}
                          </p>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center rounded-xl border border-gray-200 bg-[#F8F6F2]">
                          <button
                            onClick={() =>
                              handleQuantityChange(index, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1 || checkingStock || !!stockError}
                            className="px-3 py-1.5 text-sm font-bold text-gray-600 transition hover:bg-gray-200 disabled:opacity-40"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>

                          <span className="w-8 text-center text-xs font-bold text-gray-900">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              handleQuantityChange(index, item.quantity + 1)
                            }
                            disabled={checkingStock || !!stockError || cartItems.filter((row) => row.variantId === item.variantId).reduce((total, row) => total + row.quantity, 0) >= (item.availableQuantity || 0)}
                            className="px-3 py-1.5 text-sm font-bold text-gray-600 transition hover:bg-gray-200 disabled:opacity-40"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Total Price & Delete */}
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-xs text-gray-400 sm:hidden">Total</p>
                            <p className="text-sm font-bold text-gray-900">
                              Rs. {(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>

                          <button
                            onClick={() => handleRemoveItem(index)}
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                            title="Remove Item"
                            aria-label="Remove item"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.8}
                              stroke="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Return to Shop Link */}
                <div className="pt-4">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black transition hover:text-[#A06E31]"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>

              {/* RIGHT COLUMN: ORDER SUMMARY CARD */}
              <div>
                <div className="sticky top-28 rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-7">
                  <h2 className="text-lg font-bold tracking-tight text-gray-900 border-b border-gray-100 pb-4">
                    Order Summary
                  </h2>

                  {/* Free Shipping Badge */}
                  <div className="mt-5 rounded-xl border border-emerald-200/60 bg-emerald-50/50 p-3.5 text-xs text-emerald-900 flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="font-bold">You unlocked Free Express Shipping!</p>
                      <p className="mt-0.5 text-[11px] text-emerald-700">
                        Door-to-door delivery within 2–4 business days.
                      </p>
                    </div>
                  </div>

                  {/* Summary Rows */}
                  <div className="mt-5 space-y-3.5 text-xs">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({totalItemsCount} items)</span>
                      <span className="font-semibold text-gray-900">
                        Rs. {subtotal.toLocaleString()}
                      </span>
                    </div>

                    {appliedPromo && (
                      <div className="flex justify-between text-green-600">
                        <span>Promo Discount ({appliedPromo})</span>
                        <span className="font-semibold">
                          − Rs. {discountAmount.toLocaleString()}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-gray-600">
                      <span>Estimated Shipping</span>
                      <span className="font-semibold text-green-600 uppercase">
                        FREE
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Estimated Tax</span>
                      <span className="font-semibold text-gray-900">
                        Included
                      </span>
                    </div>

                    <div className="border-t border-gray-100 pt-4 flex items-center justify-between text-base font-bold text-gray-900">
                      <span>Total Amount</span>
                      <span className="text-xl">
                        Rs. {grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Promo Code Form */}
                  <form onSubmit={handleApplyPromo} className="mt-6 flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code (e.g. WEARWELL10)"
                      className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-xs outline-none transition focus:border-black focus:bg-white"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-black px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800"
                    >
                      Apply
                    </button>
                  </form>

                  {/* Checkout Button */}
                  <div className="mt-6 space-y-3">
                    <Link
                      href="/checkout"
                      aria-disabled={checkingStock || !!stockError}
                      onClick={(event) => { if (checkingStock || stockError) event.preventDefault(); }}
                      className="block w-full rounded-xl bg-black py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg transition hover:bg-[#A06E31]"
                    >
                      Proceed to Checkout →
                    </Link>

                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 uppercase tracking-widest pt-1">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>256-Bit Encrypted & Safe Checkout</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>
    </>
  );
}
