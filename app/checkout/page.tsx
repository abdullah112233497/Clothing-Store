"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";

type CartItem = {
  name: string;
  price: number;
  size: string;
  color?: string;
  quantity: number;
  image: string;
};

export default function CheckoutPage() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Customer Contact & Delivery State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Lahore");
  const [postalCode, setPostalCode] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      }

      // Pre-fill profile info if logged in
      const savedProfile = localStorage.getItem("userProfile");
      if (savedProfile) {
        const p = JSON.parse(savedProfile);
        if (p.firstName) setName(`${p.firstName} ${p.lastName || ""}`.trim());
        if (p.email) setEmail(p.email);
        if (p.phone) setPhone(p.phone);
      }
    } catch (e) {
      console.error("Failed to load checkout state", e);
    } finally {
      setLoaded(true);
    }
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const shipping = 0; // Free Shipping
  const total = subtotal + shipping;

  const totalQuantity = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const handlePlaceOrder = (event: React.FormEvent) => {
    event.preventDefault();

    if (cartItems.length === 0) return;

    setPlacingOrder(true);

    const orderNumber = `#WW-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderData = {
      orderNumber,
      items: cartItems,
      subtotal,
      shipping,
      total,
      customer: {
        name,
        email,
        phone,
        address,
        city,
        postalCode,
        notes: orderNotes,
      },
      paymentMethod: "Cash on Delivery / Rep Contact",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("lastOrder", JSON.stringify(orderData));
    localStorage.setItem("orderNumber", orderNumber);

    // Empty Cart
    localStorage.removeItem("cartItems");
    window.dispatchEvent(new Event("cartUpdated"));

    setTimeout(() => {
      router.push("/order-success");
    }, 400);
  };

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F6F2]">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
            WEARWELL
          </p>
          <p className="mt-2 text-sm text-gray-500">Preparing checkout...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <main className="mx-auto flex min-h-[65vh] max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-gray-800 shadow-sm border border-black/5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </div>

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
            Your Bag is Empty
          </h1>

          <p className="mt-2 text-xs leading-relaxed text-gray-500">
            Please add some products to your shopping bag before proceeding to order checkout.
          </p>

          <Link
            href="/shop"
            className="mt-8 rounded-xl bg-black px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#A06E31]"
          >
            Continue Shopping
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F8F6F2] text-[#080808] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Breadcrumb Header */}
          <div className="mb-8 border-b border-black/10 pb-5">
            <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 mb-2">
              <Link href="/" className="transition hover:text-black">
                Home
              </Link>
              <span>/</span>
              <Link href="/cart" className="transition hover:text-black">
                Shopping Bag
              </Link>
              <span>/</span>
              <span className="font-semibold text-black">Checkout</span>
            </nav>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Express Delivery Order
            </h1>
            <p className="mt-1 text-xs text-gray-500">
              Provide your contact & delivery details below. Our team will verify and dispatch your order.
            </p>
          </div>

          <form
            onSubmit={handlePlaceOrder}
            className="grid gap-8 lg:grid-cols-[1fr_400px]"
          >
            {/* LEFT COLUMN: DELIVERY DETAILS FORM */}
            <div className="space-y-6">

              {/* Contact Information Card */}
              <section className="rounded-2xl border border-black/5 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F8F6F2] text-gray-800 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">
                      Contact Information
                    </h2>
                    <p className="text-xs text-gray-500">
                      We will use these details to contact you regarding your order.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border border-gray-200 bg-[#F8F6F2]/50 px-4 py-3 text-xs outline-none transition focus:border-black focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                      Phone Number <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="0300 1234567"
                      className="w-full rounded-xl border border-gray-200 bg-[#F8F6F2]/50 px-4 py-3 text-xs outline-none transition focus:border-black focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="name@example.com"
                      className="w-full rounded-xl border border-gray-200 bg-[#F8F6F2]/50 px-4 py-3 text-xs outline-none transition focus:border-black focus:bg-white"
                    />
                  </div>
                </div>
              </section>

              {/* Delivery Address Card */}
              <section className="rounded-2xl border border-black/5 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F8F6F2] text-gray-800 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">
                      Shipping Address
                    </h2>
                    <p className="text-xs text-gray-500">
                      Where should we deliver your WEARWELL package?
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                      Street Address <span className="text-red-500">*</span>
                    </label>

                    <textarea
                      required
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      placeholder="House/Apartment number, Street, Block, Area..."
                      rows={3}
                      className="w-full resize-none rounded-xl border border-gray-200 bg-[#F8F6F2]/50 px-4 py-3 text-xs outline-none transition focus:border-black focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                      City <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      placeholder="e.g. Lahore, Karachi, Islamabad..."
                      className="w-full rounded-xl border border-gray-200 bg-[#F8F6F2]/50 px-4 py-3 text-xs outline-none transition focus:border-black focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                      Postal Code (Optional)
                    </label>

                    <input
                      type="text"
                      value={postalCode}
                      onChange={(event) => setPostalCode(event.target.value)}
                      placeholder="54000"
                      className="w-full rounded-xl border border-gray-200 bg-[#F8F6F2]/50 px-4 py-3 text-xs outline-none transition focus:border-black focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                      Special Delivery Instructions (Optional)
                    </label>

                    <input
                      type="text"
                      value={orderNotes}
                      onChange={(event) => setOrderNotes(event.target.value)}
                      placeholder="e.g. Call before delivery, leave with receptionist..."
                      className="w-full rounded-xl border border-gray-200 bg-[#F8F6F2]/50 px-4 py-3 text-xs outline-none transition focus:border-black focus:bg-white"
                    />
                  </div>
                </div>
              </section>

              {/* Delivery & Payment Note Banner */}
              <section className="rounded-2xl border border-[#A06E31]/20 bg-[#A06E31]/5 p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-base text-[#A06E31]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">
                      Cash on Delivery & Direct Order Verification
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-600">
                      No advance payment or card details required. Once you place your order, your details will be received and our team will contact you directly to confirm delivery.
                    </p>
                  </div>
                </div>
              </section>

            </div>

            {/* RIGHT COLUMN: ORDER SUMMARY */}
            <div>
              <aside className="sticky top-28 rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-7">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <h2 className="text-base font-bold text-gray-900">
                    Your Order
                  </h2>

                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold text-gray-700">
                    {totalQuantity} {totalQuantity > 1 ? "items" : "item"}
                  </span>
                </div>

                {/* Items List */}
                <div className="mt-5 max-h-72 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
                  {cartItems.map((item, index) => (
                    <div
                      key={`${item.name}-${item.size}-${index}`}
                      className="flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative h-14 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-[#F1EEE9]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">
                            {item.quantity}
                          </span>
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 truncate max-w-[140px]">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            Size: {item.size || "M"} {item.color ? `· ${item.color}` : ""}
                          </p>
                        </div>
                      </div>

                      <p className="font-bold text-gray-900 whitespace-nowrap">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="mt-6 border-t border-gray-100 pt-4 space-y-2.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      Rs. {subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Express Delivery</span>
                    <span className="font-semibold text-green-600 uppercase">
                      FREE
                    </span>
                  </div>

                  <div className="flex justify-between border-t border-gray-100 pt-3 text-sm font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-base">
                      Rs. {total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={placingOrder}
                  className="mt-6 w-full rounded-xl bg-black py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-md transition hover:bg-[#A06E31] disabled:opacity-50"
                >
                  {placingOrder ? "Placing Order..." : "PLACE ORDER NOW →"}
                </button>

                {/* Trust Badges */}
                <div className="mt-5 space-y-2 text-center text-[11px] text-gray-500 border-t border-gray-100 pt-4">
                  <p className="flex items-center justify-center gap-1.5">
                    <span>✓</span> Direct Order Verification
                  </p>
                  <p className="flex items-center justify-center gap-1.5">
                    <span>✓</span> Free Nationwide Express Delivery
                  </p>
                  <p className="flex items-center justify-center gap-1.5">
                    <span>✓</span> 14-Day Easy Exchange Policy
                  </p>
                </div>
              </aside>
            </div>

          </form>

        </div>
      </main>
    </>
  );
}